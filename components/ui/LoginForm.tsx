import { useState, useRef, useEffect, createRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import TextComponent from "components/TextComponent";
import ButtonComponent from "components/ButtonComponent";

const LoginForm = () => {
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [email, setEmail] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [timer, setTimer] = useState(0);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const otpRefs = useRef([...Array(6)].map(() => createRef()));

    const isEmailValid = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleOtpChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1].current?.focus();
        }
    };

    const startTimer = () => {
        setTimer(60);
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
        // Implement login logic here...
        setTimeout(() => {
            setShowOtpForm(true);
            setLoggingIn(false);
            startTimer();
        }, 1500);
    };

    return (
        <View style={styles.container}>
            {!showOtpForm ? (
                <View style={styles.formContainer}>
                    <View style={styles.header}>
                        <TextComponent style={styles.title}>Welcome back</TextComponent>
                        <TextComponent style={styles.subtitle}>
                            Please enter your registered email address
                        </TextComponent>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Email address"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    <View style={styles.checkbox}>
                        <Checkbox onValueChange={setRememberMe} value={rememberMe} color="#4F46E5" />
                        <Text>Remember me</Text>
                    </View>

                    <ButtonComponent
                        title="Continue"
                        onPress={handleLogin}
                        variant="primary"
                        loading={loggingIn}
                        disabled={!isEmailValid(email) || loggingIn}
                    />
                </View>
            ) : (
                <View style={styles.formContainer}>
                    <View style={styles.header}>
                        <TextComponent style={styles.title}>Verify your email</TextComponent>
                        <TextComponent style={styles.subtitle}>
                            Enter the 6-digit code sent to{" "}
                            <TextComponent style={styles.emailHighlight}>{email}</TextComponent>
                        </TextComponent>
                    </View>

                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={otpRefs.current[index]}
                                style={styles.otpInput}
                                maxLength={1}
                                keyboardType="number-pad"
                                value={digit}
                                onChangeText={(value) => handleOtpChange(index, value)}
                            />
                        ))}
                    </View>

                    <TextComponent style={styles.timerText}>Get new code in {timer} seconds</TextComponent>
                    <ButtonComponent
                        title="Resend Code"
                        onPress={startTimer}
                        variant="secondary"
                        disabled={timer > 0}
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
    formContainer: {
        padding: 20,
        borderRadius: 12,
        backgroundColor: "white",
        alignSelf: "center",
        borderColor: "#E5E7EB",
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