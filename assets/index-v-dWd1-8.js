import{b as w,a as $,u as S,i as L}from"./index-zbQVoJ9T.js";import{z as A,A as f,H as P,I as z,s as dt,r as pt,O as ut}from"./gaussian-splats-3d.module-VqJWaCFw.js";import{c as mt,b as J,d as _t,a as ft}from"./capture-fkCMTcl0.js";const H="compass",tt="cim3d-control-compass-style",p="cim3d-control-compass",T="cim3d-control-compass-arrow",gt="cim3d-control-compass-title";function bt(){if(L(),typeof document>"u"||document.getElementById(tt))return;const n=document.createElement("style");n.id=tt,n.textContent=`
.${p} {
  position: absolute;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cim3d-control-bg, rgba(14, 23, 38, 0.82));
  border: 1px solid var(--cim3d-control-border, rgba(255, 255, 255, 0.15));
  box-shadow: inset 0 0 0 1px var(--cim3d-control-border-soft, rgba(255, 255, 255, 0.08)), var(--cim3d-control-shadow, 0 16px 36px rgba(0, 0, 0, 0.35));
  border-radius: 50%;
  color: var(--cim3d-control-text, #fff);
  font-family: Arial, Helvetica, sans-serif;
  user-select: none;
  cursor: pointer;
  z-index: var(--cim3d-control-z-index, 5);
  overflow: hidden;
  backdrop-filter: var(--cim3d-control-backdrop, blur(10px));
  touch-action: none;
}

.${p}::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.08), transparent 45%);
}

.${p}::after {
  content: '';
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* 添加罗盘刻度盘 */
.${p} .compass-dial {
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  pointer-events: none;
}

.${p} .compass-dial::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  height: 90%;
  transform: translate(-50%, -50%);
  background: repeating-conic-gradient(
    from 0deg,
    rgba(255, 255, 255, 0.15) 0deg 1deg,
    transparent 1deg 10deg
  );
  border-radius: 50%;
}

/* 四个主要方向标记 */
.${p} .compass-directions {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.${p} .compass-directions span {
  position: absolute;
  font-size: 10px;
  font-weight: 600;
  color: var(--cim3d-control-text-muted, rgba(255, 255, 255, 0.7));
}

.${p} .compass-directions .dir-n { top: 4px; left: 50%; transform: translateX(-50%); }
.${p} .compass-directions .dir-s { bottom: 4px; left: 50%; transform: translateX(-50%); }
.${p} .compass-directions .dir-e { right: 4px; top: 50%; transform: translateY(-50%); }
.${p} .compass-directions .dir-w { left: 4px; top: 50%; transform: translateY(-50%); }

/* 俯仰角指示器 - 内圈弧形 */
.${p} .pitch-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 60%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.${p} .pitch-indicator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: var(--cim3d-compass-pitch-color, var(--cim3d-control-accent, #63b3ed));
  opacity: 0.8;
  transition: all 0.08s ease-out;
}

/* 俯仰角数值显示 */
.${p} .pitch-value {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 9px;
  font-weight: 600;
  color: var(--cim3d-compass-pitch-color, var(--cim3d-control-accent, #63b3ed));
  background: rgba(0, 0, 0, 0.5);
  padding: 1px 4px;
  border-radius: 3px;
  pointer-events: none;
  white-space: nowrap;
}

.${p} .${T} {
  position: relative;
  width: 42px;
  height: 42px;
  transform-origin: center center;
  transition: transform 0.08s ease-out;  /* 加快过渡速度，更跟手 */
}

.${p} .${T}::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 6px;
  transform: translateX(-50%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 24px solid var(--cim3d-compass-north-color, var(--cim3d-control-north, #ff4e4e));
  filter: drop-shadow(0 0 8px rgba(255, 78, 78, 0.65));
}

.${p} .${T}::after {
  content: 'N';
  position: absolute;
  left: 50%;
  top: 56%;
  transform: translate(-50%, -50%);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--cim3d-control-text, rgba(255, 255, 255, 0.95));
}

.${p} .${T} .compass-tail {
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  width: 6px;
  height: 16px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 3px;
}

.${p} .${gt} {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  color: var(--cim3d-control-text-muted, rgba(255, 255, 255, 0.85));
  pointer-events: none;
  letter-spacing: 0.12em;
}
`,document.head.appendChild(n)}function vt(n){var t;return n&&(((t=n.cesiumWidget)==null?void 0:t.container)||n.container||n._element)||null}class xt{constructor(t){var e;this.viewer=((e=t==null?void 0:t.getViewer)==null?void 0:e.call(t))??t,this.container=vt(this.viewer),this._compassElement=null,this._compassArrow=null,this._handler=null,this._isDragging=!1,this._dragged=!1,this._options={position:"top-right",size:80,background:"",borderColor:"",northColor:"",textColor:"",autoRotate:!0,resetHeadingOnClick:!0}}show(t={}){var c;if(!this.container||!this.viewer)return this;if(this._options=Object.assign({},this._options,t),this._compassElement)return this.setPosition(this._options.position),this._compassElement.style.width=`${this._options.size}px`,this._compassElement.style.height=`${this._options.size}px`,this.applyTheme(),this.setVisible(!0),this;bt();const e=document.createElement("div");e.className=p,e.style.width=`${this._options.size}px`,e.style.height=`${this._options.size}px`,this._options.background&&(e.style.background=this._options.background),this._options.borderColor&&(e.style.borderColor=this._options.borderColor),this._options.textColor&&(e.style.color=this._options.textColor),this._options.northColor&&e.style.setProperty("--cim3d-compass-north-color",this._options.northColor);const i=document.createElement("div");i.className=T;const o=document.createElement("span");o.className="compass-tail",i.appendChild(o),e.appendChild(i);const s=document.createElement("div");s.className="compass-dial",e.appendChild(s);const r=document.createElement("div");r.className="compass-directions",r.innerHTML=`
      <span class="dir-n">N</span>
      <span class="dir-s">S</span>
      <span class="dir-e">E</span>
      <span class="dir-w">W</span>
    `,e.appendChild(r);const a=document.createElement("div");a.className="pitch-indicator",e.appendChild(a);const l=document.createElement("div");return l.className="pitch-value",l.textContent="-90°",e.appendChild(l),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),e.addEventListener("pointerdown",this._onPointerDown),document.addEventListener("pointermove",this._onPointerMove),document.addEventListener("pointerup",this._onPointerUp),e.addEventListener("click",h=>{if(this._dragged){this._dragged=!1,h.preventDefault(),h.stopPropagation();return}if(!this.viewer||!this._options.resetHeadingOnClick)return;const d=this.viewer.camera;d.setView({orientation:{heading:0,pitch:d.pitch,roll:d.roll}})}),this.container.appendChild(e),this._compassElement=e,this._compassArrow=i,this._pitchIndicator=a,this._pitchValue=l,this._isVisible=!0,this.applyTheme(),w(this),this._applyLayoutPosition(),this._options.autoRotate&&((c=this.viewer)!=null&&c.scene)&&(this._handler=()=>{!this.viewer||!this.viewer.scene||this._isDragging||this._updateHeading()},this.viewer.scene.postRender.addEventListener(this._handler),this._cameraChangedHandler=()=>{var h;if(!this.viewer){(h=this.viewer)!=null&&h.camera&&this._cameraChangedHandler&&this.viewer.camera.changed.removeEventListener(this._cameraChangedHandler);return}this._isDragging||requestAnimationFrame(()=>{this.viewer&&this._updateHeading()})},this.viewer.camera.changed.addEventListener(this._cameraChangedHandler),this._updateHeading()),this}hide(){return this._compassElement?(this._isVisible=!1,this._compassElement.style.display="none",this):this}setVisible(t){return this._isVisible=!!t,this._compassElement?(this._compassElement.style.display=this._isVisible?"flex":"none",A(H,this._isVisible),this):(this._isVisible&&this.show(),this)}_applyLayoutPosition(){!this._compassElement||!f(this._options.position)||P(H,this._compassElement,this._options.position,this._isVisible)}_updateHeading(){if(!this._compassArrow||!this.viewer||!this.viewer.camera)return;let e=Cesium.Math.toDegrees(this.viewer.camera.heading||0)%360;e>180&&(e-=360),e<=-180&&(e+=360);const i=-e;this._compassArrow.style.transform=`rotate(${i}deg)`,this._updatePitch()}_updatePitch(){if(!this._pitchIndicator||!this._pitchValue||!this.viewer||!this.viewer.camera)return;const t=Cesium.Math.toDegrees(this.viewer.camera.pitch||0);let e=Math.max(-90,Math.min(90,t));const i=e+90;this._pitchIndicator.style.transform=`translate(-50%, -50%) rotate(${i}deg)`,this._pitchValue.textContent=`${Math.round(e)}°`;const o=Math.abs(e)/90;this._pitchIndicator.style.setProperty("--cim3d-compass-pitch-opacity",.4+o*.6)}_getPointerRotation(t,e){if(!this._compassElement)return 0;const i=this._compassElement.getBoundingClientRect(),o=i.left+i.width/2,s=i.top+i.height/2,r=t-o,a=e-s;let l=Math.atan2(a,r)*180/Math.PI+90;return l>180&&(l-=360),l<=-180&&(l+=360),l}_applyCompassRotation(t){this._compassArrow&&(this._compassArrow.style.transform=`rotate(${t}deg)`)}_setMapHeadingFromRotation(t){if(!this.viewer||!this.viewer.camera)return;const e=Cesium.Math.toRadians(-t),i=this.viewer.camera;i.setView({orientation:{heading:e,pitch:i.pitch,roll:i.roll}})}_onPointerDown(t){var i,o;if(t.pointerType==="mouse"&&t.button!==0||!this._compassElement)return;t.preventDefault(),t.stopPropagation(),this._isDragging=!0,this._dragged=!1,this._pointerId=t.pointerId;const e=this._getPointerRotation(t.clientX,t.clientY);this._applyCompassRotation(e),this._setMapHeadingFromRotation(e),(o=(i=this._compassElement).setPointerCapture)==null||o.call(i,t.pointerId)}_onPointerMove(t){if(!this._isDragging||!this._compassElement||t.pointerId!==this._pointerId)return;t.preventDefault(),t.stopPropagation(),this._dragged=!0;const e=this._getPointerRotation(t.clientX,t.clientY);this._applyCompassRotation(e),this._setMapHeadingFromRotation(e)}_onPointerUp(t){var e,i;!this._isDragging||t.pointerId!==this._pointerId||(t.preventDefault(),t.stopPropagation(),this._isDragging=!1,this._pointerId=null,this._compassElement&&((i=(e=this._compassElement).releasePointerCapture)==null||i.call(e,t.pointerId)))}applyTheme(){return $(this._compassElement),this._options.background&&this._compassElement&&(this._compassElement.style.background=this._options.background),this._options.borderColor&&this._compassElement&&(this._compassElement.style.borderColor=this._options.borderColor),this._options.northColor&&this._compassElement&&this._compassElement.style.setProperty("--cim3d-compass-north-color",this._options.northColor),this}setPosition(t){return!this._compassElement||!f(t)?this:(this._options.position=t,this._applyLayoutPosition(),this)}destroy(){var t,e;return z(H),S(this),this._compassElement&&this._compassElement.parentNode&&this._compassElement.parentNode.removeChild(this._compassElement),this._compassElement=null,this._compassArrow=null,this._pitchIndicator=null,this._pitchValue=null,this._handler&&((t=this.viewer)!=null&&t.scene)&&(this.viewer.scene.postRender.removeEventListener(this._handler),this._handler=null),(e=this.viewer)!=null&&e.camera&&this._cameraChangedHandler&&(this.viewer.camera.changed.removeEventListener(this._cameraChangedHandler),this._cameraChangedHandler=null),this._onPointerMove&&document.removeEventListener("pointermove",this._onPointerMove),this._onPointerUp&&document.removeEventListener("pointerup",this._onPointerUp),this.container=null,this}}const et="cim3d-control-coordinate-display-style",I="cim3d-control-coordinate-display",at="cim3d-control-coordinate-item",j="cim3d-control-coordinate-value";function Ct(){if(L(),typeof document>"u"||document.getElementById(et))return;const n=document.createElement("style");n.id=et,n.textContent=`
.${I} {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--cim3d-control-bg, rgba(0, 0, 0, 0.72));
  backdrop-filter: var(--cim3d-control-backdrop, blur(10px));
  color: var(--cim3d-control-text, #fff);
  border-top: 1px solid var(--cim3d-control-border, rgba(255, 255, 255, 0.15));
  font-family: 'Courier New', monospace;
  font-size: 12px;
  z-index: 1;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  overflow-x: auto;
  box-sizing: border-box;
  pointer-events: none;
}

.${at} {
  display: inline-flex;
  align-items: center;
  padding: 0 6px;
  border-radius: 3px;
  background: var(--cim3d-control-accent-muted, rgba(255, 255, 255, 0.08));
  color: var(--cim3d-control-text, #fff);
  font-size: 12px;
}

.${j} {
  color: var(--cim3d-control-value, var(--cim3d-control-accent, #63b3ed));
  font-weight: 600;
}

@media (max-width: 1024px) {
  .${I} {
    padding: 5px 8px;
    font-size: 11px;
  }
}

@media (max-width: 768px) {
  .${I} {
    gap: 6px;
    font-size: 10px;
  }
}
`,document.head.appendChild(n)}function yt(n){var t;return n&&(((t=n.cesiumWidget)==null?void 0:t.container)||n.container||n._element)||null}class Et{constructor(t){var e;this.viewer=((e=t==null?void 0:t.getViewer)==null?void 0:e.call(t))??t,this.container=yt(this.viewer),this._displayElement=null,this._handler=null,this._postRenderHandler=null,this._isVisible=!0,this._coordinates={mouse:{lng:0,lat:0,height:0,cartesian:{x:0,y:0,z:0}},center:{lng:0,lat:0,height:0,cartesian:{x:0,y:0,z:0}},camera:{heading:0,pitch:0,roll:0,height:0}},this._options={showMouseCoordinates:!0,showCenterCoordinates:!0,showCameraInfo:!0,coordinatePrecision:6,cartesianPrecision:2,anglePrecision:2,updateInterval:16}}show(t={}){if(!this.container||!this.viewer)return this;if(this._displayElement)return this.applyTheme(),this;this._options=Object.assign({},this._options,t),Ct();const e=document.createElement("div");return e.className=I,e.style.display=this._isVisible?"flex":"none",this._displayElement=e,this._createDisplayItems(),this.container.appendChild(e),this._rootElement=e,this.applyTheme(),w(this),this._initEventHandlers(),this._updateAllCoordinates(),this}applyTheme(){return $(this._displayElement||this._rootElement),this}hide(){return this._displayElement?(this._cleanupEventHandlers(),this._displayElement.parentNode&&this._displayElement.parentNode.removeChild(this._displayElement),this._displayElement=null,this):this}setVisible(t){return this._isVisible=!!t,this._displayElement&&(this._displayElement.style.display=this._isVisible?"flex":"none"),this}_createDisplayItems(){this._displayElement&&(this._options.showMouseCoordinates&&this._displayElement.appendChild(this._createCoordinateItem("mouse-full")),this._options.showCameraInfo&&this._displayElement.appendChild(this._createCoordinateItem("camera-full")),this._options.showCenterCoordinates&&this._displayElement.appendChild(this._createCoordinateItem("center-full")))}_createCoordinateItem(t){const e=document.createElement("div");e.className=at,e.id=`cim3d-coord-${t}`;const i=document.createElement("span");return i.className=j,i.textContent="--",e.appendChild(i),e}_initEventHandlers(){var t;(t=this.viewer)!=null&&t.scene&&(this._handler=new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),this._handler.setInputAction(this._onMouseMove.bind(this),Cesium.ScreenSpaceEventType.MOUSE_MOVE),this._postRenderHandler=()=>{!this.viewer||!this.viewer.scene||this._updateCenterAndCamera()},this.viewer.scene.postRender.addEventListener(this._postRenderHandler))}_cleanupEventHandlers(){var t;this._handler&&(this._handler.destroy(),this._handler=null),this._postRenderHandler&&((t=this.viewer)!=null&&t.scene)&&(this.viewer.scene.postRender.removeEventListener(this._postRenderHandler),this._postRenderHandler=null)}_onMouseMove(t){var e,i,o;if((e=this.viewer)!=null&&e.scene)try{const s=(o=(i=this.viewer)==null?void 0:i.scene)==null?void 0:o.pickPosition(t.endPosition);if(s){const r=Cesium.Cartographic.fromCartesian(s);this._coordinates.mouse.lng=Cesium.Math.toDegrees(r.longitude),this._coordinates.mouse.lat=Cesium.Math.toDegrees(r.latitude),this._coordinates.mouse.height=r.height,this._coordinates.mouse.cartesian={x:s.x,y:s.y,z:s.z},this._updateMouseCoordinates()}}catch{}}_updateCenterAndCamera(){var i,o;if(!((i=this.viewer)!=null&&i.camera))return;const t=this._getScreenCenterCoordinates();t&&(this._coordinates.center=t,this._updateCenterCoordinates());const e=this.viewer.camera;this._coordinates.camera.heading=Cesium.Math.toDegrees(e.heading),this._coordinates.camera.pitch=Cesium.Math.toDegrees(e.pitch),this._coordinates.camera.roll=Cesium.Math.toDegrees(e.roll),this._coordinates.camera.height=((o=e.positionCartographic)==null?void 0:o.height)||0,this._updateCameraInfo()}_getScreenCenterCoordinates(){var t,e,i,o,s;if(!((t=this.viewer)!=null&&t.scene))return null;try{const r=(i=(e=this.viewer)==null?void 0:e.scene)==null?void 0:i.canvas,a=new Cesium.Cartesian2(r.width/2,r.height/2),l=(s=(o=this.viewer)==null?void 0:o.scene)==null?void 0:s.pickPosition(a);if(l){const c=Cesium.Cartographic.fromCartesian(l);return{lng:Cesium.Math.toDegrees(c.longitude),lat:Cesium.Math.toDegrees(c.latitude),height:c.height,cartesian:{x:l.x,y:l.y,z:l.z}}}}catch{}return null}_updateMouseCoordinates(){if(!this._displayElement)return;const t=(r,a=this._options.coordinatePrecision)=>Number(r).toFixed(a),e=(r,a=this._options.cartesianPrecision)=>Number(r).toFixed(a),i=`${t(this._coordinates.mouse.lng)}, ${t(this._coordinates.mouse.lat)}`,o=`${t(this._coordinates.mouse.height,2)}m`,s=`${e(this._coordinates.mouse.cartesian.x)}, ${e(this._coordinates.mouse.cartesian.y)}, ${e(this._coordinates.mouse.cartesian.z)}`;this._updateItemValue("mouse-full",`经纬度: ${i}, 高度: ${o}; 笛卡尔: ${s}`)}_updateCenterCoordinates(){if(!this._displayElement)return;const t=(i,o=this._options.coordinatePrecision)=>Number(i).toFixed(o),e=`中心点经纬度: ${t(this._coordinates.center.lng)}, ${t(this._coordinates.center.lat)}, ${t(this._coordinates.center.height,2)}m`;this._updateItemValue("center-full",e)}_updateCameraInfo(){if(!this._displayElement)return;const t=(r,a=this._options.anglePrecision)=>Number(r).toFixed(a),e=`${t(this._coordinates.camera.heading)}°`,i=`${t(this._coordinates.camera.pitch)}°`,o=`${t(this._coordinates.camera.roll)}°`,s=`${t(this._coordinates.camera.height,0)}m`;this._updateItemValue("camera-full",`相机俯仰角: ${e}, ${i}, ${o}, ${s}`)}_updateAllCoordinates(){this._updateMouseCoordinates(),this._updateCenterCoordinates(),this._updateCameraInfo()}_updateItemValue(t,e){if(!this._displayElement)return;const i=this._displayElement.querySelector(`#cim3d-coord-${t}`);if(i){const o=i.querySelector(`.${j}`);o&&(o.textContent=e)}}setOptions(t){return this._options=Object.assign({},this._options,t),this}destroy(){return S(this),this.hide(),this.container=null,this}}const R="zoom",it="cim3d-control-zoom-style",lt="cim3d-control-zoom",_="cim3d-control-zoom-button",Z="cim3d-control-zoom-level";function wt(){if(L(),typeof document>"u"||document.getElementById(it))return;const n=document.createElement("style");n.id=it,n.textContent=`
.${lt} {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0;
  z-index: var(--cim3d-control-z-index, 5);
  pointer-events: auto;
  background: transparent;
  padding: 4px;
  transition: all 0.3s ease;
}

.${_} {
  width: 32px;
  height: 36px;
  background: var(--cim3d-control-bg-elevated, rgba(15, 23, 42, 0.6));
  border: 1px solid var(--cim3d-control-border, rgba(255, 255, 255, 0.3));
  color: var(--cim3d-control-text, rgba(255, 255, 255, 0.95));
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 8px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  position: relative;
  overflow: hidden;
  text-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.8),
    0 0 6px rgba(0, 0, 0, 0.5);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.${_}::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.${_}:hover {
  background: var(--cim3d-control-bg, rgba(15, 23, 42, 0.8));
  border-color: var(--cim3d-control-accent-muted, rgba(255, 255, 255, 0.5));
  color: var(--cim3d-control-text, #fff);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.${_}:hover::before {
  opacity: 1;
}

.${_}:active {
  // background: rgba(15, 23, 42, 0.9);
  // border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

/* 禁用状态 */
.${_}:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.${_}:disabled:hover {
  background: rgba(15, 23, 42, 0.6);
  border-color: rgba(255, 255, 255, 0.3);
  transform: none;
}

/* 缩放层级显示 */
.${Z} {
  width: 100%;
  min-width: 32px;
  height: 24px;
  margin: 4px 0;
  background: var(--cim3d-control-bg-elevated, rgba(15, 23, 42, 0.6));
  border: 1px solid var(--cim3d-control-accent-muted, rgba(78, 205, 196, 0.4));
  border-radius: 6px;
  color: var(--cim3d-control-accent, #63b3ed);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
  transition: all 0.2s ease;
  text-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.8),
    0 0 6px rgba(78, 205, 196, 0.3);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.${Z}:hover {
  background: rgba(15, 23, 42, 0.7);
  border-color: rgba(78, 205, 196, 0.6);
}
`,document.head.appendChild(n)}function $t(n){var t;return n&&(((t=n.cesiumWidget)==null?void 0:t.container)||n.container||n._element)||null}class St{constructor(t){var e;this.viewer=((e=t==null?void 0:t.getViewer)==null?void 0:e.call(t))??t,this.container=$t(this.viewer),this._zoomElement=null,this._zoomInButton=null,this._zoomOutButton=null,this._zoomLevelDisplay=null,this._isVisible=!0,this._options={position:"top-right",zoomInAmount:2,zoomOutAmount:.5,animationDuration:1.5}}show(t={}){var r;if(!this.container||!this.viewer)return this;if(this._zoomElement)return this.setPosition(this._options.position),this.applyTheme(),this.setVisible(!0),this;this._options=Object.assign({},this._options,t),wt();const e=document.createElement("div");e.className=lt;const i=document.createElement("button");i.className=`${_} zoom-in`,i.textContent="+",i.title="放大",i.setAttribute("aria-label","放大"),i.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),this.zoomIn()});const o=document.createElement("button");o.className=`${_} zoom-out`,o.textContent="−",o.title="缩小",o.setAttribute("aria-label","缩小"),o.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),this.zoomOut()});const s=document.createElement("div");return s.className=Z,s.textContent="--",s.title="当前缩放层级",e.appendChild(i),e.appendChild(s),e.appendChild(o),this.container.appendChild(e),this._zoomElement=e,this._zoomInButton=i,this._zoomOutButton=o,this._zoomLevelDisplay=s,this.applyTheme(),w(this),this._applyLayoutPosition(),this._updateZoomLevel(),(r=this.viewer)!=null&&r.camera&&(this._cameraChangeHandler=()=>{var a;if(!this.viewer||!this.viewer.camera){(a=this.viewer)!=null&&a.camera&&this._cameraChangeHandler&&this.viewer.camera.moveEnd.removeEventListener(this._cameraChangeHandler);return}this._updateZoomLevel()},this.viewer.camera.moveEnd.addEventListener(this._cameraChangeHandler)),this}hide(){return this._zoomElement?(this._isVisible=!1,this._zoomElement.style.display="none",this):this}setVisible(t){return this._isVisible=!!t,this._zoomElement?(this._zoomElement.style.display=this._isVisible?"flex":"none",A(R,this._isVisible),this):(this._isVisible&&this.show(),this)}_applyLayoutPosition(){!this._zoomElement||!f(this._options.position)||P(R,this._zoomElement,this._options.position,this._isVisible)}zoomIn(t=null,e=null){var s;if(!((s=this.viewer)!=null&&s.camera))return this;const i=t!==null?t:this._options.zoomInAmount,o=e!==null?e:this._options.animationDuration;return this._performZoom(i,o),this}zoomOut(t=null,e=null){var s;if(!((s=this.viewer)!=null&&s.camera))return this;const i=t!==null?t:this._options.zoomOutAmount,o=e!==null?e:this._options.animationDuration;return this._performZoom(i,o),this}_performZoom(t,e){const i=this.viewer.camera;this.viewer.scene;const o=i.position.clone(),s=i.direction.clone(),r=Cesium.Cartesian3.multiplyByScalar(s,i.positionCartographic.height*(1-t),new Cesium.Cartesian3),a=Cesium.Cartesian3.add(o,r,new Cesium.Cartesian3);i.flyTo({destination:a,orientation:{heading:i.heading,pitch:i.pitch,roll:i.roll},duration:e,easingFunction:Cesium.EasingFunction.QUADRATIC_OUT})}zoomToRectangle(t,e=null){var o;if(!((o=this.viewer)!=null&&o.camera))return this;const i=e!==null?e:this._options.animationDuration;return this.viewer.camera.flyTo({destination:t,duration:i,easingFunction:Cesium.EasingFunction.QUADRATIC_OUT}),this}zoomTo(t,e=null){if(!this.viewer)return this;const i=e!==null?e:this._options.animationDuration;return this.viewer.flyTo(t,{duration:i,easingFunction:Cesium.EasingFunction.QUADRATIC_OUT}),this}resetZoom(t=null,e=null){if(!this.viewer)return this;const i=e!==null?e:this._options.animationDuration;return t?this.viewer.camera.flyTo({...t,duration:i,easingFunction:Cesium.EasingFunction.QUADRATIC_OUT}):this.viewer.flyTo(this.viewer.entities.values,{duration:i,easingFunction:Cesium.EasingFunction.QUADRATIC_OUT}),this}_updateZoomLevel(){var o;if(!this._zoomLevelDisplay||!((o=this.viewer)!=null&&o.camera))return;const e=this.viewer.camera.positionCartographic.height;let i;e>1e7?i=1:e>5e6?i=2:e>2e6?i=3:e>1e6?i=4:e>5e5?i=5:e>2e5?i=6:e>1e5?i=7:e>5e4?i=8:e>2e4?i=9:e>1e4?i=10:e>5e3?i=11:e>2e3?i=12:e>1e3?i=13:e>500?i=14:e>200?i=15:e>100?i=16:e>50?i=17:e>20?i=18:e>10?i=19:i=20,this._zoomLevelDisplay.textContent=`L${i}`}applyTheme(){return $(this._zoomElement),this}setPosition(t){return!this._zoomElement||!f(t)?this:(this._options.position=t,this._applyLayoutPosition(),this)}setOptions(t){return this._options=Object.assign({},this._options,t),this}destroy(){var t;return z(R),S(this),(t=this.viewer)!=null&&t.camera&&this._cameraChangeHandler&&(this.viewer.camera.moveEnd.removeEventListener(this._cameraChangeHandler),this._cameraChangeHandler=null),this._zoomElement&&this._zoomElement.parentNode&&this._zoomElement.parentNode.removeChild(this._zoomElement),this._zoomElement=null,this._zoomInButton=null,this._zoomOutButton=null,this._zoomLevelDisplay=null,this.container=null,this}}const U="scale",ot="cim3d-control-scale-style",O="cim3d-control-scale",g="cim3d-control-scale-bar",D="cim3d-control-scale-text";function Lt(){if(L(),typeof document>"u"||document.getElementById(ot))return;const n=document.createElement("style");n.id=ot,n.textContent=`
.${O} {
  position: absolute;
  bottom: 30px;
  left: 10px;
  z-index: var(--cim3d-control-z-index, 5);
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.${g} {
  display: flex;
  align-items: flex-end;
  gap: 0;
  margin-bottom: 0;
  position: relative;
  padding: 0;
  cursor: pointer;
  height: 16px;
}

.${g} .bar {
  height: 2px;
  background: var(--cim3d-control-bar, rgba(255, 255, 255, 0.95));
  border-radius: 1px;
  position: relative;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* 刻度线 */
.${g} .tick {
  position: absolute;
  width: 2px;
  background: var(--cim3d-control-bar, rgba(255, 255, 255, 0.95));
  bottom: 0;
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

/* 左端主刻度 */
.${g} .tick.tick-start {
  left: 0;
  height: 12px;
}

/* 右端主刻度 */
.${g} .tick.tick-end {
  right: 0;
  height: 12px;
}

/* 中间刻度 */
.${g} .tick.tick-middle {
  left: 50%;
  transform: translateX(-50%);
  height: 8px;
  background: var(--cim3d-control-bar, rgba(255, 255, 255, 0.8));
  opacity: 0.75;
}

.${D} {
  font-size: 12px;
  font-weight: 700;
  color: var(--cim3d-control-text, #f0f9ff);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  letter-spacing: 0.8px;
  transition: all 0.3s ease;
  padding: 0;
  line-height: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  cursor: pointer;
}

.${D}:hover {
  color: var(--cim3d-control-accent, #63b3ed);
  transform: scale(1.05);
}

.${D}:active {
  transform: scale(0.98);
}

/* 响应式 */
@media (max-width: 768px) {
  .${O} {
    bottom: 20px;
    left: 5px;
  }
  
  .${D} {
    font-size: 11px;
  }
}
`,document.head.appendChild(n)}function Tt(n){var t;return n&&(((t=n.cesiumWidget)==null?void 0:t.container)||n.container||n._element)||null}class Dt{constructor(t){var e;this.viewer=((e=t==null?void 0:t.getViewer)==null?void 0:e.call(t))??t,this.container=Tt(this.viewer),this._scaleElement=null,this._barElement=null,this._textElement=null,this._isVisible=!0,this._options={position:"bottom-left",maxWidth:120,units:"metric"}}show(t={}){var h;if(!this.container||!this.viewer)return this;if(this._scaleElement)return this.setPosition(this._options.position),this.applyTheme(),this.setVisible(!0),this;this._options=Object.assign({},this._options,t),Lt();const e=document.createElement("div");e.className=O;const i=document.createElement("div");i.className=g;const o=document.createElement("div");o.className="bar",o.style.width=`${this._options.maxWidth}px`;const s=document.createElement("div");s.className="tick tick-start",o.appendChild(s);const r=document.createElement("div");r.className="tick tick-middle",o.appendChild(r);const a=document.createElement("div");a.className="tick tick-end",o.appendChild(a),i.appendChild(o);const l=document.createElement("div");l.className=D,l.textContent="--",l.title="点击切换单位 (公制/英制)",e.appendChild(i),e.appendChild(l),this.container.appendChild(e),this._scaleElement=e,this._barElement=o,this._barContainer=i,this._tickStart=s,this._tickMiddle=r,this._tickEnd=a,this._textElement=l;const c=()=>{this._options.units=this._options.units==="metric"?"imperial":"metric",this._updateScale()};return l.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),c()}),i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),c()}),this.applyTheme(),w(this),this._applyLayoutPosition(),(h=this.viewer)!=null&&h.camera&&(this._cameraChangeHandler=()=>{var d;if(!this.viewer||!this.viewer.camera){(d=this.viewer)!=null&&d.camera&&this._cameraChangeHandler&&this.viewer.camera.moveEnd.removeEventListener(this._cameraChangeHandler);return}this._updateScale()},this.viewer.camera.moveEnd.addEventListener(this._cameraChangeHandler),this._updateScale()),this}hide(){return this._scaleElement?(this._cleanupEventHandlers(),this._scaleElement.parentNode&&this._scaleElement.parentNode.removeChild(this._scaleElement),this._scaleElement=null,this._barElement=null,this._barContainer=null,this._tickStart=null,this._tickMiddle=null,this._tickEnd=null,this._textElement=null,this):this}setVisible(t){return this._isVisible=!!t,this._scaleElement&&(this._scaleElement.style.display=this._isVisible?"flex":"none",A(U,this._isVisible)),this}_applyLayoutPosition(){!this._scaleElement||!f(this._options.position)||P(U,this._scaleElement,this._options.position,this._isVisible)}getPosition(){return this._options.position}setPosition(t){return!this._scaleElement||!f(t)?this:(this._options.position=t,this._applyLayoutPosition(),this)}applyTheme(){return $(this._scaleElement),this}getOptions(){return{...this._options}}setOptions(t={}){return this._options=Object.assign({},this._options,t),this._barElement&&(this._barElement.style.width=`${this._options.maxWidth}px`),this}_updateScale(){var G;if(!this._barElement||!this._textElement||!((G=this.viewer)!=null&&G.camera))return;const t=this.viewer.camera,e=this.viewer.canvas;t.positionCartographic;const i=e.clientWidth,o=t.getPickRay(new Cesium.Cartesian2(0,e.clientHeight/2)),s=t.getPickRay(new Cesium.Cartesian2(i,e.clientHeight/2));if(!o||!s)return;const r=this.viewer.scene,a=r.globe.pick(o,r),l=r.globe.pick(s,r);if(!a||!l)return;const c=Cesium.Cartesian3.distance(a,l);let h,d;const x=this._options.units;if(x==="metric"||x==="both"){const C=this._formatMetricDistance(c);h=C.distance,d=C.text}else if(x==="imperial"){const C=this._formatImperialDistance(c);h=C.distance,d=C.text}else h=c,d=`${Math.round(c)}m`;const X=this._options.maxWidth,ht=Math.max(50,Math.min(X,h/c*X));this._barElement.style.width=`${ht}px`,this._textElement.textContent=d,this._barContainer&&this._barContainer.querySelectorAll(".tick").forEach((y,Q)=>{Q===0?(y.style.left="0",y.style.right=""):Q===1?(y.style.left="50%",y.style.right=""):(y.style.left="",y.style.right="0")})}_formatMetricDistance(t){if(t>=1e3){const e=t/1e3,i=this._roundToNiceNumber(e);return{distance:i*1e3,text:i>=100?`${Math.round(i)} km`:`${i.toFixed(1)} km`}}else{const e=this._roundToNiceNumber(t);return{distance:e,text:`${Math.round(e)} m`}}}_formatImperialDistance(t){const e=t*3.28084;if(e>=5280){const i=e/5280,o=this._roundToNiceNumber(i);return{distance:o*5280/3.28084,text:o>=100?`${Math.round(o)} mi`:`${o.toFixed(1)} mi`}}else{const i=this._roundToNiceNumber(e);return{distance:i/3.28084,text:`${Math.round(i)} ft`}}}_roundToNiceNumber(t){const e=Math.pow(10,Math.floor(Math.log10(t))),i=t/e;let o;return i<1.5?o=1:i<3?o=2:i<7?o=5:o=10,o*e}_cleanupEventHandlers(){var t;(t=this.viewer)!=null&&t.camera&&this._cameraChangeHandler&&(this.viewer.camera.moveEnd.removeEventListener(this._cameraChangeHandler),this._cameraChangeHandler=null)}destroy(){return z(U),S(this),this.hide(),this.container=null,this}}const B="screenshot",st="cim3d-control-screenshot-style",ct="cim3d-control-screenshot",E="cim3d-control-screenshot-btn";function kt(){if(L(),typeof document>"u"||document.getElementById(st))return;const n=document.createElement("style");n.id=st,n.textContent=`
.${ct} {
  position: absolute;
  z-index: var(--cim3d-control-z-index, 5);
  pointer-events: auto;
}

.${E} {
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid var(--cim3d-control-border, rgba(255, 255, 255, 0.3));
  border-radius: 8px;
  background: var(--cim3d-control-bg-elevated, rgba(15, 23, 42, 0.75));
  color: var(--cim3d-control-text, #fff);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: var(--cim3d-control-shadow, 0 4px 12px rgba(0, 0, 0, 0.35));
  backdrop-filter: var(--cim3d-control-backdrop, blur(8px));
}

.${E}:hover:not(:disabled) {
  color: var(--cim3d-control-accent, #63b3ed);
  border-color: var(--cim3d-control-accent-muted, rgba(99, 179, 237, 0.5));
  transform: translateY(-1px);
}

.${E}:active:not(:disabled) {
  transform: translateY(0);
}

.${E}:disabled {
  opacity: 0.55;
  cursor: wait;
}

.${E} .cim3d-screenshot-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
`,document.head.appendChild(n)}function At(n){var t;return n&&(((t=n.cesiumWidget)==null?void 0:t.container)||n.container||n._element)||null}class Pt{constructor(t){var e;this.viewer=((e=t==null?void 0:t.getViewer)==null?void 0:e.call(t))??t,this.container=At(this.viewer),this._rootElement=null,this._button=null,this._isVisible=!0,this._capturing=!1,this._lastCapture=null,this._options={position:"bottom-right",format:"png",quality:.92,fileNamePrefix:"cesium-capture",downloadOnCapture:!0,renderDelay:80,showButton:!0,buttonTitle:"截图出图",includeMapControls:!1,excludeScreenshotButton:!0,onCapture:null,onError:null}}show(t={}){if(!this.container||!this.viewer)return this;if(this._options=Object.assign({},this._options,t),!this._rootElement&&this._options.showButton){kt();const e=document.createElement("div");e.className=ct;const i=document.createElement("button");i.type="button",i.className=E,i.title=this._options.buttonTitle,i.setAttribute("aria-label",this._options.buttonTitle),i.innerHTML=`
        <svg class="cim3d-screenshot-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 3h6l2 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-2zm3 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
        </svg>
      `,i.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),this.captureAndDownload()}),e.appendChild(i),this.container.appendChild(e),this._rootElement=e,this._button=i,w(this),this.applyTheme(),this._applyLayoutPosition()}else this._rootElement&&(this.setPosition(this._options.position),this.applyTheme());return this.setVisible(this._isVisible),this}hide(){return this.setVisible(!1),this}setVisible(t){return this._isVisible=!!t,this._rootElement&&(this._rootElement.style.display=this._isVisible?"block":"none",A(B,this._isVisible)),this}_applyLayoutPosition(){!this._rootElement||!f(this._options.position)||P(B,this._rootElement,this._options.position,this._isVisible)}setPosition(t){return!this._rootElement||!f(t)?this:(this._options.position=t,this._applyLayoutPosition(),this)}setOptions(t={}){return this._options=Object.assign({},this._options,t),this._button&&this._options.buttonTitle&&(this._button.title=this._options.buttonTitle,this._button.setAttribute("aria-label",this._options.buttonTitle)),this}getOptions(){return{...this._options}}getLastCapture(){return this._lastCapture?{...this._lastCapture}:null}applyTheme(){return $(this._rootElement),this}async capture(t={}){var d,x;if(!this.viewer)throw new Error("Viewer 未初始化");const e=t.format??this._options.format,i=t.quality??this._options.quality,o=t.renderDelay??this._options.renderDelay,s=t.includeMapControls??this._options.includeMapControls,r=t.excludeScreenshotButton??this._options.excludeScreenshotButton,a=await mt(this.viewer,{format:e,quality:i,renderDelay:o,includeMapControls:s,excludeScreenshotButton:r}),l=J(t.fileNamePrefix??this._options.fileNamePrefix,e);let c=null;try{c=await _t(a.dataUrl)}catch{}const h={...a,fileName:l,blob:c};return this._lastCapture=h,(x=(d=this._options).onCapture)==null||x.call(d,h),h}download(t,e){var s,r;const i=t||((s=this._lastCapture)==null?void 0:s.dataUrl);if(!i)throw new Error("没有可下载的截图，请先调用 capture()");const o=e||((r=this._lastCapture)==null?void 0:r.fileName)||J(this._options.fileNamePrefix,this._options.format);return ft(i,o),this}async captureAndDownload(t={}){var e,i;if(this._capturing)return null;this._capturing=!0,this._button&&(this._button.disabled=!0);try{const o=await this.capture(t);return(t.downloadOnCapture??this._options.downloadOnCapture)&&this.download(o.dataUrl,o.fileName),o}catch(o){throw(i=(e=this._options).onError)==null||i.call(e,o),o}finally{this._capturing=!1,this._button&&(this._button.disabled=!1)}}async copyToClipboard(){var t,e;if(!((t=this._lastCapture)!=null&&t.blob))throw new Error("请先截图，或当前环境无法生成 Blob");if(!((e=navigator.clipboard)!=null&&e.write))throw new Error("当前浏览器不支持 Clipboard API");return await navigator.clipboard.write([new ClipboardItem({[this._lastCapture.blob.type]:this._lastCapture.blob})]),this}destroy(){var t;return z(B),S(this),(t=this._rootElement)!=null&&t.parentNode&&this._rootElement.parentNode.removeChild(this._rootElement),this._rootElement=null,this._button=null,this.container=null,this}}var V={VITE_BASE:"/vuewithcesium/",BASE_URL:"/vuewithcesium/",MODE:"gh-pages",DEV:!1,PROD:!0,SSR:!1};const zt=typeof import.meta<"u"&&(V==null?void 0:V.VITE_AMAP_WEB_KEY)||"a8402d14d0ccfca93c24bdd6dcf34e03",It="/amap-rest/v3/assistant/inputtips";function Nt(n){if(!n)return null;if(typeof n=="string"&&n.includes(",")){const t=n.split(",").map(e=>parseFloat(e.trim()));return t.length>=2&&t.every(e=>Number.isFinite(e))?[t[0],t[1]]:null}if(typeof n=="object"&&n!==null){const t=Number(n.lng),e=Number(n.lat);if(Number.isFinite(t)&&Number.isFinite(e))return[t,e]}return null}function Mt(n){if(!Array.isArray(n))return[];const t=[],e=new Set;for(const i of n){const o=String(i.name||"").trim();if(!o)continue;const s=Nt(i.location);if(!s)continue;const r=`${o}|${s[0]},${s[1]}`;e.has(r)||(e.add(r),t.push({id:String(i.id||r),name:o,district:i.district?String(i.district):"",address:i.address?String(i.address):"",location:s}))}return t}async function Ht(n,t={}){const e=String(n||"").trim();if(!e)return[];const i=new URLSearchParams({key:t.apiKey||zt,keywords:e,datatype:"all",output:"json",city:t.city??"全国"}),o=await fetch(`${It}?${i.toString()}`,{signal:t.signal});if(!o.ok)throw new Error(`高德搜索请求失败 (${o.status})`);const s=await o.json();if(s.status!=="1"&&s.info!=="OK")throw new Error(s.info||"高德搜索无结果");return Mt(s.tips)}const F="search",nt="cim3d-control-search-style",u="cim3d-control-search",N="cim3d-control-search-toggle",Y="cim3d-control-search-input-wrap",W="cim3d-control-search-input",k="cim3d-control-search-dropdown",b="cim3d-control-search-item",K="cim3d-control-search-empty",q="cim3d-control-search-flyout",M="cim3d-control-search-hover-zone",v="cim3d-control-search-bar",m=36,Rt=`
<svg class="cim3d-search-icon" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 9.5 5 13 7.01 13 9.5 11.99 14 9.5 14z"/>
</svg>`;function Ut(){if(L(),typeof document>"u"||document.getElementById(nt))return;const n=document.createElement("style");n.id=nt,n.textContent=`
.${u} {
  position: absolute;
  z-index: var(--cim3d-control-z-index, 5);
  pointer-events: auto;
  width: ${m}px;
  height: ${m}px;
  overflow: visible;
  box-sizing: border-box;
}

.${u}.is-expanded {
  z-index: 20;
}

.${M} {
  position: absolute;
  top: 0;
  min-width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  pointer-events: auto;
}

.${u}.is-anchor-left .${M} {
  left: 0;
  right: auto;
}

.${u}.is-anchor-right .${M} {
  right: 0;
  left: auto;
}

.${q} {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.${u}.is-anchor-right .${q} {
  align-items: flex-end;
}

.${v} {
  display: grid;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--cim3d-control-border, rgba(255, 255, 255, 0.3));
  background: var(--cim3d-control-bg-elevated, rgba(15, 23, 42, 0.82));
  box-shadow: var(--cim3d-control-shadow, 0 4px 12px rgba(0, 0, 0, 0.35));
  backdrop-filter: var(--cim3d-control-backdrop, blur(8px));
  overflow: hidden;
  transition: width 0.25s ease, grid-template-columns 0.25s ease, border-color 0.2s ease;
  width: ${m}px;
  min-width: ${m}px;
}

.${u}.is-anchor-left .${v} {
  grid-template-columns: ${m}px 0fr;
}

.${u}.is-anchor-left.is-expanded .${v} {
  width: 260px;
  min-width: 260px;
  grid-template-columns: ${m}px 1fr;
}

.${u}.is-anchor-right .${v} {
  grid-template-columns: 0fr ${m}px;
}

.${u}.is-anchor-right.is-expanded .${v} {
  width: 260px;
  min-width: 260px;
  grid-template-columns: 1fr ${m}px;
}

.${N} {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--cim3d-control-text, #fff);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.${N}:hover {
  color: var(--cim3d-control-accent, #63b3ed);
}

.${N} .cim3d-search-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.${Y} {
  min-width: 0;
  opacity: 0;
  overflow: hidden;
  transition: opacity 0.2s ease;
}

.${u}.is-expanded .${Y} {
  opacity: 1;
}

.${W} {
  width: 100%;
  box-sizing: border-box;
  height: 36px;
  padding: 0 10px 0 4px;
  border: none;
  outline: none;
  background: transparent;
  color: var(--cim3d-control-text, #fff);
  font-size: 13px;
}

.${W}::placeholder {
  color: var(--cim3d-control-text-muted, rgba(255, 255, 255, 0.45));
}

.${k} {
  position: absolute;
  top: calc(100% + 6px);
  list-style: none;
  margin: 0;
  padding: 4px 0;
  width: 260px;
  max-height: 240px;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid var(--cim3d-control-border, rgba(255, 255, 255, 0.25));
  background: var(--cim3d-control-bg, rgba(15, 20, 25, 0.94));
  box-shadow: var(--cim3d-control-shadow, 0 8px 20px rgba(0, 0, 0, 0.4));
  display: none;
}

.${u}.is-anchor-left .${k} {
  left: 0;
  right: auto;
}

.${u}.is-anchor-right .${k} {
  right: 0;
  left: auto;
}

.${u}.is-expanded.has-results .${k} {
  display: block;
}

.${b} {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 13px;
  line-height: 1.4;
  color: var(--cim3d-control-text, #e6edf3);
  border-bottom: 1px solid var(--cim3d-control-border-soft, rgba(255, 255, 255, 0.06));
}

.${b}:last-child {
  border-bottom: none;
}

.${b}:hover,
.${b}.is-active {
  background: var(--cim3d-control-accent-muted, rgba(99, 179, 237, 0.2));
  color: var(--cim3d-control-accent, #63b3ed);
}

.${b} .cim3d-search-item-name {
  display: block;
  font-weight: 500;
}

.${b} .cim3d-search-item-meta {
  display: block;
  margin-top: 2px;
  font-size: 11px;
  color: var(--cim3d-control-text-muted, #8b949e);
}

.${K} {
  padding: 10px 12px;
  font-size: 12px;
  color: var(--cim3d-control-text-muted, #8b949e);
  text-align: center;
}
`,document.head.appendChild(n)}function Bt(n){var t;return n&&(((t=n.cesiumWidget)==null?void 0:t.container)||n.container||n._element)||null}class Vt{constructor(t,e={}){var i;this.viewer=((i=t==null?void 0:t.getViewer)==null?void 0:i.call(t))??t,this.container=Bt(this.viewer),this._root=null,this._hoverZone=null,this._toggleBtn=null,this._input=null,this._dropdown=null,this._collapseTimer=null,this._isVisible=!0,this._expanded=!1,this._results=[],this._activeIndex=-1,this._debounceTimer=null,this._abortController=null,this._loading=!1,this._options={position:"top-left",apiKey:void 0,city:"全国",placeholder:"搜索地点",debounceMs:320,flyDuration:1.2,flyHeight:2500,flyPitch:-45,minKeywordLength:1,expandOnHover:!1,hoverCollapseDelay:320,onSelect:null,onError:null,...e},this._onToggleClick=this._onToggleClick.bind(this),this._onInput=this._onInput.bind(this),this._onInputKeydown=this._onInputKeydown.bind(this),this._onDocumentClick=this._onDocumentClick.bind(this),this._onHoverZoneEnter=this._onHoverZoneEnter.bind(this),this._onHoverZoneLeave=this._onHoverZoneLeave.bind(this),this._onRootPointerDown=this._onRootPointerDown.bind(this),this._ignoreOutsideUntil=0}show(t={}){return!this.container||!this.viewer?this:(this._options={...this._options,...t},this._root||(Ut(),this._buildDom(),this._applyAnchorClass(),w(this)),this.applyTheme(),this.setPosition(this._options.position),this.setVisible(this._isVisible),this)}_buildDom(){const t=document.createElement("div");t.className=u,t.dataset.layoutSlotHeight=String(m),t.dataset.layoutSlotWidth=String(m);const e=document.createElement("div");e.className=M,e.addEventListener("mouseenter",this._onHoverZoneEnter),e.addEventListener("mouseleave",this._onHoverZoneLeave),e.addEventListener("pointerdown",this._onRootPointerDown);const i=document.createElement("div");i.className=q;const o=document.createElement("div");o.className=v;const s=document.createElement("button");s.type="button",s.className=N,s.title="搜索地点",s.setAttribute("aria-label","搜索地点"),s.innerHTML=Rt,s.addEventListener("click",this._onToggleClick);const r=document.createElement("div");r.className=Y;const a=document.createElement("input");a.type="search",a.className=W,a.placeholder=this._options.placeholder,a.autocomplete="off",a.spellcheck=!1,a.addEventListener("input",this._onInput),a.addEventListener("keydown",this._onInputKeydown),r.appendChild(a),o.appendChild(s),o.appendChild(r),o.addEventListener("click",c=>{var h;this._expanded&&(c.target===s||s.contains(c.target)||(h=this._input)==null||h.focus())});const l=document.createElement("ul");l.className=k,l.setAttribute("role","listbox"),i.appendChild(o),i.appendChild(l),e.appendChild(i),t.appendChild(e),this.container.appendChild(t),document.addEventListener("click",this._onDocumentClick),this._root=t,this._hoverZone=e,this._toggleBtn=s,this._input=a,this._dropdown=l}_clearCollapseTimer(){this._collapseTimer&&(clearTimeout(this._collapseTimer),this._collapseTimer=null)}_onHoverZoneEnter(){this._options.expandOnHover&&(this._clearCollapseTimer(),this._expanded||this.expand({focus:!1}))}_onHoverZoneLeave(){if(!this._options.expandOnHover||!this._expanded)return;this._clearCollapseTimer();const t=this._options.hoverCollapseDelay??320;this._collapseTimer=setTimeout(()=>{this._collapseTimer=null,this.collapse()},t)}_onToggleClick(t){t.preventDefault(),t.stopPropagation(),this._clearCollapseTimer(),this._expanded?this.collapse():this.expand({focus:!0})}expand(t={}){return this._root?(this._expanded=!0,this._clearCollapseTimer(),this._ignoreOutsideUntil=performance.now()+320,this._root.classList.add("is-expanded"),t.focus!==!1&&requestAnimationFrame(()=>{var e;(e=this._input)==null||e.focus()}),this):this}collapse(){return this._root?(this._clearCollapseTimer(),this._expanded=!1,this._root.classList.remove("is-expanded","has-results"),this._clearResults(),this._abortSearch(),this._input&&(this._input.value=""),this._relayoutStack(),requestAnimationFrame(()=>this._relayoutStack()),this):this}_relayoutStack(){var e;const t=((e=this._root)==null?void 0:e.parentElement)||this.container;dt(t||document)}_onRootPointerDown(t){t.stopPropagation()}_onDocumentClick(t){!this._expanded||!this._root||performance.now()<this._ignoreOutsideUntil||(this._hoverZone||this._root).contains(t.target)||this.collapse()}_applyAnchorClass(){if(!this._root)return;const t=this._options.position||"top-right",e=t.includes("left"),i=t.includes("right");this._root.classList.toggle("is-anchor-left",e),this._root.classList.toggle("is-anchor-right",i||!e)}_onInput(){var e,i;const t=((i=(e=this._input)==null?void 0:e.value)==null?void 0:i.trim())??"";this._debounceTimer&&clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._debounceTimer=null,this._search(t)},this._options.debounceMs)}_onInputKeydown(t){if(t.key==="Escape"){t.preventDefault(),this.collapse();return}if(t.key==="ArrowDown"){t.preventDefault(),this._moveActive(1);return}if(t.key==="ArrowUp"){t.preventDefault(),this._moveActive(-1);return}if(t.key==="Enter"){t.preventDefault();const e=this._results[this._activeIndex]??this._results[0];e&&this._selectPlace(e)}}_moveActive(t){this._results.length&&(this._activeIndex<0?this._activeIndex=t>0?0:this._results.length-1:this._activeIndex=(this._activeIndex+t+this._results.length)%this._results.length,this._renderDropdown())}_abortSearch(){this._abortController&&(this._abortController.abort(),this._abortController=null)}async _search(t){var i,o;this._abortSearch();const e=this._options.minKeywordLength??1;if(!t||t.length<e){this._clearResults();return}this._abortController=new AbortController,this._loading=!0;try{const s=await Ht(t,{apiKey:this._options.apiKey,city:this._options.city,signal:this._abortController.signal});this._results=s,this._activeIndex=s.length?0:-1,this._renderDropdown()}catch(s){if((s==null?void 0:s.name)==="AbortError")return;this._results=[],this._renderDropdown((s==null?void 0:s.message)||"搜索失败"),(o=(i=this._options).onError)==null||o.call(i,s)}finally{this._loading=!1}}_clearResults(){this._results=[],this._activeIndex=-1,this._dropdown&&(this._dropdown.innerHTML="")}_renderDropdown(t){var e,i;if(!(!this._dropdown||!this._root)){if(this._dropdown.innerHTML="",t){const o=document.createElement("li");o.className=K,o.textContent=t,this._dropdown.appendChild(o),this._root.classList.add("has-results");return}if(!this._results.length){if((i=(e=this._input)==null?void 0:e.value)!=null&&i.trim()){const o=document.createElement("li");o.className=K,o.textContent=this._loading?"搜索中…":"无匹配地点",this._dropdown.appendChild(o),this._root.classList.add("has-results")}else this._root.classList.remove("has-results");return}this._results.forEach((o,s)=>{const r=document.createElement("li");r.className=b,s===this._activeIndex&&r.classList.add("is-active"),r.setAttribute("role","option"),r.dataset.index=String(s);const a=[o.district,o.address].filter(Boolean).join(" · ");r.innerHTML=`
        <span class="cim3d-search-item-name">${rt(o.name)}</span>
        ${a?`<span class="cim3d-search-item-meta">${rt(a)}</span>`:""}
      `,r.addEventListener("mousedown",l=>{l.preventDefault(),this._selectPlace(o)}),this._dropdown.appendChild(r)}),this._root.classList.add("has-results")}}_selectPlace(t){var e,i;t!=null&&t.location&&(this._flyToPlace(t),(i=(e=this._options).onSelect)==null||i.call(e,t),this.collapse())}_flyToPlace(t){const[e,i]=t.location,[o,s]=pt.gcj02towgs84(e,i),r=this.viewer.camera.positionCartographic,a=(r==null?void 0:r.height)??0,l=Math.max(a,this._options.flyHeight),c=typeof this._options.flyPitch=="number"?Cesium.Math.toRadians(this._options.flyPitch):this._options.flyPitch??Cesium.Math.toRadians(-45),h=(r==null?void 0:r.heading)??0;this.viewer.camera.flyTo({destination:Cesium.Cartesian3.fromDegrees(o,s,l),orientation:{heading:h,pitch:c,roll:0},duration:this._options.flyDuration})}hide(){return this.setVisible(!1)}setVisible(t){return this._isVisible=!!t,this._root&&(this._root.style.display=this._isVisible?"block":"none",A(F,this._isVisible),this._isVisible||this.collapse()),this}setPosition(t){return!this._root||!f(t)?this:(this._options.position=t,this._applyAnchorClass(),P(F,this._root,t,this._isVisible),this._relayoutStack(),this)}setOptions(t={}){return this._options={...this._options,...t},this._input&&t.placeholder&&(this._input.placeholder=t.placeholder),this}applyTheme(){if($(this._root),!this._root)return this;const t=this._root.querySelector(`.${v}`);if(t){const e=getComputedStyle(document.documentElement),i=(o,s)=>e.getPropertyValue(o).trim()||s;t.style.background=i("--cim3d-control-bg-elevated","rgba(15, 23, 42, 0.82)"),t.style.borderColor=i("--cim3d-control-border","rgba(255, 255, 255, 0.3)")}return this}destroy(){var t;return this.collapse(),z(F),S(this),this._abortSearch(),this._debounceTimer&&clearTimeout(this._debounceTimer),this._clearCollapseTimer(),document.removeEventListener("click",this._onDocumentClick),(t=this._root)!=null&&t.parentNode&&this._root.parentNode.removeChild(this._root),this._root=null,this._hoverZone=null,this._toggleBtn=null,this._input=null,this._dropdown=null,this}}function rt(n){return String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const Ot={Compass:xt,Coordinate:Et,Zoom:St,Scale:Dt,Screenshot:Pt,Overview:ut,Search:Vt};export{Ot as C};
