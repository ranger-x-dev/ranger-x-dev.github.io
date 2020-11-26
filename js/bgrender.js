// Our Javascript will go here.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();

const light_amb_1 = new THREE.AmbientLight( 0x000000 ); // soft white light
scene.add( light_amb_1 );

const light_point_1 = new THREE.PointLight( 0xffffff, 2, 100);
light_point_1.position.set( 0, 20, 0);
scene.add( light_point_1 );

const light_point_2 = new THREE.PointLight( 0xff0000, 2, 100);
light_point_2.position.set( 20, -20, 0);
scene.add( light_point_2 );

const sphereSize = 5;
const pointLightHelper1 = new THREE.PointLightHelper( light_point_1 , sphereSize, 0xffffff );
scene.add( pointLightHelper1 );

const pointLightHelper2 = new THREE.PointLightHelper( light_point_2 , sphereSize, 0xffffff );
scene.add( pointLightHelper2 );

//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true,});
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;	
	
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	renderer.render( scene, camera );
}

animate();