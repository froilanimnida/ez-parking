import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, ScrollView } from "react-native";
import React, { useState } from "react";
import ButtonComponent from "@/components/ButtonComponent";
import LinkComponent from "@/components/LinkComponent";
import TextInputComponent from "@/components/TextInputComponent";
import CardComponent from "@/components/CardComponent";
import SelectComponent from "@/components/SelectComponent";
import TextComponent from "@/components/TextComponent";

const ParkingManagerSignUp = () => {
    const [ownerInformation, setOwnerInformation] = useState({
        ownerType: "individual",
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        email: "",
        contactNumber: "",
        tin: "",
        name: "",
        companyName: "",
        companyRegNumber: "",
    });
    const [addressData, setAddressData] = useState({
        address: {
            street: "",
            barangay: "",
            city: "",
            province: "",
            postalCode: "",
        },
        location: {
            latitude: 14.5995,
            longitude: 120.9842,
        },
        landmarks: "",
    });
    const handleInputChange = (key: string, value: string) => {
        setOwnerInformation({ ...ownerInformation, [key]: value });
    };

    const handleAddressChange = (field: string, value: string) => {
        setAddressData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value,
            },
        }));
    };

    const handleLocationSelect = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setAddressData((prev) => ({
            ...prev,
            location: { latitude, longitude },
        }));
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <SafeAreaView style={styles.body}>
                    <View style={styles.header}>
                        <TextComponent bold variant="h1">
                            Sign up as a Parking Manager
                        </TextComponent>
                        <TextComponent variant="body">Create an account to get started</TextComponent>
                    </View>
                    <View style={styles.formsContainer}>
                        <CardComponent
                            header="Owner Information"
                            subHeader="Enter your information below"
                            customStyles={{ width: "95%", maxWidth: 768 }}
                        >
                            <View style={styles.form}>
                                <SelectComponent
                                    items={[
                                        { label: "Individual", value: "individual" },
                                        { label: "Company", value: "company" },
                                    ]}
                                    selectedValue={ownerInformation.ownerType}
                                    onValueChange={(value) => handleInputChange("ownerType", value)}
                                />

                                {ownerInformation.ownerType === "company" ? (
                                    <View style={styles.formGroup}>
                                        <TextInputComponent
                                            placeholder="Company Name"
                                            value={ownerInformation.companyName}
                                            onChangeText={(value) => handleInputChange("companyName", value)}
                                        />
                                        <TextInputComponent
                                            placeholder="Company Registration Number"
                                            value={ownerInformation.companyRegNumber}
                                            onChangeText={(value) => handleInputChange("companyRegNumber", value)}
                                        />
                                    </View>
                                ) : (
                                    <View style={styles.formGroup}>
                                        <TextInputComponent
                                            placeholder="First Name"
                                            value={ownerInformation.firstName}
                                            onChangeText={(value) => handleInputChange("firstName", value)}
                                        />
                                        <TextInputComponent
                                            placeholder="Middle Name (optional)"
                                            value={ownerInformation.middleName}
                                            onChangeText={(value) => handleInputChange("middleName", value)}
                                        />
                                        <TextInputComponent
                                            placeholder="Last Name"
                                            value={ownerInformation.lastName}
                                            onChangeText={(value) => handleInputChange("lastName", value)}
                                        />
                                        <TextInputComponent
                                            placeholder="Suffix (optional)"
                                            value={ownerInformation.suffix}
                                            onChangeText={(value) => handleInputChange("suffix", value)}
                                        />
                                    </View>
                                )}

                                <View style={styles.formGroup}>
                                    <TextInputComponent
                                        placeholder="Email"
                                        value={ownerInformation.email}
                                        onChangeText={(value) => handleInputChange("email", value)}
                                        keyboardType="email-address"
                                    />
                                    <TextInputComponent
                                        placeholder="Phone Number"
                                        value={ownerInformation.contactNumber}
                                        onChangeText={(value) => handleInputChange("contactNumber", value)}
                                        keyboardType="phone-pad"
                                    />
                                </View>

                                <TextInputComponent
                                    placeholder="TIN (Tax Identification Number)"
                                    value={ownerInformation.tin}
                                    onChangeText={(value) => handleInputChange("tin", value)}
                                />

                                <TextInputComponent
                                    placeholder="Parking Establishment Name"
                                    value={ownerInformation.name}
                                    onChangeText={(value) => handleInputChange("name", value)}
                                />
                            </View>
                        </CardComponent>

                        <CardComponent
                            header="Parking Location"
                            subHeader="Enter the location details"
                            customStyles={{ width: "95%", maxWidth: 768 }}
                        >
                            <View style={styles.form}>
                                <TextInputComponent
                                    placeholder="Street Address"
                                    value={addressData.address.street}
                                    onChangeText={(value) => handleAddressChange("street", value)}
                                />

                                <View style={styles.formGroup}>
                                    <TextInputComponent
                                        placeholder="Barangay"
                                        value={addressData.address.barangay}
                                        onChangeText={(value) => handleAddressChange("barangay", value)}
                                    />
                                    <TextInputComponent
                                        placeholder="City/Municipality"
                                        value={addressData.address.city}
                                        onChangeText={(value) => handleAddressChange("city", value)}
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <TextInputComponent
                                        placeholder="Province"
                                        value={addressData.address.province}
                                        onChangeText={(value) => handleAddressChange("province", value)}
                                    />
                                    <TextInputComponent
                                        placeholder="Postal Code"
                                        value={addressData.address.postalCode}
                                        onChangeText={(value) => handleAddressChange("postalCode", value)}
                                    />
                                </View>

                                <View style={styles.mapContainer}>{/* {<MapView></MapView>} */}</View>

                                <View style={styles.formGroup}>
                                    <TextInputComponent
                                        placeholder="Longitude"
                                        value={String(addressData.location.longitude)}
                                        editable={false}
                                    />
                                    <TextInputComponent
                                        placeholder="Latitude"
                                        value={String(addressData.location.latitude)}
                                        editable={false}
                                    />
                                </View>

                                <TextInputComponent
                                    placeholder="Landmarks: e.g., near a mall, beside a church"
                                    value={addressData.landmarks}
                                    onChangeText={(value) => setAddressData((prev) => ({ ...prev, landmarks: value }))}
                                    multiline
                                    numberOfLines={3}
                                />
                            </View>
                        </CardComponent>
                    </View>
                </SafeAreaView>
            </View>
        </ScrollView>
    );
};

export default ParkingManagerSignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    body: {
        width: "100%",
        height: "100%",
        flex: 1,
        gap: 20,
        paddingTop: StatusBar.currentHeight,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        width: "100%",
        height: "100%",
        flex: 1,
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    formGroup: {
        gap: 16,
    },
    formsContainer: {
        width: "100%",
        height: "100%",
        flex: 1,
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        gap: 20,
        padding: 16,
    },
    mapContainer: {
        height: 300,
        marginVertical: 16,
        borderRadius: 8,
        overflow: "hidden",
    },
    map: {
        flex: 1,
    },
});
