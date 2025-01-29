import React from "react";
import { ScrollView, View, Image, StyleSheet, Dimensions, TouchableOpacity, Linking, SafeAreaView } from "react-native";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";
import { defaultBodyStyles, defaultContainerStyles } from "@/styles/default";

const developers = [
    {
        name: "Panes Jhennymae",
        role: "Project Manager",
        image: require("@/assets/images/dev-image/jhen.jpg"),
    },
    {
        name: "Uy Angelica",
        role: "Frontend Developer",
        image: require("@/assets/images/dev-image/ange.jpg"),
    },
    {
        name: "Quiñonez Aubrey Kate",
        role: "Frontend Developer",
        image: require("@/assets/images/dev-image/aubrey.jpg"),
    },
    {
        name: "Perez Ronalyn",
        role: "Backend Developer",
        image: require("@/assets/images/dev-image/rona.jpg"),
    },
    {
        name: "Villegas Sheila Mae",
        role: "App Developer",
        image: require("@/assets/images/dev-image/eya.jpg"),
    },
];

const About = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.content}>
                <TextComponent variant="h1" bold style={styles.title}>
                    About Us
                </TextComponent>

                <CardComponent customStyles={styles.section} header="About EZ Parking">
                    <TextComponent style={styles.paragraph}>
                        Welcome to EZ Parking, your premier parking solution designed to make finding available parking
                        spots easier and more efficient. Our platform is dedicated to helping drivers locate and view
                        nearby parking slots in real time.
                    </TextComponent>

                    <TextComponent variant="h2" style={styles.sectionTitle}>
                        Our Mission
                    </TextComponent>
                    <TextComponent style={styles.paragraph}>
                        At EZ Parking, our mission is to simplify the parking experience. We provide real-time updates
                        on available parking spaces, helping you save time and frustration.
                    </TextComponent>

                    <TextComponent variant="h2" style={styles.sectionTitle}>
                        What We Offer
                    </TextComponent>
                    <View style={styles.list}>
                        {[
                            "Real-time availability of parking spaces near you",
                            "User-friendly interface for easy navigation",
                            "Regular updates on new parking spots and promotions",
                            "Support for users to find the best parking options in their area",
                        ].map((item, index) => (
                            <View key={index} style={styles.listItem}>
                                <TextComponent>• {item}</TextComponent>
                            </View>
                        ))}
                    </View>

                    <TextComponent variant="h2" style={styles.sectionTitle}>
                        Meet the Developers
                    </TextComponent>

                    <View style={styles.leadDeveloper}>
                        <View style={styles.developerCard}>
                            <Image source={developers[0].image} style={styles.leadDevImage} />
                            <TextComponent style={styles.devName}>{developers[0].name}</TextComponent>
                            <TextComponent style={styles.devRole}>{developers[0].role}</TextComponent>
                        </View>
                    </View>

                    <View style={styles.developersGrid}>
                        {developers.slice(1).map((dev, index) => (
                            <View key={index} style={styles.developerCard}>
                                <Image source={dev.image} style={styles.devImage} />
                                <TextComponent style={styles.devName}>{dev.name}</TextComponent>
                                <TextComponent style={styles.devRole}>{dev.role}</TextComponent>
                            </View>
                        ))}
                    </View>

                    <TextComponent variant="h2" style={styles.sectionTitle}>
                        Contact Us
                    </TextComponent>
                    <TouchableOpacity onPress={() => Linking.openURL("mailto:support@ezparking.com")}>
                        <TextComponent style={styles.link}>support@ezparking.com</TextComponent>
                    </TouchableOpacity>
                </CardComponent>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { ...defaultContainerStyles, minHeight: 100 },
    content: {
        ...defaultBodyStyles,
    },
    title: {
        textAlign: "center",
        marginVertical: 24,
    },
    section: {
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        marginTop: 24,
        marginBottom: 12,
    },
    paragraph: {
        marginBottom: 16,
        lineHeight: 24,
    },
    list: {
        marginBottom: 24,
    },
    listItem: {
        marginBottom: 8,
    },
    leadDeveloper: {
        alignItems: "center",
        marginBottom: 24,
    },
    developersGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: 16,
    },
    developerCard: {
        padding: 16,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        elevation: 2,
    },
    leadDevImage: {
        width: 96,
        height: 96,
        borderRadius: 48,
        marginBottom: 12,
    },
    devImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    devName: {
        fontWeight: "600",
        textAlign: "center",
    },
    devRole: {
        color: "#6B7280",
        fontSize: 12,
        textAlign: "center",
    },
    link: {
        color: "#4F46E5",
        textDecorationLine: "underline",
    },
});

export default About;
