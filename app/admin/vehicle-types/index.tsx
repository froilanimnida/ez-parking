import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

const fetchVehicleTypes = async () => {
    try {
        const response = await axiosInstance.get(
            `https://ez-parking-system.onrender.com/api/v1/vehicle-type/get-all-vehicle-types`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const VehicleTypes = () => {
    useEffect(() => {
        fetchVehicleTypes().then((data) => {
            console.log(data);
        });
    }, []);
    return (
        <View>
            <Text>VehicleTypes</Text>
        </View>
    );
};

export default VehicleTypes;

const styles = StyleSheet.create({});
