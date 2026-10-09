import { z } from "zod";

const phoneRegex = /^(0|\+84)\d{8,10}$/;
const citizenIdRegex = /^\d{12}$/;
const dateRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const requiredString = (message: string, min = 1) =>
  z
    .string()
    .trim()
    .min(min, message);

export const customerRegisterSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Họ và tên phải có ít nhất 2 ký tự."),
    phoneNumber: z
      .string()
      .trim()
      .transform((value) => value.replace(/\s+/g, ""))
      .refine((value) => phoneRegex.test(value), "Số điện thoại chưa đúng định dạng."),
    email: z.email("Email chưa đúng định dạng."),
    password: z
      .string()
      .min(8, "Mật khẩu cần tối thiểu 8 ký tự.")
      .regex(/[A-Z]/, "Mật khẩu cần có ít nhất 1 chữ in hoa.")
      .regex(/[a-z]/, "Mật khẩu cần có ít nhất 1 chữ thường.")
      .regex(/\d/, "Mật khẩu cần có ít nhất 1 số."),
    confirmPassword: z.string(),
    acceptedTerms: z
      .boolean()
      .refine((value) => value, "Bạn cần đồng ý với điều khoản trước khi tiếp tục."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại chưa khớp.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Email chưa đúng định dạng."),
  password: z.string().min(8, "Mật khẩu cần tối thiểu 8 ký tự."),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Email chưa đúng định dạng."),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Mật khẩu cần tối thiểu 8 ký tự.")
      .regex(/[A-Z]/, "Mật khẩu cần có ít nhất 1 chữ in hoa.")
      .regex(/[a-z]/, "Mật khẩu cần có ít nhất 1 chữ thường.")
      .regex(/\d/, "Mật khẩu cần có ít nhất 1 số."),
    confirmPassword: z.string(),
    logoutOtherDevices: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận chưa khớp.",
    path: ["confirmPassword"],
  });

export const shopRegisterSchema = z.object({
  shopName: requiredString("Tên tiệm hoa cần có ít nhất 2 ký tự.", 2),
  shopAddress: requiredString("Địa chỉ tiệm cần có ít nhất 8 ký tự.", 8),
  hotline: z
    .string()
    .trim()
    .transform((value) => value.replace(/\s+/g, ""))
    .refine((value) => phoneRegex.test(value), "Hotline chưa đúng định dạng."),
  email: z.email("Email chưa đúng định dạng."),
  deliveryArea: requiredString("Bạn cần chọn khu vực giao hàng."),
  shopSize: requiredString("Bạn cần chọn diện tích tiệm."),
  bouquetStyles: z
    .array(z.string())
    .min(1, "Bạn cần chọn ít nhất 1 phong cách cắm hoa."),
  bio: z
    .string()
    .trim()
    .max(300, "Phần giới thiệu tối đa 300 ký tự.")
    .optional()
    .or(z.literal("")),
  acceptedPolicy: z
    .boolean()
    .refine((value) => value, "Bạn cần đọc và đồng ý chính sách dành cho chủ tiệm hoa."),
});

export const driverRegisterSchema = z.object({
  fullName: requiredString("Họ và tên phải có ít nhất 2 ký tự.", 2),
  phoneNumber: z
    .string()
    .trim()
    .transform((value) => value.replace(/\s+/g, ""))
    .refine((value) => phoneRegex.test(value), "Số điện thoại chưa đúng định dạng."),
  citizenId: z
    .string()
    .trim()
    .refine((value) => citizenIdRegex.test(value), "CCCD phải gồm đúng 12 chữ số."),
  birthDate: z
    .string()
    .trim()
    .refine((value) => dateRegex.test(value), "Ngày sinh cần theo định dạng DD/MM/YYYY."),
  gender: requiredString("Bạn cần chọn giới tính."),
  activityArea: requiredString("Bạn cần chọn khu vực hoạt động."),
  transport: requiredString("Bạn cần chọn phương tiện vận chuyển."),
  licensePlate: requiredString("Biển số xe không được để trống.", 5),
  shiftType: requiredString("Bạn cần chọn hình thức làm việc."),
  experience: requiredString("Bạn cần chọn kinh nghiệm vận chuyển."),
  acceptedPolicy: z
    .boolean()
    .refine((value) => value, "Bạn cần đọc và đồng ý chính sách dành cho tài xế giao hoa."),
});

export type CustomerRegisterValues = z.infer<typeof customerRegisterSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
export type ShopRegisterValues = z.infer<typeof shopRegisterSchema>;
export type DriverRegisterValues = z.infer<typeof driverRegisterSchema>;
