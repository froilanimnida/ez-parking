import { StyleSheet, View } from "react-native";
import React from "react";
import EstablishmentSearch from "@/components/BookComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultBodyStyles, responsiveContainer } from "@/styles/default";

const index = () => {
    return (
        <SafeAreaView style={[responsiveContainer, { width: "100%" }]}>
            <View style={{ ...defaultBodyStyles }}>
                <EstablishmentSearch />
            </View>
        </SafeAreaView>
    );
};

export default index;

const styles = StyleSheet.create({});
