import React, { useEffect } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { trendAnalysisReport } from "@lib/api/reports";

const Trends = () => {
    useEffect(() => {
        const fetchData = async () => {
            // fetch data here
            try {
                const result = trendAnalysisReport();
                console.log(result);
            } catch {
                alert("Failed to fetch data");
            }
        };
    }, []);
    return (
        <ResponsiveContainer>
            <TextComponent>Trends</TextComponent>
        </ResponsiveContainer>
    );
};

export default Trends;
