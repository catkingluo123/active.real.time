package com.active.util;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by chenran on 2015/11/13 0013.
 */
public class UserHiveName {
    private String dbName;
    private LinkedHashMap<String,String> tbNameAndConditionMap;


    public String getDbName() {
        return dbName;
    }

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    public Map<String, String> getTbNameAndConditionMap() {
        return tbNameAndConditionMap;
    }

    public void setTbNameAndConditionMap(LinkedHashMap<String, String> tbNameAndConditionMap) {
        this.tbNameAndConditionMap = tbNameAndConditionMap;
    }

    @Override
    public String toString() {
        return "HiveInfo{" +
                "dbName='" + dbName + '\'' +
                ", tbNameAndConditionMap=" + tbNameAndConditionMap +
                '}';
    }
}
