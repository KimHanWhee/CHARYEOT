package bot.charyeot.gemini.entity;

import lombok.Getter;

@Getter
public enum GameType {
    LEAGUE_OF_LEGENDS("리그 오브 레전드"),
    VALORANT("발로란트"),
    ETERNAL_RETURN("이터널 리턴");

    private final String displayName;

    GameType(String displayName) {
        this.displayName = displayName;
    }
}
