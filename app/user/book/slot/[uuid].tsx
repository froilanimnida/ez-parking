import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Address } from "@/lib/models/address";
import { ParkingEstablishment } from "@lib/models/parkingEstablishment";
import { OperatingHour } from "@lib/models/operatingHour";
import { PaymentMethod } from "@lib/models/paymentMethod";
import { ParkingSlot } from "@lib/models/parkingSlot";
import { router, useLocalSearchParams } from "expo-router";
import LinkComponent from "@/components/LinkComponent";
import CardComponent from "@/components/CardComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@/components/TextComponent";
import TextInputComponent from "@/components/TextInputComponent";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import SelectComponent from "@/components/SelectComponent";
import CheckboxComponent from "@/components/CheckboxComponent";
import { checkoutTransaction, createTransaction } from "@/lib/api/transaction";
import ButtonComponent from "@/components/ButtonComponent";
import { calculatePrice } from "@/lib/helper/calculatePrice";
import { calculateDuration } from "@/lib/helper/calculateDuration";

interface Slot extends ParkingSlot {
    vehicle_type_code: string;
    vehicle_type_name: string;
    vehicle_type_size: string;
    price_multiplier?: string;
}

interface TransactionCheckoutData {
    address: Address;
    establishment_info: ParkingEstablishment;
    operating_hours: OperatingHour[];
    payment_methods: PaymentMethod[] | [];
    slot_info: Slot;
    has_ongoing_transaction: boolean;
}

const SlotInfo = () => {
    const { uuid, establishment_uuid } = useLocalSearchParams() as { uuid: string; establishment_uuid: string };
    const [transactionCheckoutInfo, setTransactionCheckoutInfo] = useState<TransactionCheckoutData | null>(null);
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth() + 1); // months are 0-based
    const [day, setDay] = useState(today.getDate());
    const [year, setYear] = useState(today.getFullYear());
    const [pricingType, setPricingType] = useState<"hourly" | "daily" | "monthly">("hourly");
    const pollSlotStatus = async () => {
        try {
            const result = await checkoutTransaction(establishment_uuid, uuid);
            setTransactionCheckoutInfo(result.data.transaction);
        } catch {
            alert("An error occurred while fetching transaction details.");
            router.reload();
        }
    };

    const getAvailablePricingPlans = () => {
        if (!transactionCheckoutInfo?.slot_info) return [];

        const plans = [];

        if (parseFloat(transactionCheckoutInfo.slot_info.base_price_per_hour) > 0) {
            plans.push({ label: "Hourly", value: "hourly" });
        }

        if (parseFloat(transactionCheckoutInfo.slot_info.base_price_per_day) > 0) {
            plans.push({ label: "Daily", value: "daily" });
        }

        if (parseFloat(transactionCheckoutInfo.slot_info.base_price_per_month) > 0) {
            plans.push({ label: "Monthly", value: "monthly" });
        }

        return plans;
    };
    const getCurrentRate = () => {
        if (!transactionCheckoutInfo?.slot_info) return 0;

        const baseRate =
            pricingType === "hourly"
                ? transactionCheckoutInfo.slot_info.base_price_per_hour
                : pricingType === "daily"
                  ? transactionCheckoutInfo.slot_info.base_price_per_day
                  : transactionCheckoutInfo.slot_info.base_price_per_month;

        const multiplier = parseFloat(transactionCheckoutInfo.slot_info.price_multiplier || "1");
        const premiumMultiplier = transactionCheckoutInfo.slot_info.is_premium ? 1.2 : 1;

        return parseFloat(baseRate) * multiplier * premiumMultiplier;
    };

    const [loading, setLoading] = useState(true);
    const [agreed, setAgreed] = useState(false);
    const [terms, setTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [duration, setDuration] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let mounted = true;

        const checkoutInfo = async () => {
            try {
                const result = await checkoutTransaction(establishment_uuid, uuid);
                if (mounted) {
                    setTransactionCheckoutInfo(result.data.transaction);
                    setLoading(false);
                    timeoutId = setTimeout(() => {
                        pollSlotStatus();
                    }, 5000);
                }
            } catch {
                if (mounted) {
                    alert("An error occurred while fetching transaction details.");
                    router.reload();
                }
            }
        };

        checkoutInfo();

        return () => {
            mounted = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            setLoading(true);
        };
    }, [uuid, establishment_uuid]);
    useEffect(() => {
        if (transactionCheckoutInfo?.slot_info) {
            const price = calculatePrice({
                base_price_per_hour: transactionCheckoutInfo.slot_info.base_price_per_hour,
                base_price_per_day: transactionCheckoutInfo.slot_info.base_price_per_day,
                base_price_per_month: transactionCheckoutInfo.slot_info.base_price_per_month,
                is_premium: transactionCheckoutInfo.slot_info.is_premium,
                duration: duration,
                duration_type: pricingType,
            });
            setTotalPrice(price);
        }
    }, [duration, pricingType, transactionCheckoutInfo?.slot_info]);

    const handleConfirmBooking = async () => {
        const selectedDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setIsSubmitting(true);
        if (!day || !month || !year) {
            alert("Please select a complete date.");
            setIsSubmitting(false);
            return;
        }

        if (selectedDate < today) {
            alert("Please select a future date.");
            setIsSubmitting(false);
            return;
        }
        if (!agreed) {
            alert("Please agree to the terms and conditions.");
            setIsSubmitting(false);
            return;
        }
        if (!terms) {
            alert("Please agree to the establishment's right to charge for damages.");
            setIsSubmitting(false);
            return;
        }
        if (duration <= 0) {
            alert("Please enter a valid duration.");
            setIsSubmitting(false);
            return;
        }
        if (transactionCheckoutInfo?.slot_info.slot_status !== "open") {
            alert("The slot is not available for booking.");
            setIsSubmitting(false);
            return;
        }
        const result = await createTransaction({
            duration: duration,
            duration_type: pricingType,
            scheduled_entry_time: new Date(year, month - 1, day).toISOString(),
            scheduled_exit_time: calculateDuration(
                String(new Date(year, month - 1, day)),
                duration,
                pricingType,
            ).toISOString(),
            amount_due: getCurrentRate() * duration,
            slot_uuid: uuid,
        });
        setIsSubmitting(false);
        if (!transactionCheckoutInfo?.has_ongoing_transaction && result.status === 201) {
            alert("Booking confirmed!");
            router.replace("/user");
        } else {
            alert("You have an ongoing transaction already.");
        }
    };

    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent
                    href={`../../../user/book/${establishment_uuid}`}
                    style={styles.backLink}
                    label="← Back to Dashboard"
                    variant="outline"
                />
            </View>
            {loading || !transactionCheckoutInfo ? (
                <LoadingComponent text="Loading..." />
            ) : (
                <>
                    <CardComponent
                        customStyles={styles.card}
                        header="Confirm Your Booking"
                        subHeader="Please review your booking details below"
                    ></CardComponent>

                    <CardComponent customStyles={styles.card} header="Slot Information">
                        <View style={styles.infoGrid}>
                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.subheading}>Establishment Details</TextComponent>
                                <TextComponent style={styles.paragraph}>
                                    {transactionCheckoutInfo?.establishment_info.name}
                                </TextComponent>
                                <TextComponent style={styles.paragraph}>
                                    {transactionCheckoutInfo?.address.street} {transactionCheckoutInfo?.address.city},{" "}
                                    {transactionCheckoutInfo?.address.province}{" "}
                                    {transactionCheckoutInfo?.address.postal_code}
                                </TextComponent>
                            </View>

                            <View style={styles.infoBlock}>
                                <TextComponent style={styles.subheading}>Slot Information</TextComponent>
                                <TextComponent style={styles.paragraph}>
                                    Slot Code: {transactionCheckoutInfo?.slot_info.slot_code}
                                </TextComponent>
                                <TextComponent style={styles.paragraph}>
                                    Floor Level: {transactionCheckoutInfo?.slot_info.floor_level}
                                </TextComponent>
                                <TextComponent style={styles.paragraph}>
                                    Vehicle Type: {transactionCheckoutInfo?.slot_info.vehicle_type_name}
                                </TextComponent>
                            </View>
                        </View>
                    </CardComponent>

                    <CardComponent header="Booking Details">
                        <View style={styles.formRow}>
                            <TextComponent style={styles.formLabel}>
                                Parking Duration{" "}
                                {pricingType === "hourly"
                                    ? "(in hours)"
                                    : pricingType === "daily"
                                      ? "(in days)"
                                      : "(in months)"}
                            </TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                keyboardType="number-pad"
                                value={String(duration)}
                                onChangeText={(val) => setDuration(Number(val))}
                                placeholder="0"
                            />
                        </View>
                        <View style={styles.formRow}>
                            <TextComponent style={styles.formLabel}>Schedule Entry Time </TextComponent>
                            <View style={{ flexDirection: "row", gap: 8 }}>
                                <View style={{ flex: 1 }}>
                                    <TextComponent style={styles.formLabelSmall}>Day</TextComponent>
                                    <SelectComponent
                                        items={Array.from({ length: 31 }, (_, i) => ({
                                            label: String(i + 1),
                                            value: String(i + 1),
                                        }))}
                                        onValueChange={(val) => setDay(Number(val))}
                                        selectedValue={String(day)}
                                        placeholder="Select Day"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextComponent style={styles.formLabelSmall}>Month</TextComponent>
                                    <SelectComponent
                                        items={Array.from({ length: 12 }, (_, i) => ({
                                            label: String(i + 1),
                                            value: String(i + 1),
                                        }))}
                                        onValueChange={(val) => setMonth(Number(val))}
                                        selectedValue={String(month)}
                                        placeholder="Select Month"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextComponent style={styles.formLabelSmall}>Year</TextComponent>
                                    <SelectComponent
                                        items={Array.from({ length: 10 }, (_, i) => ({
                                            label: String(new Date().getFullYear() + i),
                                            value: String(new Date().getFullYear() + i),
                                        }))}
                                        onValueChange={(val) => setYear(Number(val))}
                                        selectedValue={String(year)}
                                        placeholder="Select Year"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <View>
                                <TextComponent style={styles.formLabel}>
                                    Current Pricing Type: {pricingType.charAt(0).toUpperCase() + pricingType.slice(1)}
                                </TextComponent>
                                <View style={{ marginTop: 8 }}>
                                    <SelectComponent
                                        items={getAvailablePricingPlans()}
                                        onValueChange={(val) => setPricingType(val as typeof pricingType)}
                                        selectedValue={pricingType}
                                        placeholder="Select pricing type"
                                    />
                                </View>
                            </View>
                        </View>

                        <View>
                            <TextComponent style={styles.summaryText}>
                                Base Rate: ₱{getCurrentRate().toFixed(2)}/
                                {pricingType === "hourly" ? "hour" : pricingType === "daily" ? "day" : "month"}{" "}
                                {transactionCheckoutInfo?.slot_info.is_premium && (
                                    <TextComponent style={styles.premiumText}>(Premium Slot)</TextComponent>
                                )}
                            </TextComponent>
                            <View style={styles.summaryRow}>
                                <TextComponent style={styles.summaryLabel}>Duration:</TextComponent>
                                <TextComponent style={styles.summaryValue}>
                                    {duration}{" "}
                                    {pricingType === "hourly" ? "hours" : pricingType === "daily" ? "days" : "months"}
                                </TextComponent>
                            </View>
                            <View style={styles.summaryRow}>
                                <TextComponent bold variant="h6">
                                    Total Amount:
                                </TextComponent>
                                <TextComponent>₱{totalPrice.toFixed(2)}</TextComponent>
                            </View>
                        </View>

                        <CheckboxComponent
                            onValueChange={setAgreed}
                            value={agreed}
                            placeholder="I agree to the parking terms and conditions, including the cancellation policy."
                        />

                        <CheckboxComponent
                            value={terms}
                            onValueChange={setTerms}
                            placeholder="I also agree that the establishment has the right to charge me for any damages
                        incurred during my stay if the establishment can prove that I am responsible."
                        />
                        <View style={{ alignSelf: "flex-end" }}>
                            <ButtonComponent
                                style={styles.confirmButton}
                                title={
                                    transactionCheckoutInfo?.has_ongoing_transaction
                                        ? "You have an ongoing transaction"
                                        : isSubmitting
                                          ? "Confirming..."
                                          : "Confirm Booking"
                                }
                                disabled={
                                    transactionCheckoutInfo?.has_ongoing_transaction ||
                                    isSubmitting ||
                                    !agreed ||
                                    !terms ||
                                    duration <= 0 ||
                                    transactionCheckoutInfo?.slot_info.slot_status !== "open"
                                }
                                onPress={() => {
                                    handleConfirmBooking().then();
                                }}
                            />
                        </View>
                    </CardComponent>
                </>
            )}
        </ResponsiveContainer>
    );
};

export default SlotInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    backLink: {
        marginTop: 16,
        marginBottom: 16,
        alignSelf: "flex-start",
        paddingHorizontal: 16,
    },
    backLinkText: {
        color: "#3b82f6",
        fontSize: 16,
    },
    card: {
        backgroundColor: "#ffffff",
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 4,
    },
    paragraph: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: 2,
    },
    smallText: {
        fontSize: 12,
    },
    infoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    infoBlock: {
        flex: 1,
    },
    subheading: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 4,
    },
    formRow: {
        marginBottom: 16,
    },
    formLabel: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: "#374151",
    },
    planOption: {
        backgroundColor: "#ffffff",
        marginVertical: 4,
        paddingVertical: 6,
        borderRadius: 4,
        borderColor: "#d1d5db",
        borderWidth: 1,
    },
    planOptionSelected: {
        backgroundColor: "#4f46e5",
        borderColor: "#4f46e5",
    },
    formLabelSmall: {
        fontSize: 14,
    },
    summaryText: {
        fontSize: 14,
        color: "#6b7280",
    },
    premiumText: {
        color: "#ca8a04",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
    },
    summaryLabel: {
        color: "#6b7280",
        fontSize: 14,
    },
    summaryValue: {
        color: "#374151",
        fontSize: 14,
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    checkbox: {
        marginRight: 8,
        marginTop: 3,
    },
    checkboxSquare: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderColor: "#d1d5db",
        borderWidth: 1,
        backgroundColor: "#ffffff",
    },
    checkboxSelected: {
        backgroundColor: "#4f46e5",
        borderColor: "#4f46e5",
    },
    checkboxLabel: {
        flex: 1,
        fontSize: 14,
        color: "#6b7280",
    },
    confirmButton: {
        marginVertical: 16,
    },
    confirmButtonText: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "600",
    },
    disabledButton: {
        backgroundColor: "#9ca3af",
    },
});
