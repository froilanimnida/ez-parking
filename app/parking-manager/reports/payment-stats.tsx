import React, { useEffect } from "react";
import ResponsiveContainer from "@/components/reusable/ResponsiveContainer";
import TextComponent from "@components/TextComponent";
import { paymentStatsReport } from "@lib/api/reports";

const PaymentStatistics = () => {
    useEffect(() => {
        const fetchPaymentStatistics = async () => {
            try {
                const result = paymentStatsReport();
                console.log(result);
            } catch {
                alert("Error fetching payment statistics.");
            }
        };
    }, []);
    return (
        <ResponsiveContainer>
            <TextComponent>PaymentStatistics</TextComponent>
        </ResponsiveContainer>
    );
};

export default PaymentStatistics;
