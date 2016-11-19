package com.active.common.mapper;

import com.active.common.entity.GroupFormMap;
import com.active.common.mapper.base.BaseMapper;

import java.util.List;

/**
 * Created by chenran on 2015/11/9 0009.
 */
public interface GroupMapper extends BaseMapper {
    public List<GroupFormMap> seletUserGroup(GroupFormMap map);
}
