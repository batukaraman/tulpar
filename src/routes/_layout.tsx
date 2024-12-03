import MainHeader from "@/components/MainHeader";
import OtherHeader from "@/components/OtherHeader";
import SearchHeader from "@/components/SearchHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <StatusBar style="dark" />
        <BottomSheetModalProvider>
          <Stack screenOptions={{ animation: "ios" }}>
            <Stack.Screen
              name="index"
              options={{ header: () => <MainHeader /> }}
            />
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
                headerShown: false,
                presentation: "modal",
                animation: "fade_from_bottom",
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
