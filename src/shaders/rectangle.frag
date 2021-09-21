#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_time;

void main () {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);

  // vec2 bl = floor(10.0 * st);
  // vec2 tr = floor(10.0 * (vec2(1.0) - st));

  // float pct = bl.x * bl.y * tr.x * tr.y;
  // color = vec3(pct);

  // bottom-left
  vec2 bl = step(0.2, st) + step(st, vec2(0.1));
  float pct = bl.x * bl.y;

  // top-right
  vec2 tr = step(0.2, 1.0 - st) + step(1.0 - st, vec2(0.1));
  pct *= tr.x * tr.y;
  
  vec2 tr2 = step(0.55, st) + step(st, vec2(0.45));
  pct *= tr2.x * tr2.y;

  color = vec3(pct);
  
  vec2 block = step(vec2(0.2), st) * step(st, vec2(0.45));
  float pct2 = block.x * block.y;
  
  color = mix(color, vec3(0.939,0.215,0.970), pct2);

  gl_FragColor = vec4(color, 1.0);
}
