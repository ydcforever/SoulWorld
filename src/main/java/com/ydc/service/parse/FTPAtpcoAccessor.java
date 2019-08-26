package com.ydc.service.parse;

import com.fate.file.transfer.FTPAccessor;
import org.apache.commons.net.ftp.FTPFile;

import java.io.File;
import java.util.Calendar;

/**
 * Created by ydc on 2019/7/3.
 */
public class FTPAtpcoAccessor extends FTPAccessor {

    private int startIndex;

    private int endIndex;

    private String downloadPath;

    private String progressPath;

    private String feature;

    private String noFileMessage;

    private File progressFolder;

    public FTPAtpcoAccessor(int startIndex, int endIndex, String downloadPath, String progressPath, String feature, String noFileMessage) {
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.progressPath = progressPath;
        this.downloadPath = downloadPath;
        this.feature = feature;
        this.noFileMessage = noFileMessage;
        check();
    }

    @Override
    protected boolean isTargetFTPFile(FTPFile file) {
        String fileName = file.getName();
        return fileName.startsWith(feature);
    }

    @Override
    public Object localLastFileFlag() {
        progressFolder = new File(progressPath);
        File[] files = progressFolder.listFiles();
        long result = 0;
        if (files != null && files.length > 0) {
            String latestFileName = files[0].getName();
            result = Long.parseLong(latestFileName.substring(startIndex, endIndex));
        }
//        return result;
        return (long) 1907042200;
    }

    @Override
    public Object FTPFileFlag(FTPFile file) {
        String remoteFileName = file.getName();
        return Long.parseLong(remoteFileName.substring(startIndex, endIndex));
    }

    @Override
    protected boolean selector(Object localFlag, Object ftpFlag) {
        Long l = (Long) localFlag;
        Long f = (Long) ftpFlag;
        return f > l;
    }

    @Override
    protected void noFileFound() throws IllegalStateException {
        Calendar c = Calendar.getInstance();
        int today = c.get(Calendar.DATE);
        int hour = c.get(Calendar.HOUR_OF_DAY);
        //最后一份文件出现的时间23点，如果没找到，则今天没文件
        if (hour == 23 && today != Integer.valueOf(String.valueOf(localLastFileFlag()).substring(4, 6))) {
            throw new IllegalStateException("No " + noFileMessage + " data file was found for today.");
        }
    }

    public String[] path(String root) {
        String p1, p2;
        Calendar c = Calendar.getInstance();
        c.setTimeInMillis(System.currentTimeMillis());
        int m = c.get(Calendar.MONTH) + 1;
        p1 = c.get(Calendar.YEAR) + (m < 10 ? "/0" : "/") + m;

        c.add(Calendar.MONTH, -1);
        m = c.get(Calendar.MONTH) + 1;
        p2 = c.get(Calendar.YEAR) + (m < 10 ? "/0" : "/") + m;

        String[] p = new String[2];
        p[0] = root + p2;
        p[1] = root + p1;
        return p;
    }

    public void check() {
        progressFolder = folderBuilder(progressPath);
        folderBuilder(downloadPath);
        folderBuilder(downloadPath + "unzip/");
    }

    @Override
    public String downloadPath() {
        return downloadPath;
    }
}
