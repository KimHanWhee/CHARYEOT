package bot.charyeot.gemini.controller;

import bot.charyeot.gemini.entity.GameType;
import bot.charyeot.gemini.entity.leagueOfLegends.LolCharyeotResponse;
import bot.charyeot.gemini.service.GeminiService;
import bot.charyeot.leagueOfLegends.entity.MatchDTO;
import bot.charyeot.leagueOfLegends.service.LolService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class GeminiController {
    private final GeminiService geminiService;
    private final LolService lolService;

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

    @PostMapping("/v1/charyeot/lol/{matchId}")
    private ResponseEntity<LolCharyeotResponse> getLolJudgement(@PathVariable("matchId") String matchId) {
        try {
            log.info("리그오브레전드 게임 아이디 : {} 판결 시작...", matchId);
            MatchDTO matchDTO = lolService.getMatchByMatchId(matchId);

            return ResponseEntity.ok(geminiService.getLolJudgement(matchDTO));
        } catch (Exception e) {
            log.error("리그오브레전드 판결 도중 에러 발생 : ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

}
