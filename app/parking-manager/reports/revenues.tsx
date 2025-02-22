import React, { useEffect } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { revenueReport } from "@lib/api/reports";

const Revenues = () => {
    useEffect(() => {
        const fetchRevenues = async () => {
            try {
                // fetch revenues
                const result = await revenueReport();
                console.log(result);
            } catch {
                alert("Error fetching revenues.");
            }
        };
    }, []);
    return (
        <ResponsiveContainer>
            <TextComponent>Revenues</TextComponent>
        </ResponsiveContainer>
    );
};

export default Revenues;
