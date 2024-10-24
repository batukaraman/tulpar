import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { colors, spacing } from "@/constants/theme";
import Logo from "@/components/Logo";
import Icon from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { Link } from "expo-router";

function MainHeader(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles._statusBar}></View>
      <View style={styles.body}>
        <Link href="/profile">
          <View style={styles.avatarWrapper}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://i.pravatar.cc/150?img=68",
              }}
              resizeMode="cover"
            />
          </View>
        </Link>
        <Logo width={150} height={24} />
        <Icon name="notifications-outline" size={24} color={colors.black} />
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
    justifyContent: "space-between",
    gap: spacing.s,
    paddingHorizontal: spacing.m,
    height: 60,
  },
  _statusBar: {
    height: Constants.statusBarHeight,
  },
  avatarWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});

export default MainHeader;
