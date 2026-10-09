import { zodResolver } from "@hookform/resolvers/zod";
import { Href, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  AuthDivider,
  AuthFieldLabel,
  AuthPrimaryFeedback,
  AuthStatusHero,
  AuthSocialButton,
  AuthTextField,
} from "@/src/components/auth/auth-form-ui";
import { OnboardingLayout, PrimaryButton, onboardingColors } from "@/src/components/auth/onboarding-ui";
import { type LoginValues, loginSchema } from "@/src/lib/auth-schema";
import { loginWithEmail } from "@/src/service/auth";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const homeRoute = "/home" as Href;
  const registerRoute = "/customer-register" as Href;
  const forgotPasswordRoute = "/forgot-password" as Href;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      await loginWithEmail(values);
      router.replace(homeRoute);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Không thể đăng nhập.");
    }
  });

  return (
    <OnboardingLayout onActionPress={() => router.back()}>
      <AuthStatusHero
        description="Đăng nhập để kết nối với tiệm hoa yêu thích và theo dõi đơn hàng của bạn."
        bottomRightIcon="moon-outline"
        icon="flower-outline"
        title="Chào mừng bạn trở lại"
      />

      <AuthPrimaryFeedback message={submitError} tone="error" />

      <View style={styles.formGroup}>
        <AuthFieldLabel label="Email hoặc Số điện thoại" required />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <AuthTextField
              autoCapitalize="none"
              error={errors.email?.message}
              keyboardType="email-address"
              leadingIcon="mail-outline"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View style={styles.formGroup}>
        <AuthFieldLabel label="Mật khẩu" required />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <AuthTextField
              error={errors.password?.message}
              leadingIcon="lock-closed-outline"
              onChangeText={onChange}
              secureTextEntry={!showPassword}
              trailingIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              value={value}
            />
          )}
        />
        <Pressable onPress={() => setShowPassword((value) => !value)} style={styles.toggleOverlay} />
      </View>

      <View style={styles.inlineRow}>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: rememberMe }}
          onPress={() => setRememberMe((value) => !value)}
          style={styles.rememberRow}
        >
          <View style={[styles.rememberCheck, rememberMe && styles.rememberCheckActive]} />
          <Text style={styles.rememberText}>Lưu mật khẩu</Text>
        </Pressable>

        <Pressable hitSlop={8} onPress={() => router.push(forgotPasswordRoute)}>
          <Text style={styles.forgotLink}>Quên mật khẩu?</Text>
        </Pressable>
      </View>

      <View style={styles.submitSection}>
        <PrimaryButton
          disabled={isSubmitting}
          label="Đăng nhập"
          onPress={onSubmit}
          shape="rounded"
        />
      </View>

      <AuthDivider label="HOẶC TIẾP TỤC VỚI" />

      <View style={styles.socialRow}>
        <AuthSocialButton icon="logo-google" label="Google" layout="stacked" />
        <AuthSocialButton icon="logo-facebook" label="Facebook" layout="stacked" />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Chưa có tài khoản?</Text>
        <Pressable accessibilityRole="button" hitSlop={8} onPress={() => router.push(registerRoute)}>
          <Text style={styles.footerLink}>Đăng ký</Text>
        </Pressable>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rememberCheck: {
    width: 16,
    height: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#b8beb7",
    backgroundColor: "#fffdfa",
  },
  rememberCheckActive: {
    backgroundColor: onboardingColors.primary,
    borderColor: onboardingColors.primary,
  },
  rememberText: {
    color: "#555d56",
    fontSize: 13,
    fontWeight: "500",
  },
  forgotLink: {
    color: onboardingColors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  submitSection: {
    marginTop: 4,
    marginBottom: 18,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginBottom: 18,
  },
  footerText: {
    color: "#766f67",
    fontSize: 15,
  },
  footerLink: {
    color: onboardingColors.primary,
    fontSize: 15,
    fontWeight: "700",
  },
  toggleOverlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 52,
    height: 56,
  },
});
