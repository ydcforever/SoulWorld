package com.ydc.query;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by T440 on 2018/7/6.
 */
public class PagingObject<T> implements Serializable {

    private static final long serialVersionUID = 1L;
    private int currentPage = 0;
    private int rows = 20;
    private int begin;
    private int end;
    private int page;
    private int total;
    private List<T> data = new ArrayList<T>();

    public PagingObject() {

    }

    public int getRows() {
        return Math.max(1, rows);
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public long getPage() {
        total = getTotal();
        rows = getRows();
        page = total / rows;
        if (total % rows != 0)
            page = page + 1;
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getTotal() {
        return Math.max(0, total);
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public long getCurrentPage() {
        return Math.max(0, currentPage);
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public long getBegin() {
        long beginNow = getCurrentPage() * getRows();
        return begin == 0 ? beginNow : begin;
    }

    public void setBegin(int begin) {
        this.begin = begin;
    }

    public long getEnd() {
        long endNow = (getCurrentPage() + 1) * getRows();
        return end == 0 ? endNow : end;
    }

    public void setEnd(int end) {
        this.end = end;
    }

    public PagingObject(int currentPage, int rows, int begin, int end,
                        int page, int total, List<T> data) {
        super();
        this.currentPage = currentPage;
        this.rows = rows;
        this.begin = begin;
        this.end = end;
        this.page = page;
        this.total = total;
        this.data = data;
    }
}

