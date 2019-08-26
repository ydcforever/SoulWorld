/**
 * 初始化renderer
 */
function initRenderer(backgroundColor){
    //WebGLRenderer有闪屏现象
    var renderer = //window.WebGLRenderingContext? new THREE.WebGLRenderer(): 
	new THREE.CanvasRenderer();
	//antialias抗锯齿
    //new THREE.WebGLRenderer( { antialias: false } );
	//屏幕分辨率
    renderer.setPixelRatio( window.devicePixelRatio );
    //渲染器大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    //渲染器颜色
    renderer.setClearColor(backgroundColor, 1);
 		   
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
	
    return renderer;	
}