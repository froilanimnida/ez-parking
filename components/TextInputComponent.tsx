import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

interface TextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    customStyles?: object;
}

const TextInputComponent = ({ placeholder, value, onChangeText, secureTextEntry, customStyles }: TextInputProps) => {
    useFonts({
        Inter: require("./../assets/fonts/InterVariable.ttf"),
    });
    return (
        <TextInput
            style={[customStyles, styles.input]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    );
};

export default TextInputComponent;

const styles = StyleSheet.create({
    input: {
        fontFamily: "Inter",
        width: "100%",
        height: 48,
        borderRadius: 8,
        backgroundColor: "#F9FAFB",
        paddingLeft: 16,
        marginBottom: 16,
    },
});
