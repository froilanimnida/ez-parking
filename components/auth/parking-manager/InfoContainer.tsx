import { StyleSheet, View } from "react-native";
import React from "react";
import TextComponent from "@/components/TextComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const InfoContainer = () => {
    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoHeader}>
                <MaterialCommunityIcons name="information" size={24} color="#1E40AF" />
                <TextComponent style={styles.infoTitle}>Account Verification Process</TextComponent>
            </View>
            <View style={styles.infoContent}>
                <TextComponent style={styles.bulletPoint}>
                    • Your registration will be reviewed by our admin team
                </TextComponent>
                <TextComponent style={styles.bulletPoint}>
                    • Verification typically takes 1-2 business days
                </TextComponent>
                <TextComponent style={styles.bulletPoint}>
                    • Your establishment will be visible to customers after approval
                </TextComponent>
                <TextComponent style={styles.bulletPoint}>
                    • You'll receive an email notification once approved
                </TextComponent>
                <TextComponent style={styles.bulletPoint}>
                    • Make sure all documents are clear and valid to speed up the process
                </TextComponent>
            </View>
        </View>
    );
};

export default InfoContainer;

const styles = StyleSheet.create({
    infoTitle: {
        color: "#1E40AF",
        fontWeight: "600",
    },
    infoContent: {
        marginTop: 12,
        paddingLeft: 8,
    },
    bulletPoint: {
        color: "#1E40AF",
        marginVertical: 4,
    },
    infoContainer: {
        backgroundColor: "#EFF6FF",
        borderRadius: 8,
        padding: 16,
        marginBottom: 40,
    },
    infoHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
});
