package com.ydc.model.tpm;

import com.fate.annotation.LineFormat;
import com.fate.annotation.handler.LineFormatHandler;

/**
 * Created by ydc on 2019/7/1.
 */
public class TPMLine extends LineFormatHandler {

    //
    @LineFormat(start = 1, length = 1)
    private String filler1;

    //
    @LineFormat(start = 2, length = 1)
    private String originDesignator;

    //
    @LineFormat(start = 3, length = 19)
    private String originCNameNCode;

    //
    @LineFormat(start = 22, length = 15)
    private String filler22;

    //
    @LineFormat(start = 37, length = 3)
    private String originCityAlphaCode;

    //
    @LineFormat(start = 40, length = 2)
    private String filler40;

    //
    @LineFormat(start = 42, length = 5)
    private String originCityNumericCode;

    //
    @LineFormat(start = 47, length = 34)
    private String filler47;

    private String headerId;

    public String getFiller1() {
        return filler1;
    }

    public void setFiller1(String filler1) {
        this.filler1 = filler1;
    }

    public String getOriginDesignator() {
        return originDesignator;
    }

    public void setOriginDesignator(String originDesignator) {
        this.originDesignator = originDesignator;
    }

    public String getOriginCNameNCode() {
        return originCNameNCode;
    }

    public void setOriginCNameNCode(String originCNameNCode) {
        this.originCNameNCode = originCNameNCode;
    }

    public String getFiller22() {
        return filler22;
    }

    public void setFiller22(String filler22) {
        this.filler22 = filler22;
    }

    public String getOriginCityAlphaCode() {
        return originCityAlphaCode;
    }

    public void setOriginCityAlphaCode(String originCityAlphaCode) {
        this.originCityAlphaCode = originCityAlphaCode;
    }

    public String getFiller40() {
        return filler40;
    }

    public void setFiller40(String filler40) {
        this.filler40 = filler40;
    }

    public String getOriginCityNumericCode() {
        return originCityNumericCode;
    }

    public void setOriginCityNumericCode(String originCityNumericCode) {
        this.originCityNumericCode = originCityNumericCode;
    }

    public String getFiller47() {
        return filler47;
    }

    public void setFiller47(String filler47) {
        this.filler47 = filler47;
    }

    public String getHeaderId() {
        return headerId;
    }

    public void setHeaderId(String headerId) {
        this.headerId = headerId;
    }

    public TPMLine(String line) throws Exception{
        super(line);
    }

    public TPMLine() {
        super();
    }
}
