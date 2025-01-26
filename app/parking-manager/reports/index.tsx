import { SafeAreaView, ScrollView, StyleSheet,  View } from "react-native";
import React from "react";
import { defaultContainerStyles, defaultBodyStyles } from "@/styles/default";
import TextComponent from "@/components/TextComponent";

const Reports = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.body}>
                <ScrollView>
                    <TextComponent bold variant="h1">
                        Reports
                    </TextComponent>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default Reports;

const styles = StyleSheet.create({
    container: { ...defaultContainerStyles },
    body: { ...defaultBodyStyles },
});
