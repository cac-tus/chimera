var camera, scene, renderer;
var mesh;

init();

//animate関数なかでレンダリングを実行
animate();

function init() {
	//レンダラーを作成
	renderer = new THREE.WebGLRenderer();
	//描画領域を指定
	renderer.setSize( window.innerWidth, window.innerHeight );
	// body直下に配置
	document.body.appendChild( renderer.domElement );

	/**
	 * カメラを作成
	 * 透視投影カメラ 
	 * 視野体積等を作成
	 * @type {THREE}
	 */
	camera = new THREE.PerspectiveCamera( 
		70,  // fov — camera frustum vertical field of view.
		window.innerWidth / window.innerHeight,  // aspect — camera frustum aspect ratio.
		1, // near — camera frustum near plane.
		1000 // far — camera frustum far plane.
	);
	// 高さ初期位置
	camera.position.z = 400;

	// シーンの作成
	scene = new THREE.Scene();


/****** Create Object *******/
	// オブジェクトの構造を定義
	var geometry = new THREE.CubeGeometry( 200, 200, 200 );


	// テクスチャをロード
	var texture = THREE.ImageUtils.loadTexture( 'textures/crate.gif' );
	texture.anisotropy = renderer.getMaxAnisotropy();


	// 素材を決定
	// parameters is an object with one or more properties defining the material's appearance.
	/*
		color — geometry color in hexadecimal. Default is 0xffffff.
		wireframe — render geometry as wireframe. Default is false.
		wireframeLinewidth — Line thickness. Default is 1.
		wireframeLinecap — Define appearance of line ends. Default is 'round'.
		wireframeLinejoin — Define appearance of line joints. Default is 'round'.
		shading — Define shading type. Default is THREE.SmoothShading.
		vertexColors — Define whether the material uses vertex colors, or not. Default is false.
		fog — Define whether the material color is affected by global fog settings. Default is true.
		lightMap — TODO. Default is null.
		specularMap — TODO. Default is null.
		envMap — TODO. Default is null.
		skinning — TODO. Default is false.
		morphTargets — TODO. Default is false.
	*/
	var material = new THREE.MeshBasicMaterial( { map: texture } );


	/**
	 * geometry — An instance of Geometry.
	 * material — An instance of Material (optional).
	 * @type {THREE}
	 */
	mesh = new THREE.Mesh( geometry, material );
/********* End Create Object ***********/


	// 作成したオブジェクトをシーンに追加	
	scene.add( mesh );

	window.addEventListener( 'resize', onWindowResize, false );

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
	
	// どこにも再帰呼び出しが書いてない
	// 完全にwrapしてる感じ
	// oFみたいになってきたな
	renderer.render( scene, camera );

}