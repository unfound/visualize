#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle (in vec2 _st, in float _radius, in vec2 center) {
    vec2 dist = _st - center;
    return 1.0 - smoothstep(_radius - (_radius * 0.01),
                            _radius + (_radius * 0.01),
                            dot(dist, dist) * 4.0);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // float pct = 0.0;
    // pct = distance(st, vec2(0.5));

    // vec2 toCenter = vec2(0.5) - st;
    // pct = length(toCenter);

    // vec2 toCenter = vec2(0.5) - st;
    // pct = sqrt(toCenter.x * toCenter.x + toCenter.y * toCenter.y);

    vec2 mt = u_mouse/u_resolution;
    float r = abs(sin(u_time));
    vec3 color = vec3(circle(st, r, mt));
    gl_FragColor = vec4(color, 1.0);
}
