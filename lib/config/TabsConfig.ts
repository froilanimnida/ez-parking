import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

export const tabsConfig: BottomTabNavigationOptions = {
    tabBarActiveTintColor: "blue",
    headerShown: false,
    headerTransparent: true,
    headerTitleAlign: "center",
    tabBarStyle: {
        display: Platform.OS === "web" ? "none" : "flex",
    },
} as const;
