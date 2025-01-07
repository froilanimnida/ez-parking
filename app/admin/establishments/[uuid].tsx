import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import type { CompanyProfile } from "@/lib/models/company-profile";
import type { OperatingHour } from "@/lib/models/operating-hour";
import type { ParkingEstablishment } from "@/lib/models/parking-establishment";
import type { ParkingSlot } from "@/lib/models/parking-slot";
import type { PricingPlan } from "@/lib/models/pricing-plan";
import type { PaymentMethod } from "@/lib/models/payment-method";
import type { EstablishmentDocument } from "@/lib/models/establishment-document";
import type { User } from "@/lib/models/user";
import type { VehicleType } from "@/lib/models/vehicle-types";
import { SLOT_FEATURES, SLOT_STATUS } from "@/lib/types/models/common/constants";
import CardComponent from "@/components/CardComponent";
import TextComponent from "@/components/TextComponent";
import { useLocalSearchParams } from "expo-router";
import axiosInstance from "@/lib/axiosInstance";

interface Establishment {
    company_profile: CompanyProfile;
    establishment_documents: EstablishmentDocument[];
    operating_hours: OperatingHour[];
    parking_establishment: ParkingEstablishment;
    payment_methods: PaymentMethod[];
    pricing_plans: PricingPlan[];
    slots: ParkingSlot[];
    user: User;
}

const EstablishmentDetails = () => {
    const { uuid } = useLocalSearchParams();
    const [showAddSlotModal, setShowAddSlotModal] = useState(false);
    let establishment: Establishment = {};

    useEffect(() => {
        axiosInstance.get(`establishment_uuid=${uuid}`);
    });

    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TextComponent style={styles.title}>Establishment Name</TextComponent>
                <TextComponent style={styles.subtitle}>Review and manage this parking establishment</TextComponent>
            </View>

            {/* Grid Layout */}
            <View style={styles.grid}>
                {/* Applicant Information */}
                {/* <View style={styles.card}>
                    <Text style={styles.cardTitle}>Applicant Information</Text>
                    <View style={styles.cardContent}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Applicant Name</Text>
                            <Text style={styles.value}>John Doe</Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Email Address</Text>
                            <Text style={styles.value}>john@example.com</Text>
                        </View>
                    </View>
                </View> */}
                <CardComponent
                    header="Establishment Information"
                    subHeader="Review and manage this parking establishment"
                >
                    <View style={{ gap: 16 }}>
                        <View>
                            <Text style={styles.label}>Applicant Name</Text>
                            <Text style={styles.value}>
                                {establishment.user.first_name} {establishment.user.last_name}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Email Address</Text>
                            <Text style={styles.value}>{establishment.user.email}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Phone Number</Text>
                            <Text style={styles.value}>{establishment.user.phone_number}</Text>
                        </View>
                    </View>
                </CardComponent>

                {/* Company Profile */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Company Profile</Text>
                    <View style={styles.cardContent}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Company Name</Text>
                            <Text style={styles.value}>Company ABC</Text>
                        </View>
                    </View>
                </View>

                {/* Add other sections similarly */}
            </View>
        </ScrollView>
    );
};

export default EstablishmentDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    header: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#111827",
    },
    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 4,
    },
    grid: {
        padding: 16,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 16,
    },
    cardContent: {
        gap: 16,
    },
    field: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 4,
    },
    value: {
        fontSize: 14,
        color: "#111827",
    },
});
