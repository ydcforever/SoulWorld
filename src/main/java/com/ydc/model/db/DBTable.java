package com.ydc.model.db;

public class DBTable {

	private String tableName;
	
	private String comment;
	
	private String columnName;
	
	private String dataType;

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public DBTable() {
		super();
	}

	@Override
	public String toString() {
		return "DBTable [tableName=" + tableName + ", comment=" + comment
				+ ", columnName=" + columnName + ", dataType=" + dataType + "]";
	}
}
