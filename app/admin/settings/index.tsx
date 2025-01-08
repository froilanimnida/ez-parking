import { StyleSheet, View, SafeAreaView, Platform, StatusBar } from "react-native";
import React from "react";
import LinkComponent from "@/components/LinkComponent";
import TextComponent from "@/components/TextComponent";

const AdminSettings = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TextComponent>AdminSettings</TextComponent>
                <View style={styles.linksContainer}>
                    <LinkComponent
                        href="/admin/settings/about"
                        label="About"
                        style={{ width: "100%" }}
                        variant="text"
                    />
                    <LinkComponent
                        href="/admin/settings/contact"
                        label="Contact"
                        style={{ width: "100%" }}
                        variant="text"
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default AdminSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    linksContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 16,
        width: "100%",
        marginTop: 16,
    },
});
