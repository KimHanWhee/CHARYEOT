package bot.charyeot.eternalReturn.entity.enums;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Getter
public enum MatchingMode {
    SQUAD_NORMAL(2, "일반"),
    SQUAD_RANK(3, "랭크"),
    COBALT_NORMAL(6, "코발트"),
    LONEWOLF(9, "론울프");

    private final int code;
    private final String description;

    MatchingMode(int code, String description) {
        this.code = code;
        this.description = description;
    }

    // 빠른 조회를 위한 캐싱 Map (O(1) 성능 확보)
    private static final Map<Integer, MatchingMode> MODE_MAP =
            Arrays.stream(values()).collect(Collectors.toMap(MatchingMode::getCode, mode -> mode));

    /**
     * 매칭 코드(2, 3, 4, 9)로 Enum 상수를 즉시 반환
     */
    public static MatchingMode fromCode(int code) {
        return MODE_MAP.getOrDefault(code, null); // 알 수 없는 모드일 경우 null 반환
    }

    /**
     * 랭크 매치 여부 확인 (판결 가중치 부여 시 활용 가능)
     */
    public boolean isRank() {
        return this == SQUAD_RANK;
    }

    public static String getMatching(int code) {
        return MODE_MAP.get(code).getDescription();
    }
}