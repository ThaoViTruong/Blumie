import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ReactNode } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const colors = {
  background: "#f7f2eb",
  surface: "#fffdfa",
  primary: "#032f1d",
  primarySoft: "#cfe4d1",
  text: "#163423",
  textMuted: "#6b736c",
  border: "#e9e3db",
  blush: "#f4e2e5",
  shadow: "rgba(12, 35, 24, 0.08)",
};

export const onboardingColors = colors;

type OnboardingLayoutProps = {
  children: ReactNode;
  actionIcon?: keyof typeof Ionicons.glyphMap;
  onActionPress?: () => void;
};

type StepBadgeProps = {
  current: number;
  total: number;
};

type DotPaginationProps = {
  total: number;
  activeIndex: number;
};

type PillTagProps = {
  label: string;
  icon?: string;
  tone?: "green" | "pink" | "light";
};

type PrimaryButtonProps = {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  disabled?: boolean;
  shape?: "pill" | "rounded";
};

type RoleOptionCardProps = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone?: "green" | "pink" | "light";
  selected?: boolean;
  onPress?: () => void;
};

type BannerCardProps = {
  source?: number;
};

export function OnboardingLayout({
  children,
  actionIcon = "chevron-back",
  onActionPress,
}: OnboardingLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          {onActionPress ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={10}
              onPress={onActionPress}
              style={styles.actionButton}
            >
              <Ionicons color={colors.surface} name={actionIcon} size={18} />
            </Pressable>
          ) : null}

          <View style={[styles.topDivider, !onActionPress && styles.topDividerFull]} />
        </View>

        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function StepBadge({ current, total }: StepBadgeProps) {
  return (
    <View style={styles.stepBadge}>
      <Ionicons color={colors.primary} name="ellipse" size={8} />
      <Text style={styles.stepBadgeText}>{`BƯỚC ${current} / ${total}`}</Text>
    </View>
  );
}

export function DotPagination({ total, activeIndex }: DotPaginationProps) {
  return (
    <View style={styles.pagination}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === activeIndex && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );
}

export function BrandLogo() {
  return (
    <View style={styles.brandLogoWrapper}>
      <Image
        contentFit="contain"
        source={require("@/assets/images/logo.png")}
        style={styles.brandLogo}
      />
    </View>
  );
}

export function BannerCard({ source = require("@/assets/images/banner-01.jpg") }: BannerCardProps) {
  return (
    <View style={styles.bannerWrapper}>
      <Image
        contentFit="cover"
        source={source}
        style={styles.bannerImage}
      />

      <View style={styles.bannerFloatingTop}>
        <View style={[styles.smallBadge, styles.smallBadgeLight]}>
          <Ionicons color={colors.primary} name="flower-outline" size={14} />
          <Text style={styles.smallBadgeText}>Hoa tươi tuyển chọn 100%</Text>
        </View>
      </View>

    </View>
  );
}

export function HeadlineBlock() {
  return (
    <View style={styles.headlineBlock}>
      <Text style={styles.headlineText}>Hoa tươi trao tay, trọn vẹn yêu thương</Text>
    </View>
  );
}

export function PillTag({ label, icon, tone = "green" }: PillTagProps) {
  return (
    <View
      style={[
        styles.pillTag,
        tone === "pink" && styles.pillTagPink,
        tone === "light" && styles.pillTagLight,
      ]}
    >
      {icon ? <Text style={styles.pillTagIcon}>{icon}</Text> : null}
      <Text style={styles.pillTagText}>{label}</Text>
    </View>
  );
}

export function PrimaryButton({
  label,
  icon,
  onPress,
  disabled,
  shape = "pill",
}: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        shape === "rounded" && styles.primaryButtonRounded,
        disabled && styles.primaryButtonDisabled,
        pressed && !disabled && styles.primaryButtonPressed,
      ]}
    >
      <View style={styles.primaryButtonContent}>
        {icon ? <Ionicons color={colors.surface} name={icon} size={18} /> : null}
        <Text style={styles.primaryButtonText}>{label}</Text>
      </View>
    </Pressable>
  );
}

export function FooterLink({
  label,
  actionLabel,
  onPress,
}: {
  label: string;
  actionLabel: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.footerLinkWrapper}>
      <Text style={styles.footerLabel}>{label}</Text>

      <Pressable accessibilityRole="button" hitSlop={8} onPress={onPress}>
        <Text style={styles.footerAction}>{actionLabel}</Text>
      </Pressable>
    </View>
  );
}

export function SectionEyebrow({
  step,
  tag,
}: {
  step: string;
  tag?: string;
}) {
  return (
    <View style={styles.sectionEyebrow}>
      <View style={styles.sectionEyebrowLeft}>
        <Ionicons color={colors.primary} name="ellipse" size={8} />
        <Text style={styles.sectionEyebrowStep}>{step}</Text>
      </View>

      {tag ? (
        <View style={styles.sectionTag}>
          <Text style={styles.sectionTagText}>{tag}</Text>
        </View>
      ) : null}
    </View>
  );
}

export function RoleOptionCard({
  title,
  description,
  icon,
  tone = "green",
  selected,
  onPress,
}: RoleOptionCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.roleCard,
        selected && styles.roleCardSelected,
        pressed && styles.roleCardPressed,
      ]}
    >
      <View
        style={[
          styles.roleIconBox,
          tone === "pink" && styles.roleIconBoxPink,
          tone === "light" && styles.roleIconBoxLight,
        ]}
      >
        <Ionicons color={colors.primary} name={icon} size={22} />
      </View>

      <View style={styles.roleTextBlock}>
        <Text style={styles.roleTitle}>{title}</Text>
        <Text style={styles.roleDescription}>{description}</Text>
      </View>

      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
    </Pressable>
  );
}

export function LocationCard() {
  return (
    <View style={styles.locationWrapper}>
      <View style={styles.locationHeader}>
        <View style={styles.locationHeaderBlock}>
          <Ionicons color={colors.textMuted} name="location-outline" size={14} />
          <Text style={styles.locationHeaderText}>KHU VỰC HOẠT ĐỘNG ƯU TIÊN</Text>
        </View>

        <Text style={styles.locationHeaderAccent}>ĐỊNH VỊ NHANH</Text>
      </View>

      <View style={styles.locationCard}>
        <Text style={styles.locationValue}>TP. Hồ Chí Minh (Giao 2h nội thành)</Text>
        <Ionicons color={colors.textMuted} name="chevron-down-outline" size={18} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingTop: 8,
  },
  topDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 14,
  },
  topDividerFull: {
    marginLeft: 0,
  },
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
  },
  stepBadgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  brandLogoWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  brandLogo: {
    width: 124,
    height: 32,
  },
  bannerWrapper: {
    height: 322,
    borderRadius: 28,
    overflow: "hidden",
    position: "relative",
    backgroundColor: colors.surface,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerFloatingTop: {
    position: "absolute",
    top: 12,
    left: 12,
  },
  bannerFloatingBottom: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 14,
    backgroundColor: "rgba(255, 253, 250, 0.95)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  smallBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  smallBadgeLight: {
    backgroundColor: "rgba(255, 253, 250, 0.92)",
  },
  smallBadgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700",
  },
  deliveryIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  bannerFloatingText: {
    flex: 1,
    gap: 2,
  },
  bannerFloatingTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  bannerFloatingDescription: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  bannerStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#58785f",
    marginLeft: 8,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 18,
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd8d1",
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  headlineBlock: {
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  headlineText: {
    color: colors.primary,
    fontSize: 22,
    lineHeight: 34,
    textAlign: "center",
    fontWeight: "800",
  },
  pillTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 6,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillTagPink: {
    backgroundColor: colors.blush,
  },
  pillTagLight: {
    backgroundColor: "#f1ece4",
  },
  pillTagIcon: {
    fontSize: 12,
  },
  pillTagText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "600",
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primaryButtonRounded: {
    minHeight: 50,
    borderRadius: 12,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  footerLinkWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  footerLabel: {
    color: colors.textMuted,
    fontSize: 15,
  },
  footerAction: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  sectionEyebrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionEyebrowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionEyebrowStep: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  sectionTag: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionTagText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    shadowColor: colors.primary,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  roleCardSelected: {
    borderColor: "#84a98c",
    shadowOpacity: 0.09,
  },
  roleCardPressed: {
    opacity: 0.9,
  },
  roleIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  roleIconBoxPink: {
    backgroundColor: colors.blush,
  },
  roleIconBoxLight: {
    backgroundColor: "#f1ece4",
  },
  roleTextBlock: {
    flex: 1,
    gap: 6,
    paddingTop: 2,
  },
  roleTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "800",
  },
  roleDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#dbd6cf",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  locationWrapper: {
    gap: 10,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationHeaderBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationHeaderText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  locationHeaderAccent: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  locationCard: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationValue: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
    marginRight: 12,
  },
});
