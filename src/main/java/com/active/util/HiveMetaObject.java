package com.active.util;

/**
 * Created by chenran on 2015/11/11 0011.
 * 此类用于保存Hive元数据库中的信息，用户权限根据相应的json串自己来定
 */
public class HiveMetaObject {
    private int dbId;
    private String dbName;
    private int parentId;
    private int tbId;
    private String tbName;
    private int operationValue;

    public int getOperationValue() {
        return operationValue;
    }

    public void setOperationValue(int operationValue) {
        this.operationValue = operationValue;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public int getDbId() {
        return dbId;
    }

    public void setDbId(int dbId) {
        this.dbId = dbId;
    }

    public String getDbName() {
        return dbName;
    }

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    public int getTbId() {
        return tbId;
    }

    public void setTbId(int tbId) {
        this.tbId = tbId;
    }

    public String getTbName() {
        return tbName;
    }

    public void setTbName(String tbName) {
        this.tbName = tbName;
    }

    static enum OperationType{
        SELECT,INSERT,LOAD,MODIFY
    }

    @Override
    public String toString() {
        return "HiveMetaObject{" +
                "dbId=" + dbId +
                ", dbName='" + dbName + '\'' +
                ", parentId=" + parentId +
                ", tbId=" + tbId +
                ", tbName='" + tbName + '\'' +
                ", operationValue=" + operationValue +
                '}';
    }
}


