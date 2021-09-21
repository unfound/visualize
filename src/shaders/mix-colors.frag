#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592653589

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.8314, 0.2667, 0.2471);
vec3 colorB = vec3(0.1569, 0.3804, 0.8588);

float easeInSine(float t) {
  return 1.0 - cos((t * PI) / 2.0);
}

void main() {
  vec3 color = vec3(0.0);
  float pct = easeInSine(u_time);

  color = mix(colorA, colorB, pct);
  gl_FragColor = vec4(color, 1.0);
}
