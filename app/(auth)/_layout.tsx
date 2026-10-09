import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="welcome">
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="reset-password" options={{ headerShown: false }} />
      <Stack.Screen name="account-type" options={{ headerShown: false }} />
      <Stack.Screen name="customer-register" options={{ headerShown: false }} />
      <Stack.Screen name="shop-register" options={{ headerShown: false }} />
      <Stack.Screen name="driver-register" options={{ headerShown: false }} />
    </Stack>
  );
}
