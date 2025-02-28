import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import LinkComponent from "@components/LinkComponent";
import TextInputComponent from "@/components/TextInputComponent";
import { getSlot } from "@/lib/api/parkingManager";
import { useLocalSearchParams } from "expo-router";
import { getVehicleTypes } from "@/lib/api/parkingManager";
import { type ParkingSlot } from "@/lib/models/parkingSlot";
import { VehicleType } from "@/lib/models/vehicleTypes";

const EditSlot = () => {
    const { uuid } = useLocalSearchParams() as { uuid: string };
    const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
    const [slots, setSlots] = useState<
        (ParkingSlot & { vehicle_type_code: string; vehicle_type_name: string; vehicle_type_size: string })[]
        >([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await  getSlot(uuid)
                const vehicleTypes = await getVehicleTypes()
            } catch  {
                alert("Error fetching the slot data.")
            }
        }
    })
    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                    <LinkComponent
                        label="← Back to Slots"
                        style={{ width: "auto", marginBottom: 16 }}
                        href="./"
                        variant="outline"
                    />
            </View>

            <TextComponent variant="h1" bold>
                Parking Slot Settings
            </TextComponent>
        </ResponsiveContainer>
    )
}
