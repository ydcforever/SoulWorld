/**
 * ��ʼ��camera
 */
function initCamera(angle,near_screen,far_screen,x_offset,y_offset,z_offset){
    //�ɵ��Զ�75���ӽ�;�ݺ��;�Ͻ���׶ƽ��;��Զ��׶ƽ��
    var camera = new THREE.PerspectiveCamera(angle, window.innerWidth/window.innerHeight,near_screen, far_screen);
    //���λ��Z������50��λ
	camera.position.set(x_offset,y_offset,z_offset);
	camera.lookAt(new THREE.Vector3(0,0,0));
	return camera;
}

function initCamera(angle,near_screen,far_screen,z_offset){
    //�ɵ��Զ�75���ӽ�;�ݺ��;�Ͻ���׶ƽ��;��Զ��׶ƽ��
    var camera = new THREE.PerspectiveCamera(angle, window.innerWidth/window.innerHeight,near_screen, far_screen);
    //���λ��,����λ�ÿ�����
	camera.position.z = z_offset;
	camera.lookAt(new THREE.Vector3(0,0,0));
	return camera;
}