import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link, type ExternalPathString, type RelativePathString } from "expo-router";
import React from "react";
import { useFonts } from "expo-font";

type LinkComponentProps = {
    asButton: boolean;
    href: RelativePathString | ExternalPathString;
    label: string;
    style?: object;
};

const LinkComponent = ({ asButton, href, label, style }: LinkComponentProps) => {
    let [fontsLoaded] = useFonts({
        Inter: require("../assets/fonts/InterVariable.ttf"),
    });
    return asButton ? (
        <Pressable style={{ ...style }}>
            <Link href={href}>
                <Text style={styles.label}>{label}</Text>
            </Link>
        </Pressable>
    ) : (
        <Link href={href} style={{ ...style }}>
            <Text style={styles.label}>{label}</Text>
        </Link>
    );
};

export default LinkComponent;

const styles = StyleSheet.create({
    label: {
        fontFamily: "Inter",
        fontSize: 16,
    },
});
