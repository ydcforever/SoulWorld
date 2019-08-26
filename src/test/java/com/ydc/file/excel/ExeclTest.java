package com.ydc.file.excel;

import com.fate.file.excel.AutoBean;
import com.fate.file.excel.ReadExcel;
import com.fate.file.excel.WriteExcel;
import com.ydc.test.model.User;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by fate on 2019/6/9.
 */
public class ExeclTest {

    @Test
    public void read() {
        List<AutoBean> list = ReadExcel.defaultReadExcel("C:\\Users\\T440\\Desktop\\2019-05-05area_partition更新机场.xlsx", 0);
        System.out.println(list.get(2).getValue("0"));
    }

    @Test
    public void write() {
        List<User> a = new ArrayList<User>();
        a.add(new User("yyd", "123"));
        a.add(new User("cc", "124"));
        WriteExcel.defaultWriteExcel("C:\\Users\\T440\\Desktop\\KK.xls", "Test", a);
    }
}
