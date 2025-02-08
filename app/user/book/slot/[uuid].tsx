import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Address } from "@/lib/models/address";
import { ParkingEstablishment } from "@/lib/models/parking-establishment";
import { OperatingHour } from "@/lib/models/operating-hour";
import { PaymentMethod } from "@/lib/models/payment-method";
import { PricingPlan } from "@/lib/models/pricing-plan";
import { ParkingSlot } from "@/lib/models/parking-slot";
import { useLocalSearchParams } from "expo-router";
import LinkComponent from "@/components/LinkComponent";
import CardComponent from "@/components/CardComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@/components/TextComponent";
import TextInputComponent from "@/components/TextInputComponent";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import SelectComponent from "@/components/SelectComponent";
import CheckboxComponent from "@/components/CheckboxComponent";

interface Slot extends ParkingSlot {
    vehicle_type_code: string;
    vehicle_type_name: string;
    vehicle_type_size: string;
}
interface TransactionCheckoutData {
    address: Address;
    establishment_info: ParkingEstablishment;
    operating_hours: OperatingHour[];
    payment_methods: PaymentMethod;
    pricing_plans: PricingPlan[];
    slot_info: Slot;
    has_ongoing_transaction: boolean;
}

const SlotInfo = () => {
    const { slot_uuid } = useLocalSearchParams();
    console.log(slot_uuid);
    const [establishmentUuid, setEstablishmentUuid] = useState("");
    const transactionCheckoutData: TransactionCheckoutData = {
        address: {
            street: "123 Main Street",
            city: "Makati",
            province: "Metro Manila",
            postal_code: "1200",
            barangay: "Barangay 123",
            address_id: 1,
            created_at: "2021-10-01T00:00:00Z",
            updated_at: "2021-10-01T00:00:00Z",
            profile_id: 1,
        },
        establishment_info: {
            uuid: "establishment-uuid",
            name: "Sample Parking Establishment",
            access_info: "Sample access info",
            accessibility: "Sample accessibility",
            created_at: "2021-10-01T00:00:00Z",
            custom_access: "Sample custom access",
            establishment_id: 1,
            custom_layout: "Sample custom layout",
            dimensions: "Sample dimensions",
            facilities: "Sample facilities",
            is24_7: false,
            latitude: 14.5547,
            lighting: "Sample lighting",
            longitude: 121.0244,
            nearby_landmarks: "Sample landmarks",
            profile_id: 1,
            space_layout: "Sample layout",
            space_type: "Sample type",
            updated_at: "2021-10-01T00:00:00Z",
            verified: false,
        },
        operating_hours: [
            {
                day_of_week: "Monday",
                is_enabled: true,
                opening_time: "07:00",
                closing_time: "22:00",
                establishment_id: 1,
                hours_id: 1,
            },
            // ... more days ...
        ],
        payment_methods: {
            accepts_cash: true,
            accepts_mobile: true,
            accepts_other: true,
            other_methods: "Credit Card",
            created_at: "2021-10-01T00:00:00Z",
            establishment_id: 1,
            method_id: 1,
            updated_at: "2021-10-01T00:00:00Z",
        },
        pricing_plans: [
            {
                rate: "50",
                rate_type: "hourly",
                is_enabled: true,
                created_at: "2021-10-01T00:00:00Z",
                establishment_id: 1,
                plan_id: 1,
                updated_at: "2021-10-01T00:00:00Z",
            },
            {
                rate: "1000",
                rate_type: "daily",
                is_enabled: true,
                created_at: "2021-10-01T00:00:00Z",
                establishment_id: 1,
                plan_id: 1,
                updated_at: "2021-10-01T00:00:00Z",
            },
            {
                rate: "5000",
                rate_type: "monthly",
                is_enabled: true,
                created_at: "2021-10-01T00:00:00Z",
                establishment_id: 1,
                plan_id: 1,
                updated_at: "2021-10-01T00:00:00Z",
            },
        ],
        slot_info: {
            slot_code: "SLOT-001",
            floor_level: 3,
            is_premium: true,
            vehicle_type_code: "SUV",
            vehicle_type_name: "Sport Utility Vehicle",
            vehicle_type_size: "Large",
            created_at: "2021-10-01T00:00:00Z",
            establishment_id: 1,
            is_active: true,
            slot_features: "standard",
            slot_id: 1,
            slot_status: "open",
            updated_at: "2021-10-01T00:00:00Z",
            uuid: "slot-uuid",
            vehicle_type_id: 1,
            base_price_per_day: "1000",
            base_price_per_hour: "50",
            base_price_per_month: "5000",
            price_multiplier: "1.5",
        },
        has_ongoing_transaction: false,
    };
    const [agreed, setAgreed] = useState(false);
    const [terms, setTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [duration, setDuration] = useState(0);
    const [pricingType, setPricingType] = useState<"hourly" | "daily" | "monthly">("hourly");
    const [totalPrice, setTotalPrice] = useState(0);

    const validPricingPlans = transactionCheckoutData.pricing_plans.filter((plan) => plan.is_enabled);

    const updateTotalPrice = (newDuration: number, newPricingType: typeof pricingType) => {
        const plan = validPricingPlans.find((p) => p.rate_type === newPricingType);
        if (!plan) {
            setTotalPrice(0);
            return;
        }

        let rate = parseFloat(plan.rate);
        rate *= parseFloat(transactionCheckoutData.slot_info.base_price_per_day);
        if (transactionCheckoutData.slot_info.is_premium) {
            // Add 20% for premium
            rate *= 1.2;
        }

        let total = 0;
        if (newPricingType === "hourly") {
            total = newDuration * rate;
        } else if (newPricingType === "daily") {
            total = Math.ceil(newDuration / 24) * rate;
        } else if (newPricingType === "monthly") {
            total = Math.ceil(newDuration / (24 * 30)) * rate;
        }
        setTotalPrice(total);
    };

    useEffect(() => {
        updateTotalPrice(duration, pricingType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration, pricingType]);

    // Simulate form submission
    const handleConfirmBooking = () => {
        setIsSubmitting(true);
        // Mock some async operation
        setTimeout(() => {
            setIsSubmitting(false);
            if (!transactionCheckoutData.has_ongoing_transaction) {
                alert("Booking confirmed!");
                // Normally, navigate to '/user/transactions'
            } else {
                alert("You have an ongoing transaction already.");
            }
        }, 1500);
    };

    return (
        <ResponsiveContainer>
            <LinkComponent href={`../../../user/book/${establishmentUuid}`} style={styles.backLink}>
                ← Back to Dashboard
            </LinkComponent>

            <CardComponent
                customStyles={styles.card}
                header="Confirm Your Booking"
                subHeader="Please review your booking details below"
            ></CardComponent>

            <CardComponent
                customStyles={styles.card}
                header="Slot Information"
                subHeader={transactionCheckoutData.slot_info.slot_code}
            >
                <View style={styles.infoGrid}>
                    <View style={styles.infoBlock}>
                        <TextComponent style={styles.subheading}>Establishment Details</TextComponent>
                        <TextComponent style={styles.paragraph}>
                            {transactionCheckoutData.establishment_info.name}
                        </TextComponent>
                        <TextComponent style={styles.paragraph}>
                            {transactionCheckoutData.address.street} {transactionCheckoutData.address.city},{" "}
                            {transactionCheckoutData.address.province} {transactionCheckoutData.address.postal_code}
                        </TextComponent>
                        <TextComponent style={[styles.paragraph, styles.smallText]}>
                            Base Rate: ₱{validPricingPlans.find((plan) => plan.rate_type === "hourly")?.rate}
                            /hour
                        </TextComponent>
                    </View>

                    <View style={styles.infoBlock}>
                        <TextComponent style={styles.subheading}>Slot Information</TextComponent>
                        <TextComponent style={styles.paragraph}>
                            Slot Code: {transactionCheckoutData.slot_info.slot_code}
                        </TextComponent>
                        <TextComponent style={styles.paragraph}>
                            Floor Level: {transactionCheckoutData.slot_info.floor_level}
                        </TextComponent>
                        <TextComponent style={styles.paragraph}>
                            Vehicle Type: {transactionCheckoutData.slot_info.vehicle_type_name}
                        </TextComponent>
                    </View>
                </View>
            </CardComponent>

            {/* Booking Form */}
            <View style={styles.card}>
                {/* Duration */}
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

                {/* Pricing Type */}
                <View style={styles.formRow}>
                    <TextComponent style={styles.formLabel}>Pricing Type</TextComponent>
                    <View style={styles.selectBox}>
                        <TextComponent style={styles.formLabel}>
                            Current: {pricingType.charAt(0).toUpperCase() + pricingType.slice(1)}
                        </TextComponent>
                        <View style={{ marginTop: 8 }}>
                            <SelectComponent
                                items={[
                                    { label: "Hourly", value: "hourly" },
                                    { label: "Daily", value: "daily" },
                                    { label: "Monthly", value: "monthly" },
                                ]}
                                onValueChange={(val) => setPricingType(val as typeof pricingType)}
                                selectedValue={pricingType}
                            />
                        </View>
                    </View>
                </View>

                {/* Pricing Summary */}
                <View>
                    <TextComponent style={styles.summaryText}>
                        Base Rate: ₱
                        {(
                            parseFloat(validPricingPlans.find((plan) => plan.rate_type === "hourly")?.rate ?? "0") *
                            parseFloat(transactionCheckoutData.slot_info.price_multiplier) *
                            (transactionCheckoutData.slot_info.is_premium ? 1.2 : 1)
                        ).toFixed(2)}
                        /hour{" "}
                        {transactionCheckoutData.slot_info.is_premium && (
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
                    <View style={styles.divider} />
                    <View style={styles.summaryRow}>
                        <TextComponent style={[styles.summaryLabel, { fontWeight: "600" }]}>
                            Total Amount:
                        </TextComponent>
                        <TextComponent style={[styles.summaryValue, { fontWeight: "600" }]}>
                            ₱{totalPrice.toFixed(2)}
                        </TextComponent>
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

                {/* Confirm Booking Button */}
                <Pressable
                    style={[styles.confirmButton, (!agreed || !terms || duration <= 0) && styles.disabledButton]}
                    disabled={!agreed || !terms || duration <= 0 || transactionCheckoutData.has_ongoing_transaction}
                    onPress={handleConfirmBooking}
                >
                    {transactionCheckoutData.has_ongoing_transaction ? (
                        <TextComponent style={styles.confirmButtonText}>You have an ongoing transaction.</TextComponent>
                    ) : isSubmitting ? (
                        <>
                            <LoadingComponent text="Confirming..." />
                            <TextComponent style={[styles.confirmButtonText, { marginLeft: 8 }]}>
                                Confirming...
                            </TextComponent>
                        </>
                    ) : (
                        <TextComponent style={styles.confirmButtonText}>Confirm Booking</TextComponent>
                    )}
                </Pressable>
            </View>
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
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: "#374151",
    },
    selectBox: {
        backgroundColor: "#f9fafb",
        borderColor: "#d1d5db",
        borderWidth: 1,
        borderRadius: 4,
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
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        marginVertical: 8,
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
        flexDirection: "row",
        backgroundColor: "#4f46e5",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
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
