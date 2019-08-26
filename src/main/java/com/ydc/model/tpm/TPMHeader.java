package com.ydc.model.tpm;

import com.fate.annotation.LineFormat;
import com.fate.annotation.handler.LineFormatHandler;

import java.util.UUID;

/**
 * Created by ydc on 2019/7/1.
 */
public class TPMHeader extends LineFormatHandler{

    //
    @LineFormat(start = 1, length = 6)
    private String description;

    //
    @LineFormat(start = 7, length = 1)
    private String filler7;

    //
    @LineFormat(start = 8, length = 3)
    private String editionNumber;

    //
    @LineFormat(start = 11, length = 1)
    private String filler11;

    //
    @LineFormat(start = 12, length = 2)
    private String supplementNumber;

    //
    @LineFormat(start = 14, length = 3)
    private String filler14;

    //A:All Adds,C:Changes
    @LineFormat(start = 17, length = 1)
    private String typeOfData;

    //
    @LineFormat(start = 18, length = 8)
    private String generationDate;

    //
    @LineFormat(start = 26, length = 6)
    private String generationTime;

    //
    @LineFormat(start = 32, length = 9)
    private String recordCount;

    //
    @LineFormat(start = 41, length = 8)
    private String effectiveDate;

    //
    @LineFormat(start = 49, length = 14)
    private String copyright;

    //
    @LineFormat(start = 63, length = 18)
    private String filler63;

    private String fileName;

    private String headerId;

  public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setFiller7(String filler7) {
        this.filler7 = filler7;
    }

    public String getFiller7() {
        return filler7;
    }

    public void setEditionNumber(String editionNumber) {
        this.editionNumber = editionNumber;
    }

    public String getEditionNumber() {
        return editionNumber;
    }

    public void setFiller11(String filler11) {
        this.filler11 = filler11;
    }

    public String getFiller11() {
        return filler11;
    }

    public void setSupplementNumber(String supplementNumber) {
        this.supplementNumber = supplementNumber;
    }

    public String getSupplementNumber() {
        return supplementNumber;
    }

    public void setFiller14(String filler14) {
        this.filler14 = filler14;
    }

    public String getFiller14() {
        return filler14;
    }

    public void setTypeOfData(String typeOfData) {
        this.typeOfData = typeOfData;
    }

    public String getTypeOfData() {
        return typeOfData;
    }

    public void setGenerationDate(String generationDate) {
        this.generationDate = generationDate;
    }

    public String getGenerationDate() {
        return generationDate;
    }

    public void setGenerationTime(String generationTime) {
        this.generationTime = generationTime;
    }

    public String getGenerationTime() {
        return generationTime;
    }

    public void setRecordCount(String recordCount) {
        this.recordCount = recordCount;
    }

    public String getRecordCount() {
        return recordCount;
    }

    public void setEffectiveDate(String effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public String getEffectiveDate() {
        return effectiveDate;
    }

    public void setCopyright(String copyright) {
        this.copyright = copyright;
    }

    public String getCopyright() {
        return copyright;
    }

    public void setFiller63(String filler63) {
        this.filler63 = filler63;
    }

    public String getFiller63() {
        return filler63;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getHeaderId() {
        return headerId;
    }

    public void setHeaderId(String headerId) {
        this.headerId = headerId;
    }

    public TPMHeader(String line) throws Exception{
        super(line);
        this.headerId =  UUID.randomUUID().toString().replaceAll("\\-", "");
    }

}
