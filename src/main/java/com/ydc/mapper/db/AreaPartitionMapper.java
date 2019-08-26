package com.ydc.mapper.db;

import com.ydc.model.db.AreaPartition;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by T440 on 2019/2/8.
 */
public interface AreaPartitionMapper {

    public AreaPartition queryAreaPartition(String airportCode);

    public List<AreaPartition> queryAreaPartitions(@Param("list") List<String> list);
}
