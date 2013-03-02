$(function(){

var camera,
	scene,
	light,
	renderer,

	geometry,

	material_t,
	material_r,
	material_k,

	mesh_t,
	mesh_r,
	mesh_k,

	_w = window.innerWidth,
	_h = window.innerHeight,

	init,
	animate;

init = function(){

	renderer = new THREE.WebGLRenderer();
	renderer.domElement.id = "renderer";
	renderer.setSize( _w/2, _h/2);
	renderer.setClearColorHex( 0xf2f2f2, 1);
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 70, _w / _h, 1, 1000);
	camera.position.y = 230;
	camera.position.x = 0;
	camera.position.z = 0;
	camera.lookAt( new THREE.Vector3( 1, 2, 1 ) );

	scene = new THREE.Scene();

	geometry = new THREE.CubeGeometry(100, 100, 100);

	var texture = THREE.ImageUtils.loadTexture( 'textures/kazukgw.jpg' );
	// texture.anisotropy = renderer.getMaxAnisotropy();

	material_k =  new THREE.MeshLambertMaterial({
		// color: 0x0000f5,
		// ambient: 0xffc345,
		map: texture
	});

	mesh_k = new THREE.Mesh( geometry, material_k );

	mesh_k.position.y = 80;

	scene.add( mesh_k );

	light_amb = new THREE.AmbientLight( 0xffffff );

	light_amb.position.set( -1, -1, 1 ).normalize();

	scene.add( light_amb );
};


animate = function animate() {

	requestAnimationFrame( animate );

	mesh_k.rotation.x += 0.005;
	mesh_k.rotation.y += 0.01;

	renderer.render( scene, camera );
};



init();
animate();

});