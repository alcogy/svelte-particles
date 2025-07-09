export default class Texture {
	gl: WebGL2RenderingContext;
	texture: WebGLTexture;
	image: HTMLImageElement;

	constructor(gl: WebGL2RenderingContext) {
		this.gl = gl;
		this.texture = gl.createTexture();
		this.image = new Image();
	}

	async setTexture(src: string) {
		return new Promise((resolve) => {
			this.gl;
			this.image.onload = () => {
				const { gl, image, texture } = this;
				
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
				gl.generateMipmap(gl.TEXTURE_2D);
				gl.bindTexture(gl.TEXTURE_2D, null);
				resolve(true);
			}
			this.image.src = src;
		})
	}
	
}