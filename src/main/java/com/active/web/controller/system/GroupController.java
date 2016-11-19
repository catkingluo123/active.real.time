package com.active.web.controller.system;

import com.active.common.annotation.SystemLog;
import com.active.common.entity.GroupFormMap;
import com.active.common.entity.RoleFormMap;
import com.active.common.mapper.GroupMapper;
import com.active.util.Common;
import com.active.web.controller.index.BaseController;
import com.active.web.plugin.PageView;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by chenran on 2015/11/9 0009.
 */

@Controller
@RequestMapping("/groups/")
public class GroupController extends BaseController {
    @Inject
    private GroupMapper groupMapper;

    @RequestMapping("list")
    public String listUI(Model model) throws Exception {
        model.addAttribute("res", findByRes());
        return Common.BACKGROUND_PATH + "/system/group/list";
    }

    @ResponseBody
    @RequestMapping("findByPage")
    public PageView findByPage(String pageNow,
                               String pageSize) throws Exception {
        GroupFormMap groupFormMap = getFormMap(GroupFormMap.class);
        groupFormMap = toFormMap(groupFormMap, pageNow, pageSize);
        pageView.setRecords(groupMapper.findByPage(groupFormMap));
        return pageView;
    }

    @RequestMapping("addUI")
    public String addUI(Model model) throws Exception {
        return Common.BACKGROUND_PATH + "/system/group/add";
    }

    @ResponseBody
    @RequestMapping("addEntity")
    @Transactional(readOnly = false)//需要事务操作必须加入此注解
    @SystemLog(module = "系统管理", methods = "组管理-新增组")//凡需要处理业务逻辑的.都需要记录操作日志
    public String addEntity() throws Exception {
        GroupFormMap groupFormMap = getFormMap(GroupFormMap.class);
        groupMapper.addEntity(groupFormMap);
        return "success";
    }

    @ResponseBody
    @RequestMapping("deleteEntity")
    @Transactional(readOnly = false)//需要事务操作必须加入此注解
    @SystemLog(module = "系统管理", methods = "组管理-删除组")//凡需要处理业务逻辑的.都需要记录操作日志
    public String deleteEntity() throws Exception {
        String[] ids = getParaValues("ids");
        for (String id : ids) {
            groupMapper.deleteByAttribute("id", id, RoleFormMap.class);
        }
        return "success";
    }

    @RequestMapping("editUI")
    public String editUI(Model model) throws Exception {
        String id = getPara("id");
        if (Common.isNotEmpty(id)) {
            model.addAttribute("group", groupMapper.findbyFrist("id", id, GroupFormMap.class));
        }
        return Common.BACKGROUND_PATH + "/system/group/edit";
    }

    @ResponseBody
    @RequestMapping("editEntity")
    @Transactional(readOnly = false)//需要事务操作必须加入此注解
    @SystemLog(module = "系统管理", methods = "组管理-修改组")//凡需要处理业务逻辑的.都需要记录操作日志
    public String editEntity() throws Exception {
        GroupFormMap groupFormMap = getFormMap(GroupFormMap.class);
        groupMapper.editEntity(groupFormMap);
        return "success";
    }


    @RequestMapping("selGroup")
    public String selectGroup(Model model) throws Exception {
        GroupFormMap groupFormMap = getFormMap(GroupFormMap.class);
        Object userId = groupFormMap.get("userId");
        if (null != userId) {
            List<GroupFormMap> list = groupMapper.seletUserGroup(groupFormMap);
            String ugid = "";
            for (GroupFormMap ml : list) {
                ugid += ml.get("id") + ",";
            }
            ugid = Common.trimComma(ugid);
            model.addAttribute("txtGroupsSelect", ugid);
            model.addAttribute("userGroup", list);
            if (StringUtils.isNotBlank(ugid)) {
                groupFormMap.put("where", " where id not in (" + ugid + ")");
            }
        }
        List<GroupFormMap> groups = groupMapper.findByWhere(groupFormMap);
        model.addAttribute("group", groups);
        return Common.BACKGROUND_PATH + "/system/user/groupSelect";
    }

}
