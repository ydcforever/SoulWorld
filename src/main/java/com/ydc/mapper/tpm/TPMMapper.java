package com.ydc.mapper.tpm;

import com.ydc.model.tpm.TPMLine;
import com.ydc.model.tpm.TPMSectorMileage;
import org.apache.ibatis.annotations.Param;

/**
* Created by ydc on 2019/7/1.
*/
public interface TPMMapper {

    public void insert(@Param("line")TPMLine line, @Param("sector")TPMSectorMileage sector);
}
