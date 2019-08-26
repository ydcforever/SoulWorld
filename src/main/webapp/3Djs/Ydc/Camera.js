/**
 * 初始化camera
 */
function initCamera(angle,near_screen,far_screen,x_offset,y_offset,z_offset){
    //由底自顶75°视角;纵横比;较近视锥平面;较远视锥平面
    var camera = new THREE.PerspectiveCamera(angle, window.innerWidth/window.innerHeight,near_screen, far_screen);
    //相机位置Z轴下移50单位
	camera.position.set(x_offset,y_offset,z_offset);
	camera.lookAt(new THREE.Vector3(0,0,0));
	return camera;
}

function initCamera(angle,near_screen,far_screen,z_offset){
    //由底自顶75°视角;纵横比;较近视锥平面;较远视锥平面
    var camera = new THREE.PerspectiveCamera(angle, window.innerWidth/window.innerHeight,near_screen, far_screen);
    //相机位置,超出位置看不见
	camera.position.z = z_offset;
	camera.lookAt(new THREE.Vector3(0,0,0));
	return camera;
}