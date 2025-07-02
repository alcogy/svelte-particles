import { vertexShader, fragmentShader } from "$lib/shader/flatShader";

const triangle = [
	0.0, 0.5,
	-0.5, -0.5,
	0.5, -0.5,
];

export function render(gl: WebGL2RenderingContext) {
	gl.clearColor(0, 0, 0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	const vs = gl.createShader(gl.VERTEX_SHADER);
	const program = gl.createProgram();
	if (vs !== null) {
		gl.shaderSource(vs, vertexShader);
		gl.compileShader(vs);
		if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
			console.error(gl.getShaderInfoLog(vs));
		}
		gl.attachShader(program, vs);
	}
	
	const fs = gl.createShader(gl.FRAGMENT_SHADER);
	if (fs !== null) {
		gl.shaderSource(fs, fragmentShader);
		gl.compileShader(fs);
		if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
			console.error(gl.getShaderInfoLog(fs));
		}
		gl.attachShader(program, fs);
	}

	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error(gl.getProgramInfoLog(program));
	}

	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error(gl.getProgramInfoLog(program));
	}

	const vbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle), gl.STATIC_DRAW);

	const pal = gl.getAttribLocation(program, 'vert');
	gl.vertexAttribPointer(pal, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
	gl.enableVertexAttribArray(pal);
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}