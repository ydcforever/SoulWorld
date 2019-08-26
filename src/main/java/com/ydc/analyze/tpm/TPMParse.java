package com.ydc.analyze.tpm;

import com.fate.file.parse.FileProcess;
import com.ydc.mapper.tpm.TPMHeaderMapper;
import com.ydc.mapper.tpm.TPMMapper;
import com.ydc.model.tpm.TPMHeader;
import com.ydc.model.tpm.TPMLine;
import com.ydc.model.tpm.TPMSectorMileage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
* Created by ydc on 2019/7/1.
*/
@Service
public class TPMParse extends FileProcess<String> {

    @Autowired
    private TPMHeaderMapper tpmHeaderMapper;

    @Autowired
    private TPMMapper tpmMapper;

    private String foreign;

    private TPMLine tpmLine;

    public void parseTPM(String filePath) throws Exception{
        process(filePath, "");
    }

    @Override
    protected void handle(String line, int lineNo, String fileName, String global) throws Exception {
        if (lineNo == 1) {
            TPMHeader tpmHeader = new TPMHeader(line);
            foreign = tpmHeader.getHeaderId();
            tpmHeader.setFileName(fileName);
            tpmHeaderMapper.insert(tpmHeader);
        } else {
            if (isTPM(line)) {
                TPMSectorMileage tpm = new TPMSectorMileage(line);
                tpmMapper.insert(tpmLine, tpm);
            } else {
                tpmLine = new TPMLine(line);
                tpmLine.setHeaderId(foreign);
            }
        }
    }

    private boolean isTPM(String line) {
        return "".equals(line.substring(2,3).trim());
    }
}
