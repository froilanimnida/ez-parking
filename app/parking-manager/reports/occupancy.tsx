import ResponsiveContainer from "@components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { useEffect } from "react";
import { occupancyReport } from "@lib/api/reports";

const Occupancy = () => {
    useEffect(() => {
        const fetchOccupancyReport = async () => {
            try {
                const result = occupancyReport();
                console.log(result);
            } catch {
                alert("Error fetching occupancy report");
            }
        };
    }, []);
    return (
        <ResponsiveContainer>
            <TextComponent>Occupancy</TextComponent>
        </ResponsiveContainer>
    );
};

export default Occupancy;
