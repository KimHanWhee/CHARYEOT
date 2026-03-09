package bot.charyeot.gemini.service;

import bot.charyeot.gemini.entity.GameType;
import bot.charyeot.gemini.entity.leagueOfLegends.LolCharyeotRequest;
import bot.charyeot.gemini.entity.leagueOfLegends.LolCharyeotResponse;
import bot.charyeot.gemini.module.PromptLoader;
import bot.charyeot.leagueOfLegends.entity.MatchDTO;
import bot.charyeot.leagueOfLegends.entity.ParticipantsDTO;
import bot.charyeot.leagueOfLegends.module.LolItemInfoFetcher;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

//    private final WebClient geminiWebClient;

    private final PromptLoader promptLoader;
    private final Client client;
    private final LolItemInfoFetcher lolItemInfoFetcher;

    public GeminiService(PromptLoader promptLoader, Client client, LolItemInfoFetcher lolItemInfoFetcher) {
//        this.geminiWebClient = geminiWebClient;
        this.promptLoader = promptLoader;
        this.client = client;
        this.lolItemInfoFetcher = lolItemInfoFetcher;
    }

    public String getJudgment(GameType game, String matchDataJson) {
        String basePrompt;

        switch (game) {
            case LEAGUE_OF_LEGENDS -> basePrompt = promptLoader.getLeagueOfLegendsPrompt();
            case VALORANT -> basePrompt = promptLoader.getValorantPrompt();
            case ETERNAL_RETURN -> basePrompt = promptLoader.getEternalReturnPrompt();
            default -> basePrompt = "";
        }
        String finalPrompt = basePrompt + "\n\n분석할 데이터:\n" + matchDataJson;


        GenerateContentResponse response = client.models.generateContent(
                "gemini-3-flash-preview",
                finalPrompt,
                null
        );
        log.info("응답 도착 response : {}", response);
        return response.text();

//        GeminiRequest request = new GeminiRequest(finalPrompt);
//        return geminiWebClient.post()
//                .uri(uriBuilder -> uriBuilder
//                        .path("/v1beta/models/gemini-1.5-flash:generateContent")
//                        .queryParam("key", apiKey)
//                        .build())
//                .bodyValue(request)
//                .retrieve()
//                .bodyToMono(GeminiResponse.class)
//                .map(response -> {
//                    if (response != null && !response.candidates().isEmpty()) {
//                        return response.candidates().get(0).content().parts().get(0).text();
//                    }
//                    return "판사의 말문이 막혔습니다. 대체 얼마나 심각했던 건지..";
//                })
//                .onErrorReturn("판사가 쓰러졌습니다.")
//                .block();


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