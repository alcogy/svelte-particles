export const vertexShader: string = `#version 300 es
precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

in vec4 aVertexPosition;

void main()
{
	gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	gl_PointSize = 22.0;
}
`;

export const fragmentShader: string = `#version 300 es
precision mediump float;

uniform sampler2D uTexture;

out vec4 fragColor;

void main()
{
	vec4 textureColor = texture(uTexture, gl_PointCoord);
	fragColor = textureColor;
}
`;

