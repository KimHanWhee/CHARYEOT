package bot.charyeot.gemini.entity;

import java.util.List;

public record GeminiRequest(List<Content> contents) {

    public GeminiRequest(String prompt) {
        this(List.of(new Content(List.of(new Part(prompt)))));
    }

    public record Content(List<Part> parts) {}
    public record Part(String text) {}
}