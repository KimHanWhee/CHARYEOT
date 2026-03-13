package bot.charyeot.leagueOfLegends.service;

import bot.charyeot.leagueOfLegends.entity.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class LolService {

    private final WebClient riotKrWebClient;
    private final WebClient riotAsiaWebClient;

    public LolService(
            @Qualifier("riotKrWebClient") WebClient riotKrWebClient,
            @Qualifier("riotAsiaWebClient") WebClient riotAsiaWebClient) {
        this.riotKrWebClient = riotKrWebClient;
        this.riotAsiaWebClient = riotAsiaWebClient;
    }

    public List<MatchListDTO> getMatchListByPuuid(String puuid) throws Exception {
        try {
            List<MatchListDTO> result = new ArrayList<>();
            log.info("Searching MatchList PUUID : {}", puuid);

            // 1. 최근 매치 ID 리스트 가져오기
            List<String> matchIdList = getRecentMatchIdsByPuuid(puuid);

            for (String matchId : matchIdList) {
                MatchDTO matchDTO = getMatchByMatchId(matchId);

                MatchListDTO matchListDTO = new MatchListDTO(matchDTO);
                result.add(matchListDTO);
            }
            return result;
        } catch (Exception e) {
            log.error("Error Occurred while get matchList : ", e);
            throw new Exception(e);
        }
    }

    public AccountDTO getSummonerAccount(String gameName, String tagLine) throws Exception {
        try {
            return riotAsiaWebClient.get()
                    .uri("/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}", gameName, tagLine)
                    .retrieve()
                    .bodyToMono(AccountDTO.class)
                    .block();
        } catch (Exception e) {
            log.error("error occurred while get summoner account :", e);
            throw new Exception(e);
        }
    }

    public List<String> getRecentMatchIdsByPuuid(String puuid) throws Exception {
        try {
            return riotAsiaWebClient.get()
                    .uri("/lol/match/v5/matches/by-puuid/{puuid}/ids", puuid)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<String>>() {})
                    .block();
        } catch (Exception e) {
            log.error("error while get recent match ids : ", e);
            throw new Exception(e);
        }
    }

    public MatchDTO getMatchByMatchId(String matchId) throws Exception {
        try {
            return riotAsiaWebClient.get()
                    .uri("/lol/match/v5/matches/{matchId}", matchId)
                    .retrieve()
                    .bodyToMono(MatchDTO.class)
                    .block();
        } catch (Exception e) {
            log.error("error while get match : ", e);
            throw new Exception(e);
        }
    }

    public SummonerDTO getSummoner(String puuid) {
        return riotKrWebClient.get()
                .uri("/lol/summoner/v4/summoners/by-puuid/{puuid}", puuid)
                .retrieve()
                .bodyToMono(SummonerDTO.class)
                .block();
    }

    public List<LeagueEntryDTO> getRankInfo(String puuid) {
        return riotKrWebClient.get()
                .uri("/lol/league/v4/entries/by-puuid/{puuid}", puuid)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<LeagueEntryDTO>>() {})
                .block();
    }


    public ProfileDTO getProfile(String gameName, String tagLine) throws Exception {
        try {
            AccountDTO accountDTO = getSummonerAccount(gameName, tagLine);
            SummonerDTO summonerDTO = getSummoner(accountDTO.getPuuid());
            List<LeagueEntryDTO> leagueEntries = getRankInfo(accountDTO.getPuuid());
            ProfileDTO result = new ProfileDTO(accountDTO, summonerDTO, leagueEntries);
            log.info("Find {}#{}'s profile info : {}", result.getGameName(), result.getTagLine(), result);
            return result;
        } catch (Exception e) {
            log.error("error while get Summoner Profile : ", e);
            throw new Exception(e);
        }
    }
}
