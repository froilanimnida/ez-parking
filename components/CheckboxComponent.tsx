import React from "react";
import { View, StyleSheet } from "react-native";
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Checkbox value={value} onValueChange={onValueChange} style={[customStyles, styles.checkbox]} />
            <TextComponent>{placeholder}</TextComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        borderColor: "rgb(209 213 219)",
        borderRadius: 4,
    },
});

export default CheckboxComponent;
