import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useFonts } from "expo-font";

interface SelectComponentProps {
    items: { label: string; value: string }[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    customStyles?: object;
}

const SelectComponent = ({ items, selectedValue, onValueChange, customStyles }: SelectComponentProps) => {
    useFonts({
        Inter: require("./../assets/fonts/InterVariable.ttf"),
    });
    return (
        <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={[customStyles, styles.picker]}>
            {items.map((item, index) => (
                <Picker.Item key={index} label={item.label} value={item.value} />
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
        marginBottom: 16,
    },
});
