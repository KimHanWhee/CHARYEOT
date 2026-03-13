import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeAgo = (gameEndTimestamp: number): string => {
  if (!gameEndTimestamp) return "정보 없음";

  const now = Date.now();
  const diffInMs = now - gameEndTimestamp;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  // 1. 60분 미만 (59초 이하 포함)
  if (diffInMinutes < 60) {
    return `${Math.max(1, diffInMinutes)}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  // 2. 24시간 미만 (60분 ~ 1439분)
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // 3. 하루 이상 (1440분 이상)
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}일 전`;
};
