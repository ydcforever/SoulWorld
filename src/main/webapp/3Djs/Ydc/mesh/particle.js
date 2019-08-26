/**
 * Created by T440 on 2019/4/27.
 */
function DParticle(particleCount) {
    this.vertices = [];
    this.createVector(particleCount);
}

DParticle.prototype.createVector = function(particleCount) {
    for (var p = 0; p < particleCount; p++) {
        var x = Math.random() * 2000 - 1000;
        var y = Math.random() * 2000 - 1000;
        var z = Math.random() * 2000 - 1000;
        this.vertices.push(x, y, z);
    }
};

function DMaterial(texturePath, color, size) {
    var sprite =  new THREE.TextureLoader().load(texturePath);
    var material = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
    material.color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ] );
    return material;
};

DParticle.prototype.build = function(material){
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', new THREE.Float32Attribute(this.vertices, 3));
    var mesh = new THREE.Points(geometry, material);
    mesh.rotation.x = Math.random() * 6;
    mesh.rotation.y = Math.random() * 6;
    mesh.rotation.z = Math.random() * 6;
    return mesh;
};



