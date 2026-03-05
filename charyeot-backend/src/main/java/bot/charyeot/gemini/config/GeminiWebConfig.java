//package bot.charyeot.gemini.config;
//
//import io.netty.channel.ChannelOption;
//import io.netty.handler.timeout.ReadTimeoutHandler;
//import io.netty.handler.timeout.WriteTimeoutHandler;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.client.reactive.ReactorClientHttpConnector;
//import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Mono;
//import reactor.netty.http.client.HttpClient;
//import reactor.netty.resources.ConnectionProvider;
//
//import java.time.Duration;
//import java.util.concurrent.TimeUnit;
//
//@Configuration
//public class GeminiWebConfig {
//
//    @Bean("geminiWebClient")
//    public WebClient geminiWebClient(WebClient.Builder builder) {
//        ConnectionProvider provider = ConnectionProvider.builder("gemini-pool")
//                .maxConnections(50)
//                .maxIdleTime(Duration.ofSeconds(20))
//                .maxLifeTime(Duration.ofSeconds(60))
//                .pendingAcquireTimeout(Duration.ofSeconds(5))
//                .evictInBackground(Duration.ofSeconds(30))
//                .build();
//
//        HttpClient httpClient = HttpClient.create(provider)
//                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5_000)
//                .responseTimeout(Duration.ofSeconds(30))
//                .doOnConnected(conn -> conn
//                        .addHandlerLast(new ReadTimeoutHandler(60, TimeUnit.SECONDS))
//                        .addHandlerLast(new WriteTimeoutHandler(60, TimeUnit.SECONDS))
//                );
//
//        return builder
//                .baseUrl("https://generativelanguage.googleapis.com")
//                .defaultHeader("Content-Type", "application/json")
//                .clientConnector(new ReactorClientHttpConnector(httpClient))
//                .codecs(configurer -> configurer
//                        .defaultCodecs()
//                        .maxInMemorySize(10 * 1024 * 1024)
//                )
//                .filter(ExchangeFilterFunction.ofResponseProcessor(Mono::just))
//                .build();
//    }
//}
