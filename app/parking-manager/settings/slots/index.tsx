import { StyleSheet, View, SafeAreaView, ScrollView, TextInput, Switch, Platform, StatusBar } from "react-native";
import React, { useState } from "react";
import TextComponent from "@/components/TextComponent";
import ButtonComponent from "@/components/ButtonComponent";
import CardComponent from "@/components/CardComponent";
import { Picker } from "@react-native-picker/picker";

const slotFeatures = ["standard", "covered", "vip", "disabled", "ev_charging"] as const;
const slotStatus = ["open", "occupied", "reserved", "closed"] as const;

const Slots = () => {
    const [formData, setFormData] = useState({
        slot_code: "",
        is_premium: false,
        base_rate: "",
        slot_multiplier: "",
        floor_level: "",
        vehicle_type_id: "",
        slot_features: "standard",
        slot_status: "open",
        is_active: true,
    });

    let slots;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                    <TextComponent variant="h2" style={styles.sectionTitle}>
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
                                <TextComponent style={styles.label}>Base Rate *</TextComponent>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={formData.base_rate}
                                    onChangeText={(text) => setFormData({ ...formData, base_rate: text })}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <TextComponent style={styles.label}>Features *</TextComponent>
                                <Picker
                                    selectedValue={formData.slot_features}
                                    onValueChange={(value) => setFormData({ ...formData, slot_features: value })}
                                    style={styles.picker}
                                >
                                    {slotFeatures.map((feature) => (
                                        <Picker.Item
                                            key={feature}
                                            label={feature.replace("_", " ").toUpperCase()}
                                            value={feature}
                                        />
                                    ))}
                                </Picker>
                            </View>

                            <View style={styles.inputGroup}>
                                <TextComponent style={styles.label}>Status *</TextComponent>
                                <Picker
                                    selectedValue={formData.slot_status}
                                    onValueChange={(value) => setFormData({ ...formData, slot_status: value })}
                                    style={styles.picker}
                                >
                                    {slotStatus.map((status) => (
                                        <Picker.Item key={status} label={status.toUpperCase()} value={status} />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        <ButtonComponent
                            title="Add Slot"
                            onPress={() => {}}
                            variant="primary"
                            style={styles.submitButton}
                        />
                    </CardComponent>
                </View>

                <View style={styles.section}>
                    <TextComponent variant="h2" style={styles.sectionTitle}>
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
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        marginBottom: 16,
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
