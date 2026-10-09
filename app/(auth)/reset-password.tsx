import { zodResolver } from "@hookform/resolvers/zod";
import { Href, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  AuthCheckboxRow,
  AuthFieldLabel,
  AuthPrimaryFeedback,
  AuthStatusHero,
  AuthTextField,
} from "@/src/components/auth/auth-form-ui";
import { OnboardingLayout, PrimaryButton, onboardingColors } from "@/src/components/auth/onboarding-ui";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/src/lib/auth-schema";
import { updatePassword } from "@/src/service/auth";

export default function ResetPasswordScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const loginRoute = "/login" as Href;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      logoutOtherDevices: true,
    },
  });

  const logoutOtherDevices = watch("logoutOtherDevices");

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      await updatePassword(values.password);
      setSubmitSuccess("Mật khẩu đã được cập nhật thành công. Bạn có thể đăng nhập lại ngay bây giờ.");
      router.replace(loginRoute);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Không thể đặt lại mật khẩu. Hãy thử lại bằng liên kết khôi phục trong email."
      );
    }
  });

  return (
    <OnboardingLayout onActionPress={() => router.back()}>
      <AuthStatusHero
        bottomRightIcon="checkmark"
        description="Mã OTP đã được xác thực thành công. Vui lòng tạo mật khẩu mới an toàn cho tài khoản Blumie của bạn."
        icon="refresh-circle-outline"
        title="Đặt lại mật khẩu mới"
      />

      <AuthPrimaryFeedback message={submitError} tone="error" />
      <AuthPrimaryFeedback message={submitSuccess} tone="success" />

      <View style={styles.formGroup}>
        <AuthFieldLabel label="Mật khẩu mới" required />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <AuthTextField
              error={errors.password?.message}
              leadingIcon="key-outline"
              onChangeText={onChange}
              secureTextEntry={!showPassword}
              trailingIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              value={value}
            />
          )}
        />
        <Pressable onPress={() => setShowPassword((value) => !value)} style={styles.toggleOverlay} />
      </View>

      <View style={styles.formGroup}>
        <AuthFieldLabel label="Xác nhận mật khẩu mới" required />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <AuthTextField
              error={errors.confirmPassword?.message}
              leadingIcon="lock-closed-outline"
              onChangeText={onChange}
              secureTextEntry={!showConfirmPassword}
              trailingIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              trailingIconColor={onboardingColors.textMuted}
              value={value}
            />
          )}
        />
        <Pressable
          onPress={() => setShowConfirmPassword((value) => !value)}
          style={styles.toggleOverlay}
        />
      </View>

      <AuthCheckboxRow
        checked={logoutOtherDevices}
        onPress={() =>
          setValue("logoutOtherDevices", !logoutOtherDevices, {
            shouldDirty: true,
          })
        }
      >
        <Text style={styles.checkboxText}>
          Đăng xuất khỏi tất cả các thiết bị khác. Khuyến dùng để bảo vệ tài khoản sau khi đổi
          thông tin đăng nhập.
        </Text>
      </AuthCheckboxRow>

      <View style={styles.submitSection}>
        <PrimaryButton
          disabled={isSubmitting}
          label="Hoàn tất"
          onPress={onSubmit}
          shape="rounded"
        />
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },
  checkboxText: {
    color: "#555d56",
    fontSize: 13,
    lineHeight: 20,
  },
  submitSection: {
    marginTop: 20,
    marginBottom: 18,
  },
  toggleOverlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 52,
    height: 56,
  },
});
