
uniform vec3 uColor;
uniform float uOffset;
uniform float uMultiplier;

varying vec2 vUv;

#pragma glslify: perlin3d = require('../partials/perlin3d.glsl')

void main() {
  float alpha = length(vUv - 0.5);
  alpha += uOffset;
  alpha *= uMultiplier;

  gl_FragColor = vec4(uColor, alpha);
}