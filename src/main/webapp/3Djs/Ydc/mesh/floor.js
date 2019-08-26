/**
 * CreateFloor
 */
function CreateFloor(scene,x_count,y_count,separation){
	var material = new THREE.SpriteMaterial();
    for ( var dx = 0; dx <= x_count; dx++ ) {
	    for ( var dy = 0; dy <= y_count; dy++ ) {
	    particle = new THREE.Sprite( material );
	    particle.scale.y = 20;
		//-x_count*separation/2~x_count*separation/2
	    particle.position.x = dx * separation - ( ( x_count * separation ) / 2 );
	    //-y_count*separation/2~y_count*separation/2
    	particle.position.z = dy * separation - ( ( y_count * separation ) / 2 );
	    scene.add( particle );
	    }
    }
}