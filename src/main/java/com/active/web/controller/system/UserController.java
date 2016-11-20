package com.active.web.controller.system;


import com.active.common.annotation.SystemLog;
import com.active.common.entity.ResUserFormMap;
import com.active.common.entity.UserFormMap;
import com.active.common.entity.UserGroupFormMap;
import com.active.common.entity.UserGroupsFormMap;
import com.active.common.exception.SystemException;
import com.active.common.mapper.UserMapper;
import com.active.util.Common;
import com.active.util.PasswordHelper;
import com.active.web.controller.index.BaseController;
import com.active.web.plugin.PageView;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
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
@RequestMapping("/user/")
public class UserController extends BaseController {
    @Inject
    private UserMapper userMapper;

    @RequestMapping("list")
    public String listUI(Model model) throws Exception {
        model.addAttribute("res", findByRes());
        return Common.BACKGROUND_PATH + "/system/user/list";
    }

    @ResponseBody
    @RequestMapping("findByPage")
    public PageView findByPage(String pageNow,
                               String pageSize) throws Exception {
        UserFormMap userFormMap = getFormMap(UserFormMap.class);
        userFormMap = toFormMap(userFormMap, pageNow, pageSize);
        pageView.setRecords(userMapper.findUserPage(userFormMap));//不调用默认分页,调用自已的mapper中findUserPage
        return pageView;
    }

    @RequestMapping("addUI")
    public String addUI(Model model) throws Exception {
        return Common.BACKGROUND_PATH + "/system/user/add";
    }

    @ResponseBody
    @RequestMapping("addEntity")
    @SystemLog(module = "系统管理", methods = "用户管理-新增用户")//凡需要处理业务逻辑的.都需要记录操作日志
    @Transactional(readOnly = false)//需要事务操作必须加入此注解
    public String addEntity(String txtGroupsSelect) {
        try {
            UserFormMap userFormMap = getFormMap(UserFormMap.class);
            userFormMap.put("txtGroupsSelect", txtGroupsSelect);
            PasswordHelper passwordHelper = new PasswordHelper();
            userFormMap.set("password", "123456");
            passwordHelper.encryptPassword(userFormMap);
            userMapper.addEntity(userFormMap);//新增后返回新增信息
            if (!Common.isEmpty(txtGroupsSelect)) {
                String[] txt = txtGroupsSelect.split(",");
                UserGroupsFormMap userGroupsFormMap = new UserGroupsFormMap();
                for (String roleId : txt) {
                    userGroupsFormMap.put("userId", userFormMap.get("id"));
                    userGroupsFormMap.put("roleId", roleId);
                    userMapper.addEntity(userGroupsFormMap);
                }
            }
        } catch (Exception e) {
            throw new SystemException("添加账号异常");
        }
        return "success";
    }

    @ResponseBody
    @RequestMapping("deleteEntity")
    @Transactional(readOnly = false)//需要事务操作必须加入此注解
    @SystemLog(module = "系统管理", methods = "用户管理-删除用户")//凡需要处理业务逻辑的.都需要记录操作日志
    public String deleteEntity() throws Exception {
        String[] ids = getParaValues("ids");
        for (String id : ids) {
            userMapper.deleteByAttribute("userId", id, UserGroupsFormMap.class);
            userMapper.deleteByAttribute("userId", id, ResUserFormMap.class);
            userMapper.deleteByAttribute("id", id, UserFormMap.class);
        }
        return "success";
    }

    @RequestMapping("editUI")
    public String editUI(Model model) throws Exception {
        String id = getPara("id");
        if (Common.isNotEmpty(id)) {
            model.addAttribute("user", userMapper.findbyFrist("id", id, UserFormMap.class));
        }
        return Common.BACKGROUND_PATH + "/system/user/edit";
    }

    @ResponseBody
    @RequestMapping("editEntity")
    @Transactional(readOnly = false)//需要事务操作必须加入此注解
    @SystemLog(module = "系统管理", methods = "用户管理-修改用户")//凡需要处理业务逻辑的.都需要记录操作日志
    public String editEntity(String txtRolesSelect, String txtGroupsSelect) throws Exception {
        UserFormMap userFormMap = getFormMap(UserFormMap.class);
        userFormMap.put("txtRolesSelect", txtRolesSelect);
        userFormMap.put("txtGroupsSelect", txtGroupsSelect);
        System.out.println("编辑的用户信息为:" + userFormMap.toString());
        userMapper.editEntity(userFormMap);
        userMapper.deleteByAttribute("userId", userFormMap.get("id") + "", UserGroupsFormMap.class);
        userMapper.deleteByAttribute("userId", userFormMap.get("id") + "", UserGroupFormMap.class);
        if (!Common.isEmpty(txtRolesSelect)) {
            String[] txt = txtRolesSelect.split(",");
            for (String roleId : txt) {
                UserGroupsFormMap userGroupsFormMap = new UserGroupsFormMap();
                userGroupsFormMap.put("userId", userFormMap.get("id"));
                userGroupsFormMap.put("roleId", roleId);
                userMapper.addEntity(userGroupsFormMap);
            }
        }
        if (!Common.isEmpty(txtGroupsSelect)) {
            String[] txt = txtGroupsSelect.split(",");
            for (String groupId : txt) {
                UserGroupFormMap userGroupFormMap = new UserGroupFormMap();
                userGroupFormMap.put("userId", userFormMap.get("id"));
                userGroupFormMap.put("groupId", groupId);
                userMapper.addEntity(userGroupFormMap);
            }
        }
        return "success";
    }

    /**
     * 验证账号是否存在
     *
     * @param name
     * @return
     * @author lanyuan Email：mmm333zzz520@163.com date：2014-2-19
     */
    @RequestMapping("isExist")
    @ResponseBody
    public boolean isExist(String name) {
        UserFormMap account = userMapper.findbyFrist("accountName", name, UserFormMap.class);
        if (account == null) {
            return true;
        } else {
            return false;
        }
    }

    @RequestMapping("isExists")
    @ResponseBody
    public boolean isExists(Model model) {
        boolean isExist = true;
        int flag = Integer.parseInt(getPara("flag"));
        String accountName;
        String password;
        UserFormMap userFormMap = new UserFormMap();
        switch (flag) {
            case 1:
                accountName = getPara("username");
                userFormMap.put("accountName", accountName);
                userFormMap = userMapper.findUser(userFormMap);
                if (userFormMap == null) {
                    isExist = false;
                }
                break;
            case 2:
                accountName = getPara("username");
                password = getPara("oldpass");
                userFormMap.put("accountName", accountName);
                userFormMap = userMapper.findUser(userFormMap);
                if (userFormMap == null) {
                    isExist = false;
                } else {
                    // 想要得到 SecurityUtils.getSubject()　的对象．．访问地址必须跟shiro的拦截地址内．不然后会报空指针
                    Subject user = SecurityUtils.getSubject();
                    // 用户输入的账号和密码,,存到UsernamePasswordToken对象中..然后由shiro内部认证对比,
                    // 认证执行者交由ShiroDbRealm中doGetAuthenticationInfo处理
                    // 当以上认证成功后会向下执行,认证失败会抛出异常
                    UsernamePasswordToken token = new UsernamePasswordToken(accountName, password);
                    try {
                        user.login(token);
                    } catch (Exception e) {
                        isExist = false;
                    }
                }
                break;
            case 3:
                try {
                    accountName = getPara("username");
                    password = getPara("newpass");
                    userFormMap.put("accountName", accountName);
                    userFormMap.put("password", password);
                    PasswordHelper passwordHelper = new PasswordHelper();
                    passwordHelper.encryptPassword(userFormMap);
                    userMapper.updateUserPassword(userFormMap);
                } catch (Exception e) {
                    isExist = false;
                }
                break;
            default:
                break;
        }
        return isExist;
    }

    @RequestMapping("setting")
    public String setting(Model model) {
        String userId = getPara("userId");
        UserFormMap userFormMap = new UserFormMap();
        userFormMap.put("id", userId);
        userFormMap = userMapper.findUserById(userFormMap);
        model.addAttribute("userFormMap", userFormMap);
        return Common.BACKGROUND_PATH + "/system/user/setting";
    }
}