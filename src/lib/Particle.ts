import type { Coordinates } from "./Utils";
import { origin } from "./Utils";

export default class Particular {
	particles: Particule[] = [];
	buffer: WebGLBuffer;
	elapsed: number = 0;
	emitPosition: Coordinates = { x: 0, y: 0, z: 0, w: 1 }
	constructor(gl: WebGL2RenderingContext) {
		this.buffer = gl.createBuffer();
		this.reset();
	}

	particlesSingleArray(): Float32Array<ArrayBuffer> {
		const data = new Float32Array(this.particles.length * 4 * 3);
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
		const acceleration = 0.1;
		for (const pt of this.particles) {
			pt.position.x += pt.velocity.x * acceleration;
			pt.position.y += pt.velocity.y * acceleration;
			pt.position.z += pt.velocity.z * acceleration;
			pt.position.w -= pt.velocity.w * acceleration * 0.1;
			if (pt.position.y <= 0 && pt.velocity.x === 0 && pt.velocity.z === 0) {
				pt.velocity.y = 0;
				pt.velocity.x = (Math.random() - 0.5) * 3;
				pt.velocity.z = (Math.random() - 0.5) * 3;
			}
			if (pt.position.w <= 0) {
				const particle = this.newParticle();
				pt.position = particle.pos;
				pt.velocity = particle.vel;
			}
		}
		// if (this.particles.length < 30000) {
		// 	this.addParticular(512);
		// }
	}

	reset() {
		this.elapsed = 0;
		this.particles = [];
		this.addParticular(10000);
	}

	addParticular(size: number) {
		for (let i = 0; i < size; i++) {
			const particle = this.newParticle();
			
			this.particles.push(new Particule(particle.pos, particle.vel));
		}
	}

	private newParticle(): { pos: Coordinates, vel: Coordinates } {
		return {
			pos: {
				x: this.emitPosition.x + Math.random() - 0.5,
				y: this.emitPosition.y,
				z: this.emitPosition.z + Math.random() - 0.5,
				w: Math.random(),
			},
			vel: {
				x: 0,
				y: -0.96,
				z: 0,
				w: Math.random(),
			}

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