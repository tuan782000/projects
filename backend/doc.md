yarn add --exact @nestjs/mongoose@10.0.10 mongoose@8.5.1

Tạo các model

nest g resource users --no-spec

nest g resource reviews --no-spec

nest g resource restaurants --no-spec

nest g resource orders --no-spec

nest g resource order.detail --no-spec

nest g resource menus --no-spec

nest g resource menu.items --no-spec

nest g resource menus.item.options --no-spec

nest g resource likes --no-spec

--no-spec: là không tạo test file

yarn add class-validator@0.14.1 class-transformer@0.5.1 --exact (dùng để validate)

yarn add --exact bcrypt@5.1.1

yarn add @types/bcrypt --dev

yarn add --exact api-query-params@5.4.0

yarn add --exact @nestjs/jwt@10.2.0

yarn add --exact @nestjs/passport@10.0.3 passport@0.7.0 passport-local@1.0.0

yarn add --dev @types/passport-local

yarn add --exact @nestjs/jwt@10.2.0 passport-jwt@4.0.1

yarn add --dev @types/passport-jwt

passport (Middleware)

có nghĩa là cần xác định người này là ai mới cho vào - sau đó kèm với quyền

Đăng nhập: thì dùng passport local

gửi token: thì dùng passport jwt

yarn add --exact dayjs@1.11.12 uuid@10.0.0

yarn add --dev @types/uuid
