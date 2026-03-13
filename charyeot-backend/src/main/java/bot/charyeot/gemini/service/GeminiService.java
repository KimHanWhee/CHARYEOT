package bot.charyeot.gemini.service;

import bot.charyeot.gemini.entity.GameType;
import bot.charyeot.gemini.entity.leagueOfLegends.LolCharyeotRequest;
import bot.charyeot.gemini.entity.leagueOfLegends.LolCharyeotResponse;
import bot.charyeot.gemini.module.PromptLoader;
import bot.charyeot.leagueOfLegends.entity.MatchDTO;
import bot.charyeot.leagueOfLegends.entity.ParticipantsDTO;
import bot.charyeot.leagueOfLegends.module.LolItemInfoFetcher;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class GeminiService {
//    private final WebClient geminiWebClient;

    private final GenerateContentConfig lolConfig;
    private final PromptLoader promptLoader;
    private final Client client;
    private final LolItemInfoFetcher lolItemInfoFetcher;

    public GeminiService(@Qualifier("lolConfig") GenerateContentConfig lolConfig, PromptLoader promptLoader, Client client, LolItemInfoFetcher lolItemInfoFetcher) {
        this.lolConfig = lolConfig;
//        this.geminiWebClient = geminiWebClient;
        this.promptLoader = promptLoader;
        this.client = client;
        this.lolItemInfoFetcher = lolItemInfoFetcher;
    }

    public String getJudgment(GameType game, String matchDataJson) {
        // 1. 게임 타입에 따라 미리 구워진(Pre-baked) Config 선택
        GenerateContentConfig selectedConfig = switch (game) {
            case LEAGUE_OF_LEGENDS -> lolConfig;
            case VALORANT -> lolConfig;
            case ETERNAL_RETURN -> lolConfig;
        };

        GenerateContentResponse response = client.models.generateContent(
                "gemini-3-flash-preview",
                "분석할 데이터:\n" + matchDataJson,
                selectedConfig
        );

        log.info("응답 도착 response : {}", response);

        // 3. 비용 모니터링 (Optional 처리)
        response.usageMetadata().ifPresent(usage -> {
            int input = usage.promptTokenCount().orElse(0);
            int output = usage.candidatesTokenCount().orElse(0);
            int total = usage.totalTokenCount().orElse(0);

            log.info("비용 분석 - 입력: {}, 출력: {}, 총합: {}", input, output, total);
        });

        return response.text();
    }

    public LolCharyeotResponse getLolJudgement(MatchDTO matchDTO) {
       List<LolCharyeotRequest> request = generateLolRequest(matchDTO.getInfo().getParticipants());
        Gson gson = new Gson();
        String matchData = gson.toJson(request);
        String aiResponseJson = getJudgment(GameType.LEAGUE_OF_LEGENDS, matchData);
        return gson.fromJson(aiResponseJson, LolCharyeotResponse.class);
    }

    private List<LolCharyeotRequest> generateLolRequest(List<ParticipantsDTO> participantsList) {
        return participantsList.stream()
                .filter(p -> !p.isWin())
                .map(p -> LolCharyeotRequest.builder()
                        .kills(p.getKills())
                        .deaths(p.getDeaths())
                        .assist(p.getAssists())
                        .championName(p.getChampionName())
                        .riotGameName(p.getRiotIdGameName())
                        .riotTagline(p.getRiotIdTagline())
                        .role(p.getRole())
                        .totalDamageDealtToChampions(p.getTotalDamageDealtToChampions())
                        .totalDamageTaken(p.getTotalDamageTaken())
                        .totalHealsOnTeammates(p.getTotalHealsOnTeammates())
                        .visionScore(p.getVisionScore())
                        .item0(lolItemInfoFetcher.getItemName(p.getItem0()))
                        .item1(lolItemInfoFetcher.getItemName(p.getItem1()))
                        .item2(lolItemInfoFetcher.getItemName(p.getItem2()))
                        .item3(lolItemInfoFetcher.getItemName(p.getItem3()))
                        .item4(lolItemInfoFetcher.getItemName(p.getItem4()))
                        .item5(lolItemInfoFetcher.getItemName(p.getItem5()))
                        .item6(lolItemInfoFetcher.getItemName(p.getItem6()))
                        .build())
                .toList();
    }
}