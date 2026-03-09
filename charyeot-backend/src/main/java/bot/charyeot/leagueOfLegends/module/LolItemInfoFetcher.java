package bot.charyeot.leagueOfLegends.module;

import bot.charyeot.leagueOfLegends.entity.ItemInfo;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class LolItemInfoFetcher {
    private final Map<String, ItemInfo> itemMap = new HashMap<>();
    private final RestTemplate restTemplate = new RestTemplate();

    private static final String VERSION_URL = "https://ddragon.leagueoflegends.com/realms/kr.json";
    private static final String ITEM_DATA_BASE_URL = "https://ddragon.leagueoflegends.com/cdn/%s/data/ko_KR/item.json";


    @PostConstruct
    public void init() {
        try {
            log.info("라이엇 데이터 드래곤 최신 버전 확인 중...");

            // 1. 최신 버전 정보 가져오기 (String으로 받아서 Gson으로 파싱)
            String versionResponse = restTemplate.getForObject(VERSION_URL, String.class);
            JsonObject versionJson = JsonParser.parseString(versionResponse).getAsJsonObject();
            String latestVersion = versionJson.get("v").getAsString();
            log.info("최신 버전 감지: {}", latestVersion);

            // 2. 해당 버전의 아이템 데이터 호출
            String finalUrl = String.format(ITEM_DATA_BASE_URL, latestVersion);
            String itemResponse = restTemplate.getForObject(finalUrl, String.class);

            // 3. 아이템 데이터 파싱
            JsonObject itemRoot = JsonParser.parseString(itemResponse).getAsJsonObject();
            JsonObject dataNode = itemRoot.getAsJsonObject("data");

            for (String id : dataNode.keySet()) {
                JsonObject info = dataNode.getAsJsonObject(id);

                ItemInfo item = new ItemInfo();
                item.setName(info.get("name").getAsString());
                item.setDescription(stripHtml(info.get("description").getAsString()));

                // plaintext는 간혹 없을 수도 있어서 예외처리
                item.setPlainText(info.has("plaintext") ? info.get("plaintext").getAsString() : "");

                itemMap.put(id, item);
            }

            log.info("성공적으로 {} 버전의 아이템 정보를 {}개 로드했습니다.", latestVersion, itemMap.size());

        } catch (Exception e) {
            log.error("아이템 데이터 동적 로딩 중 오류 발생: ", e);
        }
    }

    private String stripHtml(String html) {
        if (html == null) return "";
        return html.replaceAll("<[^>]*>", " ").replaceAll("\\s+", " ").trim();
    }

    public String getItemName(Integer id) {
        // 아이템 ID가 0이거나 데이터에 없는 경우 처리
        ItemInfo info = itemMap.get(String.valueOf(id));
        return (info != null) ? info.getName() : "없음";
    }
}
