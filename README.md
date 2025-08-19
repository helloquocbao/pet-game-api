<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Pet Game Backend

Backend server for a virtual pet game, built with NestJS, Prisma, and PostgreSQL.

## Features
- Gacha: Rút trứng, nở trứng thành pet
- Pet: Quản lý pet, cho ăn, tiến hóa, tính exp từng level
- Item: Quản lý vật phẩm, cộng exp cho pet
- User: Quản lý người dùng
- Exception & Logging: Xử lý lỗi, ghi log
- Sử dụng Prisma ORM, PostgreSQL, RESTful API
- Hỗ trợ import Postman collection để test API
- Hỗ trợ alias import với @, @common, @game

## Quick Start

```bash
# Cài đặt dependencies
npm install

# Chạy server ở chế độ dev
npm run start:dev

# Chạy server ở chế độ production
npm run start:prod
```

## API Endpoints

- `GET /game/eggs?userId=1` - Lấy danh sách trứng của user
- `POST /game/gacha` - Rút trứng (body: userId, type)
- `POST /game/eggs/:id/hatch` - Nở trứng thành pet
- `GET /game/pets/:id` - Lấy thông tin pet
- `GET /game/pets?userId=1` - Lấy danh sách pet của user
- `POST /game/pets/feed` - Cho pet ăn (body: petId, userId, itemId, quantity)
- `POST /game/pets/evolve` - Tiến hóa pet (body: petId)
- `GET /game/items` - Lấy danh sách item
- `GET /game/user-items?userId=1` - Lấy item của user

## Postman Collection

File `pet-game-backend.postman_collection.json` đã được tạo sẵn để test các API. Import vào Postman và chọn môi trường phù hợp (`baseUrl`).

## Database
- Sử dụng PostgreSQL (có thể dùng Railway, Supabase, ...)
- Cấu hình kết nối trong file `.env` với biến `DATABASE_URL`
- Khi thay đổi model, dùng Prisma migrate để cập nhật schema

## Development
- Lint & format: `npm run lint:fix` và `npm run format`
- Test: `npm run test`, `npm run test:e2e`
- Cấu hình Husky, lint-staged để kiểm tra code trước khi commit
- Hỗ trợ alias import với cấu hình trong `tsconfig.json`

## License
MIT
