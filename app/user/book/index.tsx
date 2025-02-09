import React from "react";
import EstablishmentSearch from "@/components/BookComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import LinkComponent from "@/components/LinkComponent";

const index = () => {
    return (
        <ResponsiveContainer>
            <LinkComponent style={{ width: "auto", marginBottom: 16 }} href="../user" label="← Back to Dashboard" />
            <EstablishmentSearch guest={false} />
        </ResponsiveContainer>
    );
};

export default index;
