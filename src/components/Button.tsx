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

  const contentColor =
    variant === "primary"
      ? colors.white
      : disable
      ? colors.white
      : colors.black;

  const containerBackColor = disable
    ? colors.gray
    : variant === "primary"
    ? colors.primary
    : colors.white;

  const renderIcon = () => (
    <Icon name={iconName} size={sizes.h4} color={contentColor} />
  );

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: containerBackColor,
        },
        onlyIcon && {
          width: buttonHeight,
          paddingHorizontal: spacing.xm,
        },
        style,
      ]}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setButtonHeight(height);
      }}
      disabled={disable}
      onPress={onPress}
    >
      {(onlyIcon || iconVisible) && iconFloat === "left" && renderIcon()}
      {!onlyIcon && (
        <Text style={[styles.text, { color: contentColor }]}>{text}</Text>
      )}
      {iconVisible && iconFloat === "right" && renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "rgba(27, 31, 35, 0.15)",
    borderWidth: 1,
    borderRadius: 6,
    height: 40,
    paddingHorizontal: spacing.m,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(27, 31, 35, 0.04)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
    flexDirection: "row",
    gap: spacing.xs,
  },
  text: {
    fontSize: sizes.body,
    fontWeight: "500",
    lineHeight: 20,
  },
});

export default Button;
