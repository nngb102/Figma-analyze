# Figma Design Analyzer

## Giới thiệu
Figma Design Analyzer là một công cụ phân tích thiết kế toàn diện, được phát triển để khám phá và tài liệu hóa chi tiết mọi thành phần trong file Figma. Công cụ này cung cấp một phân tích sâu sắc về các thuộc tính thiết kế, giúp các nhà thiết kế và nhà phát triển hiểu rõ hơn về đặc tả thiết kế của họ.

## Tính năng chính

### 1. Phân tích chi tiết các thuộc tính
- **Kích thước và vị trí**
  - Chiều rộng và chiều cao
  - Tọa độ X và Y
  - Góc xoay
  - Các ràng buộc (constraints)

- **Padding và Margin**
  - Padding (top, bottom, left, right)
  - Margin (nếu có)

- **Thuộc tính viền (Border)**
  - Màu sắc
  - Độ rộng
  - Bán kính góc
  - Kiểu viền

- **Thuộc tính màu sắc**
  - Màu nền
  - Gradient
  - Hình ảnh nền
  - Độ trong suốt (opacity)

- **Thuộc tính văn bản**
  - Font chữ
  - Kích thước chữ
  - Độ đậm (weight)
  - Chiều cao dòng
  - Khoảng cách chữ
  - Màu sắc
  - Căn chỉnh

- **Hiệu ứng**
  - Đổ bóng
  - Bóng trong
  - Làm mờ
  - Làm mờ nền
  - Làm mờ lớp

### 2. Hỗ trợ đa dạng loại phần tử
- Frames
- Groups
- Shapes (hình chữ nhật, hình tròn, đa giác, ngôi sao)
- Text layers
- Images
- Components
- Component instances
- Auto layout frames

### 3. Phân tích cấu trúc phân cấp
- Biểu diễn cấu trúc phân cấp của thiết kế
- Theo dõi các phần tử lồng nhau
- Xác định mối quan hệ giữa các phần tử

### 4. Phân tích Component
- Xác định và báo cáo các override trong component instances
- Theo dõi các biến thể của component
- Phân tích các thuộc tính có thể tùy chỉnh

## Đầu ra
Công cụ tạo ra một báo cáo có cấu trúc chi tiết cho mỗi phần tử, bao gồm:
- Tất cả các thuộc tính được xác định
- Dữ liệu được tổ chức theo cấu trúc rõ ràng
- Dễ dàng truy cập và tìm kiếm
- Định dạng JSON hoặc các định dạng khác theo yêu cầu

## Độ chính xác
- Phân tích 100% chính xác
- Đảm bảo độ tin cậy của dữ liệu
- Kiểm tra kỹ lưỡng các thuộc tính

## Lợi ích
- Tiết kiệm thời gian cho các nhà thiết kế và nhà phát triển
- Giảm thiểu lỗi trong quá trình chuyển đổi từ thiết kế sang code
- Cải thiện quy trình làm việc giữa thiết kế và phát triển
- Tạo tài liệu thiết kế chi tiết và có cấu trúc

## Yêu cầu hệ thống
- Node.js (phiên bản mới nhất)
- Figma API access token
- Các thư viện phụ thuộc (sẽ được liệt kê trong package.json)

## Cài đặt và sử dụng
(Thông tin chi tiết về cách cài đặt và sử dụng sẽ được thêm vào sau)
