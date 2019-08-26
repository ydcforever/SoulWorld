package com.ydc.analyze.mpm;

import com.fate.file.parse.FileProcess;
import com.ydc.mapper.mpm.MPMHeaderMapper;
import com.ydc.mapper.mpm.MPMMapper;
import com.ydc.model.mpm.MPM;
import com.ydc.model.mpm.MPMHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
* Created by ydc on 2019/6/18.
*/
@Service
public class MPMParse extends FileProcess<String> {
    private String foreign;

    @Autowired
    private MPMHeaderMapper mpmHeaderMapper;

    @Autowired
    private MPMMapper mpmMapper;

    public void parseMPM(String filePath) throws Exception{
        process(filePath, "");
    }

    @Override
    protected void handle(String line, int lineNo, String fileName, String global) throws Exception {
        if (lineNo == 1) {
            MPMHeader mpmHeader = new MPMHeader(line);
            mpmHeader.setFilename(fileName);
            foreign = mpmHeader.getHeaderId();
            mpmHeaderMapper.insert(mpmHeader);
        } else {
            MPM mpm = new MPM(line);
            mpm.setHeaderId(foreign);
            mpmMapper.insert(mpm);
        }
    }
}
