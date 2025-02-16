export interface OperatingHour {
  closing_time: string
  day_of_week: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
  establishment_id?: number
  hours_id?: number
  is_enabled: boolean
  opening_time: string
}
