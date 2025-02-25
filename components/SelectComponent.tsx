import { StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useFonts } from "expo-font";

interface SelectComponentProps {
    items: { label: string; value: string }[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    customStyles?: object;
    placeholder?: string;
}

const SelectComponent = ({ items, selectedValue, onValueChange, placeholder, customStyles }: SelectComponentProps) => {
    useFonts({
        Inter: require("./../assets/fonts/InterVariable.ttf"),
    });
    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={[customStyles, styles.picker]}
            placeholder={placeholder}
        >
            {items.map((item, index) => (
                <Picker.Item
                    key={index}
                    label={(item.label.charAt(0).toUpperCase() + item.label.slice(1)).replaceAll(/_/g, " ")}
                    value={item.value}
                />
            ))}
        </Picker>
    );
};

export default SelectComponent;

const styles = StyleSheet.create({
    picker: {
        fontFamily: "Inter",
        width: "100%",
        height: 48,
        borderRadius: 8,
        backgroundColor: "#F9FAFB",
        paddingLeft: 16,
        borderColor: "rgb(209 213 219)",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.1)",
        paddingRight: 32,
        marginBottom: 16,
    },
});
