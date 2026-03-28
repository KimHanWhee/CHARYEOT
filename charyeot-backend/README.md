# charyeot-backend

차렷 서비스의 Spring Boot REST API 서버입니다.

---

## 기술 스택

- Java 17
- Spring Boot 4.0.3
- Spring WebMVC + WebFlux
- Lombok
- Google Gemini SDK 1.0.0

---

## 프로젝트 구조

```
src/main/java/bot/charyeot/
├── config/                    # CORS 등 공통 설정
├── eternalReturn/             # 이터널리턴 전적 조회
│   ├── controller/
│   ├── entity/
│   ├── module/                # 외부 API 데이터 fetcher
│   └── service/
├── leagueOfLegends/           # 리그오브레전드 전적 조회
│   ├── controller/
│   ├── entity/
│   ├── module/
│   └── service/
├── gemini/                    # AI 판결 (Google Gemini)
│   ├── controller/
│   ├── config/
│   ├── entity/
│   ├── module/
│   └── service/
└── utils/
```

---

## 환경 설정

`src/main/resources/application.yml` 파일을 생성하고 아래 내용을 작성합니다.

```yaml
server:
  port: 7890

spring:
  application-name: charyeot

external:
  riot:
    url: "https://%s.api.riotgames.com"
    api-key: "YOUR_RIOT_API_KEY"
  nimble:
    url: "https://open-api.bser.io"
    api-key: "YOUR_NIMBLE_API_KEY"

gemini:
  api-key: YOUR_GEMINI_API_KEY
```

| 키 | 발급처 |
|----|--------|
| Riot API Key | https://developer.riotgames.com |
| Nimble API Key | https://developer.bser.io |
| Gemini API Key | https://aistudio.google.com/app/apikey |

> `application.yml`은 `.gitignore`에 포함되어 있으므로 직접 생성해야 합니다.

---

## 실행 방법

```bash
# 프로젝트 루트(charyeot-backend/)에서 실행
./gradlew bootRun
```

서버가 `http://localhost:7890`에서 실행됩니다.

---

## API 엔드포인트

### 리그오브레전드

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/v1/lol/summoner/profile/{summonerName}/{summonerTag}` | 소환사 프로필 조회 |
| GET | `/v1/lol/summoner/match/{puuid}` | 최근 경기 목록 조회 |
| POST | `/v1/charyeot/lol/{matchId}` | 경기 AI 판결 |

### 이터널리턴

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/v1/er/search/{userName}` | 유저 정보 및 전적 조회 |
| GET | `/v1/er/battle/detail/{gameId}` | 경기 상세 결과 조회 |
| POST | `/v1/charyeot/er` | 경기 AI 판결 |
