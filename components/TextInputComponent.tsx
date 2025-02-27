import { StyleSheet, TextInput, type KeyboardTypeOptions, Platform } from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";

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
    ref?: React.LegacyRef<TextInput>;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    autoFocus?: boolean;
    type?: string;
    defaultValue?: string;
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
    ref,
    numberOfLines,
    autoCapitalize = "sentences",
    autoFocus = false,
}: TextInputProps) => {
    const [focused, setFocused] = useState(false);

    useFonts({
        Inter: require("./../assets/fonts/InterVariable.ttf"),
    });

    return (
        <TextInput
            maxLength={maxLength}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={[
                styles.input,
                customStyles,
                Platform.select({
                    web: {
                        outlineColor: focused && editable ? "rgb(79 70 229)" : "rgb(209 213 219)",
                        outlineWidth: 2,
                    },
                    default: {
                        borderColor: focused && editable ? "rgb(79 70 229)" : "rgb(209 213 219)",
                    },
                }),
            ]}
            placeholder={placeholder}
            ref={ref}
            value={value}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            autoCapitalize={autoCapitalize}
            autoFocus={autoFocus}
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
        paddingLeft: 24,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "rgb(209 213 219)",
    },
});
