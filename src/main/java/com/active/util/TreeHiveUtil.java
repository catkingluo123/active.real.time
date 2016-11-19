package com.active.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by chenran on 2015/11/12 0012.
 */
public class TreeHiveUtil {

    private static final Logger logger = LoggerFactory.getLogger(TreeUtil.class);

    private List<TreeObject> dbList = new LinkedList<TreeObject>();

    private List<TreeObject> tbList = new LinkedList<TreeObject>();

    private List<TreeObject> opeList = new LinkedList<TreeObject>();

    public List<TreeObject> getPermissionsToShowTreeList(List<TreeObject> list){
        List<TreeObject> result = new LinkedList<TreeObject>();
        for(TreeObject t:list){
            if(t.getDbId() != 0){
                dbList.add(t);
            }else if(t.getDbId() == 0 && t.getTbId() != 0){
                tbList.add(t);
            }else{
                opeList.add(t);
            }
        }
        logger.debug("dbList: " + dbList.size() + " tbList: " + tbList.size() + " opeList: " + opeList.size());
        for(TreeObject t:dbList){
            for(TreeObject t1 : tbList){
                if(t1.getParentId().intValue() == t.getDbId().intValue()){
                    t.getChildren().add(t1);
                    for(TreeObject t2 : opeList){
                        if(t2.getParentId().intValue() == t1.getTbId()){
                            t1.getChildren().add(t2);
                        }
                    }
                }
            }

        }
        for(TreeObject t:dbList) {
            result.add(t);
        }

        logger.debug("getPermissionsToShowTreeList results is " + result.size());

        return result;


    }

}
