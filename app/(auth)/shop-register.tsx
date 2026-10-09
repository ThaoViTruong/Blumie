import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Href, router } from "expo-router";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";

import {
  AuthInlineError,
  AuthPolicyModal,
  AuthPrimaryFeedback,
} from "@/src/components/auth/auth-form-ui";
import { OnboardingLayout, PrimaryButton, onboardingColors } from "@/src/components/auth/onboarding-ui";
import { authPolicyContent } from "@/src/lib/auth-policy";
import { shopRegisterSchema, type ShopRegisterValues } from "@/src/lib/auth-schema";

const shopSizes = ["< 30 m²", "30 - 60 m²", "> 60 m²"] as const;
const deliveryAreaOptions = [
  "Nội thành TP.HCM",
  "Thủ Đức",
  "Tân Bình - Phú Nhuận",
] as const;
const bouquetStyles = [
  "Hoa bó hiện đại",
  "Hoa cưới & Sự kiện",
  "Bình hoa nghệ thuật",
  "Hoa nhập khẩu",
] as const;

type ShopFieldErrors = Partial<Record<keyof ShopRegisterValues, string>>;

export default function ShopRegisterScreen() {
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [hotline, setHotline] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [shopSize, setShopSize] = useState<(typeof shopSizes)[number] | "">("");
  const [hasColdStorage, setHasColdStorage] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [policyVisible, setPolicyVisible] = useState(false);
  const [policyChecked, setPolicyChecked] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ShopFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const homeRoute = "/home" as Href;
  const accountTypeRoute = "/account-type" as Href;
  const shopPolicy = authPolicyContent.shop;

  const clearFieldError = (field: keyof ShopRegisterValues) => {
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

  const toggleStyle = (value: string) => {
    clearFieldError("bouquetStyles");
    setSelectedStyles((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const onSubmit = () => {
    setSubmitError(null);

    const result = shopRegisterSchema.safeParse({
      shopName,
      shopAddress,
      hotline,
      email,
      deliveryArea,
      shopSize,
      bouquetStyles: selectedStyles,
      bio,
      acceptedPolicy,
    });

    if (!result.success) {
      const nextErrors: ShopFieldErrors = {};

      for (const [field, messages] of Object.entries(result.error.flatten().fieldErrors)) {
        if (!messages?.length) {
          continue;
        }

        nextErrors[field as keyof ShopRegisterValues] = messages[0];
      }

      setFieldErrors(nextErrors);
      setSubmitError("Vui lòng kiểm tra lại các thông tin bắt buộc trước khi gửi hồ sơ.");
      return;
    }

    setFieldErrors({});
    router.replace(homeRoute);
  };

  return (
    <OnboardingLayout onActionPress={() => router.replace(accountTypeRoute)}>
      <Text style={styles.pageTitle}>Đăng ký Mở Shop Hoa</Text>

      <AuthPrimaryFeedback message={submitError} tone="error" />

      <View style={styles.sectionCard}>
        <SectionTitle icon="storefront-outline" title="1. Hồ sơ Thương hiệu Tiệm Hoa" />

        <FormField
          error={fieldErrors.shopName}
          label="Tên tiệm hoa"
          onChangeText={(value) => {
            setShopName(value);
            clearFieldError("shopName");
          }}
          placeholder="VD: May Bloom Studio, Tiệm Hoa Nắng..."
          required
          value={shopName}
        />

        <FormField
          error={fieldErrors.shopAddress}
          label="Địa chỉ tiệm"
          onChangeText={(value) => {
            setShopAddress(value);
            clearFieldError("shopAddress");
          }}
          placeholder="Số nhà, đường, phường, quận"
          required
          value={shopAddress}
        />

        <FormField
          error={fieldErrors.hotline}
          keyboardType="phone-pad"
          label="Hotline"
          onChangeText={(value) => {
            setHotline(value);
            clearFieldError("hotline");
          }}
          placeholder="0908 xxx xxx"
          required
          value={hotline}
        />

        <FormField
          autoCapitalize="none"
          error={fieldErrors.email}
          keyboardType="email-address"
          label="Email"
          onChangeText={(value) => {
            setEmail(value);
            clearFieldError("email");
          }}
          placeholder="partner@tiemhoanang.vn"
          required
          value={email}
        />

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>
            Khu vực giao hàng <Text style={styles.requiredMark}>*</Text>
          </Text>

          <View style={styles.deliveryAreaWrap}>
            {deliveryAreaOptions.map((item) => {
              const selected = item === deliveryArea;

              return (
                <Pressable
                  key={item}
                  onPress={() => {
                    setDeliveryArea(item);
                    clearFieldError("deliveryArea");
                  }}
                  style={[styles.deliveryAreaChip, selected && styles.deliveryAreaChipActive]}
                >
                  <Text
                    style={[
                      styles.deliveryAreaChipText,
                      selected && styles.deliveryAreaChipTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <AuthInlineError message={fieldErrors.deliveryArea} />
        </View>
      </View>

      <View style={styles.sectionCard}>
        <SectionTitle icon="settings-outline" title="2. Tiêu chuẩn Cơ sở & Giữ Hoa" />

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>
            Diện tích tiệm <Text style={styles.requiredMark}>*</Text>
          </Text>

          <View style={styles.segmentRow}>
            {shopSizes.map((size) => {
              const selected = size === shopSize;

              return (
                <Pressable
                  key={size}
                  onPress={() => {
                    setShopSize(size);
                    clearFieldError("shopSize");
                  }}
                  style={[styles.segmentButton, selected && styles.segmentButtonActive]}
                >
                  <Text
                    style={[
                      styles.segmentButtonText,
                      selected && styles.segmentButtonTextActive,
                    ]}
                  >
                    {size}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <AuthInlineError message={fieldErrors.shopSize} />
        </View>

        <View style={styles.switchCard}>
          <Text style={styles.switchLabel}>Tủ mát / Kho lạnh chuyên dụng</Text>

          <Switch
            ios_backgroundColor="#d6d0c8"
            onValueChange={setHasColdStorage}
            thumbColor="#fffdfa"
            trackColor={{ false: "#d6d0c8", true: onboardingColors.primary }}
            value={hasColdStorage}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>
            Phong cách cắm hoa <Text style={styles.requiredMark}>*</Text>
          </Text>

          <View style={styles.tagWrap}>
            {bouquetStyles.map((item) => {
              const selected = selectedStyles.includes(item);

              return (
                <Pressable
                  key={item}
                  onPress={() => toggleStyle(item)}
                  style={[styles.choiceTag, selected && styles.choiceTagActive]}
                >
                  <Ionicons
                    color={selected ? onboardingColors.surface : onboardingColors.primary}
                    name={
                      item === "Hoa bó hiện đại"
                        ? "leaf-outline"
                        : item === "Hoa cưới & Sự kiện"
                          ? "heart-outline"
                          : item === "Bình hoa nghệ thuật"
                            ? "diamond-outline"
                            : "airplane-outline"
                    }
                    size={13}
                  />
                  <Text
                    style={[
                      styles.choiceTagText,
                      selected && styles.choiceTagTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <AuthInlineError message={fieldErrors.bouquetStyles} />
        </View>
      </View>

      <View style={styles.sectionCard}>
        <SectionTitle icon="camera-outline" title="3. Xác thực & Tác phẩm Thực tế" />

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>
            GPKD hoặc CCCD chủ tiệm <Text style={styles.requiredMark}>*</Text>
          </Text>

          <View style={styles.uploadCard}>
            <View style={styles.uploadIcon}>
              <Ionicons color={onboardingColors.primary} name="document-outline" size={20} />
            </View>
            <Text style={styles.uploadText}>Tải lên tệp PDF hoặc ảnh chụp</Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>
            Ảnh tác phẩm tiêu biểu (3 ảnh) <Text style={styles.requiredMark}>*</Text>
          </Text>

          <View style={styles.galleryRow}>
            {[require("@/assets/images/banner-01.jpg"), require("@/assets/images/banner-02.jpg")].map(
              (source, index) => (
                <View key={index} style={styles.previewCard}>
                  <Image contentFit="cover" source={source} style={styles.previewImage} />

                  <View style={styles.previewBadge}>
                    <Ionicons color={onboardingColors.surface} name="checkmark" size={12} />
                  </View>
                </View>
              )
            )}

            <View style={[styles.previewCard, styles.addImageCard]}>
              <Ionicons color={onboardingColors.primary} name="add" size={28} />
              <Text style={styles.addImageText}>Thêm ảnh</Text>
            </View>
          </View>
        </View>

        <FormField
          error={fieldErrors.bio}
          label="Giới thiệu ngắn"
          multiline
          onChangeText={(value) => {
            setBio(value);
            clearFieldError("bio");
          }}
          placeholder="Kinh nghiệm, phong cách cắm hoa của tiệm..."
          style={[styles.textInput, styles.textArea]}
          textAlignVertical="top"
          value={bio}
        />
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
          Tôi đã đọc <Text style={styles.confirmLink}>chính sách và nghĩa vụ dành cho chủ tiệm hoa</Text> của
          Blumie.
        </Text>
      </Pressable>
      <AuthInlineError message={fieldErrors.acceptedPolicy} />

      <View style={styles.submitButtonWrap}>
        <PrimaryButton label="Gửi hồ sơ xét duyệt" onPress={onSubmit} />
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
        sections={shopPolicy.sections}
        subtitle={shopPolicy.subtitle}
        title={shopPolicy.title}
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

function FormField({
  label,
  required,
  error,
  style,
  ...props
}: {
  label: string;
  required?: boolean;
  error?: string;
  style?: ComponentProps<typeof TextInput>["style"];
} & ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>
        {label} {required ? <Text style={styles.requiredMark}>*</Text> : null}
      </Text>

      <TextInput
        placeholderTextColor="#9f9c96"
        style={[styles.textInput, style, error ? styles.textInputError : null]}
        {...props}
      />

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
  textInput: {
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#92959b",
    backgroundColor: "#f0ede7",
    paddingHorizontal: 14,
    color: "#2b322c",
    fontSize: 14,
  },
  textInputError: {
    borderColor: "#d36262",
  },
  selectField: {
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#92959b",
    backgroundColor: "#f0ede7",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  selectFieldText: {
    flex: 1,
    color: "#2b322c",
    fontSize: 14,
  },
  placeholderText: {
    color: "#9f9c96",
  },
  deliveryAreaWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  deliveryAreaChip: {
    minHeight: 34,
    borderRadius: 999,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ede7df",
  },
  deliveryAreaChipActive: {
    backgroundColor: onboardingColors.primary,
  },
  deliveryAreaChipText: {
    color: "#2b322c",
    fontSize: 12,
    fontWeight: "700",
  },
  deliveryAreaChipTextActive: {
    color: onboardingColors.surface,
  },
  segmentRow: {
    flexDirection: "row",
    gap: 8,
  },
  segmentButton: {
    flex: 1,
    minHeight: 34,
    borderRadius: 8,
    backgroundColor: "#ede7df",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  segmentButtonActive: {
    backgroundColor: onboardingColors.primary,
  },
  segmentButtonText: {
    color: "#2c332d",
    fontSize: 12,
    fontWeight: "700",
  },
  segmentButtonTextActive: {
    color: onboardingColors.surface,
  },
  switchCard: {
    minHeight: 40,
    borderRadius: 10,
    backgroundColor: "#ede7df",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },
  switchLabel: {
    flex: 1,
    color: "#2c332d",
    fontSize: 14,
    fontWeight: "500",
  },
  tagWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  choiceTag: {
    minHeight: 34,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: onboardingColors.primary,
    backgroundColor: "#fffdfa",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  choiceTagActive: {
    backgroundColor: onboardingColors.primary,
  },
  choiceTagText: {
    color: onboardingColors.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  choiceTagTextActive: {
    color: onboardingColors.surface,
  },
  uploadCard: {
    minHeight: 94,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d8d0c5",
    borderStyle: "dashed",
    backgroundColor: "#f8f5ef",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  uploadIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ede7df",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  uploadText: {
    color: "#656a64",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  galleryRow: {
    flexDirection: "row",
    gap: 10,
  },
  previewCard: {
    flex: 1,
    height: 108,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#ece6de",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewBadge: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: onboardingColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addImageCard: {
    borderWidth: 1,
    borderColor: "#d8d0c5",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  addImageText: {
    color: "#656a64",
    fontSize: 13,
    fontWeight: "500",
  },
  textArea: {
    minHeight: 88,
    paddingTop: 14,
    paddingBottom: 14,
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
