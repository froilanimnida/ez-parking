import React from "react";
import About from "@/components/AboutScreen";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import LinkComponent from "@components/LinkComponent";
import { View } from "react-native";

const AboutScreen = () => {
    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent variant="outline" style={{ marginBottom: 16 }} href="./" label="← Back to Dashboard" />
            </View>
            <About />
        </ResponsiveContainer>
    );
};

export default AboutScreen;
