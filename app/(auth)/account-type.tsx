import { Href, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  LocationCard,
  OnboardingLayout,
  PrimaryButton,
  RoleOptionCard,
  SectionEyebrow,
  onboardingColors,
} from "@/src/components/auth/onboarding-ui";

const roleOptions = [
  {
    key: "customer",
    title: "Khách hàng",
    description:
      "Khám phá hàng ngàn mẫu hoa tươi thiết kế, giao nhanh 2h và viết thiệp miễn phí.",
    icon: "location-outline" as const,
    tone: "pink" as const,
  },
  {
    key: "seller",
    title: "Chủ tiệm hoa",
    description:
      "Mở gian hàng nghệ thuật, đăng bán sản phẩm hoa tươi và quản lý doanh thu.",
    icon: "storefront-outline" as const,
    tone: "green" as const,
  },
  {
    key: "driver",
    title: "Tài xế giao hoa",
    description:
      "Nhận đơn giao hoa hỏa tốc theo bán kính định vị với thu nhập linh hoạt.",
    icon: "bicycle-outline" as const,
    tone: "light" as const,
  },
] as const;

export default function AccountTypeScreen() {
  const [selectedRole, setSelectedRole] = useState<
    ((typeof roleOptions)[number]["key"]) | null
  >(null);

  const isContinueDisabled = !selectedRole;
  const homeRoute = "/home" as const;
  const welcomeRoute = "/welcome" as Href;
  const customerRegisterRoute = "/customer-register" as Href;
  const shopRegisterRoute = "/shop-register" as Href;
  const driverRegisterRoute = "/driver-register" as Href;

  const handleContinue = () => {
    if (selectedRole === "customer") {
      router.push(customerRegisterRoute);
      return;
    }

    if (selectedRole === "seller") {
      router.push(shopRegisterRoute);
      return;
    }

    if (selectedRole === "driver") {
      router.push(driverRegisterRoute);
      return;
    }

    router.replace(homeRoute);
  };

  return (
    <OnboardingLayout onActionPress={() => router.replace(welcomeRoute)}>
      <SectionEyebrow step="BƯỚC 2/2" tag="Hoàn thiện hồ sơ" />

      <Text style={styles.heading}>Bạn muốn trải nghiệm Blumie với vai trò nào?</Text>

      <View accessibilityRole="radiogroup" style={styles.roleGroup}>
        {roleOptions.map((role) => (
          <RoleOptionCard
            key={role.key}
            description={role.description}
            icon={role.icon}
            onPress={() => setSelectedRole(role.key)}
            selected={selectedRole === role.key}
            title={role.title}
            tone={role.tone}
          />
        ))}
      </View>

      <LocationCard />

      <View style={styles.bottomButton}>
        <PrimaryButton
          disabled={isContinueDisabled}
          icon="checkmark-circle-outline"
          label="Tiếp tục"
          onPress={handleContinue}
        />
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: onboardingColors.primary,
    fontSize: 24,
    lineHeight: 35,
    fontWeight: "800",
    marginBottom: 18,
    paddingRight: 12,
  },
  roleGroup: {
    gap: 14,
    marginBottom: 20,
  },
  bottomButton: {
    marginTop: 24,
  },
});
