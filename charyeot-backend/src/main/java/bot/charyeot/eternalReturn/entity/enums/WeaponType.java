package bot.charyeot.eternalReturn.entity.enums;

import lombok.Getter;
import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Getter
public enum WeaponType {
    GLOVE(1, "Glove", "글러브"),
    TONFA(2, "Tonfa", "톤파"),
    BAT(3, "Bat", "방망이"),
    WHIP(4, "Whip", "채찍"),
    THROW(5, "Throw", "투척"),
    SHURIKEN(6, "Shuriken", "암기"),
    BOW(7, "Bow", "활"),
    CROSSBOW(8, "Crossbow", "석궁"),
    PISTOL(9, "Pistol", "권총"),
    ASSAULT_RIFLE(10, "Assault Rifle", "돌격 소총"),
    SNIPER_RIFLE(11, "Sniper Rifle", "저격총"),
    HAMMER(13, "Hammer", "망치"), // 12번이 비어있는 점 반영
    AXE(14, "Axe", "도끼"),
    DAGGER(15, "Dagger", "단검"),
    TWO_HANDED_SWORD(16, "Two-handed Sword", "양손검"),
    POLEARM(17, "Polearm", "폴암"),
    DUAL_SWORDS(18, "Dual Swords", "쌍검"),
    SPEAR(19, "Spear", "창"),
    NUNCHAKU(20, "Nunchaku", "쌍절곤"),
    RAPIER(21, "Rapier", "레이피어"),
    GUITAR(22, "Guitar", "기타"),
    CAMERA(23, "Camera", "카메라"),
    ARCANA(24, "Arcana", "아르카나"),
    VF_PROSTHETICS(25, "VF Prosthetics", "VF의수");

    private final int code;
    private final String engName;
    private final String korName;

    WeaponType(int code, String engName, String korName) {
        this.code = code;
        this.engName = engName;
        this.korName = korName;
    }

    // 빠른 조회를 위한 캐싱 Map
    private static final Map<Integer, WeaponType> CODE_MAP =
            Arrays.stream(values()).collect(Collectors.toMap(WeaponType::getCode, Function.identity()));

    /**
     * 무기 코드(1, 2, 3...)로 Enum 상수를 즉시 반환
     */
    public static WeaponType fromCode(int code) {
        return CODE_MAP.get(code);
    }

    public static String getEngWeaponName(int code) {
        return CODE_MAP.get(code).getEngName();
    }
}