package bot.charyeot.eternalReturn.controller;

import bot.charyeot.eternalReturn.entity.BattleUserResult;
import bot.charyeot.eternalReturn.entity.response.BattleUserResponse;
import bot.charyeot.eternalReturn.entity.response.UserSearchData;
import bot.charyeot.eternalReturn.service.EternalReturnService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1/er/")
@RequiredArgsConstructor
public class EternalReturnController {
    private final EternalReturnService eternalReturnService;

    @GetMapping("/search/{userName}")
    private ResponseEntity<UserSearchData> getSearchData(@PathVariable("userName") String nickname) {
        try {
            return ResponseEntity.ok(eternalReturnService.getUserSearchData(nickname));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/battle/detail/{gameId}")
    private ResponseEntity<List<BattleUserResponse>> getBattleDetail(@PathVariable("gameId") Integer gameId) {
        try {
            return ResponseEntity.ok(eternalReturnService.getBattleUserResultDetail(gameId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
