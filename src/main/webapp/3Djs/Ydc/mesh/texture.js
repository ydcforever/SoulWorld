function TextureMesh(length, height, texturePath) {
	this.geometry = new THREE.PlaneBufferGeometry( length, height, 2, 2);
    this.geometry.attributes.position.dynamic = true;
	var texture = this.createTexture(texturePath);
	this.material = new THREE.MeshPhongMaterial( {
		map: texture,
		side: THREE.DoubleSide,
		transparent:true
	} );
}

TextureMesh.prototype.createTexture = function(texturePath) {
	var loader = new THREE.TextureLoader();
	var texture = loader.load(texturePath);
	//沿着(S)x,(T)y方向允许纹理重复自己
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	//texture.repeat.set(1,);
	texture.anisotropy = 16;
	return texture;
};

TextureMesh.prototype.getMesh = function() {
	var mesh = new THREE.Mesh(this.geometry, this.material);
	mesh.receiveShadow = true;
	return mesh;
};