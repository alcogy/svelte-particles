export const vertexShader: string = `
precision mediump float;

attribute vec2 vert;

void main()
{
	gl_Position = vec4(vert, 0.0, 1.0);
}
`;

export const fragmentShader: string = `
precision mediump float;

void main()
{
	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

