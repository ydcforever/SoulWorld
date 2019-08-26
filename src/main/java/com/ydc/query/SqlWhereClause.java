package com.ydc.query;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ydc on 2018/7/6.
 */
public class SqlWhereClause {
    protected List<SqlCondition> sqlConditions;

    protected SqlWhereClause() {
        super();
        sqlConditions = new ArrayList<SqlCondition>();
    }

    public boolean isValid() {
        return sqlConditions.size() > 0;
    }

    public List<SqlCondition> getSqlCondition() {
        return sqlConditions;
    }

    protected void addSqlCondition(String condition) {
        if (condition == null) {
            throw new RuntimeException("Value for condition cannot be null");
        }
        sqlConditions.add(new SqlCondition(condition));
    }

    protected void addSqlCondition(String condition, Object value, String property) {
        if (value == null) {
            throw new RuntimeException("Value for " + property
                    + " cannot be null");
        }
        sqlConditions.add(new SqlCondition(condition, value));
    }

    protected void addSqlCondition(String condition, Object value1, Object value2, String property) {
        if (value1 == null || value2 == null) {
            throw new RuntimeException("Between values for " + property
                    + " cannot be null");
        }
        sqlConditions.add(new SqlCondition(condition, value1, value2));
    }

    public SqlWhereClause andIsNull(String fieldName) {
        addSqlCondition(fieldName + " is null");
        return this;
    }

    public SqlWhereClause andIsNotNull(String fieldName) {
        addSqlCondition(fieldName + " is not null");
        return this;
    }

    public SqlWhereClause andEqualTo(String fieldName, Object value) {
        addSqlCondition(fieldName + " = ", value, fieldName);
        return this;
    }

    public SqlWhereClause andNotEqualTo(String fieldName, Object value) {
        addSqlCondition(fieldName + " <> ", value, fieldName);
        return this;
    }

    public SqlWhereClause andLike(String fieldName, Object value) {
        addSqlCondition(fieldName + " like ", value, fieldName);
        return this;
    }

    public SqlWhereClause andNotLike(String fieldName, Object value) {
        addSqlCondition(fieldName + " not like ", value, fieldName);
        return this;
    }

    public SqlWhereClause andGreaterThan(String fieldName, Object value) {
        addSqlCondition(fieldName + " > ", value, fieldName);
        return this;
    }

    public SqlWhereClause andGreaterThanOrEqualTo(String fieldName, Object value) {
        addSqlCondition(fieldName + " >= ", value, fieldName);
        return this;
    }

    public SqlWhereClause andLessThan(String fieldName, Object value) {
        addSqlCondition(fieldName + " < ", value, fieldName);
        return this;
    }

    public SqlWhereClause andLessThanOrEqualTo(String fieldName, Object value) {
        addSqlCondition(fieldName + " <= ", value, fieldName);
        return this;
    }

    public SqlWhereClause andIn(String fieldName, List<Object> values) {
        addSqlCondition(fieldName + " in ", values, fieldName);
        return this;
    }

    public SqlWhereClause andNotIn(String fieldName, List<Object> values) {
        addSqlCondition(fieldName + " not in ", values, fieldName);
        return this;
    }

    public SqlWhereClause andBetween(String fieldName, Object value1, Object value2) {
        addSqlCondition(fieldName + " between ", value1, value2, fieldName);
        return this;
    }

    public SqlWhereClause andNotBetween(String fieldName, Object value1, Object value2) {
        addSqlCondition(fieldName + " not between ", value1, value2, fieldName);
        return this;
    }

    public SqlWhereClause andOr(String value1, String value2) {
        addSqlCondition("(" + value1 + " or " + value2  + ")");
        return this;
    }

    public SqlWhereClause andOr(String value1, String value2, String value3) {
        addSqlCondition("(" + value1 + " or " + value2 + " or " + value3 + ")");
        return this;
    }

    public SqlWhereClause andOr(String[] values) {
        StringBuilder stringBuilder = new StringBuilder("(");
        int len = values.length;
        for (int i = 0; i < len; i++) {
            if (i == len - 1) {
                stringBuilder.append(values[i]).append(")");
            } else {
                stringBuilder.append(values[i]).append(" or");
            }
        }
        addSqlCondition(stringBuilder.toString());
        return this;
    }

    public SqlWhereClause andInstr(String fieldName, String value) {
        addSqlCondition(" instr (" + fieldName + ",'" + value + "')>0 ");
        return this;
    }

    public SqlWhereClause removeLast() {
        sqlConditions.remove(sqlConditions.size() - 1);
        return this;
    }
}
