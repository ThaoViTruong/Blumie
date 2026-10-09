import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#032f1d",
        tabBarInactiveTintColor: "#8d948c",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Blumie",
          tabBarLabel: "Blumie",
          tabBarIcon: ({ focused, size }) => (
            <Image
              contentFit="contain"
              source={require("@/assets/images/logo.png")}
              style={[
                styles.logoIcon,
                {
                  width: size * 1.8,
                  height: size * 1.8,
                  opacity: focused ? 1 : 0.72,
                },
              ]}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Khám phá",
          tabBarLabel: "Khám phá",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flower-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    paddingTop: 6,
    paddingBottom: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "700",
  },
  logoIcon: {
    borderRadius: 999,
  },
});
