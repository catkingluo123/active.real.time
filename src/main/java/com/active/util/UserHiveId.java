package com.active.util;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by chenran on 2015/11/13 0013.
 */
public class UserHiveId {

    private String dbId;
    private LinkedHashMap<String,String> tbIdAndConditionMap;


    public String getDbId() {
        return dbId;
    }

    public void setDbId(String dbId) {
        this.dbId = dbId;
    }

    public Map<String, String> getTbIdAndConditionMap() {
        return tbIdAndConditionMap;
    }

    public void setTbIdAndConditionMap(LinkedHashMap<String, String> tbIdAndConditionMap) {
        this.tbIdAndConditionMap = tbIdAndConditionMap;
    }

    @Override
    public String toString() {
        return "HiveInfo{" +
                "dbName='" + dbId + '\'' +
                ", tbNameAndConditionMap=" + tbIdAndConditionMap +
                '}';
    }
}
