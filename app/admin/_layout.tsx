import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { tabsConfig } from "@/lib/config/TabsConfig";

export default function AdminLayout() {
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
                name="users/index"
                options={{
                    title: "Users",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="users/[uuid]"
                options={{
                    title: "User",
                    href: null,
                }}
            />
            <Tabs.Screen
                name="establishments/index"
                options={{
                    title: "Establishments",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="store" color={color} size={20} />,
                }}
            />

            <Tabs.Screen
                name="vehicle-types/index"
                options={{
                    title: "Vehicle Types",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="car" color={color} size={20} />,
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
