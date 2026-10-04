import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="product/[id]" options={{ title: "Product" }} />

      <Stack.Screen name="shop/[id]" options={{ title: "Shop" }} />

      <Stack.Screen name="cart/index" options={{ title: "Cart" }} />

      <Stack.Screen name="checkout/index" options={{ title: "Checkout" }} />

      <Stack.Screen name="order/[id]" options={{ title: "Order" }} />
    </Stack>
  );
}
