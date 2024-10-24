import { TextboxProps } from "@/constants/props";
import { colors, sizes, spacing } from "@/constants/theme";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

function Textbox({
  inputRef,
  type = "text",
  placeholder,
  showIcon = false,
  specialIcon = "",
  validationRules = [],
  value: initialValue = "",
  numberOfLines = 1,
  onChange,
  size = "m",
}: TextboxProps): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [hidePassword, setHidePassword] = useState(true);
  const [value, setValue] = useState(initialValue);

  const passwordShowHandle = () => {
    setHidePassword(!hidePassword);
  };

  const iconHandle = (): string => {
    switch (type) {
      case "search":
        return "search-outline";
      case "password":
        return "lock-closed-outline";
      case "email":
        return "mail-outline";
      case "username":
        return "person-outline";
      case "text":
        return "text-outline";
      default:
        return "";
    }
  };

  const clearHandle = () => {
    setValue("");
    onChange && onChange("");
  };

  const validate = (value: string) => {
    const newErrors: string[] = [];
    validationRules.forEach((rule) => {
      if (!rule.validate(value)) {
        newErrors.push(rule.message);
      }
    });
    setErrors(newErrors);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          {
            paddingHorizontal:
              size === "s" ? spacing.s : size === "l" ? spacing.m : spacing.xm,
          },
          { alignItems: numberOfLines != 1 ? "flex-start" : "center" },
          isFocused && styles.focused,
        ]}
      >
        {((iconHandle() && showIcon) || specialIcon) && (
          <Icon
            name={iconHandle() || specialIcon}
            style={[
              size === "s"
                ? styles.inputSmall
                : size === "l"
                ? styles.inputLarge
                : styles.inputMiddle,
              { marginTop: numberOfLines != 1 ? spacing.xm : 0 },
            ]}
            color={colors.black}
          />
        )}
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={colors.black}
          cursorColor={colors.black}
          selectionHandleColor={colors.primary}
          style={[
            styles.input,
            numberOfLines === 1
              ? [
                  styles.singleLineInput,
                  {
                    height: size === "s" ? 24 : size === "l" ? 40 : 32,
                  },
                ]
              : styles.multiLineInput,
            size === "s"
              ? styles.inputSmall
              : size === "l"
              ? styles.inputLarge
              : styles.inputMiddle,
          ]}
          onChangeText={(text) => {
            setValue(text);
            onChange && onChange(text);
            validate(text);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            validate(value);
          }}
          value={value}
          secureTextEntry={type === "password" && hidePassword}
          keyboardType={type === "email" ? "email-address" : "default"}
          multiline={numberOfLines > 1}
          numberOfLines={numberOfLines}
        />
        {type === "password" && (
          <Pressable onPress={passwordShowHandle}>
            <Icon
              name={hidePassword ? "eye-off-outline" : "eye-outline"}
              size={sizes.h3}
              style={hidePassword ? styles.actionBtn : styles.actionBtnActive}
            />
          </Pressable>
        )}
        {type === "search" && value && (
          <Pressable onPress={clearHandle}>
            <Icon name="close-outline" size={sizes.h3} />
          </Pressable>
        )}
      </View>
      {errors.length > 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors[0]}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s,
    borderRadius: 6,
    fontSize: sizes.body,
    borderWidth: 1,
    borderColor: "rgba(27, 31, 35, 0.15)",
  },
  focused: {
    borderColor: "rgba(27, 31, 35, 0.5)",
  },
  input: {
    flex: 1,
    padding: 0,
    color: colors.black,
  },
  inputMiddle: {
    fontSize: 14,
  },
  inputSmall: {
    fontSize: 13,
  },
  inputLarge: {
    fontSize: 15,
  },
  singleLineInput: {
    textAlignVertical: "center",
  },
  multiLineInput: {
    textAlignVertical: "top",
    paddingVertical: spacing.xm,
  },
  actionBtn: {
    color: colors.black,
  },
  actionBtnActive: {
    color: colors.primary,
  },
  errorContainer: {
    marginLeft: spacing.s,
    marginTop: spacing.xs,
  },
  errorText: {
    color: "red",
    fontSize: sizes.small,
  },
});

export default Textbox;
