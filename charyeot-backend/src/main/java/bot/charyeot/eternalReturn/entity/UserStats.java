package bot.charyeot.eternalReturn.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserStats {
    private int seasonId;
    private int mmr;
    private int rank;
    private int rankSize;
    private int totalGames;
    private int totalWins;
    private int totalTeamKills;
    private List<CharacterStat> characterStats;
}
