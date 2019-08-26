package com.ydc.service.parse;

import com.fate.file.unzip.AbstractFileUnzip;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;

/**
 * Created by ydc on 2019/7/11.
 */
public class YQYRUnzip extends AbstractFileUnzip implements FileFilter{

    public void process(String zipDirectory, String unzipDirectory) throws IOException{
        File[] files = new File(zipDirectory).listFiles();
        if(files != null) {
            for(File file : files) {
                if(accept(file)) {
                    String name = file.getName();
                    String prefix = name.substring(0, name.lastIndexOf("."));
                    unzip(file, unzipDirectory, prefix);
                }
            }
        };
    }

    @Override
    public String[] keys() {
        return new String[]{ "_s1",
                "_s2",
                "_178",
                "_186",
                "_190",
                "_196"};
    }

    @Override
    public String classify(String line, String... keys ) {
        char char0 = line.charAt(0);
        if (char0 != 26) {
            char char1 = line.charAt(1), char2 = line.charAt(2), char3 = line.charAt(3), char4 = line.charAt(4);
            if (char0 == 'S') {
                if (char1 == '1') {
                   return keys[0];
                } else if (char1 == '2') {
                    return keys[1];
                }
            } else if (char0 == '3' && char2 == '1') {
                if (char3 == '7' && char4 == '8') {
                    return keys[2];
                } else if (char3 == '8' && char4 == '6') {
                    return keys[3];
                } else if (char3 == '9') {
                    if (char4 == '0') {
                        return keys[4];
                    } else if (char4 == '6') {
                        return keys[5];
                    }
                }
            }
        }
        return null;
    }

    @Override
    public boolean accept(File pathname) {
        return pathname.getName().startsWith("YQYR");
    }

    @Override
    public String unzipExtension() {
        return null;
    }
}
