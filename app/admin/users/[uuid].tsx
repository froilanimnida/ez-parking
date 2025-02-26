import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ResponsiveContainer from "@components/reusable/ResponsiveContainer";
import LinkComponent from "@components/LinkComponent";

const UserDetails = () => {
    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent variant="outline" style={{ marginBottom: 16 }} href="./" label="← Back to Users" />
            </View>
            <Text>UserDetails</Text>
        </ResponsiveContainer>
    );
};

export default UserDetails;

const styles = StyleSheet.create({});
