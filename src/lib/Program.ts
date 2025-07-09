
import Camera from "./Camera";
import Shader from "./Shader";

import { mat4 } from "gl-matrix";

export default class Program {
	program: WebGLProgram;
		
	uModelViewMatrix: WebGLUniformLocation | null = null;
	uProjectionMatrix: WebGLUniformLocation | null = null;
	uTexture: WebGLUniformLocation | null = null;
	aVertexPosition: GLuint = 0;
	aVertexNormal: GLuint = 0;
	
	constructor(gl: WebGL2RenderingContext) {
		this.program = gl.createProgram();
	}

	setShader(gl: WebGL2RenderingContext, vertexShader: string, fragmentShader: string) {
		const vs = new Shader(gl, gl.VERTEX_SHADER, vertexShader);
		const fs = new Shader(gl, gl.FRAGMENT_SHADER, fragmentShader);
		if (vs.shader !== null) gl.attachShader(this.program, vs.shader);
		if (fs.shader !== null) gl.attachShader(this.program, fs.shader);

		gl.linkProgram(this.program);
		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			console.error('Could not initialize shader');
		}

		gl.useProgram(this.program);

		// Attributes
		this.aVertexPosition = gl.getAttribLocation(this.program, 'aVertexPosition');
		this.aVertexNormal = gl.getAttribLocation(this.program, 'aVertexNormal');

		// Uniforms
		this.uModelViewMatrix = gl.getUniformLocation(this.program, 'uModelViewMatrix');
		this.uProjectionMatrix = gl.getUniformLocation(this.program, 'uProjectionMatrix');
		this.uTexture = gl.getUniformLocation(this.program, 'uTexture');
	}
	
	setCamera(gl: WebGL2RenderingContext, camera: Camera) {
		const projectionMatrix = mat4.create();
		mat4.perspective(
			projectionMatrix,
			camera.fov,
			gl.canvas.width / gl.canvas.height,
			camera.minZ,
			camera.maxZ,
		);
		gl.uniformMatrix4fv(this.uProjectionMatrix, false, projectionMatrix);
		gl.uniformMatrix4fv(this.uModelViewMatrix, false, camera.getCameraMatrix());
	}

}


