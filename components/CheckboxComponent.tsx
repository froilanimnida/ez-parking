import React from "react";
import { StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { useFonts } from "expo-font";

interface CheckboxComponentProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    customStyles?: object;
}

const CheckboxComponent = ({ value, onValueChange, customStyles }: CheckboxComponentProps) => {
    useFonts({
        Inter: require("./../assets/fonts/InterVariable.ttf"),
    });
    return <Checkbox value={value} onValueChange={onValueChange} style={[customStyles, styles.checkbox]} />;
};

const styles = StyleSheet.create({
    checkbox: {
        fontFamily: "Inter",
    },
});

export default CheckboxComponent;
