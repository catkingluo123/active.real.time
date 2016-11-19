package com.active.util;

import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * @author shenlong
 * @Description:${TODO}
 * @date 2015/11/20
 */
public class ScheduleUtils {

    public static String mapToString(Map<String,String> map){
        if(map==null||map.size()==0){
            return null;
        }
        JSONObject o=new JSONObject();
        for(String key:map.keySet()){
            o.put(key,map.get(key));
        }
        return o.toString();
    }

    public static Map<String,String> strToMap(String str){
        if(str==null||str.length()==0){
            return new HashMap<String, String>();
        }
        Map<String,String> map=new HashMap<String, String>();
        JSONObject o=JSONObject.fromObject(str);
        for(Object key:o.keySet()){
            String value = o.getString(key.toString());
            if(Common.isNotEmpty(value))
                map.put(key.toString(),value);
        }
        return map;
    }

//    public static List<Map<>>
}
