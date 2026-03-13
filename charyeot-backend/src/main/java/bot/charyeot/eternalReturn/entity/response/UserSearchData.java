package bot.charyeot.eternalReturn.entity.response;

import bot.charyeot.eternalReturn.entity.BattleUserResult;
import bot.charyeot.eternalReturn.entity.UserInfo;
import bot.charyeot.eternalReturn.entity.UserStats;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSearchData {
    private UserInfo userInfo;
    private List<UserStats> userStats;
    private List<BattleUserResponse> battleUserResponses;
}
