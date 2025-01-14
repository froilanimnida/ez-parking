import { StyleSheet, TextInput, type KeyboardTypeOptions } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { baseStyles } from "@/styles/components";

interface TextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    customStyles?: object;
    keyboardType?: KeyboardTypeOptions | "default";
    maxLength?: number;
    editable?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
}

const TextInputComponent = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    customStyles,
    keyboardType = "default",
    maxLength,
    editable = true,
    multiline = false,
    numberOfLines,
}: TextInputProps) => {
    useFonts({
        Inter: require("./../assets/fonts/InterVariable.ttf"),
    });
    return (
        <TextInput
            maxLength={maxLength}
            style={[customStyles, styles.input]}
            placeholder={placeholder}
            value={value}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            editable={editable}
            multiline={multiline}

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
        borderColor: baseStyles.primary.backgroundColor,
        borderWidth: 2,
    },
});
