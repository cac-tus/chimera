var camera, scene, renderer;
var mesh;

init();

//animate関数なかでレンダリングを実行
// animate();

function init() {
	//レンダラーを作成
	renderer = new THREE.WebGLRenderer();

	//描画領域を指定
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColorHex(0x555555, 1);

	// body直下に配置
	document.body.appendChild( renderer.domElement );

	/**
	 * カメラを作成
	 * 透視投影カメラ
	 * 視野体積等を作成
	 * @type {THREE}
	 */
	camera = new THREE.PerspectiveCamera(
		50,  // fov — camera frustum vertical field of view.
		window.innerWidth / window.innerHeight,  // aspect — camera frustum aspect ratio.
		10, // near — camera frustum near plane.
		1000 // far — camera frustum far plane.
	);
	// 高さ初期位置
	camera.position.z = 20;
	// camera.position.y = 0;

	scene = new THREE.Scene();
/****** Create Object *******/
	// オブジェクトの構造を定義
	// var geometry = new THREE.CubeGeometry( 200, 200, 200 );
	var loader = new THREE.JSONLoader();
	/*
		.load( url, callback, texturePath )

		url — required
		callback — required. This function will be called with the loaded model as an instance of geometry when the load is completed.
		texturePath — optional. If not specified, textures will be assumed to be in the same folder as the Javascript model file.
	*/
	loader.load( "../sample_data/untitled.js", createScene );

	window.addEventListener( 'resize', onWindowResize, false );
}

function createScene( geometry ) {
	var texture = THREE.ImageUtils.loadTexture( 'textures/crate.gif' );
	texture.anisotropy = renderer.getMaxAnisotropy();

	geometry.morphTargets = [];
	var material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		specular: 0xcccccc,
		shininess:50,
		ambient: 0xffffff,
		side: THREE.DoubleSide
	});

	mesh = new THREE.Mesh( geometry, material );
	// シーンの作成
	scene.add( mesh );
	animate( mesh );
}


/**
 * windowサイズを変更すると描画領域も小さくなる
 */
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}


/**
 * アニメーションの定義
 */
function animate() {

	// RequestAnimationFrame.jsはThree.jsに
	// おまけとして付いてくるライブラリ。
	// requestAnimationFrameをクロスブラウザで使えるようにしてくれる
	requestAnimationFrame( animate );
	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.01;
	
	renderer.render( scene, camera );

}