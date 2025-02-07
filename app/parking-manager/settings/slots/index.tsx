import { StyleSheet, View, TextInput, Switch } from "react-native";
import React, { useState } from "react";
import TextComponent from "@/components/TextComponent";
import ButtonComponent from "@/components/ButtonComponent";
import CardComponent from "@/components/CardComponent";
import SelectComponent from "@/components/SelectComponent";
import { defaultBodyStyles, defaultContainerStyles } from "@/styles/default";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextInputComponent from "@/components/TextInputComponent";

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
    const [formData, setFormData] = useState({
        slot_code: "",
        is_premium: false,
        floor_level: "",
        vehicle_type_id: "",
        slot_features: "standard",
        slot_status: "open",
        is_active: true,
        base_price_per_hour: "",
        base_price_per_day: "",
        base_price_per_month: "",
        price_multiplier: "",
    });

    let slots;

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
                                onChangeText={(text) => setFormData({ ...formData, slot_code: text })}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}>Is Premium</TextComponent>
                            <Switch
                                value={formData.is_premium}
                                onValueChange={(value) => setFormData({ ...formData, is_premium: value })}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}>Features *</TextComponent>
                            <SelectComponent
                                items={slotFeatures}
                                selectedValue="standard"
                                onValueChange={(value: string) => setFormData({ ...formData, slot_features: value })}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}>Status *</TextComponent>
                            <SelectComponent
                                items={slotStatus}
                                selectedValue="open"
                                onValueChange={(value: string) => setFormData({ ...formData, slot_status: value })}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}> Base Price Per Hour </TextComponent>
                            <TextInputComponent
                                placeholder="Base Price Per Hour"
                                keyboardType="numeric"
                                value={formData.base_price_per_hour}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}> Base Price Per Day </TextComponent>
                            <TextInputComponent
                                placeholder="Base Price Per Day"
                                keyboardType="numeric"
                                value={formData.base_price_per_day}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}> Base Price Per Day </TextComponent>
                            <TextInputComponent
                                placeholder="Base Price Per Month"
                                keyboardType="numeric"
                                value={formData.base_price_per_month}
                                onChangeText={(text) => setFormData({ ...formData, base_price_per_month: text })}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}> Price Multiplier </TextComponent>
                            <TextInputComponent
                                placeholder="Price Multiplier"
                                keyboardType="numeric"
                                value={formData.price_multiplier}
                                onChangeText={(text) => setFormData({ ...formData, price_multiplier: text })}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextComponent style={styles.label}>Status *</TextComponent>
                            <SelectComponent
                                items={slotStatus}
                                selectedValue="open"
                                onValueChange={(value: string) => setFormData({ ...formData, slot_status: value })}
                            />
                        </View>
                    </View>

                    <ButtonComponent
                        title="Add Slot"
                        onPress={() => {}}
                        variant="primary"
                        style={styles.submitButton}
                    />
                </CardComponent>
            </>

            <View style={{ marginTop: 32 }}>
                <TextComponent variant="h1" style={styles.sectionTitle}>
                    Existing Parking Slots
                </TextComponent>

                <View style={styles.slotsGrid}>
                    {/* {slots.map((slot, index) => (
                            <CardComponent
                                key={index}
                                style={[
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
                            </CardComponent>
                        ))} */}
                </View>
            </View>
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        ...defaultContainerStyles,
    },
    body: {
        ...defaultBodyStyles,
    },
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
