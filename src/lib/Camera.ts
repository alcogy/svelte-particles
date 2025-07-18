import { vec3, mat4 } from "gl-matrix";

const initCamera:vec3 = [0, 5, 10];

export default class Camera {
	eye: vec3 = initCamera;
	target: vec3 = [0, 0, 0];
	fov: number = 45 * (Math.PI / 180);
	minZ: number = 0.1;
	maxZ: number = 1000;

	move(position: vec3) {
		vec3.add(this.eye, this.eye, position);
		if (this.eye[2] <= 0.05) {
			this.eye[2] = 0.05;
		}
	}

	getCameraMatrix(): mat4 {
		const matrix = mat4.create();
		return mat4.lookAt(matrix, this.eye, this.target, [0, 1, 0]);
	}

	reset() {
		this.eye = initCamera;
		this.target = [0, 0, 0];
	}
}

