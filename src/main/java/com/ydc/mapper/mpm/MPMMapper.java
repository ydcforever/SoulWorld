package com.ydc.mapper.mpm;

import com.ydc.model.mpm.MPM;
import java.util.List;

public interface MPMMapper {

	public void batchInsert(List<MPM> mpms);

	public void insert(MPM mpm);
}
