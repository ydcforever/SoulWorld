/**
 * ��Դ
 */
function CreateLight(){
    var pointLight = new THREE.PointLight(0xFF00FF);
	//���
	pointLight.distance = 500;
	//��ǿ
	pointLight.intensity = 2;
	//���Դλ
	pointLight.position.x = 20;
	pointLight.position.y = 30;
	pointLight.position.z = 150;
    return pointLight;
}