package com.ydc.service.db;

import com.ydc.mapper.db.DBTableMapper;
import com.ydc.model.db.DBTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by T440 on 2018/4/26.
 */
@Service("dbTableService")
public class DBTableServiceImpl implements DBTableService {

    @Autowired
    DBTableMapper dbTableMapper;

    @Override
    public List<String> queryTables() {
        return dbTableMapper.queryTables();
    }

    @Override
    public List<String> queryColumns(String tableName) {
        return dbTableMapper.queryColumns(tableName);
    }

    @Override
    public List<DBTable> queryTableInfo(String tableName) {
        return dbTableMapper.queryTableInfo(tableName);
    }

    @Override
    public List<Map> querySQL(String sql) {
        return dbTableMapper.querySQL(sql);
    }
}
