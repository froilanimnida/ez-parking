import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { defaultBodyStyles } from "@/styles/default";
import TextInputComponent from "@/components/TextInputComponent";
import SelectComponent from "@/components/SelectComponent";
import CheckboxComponent from "@/components/CheckboxComponent";
import type { VehicleType } from "@/lib/types/models/vehicle-types";
import { FlashList } from "@shopify/flash-list";
import LinkComponent from "@/components/LinkComponent";

const fetchVehicleTypes = async () => {
    try {
        const response = await axiosInstance.get(`${process.env.EXPO_PUBLIC_API_VEHICLE_TYPE_ROOT}/all`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const VehicleTypes = () => {
    const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
    const [newVehicleType, setNewVehicleType] = useState({
        code: "",
        name: "",
        description: "",
        size_category: "SMALL",
        is_active: true,
    });

    useEffect(() => {
        fetchVehicleTypes().then((data) => {
            setVehicleTypes(data.vehicle_types);
            console.log(vehicleTypes);
        });
    }, []);

    const handleInputChange = (field, value) => {
        setNewVehicleType({ ...newVehicleType, [field]: value });
    };

    const handleAddVehicleType = () => {
        console.log("Hello");
    };

    const renderVehicleTypeItem = ({ item }: { item: VehicleType }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.code}</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.description}</Text>
            <Text style={styles.tableCell}>
                <Text
                    style={[
                        styles.sizeBadge,
                        item.size_category === "SMALL" && styles.sizeSmall,
                        item.size_category === "MEDIUM" && styles.sizeMedium,
                        item.size_category === "LARGE" && styles.sizeLarge,
                    ]}
                >
                    {item.size_category}
                </Text>
            </Text>
            <Text style={styles.tableCell}>
                <Text style={[styles.statusBadge, item.is_active ? styles.statusActive : styles.statusInactive]}>
                    {item.is_active ? "Active" : "Inactive"}
                </Text>
            </Text>
            <LinkComponent style={styles.editButton} href={`/admin/vehicle-types/${item.uuid}`} label="Edit" />
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
            <View style={styles.body}>
                <View style={styles.header}>
                    <TextComponent variant="h1">Vehicle Types</TextComponent>
                    <TextComponent style={styles.subtitle}>
                        Manage vehicle categories and their specifications
                    </TextComponent>
                </View>

                <View style={styles.tableContainer}>
                    <FlashList
                        data={vehicleTypes}
                        renderItem={renderVehicleTypeItem}
                        keyExtractor={(item) => item.uuid}
                        estimatedItemSize={100}
                    />
                </View>

                <CardComponent
                    customStyles={styles.formCard}
                    header="Add New Vehicle Type"
                    subHeader="Fill in the details below"
                >
                    <View style={styles.form}>
                        <TextInputComponent
                            customStyles={styles.input}
                            placeholder="Code"
                            value={newVehicleType.code}
                            onChangeText={(value) => handleInputChange("code", value)}
                        />
                        <TextInputComponent
                            customStyles={styles.input}
                            placeholder="Name"
                            value={newVehicleType.name}
                            onChangeText={(value) => handleInputChange("name", value)}
                        />
                        <TextInputComponent
                            customStyles={styles.input}
                            placeholder="Description"
                            value={newVehicleType.description}
                            onChangeText={(value) => handleInputChange("description", value)}
                        />
                        <SelectComponent
                            items={[
                                { label: "Small", value: "SMALL" },
                                { label: "Medium", value: "MEDIUM" },
                                { label: "Large", value: "LARGE" },
                            ]}
                            selectedValue={newVehicleType.size_category}
                            onValueChange={(value) => handleInputChange("size_category", value)}
                            customStyles={styles.picker}
                        />

                        <View style={styles.checkboxContainer}>
                            <CheckboxComponent
                                value={newVehicleType.is_active}
                                onValueChange={(value) => handleInputChange("is_active", value)}
                                customStyles={styles.checkbox}
                            />
                            <TextComponent style={styles.checkboxLabel}>Active</TextComponent>
                        </View>
                        <ButtonComponent
                            title="Add Vehicle Type"
                            onPress={handleAddVehicleType}
                            style={styles.addButton}
                        />
                    </View>
                </CardComponent>
            </View>
        </ScrollView>
    );
};

export default VehicleTypes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 16,
        width: "100%",
    },
    body: {
        width: "95%",
        maxWidth: defaultBodyStyles.maxWidth,
    },
    header: {
        marginBottom: 16,
    },
    subtitle: {
        color: "#6B7280",
        marginTop: 4,
    },
    tableContainer: {
        marginBottom: 16,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#F3F4F6",
        padding: 8,
    },
    tableHeaderCell: {
        flex: 1,
        textAlign: "center",
        fontWeight: "bold",
        color: "#374151",
    },
    tableRow: {
        flexDirection: "row",
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    tableCell: {
        flex: 1,
        textAlign: "center",
        color: "#374151",
    },
    sizeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 12,
    },
    sizeSmall: {
        backgroundColor: "#D1FAE5",
        color: "#065F46",
    },
    sizeMedium: {
        backgroundColor: "#FEF3C7",
        color: "#92400E",
    },
    sizeLarge: {
        backgroundColor: "#FEE2E2",
        color: "#B91C1C",
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 12,
    },
    statusActive: {
        backgroundColor: "#D1FAE5",
        color: "#065F46",
    },
    statusInactive: {
        backgroundColor: "#E5E7EB",
        color: "#6B7280",
    },
    editButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    editButtonText: {
        color: "#4F46E5",
    },
    formCard: {
        padding: 16,
    },
    form: {
        gap: 16,
    },
    input: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    picker: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        marginRight: 8,
    },
    checkboxLabel: {
        color: "#374151",
    },
    addButton: {
        backgroundColor: "#4F46E5",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
});
