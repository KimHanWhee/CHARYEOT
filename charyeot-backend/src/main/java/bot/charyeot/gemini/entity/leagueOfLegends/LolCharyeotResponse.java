package bot.charyeot.gemini.entity.leagueOfLegends;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LolCharyeotResponse {
    private PlayerInfo most_responsible_player;

    @Getter
    @Setter
    public static class PlayerInfo {
        private String summonerName;
        private String summonerTag;
        private String champion;
        private String reason;
        private String description;
        private int score;
    }
}
