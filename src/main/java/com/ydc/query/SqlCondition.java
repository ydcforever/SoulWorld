package com.ydc.query;

/**
 * Created by ydc on 2018/7/6.
 */
public class SqlCondition {
    private String condition;
    private Object comparisonValue;
    private Object secondComparisonValue;

    public String getCondition() {
        return condition;
    }

    public Object getComparisonValue() {
        return comparisonValue;
    }

    public Object getSecondComparisonValue() {
        return secondComparisonValue;
    }

    protected SqlCondition() {
        super();
    }

    protected SqlCondition(String condition) {
        super();
        this.condition = condition;
    }

    protected SqlCondition(String condition, Object comparisonValue) {
        super();
        this.condition = condition;
        this.comparisonValue = comparisonValue;
    }

    protected SqlCondition(String condition, Object comparisonValue, Object secondComparisonValue) {
        super();
        this.condition = condition;
        this.comparisonValue = comparisonValue;
        this.secondComparisonValue = secondComparisonValue;
    }
}
