package com.active.web.controller.system;

import com.active.common.entity.LogFormMap;
import com.active.common.mapper.LogMapper;
import com.active.util.Common;
import com.active.web.controller.index.BaseController;
import com.active.web.plugin.PageView;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;

/**
 * @author lanyuan 2014-11-19
 * @version 3.0v
 * @Email: mmm333zzz520@163.com
 */
@Controller
@RequestMapping("/log/")
public class LogController extends BaseController {
    @Inject
    private LogMapper logMapper;

    @RequestMapping("list")
    public String listUI(Model model) throws Exception {
        return Common.BACKGROUND_PATH + "/system/log/list";
    }

    @ResponseBody
    @RequestMapping("findByPage")
    public PageView findByPage(String pageNow,
                               String pageSize) throws Exception {
        LogFormMap logFormMap = getFormMap(LogFormMap.class);
        logFormMap = toFormMap(logFormMap, pageNow, pageSize);
        pageView.setRecords(logMapper.findLogPage(logFormMap));
        return pageView;
    }
}