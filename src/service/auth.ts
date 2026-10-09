import { supabase } from "@/src/lib/subabase";

type RegisterCustomerInput = {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export async function registerCustomer(input: RegisterCustomerInput) {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName,
        phone_number: input.phoneNumber,
        role: "customer",
      },
    },
  });

  if (error) {
    throw new Error(mapSupabaseMessage(error.message));
  }

  return data;
}

export async function loginWithEmail(input: LoginInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (error) {
    throw new Error(mapSupabaseMessage(error.message));
  }

  return data;
}

export async function requestPasswordReset(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "blumie://reset-password",
  });

  if (error) {
    throw new Error(mapSupabaseMessage(error.message));
  }

  return data;
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(mapSupabaseMessage(error.message));
  }

  return data;
}

function mapSupabaseMessage(message: string) {
  if (message.toLowerCase().includes("invalid login credentials")) {
    return "Email hoặc mật khẩu chưa đúng.";
  }

  if (message.toLowerCase().includes("user already registered")) {
    return "Email này đã được đăng ký.";
  }

  if (message.toLowerCase().includes("email not confirmed")) {
    return "Email chưa được xác nhận. Vui lòng kiểm tra hộp thư của bạn.";
  }

  if (message.toLowerCase().includes("same password")) {
    return "Mật khẩu mới cần khác mật khẩu hiện tại.";
  }

  return message;
}
