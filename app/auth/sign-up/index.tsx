import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CardComponent from "@/components/CardComponent";
import ButtonComponent from "@/components/ButtonComponent";
import LinkComponent from "@/components/LinkComponent";
import TextInputComponent from "@/components/TextInputComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import { router } from "expo-router";
import { createAccount } from "@/lib/api/user";
import type { SimplifiedValidationError } from "@/lib/models/validationError";
import type { AxiosError } from "axios";

const UserSignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        phone: "",
        nickname: "",
        plateNumber: "",
        suffix: "",
    });

    const handleSignUp = async () => {
        try {
            const result = await createAccount(
                formData.email,
                formData.middleName,
                formData.firstName,
                formData.lastName,
                formData.phone,
                formData.nickname,
                formData.plateNumber,
                formData.suffix,
            );
            if (result.status === 201) {
                alert("Account created successfully.");
            }
            router.replace("/auth/login");
        } catch (error: unknown) {
            const err = error as AxiosError;
            if (err.status === 422) {
                if ((error as any)?.name === "ValidationError") {
                    const validationError = error as SimplifiedValidationError;
                    alert(validationError.messages.join("\n\n"));
                }
            } else {
                const err = error as AxiosError as { response: { data: { message: string } } };
                alert(err.response?.data!.message || "An error occurred.");
            }
        }
    };

    return (
        <ResponsiveContainer>
            <CardComponent header="Sign up" subHeader="Create an account to get started">
                <View style={styles.form}>
                    <TextInputComponent
                        placeholder="First Name"
                        value={formData.firstName}
                        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                    />
                    <TextInputComponent
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                    />
                    <TextInputComponent
                        placeholder="Middle Name"
                        value={formData.middleName}
                        onChangeText={(text) => setFormData({ ...formData, middleName: text })}
                    />
                    <TextInputComponent
                        placeholder="Suffix"
                        value={formData.suffix}
                        onChangeText={(text) => setFormData({ ...formData, suffix: text })}
                    />
                    <TextInputComponent
                        placeholder="Email Address"
                        keyboardType="email-address"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                    />
                    <TextInputComponent
                        placeholder="Phone Number (11 digits)"
                        keyboardType="phone-pad"
                        maxLength={11}
                        value={formData.phone}
                        onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    />
                    <TextInputComponent
                        placeholder="Nickname"
                        value={formData.nickname}
                        onChangeText={(text) => setFormData({ ...formData, nickname: text })}
                    />
                    <TextInputComponent
                        placeholder="Plate number"
                        value={formData.plateNumber}
                        onChangeText={(text) => setFormData({ ...formData, plateNumber: text })}
                    />

                    <ButtonComponent
                        title="Sign Up"
                        onPress={handleSignUp}
                        disabled={
                            !formData.firstName ||
                            !formData.lastName ||
                            !formData.email ||
                            !formData.phone ||
                            !formData.plateNumber
                        }
                        variant="primary"
                    />
                    <View style={{ alignSelf: "center" }}>
                        <LinkComponent href="./login" label="Login to my account instead" variant="text" />
                    </View>
                </View>
            </CardComponent>
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    form: {
        gap: 16,
    },
    error: {
        color: "#DC2626",
        textAlign: "center",
        fontSize: 14,
    },
    loginLink: {
        width: "100%",
        alignItems: "center",
        marginTop: 16,
    },
});

export default UserSignUp;
