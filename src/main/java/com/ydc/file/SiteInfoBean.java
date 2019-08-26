package com.ydc.file;

/**
 * Created by ydc on 2019/6/17.
 */
public class SiteInfoBean {

    private String siteURL;
    private String filePath;
    private String fileName;
    private int pieces;

    public SiteInfoBean(String siteURL, String filePath, String fileName, int pieces) {
        this.siteURL = siteURL;
        this.filePath = filePath;
        this.fileName = fileName;
        this.pieces = pieces;
    }

    public String getSiteURL() {
        return siteURL;
    }

    public void setSiteURL(String siteURL) {
        this.siteURL = siteURL;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getPieces() {
        return pieces;
    }

    public void setPieces(int pieces) {
        this.pieces = pieces;
    }
}
