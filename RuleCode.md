# RuleCode.md --- BLUMIE CODING RULES

> **Project:** Blumie -- App mua bán và đặt hoa trực tuyến
> **Mục đích:** Thống nhất cách code, bảo vệ workspace và tránh ảnh hưởng đến các dự án khác trên máy.

------------------------------------------------------------------------

## 1. BẮT BUỘC ĐỌC RULECODE

-   Luôn đọc `RuleCode.md` trước khi code.
-   Nếu có `FE_PROMPT.md`, `README.md` hoặc tài liệu nghiệp vụ trong
    workspace, đọc trước khi thay đổi code.
-   Nếu yêu cầu mâu thuẫn với RuleCode hoặc business logic đã chốt, phải
    hỏi người dùng trước khi thực hiện thay đổi lớn.

## 2. CHỈ LÀM VIỆC TRONG WORKSPACE BLUMIE

**Workspace duy nhất:** thư mục project Blumie đang được mở 

Chỉ được đọc, tạo, sửa hoặc xóa file bên trong workspace hiện tại.

Tuyệt đối không: 
- Truy cập project khác. 
- `cd` sang project khác. 
- Tìm kiếm toàn bộ ổ `C:\`, `D:\`, `E:\`. 
- Đọc Desktop, Documents, Downloads, OneDrive hoặc dữ liệu cá nhân. 
- Đọc source code của projectkhác. 
- Copy code từ project khác nếu người dùng chưa cung cấp. 
- Sửa, xóa hoặc đổi tên file ngoài workspace Blumie. 
- Chạy script có phạm vi toàn ổ đĩa hoặc nhiều project.

Nếu không xác định được workspace hiện tại: **DỪNG và hỏi người dùng.**

## 3. BẢO VỆ MÁY VÀ TÀI NGUYÊN

Không tự ý: 
- Kill process của Windows, IDE hoặc project khác. 
- Restart/shutdown máy. 
- Thay đổi Windows/system settings. 
- Thay đổi
environment variables toàn hệ thống. 
- Cài phần mềm toàn hệ thống. 
- Chạy command yêu cầu Administrator. 
- Thay đổi firewall/network/system
configuration. 
- Xóa cache hoặc file tạm ngoài workspace.

### RAM/CPU

Không tự ý chạy: 
- Nhiều dev server không cần thiết. 
- Build nhiều project cùng lúc. 
- Script đọc toàn bộ ổ đĩa. 
- Infinite loop. 
- Stress test/benchmark. 
- Generate dữ liệu cực lớn. 
- Docker/container nặng nếu chưa được yêu cầu. 
- Các tiến trình nền không cần thiết.

Chỉ chạy tác vụ cần thiết cho Blumie.

Nếu tài nguyên tăng bất thường: dừng tác vụ và báo người dùng. Không tự
ý kill process không rõ nguồn gốc.


## 4. KHÔNG PHÁ CẤU TRÚC PROJECT

-   Không tự ý đổi framework.
-   Không tự ý đổi package manager.
-   Không tự ý đổi kiến trúc project.
-   Không tự ý đổi tên project.
-   Không tạo lại project từ đầu.
-   Không xóa hàng loạt file.
-   Không tạo component trùng chức năng nếu đã có component dùng chung.

Trước khi tạo file mới: 1. Kiểm tra component/file tương tự. 2. Ưu tiên
tái sử dụng. 3. Chỉ tạo mới khi thực sự cần.

## 5. DEPENDENCY

Không tự ý cài package mới.

Trước khi cài package: 
- Kiểm tra dependency hiện tại. 
- Kiểm tra khả năng dùng thư viện đã có. 
- Nếu cần package mới, phải nêu package, mục đích và lý do. 
- Chỉ cài khi người dùng cho phép hoặc task yêu cầu rõ.

## 6. CODE STYLE

Ưu tiên:

``` text
Simple > Clever
Reusable > Duplicate
Readable > Short
Stable > Experimental
```

Không over-engineering.

Không tạo abstraction phức tạp cho chức năng đơn giản.

## 7. BLUMIE DESIGN SYSTEM

Phong cách: - Elegant - Modern - Premium - Feminine - Minimal

Màu: - Deep Forest Green - Warm Ivory / Cream - Soft Blush Pink

Typography: - Serif elegant cho heading lớn. - Sans-serif cho body/UI.

UI: - Rounded corners. - Soft shadows. - Nhiều whitespace. - Flower
photography chất lượng cao. - Không neon. - Không lạm dụng gradient. -
Không UI quá phức tạp.

Mọi màn hình phải responsive cho Mobile, Tablet và Desktop.

## 8. BUSINESS LOGIC ĐÃ CHỐT

Roles:

``` text
Customer
Shop Owner / Seller
Delivery Staff
Admin
```

Payment:

``` text
COD
Bank Transfer
MoMo
```

Flow:

``` text
Customer
→ Cart
→ Checkout
→ Payment
→ Seller Confirmation
→ Preparing
→ Delivery Staff
→ Delivering
→ Delivered
→ Review
```

Không tự ý: - Thêm/xóa role. - Đổi Delivery Staff thành bên thứ ba. -
Thêm payment method ngoài nghiệp vụ. - Thay đổi order status. - Thay đổi
quyền của role.

Muốn thay đổi nghiệp vụ phải hỏi người dùng.

## 9. GIT SAFETY

Không tự ý chạy:

``` bash
git push --force
git reset --hard
git clean -fd
git checkout .
```

Không tự ý xóa branch hoặc merge vào `main`.

Trước commit:

``` text
Check changes
→ Test
→ Commit
```

Commit message:

``` text
feat: add product search
fix: resolve cart quantity bug
ui: improve product detail
refactor: simplify order service
```

Không refactor code của thành viên khác nếu không liên quan task.

## 10. API / SECRET

Không hard-code: - Password - API key - Token - Secret - Database
credentials - Payment credentials

Dùng `.env`, `.env.local`, `.env.example`.

Không commit secret lên Git.

Mọi API call cần xử lý:

``` text
Loading
Success
Error
Empty
```

Không để UI crash với `null`, `undefined`, `401`, `403`, `404`, `500`,
timeout hoặc API error.

## 11. TASK SCOPE

Mỗi task chỉ thay đổi những file cần thiết.

Quy trình:

``` text
Task
→ Identify affected files
→ Read existing implementation
→ Plan
→ Modify
→ Test
```

Không tự động sửa toàn project.

Không tạo file rác như:

``` text
test123
temp
backup
old
new
final
final2
debug
copy
```

## 12. TEST

Không báo `Done` nếu chưa kiểm tra.

Task chỉ được `Done` khi: - Code chạy. - Không có lỗi compile/build liên
quan. - UI hoạt động đúng. - API đã kiểm tra nếu task có API. -
Responsive cơ bản. - Không phá chức năng cũ.

Nếu chưa test:

``` text
Status = In Progress
```

## 13. XỬ LÝ LỖI

Không sửa mò.

Khi có lỗi:

``` text
1. Đọc error message
2. Xác định file
3. Xác định nguyên nhân
4. Sửa nguyên nhân
5. Test lại
```

Không: - Xóa code để che lỗi. - Comment hàng loạt code. - Tắt
validation. - Tắt authentication để "cho chạy". - Đổi system config để
né lỗi.

## 14. BÁO CÁO SAU TASK

Sau mỗi task báo cáo ngắn:

``` text
TASK:
[Task name]

DONE:
- [item]

FILES CHANGED:
- [file]

TEST:
- [result]

ISSUE:
- None / [issue]

NEXT:
- [next step]
```

Không nói `Done` nếu chưa test.

## 15. AN TOÀN TUYỆT ĐỐI

Nếu command/yêu cầu có khả năng: - Truy cập project khác. - Đọc dữ liệu
cá nhân. - Thay đổi file ngoài workspace. - Xóa dữ liệu. - Thay đổi
system settings. - Kill process. - Sử dụng tài nguyên bất thường. - Cài
phần mềm hệ thống. - Yêu cầu Administrator. - Truy cập
credentials/secrets.

**PHẢI DỪNG VÀ HỎI NGƯỜI DÙNG.**

Không tự suy đoán rằng người dùng cho phép.

## 16. PRIORITY

Khi có xung đột, ưu tiên:

``` text
1. Security & System Safety
2. User's explicit instruction
3. RuleCode.md
4. Existing project architecture
5. Business requirements
6. Coding convenience
```

## 17. FINAL RULE

> **BLUMIE ONLY.**

Agent chỉ làm việc trong workspace Blumie.

Không truy cập project khác.\
Không sửa project khác.\
Không can thiệp hệ thống.\
Không tự ý sử dụng tài nguyên máy quá mức.\
Không tự ý thay đổi nghiệp vụ.\
Không tự ý phá cấu trúc project.\
Không tự ý thêm dependency.\
Không tự ý thực hiện Git nguy hiểm.

**Nếu không chắc chắn → DỪNG → HỎI NGƯỜI DÙNG.**
