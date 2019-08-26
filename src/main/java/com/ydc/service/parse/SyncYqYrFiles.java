package com.ydc.service.parse;

/**
 * Created by ydc on 2019/7/11.
 */
//@Service
public class SyncYqYrFiles {

    private FTPAtpcoAccessor ftpAtpcoAccessor = new FTPAtpcoAccessor(5, 15, "C:\\Users\\T440\\Desktop\\beans\\",
            "C:\\Users\\T440\\Desktop\\beans\\process", "YQYR", "ATPCO_YQYR");

    private YQYRUnzip yqyrUnzip = new YQYRUnzip();

    public void doTask() throws Exception {
        ftpAtpcoAccessor.access("192.168.200.143", 21, "sitaftp", "sita_61024", true, ftpAtpcoAccessor.path("/ATPCO/"));
        yqyrUnzip.process(ftpAtpcoAccessor.downloadPath(), "C:\\Users\\T440\\Desktop\\beans\\unzip");
    }

    public static void main(String[] args) throws Exception {
        SyncYqYrFiles syncYqYrFiles = new SyncYqYrFiles();
        syncYqYrFiles.doTask();
    }
}
