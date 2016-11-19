package com.active.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by chenran on 2016/3/19 0019.
 */
public class TaskTypeManager {

    private static final Logger logger = LoggerFactory.getLogger(TaskTypeManager.class);

    public static Map<String,TaskType> taskTypeMap;




    public enum TaskType{
        SHELL,JAVA,HIVESH,RUBY,PYTHON,PHP,SCRIPT,HIVE,MR,HIVEQY,DOS
    }


    static{
        loadDefaultTypes();
    }

    private static void loadDefaultTypes()
    {

        taskTypeMap = new HashMap<String, TaskType>();



        taskTypeMap.put("shell", TaskType.SHELL);
        taskTypeMap.put("java", TaskType.JAVA);
        taskTypeMap.put("hiveSh", TaskType.HIVESH);
        taskTypeMap.put("ruby", TaskType.RUBY);
        taskTypeMap.put("python", TaskType.PYTHON);
        taskTypeMap.put("php", TaskType.PHP);
        taskTypeMap.put("script", TaskType.SCRIPT);
        taskTypeMap.put("hive", TaskType.HIVE);
        taskTypeMap.put("mr", TaskType.MR);
        taskTypeMap.put("hiveQy", TaskType.HIVEQY);
        taskTypeMap.put("dos", TaskType.DOS);






    }

}
