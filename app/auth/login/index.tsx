import { StyleSheet, View } from "react-native";
import PlatformType from "@/lib/platform";
import StatusBarHeight from "@/lib/statusBar";
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
        paddingTop: PlatformType() === "android" ? StatusBarHeight() : 0,
    },
});
