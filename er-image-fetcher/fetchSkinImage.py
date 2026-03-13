from googleapiclient.discovery import build

# ============================================================
# 설정
# ============================================================
ROOT_FOLDER_ID = "1m__ubKg-KY7TqnqbFqwHi1DVxrdBeTEW"
OUTPUT_FILE    = "skinUrl.properties"
GOOGLE_API_KEY = "AIzaSyCIf9ltjJrPaIc_1RkH34CoMzAnH-B-Rhg"

SKIP_FOLDERS = {
    "01. Concept Art",
    "01. Concept art",
    "02. Default",
    "03. Skill Icon",
    "03. Skill icon",
    "04. Skill",
    "05. Voice Line",
    "086. Coraline",
    "998. Dr. Hana",
    "9995. Cadet (Ranked Reward)",
    "9996. Wild Animal",
    "9997. Alpha & Omega",
    "9998. Dr. Nadja - 나쟈",
    "9999. Dr. Wickeline - 위클라인 박사"
}

DRIVE_VIEW_URL = "https://drive.google.com/uc?export=view&id={}"

# ============================================================
# Drive API 클라이언트 초기화
# ============================================================
def build_service():
    return build("drive", "v3", developerKey=GOOGLE_API_KEY)


def list_folder(service, folder_id):
    """폴더 내 모든 항목 조회 (페이지네이션 처리)"""
    items = []
    page_token = None
    while True:
        response = service.files().list(
            q=f"'{folder_id}' in parents and trashed=false",
            fields="nextPageToken, files(id, name, mimeType)",
            pageToken=page_token,
        ).execute()
        items.extend(response.get("files", []))
        page_token = response.get("nextPageToken")
        if not page_token:
            break
    return items


def collect_pngs(service, folder_id, results):
    """
    폴더를 재귀 순회하며 PNG 파일 수집.
    SKIP_FOLDERS에 해당하는 폴더는 건너뜀.
    """
    items = list_folder(service, folder_id)
    for item in items:
        mime = item["mimeType"]
        name = item["name"]

        if mime == "application/vnd.google-apps.folder":
            if any(skip in name for skip in SKIP_FOLDERS):
                print(f"  ⏭️  건너뜀: {name}")
                continue
            collect_pngs(service, item["id"], results)

        elif mime == "image/png" or name.lower().endswith(".png"):
            key = name[:-4] if name.lower().endswith(".png") else name
            url = DRIVE_VIEW_URL.format(item["id"])
            results.append(f"{key}={url}")
            print(f"  [{len(results)}] {name}")


def main():
    print("========================================")
    print("🚀 스킨 이미지 URL 수집 시작")
    print("========================================\n")

    service = build_service()
    results = []

    collect_pngs(service, ROOT_FOLDER_ID, results)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(results))

    print(f"\n✅ 완료: {len(results)}개 항목 → {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
