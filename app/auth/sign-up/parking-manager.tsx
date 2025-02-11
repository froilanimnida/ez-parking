import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ButtonComponent from "@/components/ButtonComponent";
// import LinkComponent from "@/components/LinkComponent";
// import * as DocumentPicker from "expo-document-picker";
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
} from "@/lib/models/parkingManagerSignUpTypes";
import OperatingHoursForm from "@/components/auth/parking-manager/OperatingHoursForm";
import { parkingManagerSignUp } from "@/lib/api/parkingManager";
import { METRO_MANILA_CITIES } from "@/lib/models/cities";
import PaymentMethods from "@/components/auth/parking-manager/PaymentMethods";
import ParkingOwnerInfoCard from "@/components/auth/parking-manager/ParkingOwnerInfoCard";
import FacilitiesAndAmenitiesCard from "@/components/auth/parking-manager/FacilitiesAndAmenitiesCard";
interface OperatingHours {
    enabled: boolean;
    open: string;
    close: string;
}

const ParkingManagerSignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [query, setQuery] = useState("");
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

    let documents = useState({
        govId: null,
        parkingPhotos: [],
        proofOfOwnership: null,
        businessCert: null,
        birCert: null,
        liabilityInsurance: null,
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
        if (!query) {
            alert("Please enter an address above to search");
            return;
        }

        try {
            // const query = `${addressData.street}, ${addressData.city}, Philippines`;
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
            );
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                setParkingEstablishmentData((prev) => ({
                    ...prev,
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon),
                }));
            } else {
                alert("Location not found. Please enter a valid address");
            }
        } catch {
            alert("An error occurred while searching for the location");
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
                <ParkingOwnerInfoCard
                    owner_type={companyProfile.owner_type}
                    company_name={companyProfile.company_name}
                    company_reg_number={companyProfile.company_reg_number}
                    email={userInformation.email}
                    first_name={userInformation.first_name}
                    last_name={userInformation.last_name}
                    middle_name={userInformation.middle_name}
                    phone_number={userInformation.phone_number}
                    suffix={userInformation.suffix}
                    tin={companyProfile.tin}
                    handleCompanyInfoChange={handleCompanyInfoChange}
                    handleParkingOwnerInfo={handleParkingOwnerInfo}
                />

                <CardComponent
                    header="Parking Location"
                    subHeader="Enter the location details"
                    customStyles={{ width: "95%" }}
                >
                    <View style={styles.form}>
                        <TextInputComponent
                            placeholder="Search for address to get coordinates and map data"
                            value={query}
                            onChangeText={(value) => setQuery(value)}
                        />

                        <ButtonComponent onPress={searchLocation} title="Search" />

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
                <FacilitiesAndAmenitiesCard
                    access_info={parkingEstablishmentData.access_info}
                    custom_access={parkingEstablishmentData.custom_access}
                    space_type={parkingEstablishmentData.space_type}
                    space_layout={parkingEstablishmentData.space_layout}
                    custom_layout={parkingEstablishmentData.custom_layout}
                    dimensions={parkingEstablishmentData.dimensions}
                    lighting={parkingEstablishmentData.lighting}
                    accessibility={parkingEstablishmentData.accessibility}
                    facilities={parkingEstablishmentData.facilities}
                    handleParkingEstablishmentData={handleParkingEstablishmentData}
                />

                <OperatingHoursForm
                    is24_7={is24_7}
                    operatingHours={operatingHours}
                    onIs24_7Change={setIs24_7}
                    onOperatingHoursChange={handleOperatingHoursData}
                />

                <PaymentMethods
                    accepts_cash={paymentMethodData.accepts_cash}
                    accepts_mobile={paymentMethodData.accepts_mobile}
                    accepts_other={paymentMethodData.accepts_other}
                    other_methods={paymentMethodData.other_methods}
                    handlePaymentDataChange={handlePaymentDataChange}
                />
                <CardComponent
                    header="Upload Documents"
                    subHeader="Upload required documents"
                    customStyles={{ width: "95%" }}
                >
                    <View style={styles.form}>
                        {Object.entries(documents[0]).map(([type, file]) => (
                            <View key={type} style={styles.documentSection}>
                                <TextComponent style={styles.documentLabel}>
                                    {type
                                        .split(/(?=[A-Z])/)
                                        .join(" ")
                                        .toUpperCase()}
                                    {type !== "parkingPhotos" ? " (PDF or Image)" : " (Images)"}
                                </TextComponent>

                                {file ? (
                                    <View style={styles.filePreview}>
                                        <View style={styles.fileInfo}>
                                            <MaterialCommunityIcons name="file-document" size={24} color="#4B5563" />
                                            <TextComponent>{file.name}</TextComponent>
                                        </View>
                                        <ButtonComponent
                                            title="Remove"
                                            onPress={() => {
                                                const updatedDocs = { ...documents[0] };
                                                updatedDocs[type] = null;
                                                documents[1](updatedDocs);
                                            }}
                                            style={styles.removeButton}
                                        />
                                    </View>
                                ) : (
                                    <View style={styles.uploadArea}>
                                        <MaterialCommunityIcons name="upload" size={24} color="#6B7280" />
                                        <TextComponent>Drag and drop or click to upload</TextComponent>
                                        <TextComponent style={styles.fileLimit}>
                                            {type === "parkingPhotos"
                                                ? "PNG, JPG, GIF up to 10MB each"
                                                : "PDF or images up to 10MB"}
                                        </TextComponent>
                                        <ButtonComponent
                                            title="Choose File"
                                            onPress={() => {
                                                // Implement file picker logic here
                                            }}
                                            style={styles.uploadButton}
                                        />
                                    </View>
                                )}
                            </View>
                        ))}
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
    priceLabel: {
        color: "#6B7280",
    },
    documentSection: {
        marginBottom: 16,
    },
    documentLabel: {
        color: "#374151",
        fontWeight: "600",
    },
    filePreview: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 8,
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
    },
    fileInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    removeButton: {
        padding: 8,
        backgroundColor: "#F3F4F6",
    },
    uploadArea: {
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: 16,
        borderWidth: 2,
        borderColor: "#E5E7EB",
        borderStyle: "dashed",
        borderRadius: 8,
    },
    fileLimit: {
        color: "#6B7280",
    },
    uploadButton: {
        width: "100%",
    },
    overlay: {
        position: "absolute",
        bottom: 20,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: 10,
        borderRadius: 5,
    },
    text: {
        color: "white",
    },
});
