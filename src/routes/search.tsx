import { colors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export default function Search() {
  return (
    <View style={styles.container}>
      <Text>Search Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
});
