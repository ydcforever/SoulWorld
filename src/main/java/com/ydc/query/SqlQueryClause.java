package com.ydc.query;

import java.util.List;

/**
 * Created by T440 on 2018/7/6.
 */
public class SqlQueryClause {
    protected String orderByClause;

    protected boolean distinct;

    protected List<SqlCondition> sqlConditions;

    protected String sqlIn;

    protected PagingObject pagingObject;

    public SqlQueryClause(){
        super();
    }
}
