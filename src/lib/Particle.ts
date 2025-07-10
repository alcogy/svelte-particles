import type { Coordinates } from "./Utils";
import { origin } from "./Utils";

export default class Particular {
	particles: Particule[] = [];
	buffer: WebGLBuffer;
	elapsed: number = 0;
	emitPosition: Coordinates = { x: 0, y: 0, z: 0, w: 1 }
	constructor(gl: WebGL2RenderingContext) {
		this.reset();
		this.buffer = gl.createBuffer();
	}

	particlesSingleArray(): Float32Array<ArrayBuffer> {
		const data = new Float32Array(this.particles.length * 4);
		for (let i = 0; i < this.particles.length; i++) {
			const index = i * 4;
			data[index] = this.particles[i].position.x;
			data[index + 1] = this.particles[i].position.y;
			data[index + 2] = this.particles[i].position.z;
			data[index + 3] = this.particles[i].position.w;
		}
		return data;
	}
	
	particleSize(): number {
		return this.particles.length * 3;
	}

	updateParticlePositions() {
		const acceleration = 0.05;
		for (const pt of this.particles) {
			pt.position.x += pt.velocity.x * acceleration;
			pt.position.y += pt.velocity.y * acceleration;
			pt.position.z += pt.velocity.z * acceleration;
			pt.position.w -= pt.velocity.w * acceleration * 0.1;
			if (pt.position.w <= 0) {
				pt.position = this.newParticlePosition();
			}
		}
		// if (this.particles.length < 30000) {
		// 	this.addParticular(512);
		// }
	}

	reset() {
		this.elapsed = 0;
		this.particles = [];
		this.addParticular(20000);
	}

	addParticular(size: number) {
		if (this.elapsed > 0) {
			this.elapsed--;
			return;
		}
		this.elapsed = 20;
		for (let i = 0; i < size; i++) {
			const pos = this.newParticlePosition();
			const vel = {
				x: Math.random() - 0.5,
				y: Math.random(),
				z: Math.random() - 0.5,
				w: Math.random(),
			}
			this.particles.push(new Particule(pos, vel));
		}
	}

	private newParticlePosition(): Coordinates {
		return {
			x: this.emitPosition.x * 0.1,
			y: this.emitPosition.y * 0.1,
			z: this.emitPosition.z * 0.1,
			w: Math.random() * Math.random(),
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