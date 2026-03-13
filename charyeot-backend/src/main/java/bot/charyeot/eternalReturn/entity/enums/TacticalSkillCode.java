package bot.charyeot.eternalReturn.entity.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
public enum TacticalSkillCode {
    SLOT_30(30, 4000000),
    SLOT_40(40, 4001000),
    SLOT_50(50, 4101000),
    SLOT_60(60, 4102000),
    SLOT_70(70, 4103000),
    SLOT_80(80, 4104000),
    SLOT_90(90, 4105000),
    SLOT_110(110, 4107000),
    SLOT_120(120, 4114000),
    SLOT_130(130, 4112000),
    SLOT_140(140, 4113000),
    SLOT_150(150, 4108000);

    private final int key;
    private final int value;

    TacticalSkillCode(int key, int value) {
        this.key = key;
        this.value = value;
    }

    private static final Map<Integer, Integer> KEY_MAP =
            Arrays.stream(values()).collect(Collectors.toMap(TacticalSkillCode::getKey, TacticalSkillCode::getValue));

    /**
     * Key값(30, 40 등)으로 Value(4108000 등)를 찾는 메서드
     */
    public static int getValueByKey(int key) {
        return KEY_MAP.getOrDefault(key, 0); // 찾지 못하면 0 반환
    }
}
