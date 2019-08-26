package com.ydc.service.db;

import com.ydc.model.db.DBTable;

import java.util.List;
import java.util.Map;

/**
 * Created by T440 on 2018/4/26.
 */
public interface DBTableService {

    public List<String> queryTables();

    public List<String> queryColumns(String tableName);

    public List<DBTable> queryTableInfo(String tableName);

    public List<Map> querySQL(String sql);
}
