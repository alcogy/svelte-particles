import { vec3 } from "gl-matrix";

export default class Camera {
	position: vec3;
	fov: number = 45;
	minZ: number = 0.1;
	maxZ: number = 10000;
	constructor() {
		this.position = vec3.create();
	}
}