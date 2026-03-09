package bot.charyeot.leagueOfLegends.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MatchDTO {
    private MetadataDTO metadata;
    private InfoDTO info;
}
