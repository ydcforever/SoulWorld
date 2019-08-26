/**
 * Created by T440 on 2018/5/18.
 */
function ydcTable(tableId, data, turnBar) {
    $('#' + tableId).append(data.build());
    if (turnBar !== undefined) {
        $('#' + tableId).append(turnBar.build(data));
        $('#' + turnBar.currentPageId).attr("value", data.currentPage);
        $('#' + turnBar.turnBarId).prepend("共" + data.totalPage + "页").append("总记录" + data.results.length + "条");
        //$('#' + turnBar.turnBarId).append("总记录" + data.results.length + "条");
    }
}
function ydcTableData(results, widths, titleColumnNames) {
    this.results = results;
    this.widths = widths;
    this.titleColumnNames = titleColumnNames;
    this.dataAreaId = 'ydcData';
    this.metadataId = 'ydcMetadata';
    this.pageSize = 2;
    //this.totalPage;
    this.currentPage = 1;
}
ydcTableData.prototype = {
    init: function () {
        this.totalPage = Math.ceil(this.results.length / this.pageSize);
    },
    build: function () {
        this.init();
        var dataAreaElement = document.createElement('div');
        dataAreaElement.id = this.dataAreaId;
        dataAreaElement.appendChild(this.createTitle());
        dataAreaElement.appendChild(this.createRows());
        return dataAreaElement;
    },
    createTitle: function () {
        var titleElement = document.createElement('div');
        var cnt = 0;
        if (isBlank(this.titleColumnNames)) {
            for (var key in this.results[0]) {
                var cellElement = YDC.elementBuilder.tableCellDiv(key);
                cellElement.style.textOverflow = 'ellipsis';
                if (!isBlank(this.widths) && this.widths.length > cnt) {
                    if (!isBlank(this.widths[cnt])) cellElement.style.width = this.widths[cnt];
                }
                titleElement.appendChild(cellElement);
                cnt++;
            }
        } else {
            for (var i = 0; i < this.titleColumnNames.length; i++) {
                var cellElement = YDC.elementBuilder.tableCellDiv(this.titleColumnNames[i]);
                cellElement.style.textOverflow = 'ellipsis';
                if (!isBlank(this.widths) && this.widths.length > cnt) {
                    if (!isBlank(this.widths[cnt])) cellElement.style.width = this.widths[cnt];
                }
                titleElement.appendChild(cellElement);
                cnt++;
            }
        }
        return titleElement;
    },
    createRows: function () {
        var dataElement = document.createElement('div');
        dataElement.id = this.metadataId;
        for (var i = (this.currentPage - 1) * this.pageSize; i < this.currentPage * this.pageSize; i++) {
            var rowElement = this.createRow(this.results[i]);
            if (i % 2 == 0)
                rowElement.style.background='-webkit-gradient(linear,left top,left bottom,from(#FBFBFF),to(#DDDDFF)'
            dataElement.appendChild(rowElement);
        }
        return dataElement;
    },
    createRow: function (result) {
        var rowElement = document.createElement('div');
        var cnt = 0;
        for (var key in result) {
            var cellElement = YDC.elementBuilder.tableCellDiv(result[key]);
            cellElement.style.border = '0.5px solid lightgray';
            cellElement.style.height = '25px';
            if (!isBlank(this.widths) && this.widths.length > cnt) {
                if (!isBlank(this.widths[cnt])) cellElement.style.width = this.widths[cnt];
            }
            cnt++;
            rowElement.appendChild(cellElement);
        }
        return rowElement;
    },
    flash: function (currentPage, pageSize) {
        $('#' + this.metadataId).empty();
        for (var i = (currentPage - 1) * pageSize; i < currentPage * pageSize; i++) {
            $('#' + this.metadataId).append(this.createRow(this.results[i]));
        }
    }
};

function ydcTableTurnBar() {
    this.imgSize = 20;
    this.turnBarId = 'ydcTurnBar';
    this.currentPageId = 'ydcCurrentPage';
    this.previousPageId = 'ydcPreviousPage';
    this.previousPageUrl = './img/previousPage.png';
    this.nextPageId = 'ydcNextPage';
    this.nextPageUrl = './img/nextPage.png';
}
ydcTableTurnBar.prototype = {
    build: function (data) {
        var pageElement = document.createElement('div');
        pageElement.id = this.turnBarId;
        pageElement.style.textAlign = 'center';
        pageElement.appendChild(this.turnPreviousPage(data));
        pageElement.appendChild(this.currentPage(data.currentPage));
        pageElement.appendChild(this.turnNextPage(data));
        return pageElement;
    },
    /**
     * 上一页
     * @param data
     * @returns {HTMLElement}
     */
    turnPreviousPage: function (data) {
        var imgElement = YDC.elementBuilder.img(this.previousPageId, '', this.previousPageUrl, this.imgSize, this.imgSize);
        var currentPageId = this.currentPageId;
        imgElement.onclick = function () {
            var currentPage = parseInt($('#' + currentPageId).val()) - 1;
            currentPage = currentPage < 1 ? 1 : currentPage;
            $('#' + currentPageId).attr("value", currentPage);
            data.flash(currentPage, data.pageSize);
        };
        return imgElement;
    },
    /**
     * 当前页
     * @returns {HTMLElement}
     */
    currentPage: function () {
        var inputElement = YDC.elementBuilder.input(this.currentPageId);
        inputElement.style.width = '40px';
        return inputElement;
    },
    /**
     * 下一页
     * @param data
     * @returns {HTMLElement}
     */
    turnNextPage: function (data) {
        var imgElement = YDC.elementBuilder.img(this.nextPageId, '', this.nextPageUrl, this.imgSize, this.imgSize);
        var currentPageId = this.currentPageId;
        imgElement.onclick = function () {
            var currentPage = parseInt($('#' + currentPageId).val()) + 1;
            currentPage = currentPage > data.totalPage ? data.totalPage : currentPage;
            $('#' + currentPageId).attr("value", currentPage);
            data.flash(currentPage, data.pageSize);
        }
        return imgElement;
    }
}