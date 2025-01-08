import React from "react";
import { Pressable, View } from "react-native";
import { Link, type ExternalPathString, type RelativePathString } from "expo-router";
import { BaseComponentProps } from "@/lib/types/ui";
import { baseStyles } from "@/styles/components";
import TextComponent from "./TextComponent";

interface LinkProps extends BaseComponentProps {
    href: RelativePathString | ExternalPathString | string;
    label?: string;
    asChild?: boolean;
}

const LinkComponent: React.FC<LinkProps> = ({
    href,
    label,
    asChild = false,
    style,
    textStyle,
    variant = "primary",
    size = "md",
    disabled = false,
    icon,
    iconPosition = "left",
    fullWidth = false,
    children,
}) => {
    const content = children || (
        <>
            {icon && iconPosition === "left" && <View style={baseStyles.iconLeft}>{icon}</View>}
            {label && (
                <TextComponent
                    style={[
                        baseStyles[`text${size.toUpperCase()}`],
                        baseStyles[`${variant}Text`],
                        disabled && baseStyles.disabledText,
                        textStyle,
                    ]}
                >
                    {label}
                </TextComponent>
            )}
            {icon && iconPosition === "right" && <View style={baseStyles.iconRight}>{icon}</View>}
        </>
    );

    if (asChild) {
        return (
            <Link href={href} asChild>
                {children}
            </Link>
        );
    }

    const linkStyles = [
        baseStyles.container,
        baseStyles[size],
        variant !== "text" && baseStyles[variant],
        fullWidth && baseStyles.fullWidth,
        disabled && baseStyles.disabled,
        style,
    ];

    return (
        <Link href={href} style={linkStyles}>
            {content}
        </Link>
    );
};

export default LinkComponent;
