/**
 * ��ʼ��renderer
 */
function initRenderer(backgroundColor){
    //WebGLRenderer����������
    var renderer = //window.WebGLRenderingContext? new THREE.WebGLRenderer(): 
	new THREE.CanvasRenderer();
	//antialias�����
    //new THREE.WebGLRenderer( { antialias: false } );
	//��Ļ�ֱ���
    renderer.setPixelRatio( window.devicePixelRatio );
    //��Ⱦ����С
    renderer.setSize(window.innerWidth, window.innerHeight);
    //��Ⱦ����ɫ
    renderer.setClearColor(backgroundColor, 1);
 		   
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
	
    return renderer;	
}