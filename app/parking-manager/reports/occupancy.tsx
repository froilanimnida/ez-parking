import ResponsiveContainer from "@components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { useEffect, useState } from "react";
import { occupancyReport } from "@lib/api/reports";
import LoadingComponent from "@components/reusable/LoadingComponent";

const Occupancy = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchOccupancyReport = async () => {
            setLoading(true);
            try {
                const result = await occupancyReport();
                console.log(result);
            } catch {
                alert("Error fetching occupancy report");
            } finally {
                setLoading(false);
            }
        };
        fetchOccupancyReport().then();
    }, []);
    return (
        <ResponsiveContainer>
            <TextComponent>Occupancy</TextComponent>
            {loading && <LoadingComponent text="Fetching occupancy report..." />}
        </ResponsiveContainer>
    );
};

export default Occupancy;
