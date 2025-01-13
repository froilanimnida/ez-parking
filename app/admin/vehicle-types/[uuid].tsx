import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const VehicleTypeDetails = () => {
    const { uuid } = useLocalSearchParams();
    return (
        <View>
            <Text>VehicleTypeDetails {uuid}</Text>
        </View>
    );
};

export default VehicleTypeDetails;

const styles = StyleSheet.create({});
