import { vertexShader, fragmentShader } from "$lib/shaders";
import Program from "./Program";
import Particular from "./Particle";
import Texture from "./Texture";
import Camera from "./Camera";
import sphere from "../texture/sphere.png";
import { type Position, originPosiotion } from "./Utils";

export default class Scene {
	private canvas: HTMLCanvasElement;
	private gl: WebGL2RenderingContext;
	private program: Program;
	private camera: Camera;
	private particular: Particular;
	private texture: Texture;

	private isMouseDown: boolean = false;
	private mouse: Position = originPosiotion;

	constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
		this.canvas = canvas;
		this.gl = gl;

		this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
		this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
		this.canvas.addEventListener('wheel', (e) => this.onMouseWheel(e));
		this.canvas.addEventListener('mouseup', () => this.isMouseDown  = false);
		this.canvas.addEventListener('mouseleave', () => this.isMouseDown  = false);

		this.gl.enable(this.gl.BLEND);
		this.gl.disable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LESS);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);

		this.program = new Program(this.gl);
		this.program.setShader(this.gl, vertexShader, fragmentShader);

		this.camera = new Camera();
		this.particular = new Particular(this.gl);
		this.texture = new Texture(this.gl);	
	}

	async load() {
		await this.texture.setTexture(sphere);
	}

	animation() {
		this.particular.updateParticlePositions();
		this.render();
	}

	reset() {
		this.particular.reset();
		this.render();	
	}

	resetCamera() {
		this.camera.reset();
		this.render();
	}

	updateEmitter(ep: {x: number; y: number; z: number}) {
		this.particular.emitPosition = {
			x: ep.x,
			y: ep.y,
			z: ep.z,
			w: 1,
		}
	}

	async render() {
		this.gl.clearColor(0, 0, 0, 1);
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.program.setCamera(this.gl, this.camera);

		// Activate texture
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture.texture);
		this.gl.uniform1i(this.program.uTexture, 0);

		// Buffer
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particular.buffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.particular.particlesSingleArray(), this.gl.STATIC_DRAW);
		this.gl.vertexAttribPointer(this.program.aVertexPosition, 4, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(this.program.aVertexPosition);

		// Draw	
		this.gl.drawArrays(this.gl.POINTS, 0, this.particular.particleSize());

		// Clean
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	}

	onMouseDown(e: MouseEvent) {
		this.isMouseDown = true;
		this.mouse.x = e.clientX;
		this.mouse.y = e.clientY;
	}

	onMouseMove(e: MouseEvent) {
		if (!this.isMouseDown) return;
		const diff: Position = {
			x: e.clientX - this.mouse.x,
			y: e.clientY - this.mouse.y,
		}
		this.mouse.x = e.clientX;
		this.mouse.y = e.clientY;

		this.camera.move([diff.x * 0.02, diff.y * 0.02, 0]);
		this.render();
	}

	onMouseWheel(e: WheelEvent) {
		this.camera.move([0, 0, e.deltaY > 0 ? -0.2 : 0.2]);
		this.render();
	}

	
}