/**
 * Created by ydc on 2018/6/27.
 */
(function ($, window, document, undefined) {
    $.fn.drag = function ($parentContainer, isStretch) {
        drag($parentContainer, this, isStretch);
    }
})(jQuery, window, document);

/**
 *
 * @param $parentContainer
 * @param $target
 * @param isStretch
 */
function drag($parentContainer, $target, isStretch) {
    var stretch = isStretch == undefined ? true : isStretch;
    $target.each(function () {
        if (stretch) {
            cursorIcon($(this), 10);
        }
        dragWidget($parentContainer, $(this), 5, stretch, 10);
    });
}

/**
 * 控件尺寸
 * @param $target
 * @param mouseX
 * @param mouseY
 */
function DragObject($target, mouseX, mouseY) {
    this.width = $target.width();
    this.height = $target.height();
    this.left = $target.offset().left;
    this.top = $target.offset().top;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    //鼠标相对控件的位置
    this.mousePaddingX = this.mouseX - this.left;
    this.mousePaddingY = this.mouseY - this.top;
}

/**
 * 拖拽控件
 * @param $parentContainer
 * @param $target
 * @param dragGranularity
 * @param isStretch
 * @param cursorResponseRangeWidth
 * @param cursorResponseRangeLength
 * @param stretchGranularity
 */
function dragWidget($parentContainer, $target, dragGranularity, isStretch, cursorResponseRangeWidth, cursorResponseRangeLength, stretchGranularity) {
    var originDragObject = new DragObject($target, 0, 0);
    $target.mousedown(function (e) {
        var beforeDragObject, draggingObject;
        var downEvent = e || window.event;
        downEvent.preventDefault();
        var mouseDownPosition = YDC.mouse.position(downEvent);
        beforeDragObject = new DragObject($target, mouseDownPosition.x, mouseDownPosition.y);
        var direction = isStretch ? cursorLocation(beforeDragObject, cursorResponseRangeWidth, cursorResponseRangeLength) : 'none';
        document.onmousemove = function (e) {
            var moveEvent = e || window.event;
            moveEvent.preventDefault();
            var mouseMovePosition = YDC.mouse.position(moveEvent);
            draggingObject = new DragObject($target, mouseMovePosition.x, mouseMovePosition.y);
            resetCss($parentContainer, $target, originDragObject, beforeDragObject, draggingObject, direction, dragGranularity, stretchGranularity);
        };
        document.onmouseup = function (e) {
            var upEvent = e || window.event;
            upEvent.preventDefault();
            document.onmousemove = null;
            document.onmouseup = null;
        };
    });
}

/**
 * 修改样式
 * @param $parentContainer
 * @param $target
 * @param originDragObject
 * @param beforeDragObject
 * @param draggingObject
 * @param direction
 * @param dragGranularity
 * @param stretchGranularity
 */
function resetCss($parentContainer, $target, originDragObject, beforeDragObject, draggingObject, direction, dragGranularity, stretchGranularity) {
    var dx = draggingObject.mouseX - beforeDragObject.mouseX;
    var dy = draggingObject.mouseY - beforeDragObject.mouseY;
    if (dx != 0 || dy != 0) {
        var cl = $parentContainer.offset().left;
        var ct = $parentContainer.offset().top;
        var cw = $parentContainer.width();
        var ch = $parentContainer.height();
        if (direction == 'none') {
            $target.offset({
                left: dragRangeLimit(cl, cw, beforeDragObject.left + dx, beforeDragObject.width),
                top: fixGranularity(dragRangeLimit(ct, ch, beforeDragObject.top + dy, beforeDragObject.height), dragGranularity, ct)
            });
        } else {
            if (direction.search('left') != -1) {
                var currentWidth = beforeDragObject.width - dx;
                currentWidth = currentWidth > originDragObject.width ? currentWidth : originDragObject.width;
                var left = dragRangeLimit(cl, cw, beforeDragObject.left + dx, currentWidth);
                var dx1 = left - beforeDragObject.left;
                if (currentWidth > originDragObject.width) {
                    $target.css('width', fixGranularity(beforeDragObject.width - dx1, stretchGranularity, originDragObject.width));
                    $target.offset({'left': left});
                }
            } else if (direction.search('right') != -1) {
                var width = beforeDragObject.left + beforeDragObject.width + dx > cl + cw ? cl + cw - beforeDragObject.left : beforeDragObject.width + dx;
                $target.css('width', fixGranularity(width, stretchGranularity, originDragObject.width));
            }

            if (direction.search('top') != -1) {
                var currentTop = beforeDragObject.top + dy;
                var currentHeight = beforeDragObject.height - dy;
                currentHeight = currentHeight > originDragObject.height ? currentHeight : originDragObject.height;
                var top = dragRangeLimit(ct, ch, currentTop, currentHeight);
                var dy1 = top - beforeDragObject.top;
                if (currentHeight > originDragObject.height) {
                    $target.css('height', fixGranularity(beforeDragObject.height - dy1, stretchGranularity, originDragObject.height));
                    $target.offset({'top': top});
                }
            } else if (direction.search('bottom') != -1) {
                var height = beforeDragObject.top + beforeDragObject.height + dy > ct + ch ? ct + ch - beforeDragObject.top : beforeDragObject.height + dy;
                $target.css('height', fixGranularity(height, stretchGranularity, originDragObject.height));
            }
        }
    }
}

/**
 * 光标样式
 * @param $target
 * @param cursorResponseRangeWidth
 * @param cursorResponseRangeLength
 */
function cursorIcon($target, cursorResponseRangeWidth, cursorResponseRangeLength) {
    $target.mousemove(function (e) {
        var event = e || window.event;
        event.preventDefault();
        var mousePosition = YDC.mouse.position(event);
        var location = cursorLocation(new DragObject($target, mousePosition.x, mousePosition.y), cursorResponseRangeWidth, cursorResponseRangeLength);
        if (location == 'left' || location == 'right') {
            $target.css('cursor', 'w-resize');
        } else if (location == 'top' || location == 'bottom') {
            $target.css('cursor', 'n-resize');
        } else if (location == 'left_top' || location == 'right_bottom') {
            $target.css('cursor', 'nw-resize');
        } else if (location == 'left_bottom' || location == 'right_top') {
            $target.css('cursor', 'ne-resize');
        } else {
            $target.css('cursor', 'default');
        }
    });
}

/**
 * 拖拽方向
 * @param dragObject
 * @param cursorResponseRangeWidth
 * @param cursorResponseRangeLength
 * @returns {string}
 */
function cursorLocation(dragObject, cursorResponseRangeWidth, cursorResponseRangeLength) {
    var mousePaddingX = dragObject.mousePaddingX;
    var mousePaddingY = dragObject.mousePaddingY;
    var width = dragObject.width;
    var height = dragObject.height;
    var dx = cursorResponseRangeWidth;
    var dy = cursorResponseRangeLength == undefined ? dx : cursorResponseRangeLength;
    var location = 'none';
    if (mousePaddingX > -dx && mousePaddingX < dx) {
        if (mousePaddingY > -dy && mousePaddingY < dy) {
            location = 'left_top';
        } else if (mousePaddingY > height - dy && mousePaddingY < height + dy) {
            location = 'left_bottom';
        } else if (mousePaddingY >= dy && mousePaddingY <= height - dy) {
            location = 'left';
        }
    }
    else if (mousePaddingX >= dx && mousePaddingX <= width - dx) {
        if (mousePaddingY > -dy && mousePaddingY < dy) {
            location = 'top';
        } else if (mousePaddingY > height - dy && mousePaddingY < height + dy) {
            location = 'bottom';
        }
    }
    else if (mousePaddingX > width - dx && mousePaddingX < width + dx) {
        if (mousePaddingY > -dy && mousePaddingY < dy) {
            location = 'right_top';
        } else if (mousePaddingY > height - dy && mousePaddingY < height + dy) {
            location = 'right_bottom';
        } else if (mousePaddingY >= dy && mousePaddingY <= height - dy) {
            location = 'right';
        }
    }
    return location;
}

/**
 * 像素校准
 * @param size
 * @param granularity
 * @param originSize
 * @returns {*}
 */
function fixGranularity(size, granularity, originSize) {
    if (granularity == undefined || granularity == 0) {
        return size > originSize ? size : originSize;
    } else {
        var fix = Math.ceil(size / granularity) * granularity;
        return fix > originSize ? fix : originSize;
    }
}

/**
 * 控件拖拽范围
 * @param parentOffset
 * @param parentLength
 * @param offset
 * @param length
 * @returns {*}
 */
function dragRangeLimit(parentOffset, parentLength, offset, length) {
    if (offset < parentOffset) {
        return parentOffset;
    } else if (offset + length > parentOffset + parentLength) {
        return parentOffset + parentLength - length;
    } else {
        return offset;
    }
}


