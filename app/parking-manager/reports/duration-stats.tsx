import React, { useEffect, useState } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { durationStatsReport } from "@lib/api/reports";

const DurationStatistics = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDurationStatistics = async () => {
            setLoading(true);
            try {
                const res = durationStatsReport();
                console.log(res);
            } catch {
                alert("Error fetching duration statistics.");
            } finally {
                setLoading(false);
            }
        };
        fetchDurationStatistics().then();
    }, []);
    return (
        <ResponsiveContainer>
            <TextComponent>DurationStatistics</TextComponent>
        </ResponsiveContainer>
    );
};

export default DurationStatistics;
