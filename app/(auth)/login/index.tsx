import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginPage from "@/components/mobile/LoginPage";

const Login = () => {
    return (
        <View style={styles.container}>
            <LoginPage />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
