import LandingPage from "@/components/mobile/LandingPage";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
    return (
        <View style={styles.container}>
            <LandingPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
