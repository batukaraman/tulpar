import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { colors, sizes, spacing } from "@/constants/theme";
import Icon from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { router } from "expo-router";

function OtherHeader({ title }: { title: string }): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} color={colors.black} />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    paddingTop: Constants.statusBarHeight,
  },
  body: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.s,
    height: 60,
  },
  button: { padding: 8 },
  title: {
    color: colors.black,
    fontSize: sizes.h3,
  },
});

export default OtherHeader;
