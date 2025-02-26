import React from "react";
import EstablishmentSearch from "@/components/BookComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import LinkComponent from "@components/LinkComponent";
import { View } from "react-native";

const EstablishmentSearchPage = () => {
    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent variant="outline" style={{ marginBottom: 16 }} href="./../" label="← Back to Home" />
            </View>
            <EstablishmentSearch guest={true} />
        </ResponsiveContainer>
    );
};

export default EstablishmentSearchPage;
