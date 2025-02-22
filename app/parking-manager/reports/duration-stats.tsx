import React, { useEffect } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { durationStatsReport } from "@lib/api/reports";

const DurationStatistics = () => {
    useEffect(() => {
        const fetchDurationStatistics = async () => {
            try {
                const res = durationStatsReport();
                console.log(res);
            } catch {
                alert("Error fetching duration statistics.");
            }
        };
    }, []);
    return (
        <ResponsiveContainer>
            <TextComponent>DurationStatistics</TextComponent>
        </ResponsiveContainer>
    );
};

export default DurationStatistics;
