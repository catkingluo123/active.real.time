package com.active.web.controller.system;

import com.active.util.RedisClientPool;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.active.common.annotation.SystemLog;
import com.active.common.entity.*;
import com.active.common.exception.SystemException;
import com.active.common.mapper.*;
import com.active.common.mapper.RoleMapper;
import com.active.common.mapper.UserMapper;
import com.active.util.Common;
import com.active.util.DateTransfer;
import com.active.util.DateUtil;
import com.active.web.controller.index.BaseController;
import com.active.web.plugin.PageView;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import redis.clients.jedis.Jedis;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Administrator on 2016/4/18.
 */

@Controller
@RequestMapping("/dataListener/")
public class BusinessController extends BaseController {

    @Inject
    private RoleMapper roleMapper;

    @Inject
    private UserMapper userMapper;

    @Inject
    private BusinessMapper businessMapper;



    @RequestMapping("regNode")
    public String listUI(Model model) throws Exception {
        model.addAttribute("res", findByRes());
        return Common.BACKGROUND_PATH + "/system/dpReg/list";
    }

    @ResponseBody
    @RequestMapping("findByPage")
    public PageView findByPage(String pageNow,
                               String pageSize) throws Exception {
        Session session = SecurityUtils.getSubject().getSession();
        String userId = session.getAttribute("userSessionId").toString();
        BusinessFormMap businessFormMap = getFormMap(BusinessFormMap.class);
        businessFormMap = toFormMap(businessFormMap, pageNow, pageSize);
        RoleFormMap roleFormMap = new RoleFormMap();
        roleFormMap.put("userId", userId);
        roleFormMap = roleMapper.getRoleId(roleFormMap);
        if (Integer.parseInt(roleFormMap.get("roleId").toString()) == 1 ||
                Integer.parseInt(roleFormMap.get("roleId").toString()) == 3) {
            pageView.setRecords(businessMapper.findByPage(businessFormMap));

        } else {
            businessFormMap.put("userId", userId);
            pageView.setRecords(businessMapper.findByPage(businessFormMap));
        }

        return pageView;
    }





    @RequestMapping("nodeListener")
    public String listListener(Model model) throws Exception {
        model.addAttribute("res", findByRes());
        return Common.BACKGROUND_PATH + "/system/business/listStatus";
    }

    @RequestMapping("showNode")
    public String showNode(Model model) throws Exception{

        String businessType = getPara("business");
        businessType = URLDecoder.decode(businessType, "utf8");
        return Common.BACKGROUND_PATH + "/system/business/showNode";
    }

    @ResponseBody
    @RequestMapping("getLine")
    public String getSubtext(Model model) throws Exception {
        String startday = getPara("startday");
        String endday = getPara("endday");
        RedisClientPool redisClientPool = new RedisClientPool();
        Jedis jedis = redisClientPool.getPool().getResource();
        List<String> dayList = new ArrayList<String>();
        List<String> activeList = new ArrayList<String>();
        List<Ydata> ydatas = new ArrayList<Ydata>();
        Date a1 = new SimpleDateFormat("yyyyMMdd").parse(startday);
        Date b1 = new SimpleDateFormat("yyyyMMdd").parse(endday);
        long day = (b1.getTime()-a1.getTime())/(24*60*60*1000);
        dayList.add(startday);
        dayList.add(startday);
        activeList.add(String.valueOf(jedis.pfcount(startday)));
        Ydata ydata = new Ydata("line");
        ydata.setName("活跃数");
        for (int i=1;i<=day;i++){
            String for_day = DateTransfer.getDate(startday, 1, i);
            dayList.add(for_day);
            activeList.add(String.valueOf(jedis.pfcount(for_day)));
        }
        jedis.close();
        ydata.setData(activeList);
        ydatas.add(ydata);
        Line line = new Line();
        line.setLegend(dayList);
        line.setXdata(dayList);
        line.setYdata(ydatas);
        Gson gson = new Gson();
        return gson.toJson(line);
    }


}
