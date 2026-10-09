export type AuthPolicyRole = "customer" | "shop" | "driver";

type AuthPolicyContent = {
  title: string;
  subtitle: string;
  sections: {
    title: string;
    items: string[];
  }[];
};

export const authPolicyContent: Record<AuthPolicyRole, AuthPolicyContent> = {
  customer: {
    title: "Chính sách dành cho Khách hàng",
    subtitle:
      "Thông tin dưới đây được rút gọn từ tài liệu chính sách Blumie để áp dụng trong bước đăng ký tài khoản.",
    sections: [
      {
        title: "Thông tin và quyền riêng tư",
        items: [
          "Blumie thu thập thông tin tài khoản, giao hàng, đơn hàng, thanh toán và phản hồi ở phạm vi cần thiết để cung cấp dịch vụ.",
          "Dữ liệu chỉ được chia sẻ cho cửa hàng, tài xế, đối tác thanh toán hoặc đơn vị kỹ thuật trong phạm vi xử lý đơn hàng.",
          "Blumie không yêu cầu mật khẩu ngân hàng, mã PIN ví điện tử hoặc OTP thanh toán qua kênh hỗ trợ.",
        ],
      },
      {
        title: "Quyền của khách hàng",
        items: [
          "Bạn có quyền xem, cập nhật, chỉnh sửa hoặc yêu cầu xóa dữ liệu cá nhân theo phạm vi pháp luật cho phép.",
          "Bạn có thể yêu cầu giải thích việc thu thập dữ liệu, gửi khiếu nại và nhận hỗ trợ về tài khoản, đơn hàng hoặc thanh toán.",
          "Một số dữ liệu vẫn có thể được lưu giữ trong thời gian cần thiết để xử lý giao dịch, tranh chấp hoặc nghĩa vụ pháp lý.",
        ],
      },
      {
        title: "Nghĩa vụ khi sử dụng tài khoản",
        items: [
          "Cung cấp đúng họ tên, email, số điện thoại và thông tin giao hàng khi đăng ký hoặc đặt hàng.",
          "Tự bảo mật mật khẩu, mã xác thực và thiết bị đăng nhập của mình.",
          "Không tạo đơn giả, gian lận thanh toán, dùng tài khoản người khác hoặc đăng nội dung xúc phạm và tiết lộ dữ liệu của người khác.",
        ],
      },
    ],
  },
  shop: {
    title: "Chính sách dành cho Chủ tiệm hoa",
    subtitle:
      "Khi đăng ký mở shop, bạn cần xác nhận đã đọc nghĩa vụ vận hành, bảo mật dữ liệu và xử lý đơn hàng của Blumie.",
    sections: [
      {
        title: "Đăng ký và xác minh cửa hàng",
        items: [
          "Chủ shop phải cung cấp đúng tên cửa hàng, địa chỉ, thông tin liên hệ, hình ảnh và giấy tờ xác minh khi hệ thống yêu cầu.",
          "Chỉ được kinh doanh sau khi hoàn tất quy trình phê duyệt của Blumie nếu có áp dụng.",
          "Không giả mạo danh tính, thương hiệu hoặc thông tin của cửa hàng khác.",
        ],
      },
      {
        title: "Nghĩa vụ sản phẩm và xử lý đơn",
        items: [
          "Sản phẩm phải có hình ảnh, mô tả, giá bán và tồn kho trung thực; không đăng nội dung vi phạm pháp luật hoặc gây hiểu nhầm.",
          "Chỉ xác nhận đơn khi có thể đáp ứng đúng sản phẩm, số lượng và thời gian giao dự kiến.",
          "Cần chuẩn bị, đóng gói và bàn giao đơn đúng quy trình; phải báo sớm khi thiếu hàng, chậm trễ hoặc không thể hoàn thành đơn.",
        ],
      },
      {
        title: "Bảo mật dữ liệu và tuân thủ nền tảng",
        items: [
          "Thông tin khách hàng chỉ được dùng để xử lý đơn, chăm sóc sau bán và giải quyết sự cố liên quan.",
          "Không được chia sẻ dữ liệu khách, không yêu cầu mật khẩu, OTP hay lôi kéo khách ra ngoài nền tảng để né quy trình bảo vệ của Blumie.",
          "Không tạo đơn giả, thao túng đánh giá, lạm dụng khuyến mãi hoặc quảng cáo sai sự thật về chất lượng và giá bán.",
        ],
      },
    ],
  },
  driver: {
    title: "Chính sách dành cho Tài xế giao hoa",
    subtitle:
      "Khi đăng ký trở thành Blumie Rider, bạn cần xác nhận rõ trách nhiệm giao hàng, COD, bảo mật và ứng xử an toàn.",
    sections: [
      {
        title: "Tài khoản và phân công",
        items: [
          "Tài khoản giao hàng chỉ được dùng bởi đúng cá nhân đăng ký, không chia sẻ hoặc để người khác thao tác thay.",
          "Chỉ được xem và xử lý các đơn hàng đã được phân công trong hệ thống.",
          "Phải cập nhật trạng thái làm việc trung thực, không nhận đơn ngoài hệ thống dưới danh nghĩa Blumie khi chưa được phép.",
        ],
      },
      {
        title: "Nghĩa vụ giao hàng và COD",
        items: [
          "Cần kiểm tra tình trạng hàng, nhận hàng đúng quy trình, cập nhật trạng thái nhận đơn, đang giao và đã giao chính xác.",
          "Phải bảo quản hoa, tránh dập gãy, không tự ý hủy đơn, đổi địa chỉ hoặc thu thêm phí ngoài quy trình.",
          "Với đơn COD, chỉ thu đúng số tiền trên đơn, bảo quản tiền thu hộ và đối soát đúng thời hạn.",
        ],
      },
      {
        title: "Bảo mật và ứng xử",
        items: [
          "Thông tin khách hàng chỉ được dùng để hoàn tất việc giao hàng, không sao chép, chia sẻ hoặc liên hệ ngoài mục đích giao hàng.",
          "Không đăng địa chỉ, số điện thoại hoặc hình ảnh khách lên mạng xã hội nếu chưa có căn cứ và sự cho phép phù hợp.",
          "Phải giao tiếp lịch sự, tuân thủ luật giao thông, không quấy rối, gian lận, chiếm giữ hàng hóa hoặc tiền thu hộ.",
        ],
      },
    ],
  },
};
