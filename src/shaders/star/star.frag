#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_color;

varying float vP;

void main () {
  gl_FragColor.rgb = u_color.rgb;
  gl_FragColor.a =  u_color.a;
}