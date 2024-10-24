import { Textbox } from "@/components/FormControl";
import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { sizes, spacing } from "@/constants/theme";
import Button from "@/components/Button";

export default function Home() {
  return (
    <View style={styles.container}>
      <View>
        <Pressable
          onPress={() => router.navigate("/search")}
          style={styles.searchOverlay}
        ></Pressable>
        <Textbox
          placeholder="Konu, firma ara"
          type="search"
          showIcon={true}
          size="l"
        />
      </View>
      <Button onPress={() => router.navigate("/create")} text="Oluştur" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.m, gap: 8 },
  searchOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    borderRadius: sizes.radius,
  },
});
