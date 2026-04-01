package bot.charyeot.eternalReturn.entity;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserRank {
    private String nickname;
    private int mmr;
    private int rank;
    private int serverCode;
    private int serverRank;
}
