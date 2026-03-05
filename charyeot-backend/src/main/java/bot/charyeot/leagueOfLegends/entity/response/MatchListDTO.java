package bot.charyeot.leagueOfLegends.entity.response;

import bot.charyeot.leagueOfLegends.entity.GameMode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MatchListDTO {
    private String matchId;
    private long duration;
    private String gameMode;
    private List<ParticipantsDTO> participantsDTO;

    public MatchListDTO(MatchDTO matchDTO) {
        this.matchId = matchDTO.getMetadata().getMatchId();
        this.duration = matchDTO.getInfo().getGameDuration();
        this.gameMode = GameMode.getKorNameById(matchDTO.getInfo().getQueueId());
        this.participantsDTO = matchDTO.getInfo().getParticipants();
    }
}
