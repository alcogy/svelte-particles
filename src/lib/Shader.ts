
export default class Shader {
	shader: WebGLShader | null;

	constructor(gl: WebGL2RenderingContext, type: GLenum, src: string) {
		this.shader = gl.createShader(type);
		if (this.shader === null) return;
		gl.shaderSource(this.shader, src);
		gl.compileShader(this.shader);
		if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
			console.error(gl.getShaderInfoLog(this.shader));
		}
	}

}