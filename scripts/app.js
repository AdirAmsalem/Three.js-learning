window.scene = (function() {
	'use strict';

	var container = document.getElementById('container');

	var aspectRatio;
	var renderCounter;

	var scene = new THREE.Scene();
	var renderer = new THREE.WebGLRenderer();
	var camera;
	var sphere;

	function init() {
		aspectRatio = window.innerWidth / window.innerHeight;
		renderCounter = 0;

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x114466, 1);

		container.appendChild(renderer.domElement);

		camera = new THREE.PerspectiveCamera(40, aspectRatio, 1, 100);
		camera.position.z = 100;
		scene.add(camera);

		sphere = new THREE.Mesh(
			new THREE.SphereGeometry(15, 25, 25),
			new THREE.MeshBasicMaterial({ color: 0x00DD00, wireframe: true })
		);
		sphere.name = 'Sphere';
		scene.add(sphere);

		render();
	}

	function render() {
		renderCounter += .02;

		if (renderCounter > 50) {
			renderCounter = 0;
		}

		sphere.rotation.y += Math.cos(renderCounter) / 50;
		sphere.rotation.x += Math.sin(renderCounter) / 40;
		sphere.rotation.z += Math.cos(renderCounter) / 45;

		renderer.render(scene, camera);

		requestAnimationFrame(render, container);
	}

	window.addEventListener('load', init);

	return scene;
})();
