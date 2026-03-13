package bot.charyeot.eternalReturn.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
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
    private int characterLevel;
    private int gameRank;
    private int teamKill;
    private int playerKill;
    private int playerAssistant;
    private int playerDeaths;
    private int monsterKill;
    private Map<Integer, Integer> equipment;
    private Map<Integer, Integer> equipmentGrade;
    private int duration;
    private int damageToPlayer;
    private int damageFromPlayer;
    private int damageToMonster;
    private int totalGainVFCredit;
    private int totalUseVFCredit;
    private int tacticalSkillGroup;
    private int tacticalSkillLevel;
    private int bestWeapon;
    private int traitFirstCore;
    private List<Integer> traitSecondSub;
    private String startDtm;
}
