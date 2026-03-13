package bot.charyeot.eternalReturn.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CharacterStat {
    private int characterCode;
    private String korCharacterName;
    private String engCharacterName;
    private int totalGames;
    private int maxKillings;
    private int wins;
    private int top3;
}
