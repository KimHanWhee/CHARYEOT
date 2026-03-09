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
                // 2. 각 매치 ID로 상세 데이터 호출
                MatchDTO matchDTO = getMatchByMatchId(matchId);

                // 3. 전체 참가자 중 검색 중인 유저(puuid)의 정보만 필터링
//                matchDTO.getInfo().getParticipants().stream()
//                        .filter(p -> p.getPuuid().equals(puuid))
//                        .findFirst()
//                        .ifPresent(me -> {
//                            // 4. 찾은 내 정보(me)와 매치 정보(matchDTO)를 조합해 DTO 생성
//                            // MatchListDTO 생성자에서 필요한 처리를 한다고 가정합니다.
//                            MatchListDTO matchListDTO = new MatchListDTO(matchDTO, me);
//                            result.add(matchListDTO);
//                        });
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
                .uri("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}", puuid)
                .retrieve()
                .bodyToMono(SummonerDTO.class)
                .block();
    }


    public ProfileDTO getProfile(String gameName, String tagLine) throws Exception {
        try {
            AccountDTO accountDTO = getSummonerAccount(gameName, tagLine);
            SummonerDTO summonerDTO = getSummoner(accountDTO.getPuuid());
            ProfileDTO result = new ProfileDTO(accountDTO, summonerDTO);
            log.info("Find {}#{}'s profile info : {}", result.getGameName(), result.getTagLine(), result);
            return result;
        } catch (Exception e) {
            log.error("error while get Summoner Profile : ", e);
            throw new Exception(e);
        }
    }
}
