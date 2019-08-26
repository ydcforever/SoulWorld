package com.ydc.service.parse;

import com.fate.file.parse.FileProcess;

import java.io.File;

/**
 * Created by ydc on 2019/7/11.
 */
public class YQYRParse extends FileProcess<String>{

    public void parse(String filePath) throws Exception {
        File file = new File(filePath);
        process(file, "");
    }

    @Override
    protected void handle(String line, int lineNo, String filePath, String global) throws Exception {

    }
}
