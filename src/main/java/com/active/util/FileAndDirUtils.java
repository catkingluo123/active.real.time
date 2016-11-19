package com.active.util;

import org.apache.commons.lang.StringUtils;
import org.springframework.util.Assert;

import java.io.File;

/**
 * Created by chenran on 2015/11/30 0030.
 */
public class FileAndDirUtils {

    public static final String FILE_SEPARATOR = System.getProperty("file.separator");

    public static String completeFilePathIfNecessary(String path){
        if(StringUtils.isBlank(path)){
            return "";
        }
        if(path.lastIndexOf(FILE_SEPARATOR) > 0){
            return path;
        }
        path += path + FILE_SEPARATOR;
        return path;
    }

    public static String getFileNameFromAbsolutePath(String absolutePath){
        Assert.notNull(absolutePath,"absolutePath must have a value!!");
        final String fileName = absolutePath.substring(absolutePath.lastIndexOf(FILE_SEPARATOR) + 1);
        return fileName;
    }

    public static boolean deleteFolder(String sPath) {
        boolean flag = false;
        File file = new File(sPath);

        if (!file.exists()) {
            return flag;
        } else {

            if (file.isFile()) {
                return deleteFile(sPath);
            } else {
                return deleteDirectory(sPath);
            }
        }
    }

    public static boolean deleteFile(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        if (file.isFile() && file.exists()) {
            file.delete();
            flag = true;
        }
        return flag;
    }

    public static boolean deleteDirectory(String sPath) {

        if (!sPath.endsWith(FILE_SEPARATOR)) {
            sPath = sPath + FILE_SEPARATOR;
        }
        File dirFile = new File(sPath);

        if (!dirFile.exists() || !dirFile.isDirectory()) {
            return false;
        }
        boolean flag = true;
        File[] files = dirFile.listFiles();
        for (int i = 0; i < files.length; i++) {
            if (files[i].isFile()) {
                flag = deleteFile(files[i].getAbsolutePath());
                if (!flag) break;
            }
            else {
                flag = deleteDirectory(files[i].getAbsolutePath());
                if (!flag) break;
            }
        }
        if (!flag) return false;
        if (dirFile.delete()) {
            return true;
        } else {
            return false;
        }
    }
}
