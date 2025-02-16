import { StyleSheet, View, Image } from "react-native";
import React from "react";
import CardComponent from "./CardComponent";
import TextComponent from "./TextComponent";
import LinkComponent from "./LinkComponent";
import ResponsiveContainer from "@components/reusable/ResponsiveContainer";

const ContactScreen = () => {
    return (
        <ResponsiveContainer>
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
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    contactCard: {
        borderRadius: 10,
        padding: 20,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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
