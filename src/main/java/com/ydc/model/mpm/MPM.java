package com.ydc.model.mpm;

import com.fate.annotation.LineFormat;
import com.fate.annotation.handler.LineFormatHandler;

public class MPM extends LineFormatHandler{
    //
	@LineFormat(start = 1, length = 5)
    private String originCityNumber;

    //
	@LineFormat(start = 6, length = 5)
    private String destinationCityNumber;

    //
	@LineFormat(start = 11, length = 16)
    private String destinationCNameNCode;

    //
	@LineFormat(start = 27, length = 2)
    private String filter1;

    //
	@LineFormat(start = 29, length = 2)
    private String globalIndicator;

    //
	@LineFormat(start = 31, length = 5)
    private String som;

    //
	@LineFormat(start = 36, length = 5)
    private String mpm;

    //
	@LineFormat(start = 41, length = 1)
    private String originCityRegionCode;

    //
	@LineFormat(start = 42, length = 1)
    private String destinationCityRegionCode;

    //
	@LineFormat(start = 43, length = 1)
    private String sectorCode;

	//
	@LineFormat(start = 44, length = 16)
    private String originCNameNCode;

    //
	@LineFormat(start = 60, length = 2)
    private String filter2;

    //
	@LineFormat(start = 62, length = 3)
    private String originCityAlphaCode;

    //
	@LineFormat(start = 65, length = 3)
    private String destinationCityAlphaCode;

    private String headerId;

    public void setOriginCityNumber(String originCityNumber) {
        this.originCityNumber = originCityNumber;
    }

    public String getOriginCityNumber() {
        return originCityNumber;
    }

    public void setDestinationCityNumber(String destinationCityNumber) {
        this.destinationCityNumber = destinationCityNumber;
    }

    public String getDestinationCityNumber() {
        return destinationCityNumber;
    }

    public void setDestinationCNameNCode(String destinationCNameNCode) {
        this.destinationCNameNCode = destinationCNameNCode;
    }

    public String getDestinationCNameNCode() {
        return destinationCNameNCode;
    }

    public void setFilter1(String filter1) {
        this.filter1 = filter1;
    }

    public String getFilter1() {
        return filter1;
    }

    public void setGlobalIndicator(String globalIndicator) {
        this.globalIndicator = globalIndicator;
    }

    public String getGlobalIndicator() {
        return globalIndicator;
    }

    public void setSom(String som) {
        this.som = som;
    }

    public String getSom() {
        return som;
    }

    public void setMpm(String mpm) {
        this.mpm = mpm;
    }

    public String getMpm() {
        return mpm;
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

    public void setSectorCode(String sectorCode) {
        this.sectorCode = sectorCode;
    }

    public String getSectorCode() {
        return sectorCode;
    }

    public void setOriginCNameNCode(String originCNameNCode) {
        this.originCNameNCode = originCNameNCode;
    }

    public String getOriginCNameNCode() {
        return originCNameNCode;
    }

    public void setFilter2(String filter2) {
        this.filter2 = filter2;
    }

    public String getFilter2() {
        return filter2;
    }

    public void setOriginCityAlphaCode(String originCityAlphaCode) {
        this.originCityAlphaCode = originCityAlphaCode;
    }

    public String getOriginCityAlphaCode() {
        return originCityAlphaCode;
    }

    public void setDestinationCityAlphaCode(String destinationCityAlphaCode) {
        this.destinationCityAlphaCode = destinationCityAlphaCode;
    }

    public String getDestinationCityAlphaCode() {
        return destinationCityAlphaCode;
    }

	public String getHeaderId() {
		return headerId;
	}

	public void setHeaderId(String headerId) {
		this.headerId = headerId;
	}

    public MPM(String line) throws Exception{
        super(line);
    }
}
