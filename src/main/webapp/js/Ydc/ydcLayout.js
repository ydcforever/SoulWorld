/**
 * Created by ydc on 2018/7/3.
 */
/**
 * rowCss {
 *   useMarginTop 默认使用
 *   except 不参与布局的控件
 *   horizontal { width , textAlign , marginLeft}
 *   height
 *   margin-top
 * }
 */
(function ($, window, document, undefined) {
    $.fn.setLayout = function (rowsCss, layoutConfig) {
        var config = layoutConfig == undefined ? new LayoutConfig() : layoutConfig;
        setLayout(this, rowsCss, config);
    }
})(jQuery, window, document);

function LayoutConfig() {
    this.childClass = 'child-row';
    this.height = '40px';
    this.marginLeft = '0px';
    this.textAlign = 'center';
    this.fontSize = '14px';
    this.marginTop = '20px';
    this.fontFamily ='"Microsoft Yahei", Arial';
        //'Geogia, "Times New Roman", Times, serif';
}

function setLayout(row, rowsCss, layoutConfig) {
    $(row).each(function (i) {
        $(this).css({'font-size': '0', 'font-family': layoutConfig.fontFamily});
        if (rowsCss[i].useMarginTop == undefined || rowsCss[i].useMarginTop) {
            $(this).css({'margin-top': rowsCss[i].marginTop == undefined ? layoutConfig.marginTop : rowsCss[i].marginTop});
        }
        var child = $(this).children().not(rowsCss[i].except);
        //$(this).find('.' + layoutConfig.childClass);
        var rowHeight = rowsCss[i].height == undefined ? layoutConfig.height : rowsCss[i].height;
        child.css({
            'font-size': layoutConfig.fontSize,
            'display': 'inline-block',
            'vertical-align': 'middle',
            'height': rowHeight,
            'line-height': rowHeight
        });
        child.each(function (k) {
            $(this).css({
                'width': rowsCss[i].horizontal[k].width,
                'text-align': (rowsCss[i].horizontal[k].textAlign == undefined ? layoutConfig.textAlign :
                    rowsCss[i].horizontal[k].textAlign),
                'margin-left': (rowsCss[i].horizontal[k].marginLeft == undefined ? layoutConfig.marginLeft : rowsCss[i].horizontal[k].marginLeft)
            });
        });
    });
}
