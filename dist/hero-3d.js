/* A lightweight, locally rendered silver ring with an oval blue stone, based on the supplied photo. No external 3D assets or libraries. */
(()=>{
const canvas=document.getElementById('hero-jewel'),fallback=document.getElementById('hero-jewel-fallback');
if(!canvas)return;
const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false});
if(!gl)return;
const vertexSource=`attribute vec3 position;attribute vec3 normal;attribute float material;varying float kind;uniform mat4 model;uniform float aspect;varying vec3 n;varying vec3 world;
void main(){vec4 p=model*vec4(position,1.0);kind=material;world=p.xyz;n=mat3(model)*normal;float z=4.2-p.z;gl_Position=vec4(p.x*3.5/aspect,p.y*3.5,(z-0.2)*1.02-0.4,z);}`;
const fragment=`precision mediump float;varying vec3 n;varying vec3 world;varying float kind;
void main(){vec3 N=normalize(n),V=normalize(vec3(0.,0.,4.2)-world);vec3 L=normalize(vec3(-2.5,3.5,4.));float diffuse=max(dot(N,L),0.);float shine=pow(max(dot(reflect(-L,N),V),0.),65.);vec3 R=reflect(-V,N);float band=pow(max(0.,1.-abs(R.y-.35)*1.7),3.);float rim=pow(1.-max(dot(N,V),0.),3.);float fill=max(dot(N,normalize(vec3(3.,.3,1.))),0.);vec3 color;
if(kind<.5){color=vec3(.34,.36,.39)*(.7+.55*diffuse)+vec3(.62,.65,.68)*band+vec3(.95)*shine+vec3(.24)*rim+vec3(.16)*fill;}
else if(kind<1.5){float facet=abs(dot(N,normalize(vec3(.8,.4,.9))));color=mix(vec3(.17,.48,.63),vec3(.59,.85,.96),facet)*(.8+.35*diffuse)+vec3(.74,.91,1.)*shine+vec3(.19,.37,.46)*band+vec3(.14,.32,.4)*rim;}
else{float facet=abs(dot(N,normalize(vec3(.8,.4,.9))));color=mix(vec3(.35,.45,.5),vec3(.9,.96,1.),facet)*(.65+.4*diffuse)+vec3(1.)*shine+vec3(.3)*band;}
gl_FragColor=vec4(color,1.);}`;
function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);throw Error('Shader compilation failed')}return s}
let program;
try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertexSource));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;}catch{return}
gl.useProgram(program);
const positions=[],normals=[],materials=[],indices=[];
function vertex(p,n,k){const i=positions.length/3;positions.push(...p);normals.push(...n);materials.push(k);return i}
function triangle(a,b,c,k){const u=b.map((v,i)=>v-a[i]),v=c.map((w,i)=>w-a[i]);let n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],l=Math.hypot(...n)||1;n=n.map(x=>x/l);indices.push(vertex(a,n,k),vertex(b,n,k),vertex(c,n,k))}
function torus(cx,cy,cz,r,radial,height,segments=112,tube=20){const offset=positions.length/3;for(let i=0;i<=segments;i++){const u=i/segments*Math.PI*2,cu=Math.cos(u),su=Math.sin(u);for(let j=0;j<=tube;j++){const v=j/tube*Math.PI*2,cv=Math.cos(v),sv=Math.sin(v);const d=r+radial*cv;const n=[cu*cv/radial,sv/height,su*cv/radial],len=Math.hypot(...n);vertex([cx+d*cu,cy+height*sv,cz+d*su],n.map(x=>x/len),0);}}for(let i=0;i<segments;i++)for(let j=0;j<tube;j++){const a=offset+i*(tube+1)+j,b=a+tube+1;indices.push(a,b,a+1,b,b+1,a+1)}}
function gem(cx,cy,cz,rx,ry,k){const count=12,levels=[[.48,.115],[1,.035],[1,0],[.13,-.16]],points=levels.map(([r,z])=>Array.from({length:count},(_,i)=>{const a=i/count*Math.PI*2;return[cx+rx*r*Math.cos(a),cy+ry*r*Math.sin(a),cz+z]}));for(let i=0;i<count;i++){const j=(i+1)%count;triangle([cx,cy,cz+.115],points[0][i],points[0][j],k);for(let l=0;l<3;l++){triangle(points[l][i],points[l+1][i],points[l][j],k);triangle(points[l][j],points[l+1][i],points[l+1][j],k)}}}
function bead(cx,cy,cz,r){const rows=8,cols=12,offset=positions.length/3;for(let i=0;i<=rows;i++){const a=i/rows*Math.PI;for(let j=0;j<=cols;j++){const b=j/cols*Math.PI*2,n=[Math.sin(a)*Math.cos(b),Math.cos(a),Math.sin(a)*Math.sin(b)];vertex([cx+r*n[0],cy+r*n[1],cz+r*n[2]],n,0)}}for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=offset+i*(cols+1)+j,b=a+cols+1;indices.push(a,b,a+1,b,b+1,a+1)}}
// Slim polished band and raised oval setting, matching the reference silhouette.
torus(0,0,0,.91,.036,.058);
gem(0,.075,.965,.165,.27,1);
for(const side of [-1,1]){gem(side*.27,.05,.922,.082,.088,2);gem(side*.425,.025,.847,.061,.069,2);for(const y of [-.19,.27]){bead(side*.125,y,1.018,.028);bead(side*.125,y,.96,.022)}bead(side*.35,.09,.935,.022);bead(side*.48,.08,.88,.022);bead(side*.35,-.04,.935,.022);bead(side*.48,-.04,.88,.022);}
function attribute(name,data){const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);const location=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,3,gl.FLOAT,false,0,0)}
attribute('position',positions);attribute('normal',normals);const mb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,mb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(materials),gl.STATIC_DRAW);const ml=gl.getAttribLocation(program,'material');gl.enableVertexAttribArray(ml);gl.vertexAttribPointer(ml,1,gl.FLOAT,false,0,0);const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);gl.enable(gl.DEPTH_TEST);gl.clearColor(0,0,0,0);
const model=gl.getUniformLocation(program,'model'),aspect=gl.getUniformLocation(program,'aspect');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let angle=.12,last=0,frame=0,visible=true,lost=false;
function draw(){const cz=Math.cos(-.05),sz=Math.sin(-.05),cy=Math.cos(angle),sy=Math.sin(angle),cx=Math.cos(.65),sx=Math.sin(.65);
// Column-major rotation: a full turn about Y with a small fixed presentation tilt.
const matrix=new Float32Array([cz*cy-sz*sx*sy,sz*cy+cz*sx*sy,-cx*sy,0,-sz*cx,cz*cx,sx,0,cz*sy+sz*sx*cy,sz*sy-cz*sx*cy,cx*cy,0,0,0,0,1]);
gl.viewport(0,0,canvas.width,canvas.height);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniformMatrix4fv(model,false,matrix);gl.uniform1f(aspect,canvas.width/canvas.height);gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);}
function tick(time){frame=0;if(lost)return;if(last)angle+=(Math.min(time-last,64)/1000)*(Math.PI*2/14);last=time;draw();if(visible&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick)}
function sync(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;if(lost)return;draw();if(visible&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick)}
draw();fallback.style.display='none';canvas.dataset.rendered='3d';
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:0}).observe(canvas);
document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;if(frame)cancelAnimationFrame(frame);fallback.style.display='';canvas.style.visibility='hidden'});
sync();
})();
