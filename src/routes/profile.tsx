import { colors } from "@/constants/theme";
import { Text, View, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
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
