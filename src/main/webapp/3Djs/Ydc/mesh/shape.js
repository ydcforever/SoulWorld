/**
 * 几何图形
 */
function CreateShape(){
    var rectShape = new THREE.Shape();
    rectShape.moveTo(10,40);
	rectShape.lineTo(10,80);
	rectShape.lineTo(50,80);
	rectShape.lineTo(50,40);
    rectShape.lineTo(30,-40);
	rectShape.lineTo(10,40);
	var geometry = new THREE.ShapeGeometry(rectShape);
	//简单的颜色或显示线框
	var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	return new THREE.Mesh(geometry,material);
}