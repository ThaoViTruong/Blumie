import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Href, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  AuthCheckboxRow,
  AuthDivider,
  AuthFieldLabel,
  AuthPolicyModal,
  AuthPrimaryFeedback,
  AuthSocialButton,
  AuthTextField,
} from "@/src/components/auth/auth-form-ui";
import { OnboardingLayout, PrimaryButton, onboardingColors } from "@/src/components/auth/onboarding-ui";
import { authPolicyContent } from "@/src/lib/auth-policy";
import {
  customerRegisterSchema,
  type CustomerRegisterValues,
} from "@/src/lib/auth-schema";
import { registerCustomer } from "@/src/service/auth";

export default function CustomerRegisterScreen() {
  const [phoneCode] = useState("+84");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [policyVisible, setPolicyVisible] = useState(false);
  const [policyChecked, setPolicyChecked] = useState(false);
  const homeRoute = "/home" as Href;
  const accountTypeRoute = "/account-type" as Href;
  const loginRoute = "/login" as Href;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CustomerRegisterValues>({
    resolver: zodResolver(customerRegisterSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    },
  });

  const acceptedTerms = watch("acceptedTerms");
  const customerPolicy = authPolicyContent.customer;

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const result = await registerCustomer({
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
      });

      if (result.session) {
        router.replace(homeRoute);
        return;
      }

      setSubmitSuccess(
        "Tài khoản đã được tạo. Vui lòng kiểm tra email để xác nhận trước khi đăng nhập."
      );
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Không thể đăng ký tài khoản.");
    }
  });

  return (
    <OnboardingLayout onActionPress={() => router.replace(accountTypeRoute)}>
      <Text style={styles.pageTitle}>Đăng ký tài khoản</Text>

      <AuthPrimaryFeedback message={submitError} tone="error" />
      <AuthPrimaryFeedback message={submitSuccess} tone="success" />

      <View style={styles.formGroup}>
        <AuthFieldLabel label="Họ và tên" />
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <AuthTextField
              error={errors.fullName?.message}
              leadingIcon="person-outline"
              onChangeText={onChange}
              trailingIcon={value.trim().length >= 2 ? "checkmark-circle" : undefined}
              trailingIconColor="#5b7a62"
              value={value}
            />
          )}
        />
      </View>

      <View style={styles.formGroup}>
        <AuthFieldLabel label="Số điện thoại di động" />

        <View style={styles.phoneRow}>
          <View style={styles.countryCodeChip}>
            <Text style={styles.flagText}>🇻🇳</Text>
            <Text style={styles.countryCodeText}>{phoneCode}</Text>
            <Ionicons color={onboardingColors.textMuted} name="chevron-down-outline" size={14} />
          </View>

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <AuthTextField
                containerStyle={styles.phoneInputShell}
                error={errors.phoneNumber?.message}
                keyboardType="phone-pad"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <AuthFieldLabel label="Địa chỉ Email" />
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
        <AuthFieldLabel label="Tạo mật khẩu" />
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
              trailingIconColor={onboardingColors.textMuted}
              value={value}
            />
          )}
        />
        <Pressable onPress={() => setShowPassword((value) => !value)} style={styles.toggleOverlay} />
      </View>

      <View style={styles.formGroup}>
        <AuthFieldLabel label="Nhập lại mật khẩu" />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <AuthTextField
              error={errors.confirmPassword?.message}
              leadingIcon="shield-checkmark-outline"
              onChangeText={onChange}
              secureTextEntry={!showConfirmPassword}
              trailingIcon={
                !errors.confirmPassword && value.length > 0 && value === watch("password")
                  ? "checkmark-circle"
                  : showConfirmPassword
                    ? "eye-off-outline"
                    : "eye-outline"
              }
              trailingIconColor={
                !errors.confirmPassword && value.length > 0 && value === watch("password")
                  ? "#5b7a62"
                  : onboardingColors.textMuted
              }
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
        checked={acceptedTerms}
        onPress={() => {
          setPolicyChecked(acceptedTerms);
          setPolicyVisible(true);
        }}
      >
        <Text style={styles.termsText}>
          Tôi đã đọc <Text style={styles.termsLink}>chính sách và nghĩa vụ khách hàng</Text> của
          Blumie.
        </Text>
      </AuthCheckboxRow>
      {errors.acceptedTerms?.message ? (
        <Text style={styles.checkboxError}>{errors.acceptedTerms.message}</Text>
      ) : null}

      <View style={styles.submitSection}>
        <PrimaryButton
          disabled={isSubmitting}
          label="Đăng ký tài khoản"
          onPress={onSubmit}
        />
      </View>

      <AuthDivider label="HOẶC ĐĂNG KÝ NHANH BẰNG" />

      <View style={styles.socialRow}>
        <AuthSocialButton icon="logo-google" label="Google" />
        <AuthSocialButton icon="logo-facebook" label="Facebook" />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Đã có tài khoản?</Text>
        <Pressable accessibilityRole="button" hitSlop={8} onPress={() => router.push(loginRoute)}>
          <Text style={styles.footerLink}>Đăng nhập</Text>
        </Pressable>
      </View>

      <AuthPolicyModal
        acceptLabel="Xác nhận đồng ý"
        checked={policyChecked}
        onAccept={() => {
          setValue("acceptedTerms", true, { shouldValidate: true, shouldDirty: true });
          setPolicyVisible(false);
        }}
        onClose={() => setPolicyVisible(false)}
        onToggleChecked={() => setPolicyChecked((value) => !value)}
        sections={customerPolicy.sections}
        subtitle={customerPolicy.subtitle}
        title={customerPolicy.title}
        visible={policyVisible}
      />
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    color: onboardingColors.primary,
    fontSize: 21,
    lineHeight: 31,
    fontWeight: "800",
    marginBottom: 18,
  },
  formGroup: {
    marginBottom: 16,
  },
  phoneRow: {
    flexDirection: "row",
    gap: 10,
  },
  countryCodeChip: {
    minWidth: 78,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#f1ede7",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  flagText: {
    fontSize: 15,
  },
  countryCodeText: {
    color: "#2b322c",
    fontSize: 14,
    fontWeight: "600",
  },
  phoneInputShell: {
    flex: 1,
  },
  termsText: {
    color: "#555d56",
    fontSize: 13,
    lineHeight: 20,
  },
  termsLink: {
    color: onboardingColors.primary,
    fontWeight: "700",
  },
  checkboxError: {
    color: "#d36262",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 14,
    marginLeft: 2,
  },
  submitSection: {
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
