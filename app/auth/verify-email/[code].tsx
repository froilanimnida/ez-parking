import { StyleSheet, Animated, Easing } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Svg, Circle, Path } from "react-native-svg";
import TextComponent from "@/components/TextComponent";
import { verifyEmail } from "@/lib/api/auth";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const VerifyEmail = () => {
    const { code } = useLocalSearchParams() as { code: string };
    const spinValue = new Animated.Value(0);
    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
        const emailVerify = async () => {
            verifyEmail(code);
        };
        emailVerify();
        setTimeout(() => {
            router.replace("/auth/login");
        });
    });

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <ResponsiveContainer>
            <AnimatedSvg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                style={[styles.spinner, { transform: [{ rotate: spin }] }]}
            >
                <Circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="4" opacity="0.25" />
                <Path
                    fill="#000000"
                    opacity="0.75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </AnimatedSvg>
            <TextComponent variant="h1">Please wait...</TextComponent>
        </ResponsiveContainer>
    );
};

export default VerifyEmail;

const styles = StyleSheet.create({
    spinner: {
        transform: [{ rotate: "0deg" }],
        marginLeft: -4,
        marginRight: 12,
    },
});
