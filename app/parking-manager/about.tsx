import { StyleSheet, View } from "react-native";
import React from "react";
import { default as AboutScreen } from "@/components/AboutScreen";
import ResponsiveContainer from "@components/reusable/ResponsiveContainer";
import LinkComponent from "@components/LinkComponent";

const About = () => {
    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent variant="outline" style={{ marginBottom: 16 }} href="./" label="← Back to Dashboard" />
            </View>
            <AboutScreen />
        </ResponsiveContainer>
    );
};

export default About;

const styles = StyleSheet.create({});
