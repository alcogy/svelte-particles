import type { Coordinates } from "./Utils";
import { origin } from "./Utils";

export default class Particular {
	particles: Particule[] = [];
	buffer: WebGLBuffer;

	constructor(gl: WebGL2RenderingContext) {
		for (let i = -12; i < 12; i++) {
			for (let j = -24; j < 24; j++) {
				for (let k = 0; k < 12; k++) {
					const rand = Math.random();
					this.particles.push(new Particule({ x: i * Math.min(rand, 0.3), y: j * Math.min(rand, 0.15), z: k * Math.min(rand, 0.4) }, origin));
				}
			}
		}
		this.buffer = gl.createBuffer();
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

	updateParticlePositions() {
		for (const pt of this.particles) {
			pt.position.y += 0.005;
		}
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