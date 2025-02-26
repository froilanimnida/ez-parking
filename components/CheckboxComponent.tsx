import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Checkbox from "expo-checkbox";
import TextComponent from "./TextComponent";

interface CheckboxComponentProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    placeholder?: string;
    customStyles?: object;
}

const CheckboxComponent = ({ value, onValueChange, customStyles, placeholder }: CheckboxComponentProps) => {
    return (
        <View style={styles.container}>
            <Checkbox value={value} onValueChange={onValueChange} style={[styles.checkbox, customStyles]} />
            <TextComponent>{placeholder}</TextComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    checkbox: {
        width: 15,
        height: 15,
        borderColor: "rgb(209 213 219)",
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: "white",
        ...Platform.select({
            web: {
                outlineColor: "rgb(79 70 229)",
                outlineWidth: 2,
            },
        }),
    },
});

export default CheckboxComponent;
