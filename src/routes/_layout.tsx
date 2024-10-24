import MainHeader from "@/components/MainHeader";
import OtherHeader from "@/components/OtherHeader";
import SearchHeader from "@/components/SearchHeader";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <ActionSheetProvider>
      <Stack screenOptions={{ animation: "ios" }}>
        <Stack.Screen name="index" options={{ header: () => <MainHeader /> }} />
        <Stack.Screen
          name="search"
          options={{
            header: () => <SearchHeader />,
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="profile"
          options={{ header: () => <OtherHeader title="Profil" /> }}
        />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen
          name="create"
          options={{
            header: () => <OtherHeader title="Oluştur" />,
            presentation: "modal",
          }}
        />
      </Stack>
    </ActionSheetProvider>
  );
}
