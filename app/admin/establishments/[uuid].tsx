import { ScrollView, StyleSheet, View } from "react-native";
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
import { getEstablishment } from "@/lib/api/admin";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import LinkComponent from "@/components/LinkComponent";

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
    const { uuid } = useLocalSearchParams() as { uuid: string };
    const [establishment, setEstablishment] = useState<Establishment | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEstablishment = async () => {
            const response = await getEstablishment(uuid);
            setEstablishment(response.data.data);
            setIsLoading(false);
        };
        fetchEstablishment();
    });

    return (
        <ResponsiveContainer>
            {/* Header Section */}
            <LinkComponent
                label="← Back to Dashboard"
                style={{ width: "auto", marginBottom: 16 }}
                href="../../admin/establishments"
            />
            <View style={styles.header}>
                <TextComponent style={styles.title}>Establishment Name</TextComponent>
                <TextComponent style={styles.subtitle}>Review and manage this parking establishment</TextComponent>
            </View>

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
                {/* <CardComponent
                    header="Establishment Information"
                    subHeader="Review and manage this parking establishment"
                >
                    <View style={{ gap: 16 }}>
                        <View>
                            <TextComponent style={styles.label}>Applicant Name</TextComponent>
                            <TextComponent style={styles.value}>
                                {establishment.user.first_name} {establishment.user.last_name}
                            </TextComponent>
                        </View>
                        <View>
                            <TextComponent style={styles.label}>Email Address</TextComponent>
                            <TextComponent style={styles.value}>{establishment.user.email}</TextComponent>
                        </View>
                        <View>
                            <TextComponent style={styles.label}>Phone Number</TextComponent>
                            <TextComponent style={styles.value}>{establishment.user.phone_number}</TextComponent>
                        </View>
                    </View>
                </CardComponent>

                <View style={styles.card}>
                    <TextComponent style={styles.cardTitle}>Company Profile</TextComponent>
                    <View style={styles.cardContent}>
                        <View style={styles.field}>
                            <TextComponent style={styles.label}>Company Name</TextComponent>
                            <TextComponent style={styles.value}>Company ABC</TextComponent>
                        </View>
                    </View>
                </View> */}

                {/* Add other sections similarly */}
            </View>
        </ResponsiveContainer>
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
