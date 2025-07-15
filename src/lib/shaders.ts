export const vertexShader: string = `#version 300 es
precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

layout (location = 0) in vec4 aVertexPosition;

void main()
{
	gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition.xyz, 1.0);
	gl_PointSize = 12.0 * aVertexPosition.w;
}
`;

export const fragmentShader: string = `#version 300 es
precision mediump float;

uniform sampler2D uTexture;

out vec4 fragColor;

void main()
{
	fragColor = texture(uTexture, gl_PointCoord);
}
`;

