package bot.charyeot.leagueOfLegends.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SummonerDTO {
    private String puuid;
    private int profileIconId;
    private long revisionDate;
    private long summonerLevel;
}
