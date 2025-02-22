import React, { useEffect } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { utilizationReport } from "@lib/api/reports";

const Utilization = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await utilizationReport();
                console.log(result);
            } catch {
                alert("Failed to fetch utilization report.");
            }
        };
    }, []);
    return (
        <ResponsiveContainer>
            <TextComponent>Utilization</TextComponent>
        </ResponsiveContainer>
    );
};

export default Utilization;
