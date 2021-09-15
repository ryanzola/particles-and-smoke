uniform sampler2D tDiffuse;

varying vec2 vUv;

// #pragma glslify: blur = require('glsl-fast-gaussian-blur/5')

void main() {
  // vec4 color = blur(tDiffuse, vUv, vec2(1920.0, 1080.0), vec2(1.0));
  vec4 color = texture2D(tDiffuse, vUv);

  gl_FragColor = color;
}