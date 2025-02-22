import React, { useEffect } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { vehicleDistributionReport } from "@lib/api/reports";

const VehicleDistribution = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await vehicleDistributionReport();
                console.log(result);
            } catch {
                alert("Failed to fetch data.");
            }
        };
    }, []);
    return (
        <ResponsiveContainer>
            <TextComponent>VehicleDistribution</TextComponent>
        </ResponsiveContainer>
    );
};

export default VehicleDistribution;
