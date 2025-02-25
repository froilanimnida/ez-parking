import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import React from "react";
import TextComponent from "@/components/TextComponent";

interface CardComponentProps {
    header: string;
    subHeader?: string;
    children?: React.ReactNode;
    customStyles?: StyleProp<ViewStyle>;
}

const CardComponent = ({ header, subHeader, children, customStyles }: CardComponentProps) => {
    return (
        <View style={[styles.container, customStyles]}>
            <View style={styles.headerContainer}>
                <TextComponent variant="h3" style={styles.headerText}>
                    {header}
                </TextComponent>
                {subHeader && <TextComponent style={styles.subHeader}>{subHeader}</TextComponent>}
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
        flexDirection: "column",
        marginVertical: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subHeader: {
        fontSize: 14,
        color: "#9ca3af",
    },
});
