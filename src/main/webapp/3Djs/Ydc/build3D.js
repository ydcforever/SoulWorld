/**
 * Created by T440 on 2019/4/23.
 */
var ydc3D = {
    camera: function (angle, near_screen, far_screen) {
        //由底自顶75°视角;纵横比;较近视锥平面;较远视锥平面
        var camera = new THREE.PerspectiveCamera(angle, window.innerWidth / window.innerHeight, near_screen, far_screen);
        //相机位置Z轴下移50单位
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        return camera;
    },
    renderer: function (container, renderer, backgroundColor) {
        //屏幕分辨率
        renderer.setPixelRatio(window.devicePixelRatio);
        //渲染器大小
        renderer.setSize(window.innerWidth, window.innerHeight);
        //渲染器颜色
        renderer.setClearColor(backgroundColor, 1);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        container.appendChild(renderer.domElement);
    },
    onWindowResize: function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
};
