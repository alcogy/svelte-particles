import type { Coordinates } from "./Utils";
import { origin } from "./Utils";

export default class Particular {
	particles: Particule[] = [];
	buffer: WebGLBuffer;

	constructor(gl: WebGL2RenderingContext) {
		for (let i = 0; i < 24; i++) {
			for (let j = 0; j < 24; j++) {
				this.particles.push(new Particule({ x: i * 0.1, y: j * 0.1, z: 0 }, origin));
			}
		}
		
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.particlesSingleArray(), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	particlesSingleArray(): Float32Array<ArrayBuffer> {
		const data = new Float32Array(this.particles.length * 4);
		for (let i = 0; i < this.particles.length; i++) {
			const index = i * 4;
			data[index] = this.particles[i].position.x;
			data[index + 1] = this.particles[i].position.y;
			data[index + 2] = this.particles[i].position.z;
			data[index + 3] = 1;
		}
		return data;
	}
	
	particleSize(): number {
		return this.particles.length * 3;
	}
}

export class Particule {
	position: Coordinates = origin;
	velocity: Coordinates = origin;

	constructor(pos: Coordinates, vel: Coordinates) {
		this.position = pos;
		this.velocity = vel;
	}

	positionArray(): number[] {
		return [
			this.position.x,
			this.position.y,
			this.position.z,
		]
	}

	velocityArray(): number[] {
		return [
			this.velocity.x,
			this.velocity.y,
			this.velocity.z,
		]
	}
}