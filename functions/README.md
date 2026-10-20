# 펫티시에 텔레그램 알림 설정 순서

새 주문·클래스 예약금 결제가 들어오면 사장님 텔레그램으로 바로 알림이 가요.
아직 봇이 없어서 틀만 만들어 둔 상태예요. 아래 순서대로 하면 작동해요.

## 1. 텔레그램 봇 만들기
1. 텔레그램에서 `@BotFather` 를 찾아 대화 시작 → `/newbot`
2. 봇 이름(예: 펫티시에 알림)과 아이디(예: `pettissier_bot`)를 정하면 **봇 토큰**이 나와요. (`123456:ABC-DEF...` 모양)
3. 사장님 텔레그램에서 방금 만든 봇을 찾아 `/start` 를 한 번 눌러요.
4. 브라우저에서 `https://api.telegram.org/bot<봇토큰>/getUpdates` 를 열면 `"chat":{"id":123456789 ...` 가 보여요. 이 숫자가 **채팅 ID** 예요.

## 2. 관리자 페이지에 넣기
관리자 페이지 → 쇼핑 설정 → 텔레그램 알림 에 봇 토큰과 채팅 ID 를 넣고 저장해요.

## 3. 알림 서버 배포 (한 번만)
컴퓨터에서 (Node.js 20 이상 설치돼 있어야 해요)
```
npm install -g firebase-tools
firebase login
cd 펫티시에 폴더
cd functions && npm install && cd ..
firebase deploy --only functions
```
배포가 끝나면 그때부터 알림이 와요. 보내지는 내용은 `functions/index.js` 에서 바꿀 수 있어요.
