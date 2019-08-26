package com.ydc.mapper.mpm;

import com.ydc.model.mpm.MPMHeader;
import java.util.List;

public interface MPMHeaderMapper {
	
	public int count();
	
	public void batchInsert(List<MPMHeader> mpmHeaders);
	
	public void insert(MPMHeader mpmHeader);

}
