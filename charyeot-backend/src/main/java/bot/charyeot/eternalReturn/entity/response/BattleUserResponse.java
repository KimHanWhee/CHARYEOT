package bot.charyeot.eternalReturn.entity.response;

import bot.charyeot.eternalReturn.entity.BattleUserResult;
import bot.charyeot.eternalReturn.entity.ItemDetail;
import bot.charyeot.eternalReturn.entity.enums.MatchingMode;
import bot.charyeot.eternalReturn.entity.enums.WeaponType;
import bot.charyeot.utils.Util;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BattleUserResponse {
    private String nickname;
    private int accountLevel;
    private int gameId;
    private String matchingMode;
    private int seasonId;
    private int characterNum;
    private String engCharacterName;
    private String korCharacterName;
    private int skinCode;
    private int characterLevel;
    private int gameRank;
    private int teamKill;
    private int playerKill;
    private int playerAssistant;
    private int playerDeaths;
    private int monsterKill;
    private int duration;
    private int damageToPlayer;
    private int damageFromPlayer;
    private int damageToMonster;
    private int teamRecover;
    private int totalGainVFCredit;
    private int totalUseVFCredit;
    private String tacticalSkillName;
    private int tacticalSkillLevel;
    private String weaponName;
    private String mainTrait;
    private String subTrait;
    private Map<Integer, ItemDetail> itemList;
    private long endTime;
    private int transferConsoleFromRevivalUseVFCredit;
    private int creditRevivalCount;
    private int creditRevivedOthersCount;

    public BattleUserResponse(BattleUserResult battleUserResult) {
        this.nickname = battleUserResult.getNickname();
        this.accountLevel = battleUserResult.getAccountLevel();
        this.gameId = battleUserResult.getGameId();
        this.matchingMode = MatchingMode.getMatching(battleUserResult.getMatchingMode());
        this.seasonId = battleUserResult.getSeasonId();
        this.characterNum = battleUserResult.getCharacterNum();
        this.skinCode = battleUserResult.getSkinCode();
        this.characterLevel = battleUserResult.getCharacterLevel();
        this.gameRank = battleUserResult.getGameRank();
        this.teamKill = battleUserResult.getTeamKill();
        this.playerKill = battleUserResult.getPlayerKill();
        this.playerDeaths = battleUserResult.getPlayerDeaths();
        this.playerAssistant = battleUserResult.getPlayerAssistant();
        this.monsterKill = battleUserResult.getMonsterKill();
        this.duration = battleUserResult.getDuration();
        this.damageToPlayer = battleUserResult.getDamageToPlayer();
        this.damageFromPlayer = battleUserResult.getDamageFromPlayer();
        this.damageToMonster = battleUserResult.getDamageToMonster();
        this.teamRecover = battleUserResult.getTeamRecover();
        this.totalGainVFCredit = battleUserResult.getTotalGainVFCredit();
        this.totalUseVFCredit = battleUserResult.getTotalUseVFCredit();
        this.tacticalSkillLevel = battleUserResult.getTacticalSkillLevel();
        this.weaponName = WeaponType.getEngWeaponName(battleUserResult.getBestWeapon());
        this.endTime = Util.calcEndTime(battleUserResult.getStartDtm(), battleUserResult.getDuration());
        this.transferConsoleFromRevivalUseVFCredit = battleUserResult.getTransferConsoleFromRevivalUseVFCredit();
        this.creditRevivalCount = battleUserResult.getCreditRevivalCount();
        this.creditRevivedOthersCount = battleUserResult.getCreditRevivedOthersCount();
    }
}
