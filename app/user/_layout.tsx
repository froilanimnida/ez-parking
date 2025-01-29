import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { tabsConfig } from "@/lib/config/TabsConfig";

export default function UserLayout() {
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
                name="book/index"
                options={{
                    title: "Book",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="transactions/index"
                options={{
                    title: "My Transactions",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cash" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="transactions/[uuid]"
                options={{
                    title: "Transaction Details",
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
        </Tabs>
    );
}
