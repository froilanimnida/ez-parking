import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, ScrollView } from "react-native";
import React, { useState } from "react";
import ButtonComponent from "@/components/ButtonComponent";
import LinkComponent from "@/components/LinkComponent";
import TextInputComponent from "@/components/TextInputComponent";
import CardComponent from "@/components/CardComponent";
import SelectComponent from "@/components/SelectComponent";
import TextComponent from "@/components/TextComponent";
import CheckboxComponent from "@/components/CheckboxComponent";

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
    const [facilitiesAndAmenities, setFacilitiesAndAmenities] = useState({
        facilities: {
            accessInformation: "gate_code",
            customAccess: "",
            lightingAndSecurity: "",
            accessibility: "",
            nearbyFacilities: "",
        },
        parkingDetails: {
            spaceType: "indoor",
            spaceLayout: "parallel",
            customLayout: "",
            dimensions: "",
        },
    });

    const [paymentData, setPaymentData] = useState({
        paymentMethods: {
            cash: false,
            mobile: false,
            other: false,
            otherText: "",
        },
    });

    // Add handler after existing handlers
    const handlePaymentChange = (method: string, value: boolean | string) => {
        setPaymentData((prev) => ({
            paymentMethods: {
                ...prev.paymentMethods,
                [method]: value,
            },
        }));
    };

    // Add handler after existing handlers
    const handleFacilitiesChange = (section: string, field: string, value: string) => {
        setFacilitiesAndAmenities((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

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
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ alignContent: "center", justifyContent: "center" }}
        >
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

                    <CardComponent
                        header="Facilities & Amenities"
                        subHeader="Specify your parking facility details"
                        customStyles={{ width: "95%", maxWidth: 768 }}
                    >
                        <View style={styles.form}>
                            <SelectComponent
                                placeholder="Access Information (Optional)"
                                items={[
                                    { label: "Gate Code", value: "gate_code" },
                                    { label: "Security Check", value: "security_check" },
                                    { label: "Key Pickup", value: "key_pickup" },
                                    { label: "No Special Access", value: "no_special_access" },
                                    { label: "Other", value: "other" },
                                ]}
                                selectedValue={facilitiesAndAmenities.facilities.accessInformation}
                                onValueChange={(value) =>
                                    handleFacilitiesChange("facilities", "accessInformation", value)
                                }
                            />

                            <TextInputComponent
                                placeholder="Other? (Specify it here)"
                                value={facilitiesAndAmenities.facilities.customAccess}
                                onChangeText={(value) => handleFacilitiesChange("facilities", "customAccess", value)}
                                editable={facilitiesAndAmenities.facilities.accessInformation === "other"}
                            />

                            <SelectComponent
                                placeholder="Space Type"
                                items={[
                                    { label: "Indoor", value: "indoor" },
                                    { label: "Outdoor", value: "outdoor" },
                                    { label: "Covered", value: "covered" },
                                    { label: "Uncovered", value: "uncovered" },
                                ]}
                                selectedValue={facilitiesAndAmenities.parkingDetails.spaceType}
                                onValueChange={(value) => handleFacilitiesChange("parkingDetails", "spaceType", value)}
                            />

                            <SelectComponent
                                placeholder="Space Layout"
                                items={[
                                    { label: "Parallel", value: "parallel" },
                                    { label: "Perpendicular", value: "perpendicular" },
                                    { label: "Angled", value: "angled" },
                                    { label: "Other", value: "other" },
                                ]}
                                selectedValue={facilitiesAndAmenities.parkingDetails.spaceLayout}
                                onValueChange={(value) =>
                                    handleFacilitiesChange("parkingDetails", "spaceLayout", value)
                                }
                            />

                            <TextInputComponent
                                placeholder="Dimensions (e.g., 2.5m x 5m)"
                                value={facilitiesAndAmenities.parkingDetails.dimensions}
                                onChangeText={(value) => handleFacilitiesChange("parkingDetails", "dimensions", value)}
                            />

                            <TextInputComponent
                                placeholder="Lighting & Security Features: e.g., CCTV, guards, lighting"
                                value={facilitiesAndAmenities.facilities.lightingAndSecurity}
                                onChangeText={(value) =>
                                    handleFacilitiesChange("facilities", "lightingAndSecurity", value)
                                }
                                numberOfLines={3}
                            />

                            <TextInputComponent
                                placeholder="Accessibility Features: e.g., ramps, elevators"
                                value={facilitiesAndAmenities.facilities.accessibility}
                                onChangeText={(value) => handleFacilitiesChange("facilities", "accessibility", value)}
                                numberOfLines={3}
                            />

                            <TextInputComponent
                                placeholder="Nearby Facilities: e.g., EV charging stations, Restrooms, Elevators"
                                value={facilitiesAndAmenities.facilities.nearbyFacilities}
                                onChangeText={(value) =>
                                    handleFacilitiesChange("facilities", "nearbyFacilities", value)
                                }
                                numberOfLines={3}
                            />
                        </View>
                    </CardComponent>

                    <CardComponent
                        header="Accepted Payment Methods"
                        subHeader="Select available payment options"
                        customStyles={{ width: "95%", maxWidth: 768 }}
                    >
                        <View style={styles.form}>
                            <View style={styles.checkboxGroup}>
                                <CheckboxComponent
                                    placeholder="Cash"
                                    value={paymentData.paymentMethods.cash}
                                    onValueChange={(value) => handlePaymentChange("cash", value)}
                                />

                                <CheckboxComponent
                                    placeholder="Mobile Payment"
                                    value={paymentData.paymentMethods.mobile}
                                    onValueChange={(value) => handlePaymentChange("mobile", value)}
                                />

                                <View style={styles.otherPaymentContainer}>
                                    <CheckboxComponent
                                        placeholder="Other"
                                        value={paymentData.paymentMethods.other}
                                        onValueChange={(value) => handlePaymentChange("other", value)}
                                    />
                                    <TextInputComponent
                                        placeholder="Specify other payment method"
                                        value={paymentData.paymentMethods.otherText}
                                        onChangeText={(value) => handlePaymentChange("otherText", value)}
                                        editable={paymentData.paymentMethods.other}
                                        customStyles={[
                                            styles.otherInput,
                                            !paymentData.paymentMethods.other && styles.disabledInput,
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>
                    </CardComponent>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default ParkingManagerSignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    checkboxGroup: {
        gap: 16,
    },
    otherPaymentContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    otherInput: {
        flex: 1,
    },
    disabledInput: {
        backgroundColor: "#F3F4F6",
    },
});
