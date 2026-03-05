package bot.charyeot.gemini.service;

import bot.charyeot.gemini.entity.GameType;
import bot.charyeot.gemini.entity.GeminiRequest;
import bot.charyeot.gemini.entity.GeminiResponse;
import bot.charyeot.gemini.module.PromptLoader;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

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

    public GeminiService(PromptLoader promptLoader, Client client) {
//        this.geminiWebClient = geminiWebClient;
        this.promptLoader = promptLoader;
        this.client = client;
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
}