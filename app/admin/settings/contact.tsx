import React from "react";
import { View, Image, StyleSheet, Linking, TouchableOpacity } from "react-native";
import TextComponent from "@/components/TextComponent";
import CardComponent from "@/components/CardComponent";

const ContactCard = () => {
    const handlePress = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <CardComponent customStyles={styles.card} header="Contact Us">
                <View style={styles.content}>
                    <View style={styles.imageContainer}>
                        <Image source={require("@/assets/images/binigirls.jpg")} style={styles.profileImage} />
                    </View>

                    <View style={styles.details}>
                        <TextComponent style={styles.title}>Nearby Spot</TextComponent>
                        <TextComponent>(63+) 123-456-789</TextComponent>

                        <TouchableOpacity onPress={() => handlePress("mailto:nearbyspot@gmail.com")}>
                            <TextComponent style={styles.link}>nearbyspot@gmail.com</TextComponent>
                        </TouchableOpacity>

                        <View style={styles.socialLinks}>
                            <TouchableOpacity
                                style={styles.socialItem}
                                onPress={() => handlePress("https://facebook.com/nearbyspot")}
                            >
                                <Image source={require("@/assets/images/facebook.png")} style={styles.socialIcon} />
                                <TextComponent style={styles.link}>facebook.com/nearbyspot</TextComponent>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.socialItem}
                                onPress={() => handlePress("https://instagram.com/nearbyspot")}
                            >
                                <Image source={require("@/assets/images/instagram.jpg")} style={styles.socialIcon} />
                                <TextComponent style={styles.link}>instagram.com/nearbyspot</TextComponent>
                            </TouchableOpacity>
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
        padding: 16,
        justifyContent: "center",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    imageContainer: {
        marginRight: 20,
    },
    profileImage: {
        width: 80,
        height: 130,
        borderRadius: 40,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    link: {
        color: "#0077b6",
        marginVertical: 4,
    },
    socialLinks: {
        marginTop: 12,
    },
    socialItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 6,
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
});

export default ContactCard;
