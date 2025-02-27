import { type ViewStyle } from "react-native";

type BaseVariant = "primary" | "secondary" | "text" | "destructive" | "outline" | "ghost";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface BaseComponentProps {
    style?: ViewStyle;
    textStyle?: object;
    loading?: boolean;
    disabled?: boolean;
    variant?: BaseVariant;
    size?: Size;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    fullWidth?: boolean;
    children?: React.ReactNode;
}

export type { BaseVariant, Size, BaseComponentProps };
