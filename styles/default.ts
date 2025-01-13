import { Platform, StatusBar, type ViewStyle } from "react-native";

const defaultContainerStyles: ViewStyle = {
    width: "100%",
    backgroundColor: "#F9FAFB",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
} as const;

const defaultBodyStyles: ViewStyle = {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    width: "90%",
    maxWidth: 1536,
} as const;

export { defaultContainerStyles, defaultBodyStyles };
