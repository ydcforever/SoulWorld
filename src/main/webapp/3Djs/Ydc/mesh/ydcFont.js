function ydc_load(ydc_text,loader,group,meshs){
	loader.load( ydc_text.font_path, function ( font ) {
		ydc_text.Character_load(font,loader,group,meshs);           
    } );
}

function ydc_text(t_text,p_x,p_y,p_z){
	this.font_path = 'ydc_three/fonts/helvetiker_regular.typeface.js';
	this.font_size = 80;
	this.font_height = 20;
	
	this.ydc_text = t_text;
	
	this.mesh_p_x = p_x;
	this.mesh_p_y = p_y;
	this.mesh_p_z = p_z;
	
	this.mesh_r_x = 0;
	this.mesh_r_y = Math.PI * 2;
	this.mesh_r_z = 0;
}

ydc_text.prototype.Character_load = function(font,loader,group,meshs){
		
		var hash = document.location.hash.substr( 1 );
		if ( hash.length != 0 ) {
			this.theText = hash;
		}
		
		var geometry = new THREE.TextGeometry( this.ydc_text , {
					font: font,
					size: this.font_size,
					height: this.font_height,
					curveSegments: 2
		});	
				
		geometry.computeBoundingBox();
		
		var centerOffset = -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

		var material = new THREE.MultiMaterial( [
			new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } ),
		    new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } )
		] );

		var mesh = new THREE.Mesh( geometry, material );

		mesh.position.x = this.mesh_p_x;
		mesh.position.y = this.mesh_p_y;
		mesh.position.z = this.mesh_p_z;

		mesh.rotation.x = this.mesh_r_x;
		mesh.rotation.y = this.mesh_r_y;
		meshs.push(mesh);
		group.add(mesh); 
}

		