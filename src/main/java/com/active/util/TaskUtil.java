package com.active.util;

import org.apache.commons.lang.StringUtils;

/**
 * Created by chenran on 2015/12/3 0003.
 */
public class TaskUtil {

    public static final String getEnv(String envKey,String defaultValue){
        if(StringUtils.isBlank(envKey)){
            return defaultValue;
        }
        String envName = System.getenv(envKey);
        if(StringUtils.isBlank(envName)){
            return defaultValue;
        }
        return envName;
    }

}
