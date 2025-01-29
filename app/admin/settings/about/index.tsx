import { StyleSheet, Text, View } from "react-native";
import React from "react";
import About from "@/components/AboutScreen";
import { defaultContainerStyles } from "@/styles/default";

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <About />
        </View>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        ...defaultContainerStyles,
    },
});
