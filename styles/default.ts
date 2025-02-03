import { type StyleProp, type View, type ViewStyle } from "react-native";
import PlatformType from "@/lib/platform";
import StatusBarHeight from "@/lib/statusBar";

const paddingTop = () => {
    if (PlatformType() === "android") {
        return StatusBarHeight();
    } else if (PlatformType() === "web") {
        return 16;
    } else {
        return 0;
    }
};

const defaultContainerStyles: ViewStyle = {
    width: "100%",
    backgroundColor: "#F9FAFB",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
} as const;

const defaultBodyStyles: ViewStyle = {
    flex: 1,
    width: "90%",
    maxWidth: 1536,
};

const responsiveContainer: StyleProp<ViewStyle> = {
    width: "100%",
    backgroundColor: "#f9fafb",
    minHeight: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: PlatformType() === "web" ? 16 : 0,
};

export { defaultContainerStyles, defaultBodyStyles, responsiveContainer };
