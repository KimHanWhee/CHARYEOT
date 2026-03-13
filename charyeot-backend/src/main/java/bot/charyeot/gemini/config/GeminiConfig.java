package bot.charyeot.gemini.config;

import bot.charyeot.gemini.module.PromptLoader;
import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.Part;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class GeminiConfig {

    @Value("${gemini.api-key}")
    private String apiKey;

    @Bean
    public Client geminiClient() {
        return Client.builder()
                .apiKey(apiKey)
                .build();
    }

    // 2. LOL 전용 설정 빈
    @Bean
    public GenerateContentConfig lolConfig(PromptLoader promptLoader) {
        // 1. 지침 문자열을 시스템 명령 객체로 미리 변환
        Content instructionContent = Content.builder()
                .role("system") // 역할을 시스템으로 명시
                .parts(List.of(Part.fromText(promptLoader.getLeagueOfLegendsPrompt())))
                .build();

        // 2. 완성된 객체를 설정에 주입
        return GenerateContentConfig.builder()
                .systemInstruction(instructionContent) // String이 아닌 객체로 전달
                .responseMimeType("application/json")
                .build();
    }
}
