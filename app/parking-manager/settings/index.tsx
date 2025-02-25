import ButtonComponent from "@/components/ButtonComponent";
import CardComponent from "@/components/CardComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@/components/TextComponent";
import TextInputComponent from "@/components/TextInputComponent";
import { logoutCurrentUser } from "@/lib/credentialsManager";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { getProfile } from "@lib/api/parkingManager";
import { type User } from "@lib/models/user";
import { type Address } from "@lib/models/address";
import { type CompanyProfile } from "@lib/models/companyProfile";
import { type ParkingEstablishment } from "@lib/models/parkingEstablishment";
import LoadingComponent from "@components/reusable/LoadingComponent";
import LinkComponent from "@components/LinkComponent";

export default function Settings() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<User | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
    const [parkingEstablishment, setParkingEstablishment] = useState<ParkingEstablishment | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try {
                const res = await getProfile();
                const data = res.data.data;
                setUserData(data.user);
                setAddress(data.address);
                setCompanyProfile(data.company_profile);
                setParkingEstablishment(data.parking_establishment);
            } catch {
                alert("Error fetching user data.");
            } finally {
                setLoading(false);
            }
        };
        getUserData().then();
    }, []);

    const handleSave = () => {
        setIsUpdating(true);
        setTimeout(() => {
            setIsUpdating(false);
            alert("Changes saved successfully!");
        }, 2000);
    };

    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent
                    label="← Back to Dashboard"
                    style={{ width: "auto", marginBottom: 16 }}
                    href="../../parking-manager"
                    variant="outline"
                />
            </View>
            <View style={styles.header}>
                <TextComponent bold variant="h1">
                    Account Settings
                </TextComponent>
                <TextComponent style={styles.subtitle}>Manage your account information and preferences</TextComponent>
            </View>
            {loading && <LoadingComponent text="Fetching user data..." />}
            {userData && (
                <CardComponent header="User Information" customStyles={styles.card}>
                    <View style={styles.grid}>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">First Name</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={userData.first_name}
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Middle Name</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={userData.middle_name}
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Last Name</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={userData.last_name}
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Email Address</TextComponent>
                            <TextInputComponent customStyles={styles.input} value={userData.email} editable={false} />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Phone Number</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={userData.phone_number}
                                editable={false}
                            />
                        </View>
                    </View>
                </CardComponent>
            )}

            {address && (
                <CardComponent header="Address Information" customStyles={styles.card}>
                    <View style={styles.grid}>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Street</TextComponent>
                            <TextInputComponent customStyles={styles.input} value={address.street} editable={false} />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">City</TextComponent>
                            <TextInputComponent customStyles={styles.input} value={address.city} editable={false} />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Province</TextComponent>
                            <TextInputComponent customStyles={styles.input} value={address.province} editable={false} />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Postal Code</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={address.postal_code}
                                editable={false}
                            />
                        </View>
                    </View>
                </CardComponent>
            )}

            {companyProfile && (
                <CardComponent header="Company Profile" customStyles={styles.card}>
                    <View style={styles.grid}>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Company Name</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={companyProfile.company_name}
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Registration Number</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={companyProfile.company_reg_number}
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">TIN</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={companyProfile.tin}
                                editable={false}
                            />
                        </View>
                    </View>
                </CardComponent>
            )}

            {parkingEstablishment && (
                <CardComponent header="Parking Establishment" customStyles={styles.card}>
                    <View style={styles.grid}>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Name</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={parkingEstablishment.name}
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Dimensions</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={parkingEstablishment.dimensions}
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Facilities</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={parkingEstablishment.facilities}
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent variant="caption">Nearby Landmarks</TextComponent>
                            <TextInputComponent
                                customStyles={styles.input}
                                value={parkingEstablishment.nearby_landmarks}
                                editable={false}
                            />
                        </View>
                    </View>
                </CardComponent>
            )}
            <View style={{ flexDirection: "column", justifyContent: "space-between", alignSelf: "flex-end" }}>
                <ButtonComponent
                    style={styles.button}
                    onPress={handleSave}
                    disabled={isUpdating}
                    title={isUpdating ? "Saving..." : "Save Changes"}
                />
                <ButtonComponent onPress={() => logoutCurrentUser()} title="Logout" variant="destructive" />
            </View>
        </ResponsiveContainer>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        marginBottom: 24,
    },
    header: {
        width: "100%",
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: 4,
    },
    grid: {
        gap: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: "#374151",
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 6,
        padding: 8,
        fontSize: 14,
        color: "#111827",
    },
    disabledInput: {
        backgroundColor: "#f3f4f6",
    },
    button: {
        backgroundColor: "#4f46e5",
        padding: 12,
        marginVertical: 16,
        borderRadius: 6,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "500",
    },
});
