import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import ButtonComponent from "@/components/ButtonComponent";
import TextInputComponent from "@/components/TextInputComponent";
import SelectComponent from "@/components/SelectComponent";
import CheckboxComponent from "@/components/CheckboxComponent";
import type { VehicleType } from "@/lib/models/vehicle-types";
import { FlashList } from "@shopify/flash-list";
import LinkComponent from "@/components/LinkComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import { getVehicleTypes } from "@/lib/api/admin";
import LoadingComponent from "@/components/reusable/LoadingComponent";

const VehicleTypes = () => {
    const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
    const [loading, setLoading] = useState(true);
    const [newVehicleType, setNewVehicleType] = useState({
        code: "",
        name: "",
        description: "",
        size_category: "SMALL",
        is_active: true,
    });

    useEffect(() => {
        const fetchVehicleTypes = async () => {
            const data = await getVehicleTypes();
            setVehicleTypes(data.data.data);
            setLoading(false);
        };
        fetchVehicleTypes();
    }, []);

    const handleInputChange = (field: string, value: string | boolean) => {
        setNewVehicleType({ ...newVehicleType, [field]: value });
    };

    const handleAddVehicleType = () => {
        console.log("Hello");
    };
    return (
        <ResponsiveContainer>
            <TextComponent bold variant="h1" style={styles.header}>
                Vehicle Types
            </TextComponent>

            <View style={styles.tableContainer}>
                {loading ? (
                    <LoadingComponent text="Loading vehicle types..." />
                ) : vehicleTypes.length > 0 ? (
                    <>
                        {vehicleTypes.map((item) => (
                            <CardComponent
                                customStyles={{ gap: 16, marginBottom: 16 }}
                                header="Vehicle Type Information"
                                subHeader="Review and manage this vehicle type"
                            >
                                <View style={{ gap: 16 }}>
                                    <View>
                                        <TextComponent>Code</TextComponent>
                                        <TextComponent>{item.code}</TextComponent>
                                    </View>
                                    <View>
                                        <TextComponent>Name</TextComponent>
                                        <TextComponent>{item.name}</TextComponent>
                                    </View>
                                    <View>
                                        <TextComponent>Description</TextComponent>
                                        <TextComponent>{item.description}</TextComponent>
                                    </View>
                                </View>
                            </CardComponent>
                        ))}
                    </>
                ) : (
                    <></>
                )}
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
                    <ButtonComponent title="Add Vehicle Type" onPress={handleAddVehicleType} style={styles.addButton} />
                </View>
            </CardComponent>
        </ResponsiveContainer>
    );
};

export default VehicleTypes;

const styles = StyleSheet.create({
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
    },
    label: {
        color: "#374151",
        fontWeight: "bold",
    },
    value: {
        color: "#374151",
    },
});
