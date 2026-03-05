package bot.charyeot.gemini.controller;

import bot.charyeot.gemini.entity.GameType;
import bot.charyeot.gemini.service.GeminiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class GeminiController {
    private final GeminiService geminiService;

    @PostMapping("/v1/gemini")
    private ResponseEntity<String> getJudgement(@RequestBody Map<String, String> request) {
        try {
            log.info("요청 시작 : {}", request.get("body"));
            return ResponseEntity.ok(geminiService.getJudgment(GameType.LEAGUE_OF_LEGENDS, request.get("body")));
        } catch (Exception e) {
            log.error("에러 발생 ", e);
            return ResponseEntity.internalServerError().build();
        }

    }

}
