package com.ydc.mapper.db;
import com.ydc.model.db.DBTable;

import java.util.List;
import java.util.Map;

public interface DBTableMapper {

	public List<String> queryTables();

	public List<String> queryColumns(String tableName);

	public List<DBTable> queryTableInfo(String tableName);

	public List<Map> querySQL(String sql);
	
}
