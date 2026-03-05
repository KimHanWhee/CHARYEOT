package bot.charyeot.leagueOfLegends.entity.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantsDTO {
    private String puuid;
    private int kills;
    private int deaths;
    private int assists;
    private int totalDamageDealtToChampions;
    private int totalHealsOnTeammates;
    private int totalDamageTaken;
    private int teamId;
    private String riotIdGameName;
    private String riotIdTagline;
    private String role;
    private String championId;
    private String championName;
    private int champLevel;
    private boolean win;
    private int totalMinionsKilled;
    private int visionScore;
    private int item0;
    private int item1;
    private int item2;
    private int item3;
    private int item4;
    private int item5;
    private int item6;
    private int summoner1Id;
    private int summoner2Id;
    private PerksDTO perks;
}
