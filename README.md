## 개발 Notion Link
https://mellow-deer-e21.notion.site/2-7689659410654c6189d8a6ca0f14d10d

## 1. 프로젝트 목적
- 제품 쇼핑몰 관리페이지의 백엔드 개발
- 기능 : 주문 관리 서비스, 쿠폰 관리 서비스

## 2. 백엔드 프로젝트 구성
1) 서버 : Nestjs
2) DB : PostgreSQL (Docker)
3) ORM : Prisma
4) Unit Test : Pactum

## 3. API 명세

| INDEX | METHOD | URI | DESCRIPTION | REMARK |
| --- | --- | --- | --- | --- |
| 1 | GET | /api/orders | 제품 주문 내역 열람 (전체) |  |
| 2 | GET | /api/orders/:userId | 제품 주문 내역 열람 (사용자) |  |
| 3 | GET | /api/orders/:userId/:name | 주문 내역 검색 |  |
| 4 | GET | /api/orders/:userId/:status | 주문상태, 시작일자, 종료일자에 따른 필터 |  |
| 5 | GET | /api/orders/:userId/:createdAt | 주문상태, 시작일자, 종료일자에 따른 필터 |  |
| 6 | GET | /api/orders/:userId/:finishedAt | 주문상태, 시작일자, 종료일자에 따른 필터 |  |
| 7 | GET | /api/orders/:userName | 주문자명으로 검색 |  |
| 8 | PATCH | /api/orders/:status | 제품 배송 상태 업데이트, 주문 건에 대하여 발송 처리,  배송중/배송완료 등 수정 |  |
| 9 | POST | /api/orders | 구매하기 (쿠폰 사용에 따른 할인, 배송비 적용) |  |
| 10 | GET | /api/coupons | 쿠폰 관리 - 조회 |  |
| 11 | GET | /api/coupons/:id | 쿠폰 관리 - 사용자별 쿠폰 조회 |  |
| 12 | PATCH | /api/coupons/:id | 쿠폰 관리 - 쿠폰 내용 변경 |  |
| 13 | DELETE | /api/coupons/:id | 쿠폰 관리 - 쿠폰 삭제 |  |
| 14 | POST | /api/coupons/:userId | 특정 신규 쿠폰 코드 발급 |  |
| 15 | GET | /api/coupons/:type | 쿠폰 타입별 사용 횟수 및 총 할인액 조회 |  |

## 4. ERD 설계

| Coupon |  |  |
| --- | --- | --- |
| Column | Type | Description |
| id | number | PK, FK(Order-couponId) |
| name | string |  |
| type | string | delivery, percentage, subscription |
| userId | number |  |
| isUsed | boolean |  |
| usedAt | DateTime |  |
| expireAt | DateTime |  |

| Order |  |  |
| --- | --- | --- |
| Column | Type | Description |
| id | number | PK, FK(OrderList-orderId) |
| userId | number | PK, FK(User-id) |
| userName | string |  |
| couponId? | number | FK(Coupon-id) |
| status | string | canceled, accept, preparing, delivering, arrived, refunded |
| countryCode | string |  |
| countryName | string |  |
| address | string |  |
| quantities | number |  |
| price | number | 원화 기준(한국) |
| deliveryPrice | number |  |

| DeliveryPrice |  |
| --- | --- |
| Column | Type |
| id | number |
| countryCode | string |
| quantity | number |
| price | number |
