package com.ydc.model.tpm;

import com.fate.annotation.LineFormat;
import com.fate.annotation.handler.LineFormatHandler;

/**
 * Created by ydc on 2019/7/1.
 */
public class TPMSectorMileage extends LineFormatHandler{
    //下一行格式，3空格开始
    @LineFormat(start = 1, length = 3)
    private String filler3;

    //
    @LineFormat(start = 4, length = 1)
    private String destinationDesignator;

    //
    @LineFormat(start = 5, length = 19)
    private String destinationCNameNCode;

    //
    @LineFormat(start = 24, length = 3)
    private String filler24;

    //
    @LineFormat(start = 27, length = 5)
    private String tpm;

    //
    @LineFormat(start = 32, length = 1)
    private String filler32;

    //
    @LineFormat(start = 33, length = 2)
    private String globalIndicator;

    //
    @LineFormat(start = 35, length = 1)
    private String constructedDistance;

    //
    @LineFormat(start = 36, length = 1)
    private String filler36;

    //
    @LineFormat(start = 37, length = 3)
    private String destinationCityAlphaCode;

    //
    @LineFormat(start = 40, length = 2)
    private String filler41;

    //
    @LineFormat(start = 42, length = 5)
    private String destinationCityNumericCode;

    //
    @LineFormat(start = 47, length = 22)
    private String filler68;

    //
    @LineFormat(start = 69, length = 1)
    private String originCityRegionCode;

    //
    @LineFormat(start = 70, length = 1)
    private String destinationCityRegionCode;

    //
    @LineFormat(start = 71, length = 5)
    private String originCityNumericCode2;

    //
    @LineFormat(start = 76, length = 5)
    private String filler76;

    public void setFiller3(String filler3) {
        this.filler3 = filler3;
    }

    public String getFiller3() {
        return filler3;
    }

    public void setDestinationDesignator(String destinationDesignator) {
        this.destinationDesignator = destinationDesignator;
    }

    public String getDestinationDesignator() {
        return destinationDesignator;
    }

    public void setDestinationCNameNCode(String destinationCNameNCode) {
        this.destinationCNameNCode = destinationCNameNCode;
    }

    public String getDestinationCNameNCode() {
        return destinationCNameNCode;
    }

    public void setFiller24(String filler24) {
        this.filler24 = filler24;
    }

    public String getFiller24() {
        return filler24;
    }

    public void setTpm(String tpm) {
        this.tpm = tpm;
    }

    public String getTpm() {
        return tpm;
    }

    public void setFiller32(String filler32) {
        this.filler32 = filler32;
    }

    public String getFiller32() {
        return filler32;
    }

    public void setGlobalIndicator(String globalIndicator) {
        this.globalIndicator = globalIndicator;
    }

    public String getGlobalIndicator() {
        return globalIndicator;
    }

    public void setConstructedDistance(String constructedDistance) {
        this.constructedDistance = constructedDistance;
    }

    public String getConstructedDistance() {
        return constructedDistance;
    }

    public void setFiller36(String filler36) {
        this.filler36 = filler36;
    }

    public String getFiller36() {
        return filler36;
    }

    public void setDestinationCityAlphaCode(String destinationCityAlphaCode) {
        this.destinationCityAlphaCode = destinationCityAlphaCode;
    }

    public String getDestinationCityAlphaCode() {
        return destinationCityAlphaCode;
    }

    public void setFiller41(String filler41) {
        this.filler41 = filler41;
    }

    public String getFiller41() {
        return filler41;
    }

    public void setDestinationCityNumericCode(String destinationCityNumericCode) {
        this.destinationCityNumericCode = destinationCityNumericCode;
    }

    public String getDestinationCityNumericCode() {
        return destinationCityNumericCode;
    }

    public void setFiller68(String filler68) {
        this.filler68 = filler68;
    }

    public String getFiller68() {
        return filler68;
    }

    public void setOriginCityRegionCode(String originCityRegionCode) {
        this.originCityRegionCode = originCityRegionCode;
    }

    public String getOriginCityRegionCode() {
        return originCityRegionCode;
    }

    public void setDestinationCityRegionCode(String destinationCityRegionCode) {
        this.destinationCityRegionCode = destinationCityRegionCode;
    }

    public String getDestinationCityRegionCode() {
        return destinationCityRegionCode;
    }

    public void setOriginCityNumericCode2(String originCityNumericCode2) {
        this.originCityNumericCode2 = originCityNumericCode2;
    }

    public String getOriginCityNumericCode2() {
        return originCityNumericCode2;
    }

    public void setFiller76(String filler76) {
        this.filler76 = filler76;
    }

    public String getFiller76() {
        return filler76;
    }

    public TPMSectorMileage(String line) throws Exception{
        super(line);
    }
}
