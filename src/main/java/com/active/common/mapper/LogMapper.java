package com.active.common.mapper;

import com.active.common.entity.LogFormMap;
import com.active.common.mapper.base.BaseMapper;

import java.util.List;

public interface LogMapper extends BaseMapper {
    public List<LogFormMap> findLogPage(LogFormMap logFormMap);
}
