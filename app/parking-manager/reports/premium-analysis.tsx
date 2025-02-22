import React, { useEffect } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { premiumAnalysisReport } from "@lib/api/reports";

const PremiumAnalysis = () => {
    useEffect(() => {
        const fetchPremiumAnalysis = async () => {
            try {
                const result = await premiumAnalysisReport();
                console.log(result);
            } catch {
                alert("Error fetching premium analysis report.");
            }
        };
    }, []);
    return (
        <ResponsiveContainer>
            <TextComponent>PremiumAnalysis</TextComponent>
        </ResponsiveContainer>
    );
};

export default PremiumAnalysis;
