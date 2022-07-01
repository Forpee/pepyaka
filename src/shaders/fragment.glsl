uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;

void main()
{
    vec3 light=vec3(0.);
    vec3 skyColor=vec3(1.,1.,.547);
    vec3 groundColor=vec3(.56,.275,.111);
    
    vec3 lightDirection=normalize(vec3(0.,1.,1.));
    light+=dot(lightDirection,vNormal);
    
    gl_FragColor=vec4(vUv,1.,1.);
}