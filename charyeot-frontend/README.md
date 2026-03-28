# charyeot-frontend

차렷 서비스의 React + TypeScript 웹 클라이언트입니다.

---

## 기술 스택

- React 19
- TypeScript 5.8
- Vite 6
- TailwindCSS 4
- React Router DOM 7
- Motion (Framer Motion)
- Axios

---

## 프로젝트 구조

```
src/
├── api/                  # API 호출 함수
│   ├── er/               # 이터널리턴 API
│   └── lol/              # 리그오브레전드 API
├── components/           # 공통 및 게임별 컴포넌트
│   ├── er/
│   └── lol/
├── pages/                # 라우팅 페이지
│   ├── HomePage.tsx
│   ├── SearchResultsPage.tsx
│   ├── er/               # 이터널리턴 페이지
│   └── lol/              # 리그오브레전드 페이지
├── types/                # TypeScript 타입 정의
├── contexts/             # React Context
└── lib/                  # 유틸리티
```

---

## 환경 설정

백엔드 서버 주소를 환경 변수로 설정합니다.

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
VITE_API_BASE_URL=http://localhost:7890
```

---

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 사전 조건

백엔드 서버(`charyeot-backend`)가 먼저 실행되어 있어야 합니다.
백엔드 실행 방법은 [백엔드 README](../charyeot-backend/README.md)를 참고하세요.
