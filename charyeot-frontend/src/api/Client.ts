import axios from 'axios';

/** .env 파일에 VITE_API_BASE_URL을 설정하세요 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── 요청 인터셉터 ───────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // 필요 시 인증 토큰 등을 여기서 주입
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ── 응답 인터셉터 ───────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 공통 에러 처리 (로깅, 토스트 등)
    console.error('[API Error]', error.response?.status, error.response?.data);
    return Promise.reject(error);
  },
);
