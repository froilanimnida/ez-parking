import { View } from "react-native";
import React from "react";
import ResponsiveContainer from "@components/reusable/ResponsiveContainer";
import AboutScreen from "@components/AboutScreen";
import LinkComponent from "@components/LinkComponent";

const About = () => {
    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent style={{ marginBottom: 16 }} href="./" label="← Back" variant={"outline"} />
            </View>
            <AboutScreen />
        </ResponsiveContainer>
    );
};

export default About;
