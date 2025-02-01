import { ScrollView, View, Platform, KeyboardAvoidingView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PlatformType from "@/lib/platform";

interface ResponsiveContainerProps {
    children: React.ReactNode;
}

const ResponsiveContainer = ({ children }: ResponsiveContainerProps) => {
    return (
        <SafeAreaView
            style={{ flex: 1, paddingTop: PlatformType() == "web" ? 16 : 0 }}
            edges={["top", "left", "right"]}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: "center",
                        ...(Platform.OS === "web" && {
                            display: "flex",
                            flex: 1,
                        }),
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{
                            width: "100%",
                            maxWidth: 1536,
                            paddingHorizontal: 16,
                            paddingBottom: Platform.OS !== "web" ? 24 : 0,
                            ...(Platform.OS === "web" && {
                                flex: 1,
                            }),
                        }}
                    >
                        {children}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ResponsiveContainer;
