import json

INPUT_FILE = "eternal_return_urls.properties"
OUTPUT_FILE = "eternal_return_urls.json"


def convert():
    result = []

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            key, url = line.split("=", 1)
            result.append({"key": key, "url": url})

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"✅ 변환 완료: {len(result)}개 → {OUTPUT_FILE}")


if __name__ == "__main__":
    convert()
