import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import ResponsiveContainer from "@components/reusable/ResponsiveContainer";
import LinkComponent from "@components/LinkComponent";

const VehicleTypeDetails = () => {
    const { uuid } = useLocalSearchParams();
    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent
                    variant="outline"
                    style={{ marginBottom: 16 }}
                    href="./"
                    label="← Back to Vehicle Types"
                />
            </View>
            <Text>VehicleTypeDetails {uuid}</Text>
        </ResponsiveContainer>
    );
};

export default VehicleTypeDetails;

const styles = StyleSheet.create({});
