import { StyleSheet } from "react-native";
import React from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@/components/TextComponent";

const TransactionDetailsEntry = () => {
    return (
        <ResponsiveContainer>
            <TextComponent bold variant="h1">
                TransactionDetailsEntry
            </TextComponent>
        </ResponsiveContainer>
    );
};

export default TransactionDetailsEntry;

const styles = StyleSheet.create({});
