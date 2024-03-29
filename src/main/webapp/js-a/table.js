window.Table = {};
Table.datagrid = {
    /**
     * set common config
     *
     * @param title
     * @param cellClickFun
     * @returns {config}
     */
    multiSelectConfig: function (title, cellClickFun) {
        var config = {
            idField: 'id', //只要创建数据表格 就必须要加 ifField
                fit: true,
                fitColumns: false,
                nowrap: true,
                striped: true, //隔行变色特性
                loadMsg: '数据正在加载,请耐心的等待...',
                //pagination: true,
                //pageList: [10, 20, 30],
                //pageSize: 10,
                selectOnCheck: true,
                checkOnSelect: true
        };
        config.title = title;
        if (cellClickFun != undefined) {
            config.onClickCell = function (rowIndex, field, value) {
                cellClickFun(field, value);
            };
        }
        return config;
    },

    /**
     * single select config
     * @param title
     * @param cellClickFun
     * @returns {config}
     */
    singleSelectConfig : function (title, cellClickFun) {
        var config = this.multiSelectConfig(title, cellClickFun);
        config.singleSelect = true;
        return config;
    },

    /**
     * generate columns depended on fields which user provided
     *
     * @param fields
     * @param useCheckBox
     * @returns {*[]}
     */
    defineColumns: function (fields, useCheckBox) {
        var columns = [[]];
        if (useCheckBox) columns[0][0] = {field: "ck", checkbox: true};
        $(fields).each(function (i, val) {
            var index = useCheckBox ? i + 1 : i;
            columns[0][index] = {field: val, title: val, editor: "text"};
        });
        return columns;
    },

    /**
     * generate columns depended on object fields
     *
     * @param object
     * @param useCheckBox
     * @returns {*[]}
     */
    autoColumns: function (object, useCheckBox) {
        var columns = [[]];
        var i = 0;
        if (useCheckBox) {
            columns[0][0] = {field: "ck", checkbox: true};
            i++;
        }
        $.each(object, function (field) {
            columns[0][i] = {field: field, title: field, editor: "text"};
            i++;
        });
        return columns;
    },

    /**
     * user define fields with selectable and sort
     *
     * @param $table
     * @param config
     * @param url
     * @param fields
     * @param useCheckBox
     */
    defineLoad : function($table, config, url, fields, useCheckBox) {
        var columns = this.defineColumns(fields, useCheckBox);
        this.load($table, config, url, columns);
    },

    /**
     * url load data
     *
     * @param $table
     * @param config
     * @param url
     * @param columns
     */
    load: function ($table, config, url, columns) {
        config.url = url;
        config.columns = columns;
        $($table).datagrid(config);
    },

    /**
     * columns use default object fields without selectable
     *
     * @param $table
     * @param config
     * @param data
     * @param useCheckBox
     */
    defaultLoadData : function ($table, config, data, useCheckBox) {
        var columns = this.autoColumns(data[0], useCheckBox);
        this.loadData($table, config, data, columns);
    },

    /**
     * user define fields with selectable and sort
     *
     * @param $table
     * @param config
     * @param data
     * @param fields
     * @param useCheckBox
     */
    defineLoadData : function ($table, config, data, fields, useCheckBox) {
        var columns = this.defineColumns(data[0], useCheckBox);
        this.loadData($table, config, data, columns);
    },

    /**
     * load local data
     *
     * @param $table
     * @param config
     * @param data
     * @param columns
     */
    loadData: function ($table, config, data, columns) {
        config.columns = columns;
        $table.datagrid(config);
        $table.datagrid("loadData", data);
    }
};

Table.simple = {
    /**
     * one object vertical display
     *
     * @param $table
     * @param object
     * @param titles
     */
    vertical: function ($table, object, titles) {
        var trs = "";
        if (titles == undefined) {
            $.each(object, function (field, val) {
                trs += '<tr><td>' + field + ':</td><td>' + val + '</td></tr>';
            });
        } else {
            $(titles).each(function () {
                trs += '<tr><td>' + this.label + ':</td><td>' + object[this.field] + '</td></tr>';
            });
        }
        $table.html(trs);
    },

    /**
     * all object horizontal display
     *
     * @param $table
     * @param objects
     * @param titles
     */
    horizontal: function ($table, objects, titles) {
        var table = '<tr>';
        if (titles == undefined) {
            $.each(objects[0], function (field, val) {
                table += '<td>' + field + '</td>';
            });
        } else {
            $(titles).each(function () {
                table += '<td>' + this.label + '</td>';
            });
        }
        table += '</tr>';

        $(objects).each(function () {
            table += '<tr>';
            var object = this;
            if (titles == undefined) {
                $.each(object, function (field, val) {
                    table += '<td>' + val + '</td>';
                })
            } else {
                $(titles).each(function () {
                    table += '<td>' + (object[this.field] == undefined ? "" : object[this.field]) + '</td>';
                });
            }
            table += '</tr>';
        });
        $table.html(table);
    }
};
