function initText(scene){
    var loader = new THREE.FontLoader();
    loader.load('test.json',function(response){
        var font = response;
        var textGeometry = new THREE.TextGeometry("three.js",{
            "font" : font,
            "size" : 70,
            "height" : 20,
            "bevelEnabled" : true,
            "bevelSize": 2
        })

        text = new THREE.Mesh(textGeometry,new THREE.MultiMaterial( [
            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } ),
            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } ) 
        ] ))

        textGeometry.computeBoundingBox();

        var centerOffset = -0.5 * (textGeometry.boundingBox.max.x-textGeometry.boundingBox.min.x);
        text.position.x = centerOffset;
        text.position.y = 30;

        var mirror = new THREE.Mesh(textGeometry,new THREE.MultiMaterial( [
            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } ),
            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } )
        ] ))

        mirror.rotation.x = Math.PI;
        mirror.position.x = centerOffset;
        mirror.position.z = 20;
        mirror.position.y = -30;
        scene.add(text);
        scene.add(mirror);

        var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 10000, 10000 ),
        new THREE.MeshBasicMaterial( { color: 0xfffffff, opacity: 0.5, transparent: true } )
        );
        plane.rotation.x = -Math.PI/2;  
        plane.position.y = 0;
        scene.add(plane);
    })

}