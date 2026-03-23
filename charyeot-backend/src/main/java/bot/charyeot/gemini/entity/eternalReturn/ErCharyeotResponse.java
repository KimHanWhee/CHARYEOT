package bot.charyeot.gemini.entity.eternalReturn;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ErCharyeotResponse {
    private PlayerInfo most_responsible_player;

    @Getter
    @Setter
    public static class PlayerInfo {
        private String accountName;   // 유저명 (닉네임)
        private String korCharacter;    // 캐릭터명 (실험체)
        private String engCharacter;    // 캐릭터명 (실험체)
        private String reason;        // 선정 이유 (구체적 수치 포함 2~3줄)
        private String description;   // 재치 있는 한줄평 (독설)
        private String score;         // 판결 점수 (0~100, 문자열로 수신 후 필요시 파싱)
    }
}
