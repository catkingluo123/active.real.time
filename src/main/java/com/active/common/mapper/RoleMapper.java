package com.active.common.mapper;

import com.active.common.entity.RoleFormMap;
import com.active.common.mapper.base.BaseMapper;

import java.util.List;

public interface RoleMapper extends BaseMapper {
	public List<RoleFormMap> seletUserRole(RoleFormMap map);
	
	public void deleteById(RoleFormMap map);

	public RoleFormMap getRoleId(RoleFormMap roleFormMap);
}
