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
            } catch {
                alert("An error occurred");
            } finally {
                setIsLoading(false);
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
            <CardComponent header="Establishment Details" subHeader="Review and manage this parking establishment">
                <TextComponent>
                    View and manage the details of this parking establishment. You can also review the documents
                    submitted by the applicant.
                </TextComponent>
            </CardComponent>
            {isLoading && <LoadingComponent text="Loading establishment details..." />}
            {!isLoading && establishment && (
                <View style={styles.grid}>
                    <CardComponent header="User Information">
                        <View style={styles.cardContent}>
                            <View style={styles.field}>
                                <TextComponent variant="label">User Identifier</TextComponent>
                                <TextComponent variant="body">{establishment.user.uuid}</TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent variant="label">User Name</TextComponent>
                                <TextComponent variant="body">
                                    {establishment.user.first_name} {establishment.user.last_name}
                                </TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent variant="label">Contact Information</TextComponent>
                                <TextComponent variant="body">{establishment.user.email}</TextComponent>
                                <TextComponent variant="body">{establishment.user.phone_number}</TextComponent>
                            </View>
                        </View>
                    </CardComponent>
                    <CardComponent header="Company Profile">
                        <View style={styles.cardContent}>
                            <View style={styles.field}>
                                <TextComponent variant="label">Company Name</TextComponent>
                                <TextComponent variant="body">
                                    {establishment.company_profile.company_name}
                                </TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent variant="label">Registration Number</TextComponent>
                                <TextComponent variant="body">
                                    {establishment.company_profile.company_reg_number}
                                </TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent variant="label">TIN</TextComponent>
                                <TextComponent variant="body">{establishment.company_profile.tin}</TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent variant="label">Owner Type</TextComponent>
                                <TextComponent variant="body">{establishment.company_profile.owner_type}</TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent variant="label">Profile ID</TextComponent>
                                <TextComponent variant="body">{establishment.company_profile.profile_id}</TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent variant="label">Created At</TextComponent>
                                <TextComponent variant="body">{establishment.company_profile.created_at}</TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent variant="label">Updated At</TextComponent>
                                <TextComponent variant="body">{establishment.company_profile.updated_at}</TextComponent>
                            </View>
                        </View>
                    </CardComponent>
                    <CardComponent
                        header="Establishment Information"
                        subHeader="Review and manage this parking establishment"
                    >
                        <View style={styles.cardContent}>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Establishment Name
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.name}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Access Info
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.access_info}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Accessibility
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.accessibility}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Custom Access
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.custom_access}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Custom Layout
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.custom_layout}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Dimensions
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.dimensions}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Facilities
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.facilities}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    24/7 Availability
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.is24_7 ? "Yes" : "No"}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Latitude
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.latitude}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Longitude
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.longitude}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Lighting
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.lighting}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Nearby Landmarks
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.nearby_landmarks}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Space Layout
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.space_layout}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Space Type
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.space_type}
                                </TextComponent>
                            </View>
                            <View>
                                <TextComponent variant="label" style={styles.label}>
                                    Verified
                                </TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.parking_establishment.verified ? "Yes" : "No"}
                                </TextComponent>
                            </View>
                        </View>
                    </CardComponent>

                    <CardComponent header="Operating Hours">
                        <TextComponent style={styles.cardTitle}>Operating Hours</TextComponent>
                        <View style={styles.cardContent}>
                            {establishment.operating_hours.map((hour, index) => (
                                <View key={index} style={styles.field}>
                                    <TextComponent style={styles.label}>{hour.day_of_week}</TextComponent>
                                    <TextComponent style={styles.value}>
                                        {hour.is_enabled ? `${hour.opening_time} - ${hour.closing_time}` : "Closed"}
                                    </TextComponent>
                                </View>
                            ))}
                        </View>
                    </CardComponent>
                    <CardComponent header="Payment Methods">
                        <TextComponent style={styles.cardTitle}>Payment Methods</TextComponent>
                        <View style={styles.cardContent}>
                            <View style={styles.field}>
                                <TextComponent style={styles.label}>Accepts Cash</TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.payment_methods[0].accepts_cash ? "Yes" : "No"}
                                </TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent style={styles.label}>Accepts Mobile</TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.payment_methods[0].accepts_mobile ? "Yes" : "No"}
                                </TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent style={styles.label}>Accepts Other</TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.payment_methods[0].accepts_other ? "Yes" : "No"}
                                </TextComponent>
                            </View>
                            <View style={styles.field}>
                                <TextComponent style={styles.label}>Other Methods</TextComponent>
                                <TextComponent style={styles.value}>
                                    {establishment.payment_methods[0].other_methods}
                                </TextComponent>
                            </View>
                        </View>
                    </CardComponent>
                    {establishment.slots.map((slot) => (
                        <CardComponent key={slot.slot_id} header={`Slot Code: ${slot.slot_code}`}>
                            <View style={styles.cardContent}>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Slot ID</TextComponent>
                                    <TextComponent variant="body">{slot.slot_id}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">UUID</TextComponent>
                                    <TextComponent variant="body">{slot.uuid}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Vehicle Type ID</TextComponent>
                                    <TextComponent variant="body">{slot.vehicle_type_id}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Slot Status</TextComponent>
                                    <TextComponent variant="body">{slot.slot_status}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Is Active</TextComponent>
                                    <TextComponent variant="body">{slot.is_active ? "Yes" : "No"}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Slot Features</TextComponent>
                                    <TextComponent variant="body">{slot.slot_features}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Is Premium</TextComponent>
                                    <TextComponent variant="body">{slot.is_premium ? "Yes" : "No"}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Floor Level</TextComponent>
                                    <TextComponent variant="body">{slot.floor_level}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Created At</TextComponent>
                                    <TextComponent variant="body">{slot.created_at}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Updated At</TextComponent>
                                    <TextComponent variant="body">{slot.updated_at}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Base Price Per Hour</TextComponent>
                                    <TextComponent variant="body">{slot.base_price_per_hour}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Base Price Per Day</TextComponent>
                                    <TextComponent variant="body">{slot.base_price_per_day}</TextComponent>
                                </View>
                                <View style={styles.field}>
                                    <TextComponent variant="label">Base Price Per Month</TextComponent>
                                    <TextComponent variant="body">{slot.base_price_per_month}</TextComponent>
                                </View>
                                {slot.price_multiplier && (
                                    <View style={styles.field}>
                                        <TextComponent variant="label">Price Multiplier</TextComponent>
                                        <TextComponent variant="body">{slot.price_multiplier}</TextComponent>
                                    </View>
                                )}
                            </View>
                        </CardComponent>
                    ))}
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
