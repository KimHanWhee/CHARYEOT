package bot.charyeot.utils;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

public class Util {

    public static long calcEndTime(String startTime, int durationSeconds) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        return OffsetDateTime.parse(startTime, formatter)
                .plusSeconds(durationSeconds)
                .toInstant()
                .toEpochMilli();
    }

    public static String parseName(String name) {
        String result = name.contains(" - ") ? name.split(" - ")[0] : name;
        return result.replace("'", "_");
    }
}
