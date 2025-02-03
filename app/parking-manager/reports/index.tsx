import { StyleSheet } from "react-native";
import React from "react";
import { defaultContainerStyles, defaultBodyStyles } from "@/styles/default";
import TextComponent from "@/components/TextComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";

const Reports = () => {
    return (
        <ResponsiveContainer>
            <TextComponent bold variant="h1">
                Reports
            </TextComponent>
        </ResponsiveContainer>
    );
};

export default Reports;

const styles = StyleSheet.create({
    container: { ...defaultContainerStyles },
    body: { ...defaultBodyStyles },
});
