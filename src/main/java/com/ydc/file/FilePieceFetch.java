package com.ydc.file;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by ydc on 2019/6/17.
 */
public class FilePieceFetch extends Thread {
    String url;

    long startPos;

    long endPos;

    int threadID;

    boolean downOver = false;

    boolean stopDown = false;

    FileAccessI fileAccessI;

    public FilePieceFetch(String url, String name, long start, long end, int id)
            throws IOException {
        this.url = url;
        this.startPos = start;
        this.endPos = end;
        this.threadID = id;
        fileAccessI = new FileAccessI(name, startPos);
    }

    public void run() {
        while (startPos < endPos && !stopDown) {
            try {
                URL nURL = new URL(url);
                HttpURLConnection httpConnection = (HttpURLConnection) nURL.openConnection();
                httpConnection.setRequestProperty("User-Agent", "NetFox");
                String sProperty = "bytes=" + startPos + "-";
                httpConnection.setRequestProperty("RANGE", sProperty);
                InputStream input = httpConnection.getInputStream();
                byte[] b = new byte[1024];
                int nRead;
                while ((nRead = input.read(b, 0, 1024)) > 0 && startPos < endPos
                        && !stopDown) {
                    startPos += fileAccessI.write(b, 0, nRead);
                }
                downOver = true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void stopDown() {
        stopDown = true;
    }
}
