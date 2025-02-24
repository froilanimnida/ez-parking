import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { tabsConfig } from "@lib/config/tabsConfig";

export default function AdminLayout() {
    return (
        <Tabs screenOptions={{ ...tabsConfig, title: "Admin" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="settings/about/index"
                options={{
                    href: null,
                    title: "About",
                }}
            />
            <Tabs.Screen
                name="settings/contact/index"
                options={{
                    href: null,
                    title: "Contact",
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
                    tabBarLabel: "Establishments",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="store" color={color} size={20} />,
                    headerTitle: "Establishments",
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
                    headerTitle: "Settings",
                }}
            />
            <Tabs.Screen
                name="vehicle-types/[uuid]"
                options={{
                    title: "Vehicle Type",
                    href: null,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" color={color} size={20} />,
                }}
            />
            <Tabs.Screen
                name="establishments/[uuid]"
                options={{
                    title: "Establishment",
                    href: null,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" color={color} size={20} />,
                }}
            />
        </Tabs>
    );
}
