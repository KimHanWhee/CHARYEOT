import requests
import os
import boto3
from dotenv import load_dotenv

load_dotenv()

# ============================================================
# 설정
# ============================================================
INPUT_FILE           = "eternal_return_urls.properties"

R2_ACCESS_KEY_ID     = os.getenv("R2_ACCESS_KEY_ID", "a0fce78f0c39b1c6ed8b6aa5b10203ad")
R2_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY", "133ee09853e6b80f847192ac65197ba412b4ce24dd91e00bceb1d1ba7fd7ba71")
R2_ACCOUNT_ID        = "d29a012adeba4af078bdab06e85f92c2"
R2_BUCKET_NAME       = "eternal-return-images"
R2_PUBLIC_URL        = "https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev"

# ============================================================
# R2 클라이언트 초기화
# ============================================================
s3 = boto3.client(
    "s3",
    endpoint_url=f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com",
    aws_access_key_id=R2_ACCESS_KEY_ID,
    aws_secret_access_key=R2_SECRET_ACCESS_KEY,
    region_name="auto",
)

total_count = 0
fail_count = 0


def upload_to_r2(key: str, drive_url: str):
    """구글 드라이브에서 이미지 다운로드 후 R2에 업로드"""
    try:
        img_response = requests.get(drive_url, timeout=30)
        img_response.raise_for_status()

        s3.put_object(
            Bucket=R2_BUCKET_NAME,
            Key=f"{key}.png",
            Body=img_response.content,
            ContentType="image/png",
        )

        return f"{R2_PUBLIC_URL}/{key}.png"

    except Exception as e:
        print(f"  ❌ 실패 [{key}]: {e}")
        return None


def main():
    global total_count, fail_count

    print("========================================")
    print("🚀 이터널리턴 이미지 R2 업로드 시작")
    print("========================================\n")

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f if line.strip()]

    print(f"📄 총 {len(lines)}개 항목 로드\n")

    for line in lines:
        key, drive_url = line.split("=", 1)
        r2_url = upload_to_r2(key, drive_url)
        if r2_url:
            total_count += 1
            print(f"  [{total_count}] ✅ {key}")
        else:
            fail_count += 1

    print(f"\n✅ 업로드 완료: {total_count}개")
    print(f"❌ 실패: {fail_count}개")


if __name__ == "__main__":
    main()
