import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Platform, StatusBar } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useCameraPermissions } from "expo-camera";
import { CameraView } from "expo-camera";
import TextComponent from "@/components/TextComponent";
import ButtonComponent from "@/components/ButtonComponent";
import CardComponent from "@/components/CardComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ScanQRCode = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanning, setScanning] = useState(true);
    const [scanSuccess, setScanSuccess] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        if (permission === null) {
            requestPermission();
        }
    });

    const handleBarCodeScanned = ({ data, type }: { type: string; data: string }) => {
        if (type !== "qr") return;
        setScanning(false);
        setScanSuccess(true);
        setTimeout(() => {
            console.log(data);
        }, 1500);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            // TODOs:
            // Handle QR code from image
            // Note: Direct QR scanning from image requires additional processing
            setError("QR code scanning from image not supported yet");
        }
    };

    if (permission === null) {
        return <TextComponent>Requesting camera permission...</TextComponent>;
    }
    if (!permission) {
        return <TextComponent>No access to camera</TextComponent>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TextComponent variant="h1">Scan Entry QR Code</TextComponent>
                    <TextComponent style={styles.subtitle}>Scan the QR code presented by the user</TextComponent>
                </View>

                <CardComponent customStyles={styles.scannerContainer} header="Scan QR Code">
                    {scanning && (
                        <CameraView
                            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                            style={styles.scanner}
                            onBarcodeScanned={handleBarCodeScanned}
                        />
                    )}

                    <ButtonComponent
                        title="Upload QR Code Image"
                        onPress={pickImage}
                        variant="secondary"
                        icon={<MaterialCommunityIcons name="upload" size={24} />}
                    />

                    {scanSuccess && (
                        <View style={styles.successMessage}>
                            <MaterialCommunityIcons name="check-circle" size={24} color="green" />
                            <TextComponent style={styles.successText}>
                                QR code scanned successfully! Redirecting...
                            </TextComponent>
                        </View>
                    )}

                    {error && (
                        <View style={styles.errorMessage}>
                            <MaterialCommunityIcons name="alert-circle" size={24} color="red" />
                            <TextComponent style={styles.errorText}>{error}</TextComponent>
                        </View>
                    )}
                </CardComponent>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    content: {
        padding: 16,
    },
    header: {
        alignItems: "center",
        marginBottom: 24,
    },
    subtitle: {
        color: "#6B7280",
        marginTop: 8,
    },
    scannerContainer: {
        padding: 16,
        alignItems: "center",
    },
    scanner: {
        width: 300,
        height: 300,
        marginBottom: 16,
        borderRadius: 8,
    },
    successMessage: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D1FAE5",
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    successText: {
        color: "#065F46",
        marginLeft: 8,
    },
    errorMessage: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEE2E2",
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    errorText: {
        color: "#991B1B",
        marginLeft: 8,
    },
});

export default ScanQRCode;
