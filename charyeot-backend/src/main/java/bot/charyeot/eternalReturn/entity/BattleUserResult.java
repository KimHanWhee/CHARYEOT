package bot.charyeot.eternalReturn.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class BattleUserResult {
    private String nickname;
    private int accountLevel;
    private int gameId;
    private int matchingMode;
    private int seasonId;
    private int characterNum;
    private int skinCode;
    private int CharacterLevel;
    private int gameRank;
    private int playerKill;
    private int playerAssistant;
    private int monsterKill;
    private Map<Integer, Integer> equipment;
    private int playTime;
    private int damageToPlayer;
    private int damageFromPlayer;
    private int damageToMonster;
    private int totalGainVFCredit;
    private int totalUseVFCredit;
}
