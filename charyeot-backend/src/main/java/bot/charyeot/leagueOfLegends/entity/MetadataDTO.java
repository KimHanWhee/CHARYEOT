package bot.charyeot.leagueOfLegends.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MetadataDTO {
    private String dataVersion;
    private String matchId;
    private List<String> participants;
}
