package com.active.web.controller.system;

import com.active.common.entity.UserLoginFormMap;
import com.active.common.mapper.UserLoginMapper;
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
@RequestMapping("/userlogin/")
public class UserLoginController extends BaseController {
    @Inject
    private UserLoginMapper userLoginMapper;

    @RequestMapping("listUI")
    public String listUI(Model model) throws Exception {
        return Common.BACKGROUND_PATH + "/system/userlogin/list";
    }

    @ResponseBody
    @RequestMapping("findByPage")
    public PageView findByPage(String pageNow,
                               String pageSize) throws Exception {
        UserLoginFormMap userLoginFormMap = getFormMap(UserLoginFormMap.class);
        userLoginFormMap = toFormMap(userLoginFormMap, pageNow, pageSize);
        pageView.setRecords(userLoginMapper.findLoginPage(userLoginFormMap));
        return pageView;
    }

}