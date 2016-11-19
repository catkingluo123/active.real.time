package com.active.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * @author shenlong
 * @Description:${TODO}
 * @date 2016/1/23
 */
public class DominoDateTool {
    private Calendar calendar=Calendar.getInstance();

    public DominoDateTool addDay(int interval){
        calendar.add(Calendar.DAY_OF_YEAR,interval);
        return this;
    }

    public DominoDateTool addMonth(int interval){
        calendar.add(Calendar.MONDAY,interval);
        return this;
    }

    public DominoDateTool add(int field,int interval){
        calendar.add(field,interval);
        return this;
    }

    public String format(String pattern){
        SimpleDateFormat format=new SimpleDateFormat(pattern);
        return format.format(calendar.getTime());
    }

    public static void main(String[] args) {
        String v=new DominoDateTool().add(Calendar.DAY_OF_YEAR,-22).format("yyyyMMdd");
        System.out.println(v);
        String n=new DominoDateTool().add(Calendar.DAY_OF_MONTH,-22).format("yyyy-MM-dd");
        System.out.println(n);
    }


}
