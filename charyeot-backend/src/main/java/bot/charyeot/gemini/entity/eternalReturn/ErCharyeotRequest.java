package bot.charyeot.gemini.entity.eternalReturn;

import bot.charyeot.eternalReturn.entity.ItemDetail;
import lombok.*;

import java.util.Map;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErCharyeotRequest {
    private String nickname;
    private String matchingMode;
    private String korCharacterName;
    private String engCharacterName;
    private int characterLevel;
    private int gameRank;
    private int teamKill;
    private int playerKill;
    private int playerAssistant;
    private int playerDeaths;
    private int monsterKill;
    private int damageToPlayer;
    private int damageFromPlayer;
    private int damageToMonster;
    private int teamRecover;
    private int totalGainVFCredit;
    private int totalUseVFCredit;
    private String tacticalSkillName;
    private int tacticalSkillLevel;
    private String mainTrait;
    private Map<Integer, ItemDetail> itemList;
    private int transferConsoleFromRevivalUseVFCredit;
    private int creditRevivalCount;
    private int creditRevivedOthersCount;
}
