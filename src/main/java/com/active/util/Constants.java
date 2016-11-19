package com.active.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * Created by chenran on 2015/12/10 0010.
 */
public class Constants {

    public static final Properties prop = new Properties();
    public static final String HADOOP_CORE_SITE_FILE_PATH = "hadoop.core.site.file.path";
    public static final String HADOOP_HDFS_SITE_FILE_PATH = "hadoop.hdfs.site.file.path";
    public static final String SCRIPT_EXEC_PATH = "script_exec_path";
    public static final String SCRIPT_CONDITION = "script_conditions";

    public static final String SCRIPT_PARAMS = "script_params";
    public static final String HIVE_SCRIPT_TYPE = "hive_script_type";
    public static final String SUCCESS = "success";
    public static final String CRONNAME_PREFIX = "cron_";
    public static final String USER_ID_IN_SESSION = "userSessionId";
    public static final String DEFAULT_CRON_GROUP_NAME = "domino";
    public static final String TASK_LOG_MAX_LENGTH = "task.log.max.length";
    public static final String NEWLINE_SIGN;
    public static final String UPLOAD_FILE_PATH = "/tmp/domino/upload";
    public static final String UPLOAD_HDFS_FILE_PATH = "/user/domino/upload/";
    public static final String TASK_RESULT_HDFS_PATH = "/user/domino/result/";
    public static final String TASK_RESULT_LOCAL_PATH = "/home/domino/result";
    public static final String DOMINO_LOG_EXCEED_MAX_LENGTH = "任务日志超过大小限制，后续日志内容已忽略，请调节相关参数!";
    public static final String DOMINO_LOG_TASK_SUCCESS = "任务执行完毕，执行成功!";
    public static final String DOMINO_LOG_TASK_FAILED = "任务执行完毕，执行时出现错误，请查看相关的异常信息!";


    static {
        NEWLINE_SIGN = System.getProperty("line.separator", "\n");
        InputStream is = Constants.class.getClassLoader()
                .getResourceAsStream("init.properties");
        try {
            prop.load(is);
            if (is != null)
                is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getProperty(String key) {
        return prop.getProperty(key);
    }

    public static String getProperty(String key, String defaultValue) {
        String value = prop.getProperty(key);
        if (Common.isNotEmpty(value)) {
            return value;
        }
        return defaultValue;
    }


    //标识数据源类型
    public static final int MYSQL = 1;
    public static final int HIVE = 2;
    public static final int GREENPLUM = 3;
    public static final String JDBC_URL_PREFIX = "jdbc:mysql://";
    public static final String JDBC_URL_MYSQL_SUFFIX = "/information_schema?useUnicode=true&characterEncoding=UTF-8";
    public static final String JDBC_URL_HIVE_SUFFIX = "/hiveMeta?useUnicode=true&characterEncoding=UTF-8";
    public static final String MYSQL_META_DB_NAME = "information_schema";
    public static final String MYSQL_SYSTEM_DB_NAME = "mysql";
    public static final String TEST_IF_POSSIBLE = "test";
    public static final List<String> needFilterDbNames = new ArrayList<String>();
    public static final String MANAGED_TABLE = "MANAGED_TABLE";
    public static final String EXTERNAL_TABLE = "EXTERNAL_TABLE";

    static {
        needFilterDbNames.add(MYSQL_META_DB_NAME);
        needFilterDbNames.add(MYSQL_SYSTEM_DB_NAME);
        needFilterDbNames.add(TEST_IF_POSSIBLE);
    }


    public static final String GET_MYSQL_DBS = "select SCHEMA_NAME  from information_schema.SCHEMATA ";

    public static final String GET_HIVE_DBS = "select t.DESC,t.NAME from hiveMeta.DBS t";

    public static final String GET_MYSQL_TBL_BY_DBNAME = "select table_name,create_time,update_time,\" +\n" +
            "                                \"table_comment from information_schema.tables where TABLE_SCHEMA = ?";

    public static final String GET_HIVE_TBL_BY_DBNAME = "select t.db_id from hiveMeta.DBS t where t.name = ?";

    public static final String GET_HIVE_TBL_BY_DBID = "select t.tbl_id,t.create_time,t.tbl_name,t.tbl_type,\n" +
            "(select param_value from hiveMeta.TABLE_PARAMS where TBL_ID = t.tbl_id and param_key = 'transient_lastDdlTime') as modify_time,\n" +
            "(select param_value from hiveMeta.TABLE_PARAMS where TBL_ID = t.tbl_id and param_key = 'comment') as comment \n" +
            "from (select tbl_id,create_time,tbl_name,tbl_type from hiveMeta.TBLS where db_id = ? ) t ";

    public static final String GET_MYSQL_COL_BY_TBLNAME = "select COLUMN_NAME,COLUMN_TYPE,COLUMN_COMMENT,\" +\n" +
            "                                    \"COLUMN_KEY from information_schema.COLUMNS WHERE TABLE_NAME = ?" +
            "                                     order by ORDINAL_POSITION ";

    /*public static void main(String[] args){
        System.out.println(prop.toString());
    }*/




    public static final String METADATA_CACHE_UPDATE = "METADATA_CACHE_UPDATE";
}
