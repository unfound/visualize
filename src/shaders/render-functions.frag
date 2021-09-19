#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct) {
  return smoothstep(pct - 0.02, pct, st.y) - smoothstep(pct, pct + 0.02, st.y);
}

void main () {
  vec2 st = gl_FragCoord.xy / u_resolution;

  float y = st.x;

  vec3 color = vec3(y);
  float pct = plot(st, y);
  color = (1.0 - pct) * color + pct * vec3(0.1882, 0.8627, 0.9137);

  gl_FragColor = vec4(color, 1.0);
}
