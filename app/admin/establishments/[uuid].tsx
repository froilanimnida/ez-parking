import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import type { CompanyProfile } from "@lib/models/companyProfile";
import type { OperatingHour } from "@lib/models/operatingHour";
import type { ParkingEstablishment } from "@lib/models/parkingEstablishment";
import type { ParkingSlot } from "@lib/models/parkingSlot";
import type { PaymentMethod } from "@lib/models/paymentMethod";
import type { EstablishmentDocument } from "@lib/models/establishmentDocument";
import type { User } from "@/lib/models/user";
import CardComponent from "@/components/CardComponent";
import TextComponent from "@/components/TextComponent";
import { useLocalSearchParams } from "expo-router";
import { getEstablishment } from "@/lib/api/admin";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import LinkComponent from "@/components/LinkComponent";
import type { AxiosError } from "axios";
import LoadingComponent from "@/components/reusable/LoadingComponent";

interface Establishment {
    company_profile: CompanyProfile;
    establishment_documents: EstablishmentDocument[];
    operating_hours: OperatingHour[];
    parking_establishment: ParkingEstablishment;
    payment_methods: PaymentMethod[];
    slots: ParkingSlot[];
    user: User;
}

const EstablishmentDetails = () => {
    const { uuid } = useLocalSearchParams() as { uuid: string };
    const [establishment, setEstablishment] = useState<Establishment | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEstablishment = async () => {
            try {
                const response = await getEstablishment(uuid);
                setEstablishment(response.data.data);
                setIsLoading(false);
            } catch (e: unknown) {
                const axiosError = e as AxiosError<ApiErrorResponse>;
                alert(axiosError.response?.data?.message || "An error occurred");
            }
        };
        fetchEstablishment().then();
    });

    return (
        <ResponsiveContainer>
            <LinkComponent
                label="← Back to Dashboard"
                style={{ width: "auto", marginBottom: 16 }}
                href="../../admin/establishments"
            />
            <View style={styles.header}>
                <TextComponent variant="h1" style={styles.title}>
                    Establishment Name
                </TextComponent>
                <TextComponent variant="h3" style={styles.subtitle}>
                    Review and manage this parking establishment
                </TextComponent>
            </View>
            {isLoading && <LoadingComponent text="Loading establishment details..." />}
            {!isLoading && establishment && (
                <View style={styles.grid}>
                    <CardComponent header="Applicant Information">
                        <View style={styles.cardContent}>
                            <View style={styles.field}>
                                <TextComponent style={styles.label}>Applicant Name</TextComponent>
                                <TextComponent style={styles.value}>John Doe</TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent style={styles.label}>Email Address</TextComponent>
                                <TextComponent style={styles.value}>john@example.com</TextComponent>
                            </View>
                        </View>
                    </CardComponent>
                    <CardComponent
                        header="Establishment Information"
                        subHeader="Review and manage this parking establishment"
                    >
                        <View style={{ gap: 16 }}>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Applicant Name
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.user.first_name} {establishment.user.last_name}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Email Address
                                </TextComponent>
                                <TextComponent style={styles.value}>{establishment.user.email}</TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Phone Number
                                </TextComponent>
                                <TextComponent style={styles.value}>{establishment.user.phone_number}</TextComponent>
                            </View>
                        </View>
                    </CardComponent>

                    <CardComponent header="Company Profile">
                        <TextComponent style={styles.cardTitle}>Company Profile</TextComponent>
                        <View style={styles.cardContent}>
                            <View style={styles.field}>
                                <TextComponent style={styles.label}>Company Name</TextComponent>
                                <TextComponent style={styles.value}>Company ABC</TextComponent>
                            </View>
                        </View>
                    </CardComponent>
                </View>
            )}
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
