import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import TextComponent from "components/TextComponent";
import ButtonComponent from "components/ButtonComponent";
import CardComponent from "../CardComponent";
import axiosInstance from "@/lib/axiosInstance";
import TextInputComponent from "../TextInputComponent";
import PlatformType from "@/lib/platform";

const loginUser = async (email: string) => {
    const result = await axiosInstance.post(
        `${process.env.EXPO_PUBLIC_API_AUTH_ROOT}${process.env.EXPO_PUBLIC_API_AUTH_URL}/login`,
        {
            email: email,
        }
    );
    return result;
};

const verifyOTP = async (email: string, otp: string, rememberMe: boolean) => {
    const result = await axiosInstance.post(
        `${process.env.EXPO_PUBLIC_API_AUTH_ROOT}${process.env.EXPO_PUBLIC_API_AUTH_URL}/verify-otp`,
        {
            email: email,
            otp: otp,
            remember_me: rememberMe,
        }
    );
    return result;
};

const LoginForm = () => {
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [email, setEmail] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [timer, setTimer] = useState(0);
    const [otp, setOtp] = useState("");
    const platform = PlatformType();

    const isEmailValid = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const startTimer = () => {
        setTimer(300);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleLogin = async () => {
        setLoggingIn(true);
        const result = await loginUser(email);
        if (platform !== "web") {
            alert(`Logging in with email: ${email}`);
            axiosInstance.post(`${process.env.EXPO_PUBLIC_API_AUTH_ROOT}/login`, {
                email: email,
            });
        }
        setTimeout(() => {
            setShowOtpForm(true);
            setLoggingIn(false);
            startTimer();
        }, 1500);
    };

    const handleOTP = () => {
        setLoggingIn(true);
        verifyOTP(email, otp, rememberMe).then((response) => {
            if (response.status === 200) {
                alert("OTP verified successfully");
            } else {
                alert("Invalid OTP");
            }
            setLoggingIn(false);
        });
    };

    return (
        <View style={styles.container}>
            {!showOtpForm ? (
                <View>
                    <CardComponent
                        header="Welcome back"
                        subHeader="Please enter your registered email address"
                        children={
                            <>
                                <TextInputComponent
                                    customStyles={styles.input}
                                    placeholder="Email address"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                />
                                <View style={styles.checkbox}>
                                    <Checkbox onValueChange={setRememberMe} value={rememberMe} color="#4F46E5" />
                                    <TextComponent>Remember me</TextComponent>
                                </View>

                                <ButtonComponent
                                    title="Continue"
                                    onPress={handleLogin}
                                    variant="primary"
                                    loading={loggingIn}
                                    disabled={!isEmailValid(email) || loggingIn}
                                />
                            </>
                        }
                    />
                </View>
            ) : (
                <View>
                    <CardComponent
                        header="Verify your email"
                        subHeader={`Enter the 6-digit code sent to ${email}`}
                        children={
                            <>
                                <View style={styles.otpContainer}>
                                    <TextInputComponent
                                        customStyles={styles.otpInput}
                                        maxLength={6}
                                        keyboardType="number-pad"
                                        onChangeText={setOtp}
                                    />
                                </View>

                                <TextComponent style={styles.timerText}>Get new code in {timer} seconds</TextComponent>
                                <ButtonComponent
                                    title="Resend Code"
                                    onPress={startTimer}
                                    variant="primary"
                                    disabled={timer > 0}
                                />
                            </>
                        }
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#111827",
    },
    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    checkbox: {
        backgroundColor: "transparent",
        borderWidth: 0,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 8,
    },
    button: {
        backgroundColor: "#4F46E5",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#D1D5DB",
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        marginBottom: 24,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        textAlign: "center",
    },
    timerText: {
        textAlign: "center",
        color: "#6B7280",
        marginBottom: 16,
    },
    resendButton: {
        alignItems: "center",
    },
    resendText: {
        color: "#4F46E5",
        fontWeight: "500",
    },
    resendTextDisabled: {
        color: "#9CA3AF",
    },
    emailHighlight: {
        color: "#4F46E5",
        fontWeight: "500",
    },
});

export default LoginForm;
