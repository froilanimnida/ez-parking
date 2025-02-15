interface Rates {
              hourly: number;
              daily: number;
              monthly: number;
            }

            interface Duration {
              months: number;
              days: number;
              hours: number;
              minutes: number;
            }

            interface BillCalculation {
              totalAmount: number;
              breakdown: {
                months: { count: number; rate: number; total: number };
                days: { count: number; rate: number; total: number };
                hours: { count: number; rate: number; total: number };
              };
              duration: Duration;
            }

            export const calculateTotalBill = (entryTime: Date, rates: Rates): BillCalculation => {
            const nowUTC = new Date();
            const nowPHT = new Date(nowUTC.getTime() + (8 * 60 * 60 * 1000)); // Add 8 hours
              const diffMs = nowPHT.getTime() - entryTime.getTime();

              // Calculate total duration
              const totalMinutes = Math.ceil(diffMs / (1000 * 60));
              const totalHours = totalMinutes / 60;
              const totalDays = totalHours / 24;
              const totalMonths = totalDays / 30.44;

              // Extract whole units
              const months = Math.floor(totalMonths);
              const remainingDays = Math.floor(totalDays % 30.44);
              const remainingHours = Math.ceil(totalHours % 24);

              let totalAmount = 0;
              const breakdown = {
                months: { count: 0, rate: rates.monthly, total: 0 },
                days: { count: 0, rate: rates.daily, total: 0 },
                hours: { count: 0, rate: rates.hourly, total: 0 }
              };

              // Calculate based on available rates
              if (rates.monthly > 0 && months > 0) {
                breakdown.months.count = months;
                breakdown.months.total = months * rates.monthly;
                totalAmount += breakdown.months.total;

                if (rates.daily > 0 && remainingDays > 0) {
                  breakdown.days.count = remainingDays;
                  breakdown.days.total = remainingDays * rates.daily;
                  totalAmount += breakdown.days.total;
                }
              } else if (rates.daily > 0 && totalDays >= 1) {
                breakdown.days.count = Math.floor(totalDays);
                breakdown.days.total = breakdown.days.count * rates.daily;
                totalAmount += breakdown.days.total;
              }

              // Add remaining hours if hourly rate exists
              if (rates.hourly > 0 && remainingHours > 0) {
                breakdown.hours.count = remainingHours;
                breakdown.hours.total = remainingHours * rates.hourly;
                totalAmount += breakdown.hours.total;
              }

              // If no rates were applicable, default to hourly
              if (totalAmount === 0 && rates.hourly > 0) {
                const totalHoursToCharge = Math.ceil(totalHours);
                breakdown.hours.count = totalHoursToCharge;
                breakdown.hours.total = totalHoursToCharge * rates.hourly;
                totalAmount = breakdown.hours.total;
              }

              return {
                totalAmount: Math.ceil(totalAmount),
                breakdown,
                duration: {
                  months,
                  days: remainingDays,
                  hours: remainingHours,
                  minutes: Math.floor(totalMinutes % 60)
                }
              };
            }


            interface ExceededTimeCalculation {
              isOvertime: boolean;
              exceededDuration: {
                hours: number;
                minutes: number;
              };
              overtimeCharges: {
                amount: number;
                breakdown: {
                  hours: { count: number; rate: number; total: number };
                };
              };
            }

            export function calculateExceededTime(
              entryTime: Date,
              bookingDuration: number, // in hours
              rates: {
                hourly: number;
                daily: number;
                monthly: number;
              },
              overtimeMultiplier: number = 1.5 // default overtime rate multiplier
            ): ExceededTimeCalculation {
              const now = new Date();
              const bookingEndTime = new Date(entryTime.getTime() + (bookingDuration * 60 * 60 * 1000));

              // Not overtime if current time is before booking end time
              if (now <= bookingEndTime) {
                return {
                  isOvertime: false,
                  exceededDuration: { hours: 0, minutes: 0 },
                  overtimeCharges: {
                    amount: 0,
                    breakdown: {
                      hours: { count: 0, rate: 0, total: 0 }
                    }
                  }
                };
              }

              // Calculate exceeded time
              const exceededMs = now.getTime() - bookingEndTime.getTime();
              const exceededMinutes = Math.ceil(exceededMs / (1000 * 60));
              const exceededHours = Math.ceil(exceededMinutes / 60);

              // Calculate overtime charges (using hourly rate * multiplier)
              const overtimeHourlyRate = rates.hourly * overtimeMultiplier;
              const overtimeCharges = exceededHours * overtimeHourlyRate;

              return {
                isOvertime: true,
                exceededDuration: {
                  hours: Math.floor(exceededMinutes / 60),
                  minutes: exceededMinutes % 60
                },
                overtimeCharges: {
                  amount: Math.ceil(overtimeCharges),
                  breakdown: {
                    hours: {
                      count: exceededHours,
                      rate: overtimeHourlyRate,
                      total: Math.ceil(overtimeCharges)
                    }
                  }
                }
              };
            }
