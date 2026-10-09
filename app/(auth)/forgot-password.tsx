import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Href, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  AuthFieldLabel,
  AuthPrimaryFeedback,
  AuthStatusHero,
  AuthTextField,
} from "@/src/components/auth/auth-form-ui";
import { OnboardingLayout, PrimaryButton, onboardingColors } from "@/src/components/auth/onboarding-ui";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/src/lib/auth-schema";
import { requestPasswordReset } from "@/src/service/auth";

type RecoveryMethod = "email" | "sms";

export default function ForgotPasswordScreen() {
  const [selectedMethod, setSelectedMethod] = useState<RecoveryMethod>("email");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const resetPasswordRoute = "/reset-password" as Href;
  const loginRoute = "/login" as Href;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    if (selectedMethod === "sms") {
      setSubmitSuccess("Giao diện SMS đã sẵn sàng. Hiện tại Blumie mới bật luồng khôi phục qua email.");
      return;
    }

    try {
      await requestPasswordReset(values.email);
      setSubmitSuccess(
        "Mã khôi phục đã được gửi qua email. Kiểm tra hộp thư của bạn để tiếp tục đặt lại mật khẩu."
      );
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Không thể gửi yêu cầu khôi phục mật khẩu."
      );
    }
  });

  return (
    <OnboardingLayout onActionPress={() => router.back()}>
      <AuthStatusHero
        accentTone="pink"
        bottomLeftIcon="flower-outline"
        description="Đừng lo lắng! Hãy chọn phương thức nhận mã xác thực OTP để khôi phục mật khẩu tài khoản của bạn."
        icon="key-outline"
        topRightIcon="leaf-outline"
        title="Quên mật khẩu?"
      />

      <AuthPrimaryFeedback message={submitError} tone="error" />
      <AuthPrimaryFeedback message={submitSuccess} tone="success" />

      <View style={styles.optionList}>
        <RecoveryOptionCard
          description="Gửi mã đến email liên kết"
          hint="t****@gmail.com"
          icon="mail-outline"
          selected={selectedMethod === "email"}
          title="Qua Địa chỉ Email"
          onPress={() => setSelectedMethod("email")}
        />

        <RecoveryOptionCard
          description="Gửi mã qua tin nhắn SMS tới số điện thoại"
          hint="•••••• 456"
          icon="chatbox-ellipses-outline"
          selected={selectedMethod === "sms"}
          title="Qua Tin nhắn SMS"
          onPress={() => setSelectedMethod("sms")}
        />
      </View>

      <View style={styles.formGroup}>
        <AuthFieldLabel label="Email nhận mã khôi phục" required />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <AuthTextField
              autoCapitalize="none"
              error={errors.email?.message}
              keyboardType="email-address"
              leadingIcon="at-outline"
              onChangeText={onChange}
              trailingIcon={value.trim().length > 0 ? "checkmark-circle" : undefined}
              trailingIconColor="#5b7a62"
              value={value}
            />
          )}
        />
      </View>

      <View style={styles.submitSection}>
        <PrimaryButton
          disabled={isSubmitting}
          label="Gửi mã xác thực OTP"
          onPress={onSubmit}
          shape="rounded"
        />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Đã có liên kết khôi phục?</Text>
        <Pressable hitSlop={8} onPress={() => router.push(resetPasswordRoute)}>
          <Text style={styles.footerLink}>Đặt lại mật khẩu</Text>
        </Pressable>
      </View>

      <View style={styles.secondaryFooterRow}>
        <Text style={styles.footerText}>Nhớ lại mật khẩu rồi?</Text>
        <Pressable hitSlop={8} onPress={() => router.replace(loginRoute)}>
          <Text style={styles.footerLink}>Quay về đăng nhập</Text>
        </Pressable>
      </View>
    </OnboardingLayout>
  );
}

function RecoveryOptionCard({
  icon,
  title,
  description,
  hint,
  selected,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  hint: string;
  selected: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.optionCard, selected && styles.optionCardSelected]}
    >
      <View style={[styles.optionIcon, selected && styles.optionIconSelected]}>
        <Ionicons
          color={selected ? onboardingColors.surface : onboardingColors.primary}
          name={icon}
          size={18}
        />
      </View>

      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
        <View style={styles.optionHintRow}>
          <Ionicons color={onboardingColors.textMuted} name="shield-checkmark-outline" size={12} />
          <Text style={styles.optionHint}>{hint}</Text>
        </View>
      </View>

      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  optionList: {
    gap: 12,
    marginBottom: 18,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fffdfa",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ece4db",
    padding: 14,
  },
  optionCardSelected: {
    backgroundColor: "#f6ece7",
    borderColor: "#ead8ca",
  },
  optionIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#eef3ed",
    alignItems: "center",
    justifyContent: "center",
  },
  optionIconSelected: {
    backgroundColor: onboardingColors.primary,
  },
  optionContent: {
    flex: 1,
    gap: 4,
  },
  optionTitle: {
    color: onboardingColors.primary,
    fontSize: 15,
    fontWeight: "800",
  },
  optionDescription: {
    color: "#667066",
    fontSize: 13,
    lineHeight: 19,
  },
  optionHintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  optionHint: {
    color: "#667066",
    fontSize: 12,
    fontWeight: "600",
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#c7cdc4",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: onboardingColors.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: onboardingColors.primary,
  },
  formGroup: {
    marginBottom: 18,
  },
  submitSection: {
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 18,
  },
  secondaryFooterRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 18,
  },
  footerText: {
    color: "#766f67",
    fontSize: 13,
  },
  footerLink: {
    color: onboardingColors.primary,
    fontSize: 13,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
