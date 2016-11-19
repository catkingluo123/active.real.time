package com.active.common.mapper;

import com.active.common.entity.UserFormMap;
import com.active.common.mapper.base.BaseMapper;

import java.util.List;

public interface UserMapper extends BaseMapper {

	public List<UserFormMap> findUserPage(UserFormMap userFormMap);

	public List<UserFormMap> findUserAllInfo(UserFormMap userFormMap);

	public UserFormMap getUserPost(UserFormMap userFormMap);

	public UserFormMap findUser(UserFormMap userFormMap);

	public UserFormMap findUserById(UserFormMap userFormMap);

	public boolean updateUserPassword(UserFormMap userFormMap);

	public UserFormMap findUserName(UserFormMap userFormMap);


	
}
