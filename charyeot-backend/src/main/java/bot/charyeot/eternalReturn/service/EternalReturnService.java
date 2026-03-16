package bot.charyeot.eternalReturn.service;

import bot.charyeot.eternalReturn.entity.*;
import bot.charyeot.eternalReturn.entity.response.BattleUserResponse;
import bot.charyeot.eternalReturn.entity.response.UserSearchData;
import bot.charyeot.eternalReturn.module.EternalReturnDataFetcher;
import bot.charyeot.utils.Util;
import com.google.common.reflect.TypeToken;
import com.google.gson.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.lang.reflect.Type;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class EternalReturnService {
    private final WebClient nimbleWebClient;
    private final EternalReturnDataFetcher eternalReturnDataFetcher;
    private final Gson gson = new Gson();

    public EternalReturnService(@Qualifier("nimbleWebClient") WebClient nimbleWebClient, EternalReturnDataFetcher eternalReturnDataFetcher) {
        this.nimbleWebClient = nimbleWebClient;
        this.eternalReturnDataFetcher = eternalReturnDataFetcher;
    }

    public UserSearchData getUserSearchData(String nickname) throws Exception {
        try {
            UserInfo userInfo = getUserId(nickname);
            log.info("유저 아이디 조회 : {}", userInfo);
            Season currentSeason = getCurrentSeason();
            log.info("유저 스탯 조회 시작... season: {}, userId : {}, userName: {}", currentSeason.getSeasonID(), userInfo.getUserId(), userInfo.getNickname());
            List<UserStats> userStats = getUserStats(userInfo.getUserId(), 0, 0);
            log.info("유저 전적 조회 시작... userId : {}, userName: {}", userInfo.getUserId(), userInfo.getNickname());
            List<BattleUserResponse> battleUserResponses = getBattleUserResultList(userInfo.getUserId());
            return new UserSearchData(userInfo, userStats, battleUserResponses);
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
            List<UserStats> result = gson.fromJson(responseJson, listType);

            for(UserStats userStats : result) {
                for (CharacterStat characterStat : userStats.getCharacterStats()) {
                    characterStat.setEngCharacterName(eternalReturnDataFetcher.getEngCharacterName(characterStat.getCharacterCode()));
                    characterStat.setKorCharacterName(eternalReturnDataFetcher.getKorCharacterName(characterStat.getCharacterCode()));
                }
            }

            return result;

        } catch (Exception e) {
            log.error("[Eternal Return] Error occurred while get user stats : ", e);
            throw new Exception(e);
        }
    }

    private List<Integer> getBattleId(String uid) {
        String response = nimbleWebClient.get()
                .uri("/v1/user/games/uid/{userId}", uid)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        JsonArray responseJson = JsonParser.parseString(response).getAsJsonObject().getAsJsonArray("userGames");
        Type listType = new TypeToken<List<BattleUserResult>>(){}.getType();
        List<BattleUserResult> resultList = gson.fromJson(responseJson, listType);

        return resultList.stream()
                .map(BattleUserResult::getGameId)
                .collect(Collectors.toList());
    }

    public List<BattleUserResponse> getBattleUserResultDetail(Integer gameId) throws Exception {
        try {
            String response = nimbleWebClient.get()
                    .uri("/v1/games/{gameId}", gameId)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonElement responseJson = JsonParser.parseString(response).getAsJsonObject().getAsJsonArray("userGames");
            Type listType = new TypeToken<List<BattleUserResult>>(){}.getType();
            List<BattleUserResult> battleUserResultList = gson.fromJson(responseJson, listType);
            List<BattleUserResponse> responseList = new ArrayList<>();

            return battleUserResultList.stream()
                    .map(this::parseBattleUserResponse)
                    .toList();

        } catch (Exception e) {
            log.error("[Eternal Return] Error occurred while getting match detail data : ", e);
            throw new Exception(e);
        }
    }

    private List<BattleUserResponse> getBattleUserResultList(String uid) throws Exception {
        try {
            String response = nimbleWebClient.get()
                    .uri("/v1/user/games/uid/{userId}", uid)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonElement responseJson = JsonParser.parseString(response).getAsJsonObject().getAsJsonArray("userGames");
            Type listType = new TypeToken<List<BattleUserResult>>(){}.getType();
            List<BattleUserResult> battleUserResultList = gson.fromJson(responseJson, listType);

            return battleUserResultList.stream()
                    .map(this::parseBattleUserResponse)
                    .toList();

        } catch (Exception e) {
            log.error("[Eternal Return] Error occurred while getting match data : ", e);
            throw new Exception(e);
        }
    }

    private BattleUserResponse parseBattleUserResponse(BattleUserResult battleUserResult) {
        Map<Integer, ItemDetail> itemMap = new HashMap<>();
        BattleUserResponse battleUserResponse = new BattleUserResponse(battleUserResult);

        // 캐릭터명 파싱
        battleUserResponse.setEngCharacterName(eternalReturnDataFetcher.getEngCharacterName(battleUserResult.getCharacterNum()));
        battleUserResponse.setKorCharacterName(eternalReturnDataFetcher.getKorCharacterName(battleUserResult.getCharacterNum()));

        // 전술 스킬 파싱
        battleUserResponse.setTacticalSkillName(eternalReturnDataFetcher.getEngTacticalSkillName(battleUserResult.getTacticalSkillGroup()));

        // 특성 파싱
        battleUserResponse.setMainTrait(eternalReturnDataFetcher.getEngTraitName(battleUserResult.getTraitFirstCore()));
        // 보조 특성의 경우 제일 앞 2자리만 자른 후 + 00000을 해야한다. -> 100000을 나눈뒤 다시 곱한다.
        int subTraitCode = (battleUserResult.getTraitSecondSub().get(0) / 100000) * 100000;
        battleUserResponse.setSubTrait(eternalReturnDataFetcher.getEngTraitName(subTraitCode));


        // 아이템명 + 등급 파싱
        for (int slot = 0; slot < 5; slot++) {
            Integer itemId = battleUserResult.getEquipment().get(slot);
            if (itemId != null && itemId != 0) {
                ItemDetail itemDetail = ItemDetail.builder()
                        .name(Util.parseName(eternalReturnDataFetcher.getEngItemName(itemId)))
                        .grade(battleUserResult.getEquipmentGrade().get(slot))
                        .build();
                itemMap.put(slot, itemDetail);
            }
        }
        battleUserResponse.setItemList(itemMap);
        return battleUserResponse;
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
