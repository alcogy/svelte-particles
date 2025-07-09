import { vertexShader, fragmentShader } from "$lib/shaders";
import { cube } from "$lib/models";
import Program from "./Program";
import Particular from "./Particle";
import Texture from "./Texture";
import sphere from "../texture/sphere.png";

const { vertices, indices } = cube;

export function render(gl: WebGL2RenderingContext) {
	// Initialize program
	const program = new Program(gl);

	// InitializeShader
	program.setShader(vertexShader, fragmentShader);
	program.setVars();
	const paticular = new Particular(gl);
	const texture = new Texture(gl, sphere);

	let frame = 1;
	const animationId = setInterval(() => {
		// Update Particules
		paticular.updateParticlePositions(gl);

		gl.clearColor(0.1, 0.1, 0.1, 1.0);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


		// Update ModelView
		// Update Projection (Camera)

		// Activate texture
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texture.texture);
		gl.uniform1i(program.uTexture, 0);

		// Buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, paticular.buffer);
		gl.vertexAttribPointer(program.aVertexPosition, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(program.aVertexPosition);

		// Draw	
		gl.drawArrays(gl.POINTS, 0, paticular.particleSize());

		// Clean
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		frame++;
		if (frame >= 150) {
			clearInterval(animationId);
			
		}

	}, 1000/30); // 30fps
}
