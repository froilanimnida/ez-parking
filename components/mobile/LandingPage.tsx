import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import LinkComponent from "../LinkComponent";
import { themes } from "../themes";

const LandingPage = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.heroSection}>
                    <LinkComponent
                        asButton={true}
                        href="/user"
                        label="Get Started"
                        style={styles.parkingManagerButton}
                    />
                    <Text style={styles.heroText}>Find Your Perfect Parking Spot</Text>
                    <Text style={styles.heroSubText}>
                        View real-time availability and book parking spaces instantly. Save time and hassle with EZ
                        Parking.
                    </Text>
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
        paddingTop: StatusBar.currentHeight,
        justifyContent: "center",
        alignItems: "center",
    },
    heroText: {
        fontSize: 24,
        fontFamily: "Inter",
        fontWeight: "bold",
    },
    heroSubText: {
        fontSize: 16,
        fontFamily: "Inter",
        textAlign: "center",
    },
    parkingManagerButton: {
        backgroundColor: themes.primaryColor,
    },
});
