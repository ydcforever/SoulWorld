/**
 * 球体
 */
function CreateSphere(){
    var geometry = new THREE.SphereGeometry(50,5,16);
    //金属色泽材质
    var material = new THREE.MeshPhongMaterial({color:0x6622AA});
    return  new THREE.Mesh(geometry,material);
}
		