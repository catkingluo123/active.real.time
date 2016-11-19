package com.active.common.mapper;

import com.active.common.entity.UserLoginFormMap;
import com.active.common.mapper.base.BaseMapper;

import java.util.List;

public interface UserLoginMapper extends BaseMapper {

    public List<UserLoginFormMap> findLoginPage(UserLoginFormMap userLoginFormMap);
}
