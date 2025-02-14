import { StyleSheet, View, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import TextComponent from "@/components/TextComponent";
import ButtonComponent from "@/components/ButtonComponent";
import CardComponent from "@/components/CardComponent";
import SelectComponent from "@/components/SelectComponent";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextInputComponent from "@/components/TextInputComponent";
import { addParkingSlot, getParkingSlotsParkingManager, getVehicleTypes } from "@/lib/api/parkingManager";
import { ParkingSlot } from "@/lib/models/parking-slot";
import { VehicleType } from "@/lib/models/vehicle-types";
import CheckboxComponent from "@/components/CheckboxComponent";

const slotFeatures = [
    {
        label: "standard",
        value: "standard",
    },
    {
        label: "covered",
        value: "covered",
    },
    {
        label: "vip",
        value: "vip",
    },
    {
        label: "disabled",
        value: "disabled",
    },
    {
        label: "ev_charging",
        value: "ev_charging",
    },
];
const slotStatus = [
    { label: "open", value: "open" },
    { label: "occupied", value: "occupied" },
    { label: "reserved", value: "reserved" },
    { label: "closed", value: "closed" },
];

const Slots = () => {
    const [formData, setFormData] = useState<{
        slot_code: string;
        is_premium: boolean;
        floor_level: string;
        vehicle_type_id: number;
        slot_features: "standard" | "covered" | "vip" | "disabled" | "ev_charging";
        slot_status: "open" | "occupied" | "reserved" | "closed";
        is_active: boolean;
        base_price_per_hour: string;
        base_price_per_day: string;
        base_price_per_month: string;
        price_multiplier: string;
    }>({
        slot_code: "",
        is_premium: false,
        floor_level: "",
        vehicle_type_id: 0,
        slot_features: "standard",
        slot_status: "open",
        is_active: true,
        base_price_per_hour: "",
        base_price_per_day: "",
        base_price_per_month: "",
        price_multiplier: "",
    });
    const [isFetching, setIsFetching] = useState(true);
    const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
    const [slots, setSlots] = useState<
        (ParkingSlot & { vehicle_type_code: string; vehicle_type_name: string; vehicle_type_size: string })[]
    >([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                let slots = await getParkingSlotsParkingManager();
                let vehicleTypes = await getVehicleTypes();
                setIsFetching(false);
                setSlots(slots.data.data);
                setVehicleTypes(vehicleTypes.data.data);
            };
            fetchData();
        } catch (error) {
            alert("Failed to fetch data");
        }
    }, []);

    const setFormDataValue = (key: string, value: string | boolean) => {
        setFormData({ ...formData, [key]: value });
    };

    const addSlot = async () => {
        try {
            const result = await addParkingSlot(formData);
            setFormData({
                slot_code: "",
                is_premium: false,
                floor_level: "",
                vehicle_type_id: 0,
                slot_features: "standard",
                slot_status: "open",
                is_active: true,
                base_price_per_hour: "",
                base_price_per_day: "",
                base_price_per_month: "",
                price_multiplier: "",
            });
            alert("Slot Added");
        } catch {
            alert("Failed to add slot");
        }
    };

    return (
        <ResponsiveContainer>
            <>
                <TextComponent variant="h1" bold style={styles.sectionTitle}>
                    Parking Slot Settings
                </TextComponent>

                <CardComponent customStyles={styles.form} header="Add New Slot">
                    <View style={styles.formGrid}>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}>Slot Code *</TextComponent>
                            <TextInput
                                style={styles.input}
                                value={formData.slot_code}
                                onChangeText={(text) => setFormDataValue("slot_code", text)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}>Slot Vehicle Type *</TextComponent>
                            {isFetching && vehicleTypes ? (
                                <LoadingComponent text="Getting vehicle types..." />
                            ) : (
                                <SelectComponent
                                    items={vehicleTypes.map((type) => ({
                                        label: type.name,
                                        value: type.vehicle_type_id.toString(),
                                    }))}
                                    selectedValue={formData.vehicle_type_id.toString()}
                                    onValueChange={(value: string) => setFormDataValue("vehicle_type_id", value)}
                                />
                            )}
                        </View>

                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}>Is Premium</TextComponent>
                            <CheckboxComponent
                                value={formData.is_premium}
                                onValueChange={(value) => setFormDataValue("is_premium", value)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}>Features *</TextComponent>
                            <SelectComponent
                                items={slotFeatures}
                                selectedValue="standard"
                                onValueChange={(value: string) => setFormDataValue("slot_features", value)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}>Status *</TextComponent>
                            <SelectComponent
                                items={slotStatus}
                                selectedValue="open"
                                onValueChange={(value: string) => setFormDataValue("slot_status", value)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}> Floor Level </TextComponent>
                            <TextInputComponent
                                placeholder="Floor Level"
                                keyboardType="numeric"
                                value={formData.floor_level}
                                onChangeText={(text) => setFormDataValue("floor_level", text)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}> Base Price Per Hour </TextComponent>
                            <TextInputComponent
                                placeholder="Base Price Per Hour"
                                keyboardType="numeric"
                                value={formData.base_price_per_hour}
                                onChangeText={(text) => setFormDataValue("base_price_per_hour", text)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}> Base Price Per Day </TextComponent>
                            <TextInputComponent
                                placeholder="Base Price Per Day"
                                keyboardType="numeric"
                                value={formData.base_price_per_day}
                                onChangeText={(text) => setFormDataValue("base_price_per_day", text)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}> Base Price Per Month </TextComponent>
                            <TextInputComponent
                                placeholder="Base Price Per Month"
                                keyboardType="numeric"
                                value={formData.base_price_per_month}
                                onChangeText={(text) => setFormDataValue("base_price_per_month", text)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}> Price Multiplier </TextComponent>
                            <TextInputComponent
                                placeholder="Price Multiplier"
                                keyboardType="numeric"
                                value={formData.price_multiplier}
                                onChangeText={(text) => setFormDataValue("price_multiplier", text)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}>Status *</TextComponent>
                            <SelectComponent
                                items={slotStatus}
                                selectedValue="open"
                                onValueChange={(value: string) => setFormDataValue("slot_status", value)}
                            />
                        </View>
                    </View>

                    <ButtonComponent
                        title="Add Slot"
                        onPress={() => {
                            addSlot();
                        }}
                        variant="primary"
                        style={styles.submitButton}
                    />
                </CardComponent>
            </>

            <View style={{ marginTop: 32 }}>
                <TextComponent variant="h1" bold>
                    Existing Parking Slots
                </TextComponent>
                {isFetching ? (
                    <LoadingComponent text="Getting all the slot..." />
                ) : slots.length === 0 ? (
                    <TextComponent>No slots available</TextComponent>
                ) : (
                    <View style={styles.slotsGrid}>
                        {slots.map((slot, index) => (
                            <CardComponent
                                header="Slot Code"
                                key={index}
                                customStyles={[
                                    styles.slotCard,
                                    slot.slot_status === "open" && styles.slotOpen,
                                    slot.slot_status === "reserved" && styles.slotReserved,
                                    slot.slot_status === "occupied" && styles.slotOccupied,
                                ]}
                            >
                                <View style={styles.slotHeader}>
                                    <TextComponent style={styles.slotCode}>{slot.slot_code}</TextComponent>
                                    <View
                                        style={[
                                            styles.statusBadge,
                                            slot.slot_status === "open" && styles.statusOpen,
                                            slot.slot_status === "reserved" && styles.statusReserved,
                                            slot.slot_status === "occupied" && styles.statusOccupied,
                                        ]}
                                    >
                                        <TextComponent style={styles.statusText}>
                                            {slot.slot_status.toUpperCase()}
                                        </TextComponent>
                                    </View>
                                </View>
                                <TextComponent>Vehicle Type: {slot.vehicle_type_name}</TextComponent>
                                <TextComponent>Floor Level: {slot.floor_level}</TextComponent>
                                <TextComponent>Features: {slot.slot_features}</TextComponent>
                                <TextComponent>Base Price Per Hour: {slot.base_price_per_hour}</TextComponent>
                                <TextComponent>Base Price Per Day: {slot.base_price_per_day}</TextComponent>
                                <TextComponent>Base Price Per Month: {slot.base_price_per_month}</TextComponent>
                                <TextComponent>Is Premium: {slot.is_premium ? "Yes" : "No"}</TextComponent>
                                <TextComponent>Is Active: {slot.is_active ? "Yes" : "No"}</TextComponent>
                            </CardComponent>
                        ))}
                    </View>
                )}
            </View>
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        marginBottom: 16,
        fontWeight: "600",
    },
    form: {
        padding: 16,
    },
    formGrid: {
        gap: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        fontWeight: "500",
    },
    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        padding: 12,
    },
    picker: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
    },
    submitButton: {
        marginTop: 16,
    },
    slotsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    slotCard: {
        width: "47%",
        padding: 16,
        borderLeftWidth: 4,
    },
    slotOpen: {
        borderLeftColor: "#10B981",
    },
    slotReserved: {
        borderLeftColor: "#F59E0B",
    },
    slotOccupied: {
        borderLeftColor: "#EF4444",
    },
    slotHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    slotCode: {
        fontWeight: "600",
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    statusOpen: {
        backgroundColor: "#D1FAE5",
    },
    statusReserved: {
        backgroundColor: "#FEF3C7",
    },
    statusOccupied: {
        backgroundColor: "#FEE2E2",
    },
    statusText: {
        fontSize: 12,
        fontWeight: "500",
    },
});

export default Slots;
