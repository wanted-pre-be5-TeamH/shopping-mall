
## API 명세

INDEX	METHOD	URI	DESCRIPTION	REMARK
1	GET	/api/orders	제품 주문 내역 열람 (전체)	
2	GET	/api/orders/:userId	제품 주문 내역 열람 (사용자)	
3	GET	/api/orders/:userId/:name	주문 내역 검색	
4	GET	/api/orders/:userId/:status	주문상태, 시작일자, 종료일자에 따른 필터	
5	GET	/api/orders/:userId/:createdAt	주문상태, 시작일자, 종료일자에 따른 필터	
6	GET	/api/orders/:userId/:finishedAt	주문상태, 시작일자, 종료일자에 따른 필터	
7	GET	/api/orders/:userName	주문자명으로 검색	
8	PATCH	/api/orders/:status	"제품 배송 상태 업데이트, 주문 건에 대하여 발송 처리, 
배송중/배송완료 등 수정"	
9	POST	/api/orders	구매하기 (쿠폰 사용에 따른 할인, 배송비 적용)	
10	GET	/api/coupons	쿠폰 관리 - 조회	
11	GET	/api/coupons/:id	쿠폰 관리 - 사용자별 쿠폰 조회	
12	PATCH	/api/coupons/:id	쿠폰 관리 - 쿠폰 내용 변경	
13	DELETE	/api/coupons/:id	쿠폰 관리 - 쿠폰 삭제	
14	POST	/api/coupons/:userId	특정 신규 쿠폰 코드 발급	
15	GET	/api/coupons/:type	쿠폰 타입별 사용 횟수 및 총 할인액 조회	


