import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Pressable, TextInput } from "react-native";
import { colors, spacing } from "@/constants/theme";
import Icon from "@expo/vector-icons/Ionicons";
import { Textbox } from "@/components/FormControl";
import Constants from "expo-constants";
import { router } from "expo-router";

function SearchHeader(): React.JSX.Element {
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles._statusBar}></View>
      <View style={styles.body}>
        <Pressable onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} color={colors.black} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Textbox
            inputRef={inputRef}
            placeholder="Konu, firma ara"
            type="search"
            showIcon={true}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  body: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s,
    paddingHorizontal: spacing.m,
    height: 60,
  },
  _statusBar: {
    height: Constants.statusBarHeight,
  },
});

export default SearchHeader;
