import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import LinkComponent from "../LinkComponent";
import TextComponent from "../TextComponent";

const LandingPage = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.heroSection}>
                    <TextComponent variant="h1" style={styles.heroText}>
                        Find Your Perfect Parking Spot
                    </TextComponent>
                    <TextComponent style={styles.heroSubText} variant="body">
                        View real-time availability and book parking spaces instantly. Save time and hassle with EZ
                        Parking.
                    </TextComponent>
                    <LinkComponent href="./user" variant="primary" label="Get Started" />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LandingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    heroSection: {
        width: "100%",
        height: "100%",
        flex: 1,
        gap: 20,
        paddingTop: StatusBar.currentHeight,
        justifyContent: "center",
        alignItems: "center",
    },
    heroText: {
        fontWeight: "bold",
    },
    heroSubText: {
        textAlign: "center",
    },
});
