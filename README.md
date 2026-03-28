<h1 align="center">CHARYEOT(차렷).</h1>

<p align="center">
  게임 전적 조회 및 AI 판결 서비스
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Spring Boot-4.0.3-6DB33F?style=flat-square&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Java-17-007396?style=flat-square&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini AI-Google-4285F4?style=flat-square&logo=google&logoColor=white" />
</p>

---

## 소개

**차렷**은 게임 전적을 조회하고, AI가 해당 판을 판결해주는 웹 서비스입니다.

- **리그오브레전드**: 소환사 프로필 및 최근 경기 결과 조회, AI 판결
- **이터널리턴**: 유저 정보 및 전투 기록 조회, AI 판결

> 판결 기능은 Google Gemini API를 활용하여 경기 데이터를 분석하고 결과를 제공합니다.


---

## 아키텍처

```
charyeot/
├── charyeot-backend/     # Spring Boot REST API 서버
├── charyeot-frontend/    # React + TypeScript 웹 클라이언트
└── er-image-fetcher/     # 이터널리턴 이미지 URL 수집 Python 스크립트
```

```
[Frontend: React]  ←→  [Backend: Spring Boot]  ←→  [Riot API]
                                               ←→  [Nimble API (이터널리턴)]
                                               ←→  [Gemini AI API]
```

---

## 빠른 시작

### 필요 환경

- Java 17+
- Node.js 18+
- Riot API Key
- Nimble (이터널리턴) API Key
- Google Gemini API Key

### 1. 백엔드 실행

```bash
cd charyeot-backend
# src/main/resources/application.yml에 API 키 설정 후
./gradlew bootRun
# 서버: http://localhost:7890
```

### 2. 프론트엔드 실행

```bash
cd charyeot-frontend
npm install
npm run dev
# 클라이언트: http://localhost:5173
```

자세한 설정 방법은 각 디렉토리의 README를 참고하세요.

- [백엔드 README](./charyeot-backend/README.md)
- [프론트엔드 README](./charyeot-frontend/README.md)

---

## 기술 스택

### Backend
| 기술 | 버전 | 용도 |
|------|------|------|
| Spring Boot | 4.0.3 | REST API 서버 |
| Spring WebFlux | - | 비동기 외부 API 통신 |
| Java | 17 | 메인 언어 |
| Lombok | - | 보일러플레이트 제거 |
| Google Gemini SDK | 1.0.0 | AI 판결 |

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| React | 19 | UI 프레임워크 |
| TypeScript | 5.8 | 타입 안전성 |
| Vite | 6 | 빌드 툴 |
| TailwindCSS | 4 | 스타일링 |
| React Router | 7 | 클라이언트 라우팅 |
| Motion | 12 | 애니메이션 |
| Axios | 1.x | HTTP 클라이언트 |
