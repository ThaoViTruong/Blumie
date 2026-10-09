import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const highlights = [
  "Mẫu hoa sinh nhật thanh lịch",
  "Set quà hoa và thiệp viết tay",
  "Giao nhanh nội thành trong 2 giờ",
];

export default function ExploreScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.heroCard}>
        <Image
          contentFit="cover"
          source={require("@/assets/images/banner-01.jpg")}
          style={styles.heroImage}
        />

        <View style={styles.overlay}>
          <Image
            contentFit="contain"
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />

          <Text style={styles.title}>Khám phá bộ sưu tập hoa Blumie</Text>
          <Text style={styles.description}>
            Chọn nhanh những mẫu hoa tinh tế, giao đúng hẹn và giữ trọn cảm xúc.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Gợi ý nổi bật</Text>

        {highlights.map((item) => (
          <View key={item} style={styles.itemCard}>
            <View style={styles.itemDot} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f2eb",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
    gap: 20,
  },
  heroCard: {
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  heroImage: {
    width: "100%",
    height: 320,
  },
  overlay: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    padding: 16,
    borderRadius: 22,
    backgroundColor: "rgba(255, 253, 250, 0.95)",
    gap: 8,
  },
  logo: {
    width: 110,
    height: 28,
  },
  title: {
    color: "#032f1d",
    fontSize: 24,
    lineHeight: 34,
    fontWeight: "800",
  },
  description: {
    color: "#5f6f63",
    fontSize: 14,
    lineHeight: 22,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    color: "#032f1d",
    fontSize: 18,
    fontWeight: "800",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 18,
    backgroundColor: "#fffdfa",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  itemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#032f1d",
  },
  itemText: {
    flex: 1,
    color: "#244030",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
  },
});
