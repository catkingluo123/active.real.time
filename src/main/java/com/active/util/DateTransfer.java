/**
 * @Title: Util.java
 * @Package com.wan.util
 * @Description: TODO
 * @author 沈龙 shenlong@37.com
 * @date 2015-3-1 下午5:11:56
 * @version V1.0
 */
package com.active.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @ClassName: Util
 * @Description: TODO
 * @author 沈龙
 * @date 2015-3-1 下午5:11:56
 *
 */
public class DateTransfer {

    /**
     * @throws ParseException
     * @throws ParseException
     * @Title: mian
     * @Description: TODO
     * @param
     * @return void
     * @throws
     */
    public static void main(String[] args) throws ParseException {
        String startDay = "20151030";
        System.out.println(getTime(startDay));
        // System.out.println(getDate(startDay, 2, -2));
        System.out.println(getDate(startDay,1, -6));
    }

    public static String getDate(String startDay, int flag, int interval) {
        if (flag == 1) { // day
            int year = Integer.parseInt(startDay.substring(0, 4));
            int month = Integer.parseInt(startDay.substring(4, 6));
            int day = Integer.parseInt(startDay.substring(6, 8));
            Calendar calendar = Calendar.getInstance();
            calendar.set(year, month - 1, day);
            calendar.add(Calendar.DAY_OF_MONTH, interval);
            return new SimpleDateFormat("yyyyMMdd").format(calendar.getTime());
        } else if (flag == 2) { // month
            int year = Integer.parseInt(startDay.substring(0, 4));
            int month = Integer.parseInt(startDay.substring(4, 6));
            int day = Integer.parseInt(startDay.substring(6, 8));
            Calendar calendar = Calendar.getInstance();
            calendar.set(year, month - 1, day);
            calendar.add(Calendar.MONTH, interval);
            return new SimpleDateFormat("yyyyMMdd").format(calendar.getTime());
        } else if (flag == 3) { // year
            int year = Integer.parseInt(startDay.substring(0, 4));
            int month = Integer.parseInt(startDay.substring(4, 6));
            int day = Integer.parseInt(startDay.substring(6, 8));
            Calendar calendar = Calendar.getInstance();
            calendar.set(year, month - 1, day);
            calendar.add(Calendar.YEAR, interval);
            return new SimpleDateFormat("yyyyMMdd").format(calendar.getTime());
        } else {
            return null;
        }
    }

    public static String getFormatDate(String startDay) {
        return new StringBuilder().append(startDay.substring(0, 4)).append("-")
                .append(startDay.substring(4, 6)).append("-")
                .append(startDay.substring(6, 8)).toString();
    }

    public static String getTime(String startDay) {
        return new StringBuilder().append(startDay.substring(0, 4)).append("-")
                .append(startDay.substring(4, 6)).append("-")
                .append(startDay.substring(6, 8)).append(" 00:00:00").toString();
    }

    public synchronized List<String> getMonthBetween(String startMonth,
                                                     String endMonth) throws ParseException {
        ArrayList<String> list = new ArrayList<String>();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMM"); // 格式化为年月
        Calendar min = Calendar.getInstance();
        Calendar max = Calendar.getInstance();
        min.setTime(format.parse(startMonth));
        min.set(min.get(Calendar.YEAR), min.get(Calendar.MONTH), 1);

        max.setTime(format.parse(endMonth));
        max.set(max.get(Calendar.YEAR), max.get(Calendar.MONTH), 2);

        Calendar curr = min;
        while (curr.before(max)) {
            list.add(format.format(curr.getTime()));
            curr.add(Calendar.MONTH, 1);
        }
        return list;
    }

    public static String timestamp2date(String timestamp) {
        SimpleDateFormat Format = new SimpleDateFormat("MM-dd HH:mm");
        return Format.format(new Date(Long.valueOf(timestamp+"000")));
    }
}

