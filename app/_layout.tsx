import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                statusBarTranslucent: true,
                navigationBarTranslucent: true,
                statusBarBackgroundColor: "transparent",
                navigationBarColor: "transparent",
                statusBarStyle: "dark",
            }}
        >
            <Stack.Screen name="index" options={{ title: "EZ Parking | Home " }} />
        </Stack>
    );
}
