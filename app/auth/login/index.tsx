import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import TextComponent from "components/TextComponent";
import ButtonComponent from "components/ButtonComponent";
import CardComponent from "@/components/CardComponent";
import axiosInstance from "@/lib/axiosInstance";
import TextInputComponent from "@/components/TextInputComponent";
import type { AxiosError } from "axios";
import { getAuthHeaders } from "@/lib/credentialsManager";
import {
    router,
    useGlobalSearchParams,
    useLocalSearchParams,
    type ExternalPathString,
    type RelativePathString,
} from "expo-router";
import LinkComponent from "@/components/LinkComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";

const loginUser = async (email: string) => {
    const result = await axiosInstance.post("auth/login", {
        email: email,
    });
    if (result.status >= 400) return Promise.reject(result.data);
    console.log(result);
    return result;
};

const verifyOTP = async (email: string, otp: string, rememberMe: boolean) => {
    const result = await axiosInstance.patch(`/auth/verify-otp`, {
        email: email,
        otp: otp,
        remember_me: rememberMe,
    });
    return result;
};

const LoginForm = () => {
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [email, setEmail] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [timer, setTimer] = useState(0);
    const local = useLocalSearchParams();
    const isEmailValid = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const startTimer = () => {
        setTimer(300);
    };

    useEffect(() => {
        const nextParams = local.next as RelativePathString | ExternalPathString;
        setTimeout(() => {
            router.replace(nextParams);
        }, 1500);
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpOnChange = (otp: string) => {
        if (otp.length === 6) {
            handleOTP(otp);
        }
    };
    const handleLogin = async () => {
        setLoggingIn(true);
        try {
            await loginUser(email);
            alert("OTP sent successfully.");
            setTimeout(() => {
                setShowOtpForm(true);
                setLoggingIn(false);
                startTimer();
            }, 1500);
        } catch (error) {
            const errorBody = error as { code: string; message: string };
            alert(errorBody?.message || "An error occurred");
            setLoggingIn(false);
        }
    };
    const handleOTP = async (otp: string) => {
        setLoggingIn(true);
        try {
            const result = await verifyOTP(email, otp, rememberMe);
            const headers = await getAuthHeaders();
            if (!headers.Authorization) {
                console.warn("No authorization token found");
            }
            console.log(result.data.role);
            router.replace(result.data.role);

            alert("Logged in successfully.");
            setLoggingIn(false);
        } catch (error) {
            console.error("Login error:", error);
            const errorBody = error as AxiosError;
            const errorMessage = errorBody.response?.data as { code: string; message: string };
            alert(errorMessage.message || "An error occurred");
            setLoggingIn(false);
        }
    };

    return (
        <ResponsiveContainer>
            <View style={styles.body}>
                {!showOtpForm ? (
                    <View style={styles.loginForm}>
                        <CardComponent
                            header="Welcome back"
                            subHeader="Please enter your registered email address"
                            customStyles={{ gap: 16 }}
                        >
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
                            <LinkComponent href="./sign-up" label="Create user account" variant="text" />
                        </CardComponent>
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
                                            onChangeText={handleOtpOnChange}
                                        />
                                    </View>

                                    <TextComponent style={styles.timerText}>
                                        Get new code in {timer} seconds
                                    </TextComponent>
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
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    body: {
        minHeight: "100%",
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
    },
    loginForm: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
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
