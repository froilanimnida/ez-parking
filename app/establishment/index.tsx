import React from "react";
import EstablishmentSearch from "@/components/BookComponent";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";

const EstablishmentSearchPage = () => {
    return (
        <ResponsiveContainer>
            <EstablishmentSearch guest={true} />
        </ResponsiveContainer>
    );
};

export default EstablishmentSearchPage;
