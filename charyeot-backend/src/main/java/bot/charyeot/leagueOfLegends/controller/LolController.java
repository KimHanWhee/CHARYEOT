package bot.charyeot.leagueOfLegends.controller;

import bot.charyeot.leagueOfLegends.entity.MatchListDTO;
import bot.charyeot.leagueOfLegends.entity.ProfileDTO;
import bot.charyeot.leagueOfLegends.service.LolService;
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
@RequestMapping("/v1/lol")
@RequiredArgsConstructor
public class LolController {

    private final LolService lolService;
//    @PostMapping("/summoner/{userName}")
//    private Void getSummonerRecord(@PathVariable String summonerName) {
//
//    }

    @GetMapping("/summoner/profile/{summonerName}/{summonerTag}")
    private ResponseEntity<ProfileDTO> getSummonerProfile(@PathVariable("summonerName") String summonerName,
                                              @PathVariable("summonerTag") String summonerTag) {
        try {
            return ResponseEntity.ok(lolService.getProfile(summonerName, summonerTag));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/summoner/match/{puuid}")
    private ResponseEntity<List<MatchListDTO>> getSummonerMatches(@PathVariable("puuid") String puuid) {
        try {
            return ResponseEntity.ok(lolService.getMatchListByPuuid(puuid));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
