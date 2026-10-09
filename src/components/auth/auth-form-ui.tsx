import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps, ReactNode } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { onboardingColors } from "@/src/components/auth/onboarding-ui";

type AuthInputProps = ComponentProps<typeof TextInput> & {
  leadingIcon?: keyof typeof Ionicons.glyphMap;
  trailingIcon?: keyof typeof Ionicons.glyphMap;
  trailingIconColor?: string;
  error?: string;
  containerStyle?: ComponentProps<typeof View>["style"];
};

type AuthCheckboxRowProps = {
  checked: boolean;
  onPress?: () => void;
  children: ReactNode;
};

type AuthStatusHeroProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  topRightIcon?: keyof typeof Ionicons.glyphMap;
  bottomLeftIcon?: keyof typeof Ionicons.glyphMap;
  bottomRightIcon?: keyof typeof Ionicons.glyphMap;
  accentTone?: "green" | "pink";
};

type AuthPolicySection = {
  title: string;
  items: string[];
};

type AuthPolicyModalProps = {
  visible: boolean;
  title: string;
  subtitle: string;
  sections: AuthPolicySection[];
  checked: boolean;
  onToggleChecked?: () => void;
  onClose?: () => void;
  onAccept?: () => void;
  acceptLabel?: string;
};

export function AuthFieldLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <Text style={styles.fieldLabel}>
      {label}
      {required ? <Text style={styles.requiredMark}> *</Text> : null}
    </Text>
  );
}

export function AuthTextField({
  leadingIcon,
  trailingIcon,
  trailingIconColor,
  error,
  containerStyle,
  ...props
}: AuthInputProps) {
  return (
    <View>
      <View
        style={[
          styles.inputShell,
          error ? styles.inputShellError : null,
          containerStyle,
        ]}
      >
        {leadingIcon ? (
          <Ionicons
            color={onboardingColors.textMuted}
            name={leadingIcon}
            size={18}
            style={styles.leadingIcon}
          />
        ) : null}

        <TextInput
          placeholderTextColor="#9f9c96"
          style={styles.textInput}
          {...props}
        />

        {trailingIcon ? (
          <Ionicons
            color={trailingIconColor ?? onboardingColors.textMuted}
            name={trailingIcon}
            size={18}
          />
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function AuthCheckboxRow({
  checked,
  onPress,
  children,
}: AuthCheckboxRowProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onPress}
      style={styles.checkboxRow}
    >
      <View style={[styles.checkBox, checked && styles.checkBoxActive]}>
        {checked ? (
          <Ionicons color={onboardingColors.surface} name="checkmark" size={14} />
        ) : null}
      </View>

      <Text style={styles.checkboxText}>{children}</Text>
    </Pressable>
  );
}

export function AuthPrimaryFeedback({
  message,
  tone,
}: {
  message?: string | null;
  tone: "error" | "success";
}) {
  if (!message) {
    return null;
  }

  return (
    <View
      style={[
        styles.feedbackBox,
        tone === "error" ? styles.feedbackError : styles.feedbackSuccess,
      ]}
    >
      <Text
        style={[
          styles.feedbackText,
          tone === "error" ? styles.feedbackTextError : styles.feedbackTextSuccess,
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

export function AuthInlineError({ message }: { message?: string | null }) {
  if (!message) {
    return null;
  }

  return <Text style={styles.errorText}>{message}</Text>;
}

export function AuthDivider({ label }: { label: string }) {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.divider} />
      <Text style={styles.dividerText}>{label}</Text>
      <View style={styles.divider} />
    </View>
  );
}

export function AuthSocialButton({
  icon,
  label,
  onPress,
  layout = "inline",
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  layout?: "inline" | "stacked";
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.socialButton, layout === "stacked" && styles.socialButtonStacked]}
    >
      <Ionicons
        color={icon === "logo-google" ? "#ea4335" : "#1877f2"}
        name={icon}
        size={18}
      />
      <Text
        style={[
          styles.socialButtonText,
          layout === "stacked" && styles.socialButtonTextStacked,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function AuthStatusHero({
  icon,
  title,
  description,
  topRightIcon,
  bottomLeftIcon,
  bottomRightIcon,
  accentTone = "green",
}: AuthStatusHeroProps) {
  return (
    <View style={styles.heroWrap}>
      <View style={[styles.heroHalo, accentTone === "pink" && styles.heroHaloPink]} />
      <View style={[styles.heroCircle, accentTone === "pink" && styles.heroCirclePink]}>
        <Ionicons color={onboardingColors.primary} name={icon} size={28} />
      </View>

      {topRightIcon ? (
        <View style={[styles.floatingBadge, styles.floatingBadgeTopRight]}>
          <Ionicons color={onboardingColors.primary} name={topRightIcon} size={12} />
        </View>
      ) : null}

      {bottomLeftIcon ? (
        <View style={[styles.floatingBadge, styles.floatingBadgeBottomLeft]}>
          <Ionicons color={onboardingColors.primary} name={bottomLeftIcon} size={11} />
        </View>
      ) : null}

      {bottomRightIcon ? (
        <View style={[styles.floatingBadgeStrong, styles.floatingBadgeBottomRight]}>
          <Ionicons color={onboardingColors.surface} name={bottomRightIcon} size={11} />
        </View>
      ) : null}

      <Text style={styles.heroTitle}>{title}</Text>
      {description ? <Text style={styles.heroDescription}>{description}</Text> : null}
    </View>
  );
}

export function AuthPolicyModal({
  visible,
  title,
  subtitle,
  sections,
  checked,
  onToggleChecked,
  onClose,
  onAccept,
  acceptLabel = "Tôi đồng ý",
}: AuthPolicyModalProps) {
  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.modalOverlay}>
        <Pressable onPress={onClose} style={styles.modalBackdrop} />

        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderTextBlock}>
              <Text style={styles.modalTitle}>{title}</Text>
              <Text style={styles.modalSubtitle}>{subtitle}</Text>
            </View>

            <Pressable hitSlop={8} onPress={onClose} style={styles.modalCloseButton}>
              <Ionicons color={onboardingColors.primary} name="close" size={18} />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.modalBody}
            showsVerticalScrollIndicator={false}
          >
            {sections.map((section) => (
              <View key={section.title} style={styles.policySection}>
                <Text style={styles.policySectionTitle}>{section.title}</Text>

                <View style={styles.policyItemList}>
                  {section.items.map((item) => (
                    <View key={item} style={styles.policyItemRow}>
                      <Ionicons
                        color={onboardingColors.primary}
                        name="ellipse"
                        size={7}
                        style={styles.policyBullet}
                      />
                      <Text style={styles.policyItemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            onPress={onToggleChecked}
            style={styles.modalConsentRow}
          >
            <View style={[styles.checkBox, checked && styles.checkBoxActive]}>
              {checked ? (
                <Ionicons color={onboardingColors.surface} name="checkmark" size={14} />
              ) : null}
            </View>

            <Text style={styles.modalConsentText}>
              Tôi đã đọc và đồng ý với toàn bộ chính sách, nghĩa vụ áp dụng cho vai trò này.
            </Text>
          </Pressable>

          <View style={styles.modalActionRow}>
            <Pressable onPress={onClose} style={styles.modalSecondaryButton}>
              <Text style={styles.modalSecondaryButtonText}>Đóng</Text>
            </Pressable>

            <Pressable
              disabled={!checked}
              onPress={onAccept}
              style={[
                styles.modalPrimaryButton,
                !checked && styles.modalPrimaryButtonDisabled,
              ]}
            >
              <Text style={styles.modalPrimaryButtonText}>{acceptLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fieldLabel: {
    color: "#403f3b",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  requiredMark: {
    color: "#d36262",
    fontWeight: "700",
  },
  inputShell: {
    minHeight: 56,
    borderRadius: 12,
    backgroundColor: "#f1ede7",
    borderWidth: 1,
    borderColor: "transparent",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputShellError: {
    borderColor: "#d36262",
  },
  leadingIcon: {
    marginRight: 2,
  },
  textInput: {
    flex: 1,
    color: "#2b322c",
    fontSize: 15,
    paddingVertical: 12,
  },
  errorText: {
    color: "#d36262",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    marginLeft: 2,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#bcc2bb",
    backgroundColor: "#fffdfa",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  checkBoxActive: {
    backgroundColor: onboardingColors.primary,
    borderColor: onboardingColors.primary,
  },
  checkboxText: {
    flex: 1,
    color: "#555d56",
    fontSize: 13,
    lineHeight: 20,
  },
  feedbackBox: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  feedbackError: {
    backgroundColor: "#f9e8e8",
  },
  feedbackSuccess: {
    backgroundColor: "#e8f4eb",
  },
  feedbackText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
  },
  feedbackTextError: {
    color: "#a83b3b",
  },
  feedbackTextSuccess: {
    color: "#28543c",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#d8d1c8",
  },
  dividerText: {
    color: "#766f67",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  socialButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: "#f8f5ef",
    borderWidth: 1,
    borderColor: "#ece4db",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  socialButtonStacked: {
    minHeight: 54,
    flexDirection: "column",
    gap: 6,
  },
  socialButtonText: {
    color: "#2b322c",
    fontSize: 15,
    fontWeight: "600",
  },
  socialButtonTextStacked: {
    fontSize: 12,
    fontWeight: "500",
  },
  heroWrap: {
    alignItems: "center",
    marginBottom: 22,
    paddingTop: 6,
  },
  heroHalo: {
    position: "absolute",
    top: 6,
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#edf4ee",
  },
  heroHaloPink: {
    backgroundColor: "#f4e8e8",
  },
  heroCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#dff0df",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 8,
    borderColor: "#f7f2eb",
  },
  heroCirclePink: {
    backgroundColor: "#fff7f7",
  },
  floatingBadge: {
    position: "absolute",
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#dff0df",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#f7f2eb",
  },
  floatingBadgeStrong: {
    position: "absolute",
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: onboardingColors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#f7f2eb",
  },
  floatingBadgeTopRight: {
    top: 12,
    right: 92,
  },
  floatingBadgeBottomLeft: {
    top: 66,
    left: 92,
  },
  floatingBadgeBottomRight: {
    top: 66,
    right: 100,
  },
  heroTitle: {
    color: onboardingColors.primary,
    fontSize: 19,
    lineHeight: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
  },
  heroDescription: {
    color: "#667066",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 280,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(9, 23, 16, 0.32)",
    justifyContent: "center",
    padding: 18,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCard: {
    maxHeight: "84%",
    borderRadius: 22,
    backgroundColor: "#fffdfa",
    borderWidth: 1,
    borderColor: "#e9e3db",
    padding: 18,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 14,
  },
  modalHeaderTextBlock: {
    flex: 1,
    gap: 4,
  },
  modalTitle: {
    color: onboardingColors.primary,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "800",
  },
  modalSubtitle: {
    color: "#667066",
    fontSize: 13,
    lineHeight: 20,
  },
  modalCloseButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f1ede7",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: {
    gap: 14,
    paddingBottom: 6,
  },
  policySection: {
    gap: 8,
  },
  policySectionTitle: {
    color: onboardingColors.primary,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800",
  },
  policyItemList: {
    gap: 8,
  },
  policyItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  policyBullet: {
    marginTop: 6,
  },
  policyItemText: {
    flex: 1,
    color: "#555d56",
    fontSize: 13,
    lineHeight: 20,
  },
  modalConsentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 16,
    marginBottom: 14,
  },
  modalConsentText: {
    flex: 1,
    color: "#555d56",
    fontSize: 13,
    lineHeight: 20,
  },
  modalActionRow: {
    flexDirection: "row",
    gap: 10,
  },
  modalSecondaryButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d8d1c8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f5ef",
  },
  modalSecondaryButtonText: {
    color: "#4f5b53",
    fontSize: 14,
    fontWeight: "700",
  },
  modalPrimaryButton: {
    flex: 1.3,
    minHeight: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: onboardingColors.primary,
  },
  modalPrimaryButtonDisabled: {
    opacity: 0.45,
  },
  modalPrimaryButtonText: {
    color: onboardingColors.surface,
    fontSize: 14,
    fontWeight: "700",
  },
});
