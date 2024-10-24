import MainHeader from "@/components/MainHeader";
import OtherHeader from "@/components/OtherHeader";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ animation: "ios" }}>
      <Stack.Screen name="index" options={{ header: () => <MainHeader /> }} />
      <Stack.Screen name="search" />
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
  );
}
