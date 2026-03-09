package bot.charyeot.gemini.entity.leagueOfLegends;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LolCharyeotRequest {
    private int kills;
    private int deaths;
    private int assist;
    private int totalDamageDealtToChampions;
    private int totalHealsOnTeammates;
    private int totalDamageTaken;
    private String role;
    private String championName;
    private int visionScore;
    private String riotGameName;
    private String riotTagline;
    private String item0;
    private String item1;
    private String item2;
    private String item3;
    private String item4;
    private String item5;
    private String item6;
}
