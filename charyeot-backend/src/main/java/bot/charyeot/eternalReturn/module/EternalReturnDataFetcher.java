package bot.charyeot.eternalReturn.module;

import bot.charyeot.eternalReturn.config.NimbleWebClientConfig;
import bot.charyeot.eternalReturn.entity.enums.TacticalSkillCode;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Component
@RequiredArgsConstructor
public class EternalReturnDataFetcher {
    private final NimbleWebClientConfig nimbleWebClientConfig;
    // 캐릭터
    private final Map<Integer, String> krCharacterMap = new HashMap<>();
    private final Map<Integer, String> enCharacterMap = new HashMap<>();
    // 아이템
    private final Map<Integer, String> krItemMap = new HashMap<>();
    private final Map<Integer, String> enItemMap = new HashMap<>();
    // 전술스킬
    private final Map<Integer, String> krTacticalSkillMap = new HashMap<>();
    private final Map<Integer, String> enTacticalSkillMap = new HashMap<>();
    // 특성
    private final Map<Integer, String> krTraitMap = new HashMap<>();
    private final Map<Integer, String> enTraitMap = new HashMap<>();
    private final RestTemplate restTemplate = new RestTemplate();

    @PostConstruct
    public void init() {
        String korRawData = fetchData("Korean");
        if (korRawData != null && !korRawData.isEmpty()) {
            parseCharacterData(korRawData, "Korean");
        }
        log.info(krCharacterMap.toString());

        String engRawData = fetchData("English");
        if (engRawData != null && !engRawData.isEmpty()) {
            parseCharacterData(engRawData, "English");
            parseItemData(engRawData, "English");
            parseTacticalSkillData(engRawData, "English");
            parseTraitData(engRawData, "English");
        }
        log.info(enCharacterMap.toString());
        log.info(enItemMap.toString());
        log.info(enTacticalSkillMap.toString());
        log.info(enTraitMap.toString());
    }

    public String fetchData(String language) {
        try {
            log.info("1단계: 이터널 리턴 l10n 파일 경로(URL) 요청 중...");

            // [중요] 한글 깨짐 방지: RestTemplate에 UTF-8 컨버터 강제 설정
            restTemplate.getMessageConverters()
                    .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

            // 1. API 서버 전용 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-API-KEY", nimbleWebClientConfig.getApiKey());
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // 2. l10Path 요청
            String apiUrl = nimbleWebClientConfig.getUrl() + "/v1/l10n/" + language;
            ResponseEntity<String> apiResponse = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            // 3. JSON 파싱 (안전한 추출)
            JsonObject root = JsonParser.parseString(apiResponse.getBody()).getAsJsonObject();

            // "data" 객체 안에 "l10Path"가 있는지 확인
            if (!root.has("data") || root.getAsJsonObject("data").get("l10Path").isJsonNull()) {
                log.error("API 응답에 l10Path가 없습니다: {}", apiResponse.getBody());
                return null;
            }

            String txtFileUrl = root.getAsJsonObject("data").get("l10Path").getAsString();
            log.info("2단계: 텍스트 파일 다운로드 시작 (URL: {})", txtFileUrl);

            // 4. TXT 파일 요청 (헤더 없이, UTF-8로 가져오기)
            return restTemplate.getForObject(txtFileUrl, String.class);

        } catch (Exception e) {
            log.error("이터널 리턴 데이터 통합 로드 중 오류 발생: ", e);
            return null;
        }
    }

    private void parseCharacterData(String data, String language) {
        Pattern pattern;
        // 정규표현식: Character/Name/숫자 형태 뒤의 한글(또는 문자열) 추출
        if (language.equals("English")) {
            pattern = Pattern.compile("Character/Name/(\\d+)[^a-zA-Z]*([a-zA-Z\\s&'-]+?)(?=\\s*Character/|\\s*GameResult|\\r|\\n|$)");
        } else {
            pattern = Pattern.compile("Character/Name/(\\d+)[^가-힣]*([가-힣]+)");
        }
        Matcher matcher = pattern.matcher(data);

        while (matcher.find()) {
            String id = matcher.group(1);     // 숫자 ID
            String name = matcher.group(2); // 캐릭터 이름
            if(language.equals("English")) {
                enCharacterMap.put(Integer.parseInt(id), name);
            } else {
                krCharacterMap.put(Integer.parseInt(id), name);
            }
        }

        if (language.equals("English")) {
            log.info("성공적으로 {}개의 캐릭터 정보를 맵에 저장했습니다.", enCharacterMap.size());
        } else {
             log.info("성공적으로 {}개의 캐릭터 정보를 맵에 저장했습니다.", krCharacterMap.size());
        }
    }

    private void parseItemData(String data, String language) {
        Pattern pattern;
        // 정규표현식: Item/Name/숫자 형태 뒤의 한글(또는 문자열) 추출
        if (language.equals("English")) {
            pattern = Pattern.compile("Item/Name/(\\d+)[^\\p{L}\\p{N}]*?([\\p{L}\\p{N}\\s&'\\-]+?)(?=\\s*(?:Character/|GameResult|\\r|\\n|$))");
//            pattern = Pattern.compile("Item/Name/(\\d+)[^\\p{L}\\p{N}]*?([\\p{L}\\p{N}\\s&'\\-]+)");
        } else {
            pattern = Pattern.compile("Item/Name/(\\d+)[^가-힣]*([가-힣]+)");
        }
        Matcher matcher = pattern.matcher(data);

        while (matcher.find()) {
            String id = matcher.group(1);     // 숫자 ID
            String name = matcher.group(2); // 아이템 이름
            if(language.equals("English")) {
                enItemMap.put(Integer.parseInt(id), name);
            } else {
                krItemMap.put(Integer.parseInt(id), name);
            }
        }

        if (language.equals("English")) {
            log.info("성공적으로 {}개의 아이템 정보를 맵에 저장했습니다.", enItemMap.size());
        } else {
            log.info("성공적으로 {}개의 아이템 정보를 맵에 저장했습니다.", krItemMap.size());
        }
    }


    private void parseTacticalSkillData(String data, String language) {
        // 2. Enum 전체 순회 (values() 호출)
        for (TacticalSkillCode mapping : TacticalSkillCode.values()) {
            int slot = mapping.getKey();
            int code = mapping.getValue();
            Pattern pattern = Pattern.compile("Skill/Group/Name/" + code + "\\┃([^|\r\n]+)");
            Matcher matcher = pattern.matcher(data);

            if (matcher.find()) {
                String skillName = matcher.group(1).trim();
                if (language.equals("English")) {
                    enTacticalSkillMap.put(slot, skillName);
                } else {
                    krTacticalSkillMap.put(slot, skillName);
                }
            }
        }

        if (language.equals("English")) {
            log.info("성공적으로 {}개의 전술스킬 정보를 맵에 저장했습니다.", enTacticalSkillMap.size());
        } else {
            log.info("성공적으로 {}개의 전술스킬 정보를 맵에 저장했습니다.", krTacticalSkillMap.size());
        }
    }

    private void parseTraitData(String data, String language) {
        Pattern pattern;
        // 정규표현식: Character/Name/숫자 형태 뒤의 한글(또는 문자열) 추출
        if (language.equals("English")) {
            pattern = Pattern.compile("Trait/Name/(\\d+)[^a-zA-Z]*([a-zA-Z\\s&'-]+?)(?=\\s*Character/|\\s*GameResult|\\r|\\n|$)");
        } else {
            pattern = Pattern.compile("Trait/Name/(\\d+)[^가-힣]*([가-힣]+)");
        }
        Matcher matcher = pattern.matcher(data);

        while (matcher.find()) {
            String id = matcher.group(1);     // 숫자 ID
            String name = matcher.group(2); // 캐릭터 이름
            if(language.equals("English")) {
                enTraitMap.put(Integer.parseInt(id), name);
            } else {
                krTraitMap.put(Integer.parseInt(id), name);
            }
        }

        if (language.equals("English")) {
            log.info("성공적으로 {}개의 특성 정보를 맵에 저장했습니다.", enTraitMap.size());
        } else {
            log.info("성공적으로 {}개의 특성 정보를 맵에 저장했습니다.", krTraitMap.size());
        }
    }


    public String getKorCharacterName(int id) {
        return krCharacterMap.getOrDefault(id, "Unknown Character");
    }

    public String getEngCharacterName(int id) {
        return enCharacterMap.getOrDefault(id, "Unknown Character");
    }

    public String getEngItemName(Integer itemId) {
        return enItemMap.getOrDefault(itemId, "Unknown Item");
    }

    public String getEngTacticalSkillName(Integer code) {
        return enTacticalSkillMap.getOrDefault(code, "Unknown Skill");
    }

    public String getEngTraitName(Integer code) {
        return enTraitMap.getOrDefault(code, "Unknown Trait");
    }
}
