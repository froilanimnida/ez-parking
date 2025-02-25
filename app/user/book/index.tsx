import React from "react";
import EstablishmentSearch from "@/components/BookComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import LinkComponent from "@/components/LinkComponent";
import { View } from "react-native";

const index = () => {
    return (
        <ResponsiveContainer>
            <View style={{ alignSelf: "flex-start" }}>
                <LinkComponent
                    variant="outline"
                    style={{ width: "auto", marginBottom: 16 }}
                    href="../user"
                    label="← Back to Dashboard"
                />
            </View>
            <EstablishmentSearch guest={false} />
        </ResponsiveContainer>
    );
};

export default index;
