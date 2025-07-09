import { vertexShader, fragmentShader } from "$lib/shaders";
import Program from "./Program";
import Particular from "./Particle";
import Texture from "./Texture";
import Camera from "./Camera";
import sphere from "../texture/sphere.png";

const fps = 30;

export async function render(gl: WebGL2RenderingContext) {
	// Initialize program
	const program = new Program(gl);
	const camera = new Camera();

	// InitializeShader
	program.setShader(vertexShader, fragmentShader);
	
	const paticular = new Particular(gl);
	const texture = new Texture(gl);
	await texture.setTexture(sphere);
	let frame = 1;
	// const animationId = setInterval(() => {
		// Update Particules
		// paticular.updateParticlePositions();
		
		// Update Camera
		camera.move([0, 0.005, -0.01]);
		program.setCamera(camera);

		
		// frame++;
		// if (frame > fps * 5) {
		// 	clearInterval(animationId);
			
		// }

	// }, 1000/fps); // 30fps
	
	gl.clearColor(0, 0, 0, 1);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Activate texture
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture.texture);
	gl.uniform1i(program.uTexture, 0);

	// Buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, paticular.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, paticular.particlesSingleArray(), gl.STATIC_DRAW);
	gl.vertexAttribPointer(program.aVertexPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(program.aVertexPosition);

	// Draw	
	gl.drawArrays(gl.POINTS, 0, paticular.particleSize());

	// Clean
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	

}

