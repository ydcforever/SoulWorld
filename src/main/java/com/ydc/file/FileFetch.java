package com.ydc.file;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by ydc on 2019/6/17.
 */
public class FileFetch extends Thread{

    private SiteInfoBean siteInfoBean; // 文件信息 Bean

    private long[] nStartPos; // 开始位置

    private long[] nEndPos; // 结束位置

    FilePieceFetch[] filePieceFetch; // 子线程对象

    long nFileLength; // 文件长度

    boolean firstDownload = true;

    boolean stopDownload = false;

    File tmpFile; // 文件下载的临时信息

    DataOutputStream output; // 输出到文件的输出流

    int pieces;

    public FileFetch(SiteInfoBean bean) throws IOException {
        siteInfoBean = bean;
        tmpFile = new File(bean.getFilePath() + File.separator + bean.getFileName() + ".tmp");
        if (tmpFile.exists()) {
            firstDownload = false;
            continueDownload();
        } else {
            pieces = bean.getPieces();
            nStartPos = new long[pieces];
            nEndPos = new long[pieces];
        }
    }

    public void run() {
        // 获得文件长度
        // 分割文件
        // 实例 FilePieceFetch
        // 启动 FilePieceFetch 线程
        // 等待子线程返回
        try {
            if (firstDownload) {
                nFileLength = getFileSize();
                if (nFileLength == -1) {
                    System.err.println("File Length is not known!");
                } else if (nFileLength == -2) {
                    System.err.println("File is not access!");
                } else {
                    initPiece(nFileLength);
                }
            }
            // 启动子线程
            filePieceFetch = new FilePieceFetch[pieces];
            for (int i = 0; i < pieces; i++) {
                filePieceFetch[i] = new FilePieceFetch(siteInfoBean.getSiteURL(),
                        siteInfoBean.getFilePath() + File.separator + siteInfoBean.getFileName(),
                        nStartPos[i], nEndPos[i], i);
                filePieceFetch[i].start();
            }

            while (!stopDownload || !checkDownOver()) {
                savePosition();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 获得文件长度
    public long getFileSize() {
        int nFileLength = -1;
        try {
            URL url = new URL(siteInfoBean.getSiteURL());
            HttpURLConnection httpConnection = (HttpURLConnection) url.openConnection();
            httpConnection.setRequestProperty("User-Agent", "NetFox");
            int responseCode = httpConnection.getResponseCode();
            if (responseCode >= 400) {
                return -2;
            }
            String sHeader;
            for (int i = 1; ; i++) {
                sHeader = httpConnection.getHeaderFieldKey(i);
                if (sHeader != null) {
                    if (sHeader.equals("Content-Length")) {
                        nFileLength = Integer.parseInt(httpConnection.getHeaderField(sHeader));
                        break;
                    }
                } else
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return nFileLength;
    }

    private void initPiece(Long len) {
        for (int i = 0; i < pieces; i++) {
            nStartPos[i] = (long) (i * (nFileLength / pieces));
        }
        for (int i = 0 ; i < pieces - 1; i++) {
            nEndPos[i] = nStartPos[i + 1];
        }
        nEndPos[nEndPos.length - 1] = nFileLength;
    }

    private boolean checkDownOver() {
        for (int i = 0; i < pieces; i++) {
            if (!filePieceFetch[i].downOver) {
               return false;
            }
        }
        return true;
    }

    // 保存下载信息（文件指针位置）
    private void savePosition() {
        try {
            output = new DataOutputStream(new FileOutputStream(tmpFile));
            output.writeInt(pieces);
            for (int i = 0; i < pieces; i++) {
                output.writeLong(filePieceFetch[i].startPos);
                output.writeLong(filePieceFetch[i].endPos);
            }
            output.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 读取保存的下载信息（文件指针位置）
    private void continueDownload() {
        try {
            DataInputStream input = new DataInputStream(new FileInputStream(tmpFile));
            int cnt = input.readInt();
            nStartPos = new long[cnt];
            nEndPos = new long[cnt];
            for (int i = 0; i < cnt; i++) {
                nStartPos[i] = input.readLong();
                nEndPos[i] = input.readLong();
            }
            input.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 停止文件下载
    public void fileStop() {
        stopDownload = true;
        for (int i = 0; i < pieces; i++)
            filePieceFetch[i].stopDown();
    }
}
