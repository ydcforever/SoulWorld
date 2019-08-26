var Snow = {
	snowModel : function(rangle){
		this.points = new Array();
	    this.positions = new Array();
	    this.colors = new Array();
	    this.indices = new Array();
	    this.nextPosition = 0;
	    this.rangle = rangle == undefined ? 60 * Math.PI / 180.0 : rangle;
	},
	defaultSnow : function(x,y,z,sideLength,depth){
		this.snowModel();
		this.points = [new THREE.Vector3(x-sideLength/2, y-sideLength/2/Math.sqrt(3), z),
						new THREE.Vector3(x, y+sideLength/Math.sqrt(3), z),
						new THREE.Vector3(x+sideLength/2, y-sideLength/2/Math.sqrt(3), z)];	
        this.flake(true,depth);	
	},
	flake : function(isCricle, depth){
		// add  p0
	    this.addVertex(this.points[0]);
        // draw p0~p1 ; p1~p2
	    for (var pIndex=0; pIndex < this.points.length-1; pIndex++) {
		    this.flakeIteration(this.points[pIndex], this.points[pIndex+1], depth);
	    }
	    //draw p2~p0
	    if (isCricle) 
		    this.flakeIteration(this.points[this.points.length-1], this.points[0], depth);
	},
	//添加顶点
	addVertex : function(v){
		//防止点过多
        //if (this.nextPosition == 0xffff)
	    //	throw new Error("Too many points");
	
	    //positions location
	    this.positions.push(v.x, v.y, v.z);
	
	    //0.5~1, 0.5~1, 1
		this.colors.push(Math.random()*0.5+0.5, Math.random()*0.5+0.5, 1);
			    	
	    this.nextPosition++;
	},
	//       p2
    //       /\
    // p0_ _/  \_ _p4	 depth = 1
    //     p1  p3	
	flakeIteration : function(p0, p4, depth){
		//当前depth = 1
	    if (--depth < 0) {
		    var i = this.nextPosition-1; // p0 already there	
		    //   p1,   p2,   p3,   p4
		    this.addVertex(p4);
		    //   0,1;  1,2;  2,3;  3,4
		    this.indices.push(i, i+1);
     	    return;
	    }
	    //p4.x-p0.x;  p4.y-p0.y;  p4.z-p0.z
	    //point减
	    var v = p4.clone().sub(p0);	
	    //Δx/3;  Δy/3;  Δz/3 
	    //point乘
	    var dv = v.clone().multiplyScalar(1.0/3.0);
	    //p0.x+Δx/3;  p0.y+Δy/3;  p0.z+Δz/3
	    //point加
	    var p1 = p0.clone().add(dv);
	    //原点至点(x,y)的方位角
	    var angle = Math.atan2(v.y, v.x) + this.rangle;
	    var length = dv.length();
	    var p2 = p1.clone();
	    p2.x += Math.cos(angle) * length;
	    p2.y += Math.sin(angle) * length;
	    var p3 = p0.clone().add(dv).add(dv);
	    //depth = 0 已经是直线
	    this.flakeIteration(p0, p1, depth);
	    this.flakeIteration(p1, p2, depth);
	    this.flakeIteration(p2, p3, depth);
	    this.flakeIteration(p3, p4, depth);
	},
	snowMesh : function() {
		var geometry = new THREE.BufferGeometry();
		var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });
		geometry.setIndex( new THREE.BufferAttribute( new Uint16Array( this.indices ), 1 ) );
		geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( this.positions ), 3 ) );
		geometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( this.colors ), 3 ) );
		geometry.computeBoundingSphere();
	
		var mesh = new THREE.LineSegments( geometry, material );
		mesh.position.x -= 1200;
		mesh.position.y -= 1200;
		return mesh;
	}
}



