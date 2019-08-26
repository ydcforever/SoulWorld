package com.ydc.file;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.io.Serializable;

/**
 * Created by ydc on 2019/6/17.
 */
public class FileAccessI implements Serializable {

    private RandomAccessFile savedFile;

    public FileAccessI(String name, long pos) throws IOException {
        savedFile = new RandomAccessFile(name, "rw");
        savedFile.seek(pos);
    }

    public synchronized int write(byte[] b, int start, int length) {
        int len = -1;
        try {
            savedFile.write(b, start, length);
            len = length;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return len;
    }
}
