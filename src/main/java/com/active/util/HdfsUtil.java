package com.active.util;

import org.apache.commons.lang.StringUtils;

/**
 * Created by chenran on 2015/11/27 0027.
 */
public class HdfsUtil {
    public static final String HADOOP_FS_PUT = "hadoop fs -put ";
    public static final String HADOOP_FS_GET = "hadoop fs -get ";


    public static String downloadFromHdfs(String srcPath,String destPath){
        if(StringUtils.isBlank(srcPath) || StringUtils.isBlank(destPath)){
            return null;
        }
        return HADOOP_FS_GET + srcPath + " " + destPath;
    }


    public static String uploadToHdfs(String srcPath,String destPath){
        if(StringUtils.isBlank(srcPath) || StringUtils.isBlank(destPath)){
            return null;
        }
        return HADOOP_FS_PUT + srcPath + " " + destPath;
    }




}
