package com.ydc.model.mpm;


import com.fate.annotation.LineFormat;
import com.fate.annotation.handler.LineFormatHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class MPMHeader extends LineFormatHandler{
    //
	@LineFormat(start = 1, length = 6)
    private String description;

    //
	@LineFormat(start = 7, length = 1)
    private String filter1;

    //
	@LineFormat(start = 8, length = 3)
    private String editionNumber;

    //
	@LineFormat(start = 11, length = 1)
    private String filter2;

    //
	@LineFormat(start = 12, length = 2)
    private String supplementNumber;
	
    //
	@LineFormat(start = 14, length = 3)
    private String filter3;

    //
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
	@LineFormat(start = 63, length = 5)
    private String filter4;

    private String filename;
    
    private String headerId;
    
    private List<MPM> mpmList = new ArrayList<MPM>();
    
    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setFilter1(String filter1) {
        this.filter1 = filter1;
    }

    public String getFilter1() {
        return filter1;
    }

    public void setEditionNumber(String editionNumber) {
        this.editionNumber = editionNumber;
    }

    public String getEditionNumber() {
        return editionNumber;
    }

    public void setFilter2(String filter2) {
        this.filter2 = filter2;
    }

    public String getFilter2() {
        return filter2;
    }

    public void setSupplementNumber(String supplementNumber) {
        this.supplementNumber = supplementNumber;
    }

    public String getSupplementNumber() {
        return supplementNumber;
    }

    public void setFilter3(String filter3) {
        this.filter3 = filter3;
    }

    public String getFilter3() {
        return filter3;
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

    public void setFilter4(String filter4) {
        this.filter4 = filter4;
    }

    public String getFilter4() {
        return filter4;
    }

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public List<MPM> getMpmList() {
		return mpmList;
	}

	public void setMpmList(List<MPM> mpmList) {
		this.mpmList = mpmList;
	}
	
	public String getHeaderId() {
		return headerId;
	}

	public void setHeaderId(String headerId) {
		this.headerId = headerId;
	}

	public MPMHeader(String line) throws Exception{
		super(line);
		this.headerId = UUID.randomUUID().toString().replaceAll("\\-", "");
	}
}
