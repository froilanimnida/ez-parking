import React from "react";
import { StyleSheet, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useFonts } from "expo-font";
import TextComponent from "./TextComponent";

interface CheckboxComponentProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    placeholder?: string;
    customStyles?: object;
}

const CheckboxComponent = ({ value, onValueChange, customStyles, placeholder }: CheckboxComponentProps) => {
    useFonts({
        Inter: require("./../assets/fonts/InterVariable.ttf"),
    });
    return (
        <View>
            <Checkbox value={value} onValueChange={onValueChange} style={[customStyles, styles.checkbox]} />
            <TextComponent>{placeholder}</TextComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        fontFamily: "Inter",
    },
});

export default CheckboxComponent;
