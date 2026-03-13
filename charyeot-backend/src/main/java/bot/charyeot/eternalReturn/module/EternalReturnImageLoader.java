//package bot.charyeot.eternalReturn.module;
//
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.annotation.PostConstruct;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@Slf4j
//@Component
//public class EternalReturnImageLoader {
//    private Map<String, String> imageMap = new HashMap<>();
//
//    @PostConstruct
//    public void init() {
//        ObjectMapper objectMapper = new ObjectMapper();
//        try (java.io.InputStream is = new ClassPathResource("file/eternal_return_urls.json").getInputStream()) {
//
//            // InputStream을 변수로 따로 선언해서 넘겨주면 메서드 매칭 에러가 사라집니다.
//            List<Map<String, String>> rawData = objectMapper.readValue(
//                    is,
//                    new TypeReference<List<Map<String, String>>>() {}
//            );
//
//            if (rawData != null) {
//                imageMap = rawData.stream()
//                        .filter(data -> data.get("key") != null && data.get("url") != null) // Null 방어 로직 추가
//                        .collect(Collectors.toMap(
//                                data -> data.get("key").replaceAll("^\\d{2}\\.\\s*", ""), // "00. " 패턴을 정규식으로 안전하게 제거
//                                data -> data.get("url"),
//                                (existing, replacement) -> existing
//                        ));
//                log.info("이미지 맵 : {}", imageMap);
//                log.info("✅ Eternal Return 이미지 URL 로드 완료: {}건", imageMap.size());
//            }
//        } catch (IOException e) {
//            log.error("❌ 이미지 URL 파일을 읽는 중 오류 발생: {}", e.getMessage());
//            // 초기화 실패 시 빈 맵으로 유지하여 NullPointerException 방지
//            this.imageMap = new java.util.HashMap<>();
//        }
//    }
//    // 외부에서 캐릭터 이름으로 URL을 찾는 메서드
//    public String getImageUrl(String characterName) {
//        return imageMap.getOrDefault(characterName, "기본_이미지_URL");
//    }
//}
