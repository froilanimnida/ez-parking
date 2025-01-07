import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface CardComponentProps {
    header: string;
    subHeader?: string;
    children: React.ReactNode;
    customStyles?: {};
}

const CardComponent = ({ header, subHeader, children, customStyles }: CardComponentProps) => {
    return (
        <View style={[styles.container, customStyles]}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{header}</Text>
                {subHeader && <Text>{subHeader}</Text>}
            </View>
            <View>{children}</View>
        </View>
    );
};

export default CardComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        elevation: 2,
    },
    headerContainer: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
});
