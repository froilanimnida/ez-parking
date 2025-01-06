import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface CardComponentProps {
    header: string;
    subHeader?: string;
    children: React.ReactNode;
}

const CardComponent = ({ header, subHeader, children }: CardComponentProps) => {
    return (
        <View style={styles.container}>
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
