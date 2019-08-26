/**
 * 光源
 */
function CreateLight(){
    var pointLight = new THREE.PointLight(0xFF00FF);
	//光距
	pointLight.distance = 500;
	//光强
	pointLight.intensity = 2;
	//点光源位
	pointLight.position.x = 20;
	pointLight.position.y = 30;
	pointLight.position.z = 150;
    return pointLight;
}