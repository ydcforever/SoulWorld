/**
 * Created by YDC on 2018/5/6.
 */
function Hidden(treeId, treeParentId, loadId) {
    this.treeId = treeId;
    this.treeParentId = treeParentId;
    this.loadId = loadId;
    this.hiddenId = 'hiddenBar';
    this.hiddenImgId = 'hiddenImg';
    this.hiddenImgUrl = './img/hidden.png';
    this.displayImgUrl = './img/show.png';
    this.hiddenImgSize = 22;
}
Hidden.prototype = {
    build: function () {
        var aElement = document.createElement('a');
        aElement.style.display = 'inline-block';
        aElement.style.width = '10%';
        aElement.href = 'javascript:hiddenTree("' + this.treeId + '","' + this.treeParentId + '","' + this.hiddenImgId + '","' + this.loadId
        + '","' + this.displayImgUrl + '","' + this.hiddenImgUrl + '")';
        var divElement = YDC.elementBuilder.tableCellDiv();
        divElement.id = this.hiddenId;
        divElement.style.backgroundColor = 'gray';
        divElement.style.height = '100%';
        divElement.style.lineHeight = '500px';
        aElement.appendChild(divElement);
        divElement.appendChild(YDC.elementBuilder.img(this.hiddenImgId, '', this.hiddenImgUrl, this.hiddenImgSize, this.hiddenImgSize));
        $('#' + this.treeId).after(aElement);
    }
};

/**
 *
 * @param treeId 树的id
 * @param treeParentId 树和隐藏栏的id
 * @param hiddenImgId 隐藏蓝图片的id
 * @param contentId 右侧加载内容id
 * @param displayImgUrl 隐藏的icon
 * @param hiddenImgUrl 展示的icon
 */
function hiddenTree(treeId, treeParentId, hiddenImgId, contentId, displayImgUrl, hiddenImgUrl) {
    var tree = $('#' + treeId);
    var hiddenImg = $('#' + hiddenImgId);
    if (tree.css('display') == 'none') {
        tree.css('display', 'block');
        $('#' + contentId).css('margin-left', $('#' + treeParentId).css('width'));
        hiddenImg.attr('src', hiddenImgUrl);
    } else {
        tree.css('display', 'none');
        $('#' + contentId).css('margin-left', hiddenImg.css('width'));
        hiddenImg.attr('src', displayImgUrl);
    }
}
