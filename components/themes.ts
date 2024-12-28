import { useFonts } from "expo-font";

const inter = require("./../assets/fonts/InterVariable.ttf");
const [fontsLoaded] = useFonts({
    Inter: inter,
});

export const themes = {
    backgroundColor: "#f0f0f0",
    color: "#000",
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
    successColor: "#28a745",
    dangerColor: "#dc3545",
    warningColor: "#ffc107",
    infoColor: "#17a2b8",
    lightColor: "#f8f9fa",
    darkColor: "#343a40",
    fontFace: "Inter",
};
