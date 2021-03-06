package com.active.common.mapper;

import com.active.common.entity.ResFormMap;
import com.active.common.mapper.base.BaseMapper;

import java.util.List;

public interface ResourcesMapper extends BaseMapper {
	public List<ResFormMap> findChildlists(ResFormMap map);

	public List<ResFormMap> findRes(ResFormMap map);

	public void updateSortOrder(List<ResFormMap> map);
	
	public List<ResFormMap> findUserResourcess(String userId);
	
}
