uniform float uTime;

varying vec2 vUv;

void main()
{
    vec3 light=vec3(0.);
    vec3 skyColor=vec3(1.,1.,.547);
    
    gl_FragColor=vec4(vUv,1.,1.);
}