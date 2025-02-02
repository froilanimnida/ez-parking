import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CardComponent from "@/components/CardComponent";
import ButtonComponent from "@/components/ButtonComponent";
import LinkComponent from "@/components/LinkComponent";
import TextInputComponent from "@/components/TextInputComponent";
import axiosInstance from "@/lib/axiosInstance";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import { router } from "expo-router";

const createAccount = async (
    email: string,
    middleName: string,
    firstName: string,
    lastName: string,
    phone: string,
    nickname: string,
    plateNumber: string,
    suffix: string
) => {
    const result = await axiosInstance.post(`${process.env.EXPO_PUBLIC_API_USER_ROOT}/create-new-account`, {
        user: {
            email: email,
            first_name: firstName,
            last_name: lastName,
            middle_name: middleName,
            phone_number: phone as string,
            plate_number: plateNumber,
            nickname: nickname,
            suffix: suffix,
        },
    });
    if (result.status != 201) return Promise.reject(result.data);
    return result;
};

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
            await createAccount(
                formData.email,
                formData.middleName,
                formData.firstName,
                formData.lastName,
                formData.phone,
                formData.nickname,
                formData.plateNumber,
                formData.suffix
            );
            alert("Account created successfully.");
            router.replace("/auth/login");
        } catch (err) {
            const errorResponse = err as { code: string; message: string };
            alert(errorResponse.message || "An error occurred.");
        }
    };

    return (
        <ResponsiveContainer>
            <View style={styles.container}>
                <CardComponent header="Sign up" subHeader="Create an account to get started">
                    <View style={styles.form}>
                        <TextInputComponent
                            customStyles={styles.input}
                            placeholder="First Name"
                            value={formData.firstName}
                            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                        />
                        <TextInputComponent
                            customStyles={styles.input}
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                        />
                        <TextInputComponent
                            customStyles={styles.input}
                            placeholder="Middle Name"
                            value={formData.middleName}
                            onChangeText={(text) => setFormData({ ...formData, middleName: text })}
                        />
                        <TextInputComponent
                            customStyles={styles.input}
                            placeholder="Suffix"
                            value={formData.suffix}
                            onChangeText={(text) => setFormData({ ...formData, suffix: text })}
                        />
                        <TextInputComponent
                            customStyles={styles.input}
                            placeholder="Email Address"
                            keyboardType="email-address"
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                        />
                        <TextInputComponent
                            customStyles={styles.input}
                            placeholder="Phone Number (11 digits)"
                            keyboardType="phone-pad"
                            maxLength={11}
                            value={formData.phone}
                            onChangeText={(text) => setFormData({ ...formData, phone: text })}
                        />
                        <TextInputComponent
                            customStyles={styles.input}
                            placeholder="Nickname"
                            value={formData.nickname}
                            onChangeText={(text) => setFormData({ ...formData, nickname: text })}
                        />
                        <TextInputComponent
                            customStyles={styles.input}
                            placeholder="Plate number"
                            value={formData.plateNumber}
                            onChangeText={(text) => setFormData({ ...formData, plateNumber: text })}
                        />

                        <ButtonComponent title="Sign Up" onPress={handleSignUp} variant="primary" />

                        <View style={styles.loginLink}>
                            <LinkComponent
                                href="./login"
                                label="Login to my account instead"
                                variant="text"
                                textStyle={{ color: "#000000" }}
                            />
                        </View>
                        <View style={styles.loginLink}>
                            <LinkComponent
                                href="../auth/sign-up/parking-manager"
                                label="Sign up as a parking manager"
                                variant="text"
                                textStyle={{ color: "#000000" }}
                            />
                        </View>
                    </View>
                </CardComponent>
            </View>
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    form: {
        gap: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        fontSize: 14,
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
