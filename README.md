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
| 1 | GET | /api/order | 제품 주문 내역 열람 (전체) | O |
| 2 | GET | /api/order/:userId | 제품 주문 내역 열람 (사용자) | O |
| 3 | GET | /api/order/:userId/:name | 주문 내역 검색 | O |
| 4 | GET | /api/order/:userId/:status/:createdAt/:finishedAt | 주문상태, 시작일자, 종료일자에 따른 필터 | O |
| 5 | GET | /api/order/:userName | 주문자명으로 검색 | O |
| 6 | PATCH | /api/order/:status | 제품 배송 상태 업데이트, 주문 건에 대하여 발송 처리,  배송중/배송완료 등 수정 | O |
| 7 | POST | /api/order/:userId/:couponId | 구매하기 (쿠폰 사용에 따른 할인, 배송비 적용) | O |
| 8 | GET | /api/coupon | 쿠폰 관리 - 조회 | O |
| 9 | GET | /api/coupon/:id | 쿠폰 관리 - 사용자별 쿠폰 조회 | O |
| 10 | PUT | /api/coupon/:id | 쿠폰 관리 - 쿠폰 내용 변경 | O |
| 11 | DELETE | /api/coupon/:id | 쿠폰 관리 - 쿠폰 삭제 | O |
| 12 | POST | /api/coupon/:userId | 특정 신규 쿠폰 코드 발급 | O |
| 13 | GET | /api/coupon/:type | 쿠폰 타입별 사용 횟수 및 총 할인액 조회 | O |

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
| deliveryCost | number |  |

| DeliveryCost |  |  |
| --- | --- | --- |
| Column | Type | Description |
| id | number |  |
| countryName | string |  |
| quantity | number |  |
| cost | number |  |

| User |  |  |
| --- | --- | --- |
| Column | Type | Description |
| id | number |  |
| email | string |  |
| hash | string |  |
| name | string |  |

## 미비 사항 및 추후 적용 예정 사항
- URI path에 /api 공통으로 넣기
- 서비스 Exception, Response 처리
- 외래 키가 Nullable일 때, 외래키의 객체 처리 방법? (Order의 couponId와 coupon)
- Unit Test 구현 (Pactumjs) 및 예외 사항 보완
- 쿠폰을 사용하여 주문 처리 시, 쿠폰 상태도 함께 변경(isUsed true) → 테스트 필요
- @Param()으로 받는 파라미터가 Nullable인 경우 처리 방법 확인
- Param은 path 명시인 경우 처리(예:id나 자원 이름인경우?)하도록 하고, 조회 조건이 되는 데이터는 Param이 아닌 Query로 넘기도록 수정 (필터 조회 서비스 부분)
