export type Coordinates = {
	x: number;
	y: number;
	z: number;
}

export const origin: Coordinates = {
	x: 0,
	y: 0,
	z: 0,
}

export type Homogeneous = {
	x: number;
	y: number;
	z: number;
	w: number;
}

export const originHomogeneous: Homogeneous = {
	x: 0,
	y: 0,
	z: 0,
	w: 1,
}

export type Position = {
	x: number;
	y: number;
}

export const originPosiotion: Position = {
	x: 0,
	y: 0,
}