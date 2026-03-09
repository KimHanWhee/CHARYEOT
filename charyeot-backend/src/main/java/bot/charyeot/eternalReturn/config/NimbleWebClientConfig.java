package bot.charyeot.eternalReturn.config;

import io.netty.channel.ChannelOption;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@Getter
@Configuration
public class NimbleWebClientConfig {
    @Value("${external.nimble.api-key}")
    private String apiKey;
    @Value("${external.nimble.end-point}")
    private String endPoint;

    @Bean("nimbleWebClient")
    public WebClient nimbleWebClient() {
        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 30000) // 5초 타임아웃
                .responseTimeout(Duration.ofSeconds(30));

        return WebClient.builder()
                .baseUrl(endPoint)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .defaultHeader("X-API-KEY", apiKey)
                .build();
    }

}