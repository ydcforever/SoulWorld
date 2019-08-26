var SoulWorld = {
    soulShard: function (className, id, pageContent, position) {
        this.position = position == undefined ? new SoulWorld.randomPosition() : position;
        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        };
        this.showPage = SoulWorld.soulShowPage(className, id, pageContent);
        this.shard3D = SoulWorld.soulShard3D(this.showPage, this.position);
    },

    soulShard3D: function (showPage, position) {
        var object = new THREE.CSS3DObject(showPage);
        object.position.set(position.x, position.y, position.z);
        return object;
    },

    soulShowPage: function (className, id, pageContent) {
        var showPage = document.createElement('div');
        showPage.className = className;
        showPage.id = id;
        showPage.style.backgroundColor = 'lightblue';
        showPage.innerHTML = pageContent;
        return showPage;
    },

    randomPosition: function () {
        this.worldRange = 4000;
        this.x = -window.innerWidth * 4 + Math.ceil(Math.random() * ( window.innerWidth * 8  ));
        this.y = -window.innerHeight * 4 + Math.ceil(Math.random() * ( window.innerHeight * 8 ));
        this.z = 1000 + Math.ceil(Math.random() * ( this.worldRange - 1000 ));
    },

    //动画
    transform: function (origin, target, duration, render) {
        TWEEN.removeAll();
        new TWEEN.Tween(origin.position)
            .to({x: target.position.x, y: target.position.y, z: target.position.z}, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        new TWEEN.Tween(origin.rotation)
            .to({x: target.rotation.x, y: target.rotation.y, z: target.rotation.z}, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        new TWEEN.Tween(this)
            .to({}, duration * 2)
            .onUpdate(render)
            .start();
    }
};
var SoulEvent = {
    clickSoul: function (object, camera, render) {
        var target = function () {
            this.position = {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z - 4000
            };
            this.rotation = {
                x: 0,
                y: 2 * Math.PI,
                z: 0
            };
        };
        //new THREE.Vector3( 0, 0, 0 );
        SoulWorld.transform(object, new target(), 500, render);
        //camera.position.x = object.x;
        //camera.position.y = object.y;
        //object.z = camera.position.z - scanSoulPosition;
        //camera.lookAt(target);
    }
};