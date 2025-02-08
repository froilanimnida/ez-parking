import { StyleSheet, View, Image } from "react-native";
import React from "react";
import LinkComponent from "../LinkComponent";
import TextComponent from "../TextComponent";

const LandingPage = () => {
    return (
        <>
            <View style={styles.header}>
                <Image source={require("../../assets/images/logo.png")} style={{ width: 100, height: 100 }} />
                <View style={{ alignContent: "center", flexDirection: "row", gap: 20 }}>
                    <LinkComponent href="./auth/login" variant="outline" label="Login" />
                    <LinkComponent href="./auth/sign-up/parking-manager" variant="primary" label="For Parking Owner" />
                </View>
            </View>
            <View style={styles.heroSection}>
                <TextComponent variant="h1" style={styles.heroText}>
                    Find Your Perfect Parking Spot
                </TextComponent>
                <TextComponent style={styles.heroSubText} variant="body">
                    View real-time availability and book parking spaces instantly. Save time and hassle with EZ Parking.
                </TextComponent>
                <LinkComponent href="./establishment" variant="primary" label="Get Started" />
            </View>
        </>
    );
};

export default LandingPage;

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: "row",
        gap: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    heroSection: {
        width: "100%",
        flex: 1,
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    heroText: {
        fontWeight: "bold",
        textAlign: "center",
    },
    heroSubText: {
        textAlign: "center",
    },
});
