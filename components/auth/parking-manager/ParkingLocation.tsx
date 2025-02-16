import { StyleSheet, View } from "react-native";
import React from "react";
import CardComponent from "@/components/CardComponent";
import TextInputComponent from "@/components/TextInputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import SelectComponent from "@/components/SelectComponent";
import { METRO_MANILA_CITIES } from "@/lib/types/models/common/constants";
import LocationPicker from "./LocationPicker";
import type { ParkingEstablishmentData } from "@/lib/models/parkingManagerSignUpTypes";

interface ParkingLocationProps {
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchLocation: () => void;
    street: string;
    barangay: string;
    city: string;
    province: string;
    postal_code: string;
    latitude: number;
    longitude: number;
    nearby_landmarks: string;
    handleAddressInfoChange: (key: string, value: string) => void;
    setParkingEstablishmentData: React.Dispatch<React.SetStateAction<ParkingEstablishmentData>>;
    query: string;
}

const ParkingLocation = ({
    query,
    setQuery,
    searchLocation,
    street,
    barangay,
    city,
    province,
    postal_code,
    latitude,
    longitude,
    nearby_landmarks,
    handleAddressInfoChange,
    setParkingEstablishmentData,
}: ParkingLocationProps) => {
    return (
        <CardComponent header="Parking Location" subHeader="Enter the location details" customStyles={{ width: "95%" }}>
            <View style={styles.form}>
                <TextInputComponent
                    placeholder="Search for address to get coordinates and map data"
                    value={query}
                    onChangeText={(value) => setQuery(value)}
                />

                <ButtonComponent onPress={searchLocation} title="Search" />

                <TextInputComponent
                    placeholder="Street Address"
                    value={street}
                    onChangeText={(value) => handleAddressInfoChange("street", value)}
                />

                <View style={styles.formGroup}>
                    <TextInputComponent
                        placeholder="Barangay"
                        value={barangay}
                        onChangeText={(value) => handleAddressInfoChange("barangay", value)}
                    />
                    <SelectComponent
                        items={METRO_MANILA_CITIES.map((city) => {
                            return { label: city, value: city.toLowerCase().replace(" ", "_") };
                        })}
                        placeholder="City/Municipality"
                        selectedValue={city}
                        onValueChange={(value) => handleAddressInfoChange("city", value)}
                    />
                </View>

                <View style={styles.formGroup}>
                    <SelectComponent
                        items={[{ label: "Metro Manila", value: "metro_manila" }]}
                        placeholder="Province"
                        selectedValue={province}
                        onValueChange={(value) => handleAddressInfoChange("province", value)}
                    />
                    <TextInputComponent
                        placeholder="Postal Code"
                        value={postal_code}
                        onChangeText={(value) => handleAddressInfoChange("postal_code", value)}
                    />
                </View>

                <View style={styles.mapContainer}>
                    <LocationPicker
                        initialLatitude={latitude}
                        initialLongitude={longitude}
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
                    <TextInputComponent placeholder="Longitude" value={String(longitude)} editable={false} />
                    <TextInputComponent placeholder="Latitude" value={String(latitude)} editable={false} />
                </View>

                <TextInputComponent
                    placeholder="Landmarks: e.g., near a mall, beside a church"
                    value={nearby_landmarks}
                    onChangeText={(value) => setParkingEstablishmentData((prev) => ({ ...prev, landmarks: value }))}
                />
            </View>
        </CardComponent>
    );
};

export default ParkingLocation;

const styles = StyleSheet.create({
    form: {
        gap: 20,
    },
    formGroup: {
        gap: 16,
    },
    mapContainer: {
        marginVertical: 16,
        borderRadius: 8,
        overflow: "hidden",
    },
});
