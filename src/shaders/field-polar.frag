#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;

float n_edge (vec2 st, float n) {
    float a = atan(st.x, st.y) + PI;
    float r = TWO_PI/float(n);
    return cos(floor(0.5 + a / r) * r - a) * length(st);
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // 这句不知道是什么意思， 去掉看起来也没影响
    // st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);
    float d = 0.0;
    st = st * 2.0 - 1.0;

    color = vec3(1.0 - smoothstep(0.6, 0.61, n_edge(st, 6.0)));
    gl_FragColor = vec4(color, 1.0);
}