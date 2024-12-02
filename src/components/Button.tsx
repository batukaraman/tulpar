import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, sizes, spacing } from "@/constants/theme";
import { ButtonProps } from "@/constants/props";
import Icon from "@expo/vector-icons/Ionicons";

const Button: React.FC<ButtonProps> = ({
  style,
  text,
  variant = "primary",
  iconName = "add-outline",
  iconVisible = false,
  iconFloat = "left",
  onlyIcon = false,
  disable = false,
  onPress,
}) => {
  const [buttonHeight, setButtonHeight] = useState(0);

  const getVariantStyles = () => {
    if (disable) {
      return {
        container: styles.disabledContainer,
        content: styles.disabledContent,
      };
    }
    return variant === "primary"
      ? {
          container: styles.primaryContainer,
          content: styles.primaryContent,
        }
      : {
          container: styles.secondaryContainer,
          content: styles.secondaryContent,
        };
  };

  const { container, content } = getVariantStyles();

  const containerStyle = [
    styles.container,
    container,
    onlyIcon && {
      width: buttonHeight,
      paddingHorizontal: spacing.xm,
    },
    style,
  ];

  const contentStyle = [styles.content, content];

  const renderIcon = () => (
    <Icon name={iconName} size={sizes.h4} style={contentStyle} />
  );

  return (
    <TouchableOpacity
      style={containerStyle}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setButtonHeight(height);
      }}
      disabled={disable}
      onPress={onPress}
    >
      {(onlyIcon || iconVisible) && iconFloat === "left" && renderIcon()}
      {!onlyIcon && <Text style={contentStyle}>{text}</Text>}
      {iconVisible && iconFloat === "right" && renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 99,
    height: 40,
    paddingHorizontal: spacing.m,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  content: {
    fontSize: sizes.body,
    fontWeight: "500",
    lineHeight: 20,
  },
  primaryContainer: {
    backgroundColor: colors.primary,
  },
  primaryContent: {
    color: colors.white,
  },
  secondaryContainer: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  secondaryContent: {
    color: colors.primary,
  },
  disabledContainer: {
    backgroundColor: colors.lightGray,
  },
  disabledContent: {
    color: colors.white,
  },
});

export default Button;
