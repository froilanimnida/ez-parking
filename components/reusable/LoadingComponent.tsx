import { View, ActivityIndicator } from "react-native";
import TextComponent from "../TextComponent";
import React from "react";

const LoadingComponent = ({ text }: { text: string }) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <TextComponent variant="body">{text}</TextComponent>
        </View>
    );
};

export default LoadingComponent;
