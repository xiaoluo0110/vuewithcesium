function h(i,{name:e,fragmentShader:t,uniforms:s={}}){const a=new Cesium.PostProcessStage({name:e,fragmentShader:t,uniforms:s});return a.enabled=!1,i.scene.postProcessStages.add(a),a}function l(i,e){if(!(!e||!(i!=null&&i.scene)))try{if(typeof i.isDestroyed=="function"&&i.isDestroyed())return;i.scene.postProcessStages.remove(e)}catch{}}function r(i){if(!(i!=null&&i.scene))throw new Error("[Effect] 需要有效的 Cesium Viewer")}const m={speed:1,density:.85,intensity:.75},c=`
#version 300 es
uniform sampler2D colorTexture;
uniform float speed;
uniform float intensity;
uniform float density;
in vec2 v_textureCoordinates;
out vec4 fragColor;

float hash(float n) {
  return fract(sin(n) * 43758.5453);
}

float rainLayer(vec2 uv, float scale, float time) {
  uv *= scale;
  vec2 id = floor(uv);
  vec2 gv = fract(uv) - 0.5;
  float n = hash(id.x + id.y * 57.0);
  float x = n * 2.0 - 1.0;
  float fall = fract(n * 13.7 + time * (0.6 + n * 0.8));
  float streak = smoothstep(0.04, 0.0, abs(gv.x - x * 0.35));
  streak *= smoothstep(0.12, 0.0, abs(gv.y - (0.5 - fall)));
  return streak;
}

void main() {
  vec4 color = texture(colorTexture, v_textureCoordinates);
  float time = czm_frameNumber / 60.0 * speed;
  vec2 uv = v_textureCoordinates;

  float d = clamp(density, 0.2, 3.0);
  float rain = 0.0;
  rain += rainLayer(uv, 12.0 * d, time);
  rain += rainLayer(uv + vec2(0.13, 0.07), 18.0 * d, time * 1.1);
  rain += rainLayer(uv + vec2(-0.09, 0.11), 24.0 * d, time * 0.9);
  rain += rainLayer(uv + vec2(0.31, 0.22), 15.0 * d, time * 1.2) * clamp(d - 0.8, 0.0, 1.0);
  rain += rainLayer(uv + vec2(-0.28, 0.26), 20.0 * d, time * 0.88) * clamp(d - 1.2, 0.0, 1.0);
  rain = clamp(rain * intensity, 0.0, 1.0);

  vec3 tint = vec3(0.72, 0.78, 0.88);
  color.rgb = mix(color.rgb, color.rgb * 0.82 + tint * 0.08, rain * 0.55);
  color.rgb += tint * rain * 0.18;
  fragColor = color;
}
`;class f{constructor(e,t={}){r(e),this.viewer=e,this._preset="light";const s={...m,...t},{enabled:a,...n}=s;this._speed=n.speed,this._density=n.density,this._intensity=n.intensity,this._stage=null,this._enabled=!1,a&&this.show()}get preset(){return this._preset}_ensureStage(){if(this._stage)return this._stage;const e=this;return this._stage=h(this.viewer,{name:"cim3d_effect_light_rain",fragmentShader:c,uniforms:{speed:()=>e._speed,density:()=>e._density,intensity:()=>e._intensity}}),this._stage}get enabled(){return this._enabled}set enabled(e){e?this.show():this.hide()}get speed(){return this._speed}set speed(e){this._speed=Number(e)||0}get density(){return this._density}set density(e){this._density=Math.max(.2,Math.min(3,Number(e)||0))}get intensity(){return this._intensity}set intensity(e){this._intensity=Math.max(0,Number(e)||0)}show(){this._ensureStage().enabled=!0,this._enabled=!0}hide(){this._stage&&(this._stage.enabled=!1),this._enabled=!1}remove(){this.hide()}destroy(){this.hide(),l(this.viewer,this._stage),this._stage=null}}const u={speed:1,density:1,intensity:1,tiltAngle:-.4,rainSize:.3,streakGain:20,laneScale:100},y=`
#version 300 es
uniform sampler2D colorTexture;
uniform float speed;
uniform float intensity;
uniform float density;
uniform float tiltAngle;
uniform float rainSize;
uniform float streakGain;
uniform float laneScale;
in vec2 v_textureCoordinates;
out vec4 fragColor;

float hash(float x) {
  return fract(sin(x * 133.3) * 13.13);
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float time = czm_frameNumber / 60.0 * speed;
  vec2 resolution = czm_viewport.zw;
  vec2 fragCoord = v_textureCoordinates * resolution;
  vec2 uv = (fragCoord * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

  vec3 c = vec3(0.6, 0.7, 0.8);
  float si = sin(tiltAngle);
  float co = cos(tiltAngle);
  uv *= mat2(co, -si, si, co);
  uv *= length(uv + vec2(0.0, 4.9)) * rainSize + 1.0;

  float v = 1.0 - sin(hash(floor(uv.x * laneScale * density)) * 2.0);
  float b = clamp(
    abs(sin(20.0 * time * v + uv.y * (5.0 / (2.0 + v)))) - 0.95,
    0.0,
    1.0
  ) * streakGain;
  c *= v * b;

  float mixAmount = clamp(intensity * 0.5, 0.0, 1.0);
  fragColor = mix(sceneColor, vec4(c, 1.0), mixAmount);
}
`;class d{constructor(e,t={}){r(e),this.viewer=e,this._preset="heavy";const s={...u,...t},{enabled:a,...n}=s;this._speed=n.speed,this._density=n.density,this._intensity=n.intensity,this._tiltAngle=n.tiltAngle,this._rainSize=n.rainSize,this._streakGain=n.streakGain,this._laneScale=n.laneScale,this._stage=null,this._enabled=!1,a&&this.show()}get preset(){return this._preset}_ensureStage(){if(this._stage)return this._stage;const e=this;return this._stage=h(this.viewer,{name:"cim3d_effect_heavy_rain",fragmentShader:y,uniforms:{speed:()=>e._speed,density:()=>e._density,intensity:()=>e._intensity,tiltAngle:()=>e._tiltAngle,rainSize:()=>e._rainSize,streakGain:()=>e._streakGain,laneScale:()=>e._laneScale}}),this._stage}get enabled(){return this._enabled}set enabled(e){e?this.show():this.hide()}get speed(){return this._speed}set speed(e){this._speed=Number(e)||0}get density(){return this._density}set density(e){this._density=Math.max(.2,Math.min(3,Number(e)||0))}get intensity(){return this._intensity}set intensity(e){this._intensity=Math.max(0,Number(e)||0)}get tiltAngle(){return this._tiltAngle}set tiltAngle(e){this._tiltAngle=Number(e)||0}get rainSize(){return this._rainSize}set rainSize(e){this._rainSize=Math.max(.05,Number(e)||0)}get streakGain(){return this._streakGain}set streakGain(e){this._streakGain=Math.max(1,Number(e)||0)}get laneScale(){return this._laneScale}set laneScale(e){this._laneScale=Math.max(10,Number(e)||0)}show(){this._ensureStage().enabled=!0,this._enabled=!0}hide(){this._stage&&(this._stage.enabled=!1),this._enabled=!1}remove(){this.hide()}destroy(){this.hide(),l(this.viewer,this._stage),this._stage=null}}const g={light:m,heavy:u},p=d,v=`
#version 300 es
uniform sampler2D colorTexture;
uniform float speed;
uniform float intensity;
uniform float density;
in vec2 v_textureCoordinates;
out vec4 fragColor;

float snowLayer(vec2 uv, float scale, float time) {
  float w = smoothstep(1.0, 0.0, -uv.y * (scale / 10.0));
  if (w < 0.1) return 0.0;

  vec2 u = uv;
  u += time / scale;
  u.y += time * 2.0 / scale;
  u.x += sin(u.y + time * 0.5) / scale;
  u *= scale;

  vec2 s = floor(u);
  vec2 f = fract(u);
  vec2 p = 0.5 + 0.35 * sin(11.0 * fract(sin(mat2(7.0, 3.0, 6.0, 5.0) * (s + scale)) * 5.0));
  p -= f;

  float k = 3.0;
  float d = length(p);
  k = min(d, k);
  k = smoothstep(0.0, k, sin(f.x + f.y) * 0.01);
  return k * w;
}

void main() {
  vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
  float time = czm_frameNumber / 60.0 * speed;
  vec2 resolution = czm_viewport.zw;
  vec2 fragCoord = v_textureCoordinates * resolution;
  vec2 uv = (fragCoord * 2.0 - resolution) / min(resolution.x, resolution.y);

  float d = clamp(density, 0.2, 3.0);
  float snow = 0.0;
  snow += snowLayer(uv, 10.0 * d, time);
  snow += snowLayer(uv, 8.0 * d, time);
  snow += snowLayer(uv, 6.0 * d, time);
  snow += snowLayer(uv, 5.0 * d, time);
  snow += snowLayer(uv + vec2(0.18, 0.12), 12.0 * d, time * 1.05) * clamp(d - 0.9, 0.0, 1.0);
  snow += snowLayer(uv + vec2(-0.14, 0.2), 14.0 * d, time * 0.92) * clamp(d - 1.3, 0.0, 1.0);

  vec3 snowColor = vec3(snow);
  float mixAmount = clamp(intensity * 0.5, 0.0, 1.0);
  fragColor = mix(sceneColor, vec4(snowColor, 1.0), mixAmount);
}
`;class S{constructor(e,t={}){r(e),this.viewer=e,this._speed=t.speed??1,this._density=t.density??1,this._intensity=t.intensity??1,this._stage=null,this._enabled=!1,t.enabled&&this.show()}_ensureStage(){if(this._stage)return this._stage;const e=this;return this._stage=h(this.viewer,{name:"cim3d_effect_snow",fragmentShader:v,uniforms:{speed:()=>e._speed,density:()=>e._density,intensity:()=>e._intensity}}),this._stage}get enabled(){return this._enabled}set enabled(e){e?this.show():this.hide()}get speed(){return this._speed}set speed(e){this._speed=Number(e)||0}get density(){return this._density}set density(e){this._density=Math.max(.2,Math.min(3,Number(e)||0))}get intensity(){return this._intensity}set intensity(e){this._intensity=Math.max(0,Number(e)||0)}show(){this._ensureStage().enabled=!0,this._enabled=!0}hide(){this._stage&&(this._stage.enabled=!1),this._enabled=!1}remove(){this.hide()}destroy(){this.hide(),l(this.viewer,this._stage),this._stage=null}}class b{constructor(e,t={}){r(e),this.viewer=e;const s=e.scene.fog;this._saved={enabled:s.enabled,density:s.density,minimumBrightness:s.minimumBrightness},this._enabled=!1,this._density=t.density??35e-5,this._minimumBrightness=t.minimumBrightness??.03,t.enabled&&this.show()}get enabled(){return this._enabled}set enabled(e){e?this.show():this.hide()}get density(){return this._density}set density(e){this._density=Math.max(0,Number(e)||0),this._enabled&&this._apply()}get minimumBrightness(){return this._minimumBrightness}set minimumBrightness(e){this._minimumBrightness=Math.max(0,Number(e)||0),this._enabled&&this._apply()}_apply(){const e=this.viewer.scene.fog;e.enabled=!0,e.density=this._density,e.minimumBrightness=this._minimumBrightness}setOptions(e={}){if(typeof e.density=="number"&&(this._density=e.density),typeof e.minimumBrightness=="number"&&(this._minimumBrightness=e.minimumBrightness),typeof e.enabled=="boolean"){this.enabled=e.enabled;return}this._enabled&&this._apply()}show(){this._apply(),this._enabled=!0}hide(){this.viewer.scene.fog.enabled=!1,this._enabled=!1}remove(){this.hide()}destroy(){var t,s;const e=(s=(t=this.viewer)==null?void 0:t.scene)==null?void 0:s.fog;e&&(e.enabled=this._saved.enabled,e.density=this._saved.density,e.minimumBrightness=this._saved.minimumBrightness),this._enabled=!1}}const _={longitude:116.39,latitude:39.9,height:80,emissionRate:60,particleSize:35,minimumLife:1.2,maximumLife:2,minimumSpeed:3,maximumSpeed:8,startScale:1,endScale:3.5,emitterRadius:1.2,coneAngle:25};let o=null;function x(){if(o)return o;const i=64,e=document.createElement("canvas");e.width=i,e.height=i;const t=e.getContext("2d"),s=t.createRadialGradient(i/2,i/2,0,i/2,i/2,i/2);return s.addColorStop(0,"rgba(255, 255, 220, 1)"),s.addColorStop(.25,"rgba(255, 200, 60, 0.95)"),s.addColorStop(.55,"rgba(255, 90, 10, 0.85)"),s.addColorStop(1,"rgba(80, 10, 0, 0)"),t.fillStyle=s,t.fillRect(0,0,i,i),o=e.toDataURL("image/png"),o}class w{constructor(e,t={}){r(e),this.viewer=e;const s={..._,...t},{enabled:a,...n}=s;this._longitude=n.longitude,this._latitude=n.latitude,this._height=n.height,this._emissionRate=n.emissionRate,this._particleSize=n.particleSize,this._minimumLife=n.minimumLife,this._maximumLife=n.maximumLife,this._minimumSpeed=n.minimumSpeed,this._maximumSpeed=n.maximumSpeed,this._startScale=n.startScale,this._endScale=n.endScale,this._emitterRadius=n.emitterRadius,this._coneAngle=n.coneAngle,this._entity=null,this._particleSystem=null,this._preUpdateRemove=null,this._enabled=!1,this._ensureEntity(),a&&this.show()}_getPosition(){return Cesium.Cartesian3.fromDegrees(this._longitude,this._latitude,this._height)}_ensureEntity(){if(this._entity){this._entity.position=this._getPosition();return}this._entity=this.viewer.entities.add({id:`cim3d_effect_fire_${Date.now()}`,position:this._getPosition(),show:!1,point:{pixelSize:6,color:Cesium.Color.ORANGE.withAlpha(.6),outlineColor:Cesium.Color.BLACK.withAlpha(.3),outlineWidth:1,disableDepthTestDistance:Number.POSITIVE_INFINITY}})}_computeEmitterModelMatrix(){const e=new Cesium.Matrix4,t=Cesium.HeadingPitchRoll.fromDegrees(0,0,0,new Cesium.HeadingPitchRoll),s=new Cesium.TranslationRotationScale(Cesium.Cartesian3.ZERO,Cesium.Quaternion.fromHeadingPitchRoll(t,new Cesium.Quaternion),new Cesium.Cartesian3(1,1,1));return Cesium.Matrix4.fromTranslationRotationScale(s,e)}_bindPreUpdate(){this._preUpdateRemove||(this._preUpdateRemove=this.viewer.scene.preUpdate.addEventListener((e,t)=>{!this._particleSystem||!this._entity||(this._particleSystem.modelMatrix=this._entity.computeModelMatrix(t,new Cesium.Matrix4),this._particleSystem.emitterModelMatrix=this._computeEmitterModelMatrix())}))}_unbindPreUpdate(){this._preUpdateRemove&&(this._preUpdateRemove(),this._preUpdateRemove=null)}_buildParticleSystem(){const e=this._particleSize;return new Cesium.ParticleSystem({image:x(),startColor:Cesium.Color.fromBytes(255,240,180,255),endColor:Cesium.Color.fromBytes(200,40,0,0),startScale:this._startScale,endScale:this._endScale,minimumParticleLife:this._minimumLife,maximumParticleLife:this._maximumLife,minimumSpeed:this._minimumSpeed,maximumSpeed:this._maximumSpeed,imageSize:new Cesium.Cartesian2(e,e),emissionRate:this._emissionRate,lifetime:Number.POSITIVE_INFINITY,loop:!0,sizeInMeters:!1,emitter:new Cesium.ConeEmitter(Cesium.Math.toRadians(this._coneAngle))})}_syncParticleParams(){if(!this._particleSystem)return;const e=this._particleSystem;e.emissionRate=this._emissionRate,e.minimumParticleLife=this._minimumLife,e.maximumParticleLife=this._maximumLife,e.minimumSpeed=this._minimumSpeed,e.maximumSpeed=this._maximumSpeed,e.startScale=this._startScale,e.endScale=this._endScale,e.imageSize=new Cesium.Cartesian2(this._particleSize,this._particleSize),e.emitter=new Cesium.ConeEmitter(Cesium.Math.toRadians(this._coneAngle))}_updatePosition(){this._ensureEntity(),this._entity&&(this._entity.position=this._getPosition())}setPosition(e,t,s=this._height){this._longitude=e,this._latitude=t,typeof s=="number"&&(this._height=s),this._updatePosition()}get enabled(){return this._enabled}set enabled(e){e?this.show():this.hide()}get longitude(){return this._longitude}set longitude(e){this._longitude=Number(e)||0,this._updatePosition()}get latitude(){return this._latitude}set latitude(e){this._latitude=Number(e)||0,this._updatePosition()}get height(){return this._height}set height(e){this._height=Number(e)||0,this._updatePosition()}get emissionRate(){return this._emissionRate}set emissionRate(e){this._emissionRate=Math.max(0,Number(e)||0),this._particleSystem&&(this._particleSystem.emissionRate=this._emissionRate)}get particleSize(){return this._particleSize}set particleSize(e){this._particleSize=Math.max(8,Number(e)||0),this._particleSystem&&(this._particleSystem.imageSize=new Cesium.Cartesian2(this._particleSize,this._particleSize))}show(){if(this._ensureEntity(),this._entity&&(this._entity.show=!0),this._particleSystem)this._syncParticleParams(),this._particleSystem.show=!0;else{this._particleSystem=this.viewer.scene.primitives.add(this._buildParticleSystem()),this._bindPreUpdate();const e=this.viewer.clock.currentTime;this._particleSystem.modelMatrix=this._entity.computeModelMatrix(e,new Cesium.Matrix4),this._particleSystem.emitterModelMatrix=this._computeEmitterModelMatrix()}this.viewer.clock&&(this.viewer.clock.shouldAnimate=!0),this._enabled=!0}hide(){this._particleSystem&&(this._particleSystem.show=!1),this._entity&&(this._entity.show=!1),this._enabled=!1}remove(){this.hide()}flyTo(e={}){if(this.viewer)return this.viewer.camera.flyTo({destination:Cesium.Cartesian3.fromDegrees(this._longitude,this._latitude,Math.max(this._height+150,120)),orientation:{heading:0,pitch:Cesium.Math.toRadians(-35),roll:0},duration:e.duration??1.5})}destroy(){var e,t;if(this.hide(),this._unbindPreUpdate(),this._particleSystem&&((e=this.viewer)!=null&&e.scene))try{(typeof this.viewer.isDestroyed!="function"||!this.viewer.isDestroyed())&&this.viewer.scene.primitives.remove(this._particleSystem)}catch{}if(this._particleSystem=null,this._entity&&((t=this.viewer)!=null&&t.entities))try{(typeof this.viewer.isDestroyed!="function"||!this.viewer.isDestroyed())&&this.viewer.entities.remove(this._entity)}catch{}this._entity=null}}const C={Rain:p,LightRain:f,HeavyRain:d,RAIN_PRESETS:g,Snow:S,Fog:b,Fire:w,FIRE_DEFAULTS:_};export{C as E};
