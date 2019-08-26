package com.ydc.sql;

import com.ydc.mapper.db.DBTableMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;
import java.util.Map;

/**
 * Created by ydc on 2019/7/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class UserDefineSQL {

    @Autowired
    private DBTableMapper dbTableMapper;

    @Test
    public void test(){
        List<Map> list = dbTableMapper.querySQL("select table_name from user_tables");
        System.out.println(list.get(0).get("TABLE_NAME"));
    }

    @Test
    public void test2(){
        List<String> list = dbTableMapper.queryTables();
        System.out.println(list.size());
    }
}
