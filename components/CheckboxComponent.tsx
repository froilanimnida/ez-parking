import React from "react";
import { View } from "react-native";
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
            <Checkbox value={value} onValueChange={onValueChange} style={customStyles} />
            <TextComponent>{placeholder}</TextComponent>
        </View>
    );
};

export default CheckboxComponent;
