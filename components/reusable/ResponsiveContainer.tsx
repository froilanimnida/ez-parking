import { ScrollView, View, KeyboardAvoidingView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PlatformType from "@/lib/platform";

interface ResponsiveContainerProps {
    children: React.ReactNode;
}

const ResponsiveContainer = ({ children }: ResponsiveContainerProps) => {
    return (
        <SafeAreaView
            style={{ flex: 1 }}
            edges={PlatformType() === "web" ? ["left", "right"] : ["left", "right", "bottom", "top"]}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={PlatformType() === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={PlatformType() === "ios" ? 64 : 0}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingVertical: 32,
                        alignItems: "center",
                        ...(PlatformType() === "web" && {
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
                            ...(PlatformType() === "web" && {
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
