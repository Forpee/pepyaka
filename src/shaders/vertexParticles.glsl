varying vec2 vUv;
uniform float uTime;

void main()
{
  
  vec3 p=position;
  
  p.y+=.1*(sin(p.y*5.+uTime)*.5+.5);
  p.z+=.05*(sin(p.y*10.+uTime)*.5+.5);
  
  vec4 mvPosition=modelViewMatrix*vec4(p,1.);
  gl_PointSize=10.*(1./-mvPosition.z);
  
  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
  
  vUv=uv;
}