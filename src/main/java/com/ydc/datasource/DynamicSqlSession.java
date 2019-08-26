package com.ydc.datasource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;

/**
 * Created by ydc on 2019/8/11.
 */
public class DynamicSqlSession extends SqlSessionTemplate {

    public DynamicSqlSession(SqlSessionFactory sqlSessionFactory) {
        super(sqlSessionFactory);
    }
}
