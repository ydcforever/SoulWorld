/**
 * Created by ydc on 2018/7/1.
 */
/**
 * API
 * construct <ul> <li> <a> <fixedImg/> <span/> <ECImg/> </a> </li> <ul>
 * ul {
 *    id : 'ul'+菜单id
 *    className : 'treeLevel' + depth
 * }
 *
 * li {
 *    className : 'treeLi' + depth;
 * }
 *
 * a {
 *    className : 'treeA' + depth;
 * }
 *
 * fixedImg {
 *    id : 'fixedImg'+菜单id
 *    className : 'fixedImg'
 * }
 *
 * ECImg {
 *    id : 'ECImg'+菜单id
 *    className : 'treeImg' + depth
 * }
 *
 * span {
 *    className : 'treeText' + depth;
 * }
 */

/**
 * config css
 */
function Config() {
    this.useImg = true;
    this.usePrefixIcon = false;
    this.useExpandedCollapseImg = true;
    this.expandedImgUrl = '';
    this.collapseImgUrl = '';
    this.leftECImg = false;
    this.ECImgWidth = 15;
    this.prefixIconWidth = 15;
    this.iconPaddingRight = 5;
}
var treeClassName = {
    treeLevel: 'treeLevel',
    ul: 'treeUl',
    li: 'treeLi',
    prefixIcon: 'treePrefixIcon',
    ECImg: 'treeECImg',
    a: 'treeA'
};

/**
 *
 * @param treeId
 * @param nodes
 * @param contentId
 * @param newConfig
 * @param rootId
 */
function YTree(treeId, nodes, contentId, newConfig, rootId) {
    this.treeId = treeId;
    this.nodes = nodes;
    this.contentId = contentId;
    this.config = newConfig == undefined ? new Config() : newConfig;
    this.rootId = rootId == undefined ? 0 : rootId;
}

YTree.prototype.build = function ($navBar) {
    if (this.config.useFixedImg) {
        this.config.leftECImg = false;
    }
    if (this.config.leftECImg) {
        this.config.usePrefixIcon = false;
    }
    var treeElement = document.createElement('div');
    treeElement.id = this.treeId;
    treeElement.style.height = '100%';
    treeElement.style.float = 'left';
    treeElement.style.width = '90%';
    $navBar.append(treeElement);
    tree($(treeElement), this.rootId, this.nodes, this.config, true, this.contentId, treeClassName);
};

/**
 *
 * @param $root
 * @param id
 * @param nodes
 * @param config
 * @param isExpanded
 * @param contentId
 * @param namespace
 */
function tree($root, id, nodes, config, isExpanded, contentId, namespace) {
    var children = selectChildren(id, nodes);
    if (children.length > 0) {
        var d = depth(0, id, nodes);
        var levelElement = YDC.elementBuilder.ul((namespace.ul + id), (namespace.treeLevel + d), isExpanded);
        $root.append(levelElement);
        for (var i = 0; i < children.length; i++) {
            var cid = children[i].id;
            var leaf = isLeaf(cid, nodes);
            var liElement = YDC.elementBuilder.li(treeClassName.li + d);
            levelElement.appendChild(liElement);
            var aElement = aLabel(children[i], d, leaf, config, contentId, namespace);
            liElement.appendChild(aElement);
            treeNode($(aElement), children[i], leaf, config, treeClassName);
            tree($(liElement), cid, nodes, config, children[i].isExpanded, contentId, namespace);
        }
    }
}

/**
 * create a label
 * @param node
 * @param depth
 * @param isLeaf
 * @param config
 * @param contentId
 * @param namespace
 * @returns {HTMLElement}
 */
function aLabel(node, depth, isLeaf, config, contentId, namespace) {
    var aElement = YDC.elementBuilder.a(namespace.a + depth);
    aElement.style.textDecoration = 'none';
    aElement.style.color = 'black';
    if (isLeaf) {
        aElement.href = 'javascript:loadContent("' + contentId + '","' + node.url + '")';
    } else {
        aElement.href = 'javascript:changeECImg("' + node.id + '","' + namespace.ul + '","'
        + namespace.ECImg + '","' + config.useExpandedCollapseImg + '","'
        + node.expandedImgUrl + '","' + node.collapseImgUrl + '")';
    }
    return aElement;
}

/**
 *
 * @param $parent
 * @param node
 * @param isLeaf
 * @param config
 * @param namespace
 */
function treeNode($parent, node, isLeaf, config, namespace) {
    var prefixIcon, ECImg;
    var prefixIconW = config.usePrefixIcon ? config.prefixIconWidth : 0;
    var ECImgW = config.useExpandedCollapseImg ? config.ECImgWidth : 0;
    var right = config.useImg ? config.iconPaddingRight : 0;
    var menuText = $('<div style="display:inline-block;vertical-align: middle;width:' + (100 - prefixIconW - ECImgW - right) + '%">' + node.name + '</div>');
    if (config.useImg) {
        if (config.usePrefixIcon && !isLeaf) {
            prefixIcon = $('<img id="' + namespace.prefixIcon + node.id + '" class="' + namespace.prefixIcon +
            '" width="' + config.prefixIconWidth + '%" src="' + node.fixedImgUrl
            + '" alt="" style="display:inline-block;vertical-align:middle;padding-right:' + config.iconPaddingRight + '%"/>');
            $parent.append(prefixIcon);
        }
        if (config.useExpandedCollapseImg && !isLeaf) {
            ECImg = $('<img id="' + namespace.ECImg + node.id + '" class="' + namespace.ECImg +
            '" width="' + config.ECImgWidth + '%" alt="" src="' + ( node.isExpanded ? node.expandedImgUrl : node.collapseImgUrl)
            + '" style="display:inline-block;vertical-align:middle;"/>');
            if (config.leftECImg) {
                $parent.append(ECImg);
                $(ECImg).css('padding-right', config.iconPaddingRight + '%');
                $parent.append(menuText);
            } else {
                $parent.append(menuText);
                $parent.append(ECImg);
            }
        }
        if (isLeaf) {
            if (config.leftECImg || config.usePrefixIcon)
                $(menuText).css({'padding-left': (config.ECImgWidth + config.iconPaddingRight) + '%'});
            $parent.append(menuText);
        }
    } else {
        $parent.append(menuText);
    }
}

/**
 * exchange expanded img and collapse img
 */
function changeECImg(id, ulClassName, ECImgClassName, useExpandedCollapseImg, expandedImgUrl, collapseImgUrl) {
    var levelElement = $('#' + ulClassName + id);
    var imgElement = $('#' + ECImgClassName + id);
    if (levelElement.css('display') == 'none') {
        levelElement.css('display', 'block');
        if (useExpandedCollapseImg) imgElement.attr('src', expandedImgUrl);
    } else {
        levelElement.css('display', 'none');
        if (useExpandedCollapseImg) imgElement.attr('src', collapseImgUrl);
    }
}

function selectChildren(id, nodes) {
    var children = [];
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].pid == id)
            children.push(nodes[i]);
    }
    return children;
}

function isLeaf(id, nodes) {
    for (var i = 0, len = nodes.length; i < len; i++) {
        if (nodes[i].pid == id)
            return false;
    }
    return true;
}

function depth(height, pid, nodes) {
    var p = -1;
    for (var i = 0; i < nodes.length; i++) {
        if (pid == nodes[i].id) {
            p = nodes[i].pid;
            break;
        }
    }
    if (p == -1) {
        return height;
    } else {
        height++;
        return depth(height, p, nodes);
    }
}