import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ButtonComponent from "@/components/ButtonComponent";
import LinkComponent from "@/components/LinkComponent";
import TextInputComponent from "@/components/TextInputComponent";
import CardComponent from "@/components/CardComponent";
import SelectComponent from "@/components/SelectComponent";
import TextComponent from "@/components/TextComponent";
import CheckboxComponent from "@/components/CheckboxComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LocationPicker from "@/components/auth/parking-manager/LocationPicker";
import {
    ParkingCompanyProfile,
    ParkingPaymentMethodData,
    type ParkingAddressData,
    type ParkingEstablishmentData,
    type ParkingOwnerInformation,
    type ParkinOperatingHoursData,
} from "@/lib/models/parkingManagerSignUpTypes";
import OperatingHoursForm from "@/components/auth/parking-manager/OperatingHoursForm";
import { parkingManagerSignUp } from "@/lib/api/parkingManager";
import { METRO_MANILA_CITIES } from "@/lib/models/cities";
interface OperatingHours {
    enabled: boolean;
    open: string;
    close: string;
}

const ParkingManagerSignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userInformation, setUserInformation] = useState<ParkingOwnerInformation>({
        email: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        suffix: "",
        phone_number: "",
    });
    const [companyProfile, setCompanyProfile] = useState<ParkingCompanyProfile>({
        owner_type: "individual",
        company_name: "",
        company_reg_number: "",
        tin: "",
    });
    const [addressData, setAddressData] = useState<ParkingAddressData>({
        street: "",
        barangay: "",
        city: "",
        province: "",
        postal_code: "",
    });

    const [parkingEstablishmentData, setParkingEstablishmentData] = useState<ParkingEstablishmentData>({
        space_type: "",
        space_layout: "",
        custom_layout: "",
        dimensions: "",
        is24_7: false,
        access_info: "no_specific_access",
        custom_access: "",
        name: "",
        lighting: "",
        accessibility: "",
        facilities: "",
        longitude: 14.5995,
        latitude: 120.9842,
        nearby_landmarks: "",
    });

    const [is24_7, setIs24_7] = useState(false);
    const [operatingHours, setOperatingHours] = useState({
        monday: { enabled: false, open: "", close: "" },
        tuesday: { enabled: false, open: "", close: "" },
        wednesday: { enabled: false, open: "", close: "" },
        thursday: { enabled: false, open: "", close: "" },
        friday: { enabled: false, open: "", close: "" },
        saturday: { enabled: false, open: "", close: "" },
        sunday: { enabled: false, open: "", close: "" },
    });

    const [paymentMethodData, setPaymentMethodData] = useState<ParkingPaymentMethodData>({
        accepts_cash: false,
        accepts_mobile: false,
        accepts_other: false,
        other_methods: "",
    });

    const handleParkingOwnerInfo = (key: string, value: string) => {
        setUserInformation({ ...userInformation, [key]: value });
    };

    const handleCompanyInfoChange = (key: string, value: string) => {
        setCompanyProfile({ ...companyProfile, [key]: value });
    };

    const handleAddressInfoChange = (key: string, value: string) => {
        setAddressData({ ...addressData, [key]: value });
    };

    const handleParkingEstablishmentData = (key: string, value: string) => {
        setParkingEstablishmentData({ ...parkingEstablishmentData, [key]: value });
    };

    const handleOperatingHoursData = (day: string, field: keyof OperatingHours, value: string | boolean) => {
        setOperatingHours((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [field]: value,
            },
        }));
    };

    const handlePaymentDataChange = (key: string, value: boolean | string) => {
        setPaymentMethodData({ ...paymentMethodData, [key]: value });
    };

    const searchLocation = async () => {
        if (!addressData.street) {
            return;
        }

        try {
            const query = `${addressData.street}, ${addressData.city}, Philippines`;
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
            );
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                setAddressData((prev) => ({
                    ...prev,
                    location: {
                        latitude: Number(lat),
                        longitude: Number(lon),
                    },
                }));
            } else {
                // Show "Location not found" message
            }
        } catch (error) {
            // Show error message
        }
    };

    const [agreed, setAgreed] = useState(false);
    const handleSubmit = () => {
        setIsSubmitting(true);
        parkingManagerSignUp(
            userInformation,
            companyProfile,
            addressData,
            parkingEstablishmentData,
            operatingHours,
            paymentMethodData
        )
            .then(() => {
                // Show success message
            })
            .catch(() => {
                // Show error message
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };
    const [zoningCompliance, setZoningCompliance] = useState(false);
    return (
        <ResponsiveContainer>
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
                    customStyles={{ width: "95%" }}
                >
                    <View style={styles.form}>
                        <SelectComponent
                            items={[
                                { label: "Individual", value: "individual" },
                                { label: "Company", value: "company" },
                            ]}
                            selectedValue={companyProfile.owner_type}
                            onValueChange={(value) => handleCompanyInfoChange("owner_type", value)}
                        />

                        {companyProfile.owner_type === "company" ? (
                            <View style={styles.formGroup}>
                                <TextInputComponent
                                    placeholder="Company Name"
                                    value={companyProfile.company_name}
                                    onChangeText={(value) => handleCompanyInfoChange("company_name", value)}
                                />
                                <TextInputComponent
                                    placeholder="Company Registration Number"
                                    value={companyProfile.company_name}
                                    onChangeText={(value) => handleCompanyInfoChange("company_reg_number", value)}
                                />
                            </View>
                        ) : (
                            <View style={styles.formGroup}>
                                <TextInputComponent
                                    placeholder="First Name"
                                    value={userInformation.first_name}
                                    onChangeText={(value) => handleParkingOwnerInfo("first_name", value)}
                                />
                                <TextInputComponent
                                    placeholder="Middle Name (optional)"
                                    value={userInformation.middle_name}
                                    onChangeText={(value) => handleParkingOwnerInfo("last_name", value)}
                                />
                                <TextInputComponent
                                    placeholder="Last Name"
                                    value={userInformation.last_name}
                                    onChangeText={(value) => handleParkingOwnerInfo("last_name", value)}
                                />
                                <TextInputComponent
                                    placeholder="Suffix (optional)"
                                    value={userInformation.suffix}
                                    onChangeText={(value) => handleParkingOwnerInfo("suffix", value)}
                                />
                            </View>
                        )}

                        <View style={styles.formGroup}>
                            <TextInputComponent
                                placeholder="Email"
                                value={userInformation.email}
                                onChangeText={(value) => handleParkingOwnerInfo("email", value)}
                                keyboardType="email-address"
                            />
                            <TextInputComponent
                                placeholder="Phone Number"
                                value={userInformation.phone_number}
                                onChangeText={(value) => handleParkingOwnerInfo("phone_number", value)}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <TextInputComponent
                            placeholder="TIN (Tax Identification Number)"
                            value={companyProfile.tin}
                            onChangeText={(value) => handleCompanyInfoChange("tin", value)}
                        />

                        <TextInputComponent
                            placeholder="Parking Establishment Name"
                            value={companyProfile.company_name}
                            onChangeText={(value) => handleCompanyInfoChange("name", value)}
                        />
                    </View>
                </CardComponent>

                <CardComponent
                    header="Parking Location"
                    subHeader="Enter the location details"
                    customStyles={{ width: "95%" }}
                >
                    <View style={styles.form}>
                        <TextInputComponent
                            placeholder="Street Address"
                            value={addressData.street}
                            onChangeText={(value) => handleAddressInfoChange("street", value)}
                        />

                        <View style={styles.formGroup}>
                            <TextInputComponent
                                placeholder="Barangay"
                                value={addressData.barangay}
                                onChangeText={(value) => handleAddressInfoChange("barangay", value)}
                            />
                            <SelectComponent
                                items={METRO_MANILA_CITIES.map((city) => {
                                    return { label: city, value: city.toLowerCase().replace(" ", "_") };
                                })}
                                placeholder="City/Municipality"
                                selectedValue={addressData.city}
                                onValueChange={(value) => handleAddressInfoChange("city", value)}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <SelectComponent
                                items={[{ label: "Metro Manila", value: "metro_manila" }]}
                                placeholder="Province"
                                selectedValue={addressData.province}
                                onValueChange={(value) => handleAddressInfoChange("province", value)}
                            />
                            <TextInputComponent
                                placeholder="Postal Code"
                                value={addressData.postal_code}
                                onChangeText={(value) => handleAddressInfoChange("postal_code", value)}
                            />
                        </View>

                        <View style={styles.mapContainer}>
                            <LocationPicker
                                initialLatitude={parkingEstablishmentData.latitude}
                                initialLongitude={parkingEstablishmentData.longitude}
                                onLocationChange={(latitude: number, longitude: number) => {
                                    console.log("Running: " + latitude + " " + longitude);
                                    setParkingEstablishmentData((prev) => ({
                                        ...prev,
                                        latitude,
                                        longitude,
                                    }));
                                }}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <TextInputComponent
                                placeholder="Longitude"
                                value={String(parkingEstablishmentData.longitude)}
                                editable={false}
                            />
                            <TextInputComponent
                                placeholder="Latitude"
                                value={String(parkingEstablishmentData.latitude)}
                                editable={false}
                            />
                        </View>

                        <TextInputComponent
                            placeholder="Landmarks: e.g., near a mall, beside a church"
                            value={parkingEstablishmentData.nearby_landmarks}
                            onChangeText={(value) =>
                                setParkingEstablishmentData((prev) => ({ ...prev, landmarks: value }))
                            }
                            multiline
                            numberOfLines={3}
                        />
                    </View>
                </CardComponent>

                <CardComponent
                    header="Facilities & Amenities"
                    subHeader="Specify your parking facility details"
                    customStyles={{ width: "95%" }}
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
                            selectedValue={parkingEstablishmentData.access_info}
                            onValueChange={(value) => handleParkingEstablishmentData("access_info", value)}
                        />

                        <TextInputComponent
                            placeholder="Other? (Specify it here)"
                            value={parkingEstablishmentData.custom_access}
                            onChangeText={(value) => handleParkingEstablishmentData("custom_access", value)}
                            editable={parkingEstablishmentData.access_info === "other"}
                        />

                        <SelectComponent
                            placeholder="Space Type"
                            items={[
                                { label: "Indoor", value: "indoor" },
                                { label: "Outdoor", value: "outdoor" },
                                { label: "Covered", value: "covered" },
                                { label: "Uncovered", value: "uncovered" },
                            ]}
                            selectedValue={parkingEstablishmentData.space_type}
                            onValueChange={(value) => handleParkingEstablishmentData("space_type", value)}
                        />

                        <SelectComponent
                            placeholder="Space Layout"
                            items={[
                                { label: "Parallel", value: "parallel" },
                                { label: "Perpendicular", value: "perpendicular" },
                                { label: "Angled", value: "angled" },
                                { label: "Other", value: "other" },
                            ]}
                            selectedValue={parkingEstablishmentData.space_layout}
                            onValueChange={(value) => handleParkingEstablishmentData("space_layout", value)}
                        />

                        <TextInputComponent
                            placeholder="Dimensions (e.g., 2.5m x 5m)"
                            value={parkingEstablishmentData.dimensions}
                            onChangeText={(value) => handleParkingEstablishmentData("dimensions", value)}
                        />

                        <TextInputComponent
                            placeholder="Lighting & Security Features: e.g., CCTV, guards, lighting"
                            value={parkingEstablishmentData.lighting}
                            onChangeText={(value) => handleParkingEstablishmentData("lighting", value)}
                            numberOfLines={3}
                        />

                        <TextInputComponent
                            placeholder="Accessibility Features: e.g., ramps, elevators"
                            value={parkingEstablishmentData.accessibility}
                            onChangeText={(value) => handleParkingEstablishmentData("accessibility", value)}
                            numberOfLines={3}
                        />

                        <TextInputComponent
                            placeholder="Nearby Facilities: e.g., EV charging stations, Restrooms, Elevators"
                            value={parkingEstablishmentData.facilities}
                            onChangeText={(value) => handleParkingEstablishmentData("facilities", value)}
                            numberOfLines={3}
                        />
                    </View>
                </CardComponent>
                <OperatingHoursForm
                    is24_7={is24_7}
                    operatingHours={operatingHours}
                    onIs24_7Change={setIs24_7}
                    onOperatingHoursChange={handleOperatingHoursData}
                />

                <CardComponent
                    header="Accepted Payment Methods"
                    subHeader="Select available payment options"
                    customStyles={{ width: "95%" }}
                >
                    <View style={styles.form}>
                        <View style={styles.checkboxGroup}>
                            <CheckboxComponent
                                placeholder="Cash"
                                value={paymentMethodData.accepts_cash}
                                onValueChange={(value) => handlePaymentDataChange("accepts_cash", value)}
                            />

                            <CheckboxComponent
                                placeholder="Mobile Payment"
                                value={paymentMethodData.accepts_mobile}
                                onValueChange={(value) => handlePaymentDataChange("accepts_mobile", value)}
                            />

                            <View style={styles.otherPaymentContainer}>
                                <CheckboxComponent
                                    placeholder="Other"
                                    value={paymentMethodData.accepts_other}
                                    onValueChange={(value) => handlePaymentDataChange("accepts_other", value)}
                                />
                                <TextInputComponent
                                    placeholder="Specify other payment method"
                                    value={paymentMethodData.other_methods}
                                    onChangeText={(value) => handlePaymentDataChange("other_methods", value)}
                                    editable={paymentMethodData.accepts_other}
                                    customStyles={[
                                        styles.otherInput,
                                        !paymentMethodData.other_methods && styles.disabledInput,
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                </CardComponent>
                <View style={styles.infoContainer}>
                    <View style={styles.infoHeader}>
                        <MaterialCommunityIcons name="information" size={24} color="#1E40AF" />
                        <TextComponent style={styles.infoTitle}>Account Verification Process</TextComponent>
                    </View>
                    <View style={styles.infoContent}>
                        <TextComponent style={styles.bulletPoint}>
                            • Your registration will be reviewed by our admin team
                        </TextComponent>
                        <TextComponent style={styles.bulletPoint}>
                            • Verification typically takes 1-2 business days
                        </TextComponent>
                        <TextComponent style={styles.bulletPoint}>
                            • Your establishment will be visible to customers after approval
                        </TextComponent>
                        <TextComponent style={styles.bulletPoint}>
                            • You'll receive an email notification once approved
                        </TextComponent>
                        <TextComponent style={styles.bulletPoint}>
                            • Make sure all documents are clear and valid to speed up the process
                        </TextComponent>
                    </View>
                </View>
                <View style={styles.submitContainer}>
                    <View style={styles.checkboxContainer}>
                        <CheckboxComponent
                            placeholder="I agree to the terms and conditions"
                            value={agreed}
                            onValueChange={setAgreed}
                        />
                        <CheckboxComponent
                            placeholder="I certify that my parking facility complies with local zoning laws"
                            value={zoningCompliance}
                            onValueChange={setZoningCompliance}
                        />
                    </View>
                    <ButtonComponent
                        title={isSubmitting ? "Submitting..." : "Submit Registration"}
                        onPress={handleSubmit}
                        disabled={isSubmitting || !agreed || !zoningCompliance}
                        style={styles.submitButton}
                    />
                </View>
            </View>
        </ResponsiveContainer>
    );
};

export default ParkingManagerSignUp;

const styles = StyleSheet.create({
    header: {
        width: "100%",
        paddingBottom: 16,
        alignItems: "center",
    },
    submitContainer: {
        width: "95%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        width: "100%",
        marginBottom: 16,
        gap: 16,
    },
    submitButton: {
        width: "100%",
    },

    infoContainer: {
        backgroundColor: "#EFF6FF",
        borderRadius: 8,
        padding: 16,
        width: "95%",
        marginBottom: 40,
    },
    infoHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    infoTitle: {
        color: "#1E40AF",
        fontWeight: "600",
    },
    infoContent: {
        marginTop: 12,
        paddingLeft: 8,
    },
    bulletPoint: {
        color: "#1E40AF",
        marginVertical: 4,
    },
    formGroup: {
        gap: 16,
    },
    formsContainer: {
        width: "100%",
        height: "100%",
        flex: 1,
        gap: 20,
        alignItems: "center",
    },
    form: {
        gap: 20,
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
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingVertical: 8,
    },
    priceInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    currencySymbol: {
        paddingHorizontal: 8,
        color: "#6B7280",
    },
    priceInput: {
        flex: 1,
    },
});
