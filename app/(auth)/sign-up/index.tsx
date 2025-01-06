import { StyleSheet, View, SafeAreaView, Platform, StatusBar, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import CardComponent from "@/components/CardComponent";
import TextComponent from "@/components/TextComponent";
import ButtonComponent from "@/components/ButtonComponent";
import LinkComponent from "@/components/LinkComponent";

const UserSignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        phone: "",
        nickname: "",
        plateNumber: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        try {
            // TODO: Add your API call here...
            console.log("success");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ width: "100%", height: "100%" }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                    <CardComponent
                        header="Sign up"
                        subHeader="Create an account to get started"
                        customStyles={{ width: "89%" }}
                    >
                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                value={formData.firstName}
                                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Middle Name"
                                value={formData.middleName}
                                onChangeText={(text) => setFormData({ ...formData, middleName: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                keyboardType="email-address"
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Phone Number (11 digits)"
                                keyboardType="phone-pad"
                                maxLength={11}
                                value={formData.phone}
                                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nickname"
                                value={formData.nickname}
                                onChangeText={(text) => setFormData({ ...formData, nickname: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Plate number"
                                value={formData.plateNumber}
                                onChangeText={(text) => setFormData({ ...formData, plateNumber: text })}
                            />

                            {error ? <TextComponent style={styles.error}>{error}</TextComponent> : null}

                            <ButtonComponent title="Sign Up" onPress={handleSubmit} variant="primary" />

                            <View style={styles.loginLink}>
                                <LinkComponent
                                    href="/auth/login"
                                    label="Login to my account instead"
                                    variant="text"
                                    textStyle={{ color: "#000000" }}
                                />
                            </View>
                        </View>
                    </CardComponent>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        gap: 16,
        marginTop: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        padding: 12,
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
