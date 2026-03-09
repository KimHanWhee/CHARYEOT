package bot.charyeot.eternalReturn.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Season {
    private int seasonID;
    private String seasonName;
    private String seasonStart;
    private String seasonEnd;
    private int isCurrent;
}
