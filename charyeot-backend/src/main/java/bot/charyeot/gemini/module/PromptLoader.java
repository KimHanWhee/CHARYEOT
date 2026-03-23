package bot.charyeot.gemini.module;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@Getter
@Component
public class PromptLoader {
    private String leagueOfLegendsPrompt;
    private String valorantPrompt;
    private String eternalReturnPrompt;

    @PostConstruct
    public void init() {
        log.info("리그오브레전드 프롬프트 로딩 시작...");
        this.leagueOfLegendsPrompt = load("leagueOfLegends");
        log.info("리그오브레전드 프롬프트 로딩 성공");
        log.info("이터널리턴 프롬프트 로딩 시작...");
        this.eternalReturnPrompt = load("eternalReturn");
        log.info("이터널리턴 프롬프트 로딩 성공");
    }

    public String load(String gameName) {
        try {
            // resources/prompts/leagueOfLegends.txt 경로에서 읽어옴
            Resource resource = new ClassPathResource("prompts/" + gameName + ".txt");

            // 파일 내용을 바이트로 읽어서 문자열로 변환
            byte[] bdata = FileCopyUtils.copyToByteArray(resource.getInputStream());
            return new String(bdata, StandardCharsets.UTF_8);

        } catch (IOException e) {
            throw new RuntimeException("프롬프트 파일을 찾을 수 없습니다: " + gameName, e);
        }
    }
}
