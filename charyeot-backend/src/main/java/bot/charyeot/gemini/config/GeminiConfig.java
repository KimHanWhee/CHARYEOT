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

    // LOL 전용 설정 빈
    @Bean
    public GenerateContentConfig lolConfig(PromptLoader promptLoader) {
        // 1. 시스템 지침 객체 생성
        Content instructionContent = Content.builder()
                .role("system") // 중요: 대화 참여자가 아닌 '규칙 제정자'로 정의
                .parts(List.of(Part.fromText(promptLoader.getLeagueOfLegendsPrompt())))
                .build();

        // 2. 전체 설정 빌드
        return GenerateContentConfig.builder()
                .systemInstruction(instructionContent) // 모델의 근본 규칙 주입
                .responseMimeType("application/json")   // 출력 형식을 JSON으로 강제 (DTO 매핑용)
                .build();
    }

    // ER 전용 설정 빈
    @Bean
    public GenerateContentConfig erConfig(PromptLoader promptLoader) {
        Content instructionContent = Content.builder()
                .role("system") // 역할을 시스템으로 명시
                .parts(List.of(Part.fromText(promptLoader.getEternalReturnPrompt())))
                .build();

        return GenerateContentConfig.builder()
                .systemInstruction(instructionContent) // String이 아닌 객체로 전달
                .responseMimeType("application/json")
                .build();
    }
}
