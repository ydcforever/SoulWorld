/**
 * Created by T440 on 2018/5/17.
 */
/**
 * API
 * provide arrangement query conditions
 * control parameters : columns and columnsWidth
 *
 * support list search and cascade queries
 * control parameters : nextCascadeQuery
 * <div>
 *     <span></span>
 *     <input/>
 *     <dataList>
 *         <select>
 *         </select>
 *     </dataList>
 * </div>
 */

/**
 * create query condition model
 * @param queryId
 * @param objects
 * @param columns
 * @param columnsWidth
 * @constructor
 */
function QueryConditions(queryId, objects, columns, columnsWidth) {
    this.columns = columns == undefined ? 3 : columns;
    this.columnsWidth = columnsWidth == undefined ? ['30%', '30%', '30%'] : columnsWidth;
    this.queryId = queryId;
    this.objects = objects;
    this.conditions = [];
    this.rowIdPrefix = 'queryRow';
    this.contentWidth = $('#' + this.queryId).css('width');
}
QueryConditions.prototype.build = function () {
    var len = this.objects.length;
    for (var i = 0; i < len; i += this.columns) {
        var divElement = document.createElement('div');
        divElement.id = this.rowIdPrefix + Math.ceil(i / this.columns);
        divElement.style.width = this.contentWidth;
        $('#' + this.queryId).append(divElement);
        for (var j = 0; j < this.columns && (i + j) < len; j++) {
            var queryInput = new QueryCondition(this.objects[i + j]);
            this.conditions.push(queryInput);
            var queryElement = this.objects[i + j].nextCascadeQuery ? queryInput.build(this.objects[i + j + 1]) : queryInput.build();
            queryElement.style.display = 'table-cell';
            if (j < this.columnsWidth.length) queryElement.style.width = this.columnsWidth[j];
            divElement.appendChild(queryElement);
        }
    }
};

/**
 * create input condition  model
 * support list search and cascade query
 * @param object
 */
function QueryCondition(object) {
    this.label = object.label;
    this.field = object.field;
    this.useDataList = object.useDataList;
    this.isInit = object.isInit;
    this.useUrlInit = object.useUrlInit;
    this.initUrl = object.initUrl;
    this.initData = object.initData;
    this.nextCascadeQuery = object.nextCascadeQuery;
    this.cascadeQueryUrl = object.cascadeQueryUrl;

    this.spanClassName = 'querySpan';
    this.inputId = this.field + 'Input';
    this.inputList = this.field + 'Data';
    this.inputClassName = 'queryInput';
    this.dataListId = this.field + 'Data';
    this.selectId = this.field + 'Select';
}
QueryCondition.prototype = {
    init: function () {
        if (isBlank(this.useDataList)) this.useDataList = false;
        if (isBlank(this.useDataList) || !this.useDataList) this.isInit = false;
        if (isBlank(this.isInit) || !this.isInit)this.useUrlInit = false;
        if (isBlank(this.useUrlInit)) this.useUrlInit = false;
        if (isBlank(this.nextCascadeQuery)) this.nextCascadeQuery = false;
    },
    build: function (nextObj) {
        this.init();
        var queryElement = this.createLabel();
        var inputElement = YDC.elementBuilder.input(this.inputId, this.inputClassName);
        if (this.useDataList) inputElement.setAttribute('list', this.inputList);
        var nextObject = nextObj == undefined ? null : new QueryCondition(nextObj);
        queryElement.appendChild(inputElement);
        if (this.useDataList) {
            var dataListElement = YDC.elementBuilder.dataList(this.dataListId);
            var selectElement = YDC.elementBuilder.select(this.selectId);
            if (this.isInit) {
                if (this.useUrlInit) {
                    $.ajax({
                        url: this.initUrl,
                        dataType: "json",
                        success: function (data) {
                            $(data).each(function () {
                                selectElement.options.add(YDC.elementBuilder.option(this));
                            });
                        }
                    });
                } else {
                    for (var k = 0; k < this.initData.length; k++)
                        selectElement.options.add(YDC.elementBuilder.option(this.initData[k]));
                }
            }
            dataListElement.appendChild(selectElement);
            queryElement.appendChild(dataListElement);
            if (this.nextCascadeQuery && !isBlank(nextObject)) {
                var nextSelectId = '#' + nextObject.selectId;
                var nextInputId = '#' + nextObject.inputId;
                var currentId = '#' + this.inputId;
                var cascadeQueryUrl = this.cascadeQueryUrl;
                inputElement.onblur = function () {
                    $(nextInputId).attr('value', '');
                    $(nextSelectId).removeAttr('option');
                    var conditionValue = $(currentId).val();
                    var optionStr = '';
                    $.ajax({
                        url: cascadeQueryUrl,
                        data: {conditionValue: conditionValue},
                        dataType: "json",
                        success: function (data) {
                            $(data).each(function () {
                                optionStr += "<option value='" + this + "'" + ">" + "</option>"
                            });
                            $(nextSelectId).html(optionStr);
                        }
                    });
                }
            }
        } else {
            inputElement.id = this.inputId;
        }
        return queryElement;
    },
    createLabel: function () {
        var labelElement = document.createElement('div');
        var spanElement = document.createElement('span');
        spanElement.className = this.spanClassName;
        spanElement.innerText = this.label;
        labelElement.appendChild(spanElement);
        return labelElement;
    }
};
