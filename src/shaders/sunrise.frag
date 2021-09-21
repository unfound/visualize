#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 color1 = vec3(0.912,0.122,0.000);
vec3 color2 = vec3(1.000,0.578,0.158);
vec3 color3 = vec3(0.995,0.985,0.196);
vec3 color4 = vec3(0.355,0.990,0.140);
vec3 color5 = vec3(0.032,0.382,1.000);
vec3 color6 = vec3(0.170,0.990,1.000);
vec3 color7 = vec3(0.901,0.399,0.980);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

float easeOutExpo(float t) {
    return t == 1.0 ? 1.0 : 1.0 - pow(2.0, -10.0 * t );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(abs(sin(st.x * PI / 2.0)));

    // pct.r = abs(sin(st.x * PI / 2.0 + u_time));
    // pct.g = sin(st.x*PI);
    // pct.b = pow(st.x,0.5);

    color = mix(color1, color2, smoothstep(0.0,0.16, st.x));
    color = mix(color, color3, smoothstep(0.16,0.32, st.x));
    color = mix(color, color4, smoothstep(0.32,0.48, st.x));
    color = mix(color, color5, smoothstep(0.48,0.64, st.x));
    color = mix(color, color6, smoothstep(0.64,0.8, st.x));
    color = mix(color, color7, smoothstep(0.8,1.0, st.x));

    // Plot transition lines for each channel
    // color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    // color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    // color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}