import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { tabsConfig } from "@/lib/config/TabsConfig";

export default function ParkingManagerLayout() {
    return (
        <Tabs screenOptions={{ ...tabsConfig }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={20} />,
                }}
            />

            <Tabs.Screen
                name="reports/index"
                options={{
                    title: "Reports",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="file" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="scan/index"
                options={{
                    title: "Scan",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="qrcode-scan" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="transactions/index"
                options={{
                    title: "Transactions",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cash" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="settings/index"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="settings/slots/index"
                options={{
                    title: "Slots",
                    href: null,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="settings/schedule/index"
                options={{
                    title: "Schedule",
                    href: null,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="scan/[transaction_id]"
                options={{
                    title: "Scan",
                    href: null,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="transactions/[uuid]"
                options={{
                    title: "Transaction",
                    href: null,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: "About",
                    href: null,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" color={color} size={20} />,
                }}
            />
        </Tabs>
    );
}
