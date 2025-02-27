import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CheckboxComponent from "@components/CheckboxComponent";
import TextComponent from "@components/TextComponent";
import ButtonComponent from "@components/ButtonComponent";
import CardComponent from "@/components/CardComponent";
import TextInputComponent from "@/components/TextInputComponent";
import { AxiosError } from "axios";
import { isAuthenticated } from "@/lib/credentialsManager";
import { router, useLocalSearchParams, type ExternalPathString, type RelativePathString } from "expo-router";
import LinkComponent from "@/components/LinkComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import { loginUser, verifyOTP } from "@/lib/api/auth";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import React from "react";

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
        let interval: NodeJS.Timeout | null = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setShowOtpForm(false);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timer]);

    const nextParams = local.next as RelativePathString | ExternalPathString;
    const [isChecking, setIsChecking] = useState(true);
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const auth = await isAuthenticated();
                console.log(auth);

                if (auth.loggedIn && auth.role) {
                    if (nextParams && auth.role === "user") {
                        router.replace(nextParams);
                        return;
                    }
                    router.replace(auth.role.replace("_", "-") as ExternalPathString);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setIsChecking(false);
            }
        };

        checkAuthStatus().then();
        return () => {
            setIsChecking(false);
        };
    }, [nextParams]);

    const handleOtpOnChange = (otp: string) => {
        if (otp.length === 6) {
            handleOTP(otp).then();
        }
    };
    const handleLogin = async () => {
        setLoggingIn(true);
        try {
            await loginUser(email.toLowerCase());
            setTimeout(() => {
                setShowOtpForm(true);
                setLoggingIn(false);
                startTimer();
            }, 1500);
        } catch (error: unknown) {
            const err = error as AxiosError;
            const errorBody = err.response!.data as { code: string; message: string };
            alert(errorBody?.message || "An error occurred");
            setLoggingIn(false);
        }
    };
    const handleOTP = async (otp: string) => {
        setLoggingIn(true);
        try {
            const result = await verifyOTP(email, otp, rememberMe);
            const role = result.data.role as string;

            alert("Logged in successfully.");

            if (nextParams && role === "user") {
                router.replace(nextParams);
                return;
            }

            router.replace(role.replace("_", "-") as ExternalPathString);
        } catch (error) {
            console.error("Login error:", error);
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Invalid OTP code";
                alert(errorMessage);
            } else {
                alert("An unexpected error occurred");
            }
        } finally {
            setLoggingIn(false);
        }
    };

    return (
        <ResponsiveContainer>
            {isChecking && <LoadingComponent text="Checking authentication status..." />}
            {!isChecking && (
                <View style={styles.body}>
                    {!showOtpForm ? (
                        <View style={styles.loginForm}>
                            <CardComponent header="Welcome back" subHeader="Please enter your registered email address">
                                <TextInputComponent
                                    customStyles={styles.input}
                                    placeholder="Email address"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                />
                                <CheckboxComponent
                                    onValueChange={setRememberMe}
                                    value={rememberMe}
                                    placeholder="Remember me"
                                    customStyles={{ marginVertical: 16 }}
                                />
                                <ButtonComponent
                                    title="Continue"
                                    onPress={handleLogin}
                                    variant="primary"
                                    loading={loggingIn}
                                    disabled={!isEmailValid(email) || loggingIn}
                                />
                                <View style={{ alignSelf: "center" }}>
                                    <LinkComponent
                                        href="./sign-up"
                                        label="Create user account"
                                        variant="outline"
                                        style={{
                                            marginTop: 16,
                                            width: "100%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    />
                                </View>
                            </CardComponent>
                        </View>
                    ) : (
                        <View style={styles.loginForm}>
                            <CardComponent
                                header="Verify your email"
                                subHeader={`Enter the 6-digit code sent to ${email}`}
                            >
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
                            </CardComponent>
                        </View>
                    )}
                </View>
            )}
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
