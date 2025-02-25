import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { CameraView } from "expo-camera";
import TextComponent from "@/components/TextComponent";
import ButtonComponent from "@/components/ButtonComponent";
import CardComponent from "@/components/CardComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as RNImagePicker from "expo-image-picker";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import LoadingComponent from "@/components/reusable/LoadingComponent";
import * as ImageManipulator from "expo-image-manipulator";
import jsQR from "jsqr";
import { router } from "expo-router";
import LinkComponent from "@components/LinkComponent";

const ScanQRCode = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanning, setScanning] = useState(true);
    const [scanSuccess, setScanSuccess] = useState(false);
    useEffect(() => {
        if (permission === null) requestPermission().then();
    });

    const processImage = async (uri: string) => {
        try {
            const manipulatedImage = await ImageManipulator.manipulateAsync(uri, [], {
                base64: false,
                format: ImageManipulator.SaveFormat.PNG,
            });
            const response = await fetch(manipulatedImage.uri);
            const blob = await response.blob();
            const imageBitmap = await createImageBitmap(blob);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;
            ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
                router.push(`../parking-manager/scan/${code.data}`);
            } else {
                alert("No QR code found.");
            }
        } catch {
            alert("Error scanning QR code.");
        }
    };

    const handleBarCodeScanned = ({ data, type }: { type: string; data: string }) => {
        if (type !== "qr") return;
        setScanning(false);
        setScanSuccess(true);
        router.push(`../parking-manager/scan/${data}`);
    };

    const pickImage = async () => {
        const { status } = await RNImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === "granted") {
            const result = await RNImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                allowsMultipleSelection: false,
                mediaTypes: "images",
                quality: 1,
                selectionLimit: 1,
                base64: true,
            });
            if (!result.canceled && result.assets.length > 0) {
                const image = result.assets[0];
                await processImage(image.uri);
            }
        }
    };

    if (permission === null) {
        return (
            <ResponsiveContainer>
                <LoadingComponent text="Requesting camera permission..." />
            </ResponsiveContainer>
        );
    }
    if (!permission) {
        alert("No access to camera");
        return <ResponsiveContainer>No access to camera</ResponsiveContainer>;
    }

    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent
                    label="← Back to Dashboard"
                    style={{ width: "auto", marginBottom: 16 }}
                    href="/parking-manager"
                    variant={"outline"}
                />
            </View>
            <View style={styles.content}>
                <CardComponent header="Scan QR Code" subHeader="Scan the QR code">
                    <View style={{ height: 600, width: "100%" }}>
                        {scanning && (
                            <CameraView
                                barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                                style={styles.scanner}
                                onBarcodeScanned={handleBarCodeScanned}
                            />
                        )}
                    </View>

                    <View style={{ alignSelf: "flex-end" }}>
                        <ButtonComponent
                            title="Upload QR Code Image"
                            onPress={pickImage}
                            variant="primary"
                            style={{ marginTop: 16 }}
                            icon={<MaterialCommunityIcons color={"#fff"} name="upload" size={24} />}
                        />
                    </View>

                    {scanSuccess && (
                        <View style={styles.successMessage}>
                            <MaterialCommunityIcons name="check-circle" size={24} color="green" />
                            <TextComponent style={styles.successText}>
                                QR code scanned successfully! Redirecting...
                            </TextComponent>
                        </View>
                    )}
                </CardComponent>
            </View>
        </ResponsiveContainer>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 16,
    },
    scanner: {
        width: "100%",
        height: "100%",
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
