package com.ydc.service.parse;

/**
 * Created by ydc on 2019/7/4.
 */
public class FTPTest {

    /**
     * 修改 localLastFileFlag 返回值测试
     * @param args
     */
    public static void main(String[] args) {
        FTPAtpcoAccessor ftpyqyr = new FTPAtpcoAccessor(5, 15, "C:\\Users\\T440\\Desktop\\beans\\", "C:\\Users\\T440\\Desktop\\beans\\process", "YQYR", "ATPCO_YQYR");
        try {
            ftpyqyr.access("192.168.200.143", 21, "sitaftp", "sita_61024", true, ftpyqyr.path("/ATPCO/"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
