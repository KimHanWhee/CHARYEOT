//package bot.charyeot.eternalReturn.module;
//
//import com.google.api.client.http.javanet.NetHttpTransport;
//import com.google.api.client.json.gson.GsonFactory;
//import com.google.api.services.drive.Drive;
//import com.google.api.services.drive.model.File;
//import com.google.api.services.drive.model.FileList;
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import java.io.FileWriter;
//import java.io.IOException;
//import java.util.Collections;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class EternalReturnImageFetcher {
//    @Value("${google.drive.api-key}")
//    private String apiKey;
//
//    // 사용자께서 확인해주신 정확한 폴더 ID들
//    private static final String CHARACTER_FOLDER_ID = "1m__ubKg-KY7TqnqbFqwHi1DVxrdBeTEW";
//    private static final String ITEM_FOLDER_ID = "10rqsRCIYjD0Xja9Thy6hOPP7Nanrkej5";
//
//    private int totalFileCount = 0; // 진행 상황을 체크하기 위한 카운터
//
//    @PostConstruct
//    public void generateAllPngUrlMap() {
//        Map<String, String> allPngImages = new HashMap<>();
//        this.totalFileCount = 0; // 초기화
//
//        try {
//            Drive driveService = new Drive.Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance(), null)
//                    .setApplicationName("EternalReturnCharyeot").build();
//
//            System.out.println("\n========================================");
//            System.out.println("🚀 이미지 URL 추출 프로세스 시작");
//            System.out.println("========================================\n");
//
//            // 1. 캐릭터 폴더 탐색
//            scanFoldersRecursively(driveService, CHARACTER_FOLDER_ID, allPngImages, "캐릭터");
//
//            // 2. 아이템 폴더 탐색
//            scanFoldersRecursively(driveService, ITEM_FOLDER_ID, allPngImages, "아이템");
//
//            // 3. 파일 저장
//            saveToTxtFile(allPngImages, "eternal_return_urls.txt");
//
//            System.out.println("\n✅ 모든 작업이 완료되었습니다!");
//            System.out.println("총 수집된 이미지 개수: " + allPngImages.size() + "개");
//            System.out.println("결과 파일: eternal_return_urls.txt");
//
//        } catch (Exception e) {
//            System.err.println("\n❌ 오류 발생: " + e.getMessage());
//            log.error("Drive API 호출 중 에러 발생", e);
//        }
//    }
//
//    private void scanFoldersRecursively(Drive driveService, String folderId, Map<String, String> imageMap, String category) throws IOException {
//        System.out.println("📂 현재 탐색 중인 [" + category + "] 폴더 ID: " + folderId);
//
//        String pageToken = null;
//        do {
//            String query = String.format("'%s' in parents and trashed = false", folderId);
//
//            FileList result = driveService.files().list()
//                    .setQ(query)
//                    .setPageToken(pageToken)
//                    .setFields("nextPageToken, files(id, name, mimeType)")
//                    .setKey(apiKey)
//                    .execute();
//
//            List<File> files = result.getFiles();
//            if (files == null || files.isEmpty()) return;
//
//            for (File file : files) {
//                if ("application/vnd.google-apps.folder".equals(file.getMimeType())) {
//                    // 폴더면 더 깊이 탐색
//                    scanFoldersRecursively(driveService, file.getId(), imageMap, category);
//                } else if (file.getName().toLowerCase().endsWith(".png")) {
//                    // PNG 파일 처리 (확장자 제거)
//                    String originalName = file.getName();
//                    String fileNameWithoutExtension = originalName.substring(0, originalName.lastIndexOf("."));
//                    String directUrl = "https://drive.google.com/uc?export=view&id=" + file.getId();
//
//                    imageMap.put(fileNameWithoutExtension, directUrl);
//
//                    // 진행 상황 로그 출력
//                    totalFileCount++;
//                    System.out.println(String.format("[%d] 발견: %s (ID: %s)", totalFileCount, fileNameWithoutExtension, file.getId()));
//                }
//            }
//            pageToken = result.getNextPageToken();
//        } while (pageToken != null);
//    }
//
//    private void saveToTxtFile(Map<String, String> map, String outputFileName) throws IOException {
//        System.out.println("\n💾 파일 저장 중...");
//        try (FileWriter writer = new FileWriter(outputFileName)) {
//            for (Map.Entry<String, String> entry : map.entrySet()) {
//                writer.write(entry.getKey() + ":" + entry.getValue() + "\n");
//            }
//        }
//    }
//}
