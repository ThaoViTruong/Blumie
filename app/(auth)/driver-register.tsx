import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import type { ComponentProps } from "react";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  AuthInlineError,
  AuthPolicyModal,
  AuthPrimaryFeedback,
} from "@/src/components/auth/auth-form-ui";
import {
  OnboardingLayout,
  PrimaryButton,
  onboardingColors,
} from "@/src/components/auth/onboarding-ui";
import { authPolicyContent } from "@/src/lib/auth-policy";
import { driverRegisterSchema, type DriverRegisterValues } from "@/src/lib/auth-schema";

const transportOptions = [
  { key: "bike", label: "Xe máy cá nhân", icon: "bicycle-outline" as const },
  { key: "van", label: "Xe bán tải / Van lạnh", icon: "car-outline" as const },
] as const;

const shiftOptions = [
  "Toàn thời gian (Full-time)",
  "Bán thời gian (Part-time)",
  "Theo ca tiệc / giờ cao điểm",
] as const;

const experienceOptions = [
  "Đã giao hoa tươi / bánh kem",
  "Giao đồ ăn / Bưu kiện",
  "Mới bắt đầu",
] as const;

const genderOptions = ["Nam", "Nữ", "Khác"] as const;
const activityAreaOptions = [
  "Quận 1 - Quận 3",
  "Bình Thạnh - Phú Nhuận",
  "Thủ Đức",
] as const;

type DriverFieldErrors = Partial<Record<keyof DriverRegisterValues, string>>;

export default function DriverRegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<(typeof genderOptions)[number] | "">("");
  const [activityArea, setActivityArea] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [transport, setTransport] =
    useState<(typeof transportOptions)[number]["key"] | "">("");
  const [hasColdBox, setHasColdBox] = useState(false);
  const [shiftType, setShiftType] =
    useState<(typeof shiftOptions)[number] | "">("");
  const [experience, setExperience] =
    useState<(typeof experienceOptions)[number] | "">("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [policyVisible, setPolicyVisible] = useState(false);
  const [policyChecked, setPolicyChecked] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<DriverFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const homeRoute = "/home" as Href;
  const accountTypeRoute = "/account-type" as Href;
  const driverPolicy = authPolicyContent.driver;

  const clearFieldError = (field: keyof DriverRegisterValues) => {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      return {
        ...current,
        [field]: undefined,
      };
    });
  };

  const onSubmit = () => {
    setSubmitError(null);

    const result = driverRegisterSchema.safeParse({
      fullName,
      phoneNumber,
      citizenId,
      birthDate,
      gender,
      activityArea,
      transport,
      licensePlate,
      shiftType,
      experience,
      acceptedPolicy,
    });

    if (!result.success) {
      const nextErrors: DriverFieldErrors = {};

      for (const [field, messages] of Object.entries(result.error.flatten().fieldErrors)) {
        if (!messages?.length) {
          continue;
        }

        nextErrors[field as keyof DriverRegisterValues] = messages[0];
      }

      setFieldErrors(nextErrors);
      setSubmitError("Vui lòng kiểm tra lại các thông tin bắt buộc trước khi tiếp tục.");
      return;
    }

    setFieldErrors({});
    router.replace(homeRoute);
  };

  return (
    <OnboardingLayout onActionPress={() => router.replace(accountTypeRoute)}>
      <Text style={styles.pageTitle}>Đăng ký Tài Xế Blumie Rider</Text>

      <AuthPrimaryFeedback message={submitError} tone="error" />

      <View style={styles.sectionCard}>
        <SectionTitle icon="document-text-outline" title="Thông tin cá nhân" />

        <FormField
          error={fieldErrors.fullName}
          label="Họ và tên"
          leadingIcon="person-outline"
          onChangeText={(value) => {
            setFullName(value);
            clearFieldError("fullName");
          }}
          placeholder="Ví dụ: Nguyễn Văn An"
          required
          value={fullName}
        />

        <FormField
          error={fieldErrors.phoneNumber}
          keyboardType="phone-pad"
          label="Số điện thoại"
          leadingIcon="phone-portrait-outline"
          onChangeText={(value) => {
            setPhoneNumber(value);
            clearFieldError("phoneNumber");
          }}
          placeholder="0918 xxx xxx"
          required
          value={phoneNumber}
        />

        <FormField
          error={fieldErrors.citizenId}
          keyboardType="number-pad"
          label="CCCD (12 số)"
          leadingIcon="finger-print-outline"
          onChangeText={(value) => {
            setCitizenId(value);
            clearFieldError("citizenId");
          }}
          placeholder="079099•xxxxx"
          required
          value={citizenId}
        />

        <View style={styles.inlineRow}>
          <View style={styles.inlineField}>
            <FormField
              error={fieldErrors.birthDate}
              label="Ngày sinh"
              onChangeText={(value) => {
                setBirthDate(value);
                clearFieldError("birthDate");
              }}
              placeholder="DD/MM/YYYY"
              required
              value={birthDate}
            />
          </View>

          <View style={styles.inlineField}>
            <Text style={styles.fieldLabel}>
              Giới tính <Text style={styles.requiredMark}>*</Text>
            </Text>

            <View style={styles.segmentWrap}>
              {genderOptions.map((item) => {
                const selected = item === gender;

                return (
                  <Pressable
                    key={item}
                    onPress={() => {
                      setGender(item);
                      clearFieldError("gender");
                    }}
                    style={[styles.smallSegmentButton, selected && styles.smallSegmentButtonActive]}
                  >
                    <Text
                      style={[
                        styles.smallSegmentText,
                        selected && styles.smallSegmentTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <AuthInlineError message={fieldErrors.gender} />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>
            Khu vực hoạt động <Text style={styles.requiredMark}>*</Text>
          </Text>

          <View style={styles.activityAreaWrap}>
            {activityAreaOptions.map((item) => {
              const selected = item === activityArea;

              return (
                <Pressable
                  key={item}
                  onPress={() => {
                    setActivityArea(item);
                    clearFieldError("activityArea");
                  }}
                  style={[styles.activityAreaChip, selected && styles.activityAreaChipActive]}
                >
                  <Text
                    style={[
                      styles.activityAreaText,
                      selected && styles.activityAreaTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <AuthInlineError message={fieldErrors.activityArea} />
        </View>
      </View>

      <View style={styles.sectionCard}>
        <SectionTitle icon="bicycle-outline" title="Phương tiện & Thiết bị" />

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>
            Phương tiện vận chuyển <Text style={styles.requiredMark}>*</Text>
          </Text>

          <View style={styles.optionList}>
            {transportOptions.map((item) => {
              const selected = item.key === transport;

              return (
                <Pressable
                  key={item.key}
                  onPress={() => {
                    setTransport(item.key);
                    clearFieldError("transport");
                  }}
                  style={[styles.radioCard, selected && styles.radioCardActive]}
                >
                  <View style={styles.radioCardLeft}>
                    <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
                      {selected ? <View style={styles.radioInner} /> : null}
                    </View>
                    <Text style={styles.radioCardText}>{item.label}</Text>
                  </View>

                  <Ionicons
                    color={onboardingColors.primary}
                    name={item.icon}
                    size={18}
                  />
                </Pressable>
              );
            })}
          </View>

          <AuthInlineError message={fieldErrors.transport} />
        </View>

        <FormField
          error={fieldErrors.licensePlate}
          label="Biển số xe"
          leadingIcon="card-outline"
          onChangeText={(value) => {
            setLicensePlate(value);
            clearFieldError("licensePlate");
          }}
          placeholder="VÍ DỤ: 59-T1 829.41"
          required
          value={licensePlate}
        />

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>
            Ảnh GPLX <Text style={styles.requiredMark}>*</Text>
          </Text>

          <View style={styles.uploadRow}>
            <UploadBox icon="camera-outline" label="Mặt trước" />
            <UploadBox icon="images-outline" label="Mặt sau" />
          </View>
        </View>

        <View style={styles.switchCard}>
          <View style={styles.switchLeft}>
            <View style={styles.checkIconBox} />
            <Text style={styles.switchText}>Nhận Thùng lạnh & Dải chống sốc Blumie</Text>
          </View>

          <Switch
            ios_backgroundColor="#d6d0c8"
            onValueChange={setHasColdBox}
            thumbColor="#fffdfa"
            trackColor={{ false: "#d6d0c8", true: onboardingColors.primary }}
            value={hasColdBox}
          />
        </View>
      </View>

      <View style={styles.sectionCard}>
        <SectionTitle icon="time-outline" title="Kinh nghiệm & Ca chạy" />

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>
            Hình thức làm việc <Text style={styles.requiredMark}>*</Text>
          </Text>

          <View style={styles.fullButtonList}>
            {shiftOptions.map((item) => {
              const selected = item === shiftType;

              return (
                <Pressable
                  key={item}
                  onPress={() => {
                    setShiftType(item);
                    clearFieldError("shiftType");
                  }}
                  style={[styles.fullChoiceButton, selected && styles.fullChoiceButtonActive]}
                >
                  <Text
                    style={[
                      styles.fullChoiceText,
                      selected && styles.fullChoiceTextActive,
                    ]}
                  >
                    {item}
                  </Text>

                  {selected ? (
                    <Ionicons
                      color={onboardingColors.surface}
                      name="checkmark-circle-outline"
                      size={18}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </View>

          <AuthInlineError message={fieldErrors.shiftType} />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>
            Kinh nghiệm vận chuyển <Text style={styles.requiredMark}>*</Text>
          </Text>

          <View style={styles.fullButtonList}>
            {experienceOptions.map((item) => {
              const selected = item === experience;

              return (
                <Pressable
                  key={item}
                  onPress={() => {
                    setExperience(item);
                    clearFieldError("experience");
                  }}
                  style={[styles.fullChoiceButton, selected && styles.fullChoiceButtonActive]}
                >
                  <Text
                    style={[
                      styles.fullChoiceText,
                      selected && styles.fullChoiceTextActive,
                    ]}
                  >
                    {item}
                  </Text>

                  {selected ? (
                    <Ionicons
                      color={onboardingColors.surface}
                      name="ribbon-outline"
                      size={16}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </View>

          <AuthInlineError message={fieldErrors.experience} />
        </View>
      </View>

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: acceptedPolicy }}
        onPress={() => {
          setPolicyChecked(acceptedPolicy);
          setPolicyVisible(true);
        }}
        style={styles.confirmRow}
      >
        <View style={[styles.checkBox, acceptedPolicy && styles.checkBoxActive]}>
          {acceptedPolicy ? (
            <Ionicons color={onboardingColors.surface} name="checkmark" size={14} />
          ) : null}
        </View>

        <Text style={styles.confirmText}>
          Tôi đã đọc <Text style={styles.confirmLink}>chính sách và nghĩa vụ dành cho tài xế giao hoa</Text> của
          Blumie.
        </Text>
      </Pressable>
      <AuthInlineError message={fieldErrors.acceptedPolicy} />

      <View style={styles.submitButtonWrap}>
        <PrimaryButton
          label="Tiếp tục nộp hồ sơ"
          onPress={onSubmit}
        />
      </View>

      <AuthPolicyModal
        acceptLabel="Đồng ý và tiếp tục"
        checked={policyChecked}
        onAccept={() => {
          setAcceptedPolicy(true);
          setFieldErrors((current) => ({ ...current, acceptedPolicy: undefined }));
          setPolicyVisible(false);
        }}
        onClose={() => setPolicyVisible(false)}
        onToggleChecked={() => setPolicyChecked((value) => !value)}
        sections={driverPolicy.sections}
        subtitle={driverPolicy.subtitle}
        title={driverPolicy.title}
        visible={policyVisible}
      />
    </OnboardingLayout>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
}) {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={styles.sectionIcon}>
        <Ionicons color={onboardingColors.primary} name={icon} size={18} />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function UploadBox({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.uploadBox}>
      <Ionicons color={onboardingColors.primary} name={icon} size={22} />
      <Text style={styles.uploadLabel}>{label}</Text>
    </View>
  );
}

function FormField({
  label,
  required,
  leadingIcon,
  error,
  ...props
}: {
  label: string;
  required?: boolean;
  leadingIcon?: keyof typeof Ionicons.glyphMap;
  error?: string;
} & ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>
        {label} {required ? <Text style={styles.requiredMark}>*</Text> : null}
      </Text>

      <View style={styles.inputShell}>
        {leadingIcon ? (
          <Ionicons
            color={onboardingColors.textMuted}
            name={leadingIcon}
            size={16}
            style={styles.leadingIcon}
          />
        ) : null}

        <TextInput
          placeholderTextColor="#9f9c96"
          style={styles.textInput}
          {...props}
        />
      </View>

      <AuthInlineError message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    color: onboardingColors.primary,
    fontSize: 21,
    lineHeight: 31,
    fontWeight: "800",
    marginBottom: 14,
  },
  sectionCard: {
    backgroundColor: "rgba(255, 253, 250, 0.92)",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: onboardingColors.border,
    marginBottom: 14,
    shadowColor: onboardingColors.primary,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  sectionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: onboardingColors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    flex: 1,
    color: onboardingColors.primary,
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "800",
  },
  fieldGroup: {
    marginBottom: 14,
  },
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
  inlineRow: {
    flexDirection: "row",
    gap: 10,
  },
  inlineField: {
    flex: 1,
  },
  inputShell: {
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#92959b",
    backgroundColor: "#f0ede7",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  leadingIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    color: "#2b322c",
    fontSize: 14,
    paddingVertical: 12,
  },
  staticInputText: {
    flex: 1,
    color: "#2b322c",
    fontSize: 14,
  },
  placeholderText: {
    color: "#9f9c96",
  },
  selectField: {
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#92959b",
    backgroundColor: "#f0ede7",
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  selectFieldText: {
    color: "#2b322c",
    fontSize: 14,
  },
  segmentWrap: {
    flexDirection: "row",
    gap: 8,
  },
  smallSegmentButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: "#f0ede7",
    alignItems: "center",
    justifyContent: "center",
  },
  smallSegmentButtonActive: {
    backgroundColor: onboardingColors.primary,
  },
  smallSegmentText: {
    color: "#2b322c",
    fontSize: 13,
    fontWeight: "700",
  },
  smallSegmentTextActive: {
    color: onboardingColors.surface,
  },
  optionList: {
    gap: 8,
  },
  radioCard: {
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: "#f3efe8",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  radioCardActive: {
    borderWidth: 1,
    borderColor: "#cfdccc",
  },
  radioCardLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#a9aca6",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffdfa",
  },
  radioOuterActive: {
    borderColor: onboardingColors.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: onboardingColors.primary,
  },
  radioCardText: {
    color: "#2b322c",
    fontSize: 14,
    fontWeight: "500",
  },
  uploadRow: {
    flexDirection: "row",
    gap: 8,
  },
  uploadBox: {
    flex: 1,
    minHeight: 92,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d8d0c5",
    borderStyle: "dashed",
    backgroundColor: "#f8f5ef",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  uploadLabel: {
    color: "#545d56",
    fontSize: 13,
    fontWeight: "500",
  },
  activityAreaWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  activityAreaChip: {
    minHeight: 34,
    borderRadius: 999,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ede7df",
  },
  activityAreaChipActive: {
    backgroundColor: onboardingColors.primary,
  },
  activityAreaText: {
    color: "#2b322c",
    fontSize: 12,
    fontWeight: "700",
  },
  activityAreaTextActive: {
    color: onboardingColors.surface,
  },
  switchCard: {
    minHeight: 42,
    borderRadius: 12,
    backgroundColor: "#edf4ee",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  switchLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkIconBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: onboardingColors.primary,
  },
  switchText: {
    flex: 1,
    color: "#284132",
    fontSize: 13,
    fontWeight: "600",
  },
  fullButtonList: {
    gap: 8,
  },
  fullChoiceButton: {
    minHeight: 42,
    borderRadius: 999,
    backgroundColor: "#f3efe8",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  fullChoiceButtonActive: {
    backgroundColor: onboardingColors.primary,
  },
  fullChoiceText: {
    flex: 1,
    color: "#2b322c",
    fontSize: 13,
    fontWeight: "700",
  },
  fullChoiceTextActive: {
    color: onboardingColors.surface,
  },
  confirmRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 2,
    marginBottom: 4,
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
  confirmText: {
    flex: 1,
    color: "#555d56",
    fontSize: 13,
    lineHeight: 20,
  },
  confirmLink: {
    color: onboardingColors.primary,
    fontWeight: "700",
  },
  submitButtonWrap: {
    marginTop: 10,
    marginBottom: 18,
  },
});
