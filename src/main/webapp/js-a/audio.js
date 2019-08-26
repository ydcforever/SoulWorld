/**
 * Created by YDC on 2018/5/6.
 */
function YAudio(audioId, progressBar, isPlayBar) {
    this.audioId = audioId;
    this.progressBar = progressBar;
    this.isPlayBar = isPlayBar;
}
YAudio.prototype = {
    build: function (playId, playImgUrl, pauseImgUrl, currentTimeId, audioTotalTimeId) {
        this.progressBarEvent();
        if (this.isPlayBar) {
            this.exchangePlayPauseImg(playId, playImgUrl, pauseImgUrl);
            this.flashProgressBar(currentTimeId, 50);
            this.audioTotalTime(audioTotalTimeId);
        }
    },
    /**
     * 点击进度条
     * 滑块onmouseover事件
     */
    progressBarEvent: function () {
        var audioElement = document.getElementById(this.audioId);
        var processBarElement = document.getElementById(this.progressBar.progressBarId);
        var processLoadElement = document.getElementById(this.progressBar.progressLoadId);
        var controllerElement = document.getElementById(this.progressBar.controllerId);
        var isPlayBar = this.isPlayBar;
        var useSlider = this.progressBar.useSlider;
        var sliderSize = this.progressBar.sliderSize;
        processBarElement.onclick = function () {
            var event = event || window.event;
            event.preventDefault();
            var left = $('#' + processBarElement.id).offset().left;
            var currentLength = event.clientX - left;
            var percent = currentLength / parseInt(processBarElement.style.width);
            if (isPlayBar)
                audioElement.currentTime = percent * audioElement.duration;
            else {
                audioElement.volume = percent;
                processLoadElement.style.width = currentLength + 'px';
                if (useSlider)
                    controllerElement.style.marginLeft = (currentLength - sliderSize / 2) + 'px';
            }
        };
        if (!this.progressBar.showSlider) {
            processBarElement.onmouseover = function () {
                controllerElement.style.display = 'block';
            };
            processBarElement.onmouseout = function () {
                controllerElement.style.display = 'none';
            }
        }
    },
    /**
     * 播放时刷新进度条
     * @param currentTimeId
     * @param delay
     */
    flashProgressBar: function (currentTimeId, delay) {
        var sliderId = this.progressBar.useSlider ? this.progressBar.controllerId : '';
        YDC.audio.flashProgressBar(this.audioId, this.progressBar.progressLoadId, this.progressBar.progressBarLength, currentTimeId, delay, sliderId, this.progressBar.sliderSize);
    },
    /**
     * 播放与停止
     * @param playImgId
     * @param playImgUrl
     * @param pauseImgUrl
     */
    exchangePlayPauseImg: function (playImgId, playImgUrl, pauseImgUrl) {
        var audioElement = document.getElementById(this.audioId);
        var playElement = document.getElementById(playImgId);
        playElement.onclick = function () {
            event.stopPropagation();
            if (audioElement.paused) {
                playElement.src = playImgUrl;
                audioElement.play();
            } else {
                playElement.src = pauseImgUrl;
                audioElement.pause();
            }
        }
    },
    /**
     * 音频总时长
     * @param audioTotalTimeId
     */
    audioTotalTime: function (audioTotalTimeId) {
        var audioElement = document.getElementById(this.audioId);
        audioElement.oncanplay = function () {
            event.stopPropagation();
            document.getElementById(audioTotalTimeId).innerText = YDC.audio.formatTime(audioElement.duration);
        }
    }
};

/**
 * 进度条
 * useSlider 默认使用滑块
 * showSlider 默认onmouseover显示
 * drawSlider 默认画滑块：canvasElement 默认样式⊙
 * @param containerId
 * @constructor
 */
function ProgressBar(containerId) {
    this.containerId = containerId;
    this.borderRadius = 15;

    this.progressBarClassName = 'progressBar';
    this.progressBarId = '';
    this.progressBarLength = 120;
    this.progressBarHeight = 8;
    this.progressBarColor = '#181818';

    this.useBufferBar = false;
    this.bufferClassName = 'buffer';
    this.bufferId = '';
    this.bufferColor = 'gray';
    this.bufferLength = 0;

    this.progressLoadClassName = 'progressLoad';
    this.progressLoadId = '';
    this.progressLoadColor = '#c70c0c';
    this.progressLoadLength = 0;

    this.controllerClassName = 'controller';
    this.controllerId = '';

    this.sliderClassName = 'slider';
    this.sliderId = '';

    this.useSlider = true;
    this.sliderSize = 16;
    this.sliderLocalFixed = 0;
    this.showSlider = false;
    this.drawSlider = true;
    this.sliderImgUrl = './img/point.png';
}
ProgressBar.prototype = {
    init: function () {
        this.progressBarId = this.progressBarClassName + '_' + this.containerId;
        this.bufferId = this.bufferClassName + '_' + this.containerId;
        this.bufferLength = this.progressBarLength / 2;
        this.progressLoadId = this.progressLoadClassName + '_' + this.containerId;
        this.controllerId = this.controllerClassName + '_' + this.containerId;
        this.sliderId = this.sliderClassName + '_' + this.containerId;
        if (this.drawSlider && isBlank(this.canvasElement)) {
            this.canvasElement = new DrawSliderImg(this.sliderId, this.sliderSize).draw();
        }
    },
    build: function () {
        this.init();
        var progressBarElement = YDC.elementBuilder.div(this.progressBarId, this.progressBarClassName, 'relative',
            this.progressBarLength, this.progressBarHeight, this.borderRadius, this.progressBarColor);
        document.getElementById(this.containerId).appendChild(progressBarElement);
        if (this.useBufferBar) {
            var bufferElement = YDC.elementBuilder.div(this.bufferId, this.bufferClassName, 'absolute',
                this.bufferLength, this.progressBarHeight, this.borderRadius, this.bufferColor);
            progressBarElement.appendChild(bufferElement);
        }
        var progressLoadElement = YDC.elementBuilder.div(this.progressLoadId, this.progressLoadClassName, 'absolute',
            this.progressLoadLength, this.progressBarHeight, this.borderRadius, this.progressLoadColor);
        progressBarElement.appendChild(progressLoadElement);
        if (this.useSlider) {
            var controllerElement = YDC.elementBuilder.div(this.controllerId, this.controllerClassName, 'absolute');
            controllerElement.style.display = this.showSlider ? 'block' : 'none';
            controllerElement.style.marginTop = (this.progressBarHeight / 2.0 - this.sliderSize / 2.0 - this.sliderLocalFixed) + 'px';
            controllerElement.style.marginLeft = (parseInt(progressLoadElement.style.width) - this.sliderSize / 2.0) + 'px';
            progressBarElement.appendChild(controllerElement);
            if (!this.drawSlider) {
                controllerElement.appendChild(YDC.elementBuilder.img(this.sliderId, this.sliderClassName, this.sliderImgUrl, this.sliderSize, this.sliderSize));
            } else {
                controllerElement.appendChild(this.canvasElement);
            }
        }
    }
};

/**
 * 滑块
 * @param sliderId
 * @param sliderSize
 */
function DrawSliderImg(sliderId, sliderSize) {
    this.sliderId = sliderId;
    this.sliderSize = sliderSize;
    this.circleColor = 'white';
    this.useCenterCircle = true;
    this.centerCircleColor = 'red';
}

DrawSliderImg.prototype.draw = function () {
    var canvasElement = YDC.elementBuilder.canvas(this.sliderId, this.sliderSize, this.sliderSize);
    var r = this.sliderSize / 2;
    var cxt = canvasElement.getContext('2d');
    YDC.canvas.drawCircle(cxt, r, r, r, 0, 2 * Math.PI, this.circleColor);
    if (this.useCenterCircle)
        YDC.canvas.drawCircle(cxt, r, r, r / 4, 0, 2 * Math.PI, this.centerCircleColor);
    return canvasElement;
};

//function drag() {
//    var element = document.getElementsByClassName('controller')[0];
//    this.x = 0;
//    this.l = 0;
//    this.isDown = false;
//    this.build = function () {
//        element.onmousedown = function (event) {
//            var event = event || window.event;
//            event.preventDefault();
//            this.x = event.clientX;//鼠标按下
//            this.l = element.offsetLeft//控件左侧;
//            this.isDown = true;
//        };
//        element.onmousemove = function (event) {
//            var event = event || window.event;
//            event.preventDefault();
//            if (!this.isDown) {
//                return;
//            }
//            element.style.left = (event.clientX - this.x) + 'px';
//        };
//        element.onmouseup = function (event) {
//            this.isDown = false;
//        }
//    }
//}