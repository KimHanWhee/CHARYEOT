import requests
import os

# ============================================================
# 설정
# ============================================================
API_KEY = 여기에_API_KEY_입력
CHARACTER_FOLDER_ID = 1m__ubKg-KY7TqnqbFqwHi1DVxrdBeTEW
ITEM_FOLDER_ID = 10rqsRCIYjD0Xja9Thy6hOPP7Nanrkej5
OUTPUT_FILE = eternal_return_urls.properties

BASE_URL = httpswww.googleapis.comdrivev3files

total_count = 0


def fetch_files_in_folder(folder_id str, category str, image_map dict)
    폴더 내 파일을 재귀적으로 탐색해서 PNG만 수집
    global total_count

    print(f📂 [{category}] 폴더 탐색 중 {folder_id})

    page_token = None
    while True
        params = {
            q f'{folder_id}' in parents and trashed = false,
            fields nextPageToken, files(id, name, mimeType),
            key API_KEY,
            pageSize 1000,
        }
        if page_token
            params[pageToken] = page_token

        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        data = response.json()

        files = data.get(files, [])
        if not files
            break

        for file in files
            mime = file[mimeType]
            name = file[name]
            file_id = file[id]

            if mime == applicationvnd.google-apps.folder
                # 하위 폴더 재귀 탐색
                fetch_files_in_folder(file_id, category, image_map)

            elif name.lower().endswith(.png)
                # 확장자 제거 후 URL 저장
                key = name.rsplit(., 1)[0]
                url = fhttpsdrive.google.comucexport=view&id={file_id}
                image_map[key] = url

                total_count += 1
                print(f  [{total_count}] {key})

        page_token = data.get(nextPageToken)
        if not page_token
            break


def save_to_properties(image_map dict, output_file str)
    key=value 형태로 파일 저장
    print(fn💾 파일 저장 중 {output_file})
    with open(output_file, w, encoding=utf-8) as f
        for key, url in sorted(image_map.items())
            f.write(f{key}={url}n)
    print(f✅ 저장 완료 {len(image_map)}개)


def main()
    print(========================================)
    print(🚀 이터널리턴 이미지 URL 수집 시작)
    print(========================================n)

    image_map = {}

    fetch_files_in_folder(CHARACTER_FOLDER_ID, 캐릭터, image_map)
    fetch_files_in_folder(ITEM_FOLDER_ID, 아이템, image_map)

    save_to_properties(image_map, OUTPUT_FILE)

    print(fn총 수집 이미지 {total_count}개)
    print(f결과 파일 {OUTPUT_FILE})


if __name__ == __main__
    main()
