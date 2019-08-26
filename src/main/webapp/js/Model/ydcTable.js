/**
 * Created by T440 on 2018/6/5.
 */
var defaultConfig = {
    pagination: false,
    pageSize: 2,
    currentPage: 1,
    striped: true,
    showRowNumber: false,
    singleSelect: false, //单选
    selectOnCheck: true,//选择行是否包含checkbox
    checkOnSelect: true,//启用行响应checkBox
    noWrap: true,
    autoRowHeight: true,
    columns: [[
        {field: 'ck', checkbox: true},
        {field: 'name', title: '姓名'},
        {field: 'password', title: '密码'},
        {field: 'queryCondition', title: '查询条件', checkbox: true}
    ]]
};

function ydcTable(data, config) {
    this.config = config == undefined ? defaultConfig : config;
    this.nameConstraint = new nameConstraint();
    this.data = data;
    this.totalPage = Math.ceil(data.length / this.config.pageSize);
    this.turnBar = new turnBar(this.nameConstraint.prefixSymbol);
}
ydcTable.prototype = {
    build: function (target) {
        var loadData = dataOperation.currentLoadData(this.data, 1, this.config.pageSize);
        $(target).html(view.render(loadData, this.config, this.nameConstraint));
        $(target).after(this.turnBar.build(this.config.currentPage));
        $('#' + this.turnBar.turnBarId).prepend("共" + this.totalPage + "页");
        $('#' + this.turnBar.turnBarId).append("总记录" + this.data.length + "条");
        this.turnPreviousPage(target, this.data, this.config, this.turnBar, this.nameConstraint);
        this.turnNextPage(target, this.data, this.config, this.turnBar, this.nameConstraint, this.totalPage);

        if (this.config.checkOnSelect) {
            this.config.singleSelect ? tableEvent.onSingleSelect(target, 'ck', 'ck', this.config.columns, this.nameConstraint) :
                tableEvent.onMultipleSelect(target, 'ck', this.config.columns, this.nameConstraint);
        }
        cssModel(this.nameConstraint);
    },

    getSelectRows: function (target, field) {
        return dataOperation.getSelectRows(target, field, this.config.columns, this.nameConstraint, this.config.selectOnCheck);
    },

    /**
     * 上一页
     * @param data
     * @returns {HTMLElement}
     */
    turnPreviousPage: function (target, data, config, turnBar, nameConstraint) {
        var currentPageId = turnBar.currentPageId;
        $('#' + turnBar.previousPageId).click(function () {
            var currentPage = parseInt($('#' + currentPageId).val()) - 1;
            if (currentPage >= 1) {
                //数据行清空
                $(target).find('.' + nameConstraint.rowClass).remove();
                $('#' + currentPageId).attr("value", currentPage);
                dataOperation.flash(target, data, currentPage, config, nameConstraint);
                cssModel(nameConstraint);
            }
        });
    },

    /**
     * 下一页
     * @param data
     * @returns {HTMLElement}
     */
    turnNextPage: function (target, data, config, turnBar, nameConstraint, totalPage) {
        var currentPageId = turnBar.currentPageId;
        $('#' + turnBar.nextPageId).click(function () {
            var currentPage = parseInt($('#' + currentPageId).val()) + 1;
            if (currentPage <= totalPage) {
                //数据行清空
                $(target).find('.' + nameConstraint.rowClass).remove();
                $('#' + currentPageId).attr("value", currentPage);
                dataOperation.flash(target, data, currentPage, config, nameConstraint);
                cssModel(nameConstraint);
            }
        });
    }
}
function nameConstraint() {
    this.prefixSymbol = 'ydc-table';
    this.dataClass = this.prefixSymbol + '-data';
    this.headClass = this.prefixSymbol + '-head';
    this.headRowClass = this.headClass + '-row';
    this.rowClass = this.prefixSymbol + '-row';
    this.rowId = function (index) {
        return this.rowClass + '-' + index;
    };
    this.rowNumberClass = this.rowClass + '-number';
    this.rowStripedClass = this.rowClass + '-alt';
    this.cellClass = this.prefixSymbol + '-cell';
    this.cellNumberClass = this.cellClass + '-number';
    this.cellCheckClass = this.cellClass + '-check';
}

function turnBar(prefixSymbol) {
    this.imgSize = 20;
    this.turnBarId = prefixSymbol + '-turn-bar';
    this.currentPageId = prefixSymbol + 'current-page';
    this.previousPageId = prefixSymbol + 'previous-page';
    this.previousPageUrl = './img/previousPage.png';
    this.nextPageId = prefixSymbol + '-next-page';
    this.nextPageUrl = './img/nextPage.png';
}
turnBar.prototype = {
    build: function (currentPage) {
        var pageElement = document.createElement('div');
        pageElement.id = this.turnBarId;
        pageElement.style.textAlign = 'center';
        pageElement.appendChild(YDC.elementBuilder.img(this.previousPageId, '', this.previousPageUrl, this.imgSize, this.imgSize));
        var inputElement = YDC.elementBuilder.input(this.currentPageId);
        inputElement.style.width = '40px';
        inputElement.value = currentPage;
        pageElement.appendChild(inputElement);
        pageElement.appendChild(YDC.elementBuilder.img(this.nextPageId, '', this.nextPageUrl, this.imgSize, this.imgSize));
        return pageElement;
    }
}

function cssModel(nameConstraint) {
    //$('#' + nameConstraint.prefixSymbol + ' td').css('border', '1px dashed lightgray');
    //$('#' + nameConstraint.prefixSymbol).css({
    //    'border-collapse': 'collapse',
    //    'border': '1px solid #E0E0E0',
    //    'empty-cells': 'show',
    //    'font-size': '20px',
    //    'margin': '0 auto',
    //    'font-family': '"Helvetica Neue", Helvetica, "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif'
    //});
    //$('.' + nameConstraint.headRowClass).css({
    //    'font-size': '24px',
    //    'background-color': '#D0D0D0'
    //});
    //$('#' + nameConstraint.prefixSymbol).find('input[type=checkbox]').css({
    //    '-moz-transform': 'scale(1.4)',
    //    '-ms-transform': 'scale(1.4)',
    //    '-webkit-transform': 'scale(1.4)',
    //    '-o-transform': 'scale(1.4)',
    //    'zoom': '1.4'
    //});
    //$('.' + nameConstraint.rowStripedClass).css('background', '-webkit-linear-gradient(#F0F0F0, #E0E0E0, #F0F0F0)');

    YDC.cssOperation.localCorrection('.' + nameConstraint.cellCheckClass, 5, 2);
}

var dataOperation = {
    /**
     * 刷新数据
     * @param target ydc-table-row
     * @param currentPage
     * @param pageSize
     */
    flash: function (target, data, currentPage, config, nameConstraint) {
        var temp = document.createElement('tbody');
        temp.innerHTML = view.renderRows(dataOperation.currentLoadData(data, currentPage, config.pageSize), config, nameConstraint);
        $(target).append(temp);
    },

    /**
     * 当前需要加载的数据
     * @param data
     * @param currentPage
     * @param pageSize
     * @returns {Array}
     */
    currentLoadData: function (data, currentPage, pageSize) {
        var currentData = new Array();
        for (var i = (currentPage - 1) * pageSize; i < currentPage * pageSize; i++) {
            currentData.push(data[i]);
        }
        return currentData;
    },

    /**
     *
     * @param target
     * @param field
     * @param columns
     * @param nameConstraint
     * @param selectOnCheck
     * @returns {Array}
     */
    getSelectRows: function (target, field, columns, nameConstraint, selectOnCheck) {
        var result = new Array();
        $(target).find(selectors.selectedRows(field)).each(function () {
            var id = $(this).parent().parent().parent().attr('id');
            var index = id.substring(id.lastIndexOf('-') + 1);
            result.push(dataOperation.getRow(index, columns, nameConstraint, selectOnCheck))
        });
        return result;
    },
    /**
     *
     * @param index
     * @param columns
     * @param nameConstraint
     * @param selectOnCheck
     * @returns {Object}
     */
    getRow: function (index, columns, nameConstraint, selectOnCheck) {
        var col = 0;
        var object = new Object();
        $('#' + nameConstraint.rowId(index) + '> td > div').each(function () {
            var cls = $(this).attr('class');
            object['id'] = index;
            if (cls != nameConstraint.cellNumberClass) {
                if (selectOnCheck) {
                    if (cls == nameConstraint.cellCheckClass) {
                        object[columns[0][col].field] = $(this).find('input').prop('checked');
                    } else {
                        object[columns[0][col].field] = $(this).text();
                    }
                } else {
                    if (cls != nameConstraint.cellCheckClass) {
                        object[columns[0][col].field] = $(this).text();
                    }
                }
                col++;
            }
        });
        return object;
    }
}
var view = {
    /**
     * 表格渲染
     * @param columns
     * @param rows
     * @param config
     * @returns {string}
     */
    render: function (rows, config, nameConstraint) {
        var html = [];
        html.push('<tbody>');
        html.push(view.renderHeader.call(this, config, nameConstraint));
        html.push(view.renderRows.call(this, rows, config, nameConstraint));
        html.push('</tbody>');
        return html.join('');
    },

    /**
     * 表头渲染
     * @param columns
     * @param config
     * @returns {string}
     */
    renderHeader: function (config, nameConstraint) {
        var headerHtml = []
        headerHtml.push('<tr class="' + nameConstraint.headRowClass + '">');
        if (config.showRowNumber) {
            headerHtml.push('<td></td>');
        }
        $(config.columns).each(function () {
            $(this).each(function () {
                if (this.field == 'ck') {
                    if (this.checkbox) {
                        headerHtml.push('<td><div>');
                    }
                } else {
                    headerHtml.push('<td><div style="' + view.cellStyle(this, config) + '">');
                }
                headerHtml.push((this.title ? this.title : '') + '</div></td>');
            });
        });
        headerHtml.push('</tr>');
        return headerHtml.join('');
    },

    /**
     * 填充数据
     * @param rows
     * @param nameConstraint
     * @returns {string}
     */
    renderRows: function (rows, config, nameConstraint) {
        var rowsHtml = [];
        var len = rows.length;
        for (var i = 0; i < len; i++) {
            //隔行变色
            var cls = (i % 2 && config.striped) ? 'class="' + nameConstraint.rowClass + ' ' + nameConstraint.rowStripedClass + '"' : 'class="' + nameConstraint.rowClass + '"';
            var style = '';
            rowsHtml.push('<tr id="' + nameConstraint.rowId(i) + '"' + cls + " " + style + ">");
            rowsHtml.push(view.renderRow.call(this, i, rows[i], config, nameConstraint));
            rowsHtml.push('</tr>');
        }
        return rowsHtml.join('');
    },
    /**
     * 行渲染
     * @param columns 列属性
     * @param rowIndex 行号 0始
     * @param rowData 行数据
     * @param config 配置
     * @returns {string}
     */
    renderRow: function (rowIndex, rowData, config, nameConstraint) {
        var rowHtml = [];
        //行号
        if (config.showRowNumber) {
            var rowNumber = rowIndex + 1;
            if (config.pagination) {
                rowNumber += (config.pageNumber - 1) * config.pageSize;
            }
            rowHtml.push('<td><div class="' + nameConstraint.cellNumberClass + '">' + rowNumber + '</div></td>');
        }
        //列属性
        $(config.columns).each(function () {
            $(this).each(function (i) {
                var cellValue = rowData[this.field];
                if (this.checkbox) {
                    rowHtml.push('<td><div style="vertical-align:middle;text-align: center" class="' + nameConstraint.cellCheckClass + '">');
                    rowHtml.push('<input type="checkbox" name="' + this.field + (cellValue != undefined ? '" checked="' + cellValue : '') + '"/>');
                } else {
                    rowHtml.push('<td><div style="' + view.cellStyle(this, config) + '" class="' + nameConstraint.cellClass + '">')
                    if (this.formatter) {
                        rowHtml.push(this.formatter(cellValue, rowData, rowIndex));
                    } else {
                        rowHtml.push(cellValue);
                    }
                }
                rowHtml.push('</div>');
                rowHtml.push('</td>');
            });
        });
        return rowHtml.join('');
    },

    /**
     * 单元格属性
     * @param cell
     * @param config
     * @returns {string}
     */
    cellStyle: function (cell, config) {
        var style = 'width:';
        if (cell.width) {
            style += cell.width ;
        }else if (cell.title){
            style += (cell.title.length * 35) + 'px';
        }
        style += ';text-align:' + (cell.align ? cell.align : 'center') + ';';
        if (config.noWrap) {
            style += "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;";
        } else if (config.autoRowHeight) {
            style += 'white-space:normal;height:auto;';
        }
        return style;
    }
}

var selectors = {
    /*
     非表头数据行
     */
    dataRows: function (nameConstraint) {
        return '.' + nameConstraint.rowClass;
    },

    /**
     * name一致的checkbox
     * @param field
     * @returns {string}
     */
    checkboxes: function (field) {
        return 'input:checkbox[name="' + field + '"]';
    },

    /**
     * 复选框选中的行
     * @returns {string}
     */
    selectedRows: function (field) {
        return 'input:checkbox[name="' + field + '"]:checked';
    }
}

var tableEvent = {
    /**
     *  行单选
     * @param target
     * @param field checkbox的field
     * @param skipField 默认ck
     * @param columns  列属性
     * @param nameConstraint 命名规则
     */
    onSingleSelect: function (target, field, skipField, columns, nameConstraint) {
        var selector = selectors.checkboxes(field);
        $(target).find(selectors.dataRows(nameConstraint)).click(function (event) {
            if (!tableEvent.clickInvalid(event, this, columns, skipField)) {
                $(target).find(selector).prop('checked', false);
                if ($(this).find(selector).prop('checked')) {
                    $(this).find(selector).prop('checked', false);
                } else {
                    $(this).find(selector).prop('checked', true);
                }
            }
        });
    },

    /**
     * 行多选
     * @param target
     * @param field checkbox的field
     * @param columns 列属性
     * @param nameConstraint 命名规则
     */
    onMultipleSelect: function (target, field, columns, nameConstraint) {
        var selector = selectors.checkboxes(field);
        $(target).find(selectors.dataRows(nameConstraint)).click(function (event) {
            //除去点击checkbox的行响应
            if (!tableEvent.clickInvalid(event, this, columns)) {
                //jquery 1.6+ checkbox 用 prop
                if ($(this).find(selector).prop('checked')) {
                    $(this).find(selector).prop("checked", false);
                } else {
                    $(this).find(selector).prop("checked", true);
                }
            }
        });
    },

    /**
     * 行选中时避开checkbox
     * @param event
     * @param target
     * @param columns 列属性
     * @param skipField 默认ck
     * @returns {boolean}
     */
    clickInvalid: function (event, target, columns, skipField) {
        var len = columns[0].length;
        for (var i = 0; i < len; i++) {
            var checkbox = $(target).find(selectors.checkboxes(columns[0][i].field));
            if (skipField) {
                //单选跳过ck
                if (columns[0][i].field != skipField) {
                    if (columns[0][i].checkbox && (event.target == $(checkbox).parent()[0] || event.target == $(checkbox)[0]))
                        return true;
                }
            } else if (columns[0][i].checkbox && (event.target == $(checkbox).parent()[0] || event.target == $(checkbox)[0])) {
                return true;
            }
        }
        return false;
    }
}
