import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import PlatformType from "../helper/platform";

export const tabsConfig: BottomTabNavigationOptions = {
    tabBarActiveTintColor: "blue",
    headerShown: false,
    headerTransparent: true,
    headerTitleAlign: "center",
    tabBarStyle: {
        display: PlatformType() === "web" ? "none" : "flex",
    },
} as const;
