package bot.charyeot.leagueOfLegends.entity;

import lombok.Getter;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
public enum GameMode {
    // === 주요 랭크 및 일반 게임 ===
    SOLO_RANK(420, "솔랭"),
    FLEX_RANK(440, "자랭"),
    QUICK_PLAY(490, "신속플레이"),
    NORMAL_DRAFT(400, "일반(교차)"),
    NORMAL_BLIND(430, "일반(비공개)"),
    SWIFT_PLAY(480, "신속플레이"),

    // === 특별 모드 ===
    ARAM(450, "칼바람"),
    ARENA(1700, "아레나"),
    ARENA_16(1710, "아레나"),
    URF(1900, "URF"),
    ARURF(900, "ARURF"),
    ULTIMATE_SPELLBOOK(1400, "궁극기 주문서"),
    ONE_FOR_ALL(1020, "단일 챔피언"),
    NEXUS_BLITZ(1300, "넥서스 공성전"),

    // === 협력 및 기타 ===
    AI_INTRO(870, "봇(입문)"),
    AI_BEGINNER(880, "봇(초보)"),
    AI_INTERMEDIATE(890, "봇(중급)"),
    CLASH(700, "격전"),
    ARAM_CLASH(720, "칼바람 격전"),
    CUSTOM(0, "커스텀"),
    SWARM(1840, "하이브"), // 1810~1840 통합 처리용 예시

    // === 특수 처리 ===
    UNKNOWN(-1, "기타");

    private final int queueId;
    private final String korName; // 한글 명칭을 필드로!

    GameMode(int queueId, String korName) {
        this.queueId = queueId;
        this.korName = korName;
    }

    // 숫자(ID)를 Key로 하는 미리 생성된 맵 (조회 속도 최적화)
    private static final Map<Integer, String> KOR_NAME_MAP = Stream.of(values())
            .collect(Collectors.toMap(GameMode::getQueueId, GameMode::getKorName));

    /**
     * queueId만 던지면 바로 "솔로 랭크" 같은 한글이 나옵니다.
     */
    public static String getKorNameById(int queueId) {
        return KOR_NAME_MAP.getOrDefault(queueId, UNKNOWN.korName);
    }
}