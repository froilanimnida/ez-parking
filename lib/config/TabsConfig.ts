import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export const tabsConfig: BottomTabNavigationOptions = {
    tabBarActiveTintColor: "blue",
    headerShown: false,
    headerTransparent: true,
    headerTitleAlign: "center",
} as const;
