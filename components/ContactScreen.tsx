import { StyleSheet, View, Image, Linking } from "react-native";
import React from "react";
import CardComponent from "./CardComponent";
import TextComponent from "./TextComponent";
import { defaultBodyStyles } from "@/styles/default";
import LinkComponent from "./LinkComponent";

const ContactScreen = () => {
    return (
        <View style={styles.container}>
            <CardComponent customStyles={styles.contactCard} header="Contact Us | Nearby Spot">
                <Image source={require("@/assets/images/binigirls.jpg")} style={styles.image} />

                <View style={styles.contactDetails}>
                    <TextComponent style={styles.text}>(63+) 123-456-789</TextComponent>
                    <LinkComponent style={styles.link} href="mailto:nearbyspot@gmail.com">
                        nearbyspot@gmail.com
                    </LinkComponent>

                    <View style={styles.socialMedia}>
                        <View style={styles.socialItem}>
                            <Image source={require("@/assets/images/facebook.png")} style={styles.socialIcon} />
                            <LinkComponent href="https://facebook.com/nearbyspot" style={styles.link}>
                                facebook.com/nearbyspot
                            </LinkComponent>
                        </View>

                        <View style={styles.socialItem}>
                            <Image source={require("@/assets/images/instagram.jpg")} style={styles.socialIcon} />
                            <LinkComponent href="https://instagram.com/nearbyspot" style={styles.link}>
                                instagram.com/nearbyspot
                            </LinkComponent>
                        </View>
                    </View>
                </View>
            </CardComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    contactCard: {
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: "100%",
        maxWidth: 500,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    contactDetails: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    link: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 5,
    },
    socialMedia: {
        marginTop: 10,
    },
    socialItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
});

export default ContactScreen;
