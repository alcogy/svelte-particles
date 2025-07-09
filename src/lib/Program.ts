
import Camera from "./Camera";
import Texture from "./Texture";
import Shader from "./Shader";

import { mat4 } from "gl-matrix";

export default class Program {
	program: WebGLProgram;
	gl: WebGL2RenderingContext;
	// vao: WebGLVertexArrayObject;
		
	uModelViewMatrix: WebGLUniformLocation | null = null;
	uProjectionMatrix: WebGLUniformLocation | null = null;
	uTexture: WebGLUniformLocation | null = null;
	aVertexPosition: GLuint = 0;
	aVertexNormal: GLuint = 0;
	
	constructor(gl: WebGL2RenderingContext) {
		this.gl = gl;
		this.program = this.gl.createProgram();
		this.gl.enable(gl.BLEND);
		this.gl.disable(gl.DEPTH_TEST);
		this.gl.depthFunc(gl.LESS);
		this.gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	}

	setShader(vertexShader: string, fragmentShader: string) {
		const vs = new Shader(this.gl, this.gl.VERTEX_SHADER, vertexShader);
		const fs = new Shader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShader);
		if (vs.shader !== null) this.gl.attachShader(this.program, vs.shader);
		if (fs.shader !== null) this.gl.attachShader(this.program, fs.shader);

		this.gl.linkProgram(this.program);
		if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
			console.error('Could not initialize shader');
		}

		this.gl.useProgram(this.program);
	}
	
	setVars() {
		
		const projectionMatrix = mat4.create();
		const modelViewMatrix = mat4.create();
				
		// Attributes
		this.aVertexPosition = this.gl.getAttribLocation(this.program, 'aVertexPosition');
		this.aVertexNormal = this.gl.getAttribLocation(this.program, 'aVertexNormal');

		// Uniforms
		this.uModelViewMatrix = this.gl.getUniformLocation(this.program, 'uModelViewMatrix');
		this.uProjectionMatrix = this.gl.getUniformLocation(this.program, 'uProjectionMatrix');
		this.uTexture = this.gl.getUniformLocation(this.program, 'uTexture');
		
		mat4.perspective(
			projectionMatrix,
			45 * (Math.PI / 180),
			this.gl.canvas.width / this.gl.canvas.height,
			0.1,
			10000,
		);
		mat4.identity(modelViewMatrix);
		mat4.translate(modelViewMatrix, modelViewMatrix, [-2, -8, -5]);
		
		this.gl.uniformMatrix4fv(this.uModelViewMatrix, false, modelViewMatrix);
		this.gl.uniformMatrix4fv(this.uProjectionMatrix, false, projectionMatrix);
				
	}

}


