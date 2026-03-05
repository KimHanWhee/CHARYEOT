package bot.charyeot.leagueOfLegends.entity.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PerkStyleDTO {
    private String description;
    private List<PerkStyleSelectionsDTO> selections;
    private int style;
}
