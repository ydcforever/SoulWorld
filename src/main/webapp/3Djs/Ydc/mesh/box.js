/**
 * ������
 */
function CreateBox(){
    var geometry = new THREE.BoxGeometry(30,30,30);
	//����������Ĳ���
    var material = new THREE.MeshLambertMaterial({color:0xff0000});
    return  new THREE.Mesh(geometry,material);
}