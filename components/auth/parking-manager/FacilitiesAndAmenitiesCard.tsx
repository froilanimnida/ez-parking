import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CardComponent from "@/components/CardComponent";
import SelectComponent from "@/components/SelectComponent";
import TextInputComponent from "@/components/TextInputComponent";

interface FacilitiesAndAmenitiesCardProps {
    access_info: string;
    custom_access: string;
    space_type: string;
    space_layout: string;
    dimensions: string;
    lighting: string;
    accessibility: string;
    custom_layout: string;
    facilities: string;
    handleParkingEstablishmentData: (key: string, value: any) => void;
}

const FacilitiesAndAmenitiesCard = ({
    access_info,
    custom_access,
    space_type,
    space_layout,
    dimensions,
    lighting,
    accessibility,
    facilities,
    custom_layout,
    handleParkingEstablishmentData,
}: FacilitiesAndAmenitiesCardProps) => {
    return (
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
                    selectedValue={access_info}
                    onValueChange={(value) => handleParkingEstablishmentData("access_info", value)}
                />

                <TextInputComponent
                    placeholder="Other? (Specify it here)"
                    value={custom_access}
                    onChangeText={(value) => handleParkingEstablishmentData("custom_access", value)}
                    editable={access_info === "other"}
                />

                <SelectComponent
                    placeholder="Space Type"
                    items={[
                        { label: "Indoor", value: "indoor" },
                        { label: "Outdoor", value: "outdoor" },
                        { label: "Covered", value: "covered" },
                        { label: "Uncovered", value: "uncovered" },
                    ]}
                    selectedValue={space_type}
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
                    selectedValue={space_layout}
                    onValueChange={(value) => handleParkingEstablishmentData("space_layout", value)}
                />
                <TextInputComponent
                    editable={space_layout === "other"}
                    placeholder="Custom Layout"
                    value={custom_layout}
                    onChangeText={(value) => handleParkingEstablishmentData("custom_layout", value)}
                />

                <TextInputComponent
                    placeholder="Dimensions (e.g., 2.5m x 5m)"
                    value={dimensions}
                    onChangeText={(value) => handleParkingEstablishmentData("dimensions", value)}
                />

                <TextInputComponent
                    placeholder="Lighting & Security Features: e.g., CCTV, guards, lighting"
                    value={lighting}
                    onChangeText={(value) => handleParkingEstablishmentData("lighting", value)}
                    numberOfLines={3}
                />

                <TextInputComponent
                    placeholder="Accessibility Features: e.g., ramps, elevators"
                    value={accessibility}
                    onChangeText={(value) => handleParkingEstablishmentData("accessibility", value)}
                    numberOfLines={3}
                />

                <TextInputComponent
                    placeholder="Nearby Facilities: e.g., EV charging stations, Restrooms, Elevators"
                    value={facilities}
                    onChangeText={(value) => handleParkingEstablishmentData("facilities", value)}
                    numberOfLines={3}
                />
            </View>
        </CardComponent>
    );
};

export default FacilitiesAndAmenitiesCard;

const styles = StyleSheet.create({
    form: {
        gap: 20,
    },
});
