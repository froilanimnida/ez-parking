import React, { useEffect } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { peakHoursReport } from "@lib/api/reports";

const PeakHours = () => {
    useEffect(() => {
        const fetchPeakHours = async () => {
            try {
                const result = peakHoursReport();
                console.log(result);
            } catch {
                alert("Error fetching peak hours report.");
            }
        };
    }, []);
    return (
        <ResponsiveContainer>
            <TextComponent>PeakHours</TextComponent>
        </ResponsiveContainer>
    );
};

export default PeakHours;
