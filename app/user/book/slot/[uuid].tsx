import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { Address } from "@/lib/models/address";
import { ParkingEstablishment } from "@/lib/models/parking-establishment";
import { OperatingHour } from "@/lib/models/operating-hour";
import { PaymentMethod } from "@/lib/models/payment-method";
import { PricingPlan } from "@/lib/models/pricing-plan";
import { ParkingSlot } from "@/lib/models/parking-slot";

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

// Define component
const SlotInfo = () => {
    // ----------------------------------------------------------------------------
    // Mock data for demonstration. Replace this with real data fetched via props
    // or any other data source.
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
            slot_multiplier: 1.5,
            vehicle_type_code: "SUV",
            vehicle_type_name: "Sport Utility Vehicle",
            vehicle_type_size: "Large",
            base_rate: 50,
            created_at: "2021-10-01T00:00:00Z",
            establishment_id: 1,
            is_active: true,
            slot_features: "standard",
            slot_id: 1,
            slot_status: "open",
            updated_at: "2021-10-01T00:00:00Z",
            uuid: "slot-uuid",
            vehicle_type_id: 1,
        },
        has_ongoing_transaction: false,
    };
    // ----------------------------------------------------------------------------

    // Local State
    const [agreed, setAgreed] = useState(false);
    const [terms, setTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [duration, setDuration] = useState(0);
    const [pricingType, setPricingType] = useState<"hourly" | "daily" | "monthly">("hourly");
    const [totalPrice, setTotalPrice] = useState(0);

    // Extract valid pricing plans (is_enabled)
    const validPricingPlans = transactionCheckoutData.pricing_plans.filter((plan) => plan.is_enabled);

    // Helper function to compute total price
    const updateTotalPrice = (newDuration: number, newPricingType: typeof pricingType) => {
        const plan = validPricingPlans.find((p) => p.rate_type === newPricingType);
        if (!plan) {
            setTotalPrice(0);
            return;
        }

        let rate = parseFloat(plan.rate);
        rate *= transactionCheckoutData.slot_info.slot_multiplier;
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

    // Whenever duration or pricingType changes, recalc total
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

    // ----------------------------------------------------------------------------
    // Rendering
    // ----------------------------------------------------------------------------
    return (
        <ScrollView style={styles.container}>
            {/* Back to Dashboard link */}
            <Pressable
                onPress={() => {
                    /* Navigate back */
                }}
                style={styles.backLink}
            >
                <Text style={styles.backLinkText}>← Back to Dashboard</Text>
            </Pressable>

            {/* Heading */}
            <View style={styles.card}>
                <Text style={styles.title}>Confirm Your Booking</Text>
                <Text style={styles.paragraph}>Please review your booking details below</Text>
            </View>

            {/* Establishment & Slot Info */}
            <View style={styles.card}>
                <View style={styles.infoGrid}>
                    {/* Establishment Details */}
                    <View style={styles.infoBlock}>
                        <Text style={styles.subheading}>Establishment Details</Text>
                        <Text style={styles.paragraph}>{transactionCheckoutData.establishment_info.name}</Text>
                        <Text style={styles.paragraph}>
                            {transactionCheckoutData.address.street} {transactionCheckoutData.address.city},{" "}
                            {transactionCheckoutData.address.province} {transactionCheckoutData.address.postal_code}
                        </Text>
                        <Text style={[styles.paragraph, styles.smallText]}>
                            Base Rate: ₱{validPricingPlans.find((plan) => plan.rate_type === "hourly")?.rate}
                            /hour
                        </Text>
                    </View>

                    {/* Slot Information */}
                    <View style={styles.infoBlock}>
                        <Text style={styles.subheading}>Slot Information</Text>
                        <Text style={styles.paragraph}>Slot Code: {transactionCheckoutData.slot_info.slot_code}</Text>
                        <Text style={styles.paragraph}>
                            Floor Level: {transactionCheckoutData.slot_info.floor_level}
                        </Text>
                        <Text style={styles.paragraph}>
                            Vehicle Type: {transactionCheckoutData.slot_info.vehicle_type_name}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Booking Form */}
            <View style={styles.card}>
                {/* Duration */}
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>
                        Parking Duration{" "}
                        {pricingType === "hourly"
                            ? "(in hours)"
                            : pricingType === "daily"
                            ? "(in days)"
                            : "(in months)"}
                    </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        value={String(duration)}
                        onChangeText={(val) => setDuration(Number(val))}
                        placeholder="0"
                    />
                </View>

                {/* Pricing Type */}
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Pricing Type</Text>
                    <View style={styles.selectBox}>
                        {/* We replicate a simple select approach by listing valid plans in separate Pressables.
                For a real app, you might use a Picker or custom dropdown. */}
                        <Text style={styles.formLabel}>
                            Current: {pricingType.charAt(0).toUpperCase() + pricingType.slice(1)}
                        </Text>
                        <View style={{ marginTop: 8 }}>
                            {validPricingPlans.map((plan) => (
                                <Pressable
                                    key={plan.rate_type}
                                    onPress={() => setPricingType(plan.rate_type as typeof pricingType)}
                                    style={[
                                        styles.planOption,
                                        plan.rate_type === pricingType && styles.planOptionSelected,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.formLabelSmall,
                                            { color: plan.rate_type === pricingType ? "#ffffff" : "#374151" },
                                        ]}
                                    >
                                        {plan.rate_type.charAt(0).toUpperCase() + plan.rate_type.slice(1)}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Pricing Summary */}
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryText}>
                        Base Rate: ₱
                        {(
                            parseFloat(validPricingPlans.find((plan) => plan.rate_type === "hourly")?.rate ?? "0") *
                            transactionCheckoutData.slot_info.slot_multiplier *
                            (transactionCheckoutData.slot_info.is_premium ? 1.2 : 1)
                        ).toFixed(2)}
                        /hour{" "}
                        {transactionCheckoutData.slot_info.is_premium && (
                            <Text style={styles.premiumText}>(Premium Slot)</Text>
                        )}
                    </Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Duration:</Text>
                        <Text style={styles.summaryValue}>
                            {duration}{" "}
                            {pricingType === "hourly" ? "hours" : pricingType === "daily" ? "days" : "months"}
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { fontWeight: "600" }]}>Total Amount:</Text>
                        <Text style={[styles.summaryValue, { fontWeight: "600" }]}>₱{totalPrice.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Confirmation Checkboxes */}
                <View style={styles.checkboxRow}>
                    <Pressable onPress={() => setAgreed(!agreed)} style={styles.checkbox}>
                        <View style={[styles.checkboxSquare, agreed && styles.checkboxSelected]} />
                    </Pressable>
                    <Text style={styles.checkboxLabel}>
                        I agree to the parking terms and conditions, including the cancellation policy.
                    </Text>
                </View>

                <View style={styles.checkboxRow}>
                    <Pressable onPress={() => setTerms(!terms)} style={styles.checkbox}>
                        <View style={[styles.checkboxSquare, terms && styles.checkboxSelected]} />
                    </Pressable>
                    <Text style={styles.checkboxLabel}>
                        I agree that the price indicated here is final regardless if I used the parking slot for a
                        shorter duration. I also agree that the establishment has the right to charge me for any damages
                        incurred during my stay if the establishment can prove that I am responsible.
                    </Text>
                </View>

                {/* Confirm Booking Button */}
                <Pressable
                    style={[styles.confirmButton, (!agreed || !terms || duration <= 0) && styles.disabledButton]}
                    disabled={!agreed || !terms || duration <= 0 || transactionCheckoutData.has_ongoing_transaction}
                    onPress={handleConfirmBooking}
                >
                    {transactionCheckoutData.has_ongoing_transaction ? (
                        <Text style={styles.confirmButtonText}>You have an ongoing transaction.</Text>
                    ) : isSubmitting ? (
                        <>
                            <ActivityIndicator size="small" color="#ffffff" />
                            <Text style={[styles.confirmButtonText, { marginLeft: 8 }]}>Confirming...</Text>
                        </>
                    ) : (
                        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
                    )}
                </Pressable>
            </View>
        </ScrollView>
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
        shadowColor: "#000",
        elevation: 2,
        marginHorizontal: 16,
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
        borderColor: "#d1d5db",
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
        padding: 8,
    },
    planOption: {
        backgroundColor: "#ffffff",
        marginVertical: 4,
        paddingVertical: 6,
        paddingHorizontal: 8,
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
    summaryContainer: {
        backgroundColor: "#f3f4f6",
        padding: 12,
        borderRadius: 6,
        marginBottom: 16,
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
