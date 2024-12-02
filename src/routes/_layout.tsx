import MainHeader from "@/components/MainHeader";
import OtherHeader from "@/components/OtherHeader";
import SearchHeader from "@/components/SearchHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView>
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
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
