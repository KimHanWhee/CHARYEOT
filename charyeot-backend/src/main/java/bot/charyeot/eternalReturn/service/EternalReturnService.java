package bot.charyeot.eternalReturn.service;

import bot.charyeot.eternalReturn.entity.BattleUserResult;
import bot.charyeot.eternalReturn.entity.Season;
import bot.charyeot.eternalReturn.entity.UserInfo;
import bot.charyeot.eternalReturn.entity.UserStats;
import bot.charyeot.eternalReturn.entity.response.UserSearchData;
import com.google.common.reflect.TypeToken;
import com.google.gson.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.lang.reflect.Type;
import java.util.List;

@Slf4j
@Service
public class EternalReturnService {
    private final WebClient nimbleWebClient;
    private final Gson gson = new Gson();

    public EternalReturnService(@Qualifier("nimbleWebClient") WebClient nimbleWebClient) {
        this.nimbleWebClient = nimbleWebClient;
    }

    public UserSearchData getUserSearchData(String nickname) throws Exception {
        try {
            UserInfo userInfo = getUserId(nickname);
            log.info("유저 아이디 조회 : {}", userInfo);
            Season currentSeason = getCurrentSeason();
            log.info("유저 스탯 조회 시작... season: {}, userId : {}, userName: {}", currentSeason.getSeasonID(), userInfo.getUserId(), userInfo.getNickname());
            List<UserStats> userStats = getUserStats(userInfo.getUserId(), currentSeason.getSeasonID(), 3);
            log.info("유저 전적 조회 시작... userId : {}, userName: {}", userInfo.getUserId(), userInfo.getNickname());
            List<BattleUserResult> battleUserResult = getBattleUserResultList(userInfo.getUserId());
            return new UserSearchData(userInfo, userStats, battleUserResult);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public UserInfo getUserId(String nickname) throws Exception {
        try {
            String response = nimbleWebClient.get()
                    .uri(uriBuilder -> uriBuilder.path("/v1/user/nickname")
                            .queryParam("query", nickname)
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonElement responseJson = JsonParser.parseString(response).getAsJsonObject().get("user");
            return gson.fromJson(responseJson, UserInfo.class);

        } catch (Exception e) {
            log.error("[Eternal Return] Error occurred while get user ID : ", e);
            throw new Exception(e);
        }
    }

    private List<UserStats> getUserStats(String uid, int seasonId, int matchingMode) throws Exception {
        try {
            String response = nimbleWebClient.get()
                    .uri("/v2/user/stats/uid/{userId}/{seasonId}/{matchingMode}", uid, seasonId, matchingMode)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonElement responseJson = JsonParser.parseString(response).getAsJsonObject().getAsJsonArray("userStats");
            Type listType = new TypeToken<List<UserStats>>(){}.getType();
            return gson.fromJson(responseJson, listType);
        } catch (Exception e) {
            log.error("[Eternal Return] Error occurred while get user stats : ", e);
            throw new Exception(e);
        }
    }

    private List<BattleUserResult> getBattleUserResultList(String uid) throws Exception {
        try {
            String response = nimbleWebClient.get()
                    .uri("/v1/user/games/uid/{userId}", uid)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            JsonElement responseJson = JsonParser.parseString(response).getAsJsonObject().getAsJsonArray("userGames");
            Type listType = new TypeToken<List<BattleUserResult>>(){}.getType();
            return gson.fromJson(responseJson, listType);

        } catch (Exception e) {
            log.error("[Eternal Return] Error occurred while get match data : ", e);
            throw new Exception(e);
        }
    }

    private Season getCurrentSeason() throws Exception {
        try {
            String response = nimbleWebClient.get()
                    .uri("/v2/data/Season")
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonArray responseArray = JsonParser.parseString(response).getAsJsonObject().getAsJsonArray("data");

            for (JsonElement jsonObject : responseArray) {
                JsonObject seasonObj = jsonObject.getAsJsonObject();
                if (seasonObj.get("isCurrent").getAsInt() == 1) { //현재 시즌
                    Season currentSeason = gson.fromJson(seasonObj, Season.class);
                    log.info("현재 시즌 : {}", currentSeason);
                    return currentSeason;
                }
            }
            throw new NullPointerException();
        } catch (Exception e) {
            if(e instanceof NullPointerException) {
                log.error("[Eternal Return] 현재 시즌 정보를 찾을 수 없습니다. ", e);
            } else {
                log.error("[Eternal Return] Error occurred while get Current Season : ", e);
            }
            throw new Exception(e);
        }
    }
}
