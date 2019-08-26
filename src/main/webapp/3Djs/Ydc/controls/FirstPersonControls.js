/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */

THREE.FirstPersonControls = function ( object, domElement ) {

	this.object = object;
	this.target = new THREE.Vector3( 0, 0, 0 );

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.movementSpeed = 1.0;
	this.lookSpeed = 0.005;

	this.lookVertical = true;
	this.autoForward = false;

	this.activeLook = true;

	this.heightSpeed = false;
	this.heightCoef = 1.0;
	this.heightMin = 0.0;
	this.heightMax = 1.0;

	this.constrainVertical = false;
	this.verticalMin = 0;
	this.verticalMax = Math.PI;

	this.autoSpeedFactor = 0.0;

	this.lat = 0;
	this.lon = 0;
	this.phi = 0;
	this.theta = 0;

	this.mouseMove = false;
	this.mouseDown = false;
	this.mouseUp = false;
	this.mouseDragOn = false;
	
	this.moveForward = false;
	this.moveBackward = false;
	this.rotateLeft = false;
	this.rotateRight = false;
    this.rotateUp = false;
	this.rotateDown = false;
	this.isScrolled = false;
	
	this.viewHalfX = 0;
	this.viewHalfY = 0;

	if ( this.domElement !== document ) {
		this.domElement.setAttribute( 'tabindex', - 1 );
	}

	this.onMouseDown = function ( event ) {
		if ( this.mouseDown ) {
			if ( this.domElement !== document ) {

			    this.domElement.focus();

		    }

		    event.preventDefault();
		    event.stopPropagation();

		    if ( this.activeLook ) {

		    	switch ( event.button ) {

		    		case 0: this.moveForward = true; break;
		    		case 2: this.moveBackward = true; break;

		    	}

		    }

		    this.mouseDragOn = true;
		}
	};

	this.onMouseUp = function ( event ) {
		//if ( this.mouseUp ) {
			
		//}
	};

	this.onMouseMove = function ( event ) {
	    if( this.mouseMove ) {
			if ( this.domElement === document ) {
			    this.mouseX = event.pageX - this.viewHalfX;
			    this.mouseY = event.pageY - this.viewHalfY;
	    	} else {
			    this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			    this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
		    }
		}	
	};
    
	/**
     * 鼠标滚动事件响应
     */
	this.onScroll = function ( event ) {
		event = event || window.event;
		var scrollValue = event.wheelDelta?event.wheelDelta:event.detail * (-1);
        this.isScrolled  = true;
		if ( scrollValue > 0 ) {
			this.rotateUp = true;
		    this.rotateDown = false;
		} else {
			this.rotateUp = false;
			this.rotateDown = true;
		}
	};
	
	/**
	 * 按键响应
	 */
	this.onKeyDown = function ( event ) {
		//event.preventDefault();
		switch ( event.keyCode ) {
			case 38: /*up*/
			case 87: /*W*/ this.moveForward = true; break;

			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = true; break;
			
			case 37: /*left*/
			case 65: /*A*/ this.rotateLeft = true; break;

			case 39: /*right*/
			case 68: /*D*/ this.rotateRight = true; break;

			case 82: /*R*/ this.rotateUp = true; break;
			case 70: /*F*/ this.rotateDown = true; break;
		}
	};

	/**
	 * 按键抬起响应
	 */
	this.onKeyUp = function ( event ) {
		switch ( event.keyCode ) {
			case 38: /*up*/
			case 87: /*W*/ this.moveForward = false; break;

			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = false; break;
			
			case 37: /*left*/
			case 65: /*A*/ this.rotateLeft = false; break;

			case 39: /*right*/
			case 68: /*D*/ this.rotateRight = false; break;

			case 82: /*R*/ this.rotateUp = false; break;
			case 70: /*F*/ this.rotateDown = false; break;
		}
	};

	/**
	 * 事件响应动作
	 */
	this.update = function( delta ) {
		if ( this.enabled === false ) return;
		
		if ( this.heightSpeed ) {			
			var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
			var heightDelta = y - this.heightMin;
			this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );
		} else {
			this.autoSpeedFactor = 0.0;
		}

		var actualMoveSpeed = delta * this.movementSpeed;
         
		if ( this.moveForward || ( this.autoForward && ! this.moveBackward ) ) {
			this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
		}
			
		if ( this.moveBackward ) {
			this.object.translateZ( actualMoveSpeed );
        }
		
		if ( this.rotateLeft ) {
			this.object.rotateY( Math.PI / 720 );
		}
		
		if ( this.rotateRight ) {
			this.object.rotateY( -Math.PI / 720 );
		}
		
		if ( this.isScrolled ) {
			if ( this.rotateUp ) {
				this.object.translateY( actualMoveSpeed * 2 );
				//this.object.rotateX( Math.PI / 720 );
			} 
		
			if ( this.rotateDown ) {
				this.object.translateY( -actualMoveSpeed * 2 );
				//this.object.rotateX( -Math.PI / 720 );
			}	
			this.isScrolled  = false;
		}		
        
		/*var actualLookSpeed = delta * this.lookSpeed;
		if ( ! this.activeLook ) {
			actualLookSpeed = 0;
		}
		var verticalLookRatio = 1;
		if ( this.constrainVertical ) {
			verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );
		}

		this.lon += this.mouseX * actualLookSpeed;
		if ( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;
		this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
		this.phi = THREE.Math.degToRad( 90 - this.lat );
		this.theta = THREE.Math.degToRad( this.lon );

		if ( this.constrainVertical ) {
			this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );
		}

		var targetPosition = this.target,
			position = this.object.position;
		targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
		targetPosition.y = position.y + 100 * Math.cos( this.phi );
		targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );
        console.log(targetPosition);
		this.object.lookAt( targetPosition );*/
	};

	function contextmenu( event ) {
		event.preventDefault();
	}

	var _onMouseMove = bind( this, this.onMouseMove );
	var _onMouseDown = bind( this, this.onMouseDown );
	var _onMouseUp = bind( this, this.onMouseUp );
	var _onKeyDown = bind( this, this.onKeyDown );
	var _onKeyUp = bind( this, this.onKeyUp );
	var _onScroll = bind( this, this.onScroll );

	/**
	 * 添加事件
	 */
	this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	this.domElement.addEventListener( 'mousemove', _onMouseMove, false );
	this.domElement.addEventListener( 'mousedown', _onMouseDown, false );
	this.domElement.addEventListener( 'mouseup', _onMouseUp, false );
	YDC.EventUtils.addMouseScroll(_onScroll);
	window.addEventListener( 'keydown', _onKeyDown, false );
	window.addEventListener( 'keyup', _onKeyUp, false );
    
	/**
	 * 事件绑定
	 */
	function bind( scope, fn ) {
		return function () {
			fn.apply( scope, arguments );
		};
	}
	
	/**
	 * 移除事件
	 */
	this.dispose = function() {
		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		this.domElement.removeEventListener( 'mousedown', _onMouseDown, false );
		this.domElement.removeEventListener( 'mousemove', _onMouseMove, false );
		this.domElement.removeEventListener( 'mouseup', _onMouseUp, false );
        this.domElement.removeEventListener( 'DOMMouseScroll', _onScroll ,false );
		window.removeEventListener( 'keydown', _onKeyDown, false );
		window.removeEventListener( 'keyup', _onKeyUp, false );
	};
	
	/**
	 * 半屏
	 */
	this.handleResize = function () {
		if ( this.domElement === document ) {
			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;
		} else {
			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;
		}
	};
	this.handleResize();
};
