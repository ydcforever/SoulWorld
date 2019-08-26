/**
 * Created by ydc on 2018/7/4.
 */

(function ($, window, document, undefined) {
    $.fn.selfTable = function ($form, url,columns, $queryButton) {
        selfBootstrapTable(this, url, $form, columns);
        $queryButton.click(function () {
            $(this).bootstrapTable('refresh');
        });
    }
})(jQuery, window, document);

function selfBootstrapTable($table, url, $form, columns) {
    $table.bootstrapTable({
        url: url, // 获取表格数据的url
        cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
        striped: true,  //表格显示条纹，默认为false
        pagination: true, // 在表格底部显示分页组件，默认false
        pageList: [10, 20], // 设置页面可以显示的数据条数
        pageSize: 10, // 页面数据条数
        pageNumber: 1, // 首页页码
        sidePagination: 'server', // 设置为服务器端分页
        queryParams: function (params) { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
            return serializeForm($form, params);
        },
        columns: columns,
        onLoadSuccess: function () {  //加载成功时执行
            console.info("加载成功");
        },
        onLoadError: function () {  //加载失败时执行
            console.info("加载数据失败");
        }
    });
}

function serializeForm($form, params) {
    var obj = {
        offset: params.offset,
        pageSize: params.limit
    };
    $.each($form.serializeArray(), function (index) {
        if (obj[this['name']]) {
            obj[this['name']] = obj[this['name']] + ',' + this['value'];
        } else {
            obj[this['name']] = this['value'];
        }
    });
    return obj;
};