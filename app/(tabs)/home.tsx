import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        contentFit="contain"
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Blumie</Text>
      <Text style={styles.description}>
        Nơi những bó hoa được trao đi trọn vẹn cảm xúc.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f7f2eb",
  },
  logo: {
    width: 160,
    height: 54,
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#032f1d",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: "#637064",
    maxWidth: 280,
  },
});
