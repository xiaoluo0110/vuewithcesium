var Ig=Object.defineProperty;var Rg=(r,t,e)=>t in r?Ig(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var lt=(r,t,e)=>(Rg(r,typeof t!="symbol"?t+"":t,e),e);/* empty css             *//* empty css                     *//* empty css                    *//* empty css                *//* empty css                 *//* empty css               *//* empty css                  *//* empty css                  */import{bm as Og,aJ as $g,bG as Wg,bH as zg,bI as Ng,bJ as qg,bK as jg,bL as Hg,bc as Ug,aQ as it,bM as os,bF as Gg,ax as Vg,z as Si,o as Yg,A as Xg,a6 as Kg,b as _i,d as Yn,f as Mt,e as ke,w as Bi,h as Zg,j as Xn,a2 as Qg,J as Jg,_ as tf,aE as rf,az as ef,F as nf,r as of,D as sf,t as oa,I as af}from"./index-WbcqHQD_.js";import{c as lf}from"./index-zbQVoJ9T.js";import he from"./purify.es-VnshMA6w.js";import{_ as hf}from"./_plugin-vue_export-helper-x3n3nnut.js";var cf="[object Map]",df="[object Set]",uf=Object.prototype,pf=uf.hasOwnProperty;function sa(r){if(r==null)return!0;if(Og(r)&&($g(r)||typeof r=="string"||typeof r.splice=="function"||Wg(r)||zg(r)||Ng(r)))return!r.length;var t=qg(r);if(t==cf||t==df)return!r.size;if(jg(r))return!Hg(r).length;for(var e in r)if(pf.call(r,e))return!1;return!0}const gf="# ElevationProfile（地形高程剖面）\r\n\r\n沿一条折线路径，按固定距离间隔对当前 `terrainProvider` 采样高程，得到**距起点累积距离—海拔**序列，用于剖面图与量算。\r\n\r\n## 依赖\r\n\r\n- 需要有效地形（如 `CesiumTerrainProvider`）；否则高程多为 0。\r\n- 路径至少 **2** 个顶点，顺序为绘制方向。\r\n\r\n## 构造\r\n\r\n```js\r\nconst ep = new cim3d.Analysis.ElevationProfile(viewer, {\r\n  sampleStepMeters: 40,  // 沿线间距（米），过密时受 maxSamples 约束会自动加大\r\n  maxSamples: 800,\r\n})\r\n```\r\n\r\n## 流程\r\n\r\n1. `setPathByPositions(Cartesian3[])` 设置路径（会清空此前地图可视化实体）。\r\n2. `showPathEntities({ lineColor, lineWidth, startLabel, endLabel })`（可选）贴地折线 + 起终点标注。\r\n3. `await computeProfile(options?)` 采样并返回数据。\r\n4. 图表交互时调用 `setHoverSample(sample | null)`，在地图上高亮当前采样点（`sample` 为 `profile.samples[i]`）。\r\n\r\n## `computeProfile` 返回的 `profile`\r\n\r\n| 字段 | 说明 |\r\n|------|------|\r\n| `totalLengthMeters` | 路径总长（米） |\r\n| `minHeightMeters` / `maxHeightMeters` / `heightDeltaMeters` | 剖面海拔极值与落差 |\r\n| `samples` | `{ index, distanceMeters, heightMeters, longitude, latitude, longitudeDeg, latitudeDeg }[]` |\r\n\r\n## 主要方法\r\n\r\n| 方法 | 说明 |\r\n|------|------|\r\n| `setOptions(patch)` | 调整采样参数 |\r\n| `clearPath()` | 清除路径与缓存剖面 |\r\n| `clearVisualization()` | 仅清除地图上的路径/悬停实体 |\r\n| `remove()` | 完全清理 |\r\n\r\n## 注意\r\n\r\n- 沿线插值在折线段内为 **ECEF 直线插值**，长距离大曲率路径时与大地线略有偏差，一般工程剖面可接受。\r\n- 采样点较多时会多次调用 `sampleTerrainMostDetailed`，注意性能。\r\n",ff=`# GeoSOT 二维网格（0–32 级）\r
\r
基于 GeoSOT 2^n 全球剖分树的二维网格编码与查询，**算法与渲染分离**。\r
\r
## 分级\r
\r
| 级别 | 码长 | 约经度跨度 | 约纬度跨度 |\r
|------|------|------------|------------|\r
| 0 | \`G\` | 360° | 180° |\r
| L | \`G\` + L 位 | 360°/2^L | 180°/2^L |\r
| 32 | 33 字符 | ~8.4e-8° | ~4.2e-8° |\r
\r
象限编码：\`0=SW, 1=SE, 2=NW, 3=NE\`。第 2 级存在极地无效码（\`G02\` 等）。\r
\r
## 高度域（0–32 级）\r
\r
- 二进制剖分，地上以 \`0\` 开头、地下以 \`1\` 开头（GB/T 39409）\r
- 三维码格式：\`二维码#高度二进制\`（\`#\` 为 \`CODE_3D_SEPARATOR\`）\r
- 可配置 \`referenceHeight\`、\`maxHeightAbove\`、\`maxHeightBelow\`（米，椭球高）\r
\r
福田演示场景统一配置见 \`src/widgets/AnalysisGeoSOT/json/futianSceneConfig.js\`（参考面约 42 m，空域顶底对齐 UAV 轨迹高度带）。\r
\r
\`\`\`js\r
const hOpts = { referenceHeight: 42.1, maxHeightAbove: 260, maxHeightBelow: 500 };\r
const vol = cim3d.Analysis.GeoSOT.encode3D(114.05, 22.55, 120, 16, 12, hOpts);\r
\`\`\`\r
\r
## 用法（仅算法）\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js';\r
\r
const code = cim3d.Analysis.GeoSOT.encode2D(114.05, 22.55, 12);\r
const cell = cim3d.Analysis.GeoSOT.decode2D(code);\r
\r
const geojson = await cim3d.Analysis.GeoSOT.loadGeoJSONFromUrl(url);\r
\r
// bbox 枚举（兼容旧行为）\r
const extent = cim3d.Analysis.GeoSOT.bboxFromGeoJSON(geojson);\r
const cells = cim3d.Analysis.GeoSOT.getCellsInExtent2D(extent, 9, { maxCells: 10000 });\r
\r
// 多边形裁切（P0 默认）：格心 in 外环\r
const clipped = cim3d.Analysis.GeoSOT.getCellsInGeoJSON(geojson, 9, {\r
  maxCells: 10000,\r
  clipToPolygon: true,\r
  returnMeta: true,\r
});\r
// clipped: { cells, truncated, estimatedBbox, estimatedClipped }\r
\`\`\`\r
\r
### 裁切策略（P0）\r
\r
| 项 | 说明 |\r
|----|------|\r
| 判定 | **格心落在 GeoJSON 外环内**即保留 |\r
| MultiPolygon | 支持各多边形外环 \`coordinates[0]\` |\r
| 内环（洞） | 暂不支持 |\r
| 边界 | 可能漏/多约 1 格边界格 |\r
| 2D 截断 | 达 \`maxCells\` 返回 \`truncated: true\`，不静默半套 |\r
| 3D 超限 | 裁切后仍超 \`maxCells\` 则 \`throw\` |\r
\r
## 可视化（可选）\r
\r
\`\`\`js\r
const geosot = new cim3d.Analysis.GeoSOT(viewer);\r
const layer = geosot.createGridLayer();\r
layer.showFromGeoJSON(geojson, 9, {\r
  fillColor: 'rgba(76, 201, 240, 0.1)',\r
  strokeColor: '#4cc9f0',\r
}, { clipToPolygon: true, maxCells: 50000 });\r
\`\`\`\r
\r
## API\r
\r
| 方法 | 说明 |\r
|------|------|\r
| \`encode2D\` / \`decode2D\` | 经纬度 ↔ 网格码 |\r
| \`getCellsInExtent2D\` | 矩形枚举；\`returnMeta: true\` 得 \`{ cells, truncated, estimatedInExtent }\` |\r
| \`getCellsInGeoJSON\` | GeoJSON + 可选 \`clipToPolygon\` |\r
| \`estimateCellCountInGeoJSON\` | bbox / 裁切后格数预估 |\r
| \`getVolumeCellsInGeoJSON\` | 体素枚举（水平格 × 高度层，可裁切） |\r
| \`estimateVolumeCellCountInGeoJSON\` | 体素数预估（bbox / 裁切） |\r
| \`polygonClip.*\` | 多边形环提取、点-in-多边形、过滤 |\r
| \`encodeHeight\` / \`encode3D\` | 高度域与三维组合码 |\r
| \`GeoSOTGridLayer\` | 二维网格渲染 |\r
| \`GeoSOTVolumeLayer\` | 固定级别三维空域体 |\r
| \`GeoSOTVolumeLODLayer\` | 相机高度动态 LOD |\r
\r
## 三维空域体可视化\r
\r
\`\`\`js\r
const geosot = new cim3d.Analysis.GeoSOT(viewer);\r
const hOpts = FUTIAN_HEIGHT_OPTIONS; // 或自定义\r
\r
const vol = geosot.createVolumeLayer();\r
vol.showFromGeoJSON(geojson, 16, 12, hOpts, {}, {\r
  minHeight: 82,\r
  maxHeight: 302,\r
  maxCells: 20000,\r
  clipToPolygon: true,\r
});\r
\r
const lod = geosot.createVolumeLODLayer();\r
lod.startFromGeoJSON(geojson, hOpts, {}, {\r
  minHeight: 82,\r
  maxHeight: 302,\r
  clipToPolygon: true,\r
});\r
lod.stop();\r
\`\`\`\r
\r
## 占用栅格（P1）\r
\r
对裁切后的体素做 **垂直射线** 采样（需已加载 \`Cesium3DTileset\`），写入 \`OccupancyIndex\`（主键 \`code3d\`）。\r
\r
| 状态 | 含义 |\r
|------|------|\r
| \`free\` | 射线未在体素高度层内命中建筑 |\r
| \`occupied\` | 命中 tileset 且命中高在 \`[minHeight, maxHeight]\` |\r
| \`unknown\` | 未命中（瓦片缺失等），统计展示，查询默认不当 occupied |\r
| \`restricted\` | 预留禁飞区 |\r
\r
\`\`\`js\r
const geosot = new cim3d.Analysis.GeoSOT(viewer);\r
\r
const { index, cells, stats } = await geosot.buildOccupancyFromGeoJSON(\r
  futianTileset,\r
  geojson,\r
  14,\r
  10,\r
  heightOptions,\r
  { minHeight: 82, maxHeight: 302, maxCells: 20000, clipToPolygon: true },\r
  { batchSize: 80, onProgress: ({ done, total }) => console.log(done, total) },\r
);\r
\r
geosot.showOccupancyVolume({ showFill: false }); // 默认线框，occupied 红色\r
\r
geosot.isOccupied('G…#010101'); // true/false\r
geosot.queryOccupancy(code3d);   // 条目或 undefined\r
\`\`\`\r
\r
| API | 说明 |\r
|-----|------|\r
| \`buildOccupancyFromGeoJSON\` | 体素枚举 + 射线采样 |\r
| \`sampleTilesetOccupancy\` | 对已有体素列表采样 |\r
| \`OccupancyIndex\` | 内存索引 \`get\` / \`isOccupied\` / \`counts\` |\r
| \`OccupancyVolumeLayer\` | 按占用分色渲染 |\r
| \`OCCUPANCY\` / \`DEFAULT_OCCUPANCY_STYLE\` | 枚举与默认色 |\r
\r
演示页「航线占用粗检」：\`routeOccupancyCheck.js\`，轨迹点 \`encode3D\` 查码（无邻域膨胀，P2 增强）。\r
\r
## 演示页\r
\r
\`src/widgets/AnalysisGeoSOT/index.vue\`：福田边界 + 倾斜模型占用栅格 + UAV 轨迹粗检；\`useGeoSOTSceneContext\` 负责 viewer 就绪与加载阶段。\r
`,mf=`# HeightLimit 限高分析\r
\r
## 1. 功能简介\r
\r
在指定**水平投影区域**（凸多边形）内，对 **3D Tiles 建筑** 使用 \`CustomShader\` 做材质修改：相对分析原点 **ENU 竖轴高度** 超过阈值的部分显示为红色，用于城市规划中的限高示意。\r
\r
> 高度语义：以区域中心在椭球面上的点为 ENU 原点，片段中 \`enu.z\` 为沿当地「上」方向的分量（米）。与绝对海拔（AMSL）或楼层标高可能不一致，适用于局部小范围白模。\r
\r
> 水平范围：着色在 **ENU 平面 XY** 上做多边形内判定；若绘制面略小于楼体水平投影，会出现「半边不着色」。SDK 默认对 footprint 做 **质心径向外扩**（\`footprintExpandRatio\`，默认约 \`1.12\`），仍建议把面画得比楼底一圈略大。\r
\r
> 片段位置：使用 \`fsInput.attributes.positionWC\` 转 ENU，避免模型矩阵与 varying 不一致导致的漏判。\r
\r
> 区域形状：着色器内使用**凸多边形**半空间判定；凹多边形可能出现误判，建议绘制简单凸包区域。\r
\r
---\r
\r
## 2. 快速使用\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js'\r
\r
const hl = new cim3d.Analysis.HeightLimit(viewer, {\r
  tileset: myTileset, // 可选；不传则 apply 时使用场景中第一个 Cesium3DTileset\r
  heightLimitMeters: 80\r
})\r
\r
hl.setRegionByPositions(polygonCartesian3Array)\r
const { success, message } = hl.apply()\r
if (!success) console.warn(message)\r
\r
// 动态改阈值或水平外扩（已 apply 后）\r
hl.setOptions({ heightLimitMeters: 100, footprintExpandRatio: 1.15 })\r
\r
// 关闭高亮但保留 shader\r
hl.enabled = false\r
\r
hl.clearEffect() // 去掉 customShader（不清空区域）\r
hl.remove() // 完全销毁\r
\`\`\`\r
\r
---\r
\r
## 3. 参数\r
\r
| 选项 | 说明 |\r
|------|------|\r
| \`tileset\` | 目标 \`Cesium3DTileset\`，可选 |\r
| \`heightLimitMeters\` | 限高阈值（米，ENU 竖轴），默认 \`80\` |\r
| \`footprintExpandRatio\` | 水平 footprint 相对质心的径向外扩系数，默认 \`1.12\`（范围约 \`1.0\`–\`1.5\`） |\r
| \`enabled\` | 是否参与着色，默认 \`true\` |\r
\r
\`setOptions({ heightLimitMeters, footprintExpandRatio, enabled })\` 可在已挂接 shader 时热更新 uniform；\`footprintExpandRatio\` 变更会重算 footprint 并同步多边形 uniform。\r
\r
---\r
\r
## 4. API\r
\r
- \`setTileset(tileset)\`：切换目标瓦片（会先 \`clearEffect\`）\r
- \`setRegionByPositions(positions)\`：设置分析多边形（≥3 点）\r
- \`clearRegion()\`：清空区域并移除效果\r
- \`apply({ tileset? })\`：挂接 \`customShader\`（**会覆盖**该 tileset 已有 \`customShader\`）\r
- \`clearEffect()\`：移除本模块创建的 shader\r
- \`pickFirstTileset()\`：从 \`scene.primitives\` 取第一个 3D Tiles\r
- \`remove()\`：等价于清理效果并清空内部状态\r
\r
---\r
\r
## 5. 注意事项\r
\r
- 同一 tileset 同时只能有一个 \`customShader\`；若与模型压平等功能共用，请分时使用或自行合并 shader。\r
- 无 3D Tiles 时 \`apply\` 会返回 \`success: false\`。\r
`,yf="# IsoSurface 等值面分析\r\n\r\n## 1. 功能简介\r\n\r\n`IsoSurface` 在用户指定的多边形区域内，对 **Cesium 地形高程** 进行网格采样，生成 **按高程渐变的填色纹理**，并叠加 **等值线**（委托 `ContourLine` 模块，Marching Squares 算法），整体效果接近常见 GIS 地形等值图 / 分层设色图。\r\n\r\n主要能力：\r\n\r\n- 区域外接矩形内均匀采样地形，得到 `minHeight` / `maxHeight` 与图例范围\r\n- 将采样网格映射为 Canvas 纹理（绿→黄→红连续色带，与 `IsoVolume` 一致）\r\n- 将纹理贴到分析区多边形上（默认 **贴地 draping**）\r\n- 可选绘制等高线及高程标签\r\n\r\n演示页面：`src/widgets/AnalysisIsoSurface/index.vue`。\r\n\r\n---\r\n\r\n## 2. 原理说明\r\n\r\n### 2.1 整体流程\r\n\r\n```mermaid\r\nflowchart LR\r\n  A[设置区域顶点] --> B[estimateAreaHeightRange]\r\n  B --> C[analyze]\r\n  C --> D[_sampleHeightGrid]\r\n  D --> E[_buildContourTexture]\r\n  E --> F[Entity 填色多边形]\r\n  C --> G[ContourLine.analyze]\r\n  G --> H[等值线 Entity]\r\n```\r\n\r\n1. **区域**：至少 3 个 `Cartesian3` 顶点，构成闭合多边形；内部保存笛卡尔、弧度制 `Cartographic` 与度制 `{lon, lat}` 三套坐标，分别用于采样、Entity 与纹理逻辑。\r\n2. **高程范围**：在区域 **外接矩形** 内按 `(grid+1)²` 布点，调用 `Cesium.sampleTerrainMostDetailed(terrainProvider, …)` 取地形高度；取全局 min/max 作为着色与等值线的归一化区间。未配置 `surfaceHeight` 时默认取区间中值。\r\n3. **高程网格**：`analyze` 时在矩形内再以 **72×72**（可调逻辑在 `_sampleHeightGrid`）密集采样，得到 `_heightGrid.heights[y][x]`。纬度从北向南扫描，与 Canvas 行序一致。\r\n4. **纹理生成**：每个网格点高程 `h` 归一化为  \r\n   `t = (h - minHeight) / (maxHeight - minHeight)`，  \r\n   再在 `palette` 五色之间 **线性插值** 得到 RGB（`_colorAtElevationRatio`），避免按 band 硬切产生色缝。小尺寸原图再 **双线性放大** 到 `textureSize`（默认 512）以平滑显示。\r\n5. **填色面**：`ImageMaterialProperty` 将 Canvas 作为 `image`，`color` 乘透明度 `opacity`。多边形两种模式见下节。\r\n6. **等值线**：`levelStep ≈ (maxHeight - minHeight) / bandCount`，由 `ContourLine` 在同一区域网格上做 Marching Squares 提取线段，并可贴地或按高程绘制。\r\n\r\n### 2.2 填色多边形：贴地 vs 水平面\r\n\r\n| 模式 | `clampToGround` | 几何 | 纹理含义 |\r\n|------|-----------------|------|----------|\r\n| 贴地（默认） | `true` | `heightReference: CLAMP_TO_GROUND`，经纬二维 `hierarchy` | 纹理铺在起伏地表上，颜色表示该处地形相对高程 |\r\n| 水平面 | `false` | `fromDegreesArrayHeights`，各顶点同一 `surfaceHeight`（米） | 在固定绝对高程上的水平切片，纹理仍按区域内地形采样着色（平面载体 + 地形色带） |\r\n\r\n贴地模式需 **真实地形**（如 `CesiumTerrainProvider`）；仅椭球地形时采样高度接近 0，图例与填色效果会失真。建议开启 `viewer.scene.globe.depthTestAgainstTerrain = true`，避免等值线与地表深度冲突。\r\n\r\n### 2.3 与「单一等值面」的关系\r\n\r\n名称中的 IsoSurface 在实现上包含两层含义：\r\n\r\n- **可视化主体**：区域内 **连续高程设色**（整张纹理），而非仅一条 `surfaceHeight` 的等值带。\r\n- **参数 `surfaceHeight`**：在 `clampToGround === false` 时决定 **水平多边形** 的绝对高程；在贴地模式下主要用于 UI 滑条与返回值，分析结果仍以区域 `minHeight`～`maxHeight` 为色标范围。\r\n\r\n等值线间隔由 `bandCount` 推导：`levelStep = round((max - min) / bandCount)`，与色带分级数量一致，保证线色与填色层级协调。\r\n\r\n### 2.4 依赖与限制\r\n\r\n- **地形**：依赖 `viewer.terrainProvider`；`sampleTerrainMostDetailed` 失败时回退为 height=0，不抛错。\r\n- **ContourLine**：`../ContourLine/index.js`，共享区域顶点；`remove()` 时需一并销毁。\r\n- **性能**：72×72 约 5329 次地形采样 + 纹理像素计算 + 等值线网格（约 `bandCount×5` 量级）；大范围或频繁 `analyze` 时注意节流。\r\n- **区域形状**：采样网格为 **外接矩形**，不规则多边形四角可能落在区域外，角点处颜色仍参与纹理（未做多边形掩膜裁剪）。\r\n\r\n---\r\n\r\n## 3. 快速使用\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js'\r\n\r\nconst isoSurface = new cim3d.Analysis.IsoSurface(viewer, {\r\n  surfaceHeight: 120,\r\n  bandCount: 10,\r\n  showContourLines: true,\r\n  clampToGround: true\r\n})\r\n\r\n// 绘制或传入区域顶点\r\nawait isoSurface.setRegionByPositions(positions, { autoEstimateHeight: true })\r\nconst result = await isoSurface.analyze()\r\n```\r\n\r\n建议先加载地形再分析，例如演示页中的 Mars3D 地形 URL。\r\n\r\n---\r\n\r\n## 4. 构造参数\r\n\r\n| 参数 | 类型 | 默认 | 说明 |\r\n|------|------|------|------|\r\n| `opacity` | `number` | `0.92` | 填色面透明度，范围约 0.2～1 |\r\n| `surfaceHeight` | `number` | — | 目标高程（米）；未设时在 `setRegion` / `analyze` 中取区间中值 |\r\n| `bandCount` | `number` | `10` | 分级数，影响等值线步长与 ContourLine 网格密度 |\r\n| `showContourLines` | `boolean` | `true` | 是否绘制等值线 |\r\n| `contourLineWidth` | `number` | `1.2` | 等值线宽度系数（内部会放大后传给 ContourLine） |\r\n| `textureSize` | `number` | `512` | 输出纹理边长，128～1024 |\r\n| `showLabel` | `boolean` | `false` | 等值线高程标签 |\r\n| `labelFontSize` | `number` | `14` | 标签字号 |\r\n| `clampToGround` | `boolean` | `true` | `true` 贴地 draping；`false` 为 `surfaceHeight` 水平面 |\r\n\r\n色带 `palette` 固定为：`#00a65a → #65d66a → #d6e66a → #f2b04b → #d94841`（与 IsoVolume 一致）。\r\n\r\n---\r\n\r\n## 5. API\r\n\r\n| 方法 | 说明 |\r\n|------|------|\r\n| `setOptions(patch)` | 更新样式/行为；已存在 Entity 时同步材质与 ContourLine 配置 |\r\n| `setRegionByPositions(positions, opts?)` | 设置区域；`autoEstimateHeight: true` 时自动估算 min/max |\r\n| `estimateAreaHeightRange(positions, grid?)` | 仅采样估算高程范围，不写 Entity |\r\n| `analyze(options?)` | 完整分析：网格采样、纹理、填色面、等值线 |\r\n| `clearSurface()` | 清除填色面与等值线，保留区域 |\r\n| `clearRegion()` | 清除区域及全部结果 |\r\n| `remove()` | 销毁实例 |\r\n\r\n属性：`enabled`（显隐）、`hasRegion`（是否已设区域）。\r\n\r\n---\r\n\r\n## 6. analyze 返回值\r\n\r\n```ts\r\n{\r\n  success: boolean\r\n  surfaceHeight: number      // 钳制在 [minHeight, maxHeight] 后的目标高程\r\n  minHeight: number\r\n  maxHeight: number\r\n  bandCount: number\r\n  contourLineCount: number   // 等值线段数量\r\n  contourLevels: number[]    // 等值线层级（米）\r\n  message: string\r\n}\r\n```\r\n\r\n失败时 `success: false`，`message` 如 `'请先设置分析区域'`。\r\n\r\n---\r\n\r\n## 7. 文件结构\r\n\r\n```\r\nIsoSurface/\r\n  index.js    # 主类：采样、纹理、Entity、ContourLine 编排\r\n  README.md   # 本文档\r\n```\r\n\r\n相关模块：`Analysis/ContourLine`（等值线）、`Analysis/IsoVolume`（同色带体渲染）。\r\n",Cf=`# IsoVolume 等值体分析\r
\r
## 1. 功能简介\r
\r
\`IsoVolume\` 用于在指定区域内按高程间隔生成多层分级面，形成“等值体分层展示”效果。  \r
适合表达地形高程在体空间中的层级分布。\r
\r
---\r
\r
## 2. 快速使用\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js'\r
\r
const isoVolume = new cim3d.Analysis.IsoVolume(viewer, {\r
  levelStep: 20,\r
  opacity: 0.45,\r
  showLabels: false\r
})\r
\`\`\`\r
\r
\`\`\`js\r
await isoVolume.setRegionByPositions(positions, { autoEstimateHeight: true })\r
const result = await isoVolume.analyze()\r
\`\`\`\r
\r
---\r
\r
## 3. 参数\r
\r
- \`levelStep: number\` 等值体分层间距（米），默认 \`20\`\r
- \`opacity: number\` 面透明度，默认 \`0.45\`\r
- \`showLabels: boolean\` 是否显示高程标签，默认 \`false\`\r
- \`labelFontSize: number\` 标签字号，默认 \`13\`\r
- \`labelInterval: number\` 标签抽稀间隔，默认 \`2\`\r
\r
---\r
\r
## 4. API\r
\r
- \`setOptions(patch)\`：动态更新参数\r
- \`setRegionByPositions(positions, opts?)\`：设置分析区域\r
- \`estimateAreaHeightRange(positions, grid?)\`：采样高程范围\r
- \`analyze(options?)\`：生成等值体分层\r
- \`clearSurfaces()\`：清空结果\r
- \`clearRegion()\`：清空区域与结果\r
- \`remove()\`：销毁\r
\r
---\r
\r
## 5. 返回结果\r
\r
\`analyze\` 返回：\r
\r
\`\`\`ts\r
{\r
  success: boolean\r
  volumeLayerCount: number\r
  levels: number[]\r
  minHeight: number\r
  maxHeight: number\r
  message: string\r
}\r
\`\`\`\r
`,xf=`# Openness 开敞度分析\r
\r
## 1. 功能简介\r
\r
\`Openness\` 用于评估指定观测点周围空间的开敞程度。  \r
核心思路是以观测点为球心，在给定半径内构建“视域半球”，按方位角与俯仰角进行采样，逐方向判断可见/遮挡，并输出开敞度统计结果。\r
\r
该能力可用于：\r
\r
- 城市规划中的建筑密度、建筑高度、容积率辅助评估\r
- 视域空间品质分析\r
- 军事/安防场景中的雷达覆盖范围模拟分析\r
\r
---\r
\r
## 2. 分析原理\r
\r
1. 选择观测点（支持设置观测高度）。\r
2. 在半球内按采样步长生成方向网格：\r
   - 方位角：\`0 ~ 360°\`\r
   - 俯仰角：\`0 ~ 90°\`\r
3. 对每个方向发射射线，检测首个遮挡点（模型/地形）。\r
4. 若无遮挡或命中距离接近目标距离，则判定该方向为可见。\r
5. 统计开敞度：\r
\r
\`\`\`text\r
开敞度 = 可见采样数 / 总采样数\r
\`\`\`\r
\r
6. 可视化输出：\r
   - 绿色：可见方向\r
   - 红色：遮挡方向\r
   - 可选显示半球（支持透明度、线框模式、面片着色）\r
\r
---\r
\r
## 3. 参数说明\r
\r
构造函数：\r
\r
\`\`\`js\r
const openness = new cim3d.Analysis.Openness(viewer, options)\r
\`\`\`\r
\r
\`options\`：\r
\r
- \`radius: number\`  \r
  观测半径（米），默认 \`300\`\r
- \`observerHeight: number\`  \r
  观测点抬高高度（米），默认 \`1.7\`\r
- \`targetTolerance: number\`  \r
  目标容差（米），默认 \`1.5\`（减少边界误判）\r
- \`occlusionBias: number\`  \r
  遮挡偏差（米），默认 \`0.5\`\r
- \`azimuthStep: number\`  \r
  方位采样步长（度），默认 \`15\`\r
- \`elevationStep: number\`  \r
  俯仰采样步长（度），默认 \`15\`\r
- \`occlusionMode: 'onlyModel' | 'modelAndTerrain'\`  \r
  遮挡模式，默认 \`modelAndTerrain\`\r
- \`showHemisphere: boolean\`  \r
  是否显示半球，默认 \`true\`\r
- \`hemisphereColor: string | Cesium.Color\`  \r
  半球颜色，默认青色\r
- \`hemisphereAlpha: number\`  \r
  半球透明度，默认 \`0.12\`\r
- \`hemisphereWireframeOnly: boolean\`  \r
  是否仅显示半球轮廓，默认 \`false\`\r
- \`visibleColor: string | Cesium.Color\`  \r
  可见颜色，默认绿色\r
- \`invisibleColor: string | Cesium.Color\`  \r
  不可见颜色，默认红色\r
\r
---\r
\r
## 4. API\r
\r
### \`setObserver(position: Cesium.Cartesian3): void\`\r
\r
设置观测点（内部会根据 \`observerHeight\` 抬高）。\r
\r
### \`setOptions(patch: object): void\`\r
\r
动态更新参数（可实时更新半球显示、透明度、线框模式等）。\r
\r
### \`analyze(): OpennessResult | null\`\r
\r
执行分析并返回结果：\r
\r
\`\`\`ts\r
type OpennessResult = {\r
  openness: number\r
  opennessPercent: number\r
  visibleCount: number\r
  blockedCount: number\r
  totalCount: number\r
}\r
\`\`\`\r
\r
### \`clear(): void\`\r
\r
清空当前分析结果与可视化实体。\r
\r
### \`remove(): void\`\r
\r
等价于 \`clear()\`，用于组件销毁时释放。\r
\r
---\r
\r
## 5. 使用示例\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js'\r
\r
const openness = new cim3d.Analysis.Openness(viewer, {\r
  radius: 300,\r
  observerHeight: 1.7,\r
  azimuthStep: 15,\r
  elevationStep: 15,\r
  occlusionMode: 'modelAndTerrain',\r
  showHemisphere: true,\r
  hemisphereAlpha: 0.2,\r
  hemisphereWireframeOnly: false,\r
  visibleColor: '#00ff66',\r
  invisibleColor: '#ff3b30'\r
})\r
\r
// 设定观测点\r
openness.setObserver(observerCartesian3)\r
\r
// 执行分析\r
const result = openness.analyze()\r
console.log(result?.opennessPercent)\r
\r
// 动态切换显示样式\r
openness.setOptions({\r
  showHemisphere: true,\r
  hemisphereAlpha: 0.35,\r
  hemisphereWireframeOnly: false\r
})\r
\`\`\`\r
\r
---\r
\r
## 6. 性能建议\r
\r
- 采样越密（\`azimuthStep\`、\`elevationStep\` 越小），结果越精细，但耗时越高。\r
- 推荐档位：\r
  - 快速预览：\`30 / 30\`\r
  - 标准分析：\`15 / 15\`\r
  - 精细分析：\`10 / 10\` 或更小\r
- Demo 页面提供“一键档位”（快速/标准/精细），会自动设置方位采样与俯仰采样。\r
- 大半径 + 高密度采样可能导致绘制实体较多，建议先预览再精细计算。\r
\r
---\r
\r
## 7. 常见问题\r
\r
### Q1: 为什么会出现误判？\r
\r
- 可能是地形微起伏、模型边界、容差设置导致。\r
- 可调参数：\`targetTolerance\`、\`occlusionBias\`。\r
- 也可切换 \`occlusionMode\`（仅模型 / 模型+地形）对比结果。\r
\r
### Q2: 半球为什么只显示轮廓？\r
\r
- 检查 \`hemisphereWireframeOnly\` 是否为 \`true\`。\r
\r
### Q3: 为什么半球不显示？\r
\r
- 检查 \`showHemisphere\` 是否开启。\r
- 检查是否已先设置观测点（\`setObserver\`）。\r
\r
`,bf=`# SkyLine / DualSkyLine\r
\r
## SkyLine（原有）\r
\r
后处理描边 + 天际线体，见 \`index.js\`。\r
\r
## DualSkyLine（双天际线）\r
\r
区分**地形天际线**与**建筑天际线**。可视化采用**实时后处理描边**（与「天际线描边」Tab 相同原理），会随相机移动更新；\`analyze()\` 仅用于统计点集。\r
\r
### 用法\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js';\r
\r
const dual = new cim3d.Analysis.DualSkyLine(viewer, {\r
  tileset,\r
  analysisMode: 'dualPass',\r
  terrainColor: '#00ff88',\r
  buildingColor: '#ff4444',\r
  columnStep: 4,\r
  groundFilter: {\r
    mode: 'height',\r
    minHeight: 3.0,\r
    groundDepthThreshold: 0.05,\r
  },\r
});\r
\r
// Style 模式\r
// groundFilter: { mode: 'style', styleExpression: "\${feature['height']} > 2.0" }\r
\r
const { terrain, building } = await dual.analyze();\r
dual.visualize();\r
dual.remove();\r
\`\`\`\r
\r
### groundFilter（排除 tileset 内地表）\r
\r
倾斜摄影 tileset 常含地面 mesh，建筑通道需过滤，否则会把地形算进建筑天际线。\r
\r
| 模式 | 说明 |\r
| --- | --- |\r
| \`height\` | 默认。3D Tiles Style 按高度属性过滤 + CPU/后处理深度兜底 |\r
| \`style\` | 自定义 \`styleExpression\`（3D Tiles Style \`show\`） |\r
| \`none\` | 不过滤（仅依赖后处理建筑/地形深度差） |\r
\r
| 字段 | 说明 |\r
| --- | --- |\r
| \`minHeight\` | 高度模式：低于此值（米）视为地面，默认 \`3.0\` |\r
| \`styleExpression\` | Style 模式表达式 |\r
| \`groundDepthThreshold\` | 后处理中建筑深度需比地形深度近多少，默认 \`0.05\` |\r
\r
### API\r
\r
- \`setTileset(tileset)\` — 绑定建筑 3D Tiles\r
- \`setGroundFilter(options)\` — 运行时更新地面过滤\r
- \`analyze()\` — 执行分析，返回 \`{ terrain, building }\`\r
- \`visualize()\` / \`clearVisualization()\` — 开启 / 关闭后处理描边\r
- \`clear()\` / \`remove()\` — 清除结果并销毁\r
`,kf="# SlopeAspect（坡度与坡向分析）\r\n\r\n在指定多边形区域内，对当前 `terrainProvider` 做规则网格采样，用中心差分估算每个格点的**坡度**（°，相对水平面）与**坡向**（°，自北顺时针，表示下坡方向；近似平坦处无定义）。\r\n\r\n## 依赖\r\n\r\n- 需要有效地形数据（如 `CesiumTerrainProvider`），否则高程近似为 0，结果仅供演示。\r\n- 分析区域通过 `setRegionByPositions` 传入至少 3 个顶点（与绘制多边形顺序一致）。\r\n\r\n## 构造\r\n\r\n```js\r\nconst sa = new cim3d.Analysis.SlopeAspect(viewer, {\r\n  gridSize: 28,           // 每边格点数，越大越细、实体越多\r\n  showVectors: true,      // 是否绘制坡向箭头（沿下坡方向）\r\n  vectorScale: 12,        // 坡向箭头长度基准（米量级）\r\n  arrowWidth: 4,          // 箭头折线宽度（像素，1~48）\r\n  arrowColorMode: 'fixed', // 'fixed' 自选色 | 'slope' 与同格坡度着色一致（图例色带）\r\n  arrowFixedColor: '#ffffff', // fixed 模式下箭头颜色（支持带透明度的 CSS 颜色串）\r\n  slopeMinColor: '#2c7bb6',\r\n  slopeMaxColor: '#d7191c',\r\n})\r\n```\r\n\r\n## 主要方法\r\n\r\n| 方法 | 说明 |\r\n|------|------|\r\n| `setRegionByPositions(Cartesian3[])` | 设置多边形区域，成功返回 `true` |\r\n| `setOptions(patch)` | 运行时调整参数 |\r\n| `async analyze(options?)` | 计算并可视化；返回 `{ success, message?, summary? }` |\r\n| `clearVisualization()` | 清除分析产生的实体，保留区域数据 |\r\n| `clearRegion()` | 清除区域与可视化 |\r\n| `remove()` | 等价于完全清理 |\r\n\r\n## `analyze` 返回的 `summary`\r\n\r\n- `cellCount`：参与绘制的格元数量  \r\n- `minSlopeDeg` / `maxSlopeDeg` / `meanSlopeDeg`  \r\n- `dominantAspectDeg`：坡向直方图主峰中心角（无有效坡向时为 `null`）  \r\n- `aspectHistogram`：长度 36，每 10° 一桶的计数  \r\n\r\n## 可视化与贴地\r\n\r\n- **坡度色块**：格网多边形使用 `heightReference: CLAMP_TO_GROUND`，仅由经纬度围成，由 Cesium 按当前地形瓦片贴地，避免用采样椭球高直接画三角网时与屏幕地形 LOD 不一致造成的“悬空”。\r\n- **坡向箭头**：折线使用 `clampToGround: true` + `ArcType.GEODESIC`，沿地表走向，箭头材质指向下坡方向；颜色由 `arrowColorMode` 决定（固定色或与该格坡度图例色一致）。\r\n\r\n## 注意\r\n\r\n- 算法为局部平面近似，大范围或高纬度区域应适当减小 `gridSize` 或仅作定性参考。  \r\n- 可视化使用大量贴地 `Entity`，格网过密可能影响帧率；无高程地形时贴地效果退化为椭球面。\r\n",wf=`# Sunlight 日照分析\r
\r
## 1. 功能简介\r
\r
\`Sunlight\` 提供两类能力：\r
\r
1. **日照效果**：按日期/时刻驱动 Cesium 太阳与阴影，支持时间轴播放。\r
2. **阴影率分析**：在指定多边形区域内生成采样网格，逐时刻统计各点是否处于阴影中，计算 **日照率** 并以彩色圆点可视化（参考 mars3d \`Shadows.startRate\`）。\r
\r
| 项目 | 说明 |\r
|------|------|\r
| SDK 入口 | \`cim3d.Analysis.Sunlight\` |\r
| 演示页面 | \`src/widgets/AnalysisSunlight/index.vue\` |\r
| 菜单路径 | Analysis → 城市规划专题 → 日照分析（\`/Sunlight\`） |\r
| 默认测试模型 | [qx-simiao tileset](https://data.mars3d.cn/3dtiles/qx-simiao/tileset.json) |\r
\r
---\r
\r
## 2. 技术原理\r
\r
### 2.1 总体架构\r
\r
\`\`\`mermaid\r
flowchart TB\r
  subgraph effect [日照效果]\r
    A1[设置 clock.currentTime] --> A2[Cesium 更新 SunLight]\r
    A2 --> A3[shadowMap 重算]\r
    A3 --> A4[场景实时阴影]\r
  end\r
  subgraph rate [阴影率分析]\r
    B1[多边形区域] --> B2[网格采样点]\r
    B2 --> B3[贴模型表面高度]\r
    B3 --> B4[ShadowRateDrawCommand]\r
    B4 --> B5[逐时刻累加阴影标记]\r
    B5 --> B6[计算 rate 并着色]\r
  end\r
  effect --> rate\r
\`\`\`\r
\r
日照效果负责「某一时刻阴影对不对」；阴影率分析负责「一整段时间内，各点有多少比例处于阳光下」。\r
\r
### 2.2 日照效果原理\r
\r
Cesium 内置 **太阳位置** 与 **阴影贴图（Shadow Map）** 管线：\r
\r
1. \`viewer.clock.currentTime\` 决定当前儒略日时刻。\r
2. Cesium 根据时刻计算太阳方向（\`SunLight\`），更新 \`scene.light\`。\r
3. 开启 \`viewer.shadows = true\` 后，场景中的地形、3D Tiles 等可投射/接收阴影。\r
4. \`globe.enableLighting = true\` 使地球与模型受光照影响，阴影边界更清晰。\r
\r
本模块在 \`_applyShadowSettings\` 中统一开启：\r
\r
- \`viewer.shadows\`\r
- \`viewer.terrainShadows = ShadowMode.ENABLED\`\r
- \`scene.globe.enableLighting\`\r
- \`scene.shadowMap.darkness\`（默认 0.6，控制阴影深浅）\r
- 绑定 tileset 后设置 \`tileset.shadows = ENABLED\`，使 BIM 参与投影\r
\r
**时间播放**：\`play(start, end, current?)\` 将 clock 设为 \`[start, end]\`，\`shouldAnimate = true\`，\`clockRange = CLAMPED\`，太阳随时间推移连续变化。\r
\r
### 2.3 阴影率分析原理\r
\r
阴影率分析参考 mars3d \`Shadows.startRate\` + \`ShadowRateDrawCommand\`，核心思路是 **用 GPU 阴影图批量判断采样点是否处于阴影中**。\r
\r
#### 步骤 1：区域网格采样\r
\r
\`getGridPointsByPoly(positions, stepMeters)\` 在多边形的 **外接矩形** 内，按固定步长（默认 2m）生成经纬网格，再用 **射线法** 做点-in-多边形过滤，得到候选采样点 \`{ lng, lat, alt }\`。\r
\r
#### 步骤 2：贴模型表面\r
\r
若通过 \`setTileset(tileset)\` 绑定了 3D Tiles，调用：\r
\r
\`\`\`js\r
scene.clampToHeightMostDetailed(cartographics, [tileset])\r
\`\`\`\r
\r
将采样点高度贴到倾斜模型表面（比仅用地形高度更准确，适合寺庙 BIM 屋顶分析）。\r
\r
#### 步骤 3：GPU 阴影判定（ShadowRateDrawCommand）\r
\r
对每个分析时刻：\r
\r
1. 将采样点世界坐标变换到 **眼坐标系（EC）**，写入浮点纹理 \`u_positionTexture\`。\r
2. 执行自定义 ComputeCommand，片元着色器读取 Cesium 内部阴影图 \`shadowMap_texture\`。\r
3. 通过 \`czm_cascadeWeights\` / \`czm_cascadeMatrix\` 做级联阴影采样。\r
4. 使用 \`step(shadowPosition.z, depth)\` 判断该点是否在阴影中，输出 \`1.0\`（阴影）或 \`0.0\`（日照）。\r
\r
关键着色器逻辑（简化）：\r
\r
\`\`\`glsl\r
vec4 positionEC = texture(u_positionTexture, uv);\r
vec4 shadowPosition = czm_cascadeMatrix(weights) * positionEC;\r
float depthInShadowMap = czm_unpackDepth(texture(shadowMap_texture, shadowPosition.xy));\r
float inShadow = step(shadowPosition.z, depthInShadowMap);\r
\`\`\`\r
\r
#### 步骤 4：时间步进与累加\r
\r
在 \`[startDate, endDate]\` 内按 **1 小时间隔**（\`sampleHourStep\`，默认 1）采样，例如 08:00~18:00 共 10 步：\r
\r
- 每步将 \`clock.currentTime\` 向前推进 \`Δt = sampleHourStep\`（默认 1 小时）。\r
- 触发 \`ShadowRateDrawCommand.start()\` 读取阴影结果。\r
- 对每个采样点累加 \`total += inShadow\`（0 或 1）。\r
\r
#### 步骤 5：结果计算与可视化\r
\r
分析结束后：\r
\r
\`\`\`\r
rate = 1 - total / sampleSteps    // 日照时间占比，0=全阴影，1=全日照\r
minutes = round(rate × 分析时段分钟数)\r
\`\`\`\r
\r
用 \`PointPrimitiveCollection\` 绘制彩色圆点，\`colorBySunlightRate(rate)\` 将 rate 映射到绿→黄→红→紫渐变色带（与演示页右下角图例一致）。\r
\r
### 2.4 与 mars3d 的对应关系\r
\r
| mars3d | 本模块 |\r
|--------|--------|\r
| \`Shadows\`（thing.shadows） | \`Sunlight\` |\r
| \`Shadows.startRate()\` | \`startShadowRateAnalysis()\` |\r
| \`ShadowRateDrawCommand\` | \`shadowRateDrawCommand.js\` |\r
| \`getGridPointsByPoly()\` | \`gridUtils.js\` |\r
| \`Shadows.start/pause/stop\` | \`play/pause/stop\` |\r
\r
---\r
\r
## 3. 测试模型与 content.url 兼容\r
\r
### 3.1 默认模型\r
\r
演示页自动加载：\r
\r
\`\`\`\r
https://data.mars3d.cn/3dtiles/qx-simiao/tileset.json\r
\`\`\`\r
\r
该 tileset 为 mars3d 提供的寺庙 BIM，子节点使用旧字段 **\`content.url\`** 而非 Cesium 1.104+ 要求的 **\`content.uri\`**。\r
\r
### 3.2 控制台警告说明\r
\r
若直接 \`Cesium3DTileset.fromUrl\`，控制台可能出现：\r
\r
\`\`\`\r
This tileset JSON uses the "content.url" property which has been deprecated.\r
Use "content.uri" instead.\r
\`\`\`\r
\r
**这不是单纯提示**：在 Cesium 1.115 中，若 JSON 仍只有 \`content.url\` 而无 \`content.uri\`，子瓦片 JSON/模型 **可能无法继续解析**，表现为：\r
\r
- 根 tileset 加载成功（仅有警告）\r
- 相机飞到了包围球位置\r
- **但看不到任何建筑模型**\r
\r
### 3.3 本项目的兼容方案\r
\r
\`tilesetLoader.js\` 提供 \`loadTilesetCompat(url)\`：\r
\r
1. 拦截 \`Cesium.Resource.prototype.fetchJson\`（仅安装一次）。\r
2. 对所有 3D Tiles JSON 递归执行 \`content.url → content.uri\` 迁移。\r
3. 保证懒加载的子 tileset 同样被 patch。\r
\r
演示页与 README 示例均应使用：\r
\r
演示页加载后会调用 \`applyTilesetPosition(tileset, { alt: 38.8 })\`，将模型中心抬升至 **38.8m** 海拔（与 mars3d 日照示例一致），避免模型陷入地形以下。\r
\r
\`\`\`js\r
import { loadTilesetCompat, applyTilesetPosition } from '@/sdk/Analysis/Sunlight/tilesetLoader.js'\r
\r
const tileset = await loadTilesetCompat(url)\r
applyTilesetPosition(tileset, { alt: 38.8 })\r
viewer.scene.primitives.add(tileset)\r
sunlight.setTileset(tileset)\r
await viewer.flyTo(tileset)\r
\`\`\`\r
\r
---\r
\r
## 4. 快速使用\r
\r
\`\`\`js\r
import * as Cesium from 'cesium'\r
import * as cim3d from '@/sdk/index.js'\r
import { loadTilesetCompat } from '@/sdk/Analysis/Sunlight/tilesetLoader.js'\r
\r
const sunlight = new cim3d.Analysis.Sunlight(viewer, {\r
  gridStep: 2,\r
  sampleInterval: 30\r
})\r
\r
// 1. 加载倾斜模型\r
const tileset = await loadTilesetCompat(\r
  'https://data.mars3d.cn/3dtiles/qx-simiao/tileset.json'\r
)\r
applyTilesetPosition(tileset, { alt: 38.8 })\r
viewer.scene.primitives.add(tileset)\r
sunlight.setTileset(tileset)\r
await viewer.flyTo(tileset)\r
\r
// 2. 日照效果\r
sunlight.setTime(new Date('2026-05-25T10:00:00'))\r
sunlight.play(\r
  new Date('2026-05-25T06:00:00'),\r
  new Date('2026-05-25T20:00:00')\r
)\r
\r
// 3. 阴影率分析\r
sunlight.setRegionByPositions(positions)\r
const result = await sunlight.startShadowRateAnalysis({\r
  startDate: new Date('2026-05-25T08:00:00'),\r
  endDate: new Date('2026-05-25T18:00:00'),\r
  onProgress: ({ percent }) => console.log(\`\${percent}%\`)\r
})\r
console.log(result.positions[0].minutes) // 日照分钟数\r
\`\`\`\r
\r
---\r
\r
## 5. 演示页操作说明\r
\r
1. 进入 **Analysis → 城市规划专题 → 日照分析**。\r
2. 等待「寺庙 BIM 模型加载完成」提示，相机自动飞到模型。\r
3. **日照效果**\r
   - 选择日期、拖动时间滑条，观察阴影变化。\r
   - 点击「播放 / 暂停」浏览 06:00~20:00 日照动画。\r
4. **阴影率分析**\r
   - 点击「绘制面」，在模型上框选区域（右键结束）；**绘制完成后会自动播放日照并采样**（与 mars3d 示例一致）。\r
   - 也可点击「开始分析」重新计算（默认 08:00~18:00，约 3 秒）。\r
   - 完成后显示彩色采样点；右下角图例为日照分钟数。\r
5. 点击「清除」移除区域与结果。\r
\r
---\r
\r
## 6. 构造参数\r
\r
| 参数 | 类型 | 默认 | 说明 |\r
|------|------|------|------|\r
| \`enabled\` | \`boolean\` | \`true\` | 是否开启阴影 |\r
| \`multiplier\` | \`number\` | \`1600\` | 播放倍速 |\r
| \`darkness\` | \`number\` | \`0.6\` | 阴影暗度 |\r
| \`gridStep\` | \`number\` | \`2\` | 网格步长（米） |\r
| \`sampleHourStep\` | \`number\` | \`1\` | 时间采样步长（小时） |\r
| \`sampleInterval\` | \`number\` | \`50\` | 每步间隔（毫秒） |\r
| \`sampleSteps\` | \`number\` | 自动 | 手动覆盖步数（默认按时段 ÷ sampleHourStep） |\r
\r
---\r
\r
## 7. 主要方法\r
\r
| 方法 | 说明 |\r
|------|------|\r
| \`setTileset(tileset)\` | 绑定 3D Tiles 并开启投射阴影 |\r
| \`setTime(date)\` | 设置当前太阳时刻 |\r
| \`play(start, end, current?)\` | 播放日照动画 |\r
| \`pause()\` / \`proceed()\` / \`stop()\` | 暂停 / 继续 / 停止动画 |\r
| \`setRegionByPositions(positions)\` | 设置分析区域 |\r
| \`startShadowRateAnalysis(params)\` | 开始阴影率分析（Promise） |\r
| \`stopShadowRateAnalysis()\` | 停止分析 |\r
| \`showShadowRateResults()\` | 显示彩色采样点 |\r
| \`clearShadowRateResults()\` | 清除结果 |\r
| \`remove()\` | 销毁并恢复场景时钟/阴影状态 |\r
\r
\`startShadowRateAnalysis\` 主要参数：\r
\r
| 参数 | 说明 |\r
|------|------|\r
| \`positions\` | 区域顶点（默认使用 \`setRegionByPositions\` 的结果） |\r
| \`step\` | 网格步长（米） |\r
| \`startDate\` / \`endDate\` | 分析起止时刻 |\r
| \`onProgress\` | \`{ current, total, percent }\` 进度回调 |\r
| \`onChange\` | 每步采样后的中间结果回调 |\r
\r
---\r
\r
## 8. 文件结构\r
\r
\`\`\`\r
src/sdk/Analysis/Sunlight/\r
├── index.js                  # Sunlight 主类\r
├── shadowRateDrawCommand.js  # GPU 阴影率采样\r
├── gridUtils.js              # 网格点生成与色带\r
├── tilesetLoader.js          # content.url 兼容加载\r
└── README.md\r
\`\`\`\r
\r
---\r
\r
## 9. 注意事项与故障排查\r
\r
### 9.1 必要环境\r
\r
- 开启 \`viewer.scene.globe.depthTestAgainstTerrain = true\`（演示页已设置）。\r
- 阴影率分析依赖 Cesium 内部 \`shadowMap\` 纹理，**必须有可投射阴影的 3D 模型**。\r
- 页面卸载时务必调用 \`sunlight.remove()\`，避免 clock/阴影状态污染其他模块。\r
\r
### 9.2 模型不显示\r
\r
| 现象 | 可能原因 | 处理 |\r
|------|----------|------|\r
| 只有 \`content.url\` 警告，无模型 | Cesium 1.104+ 不识别旧字段 | 使用 \`loadTilesetCompat\` |\r
| 飞到了位置但全空 | 网络/CORS 导致子瓦片 404 | 检查 Network 面板中 \`.json\`/\`.b3dm\` 请求 |\r
| 模型极暗 | 阴影+光照开启，时刻偏早晚 | 拖动时间到 10:00~14:00 |\r
| 一直「正在加载」 | 远程 tileset 超时 | 检查能否访问 \`data.mars3d.cn\` |\r
\r
### 9.3 分析结果异常\r
\r
- **结果点在模型地下/飘在空中**：见 [9.5 采样点高度](#95-采样点高度与地下显示)。\r
- **全绿（阴影率 0%）**：采样点不在模型表面、或 shadowMap 未更新；确认 tileset 已加载且 \`setTileset\` 已调用。\r
- **全紫（阴影率 100%）**：采样高度错误或 GPU 阴影图未命中，检查绘制区域是否在模型上。\r
- **采样点过少**：增大区域或减小 \`gridStep\`。\r
- **分析耗时**：约 \`步数 × sampleInterval\` ms，默认 08:00~18:00 为 10 步 × 50ms ≈ 0.5 秒（不含贴地与渲染）。\r
\r
### 9.5 采样点高度与地下显示\r
\r
常见原因：\r
\r
1. **绘制拾取高度不准**：若 \`pickPosition\` 落到椭球/地形（~0 m），而模型经 \`applyTilesetPosition\` 抬升到 ~38 m，网格初始高度会偏低。\r
2. **\`clampToHeightMostDetailed\` 失败或超时**：大批量采样时部分瓦片未加载，贴地回落到错误高度。\r
3. **曾使用 \`disableDepthTestDistance: Infinity\`**：点始终画在最上层，俯视时像“贴在屏幕上”，侧视时像埋在模型下方。\r
\r
当前实现：以**绘制区域海拔范围**校验贴地结果，异常时回退到区域平均高度；结果点开启深度测试，贴在模型表面。\r
\r
### 9.6 如何验证阴影率可信度\r
\r
| 方法 | 做法 | 预期 |\r
|------|------|------|\r
| **时刻对照** | 分析完成后，拖动时间滑条到 08:00 / 12:00 / 17:00 | 12:00 阴影少、阴影率低；早晚阴影长、阴影率高 |\r
| **单点目视** | 选 1 个绿色（低阴影率）和 1 个红色（高阴影率）位置，在该时刻观察是否在阴影中 | 颜色与实时阴影一致 |\r
| **空间规律** | 对比开阔处 vs 建筑北侧/檐下 | 檐下、北侧阴影率应更高 |\r
| **参数稳定性** | 同一区域分别用 2m / 3m 网格重算 | 空间分布趋势一致，仅细节略有差异 |\r
| **控制台抽检** | 分析完成后在控制台查看 \`result.positions[0].alt\` 与 \`shadowPercent\` | 海拔接近绘制区域（如 35~45 m），百分比 0~100 有分布 |\r
| **与 mars3d 对照** | 同一 tileset、同一时段、相近区域在 mars3d 示例跑一遍 | 色带分布趋势相近（非逐点完全一致） |\r
\r
**可信度说明**：本模块在分析时段内按 **1 小时间隔**（可配置 \`sampleHourStep\`）采样，得到的是**相对阴影覆盖比例**，适合方案比选与定性分析；受模型精度、时间步长影响，**不宜直接作为法定日照时长依据**。工程验收建议结合规范算法或现场实测。\r
\r
### 9.4 性能建议\r
\r
- 网格步长 2m 适合寺庙尺度；过大区域建议步长 3~5m。\r
- 时间步长 1 小时时，08:00~18:00 仅 10 次采样，分析较快；需要更细粒度可减小 \`sampleHourStep\`（如 0.5）。\r
\r
---\r
\r
## 10. 色带图例\r
\r
演示页右下角图例刻度（**阴影率 %**）与 \`colorByShadowRate\` 对应：\r
\r
| 阴影率 | 颜色含义 |\r
|--------|----------|\r
| 0~10% | 绿色 — 几乎无阴影（日照充足） |\r
| 25~40% | 黄绿 — 少量阴影 |\r
| 55~70% | 橙红 — 中等阴影 |\r
| 85~100% | 紫 — 阴影严重 |\r
\r
\`shadowPercent = (阴影采样步数 / 总采样步数) × 100\`。\r
`,Tf="# Screenshot Control - 场景截图 / 出图\r\n\r\n## 功能概述\r\n\r\n从当前 Cesium 场景画布导出 PNG/JPEG 图片，支持：\r\n\r\n- 地图悬浮截图按钮（可选）\r\n- 编程式 `capture()` / `download()` / `captureAndDownload()`\r\n- 文件名自动带时间戳\r\n- 样式随全局主题联动\r\n\r\n> 默认仅导出 **Cesium 画布**；开启 `includeMapControls` 后会叠加地图上的罗盘、缩放、比例尺、坐标条（不含左侧配置面板与截图按钮自身）。\r\n\r\n## 基础用法\r\n\r\n```javascript\r\nimport * as cim3d from '@/sdk/index.js';\r\n\r\nconst screenshot = new cim3d.Control.Screenshot(viewer);\r\n\r\n// 显示右下角截图按钮，点击即下载\r\nscreenshot.show({\r\n  position: 'bottom-right',\r\n  downloadOnCapture: true,\r\n});\r\n\r\n// 仅 API 出图（不显示按钮）\r\nconst shot = new cim3d.Control.Screenshot(viewer);\r\nconst result = await shot.capture({ format: 'png' });\r\nshot.download(result.dataUrl, result.fileName);\r\n```\r\n\r\n## 配置项（show / setOptions）\r\n\r\n| 参数 | 类型 | 默认 | 说明 |\r\n|------|------|------|------|\r\n| position | string | `'bottom-right'` | `top-left` / `top-right` / `bottom-left` / `bottom-right` |\r\n| format | string | `'png'` | `png` / `jpeg` / `webp` |\r\n| quality | number | `0.92` | JPEG/WebP 质量 |\r\n| fileNamePrefix | string | `'cesium-capture'` | 下载文件名前缀 |\r\n| downloadOnCapture | boolean | `true` | 按钮点击后是否自动下载 |\r\n| includeMapControls | boolean | `false` | 是否合成地图 HTML 控件 |\r\n| excludeScreenshotButton | boolean | `true` | 含控件时是否排除截图按钮自身 |\r\n| renderDelay | number | `80` | 截图前等待渲染(ms) |\r\n| showButton | boolean | `true` | 是否显示悬浮按钮 |\r\n| buttonTitle | string | `'截图出图'` | 按钮提示文字 |\r\n| onCapture | function | - | 截图成功回调 |\r\n| onError | function | - | 截图失败回调 |\r\n\r\n## 方法\r\n\r\n| 方法 | 说明 |\r\n|------|------|\r\n| `show(options?)` | 显示控件 |\r\n| `hide()` / `setVisible(bool)` | 隐藏 |\r\n| `setPosition(position)` | 调整按钮位置 |\r\n| `capture(options?)` | 返回 `{ dataUrl, width, height, format, fileName, blob? }` |\r\n| `download(dataUrl?, filename?)` | 下载图片 |\r\n| `captureAndDownload(options?)` | 截图并下载 |\r\n| `copyToClipboard()` | 复制最近一次截图（需 Clipboard API） |\r\n| `getLastCapture()` | 获取最近一次结果 |\r\n| `destroy()` | 销毁 |\r\n\r\n## 黑屏 / 空白图\r\n\r\n若 `toDataURL` 得到空白图，请在创建 Viewer 时开启：\r\n\r\n```javascript\r\nviewerOptions: {\r\n  contextOptions: {\r\n    webgl: {\r\n      preserveDrawingBuffer: true,\r\n    },\r\n  },\r\n}\r\n```\r\n\r\n## 工具函数\r\n\r\n`captureViewer`（推荐）、`captureScene`、`captureSceneWithMapControls`、`downloadDataUrl`、`buildCaptureFilename` 也可单独导入使用。\r\n\r\n含控件合成依赖 `html2canvas`，部分 CSS 效果（如 backdrop-filter）可能与屏幕显示略有差异。\r\n",vf="# Fire 火焰粒子\r\n\r\n基于 Cesium `ParticleSystem` + `Entity` 锚点（`preUpdate` 同步矩阵），贴图为程序生成的 PNG data URL。\r\n\r\n## 用法\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js'\r\n\r\nconst fire = new cim3d.Effect.Fire(viewer, {\r\n  enabled: true,\r\n  longitude: 116.39,\r\n  latitude: 39.9,\r\n  height: 80,\r\n  emissionRate: 45,\r\n})\r\n\r\nfire.setPosition(116.4, 39.91, 50)\r\nfire.flyTo()\r\nfire.destroy()\r\n```\r\n\r\n## 参数\r\n\r\n| 参数 | 默认 | 说明 |\r\n|------|------|------|\r\n| `longitude` / `latitude` / `height` | 116.39 / 39.9 / 80 | 火焰锚点（度、米） |\r\n| `emissionRate` | 60 | 每秒发射粒子数 |\r\n| `particleSize` | 35 | 粒子贴图尺寸（像素，`sizeInMeters: false`） |\r\n| `minimumLife` / `maximumLife` | 1.0 / 2.2 | 粒子寿命（秒） |\r\n| `minimumSpeed` / `maximumSpeed` | 2.5 / 6.5 | 初速度（米/秒） |\r\n| `startScale` / `endScale` | 0.8 / 2.8 | 缩放 |\r\n| `emitterRadius` | 2.5 | 预留（圆形范围参考） |\r\n| `coneAngle` | 28 | 锥形发射器张角（度） |\r\n\r\n默认常量：`cim3d.Effect.FIRE_DEFAULTS`\r\n\r\n## 方法\r\n\r\n- `show()` / `hide()` / `setPosition(lng, lat, height?)` / `flyTo()` / `destroy()`\r\n",Sf="# Fog 雾效\r\n\r\n封装 Cesium `scene.fog`，`destroy()` 时还原进入前的雾参数。\r\n\r\n## 用法\r\n\r\n```js\r\nconst fog = new cim3d.Effect.Fog(viewer, {\r\n  enabled: true,\r\n  density: 0.0005,\r\n  minimumBrightness: 0.03,\r\n})\r\n\r\nfog.setOptions({ density: 0.0008 })\r\nfog.destroy()\r\n```\r\n\r\n## 参数\r\n\r\n| 参数 | 类型 | 默认 | 说明 |\r\n|------|------|------|------|\r\n| `enabled` | `boolean` | `false` | 是否立即开启 |\r\n| `density` | `number` | `0.00035` | 雾密度 |\r\n| `minimumBrightness` | `number` | `0.03` | 最小亮度 |\r\n\r\n## 方法\r\n\r\n- `show()` / `hide()` / `setOptions()` / `destroy()`\r\n",_f=`# Rain 雨效\r
\r
仅三个文件：\r
\r
| 文件 | 说明 |\r
|------|------|\r
| \`LightRain.js\` | **小雨**（网格雨丝 + 默认参数） |\r
| \`HeavyRain.js\` | **大雨**（CSDN FS_Rain 斜向雨 + 默认参数） |\r
| \`index.js\` | 统一导出 |\r
\r
## 用法\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js'\r
\r
// 小雨\r
new cim3d.Effect.LightRain(viewer, { enabled: true })\r
\r
// 大雨\r
new cim3d.Effect.HeavyRain(viewer, { enabled: true })\r
\r
// 预设常量\r
cim3d.Effect.RAIN_PRESETS.light\r
cim3d.Effect.RAIN_PRESETS.heavy\r
\`\`\`\r
\r
\`Rain\` / \`RainEffect\` 为兼容别名，等同于 \`HeavyRain\`。\r
`,Bf="# Snow 雪效\r\n\r\n基于 `PostProcessStage` 的全屏雪效（Catzpaw 多层噪声雪花 + 横向飘动，更接近真实飘雪）。\r\n\r\n## 用法\r\n\r\n```js\r\nconst snow = new cim3d.Effect.Snow(viewer, {\r\n  enabled: true,\r\n  speed: 1,\r\n  density: 1.5,\r\n  intensity: 1,\r\n})\r\n```\r\n\r\n## 参数\r\n\r\n| 参数 | 类型 | 默认 | 说明 |\r\n|------|------|------|------|\r\n| `enabled` | `boolean` | `false` | 构造后是否立即开启 |\r\n| `speed` | `number` | `1` | 飘落速度倍率 |\r\n| `density` | `number` | `1` | 雪量密度（多层叠加强度），建议 0.2~3 |\r\n| `intensity` | `number` | `1` | 与场景混合强度，建议 0~2 |\r\n\r\n## 方法\r\n\r\n- `show()` / `hide()` / `destroy()`\r\n",Lf=`# RainfallLayer — 降水等值面图层\r
\r
渲染 [中央气象台台风网](https://typhoon.nmc.cn/) diamond14 降水预报 JSON（等值面 \`contours\`）。\r
\r
## 数据来源\r
\r
- 24 小时：\`/typhoon-nmc/weatherservice/diamond14/rainfall/24.json\`\r
- 48 小时：\`/typhoon-nmc/weatherservice/diamond14/rainfall/48.json\`\r
- 72 小时：\`/typhoon-nmc/weatherservice/diamond14/rainfall/72.json\`\r
- 开发环境通过 Vite 代理 \`/typhoon-nmc\` → \`http://typhoon.nmc.cn\`\r
\r
## 数据格式\r
\r
\`\`\`json\r
{\r
  "forecastTime": "202605261200",\r
  "releaseTime": "202605261700",\r
  "contours": [\r
    {\r
      "color": "164,245,140,255",\r
      "latAndLong": [[47.373, 118.408], ...]\r
    }\r
  ]\r
}\r
\`\`\`\r
\r
- \`color\`：RGBA 字符串，对应图例分级\r
- \`latAndLong\`：\`[lat, lng]\` 顶点序列，闭合多边形\r
\r
## 用法\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js'\r
import { fetchRainfallForecast } from '@/api/rainfall/index.js'\r
\r
const data = await fetchRainfallForecast(24)\r
const layer = cim3d.Layer.FeatureLayer.createRainfallLayer(viewer, {\r
  alpha: 0.62,\r
  clampToGround: true,\r
  data,\r
})\r
await layer.flyToExtent()\r
\r
// 离开页面 / KeepAlive 失活时销毁并移除全部地图要素\r
cim3d.Layer.FeatureLayer.destroyRainfallLayer(layer)\r
// 或 layer.destroy()\r
\`\`\`\r
\r
统一图层（NMC + GFS）使用 \`destroyUnifiedRainfallLayer(layer)\`。\r
\r
## 参数\r
\r
| 参数 | 说明 |\r
|------|------|\r
| \`alpha\` | 面透明度，默认 0.62 |\r
| \`clampToGround\` | 是否贴地，默认 true |\r
| \`implementation\` | \`entity\` / \`primitive\`，默认 entity |\r
\r
## 销毁\r
\r
- \`destroy()\` — 移除全部降水要素（\`remove()\` 为别名）\r
- \`destroyRainfallLayer(layer)\` — NMC 等值面图层\r
- \`destroyRainfallGfsLayer(layer)\` — GFS 影像图层\r
- \`destroyUnifiedRainfallLayer(layer)\` — 统一图层（推荐 demo 页使用）\r
`,Ff=`# TemperatureLayer — GFS 2m 气温栅格图层\r
\r
将 GFS 2m 气温标量栅格（grib2json 输出）渲染为彩色贴图，叠加在 Cesium 影像层上。\r
\r
## 数据来源\r
\r
- 静态 JSON：\`public/static/json/temperature.json\`（由 \`npm run temp:download\` 生成）\r
- NOAA NOMADS GFS 1° 过滤器：\`TMP\` @ \`2 m above ground\`\r
\r
## 数据格式\r
\r
grib2json 标量层（单条记录）：\r
\r
\`\`\`json\r
[\r
  {\r
    "header": {\r
      "nx": 360,\r
      "ny": 181,\r
      "lo1": 0,\r
      "lo2": 359,\r
      "la1": 90,\r
      "la2": -90,\r
      "min": 220,\r
      "max": 320,\r
      "GRIB_ELEMENT": "TMP"\r
    },\r
    "data": [273.15, ...]\r
  }\r
]\r
\`\`\`\r
\r
- 数值单位为 **开尔文（K）**，图层内部按摄氏度着色\r
\r
## 用法\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js'\r
import { fetchTemperatureLayerFromGfs } from '@/api/temperature/gfs.js'\r
\r
const records = await fetchTemperatureLayerFromGfs()\r
const data = cim3d.Layer.FeatureLayer.parseTemperatureFieldJson(records)\r
const layer = cim3d.Layer.FeatureLayer.createTemperatureLayer(viewer, {\r
  alpha: 0.72,\r
  show: true,\r
  data,\r
})\r
await layer.flyToExtent()\r
\r
// 离开页面 / KeepAlive 失活时销毁并移除全部地图要素\r
cim3d.Layer.FeatureLayer.destroyTemperatureLayer(layer)\r
// 或 layer.destroy()\r
\`\`\`\r
\r
## 参数\r
\r
| 参数 | 说明 |\r
|------|------|\r
| \`alpha\` | 图层透明度，默认 0.72 |\r
| \`show\` | 是否显示，默认 true |\r
| \`displayUnit\` | 着色单位，\`C\`（默认）或 \`K\` |\r
\r
## 方法\r
\r
| 方法 | 说明 |\r
|------|------|\r
| \`setData(data)\` | 设置/刷新栅格数据 |\r
| \`setAlpha(alpha)\` | 调整透明度 |\r
| \`setVisible(visible)\` | 显示/隐藏 |\r
| \`flyToExtent()\` | 相机定位到数据范围 |\r
| \`destroy()\` | 移除图层（\`remove()\` 为别名） |\r
| \`destroyTemperatureLayer(layer)\` | 销毁实例并返回 \`null\` |\r
\r
## 更新 GFS 数据\r
\r
\`\`\`bash\r
npm run temp:download\r
\`\`\`\r
\r
需安装 [grib2json](https://github.com/cambecc/grib2json) 或设置 \`GRIB2JSON_JAR\` 环境变量。\r
`,Mf="# Typhoon 台风路径要素图层\r\n\r\n基于 `Geometry` 子模块组合的台风路径展示图层。**路径与警戒线数据由调用方传入**；强度配色使用 `Map.Theme.Palette` 通用图例调色板。\r\n\r\n## 用法\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js'\r\n\r\nconst Palette = cim3d.Map.Theme.Palette\r\n\r\nconst layer = cim3d.Layer.FeatureLayer.createTyphoonLayer(window.viewer, {\r\n  implementation: cim3d.Geometry.GeometryImplementation.ENTITY,\r\n  paletteGroup: Palette.TYPHOON_PALETTE_GROUP,\r\n  paletteId: 'standard',\r\n  track: myTrack,\r\n  warningLines: myWarningLines,\r\n})\r\n\r\nlayer.setPaletteId('ocean')\r\n\r\n// 离开页面 / KeepAlive 失活时销毁并移除全部地图要素\r\ncim3d.Layer.FeatureLayer.destroyTyphoonLayer(layer)\r\n// 或 layer.destroy()\r\n```\r\n\r\n## 配色（Palette）\r\n\r\n- 默认分组：`typhoon`（`Palette.TYPHOON_PALETTE_GROUP`）\r\n- 选项列表：`Palette.listPaletteOptions('typhoon')`\r\n- 图例：`Palette.getLegendItems(Palette.getPalette('typhoon', paletteId))`\r\n- 自定义：`layer.setPalette(Palette.createPalette({ ... }))`\r\n\r\n## 参数\r\n\r\n| 参数 | 类型 | 默认 | 说明 |\r\n|------|------|------|------|\r\n| `paletteGroup` | `string` | `'typhoon'` | Palette 分组 id |\r\n| `paletteId` | `string` | `'standard'` | 分组内 palette id |\r\n| `palette` | `ColorPalette` | — | 自定义 palette，优先于 group+id |\r\n| `track` | `TyphoonTrackPoint[]` | `[]` | 路径点 |\r\n| `warningLines` | `WarningLineDef[]` | `[]` | 警戒线 |\r\n\r\n## 方法\r\n\r\n- `setPaletteId(id)` / `setPalette(palette)` — 切换配色\r\n- `setImplementation` / `setShow` / `setTrack` / `flyTo`\r\n- `destroy()` — 停止播放并移除全部要素（`remove()` 为别名）\r\n- `destroyTyphoonLayer(layer)` — 销毁实例并返回 `null`，便于赋值清理引用\r\n\r\nDemo 与 mock 警戒线见 `LayerFeatureTyphoon`。\r\n",Af=`# WindFieldThirdPartyLayer — 风场图层（内联 cesium-wind）\r
\r
基于 [cesium-wind@1.0.5](https://github.com/QJvic/cesium-wind)（MIT，含 wind-core），源码已内联至 \`vendor/cesiumWindCore.js\`，**无需安装 npm 包**。\r
\r
直接支持 \`wind.json\` 的 \`[{ header, data }, { header, data }]\` 格式。\r
\r
## 用法\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js'\r
\r
const { loadWindLayerJson, createWindFieldThirdPartyLayer } = cim3d.Layer.FeatureLayer\r
\r
const data = await loadWindLayerJson() // /static/json/wind.json\r
const layer = createWindFieldThirdPartyLayer(viewer, {\r
  data,\r
  paths: 3000,\r
  velocityScale: 1 / 30,\r
})\r
\r
// 离开页面 / KeepAlive 失活时销毁并移除全部地图要素\r
cim3d.Layer.FeatureLayer.destroyWindFieldThirdPartyLayer(layer)\r
// 或 layer.destroy()\r
\`\`\`\r
\r
## 主要参数（windOptions）\r
\r
| 参数 | 说明 |\r
|------|------|\r
| \`paths\` | 粒子数量 |\r
| \`velocityScale\` | 速度缩放（越小越快） |\r
| \`maxAge\` | 粒子轨迹寿命（帧） |\r
| \`lineWidth\` | 流线宽度 |\r
| \`colorScale\` | 风速色带 |\r
\r
## 方法\r
\r
- \`setData(records)\` — 传入 wind-layer 数组或 SDK 栅格对象\r
- \`show()\` / \`hide()\` / \`setVisible(bool)\`\r
- \`setOptions(patch)\` — 更新 windOptions\r
- \`flyToExtent()\` — 飞到数据范围（全球数据默认跳过）\r
- \`destroy()\` — 停止粒子并移除 canvas 图层（\`remove()\` 为别名）\r
- \`destroyWindFieldThirdPartyLayer(layer)\` — 销毁实例并返回 \`null\`\r
\r
## 许可\r
\r
\`vendor/LICENSE.cesium-wind\` — cesium-wind MIT License\r
`,Ef="# ClusterPoint\n\n聚合点图层。基于 Cesium `CustomDataSource` + `EntityCluster`，将邻近点合并显示为带数量的聚合图标，适合大量散点场景。\n\n## 使用方法\n\n```javascript\nimport * as cim3d from '@/sdk/index.js';\n\nconst points = cim3d.Layer.ClusterPoint.createRandomPoints(300);\n\nconst clusterLayer = new cim3d.Layer.ClusterPoint(viewer, {\n  name: '演示聚合点',\n  data: points,\n  enableClustering: true,\n  clusterOptions: {\n    pixelRange: 60,\n    minimumClusterSize: 3,\n    clusterPointColor: '#0066CC',\n  },\n  pointColor: '#3388ff',\n  pointPixelSize: 10,\n  clampToGround: true,\n});\n\nawait clusterLayer.addLayer();\nclusterLayer.locateLayer();\n\n// 动态开关聚合\nclusterLayer.setClusteringEnabled(false);\n\n// 调整聚合参数\nclusterLayer.setClusterOptions({ pixelRange: 80, minimumClusterSize: 5 });\n\n// 替换数据\nawait clusterLayer.setData(cim3d.Layer.ClusterPoint.createRandomPoints(500));\n\n// 清理\nclusterLayer.removeLayer();\n```\n\n也可直接传入 GeoJSON 对象或 URL：\n\n```javascript\nconst layer = new cim3d.Layer.ClusterPoint(viewer, {\n  data: '/path/to/points.geojson', // 或 FeatureCollection 对象\n});\nawait layer.addLayer();\n```\n\n## API\n\n### 构造函数\n\n`ClusterPoint(viewer, options)`\n\n| 参数 | 类型 | 说明 |\n|------|------|------|\n| `viewer` | `Cesium.Viewer` | 必填 |\n| `options.data` | `Array\\|Object\\|string` | 点数组 / GeoJSON / URL |\n| `options.enableClustering` | `boolean` | 默认 `true` |\n| `options.clusterOptions.pixelRange` | `number` | 聚合像素范围，默认 `60` |\n| `options.clusterOptions.minimumClusterSize` | `number` | 最小聚合点数，默认 `3` |\n| `options.clusterOptions.clusterPointColor` | `string` | 少量聚合点颜色 |\n| `options.pointColor` | `string` | 单点颜色，默认 `#3388ff` |\n| `options.pointPixelSize` | `number` | 单点像素大小，默认 `10` |\n| `options.clampToGround` | `boolean` | 是否贴地，默认 `true` |\n\n点数组元素字段：`lon` / `lat`（也兼容 `longitude`/`latitude`/`lng`/`x`/`y`），可选 `height`、`id`、`name`、`properties`。\n\n### 方法\n\n| 方法 | 说明 |\n|------|------|\n| `addLayer()` | 添加图层（异步） |\n| `removeLayer()` | 移除并释放资源 |\n| `setData(data)` | 替换全部点数据 |\n| `addPoints(points)` | 追加点 |\n| `setClusteringEnabled(enabled)` | 开关聚合 |\n| `setClusterOptions(options)` | 更新聚合参数 |\n| `getPointCount()` | 当前点数 |\n| `locateLayer()` | 缩放到全部点 |\n| `setShow(show)` | 显隐（继承） |\n\n### 静态方法\n\n`ClusterPoint.createRandomPoints(count, bbox)` — 生成演示随机点，默认范围在香港附近。\n\n## 注意事项\n\n- 聚合仅对点实体有效；缩放地图时聚合结果会随视野变化。\n- 卸载页面或切换功能时务必调用 `removeLayer()`，避免 dataSource / 事件监听残留。\n- 大量点（数千以上）时建议适当增大 `pixelRange`，减轻渲染压力。\n",Pf="# CrsWmtsLayer（多坐标系 WMTS 经纬度格网）\r\n\r\n用于加载 **EPSG:4490 / EPSG:4326 等地理经纬度 CRS** 下、**瓦片矩阵由 `ScaleDenominator` 定义** 的 GeoServer / OGC WMTS 服务。瓦片划分与 OpenLayers `createFromCapabilitiesMatrixSet` 一致：\r\n\r\n\\[\r\n\\text{resolution (°/px)} = \\frac{\\text{scaleDenominator} \\times 0.28 \\times 10^{-3}}{\\text{metersPerUnit}}\r\n\\]\r\n\r\n其中 `metersPerUnit` 默认取椭球子午圈近似 \\(\\pi a / 180\\)（与 `defaultMetersPerDegree` 一致）。部分服务端经/纬分辨率略有差异，可通过 `resolutionYFactor` 微调纬度方向。\r\n\r\n## 与 `WMTSLayer` 的关系\r\n\r\n- `WMTSLayer`：适合标准 `GeographicTilingScheme` / `WebMercatorTilingScheme` 的全球 2^n 金字塔。\r\n- `CrsWmtsLayer`：需显式传入从 **GetCapabilities** 解析出的 `levels`（每级 `scaleDenominator`、`matrixWidth/Height`、标识符等），并可选 **REST 模板 URL**（如 GeoServer `.../rest/{layer}/{Style}/...`）。\r\n\r\n## 用法\r\n\r\n1. 浏览器请求 `GetCapabilities`（需 CORS 允许）。\r\n2. `parseWmtsLayerMatrixSet(xml, { layerId, tileMatrixSetId })` 得到 `levels`、`tileMatrixLabels`。\r\n3. `new cim3d.Layer.CrsWmtsLayer(viewer, { url, tileMatrixSetID, levels, metersPerUnit?, resolutionYFactor?, ... })`。\r\n\r\n## 主要选项\r\n\r\n| 选项 | 说明 |\r\n|------|------|\r\n| `url` | KVP 基地址，或含 `{Style}` `{TileMatrixSet}` `{TileMatrix}` `{TileRow}` `{TileCol}` 的 REST 模板 |\r\n| `tileMatrixSetID` | 矩阵集 ID |\r\n| `levels` | 自粗到细的矩阵元数据数组（解析器已排序） |\r\n| `ellipsoid` | 4490 建议 `CGCS2000_ELLIPSOID` |\r\n| `metersPerUnit` | 覆盖默认米/度，用于与具体服务格网标定 |\r\n| `resolutionYFactor` | 纬度分辨率倍率（默认 1） |\r\n\r\n## EPSG:4526（GeoServer 投影 WMTS）\r\n\r\nEPSG:4526 = **CGCS2000 / 3-degree Gauss-Kruger CM 111E**（中央经线 111°，东向假东 500000 m）。GeoServer GWC 常见配置：\r\n\r\n| 项 | 说明 |\r\n|----|------|\r\n| Capabilities | `http://host/geoserver/gwc/service/wmts?SERVICE=WMTS&REQUEST=GetCapabilities` |\r\n| GetTile (KVP) | `…&LAYER=ws:layer&TILEMATRIXSET=EPSG:4526&TILEMATRIX={id}&TILEROW={row}&TILECOL={col}` |\r\n| crsKind | `metric`，`metersPerUnit=1` |\r\n| 分辨率 | `resolution = scaleDenominator × 0.28×10⁻³`（米/像素） |\r\n\r\n演示页：`src/widgets/LayerGeoServerWmts4526`（菜单「GeoServer WMTS 4526」）。\r\n\r\n### 快捷 API\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js'\r\nimport {\r\n  prepareGeoServerWmts,\r\n  summarizeWmtsLevels,\r\n  computeMetricTileFootprint,\r\n} from '@/sdk/Layer/TileLayer/CrsWmtsLayer/index.js'\r\n\r\nconst { meta, layerOptions } = await prepareGeoServerWmts({\r\n  capabilityUrl: 'http://localhost:8080/geoserver/gwc/service/wmts',\r\n  tileUrl: 'http://localhost:8080/geoserver/gwc/service/wmts',\r\n  layerId: 'workspace:layer',\r\n  tileMatrixSetId: 'EPSG:4526',\r\n})\r\nconst layer = new cim3d.Layer.CrsWmtsLayer(viewer, layerOptions)\r\nawait layer.addLayer()\r\n```\r\n\r\n## 导出\r\n\r\n- `CrsWmtsLayer`\r\n- `parseWmtsLayerMatrixSet`\r\n- `prepareGeoServerWmts` / `buildCrsWmtsLayerOptions` / `fetchWmtsCapabilitiesXml`\r\n- `summarizeWmtsLevels` / `computeMetricTileFootprint` / `footprintToWgs84Degrees`\r\n- `ensureProjCrs`（内置 EPSG:4526 / 4547 / 4549 proj4）\r\n- `OlStyleGeographicWmtsTilingScheme` / `OlStyleProjectedWmtsTilingScheme`\r\n- `CGCS2000_ELLIPSOID`、`defaultMetersPerDegree`\r\n",Df=`# Map.DualScreen\r
\r
左右双 \`Cesium.Viewer\` 管理：创建、相机双向同步、屏幕拾取、销毁。\r
\r
## 用法\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js';\r
\r
// 双 Viewer 自建\r
const dual = new cim3d.Map.DualScreen({ imageryUrl: '...' });\r
dual.mount(leftEl, rightEl);\r
\r
// 左屏复用全局 viewer，右屏新建\r
const dual2 = new cim3d.Map.DualScreen();\r
dual2.mountWithPrimary(window.viewer, rightEl);\r
\r
dual.bindClick('left', ({ lon, lat }) => { /* ... */ });\r
dual.bindClick('right', ({ lon, lat }) => { /* ... */ });\r
\r
// flyTo 期间可暂停同步\r
dual.setSyncPaused(true);\r
dual.setSyncPaused(false);\r
\r
dual.setCameraSyncEnabled(false);\r
dual.flyBothTo(114.05, 22.54, { height: 12000 });\r
dual.destroy();\r
\`\`\`\r
\r
演示页：\`src/widgets/MapDualScreen/index.vue\`（菜单「双屏地图」）。\r
\r
## 静态工具\r
\r
- \`DualScreen.pickLonLat(viewer, screenPosition)\`\r
- \`DualScreen.pickLonLatWithDrill(viewer, screenPosition, resolveEntityLonLat)\`\r
- \`DualScreen.flyToBounds(viewer, bounds, options)\`\r
\r
业务层（规划地块渲染、属性对比）放在 widgets，不放在本模块。\r
`,If="# Palette 图例调色板\r\n\r\n与 `Theme` 类（全局 UI / Cesium 场景主题）分离的**静态图例配色**模块，供台风路径、等值线、等值面等需要图例的可视化复用。\r\n\r\n## 核心概念\r\n\r\n| 概念 | 说明 |\r\n|------|------|\r\n| `ColorPalette` | 一套配色：`{ id, label, mode, stops[] }` |\r\n| `PaletteStop` | 一项：`{ key?, label, color, min?, max? }` |\r\n| `mode: 'discrete'` | 按 `key` 精确匹配（台风等级、分类） |\r\n| `mode: 'interval'` | 按数值区间 `[min, max)` 匹配（等值面） |\r\n| `PALETTE_GROUPS` | 分组注册表，如 `typhoon`、`rainfall` |\r\n\r\n## 降水图例（中央气象台 diamond14）\r\n\r\n```js\r\nimport Palette from '@/sdk/Map/Theme/Palette/index.js'\r\n\r\nconst palette = Palette.getRainfallPaletteByHours(24)\r\nconst legend = Palette.getRainfallLegendByHours(24)\r\nconst gradient = Palette.getRainfallLegendGradient(48)\r\nconst label = Palette.getRainfallLegendLabel('164,245,140,255', 24)\r\n```\r\n\r\n离散 key 为接口 `color` 字段（`r,g,b,a`），与 `resolveColorFromPalette(palette, colorKey)` 一致。\r\n\r\n## 用法\r\n\r\n```js\r\nimport Palette from '@/sdk/Map/Theme/Palette/index.js'\r\n\r\nconst options = Palette.listPaletteOptions('typhoon')\r\nconst palette = Palette.getPalette('typhoon', 'ocean')\r\nconst legend = Palette.getLegendItems(palette)\r\nconst color = Palette.resolveColorFromPalette(palette, 'TY')\r\nconst lookup = Palette.buildDiscreteColorLookup(palette)\r\n```\r\n\r\n## 自定义 palette\r\n\r\n```js\r\nconst custom = Palette.createPalette({\r\n  id: 'my-levels',\r\n  label: '自定义分级',\r\n  mode: 'discrete',\r\n  stops: [\r\n    { key: 'low', label: '低', color: '#91cc75' },\r\n    { key: 'high', label: '高', color: '#ee6666' },\r\n  ],\r\n})\r\n```\r\n\r\n## 新增业务分组\r\n\r\n1. 在 `presets/` 下新增文件，用 `createPalette` 定义 stops\r\n2. 在 `registry.js` 的 `PALETTE_GROUPS` 注册\r\n3. 业务图层传入 `paletteGroup` + `paletteId`，或直接传 `palette` 对象\r\n",Rf=`# Navigation.Bookmark\r
\r
相机视角书签：捕获当前视角、列表管理、\`flyTo\`，可选 \`localStorage\` 持久化。\r
\r
添加时默认截取 **Cesium WebGL 画布** 缩略图（复用 \`Control.Screenshot.captureScene\`），**不含**搜索、主页、图层、帮助、Cesium ion 版权、全屏等 HTML 控件。\r
\r
## 用法\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js';\r
\r
const bookmarks = new cim3d.Navigation.Bookmark(viewer, {\r
  persist: true,\r
  storageKey: 'cim3d.navigation.bookmarks',\r
  flyDuration: 1.5,\r
  captureThumbnail: true,\r
});\r
\r
// 弹窗流程：先草稿（截图+姿态），确认后再入库\r
const draft = await bookmarks.captureDraftFromCamera();\r
bookmarks.add({ ...draft, name: '港岛俯视' });\r
\r
// 或一步完成\r
const item = await bookmarks.addFromCamera({ name: '港岛俯视' });\r
// item.thumbnail -> data:image/jpeg;base64,...\r
\r
bookmarks.list();\r
bookmarks.flyTo(item.id, { duration: 2 });\r
\r
// 按列表顺序播放全部视点\r
bookmarks.playAll({\r
  duration: 1.5,\r
  onStep: (bm, index) => console.log(index, bm.name),\r
  onComplete: () => console.log('done'),\r
});\r
// bookmarks.stopPlay();\r
\r
bookmarks.rename(item.id, '新名称');\r
bookmarks.remove(item.id);\r
bookmarks.clear();\r
bookmarks.destroy();\r
\`\`\`\r
\r
## 书签字段\r
\r
| 字段 | 说明 |\r
| --- | --- |\r
| \`id\` | 唯一标识 |\r
| \`name\` | 显示名称 |\r
| \`lng\` / \`lat\` / \`alt\` | 相机位置（度 / 米） |\r
| \`heading\` / \`pitch\` / \`roll\` | 姿态（度） |\r
| \`createdAt\` | 创建时间戳 |\r
| \`thumbnail\` | 可选，场景 JPEG 缩略图 dataURL |\r
\r
## 选项\r
\r
| 参数 | 默认 | 说明 |\r
| --- | --- | --- |\r
| \`persist\` | \`true\` | 是否写入 localStorage |\r
| \`storageKey\` | \`cim3d.navigation.bookmarks\` | 存储键 |\r
| \`flyDuration\` | \`1.5\` | 默认飞行时长（秒） |\r
| \`captureThumbnail\` | \`true\` | 添加时是否截取缩略图 |\r
| \`thumbMaxWidth\` / \`thumbMaxHeight\` | \`320\` / \`180\` | 缩略图最大尺寸 |\r
| \`thumbQuality\` | \`0.72\` | JPEG 质量 |\r
| \`initial\` | — | 初始书签数组（优先于存储） |\r
\r
存储空间不足时会自动去掉缩略图后再写入，保证视角数据不丢。\r
\r
## 演示入口\r
\r
- \`src/widgets/NavigationBookmark/index.vue\`\r
\r
菜单由 \`src/api/treeData/mock.js\` 中 \`Navigation 导航\` 分组配置。\r
`,Of=`# Navigation.OrbitAround\r
\r
定点环绕：相机绕指定中心点做水平环视（\`lookAt\` + \`HeadingPitchRange\`）。\r
\r
## 用法\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js';\r
\r
const orbit = new cim3d.Navigation.OrbitAround(viewer, {\r
  angularSpeedDeg: 20, // 度/秒\r
  pitchDeg: -30,\r
  range: 800,\r
  clockwise: true,\r
  showMarker: true,\r
});\r
\r
// 方式 1：指定经纬高\r
orbit.setCenter(118.19, 24.71, 20);\r
\r
// 方式 2：用当前相机视线交点作中心，并推算视距/俯仰\r
orbit.setCenterFromCamera();\r
\r
orbit.start(); // 持续环绕\r
// orbit.start({ revolutions: 1 }); // 转 1 圈后停止\r
\r
orbit.pause();\r
orbit.resume();\r
orbit.stop(); // 解锁相机\r
orbit.destroy();\r
\`\`\`\r
\r
## 主要参数\r
\r
| 参数 | 默认 | 说明 |\r
| --- | --- | --- |\r
| \`angularSpeedDeg\` | \`20\` | 角速度（度/秒） |\r
| \`pitchDeg\` | \`-30\` | 俯仰（度），负值俯视 |\r
| \`range\` | \`800\` | 视距（米） |\r
| \`clockwise\` | \`true\` | 顺时针 |\r
| \`showMarker\` | \`true\` | 中心点标记 |\r
\r
停止时会调用 \`camera.lookAtTransform(IDENTITY)\` 解锁鼠标交互。\r
\r
## 演示入口\r
\r
- \`src/widgets/NavigationOrbitAround/index.vue\`\r
`,$f="# Navigation.Roam\r\n\r\n沿路径或键盘控制的相机漫游能力，供 `cim3d.Navigation.Roam` 使用。\r\n\r\n## 模块\r\n\r\n| 类 | 说明 |\r\n| --- | --- |\r\n| `PathFirstPersonRoam` | 沿折线第一人称移动，朝向对准路径上下一顶点 |\r\n| `WaypointCameraRoam` | 按路点顺序 `flyTo`；可显示路点折线 + 各路点静态视锥线框（`FrustumOutlineGeometry`） |\r\n| `KeyboardRoam` | W/S/A/D 与方向键在水平面平移相机（需目标元素获得焦点） |\r\n\r\n工具函数：`normalizeCameraWaypoint` 用于归一化路点字段（`lng`/`lat`/`alt`、`heading`/`pitch`/`roll` 度、`duration` 秒）。\r\n\r\n## PathFirstPersonRoam\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js';\r\n\r\nconst roam = new cim3d.Navigation.Roam.PathFirstPersonRoam(viewer, {\r\n  speed: 8,\r\n  loop: false,\r\n  onComplete: () => console.log('done'),\r\n  onSegmentChange: (nextIndex) => {},\r\n});\r\nroam.setPath([\r\n  { lng: 114.38, lat: 22.31, alt: 400 },\r\n  { lng: 114.39, lat: 22.32, alt: 420 },\r\n]);\r\nroam.start();\r\n// roam.pause(); roam.resume(); roam.stop();\r\n// roam.destroy();\r\n```\r\n\r\n- `speed`：米/秒\r\n- `path`：至少 2 点，支持 `lng`/`lon`、`lat`、`alt`/`height`\r\n\r\n## WaypointCameraRoam\r\n\r\n`setViewPoints` 后会在各路点生成与 `flyTo` 相同 heading/pitch/roll 的**视锥线框**（`FrustumOutlineGeometry` + `origin`/`orientation`，兼容当前 Cesium 打包中无 `fromCamera` 的情况），并绘制**路点折线**。室内/近地场景建议把 `frustumFar` 调到数十米量级。\r\n\r\n每段飞行时间 = 路点 `duration` × **`durationMultiplier`**（默认 1，演示页用滑块调倍率，越大越慢）。\r\n\r\n```js\r\nconst fly = new cim3d.Navigation.Roam.WaypointCameraRoam(viewer, {\r\n  showFrustum: true,\r\n  showRoute: true,\r\n  durationMultiplier: 2,\r\n  frustumNear: 0.15,\r\n  frustumFar: 35,\r\n  frustumFovDegrees: 52,\r\n  routeColor: Cesium.Color.WHITE.withAlpha(0.9),\r\n  onComplete: () => {},\r\n});\r\n// fly.setDurationMultiplier(3);\r\nfly.setViewPoints([\r\n  { lng: 114.39, lat: 22.32, alt: 20, heading: 37, pitch: -8, duration: 2 },\r\n]);\r\nfly.start();\r\n// fly.stop() 仅停止飞行，默认保留航线与视锥；fly.destroy() 会清理实体与 Primitive\r\nfly.stop();\r\nfly.destroy();\r\n```\r\n\r\n## KeyboardRoam\r\n\r\n默认 `globalKeyListener: true`：在 `document` 捕获阶段监听，**开启后无需先点击画布**即可用 WASD / 方向键；焦点在 `input`、`textarea`、Element Plus 输入框内时会自动忽略，避免抢键。\r\n\r\n```js\r\nconst kb = new cim3d.Navigation.Roam.KeyboardRoam(viewer, {\r\n  moveSpeed: 35,\r\n  globalKeyListener: true,\r\n});\r\nkb.enable();\r\n// kb.setMoveSpeed(50);\r\nkb.disable();\r\nkb.destroy();\r\n```\r\n\r\n仅监听画布（需画布聚焦）时：\r\n\r\n```js\r\nnew cim3d.Navigation.Roam.KeyboardRoam(viewer, {\r\n  globalKeyListener: false,\r\n  target: viewer.canvas,\r\n  captureCanvasFocus: true,\r\n});\r\n```\r\n\r\n页面卸载前请调用各实例的 `stop`/`disable` 与 `destroy`，并移除自行添加到场景的实体（如示例折线）。\r\n\r\n## 演示入口\r\n\r\n- `src/widgets/NavigationPathRoam/index.vue`：折线第一人称 + 路点飞行\r\n- `src/widgets/NavigationKeyboardRoam/index.vue`：键盘漫游\r\n\r\n菜单由 `src/api/treeData/mock.js` 中 `Navigation 导航` 分组配置。\r\n",Wf="# Navigation.Roam\r\n\r\n沿路径或键盘控制的相机漫游能力，供 `cim3d.Navigation.Roam` 使用。\r\n\r\n## 模块\r\n\r\n| 类 | 说明 |\r\n| --- | --- |\r\n| `PathFirstPersonRoam` | 沿折线第一人称移动，朝向对准路径上下一顶点 |\r\n| `WaypointCameraRoam` | 按路点顺序 `flyTo`；可显示路点折线 + 各路点静态视锥线框（`FrustumOutlineGeometry`） |\r\n| `KeyboardRoam` | W/S/A/D 与方向键在水平面平移相机（需目标元素获得焦点） |\r\n\r\n工具函数：`normalizeCameraWaypoint` 用于归一化路点字段（`lng`/`lat`/`alt`、`heading`/`pitch`/`roll` 度、`duration` 秒）。\r\n\r\n## PathFirstPersonRoam\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js';\r\n\r\nconst roam = new cim3d.Navigation.Roam.PathFirstPersonRoam(viewer, {\r\n  speed: 8,\r\n  loop: false,\r\n  onComplete: () => console.log('done'),\r\n  onSegmentChange: (nextIndex) => {},\r\n});\r\nroam.setPath([\r\n  { lng: 114.38, lat: 22.31, alt: 400 },\r\n  { lng: 114.39, lat: 22.32, alt: 420 },\r\n]);\r\nroam.start();\r\n// roam.pause(); roam.resume(); roam.stop();\r\n// roam.destroy();\r\n```\r\n\r\n- `speed`：米/秒\r\n- `path`：至少 2 点，支持 `lng`/`lon`、`lat`、`alt`/`height`\r\n\r\n## WaypointCameraRoam\r\n\r\n`setViewPoints` 后会在各路点生成与 `flyTo` 相同 heading/pitch/roll 的**视锥线框**（`FrustumOutlineGeometry` + `origin`/`orientation`，兼容当前 Cesium 打包中无 `fromCamera` 的情况），并绘制**路点折线**。室内/近地场景建议把 `frustumFar` 调到数十米量级。\r\n\r\n每段飞行时间 = 路点 `duration` × **`durationMultiplier`**（默认 1，演示页用滑块调倍率，越大越慢）。\r\n\r\n```js\r\nconst fly = new cim3d.Navigation.Roam.WaypointCameraRoam(viewer, {\r\n  showFrustum: true,\r\n  showRoute: true,\r\n  durationMultiplier: 2,\r\n  frustumNear: 0.15,\r\n  frustumFar: 35,\r\n  frustumFovDegrees: 52,\r\n  routeColor: Cesium.Color.WHITE.withAlpha(0.9),\r\n  onComplete: () => {},\r\n});\r\n// fly.setDurationMultiplier(3);\r\nfly.setViewPoints([\r\n  { lng: 114.39, lat: 22.32, alt: 20, heading: 37, pitch: -8, duration: 2 },\r\n]);\r\nfly.start();\r\n// fly.stop() 仅停止飞行，默认保留航线与视锥；fly.destroy() 会清理实体与 Primitive\r\nfly.stop();\r\nfly.destroy();\r\n```\r\n\r\n## KeyboardRoam\r\n\r\n默认 `globalKeyListener: true`：在 `document` 捕获阶段监听，**开启后无需先点击画布**即可用 WASD / 方向键；焦点在 `input`、`textarea`、Element Plus 输入框内时会自动忽略，避免抢键。\r\n\r\n```js\r\nconst kb = new cim3d.Navigation.Roam.KeyboardRoam(viewer, {\r\n  moveSpeed: 35,\r\n  globalKeyListener: true,\r\n});\r\nkb.enable();\r\n// kb.setMoveSpeed(50);\r\nkb.disable();\r\nkb.destroy();\r\n```\r\n\r\n仅监听画布（需画布聚焦）时：\r\n\r\n```js\r\nnew cim3d.Navigation.Roam.KeyboardRoam(viewer, {\r\n  globalKeyListener: false,\r\n  target: viewer.canvas,\r\n  captureCanvasFocus: true,\r\n});\r\n```\r\n\r\n页面卸载前请调用各实例的 `stop`/`disable` 与 `destroy`，并移除自行添加到场景的实体（如示例折线）。\r\n\r\n## 演示入口\r\n\r\n- `src/widgets/NavigationPathRoam/index.vue`：折线第一人称 + 路点飞行\r\n- `src/widgets/NavigationKeyboardRoam/index.vue`：键盘漫游\r\n\r\n菜单由 `src/api/treeData/mock.js` 中 `Navigation 导航` 分组配置。\r\n",zf=`# TweensRoaming 无人机轨迹漫游\r
\r
基于 Cesium 时钟与轨迹点时间戳的补间漫游，加载 GLTF 无人机模型并支持第三人称 / 轨迹相机视角。\r
\r
## 轨迹数据格式\r
\r
与 [Mars3D 示例](https://data.mars3d.cn/file/apidemo/uav-route.json) 一致：\r
\r
\`\`\`json\r
[\r
  {\r
    "lng": 106.57,\r
    "lat": 29.27,\r
    "alt": 203.17,\r
    "time": "2025-05-28 11:12:45",\r
    "heading": -47.5,\r
    "pitch": -0.9,\r
    "roll": 0.2,\r
    "camera": { "heading": -47.6, "pitch": 0, "roll": 0 }\r
  }\r
]\r
\`\`\`\r
\r
## 用法\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js';\r
\r
const roam = new cim3d.Navigation.Roam.TweensRoaming(viewer, {\r
  modelUrl: '/static/model/gltf/dajiang.gltf',\r
  cameraMode: 'third', // 'third' | 'track' | 'free'\r
  speed: 1,\r
});\r
\r
await roam.loadRouteUrl('https://data.mars3d.cn/file/apidemo/uav-route.json');\r
await roam.flyToRoute();\r
roam.start();\r
\r
roam.on('complete', () => console.log('飞完'));\r
roam.stop();\r
roam.destroy();\r
\`\`\`\r
\r
## 事件\r
\r
| 事件 | 说明 |\r
|------|------|\r
| \`load\` | 轨迹加载完成 |\r
| \`start\` | 开始播放 |\r
| \`stop\` | 停止 |\r
| \`pause\` / \`resume\` | 暂停 / 继续 |\r
| \`complete\` | 播放到终点 |\r
\r
## 相机模式\r
\r
- \`third\`：第三人称跟随（默认）\r
- \`track\`：按轨迹点 \`camera\` 字段回放（机载视角）\r
- \`free\`：不驱动相机，用户自行操作\r
`,Nf=`# UavFixedRouteRoaming\r
\r
仿 Mars3D \`graphic.FixedRoute\` 的无人机时序漫游（纯 Cesium，无 mars3d 依赖）。\r
\r
## 与 TweensRoaming 区别\r
\r
| | TweensRoaming | UavFixedRouteRoaming |\r
|--|---------------|----------------------|\r
| 航线折线 | 仅飞行尾迹 | **加载即显示完整青色航线** |\r
| 序号点 | 无 | **285 个数字标牌** |\r
| 起终点 | 单个合并标记 | 不遮挡，靠序号点表达 |\r
| 贴地线 | 无 | 红色虚线 + 地面点 |\r
| 相机 | 第三人称/回放 | 同左，默认 Mars3D 示例视角 |\r
\r
## 用法\r
\r
\`\`\`js\r
const roam = new cim3d.Navigation.Roam.UavFixedRouteRoaming(viewer, {\r
  modelUrl: '/static/model/gltf/dajiang.gltf',\r
  showIndexMarkers: true,\r
});\r
await roam.loadRouteUrl('https://data.mars3d.cn/file/apidemo/uav-route.json', {\r
  flyTo: true,\r
  autoStart: false,\r
});\r
roam.start();\r
\`\`\`\r
`,qf="# Navigation.Roam\r\n\r\n沿路径或键盘控制的相机漫游能力，供 `cim3d.Navigation.Roam` 使用。\r\n\r\n## 模块\r\n\r\n| 类 | 说明 |\r\n| --- | --- |\r\n| `FirstPersonView` | 沿折线第一人称移动，朝向对准路径上下一顶点 |\r\n| `ThirdPersonView` | 沿同一条折线移动，相机在路径后上方俯视，视线指向下一路点 |\r\n| `WaypointCamera` | 按路点顺序 `flyTo`；可显示路点折线 + 各路点静态视锥线框（`FrustumOutlineGeometry`） |\r\n| `KeyboardRoam` | W/S/A/D 与方向键在水平面平移相机（需目标元素获得焦点） |\r\n\r\n工具函数：`normalizeCameraWaypoint` 用于归一化路点字段（`lng`/`lat`/`alt`、`heading`/`pitch`/`roll` 度、`duration` 秒）。\r\n\r\n## PathFirstPersonRoam\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js';\r\n\r\nconst roam = new cim3d.Navigation.Roam.PathFirstPersonRoam(viewer, {\r\n  speed: 8,\r\n  loop: false,\r\n  onComplete: () => console.log('done'),\r\n  onSegmentChange: (nextIndex) => {},\r\n});\r\nroam.setPath([\r\n  { lng: 114.38, lat: 22.31, alt: 400 },\r\n  { lng: 114.39, lat: 22.32, alt: 420 },\r\n]);\r\nroam.start();\r\n// roam.pause(); roam.resume(); roam.stop();\r\n// roam.destroy();\r\n```\r\n\r\n- `speed`：米/秒\r\n- `path`：至少 2 点，支持 `lng`/`lon`、`lat`、`alt`/`height`\r\n\r\n## WaypointCamera\r\n\r\n`setViewPoints` 后会在各路点生成**视锥线框**：内部用 `Camera.setView` 与 `flyTo` 相同的 heading/pitch/roll，再取 `right` / `up` / `direction` 拼成 `FrustumGeometry` 约定的旋转矩阵（列向量为 `[-right, up, direction]`），**不能**用 `Transforms.headingPitchRollQuaternion` 直接当 `FrustumOutlineGeometry.orientation`（会与 Cesium 视锥数学不一致，出现“烟囱状”竖直视锥）。同时绘制**路点折线**。\r\n\r\n与 Mars3D `FrustumPrimitive` 示意相机对齐的常见取值：`frustumNear: 0.01`、`frustumFovDegrees: 45`、`frustumAspectRatio: 1`；Mars3D 示例里 `far` 往往很短（米级），本模块默认 `frustumFar` 为 **8**，室内/地下可再改小到 **2～6**。路线样式可对齐 `PolylinePrimitive`：`routeLineWidth: 1`、`routeColor: rgba(200,200,200,0.3)`。\r\n\r\n每段飞行时间 = 路点 `duration` × **`durationMultiplier`**（默认 1，演示页用滑块调倍率，越大越慢）。\r\n\r\n```js\r\nconst fly = new cim3d.Navigation.Roam.WaypointCamera(viewer, {\r\n  showFrustum: true,\r\n  showRoute: true,\r\n  durationMultiplier: 2,\r\n  frustumNear: 0.01,\r\n  frustumFar: 8,\r\n  frustumFovDegrees: 45,\r\n  frustumAspectRatio: 1,\r\n  routeLineWidth: 1,\r\n  routeColor: Cesium.Color.fromCssColorString('rgba(200,200,200,0.3)'),\r\n  onComplete: () => {},\r\n});\r\n// fly.setDurationMultiplier(3);\r\nfly.setViewPoints([\r\n  { lng: 114.39, lat: 22.32, alt: 20, heading: 37, pitch: -8, duration: 2 },\r\n]);\r\nfly.start();\r\n// fly.stop() 仅停止飞行，默认保留航线与视锥；fly.destroy() 会清理实体与 Primitive\r\nfly.stop();\r\nfly.destroy();\r\n```\r\n\r\n## KeyboardRoam\r\n\r\n默认 `globalKeyListener: true`：在 `document` 捕获阶段监听，**开启后无需先点击画布**即可用 WASD / 方向键；焦点在 `input`、`textarea`、Element Plus 输入框内时会自动忽略，避免抢键。\r\n\r\n```js\r\nconst kb = new cim3d.Navigation.Roam.KeyboardRoam(viewer, {\r\n  moveSpeed: 35,\r\n  globalKeyListener: true,\r\n});\r\nkb.enable();\r\n// kb.setMoveSpeed(50);\r\nkb.disable();\r\nkb.destroy();\r\n```\r\n\r\n仅监听画布（需画布聚焦）时：\r\n\r\n```js\r\nnew cim3d.Navigation.Roam.KeyboardRoam(viewer, {\r\n  globalKeyListener: false,\r\n  target: viewer.canvas,\r\n  captureCanvasFocus: true,\r\n});\r\n```\r\n\r\n页面卸载前请调用各实例的 `stop`/`disable` 与 `destroy`，并移除自行添加到场景的实体（如示例折线）。\r\n\r\n## 演示入口\r\n\r\n- `src/widgets/NavigationPathRoam/index.vue`：「折线漫游」内子 Tab 切换第一人称 / 第三人称（含 `ThirdPersonView` 代码片段）+「路点飞行」\r\n- `src/widgets/NavigationKeyboardRoam/index.vue`：键盘漫游\r\n\r\n菜单由 `src/api/treeData/mock.js` 中 `Navigation 导航` 分组配置。\r\n",jf="# Three + Ammo 物理\r\n\r\nAmmo.js 与 Three.js 网格同步的物理能力，叠加在 Cesium 局部 ENU 场景上。入口为 [`index.js`](./index.js)，经 `cim3d.Three.Ammo` 使用。\r\n\r\n## 为何用 Three 叠加而非 Cesium Entity？\r\n\r\n- 官方/社区 Ammo 示例基于 **Three 网格** 同步刚体/软体顶点。\r\n- **软体** 每帧需更新大量顶点，`BufferGeometry` 最直接。\r\n- 与 [`../Scene`](../Scene) 的 `ThreeCesiumOverlay` 共用相机同步与 ENU 局部坐标系。\r\n\r\n## 加载 Ammo\r\n\r\n源码：`bullet/ammo.js`（**kripken 完整构建**，含软体与车辆；末尾 `export default Ammo`，随 SDK 打包，**无需** `public/static` 脚本与 Vite 插件）。\r\n\r\n`loadAmmo()` 通过 `import.meta.url` 加载 `bullet/ammo.js` 后 `await factory({})` 得到 Module。\r\n\r\n### 迁移到其它项目\r\n\r\n1. 复制整个 `src/sdk/Three/Ammo/`（**必须含** `bullet/ammo.js`，不要改名为 `vendor/`，否则 Vite 会当成 npm 包 `vendor` 去 `node_modules/.vite/deps/vendor/ammo.js` 拉取并报错）。\r\n2. 业务里 `import { loadAmmo } from '.../loadAmmo.js'` 或 `import { DemoSession } from '.../index.js'`。\r\n3. 确认 `vendor/ammo.js` 已删除，避免旧路径残留。\r\n\r\n若仍出现 `exports: empty`，可在宿主 `vite.config` 对 `**/Three/Ammo/bullet/ammo.js` 加 `optimizeDeps.exclude`（可选）。\r\n\r\n| 场景类型 | 世界类 |\r\n|----------|--------|\r\n| 纯刚体 | `btDiscreteDynamicsWorld`（`createPhysicsWorld({ softBody: false })`） |\r\n| 含软体 | `btSoftRigidDynamicsWorld`（`PhysicsBase.needsSoftBody = true`） |\r\n\r\n## `index.js` 导出（`cim3d.Three.Ammo`）\r\n\r\n| 导出 | 类型 | 说明 |\r\n|------|------|------|\r\n| `PhysicsBase` | `class` | 物理场景基类，子类实现 `buildScene()` |\r\n| `DemoSession` | `class` | Widget 用会话：挂载 / 重置 / 飞到场景 |\r\n| `loadAmmo` | `function` | 加载并缓存 Ammo Module |\r\n| `createPhysicsWorld` | `function` | 创建刚体或软刚体世界 |\r\n| `addSoftBody` | `function` | 向软体世界添加软体 |\r\n| `removeSoftBody` | `function` | 从软体世界移除软体 |\r\n| `createRigidBody` | `function` | 创建 `btRigidBody`（不自动加 mesh） |\r\n| `addBoxBody` | `function` | 盒子刚体 + Three 网格，返回 `{ mesh, body, shape }` |\r\n| `addGround` | `function` | 静态地面盒子，默认 200×1×200 |\r\n\r\n默认导出对象包含上述全部成员。\r\n\r\n## 目录与职责\r\n\r\n| 文件 | 职责 |\r\n|------|------|\r\n| [`index.js`](./index.js) | 聚合导出 |\r\n| [`PhysicsBase.js`](./PhysicsBase.js) | 初始化 Overlay、物理世界、`postRender` 步进、刚/软体同步、`dispose` |\r\n| [`DemoSession.js`](./DemoSession.js) | 包装 `PhysicsBase` 子类的生命周期 |\r\n| [`loadAmmo.js`](./loadAmmo.js) | `import.meta.url` 加载 `bullet/ammo.js` 与 Module 缓存 |\r\n| [`createPhysicsWorld.js`](./createPhysicsWorld.js) | 刚体/软体动力学世界 |\r\n| [`rigidBodyUtils.js`](./rigidBodyUtils.js) | 刚体与盒子网格快捷创建 |\r\n\r\n各 **Physics 示例类** 在 `src/widgets/ThreePhysics*/` 下（如 `VehiclePhysics.js`），**不在** 本目录 `index.js` 中导出，避免与 widget 循环依赖。\r\n\r\n## `PhysicsBase` 要点\r\n\r\n- 默认原点：`DEFAULT_ORIGIN = { lng: 118.19, lat: 24.71, height: 25 }`\r\n- 构造选项：`origin`、`flyRangeM`（默认 120）、`clipToTerrain`（默认 true，对齐地形）\r\n- 子类静态属性：`needsSoftBody = true` 时启用软体世界\r\n- 内容根节点：`overlay.contentRoot`（Y-up 局部坐标，`contentRoot.rotation.x = π/2` 对齐 ENU 天向）\r\n- 钩子：`buildScene()`（必实现）、`onBeforeStep(dt)`、`onAfterStep(dt)`\r\n- 数组：`rigidBodies`、`softBodies`、`constraints`\r\n\r\n## `DemoSession`（Widget 页面）\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js'\r\nimport VehiclePhysics from './VehiclePhysics.js'\r\n\r\nconst session = new cim3d.Three.Ammo.DemoSession(window.viewer, VehiclePhysics)\r\nawait session.start()\r\nsession.flyTo()\r\nawait session.reset()\r\nsession.dispose()\r\n```\r\n\r\n- `status`：`idle` | `loading` | `running` | `error`\r\n- `errorText`：失败信息\r\n- `start()` 会开启 `globe.depthTestAgainstTerrain`\r\n\r\n## 示例类与 Widget 路由\r\n\r\n| Widget 目录 | Physics 类 | 菜单 component |\r\n|-------------|------------|----------------|\r\n| `ThreePhysicsVehicle` | `VehiclePhysics` | `ThreePhysicsVehicle` |\r\n| `ThreePhysicsCloth` | `ClothPhysics` | `ThreePhysicsCloth` |\r\n| `ThreePhysicsPendulum` | `PendulumPhysics` | `ThreePhysicsPendulum` |\r\n| `ThreePhysicsSoftImpact` | `SoftBodyImpactPhysics` | `ThreePhysicsSoftImpact` |\r\n| `ThreePhysicsFracture` | `FracturePhysics` | `ThreePhysicsFracture` |\r\n\r\n路由：`mock.js` 的 `component` → `src/widgets/<component>/index.vue`。\r\n\r\n## 在示例类中引用 SDK\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js'\r\n\r\nexport default class MyPhysics extends cim3d.Three.Ammo.PhysicsBase {\r\n  static needsSoftBody = false\r\n\r\n  async buildScene() {\r\n    const { Ammo, physicsWorld, scene } = this\r\n    cim3d.Three.Ammo.addGround(Ammo, physicsWorld, scene, 40)\r\n    // ...\r\n  }\r\n}\r\n```\r\n\r\n## 自定义示例（不经 DemoSession）\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js'\r\n\r\nconst demo = new MyPhysics(window.viewer, {\r\n  origin: { lng: 118.19, lat: 24.71, height: 80 },\r\n})\r\nawait demo.init()\r\ndemo.dispose()\r\n```\r\n\r\n## 与 Scene 的关系\r\n\r\n`PhysicsBase` 内部使用 [`ThreeCesiumOverlay`](../Scene/ThreeCesiumOverlay.js)（`localFrameMode: 'yup-local'`），与 [`../Scene`](../Scene) 模块文档中的叠加层说明一致。\r\n",Hf="",Uf="# Three 叠加 Cesium 场景\r\n\r\n在 Cesium `Viewer` 上透明叠加 Three.js 渲染层，每帧同步 Cesium 相机。入口为 [`index.js`](./index.js)，经 `cim3d.Three.Scene` 使用。\r\n\r\n## `index.js` 导出（`cim3d.Three.Scene`）\r\n\r\n| 导出 | 类型 | 说明 |\r\n|------|------|------|\r\n| `ThreeCesiumOverlay` | `class`（default） | 通用透明叠加层，ENU 或外部矩阵定位 |\r\n| `ThreeOnCesiumLayer` | `class`（default） | 面向 3D Gaussian / 大场景瓦片的封装 |\r\n| `alignOriginToTerrain` | `function` | 将 ENU 原点高度对齐地形 |\r\n| `cesiumMatrixToArray16` | `function` | Cesium `Matrix4` → 列主序 16 元数组 |\r\n| `cartesianToThreeVector3` | `function` | `Cartesian3` 写入 `THREE.Vector3` |\r\n\r\n默认导出对象包含上述全部成员。\r\n\r\n## 目录与职责\r\n\r\n| 文件 | 职责 |\r\n|------|------|\r\n| [`index.js`](./index.js) | 聚合导出 |\r\n| [`ThreeCesiumOverlay.js`](./ThreeCesiumOverlay.js) | 核心叠加：Renderer、相机同步、`postRender` 渲染 |\r\n| [`ThreeOnCesiumLayer.js`](./ThreeOnCesiumLayer.js) | `matrix-only` + 可选 3DGS 友好渲染管线 |\r\n| [`alignOriginToTerrain.js`](./alignOriginToTerrain.js) | 采样地形高度修正 `origin.height` |\r\n| [`cesiumMatrix.js`](./cesiumMatrix.js) | 矩阵与坐标小工具 |\r\n\r\n## `ThreeCesiumOverlay`\r\n\r\n### 局部坐标模式 `localFrameMode`\r\n\r\n| 模式 | 行为 |\r\n|------|------|\r\n| `yup-local`（默认） | `setEnuOrigin` 设置 ENU→ECEF；`contentRoot` 绕 X 轴 **+90°**，Three +Y 对齐 ENU 天向 +Z |\r\n| `matrix-only` | 不建 `contentRoot` 旋转；由 `setFrameMatrix16` 设置 `frameGroup` 矩阵（tileset / 3DGS） |\r\n\r\n### 构造选项\r\n\r\n- `origin`：默认 `{ lng: 118.19, lat: 24.71, height: 80 }`\r\n- `logarithmicDepthBuffer`：默认 `true`\r\n- `cameraNear` / `cameraFar`：默认 `0.1` / `5000`\r\n- `outputColorSpace`：默认 `THREE.SRGBColorSpace`\r\n\r\n### 主要 API\r\n\r\n| 方法 | 说明 |\r\n|------|------|\r\n| `init()` | 创建 Scene/Camera/Renderer，挂到 Viewer canvas 父节点（`pointer-events: none`） |\r\n| `setEnuOrigin(origin)` | 更新 ENU 原点并刷新 `frameGroup` 矩阵 |\r\n| `setFrameMatrix16(matrix16)` | 列主序 4×4 局部→ECEF 矩阵 |\r\n| `resize()` | 跟随 Cesium canvas 尺寸 |\r\n| `syncCameraFromCesium()` | 同步视图/投影矩阵 |\r\n| `render()` | 清深度后绘制（`autoClear: false`） |\r\n| `bindPostRender()` / `unbindPostRender()` | 绑定 Cesium `postRender` 自动渲染 |\r\n| `flyTo(center, rangeM)` | 相机飞到 ECEF 包围球 |\r\n| `flyToContentOrigin(rangeM)` | 飞到局部原点（`yup-local`） |\r\n| `dispose()` | 解绑事件、移除 canvas、释放资源 |\r\n\r\n### 场景图结构（`yup-local`）\r\n\r\n```\r\nscene\r\n└── frameGroup          ← ENU→ECEF（matrixAutoUpdate = false）\r\n    └── contentRoot     ← rotation.x = π/2，物理/物体加在此组\r\n```\r\n\r\n[`../Ammo`](../Ammo) 的 `PhysicsBase` 将刚体/软体 mesh 挂在 `contentRoot` 下。\r\n\r\n## `ThreeOnCesiumLayer`\r\n\r\n基于 `ThreeCesiumOverlay`（`localFrameMode: 'matrix-only'`），供 [`Three3DGaussOnCesium`](../../../widgets/Three3DGaussOnCesium/index.vue) 等使用。\r\n\r\n### 构造选项\r\n\r\n- `logarithmicDepthBuffer`：默认 `false`（大场景）\r\n- `cameraFar`：默认 `1e12`\r\n- `splatColorPipeline`：默认 `true`（`LinearSRGBColorSpace` + `NoToneMapping`）\r\n\r\n### 主要 API\r\n\r\n| 方法 / 属性 | 说明 |\r\n|-------------|------|\r\n| `init()` | 初始化 Overlay，可选应用 splat 管线并 `bindPostRender` |\r\n| `applySplatFriendlyRenderer()` / `restoreRendererPipeline()` | 切换/恢复渲染器色彩与 tone mapping |\r\n| `scene` / `camera` / `renderer` / `frameGroup` / `dirLight` | 代理到内部 Overlay |\r\n| `enabled` | 开关 Overlay 渲染 |\r\n| `onCameraChanged(fn)` | 监听 `viewer.camera.changed` |\r\n| `dispose()` | 恢复管线并释放 Overlay |\r\n\r\n## 工具函数\r\n\r\n### `alignOriginToTerrain(viewer, origin, offsetM?)`\r\n\r\n- 有地形时 `sampleTerrainMostDetailed`，否则 `globe.getHeight`\r\n- 成功则 `origin.height = 地形高 + offsetM`（默认 `0.05`）\r\n- 返回同一 `origin` 对象\r\n\r\n### `cesiumMatrixToArray16(m)` / `cartesianToThreeVector3(cartesian, target)`\r\n\r\nCesium 与 Three 之间的矩阵、笛卡尔坐标转换，供 `ThreeCesiumOverlay.syncCameraFromCesium` 等使用。\r\n\r\n## 使用示例\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js'\r\n\r\nconst { ThreeCesiumOverlay, alignOriginToTerrain } = cim3d.Three.Scene\r\n\r\nconst origin = { lng: 118.19, lat: 24.71, height: 80 }\r\nawait alignOriginToTerrain(viewer, origin)\r\n\r\nconst overlay = new ThreeCesiumOverlay(viewer, { origin, localFrameMode: 'yup-local' })\r\nawait overlay.init()\r\noverlay.bindPostRender()\r\n\r\n// 在 overlay.contentRoot 下添加 Three 物体 …\r\n\r\noverlay.flyToContentOrigin(120)\r\noverlay.dispose()\r\n```\r\n\r\n3D Gaussian 瓦片场景见 Widget `Three3DGaussOnCesium`，通常：\r\n\r\n```js\r\nimport ThreeOnCesiumLayer from '@/sdk/Three/Scene/ThreeOnCesiumLayer.js'\r\n// 或 cim3d.Three.Scene.ThreeOnCesiumLayer\r\n```\r\n\r\n## 与上层模块关系\r\n\r\n- [`../index.js`](../index.js)：`export { Scene, Ammo }`，即 `cim3d.Three.Scene` 与 `cim3d.Three.Ammo`\r\n- Ammo 物理示例依赖本模块的叠加与坐标约定，见 [`../Ammo/README.md`](../Ammo/README.md)\r\n",Gf=`# Tool.TilesetRegionFlatten — 绘制区域压平 3D Tiles\r
\r
在水平多边形区域内，将 \`Cesium3DTileset\` 中高于目标高度的顶点压到同一水平面（\`CustomShader\` 顶点阶段）。\r
\r
## 实现要点（与常见博文一致）\r
\r
- 使用 [earcut](https://github.com/mapbox/earcut) 对区域在 **ENU 平面上的投影**做三角化（支持**凹多边形**），见 [博客园：Shader 驱动的局部压平](https://www.cnblogs.com/ljbguanli/p/19817241) 思路。\r
- 顶点着色器内：将三角形角点（**世界坐标**）用 \`czm_inverseModel\` 变到**当前片元所在瓦片的模型空间**，与 \`positionMC.xy\` 一起做 **XY 平面点-in-三角形** 判定（与 CSDN 同类文章中的模型空间投影判定一致）。\r
- 命中后仍用 **tileset 包围球中心 ENU** 改写 \`z\`，再经 \`czm_inverseModel\` 回写模型坐标，保证压平面在世界空间中水平。\r
\r
## 与 \`widgets/AnalysisModelFlatten\` 的区别\r
\r
- **本类**：单 tileset + 用户绘制区域 + 压平高度。\r
- **AnalysisModelFlatten**：双模型压盖、参考体/包围盒流程。\r
\r
## 限制\r
\r
- 三角化后最多 **28** 个三角形参与 Shader（顶点过多时会截断）；会覆盖该 \`tileset\` 的 \`customShader\`。\r
- \`setRegionByPositions\` 会将顶点投影到 **WGS84 椭球 h=0** 再计算。\r
\r
## 示例\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js'\r
\r
const tool = new cim3d.Tool.TilesetRegionFlatten(viewer, {\r
  tileset: myTileset,\r
  flattenHeightMeters: 12,\r
  footprintExpandRatio: 1.12,\r
})\r
\r
tool.setRegionByPositions(cartesian3Array)\r
tool.apply()\r
tool.remove()\r
\`\`\`\r
\r
兼容旧名：\`cim3d.Tool.AreaModelFlatten\` 与 \`TilesetRegionFlatten\` 指向同一实现。\r
`,Vf="# 3D Tileset 剖切 / 压平（modelFlatten）\r\n\r\n面向 **Cesium** 的 `Cesium3DTileset`：通过 **CustomShader**（顶点压平 + 片段 `discard`）实现参考体约束下的压平与剖切，不依赖 `ClippingPlaneCollection`。\r\n\r\n---\r\n\r\n## 功能概述\r\n\r\n- **主 Tileset**（第一参数）：仅挂接着色器与可视化，**不会**被自动转成「参考包围盒」。\r\n- **参考体**（第二参数 `clipTarget`）：提供水平投影范围、**参考底平面**、以及 **三维包围盒**，用于：\r\n  - **压平**：在水平投影内，将参考底平面**以下**的顶点沿法向抬到参考底；\r\n  - **剖切**：参考底平面**以上**且落在参考体 **三维盒内** 的片元被 `discard`（掏空）。\r\n\r\n示意图（文字）：紫框下方柱体被压到参考底一层；紫框内部、参考底以上的墙体应被去掉，仅保留盒外与参考底以下的外观。\r\n\r\n---\r\n\r\n## 核心概念\r\n\r\n| 概念 | 说明 |\r\n|------|------|\r\n| 第一参数 `tileset` | 被剖切 / 压平的 `Cesium.Cesium3DTileset` |\r\n| 第二参数 `clipTarget` | 参考体：`Entity`、或可由 `create` 解析的 `Cesium3DTileset` / 带 `boundingSphere` 的 Primitive |\r\n| 推荐入口 | **`ModelFlatten.create(viewer, options)`**（异步解析第二参数，Tileset → 临时参考盒 `Entity`） |\r\n\r\n---\r\n\r\n## 第二参数类型与 OBB 逻辑（重要）\r\n\r\n### 1. `Cesium.Entity`（推荐：自带 `BoxGraphics`）\r\n\r\n- 角点、底面、着色器盒参数均来自 **Entity 的 Box + position/orientation**。\r\n- `getClipTargetBoxClipParams` 返回 **`useObb: true`**：片段里用 **OBB**（`worldToLocal` + 半轴）判断是否在盒内。\r\n\r\n### 2. `Cesium.Cesium3DTileset` + **`ModelFlatten.create`**\r\n\r\n- 内部调用 **`resolveClipTargetInput`**：`computeTilesetOBB` → `getBoxParamsFromOBB` → 向场景添加 **临时 `Entity` + `BoxGraphics`**（默认洋红半透明样式）。\r\n- 控制器内 `this.clipTarget` 最终是 **Entity**，与上一种情况一致，着色器侧同样是 **真 OBB**。\r\n- 若 `generated === true`，`destroy` / `clearClipTarget` / 再次 `setClipTarget` 时会通过 **`clipTargetDispose`** 移除该 Entity。\r\n\r\n### 3. 绕过 `create`，直接把 Tileset 赋给 `clipTarget`\r\n\r\n- `getClipTargetBoundingBoxCorners` 仍会优先用 **`computeTilesetOBB`** 取 8 个角点。\r\n- 但 `getClipTargetBoxClipParams` **没有** Entity 分支时，会对角点包一层 **世界轴对齐 AABB**，返回 **`useObb: false`**，盒内判断比真实 OBB **略保守（偏大）**。\r\n- **建议**：需要与 OBB 严格一致时，务必使用 **`create`**，或先 **`resolveClipTargetInput` / `ModelFlatten.resolveClipTarget`** 再 **`setClipTarget(entity, dispose)`**。\r\n\r\n### 4. 带 `boundingSphere` 的 Primitive（如 Model）\r\n\r\n- 用 **外接球边长为边** 的轴对齐立方体近似，再生成参考 `Entity`。\r\n\r\n---\r\n\r\n## API 速查\r\n\r\n### 静态方法\r\n\r\n| API | 说明 |\r\n|-----|------|\r\n| `ModelFlatten.create(viewer, options)` | 异步创建；从 `options` 抽出 `clipTarget` / `clipTargetTilesetUrl` / `clipTargetBoxStyle` / `clipTargetEntityName`，对其余原样传入构造函数 |\r\n| `ModelFlatten.resolveClipTarget(viewer, clipTarget, options?)` | 与 `create` 内解析逻辑一致，返回 `{ entity, dispose, generated }` |\r\n| `resolveClipTargetInput`（模块导出） | 同上，供非类场景直接调用 |\r\n\r\n**`create` 常用 options**\r\n\r\n- `tileset`：主 Tileset（必填）\r\n- `clipTarget`：`Entity` \\| `Cesium3DTileset` \\| Primitive \\| `null`\r\n- `clipTargetTilesetUrl`：**仅当第二参数为 Tileset** 且需显式指定 `tileset.json` 时使用（与主模型 `tilesetUrl` 无关）\r\n- `clipTargetBoxStyle`：生成参考盒时的 `BoxGraphics` 样式（覆盖默认洋红等）\r\n- `clipTargetEntityName`：生成 Entity 的名称\r\n- `tilesetUrl`：主 Tileset 的 json URL（可选，用于 AABB/OBB 等计算）\r\n- `onMessage` / `onStateChange`：回调\r\n\r\n### 实例方法\r\n\r\n| 方法 | 说明 |\r\n|------|------|\r\n| `applyFlatten(offset?)` | 应用压平 + 剖切；`offset` 为参考底面等的几何偏移（米） |\r\n| `restoreOriginal()` | 移除 CustomShader 与剖切可视化，恢复 Tileset |\r\n| `toggleFlatten(offset?)` | 在「已剖切 / 原始」间切换 |\r\n| `setTileset(tileset)` | 更换主 Tileset |\r\n| `setClipTarget(entity, clipTargetDispose?)` | 设置参考体；若参考盒是自动生成的，需传入 `dispose` 以便后续清理 |\r\n| `clearClipTarget()` | 清除参考体并调用内部 `dispose` |\r\n| `destroy()` | 销毁控制器与相关 Entity |\r\n| `load()` | 兼容占位：Tileset 已在外部加载时直接标记就绪 |\r\n| `toggleAABB()` / `toggleOBB()` | 调试：显示主 Tileset 的 AABB / OBB（与参考体无关） |\r\n| `getState()` | `{ tilesetLoaded, isFlattened, showAABB, showOBB, hasClipTarget }` |\r\n\r\n---\r\n\r\n## 业务语义（与当前实现一致）\r\n\r\n### 有参考体（`clipTarget` 有效且不等于主 `tileset`）\r\n\r\n1. **顶点**：在水平投影（参考盒角点在主模型 ENU 下的 XY 范围）内，且 **`planeDist < 0`**（在参考**底平面**下方）→ 沿 **`u_topPlaneN`** 抬到参考底。\r\n2. **片段**（`u_hasRefClip`）：\r\n   - **`planeDist ≤ 0`**（参考底及以下）：**不 `discard`**；\r\n   - **`planeDist > 0`** 且 **`insideReferenceBox(wp)`**：**`discard`**。\r\n3. 世界坐标由 **`v_origMC * czm_model`** 重建，减轻大坐标下 varying 精度导致的正背面差异。\r\n\r\n### 无参考体\r\n\r\n- 使用主模型 **OBB 底 / 最高底** 等计算 `u_bottomZ`，在 **ENU  footprint**（无参考体时逻辑上为「整模型」范围）内对 **`height < u_bottomZ`** 的片元 **`discard`**，即保留「底面以上」的视觉效果（见 `applyFlatten` 中无 `useClip` 分支）。\r\n\r\n---\r\n\r\n## 演示入口\r\n\r\n- 示例页面：[index.vue](./index.vue)（加载主 Tileset、控制剖切与 AABB/OBB 显示）。\r\n- 若示例里参考体写死为 **Entity**：要把 **另一份 3D Tiles** 当参考体时，请改用 **`ModelFlatten.create`** 并传入 `clipTarget: 另一Tileset`，必要时配置 **`clipTargetTilesetUrl`**。\r\n\r\n---\r\n\r\n## 依赖与相关文件\r\n\r\n| 文件 | 作用 |\r\n|------|------|\r\n| [ModelFlatten.js](./ModelFlatten.js) | 控制器、`resolveClipTargetInput`、`applyFlatten`、CustomShader |\r\n| [tilesetBoundingBox.js](./tilesetBoundingBox.js) | Tileset AABB/OBB、参考体角点、底面平面、`getClipTargetBoxClipParams` |\r\n\r\n子目录 **`压底部到传入参考体的位置/`**：另一套压平演示/逻辑，**与根目录当前主流程可能不一致**；接入与排错请以 **本目录** `ModelFlatten.js` 为准。\r\n\r\n---\r\n\r\n## 常见问题（FAQ）\r\n\r\n1. **第二参数传了 Tileset，但剖切范围和想象不一致**  \r\n   - 是否走了 **`create`**？若直接用构造函数并把 Tileset 赋给 `clipTarget`，着色器可能用 **世界 AABB** 而非 OBB。  \r\n   - **`clipTargetTilesetUrl`** 是否正确（自定义路径、代理、多 bundle 下资源不一致）？\r\n\r\n2. **正面能剖切、背面仍看到墙**  \r\n   - 与跨压平边界的大三角、插值有关；实现上已用 **`v_origMC`** 在片段乘 **`czm_model`**。若仍有个别三角异常，需从网格或业务上减少「同一三角跨参考底」的情况。\r\n\r\n3. **参考底以下出现不该有的空洞**  \r\n   - 参考体模式下**不应**再依赖「模型 OBB 底」做全局 discard；若你本地代码仍对参考模式使用 `height < u_bottomZ`，请与仓库最新 `applyFlatten` 片段分支对齐。\r\n\r\n4. **`instanceof Cesium.Cesium3DTileset` 为 false**  \r\n   - 多份 Cesium 打包、或 Tileset 来自另一 bundle 时可能发生；尽量保证全项目 **单一 `cesium` 引用**。\r\n\r\n---\r\n\r\n## 维护说明\r\n\r\n语义或 uniform 变更时，请同步更新本文 **「业务语义」** 与 **FAQ**，并核对 `ModelFlatten.js`、`tilesetBoundingBox.js` 中的 `getClipTargetBoxClipParams` / `getClipTargetBoundingBoxCorners`。\r\n",Yf=`# TerrainClip\r
\r
Globe **多边形裁剪**：在指定区域内裁掉 Cesium 球面地形与影像（挖洞或反向保留），不修改 \`terrainProvider\`，不创建坑底/侧壁网格。\r
\r
## 环境\r
\r
- WebGL2\r
- \`ClippingPolygonCollection.isSupported(scene) === true\`\r
\r
## 用法\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js'\r
\r
const clip = new cim3d.Tool.TerrainClip(viewer, { inverse: false })\r
clip.setRegionPositions(positionsCartesian3Array) // ≥3 点\r
const { success, message } = clip.apply()\r
clip.clear()\r
clip.destroy()\r
\`\`\`\r
\r
## 构造参数\r
\r
| 选项 | 类型 | 默认 | 说明 |\r
|------|------|------|------|\r
| \`inverse\` | \`boolean\` | \`false\` | \`false\`：裁掉多边形**内部**（挖洞）；\`true\`：裁掉**外部** |\r
\r
## 方法\r
\r
- \`setInverse(inv: boolean)\`：更新 \`inverse\`；若已 \`apply()\`，需先 \`clear()\` 再重新 \`apply()\` 生效（demo 在切换勾选时会自动 \`clear\`）。\r
\r
## 与 TerrainFlatten 区别\r
\r
| | TerrainClip | TerrainFlatten |\r
|--|---------------|----------------|\r
| 裁剪 | ✓ | ✓ |\r
| 坑底/侧壁 | ✗ | ✓ |\r
| 椭球高/下挖 | ✗ | ✓ |\r
`,Xf=`# TerrainExaggeration\r
\r
地形**垂直夸张**：沿椭球法线拉伸/压缩地形高差，便于观察山地起伏（对齐 Mars3D \`map.scene.verticalExaggeration\` / Cesium Scene API）。\r
\r
## 前置条件\r
\r
- 已加载量化地形（非 \`EllipsoidTerrainProvider\`），夸张效果才明显。\r
\r
## 主要参数\r
\r
| 选项 | 说明 |\r
|------|------|\r
| \`exaggeration\` | 初始夸张系数，默认 \`1\`（不夸张） |\r
| \`relativeHeight\` | 相对参考椭球高（米），默认 \`0\`（以椭球面为基准） |\r
\r
## API\r
\r
- \`setExaggeration(number)\` / \`getExaggeration()\`：设置/读取夸张系数\r
- \`setRelativeHeight(number)\` / \`getRelativeHeight()\`：设置/读取参考高\r
- \`restore()\`：恢复构造时记录的 Scene 参数\r
- \`destroy()\`：等同 \`restore()\` 并释放引用\r
\r
## 示例\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js'\r
\r
const tool = new cim3d.Tool.TerrainExaggeration(viewer, { exaggeration: 1 })\r
tool.setExaggeration(10)\r
\r
// 离开页面\r
tool.destroy()\r
\`\`\`\r
\r
## 说明\r
\r
- Cesium 1.116+ 使用 \`scene.verticalExaggeration\`；更旧版本回退 \`globe.terrainExaggeration\`。\r
- 夸张仅改变视觉高差，不改变采样到的真实椭球高程数值。\r
`,Kf="# TerrainFlatten\r\n\r\n在指定多边形区域内 **压平地形**（将量化地形瓦片顶点高度改为同一椭球高），实现思路参考 [cesium 地形压平](https://jishuzhan.net/article/1772824019855216642) 与 [Cesium 社区 terrain editing](https://community.cesium.com/t/terrain-editing-on-the-fly/9695/6)。\r\n\r\n## 原理\r\n\r\n1. 绘制压平区域（多边形/矩形，贴地拾点）\r\n2. 确定目标 **椭球高**（区域内最低 / 平均 / 绝对高度）\r\n3. 在 `terrainProvider.requestTileGeometry` 返回后拦截瓦片，对 `QuantizedMeshTerrainData` 顶点做 Loop 细分 + 高度改写\r\n4. `globe._surface.invalidateAllTiles()` 刷新地形\r\n\r\n## 前置条件\r\n\r\n- 有效的 **CesiumTerrainProvider**（非 `EllipsoidTerrainProvider`）\r\n- Demo 默认加载 `//data.mars3d.cn/terrain`\r\n\r\n## 主要参数\r\n\r\n| 选项 | 说明 |\r\n|------|------|\r\n| `floorReference` | `'min'` / `'mean'` / `'absolute'` |\r\n| `flattenHeight` | `absolute` 模式下的目标椭球高（米） |\r\n| `interiorGrid` | 采样网格密度（默认 10） |\r\n\r\n## API\r\n\r\n- `setRegionPositions(Cartesian3[])` — 至少 3 点\r\n- `apply()` — 异步，注册压平区并刷新瓦片\r\n- `clear()` — 移除压平区并刷新\r\n- `destroy()`\r\n\r\n## 文件\r\n\r\n- `index.js` — 对外 `TerrainFlatten` 类\r\n- `terrainProviderEdit.js` — 瓦片过滤与顶点修改\r\n- `loopSubdivision.js` — 边缘细分\r\n\r\n## 限制\r\n\r\n- 仅支持 **QuantizedMesh** 地形瓦片\r\n- 依赖 Cesium 内部 `globe._surface.invalidateAllTiles` 刷新（与文章一致）\r\n- 压平边界在粗 LOD 下可能略有锯齿，高 LOD（level≥15）会细分改善\r\n",Zf="# TerrainUplift（地形抬升）\r\n\r\n对齐 Mars3D `TerrainUplift` + `PitEntity` / `Pit` 的 Globe 地形抬升能力：在绘制区域内裁剪原地形，用侧壁 + 顶面几何体模拟“整块地形抬起”。\r\n\r\n## 工作原理\r\n\r\n```mermaid\r\nflowchart TB\r\n  subgraph input [输入]\r\n    P[绘制多边形/矩形顶点]\r\n  end\r\n  subgraph core [核心]\r\n    S[边界密采样 + sampleTerrainMostDetailed]\r\n    C[Globe ClippingPolygon 裁掉区域内原地形]\r\n    D[开挖 down：坑壁 + 坑底]\r\n    U[抬升 up：侧壁 Wall + 顶面三角网]\r\n  end\r\n  subgraph top [顶面纹理]\r\n    I[拼接 Viewer 全部可见影像层]\r\n    R[裁剪到多边形测地外包矩形]\r\n    UV[顶点 UV = 经纬在矩形内归一化]\r\n  end\r\n  P --> S --> C\r\n  S --> D\r\n  S --> U\r\n  U --> I --> R --> UV\r\n```\r\n\r\n1. **Globe 裁剪**：`ClippingPolygonCollection` 裁掉区域内原地形，避免与抬升块重叠。\r\n2. **开挖（down，可选）**：`Wall` 从坑底到原地形高 + 坑底贴图（`excavationDepth`）。\r\n3. **抬升（up）**：`Wall` 从 `坑底+抬升量` 到 `地形+抬升量`；**顶面**为与侧壁同边界的 `PolygonGeometry` + 拼接底图。\r\n4. **动画**：Entity 模式用 `CallbackProperty` 更新墙高并节流重建顶面；Primitive 模式整区重建几何。\r\n\r\n## 顶面纹理说明（重要）\r\n\r\n### 与 Mars3D 为何体验不同\r\n\r\n对照 `output1/deobfuscated.js`：\r\n\r\n| | Mars3D | 本项目 |\r\n|---|--------|--------|\r\n| 顶面影像 | `marsOptions.uplift` 改 **Globe 地形着色器**，直接用已加载瓦片 | 未改内核；HTTP 拼接底图贴到顶面 Primitive |\r\n| 顶面 mesh | **无**；仅 `PitEntity` 侧壁/坑底 | 与侧壁同 `splitNum` 的墙环 `PolygonGeometry` |\r\n| 动画 | 改 `analysisOptions.height`，Globe 即时重绘 | 先出几何（纯色），影像异步换上 |\r\n\r\n`createCroppingRangeTexture` 画的是**抬升高度掩膜**（黑底），不是卫星图。\r\n\r\n### 实现步骤\r\n\r\n| 步骤 | 说明 |\r\n|------|------|\r\n| 顶面边界 | `pitData.wallPositions` + `terrainHeights`（与侧壁一致，避免网格锯齿空洞） |\r\n| 影像 | UrlTemplate → `requestImage` → OSM；`cropImageryPackToRectangle` 对齐 UV |\r\n| 加载策略 | `skipImageryLoad` 先显几何，`_loadTopCapImageryAsync` 后换材质 |\r\n\r\n### 排查\r\n\r\n1. **先绿后无图**：默认 Cesium Ion 底图无 URL 模板，瓦片拼接常失败；已增加**当前画面截图**回退。请刷新后重试，抬升后应短暂绿色再变为卫星图。\r\n2. 截图前会暂时隐藏绿色顶面，避免把纯色盖进纹理。\r\n3. 量化地形 + WebGL2 裁剪。\r\n4. 若一直绿色：区域不在当前视野内、或 `preserveDrawingBuffer` 未开启（Map 模块已默认开启）。\r\n5. `textureFlipV: true` 可修正上下颠倒。\r\n\r\n## 渲染模式\r\n\r\n| `renderMode` | 说明 |\r\n|--------------|------|\r\n| `'entity'`（默认） | 侧壁 `Entity.wall` + `CallbackProperty` 动画；顶面仍为 `Primitive` |\r\n| `'primitive'` | 全部为 `WallGeometry` + `Primitive`，动画时整区重建 |\r\n\r\n## 构造参数\r\n\r\n| 选项 | 类型 | 默认 | 说明 |\r\n|------|------|------|------|\r\n| `upliftHeight` | `number` | `500` | 抬升高度（米） |\r\n| `excavationDepth` | `number` | `50` | 开挖深度（米） |\r\n| `excavate` | `boolean` | `true` | 是否显示开挖坑 |\r\n| `useImageryTexture` | `boolean` | `true` | 顶面是否拼接底图 |\r\n| `imageryMaxPixels` | `number` | `1536` | 顶面影像拼接最大边长 |\r\n| `textureFlipV` | `boolean` | `false` | 顶面 UV 的 v 是否 `1-v` |\r\n| `splitNum` | `number` | `80` | 边界/内部网格密度 |\r\n| `renderMode` | `'entity' \\| 'primitive'` | `'entity'` | 渲染模式 |\r\n| `animationDurationMs` | `number` | `2000` | 默认动画时长 |\r\n\r\n## API 摘要\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js'\r\n\r\nconst tool = new cim3d.Tool.TerrainUplift(viewer, {\r\n  upliftHeight: 1000,\r\n  excavationDepth: 50,\r\n  excavate: true,\r\n  renderMode: 'entity',\r\n  splitNum: 40,\r\n  useImageryTexture: true,\r\n  imageryMaxPixels: 1536,\r\n})\r\n\r\nconst id = tool.addRegion(positions, { name: '抬升区域1' })\r\nawait tool.animateRegion(id, 'ascend')   // 上升\r\nawait tool.animateRegion(id, 'descend') // 回落\r\nawait tool.applyRegion(id)             // 立即抬升到目标高度\r\ntool.clearAll()\r\ntool.destroy()\r\n```\r\n\r\n## 文件结构\r\n\r\n| 文件 | 职责 |\r\n|------|------|\r\n| `index.js` | 对外 `TerrainUplift` 类：区域管理、裁剪、动画 |\r\n| `terrainPitCore.js` | 坑壁数据、高度计算、顶面构建与材质 |\r\n| `terrainMeshUtils.js` | 影像拼接、earcut 顶面、地形网格采样 |\r\n| `regionRenderers.js` | Entity / Primitive 两种渲染器 |\r\n\r\n## 演示页面\r\n\r\n`src/widgets/ToolTerrainUplift/index.vue`（路由见 `api/treeData/mock.js` → `ToolTerrainUplift`）。\r\n\r\n## 环境要求\r\n\r\n- 量化地形（如 `CesiumTerrainProvider`）\r\n- WebGL2（`ClippingPolygonCollection`）\r\n- 建议开启 `globe.depthTestAgainstTerrain`\r\n",Qf="# TerrainUplift1（Mars3D 对齐版地形抬升）\r\n\r\n本目录为 **Mars3D `thing.TerrainUplift` / `TerrainUpliftTileset`** 的迁移与对齐实现，与 [`../TerrainUplift`](../TerrainUplift/README.md) 并存：\r\n\r\n| 模块 | 路径 | 定位 |\r\n|------|------|------|\r\n| **TerrainUplift** | `Tool/TerrainUplift/` | 项目主推：完整 Globe 抬升 + 顶面影像拼接 + 演示页 |\r\n| **TerrainUplift1** | `Tool/TerrainUplift1/` | Mars3D API 命名兼容 + 3D Tiles 抬升骨架（依赖 mars3d-cesium） |\r\n\r\n当前 **可直接用于生产演示的是 Globe 路径**（`TerrainUplift.js`）；**3D Tiles 路径为骨架代码**，需接入 `mars3d-cesium` 并补全 Shader / 纹理逻辑后方可使用。\r\n\r\n---\r\n\r\n## 能力划分\r\n\r\n```mermaid\r\nflowchart LR\r\n  subgraph globe [Globe 地形抬升 — 可用]\r\n    TU[TerrainUplift.js]\r\n    CORE[../TerrainUplift/terrainPitCore.js]\r\n    REN[../TerrainUplift/regionRenderers.js]\r\n    TU --> CORE\r\n    TU --> REN\r\n  end\r\n  subgraph tileset [3D Tiles 抬升 — 骨架]\r\n    TUT[TerrainUpliftTileset.js]\r\n    TEB[TilesetEditBase.js]\r\n    BT[BaseThing.js]\r\n    TUT --> TEB\r\n    TEB --> BT\r\n  end\r\n```\r\n\r\n### 1. Globe 地形抬升（`TerrainUplift.js`）\r\n\r\n与 `TerrainUplift` 共用核心实现，在绘制多边形区域内：\r\n\r\n1. **`ClippingPolygonCollection`** 裁剪区域内原 Globe 地形  \r\n2. **开挖（down）**：坑壁 `Wall` + 坑底（`excavate` / `excavationDepth`）  \r\n3. **抬升（up）**：侧壁 + 顶面 `PolygonGeometry`（顶面影像拼接逻辑见 `TerrainUplift` README）  \r\n4. **动画**：`entity` 模式用 `CallbackProperty` 更新墙高并节流重建顶面；`primitive` 模式按帧整区重建  \r\n\r\n**与 `TerrainUplift` 的差异（Mars3D 兼容层）：**\r\n\r\n| 能力 | TerrainUplift | TerrainUplift1 |\r\n|------|---------------|----------------|\r\n| 抬升高度选项名 | `upliftHeight` | `upliftHeight` + **`upHeight`**（属性读写） |\r\n| 添加区域 | `addRegion` | **`addArea`**（返回 `{ id }`）+ `addRegion` |\r\n| 开挖深度 | `excavationDepth` | `excavationDepth` + Mars3D **`diffHeight`** |\r\n| 清除 | `clearAll` | **`clear()`** 别名 + `clearAll` |\r\n| 动画 | `animateRegion(id, 'ascend'\\|'descend')` | **`movingAnimation(start, end, timeSec, regionId)`** |\r\n| 显示抬升块 | 始终按 offset 显示 | **`showUp`**：为 `false` 时强制 offset=0 |\r\n| 构造时批量区域 | — | **`options.area`**：`[{ positions, ... }]` |\r\n| 顶面影像参数 | `imageryMaxPixels`、`textureFlipV` 等 | 未在构造选项暴露（沿用共享 renderer 默认） |\r\n\r\n### 2. 3D Tiles 抬升（`TerrainUpliftTileset.js` + `TilesetEditBase.js`）\r\n\r\n对齐 Mars3D 在 **倾斜摄影 / 3D Tiles 图层** 上通过 **CustomShader + 区域纹理** 做抬升的思路：\r\n\r\n- `TilesetEditBase`：区域列表、`addArea`、图层 `readyPromise` 后建立 ENU 局部坐标、重写 `tileset.update` 注入 `customShaders.uplift`\r\n- `TerrainUpliftTileset`：读取 `layer.options.uplift`（`color` / `height` / `intensity` / `useNormal` / `excludeAreas`）\r\n\r\n**当前状态（接入前请勿依赖）：**\r\n\r\n- 构造时检测 **`mars3d-cesium`**（`isMars3DCesium`、`Cesium.Mars3DEx`），标准 Cesium 会报错提示  \r\n- `_createTexture`、`_getCustomShader` 等 **为空实现或占位 Shader**  \r\n- `TilesetEditBase.js` 引用 `LngLatArray`、`EventType`、`simplifyPositions` 等 Mars3D 工具，**未在本仓库单独实现**  \r\n- `BaseClass.js` 为空文件，`BaseThing` 继承链在独立运行前需补全 `BaseClass`\r\n\r\n---\r\n\r\n## Globe 路径：工作原理（简述）\r\n\r\n与 [`../TerrainUplift/README.md`](../TerrainUplift/README.md) 一致，此处仅摘要：\r\n\r\n1. 边界密采样 + `sampleTerrainMostDetailed` 得坑壁环高度  \r\n2. Globe 多边形裁剪隐藏原地形  \r\n3. 侧壁高度随 `currentOffset`（0 → `upliftHeight`）变化  \r\n4. 顶面与侧壁同 `splitNum`，影像由 `regionRenderers` 异步拼接（非 mars3d 内核着色器抬升）\r\n\r\n---\r\n\r\n## 构造参数（Globe — `TerrainUplift.js`）\r\n\r\n| 选项 | 类型 | 默认 | 说明 |\r\n|------|------|------|------|\r\n| `upliftHeight` / `upHeight` | `number` | `500` | 目标抬升高度（米） |\r\n| `excavationDepth` | `number` | `50` | 开挖深度（米）；`addArea` 可用 `diffHeight` |\r\n| `excavate` | `boolean` | `true` | 是否绘制开挖坑体 |\r\n| `useImageryTexture` | `boolean` | `true` | 顶面是否拼接 Viewer 可见底图 |\r\n| `splitNum` | `number` | `80` | 边界/墙环插值密度（≥20） |\r\n| `renderMode` | `'entity' \\| 'primitive'` | `'entity'` | 渲染模式 |\r\n| `animationDurationMs` | `number` | `2000` | `animateRegion` 默认时长 |\r\n| `showUp` | `boolean` | `true` | 为 `false` 时不显示抬升几何（offset 恒为 0） |\r\n| `area` | `object[]` | — | 初始区域 `{ positions, upHeight?, diffHeight?, ... }` |\r\n\r\n---\r\n\r\n## API 摘要（Globe）\r\n\r\n### 项目风格（与 TerrainUplift 一致）\r\n\r\n```js\r\nimport TerrainUplift from '@/sdk/Tool/TerrainUplift1/TerrainUplift.js'\r\n// 或接入 SDK 导出后：import * as cim3d from '@/sdk/index.js'\r\n\r\nconst tool = new TerrainUplift(viewer, {\r\n  upHeight: 800,\r\n  excavationDepth: 60,\r\n  excavate: true,\r\n  renderMode: 'entity',\r\n  splitNum: 60,\r\n  useImageryTexture: true,\r\n  showUp: true,\r\n})\r\n\r\nconst id = tool.addRegion(positions, { name: '抬升区 A' })\r\nawait tool.applyRegion(id)\r\nawait tool.animateRegion(id, 'ascend')\r\nawait tool.animateRegion(id, 'descend')\r\ntool.clearAll()\r\ntool.destroy()\r\n```\r\n\r\n### Mars3D 风格（别名）\r\n\r\n```js\r\nconst thing = new TerrainUplift(viewer, {\r\n  upHeight: 500,\r\n  area: [{ positions: polygonCartesians }],\r\n})\r\n\r\nthing.addArea(positions, { upHeight: 600, diffHeight: 40 })\r\nawait thing.movingAnimation(0, 500, 2) // startHeight, endHeight, 秒\r\nthing.upHeight = 700\r\nthing.clear()\r\n```\r\n\r\n### 常用方法\r\n\r\n| 方法 | 说明 |\r\n|------|------|\r\n| `addRegion` / `addArea` | 注册多边形区域（≥3 点） |\r\n| `applyRegion(id, offset?)` | 立即应用到指定抬升高度 |\r\n| `applyAll()` | 所有区域抬升到各自 `upliftHeight` |\r\n| `animateRegion(id, 'ascend' \\| 'descend', { durationMs })` | 缓动动画 |\r\n| `movingAnimation(start, end, timeSec, regionId?)` | Mars3D 高度区间动画 |\r\n| `setUpliftHeight` / `upHeight` setter | 修改目标高度 |\r\n| `setExcavationDepth` / `setExcavate` | 修改开挖参数（已应用区域会重建） |\r\n| `setRegionVisible` / `updateRegionPositions` | 显隐与更新边界 |\r\n| `getRegions` / `getRegionPositions` | 查询 |\r\n| `clearRegion` / `clearAll` / `clear()` | 清除几何与裁剪 |\r\n| `destroy()` | 释放资源，恢复 `depthTestAgainstTerrain`（若本实例开启过） |\r\n\r\n返回值：`applyRegion` / `animateRegion` / `movingAnimation` 等返回 `{ success: boolean, message?: string }`。\r\n\r\n---\r\n\r\n## 3D Tiles 路径：规划 API（骨架）\r\n\r\n```js\r\nimport { TerrainUpliftTileset } from '@/sdk/Tool/TerrainUplift1/TerrainUpliftTileset.js'\r\n\r\n// 需 Mars3D 图层对象（含 tileset、options.uplift、_marsOptions.customShaders）\r\nconst uplift = new TerrainUpliftTileset({\r\n  layer: mars3dTilesetLayer,\r\n  color: '#00ff00',\r\n  height: 10,\r\n  intensity: 1,\r\n  precise: true,\r\n})\r\n\r\nuplift.addArea(positions, { height: 15 })\r\nuplift.setHeight(20)\r\nuplift.setColor('#ff0000')\r\nuplift.clear()\r\n```\r\n\r\n图层配置示例（Mars3D 惯例）：\r\n\r\n```js\r\n{\r\n  type: '3dtiles',\r\n  url: '.../tileset.json',\r\n  uplift: {\r\n    color: '#00ff00',\r\n    height: 10,\r\n    intensity: 1,\r\n    useNormal: false,\r\n    excludeAreas: [],\r\n  },\r\n}\r\n```\r\n\r\n---\r\n\r\n## 文件结构\r\n\r\n| 文件 | 职责 |\r\n|------|------|\r\n| `TerrainUplift.js` | **Globe 抬升主类**；Mars3D API 别名；复用 `../TerrainUplift/*` 核心 |\r\n| `TerrainUpliftTileset.js` | 3D Tiles 抬升子类（CustomShader key: `uplift`） |\r\n| `TilesetEditBase.js` | 3D Tiles 区域编辑基类（Shader 注入、纹理更新钩子） |\r\n| `BaseThing.js` | Mars3D `BaseThing` 移植（事件、生命周期、`addTo(map)`） |\r\n| `BaseClass.js` | 占位，待补 `BaseClass` 后 `BaseThing` 方可独立运行 |\r\n\r\n**共享依赖（Globe 渲染）：**\r\n\r\n| 依赖 | 说明 |\r\n|------|------|\r\n| `../TerrainUplift/terrainPitCore.js` | 坑壁采样、`computeUpliftHeights`、顶面构建 |\r\n| `../TerrainUplift/regionRenderers.js` | `UpliftRegionEntityRenderer` / `UpliftRegionPrimitiveRenderer` |\r\n\r\n---\r\n\r\n## 环境要求（Globe）\r\n\r\n- **量化地形**（`CesiumTerrainProvider` 等，不可用纯 `EllipsoidTerrainProvider`）\r\n- **WebGL2**（`ClippingPolygonCollection.isSupported`）\r\n- 建议 `globe.depthTestAgainstTerrain = true`（构造时会自动开启并可在 `destroy` 时还原）\r\n- 构造时将 `scene.verticalExaggeration` 从 `1` 微调为 `1.001`（与 Mars3D 行为一致，避免部分深度问题）\r\n\r\n---\r\n\r\n## 演示与接入\r\n\r\n- 当前演示页使用 **`Tool/TerrainUplift`**：`src/widgets/ToolTerrainUplift/index.vue`（菜单 `ToolTerrainUplift`）\r\n- **TerrainUplift1** 尚未在 `src/sdk/Tool/index.js` 导出；若要在业务中启用 Mars3D 命名，可：\r\n\r\n```js\r\n// src/sdk/Tool/index.js\r\nimport TerrainUpliftMars from './TerrainUplift1/TerrainUplift.js'\r\n// Tool: { ..., TerrainUpliftMars }\r\n```\r\n\r\n或在组件内直接 `import TerrainUplift from '@/sdk/Tool/TerrainUplift1/TerrainUplift.js'`。\r\n\r\n---\r\n\r\n## 选型建议\r\n\r\n| 场景 | 推荐 |\r\n|------|------|\r\n| 新项目、要完整文档与顶面影像参数 | `Tool/TerrainUplift` |\r\n| 从 Mars3D 示例迁移、`upHeight` / `addArea` / `movingAnimation` | `Tool/TerrainUplift1/TerrainUplift.js` |\r\n| 倾斜摄影 / 3D Tiles 整体抬升（Shader） | 待补全 `TerrainUpliftTileset` + **mars3d-cesium** |\r\n\r\n---\r\n\r\n## 后续工作（3D Tiles 路径）\r\n\r\n1. 补全 `BaseClass.js` 或改为不依赖空基类  \r\n2. 实现 `TilesetEditBase` 所需的坐标/事件工具，或从 mars3d 包复用  \r\n3. 完成 `_createTexture` / `_getCustomShader`（参考 Mars3D `output/deobfuscated.js` 中 uplift 逻辑）  \r\n4. 在 SDK `Tool` 命名空间中导出 `TerrainUpliftTileset` 并增加独立 demo（可选）\r\n",Jf="# TilesetClippingDig（地质挖孔 · Clipping 侧壁）\r\n\r\n对齐 `etop` 归档钻孔效果：用 **ClippingPolygon** 竖直掏空 3D Tiles，再沿足迹环做向下射线分层，生成侧壁 wall + 底面，可选抽出岩芯。\r\n\r\n与 `TilesetDigHole`（CustomShader discard）并列；本模块开孔更接近原 demo 观感。\r\n\r\n## 原理\r\n\r\n1. 足迹：圆（ENU 正多边形）/ 多边形 / 矩形（边加密后采样）。\r\n2. `tileset.clippingPolygons` 叠加同一足迹，竖直贯通裁剪。\r\n3. 环上 `drillPickFromRay` 收集层高；侧壁色优先业务色表 / `resolveColor`，**无色表时从 b3dm 贴图名或 baseColorFactor 自动抠色**，再弱兜底 `readPixels`。\r\n4. **每层一整圈** `Entity.wall` 做侧壁 + 扇形底面；`backFaceCulling = false`。\r\n5. 抽出岩芯：标尺（埋深）+ 标注（厚度 / 埋深 / 高程）。\r\n\r\n## 侧壁颜色（生产怎么说、怎么接）\r\n\r\n| 能力 | 是否依赖色表 |\r\n|------|----------------|\r\n| 裁剪开孔、层高采样、侧壁几何、岩芯厚度/埋深 | **否** |\r\n| 侧壁「跟模型一致」的材质色 | **优先自动抠**；色表仍可用作覆盖 |\r\n\r\n**当前默认（验证无色表）**：不读 `materials.json`；挖孔后从命中 `b3dm` 抠色；侧壁**按采样点分段**上色，保留「同一深度环上材质不同」。\r\n\r\n**限制**：若材质是复杂花纹贴图且文件名不含 RGBA、也无 baseColorFactor，自动抠色会不准，这时仍需业务色表 / `resolveColor`。\r\n\r\n也可继续注入色表覆盖：\r\n\r\n```js\r\ntool.setTileset(tileset, layerId, { materialsMap: paletteFromBackend })\r\nawait tool.setMaterialsUrl(layerId, '/api/layers/xxx/materials')\r\n```\r\n\r\n## 用法\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js'\r\n\r\nconst tool = new cim3d.Tool.TilesetClippingDig(viewer, { digDepthMeters: 80 })\r\ntool.setTileset(tileset, 'gongcheng', { materialsMap: paletteFromBackend })\r\ntool.setRegionByPositions(polygonPositions, 'polygon')\r\nconst res = await tool.applyAsync()\r\nif (res.success) {\r\n  await tool.flyIntoHole()\r\n  tool.toggleExtractedCore()\r\n}\r\ntool.destroy()\r\n```\r\n\r\n## 主要 API\r\n\r\n| 方法 | 说明 |\r\n|------|------|\r\n| `setTileset` / `registerTileset` | 绑定模型；第三参可带 `materialsMap` / `materialsUrl` |\r\n| `setMaterialsMap` / `setMaterialsUrl` | 业务注入色表（与 tileset 文件解耦） |\r\n| `setRegionByPositions` / `setCircleRegion` | 足迹（圆 / 多边形 / 矩形） |\r\n| `setDigDepth` | 下挖深度 |\r\n| `apply` / `applyAsync` | 同步 / 异步挖孔 |\r\n| `toggleExtractedCore` | 抽出/收回岩芯 |\r\n| `flyIntoHole` / `clearEffect` / `clearRegion` / `destroy` | 漫游与清理 |\r\n\r\n构造可选：`wallStyleMode: 'accurate'|'smooth'`（偏真/偏好看）、`resolveColor`、`materialsMap`、`materialsUrl`、`autoLoadSiblingMaterials`。\r\n\r\n## 性能要点\r\n\r\n- 环向采样默认约 **120**；`drillPick` 上限 24。\r\n- **偏真**：分段上色；**偏好看**：材质整圈对齐 + 连续墙。\r\n- 采样分批让出主线程；岩芯标注以厚度 / 埋深 / 高程为主。\r\n\r\n## 演示\r\n\r\n`src/widgets/ToolTilesetClippingDig`（菜单「地质挖孔(裁剪侧壁)」）。\r\n\r\n需要 **WebGL2**（`ClippingPolygonCollection.isSupported`）。\r\n",tm="# TilesetDigHole（3D Tiles 地质挖孔）\r\n\r\n在 **Cesium3DTileset**（典型为多层地质体）上按水平足迹挖竖直孔洞，片元 `discard` 后可看到内部结构，并支持相机飞入孔内漫游。\r\n\r\n## 原理\r\n\r\n1. 足迹投影到 tileset 包围球中心 **ENU** 水平面（东-北）。\r\n2. 多边形 / 矩形：`earcut` 三角化；圆形：着色器内 `distance <= radius`。\r\n3. **CustomShader** 片段：若片元在足迹内且 ENU 高度位于 `[digBottomZ, digTopZ]`，则 `discard`。\r\n4. **`digTopZ` 取绘制拾取点的地表最大高**（+ `topOffsetMeters`），再 `digBottomZ = digTopZ - digDepthMeters`。  \r\n   不用包围球顶：地质模型水平跨度大时球顶远高于真实地表，会导致「执行了挖孔但表面仍完整」。\r\n5. 挖孔时可选关闭 `backFaceCulling`，便于观察内壁。\r\n\r\n## 用法\r\n\r\n```js\r\nimport * as cim3d from '@/sdk/index.js'\r\n\r\nconst tool = new cim3d.Tool.TilesetDigHole(viewer, { digDepthMeters: 80 })\r\ntool.setTileset(tileset)\r\ntool.setRegionByPositions(polygonPositions, 'polygon')\r\n// 或圆形：\r\n// tool.setCircleRegion(centerCartesian3, 40)\r\nconst res = tool.apply()\r\nif (res.success) await tool.flyIntoHole()\r\ntool.clearEffect()\r\ntool.destroy()\r\n```\r\n\r\n## 主要 API\r\n\r\n| 方法 | 说明 |\r\n|------|------|\r\n| `setTileset(tileset)` | 指定目标模型 |\r\n| `listTilesets()` | 列出场景中已加载的 tileset |\r\n| `setRegionByPositions(positions, 'polygon'\\|'rectangle')` | 多边形/矩形足迹（请传带地表高程的拾取点） |\r\n| `setCircleRegion(center, radiusMeters)` | 圆形足迹 |\r\n| `setDigDepth(meters)` | 下挖深度（已应用时可热更新底面） |\r\n| `apply()` | 执行挖孔 |\r\n| `flyIntoHole()` | 飞入孔内中心 |\r\n| `clearEffect()` / `clearRegion()` / `destroy()` | 清除效果 / 区域 / 销毁 |\r\n\r\n## 演示\r\n\r\n`src/widgets/ToolTilesetDigHole`（菜单「地质模型挖孔」）。开发态通过 `/geo-tilesets/...` 映射 `VITE_GEO_TILESET_DIR`（默认 `D:/Project/etop/归档/public/tilesets`）。\r\n",rm=`# Compass Control - 罗盘控件\r
\r
## 📖 功能概述\r
\r
Compass Control 是一个功能丰富的 Cesium 三维场景罗盘控件，提供实时的相机姿态可视化，包括：\r
\r
- **方位角（Heading）**：通过旋转的指北针显示相机朝向\r
- **俯仰角（Pitch）**：通过内圈弧形指示器和数值显示相机俯仰角度\r
- **交互控制**：支持拖拽罗盘直接调整相机视角\r
- **一键复位**：点击罗盘快速将相机朝向重置为正北方向\r
\r
## ✨ 核心特性\r
\r
### 1. 双重角度显示\r
\r
#### 方位角指示器（Heading）\r
- 🔴 **红色指北针**：实时跟随相机 heading 角度旋转\r
- ⭕ **外圈刻度盘**：36个刻度线，每10°一个标记\r
- 🧭 **方向标记**：N（北）、S（南）、E（东）、W（西）固定显示\r
\r
#### 俯仰角指示器（Pitch）\r
- 🔵 **青色弧线**：在内圈显示当前俯仰角度\r
- 🔢 **数值显示**：精确到整数度的 pitch 值\r
- 💡 **动态亮度**：根据角度绝对值调整颜色强度\r
\r
### 2. 智能交互\r
\r
- **拖拽旋转**：按住罗盘拖动可直观调整相机朝向\r
- **点击复位**：单击罗盘中心将 heading 重置为 0°（正北）\r
- **自动跟随**：相机变化时罗盘自动更新（默认开启）\r
- **防误触**：区分拖拽和点击操作\r
\r
### 3. 视觉设计\r
\r
- 🎨 **现代UI**：毛玻璃效果 + 渐变背景\r
- 🌈 **配色方案**：红色指北针 + 青色俯仰角，对比鲜明\r
- ⚡ **流畅动画**：0.08s 缓动过渡，响应迅速\r
- 📱 **触控友好**：支持鼠标和触摸设备\r
\r
## 🛠️ 技术架构\r
\r
### 类结构\r
\r
\`\`\`javascript\r
class CompassControl {\r
  constructor(mapOrViewer)\r
  \r
  // 公共方法\r
  show(options)        // 显示罗盘\r
  hide()               // 隐藏罗盘\r
  setVisible(visible)  // 设置可见性\r
  setPosition(position)// 设置位置\r
  destroy()            // 销毁控件\r
  \r
  // 内部方法\r
  _updateHeading()     // 更新方位角显示\r
  _updatePitch()       // 更新俯仰角显示\r
  _onPointerDown()     // 处理按下事件\r
  _onPointerMove()     // 处理移动事件\r
  _onPointerUp()       // 处理释放事件\r
}\r
\`\`\`\r
\r
### 依赖关系\r
\r
\`\`\`\r
CompassControl\r
├── Cesium.js (相机控制)\r
├── DOM API (元素创建与操作)\r
└── CSS (样式与动画)\r
\`\`\`\r
\r
## 📦 安装与使用\r
\r
### 基础用法\r
\r
\`\`\`javascript\r
import CompassControl from '@/sdk/Control/Compass'\r
\r
// 1. 创建罗盘实例\r
const compass = new CompassControl(viewer)\r
\r
// 2. 显示罗盘（使用默认配置）\r
compass.show()\r
\r
// 3. 自定义配置\r
compass.show({\r
  position: 'top-right',\r
  size: 80,\r
  autoRotate: true,\r
  northColor: '#ff4e4e'\r
})\r
\`\`\`\r
\r
### 完整示例\r
\r
\`\`\`vue\r
<script setup>\r
import { ref, onMounted, onBeforeUnmount } from 'vue'\r
import * as Cesium from 'cesium'\r
import CompassControl from '@/sdk/Control/Compass'\r
\r
let viewer = null\r
let compass = null\r
\r
onMounted(() => {\r
  // 初始化 Cesium Viewer\r
  viewer = new Cesium.Viewer('cesiumContainer')\r
  \r
  // 创建并显示罗盘\r
  compass = new CompassControl(viewer)\r
  compass.show({\r
    position: 'top-right',\r
    size: 90,\r
    background: 'rgba(14, 23, 38, 0.85)',\r
    borderColor: 'rgba(255, 255, 255, 0.2)',\r
    northColor: '#ff4e4e',\r
    textColor: '#ffffff',\r
    autoRotate: true,\r
    resetHeadingOnClick: true\r
  })\r
})\r
\r
onBeforeUnmount(() => {\r
  // 清理资源\r
  if (compass) {\r
    compass.destroy()\r
    compass = null\r
  }\r
  if (viewer) {\r
    viewer.destroy()\r
    viewer = null\r
  }\r
})\r
<\/script>\r
\r
<template>\r
  <div id="cesiumContainer"></div>\r
</template>\r
\`\`\`\r
\r
## ⚙️ 配置参数\r
\r
### show(options) 参数说明\r
\r
| 参数 | 类型 | 默认值 | 说明 |\r
|------|------|--------|------|\r
| \`position\` | String | \`'top-right'\` | 罗盘位置：\`'top-left'\`, \`'top-right'\`, \`'bottom-left'\`, \`'bottom-right'\` |\r
| \`size\` | Number | \`80\` | 罗盘直径（像素） |\r
| \`background\` | String | \`'rgba(14, 23, 38, 0.82)'\` | 背景颜色（支持透明度） |\r
| \`borderColor\` | String | \`'rgba(255, 255, 255, 0.15)'\` | 边框颜色 |\r
| \`northColor\` | String | \`'#ff4e4e'\` | 指北针颜色 |\r
| \`textColor\` | String | \`'#ffffff'\` | 文字颜色 |\r
| \`autoRotate\` | Boolean | \`true\` | 是否自动跟随相机旋转 |\r
| \`resetHeadingOnClick\` | Boolean | \`true\` | 点击是否重置 heading 为 0 |\r
\r
### 配置示例\r
\r
\`\`\`javascript\r
// 示例 1: 左上角小尺寸罗盘\r
compass.show({\r
  position: 'top-left',\r
  size: 60,\r
  background: 'rgba(0, 0, 0, 0.6)'\r
})\r
\r
// 示例 2: 右下角大尺寸罗盘\r
compass.show({\r
  position: 'bottom-right',\r
  size: 100,\r
  northColor: '#00ff00',  // 绿色指北针\r
  textColor: '#ffff00'     // 黄色文字\r
})\r
\r
// 示例 3: 禁用自动旋转（手动控制）\r
compass.show({\r
  autoRotate: false,\r
  resetHeadingOnClick: false\r
})\r
\`\`\`\r
\r
## 🎮 API 参考\r
\r
### 构造方法\r
\r
#### \`new CompassControl(mapOrViewer)\`\r
\r
创建罗盘控件实例。\r
\r
**参数**：\r
- \`mapOrViewer\`: Cesium Viewer 实例或包含 \`getViewer()\` 方法的对象\r
\r
**示例**：\r
\`\`\`javascript\r
const compass = new CompassControl(viewer)\r
\`\`\`\r
\r
### 公共方法\r
\r
#### \`show(options = {})\`\r
\r
显示罗盘控件。\r
\r
**参数**：\r
- \`options\`: 配置对象（可选）\r
\r
**返回**：\`this\`（支持链式调用）\r
\r
**示例**：\r
\`\`\`javascript\r
compass.show({ position: 'top-right' })\r
\`\`\`\r
\r
#### \`hide()\`\r
\r
隐藏罗盘控件（不销毁）。\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
compass.hide()\r
\`\`\`\r
\r
#### \`setVisible(visible)\`\r
\r
设置罗盘可见性。\r
\r
**参数**：\r
- \`visible\`: Boolean，是否可见\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
compass.setVisible(true)   // 显示\r
compass.setVisible(false)  // 隐藏\r
\`\`\`\r
\r
#### \`setPosition(position)\`\r
\r
动态调整罗盘位置。\r
\r
**参数**：\r
- \`position\`: String，位置标识\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
compass.setPosition('bottom-left')\r
\`\`\`\r
\r
#### \`destroy()\`\r
\r
销毁罗盘控件，清理所有资源和事件监听器。\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
compass.destroy()\r
\`\`\`\r
\r
## 🎨 视觉效果详解\r
\r
### 罗盘结构\r
\r
\`\`\`\r
        N              ← 方向标记（固定）\r
     ╱│╲\r
   ╱  │  ╲            ← 外圈刻度盘（36个刻度）\r
  │   ▲   │           ← 红色指北针（随 heading 旋转）\r
  │   │   │\r
   ╲  │  ╱\r
     ╲│╱\r
        S\r
\r
      [●]             ← 青色弧线（随 pitch 旋转）\r
                      ← 俯仰角数值显示\r
       北              ← 标题\r
\`\`\`\r
\r
### 角度映射关系\r
\r
#### Heading（方位角）\r
\`\`\`\r
相机 heading    指北针旋转角度\r
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\r
0° (正北)   →   0°   (指向正上方)\r
90° (正东)  →  -90°  (指向正左方)\r
180° (正南) → -180°  (指向正下方)\r
-90° (正西) →  90°   (指向正右方)\r
\r
公式：rotation = -heading\r
\`\`\`\r
\r
#### Pitch（俯仰角）\r
\`\`\`\r
相机 pitch    弧线位置      显示数值\r
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\r
-90° (垂直向下) → 顶部      -90°\r
  0° (水平向前) → 右侧        0°\r
 90° (垂直向上) → 底部       90°\r
\r
公式：pitchRotation = pitch + 90\r
范围：0° ~ 180°\r
\`\`\`\r
\r
### 动态效果\r
\r
#### 颜色强度变化\r
\`\`\`javascript\r
// 根据 pitch 绝对值调整弧线亮度\r
const intensity = Math.abs(pitch) / 90\r
opacity = 0.4 + intensity * 0.6\r
\r
// 示例：\r
// pitch = 0°   → opacity = 0.4 (较暗)\r
// pitch = ±45° → opacity = 0.7 (中等)\r
// pitch = ±90° → opacity = 1.0 (最亮)\r
\`\`\`\r
\r
#### 动画过渡\r
\`\`\`css\r
transition: transform 0.08s ease-out;\r
\`\`\`\r
- 快速响应（80ms）\r
- 缓出效果（ease-out）\r
- 平滑自然，无卡顿\r
\r
## 🔧 高级用法\r
\r
### 1. 手动控制更新\r
\r
\`\`\`javascript\r
// 禁用自动旋转\r
compass.show({ autoRotate: false })\r
\r
// 在需要时手动触发更新\r
function customUpdate() {\r
  compass._updateHeading()\r
}\r
\r
// 例如：在特定事件后更新\r
viewer.camera.flyTo({\r
  destination: Cesium.Cartesian3.fromDegrees(116.4, 39.9, 1000),\r
  complete: () => {\r
    customUpdate()\r
  }\r
})\r
\`\`\`\r
\r
### 2. 动态样式调整\r
\r
\`\`\`javascript\r
// 修改 CSS 变量\r
const compassEl = document.querySelector('.cim3d-control-compass')\r
if (compassEl) {\r
  compassEl.style.setProperty('--cim3d-compass-north-color', '#00ff00')\r
  compassEl.style.setProperty('--cim3d-compass-pitch-color', '#ff00ff')\r
}\r
\`\`\`\r
\r
### 3. 与其他控件组合\r
\r
\`\`\`javascript\r
import CompassControl from '@/sdk/Control/Compass'\r
import CoordinateDisplay from '@/sdk/Control/CoordinateDisplay'\r
\r
// 创建多个控件\r
const compass = new CompassControl(viewer)\r
const coordDisplay = new CoordinateDisplay(viewer)\r
\r
// 分别配置位置，避免重叠\r
compass.show({ position: 'top-right' })\r
coordDisplay.show({ position: 'bottom-left' })\r
\`\`\`\r
\r
### 4. 条件显示\r
\r
\`\`\`javascript\r
// 根据缩放级别显示/隐藏罗盘\r
viewer.camera.moveEnd.addEventListener(() => {\r
  const height = viewer.camera.positionCartographic.height\r
  if (height > 10000) {\r
    compass.hide()  // 高空隐藏\r
  } else {\r
    compass.show()  // 低空显示\r
  }\r
})\r
\`\`\`\r
\r
## 🐛 常见问题\r
\r
### Q1: 罗盘不跟随相机旋转？\r
\r
**A**: 检查以下配置：\r
\`\`\`javascript\r
compass.show({\r
  autoRotate: true  // 确保启用自动旋转\r
})\r
\r
// 检查是否有错误\r
console.log('Viewer:', viewer)\r
console.log('Camera:', viewer?.camera)\r
\`\`\`\r
\r
### Q2: 拖拽罗盘时相机不响应？\r
\r
**A**: 确认相机未被锁定：\r
\`\`\`javascript\r
// 检查相机控制是否启用\r
viewer.scene.screenSpaceCameraController.enableRotate = true\r
\`\`\`\r
\r
### Q3: 罗盘位置被其他元素遮挡？\r
\r
**A**: 调整 z-index：\r
\`\`\`css\r
.cim3d-control-compass {\r
  z-index: 10000 !important;  /* 提高层级 */\r
}\r
\`\`\`\r
\r
### Q4: 如何自定义颜色和样式？\r
\r
**A**: 通过配置参数或 CSS 变量：\r
\`\`\`javascript\r
// 方法 1: 配置参数\r
compass.show({\r
  northColor: '#00ff00',\r
  textColor: '#ffff00'\r
})\r
\r
// 方法 2: CSS 变量\r
document.documentElement.style.setProperty(\r
  '--cim3d-compass-pitch-color', \r
  '#ff00ff'\r
)\r
\`\`\`\r
\r
### Q5: 移动端触摸不灵敏？\r
\r
**A**: 调整罗盘大小：\r
\`\`\`javascript\r
compass.show({\r
  size: 100,  // 增大尺寸，更易触摸\r
  position: 'bottom-right'  // 放在右下角，便于单手操作\r
})\r
\`\`\`\r
\r
## 📊 性能优化\r
\r
### 1. 减少更新频率\r
\r
\`\`\`javascript\r
// 如果不需要实时更新，可以禁用 autoRotate\r
compass.show({ autoRotate: false })\r
\r
// 在需要时才手动更新\r
setInterval(() => {\r
  compass._updateHeading()\r
}, 100)  // 每 100ms 更新一次\r
\`\`\`\r
\r
### 2. 及时销毁\r
\r
\`\`\`javascript\r
// 组件卸载时务必销毁\r
onBeforeUnmount(() => {\r
  compass.destroy()\r
})\r
\`\`\`\r
\r
### 3. 避免重复创建\r
\r
\`\`\`javascript\r
// ❌ 错误：重复创建\r
function toggleCompass() {\r
  const compass = new CompassControl(viewer)  // 每次都新建\r
  compass.show()\r
}\r
\r
// ✅ 正确：复用实例\r
let compass = null\r
function toggleCompass() {\r
  if (!compass) {\r
    compass = new CompassControl(viewer)\r
  }\r
  compass.show()\r
}\r
\`\`\`\r
\r
## 🔄 更新日志\r
\r
### v2.0.0 (2026-04-01)\r
**新增功能**\r
- ✅ 添加俯仰角（Pitch）指示器\r
- ✅ 添加俯仰角数值显示\r
- ✅ 双重监听机制（postRender + camera.changed）\r
- ✅ 角度规范化处理\r
- ✅ 动态颜色强度调整\r
\r
**优化改进**\r
- ✅ 加快过渡动画（0.12s → 0.08s）\r
- ✅ 完善内存管理（清理所有监听器）\r
- ✅ 增强视觉效果（刻度盘 + 方向标记）\r
\r
### v1.0.0 (2024-xx-xx)\r
**初始版本**\r
- ✅ 基础罗盘功能\r
- ✅ 方位角（Heading）显示\r
- ✅ 拖拽交互\r
- ✅ 点击复位\r
\r
## 📚 相关资源\r
\r
- [Cesium Camera API](https://cesium.com/docs/cesiumjs-ref-doc/Camera.html)\r
- [Cesium Scene API](https://cesium.com/docs/cesiumjs-ref-doc/Scene.html)\r
- [CSS Transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)\r
- [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)\r
\r
## 📄 许可证\r
\r
本项目遵循项目整体许可证。\r
\r
---\r
\r
**作者**: luobr  \r
**创建日期**: 2024-xx-xx  \r
**最后更新**: 2026-04-01  \r
**版本**: v2.0.0\r
`,em=`# CoordinateDisplayControl 坐标显示控件\r
\r
## 概述\r
\r
\`CoordinateDisplayControl\` 是一个 Cesium 地图控件，用于实时显示鼠标位置、屏幕中心点和相机信息的坐标数据。该控件被封装在 SDK 的 Control 模块中，提供完整的坐标转换和显示功能。\r
\r
## 功能特性\r
\r
- **鼠标坐标显示**: 实时显示鼠标在地球表面位置的经纬度、高度和笛卡尔坐标\r
- **屏幕中心坐标**: 显示当前视口中心点的坐标信息\r
- **相机信息**: 显示相机的朝向角度（heading）、俯仰角度（pitch）、侧倾角度（roll）和高度\r
- **响应式设计**: 支持不同屏幕尺寸的自适应布局\r
- **可配置选项**: 支持显示内容的自定义配置\r
- **现代化UI**: 使用毛玻璃效果和现代化的视觉设计\r
\r
## 使用方法\r
\r
### 基本使用\r
\r
\`\`\`javascript\r
import { CoordinateDisplayControl } from '@/sdk/Control/index.js';\r
\r
// 创建控件实例\r
const coordinateControl = new CoordinateDisplayControl(viewer);\r
\r
// 显示控件\r
coordinateControl.show();\r
\r
// 隐藏控件\r
coordinateControl.hide();\r
\r
// 销毁控件\r
coordinateControl.destroy();\r
\`\`\`\r
\r
### 配置选项\r
\r
\`\`\`javascript\r
const options = {\r
  showMouseCoordinates: true,    // 显示鼠标坐标\r
  showCenterCoordinates: true,   // 显示中心坐标\r
  showCameraInfo: true,         // 显示相机信息\r
  coordinatePrecision: 6,       // 经纬度精度\r
  cartesianPrecision: 2,        // 笛卡尔坐标精度\r
  anglePrecision: 2             // 角度精度\r
};\r
\r
coordinateControl.show(options);\r
\`\`\`\r
\r
### 动态控制\r
\r
\`\`\`javascript\r
// 切换可见性\r
coordinateControl.setVisible(true/false);\r
\r
// 更新配置\r
coordinateControl.setOptions(newOptions);\r
\`\`\`\r
\r
## 显示内容\r
\r
控件在地图底部固定显示以下信息：\r
\r
### 鼠标坐标\r
- **鼠标经纬度**: 当前鼠标位置的经度、纬度\r
- **鼠标高度**: 当前鼠标位置的海拔高度（米）\r
- **鼠标笛卡尔**: 当前鼠标位置的笛卡尔坐标 (x, y, z)\r
\r
### 中心坐标\r
- **中心经纬度**: 屏幕中心点的经度、纬度\r
- **中心高度**: 屏幕中心点的高度\r
- **中心笛卡尔**: 屏幕中心点的笛卡尔坐标\r
\r
### 相机信息\r
- **相机朝向**: 相机朝向角度（度）\r
- **相机俯仰**: 相机俯仰角度（度）\r
- **相机侧倾**: 相机侧倾角度（度）\r
- **相机高度**: 相机的高度（米）\r
\r
## 技术实现\r
\r
- 使用 \`ScreenSpaceEventHandler\` 监听鼠标移动事件\r
- 使用 \`scene.pickPosition()\` 获取鼠标位置的笛卡尔坐标\r
- 使用 \`Cartographic.fromCartesian()\` 进行坐标转换\r
- 使用 \`postRender\` 事件实时更新中心点和相机信息\r
- 自动注入 CSS 样式，支持现代化UI设计\r
\r
## 兼容性\r
\r
- 支持 Vue 3 + Composition API\r
- 兼容 Cesium 1.115.0+\r
- 支持现代浏览器（Chrome, Firefox, Safari, Edge）\r
\r
## 示例\r
\r
查看 \`/mouseCoordinates\` 路由下的演示页面，该页面展示了如何在 Vue 组件中使用坐标显示控件，并提供了控制面板来动态配置显示选项。`,im=`# 鹰眼图控件 (Overview Control)\r
\r
## 功能说明\r
\r
鹰眼图控件用于显示当前地图在全球范围内的位置，并提供一个可拖动的矩形框来表示当前主地图的可视范围。用户可以通过拖动该矩形框来快速移动主地图的视角。\r
\r
## 主要特性\r
\r
- **全局视图**: 在小地图中显示全球范围的地图\r
- **范围指示**: 用矩形框实时显示主地图当前的可视范围\r
- **拖动定位**: 拖动矩形框可快速移动主地图到指定位置\r
- **自动同步**: 主地图视角变化时，范围指示器自动更新\r
- **主题适配**: 支持自定义主题样式\r
\r
## 使用方法\r
\r
### 基本用法\r
\r
\`\`\`javascript\r
import * as cim3d from '@/sdk/index.js'\r
\r
// 创建鹰眼图控件\r
const overview = new cim3d.Control.Overview(viewer)\r
\r
// 显示控件\r
overview.show()\r
\`\`\`\r
\r
### 自定义配置\r
\r
\`\`\`javascript\r
const overview = new cim3d.Control.Overview(viewer)\r
\r
overview.show({\r
  position: 'bottom-right',  // 位置：top-left, top-right, bottom-left, bottom-right\r
  width: 200,                // 宽度（像素）\r
  height: 150,               // 高度（像素）\r
})\r
\`\`\`\r
\r
### 动态调整大小\r
\r
\`\`\`javascript\r
// 调整鹰眼图大小\r
overview.setSize(250, 180)\r
\`\`\`\r
\r
### 显示/隐藏\r
\r
\`\`\`javascript\r
// 隐藏控件\r
overview.hide()\r
\r
// 显示控件\r
overview.show()\r
\r
// 设置可见性\r
overview.setVisible(true)  // 或 false\r
\`\`\`\r
\r
### 设置位置\r
\r
\`\`\`javascript\r
// 改变控件位置\r
overview.setPosition('bottom-left')\r
\`\`\`\r
\r
### 销毁控件\r
\r
\`\`\`javascript\r
// 销毁控件并释放资源\r
overview.destroy()\r
\`\`\`\r
\r
## API 参考\r
\r
### 构造函数\r
\r
\`\`\`javascript\r
new OverviewControl(viewer)\r
\`\`\`\r
\r
**参数:**\r
- \`viewer\`: Cesium Viewer 实例或包含 getViewer() 方法的对象\r
\r
### 方法\r
\r
#### show(options?)\r
\r
显示鹰眼图控件\r
\r
**参数:**\r
- \`options\` (可选): 配置对象\r
  - \`position\`: 控件位置 ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')\r
  - \`width\`: 宽度（像素），默认 200\r
  - \`height\`: 高度（像素），默认 150\r
\r
**返回:** this\r
\r
#### hide()\r
\r
隐藏鹰眼图控件\r
\r
**返回:** this\r
\r
#### setVisible(visible)\r
\r
设置控件可见性\r
\r
**参数:**\r
- \`visible\`: 布尔值，true 显示，false 隐藏\r
\r
**返回:** this\r
\r
#### setPosition(position)\r
\r
设置控件位置\r
\r
**参数:**\r
- \`position\`: 位置字符串 ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')\r
\r
**返回:** this\r
\r
#### setSize(width, height)\r
\r
设置控件大小\r
\r
**参数:**\r
- \`width\`: 宽度（像素）\r
- \`height\`: 高度（像素）\r
\r
**返回:** this\r
\r
#### applyTheme()\r
\r
应用主题样式\r
\r
**返回:** this\r
\r
#### destroy()\r
\r
销毁控件并释放所有资源\r
\r
**返回:** this\r
\r
## 示例\r
\r
### 完整示例\r
\r
\`\`\`javascript\r
import * as cim3d from '@/sdk/index.js'\r
\r
// 初始化 viewer\r
const viewer = new Cesium.Viewer('cesiumContainer')\r
\r
// 创建并显示鹰眼图\r
const overview = new cim3d.Control.Overview(viewer)\r
overview.show({\r
  position: 'bottom-right',\r
  width: 220,\r
  height: 160,\r
})\r
\r
// 在组件卸载时清理\r
// overview.destroy()\r
\`\`\`\r
\r
### 与其他控件组合使用\r
\r
\`\`\`javascript\r
import * as cim3d from '@/sdk/index.js'\r
\r
const viewer = new Cesium.Viewer('cesiumContainer')\r
\r
// 创建多个控件\r
const compass = new cim3d.Control.Compass(viewer)\r
const zoom = new cim3d.Control.Zoom(viewer)\r
const overview = new cim3d.Control.Overview(viewer)\r
\r
// 显示所有控件\r
compass.show({ position: 'top-left' })\r
zoom.show({ position: 'top-right' })\r
overview.show({ position: 'bottom-right' })\r
\`\`\`\r
\r
## 注意事项\r
\r
1. **性能考虑**: 鹰眼图会创建一个独立的 Viewer 实例，会占用一定的内存和 GPU 资源\r
2. **WebGL 上下文**: 确保浏览器支持多个 WebGL 上下文\r
3. **拖动体验**: 拖动范围框时，主地图会使用飞行动画平滑移动到目标位置\r
4. **范围计算**: 当相机倾斜角度较大时，范围指示器可能不够精确\r
5. **销毁顺序**: 在销毁应用时，应先销毁鹰眼图控件，再销毁主 Viewer\r
\r
## 样式定制\r
\r
可以通过 CSS 变量来自定义鹰眼图的样式：\r
\r
\`\`\`css\r
.cim3d-control-overview {\r
  --cim3d-control-bg: rgba(14, 23, 38, 0.9);\r
  --cim3d-control-border: rgba(255, 255, 255, 0.2);\r
  --cim3d-control-accent: #63b3ed;\r
}\r
\`\`\`\r
\r
## 技术实现\r
\r
- 使用独立的 Cesium Viewer 实例渲染全球视图\r
- 通过监听主地图相机的 \`changed\` 事件实时更新范围指示器\r
- 使用鼠标事件实现拖动功能\r
- 将地理坐标转换为屏幕坐标来定位范围指示器\r
`,nm=`# Scale Control - 比例尺控件\r
\r
## 功能介绍\r
\r
Scale 控件用于在地图上实时显示当前视图的地理比例尺，帮助用户了解地图的缩放级别和实际距离。\r
\r
## 特性\r
\r
✅ **实时更新** - 相机移动时自动更新比例尺  \r
✅ **多种单位** - 支持公制(m/km)和英制(ft/mi)  \r
✅ **智能舍入** - 自动计算友好的比例尺数值  \r
✅ **多位置** - 支持四个角落放置  \r
✅ **平滑动画** - 宽度变化带过渡动画  \r
✅ **响应式** - 移动端自适应  \r
✅ **轻量级** - 无额外依赖  \r
\r
## 使用示例\r
\r
### 基础使用\r
\r
\`\`\`javascript\r
import Scale from '@/sdk/Control/Scale/index.js';\r
\r
// 初始化\r
const scale = new Scale(viewer);\r
\r
// 显示比例尺（默认底部左侧）\r
scale.show();\r
\r
// 隐藏\r
scale.hide();\r
\`\`\`\r
\r
### 完整配置\r
\r
\`\`\`javascript\r
import Scale from '@/sdk/Control/Scale/index.js';\r
\r
const scale = new Scale(viewer);\r
\r
scale.show({\r
  position: 'bottom-left',  // 位置: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'\r
  maxWidth: 120,            // 比例尺最大宽度(px)\r
  units: 'metric',          // 单位: 'metric' | 'imperial' | 'both'\r
});\r
\`\`\`\r
\r
### 动态修改配置\r
\r
\`\`\`javascript\r
// 修改位置\r
scale.setPosition('bottom-right');\r
\r
// 修改选项\r
scale.setOptions({\r
  maxWidth: 150,\r
  units: 'imperial',\r
});\r
\r
// 获取当前配置\r
const options = scale.getOptions();\r
console.log(options);\r
\`\`\`\r
\r
### 显示/隐藏控制\r
\r
\`\`\`javascript\r
// 显示\r
scale.show();\r
\r
// 隐藏\r
scale.hide();\r
\r
// 设置可见性\r
scale.setVisible(true);   // 显示\r
scale.setVisible(false);  // 隐藏\r
\`\`\`\r
\r
### 单位切换\r
\r
\`\`\`javascript\r
// 公制单位（米/公里）\r
scale.setOptions({ units: 'metric' });\r
// 显示: 500 m, 2.5 km, 100 km\r
\r
// 英制单位（英尺/英里）\r
scale.setOptions({ units: 'imperial' });\r
// 显示: 1500 ft, 1.5 mi, 60 mi\r
\r
// 同时显示（未来扩展）\r
scale.setOptions({ units: 'both' });\r
\`\`\`\r
\r
## API 参考\r
\r
### 构造函数\r
\r
\`\`\`javascript\r
new Scale(mapOrViewer)\r
\`\`\`\r
\r
**参数**：\r
- \`mapOrViewer\`: Cesium Viewer 实例或包含 \`getViewer()\` 方法的对象\r
\r
### 方法\r
\r
#### show(options?)\r
显示比例尺控件\r
\r
**参数**：\r
- \`options\`: 配置对象（可选）\r
  - \`position\`: 位置，默认 \`'bottom-left'\`\r
  - \`maxWidth\`: 最大宽度(px)，默认 \`120\`\r
  - \`units\`: 单位类型，默认 \`'metric'\`\r
\r
**返回值**：\`this\`（支持链式调用）\r
\r
#### hide()\r
隐藏并销毁比例尺控件\r
\r
**返回值**：\`this\`\r
\r
#### setVisible(visible)\r
设置可见性\r
\r
**参数**：\r
- \`visible\`: boolean\r
\r
**返回值**：\`this\`\r
\r
#### getPosition()\r
获取当前位置\r
\r
**返回值**：\`string\` - 位置字符串\r
\r
#### setPosition(position)\r
设置位置\r
\r
**参数**：\r
- \`position\`: \`'top-left'\` | \`'top-right'\` | \`'bottom-left'\` | \`'bottom-right'\`\r
\r
**返回值**：\`this\`\r
\r
#### getOptions()\r
获取当前配置\r
\r
**返回值**：\`object\` - 配置对象\r
\r
#### setOptions(options)\r
更新配置\r
\r
**参数**：\r
- \`options\`: 配置对象\r
\r
**返回值**：\`this\`\r
\r
#### destroy()\r
销毁控件，清理所有资源\r
\r
**返回值**：\`this\`\r
\r
## 配置参数详解\r
\r
### position（位置）\r
\r
| 值 | 位置 | 默认边距 |\r
|---|---|---|\r
| \`'top-left'\` | 左上角 | top: 10px, left: 10px |\r
| \`'top-right'\` | 右上角 | top: 10px, right: 10px |\r
| \`'bottom-left'\` | 左下角 | bottom: 30px, left: 10px |\r
| \`'bottom-right'\` | 右下角 | bottom: 30px, right: 10px |\r
\r
### maxWidth（最大宽度）\r
\r
比例尺条的最大显示宽度（像素）。\r
\r
- **默认值**：\`120\`\r
- **推荐范围**：\`80\` - \`200\`\r
- **说明**：实际宽度会根据当前视图自动调整，但不超过此值\r
\r
### units（单位系统）\r
\r
| 值 | 说明 | 显示示例 |\r
|---|---|---|\r
| \`'metric'\` | 公制（米/公里） | \`500 m\`, \`2.5 km\` |\r
| \`'imperial'\` | 英制（英尺/英里） | \`1500 ft\`, \`1.5 mi\` |\r
| \`'both'\` | 同时显示（待实现） | - |\r
\r
## 单位换算规则\r
\r
### 公制单位（metric）\r
\r
- **< 1000m**：显示米（m）\r
  - \`100 m\`, \`500 m\`, \`999 m\`\r
- **≥ 1000m**：显示公里（km）\r
  - \`1.0 km\`, \`2.5 km\`, \`100 km\`\r
\r
### 英制单位（imperial）\r
\r
- **< 5280ft**：显示英尺（ft）\r
  - \`100 ft\`, \`1500 ft\`, \`5000 ft\`\r
- **≥ 5280ft**：显示英里（mi）\r
  - \`1.0 mi\`, \`2.5 mi\`, \`100 mi\`\r
\r
## 智能舍入算法\r
\r
比例尺会自动舍入到友好的数值：\r
\r
| 原始值 | 舍入后 | 显示 |\r
|-------|-------|-----|\r
| 123 m | 100 m | \`100 m\` |\r
| 234 m | 200 m | \`200 m\` |\r
| 567 m | 500 m | \`500 m\` |\r
| 890 m | 1000 m | \`1.0 km\` |\r
| 1234 m | 1000 m | \`1.0 km\` |\r
| 2345 m | 2000 m | \`2.0 km\` |\r
| 5678 m | 5000 m | \`5.0 km\` |\r
\r
舍入规则：\r
- 1 - 1.5 → 1\r
- 1.5 - 3 → 2\r
- 3 - 7 → 5\r
- 7 - 10 → 10\r
\r
## 使用场景\r
\r
### 1. 地图导航\r
\r
\`\`\`javascript\r
// 左下角显示比例尺，帮助用户了解当前缩放级别\r
const scale = new Scale(viewer);\r
scale.show({\r
  position: 'bottom-left',\r
  units: 'metric'\r
});\r
\`\`\`\r
\r
### 2. 多单位切换\r
\r
\`\`\`javascript\r
// 提供单位切换按钮\r
let useMetric = true;\r
\r
toggleButton.addEventListener('click', () => {\r
  useMetric = !useMetric;\r
  scale.setOptions({\r
    units: useMetric ? 'metric' : 'imperial'\r
  });\r
});\r
\`\`\`\r
\r
### 3. 响应式布局\r
\r
\`\`\`javascript\r
// 根据屏幕大小调整位置\r
function updateScalePosition() {\r
  const isMobile = window.innerWidth < 768;\r
  scale.setPosition(isMobile ? 'bottom-right' : 'bottom-left');\r
}\r
\r
window.addEventListener('resize', updateScalePosition);\r
\`\`\`\r
\r
### 4. 主题切换\r
\r
\`\`\`javascript\r
// 根据主题调整比例尺样式\r
function applyTheme(darkMode) {\r
  const scaleElement = document.querySelector('.cim3d-control-scale');\r
  if (scaleElement) {\r
    scaleElement.style.filter = darkMode ? 'none' : 'invert(1)';\r
  }\r
}\r
\`\`\`\r
\r
## 与其他控件组合\r
\r
### 与 Zoom 控件组合\r
\r
\`\`\`javascript\r
import Zoom from '@/sdk/Control/Zoom/index.js';\r
import Scale from '@/sdk/Control/Scale/index.js';\r
\r
// 缩放控件在左上角\r
const zoom = new Zoom(viewer);\r
zoom.show({ position: 'top-left' });\r
\r
// 比例尺在左下角\r
const scale = new Scale(viewer);\r
scale.show({ position: 'bottom-left' });\r
\`\`\`\r
\r
### 与 Compass 控件组合\r
\r
\`\`\`javascript\r
import Compass from '@/sdk/Control/Compass/index.js';\r
import Scale from '@/sdk/Control/Scale/index.js';\r
\r
// 罗盘在右上角\r
const compass = new Compass(viewer);\r
compass.show({ position: 'top-right' });\r
\r
// 比例尺在左下角\r
const scale = new Scale(viewer);\r
scale.show({ position: 'bottom-left' });\r
\`\`\`\r
\r
### 与 CoordinateDisplay 控件组合\r
\r
\`\`\`javascript\r
import CoordinateDisplay from '@/sdk/Control/CoordinateDisplay/index.js';\r
import Scale from '@/sdk/Control/Scale/index.js';\r
\r
// 坐标显示在底部\r
const coordDisplay = new CoordinateDisplay(viewer);\r
coordDisplay.show();\r
\r
// 比例尺在左下角（避免与坐标显示重叠）\r
const scale = new Scale(viewer);\r
scale.show({ \r
  position: 'bottom-left',\r
  maxWidth: 100  // 稍微缩小一些\r
});\r
\`\`\`\r
\r
## 常见问题\r
\r
### 1. 比例尺不显示怎么办？\r
\r
检查以下几点：\r
- Viewer 是否正确初始化\r
- 容器是否存在\r
- 是否调用了 \`show()\` 方法\r
\r
\`\`\`javascript\r
console.log('Viewer:', viewer);\r
console.log('Container:', viewer.container);\r
scale.show();\r
\`\`\`\r
\r
### 2. 比例尺数值不准确？\r
\r
确保地形数据已加载，地面拾取需要地形支持：\r
\r
\`\`\`javascript\r
viewer.terrainProvider = new Cesium.CesiumTerrainProvider({\r
  url: 'https://assets.cesium.com/...'\r
});\r
\`\`\`\r
\r
### 3. 如何自定义样式？\r
\r
可以通过 CSS 覆盖默认样式：\r
\r
\`\`\`css\r
/* 修改比例尺条颜色 */\r
.cim3d-control-scale-bar .bar {\r
  background: #ff0000;\r
  height: 4px;\r
}\r
\r
/* 修改文字样式 */\r
.cim3d-control-scale-text {\r
  font-size: 14px;\r
  color: #ffff00;\r
}\r
\r
/* 修改位置 */\r
.cim3d-control-scale {\r
  bottom: 50px !important;\r
  left: 20px !important;\r
}\r
\`\`\`\r
\r
### 4. 性能影响如何？\r
\r
比例尺控件性能影响很小：\r
- 仅在相机移动结束时更新（\`moveEnd\` 事件）\r
- 计算量小（一次地面拾取 + 距离计算）\r
- 无持续渲染开销\r
\r
### 5. 支持移动端吗？\r
\r
完全支持移动端：\r
- 响应式 CSS（\`@media\` 查询）\r
- 触摸友好的尺寸\r
- 自动调整字体大小\r
\r
### 6. 如何实现双单位显示？\r
\r
目前 \`both\` 模式暂未实现，可以手动创建两个比例尺：\r
\r
\`\`\`javascript\r
// 公制比例尺\r
const scaleMetric = new Scale(viewer);\r
scaleMetric.show({ \r
  position: 'bottom-left',\r
  units: 'metric' \r
});\r
\r
// 英制比例尺（偏移位置）\r
const scaleImperial = new Scale(viewer);\r
scaleImperial.show({ \r
  position: 'bottom-left',\r
  units: 'imperial' \r
});\r
// 然后通过 CSS 调整位置\r
\`\`\`\r
\r
## 性能优化建议\r
\r
1. **限制更新频率**\r
   - 控件使用 \`moveEnd\` 事件，只在相机停止移动时更新\r
   - 如需实时跟随，可改用 \`postRender\`，但会影响性能\r
\r
2. **合理使用 maxWidth**\r
   - 小屏幕使用较小的值（80-100）\r
   - 大屏幕可使用较大值（120-150）\r
\r
3. **及时销毁**\r
   \`\`\`javascript\r
   // 组件卸载时销毁\r
   onUnmounted(() => {\r
     scale.destroy();\r
   });\r
   \`\`\`\r
\r
## 视觉设计\r
\r
### 默认样式\r
\`\`\`\r
┌─────────────────────────┐\r
│                         │\r
│                         │\r
│                         │\r
│                         │\r
│  ┌──────────┐           │\r
│  │  500 m   │           │  ← 底部左侧\r
│  └──┬────┬──┘           │\r
│     └────┘              │\r
│   比例尺条 + 文字        │\r
└─────────────────────────┘\r
\`\`\`\r
\r
### 样式特点\r
- **半透明背景**：\`rgba(0, 0, 0, 0.4)\` + 模糊效果\r
- **白色比例尺条**：带黑色边框，清晰可见\r
- **文字阴影**：确保在任何背景下都可读\r
- **平滑过渡**：宽度变化带 0.3s 动画\r
\r
## 更新日志\r
\r
### v1.0.0\r
- ✅ 基础比例尺显示\r
- ✅ 公制/英制单位支持\r
- ✅ 四角位置配置\r
- ✅ 智能数值舍入\r
- ✅ 实时更新\r
- ✅ 响应式设计\r
\r
## 技术实现\r
\r
### 核心算法\r
\r
\`\`\`javascript\r
// 1. 获取屏幕左右边缘的地面点\r
const leftRay = camera.getPickRay(new Cesium.Cartesian2(0, height / 2));\r
const rightRay = camera.getPickRay(new Cesium.Cartesian2(width, height / 2));\r
const leftGround = scene.globe.pick(leftRay, scene);\r
const rightGround = scene.globe.pick(rightRay, scene);\r
\r
// 2. 计算两点间距离\r
const distance = Cesium.Cartesian3.distance(leftGround, rightGround);\r
\r
// 3. 舍入到友好数值\r
const niceDistance = roundToNiceNumber(distance);\r
\r
// 4. 计算比例尺条宽度\r
const barWidth = (niceDistance / distance) * maxWidth;\r
\`\`\`\r
\r
### 依赖\r
- Cesium.js（核心）\r
- 无其他外部依赖\r
\r
## 贡献指南\r
\r
欢迎提交 Issue 和 Pull Request！\r
\r
## 许可证\r
\r
MIT License\r
`,om=`# Zoom Control - 缩放控制控件\r
\r
## 📖 功能概述\r
\r
Zoom Control 是一个直观的 Cesium 三维场景缩放控制控件，提供便捷的视图缩放功能，包括：\r
\r
- **快速缩放**：通过 +/- 按钮快速放大或缩小视图\r
- **平滑动画**：支持可配置的飞行动画效果\r
- **多种缩放模式**：支持倍数缩放、缩放到范围、缩放到实体等\r
- **键盘快捷键**：支持 +/- 键盘快捷操作\r
- **灵活配置**：可自定义位置、缩放倍数、动画时长等\r
\r
## ✨ 核心特性\r
\r
### 1. 基础缩放功能\r
- ➕ **放大按钮**：点击放大视图（默认 2 倍）\r
- ➖ **缩小按钮**：点击缩小视图（默认 0.5 倍）\r
- 🎯 **智能定位**：沿相机视线方向缩放，保持视角不变\r
\r
### 2. 高级缩放功能\r
- 📐 **缩放到矩形范围**：\`zoomToRectangle()\`\r
- 🎪 **缩放到实体/图元**：\`zoomTo()\`\r
- 🔄 **重置视图**：\`resetZoom()\`\r
\r
### 3. 交互体验\r
- ⌨️ **键盘快捷键**：+/- 键快速缩放\r
- 🎬 **平滑动画**：二次缓出效果，自然流畅\r
- 👆 **触控友好**：支持触摸设备\r
- ♿ **无障碍支持**：ARIA 标签和语义化按钮\r
\r
### 4. 视觉设计\r
- 🎨 **现代UI**：毛玻璃效果 + 渐变背景\r
- 💫 **悬停效果**：按钮悬停时轻微放大\r
- 🔘 **按压反馈**：点击时缩小反馈\r
- 🚫 **禁用状态**：清晰的禁用样式\r
\r
## 🛠️ 技术架构\r
\r
### 类结构\r
\r
\`\`\`javascript\r
class ZoomControl {\r
  constructor(mapOrViewer)\r
  \r
  // 公共方法\r
  show(options)           // 显示控件\r
  hide()                  // 隐藏控件\r
  setVisible(visible)     // 设置可见性\r
  zoomIn(amount, duration)// 放大\r
  zoomOut(amount, duration)// 缩小\r
  zoomToRectangle(rectangle, duration)  // 缩放到矩形\r
  zoomTo(target, duration)              // 缩放到实体\r
  resetZoom(initialView, duration)      // 重置视图\r
  setPosition(position)   // 设置位置\r
  setOptions(options)     // 更新配置\r
  destroy()               // 销毁控件\r
}\r
\`\`\`\r
\r
### 依赖关系\r
\r
\`\`\`\r
ZoomControl\r
├── Cesium.js (相机控制、飞行动画)\r
├── DOM API (元素创建与事件处理)\r
└── CSS (样式与动画)\r
\`\`\`\r
\r
## 📦 安装与使用\r
\r
### 基础用法\r
\r
\`\`\`javascript\r
import Zoom from '@/sdk/Control/Zoom'\r
\r
// 1. 创建缩放控件实例\r
const zoom = new Zoom(viewer)\r
\r
// 2. 显示控件（使用默认配置）\r
zoom.show()\r
\r
// 3. 自定义配置\r
zoom.show({\r
  position: 'top-right',\r
  zoomInAmount: 2.0,\r
  zoomOutAmount: 0.5,\r
  animationDuration: 1.5\r
})\r
\`\`\`\r
\r
### 完整示例\r
\r
\`\`\`vue\r
<script setup>\r
import { ref, onMounted, onBeforeUnmount } from 'vue'\r
import * as Cesium from 'cesium'\r
import Zoom from '@/sdk/Control/Zoom'\r
\r
let viewer = null\r
let zoomControl = null\r
\r
onMounted(() => {\r
  // 初始化 Cesium Viewer\r
  viewer = new Cesium.Viewer('cesiumContainer')\r
  \r
  // 创建并显示缩放控件\r
  zoomControl = new Zoom(viewer)\r
  zoomControl.show({\r
    position: 'top-right',\r
    zoomInAmount: 2.0,\r
    zoomOutAmount: 0.5,\r
    animationDuration: 1.5,\r
    showLabels: false\r
  })\r
  \r
  // 添加键盘快捷键\r
  document.addEventListener('keydown', handleKeyPress)\r
})\r
\r
onBeforeUnmount(() => {\r
  // 清理资源\r
  if (zoomControl) {\r
    zoomControl.destroy()\r
    zoomControl = null\r
  }\r
  if (viewer) {\r
    viewer.destroy()\r
    viewer = null\r
  }\r
})\r
\r
function handleKeyPress(event) {\r
  if (event.key === '+' || event.key === '=') {\r
    zoomControl.zoomIn()\r
  } else if (event.key === '-' || event.key === '_') {\r
    zoomControl.zoomOut()\r
  }\r
}\r
<\/script>\r
\r
<template>\r
  <div id="cesiumContainer"></div>\r
</template>\r
\`\`\`\r
\r
## ⚙️ 配置参数\r
\r
### show(options) 参数说明\r
\r
| 参数 | 类型 | 默认值 | 说明 |\r
|------|------|--------|------|\r
| \`position\` | String | \`'top-right'\` | 控件位置：\`'top-left'\`, \`'top-right'\`, \`'bottom-left'\`, \`'bottom-right'\` |\r
| \`zoomInAmount\` | Number | \`2.0\` | 放大倍数（> 1.0） |\r
| \`zoomOutAmount\` | Number | \`0.5\` | 缩小倍数（0.0 ~ 1.0） |\r
| \`animationDuration\` | Number | \`1.5\` | 动画持续时间（秒） |\r
| \`showLabels\` | Boolean | \`false\` | 是否显示按钮文字（+/-） |\r
\r
### 配置示例\r
\r
\`\`\`javascript\r
// 示例 1: 左上角快速缩放\r
zoom.show({\r
  position: 'top-left',\r
  zoomInAmount: 3.0,      // 快速放大 3 倍\r
  zoomOutAmount: 0.3,     // 快速缩小到 0.3 倍\r
  animationDuration: 0.8  // 快速动画\r
})\r
\r
// 示例 2: 右下角慢速缩放\r
zoom.show({\r
  position: 'bottom-right',\r
  zoomInAmount: 1.5,      // 缓慢放大\r
  zoomOutAmount: 0.7,     // 缓慢缩小\r
  animationDuration: 2.5, // 慢速动画\r
  showLabels: true        // 显示 +/- 符号\r
})\r
\`\`\`\r
\r
## 🎮 API 参考\r
\r
### 构造方法\r
\r
#### \`new ZoomControl(mapOrViewer)\`\r
\r
创建缩放控件实例。\r
\r
**参数**：\r
- \`mapOrViewer\`: Cesium Viewer 实例或包含 \`getViewer()\` 方法的对象\r
\r
**示例**：\r
\`\`\`javascript\r
const zoom = new ZoomControl(viewer)\r
\`\`\`\r
\r
### 公共方法\r
\r
#### \`show(options = {})\`\r
\r
显示缩放控件。\r
\r
**参数**：\r
- \`options\`: 配置对象（可选）\r
\r
**返回**：\`this\`（支持链式调用）\r
\r
**示例**：\r
\`\`\`javascript\r
zoom.show({ position: 'top-right' })\r
\`\`\`\r
\r
#### \`hide()\`\r
\r
隐藏缩放控件（不销毁）。\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
zoom.hide()\r
\`\`\`\r
\r
#### \`setVisible(visible)\`\r
\r
设置控件可见性。\r
\r
**参数**：\r
- \`visible\`: Boolean，是否可见\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
zoom.setVisible(true)   // 显示\r
zoom.setVisible(false)  // 隐藏\r
\`\`\`\r
\r
#### \`zoomIn(amount = null, duration = null)\`\r
\r
放大视图。\r
\r
**参数**：\r
- \`amount\`: Number，放大倍数（可选，默认使用配置的 \`zoomInAmount\`）\r
- \`duration\`: Number，动画持续时间（可选，默认使用配置的 \`animationDuration\`）\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
// 使用默认配置\r
zoom.zoomIn()\r
\r
// 自定义放大 3 倍，1 秒动画\r
zoom.zoomIn(3.0, 1.0)\r
\`\`\`\r
\r
#### \`zoomOut(amount = null, duration = null)\`\r
\r
缩小视图。\r
\r
**参数**：\r
- \`amount\`: Number，缩小倍数（可选，默认使用配置的 \`zoomOutAmount\`）\r
- \`duration\`: Number，动画持续时间（可选，默认使用配置的 \`animationDuration\`）\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
// 使用默认配置\r
zoom.zoomOut()\r
\r
// 自定义缩小到 0.3 倍，2 秒动画\r
zoom.zoomOut(0.3, 2.0)\r
\`\`\`\r
\r
#### \`zoomToRectangle(rectangle, duration = null)\`\r
\r
缩放到指定的矩形范围。\r
\r
**参数**：\r
- \`rectangle\`: Cesium.Rectangle，目标矩形范围\r
- \`duration\`: Number，动画持续时间（可选）\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
const rectangle = Cesium.Rectangle.fromDegrees(\r
  116.0, 39.5,  // 西南角\r
  117.0, 40.5   // 东北角\r
)\r
zoom.zoomToRectangle(rectangle, 2.0)\r
\`\`\`\r
\r
#### \`zoomTo(target, duration = null)\`\r
\r
缩放到指定的实体或图元。\r
\r
**参数**：\r
- \`target\`: Cesium.Entity | Cesium.Primitive | Array，目标对象\r
- \`duration\`: Number，动画持续时间（可选）\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
// 缩放到单个实体\r
const entity = viewer.entities.add({...})\r
zoom.zoomTo(entity, 1.5)\r
\r
// 缩放到所有实体\r
zoom.zoomTo(viewer.entities.values, 2.0)\r
\`\`\`\r
\r
#### \`resetZoom(initialView = null, duration = null)\`\r
\r
重置缩放到初始视图。\r
\r
**参数**：\r
- \`initialView\`: Object，初始视图配置（可选）\r
- \`duration\`: Number，动画持续时间（可选）\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
// 重置到默认视图（缩放到所有实体）\r
zoom.resetZoom()\r
\r
// 重置到指定视图\r
zoom.resetZoom({\r
  destination: Cesium.Cartesian3.fromDegrees(116.4, 39.9, 1000),\r
  orientation: {\r
    heading: 0,\r
    pitch: -Cesium.Math.PI_OVER_TWO,\r
    roll: 0\r
  }\r
}, 2.0)\r
\`\`\`\r
\r
#### \`setPosition(position)\`\r
\r
动态调整控件位置。\r
\r
**参数**：\r
- \`position\`: String，位置标识\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
zoom.setPosition('bottom-left')\r
\`\`\`\r
\r
#### \`setOptions(options)\`\r
\r
更新控件配置。\r
\r
**参数**：\r
- \`options\`: Object，配置对象\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
zoom.setOptions({\r
  zoomInAmount: 2.5,\r
  animationDuration: 1.0\r
})\r
\`\`\`\r
\r
#### \`destroy()\`\r
\r
销毁控件，清理所有资源。\r
\r
**返回**：\`this\`\r
\r
**示例**：\r
\`\`\`javascript\r
zoom.destroy()\r
\`\`\`\r
\r
## 🔧 高级用法\r
\r
### 1. 组合使用多种缩放方式\r
\r
\`\`\`javascript\r
// 场景 1: 快速浏览\r
zoom.zoomIn(3.0, 0.5)    // 快速放大\r
setTimeout(() => {\r
  zoom.zoomOut(0.3, 0.5) // 快速缩小\r
}, 2000)\r
\r
// 场景 2: 详细查看\r
zoom.zoomTo(specificEntity, 2.0)  // 缩放到特定实体\r
setTimeout(() => {\r
  zoom.zoomIn(1.5, 1.0)  // 再稍微放大\r
}, 2500)\r
\`\`\`\r
\r
### 2. 根据缩放级别动态调整\r
\r
\`\`\`javascript\r
// 监听相机高度变化\r
viewer.camera.moveEnd.addEventListener(() => {\r
  const height = viewer.camera.positionCartographic.height\r
  \r
  if (height < 1000) {\r
    // 低空：减小缩放倍数，避免过度缩放\r
    zoom.setOptions({\r
      zoomInAmount: 1.5,\r
      zoomOutAmount: 0.7\r
    })\r
  } else {\r
    // 高空：增大缩放倍数，快速切换\r
    zoom.setOptions({\r
      zoomInAmount: 3.0,\r
      zoomOutAmount: 0.3\r
    })\r
  }\r
})\r
\`\`\`\r
\r
### 3. 与其他控件组合\r
\r
\`\`\`javascript\r
import Compass from '@/sdk/Control/Compass'\r
import Zoom from '@/sdk/Control/Zoom'\r
\r
// 创建多个控件\r
const compass = new Compass(viewer)\r
const zoom = new Zoom(viewer)\r
\r
// 分别配置位置，避免重叠\r
compass.show({ position: 'top-right' })\r
zoom.show({ position: 'top-left' })\r
\`\`\`\r
\r
### 4. 条件显示\r
\r
\`\`\`javascript\r
// 仅在特定模式下显示缩放控件\r
let isEditMode = false\r
\r
function toggleEditMode() {\r
  isEditMode = !isEditMode\r
  zoom.setVisible(isEditMode)\r
}\r
\r
// 或者根据缩放级别显示\r
viewer.camera.moveEnd.addEventListener(() => {\r
  const height = viewer.camera.positionCartographic.height\r
  zoom.setVisible(height > 500)  // 高空时显示\r
})\r
\`\`\`\r
\r
### 5. 自定义缩放逻辑\r
\r
\`\`\`javascript\r
// 实现以鼠标位置为中心的缩放\r
function zoomAtMousePosition(direction) {\r
  const scene = viewer.scene\r
  const canvas = scene.canvas\r
  const center = new Cesium.Cartesian2(canvas.width / 2, canvas.height / 2)\r
  \r
  const ray = viewer.camera.getPickRay(center)\r
  const cartesian = scene.globe.pick(ray, scene)\r
  \r
  if (cartesian) {\r
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian)\r
    const height = cartographic.height\r
    \r
    // 计算新高度\r
    const newHeight = direction === 'in' \r
      ? height * 0.5 \r
      : height * 2.0\r
    \r
    // 飞行到新位置\r
    viewer.camera.flyTo({\r
      destination: Cesium.Cartesian3.fromRadians(\r
        cartographic.longitude,\r
        cartographic.latitude,\r
        newHeight\r
      ),\r
      duration: 1.0\r
    })\r
  }\r
}\r
\r
// 使用\r
zoomAtMousePosition('in')  // 放大\r
zoomAtMousePosition('out') // 缩小\r
\`\`\`\r
\r
## 🐛 常见问题\r
\r
### Q1: 点击按钮没有反应？\r
\r
**A**: 检查以下几点：\r
\`\`\`javascript\r
// 1. 确认 viewer 已正确初始化\r
console.log('Viewer:', viewer)\r
\r
// 2. 确认控件已显示\r
zoom.show()\r
\r
// 3. 检查是否有 JavaScript 错误\r
console.log('Zoom Element:', zoom._zoomElement)\r
\`\`\`\r
\r
### Q2: 缩放动画太慢或太快？\r
\r
**A**: 调整 \`animationDuration\` 参数：\r
\`\`\`javascript\r
zoom.setOptions({\r
  animationDuration: 0.5  // 更快\r
  // 或\r
  animationDuration: 3.0  // 更慢\r
})\r
\`\`\`\r
\r
### Q3: 如何禁用默认的滚轮缩放？\r
\r
**A**: 禁用 Cesium 的默认滚轮行为：\r
\`\`\`javascript\r
viewer.scene.screenSpaceCameraController.enableZoom = false\r
\r
// 然后使用 Zoom 控件进行缩放\r
\`\`\`\r
\r
### Q4: 按钮位置被其他元素遮挡？\r
\r
**A**: 调整 z-index：\r
\`\`\`css\r
.cim3d-control-zoom {\r
  z-index: 10000 !important;\r
}\r
\`\`\`\r
\r
### Q5: 移动端触摸不灵敏？\r
\r
**A**: 增大按钮尺寸：\r
\`\`\`css\r
.cim3d-control-zoom-button {\r
  width: 48px;\r
  height: 48px;\r
  font-size: 24px;\r
}\r
\`\`\`\r
\r
## 📊 性能优化\r
\r
### 1. 减少动画冲突\r
\r
\`\`\`javascript\r
// 在动画进行中时禁用按钮\r
let isAnimating = false\r
\r
viewer.camera.flyTo({\r
  destination: newPosition,\r
  duration: 1.5,\r
  complete: () => {\r
    isAnimating = false\r
  }\r
})\r
\r
// 在 zoomIn/zoomOut 中检查\r
if (isAnimating) return\r
isAnimating = true\r
\`\`\`\r
\r
### 2. 及时销毁\r
\r
\`\`\`javascript\r
// 组件卸载时务必销毁\r
onBeforeUnmount(() => {\r
  zoom.destroy()\r
})\r
\`\`\`\r
\r
### 3. 避免重复创建\r
\r
\`\`\`javascript\r
// ❌ 错误：重复创建\r
function toggleZoom() {\r
  const zoom = new Zoom(viewer)  // 每次都新建\r
  zoom.show()\r
}\r
\r
// ✅ 正确：复用实例\r
let zoom = null\r
function toggleZoom() {\r
  if (!zoom) {\r
    zoom = new Zoom(viewer)\r
  }\r
  zoom.show()\r
}\r
\`\`\`\r
\r
## 🔄 更新日志\r
\r
### v1.0.0 (2026-04-01)\r
**初始版本**\r
- ✅ 基础缩放功能（放大/缩小）\r
- ✅ 可配置的缩放倍数和动画时长\r
- ✅ 四种位置选项\r
- ✅ 键盘快捷键支持\r
- ✅ 缩放到矩形、实体、重置视图\r
- ✅ 平滑的飞行动画\r
- ✅ 响应式设计，支持移动端\r
- ✅ 无障碍支持（ARIA 标签）\r
\r
## 📚 相关资源\r
\r
- [Cesium Camera API](https://cesium.com/docs/cesiumjs-ref-doc/Camera.html)\r
- [Cesium flyTo API](https://cesium.com/docs/cesiumjs-ref-doc/Camera.html#flyTo)\r
- [Cesium EasingFunction](https://cesium.com/docs/cesiumjs-ref-doc/EasingFunction.html)\r
- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)\r
\r
## 📄 许可证\r
\r
本项目遵循项目整体许可证。\r
\r
---\r
\r
**作者**: luobr  \r
**创建日期**: 2026-04-01  \r
**版本**: v1.0.0\r
`,sm=`# I3SLayer\r
\r
I3SLayer 是用于加载和管理 I3S 图层的类（用于加载Esri的Indexed 3D Scene图层）。它继承了 BaseLayer 类，专门用于处理 I3S 数据。\r
\r
## 使用方法\r
\r
\`\`\`javascript\r
import * as etop3d from 'etop3d';\r
\r
// 创建 I3SLayer 实例\r
const i3sLayer = new etop3d.Layer.I3SLayer(viewer, {\r
  name: 'My I3S Layer',\r
  url: 'https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/SampleScene/SceneServer',\r
  geoidServiceUrl: 'https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/EGM2008/ImageServer',\r
  enableGeoidService: true,  // 是否启用大地水准面服务\r
  alpha: 0.8,\r
  show: true,\r
  i3sOptions: {\r
    // I3S 附加选项\r
  }\r
});\r
\r
// 加载图层\r
try {\r
  await i3sLayer.load();\r
  console.log('I3S layer loaded successfully');\r
} catch (error) {\r
  console.error('Failed to load I3S layer:', error);\r
}\r
\r
// 设置图层属性\r
i3sLayer.setShow(false);  // 隐藏图层\r
i3sLayer.setAlpha(0.5);   // 设置透明度为50%\r
\r
// 定位到图层\r
i3sLayer.locate();\r
\r
// 从场景移除图层\r
i3sLayer.remove();\r
\`\`\`\r
\r
## API\r
\r
### 构造函数\r
\r
\`I3SLayer(viewer, options)\`\r
\r
- \`viewer\`: Cesium.Viewer 实例\r
- \`options\`: 图层配置选项\r
  - \`name\`: 图层名称 (可选)\r
  - \`url\`: I3S 服务 URL (必需)\r
  - \`geoidServiceUrl\`: 大地水准面服务 URL (可选，默认为 EGM2008 服务)\r
  - \`enableGeoidService\`: 是否启用大地水准面服务 (可选，默认为 true)\r
  - \`alpha\`: 图层透明度 (可选，默认为 1.0)\r
  - \`show\`: 图层是否显示 (可选，默认为 true)\r
  - \`bbox\`: 边界框，格式为 "west,south,east,north" (可选)\r
  - \`i3sOptions\`: I3S 附加选项 (可选)\r
\r
### 方法\r
\r
#### \`load()\`\r
\r
加载 I3S 图层到场景中。\r
\r
#### \`remove()\`\r
\r
从场景中移除图层。\r
\r
#### \`locate()\`\r
\r
定位到图层范围。\r
\r
#### \`pickFeatureAttributes(screenPosition)\`\r
\r
查询要素属性信息，接受屏幕坐标位置作为参数。\r
\r
#### \`setShow(show)\`\r
\r
继承自基类，设置图层可见性。\r
\r
#### \`setAlpha(alpha)\`\r
\r
继承自基类，设置图层透明度。\r
\r
#### \`showLayer()\`\r
\r
继承自基类，显示图层。\r
\r
#### \`hideLayer()\`\r
\r
继承自基类，隐藏图层。\r
\r
#### \`toggleLayer()\`\r
\r
继承自基类，切换图层显示状态。\r
\r
#### \`getProperties()\`\r
\r
继承自基类，获取图层属性。\r
\r
## 注意事项\r
\r
- 确保提供的 URL 是有效的 I3S 服务地址\r
- geoidServiceUrl 用于提供大地水准面服务，用于高程转换\r
- 需要处理跨域问题，必要时配置 CORS\r
- 在使用完毕后，记得调用 \`remove()\` 以释放资源\r
- I3S 图层可能会消耗较多性能，请根据实际情况优化使用`,am=`# TilesetLayer\r
\r
TilesetLayer 是用于加载和管理 3D Tileset 图层的类（用于倾斜摄影、精模等）。它继承了 BaseLayer 类，专门用于处理 3D Tileset 数据。\r
\r
## 使用方法\r
\r
\`\`\`javascript\r
import * as etop3d from 'etop3d';\r
\r
// 创建 TilesetLayer 实例\r
const tilesetLayer = new etop3d.Layer.TilesetLayer(viewer, {\r
  name: 'My Tileset Layer',\r
  url: '/path/to/tileset.json',\r
  alpha: 0.8,\r
  show: true,\r
  tilesetOptions: {\r
    // 3D Tileset 附加选项\r
  }\r
});\r
\r
// 加载图层\r
try {\r
  await tilesetLayer.load();\r
  console.log('Tileset layer loaded successfully');\r
} catch (error) {\r
  console.error('Failed to load tileset layer:', error);\r
}\r
\r
// 设置图层属性\r
tilesetLayer.setShow(false);  // 隐藏图层\r
tilesetLayer.setAlpha(0.5);   // 设置透明度为50%\r
\r
// 定位到图层\r
tilesetLayer.locate();\r
\r
// 从场景移除图层\r
tilesetLayer.remove();\r
\`\`\`\r
\r
## API\r
\r
### 构造函数\r
\r
\`TilesetLayer(viewer, options)\`\r
\r
- \`viewer\`: Cesium.Viewer 实例\r
- \`options\`: 图层配置选项\r
  - \`name\`: 图层名称 (可选)\r
  - \`url\`: 3D Tileset 服务 URL (必需)\r
  - \`alpha\`: 图层透明度 (可选，默认为 1.0)\r
  - \`show\`: 图层是否显示 (可选，默认为 true)\r
  - \`bbox\`: 边界框，格式为 "west,south,east,north" (可选)\r
  - \`tilesetOptions\`: 3D Tileset 附加选项 (可选)\r
\r
### 方法\r
\r
#### \`load()\`\r
\r
加载 3D Tileset 图层到场景中。\r
\r
#### \`remove()\`\r
\r
从场景中移除图层。\r
\r
#### \`locate()\`\r
\r
定位到图层范围。\r
\r
#### \`setShow(show)\`\r
\r
继承自基类，设置图层可见性。\r
\r
#### \`setAlpha(alpha)\`\r
\r
继承自基类，设置图层透明度。\r
\r
#### \`showLayer()\`\r
\r
继承自基类，显示图层。\r
\r
#### \`hideLayer()\`\r
\r
继承自基类，隐藏图层。\r
\r
#### \`toggleLayer()\`\r
\r
继承自基类，切换图层显示状态。\r
\r
#### \`getProperties()\`\r
\r
继承自基类，获取图层属性。\r
\r
## 注意事项\r
\r
- 确保提供的 URL 是有效的 3D Tileset 服务地址\r
- 需要处理跨域问题，必要时配置 CORS\r
- 在使用完毕后，记得调用 \`remove()\` 以释放资源\r
- 3D Tileset 图层可能会消耗较多性能，请根据实际情况优化使用`,lm="# AMapLayer（高德底图图层）\r\n\r\n`AMapLayer` 继承自 `ImageryLayer`，是**标准图层形态**的高德瓦片底图封装。外部通过 `addLayer()` / `removeLayer()` 管理图层，无需再手写 `viewer.imageryLayers.addImageryProvider`。\r\n\r\n内部使用同目录下的 `AMapImageryProvider`；当 `crs` 为 `WGS84` 时，会通过 `AMapMercatorTilingScheme` 做 WGS84 与高德瓦片坐标系之间的纠偏，使底图与 WGS84 数据对齐（俗称「无偏移」场景）。\r\n\r\n## 引入方式\r\n\r\n```javascript\r\nimport * as cim3d from '@/sdk/index.js'\r\n\r\nconst layer = new cim3d.Layer.AmapLayer(viewer, {\r\n  name: '高德影像',\r\n  amapType: 'img_w',\r\n  crs: 'WGS84'\r\n})\r\n\r\nawait layer.addLayer()\r\n// 移除\r\nlayer.removeLayer()\r\n```\r\n\r\n## 构造函数参数 `options`\r\n\r\n| 字段 | 类型 | 说明 |\r\n|------|------|------|\r\n| `amapType` | `string` | **推荐**：高德瓦片类型，见下表。与 `subType` 二选一优先于 `type`（避免与业务里 `type: 'amap'` 等冲突）。 |\r\n| `subType` | `string` | 同 `amapType` 的别名。 |\r\n| `type` | `string` | 若未设置 `amapType`/`subType`，会传给 Provider 作为瓦片类型；注意勿与外层「图层类型」混用。 |\r\n| `crs` | `string` | 默认 `'WGS84'`。为 `WGS84` 时使用纠偏瓦片方案；其他值则按 Cesium 默认 WebMercator 行为（一般不用于「无偏移」需求）。 |\r\n| `subdomains` | `string[]` | 子域列表，默认 `['1','2','3','4']`。 |\r\n| `url` | `string` | **可选**。瓦片 URL 模板，用法见下文「自定义 `url`」。 |\r\n| 其他 | — | 会透传给 `ImageryLayer` / Provider，如 `name`、`show`、`alpha` 等（以基类支持为准）。 |\r\n\r\n基类要求存在 `url` 字段时，`AmapLayer` 会用占位 `__amap__` 满足校验；真正请求的地址由 `AMapImageryProvider` 按下面规则决定。\r\n\r\n## 自定义 `url` 的使用说明\r\n\r\n`AMapImageryProvider` 内部逻辑可概括为：\r\n\r\n1. **先判断是否「已指定内置高德类型」**（`hasAmapType`）  \r\n   满足以下任一条件则为 true，此时走内置 `switch(type)` 的官方 URL，**不会**采用你传入的自定义 `url`：\r\n   - `options.amapType` 有值；或  \r\n   - `options.subType` 有值；或  \r\n   - `options.type` 属于内置别名之一：`img_w`、`img`、`vec_w`、`vec`、`road_w`、`road`、`vec_label_w`、`vec_label`、`road_label_w`、`road_label`。\r\n\r\n2. **何时走自定义 `url`**  \r\n   当 **`options.url` 存在** 且 **`hasAmapType === false`** 时，使用你提供的 `url` 作为 `UrlTemplateImageryProvider` 的模板。\r\n\r\n3. **通过 `AmapLayer` 使用时**  \r\n   `AmapLayer` 只会向 Provider 传入合并后的 **`type`**（`amapType || subType || options.type || 'img_w'`）、**`url`**、`crs`、`subdomains` 等，**不会**单独传 `amapType` / `subType`。因此 `hasAmapType` 实际上由 **合并后的 `type` 是否在白名单** 决定：\r\n   - **常用**：只设 `amapType: 'img_w'` 等 → 合并后 `type` 在白名单内 → **内置 URL**；此时再传 `url` **无效**。\r\n   - **自定义瓦片模板**：不要设 `amapType` / `subType`；并设 **`type` 为白名单外的字符串**（不能依赖默认，因为默认会变成 `img_w`）。**仅写 `url` 不设 `type` 不会走自定义地址。** 示例见下：\r\n\r\n```javascript\r\nconst layer = new cim3d.Layer.AmapLayer(viewer, {\r\n  name: '自定义高德模板',\r\n  url: 'https://webst0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}',\r\n  crs: 'WGS84',\r\n  subdomains: ['1', '2', '3', '4']\r\n})\r\nawait layer.addLayer()\r\n```\r\n\r\n4. **URL 模板占位符**（与 Cesium `UrlTemplateImageryProvider`、高德子域习惯一致）  \r\n   - `{x}` `{y}` `{z}`：瓦片列、行、级别。  \r\n   - `{s}`：子域占位；需配合 `subdomains`（如 `['1','2','3','4']`），否则按 Provider 默认子域。  \r\n   自定义代理地址时，保持占位符与瓦片服务约定一致即可。\r\n\r\n5. **`crs: 'WGS84'` 与自定义 `url`**  \r\n   设为 `WGS84` 时仍会挂载 `AMapMercatorTilingScheme` 做纠偏；自定义 `url` 若仍是高德同套切片规则，一般可与纠偏一起使用。若换成非高德坐标系的瓦片，请勿再使用本 Provider 的高德纠偏方案，应改用通用 `UrlImageryLayer` 等。\r\n\r\n## `amapType` / 内置类型对照\r\n\r\n以下值在 `AMapImageryProvider` 中映射为高德官方瓦片模板（无标注 / 有标注）：\r\n\r\n| 值 | 含义 |\r\n|----|------|\r\n| `img` / `img_w` | 影像（无标注） |\r\n| `vec` / `vec_w` | 电子矢量（无标注） |\r\n| `road` / `road_w` | 道路（无标注） |\r\n| `vec_label` / `vec_label_w` | 电子（有标注） |\r\n| `road_label` / `road_label_w` | 道路（有标注） |\r\n\r\n未匹配到已知类型时，默认使用影像 URL。\r\n\r\n## 与 `BaseLayerToggle` / JSON 配置\r\n\r\n在底图切换等场景中，外层 `config.type` 常为 `'amap'`，真正的高德样式请放在 **`amapType`**（或 `subType`）中，例如：\r\n\r\n```json\r\n{\r\n  \"type\": \"amap\",\r\n  \"amapType\": \"img_w\",\r\n  \"crs\": \"WGS84\"\r\n}\r\n```\r\n\r\n## 相关文件\r\n\r\n| 文件 | 说明 |\r\n|------|------|\r\n| `index.js` | `AmapLayer` 类定义 |\r\n| `AMapImageryProvider.js` | `UrlTemplateImageryProvider` 子类，负责 URL 与子域、`WGS84` 瓦片方案 |\r\n| `AMapMercatorTilingScheme.js` | WGS84 ↔ 高德瓦片所需的投影纠偏 |\r\n\r\n## 注意事项\r\n\r\n1. 高德瓦片服务需满足浏览器跨域策略；若遇 CORS 问题，需在服务端或代理层处理。  \r\n2. `WGS84` 纠偏为常见工程实现，精度受算法与数据范围影响，极端区域请以实测为准。  \r\n3. 自定义 `url` 的规则与占位符说明见上文「自定义 `url` 的使用说明」；代理或换域时请保留 `{x}` `{y}` `{z}` `{s}` 等与切片服务一致。\r\n",hm=`# ArcGISMapServerLayer\r
\r
ArcGISMapServerLayer 是用于加载和管理 ArcGIS MapServer 影像图层的类。它扩展了 ImageryLayer 类，专门用于处理 ArcGIS 服务器提供的影像服务。\r
\r
## 使用方法\r
\r
\`\`\`javascript\r
import * as etop3d from 'etop3d';\r
\r
// 创建 ArcGISMapServerLayer 实例\r
const arcGISLayer = new etop3d.Layer.ArcGISMapServerLayer(viewer, {\r
  name: 'My ArcGIS MapServer Layer',\r
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',\r
  layerName: '0' // 可选，指定要加载的图层\r
});\r
\r
// 添加图层到场景\r
try {\r
  await arcGISLayer.addLayer();\r
  console.log('ArcGIS MapServer layer added successfully');\r
} catch (error) {\r
  console.error('Failed to add ArcGIS MapServer layer:', error);\r
}\r
\r
// 从场景移除图层\r
arcGISLayer.removeLayer();\r
\`\`\`\r
\r
## API\r
\r
### 构造函数\r
\r
\`ArcGISMapServerLayer(viewer, options)\`\r
\r
- \`viewer\`: Cesium.Viewer 实例\r
- \`options\`: 图层配置选项\r
  - \`name\`: 图层名称 (可选)\r
  - \`url\`: ArcGIS MapServer 服务地址\r
  - \`layerName\`: 要显示的图层ID (可选)\r
\r
### 方法\r
\r
#### \`_createImageryProvider()\`\r
\r
创建 ArcGIS MapServer 影像提供者，此方法在添加图层时内部调用。\r
\r
#### \`addLayer()\`\r
\r
继承自基类，添加 ArcGIS MapServer 图层到场景中。\r
\r
#### \`removeLayer()\`\r
\r
继承自基类，从场景中移除图层。\r
\r
## 注意事项\r
\r
- 确保提供的 URL 是有效的 ArcGIS MapServer 服务地址\r
- 需要处理跨域问题，必要时配置CORS\r
- 在使用完毕后，记得调用 \`removeLayer()\` 以释放资源\r
- 只有当ArcGIS MapServer 服务为多图层（简称动态图层）时，即发布服务时候有多个图层时，才需要指定 \`layerName\`，如果只有一个图层，则不需要指定`,cm="# BaiduMapLayer（百度底图图层）\r\n\r\n`BaiduMapLayer` 继承自 `ImageryLayer`，是**标准图层形态**的百度瓦片底图封装。外部通过 `addLayer()` / `removeLayer()` 管理图层，无需再手写 `viewer.imageryLayers.addImageryProvider`。\r\n\r\n内部使用同目录下的 `BaiduMapImageryProvider`；瓦片方案为 `BaiduMapMercatorTilingScheme`，默认 **`toWGS84: true`**，将百度墨卡托与 WGS84 对齐，便于与 WGS84 业务数据叠加（俗称「无偏移」场景）。\r\n\r\n## 引入方式\r\n\r\n```javascript\r\nimport * as cim3d from '@/sdk/index.js'\r\n\r\nconst layer = new cim3d.Layer.BaiduMapLayer(viewer, {\r\n  name: '百度矢量',\r\n  baiduType: 'vec_w',\r\n  crs: 'WGS84'\r\n})\r\n\r\nawait layer.addLayer()\r\nlayer.removeLayer()\r\n```\r\n\r\n## 构造函数参数 `options`\r\n\r\n| 字段 | 类型 | 说明 |\r\n|------|------|------|\r\n| `baiduType` | `string` | **推荐**：百度瓦片类型，见下表。与 `subType` / `style` / `providerType` 等价用途（避免与业务里 `type: 'baidu'` 冲突）。 |\r\n| `subType` | `string` | 同 `baiduType` 的别名之一。 |\r\n| `style` | `string` | 同上（Provider 内参与 `hasBaiduType` 判断）。 |\r\n| `providerType` | `string` | 同上。 |\r\n| `type` | `string` | 业务外层常用作图层分类（如底图切换里的 `'baidu'`）。**`BaiduMapLayer` 不会把该字段传给 Provider**，仅使用 `baiduType` 等解析真实瓦片类型。 |\r\n| `url` | `string` / `array` | **可选**。自定义瓦片模板，规则见下文「自定义 `url`」。 |\r\n| `bigfont` | `boolean` | 注记类（`label` / `img_z` 等）是否用大号字体样式。 |\r\n| `customid` | `string` | `baiduType === 'custom'` 时样式 id，如 `midnight`、`dark` 等。 |\r\n| `subdomains` | `string[]` | 子域列表；未传时 Provider 默认 `online0`～`online9`。 |\r\n| `minimumLevel` / `maximumLevel` | `number` | 瓦片级别（以 Provider 实现为准）。 |\r\n| 其他 | — | 透传给 Provider / 基类，如 `name`、`show`、`alpha`、`credit`、`rectangle` 等。 |\r\n\r\n基类要求存在 `url` 时，`BaiduMapLayer` 会用占位 `__baidu__` 满足校验；实际请求地址由 `BaiduMapImageryProvider` 决定。\r\n\r\n## `baiduType` / 内置类型对照\r\n\r\n在 `BaiduMapImageryProvider` 中映射为百度官方或约定瓦片地址：\r\n\r\n| 值 | 含义 |\r\n|----|------|\r\n| `vec` / `vec_w` | 矢量底图 |\r\n| `img` / `img_w` / `img_d` | 影像底图 |\r\n| `label` / `vec_label` / `vec_label_w` / `img_z` | 注记（矢量标注，`bigfont` 影响样式后缀） |\r\n| `custom` | 自定义配色瓦片，需配合 `customid`（默认 `midnight`） |\r\n| `time` | 实时路况（URL 带时间戳） |\r\n\r\n未命中 `switch` 时可能仍保留构造前的 `url`（若已赋值）；一般请显式使用上表类型。\r\n\r\n## 自定义 `url` 的使用说明\r\n\r\n### Provider 侧（`BaiduMapImageryProvider`）\r\n\r\n1. **`hasBaiduType`**  \r\n   以下任一成立则为 true，此时优先走内置 `switch(type)`，**不会**仅用自定义 `url` 覆盖：\r\n   - `options.baiduType` / `options.subType` / `options.style` 有值；或  \r\n   - `options.type` 属于白名单：`vec`、`vec_w`、`img`、`img_w`、`img_d`、`label`、`vec_label`、`vec_label_w`、`img_z`、`custom`、`time`。\r\n\r\n2. **走自定义 `url`**  \r\n   `options.url` 存在且 **`hasBaiduType === false`** 时，使用传入的 `url`。\r\n\r\n### Layer 侧（`BaiduMapLayer`）\r\n\r\n1. 创建 Provider 时会**去掉**业务字段 `type`（避免 `type: 'baidu'` 传入 Provider），再合并其余 `options`。\r\n\r\n2. **是否传 `type` 给 Provider**  \r\n   - 若判定为**自定义 URL**：`url` 为数组，或 `url` 为字符串且包含字符 `{`（视为含 `{x}` 等占位符），则 **不向 Provider 传 `type`**，便于走「仅 `url`」分支。  \r\n   - 否则传入：  \r\n     `type = baiduType || subType || style || providerType || 'vec'`（默认矢量）。\r\n\r\n3. **与内置类型同时配置**  \r\n   若已设置 `baiduType`（等），Provider 侧 `hasBaiduType` 为 true，**自定义 `url` 不会生效**。\r\n\r\n### URL 模板占位符\r\n\r\n`buildImageResource` 中会替换：\r\n\r\n- `{x}`、`{z}`：列号、级别  \r\n- `{y}`：**会替换为 `-y`**（百度瓦片 Y 与 Cesium 约定相反时使用）  \r\n- `{s}`：按 `subdomains` 轮询替换  \r\n\r\n自定义地址需与百度切片规则一致；若服务不使用 `{s}`，模板里可不写 `{s}`。\r\n\r\n### `crs` 说明\r\n\r\n当前 Provider 内 tilingScheme **固定** `toWGS84: true`。`crs` 字段若传入，会随 `...options` 传给 `BaiduMapMercatorTilingScheme`；是否与通用地图 `crs` 语义完全一致以实际实现为准，无偏移场景一般按默认即可。\r\n\r\n## 与 `BaseLayerToggle` / JSON 配置\r\n\r\n底图切换里外层常为 `type: 'baidu'`，瓦片样式请用 **`baiduType`**：\r\n\r\n```json\r\n{\r\n  \"type\": \"baidu\",\r\n  \"baiduType\": \"img_w\",\r\n  \"crs\": \"WGS84\"\r\n}\r\n```\r\n\r\n## 相关文件\r\n\r\n| 文件 | 说明 |\r\n|------|------|\r\n| `index.js` | `BaiduMapLayer` 类定义 |\r\n| `BaiduMapImageryProvider.js` | 百度瓦片 ImageryProvider |\r\n| `BaiduMapTilingScheme.js` | 百度墨卡托瓦片方案及投影 |\r\n| `BaiduMapMercatorProjection.js` / `Point.js` / `Pixel.js` / `Projection.js` | 投影与坐标辅助 |\r\n\r\n## 注意事项\r\n\r\n1. 部分内置百度地址仍为 `http`，在 **HTTPS 页面** 下可能被混合内容策略拦截，生产环境建议走 **HTTPS 或同源代理**。  \r\n2. 百度服务需满足浏览器跨域（CORS）；必要时用网关代理瓦片请求。  \r\n3. `time`（路况）类服务依赖百度接口可用性与时间参数，不适合作为长期静态底图唯一来源。  \r\n4. 自定义 `url` 时请确认占位符与 `buildImageResource` 的替换规则一致，否则会出现错位或空白瓦片。\r\n",dm=`# BaseLayer\r
\r
BaseLayer 是所有图层类的基类，定义了图层的基本属性和方法。它提供了图层管理的基础功能，包括添加、移除、设置可见性和透明度等。\r
\r
## 使用方法\r
\r
\`\`\`javascript\r
import * as etop3d from 'etop3d';\r
\r
// 继承BaseLayer创建自定义图层类\r
class CustomLayer extends etop3d.Layer.BaseLayer {\r
  constructor(viewer, options = {}) {\r
    super(viewer, options);\r
  }\r
\r
  // 必须实现addLayer方法\r
  addLayer() {\r
    // 实现具体的图层添加逻辑\r
    // ...\r
  }\r
}\r
\r
// 使用自定义图层\r
const customLayer = new CustomLayer(viewer, {\r
  name: 'My Custom Layer',\r
  show: true,\r
  alpha: 0.8\r
});\r
\r
// 添加图层到场景\r
customLayer.addLayer();\r
\r
// 设置图层属性\r
customLayer.setShow(false);  // 隐藏图层\r
customLayer.setAlpha(0.5);   // 设置透明度为50%\r
\r
// 获取图层属性\r
const properties = customLayer.getProperties();\r
console.log(properties);\r
\r
// 从场景移除图层\r
customLayer.removeLayer();\r
\`\`\`\r
\r
## API\r
\r
### 构造函数\r
\r
\`BaseLayer(viewer, options)\`\r
\r
- \`viewer\`: Cesium.Viewer 实例\r
- \`options\`: 图层配置选项\r
  - \`name\`: 图层名称 (可选)\r
  - \`show\`: 图层是否显示，默认为 true (可选)\r
  - \`alpha\`: 图层透明度，默认为 1.0 (可选)\r
\r
### 方法\r
\r
#### \`addLayer()\`\r
\r
添加图层到场景。这是一个抽象方法，子类必须实现此方法。\r
\r
#### \`removeLayer()\`\r
\r
从场景中移除图层并释放资源。\r
\r
#### \`locateLayer()\`\r
\r
定位图层，用于将图层移动到当前视图中心。主要是用用户传入的bbox参数来定位\r
\r
#### \`showLayer()\`\r
\r
显示图层。\r
\r
#### \`hideLayer()\`\r
\r
隐藏图层。\r
\r
#### \`toggleLayer()\`\r
\r
切换图层可见性。\r
\r
#### \`setShow(show)\`\r
\r
设置图层可见性。\r
\r
- \`show\`: 布尔值，true 为显示，false 为隐藏\r
\r
#### \`setAlpha(alpha)\`\r
\r
设置图层透明度。\r
\r
- \`alpha\`: 数值，范围 0.0-1.0，0.0 为完全透明，1.0 为完全不透明\r
\r
#### \`getProperties()\`\r
\r
获取图层的属性信息。\r
\r
## 注意事项\r
\r
- BaseLayer 是一个抽象基类，不能直接实例化使用\r
- 继承 BaseLayer 的子类必须实现 \`addLayer\` 方法\r
- 在使用完毕后，记得调用 \`removeLayer()\` 以释放资源`,um=`# ImageLayer\r
\r
ImageLayer 是用于加载和管理单张图片作为影像图层的类。它扩展了 BaseLayer 类，专门用于将单张图片按照指定的地理范围添加到场景中。\r
\r
## 使用方法\r
\r
\`\`\`javascript\r
import * as etop3d from 'etop3d';\r
\r
// 创建 ImageLayer 实例\r
const imageLayer = new etop3d.Layer.ImageLayer(viewer, {\r
  name: 'My Image Layer',\r
  url: 'path/to/my/image.jpg',\r
  rectangle: {\r
    west: -109.0,\r
    south: 39.0,\r
    east: -108.0,\r
    north: 40.0\r
  },\r
  alpha: 0.8,\r
  show: true\r
});\r
\r
// 添加图层到场景\r
try {\r
  const layer = imageLayer.addLayer();\r
  console.log('Image layer added successfully');\r
} catch (error) {\r
  console.error('Failed to add image layer:', error);\r
}\r
\r
// 设置图层属性\r
imageLayer.setShow(false);  // 隐藏图层\r
imageLayer.setAlpha(0.5);   // 设置透明度为50%\r
\r
// 从场景移除图层\r
imageLayer.removeLayer();\r
\`\`\`\r
\r
## API\r
\r
### 构造函数\r
\r
\`ImageLayer(viewer, options)\`\r
\r
- \`viewer\`: Cesium.Viewer 实例\r
- \`options\`: 图层配置选项\r
  - \`name\`: 图层名称 (可选)\r
  - \`url\`: 图片地址\r
  - \`rectangle\`: 图片显示的地理范围，包含 west, south, east, north 属性\r
  - \`alpha\`: 图层透明度 (可选，默认为 1.0)\r
  - \`show\`: 图层是否显示 (可选，默认为 true)\r
\r
### 方法\r
\r
#### \`addLayer()\`\r
\r
将图片作为影像图层添加到场景中。\r
\r
#### \`removeLayer()\`\r
\r
继承自基类，从场景中移除图层。\r
\r
#### \`setShow(show)\`\r
\r
继承自基类，设置图层可见性。\r
\r
#### \`setAlpha(alpha)\`\r
\r
继承自基类，设置图层透明度。\r
\r
## 注意事项\r
\r
- 确保提供的 URL 是有效的图片地址\r
- rectangle 参数定义了图片在地球上的地理范围\r
- 在使用完毕后，记得调用 \`removeLayer()\` 以释放资源`,pm=`# ImageryLayer\r
\r
ImageryLayer 是所有影像图层类的基类，定义了影像图层的基本属性和方法。它扩展了 BaseLayer 类，专门用于处理各种类型的影像服务。支持将影像图层添加到场景或3D瓦片集中，并提供错误处理功能。\r
\r
## 使用方法\r
\r
\`\`\`javascript\r
import * as etop3d from 'etop3d';\r
\r
// 继承ImageryLayer创建自定义影像图层类\r
class CustomImageryLayer extends etop3d.Layer.ImageryLayer {\r
  constructor(viewer, options = {}) {\r
    super(viewer, options);\r
  }\r
\r
  // 必须实现_createImageryProvider方法\r
  async _createImageryProvider() {\r
    // 实现具体的影像提供者创建逻辑\r
    // ...\r
  }\r
}\r
\r
// 使用自定义影像图层\r
const customImageryLayer = new CustomImageryLayer(viewer, {\r
  name: 'My Custom Imagery Layer',\r
  url: 'https://example.com/path/to/imagery',\r
  show: true,\r
  alpha: 0.8\r
});\r
\r
// 设置当加载瓦片图层时触发的错误处理函数\r
customImageryLayer.setTileLoadErrorHandler((error) => {\r
  console.error('Tile loading error:', error);\r
});\r
\r
customImageryLayer.setLayerCreateErrorHandler((error) => {\r
  console.error('Layer creation error:', error);\r
});\r
\r
// 添加图层到场景\r
try {\r
  await customImageryLayer.addLayer();\r
  console.log('Imagery layer added successfully');\r
} catch (error) {\r
  console.error('Failed to add imagery layer:', error);\r
}\r
\r
// 将图层添加到3D瓦片集\r
const tileset = await Cesium.Cesium3DTileset.fromUrl('path/to/tileset.json');\r
try {\r
  await customImageryLayer.addTo3DTileset(tileset);\r
  console.log('Imagery layer added to 3D tileset successfully');\r
} catch (error) {\r
  console.error('Failed to add imagery layer to 3D tileset:', error);\r
}\r
\r
// 设置图层属性\r
customImageryLayer.setShow(false);  // 隐藏图层\r
customImageryLayer.setAlpha(0.5);   // 设置透明度为50%\r
\r
// 从场景移除图层\r
customImageryLayer.removeLayer();\r
\`\`\`\r
\r
## API\r
\r
### 构造函数\r
\r
\`ImageryLayer(viewer, options)\`\r
\r
- \`viewer\`: Cesium.Viewer 实例\r
- \`options\`: 图层配置选项\r
  - \`name\`: 图层名称 (可选)\r
  - \`url\`: 图层数据源地址\r
  - \`alpha\`: 图层透明度，默认为 1.0 (可选)\r
  - \`show\`: 图层是否显示，默认为 true (可选)\r
\r
### 方法\r
\r
#### \`_createImageryProvider()\`\r
\r
创建影像提供者。这是一个抽象方法，子类必须实现此方法。\r
\r
#### \`addLayer()\`\r
\r
将影像图层添加到场景中。此方法会先调用 \`_createImageryProvider\` 创建影像提供者，然后创建并添加影像图层。此方法会自动添加错误事件监听器。\r
\r
#### \`addTo3DTileset(tileset)\`\r
\r
将影像图层添加到3D瓦片集中。\r
\r
- \`tileset\`: Cesium 3D瓦片集实例\r
- 返回: 添加到瓦片集的影像图层实例\r
\r
#### \`setTileLoadErrorHandler(handler)\`\r
\r
设置影像瓦片加载错误处理函数。\r
\r
- \`handler\`: 错误处理函数，接收错误对象作为参数\r
\r
#### \`setLayerCreateErrorHandler(handler)\`\r
\r
设置影像图层创建错误处理函数。\r
\r
- \`handler\`: 错误处理函数，接收错误对象作为参数\r
\r
#### \`removeLayer()\`\r
\r
继承自基类，从场景中移除图层。\r
\r
#### \`setShow(show)\`\r
\r
继承自基类，设置图层可见性。\r
\r
#### \`setAlpha(alpha)\`\r
\r
继承自基类，设置图层透明度。\r
\r
#### \`_processUrl(url)\`\r
\r
处理URL，解决跨域问题。\r
\r
- \`url\`: 原始URL\r
- 返回: 处理后的URL\r
\r
## 内置错误处理\r
\r
ImageryLayer 类内置了以下错误处理机制：\r
\r
1. **瓦片加载错误**：监听影像提供者的 \`errorEvent\`，当加载影像瓦片时发生错误会触发。\r
2. **图层创建错误**：监听影像图层的 \`errorEvent\`，当创建影像图层时发生错误会触发。\r
\r
## 注意事项\r
\r
- ImageryLayer 是一个抽象基类，不能直接实例化使用\r
- 继承 ImageryLayer 的子类必须实现 \`_createImageryProvider\` 方法\r
- 在使用完毕后，记得调用 \`removeLayer()\` 以释放资源\r
- 错误处理函数是可选的，但建议设置以处理潜在的加载错误`,gm=`# TerrainLayer\r
\r
TerrainLayer 是用于加载和管理地形图层的类。它继承了 BaseLayer 类，专门用于处理各种类型的地形服务，包括 Cesium 标准地形、VR-TheWorld 地形、ArcGIS 地形、3DTiles地形和世界地形。\r
\r
## 使用方法\r
\r
\`\`\`javascript\r
import * as etop3d from 'etop3d';\r
\r
// 创建 Cesium 本地地形图层实例\r
const terrainLayer = new etop3d.Layer.TerrainLayer(viewer, {\r
  name: 'My Terrain Layer',\r
  url: 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles',\r
  type: 'local-terrain',  // 'local-terrain', 'vr-the-world', 'arcgis-terrain', 'world-terrain', '3dtiles-terrain', 'default-terrain'\r
  requestWaterMask: true,     // 请求水体掩膜\r
  requestVertexNormals: true, // 请求顶点法线\r
  alpha: 1.0,\r
  show: true\r
});\r
\r
// 创建 VR-TheWorld 地形图层实例\r
const vrTerrainLayer = new etop3d.Layer.TerrainLayer(viewer, {\r
  name: 'VR-TheWorld Terrain Layer',\r
  url: 'https://www.vr-theworld.com/vr-theworld/tiles1.0.0/73/',\r
  type: 'vr-the-world',\r
  alpha: 1.0,\r
  show: true\r
});\r
\r
// 创建 ArcGIS 地形图层实例\r
const arcGISTerrainLayer = new etop3d.Layer.TerrainLayer(viewer, {\r
  name: 'ArcGIS Terrain Layer',\r
  url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',\r
  type: 'arcgis-terrain',\r
  alpha: 1.0,\r
  show: true\r
});\r
\r
// 创建世界地形图层实例（不需URL）\r
const worldTerrainLayer = new etop3d.Layer.TerrainLayer(viewer, {\r
  name: 'World Terrain Layer',\r
  type: 'world-terrain',\r
  requestWaterMask: true,\r
  requestVertexNormals: true,\r
  alpha: 1.0,\r
  show: true\r
});\r
\r
// 创建3DTiles地形图层实例\r
const tilesTerrainLayer = new etop3d.Layer.TerrainLayer(viewer, {\r
  name: '3DTiles Terrain Layer',\r
  url: 'path/to/3dtiles-terrain',\r
  type: '3dtiles-terrain',\r
  requestWaterMask: true,\r
  requestVertexNormals: true,\r
  alpha: 1.0,\r
  show: true\r
});\r
\r
// 加载地形图层\r
try {\r
  await terrainLayer.addLayer();\r
  console.log('Terrain layer loaded successfully');\r
} catch (error) {\r
  console.error('Failed to load terrain layer:', error);\r
}\r
\r
// 设置图层属性\r
terrainLayer.setShow(false);  // 隐藏图层\r
terrainLayer.setAlpha(0.5);   // 设置透明度为50%\r
\r
// 显示地形图层\r
terrainLayer.showLayer();\r
\r
// 隐藏地形图层（恢复为默认椭球体地形）\r
terrainLayer.hideLayer();\r
\r
// 从场景移除图层（恢复为默认椭球体地形）\r
terrainLayer.removeLayer();\r
\`\`\`\r
\r
## API\r
\r
### 构造函数\r
\r
\`TerrainLayer(viewer, options)\`\r
\r
- \`viewer\`: Cesium.Viewer 实例\r
- \`options\`: 图层配置选项\r
  - \`name\`: 图层名称 (可选)\r
  - \`url\`: 地形服务 URL (可选，如果不提供则使用默认URL或特定类型地形不需要URL)\r
  - \`type\`: 地形类型，默认为 'local-terrain' (可选)\r
    - 'local-terrain': 使用 CesiumTerrainProvider 加载自定义地形\r
    - 'vr-the-world': 使用 VRTheWorldTerrainProvider 加载 VR-TheWorld 格式的地形服务\r
    - 'arcgis-terrain': 使用 ArcGISTiledElevationTerrainProvider 加载 ArcGIS 格式的地形服务\r
    - 'world-terrain': 使用 createWorldTerrainAsync 加载世界地形\r
    - '3dtiles-terrain': 使用 Cesium3DTilesTerrainProvider 加载3DTiles格式地形\r
    - 'default-terrain': 使用默认椭球体地形\r
  - \`requestWaterMask\`: 是否请求水体掩膜，默认为 true (可选)\r
  - \`requestVertexNormals\`: 是否请求顶点法线，默认为 true (可选)\r
  - \`alpha\`: 图层透明度 (可选，默认为 1.0)\r
  - \`show\`: 图层是否显示 (可选，默认为 true)\r
  - \`bbox\`: 边界框，格式为 "west,south,east,north" (可选)\r
  - \`parameters\`: 额外地形提供者参数 (可选)\r
  - \`proxy\`: 代理地址，用于处理跨域问题 (可选)\r
  - \`isCors\`: 是否需要处理跨域 (可选，默认为 true)\r
  - \`defaultLongitude\`: 定位时的默认经度，默认为 112.39 (可选)\r
  - \`defaultLatitude\`: 定位时的默认纬度，默认为 27.9 (可选)\r
  - \`defaultHeight\`: 定位时的默认高度，默认为 10000 (可选)\r
\r
### 方法\r
\r
#### \`addLayer()\`\r
\r
加载地形图层。根据配置的地形类型加载相应的地形提供者。\r
\r
#### \`_createVRTheWorldTerrainProvider()\`\r
\r
创建 VR-TheWorld 地形提供者，用于加载 VR-TheWorld 格式的地形服务。\r
\r
#### \`_createCesiumTerrainProvider()\`\r
\r
创建 Cesium 标准地形提供者，用于加载 Cesium 格式的地形服务。\r
\r
#### \`_createArcGISTerrainProvider()\`\r
\r
创建 ArcGIS 地形提供者，用于加载 ArcGIS 格式的地形服务。\r
\r
#### \`_create3DTilesTerrainProvider()\`\r
\r
创建 3DTiles 地形提供者，用于加载 3DTiles 格式的地形服务。\r
\r
#### \`createDefaultTerrain()\`\r
\r
创建默认椭球体地形提供者。\r
\r
#### \`showLayer()\`\r
\r
显示地形图层。将当前地形设置为该图层的地形。\r
\r
#### \`hideLayer()\`\r
\r
隐藏地形图层。恢复为默认椭球体地形。\r
\r
#### \`removeLayer()\`\r
\r
移除图层。恢复为默认椭球体地形并清理资源。\r
\r
#### \`setShow(show)\`\r
\r
继承自基类，设置图层可见性。\r
\r
#### \`setAlpha(alpha)\`\r
\r
继承自基类，设置图层透明度。\r
\r
#### \`locateLayer()\`\r
\r
定位到地形区域。如果配置了bbox则定位到该范围，否则定位到默认位置。\r
\r
#### \`_processUrl(url)\`\r
\r
处理URL，如果需要跨域代理则使用Cesium.Resource包装。\r
\r
## 地形类型说明\r
\r
通过 \`type\` 配置项可以选择不同的地形类型：\r
\r
- \`local-terrain\`: 使用 CesiumTerrainProvider 加载自定义地形服务\r
- \`vr-the-world\`: 使用 VRTheWorldTerrainProvider 加载 VR-TheWorld 格式的地形服务\r
- \`arcgis-terrain\`: 使用 ArcGISTiledElevationTerrainProvider 加载 ArcGIS 格式的地形服务\r
- \`world-terrain\`: 使用 Cesium 的世界地形服务\r
- \`3dtiles-terrain\`: 使用 Cesium3DTilesTerrainProvider 加载3DTiles格式地形\r
- \`default-terrain\`: 使用默认椭球体地形\r
\r
## 注意事项\r
\r
- 不同地形类型可能需要特定的 URL 格式，请确保提供的 URL 与地形类型匹配\r
- 需要处理跨域问题，必要时配置 CORS\r
- 地形图层的显示/隐藏与其他图层不同，需要使用专门的 showLayer/hideLayer 方法\r
- 在使用完毕后，记得调用 \`removeLayer()\` 以释放资源\r
- VR-TheWorld 和 ArcGIS 地形需要特殊的服务器支持，确保 URL 有效`,fm=`# UrlImageryLayer\r
\r
UrlImageryLayer 是用于加载和管理 URL 影像图层的类。它扩展了 ImageryLayer 类，专门用于处理各种 URL 模板的影像服务，如TMS、WMTS等。\r
\r
## 使用方法\r
\r
\`\`\`javascript\r
import * as etop3d from 'etop3d';\r
\r
// 创建 UrlImageryLayer 实例\r
const urlImageryLayer = new etop3d.Layer.UrlImageryLayer(viewer, {\r
  name: 'My UrlImagery Layer',\r
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',\r
  maximumLevel: 18,\r
  tilingScheme: 'webMercator', // 可选 'geographic' 或 'webMercator' 默认geographic\r
  subdomains: ['a', 'b', 'c'], // 可选 子域名配置\r
  alpha: 0.8,  // 透明度 可选\r
  show: true,\r
  isCors: false, // 可选 跨域配置\r
});\r
\r
// 添加图层到场景\r
try {\r
  await urlImageryLayer.addLayer();\r
  console.log('UrlImagery layer added successfully');\r
} catch (error) {\r
  console.error('Failed to add UrlImagery layer:', error);\r
}\r
\r
// 设置图层属性\r
urlImageryLayer.setShow(false);  // 隐藏图层\r
urlImageryLayer.setAlpha(0.5);   // 设置透明度为50%\r
\r
// 从场景移除图层\r
urlImageryLayer.removeLayer();\r
\`\`\`\r
\r
## API\r
\r
### 构造函数\r
\r
\`UrlImageryLayer(viewer, options)\`\r
\r
- \`viewer\`: Cesium.Viewer 实例\r
- \`options\`: 图层配置选项\r
  - \`name\`: 图层名称 (可选)\r
  - \`url\`: 影像服务 URL 模板，支持子域名占位符如 {s}，层级占位符如 {z}，行列占位符如 {x} 和 {y}\r
  - \`minimumLevel\`: 最小瓦片级别，默认为 0 (可选)\r
  - \`maximumLevel\`: 最大瓦片级别，默认为 18 (可选)\r
  - \`tilingScheme\`: 瓦片方案，默认为 'geographic' (可选)\r
    - 'geographic': 使用 GeographicTilingScheme\r
    - 'webMercator': 使用 WebMercatorTilingScheme\r
  - \`subdomains\`: 子域名配置，用于负载均衡，默认为 ['a', 'b', 'c'] (可选)\r
  - \`customOptions\`: 自定义选项，将合并到影像提供者选项中 (可选)\r
  - \`alpha\`: 图层透明度 (可选，默认为 1.0)\r
  - \`show\`: 图层是否显示 (可选，默认为 true)\r
  - \`isCors\`: 是否启用跨域配置 (可选，默认为 false)\r
  - \`proxy\`: 代理地址，用于处理跨域问题 (可选)\r
\r
### 方法\r
\r
#### \`_createImageryProvider()\`\r
\r
创建 URL 模板影像提供者，此方法在添加图层时内部调用。使用 Cesium.UrlTemplateImageryProvider 创建影像提供者。\r
\r
#### \`addLayer()\`\r
\r
继承自基类，添加 URL 影像图层到场景中。\r
\r
#### \`addTo3DTileset(tileset)\`\r
\r
将影像图层添加到3D瓦片集中。\r
\r
#### \`removeLayer()\`\r
\r
继承自基类，从场景中移除图层。\r
\r
#### \`setShow(show)\`\r
\r
继承自基类，设置图层可见性。\r
\r
#### \`setAlpha(alpha)\`\r
\r
继承自基类，设置图层透明度。\r
\r
#### \`setTileLoadErrorHandler(handler)\`\r
\r
设置影像瓦片加载错误处理函数。\r
\r
#### \`setLayerCreateErrorHandler(handler)\`\r
\r
设置影像图层创建错误处理函数。\r
\r
## 跨域参数说明\r
\r
API文档中必须包含跨域参数（isCors）的详细说明。使用场景包括：\r
\r
1. **跨域请求**：当图层数据源的域名、端口或协议与当前应用不同时需要启用\r
2. **服务端配置**：需要服务端配合配置CORS响应头才能生效\r
3. **开发环境**：访问外部服务时通常需要启用跨域\r
4. **生产环境**：访问第三方服务时需要启用并确保服务端支持\r
5. **本地文件**：对于本地文件或静态资源通常不需要启用\r
\r
## 注意事项\r
\r
- 确保提供的 URL 是有效的影像服务地址，支持子域名占位符（如 {s}）、层级占位符（如 {z}）和行列占位符（如 {x} 和 {y}）\r
- 根据影像服务类型设置正确的 tilingScheme 参数\r
- 合理设置 minimumLevel 和 maximumLevel 以优化性能\r
- 需要处理跨域问题，必要时配置 isCors 或 proxy\r
- 在使用完毕后，记得调用 \`removeLayer()\` 以释放资源`,mm=`# WFSLayer\r
\r
WFSLayer 是用于加载和管理 WFS (Web Feature Service) 图层数据的类。它扩展了 BaseLayer 类，专门用于处理 WFS 服务提供的矢量数据。支持点数据聚合功能，以优化大量点数据的渲染性能。\r
\r
## 使用方法\r
\r
\`\`\`javascript\r
import * as etop3d from 'etop3d';\r
\r
// 创建 WFSLayer 实例\r
const wfsLayer = new etop3d.Layer.WFSLayer(viewer, {\r
  name: 'My WFS Layer',\r
  url: 'https://example.com/geoserver/wfs',\r
  layerName: 'workspace:layer_name', // 必需\r
  outputFormat: 'application/json',\r
  // 额外的WFS参数，用于过滤或定制数据请求 可选\r
  parameters: {\r
    'CQL_FILTER': 'attribute > 100',  // CQL过滤条件\r
    'FEATUREID': 'feature1,feature2', // 指定要素ID\r
    'BBOX': '-180.0,-90.0,180.0,90.0', // 边界框过滤\r
    'MAXFEATURES': '1000',            // 限制返回要素数量\r
    'SRSNAME': 'EPSG:4326',          // 指定空间参考系统\r
    'OUTPUTFORMAT': 'application/json' // 指定输出格式\r
  },\r
  // 聚合配置 - 用于大量点数据的性能优化\r
  enableClustering: true,\r
  clusterOptions: {\r
    pixelRange: 15,           // 聚合像素范围\r
    minimumClusterSize: 3,    // 最小聚合点数\r
    clusterPointSize: 20,     // 聚合点文字大小\r
    clusterPixelSize: 30,     // 聚合点大小\r
    clusterLabelColor: '#ffffff', // 聚合点文字颜色\r
    clusterPointColor: '#0066CC'  // 聚合点颜色\r
  },\r
  style: {\r
    pointStyle: {\r
      markerColor: '#FF0000',\r
      markerSize: 10\r
    },\r
    lineStyle: {\r
      strokeColor: '#0000FF',\r
      strokeWidth: 3\r
    },\r
    polygonStyle: {\r
      fillColor: '#FF0000',\r
      strokeColor: '#000000',\r
      strokeWidth: 2\r
    }\r
  },\r
  alpha: 0.8,\r
  show: true\r
});\r
\r
// 添加图层到场景\r
try {\r
  await wfsLayer.addLayer();\r
  console.log('WFS layer added successfully');\r
} catch (error) {\r
  console.error('Failed to add WFS layer:', error);\r
}\r
\r
// 设置图层属性\r
wfsLayer.setShow(false);  // 隐藏图层\r
wfsLayer.setAlpha(0.5);   // 设置透明度为50%\r
\r
// 从场景移除图层\r
wfsLayer.removeLayer();\r
\`\`\`\r
\r
## API\r
\r
### 构造函数\r
\r
\`WFSLayer(viewer, options)\`\r
\r
- \`viewer\`: Cesium.Viewer 实例\r
- \`options\`: 图层配置选项\r
  - \`name\`: 图层名称 (可选)\r
  - \`url\`: WFS 服务地址\r
  - \`layerName\`: 图层名称 (WFS 服务必需)\r
  - \`outputFormat\`: 输出格式，默认为 'application/json' (可选)\r
  - \`parameters\`: 额外WFS参数，用于定制数据请求 (可选)\r
    - \`CQL_FILTER\`: CQL过滤条件，用于按属性过滤要素\r
    - \`FEATUREID\`: 指定要素ID，格式为逗号分隔的ID列表\r
    - \`BBOX\`: 边界框过滤，格式为 "minx,miny,maxx,maxy"\r
    - \`MAXFEATURES\`: 限制返回的要素数量\r
    - \`SRSNAME\`: 指定空间参考系统，如 'EPSG:4326'\r
    - 其他WFS标准参数\r
  - \`enableClustering\`: 是否启用点聚合，默认为 false (可选)\r
  - \`clusterOptions\`: 聚合配置选项 (可选)\r
    - \`pixelRange\`: 聚合像素范围，默认 15\r
    - \`minimumClusterSize\`: 最小聚合点数，默认 3\r
    - \`clusterPointSize\`: 聚合点文字大小，默认 20\r
    - \`clusterPixelSize\`: 聚合点大小，默认 30\r
    - \`clusterLabelColor\`: 聚合点文字颜色，默认 '#ffffff'\r
    - \`clusterPointColor\`: 聚合点颜色，默认 '#0066CC'\r
  - \`style\`: 样式配置 (可选)\r
    - \`pointStyle\`: 点样式\r
      - \`markerColor\`: 点颜色\r
      - \`markerSize\`: 点大小\r
      - \`markerSymbol\`: 点符号\r
    - \`lineStyle\`: 线样式\r
      - \`strokeColor\`: 线颜色\r
      - \`strokeWidth\`: 线宽度\r
    - \`polygonStyle\`: 面样式\r
      - \`fillColor\`: 填充颜色\r
      - \`strokeColor\`: 边框颜色\r
      - \`strokeWidth\`: 边框宽度\r
  - \`alpha\`: 图层透明度 (可选，默认为 1.0)\r
  - \`show\`: 图层是否显示 (可选，默认为 true)\r
  - \`clampToGround\`: 是否贴地显示 (可选，默认为 false)\r
\r
### 方法\r
\r
#### \`addLayer()\`\r
\r
将 WFS 图层添加到场景中。如果启用了聚合功能，会对点数据进行聚合处理。\r
\r
#### \`removeLayer()\`\r
\r
从场景中移除图层。如果启用了聚合功能，会先禁用聚合以释放资源。\r
\r
#### \`setShow(show)\`\r
\r
继承自基类，设置图层可见性。\r
\r
#### \`setAlpha(alpha)\`\r
\r
继承自基类，设置图层透明度。\r
\r
#### \`locateLayer()\`\r
\r
定位到图层范围。\r
\r
## 额外WFS参数说明\r
\r
通过 \`parameters\` 配置项可以添加额外的WFS请求参数，以定制数据查询行为：\r
\r
- \`CQL_FILTER\`: CQL（Common Query Language）过滤条件，用于按属性过滤要素\r
- \`FEATUREID\`: 指定要素ID，格式为逗号分隔的ID列表\r
- \`BBOX\`: 边界框过滤，格式为 "minx,miny,maxx,maxy"\r
- \`MAXFEATURES\`: 限制返回的要素数量\r
- \`SRSNAME\`: 指定空间参考系统，如 'EPSG:4326'\r
- 其他WFS标准参数\r
\r
## 聚合功能说明\r
\r
当启用点聚合功能时，相邻的点将被聚合为一个点，并显示聚合的数量。这可以显著提高大量点数据的渲染性能。聚合功能仅适用于点数据，对线和面数据无效。\r
\r
聚合功能的实现遵循以下规范：\r
1. 聚合功能在数据源（DataSource）级别启用\r
2. 支持自定义聚合样式，根据聚合数量显示不同图标\r
3. 包含显式的聚合功能销毁机制，避免内存泄漏\r
4. 支持动态调整聚合参数（pixelRange、minimumClusterSize）\r
\r
## 样式配置说明\r
\r
WFS 图层支持通过 \`style\` 参数配置矢量数据的可视化样式：\r
- 点要素：通过 \`pointStyle\` 对象配置\r
- 线要素：通过 \`lineStyle\` 对象配置\r
- 面要素：通过 \`polygonStyle\` 对象配置\r
\r
注意：样式配置仅在数据源返回格式为GeoJSON时生效。\r
\r
## 注意事项\r
\r
- 确保提供的 URL 是有效的 WFS 服务地址\r
- 必须提供有效的 layerName 参数以指定要获取的要素类型\r
- 聚合功能仅对点数据有效，大量点数据场景下建议启用\r
- 额外WFS参数可以用来优化数据请求，减少不必要的数据传输\r
- 需要处理跨域问题，必要时配置CORS\r
- 在使用完毕后，记得调用 \`removeLayer()\` 以释放资源\r
- 样式配置仅对GeoJSON格式数据有效`,ym=`# WMSLayer\r
\r
WMSLayer 是用于加载和管理 WMS (Web Map Service) 影像图层的类。它扩展了 ImageryLayer 类，专门用于处理 WMS 服务提供的影像数据。\r
\r
## 使用方法\r
\r
\`\`\`javascript\r
import * as etop3d from 'etop3d';\r
\r
// 创建 WMSLayer 实例\r
const wmsLayer = new etop3d.Layer.WMSLayer(viewer, {\r
  url: 'https://example.com/geoserver/wms', // WMS服务地址\r
  layerName: 'workspace:layer_name', // 图层名称\r
  // 其他WMS参数\r
  format: '', // 可选，默认为 'image/png'\r
  transparent: true, // 可选，默认为 true\r
  alpha: 1.0, // 可选，默认为 1.0\r
  show: true // 可选，默认为 true,\r
  srs: 'EPSG:4326',   // 可选，默认为 'EPSG:4326'\r
});\r
\r
// 添加图层到场景\r
try {\r
  await wmsLayer.addLayer();\r
  console.log('WMS layer added successfully');\r
} catch (error) {\r
  console.error('Failed to add WMS layer:', error);\r
}\r
\r
// 设置图层属性\r
wmsLayer.setShow(false);  // 隐藏图层\r
wmsLayer.setAlpha(0.5);   // 设置透明度为50%\r
\r
// 从场景移除图层\r
wmsLayer.removeLayer();\r
\`\`\`\r
\r
## API\r
\r
### 构造函数\r
\r
\`WMSLayer(viewer, options)\`\r
\r
- \`viewer\`: Cesium.Viewer 实例\r
- \`options\`: 图层配置选项\r
  \r
  - \`url\`: WMS 服务地址\r
  - \`layerName\`: 要显示的图层名称 (必需)\r
  - \`name\`: 图层名称 (可选)\r
  - \`format\`: 格式 (可选)\r
  - \`transparent\`: 是否透明 (可选，默认为 true)\r
  - \`srs\`: 坐标系统 (可选，默认为 'EPSG:4326')\r
  - \`alpha\`: 图层透明度 (可选，默认为 1.0)\r
  - \`show\`: 图层是否显示 (可选，默认为 true)\r
\r
### 方法\r
\r
#### \`_createImageryProvider()\`\r
\r
创建 WMS 影像提供者，此方法在添加图层时内部调用。\r
\r
#### \`addLayer()\`\r
\r
继承自基类，添加 WMS 图层到场景中。\r
\r
#### \`removeLayer()\`\r
\r
继承自基类，从场景中移除图层。\r
\r
#### \`setShow(show)\`\r
\r
继承自基类，设置图层可见性。\r
\r
#### \`setAlpha(alpha)\`\r
\r
继承自基类，设置图层透明度。\r
\r
## 注意事项\r
\r
- 确保提供的 URL 是有效的 WMS 服务地址\r
- 必须提供有效的 layerName 参数以指定要显示的图层\r
- 需要处理跨域问题，必要时配置CORS\r
- 在使用完毕后，记得调用 \`removeLayer()\` 以释放资源`,Cm=`# WMTSLayer\r
\r
WMTSLayer 是用于加载和管理 WMTS (Web Map Tile Service) 影像图层的类。它扩展了 ImageryLayer 类，专门用于处理 WMTS 服务提供的瓦片影像数据。\r
\r
## 使用方法\r
\r
\`\`\`javascript\r
import * as etop3d from 'etop3d';\r
\r
// 创建 WMTSLayer 实例\r
const wmtsLayer = new etop3d.Layer.WMTSLayer(viewer, {\r
  name: 'My WMTS Layer',\r
  url: 'https://example.com/geoserver/gwc/service/wmts', // WMTS 服务地址\r
  layerName: 'workspace:layer_name', // 图层名称\r
  tileMatrixSetID: 'EPSG:4326', // 瓦片矩阵集标识\r
  style: '', // 可选，默认为 ''\r
  maximumLevel: 18,  // 可选，默认为 15\r
  format: '', // 可选，默认为 'image/png'\r
  alpha: 1.0, // 可选，默认为 1.0\r
  show: true // 可选，默认为 true\r
});\r
\r
// 添加图层到场景\r
try {\r
  await wmtsLayer.addLayer();\r
  console.log('WMTS layer added successfully');\r
} catch (error) {\r
  console.error('Failed to add WMTS layer:', error);\r
}\r
\r
// 设置图层属性\r
wmtsLayer.setShow(false);  // 隐藏图层\r
wmtsLayer.setAlpha(0.5);   // 设置透明度为50%\r
\r
// 从场景移除图层\r
wmtsLayer.removeLayer();\r
\`\`\`\r
\r
## API\r
\r
### 构造函数\r
\r
\`WMTSLayer(viewer, options)\`\r
\r
- \`viewer\`: Cesium.Viewer 实例\r
- \`options\`: 图层配置选项\r
  - \`url\`: WMTS 服务地址(必需)\r
  - \`layerName\`: 图层名称 (必需)\r
  - \`tileMatrixSetID\`: 瓦片矩阵集标识 (必需)\r
  - \`name\`: 图层名称 (可选)\r
  - \`style\`: 样式名称 (可选)\r
  - \`format\`: 图像格式，默认为 'image/jpeg' (可选)\r
  - \`alpha\`: 图层透明度 (可选，默认为 1.0)\r
  - \`show\`: 图层是否显示 (可选，默认为 true)\r
\r
### 方法\r
\r
#### \`_createImageryProvider()\`\r
\r
创建 WMTS 影像提供者，此方法在添加图层时内部调用。\r
\r
#### \`addLayer()\`\r
\r
继承自基类，添加 WMTS 图层到场景中。\r
\r
#### \`removeLayer()\`\r
\r
继承自基类，从场景中移除图层。\r
\r
#### \`setShow(show)\`\r
\r
继承自基类，设置图层可见性。\r
\r
#### \`setAlpha(alpha)\`\r
\r
继承自基类，设置图层透明度。\r
\r
## 注意事项\r
\r
- 确保提供的 URL 是有效的 WMTS 服务地址\r
- 必须提供 url、layerName 和 tileMatrixSetID 参数\r
- 需要处理跨域问题，必要时配置CORS\r
- 在使用完毕后，记得调用 \`removeLayer()\` 以释放资源`,xm=`# Map 模块（地图核心）\r
\r
\`Map\` 是对 Cesium Viewer 的轻量封装，提供 **地图初始化、相机控制、场景设置、事件监听、生命周期管理** 等核心能力。\r
\r
> 说明：当前项目同时支持 \`cim3d.Map\`（默认聚合导出）与具名导出 \`import { Map } from '@/sdk'\`。\r
\r
---\r
\r
## 快速开始\r
\r
\`\`\`js\r
import * as cim3d from '@/sdk/index.js';\r
\r
const map = new cim3d.Map('mapContainer', {\r
  accessToken: 'your_token',\r
  baseLayer: 'world',  // 'world' | 'arcgis' | 'tianditu' | 'google' | ''(保留 Viewer 默认) | 自定义 UrlTemplate 字符串\r
  // baseLayerOptions: { key: '天地图tk' }  // tianditu 时传 tk；arcgis 时可传 token / url\r
  terrain: false,       // true / { url, requestWaterMask?, requestVertexNormals? }\r
  center: [114.39, 22.32],\r
\r
  // zoom 默认语义是“高度(km)”\r
  zoom: 12,\r
\r
  // 如果希望 zoom 更像“级别”，打开 level 模式（经验换算：level 0≈20,000km，每+1高度减半）\r
  // zoomMode: 'level',\r
  // zoom: 15,\r
\r
  // 可选：控制台调试用（默认会挂 window.viewer）\r
  debug: { attachToWindow: true, windowKey: 'viewer' },\r
\r
  // 可选：Cesium Viewer 的原生 options\r
  // viewerOptions: { animation: false, timeline: false }\r
});\r
\r
// 相机控制\r
map.flyTo([114.39, 22.32, 2000]);\r
map.setView([114.39, 22.32], 45, -60);\r
\r
// 事件\r
map.on('click', (pos) => {\r
  console.log('点击位置:', pos); // { lng, lat, height, cartesian, screen:{x,y} }\r
});\r
\r
// 销毁\r
// map.destroy();\r
\`\`\`\r
\r
---\r
\r
## 构造函数\r
\r
### \`new Map(container, options)\`\r
\r
- **container**\r
  - \`string\`：DOM 元素 id（例如 \`'mapContainer'\`）\r
  - \`HTMLElement\`：DOM 元素本身\r
\r
- **options**\r
  - **accessToken**：\`string\`，赋值给 \`Cesium.Ion.defaultAccessToken\`\r
  - **center**：\`[lng, lat]\` 初始中心点\r
  - **zoom**：\`number\`\r
    - 默认：**高度(km)**（例如 \`zoom: 12\` 表示 12km）\r
    - \`zoomMode: 'level'\` 时：**瓦片级别（近似）**\r
  - **zoomMode**：\`'heightKm' | 'level'\`（默认 \`'heightKm'\`）\r
  - **terrain**\r
    - \`false\`：不启用地形\r
    - \`true\`：启用 \`Cesium.createWorldTerrainAsync()\`\r
    - \`{ url, requestWaterMask?, requestVertexNormals? }\`：自定义地形\r
  - **baseLayer**\r
    - \`'world'\`（默认）：\`Cesium.createWorldImageryAsync()\` 等全球影像兜底（依赖 Ion token 时可正常出图）\r
    - \`'arcgis'\`：ArcGIS World Imagery；需网络能访问 \`services.arcgisonline.com\`，否则超时失败\r
    - \`'tianditu'\`：天地图 WMTS（需要 \`baseLayerOptions.key\` / \`tk\` 或自定义 url）\r
    - \`'google'\`：UrlTemplate（占位示例，建议用自有瓦片服务 url 覆盖）\r
    - \`''\`：不替换 Viewer 自带底图（不清空 \`imageryLayers\`）\r
    - 其他 \`string\`：当作 UrlTemplate \`url\` 处理\r
  - **baseLayerOptions**：\`object\`，透传给对应底图加载器（例如 \`{ token, url, key, tk }\`）\r
  - **viewerOptions**：Cesium Viewer 原生 options（透传给 \`new Cesium.Viewer(container, viewerOptions)\`）\r
  - **debug**\r
    - \`attachToWindow?: boolean\`（默认 \`true\`）\r
    - \`windowKey?: string\`（默认 \`'viewer'\`）\r
\r
---\r
\r
## 相机 API\r
\r
### \`flyTo([lng, lat, height], options?)\`\r
飞行到指定位置（单位：米）。\r
\r
### \`setView([lng, lat], heading, pitch?)\`\r
设置视角。\`heading/pitch\` 传入角度（内部会转弧度）。\r
\r
### \`zoomTo(target, options?)\`\r
缩放到目标，内部调用 \`viewer.zoomTo\`。\r
\r
### \`getCenter()\`\r
获取当前视图中心点，返回：\r
\r
\`\`\`js\r
{ lng, lat, height, cartesian }\r
\`\`\`\r
\r
### \`getZoom()\`\r
- \`zoomMode: 'heightKm'\`：返回高度（km）\r
- \`zoomMode: 'level'\`：返回近似 level（浮点）\r
\r
### \`getCamera()\` / \`setCamera(options)\`\r
获取/设置 Cesium 原生相机对象/参数。\r
\r
---\r
\r
## 场景 API\r
\r
### \`setBackground(color)\`\r
设置背景色（如 \`'#000000'\`）。\r
\r
### \`enableShadow(enable)\`\r
开启/关闭阴影。\r
\r
### \`setFog(options)\`\r
雾效设置（示例）：\r
\r
\`\`\`js\r
map.setFog({ enabled: true, density: 0.01 });\r
\`\`\`\r
\r
### \`setLighting(enable)\`\r
控制 \`viewer.scene.globe.enableLighting\`。\r
\r
---\r
\r
## 事件 API\r
\r
### \`on(event, callback)\`\r
\r
目前实现的事件：\r
- \`click\`\r
\r
\`click\` 回调参数结构：\r
\r
\`\`\`js\r
{\r
  lng,\r
  lat,\r
  height,\r
  cartesian,\r
  screen: { x, y }\r
}\r
\`\`\`\r
\r
点击位置拾取策略（多级兜底）：\r
1. \`scene.pickPosition\`\r
2. \`scene.globe.pick(ray)\`\r
3. \`camera.pickEllipsoid\`\r
\r
### \`off(event, callback?)\`\r
移除监听；不传 \`callback\` 则清空该事件的所有监听。\r
\r
### \`once(event, callback)\`\r
只触发一次。\r
\r
---\r
\r
## 生命周期\r
\r
### \`getViewer()\`\r
获取原生 \`Cesium.Viewer\` 实例。\r
\r
### \`destroy()\`\r
- 销毁内部 \`ScreenSpaceEventHandler\`\r
- 可选解绑 \`window[debug.windowKey]\`\r
- 调用 \`viewer.destroy()\`\r
\r
---\r
\r
## 底图加载与兜底策略（重要）\r
\r
\`baseLayer\` 会尝试按配置加载指定底图；如果失败（例如网络/CORS/超时），会自动 **回退到 Cesium 默认的必应影像**，并保证 \`imageryLayers.length >= 1\`。\r
\r
如果你希望自定义天地图/Google 的 URL 或参数，请通过 \`baseLayer\` 对应的 options 扩展（后续可在 \`Map\` 中开放更完整的 baseLayerOptions 透传）。\r
\r
`,bm=`### SDK架构设计流程图：\r
\r
\`\`\`mermaid\r
flowchart TD\r
    SDK["Cesium SDK (核心)"]\r
\r
    Map["Map<br/>地图核心<br/>- 初始化<br/>- 相机控制<br/>- 场景设置<br/>- 事件监听"]\r
    Layer["Layer<br/>图层管理<br/>- addImage / addTerrain<br/>- addTileset / addWMS / addWMTS<br/>- show/hide / remove / setOpacity"]\r
    Geometry["Geometry<br/>矢量数据<br/>- Entity: 点线面模型标注<br/>- Primitive: 高性能图元"]\r
    Material["Material<br/>材质扩展<br/>- 预设材质库<br/>- 材质工厂<br/>- 自定义材质"]\r
\r
    Tool["Tool<br/>交互工具<br/>- 测量 / 绘制 / 拾取 / 编辑"]\r
    Analysis["Analysis<br/>空间分析<br/>- 可视域 / 通视 / 剖面<br/>- 缓冲区 / 地形分析"]\r
    Control["Control<br/>控件管理<br/>- 内置控件<br/>- 自定义控件"]\r
    Event["Event<br/>事件管理<br/>- 地图/图层/实体事件<br/>- 自定义事件"]\r
    Utils["Utils<br/>工具函数<br/>- 坐标转换 / 数学计算<br/>- 格式转换 / 校验 / 辅助函数"]\r
\r
    SDK --> Map\r
    SDK --> Layer\r
    SDK --> Geometry\r
    SDK --> Material\r
\r
    Map --> Tool\r
    Layer --> Analysis\r
    Geometry --> Control\r
    Tool --> Event\r
    Analysis --> Utils\r
    Material -. "使用工具能力" .-> Utils\r
\`\`\`\r
\r
\r
\r
\r
## Theme - 主题配置模块\r
\r
\`\`\`mermaid\r
mindmap\r
  root((Cesium SDK))\r
    Map(地图核心)\r
      constructor(container, options)\r
      flyTo(lngLatHeight, options)\r
      setView(lngLat, heading, pitch)\r
      zoomTo(target)\r
\`\`\`\r
\r
### SDK API 可视化拆解\r
\r
\`\`\`mermaid\r
flowchart LR\r
    SDK[Cesium SDK]\r
    SDK --> Map[Map]\r
    SDK --> Layer[Layer]\r
    SDK --> Geometry[Geometry]\r
    SDK --> Tool[Tool]\r
    SDK --> Analysis[Analysis]\r
    SDK --> Data[Data]\r
    SDK --> Event[Event]\r
    SDK --> Control[Control]\r
    SDK --> Theme[Theme]\r
    SDK --> Utils[Utils]\r
\`\`\`\r
\r
#### Map 模块 API\r
\`\`\`mermaid\r
mindmap\r
  root((Map))\r
    constructor(container, options)\r
    flyTo(lngLatHeight, options)\r
    setView(lngLat, heading, pitch)\r
    zoomTo(target)\r
    getCamera\r
    setCamera(options)\r
    getCenter\r
    getZoom\r
    setBackground(color)\r
    enableShadow(enable)\r
    setFog(options)\r
    setLighting(enable)\r
    on / off / once\r
    destroy\r
    getViewer\r
\`\`\`\r
\r
#### Layer 模块 API\r
\`\`\`mermaid\r
mindmap\r
  root((Layer))\r
    constructor(map)\r
    addImage(options)\r
      type wmts/wms/url/arcgis\r
      name / url / layer\r
      visible / opacity\r
    addTerrain(options)\r
      url / name / visible\r
    addTileset(options)\r
      url / name / maximumScreenSpaceError / visible\r
    addVector(options)\r
      data GeoJSON/KML\r
      name / style\r
    show / remove / removeAll\r
    setOpacity / bringToTop / sendToBottom\r
    get / getAll\r
\`\`\`\r
\r
#### Geometry 模块 API\r
\`\`\`mermaid\r
mindmap\r
  root((Geometry))\r
    init / remove / show / get / update / clear\r
    Entity\r
      addPoint / addLine / addPolygon\r
      addModel / addLabel / addBillboard\r
      addCircle / addRectangle / addCorridor\r
      update / remove / show / get\r
      onClick / onHover\r
    Primitive\r
      addPointCloud / addLines / addPolygons\r
      addInstances / addWall\r
      addExtrudedPolygon / addTube\r
      update / remove / show / get\r
\`\`\`\r
\r
#### Tool + Analysis 模块 API\r
\`\`\`mermaid\r
mindmap\r
  root((Tool & Analysis))\r
    Tool\r
      constructor(map)\r
      measure distance/area/height/clear\r
      draw point/line/polygon/rectangle/clear\r
      pick start/stop/pickAt\r
      edit start/stop/update\r
      clear\r
    Analysis\r
      constructor(map)\r
      viewshed start/stop\r
      lineOfSight start/stop\r
      profile start/stop\r
      buffer point/line/polygon\r
      terrain getHeight/getSlope/getAspect\r
      clear\r
\`\`\`\r
\r
#### Data + Event + Control + Theme + Utils\r
\`\`\`mermaid\r
mindmap\r
  root((Support Modules))\r
    Data\r
      loadGeoJSON / loadKML / loadCZML\r
      loadModel / loadTileset\r
      parse geojsonToEntities / kmlToEntities\r
    Event\r
      on / off / once / emit\r
      onEntity / offEntity\r
      clear\r
    Control\r
      showZoom / showCompass / showTimeline\r
      showAnimation / showBaseLayerPicker / showNavigation\r
      addButton / addPanel / remove / show\r
    Theme\r
      use dark/light/satellite/custom\r
      set / get / reset\r
    Utils\r
      坐标转换 / 数学计算\r
      格式转换 / 校验函数\r
      辅助函数 / 性能优化\r
\`\`\`\r
\r
## Map 模块（地图核心）\r
\r
职责：地图初始化、相机控制、场景设置\r
\`\`\`javascript\r
// 使用示例\r
import { Map } from 'cim3d';\r
\r
const map = new Map('cesium-container', {\r
  accessToken: 'your_token',\r
  center: [120, 30],      // 初始中心点 [lng, lat]\r
  zoom: 12,                // 相机高度(km)\r
  terrain: true,           // 是否启用地形\r
  baseLayer: 'world'       // 底图: 'world' | 'arcgis' | 'tianditu' | 'google'（arcgis 需能访问 Esri）\r
});\r
\r
// 相机控制\r
map.flyTo([120, 30, 1000]);        // 飞至指定位置\r
map.setView([120, 30], 45);        // 设置视角 [lng, lat], heading\r
map.zoomTo(entities);               // 缩放到指定实体\r
\r
// 场景设置\r
map.setBackground('#000000');       // 背景色\r
map.enableShadow(true);             // 阴影\r
map.setFog({ density: 0.01 });      // 雾效\r
\r
// 事件\r
map.on('click', (position) => {     // 点击事件\r
  console.log('点击位置:', position);\r
});\r
\r
// 销毁\r
map.destroy();\r
\`\`\`\r
核心API：\r
\r
constructor(container, options) - 初始化地图\r
\r
flyTo(lngLatHeight) - 相机飞行\r
\r
setView(lngLat, heading) - 设置视角\r
\r
zoomTo(entity) - 缩放到实体\r
\r
on(event, callback) - 事件监听\r
\r
destroy() - 销毁实例\r
\r
## Layer 模块（图层管理）\r
职责：添加、移除、显示、隐藏、更新、获取、获取所有、设置透明度、bringToTop、sendToBottom\r
\`\`\`javascript\r
import { Layer } from 'cim3d';\r
\r
// 创建图层管理器（需要传入map实例）\r
const layer = new Layer(map);\r
\r
// 添加影像图层\r
const imgLayer = layer.addImagery({\r
  type: 'wmts',\r
  name: '天地图影像',\r
  url: 'http://t0.tianditu.gov.cn/img_w/wmts',\r
  layer: 'img',\r
  visible: true\r
});\r
\r
// 添加地形图层\r
layer.addTerrain({\r
  url: 'https://assets.cesium.com/...',\r
  visible: true\r
});\r
\r
// 添加3DTiles\r
const tileset = layer.add3DTiles({\r
  url: '/data/tileset.json',\r
  name: '建筑物',\r
  maximumScreenSpaceError: 16\r
});\r
\r
// 图层控制\r
layer.show('天地图影像', false);     // 显隐图层\r
layer.remove('天地图影像');          // 移除图层\r
layer.setOpacity('天地图影像', 0.5); // 透明度\r
layer.bringToTop('天地图影像');      // 置顶\r
\r
// 获取图层\r
const myLayer = layer.get('天地图影像');\r
\r
\`\`\`\r
核心API：\r
\r
addImagery(options) - 添加影像图层\r
\r
addTerrain(options) - 添加地形图层\r
\r
add3DTiles(options) - 添加3DTiles图层\r
\r
show(name, visible) - 设置图层显隐\r
\r
remove(name) - 移除图层\r
\r
setOpacity(name, opacity) - 设置透明度\r
\r
get(name) - 获取图层对象\r
\r
## Geometry 模块（几何体管理）\r
点、线、面、模型、标签、广告牌的添加与管理\r
\r
\`\`\`javascript\r
\r
\r
import { Geometry } from 'cim3d';   \r
\r
\r
\`\`\`\r
## Data - 数据处理模块\r
加载GeoJSON、KML、GLTF等数据格式\r
\r
\`\`\`javascript\r
const data = new Data(map);\r
\r
data.loadGeoJSON('/data/buildings.geojson', {\r
  style: (feature) => ({ color: '#00ff00' })\r
});\r
\r
data.loadKML('/data/route.kml');\r
\r
data.loadModel('/data/model.gltf', {\r
  position: [116.39, 39.90],\r
  scale: 10\r
});\r
\r
\`\`\`\r
\r
\r
## Analysis - 空间分析模块\r
通视分析、可视域分析、剖面分析等\r
\r
\`\`\`javascript\r
\r
import { Analysis } from 'cim3d';\r
const analysis = new Analysis(map);\r
\r
analysis.viewshed({\r
  position: [116.39, 39.90, 10],\r
  direction: [0, 1, 0],\r
  range: 500\r
});\r
\r
analysis.lineOfSight({\r
  start: [116.39, 39.90, 10],\r
  end: [116.40, 39.91, 20]\r
});\r
\r
analysis.profile({\r
  positions: [[116.39,39.90], [116.40,39.90], [116.41,39.91]]\r
});\r
\`\`\`\r
\r
## Utils 模块（工具函数）\r
职责：坐标转换、数学计算、格式处理等纯函数工具\r
\r
\`\`\`typescript\r
import { Utils } from 'cim3d';\r
\r
// 坐标转换\r
const cartesian = Utils.toCartesian([120, 30, 100]);     // 经纬度转笛卡尔\r
const lngLat = Utils.toLngLat(cartesian);                 // 笛卡尔转经纬度\r
const wgs84 = Utils.toWGS84([120, 30]);                   // 转WGS84坐标系\r
\r
// 数学计算\r
const distance = Utils.getDistance([120,30], [121,31]);   // 计算两点距离(km)\r
const area = Utils.getArea(polygonPositions);              // 计算多边形面积(km²)\r
const center = Utils.getCenter(points);                   // 获取点集中心\r
\r
// 格式转换\r
const geojson = Utils.toGeoJSON(entities);                // Cesium实体转GeoJSON\r
const entities = Utils.toEntities(geojson, map);          // GeoJSON转Cesium实体\r
\r
// 校验\r
const isValidLngLat = Utils.isValidLngLat([120, 30]);     // 校验经纬度\r
const isValidUrl = Utils.isValidUrl('https://...');       // 校验URL\r
\r
// 其他\r
const guid = Utils.generateId();                          // 生成唯一ID\r
const color = Utils.toCesiumColor('#ff0000');    \r
        // 颜色格式转换\r
\`\`\` \r
工具函数分类：\r
\r
坐标类：toCartesian, toLngLat, toWGS84, fromWGS84\r
\r
计算类：getDistance, getArea, getCenter, getBounds\r
\r
格式类：toGeoJSON, toEntities, toCesiumColor\r
\r
校验类：isValidLngLat, isValidUrl, isValidGeometry\r
\r
辅助类：generateId, debounce, throttle, deepClone\r
\r
## Event - 事件管理模块\r
统一的事件监听、分发、解耦\r
\r
\`\`\`javascript\r
\r
import { Event } from 'cim3d';\r
const event = new Event(map);\r
\r
// 地图事件\r
event.on('click', (pos) => {});\r
event.on('move', (camera) => {});\r
event.on('zoom', (level) => {});\r
\r
// 实体事件\r
event.onEntityClick('entityId', (entity) => {});\r
\r
// 自定义事件\r
event.emit('customEvent', data);\r
\r
// 移除监听\r
event.off('click');\r
\r
\`\`\`\r
\r
## Tool - 交互工具模块\r
测量、标绘、拾取、绘制等工具\r
\r
\`\`\`javascript\r
import { Tool } from 'cim3d';\r
\r
const tool = new Tool(map);\r
\r
// 测量工具\r
tool.measureDistance();\r
tool.measureArea();\r
tool.measureHeight();\r
\r
// 绘制工具\r
tool.drawPoint();\r
tool.drawLine();\r
tool.drawPolygon();\r
\r
// 坐标拾取\r
tool.pick((entity) => {\r
  console.log('选中:', entity);\r
});\r
\r
// 清除所有工具\r
tool.clear();\r
\r
\`\`\`\r
\r
## Control - 控件管理模块\r
地图控件的显隐、自定义控件\r
\r
\`\`\`javascript\r
import { Control } from 'cim3d';\r
const control = new Control(map);\r
\r
// 内置控件\r
control.showZoom(true);\r
control.showCompass(true);\r
control.showScale(true);\r
control.showTimeline(false);\r
\r
// 自定义控件\r
control.addButton({\r
  position: 'top-right',\r
  icon: '✏️',\r
  onClick: () => console.log('draw')\r
});\r
\r
// 移除控件\r
control.remove('myButton');\r
\r
\`\`\`\r
\r
### 比例尺控件 (Scale)\r
\r
\`\`\`javascript\r
import Scale from '@/sdk/Control/Scale/index.js';\r
\r
const scale = new Scale(viewer);\r
\r
// 显示比例尺\r
scale.show({\r
  position: 'bottom-left',  // 位置\r
  maxWidth: 120,            // 最大宽度(px)\r
  units: 'metric',          // 单位: 'metric' | 'imperial'\r
});\r
\r
// 切换单位\r
scale.setOptions({ units: 'imperial' });\r
\r
// 修改位置\r
scale.setPosition('bottom-right');\r
\r
// 隐藏/显示\r
scale.hide();\r
scale.show();\r
\`\`\`\r
`;var _l=Object.defineProperty,g=(r,t)=>_l(r,"name",{value:t,configurable:!0}),km=(r,t)=>{for(var e in t)_l(r,e,{get:t[e],enumerable:!0})},dr={trace:0,debug:1,info:2,warn:3,error:4,fatal:5},P={trace:g((...r)=>{},"trace"),debug:g((...r)=>{},"debug"),info:g((...r)=>{},"info"),warn:g((...r)=>{},"warn"),error:g((...r)=>{},"error"),fatal:g((...r)=>{},"fatal")},ss=g(function(r="fatal"){let t=dr.fatal;typeof r=="string"?r.toLowerCase()in dr&&(t=dr[r]):typeof r=="number"&&(t=r),P.trace=()=>{},P.debug=()=>{},P.info=()=>{},P.warn=()=>{},P.error=()=>{},P.fatal=()=>{},t<=dr.fatal&&(P.fatal=console.error?console.error.bind(console,Ut("FATAL"),"color: orange"):console.log.bind(console,"\x1B[35m",Ut("FATAL"))),t<=dr.error&&(P.error=console.error?console.error.bind(console,Ut("ERROR"),"color: orange"):console.log.bind(console,"\x1B[31m",Ut("ERROR"))),t<=dr.warn&&(P.warn=console.warn?console.warn.bind(console,Ut("WARN"),"color: orange"):console.log.bind(console,"\x1B[33m",Ut("WARN"))),t<=dr.info&&(P.info=console.info?console.info.bind(console,Ut("INFO"),"color: lightblue"):console.log.bind(console,"\x1B[34m",Ut("INFO"))),t<=dr.debug&&(P.debug=console.debug?console.debug.bind(console,Ut("DEBUG"),"color: lightgreen"):console.log.bind(console,"\x1B[32m",Ut("DEBUG"))),t<=dr.trace&&(P.trace=console.debug?console.debug.bind(console,Ut("TRACE"),"color: lightgreen"):console.log.bind(console,"\x1B[32m",Ut("TRACE")))},"setLogLevel"),Ut=g(r=>`%c${Ug().format("ss.SSS")} : ${r} : `,"format");const Wi={min:{r:0,g:0,b:0,s:0,l:0,a:0},max:{r:255,g:255,b:255,h:360,s:100,l:100,a:1},clamp:{r:r=>r>=255?255:r<0?0:r,g:r=>r>=255?255:r<0?0:r,b:r=>r>=255?255:r<0?0:r,h:r=>r%360,s:r=>r>=100?100:r<0?0:r,l:r=>r>=100?100:r<0?0:r,a:r=>r>=1?1:r<0?0:r},toLinear:r=>{const t=r/255;return r>.03928?Math.pow((t+.055)/1.055,2.4):t/12.92},hue2rgb:(r,t,e)=>(e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*(2/3-e)*6:r),hsl2rgb:({h:r,s:t,l:e},i)=>{if(!t)return e*2.55;r/=360,t/=100,e/=100;const n=e<.5?e*(1+t):e+t-e*t,o=2*e-n;switch(i){case"r":return Wi.hue2rgb(o,n,r+1/3)*255;case"g":return Wi.hue2rgb(o,n,r)*255;case"b":return Wi.hue2rgb(o,n,r-1/3)*255}},rgb2hsl:({r,g:t,b:e},i)=>{r/=255,t/=255,e/=255;const n=Math.max(r,t,e),o=Math.min(r,t,e),a=(n+o)/2;if(i==="l")return a*100;if(n===o)return 0;const s=n-o,l=a>.5?s/(2-n-o):s/(n+o);if(i==="s")return l*100;switch(n){case r:return((t-e)/s+(t<e?6:0))*60;case t:return((e-r)/s+2)*60;case e:return((r-t)/s+4)*60;default:return-1}}},wm={clamp:(r,t,e)=>t>e?Math.min(t,Math.max(e,r)):Math.min(e,Math.max(t,r)),round:r=>Math.round(r*1e10)/1e10},Tm=wm,vm={dec2hex:r=>{const t=Math.round(r).toString(16);return t.length>1?t:`0${t}`}},Sm=vm,Q={channel:Wi,lang:Tm,unit:Sm},Tr={};for(let r=0;r<=255;r++)Tr[r]=Q.unit.dec2hex(r);const St={ALL:0,RGB:1,HSL:2};class _m{constructor(){this.type=St.ALL}get(){return this.type}set(t){if(this.type&&this.type!==t)throw new Error("Cannot change both RGB and HSL channels at the same time");this.type=t}reset(){this.type=St.ALL}is(t){return this.type===t}}class Bm{constructor(t,e){this.color=e,this.changed=!1,this.data=t,this.type=new _m}set(t,e){return this.color=e,this.changed=!1,this.data=t,this.type.type=St.ALL,this}_ensureHSL(){const t=this.data,{h:e,s:i,l:n}=t;e===void 0&&(t.h=Q.channel.rgb2hsl(t,"h")),i===void 0&&(t.s=Q.channel.rgb2hsl(t,"s")),n===void 0&&(t.l=Q.channel.rgb2hsl(t,"l"))}_ensureRGB(){const t=this.data,{r:e,g:i,b:n}=t;e===void 0&&(t.r=Q.channel.hsl2rgb(t,"r")),i===void 0&&(t.g=Q.channel.hsl2rgb(t,"g")),n===void 0&&(t.b=Q.channel.hsl2rgb(t,"b"))}get r(){const t=this.data,e=t.r;return!this.type.is(St.HSL)&&e!==void 0?e:(this._ensureHSL(),Q.channel.hsl2rgb(t,"r"))}get g(){const t=this.data,e=t.g;return!this.type.is(St.HSL)&&e!==void 0?e:(this._ensureHSL(),Q.channel.hsl2rgb(t,"g"))}get b(){const t=this.data,e=t.b;return!this.type.is(St.HSL)&&e!==void 0?e:(this._ensureHSL(),Q.channel.hsl2rgb(t,"b"))}get h(){const t=this.data,e=t.h;return!this.type.is(St.RGB)&&e!==void 0?e:(this._ensureRGB(),Q.channel.rgb2hsl(t,"h"))}get s(){const t=this.data,e=t.s;return!this.type.is(St.RGB)&&e!==void 0?e:(this._ensureRGB(),Q.channel.rgb2hsl(t,"s"))}get l(){const t=this.data,e=t.l;return!this.type.is(St.RGB)&&e!==void 0?e:(this._ensureRGB(),Q.channel.rgb2hsl(t,"l"))}get a(){return this.data.a}set r(t){this.type.set(St.RGB),this.changed=!0,this.data.r=t}set g(t){this.type.set(St.RGB),this.changed=!0,this.data.g=t}set b(t){this.type.set(St.RGB),this.changed=!0,this.data.b=t}set h(t){this.type.set(St.HSL),this.changed=!0,this.data.h=t}set s(t){this.type.set(St.HSL),this.changed=!0,this.data.s=t}set l(t){this.type.set(St.HSL),this.changed=!0,this.data.l=t}set a(t){this.changed=!0,this.data.a=t}}const Lm=Bm,Ln=new Lm({r:0,g:0,b:0,a:0},"transparent"),se={re:/^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,parse:r=>{if(r.charCodeAt(0)!==35)return;const t=r.match(se.re);if(!t)return;const e=t[1],i=parseInt(e,16),n=e.length,o=n%4===0,a=n>4,s=a?1:17,l=a?8:4,h=o?0:-1,c=a?255:15;return Ln.set({r:(i>>l*(h+3)&c)*s,g:(i>>l*(h+2)&c)*s,b:(i>>l*(h+1)&c)*s,a:o?(i&c)*s/255:1},r)},stringify:r=>{const{r:t,g:e,b:i,a:n}=r;return n<1?`#${Tr[Math.round(t)]}${Tr[Math.round(e)]}${Tr[Math.round(i)]}${Tr[Math.round(n*255)]}`:`#${Tr[Math.round(t)]}${Tr[Math.round(e)]}${Tr[Math.round(i)]}`}},zr={re:/^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,hueRe:/^(.+?)(deg|grad|rad|turn)$/i,_hue2deg:r=>{const t=r.match(zr.hueRe);if(t){const[,e,i]=t;switch(i){case"grad":return Q.channel.clamp.h(parseFloat(e)*.9);case"rad":return Q.channel.clamp.h(parseFloat(e)*180/Math.PI);case"turn":return Q.channel.clamp.h(parseFloat(e)*360)}}return Q.channel.clamp.h(parseFloat(r))},parse:r=>{const t=r.charCodeAt(0);if(t!==104&&t!==72)return;const e=r.match(zr.re);if(!e)return;const[,i,n,o,a,s]=e;return Ln.set({h:zr._hue2deg(i),s:Q.channel.clamp.s(parseFloat(n)),l:Q.channel.clamp.l(parseFloat(o)),a:a?Q.channel.clamp.a(s?parseFloat(a)/100:parseFloat(a)):1},r)},stringify:r=>{const{h:t,s:e,l:i,a:n}=r;return n<1?`hsla(${Q.lang.round(t)}, ${Q.lang.round(e)}%, ${Q.lang.round(i)}%, ${n})`:`hsl(${Q.lang.round(t)}, ${Q.lang.round(e)}%, ${Q.lang.round(i)}%)`}},Oe={colors:{aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyanaqua:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",transparent:"#00000000",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},parse:r=>{r=r.toLowerCase();const t=Oe.colors[r];if(t)return se.parse(t)},stringify:r=>{const t=se.stringify(r);for(const e in Oe.colors)if(Oe.colors[e]===t)return e}},Fe={re:/^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,parse:r=>{const t=r.charCodeAt(0);if(t!==114&&t!==82)return;const e=r.match(Fe.re);if(!e)return;const[,i,n,o,a,s,l,h,c]=e;return Ln.set({r:Q.channel.clamp.r(n?parseFloat(i)*2.55:parseFloat(i)),g:Q.channel.clamp.g(a?parseFloat(o)*2.55:parseFloat(o)),b:Q.channel.clamp.b(l?parseFloat(s)*2.55:parseFloat(s)),a:h?Q.channel.clamp.a(c?parseFloat(h)/100:parseFloat(h)):1},r)},stringify:r=>{const{r:t,g:e,b:i,a:n}=r;return n<1?`rgba(${Q.lang.round(t)}, ${Q.lang.round(e)}, ${Q.lang.round(i)}, ${Q.lang.round(n)})`:`rgb(${Q.lang.round(t)}, ${Q.lang.round(e)}, ${Q.lang.round(i)})`}},sr={format:{keyword:Oe,hex:se,rgb:Fe,rgba:Fe,hsl:zr,hsla:zr},parse:r=>{if(typeof r!="string")return r;const t=se.parse(r)||Fe.parse(r)||zr.parse(r)||Oe.parse(r);if(t)return t;throw new Error(`Unsupported color format: "${r}"`)},stringify:r=>!r.changed&&r.color?r.color:r.type.is(St.HSL)||r.data.r===void 0?zr.stringify(r):r.a<1||!Number.isInteger(r.r)||!Number.isInteger(r.g)||!Number.isInteger(r.b)?Fe.stringify(r):se.stringify(r)},Bl=(r,t)=>{const e=sr.parse(r);for(const i in t)e[i]=Q.channel.clamp[i](t[i]);return sr.stringify(e)},Br=(r,t,e=0,i=1)=>{if(typeof r!="number")return Bl(r,{a:t});const n=Ln.set({r:Q.channel.clamp.r(r),g:Q.channel.clamp.g(t),b:Q.channel.clamp.b(e),a:Q.channel.clamp.a(i)});return sr.stringify(n)},Fm=r=>{const{r:t,g:e,b:i}=sr.parse(r),n=.2126*Q.channel.toLinear(t)+.7152*Q.channel.toLinear(e)+.0722*Q.channel.toLinear(i);return Q.lang.round(n)},Mm=r=>Fm(r)>=.5,Am=Mm,tr=r=>!Am(r),Ll=(r,t,e)=>{const i=sr.parse(r),n=i[t],o=Q.channel.clamp[t](n+e);return n!==o&&(i[t]=o),sr.stringify(i)},F=(r,t)=>Ll(r,"l",t),L=(r,t)=>Ll(r,"l",-t),x=(r,t)=>{const e=sr.parse(r),i={};for(const n in t)t[n]&&(i[n]=e[n]+t[n]);return Bl(r,i)},Em=(r,t,e=50)=>{const{r:i,g:n,b:o,a}=sr.parse(r),{r:s,g:l,b:h,a:c}=sr.parse(t),d=e/100,p=d*2-1,u=a-c,f=((p*u===-1?p:(p+u)/(1+p*u))+1)/2,y=1-f,C=i*f+s*y,b=n*f+l*y,k=o*f+h*y,T=a*d+c*(1-d);return Br(C,b,k,T)},B=(r,t=100)=>{const e=sr.parse(r);return e.r=255-e.r,e.g=255-e.g,e.b=255-e.b,Em(e,r,t)};var Fl=/^-{3}\s*[\n\r](.*?)[\n\r]-{3}\s*[\n\r]+/s,$e=/%{2}{\s*(?:(\w+)\s*:|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi,Pm=/\s*%%.*\n/gm,ri,Ml=(ri=class extends Error{constructor(t){super(t),this.name="UnknownDiagramError"}},g(ri,"UnknownDiagramError"),ri),Ur={},as=g(function(r,t){r=r.replace(Fl,"").replace($e,"").replace(Pm,`
`);for(const[e,{detector:i}]of Object.entries(Ur))if(i(r,t))return e;throw new Ml(`No diagram type detected matching given configuration for text: ${r}`)},"detectType"),co=g((...r)=>{for(const{id:t,detector:e,loader:i}of r)Al(t,e,i)},"registerLazyLoadedDiagrams"),Al=g((r,t,e)=>{Ur[r]&&P.warn(`Detector with key ${r} already exists. Overwriting.`),Ur[r]={detector:t,loader:e},P.debug(`Detector with key ${r} added${e?" with loader":""}`)},"addDetector"),Dm=g(r=>Ur[r].loader,"getDiagramLoader"),uo=g((r,t,{depth:e=2,clobber:i=!1}={})=>{const n={depth:e,clobber:i};return Array.isArray(t)&&!Array.isArray(r)?(t.forEach(o=>uo(r,o,n)),r):Array.isArray(t)&&Array.isArray(r)?(t.forEach(o=>{r.includes(o)||r.push(o)}),r):r===void 0||e<=0?r!=null&&typeof r=="object"&&typeof t=="object"?Object.assign(r,t):t:(t!==void 0&&typeof r=="object"&&typeof t=="object"&&Object.keys(t).forEach(o=>{typeof t[o]=="object"&&t[o]!==null&&(r[o]===void 0||typeof r[o]=="object")?(r[o]===void 0&&(r[o]=Array.isArray(t[o])?[]:{}),r[o]=uo(r[o],t[o],{depth:e-1,clobber:i})):(i||typeof r[o]!="object"&&typeof t[o]!="object")&&(r[o]=t[o])}),r)},"assignWithDepth"),ft=uo,lr="#ffffff",hr="#f2f2f2",Z=g((r,t)=>t?x(r,{s:-40,l:10}):x(r,{s:-40,l:-10}),"mkBorder"),ei,Im=(ei=class{constructor(){this.background="#f4f4f4",this.primaryColor="#fff4dd",this.noteBkgColor="#fff5ad",this.noteTextColor="#333",this.THEME_COLOR_LIMIT=12,this.radius=5,this.strokeWidth=1,this.fontFamily='"trebuchet ms", verdana, arial, sans-serif',this.fontSize="16px",this.useGradient=!0,this.dropShadow="drop-shadow( 1px 2px 2px rgba(185,185,185,1))"}updateColors(){var e,i,n,o,a,s,l,h,c,d,p,u,m,f,y,C,b,k,T,v,_,w;if(this.primaryTextColor=this.primaryTextColor||(this.darkMode?"#eee":"#333"),this.secondaryColor=this.secondaryColor||x(this.primaryColor,{h:-120}),this.tertiaryColor=this.tertiaryColor||x(this.primaryColor,{h:180,l:5}),this.primaryBorderColor=this.primaryBorderColor||Z(this.primaryColor,this.darkMode),this.secondaryBorderColor=this.secondaryBorderColor||Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=this.tertiaryBorderColor||Z(this.tertiaryColor,this.darkMode),this.noteBorderColor=this.noteBorderColor||Z(this.noteBkgColor,this.darkMode),this.noteBkgColor=this.noteBkgColor||"#fff5ad",this.noteTextColor=this.noteTextColor||"#333",this.secondaryTextColor=this.secondaryTextColor||B(this.secondaryColor),this.tertiaryTextColor=this.tertiaryTextColor||B(this.tertiaryColor),this.lineColor=this.lineColor||B(this.background),this.arrowheadColor=this.arrowheadColor||B(this.background),this.textColor=this.textColor||this.primaryTextColor,this.border2=this.border2||this.tertiaryBorderColor,this.nodeBkg=this.nodeBkg||this.primaryColor,this.mainBkg=this.mainBkg||this.primaryColor,this.nodeBorder=this.nodeBorder||this.primaryBorderColor,this.clusterBkg=this.clusterBkg||this.tertiaryColor,this.clusterBorder=this.clusterBorder||this.tertiaryBorderColor,this.defaultLinkColor=this.defaultLinkColor||this.lineColor,this.titleColor=this.titleColor||this.tertiaryTextColor,this.edgeLabelBackground=this.edgeLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.nodeTextColor=this.nodeTextColor||this.primaryTextColor,this.actorBorder=this.actorBorder||this.primaryBorderColor,this.actorBkg=this.actorBkg||this.mainBkg,this.actorTextColor=this.actorTextColor||this.primaryTextColor,this.actorLineColor=this.actorLineColor||this.actorBorder,this.labelBoxBkgColor=this.labelBoxBkgColor||this.actorBkg,this.signalColor=this.signalColor||this.textColor,this.signalTextColor=this.signalTextColor||this.textColor,this.labelBoxBorderColor=this.labelBoxBorderColor||this.actorBorder,this.labelTextColor=this.labelTextColor||this.actorTextColor,this.loopTextColor=this.loopTextColor||this.actorTextColor,this.activationBorderColor=this.activationBorderColor||L(this.secondaryColor,10),this.activationBkgColor=this.activationBkgColor||this.secondaryColor,this.sequenceNumberColor=this.sequenceNumberColor||B(this.lineColor),this.sectionBkgColor=this.sectionBkgColor||this.tertiaryColor,this.altSectionBkgColor=this.altSectionBkgColor||"white",this.sectionBkgColor=this.sectionBkgColor||this.secondaryColor,this.sectionBkgColor2=this.sectionBkgColor2||this.primaryColor,this.excludeBkgColor=this.excludeBkgColor||"#eeeeee",this.taskBorderColor=this.taskBorderColor||this.primaryBorderColor,this.taskBkgColor=this.taskBkgColor||this.primaryColor,this.activeTaskBorderColor=this.activeTaskBorderColor||this.primaryColor,this.activeTaskBkgColor=this.activeTaskBkgColor||F(this.primaryColor,23),this.gridColor=this.gridColor||"lightgrey",this.doneTaskBkgColor=this.doneTaskBkgColor||"lightgrey",this.doneTaskBorderColor=this.doneTaskBorderColor||"grey",this.critBorderColor=this.critBorderColor||"#ff8888",this.critBkgColor=this.critBkgColor||"red",this.todayLineColor=this.todayLineColor||"red",this.vertLineColor=this.vertLineColor||"navy",this.taskTextColor=this.taskTextColor||this.textColor,this.taskTextOutsideColor=this.taskTextOutsideColor||this.textColor,this.taskTextLightColor=this.taskTextLightColor||this.textColor,this.taskTextColor=this.taskTextColor||this.primaryTextColor,this.taskTextDarkColor=this.taskTextDarkColor||this.textColor,this.taskTextClickableColor=this.taskTextClickableColor||"#003163",this.noteFontWeight=this.noteFontWeight||"normal",this.fontWeight=this.fontWeight||"normal",this.personBorder=this.personBorder||this.primaryBorderColor,this.personBkg=this.personBkg||this.mainBkg,this.darkMode?(this.rowOdd=this.rowOdd||L(this.mainBkg,5)||"#ffffff",this.rowEven=this.rowEven||L(this.mainBkg,10)):(this.rowOdd=this.rowOdd||F(this.mainBkg,75)||"#ffffff",this.rowEven=this.rowEven||F(this.mainBkg,5)),this.transitionColor=this.transitionColor||this.lineColor,this.transitionLabelColor=this.transitionLabelColor||this.textColor,this.stateLabelColor=this.stateLabelColor||this.stateBkg||this.primaryTextColor,this.stateBkg=this.stateBkg||this.mainBkg,this.labelBackgroundColor=this.labelBackgroundColor||this.stateBkg,this.compositeBackground=this.compositeBackground||this.background||this.tertiaryColor,this.altBackground=this.altBackground||this.tertiaryColor,this.compositeTitleBackground=this.compositeTitleBackground||this.mainBkg,this.compositeBorder=this.compositeBorder||this.nodeBorder,this.innerEndBackground=this.nodeBorder,this.errorBkgColor=this.errorBkgColor||this.tertiaryColor,this.errorTextColor=this.errorTextColor||this.tertiaryTextColor,this.transitionColor=this.transitionColor||this.lineColor,this.specialStateColor=this.lineColor,this.cScale0=this.cScale0||this.primaryColor,this.cScale1=this.cScale1||this.secondaryColor,this.cScale2=this.cScale2||this.tertiaryColor,this.cScale3=this.cScale3||x(this.primaryColor,{h:30}),this.cScale4=this.cScale4||x(this.primaryColor,{h:60}),this.cScale5=this.cScale5||x(this.primaryColor,{h:90}),this.cScale6=this.cScale6||x(this.primaryColor,{h:120}),this.cScale7=this.cScale7||x(this.primaryColor,{h:150}),this.cScale8=this.cScale8||x(this.primaryColor,{h:210,l:150}),this.cScale9=this.cScale9||x(this.primaryColor,{h:270}),this.cScale10=this.cScale10||x(this.primaryColor,{h:300}),this.cScale11=this.cScale11||x(this.primaryColor,{h:330}),this.darkMode)for(let S=0;S<this.THEME_COLOR_LIMIT;S++)this["cScale"+S]=L(this["cScale"+S],75);else for(let S=0;S<this.THEME_COLOR_LIMIT;S++)this["cScale"+S]=L(this["cScale"+S],25);for(let S=0;S<this.THEME_COLOR_LIMIT;S++)this["cScaleInv"+S]=this["cScaleInv"+S]||B(this["cScale"+S]);for(let S=0;S<this.THEME_COLOR_LIMIT;S++)this.darkMode?this["cScalePeer"+S]=this["cScalePeer"+S]||F(this["cScale"+S],10):this["cScalePeer"+S]=this["cScalePeer"+S]||L(this["cScale"+S],10);this.scaleLabelColor=this.scaleLabelColor||this.labelTextColor;for(let S=0;S<this.THEME_COLOR_LIMIT;S++)this["cScaleLabel"+S]=this["cScaleLabel"+S]||this.scaleLabelColor;const t=this.darkMode?-4:-1;for(let S=0;S<5;S++)this["surface"+S]=this["surface"+S]||x(this.mainBkg,{h:180,s:-15,l:t*(5+S*3)}),this["surfacePeer"+S]=this["surfacePeer"+S]||x(this.mainBkg,{h:180,s:-15,l:t*(8+S*3)});this.classText=this.classText||this.textColor,this.fillType0=this.fillType0||this.primaryColor,this.fillType1=this.fillType1||this.secondaryColor,this.fillType2=this.fillType2||x(this.primaryColor,{h:64}),this.fillType3=this.fillType3||x(this.secondaryColor,{h:64}),this.fillType4=this.fillType4||x(this.primaryColor,{h:-64}),this.fillType5=this.fillType5||x(this.secondaryColor,{h:-64}),this.fillType6=this.fillType6||x(this.primaryColor,{h:128}),this.fillType7=this.fillType7||x(this.secondaryColor,{h:128}),this.pie1=this.pie1||this.primaryColor,this.pie2=this.pie2||this.secondaryColor,this.pie3=this.pie3||this.tertiaryColor,this.pie4=this.pie4||x(this.primaryColor,{l:-10}),this.pie5=this.pie5||x(this.secondaryColor,{l:-10}),this.pie6=this.pie6||x(this.tertiaryColor,{l:-10}),this.pie7=this.pie7||x(this.primaryColor,{h:60,l:-10}),this.pie8=this.pie8||x(this.primaryColor,{h:-60,l:-10}),this.pie9=this.pie9||x(this.primaryColor,{h:120,l:0}),this.pie10=this.pie10||x(this.primaryColor,{h:60,l:-20}),this.pie11=this.pie11||x(this.primaryColor,{h:-60,l:-20}),this.pie12=this.pie12||x(this.primaryColor,{h:120,l:-10}),this.pieTitleTextSize=this.pieTitleTextSize||"25px",this.pieTitleTextColor=this.pieTitleTextColor||this.taskTextDarkColor,this.pieSectionTextSize=this.pieSectionTextSize||"17px",this.pieSectionTextColor=this.pieSectionTextColor||this.textColor,this.pieLegendTextSize=this.pieLegendTextSize||"17px",this.pieLegendTextColor=this.pieLegendTextColor||this.taskTextDarkColor,this.pieStrokeColor=this.pieStrokeColor||"black",this.pieStrokeWidth=this.pieStrokeWidth||"2px",this.pieOuterStrokeWidth=this.pieOuterStrokeWidth||"2px",this.pieOuterStrokeColor=this.pieOuterStrokeColor||"black",this.pieOpacity=this.pieOpacity||"0.7",this.venn1=this.venn1??x(this.primaryColor,{l:-30}),this.venn2=this.venn2??x(this.secondaryColor,{l:-30}),this.venn3=this.venn3??x(this.tertiaryColor,{l:-30}),this.venn4=this.venn4??x(this.primaryColor,{h:60,l:-30}),this.venn5=this.venn5??x(this.primaryColor,{h:-60,l:-30}),this.venn6=this.venn6??x(this.secondaryColor,{h:60,l:-30}),this.venn7=this.venn7??x(this.primaryColor,{h:120,l:-30}),this.venn8=this.venn8??x(this.secondaryColor,{h:120,l:-30}),this.vennTitleTextColor=this.vennTitleTextColor??this.titleColor,this.vennSetTextColor=this.vennSetTextColor??this.textColor,this.radar={axisColor:((e=this.radar)==null?void 0:e.axisColor)||this.lineColor,axisStrokeWidth:((i=this.radar)==null?void 0:i.axisStrokeWidth)||2,axisLabelFontSize:((n=this.radar)==null?void 0:n.axisLabelFontSize)||12,curveOpacity:((o=this.radar)==null?void 0:o.curveOpacity)||.5,curveStrokeWidth:((a=this.radar)==null?void 0:a.curveStrokeWidth)||2,graticuleColor:((s=this.radar)==null?void 0:s.graticuleColor)||"#DEDEDE",graticuleStrokeWidth:((l=this.radar)==null?void 0:l.graticuleStrokeWidth)||1,graticuleOpacity:((h=this.radar)==null?void 0:h.graticuleOpacity)||.3,legendBoxSize:((c=this.radar)==null?void 0:c.legendBoxSize)||12,legendFontSize:((d=this.radar)==null?void 0:d.legendFontSize)||12},this.archEdgeColor=this.archEdgeColor||"#777",this.archEdgeArrowColor=this.archEdgeArrowColor||"#777",this.archEdgeWidth=this.archEdgeWidth||"3",this.archGroupBorderColor=this.archGroupBorderColor||"#000",this.archGroupBorderWidth=this.archGroupBorderWidth||"2px",this.quadrant1Fill=this.quadrant1Fill||this.primaryColor,this.quadrant2Fill=this.quadrant2Fill||x(this.primaryColor,{r:5,g:5,b:5}),this.quadrant3Fill=this.quadrant3Fill||x(this.primaryColor,{r:10,g:10,b:10}),this.quadrant4Fill=this.quadrant4Fill||x(this.primaryColor,{r:15,g:15,b:15}),this.quadrant1TextFill=this.quadrant1TextFill||this.primaryTextColor,this.quadrant2TextFill=this.quadrant2TextFill||x(this.primaryTextColor,{r:-5,g:-5,b:-5}),this.quadrant3TextFill=this.quadrant3TextFill||x(this.primaryTextColor,{r:-10,g:-10,b:-10}),this.quadrant4TextFill=this.quadrant4TextFill||x(this.primaryTextColor,{r:-15,g:-15,b:-15}),this.quadrantPointFill=this.quadrantPointFill||tr(this.quadrant1Fill)?F(this.quadrant1Fill):L(this.quadrant1Fill),this.quadrantPointTextFill=this.quadrantPointTextFill||this.primaryTextColor,this.quadrantXAxisTextFill=this.quadrantXAxisTextFill||this.primaryTextColor,this.quadrantYAxisTextFill=this.quadrantYAxisTextFill||this.primaryTextColor,this.quadrantInternalBorderStrokeFill=this.quadrantInternalBorderStrokeFill||this.primaryBorderColor,this.quadrantExternalBorderStrokeFill=this.quadrantExternalBorderStrokeFill||this.primaryBorderColor,this.quadrantTitleFill=this.quadrantTitleFill||this.primaryTextColor,this.xyChart={backgroundColor:((p=this.xyChart)==null?void 0:p.backgroundColor)||this.background,titleColor:((u=this.xyChart)==null?void 0:u.titleColor)||this.primaryTextColor,dataLabelColor:((m=this.xyChart)==null?void 0:m.dataLabelColor)||this.primaryTextColor,xAxisTitleColor:((f=this.xyChart)==null?void 0:f.xAxisTitleColor)||this.primaryTextColor,xAxisLabelColor:((y=this.xyChart)==null?void 0:y.xAxisLabelColor)||this.primaryTextColor,xAxisTickColor:((C=this.xyChart)==null?void 0:C.xAxisTickColor)||this.primaryTextColor,xAxisLineColor:((b=this.xyChart)==null?void 0:b.xAxisLineColor)||this.primaryTextColor,yAxisTitleColor:((k=this.xyChart)==null?void 0:k.yAxisTitleColor)||this.primaryTextColor,yAxisLabelColor:((T=this.xyChart)==null?void 0:T.yAxisLabelColor)||this.primaryTextColor,yAxisTickColor:((v=this.xyChart)==null?void 0:v.yAxisTickColor)||this.primaryTextColor,yAxisLineColor:((_=this.xyChart)==null?void 0:_.yAxisLineColor)||this.primaryTextColor,plotColorPalette:((w=this.xyChart)==null?void 0:w.plotColorPalette)||"#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"},this.requirementBackground=this.requirementBackground||this.primaryColor,this.requirementBorderColor=this.requirementBorderColor||this.primaryBorderColor,this.requirementBorderSize=this.requirementBorderSize||"1",this.requirementTextColor=this.requirementTextColor||this.primaryTextColor,this.relationColor=this.relationColor||this.lineColor,this.relationLabelBackground=this.relationLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.relationLabelColor=this.relationLabelColor||this.actorTextColor,this.git0=this.git0||this.primaryColor,this.git1=this.git1||this.secondaryColor,this.git2=this.git2||this.tertiaryColor,this.git3=this.git3||x(this.primaryColor,{h:-30}),this.git4=this.git4||x(this.primaryColor,{h:-60}),this.git5=this.git5||x(this.primaryColor,{h:-90}),this.git6=this.git6||x(this.primaryColor,{h:60}),this.git7=this.git7||x(this.primaryColor,{h:120}),this.darkMode?(this.git0=F(this.git0,25),this.git1=F(this.git1,25),this.git2=F(this.git2,25),this.git3=F(this.git3,25),this.git4=F(this.git4,25),this.git5=F(this.git5,25),this.git6=F(this.git6,25),this.git7=F(this.git7,25)):(this.git0=L(this.git0,25),this.git1=L(this.git1,25),this.git2=L(this.git2,25),this.git3=L(this.git3,25),this.git4=L(this.git4,25),this.git5=L(this.git5,25),this.git6=L(this.git6,25),this.git7=L(this.git7,25)),this.gitInv0=this.gitInv0||B(this.git0),this.gitInv1=this.gitInv1||B(this.git1),this.gitInv2=this.gitInv2||B(this.git2),this.gitInv3=this.gitInv3||B(this.git3),this.gitInv4=this.gitInv4||B(this.git4),this.gitInv5=this.gitInv5||B(this.git5),this.gitInv6=this.gitInv6||B(this.git6),this.gitInv7=this.gitInv7||B(this.git7),this.branchLabelColor=this.branchLabelColor||(this.darkMode?"black":this.labelTextColor),this.gitBranchLabel0=this.gitBranchLabel0||this.branchLabelColor,this.gitBranchLabel1=this.gitBranchLabel1||this.branchLabelColor,this.gitBranchLabel2=this.gitBranchLabel2||this.branchLabelColor,this.gitBranchLabel3=this.gitBranchLabel3||this.branchLabelColor,this.gitBranchLabel4=this.gitBranchLabel4||this.branchLabelColor,this.gitBranchLabel5=this.gitBranchLabel5||this.branchLabelColor,this.gitBranchLabel6=this.gitBranchLabel6||this.branchLabelColor,this.gitBranchLabel7=this.gitBranchLabel7||this.branchLabelColor,this.tagLabelColor=this.tagLabelColor||this.primaryTextColor,this.tagLabelBackground=this.tagLabelBackground||this.primaryColor,this.tagLabelBorder=this.tagBorder||this.primaryBorderColor,this.tagLabelFontSize=this.tagLabelFontSize||"10px",this.commitLabelColor=this.commitLabelColor||this.secondaryTextColor,this.commitLabelBackground=this.commitLabelBackground||this.secondaryColor,this.commitLabelFontSize=this.commitLabelFontSize||"10px",this.attributeBackgroundColorOdd=this.attributeBackgroundColorOdd||lr,this.attributeBackgroundColorEven=this.attributeBackgroundColorEven||hr,this.gradientStart=this.primaryBorderColor,this.gradientStop=this.secondaryBorderColor}calculate(t){if(typeof t!="object"){this.updateColors();return}const e=Object.keys(t);e.forEach(i=>{this[i]=t[i]}),this.updateColors(),e.forEach(i=>{this[i]=t[i]})}},g(ei,"Theme"),ei),Rm=g(r=>{const t=new Im;return t.calculate(r),t},"getThemeVariables"),ii,Om=(ii=class{constructor(){this.background="#333",this.primaryColor="#1f2020",this.secondaryColor=F(this.primaryColor,16),this.tertiaryColor=x(this.primaryColor,{h:-160}),this.primaryBorderColor=B(this.background),this.secondaryBorderColor=Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=Z(this.tertiaryColor,this.darkMode),this.primaryTextColor=B(this.primaryColor),this.secondaryTextColor=B(this.secondaryColor),this.tertiaryTextColor=B(this.tertiaryColor),this.lineColor=B(this.background),this.textColor=B(this.background),this.mainBkg="#1f2020",this.secondBkg="calculated",this.mainContrastColor="lightgrey",this.darkTextColor=F(B("#323D47"),10),this.lineColor="calculated",this.border1="#ccc",this.border2=Br(255,255,255,.25),this.arrowheadColor="calculated",this.fontFamily='"trebuchet ms", verdana, arial, sans-serif',this.fontSize="16px",this.labelBackground="#181818",this.textColor="#ccc",this.THEME_COLOR_LIMIT=12,this.radius=5,this.strokeWidth=1,this.nodeBkg="calculated",this.nodeBorder="calculated",this.clusterBkg="calculated",this.clusterBorder="calculated",this.defaultLinkColor="calculated",this.titleColor="#F9FFFE",this.edgeLabelBackground="calculated",this.actorBorder="calculated",this.actorBkg="calculated",this.actorTextColor="calculated",this.actorLineColor="calculated",this.signalColor="calculated",this.signalTextColor="calculated",this.labelBoxBkgColor="calculated",this.labelBoxBorderColor="calculated",this.labelTextColor="calculated",this.loopTextColor="calculated",this.noteBorderColor="calculated",this.noteBkgColor="#fff5ad",this.noteTextColor="calculated",this.activationBorderColor="calculated",this.activationBkgColor="calculated",this.sequenceNumberColor="black",this.clusterBkg="#302F3D",this.sectionBkgColor=L("#EAE8D9",30),this.altSectionBkgColor="calculated",this.sectionBkgColor2="#EAE8D9",this.excludeBkgColor=L(this.sectionBkgColor,10),this.taskBorderColor=Br(255,255,255,70),this.taskBkgColor="calculated",this.taskTextColor="calculated",this.taskTextLightColor="calculated",this.taskTextOutsideColor="calculated",this.taskTextClickableColor="#003163",this.activeTaskBorderColor=Br(255,255,255,50),this.activeTaskBkgColor="#81B1DB",this.gridColor="calculated",this.doneTaskBkgColor="calculated",this.doneTaskBorderColor="grey",this.critBorderColor="#E83737",this.critBkgColor="#E83737",this.taskTextDarkColor="calculated",this.todayLineColor="#DB5757",this.vertLineColor="#00BFFF",this.personBorder=this.primaryBorderColor,this.personBkg=this.mainBkg,this.archEdgeColor="calculated",this.archEdgeArrowColor="calculated",this.archEdgeWidth="3",this.archGroupBorderColor=this.primaryBorderColor,this.archGroupBorderWidth="2px",this.rowOdd=this.rowOdd||F(this.mainBkg,5)||"#ffffff",this.rowEven=this.rowEven||L(this.mainBkg,10),this.labelColor="calculated",this.errorBkgColor="#a44141",this.errorTextColor="#ddd",this.useGradient=!0,this.gradientStart=this.primaryBorderColor,this.gradientStop=this.secondaryBorderColor,this.dropShadow="drop-shadow( 1px 2px 2px rgba(185,185,185,1))",this.noteFontWeight=this.noteFontWeight||"normal",this.fontWeight=this.fontWeight||"normal"}updateColors(){var t,e,i,n,o,a,s,l,h,c,d,p,u,m,f,y,C,b,k,T,v,_;this.secondBkg=F(this.mainBkg,16),this.lineColor=this.mainContrastColor,this.arrowheadColor=this.mainContrastColor,this.nodeBkg=this.mainBkg,this.nodeBorder=this.border1,this.clusterBkg=this.secondBkg,this.clusterBorder=this.border2,this.defaultLinkColor=this.lineColor,this.edgeLabelBackground=F(this.labelBackground,25),this.actorBorder=this.border1,this.actorBkg=this.mainBkg,this.actorTextColor=this.mainContrastColor,this.actorLineColor=this.actorBorder,this.signalColor=this.mainContrastColor,this.signalTextColor=this.mainContrastColor,this.labelBoxBkgColor=this.actorBkg,this.labelBoxBorderColor=this.actorBorder,this.labelTextColor=this.mainContrastColor,this.loopTextColor=this.mainContrastColor,this.noteBorderColor=this.secondaryBorderColor,this.noteBkgColor=this.secondBkg,this.noteTextColor=this.secondaryTextColor,this.activationBorderColor=this.border1,this.activationBkgColor=this.secondBkg,this.altSectionBkgColor=this.background,this.taskBkgColor=F(this.mainBkg,23),this.taskTextColor=this.darkTextColor,this.taskTextLightColor=this.mainContrastColor,this.taskTextOutsideColor=this.taskTextLightColor,this.gridColor=this.mainContrastColor,this.doneTaskBkgColor=this.mainContrastColor,this.taskTextDarkColor=B(this.doneTaskBkgColor),this.archEdgeColor=this.lineColor,this.archEdgeArrowColor=this.lineColor,this.transitionColor=this.transitionColor||this.lineColor,this.transitionLabelColor=this.transitionLabelColor||this.textColor,this.stateLabelColor=this.stateLabelColor||this.stateBkg||this.primaryTextColor,this.stateBkg=this.stateBkg||this.mainBkg,this.labelBackgroundColor=this.labelBackgroundColor||this.stateBkg,this.compositeBackground=this.compositeBackground||this.background||this.tertiaryColor,this.altBackground=this.altBackground||"#555",this.compositeTitleBackground=this.compositeTitleBackground||this.mainBkg,this.compositeBorder=this.compositeBorder||this.nodeBorder,this.innerEndBackground=this.primaryBorderColor,this.specialStateColor="#f4f4f4",this.errorBkgColor=this.errorBkgColor||this.tertiaryColor,this.errorTextColor=this.errorTextColor||this.tertiaryTextColor,this.fillType0=this.primaryColor,this.fillType1=this.secondaryColor,this.fillType2=x(this.primaryColor,{h:64}),this.fillType3=x(this.secondaryColor,{h:64}),this.fillType4=x(this.primaryColor,{h:-64}),this.fillType5=x(this.secondaryColor,{h:-64}),this.fillType6=x(this.primaryColor,{h:128}),this.fillType7=x(this.secondaryColor,{h:128}),this.cScale1=this.cScale1||"#0b0000",this.cScale2=this.cScale2||"#4d1037",this.cScale3=this.cScale3||"#3f5258",this.cScale4=this.cScale4||"#4f2f1b",this.cScale5=this.cScale5||"#6e0a0a",this.cScale6=this.cScale6||"#3b0048",this.cScale7=this.cScale7||"#995a01",this.cScale8=this.cScale8||"#154706",this.cScale9=this.cScale9||"#161722",this.cScale10=this.cScale10||"#00296f",this.cScale11=this.cScale11||"#01629c",this.cScale12=this.cScale12||"#010029",this.cScale0=this.cScale0||this.primaryColor,this.cScale1=this.cScale1||this.secondaryColor,this.cScale2=this.cScale2||this.tertiaryColor,this.cScale3=this.cScale3||x(this.primaryColor,{h:30}),this.cScale4=this.cScale4||x(this.primaryColor,{h:60}),this.cScale5=this.cScale5||x(this.primaryColor,{h:90}),this.cScale6=this.cScale6||x(this.primaryColor,{h:120}),this.cScale7=this.cScale7||x(this.primaryColor,{h:150}),this.cScale8=this.cScale8||x(this.primaryColor,{h:210}),this.cScale9=this.cScale9||x(this.primaryColor,{h:270}),this.cScale10=this.cScale10||x(this.primaryColor,{h:300}),this.cScale11=this.cScale11||x(this.primaryColor,{h:330});for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["cScaleInv"+w]=this["cScaleInv"+w]||B(this["cScale"+w]);for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["cScalePeer"+w]=this["cScalePeer"+w]||F(this["cScale"+w],10);for(let w=0;w<5;w++)this["surface"+w]=this["surface"+w]||x(this.mainBkg,{h:30,s:-30,l:-(-10+w*4)}),this["surfacePeer"+w]=this["surfacePeer"+w]||x(this.mainBkg,{h:30,s:-30,l:-(-7+w*4)});this.scaleLabelColor=this.scaleLabelColor||(this.darkMode?"black":this.labelTextColor);for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["cScaleLabel"+w]=this["cScaleLabel"+w]||this.scaleLabelColor;for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["pie"+w]=this["cScale"+w];this.pieTitleTextSize=this.pieTitleTextSize||"25px",this.pieTitleTextColor=this.pieTitleTextColor||this.mainContrastColor,this.pieSectionTextSize=this.pieSectionTextSize||"17px",this.pieSectionTextColor=this.pieSectionTextColor||this.textColor,this.pieLegendTextSize=this.pieLegendTextSize||"17px",this.pieLegendTextColor=this.pieLegendTextColor||this.mainContrastColor,this.pieStrokeColor=this.pieStrokeColor||"black",this.pieStrokeWidth=this.pieStrokeWidth||"2px",this.pieOuterStrokeWidth=this.pieOuterStrokeWidth||"2px",this.pieOuterStrokeColor=this.pieOuterStrokeColor||"black",this.pieOpacity=this.pieOpacity||"0.7";for(let w=0;w<8;w++)this["venn"+(w+1)]=this["venn"+(w+1)]??F(this["cScale"+w],30);this.vennTitleTextColor=this.vennTitleTextColor??this.titleColor,this.vennSetTextColor=this.vennSetTextColor??this.textColor,this.quadrant1Fill=this.quadrant1Fill||this.primaryColor,this.quadrant2Fill=this.quadrant2Fill||x(this.primaryColor,{r:5,g:5,b:5}),this.quadrant3Fill=this.quadrant3Fill||x(this.primaryColor,{r:10,g:10,b:10}),this.quadrant4Fill=this.quadrant4Fill||x(this.primaryColor,{r:15,g:15,b:15}),this.quadrant1TextFill=this.quadrant1TextFill||this.primaryTextColor,this.quadrant2TextFill=this.quadrant2TextFill||x(this.primaryTextColor,{r:-5,g:-5,b:-5}),this.quadrant3TextFill=this.quadrant3TextFill||x(this.primaryTextColor,{r:-10,g:-10,b:-10}),this.quadrant4TextFill=this.quadrant4TextFill||x(this.primaryTextColor,{r:-15,g:-15,b:-15}),this.quadrantPointFill=this.quadrantPointFill||tr(this.quadrant1Fill)?F(this.quadrant1Fill):L(this.quadrant1Fill),this.quadrantPointTextFill=this.quadrantPointTextFill||this.primaryTextColor,this.quadrantXAxisTextFill=this.quadrantXAxisTextFill||this.primaryTextColor,this.quadrantYAxisTextFill=this.quadrantYAxisTextFill||this.primaryTextColor,this.quadrantInternalBorderStrokeFill=this.quadrantInternalBorderStrokeFill||this.primaryBorderColor,this.quadrantExternalBorderStrokeFill=this.quadrantExternalBorderStrokeFill||this.primaryBorderColor,this.quadrantTitleFill=this.quadrantTitleFill||this.primaryTextColor,this.xyChart={backgroundColor:((t=this.xyChart)==null?void 0:t.backgroundColor)||this.background,titleColor:((e=this.xyChart)==null?void 0:e.titleColor)||this.primaryTextColor,dataLabelColor:((i=this.xyChart)==null?void 0:i.dataLabelColor)||this.primaryTextColor,xAxisTitleColor:((n=this.xyChart)==null?void 0:n.xAxisTitleColor)||this.primaryTextColor,xAxisLabelColor:((o=this.xyChart)==null?void 0:o.xAxisLabelColor)||this.primaryTextColor,xAxisTickColor:((a=this.xyChart)==null?void 0:a.xAxisTickColor)||this.primaryTextColor,xAxisLineColor:((s=this.xyChart)==null?void 0:s.xAxisLineColor)||this.primaryTextColor,yAxisTitleColor:((l=this.xyChart)==null?void 0:l.yAxisTitleColor)||this.primaryTextColor,yAxisLabelColor:((h=this.xyChart)==null?void 0:h.yAxisLabelColor)||this.primaryTextColor,yAxisTickColor:((c=this.xyChart)==null?void 0:c.yAxisTickColor)||this.primaryTextColor,yAxisLineColor:((d=this.xyChart)==null?void 0:d.yAxisLineColor)||this.primaryTextColor,plotColorPalette:((p=this.xyChart)==null?void 0:p.plotColorPalette)||"#3498db,#2ecc71,#e74c3c,#f1c40f,#bdc3c7,#ffffff,#34495e,#9b59b6,#1abc9c,#e67e22"},this.packet={startByteColor:this.primaryTextColor,endByteColor:this.primaryTextColor,labelColor:this.primaryTextColor,titleColor:this.primaryTextColor,blockStrokeColor:this.primaryTextColor,blockFillColor:this.background},this.radar={axisColor:((u=this.radar)==null?void 0:u.axisColor)||this.lineColor,axisStrokeWidth:((m=this.radar)==null?void 0:m.axisStrokeWidth)||2,axisLabelFontSize:((f=this.radar)==null?void 0:f.axisLabelFontSize)||12,curveOpacity:((y=this.radar)==null?void 0:y.curveOpacity)||.5,curveStrokeWidth:((C=this.radar)==null?void 0:C.curveStrokeWidth)||2,graticuleColor:((b=this.radar)==null?void 0:b.graticuleColor)||"#DEDEDE",graticuleStrokeWidth:((k=this.radar)==null?void 0:k.graticuleStrokeWidth)||1,graticuleOpacity:((T=this.radar)==null?void 0:T.graticuleOpacity)||.3,legendBoxSize:((v=this.radar)==null?void 0:v.legendBoxSize)||12,legendFontSize:((_=this.radar)==null?void 0:_.legendFontSize)||12},this.classText=this.primaryTextColor,this.requirementBackground=this.requirementBackground||this.primaryColor,this.requirementBorderColor=this.requirementBorderColor||this.primaryBorderColor,this.requirementBorderSize=this.requirementBorderSize||"1",this.requirementTextColor=this.requirementTextColor||this.primaryTextColor,this.relationColor=this.relationColor||this.lineColor,this.relationLabelBackground=this.relationLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.relationLabelColor=this.relationLabelColor||this.actorTextColor,this.git0=F(this.secondaryColor,20),this.git1=F(this.pie2||this.secondaryColor,20),this.git2=F(this.pie3||this.tertiaryColor,20),this.git3=F(this.pie4||x(this.primaryColor,{h:-30}),20),this.git4=F(this.pie5||x(this.primaryColor,{h:-60}),20),this.git5=F(this.pie6||x(this.primaryColor,{h:-90}),10),this.git6=F(this.pie7||x(this.primaryColor,{h:60}),10),this.git7=F(this.pie8||x(this.primaryColor,{h:120}),20),this.gitInv0=this.gitInv0||B(this.git0),this.gitInv1=this.gitInv1||B(this.git1),this.gitInv2=this.gitInv2||B(this.git2),this.gitInv3=this.gitInv3||B(this.git3),this.gitInv4=this.gitInv4||B(this.git4),this.gitInv5=this.gitInv5||B(this.git5),this.gitInv6=this.gitInv6||B(this.git6),this.gitInv7=this.gitInv7||B(this.git7),this.gitBranchLabel0=this.gitBranchLabel0||B(this.labelTextColor),this.gitBranchLabel1=this.gitBranchLabel1||this.labelTextColor,this.gitBranchLabel2=this.gitBranchLabel2||this.labelTextColor,this.gitBranchLabel3=this.gitBranchLabel3||B(this.labelTextColor),this.gitBranchLabel4=this.gitBranchLabel4||this.labelTextColor,this.gitBranchLabel5=this.gitBranchLabel5||this.labelTextColor,this.gitBranchLabel6=this.gitBranchLabel6||this.labelTextColor,this.gitBranchLabel7=this.gitBranchLabel7||this.labelTextColor,this.tagLabelColor=this.tagLabelColor||this.primaryTextColor,this.tagLabelBackground=this.tagLabelBackground||this.primaryColor,this.tagLabelBorder=this.tagBorder||this.primaryBorderColor,this.tagLabelFontSize=this.tagLabelFontSize||"10px",this.commitLabelColor=this.commitLabelColor||this.secondaryTextColor,this.commitLabelBackground=this.commitLabelBackground||this.secondaryColor,this.commitLabelFontSize=this.commitLabelFontSize||"10px",this.attributeBackgroundColorOdd=this.attributeBackgroundColorOdd||F(this.background,12),this.attributeBackgroundColorEven=this.attributeBackgroundColorEven||F(this.background,2),this.nodeBorder=this.nodeBorder||"#999"}calculate(t){if(typeof t!="object"){this.updateColors();return}const e=Object.keys(t);e.forEach(i=>{this[i]=t[i]}),this.updateColors(),e.forEach(i=>{this[i]=t[i]})}},g(ii,"Theme"),ii),$m=g(r=>{const t=new Om;return t.calculate(r),t},"getThemeVariables"),ni,Wm=(ni=class{constructor(){this.background="#f4f4f4",this.primaryColor="#ECECFF",this.secondaryColor=x(this.primaryColor,{h:120}),this.secondaryColor="#ffffde",this.tertiaryColor=x(this.primaryColor,{h:-160}),this.primaryBorderColor=Z(this.primaryColor,this.darkMode),this.secondaryBorderColor=Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=Z(this.tertiaryColor,this.darkMode),this.primaryTextColor=B(this.primaryColor),this.secondaryTextColor=B(this.secondaryColor),this.tertiaryTextColor=B(this.tertiaryColor),this.lineColor=B(this.background),this.textColor=B(this.background),this.background="white",this.mainBkg="#ECECFF",this.secondBkg="#ffffde",this.lineColor="#333333",this.border1="#9370DB",this.primaryBorderColor=Z(this.primaryColor,this.darkMode),this.border2="#aaaa33",this.arrowheadColor="#333333",this.fontFamily='"trebuchet ms", verdana, arial, sans-serif',this.fontSize="16px",this.labelBackground="rgba(232,232,232, 0.8)",this.textColor="#333",this.THEME_COLOR_LIMIT=12,this.radius=5,this.strokeWidth=1,this.nodeBkg="calculated",this.nodeBorder="calculated",this.clusterBkg="calculated",this.clusterBorder="calculated",this.defaultLinkColor="calculated",this.titleColor="calculated",this.edgeLabelBackground="calculated",this.actorBorder="calculated",this.actorBkg="calculated",this.actorTextColor="black",this.actorLineColor="calculated",this.signalColor="calculated",this.signalTextColor="calculated",this.labelBoxBkgColor="calculated",this.labelBoxBorderColor="calculated",this.labelTextColor="calculated",this.loopTextColor="calculated",this.noteBorderColor="calculated",this.noteBkgColor="#fff5ad",this.noteTextColor="calculated",this.activationBorderColor="#666",this.activationBkgColor="#f4f4f4",this.sequenceNumberColor="white",this.clusterBkg="#FBFBFF",this.sectionBkgColor="calculated",this.altSectionBkgColor="calculated",this.sectionBkgColor2="calculated",this.excludeBkgColor="#eeeeee",this.taskBorderColor="calculated",this.taskBkgColor="calculated",this.taskTextLightColor="calculated",this.taskTextColor=this.taskTextLightColor,this.taskTextDarkColor="calculated",this.taskTextOutsideColor=this.taskTextDarkColor,this.taskTextClickableColor="calculated",this.activeTaskBorderColor="calculated",this.activeTaskBkgColor="calculated",this.gridColor="calculated",this.doneTaskBkgColor="calculated",this.doneTaskBorderColor="calculated",this.critBorderColor="calculated",this.critBkgColor="calculated",this.todayLineColor="calculated",this.vertLineColor="calculated",this.sectionBkgColor=Br(102,102,255,.49),this.altSectionBkgColor="white",this.sectionBkgColor2="#fff400",this.taskBorderColor="#534fbc",this.taskBkgColor="#8a90dd",this.taskTextLightColor="white",this.taskTextColor="calculated",this.taskTextDarkColor="black",this.taskTextOutsideColor="calculated",this.taskTextClickableColor="#003163",this.activeTaskBorderColor="#534fbc",this.activeTaskBkgColor="#bfc7ff",this.gridColor="lightgrey",this.doneTaskBkgColor="lightgrey",this.doneTaskBorderColor="grey",this.critBorderColor="#ff8888",this.critBkgColor="red",this.todayLineColor="red",this.vertLineColor="navy",this.noteFontWeight=this.noteFontWeight||"normal",this.fontWeight=this.fontWeight||"normal",this.personBorder=this.primaryBorderColor,this.personBkg=this.mainBkg,this.archEdgeColor="calculated",this.archEdgeArrowColor="calculated",this.archEdgeWidth="3",this.archGroupBorderColor=this.primaryBorderColor,this.archGroupBorderWidth="2px",this.rowOdd="calculated",this.rowEven="calculated",this.labelColor="black",this.errorBkgColor="#552222",this.errorTextColor="#552222",this.useGradient=!1,this.gradientStart=this.primaryBorderColor,this.gradientStop=this.secondaryBorderColor,this.dropShadow="drop-shadow(1px 2px 2px rgba(185, 185, 185, 1))",this.updateColors()}updateColors(){var t,e,i,n,o,a,s,l,h,c,d,p,u,m,f,y,C,b,k,T,v,_;this.cScale0=this.cScale0||this.primaryColor,this.cScale1=this.cScale1||this.secondaryColor,this.cScale2=this.cScale2||this.tertiaryColor,this.cScale3=this.cScale3||x(this.primaryColor,{h:30}),this.cScale4=this.cScale4||x(this.primaryColor,{h:60}),this.cScale5=this.cScale5||x(this.primaryColor,{h:90}),this.cScale6=this.cScale6||x(this.primaryColor,{h:120}),this.cScale7=this.cScale7||x(this.primaryColor,{h:150}),this.cScale8=this.cScale8||x(this.primaryColor,{h:210}),this.cScale9=this.cScale9||x(this.primaryColor,{h:270}),this.cScale10=this.cScale10||x(this.primaryColor,{h:300}),this.cScale11=this.cScale11||x(this.primaryColor,{h:330}),this.cScalePeer1=this.cScalePeer1||L(this.secondaryColor,45),this.cScalePeer2=this.cScalePeer2||L(this.tertiaryColor,40);for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["cScale"+w]=L(this["cScale"+w],10),this["cScalePeer"+w]=this["cScalePeer"+w]||L(this["cScale"+w],25);for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["cScaleInv"+w]=this["cScaleInv"+w]||x(this["cScale"+w],{h:180});for(let w=0;w<5;w++)this["surface"+w]=this["surface"+w]||x(this.mainBkg,{h:30,l:-(5+w*5)}),this["surfacePeer"+w]=this["surfacePeer"+w]||x(this.mainBkg,{h:30,l:-(7+w*5)});if(this.scaleLabelColor=this.scaleLabelColor!=="calculated"&&this.scaleLabelColor?this.scaleLabelColor:this.labelTextColor,this.labelTextColor!=="calculated"){this.cScaleLabel0=this.cScaleLabel0||B(this.labelTextColor),this.cScaleLabel3=this.cScaleLabel3||B(this.labelTextColor);for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["cScaleLabel"+w]=this["cScaleLabel"+w]||this.labelTextColor}this.nodeBkg=this.mainBkg,this.nodeBorder=this.border1,this.clusterBkg=this.secondBkg,this.clusterBorder=this.border2,this.defaultLinkColor=this.lineColor,this.titleColor=this.textColor,this.edgeLabelBackground=this.labelBackground,this.actorBorder=this.border1,this.actorBkg=this.mainBkg,this.labelBoxBkgColor=this.actorBkg,this.signalColor=this.textColor,this.signalTextColor=this.textColor,this.labelBoxBorderColor=this.actorBorder,this.labelTextColor=this.actorTextColor,this.loopTextColor=this.actorTextColor,this.noteBorderColor=this.border2,this.noteTextColor=this.actorTextColor,this.actorLineColor=this.actorBorder,this.taskTextColor=this.taskTextLightColor,this.taskTextOutsideColor=this.taskTextDarkColor,this.archEdgeColor=this.lineColor,this.archEdgeArrowColor=this.lineColor,this.rowOdd=this.rowOdd||F(this.primaryColor,75)||"#ffffff",this.rowEven=this.rowEven||F(this.primaryColor,1),this.transitionColor=this.transitionColor||this.lineColor,this.transitionLabelColor=this.transitionLabelColor||this.textColor,this.stateLabelColor=this.stateLabelColor||this.stateBkg||this.primaryTextColor,this.stateBkg=this.stateBkg||this.mainBkg,this.labelBackgroundColor=this.labelBackgroundColor||this.stateBkg,this.compositeBackground=this.compositeBackground||this.background||this.tertiaryColor,this.altBackground=this.altBackground||"#f0f0f0",this.compositeTitleBackground=this.compositeTitleBackground||this.mainBkg,this.compositeBorder=this.compositeBorder||this.nodeBorder,this.innerEndBackground=this.nodeBorder,this.specialStateColor=this.lineColor,this.errorBkgColor=this.errorBkgColor||this.tertiaryColor,this.errorTextColor=this.errorTextColor||this.tertiaryTextColor,this.transitionColor=this.transitionColor||this.lineColor,this.classText=this.primaryTextColor,this.fillType0=this.primaryColor,this.fillType1=this.secondaryColor,this.fillType2=x(this.primaryColor,{h:64}),this.fillType3=x(this.secondaryColor,{h:64}),this.fillType4=x(this.primaryColor,{h:-64}),this.fillType5=x(this.secondaryColor,{h:-64}),this.fillType6=x(this.primaryColor,{h:128}),this.fillType7=x(this.secondaryColor,{h:128}),this.pie1=this.pie1||this.primaryColor,this.pie2=this.pie2||this.secondaryColor,this.pie3=this.pie3||x(this.tertiaryColor,{l:-40}),this.pie4=this.pie4||x(this.primaryColor,{l:-10}),this.pie5=this.pie5||x(this.secondaryColor,{l:-30}),this.pie6=this.pie6||x(this.tertiaryColor,{l:-20}),this.pie7=this.pie7||x(this.primaryColor,{h:60,l:-20}),this.pie8=this.pie8||x(this.primaryColor,{h:-60,l:-40}),this.pie9=this.pie9||x(this.primaryColor,{h:120,l:-40}),this.pie10=this.pie10||x(this.primaryColor,{h:60,l:-40}),this.pie11=this.pie11||x(this.primaryColor,{h:-90,l:-40}),this.pie12=this.pie12||x(this.primaryColor,{h:120,l:-30}),this.pieTitleTextSize=this.pieTitleTextSize||"25px",this.pieTitleTextColor=this.pieTitleTextColor||this.taskTextDarkColor,this.pieSectionTextSize=this.pieSectionTextSize||"17px",this.pieSectionTextColor=this.pieSectionTextColor||this.textColor,this.pieLegendTextSize=this.pieLegendTextSize||"17px",this.pieLegendTextColor=this.pieLegendTextColor||this.taskTextDarkColor,this.pieStrokeColor=this.pieStrokeColor||"black",this.pieStrokeWidth=this.pieStrokeWidth||"2px",this.pieOuterStrokeWidth=this.pieOuterStrokeWidth||"2px",this.pieOuterStrokeColor=this.pieOuterStrokeColor||"black",this.pieOpacity=this.pieOpacity||"0.7",this.venn1=this.venn1??x(this.primaryColor,{l:-30}),this.venn2=this.venn2??x(this.secondaryColor,{l:-30}),this.venn3=this.venn3??x(this.tertiaryColor,{l:-40}),this.venn4=this.venn4??x(this.primaryColor,{h:60,l:-30}),this.venn5=this.venn5??x(this.primaryColor,{h:-60,l:-30}),this.venn6=this.venn6??x(this.secondaryColor,{h:60,l:-30}),this.venn7=this.venn7??x(this.primaryColor,{h:120,l:-30}),this.venn8=this.venn8??x(this.secondaryColor,{h:120,l:-30}),this.vennTitleTextColor=this.vennTitleTextColor??this.titleColor,this.vennSetTextColor=this.vennSetTextColor??this.textColor,this.quadrant1Fill=this.quadrant1Fill||this.primaryColor,this.quadrant2Fill=this.quadrant2Fill||x(this.primaryColor,{r:5,g:5,b:5}),this.quadrant3Fill=this.quadrant3Fill||x(this.primaryColor,{r:10,g:10,b:10}),this.quadrant4Fill=this.quadrant4Fill||x(this.primaryColor,{r:15,g:15,b:15}),this.quadrant1TextFill=this.quadrant1TextFill||this.primaryTextColor,this.quadrant2TextFill=this.quadrant2TextFill||x(this.primaryTextColor,{r:-5,g:-5,b:-5}),this.quadrant3TextFill=this.quadrant3TextFill||x(this.primaryTextColor,{r:-10,g:-10,b:-10}),this.quadrant4TextFill=this.quadrant4TextFill||x(this.primaryTextColor,{r:-15,g:-15,b:-15}),this.quadrantPointFill=this.quadrantPointFill||tr(this.quadrant1Fill)?F(this.quadrant1Fill):L(this.quadrant1Fill),this.quadrantPointTextFill=this.quadrantPointTextFill||this.primaryTextColor,this.quadrantXAxisTextFill=this.quadrantXAxisTextFill||this.primaryTextColor,this.quadrantYAxisTextFill=this.quadrantYAxisTextFill||this.primaryTextColor,this.quadrantInternalBorderStrokeFill=this.quadrantInternalBorderStrokeFill||this.primaryBorderColor,this.quadrantExternalBorderStrokeFill=this.quadrantExternalBorderStrokeFill||this.primaryBorderColor,this.quadrantTitleFill=this.quadrantTitleFill||this.primaryTextColor,this.radar={axisColor:((t=this.radar)==null?void 0:t.axisColor)||this.lineColor,axisStrokeWidth:((e=this.radar)==null?void 0:e.axisStrokeWidth)||2,axisLabelFontSize:((i=this.radar)==null?void 0:i.axisLabelFontSize)||12,curveOpacity:((n=this.radar)==null?void 0:n.curveOpacity)||.5,curveStrokeWidth:((o=this.radar)==null?void 0:o.curveStrokeWidth)||2,graticuleColor:((a=this.radar)==null?void 0:a.graticuleColor)||"#DEDEDE",graticuleStrokeWidth:((s=this.radar)==null?void 0:s.graticuleStrokeWidth)||1,graticuleOpacity:((l=this.radar)==null?void 0:l.graticuleOpacity)||.3,legendBoxSize:((h=this.radar)==null?void 0:h.legendBoxSize)||12,legendFontSize:((c=this.radar)==null?void 0:c.legendFontSize)||12},this.xyChart={backgroundColor:((d=this.xyChart)==null?void 0:d.backgroundColor)||this.background,titleColor:((p=this.xyChart)==null?void 0:p.titleColor)||this.primaryTextColor,dataLabelColor:((u=this.xyChart)==null?void 0:u.dataLabelColor)||this.primaryTextColor,xAxisTitleColor:((m=this.xyChart)==null?void 0:m.xAxisTitleColor)||this.primaryTextColor,xAxisLabelColor:((f=this.xyChart)==null?void 0:f.xAxisLabelColor)||this.primaryTextColor,xAxisTickColor:((y=this.xyChart)==null?void 0:y.xAxisTickColor)||this.primaryTextColor,xAxisLineColor:((C=this.xyChart)==null?void 0:C.xAxisLineColor)||this.primaryTextColor,yAxisTitleColor:((b=this.xyChart)==null?void 0:b.yAxisTitleColor)||this.primaryTextColor,yAxisLabelColor:((k=this.xyChart)==null?void 0:k.yAxisLabelColor)||this.primaryTextColor,yAxisTickColor:((T=this.xyChart)==null?void 0:T.yAxisTickColor)||this.primaryTextColor,yAxisLineColor:((v=this.xyChart)==null?void 0:v.yAxisLineColor)||this.primaryTextColor,plotColorPalette:((_=this.xyChart)==null?void 0:_.plotColorPalette)||"#ECECFF,#8493A6,#FFC3A0,#DCDDE1,#B8E994,#D1A36F,#C3CDE6,#FFB6C1,#496078,#F8F3E3"},this.requirementBackground=this.requirementBackground||this.primaryColor,this.requirementBorderColor=this.requirementBorderColor||this.primaryBorderColor,this.requirementBorderSize=this.requirementBorderSize||"1",this.requirementTextColor=this.requirementTextColor||this.primaryTextColor,this.relationColor=this.relationColor||this.lineColor,this.relationLabelBackground=this.relationLabelBackground||this.labelBackground,this.relationLabelColor=this.relationLabelColor||this.actorTextColor,this.git0=this.git0||this.primaryColor,this.git1=this.git1||this.secondaryColor,this.git2=this.git2||this.tertiaryColor,this.git3=this.git3||x(this.primaryColor,{h:-30}),this.git4=this.git4||x(this.primaryColor,{h:-60}),this.git5=this.git5||x(this.primaryColor,{h:-90}),this.git6=this.git6||x(this.primaryColor,{h:60}),this.git7=this.git7||x(this.primaryColor,{h:120}),this.darkMode?(this.git0=F(this.git0,25),this.git1=F(this.git1,25),this.git2=F(this.git2,25),this.git3=F(this.git3,25),this.git4=F(this.git4,25),this.git5=F(this.git5,25),this.git6=F(this.git6,25),this.git7=F(this.git7,25)):(this.git0=L(this.git0,25),this.git1=L(this.git1,25),this.git2=L(this.git2,25),this.git3=L(this.git3,25),this.git4=L(this.git4,25),this.git5=L(this.git5,25),this.git6=L(this.git6,25),this.git7=L(this.git7,25)),this.gitInv0=this.gitInv0||L(B(this.git0),25),this.gitInv1=this.gitInv1||B(this.git1),this.gitInv2=this.gitInv2||B(this.git2),this.gitInv3=this.gitInv3||B(this.git3),this.gitInv4=this.gitInv4||B(this.git4),this.gitInv5=this.gitInv5||B(this.git5),this.gitInv6=this.gitInv6||B(this.git6),this.gitInv7=this.gitInv7||B(this.git7),this.gitBranchLabel0=this.gitBranchLabel0||B(this.labelTextColor),this.gitBranchLabel1=this.gitBranchLabel1||this.labelTextColor,this.gitBranchLabel2=this.gitBranchLabel2||this.labelTextColor,this.gitBranchLabel3=this.gitBranchLabel3||B(this.labelTextColor),this.gitBranchLabel4=this.gitBranchLabel4||this.labelTextColor,this.gitBranchLabel5=this.gitBranchLabel5||this.labelTextColor,this.gitBranchLabel6=this.gitBranchLabel6||this.labelTextColor,this.gitBranchLabel7=this.gitBranchLabel7||this.labelTextColor,this.tagLabelColor=this.tagLabelColor||this.primaryTextColor,this.tagLabelBackground=this.tagLabelBackground||this.primaryColor,this.tagLabelBorder=this.tagBorder||this.primaryBorderColor,this.tagLabelFontSize=this.tagLabelFontSize||"10px",this.commitLabelColor=this.commitLabelColor||this.secondaryTextColor,this.commitLabelBackground=this.commitLabelBackground||this.secondaryColor,this.commitLabelFontSize=this.commitLabelFontSize||"10px",this.attributeBackgroundColorOdd=this.attributeBackgroundColorOdd||lr,this.attributeBackgroundColorEven=this.attributeBackgroundColorEven||hr}calculate(t){if(Object.keys(this).forEach(i=>{this[i]==="calculated"&&(this[i]=void 0)}),typeof t!="object"){this.updateColors();return}const e=Object.keys(t);e.forEach(i=>{this[i]=t[i]}),this.updateColors(),e.forEach(i=>{this[i]=t[i]})}},g(ni,"Theme"),ni),zm=g(r=>{const t=new Wm;return t.calculate(r),t},"getThemeVariables"),oi,Nm=(oi=class{constructor(){this.background="#f4f4f4",this.primaryColor="#cde498",this.secondaryColor="#cdffb2",this.background="white",this.mainBkg="#cde498",this.secondBkg="#cdffb2",this.lineColor="green",this.border1="#13540c",this.border2="#6eaa49",this.arrowheadColor="green",this.fontFamily='"trebuchet ms", verdana, arial, sans-serif',this.fontSize="16px",this.tertiaryColor=F("#cde498",10),this.primaryBorderColor=Z(this.primaryColor,this.darkMode),this.secondaryBorderColor=Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=Z(this.tertiaryColor,this.darkMode),this.primaryTextColor=B(this.primaryColor),this.secondaryTextColor=B(this.secondaryColor),this.tertiaryTextColor=B(this.primaryColor),this.lineColor=B(this.background),this.textColor=B(this.background),this.THEME_COLOR_LIMIT=12,this.radius=5,this.strokeWidth=1,this.nodeBkg="calculated",this.nodeBorder="calculated",this.clusterBkg="calculated",this.clusterBorder="calculated",this.defaultLinkColor="calculated",this.titleColor="#333",this.edgeLabelBackground="#e8e8e8",this.actorBorder="calculated",this.actorBkg="calculated",this.actorTextColor="black",this.actorLineColor="calculated",this.signalColor="#333",this.signalTextColor="#333",this.labelBoxBkgColor="calculated",this.labelBoxBorderColor="#326932",this.labelTextColor="calculated",this.loopTextColor="calculated",this.noteBorderColor="calculated",this.noteBkgColor="#fff5ad",this.noteTextColor="calculated",this.activationBorderColor="#666",this.activationBkgColor="#f4f4f4",this.sequenceNumberColor="white",this.sectionBkgColor="#6eaa49",this.altSectionBkgColor="white",this.sectionBkgColor2="#6eaa49",this.excludeBkgColor="#eeeeee",this.taskBorderColor="calculated",this.taskBkgColor="#487e3a",this.taskTextLightColor="white",this.taskTextColor="calculated",this.taskTextDarkColor="black",this.taskTextOutsideColor="calculated",this.taskTextClickableColor="#003163",this.activeTaskBorderColor="calculated",this.activeTaskBkgColor="calculated",this.gridColor="lightgrey",this.doneTaskBkgColor="lightgrey",this.doneTaskBorderColor="grey",this.critBorderColor="#ff8888",this.critBkgColor="red",this.todayLineColor="red",this.vertLineColor="#00BFFF",this.personBorder=this.primaryBorderColor,this.personBkg=this.mainBkg,this.archEdgeColor="calculated",this.archEdgeArrowColor="calculated",this.archEdgeWidth="3",this.archGroupBorderColor=this.primaryBorderColor,this.archGroupBorderWidth="2px",this.noteFontWeight="normal",this.fontWeight="normal",this.labelColor="black",this.errorBkgColor="#552222",this.errorTextColor="#552222",this.useGradient=!0,this.gradientStart=this.primaryBorderColor,this.gradientStop=this.secondaryBorderColor,this.dropShadow="drop-shadow( 1px 2px 2px rgba(185,185,185,0.5))"}updateColors(){var t,e,i,n,o,a,s,l,h,c,d,p,u,m,f,y,C,b,k,T,v,_;this.actorBorder=L(this.mainBkg,20),this.actorBkg=this.mainBkg,this.labelBoxBkgColor=this.actorBkg,this.labelTextColor=this.actorTextColor,this.loopTextColor=this.actorTextColor,this.noteBorderColor=this.border2,this.noteTextColor=this.actorTextColor,this.actorLineColor=this.actorBorder,this.cScale0=this.cScale0||this.primaryColor,this.cScale1=this.cScale1||this.secondaryColor,this.cScale2=this.cScale2||this.tertiaryColor,this.cScale3=this.cScale3||x(this.primaryColor,{h:30}),this.cScale4=this.cScale4||x(this.primaryColor,{h:60}),this.cScale5=this.cScale5||x(this.primaryColor,{h:90}),this.cScale6=this.cScale6||x(this.primaryColor,{h:120}),this.cScale7=this.cScale7||x(this.primaryColor,{h:150}),this.cScale8=this.cScale8||x(this.primaryColor,{h:210}),this.cScale9=this.cScale9||x(this.primaryColor,{h:270}),this.cScale10=this.cScale10||x(this.primaryColor,{h:300}),this.cScale11=this.cScale11||x(this.primaryColor,{h:330}),this.cScalePeer1=this.cScalePeer1||L(this.secondaryColor,45),this.cScalePeer2=this.cScalePeer2||L(this.tertiaryColor,40);for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["cScale"+w]=L(this["cScale"+w],10),this["cScalePeer"+w]=this["cScalePeer"+w]||L(this["cScale"+w],25);for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["cScaleInv"+w]=this["cScaleInv"+w]||x(this["cScale"+w],{h:180});this.scaleLabelColor=this.scaleLabelColor!=="calculated"&&this.scaleLabelColor?this.scaleLabelColor:this.labelTextColor;for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["cScaleLabel"+w]=this["cScaleLabel"+w]||this.scaleLabelColor;for(let w=0;w<5;w++)this["surface"+w]=this["surface"+w]||x(this.mainBkg,{h:30,s:-30,l:-(5+w*5)}),this["surfacePeer"+w]=this["surfacePeer"+w]||x(this.mainBkg,{h:30,s:-30,l:-(8+w*5)});this.nodeBkg=this.mainBkg,this.nodeBorder=this.border1,this.clusterBkg=this.secondBkg,this.clusterBorder=this.border2,this.defaultLinkColor=this.lineColor,this.taskBorderColor=this.border1,this.taskTextColor=this.taskTextLightColor,this.taskTextOutsideColor=this.taskTextDarkColor,this.activeTaskBorderColor=this.taskBorderColor,this.activeTaskBkgColor=this.mainBkg,this.archEdgeColor=this.lineColor,this.archEdgeArrowColor=this.lineColor,this.rowOdd=this.rowOdd||F(this.mainBkg,75)||"#ffffff",this.rowEven=this.rowEven||F(this.mainBkg,20),this.transitionColor=this.transitionColor||this.lineColor,this.transitionLabelColor=this.transitionLabelColor||this.textColor,this.stateLabelColor=this.stateLabelColor||this.stateBkg||this.primaryTextColor,this.stateBkg=this.stateBkg||this.mainBkg,this.labelBackgroundColor=this.labelBackgroundColor||this.stateBkg,this.compositeBackground=this.compositeBackground||this.background||this.tertiaryColor,this.altBackground=this.altBackground||"#f0f0f0",this.compositeTitleBackground=this.compositeTitleBackground||this.mainBkg,this.compositeBorder=this.compositeBorder||this.nodeBorder,this.innerEndBackground=this.primaryBorderColor,this.specialStateColor=this.lineColor,this.errorBkgColor=this.errorBkgColor||this.tertiaryColor,this.errorTextColor=this.errorTextColor||this.tertiaryTextColor,this.transitionColor=this.transitionColor||this.lineColor,this.classText=this.primaryTextColor,this.fillType0=this.primaryColor,this.fillType1=this.secondaryColor,this.fillType2=x(this.primaryColor,{h:64}),this.fillType3=x(this.secondaryColor,{h:64}),this.fillType4=x(this.primaryColor,{h:-64}),this.fillType5=x(this.secondaryColor,{h:-64}),this.fillType6=x(this.primaryColor,{h:128}),this.fillType7=x(this.secondaryColor,{h:128}),this.pie1=this.pie1||this.primaryColor,this.pie2=this.pie2||this.secondaryColor,this.pie3=this.pie3||this.tertiaryColor,this.pie4=this.pie4||x(this.primaryColor,{l:-30}),this.pie5=this.pie5||x(this.secondaryColor,{l:-30}),this.pie6=this.pie6||x(this.tertiaryColor,{h:40,l:-40}),this.pie7=this.pie7||x(this.primaryColor,{h:60,l:-10}),this.pie8=this.pie8||x(this.primaryColor,{h:-60,l:-10}),this.pie9=this.pie9||x(this.primaryColor,{h:120,l:0}),this.pie10=this.pie10||x(this.primaryColor,{h:60,l:-50}),this.pie11=this.pie11||x(this.primaryColor,{h:-60,l:-50}),this.pie12=this.pie12||x(this.primaryColor,{h:120,l:-50}),this.pieTitleTextSize=this.pieTitleTextSize||"25px",this.pieTitleTextColor=this.pieTitleTextColor||this.taskTextDarkColor,this.pieSectionTextSize=this.pieSectionTextSize||"17px",this.pieSectionTextColor=this.pieSectionTextColor||this.textColor,this.pieLegendTextSize=this.pieLegendTextSize||"17px",this.pieLegendTextColor=this.pieLegendTextColor||this.taskTextDarkColor,this.pieStrokeColor=this.pieStrokeColor||"black",this.pieStrokeWidth=this.pieStrokeWidth||"2px",this.pieOuterStrokeWidth=this.pieOuterStrokeWidth||"2px",this.pieOuterStrokeColor=this.pieOuterStrokeColor||"black",this.pieOpacity=this.pieOpacity||"0.7",this.venn1=this.venn1??x(this.primaryColor,{l:-30}),this.venn2=this.venn2??x(this.secondaryColor,{l:-30}),this.venn3=this.venn3??x(this.tertiaryColor,{l:-30}),this.venn4=this.venn4??x(this.primaryColor,{h:60,l:-30}),this.venn5=this.venn5??x(this.primaryColor,{h:-60,l:-30}),this.venn6=this.venn6??x(this.secondaryColor,{h:60,l:-30}),this.venn7=this.venn7??x(this.primaryColor,{h:120,l:-30}),this.venn8=this.venn8??x(this.secondaryColor,{h:120,l:-30}),this.vennTitleTextColor=this.vennTitleTextColor??this.titleColor,this.vennSetTextColor=this.vennSetTextColor??this.textColor,this.quadrant1Fill=this.quadrant1Fill||this.primaryColor,this.quadrant2Fill=this.quadrant2Fill||x(this.primaryColor,{r:5,g:5,b:5}),this.quadrant3Fill=this.quadrant3Fill||x(this.primaryColor,{r:10,g:10,b:10}),this.quadrant4Fill=this.quadrant4Fill||x(this.primaryColor,{r:15,g:15,b:15}),this.quadrant1TextFill=this.quadrant1TextFill||this.primaryTextColor,this.quadrant2TextFill=this.quadrant2TextFill||x(this.primaryTextColor,{r:-5,g:-5,b:-5}),this.quadrant3TextFill=this.quadrant3TextFill||x(this.primaryTextColor,{r:-10,g:-10,b:-10}),this.quadrant4TextFill=this.quadrant4TextFill||x(this.primaryTextColor,{r:-15,g:-15,b:-15}),this.quadrantPointFill=this.quadrantPointFill||tr(this.quadrant1Fill)?F(this.quadrant1Fill):L(this.quadrant1Fill),this.quadrantPointTextFill=this.quadrantPointTextFill||this.primaryTextColor,this.quadrantXAxisTextFill=this.quadrantXAxisTextFill||this.primaryTextColor,this.quadrantYAxisTextFill=this.quadrantYAxisTextFill||this.primaryTextColor,this.quadrantInternalBorderStrokeFill=this.quadrantInternalBorderStrokeFill||this.primaryBorderColor,this.quadrantExternalBorderStrokeFill=this.quadrantExternalBorderStrokeFill||this.primaryBorderColor,this.quadrantTitleFill=this.quadrantTitleFill||this.primaryTextColor,this.packet={startByteColor:this.primaryTextColor,endByteColor:this.primaryTextColor,labelColor:this.primaryTextColor,titleColor:this.primaryTextColor,blockStrokeColor:this.primaryTextColor,blockFillColor:this.mainBkg},this.radar={axisColor:((t=this.radar)==null?void 0:t.axisColor)||this.lineColor,axisStrokeWidth:((e=this.radar)==null?void 0:e.axisStrokeWidth)||2,axisLabelFontSize:((i=this.radar)==null?void 0:i.axisLabelFontSize)||12,curveOpacity:((n=this.radar)==null?void 0:n.curveOpacity)||.5,curveStrokeWidth:((o=this.radar)==null?void 0:o.curveStrokeWidth)||2,graticuleColor:((a=this.radar)==null?void 0:a.graticuleColor)||"#DEDEDE",graticuleStrokeWidth:((s=this.radar)==null?void 0:s.graticuleStrokeWidth)||1,graticuleOpacity:((l=this.radar)==null?void 0:l.graticuleOpacity)||.3,legendBoxSize:((h=this.radar)==null?void 0:h.legendBoxSize)||12,legendFontSize:((c=this.radar)==null?void 0:c.legendFontSize)||12},this.xyChart={backgroundColor:((d=this.xyChart)==null?void 0:d.backgroundColor)||this.background,titleColor:((p=this.xyChart)==null?void 0:p.titleColor)||this.primaryTextColor,dataLabelColor:((u=this.xyChart)==null?void 0:u.dataLabelColor)||this.primaryTextColor,xAxisTitleColor:((m=this.xyChart)==null?void 0:m.xAxisTitleColor)||this.primaryTextColor,xAxisLabelColor:((f=this.xyChart)==null?void 0:f.xAxisLabelColor)||this.primaryTextColor,xAxisTickColor:((y=this.xyChart)==null?void 0:y.xAxisTickColor)||this.primaryTextColor,xAxisLineColor:((C=this.xyChart)==null?void 0:C.xAxisLineColor)||this.primaryTextColor,yAxisTitleColor:((b=this.xyChart)==null?void 0:b.yAxisTitleColor)||this.primaryTextColor,yAxisLabelColor:((k=this.xyChart)==null?void 0:k.yAxisLabelColor)||this.primaryTextColor,yAxisTickColor:((T=this.xyChart)==null?void 0:T.yAxisTickColor)||this.primaryTextColor,yAxisLineColor:((v=this.xyChart)==null?void 0:v.yAxisLineColor)||this.primaryTextColor,plotColorPalette:((_=this.xyChart)==null?void 0:_.plotColorPalette)||"#CDE498,#FF6B6B,#A0D2DB,#D7BDE2,#F0F0F0,#FFC3A0,#7FD8BE,#FF9A8B,#FAF3E0,#FFF176"},this.requirementBackground=this.requirementBackground||this.primaryColor,this.requirementBorderColor=this.requirementBorderColor||this.primaryBorderColor,this.requirementBorderSize=this.requirementBorderSize||"1",this.requirementTextColor=this.requirementTextColor||this.primaryTextColor,this.relationColor=this.relationColor||this.lineColor,this.relationLabelBackground=this.relationLabelBackground||this.edgeLabelBackground,this.relationLabelColor=this.relationLabelColor||this.actorTextColor,this.git0=this.git0||this.primaryColor,this.git1=this.git1||this.secondaryColor,this.git2=this.git2||this.tertiaryColor,this.git3=this.git3||x(this.primaryColor,{h:-30}),this.git4=this.git4||x(this.primaryColor,{h:-60}),this.git5=this.git5||x(this.primaryColor,{h:-90}),this.git6=this.git6||x(this.primaryColor,{h:60}),this.git7=this.git7||x(this.primaryColor,{h:120}),this.darkMode?(this.git0=F(this.git0,25),this.git1=F(this.git1,25),this.git2=F(this.git2,25),this.git3=F(this.git3,25),this.git4=F(this.git4,25),this.git5=F(this.git5,25),this.git6=F(this.git6,25),this.git7=F(this.git7,25)):(this.git0=L(this.git0,25),this.git1=L(this.git1,25),this.git2=L(this.git2,25),this.git3=L(this.git3,25),this.git4=L(this.git4,25),this.git5=L(this.git5,25),this.git6=L(this.git6,25),this.git7=L(this.git7,25)),this.gitInv0=this.gitInv0||B(this.git0),this.gitInv1=this.gitInv1||B(this.git1),this.gitInv2=this.gitInv2||B(this.git2),this.gitInv3=this.gitInv3||B(this.git3),this.gitInv4=this.gitInv4||B(this.git4),this.gitInv5=this.gitInv5||B(this.git5),this.gitInv6=this.gitInv6||B(this.git6),this.gitInv7=this.gitInv7||B(this.git7),this.gitBranchLabel0=this.gitBranchLabel0||B(this.labelTextColor),this.gitBranchLabel1=this.gitBranchLabel1||this.labelTextColor,this.gitBranchLabel2=this.gitBranchLabel2||this.labelTextColor,this.gitBranchLabel3=this.gitBranchLabel3||B(this.labelTextColor),this.gitBranchLabel4=this.gitBranchLabel4||this.labelTextColor,this.gitBranchLabel5=this.gitBranchLabel5||this.labelTextColor,this.gitBranchLabel6=this.gitBranchLabel6||this.labelTextColor,this.gitBranchLabel7=this.gitBranchLabel7||this.labelTextColor,this.tagLabelColor=this.tagLabelColor||this.primaryTextColor,this.tagLabelBackground=this.tagLabelBackground||this.primaryColor,this.tagLabelBorder=this.tagBorder||this.primaryBorderColor,this.tagLabelFontSize=this.tagLabelFontSize||"10px",this.commitLabelColor=this.commitLabelColor||this.secondaryTextColor,this.commitLabelBackground=this.commitLabelBackground||this.secondaryColor,this.commitLabelFontSize=this.commitLabelFontSize||"10px",this.attributeBackgroundColorOdd=this.attributeBackgroundColorOdd||lr,this.attributeBackgroundColorEven=this.attributeBackgroundColorEven||hr}calculate(t){if(typeof t!="object"){this.updateColors();return}const e=Object.keys(t);e.forEach(i=>{this[i]=t[i]}),this.updateColors(),e.forEach(i=>{this[i]=t[i]})}},g(oi,"Theme"),oi),qm=g(r=>{const t=new Nm;return t.calculate(r),t},"getThemeVariables"),si,jm=(si=class{constructor(){this.primaryColor="#eee",this.contrast="#707070",this.secondaryColor=F(this.contrast,55),this.background="#ffffff",this.tertiaryColor=x(this.primaryColor,{h:-160}),this.primaryBorderColor=Z(this.primaryColor,this.darkMode),this.secondaryBorderColor=Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=Z(this.tertiaryColor,this.darkMode),this.primaryTextColor=B(this.primaryColor),this.secondaryTextColor=B(this.secondaryColor),this.tertiaryTextColor=B(this.tertiaryColor),this.lineColor=B(this.background),this.textColor=B(this.background),this.mainBkg="#eee",this.secondBkg="calculated",this.lineColor="#666",this.border1="#999",this.border2="calculated",this.note="#ffa",this.text="#333",this.critical="#d42",this.done="#bbb",this.arrowheadColor="#333333",this.fontFamily='"trebuchet ms", verdana, arial, sans-serif',this.fontSize="16px",this.THEME_COLOR_LIMIT=12,this.radius=5,this.strokeWidth=1,this.nodeBkg="calculated",this.nodeBorder="calculated",this.clusterBkg="calculated",this.clusterBorder="calculated",this.defaultLinkColor="calculated",this.titleColor="calculated",this.edgeLabelBackground="white",this.actorBorder="calculated",this.actorBkg="calculated",this.actorTextColor="calculated",this.actorLineColor=this.actorBorder,this.signalColor="calculated",this.signalTextColor="calculated",this.labelBoxBkgColor="calculated",this.labelBoxBorderColor="calculated",this.labelTextColor="calculated",this.loopTextColor="calculated",this.noteBorderColor="calculated",this.noteBkgColor="calculated",this.noteTextColor="calculated",this.activationBorderColor="#666",this.activationBkgColor="#f4f4f4",this.sequenceNumberColor="white",this.sectionBkgColor="calculated",this.altSectionBkgColor="white",this.sectionBkgColor2="calculated",this.excludeBkgColor="#eeeeee",this.taskBorderColor="calculated",this.taskBkgColor="calculated",this.taskTextLightColor="white",this.taskTextColor="calculated",this.taskTextDarkColor="calculated",this.taskTextOutsideColor="calculated",this.taskTextClickableColor="#003163",this.activeTaskBorderColor="calculated",this.activeTaskBkgColor="calculated",this.gridColor="calculated",this.doneTaskBkgColor="calculated",this.doneTaskBorderColor="calculated",this.critBkgColor="calculated",this.critBorderColor="calculated",this.todayLineColor="calculated",this.vertLineColor="calculated",this.personBorder=this.primaryBorderColor,this.personBkg=this.mainBkg,this.archEdgeColor="calculated",this.archEdgeArrowColor="calculated",this.archEdgeWidth="3",this.archGroupBorderColor=this.primaryBorderColor,this.archGroupBorderWidth="2px",this.noteFontWeight="normal",this.fontWeight="normal",this.rowOdd=this.rowOdd||F(this.mainBkg,75)||"#ffffff",this.rowEven=this.rowEven||"#f4f4f4",this.labelColor="black",this.errorBkgColor="#552222",this.errorTextColor="#552222",this.useGradient=!0,this.gradientStart=this.primaryBorderColor,this.gradientStop=this.secondaryBorderColor,this.dropShadow="drop-shadow( 1px 2px 2px rgba(185,185,185,1))"}updateColors(){var t,e,i,n,o,a,s,l,h,c,d,p,u,m,f,y,C,b,k,T,v,_;this.secondBkg=F(this.contrast,55),this.border2=this.contrast,this.actorBorder=F(this.border1,23),this.actorBkg=this.mainBkg,this.actorTextColor=this.text,this.actorLineColor=this.actorBorder,this.signalColor=this.text,this.signalTextColor=this.text,this.labelBoxBkgColor=this.actorBkg,this.labelBoxBorderColor=this.actorBorder,this.labelTextColor=this.text,this.loopTextColor=this.text,this.noteBorderColor="#999",this.noteBkgColor="#666",this.noteTextColor="#fff",this.cScale0=this.cScale0||"#555",this.cScale1=this.cScale1||"#F4F4F4",this.cScale2=this.cScale2||"#555",this.cScale3=this.cScale3||"#BBB",this.cScale4=this.cScale4||"#777",this.cScale5=this.cScale5||"#999",this.cScale6=this.cScale6||"#DDD",this.cScale7=this.cScale7||"#FFF",this.cScale8=this.cScale8||"#DDD",this.cScale9=this.cScale9||"#BBB",this.cScale10=this.cScale10||"#999",this.cScale11=this.cScale11||"#777";for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["cScaleInv"+w]=this["cScaleInv"+w]||B(this["cScale"+w]);for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this.darkMode?this["cScalePeer"+w]=this["cScalePeer"+w]||F(this["cScale"+w],10):this["cScalePeer"+w]=this["cScalePeer"+w]||L(this["cScale"+w],10);this.scaleLabelColor=this.scaleLabelColor||(this.darkMode?"black":this.labelTextColor),this.cScaleLabel0=this.cScaleLabel0||this.cScale1,this.cScaleLabel2=this.cScaleLabel2||this.cScale1;for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["cScaleLabel"+w]=this["cScaleLabel"+w]||this.scaleLabelColor;for(let w=0;w<5;w++)this["surface"+w]=this["surface"+w]||x(this.mainBkg,{l:-(5+w*5)}),this["surfacePeer"+w]=this["surfacePeer"+w]||x(this.mainBkg,{l:-(8+w*5)});this.nodeBkg=this.mainBkg,this.nodeBorder=this.border1,this.clusterBkg=this.secondBkg,this.clusterBorder=this.border2,this.defaultLinkColor=this.lineColor,this.titleColor=this.text,this.sectionBkgColor=F(this.contrast,30),this.sectionBkgColor2=F(this.contrast,30),this.taskBorderColor=L(this.contrast,10),this.taskBkgColor=this.contrast,this.taskTextColor=this.taskTextLightColor,this.taskTextDarkColor=this.text,this.taskTextOutsideColor=this.taskTextDarkColor,this.activeTaskBorderColor=this.taskBorderColor,this.activeTaskBkgColor=this.mainBkg,this.gridColor=F(this.border1,30),this.doneTaskBkgColor=this.done,this.doneTaskBorderColor=this.lineColor,this.critBkgColor=this.critical,this.critBorderColor=L(this.critBkgColor,10),this.todayLineColor=this.critBkgColor,this.vertLineColor=this.critBkgColor,this.archEdgeColor=this.lineColor,this.archEdgeArrowColor=this.lineColor,this.transitionColor=this.transitionColor||"#000",this.transitionLabelColor=this.transitionLabelColor||this.textColor,this.stateLabelColor=this.stateLabelColor||this.stateBkg||this.primaryTextColor,this.stateBkg=this.stateBkg||this.mainBkg,this.labelBackgroundColor=this.labelBackgroundColor||this.stateBkg,this.compositeBackground=this.compositeBackground||this.background||this.tertiaryColor,this.altBackground=this.altBackground||"#f4f4f4",this.compositeTitleBackground=this.compositeTitleBackground||this.mainBkg,this.stateBorder=this.stateBorder||"#000",this.innerEndBackground=this.primaryBorderColor,this.specialStateColor="#222",this.errorBkgColor=this.errorBkgColor||this.tertiaryColor,this.errorTextColor=this.errorTextColor||this.tertiaryTextColor,this.classText=this.primaryTextColor,this.fillType0=this.primaryColor,this.fillType1=this.secondaryColor,this.fillType2=x(this.primaryColor,{h:64}),this.fillType3=x(this.secondaryColor,{h:64}),this.fillType4=x(this.primaryColor,{h:-64}),this.fillType5=x(this.secondaryColor,{h:-64}),this.fillType6=x(this.primaryColor,{h:128}),this.fillType7=x(this.secondaryColor,{h:128});for(let w=0;w<this.THEME_COLOR_LIMIT;w++)this["pie"+w]=this["cScale"+w];this.pie12=this.pie0,this.pieTitleTextSize=this.pieTitleTextSize||"25px",this.pieTitleTextColor=this.pieTitleTextColor||this.taskTextDarkColor,this.pieSectionTextSize=this.pieSectionTextSize||"17px",this.pieSectionTextColor=this.pieSectionTextColor||this.textColor,this.pieLegendTextSize=this.pieLegendTextSize||"17px",this.pieLegendTextColor=this.pieLegendTextColor||this.taskTextDarkColor,this.pieStrokeColor=this.pieStrokeColor||"black",this.pieStrokeWidth=this.pieStrokeWidth||"2px",this.pieOuterStrokeWidth=this.pieOuterStrokeWidth||"2px",this.pieOuterStrokeColor=this.pieOuterStrokeColor||"black",this.pieOpacity=this.pieOpacity||"0.7";for(let w=0;w<8;w++)this["venn"+(w+1)]=this["venn"+(w+1)]??this["cScale"+w];this.vennTitleTextColor=this.vennTitleTextColor??this.titleColor,this.vennSetTextColor=this.vennSetTextColor??this.textColor,this.quadrant1Fill=this.quadrant1Fill||this.primaryColor,this.quadrant2Fill=this.quadrant2Fill||x(this.primaryColor,{r:5,g:5,b:5}),this.quadrant3Fill=this.quadrant3Fill||x(this.primaryColor,{r:10,g:10,b:10}),this.quadrant4Fill=this.quadrant4Fill||x(this.primaryColor,{r:15,g:15,b:15}),this.quadrant1TextFill=this.quadrant1TextFill||this.primaryTextColor,this.quadrant2TextFill=this.quadrant2TextFill||x(this.primaryTextColor,{r:-5,g:-5,b:-5}),this.quadrant3TextFill=this.quadrant3TextFill||x(this.primaryTextColor,{r:-10,g:-10,b:-10}),this.quadrant4TextFill=this.quadrant4TextFill||x(this.primaryTextColor,{r:-15,g:-15,b:-15}),this.quadrantPointFill=this.quadrantPointFill||tr(this.quadrant1Fill)?F(this.quadrant1Fill):L(this.quadrant1Fill),this.quadrantPointTextFill=this.quadrantPointTextFill||this.primaryTextColor,this.quadrantXAxisTextFill=this.quadrantXAxisTextFill||this.primaryTextColor,this.quadrantYAxisTextFill=this.quadrantYAxisTextFill||this.primaryTextColor,this.quadrantInternalBorderStrokeFill=this.quadrantInternalBorderStrokeFill||this.primaryBorderColor,this.quadrantExternalBorderStrokeFill=this.quadrantExternalBorderStrokeFill||this.primaryBorderColor,this.quadrantTitleFill=this.quadrantTitleFill||this.primaryTextColor,this.xyChart={backgroundColor:((t=this.xyChart)==null?void 0:t.backgroundColor)||this.background,titleColor:((e=this.xyChart)==null?void 0:e.titleColor)||this.primaryTextColor,dataLabelColor:((i=this.xyChart)==null?void 0:i.dataLabelColor)||this.primaryTextColor,xAxisTitleColor:((n=this.xyChart)==null?void 0:n.xAxisTitleColor)||this.primaryTextColor,xAxisLabelColor:((o=this.xyChart)==null?void 0:o.xAxisLabelColor)||this.primaryTextColor,xAxisTickColor:((a=this.xyChart)==null?void 0:a.xAxisTickColor)||this.primaryTextColor,xAxisLineColor:((s=this.xyChart)==null?void 0:s.xAxisLineColor)||this.primaryTextColor,yAxisTitleColor:((l=this.xyChart)==null?void 0:l.yAxisTitleColor)||this.primaryTextColor,yAxisLabelColor:((h=this.xyChart)==null?void 0:h.yAxisLabelColor)||this.primaryTextColor,yAxisTickColor:((c=this.xyChart)==null?void 0:c.yAxisTickColor)||this.primaryTextColor,yAxisLineColor:((d=this.xyChart)==null?void 0:d.yAxisLineColor)||this.primaryTextColor,plotColorPalette:((p=this.xyChart)==null?void 0:p.plotColorPalette)||"#EEE,#6BB8E4,#8ACB88,#C7ACD6,#E8DCC2,#FFB2A8,#FFF380,#7E8D91,#FFD8B1,#FAF3E0"},this.radar={axisColor:((u=this.radar)==null?void 0:u.axisColor)||this.lineColor,axisStrokeWidth:((m=this.radar)==null?void 0:m.axisStrokeWidth)||2,axisLabelFontSize:((f=this.radar)==null?void 0:f.axisLabelFontSize)||12,curveOpacity:((y=this.radar)==null?void 0:y.curveOpacity)||.5,curveStrokeWidth:((C=this.radar)==null?void 0:C.curveStrokeWidth)||2,graticuleColor:((b=this.radar)==null?void 0:b.graticuleColor)||"#DEDEDE",graticuleStrokeWidth:((k=this.radar)==null?void 0:k.graticuleStrokeWidth)||1,graticuleOpacity:((T=this.radar)==null?void 0:T.graticuleOpacity)||.3,legendBoxSize:((v=this.radar)==null?void 0:v.legendBoxSize)||12,legendFontSize:((_=this.radar)==null?void 0:_.legendFontSize)||12},this.requirementBackground=this.requirementBackground||this.primaryColor,this.requirementBorderColor=this.requirementBorderColor||this.primaryBorderColor,this.requirementBorderSize=this.requirementBorderSize||"1",this.requirementTextColor=this.requirementTextColor||this.primaryTextColor,this.relationColor=this.relationColor||this.lineColor,this.relationLabelBackground=this.relationLabelBackground||this.edgeLabelBackground,this.relationLabelColor=this.relationLabelColor||this.actorTextColor,this.git0=L(this.pie1,25)||this.primaryColor,this.git1=this.pie2||this.secondaryColor,this.git2=this.pie3||this.tertiaryColor,this.git3=this.pie4||x(this.primaryColor,{h:-30}),this.git4=this.pie5||x(this.primaryColor,{h:-60}),this.git5=this.pie6||x(this.primaryColor,{h:-90}),this.git6=this.pie7||x(this.primaryColor,{h:60}),this.git7=this.pie8||x(this.primaryColor,{h:120}),this.gitInv0=this.gitInv0||B(this.git0),this.gitInv1=this.gitInv1||B(this.git1),this.gitInv2=this.gitInv2||B(this.git2),this.gitInv3=this.gitInv3||B(this.git3),this.gitInv4=this.gitInv4||B(this.git4),this.gitInv5=this.gitInv5||B(this.git5),this.gitInv6=this.gitInv6||B(this.git6),this.gitInv7=this.gitInv7||B(this.git7),this.branchLabelColor=this.branchLabelColor||this.labelTextColor,this.gitBranchLabel0=this.branchLabelColor,this.gitBranchLabel1="white",this.gitBranchLabel2=this.branchLabelColor,this.gitBranchLabel3="white",this.gitBranchLabel4=this.branchLabelColor,this.gitBranchLabel5=this.branchLabelColor,this.gitBranchLabel6=this.branchLabelColor,this.gitBranchLabel7=this.branchLabelColor,this.tagLabelColor=this.tagLabelColor||this.primaryTextColor,this.tagLabelBackground=this.tagLabelBackground||this.primaryColor,this.tagLabelBorder=this.tagBorder||this.primaryBorderColor,this.tagLabelFontSize=this.tagLabelFontSize||"10px",this.commitLabelColor=this.commitLabelColor||this.secondaryTextColor,this.commitLabelBackground=this.commitLabelBackground||this.secondaryColor,this.commitLabelFontSize=this.commitLabelFontSize||"10px",this.attributeBackgroundColorOdd=this.attributeBackgroundColorOdd||lr,this.attributeBackgroundColorEven=this.attributeBackgroundColorEven||hr}calculate(t){if(typeof t!="object"){this.updateColors();return}const e=Object.keys(t);e.forEach(i=>{this[i]=t[i]}),this.updateColors(),e.forEach(i=>{this[i]=t[i]})}},g(si,"Theme"),si),Hm=g(r=>{const t=new jm;return t.calculate(r),t},"getThemeVariables"),ai,Um=(ai=class{constructor(){this.background="#ffffff",this.primaryColor="#cccccc",this.mainBkg="#ffffff",this.noteBkgColor="#fff5ad",this.noteTextColor="#333",this.THEME_COLOR_LIMIT=12,this.radius=3,this.strokeWidth=2,this.primaryBorderColor=Z(this.primaryColor,this.darkMode),this.fontFamily="arial, sans-serif",this.fontSize="14px",this.nodeBorder="#000000",this.stateBorder="#000000",this.useGradient=!0,this.gradientStart="#0042eb",this.gradientStop="#eb0042",this.dropShadow="drop-shadow( 0px 1px 2px rgba(0, 0, 0, 0.25));",this.tertiaryColor="#ffffff",this.archEdgeColor="calculated",this.archEdgeArrowColor="calculated",this.archEdgeWidth="3",this.archGroupBorderColor=this.primaryBorderColor,this.archGroupBorderWidth="2px",this.noteFontWeight="normal",this.fontWeight="normal"}updateColors(){var o,a,s,l,h,c,d,p,u,m,f;this.primaryTextColor=this.primaryTextColor||(this.darkMode?"#eee":"#333"),this.secondaryColor=this.secondaryColor||x(this.primaryColor,{h:-120}),this.tertiaryColor=this.tertiaryColor||x(this.primaryColor,{h:180,l:5}),this.primaryBorderColor=this.primaryBorderColor||Z(this.primaryColor,this.darkMode),this.secondaryBorderColor=this.secondaryBorderColor||Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=this.tertiaryBorderColor||Z(this.tertiaryColor,this.darkMode),this.noteBorderColor=this.noteBorderColor||Z(this.noteBkgColor,this.darkMode),this.noteBkgColor=this.noteBkgColor||"#fff5ad",this.noteTextColor=this.noteTextColor||"#333",this.secondaryTextColor=this.secondaryTextColor||B(this.secondaryColor),this.tertiaryTextColor=this.tertiaryTextColor||B(this.tertiaryColor),this.lineColor=this.lineColor||B(this.background),this.arrowheadColor=this.arrowheadColor||B(this.background),this.textColor=this.textColor||this.primaryTextColor,this.border2=this.border2||this.tertiaryBorderColor,this.nodeBkg=this.nodeBkg||this.primaryColor,this.mainBkg=this.mainBkg||this.primaryColor,this.nodeBorder=this.nodeBorder||this.primaryBorderColor,this.clusterBkg=this.clusterBkg||this.tertiaryColor,this.clusterBorder=this.clusterBorder||this.tertiaryBorderColor,this.defaultLinkColor=this.defaultLinkColor||this.lineColor,this.titleColor=this.titleColor||this.tertiaryTextColor,this.edgeLabelBackground=this.edgeLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.nodeTextColor=this.nodeTextColor||this.primaryTextColor,this.actorBorder=this.actorBorder||this.primaryBorderColor,this.actorBkg=this.actorBkg||this.mainBkg,this.actorTextColor=this.actorTextColor||this.primaryTextColor,this.actorLineColor=this.actorLineColor||this.actorBorder,this.labelBoxBkgColor=this.labelBoxBkgColor||this.actorBkg,this.signalColor=this.signalColor||this.textColor,this.signalTextColor=this.signalTextColor||this.textColor,this.labelBoxBorderColor=this.labelBoxBorderColor||this.actorBorder,this.labelTextColor=this.labelTextColor||this.actorTextColor,this.loopTextColor=this.loopTextColor||this.actorTextColor,this.activationBorderColor=this.activationBorderColor||L(this.secondaryColor,10),this.activationBkgColor=this.activationBkgColor||this.secondaryColor,this.sequenceNumberColor=this.sequenceNumberColor||B(this.lineColor);const t="#ECECFE",e="#E9E9F1",i=x(t,{h:180,l:5});if(this.sectionBkgColor=this.sectionBkgColor||i,this.altSectionBkgColor=this.altSectionBkgColor||"white",this.sectionBkgColor=this.sectionBkgColor||e,this.sectionBkgColor2=this.sectionBkgColor2||t,this.excludeBkgColor=this.excludeBkgColor||"#eeeeee",this.taskBorderColor=this.taskBorderColor||this.primaryBorderColor,this.taskBkgColor=this.taskBkgColor||t,this.activeTaskBorderColor=this.activeTaskBorderColor||t,this.activeTaskBkgColor=this.activeTaskBkgColor||F(t,23),this.gridColor=this.gridColor||"lightgrey",this.doneTaskBkgColor=this.doneTaskBkgColor||"lightgrey",this.doneTaskBorderColor=this.doneTaskBorderColor||"grey",this.critBorderColor=this.critBorderColor||"#ff8888",this.critBkgColor=this.critBkgColor||"red",this.todayLineColor=this.todayLineColor||"red",this.taskTextColor=this.taskTextColor||this.textColor,this.taskTextOutsideColor=this.taskTextOutsideColor||this.textColor,this.vertLineColor=this.vertLineColor||this.primaryBorderColor,this.taskTextLightColor=this.taskTextLightColor||this.textColor,this.taskTextColor=this.taskTextColor||this.primaryTextColor,this.taskTextDarkColor=this.taskTextDarkColor||this.textColor,this.taskTextClickableColor=this.taskTextClickableColor||"#003163",this.archEdgeColor=this.lineColor,this.archEdgeArrowColor=this.lineColor,this.personBorder=this.personBorder||this.primaryBorderColor,this.personBkg=this.personBkg||this.mainBkg,this.transitionColor=this.transitionColor||this.lineColor,this.transitionLabelColor=this.transitionLabelColor||this.textColor,this.stateLabelColor=this.stateLabelColor||this.stateBkg||this.primaryTextColor,this.stateBkg=this.stateBkg||this.mainBkg,this.labelBackgroundColor=this.labelBackgroundColor||this.stateBkg,this.compositeBackground=this.compositeBackground||this.background||this.tertiaryColor,this.altBackground=this.altBackground||"#f0f0f0",this.compositeTitleBackground=this.compositeTitleBackground||this.mainBkg,this.compositeBorder=this.compositeBorder||this.nodeBorder,this.innerEndBackground=this.nodeBorder,this.errorBkgColor=this.errorBkgColor||this.tertiaryColor,this.errorTextColor=this.errorTextColor||this.tertiaryTextColor,this.transitionColor=this.transitionColor||this.lineColor,this.specialStateColor=this.lineColor,this.cScale0=this.cScale0||t,this.cScale1=this.cScale1||e,this.cScale2=this.cScale2||i,this.cScale3=this.cScale3||x(t,{h:30}),this.cScale4=this.cScale4||x(t,{h:60}),this.cScale5=this.cScale5||x(t,{h:90}),this.cScale6=this.cScale6||x(t,{h:120}),this.cScale7=this.cScale7||x(t,{h:150}),this.cScale8=this.cScale8||x(t,{h:210,l:150}),this.cScale9=this.cScale9||x(t,{h:270}),this.cScale10=this.cScale10||x(t,{h:300}),this.cScale11=this.cScale11||x(t,{h:330}),this.darkMode)for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this["cScale"+y]=L(this["cScale"+y],75);else for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this["cScale"+y]=L(this["cScale"+y],25);for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this["cScaleInv"+y]=this["cScaleInv"+y]||B(this["cScale"+y]);for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this.darkMode?this["cScalePeer"+y]=this["cScalePeer"+y]||F(this["cScale"+y],10):this["cScalePeer"+y]=this["cScalePeer"+y]||L(this["cScale"+y],10);this.scaleLabelColor=this.scaleLabelColor||this.labelTextColor;for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this["cScaleLabel"+y]=this["cScaleLabel"+y]||this.scaleLabelColor;const n=this.darkMode?-4:-1;for(let y=0;y<5;y++)this["surface"+y]=this["surface"+y]||x(this.mainBkg,{h:180,s:-15,l:n*(5+y*3)}),this["surfacePeer"+y]=this["surfacePeer"+y]||x(this.mainBkg,{h:180,s:-15,l:n*(8+y*3)});this.classText=this.classText||this.textColor,this.fillType0=this.fillType0||t,this.fillType1=this.fillType1||e,this.fillType2=this.fillType2||x(t,{h:64}),this.fillType3=this.fillType3||x(e,{h:64}),this.fillType4=this.fillType4||x(t,{h:-64}),this.fillType5=this.fillType5||x(e,{h:-64}),this.fillType6=this.fillType6||x(t,{h:128}),this.fillType7=this.fillType7||x(e,{h:128}),this.pie1=this.pie1||t,this.pie2=this.pie2||e,this.pie3=this.pie3||i,this.pie4=this.pie4||x(t,{l:-10}),this.pie5=this.pie5||x(e,{l:-10}),this.pie6=this.pie6||x(i,{l:-10}),this.pie7=this.pie7||x(t,{h:60,l:-10}),this.pie8=this.pie8||x(t,{h:-60,l:-10}),this.pie9=this.pie9||x(t,{h:120,l:0}),this.pie10=this.pie10||x(t,{h:60,l:-20}),this.pie11=this.pie11||x(t,{h:-60,l:-20}),this.pie12=this.pie12||x(t,{h:120,l:-10}),this.pieTitleTextSize=this.pieTitleTextSize||"25px",this.pieTitleTextColor=this.pieTitleTextColor||this.taskTextDarkColor,this.pieSectionTextSize=this.pieSectionTextSize||"17px",this.pieSectionTextColor=this.pieSectionTextColor||this.textColor,this.pieLegendTextSize=this.pieLegendTextSize||"17px",this.pieLegendTextColor=this.pieLegendTextColor||this.taskTextDarkColor,this.pieStrokeColor=this.pieStrokeColor||"black",this.pieStrokeWidth=this.pieStrokeWidth||"2px",this.pieOuterStrokeWidth=this.pieOuterStrokeWidth||"2px",this.pieOuterStrokeColor=this.pieOuterStrokeColor||"black",this.pieOpacity=this.pieOpacity||"0.7",this.vennTitleTextColor=this.vennTitleTextColor??this.titleColor,this.vennSetTextColor=this.vennSetTextColor??this.textColor,this.quadrant1Fill=this.quadrant1Fill||t,this.quadrant2Fill=this.quadrant2Fill||x(t,{r:5,g:5,b:5}),this.quadrant3Fill=this.quadrant3Fill||x(t,{r:10,g:10,b:10}),this.quadrant4Fill=this.quadrant4Fill||x(t,{r:15,g:15,b:15}),this.quadrant1TextFill=this.quadrant1TextFill||this.primaryTextColor,this.quadrant2TextFill=this.quadrant2TextFill||x(this.primaryTextColor,{r:-5,g:-5,b:-5}),this.quadrant3TextFill=this.quadrant3TextFill||x(this.primaryTextColor,{r:-10,g:-10,b:-10}),this.quadrant4TextFill=this.quadrant4TextFill||x(this.primaryTextColor,{r:-15,g:-15,b:-15}),this.quadrantPointFill=this.quadrantPointFill||tr(this.quadrant1Fill)?F(this.quadrant1Fill):L(this.quadrant1Fill),this.quadrantPointTextFill=this.quadrantPointTextFill||this.primaryTextColor,this.quadrantXAxisTextFill=this.quadrantXAxisTextFill||this.primaryTextColor,this.quadrantYAxisTextFill=this.quadrantYAxisTextFill||this.primaryTextColor,this.quadrantInternalBorderStrokeFill=this.quadrantInternalBorderStrokeFill||this.primaryBorderColor,this.quadrantExternalBorderStrokeFill=this.quadrantExternalBorderStrokeFill||this.primaryBorderColor,this.quadrantTitleFill=this.quadrantTitleFill||this.primaryTextColor,this.xyChart={backgroundColor:((o=this.xyChart)==null?void 0:o.backgroundColor)||this.background,titleColor:((a=this.xyChart)==null?void 0:a.titleColor)||this.primaryTextColor,xAxisTitleColor:((s=this.xyChart)==null?void 0:s.xAxisTitleColor)||this.primaryTextColor,xAxisLabelColor:((l=this.xyChart)==null?void 0:l.xAxisLabelColor)||this.primaryTextColor,xAxisTickColor:((h=this.xyChart)==null?void 0:h.xAxisTickColor)||this.primaryTextColor,xAxisLineColor:((c=this.xyChart)==null?void 0:c.xAxisLineColor)||this.primaryTextColor,yAxisTitleColor:((d=this.xyChart)==null?void 0:d.yAxisTitleColor)||this.primaryTextColor,yAxisLabelColor:((p=this.xyChart)==null?void 0:p.yAxisLabelColor)||this.primaryTextColor,yAxisTickColor:((u=this.xyChart)==null?void 0:u.yAxisTickColor)||this.primaryTextColor,yAxisLineColor:((m=this.xyChart)==null?void 0:m.yAxisLineColor)||this.primaryTextColor,plotColorPalette:((f=this.xyChart)==null?void 0:f.plotColorPalette)||"#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"},this.requirementBackground=this.requirementBackground||t,this.requirementBorderColor=this.requirementBorderColor||this.primaryBorderColor,this.requirementBorderSize=this.requirementBorderSize||"1",this.requirementTextColor=this.requirementTextColor||this.primaryTextColor,this.relationColor=this.relationColor||this.lineColor,this.relationLabelBackground=this.relationLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.relationLabelColor=this.relationLabelColor||this.actorTextColor,this.git0=this.git0||t,this.git1=this.git1||e,this.git2=this.git2||i,this.git3=this.git3||x(t,{h:-30}),this.git4=this.git4||x(t,{h:-60}),this.git5=this.git5||x(t,{h:-90}),this.git6=this.git6||x(t,{h:60}),this.git7=this.git7||x(t,{h:120}),this.darkMode?(this.git0=F(this.git0,25),this.git1=F(this.git1,25),this.git2=F(this.git2,25),this.git3=F(this.git3,25),this.git4=F(this.git4,25),this.git5=F(this.git5,25),this.git6=F(this.git6,25),this.git7=F(this.git7,25)):(this.git0=L(this.git0,25),this.git1=L(this.git1,25),this.git2=L(this.git2,25),this.git3=L(this.git3,25),this.git4=L(this.git4,25),this.git5=L(this.git5,25),this.git6=L(this.git6,25),this.git7=L(this.git7,25)),this.gitInv0=this.gitInv0||B(this.git0),this.gitInv1=this.gitInv1||B(this.git1),this.gitInv2=this.gitInv2||B(this.git2),this.gitInv3=this.gitInv3||B(this.git3),this.gitInv4=this.gitInv4||B(this.git4),this.gitInv5=this.gitInv5||B(this.git5),this.gitInv6=this.gitInv6||B(this.git6),this.gitInv7=this.gitInv7||B(this.git7),this.branchLabelColor=this.branchLabelColor||(this.darkMode?"black":this.labelTextColor),this.gitBranchLabel0=this.gitBranchLabel0||this.branchLabelColor,this.gitBranchLabel1=this.gitBranchLabel1||this.branchLabelColor,this.gitBranchLabel2=this.gitBranchLabel2||this.branchLabelColor,this.gitBranchLabel3=this.gitBranchLabel3||this.branchLabelColor,this.gitBranchLabel4=this.gitBranchLabel4||this.branchLabelColor,this.gitBranchLabel5=this.gitBranchLabel5||this.branchLabelColor,this.gitBranchLabel6=this.gitBranchLabel6||this.branchLabelColor,this.gitBranchLabel7=this.gitBranchLabel7||this.branchLabelColor,this.tagLabelColor=this.tagLabelColor||this.primaryTextColor,this.tagLabelBackground=this.tagLabelBackground||this.primaryColor,this.tagLabelBorder=this.tagBorder||this.primaryBorderColor,this.tagLabelFontSize=this.tagLabelFontSize||"10px",this.commitLabelColor=this.commitLabelColor||this.secondaryTextColor,this.commitLabelBackground=this.commitLabelBackground||this.secondaryColor,this.commitLabelFontSize=this.commitLabelFontSize||"10px",this.attributeBackgroundColorOdd=this.attributeBackgroundColorOdd||lr,this.attributeBackgroundColorEven=this.attributeBackgroundColorEven||hr}calculate(t){if(typeof t!="object"){this.updateColors();return}const e=Object.keys(t);e.forEach(i=>{this[i]=t[i]}),this.updateColors(),e.forEach(i=>{this[i]=t[i]})}},g(ai,"Theme"),ai),Gm=g(r=>{const t=new Um;return t.calculate(r),t},"getThemeVariables"),li,Vm=(li=class{constructor(){this.background="#333",this.primaryColor="#1f2020",this.secondaryColor=F(this.primaryColor,16),this.tertiaryColor=x(this.primaryColor,{h:-160}),this.primaryBorderColor=B(this.background),this.secondaryBorderColor=Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=Z(this.tertiaryColor,this.darkMode),this.primaryTextColor=B(this.primaryColor),this.secondaryTextColor=B(this.secondaryColor),this.tertiaryTextColor=B(this.tertiaryColor),this.mainBkg="#2a2020",this.secondBkg="calculated",this.mainContrastColor="lightgrey",this.darkTextColor=F(B("#323D47"),10),this.border1="#ccc",this.border2=Br(255,255,255,.25),this.arrowheadColor=B(this.background),this.fontFamily="arial, sans-serif",this.fontSize="14px",this.labelBackground="#181818",this.textColor="#ccc",this.THEME_COLOR_LIMIT=12,this.radius=3,this.strokeWidth=1,this.noteBkgColor="#fff5ad",this.noteTextColor="#333",this.THEME_COLOR_LIMIT=12,this.fontFamily="arial, sans-serif",this.fontSize="14px",this.useGradient=!0,this.gradientStart="#0042eb",this.gradientStop="#eb0042",this.dropShadow="drop-shadow( 1px 2px 2px rgba(185,185,185,0.2))",this.archEdgeColor="calculated",this.archEdgeArrowColor="calculated",this.archEdgeWidth="3",this.archGroupBorderColor=this.primaryBorderColor,this.archGroupBorderWidth="2px",this.noteFontWeight="normal",this.fontWeight="normal"}updateColors(){var e,i,n,o,a,s,l,h,c,d,p;if(this.primaryTextColor=this.primaryTextColor||(this.darkMode?"#eee":"#333"),this.secondaryColor=this.secondaryColor||x(this.primaryColor,{h:-120}),this.tertiaryColor=this.tertiaryColor||x(this.primaryColor,{h:180,l:5}),this.primaryBorderColor=this.primaryBorderColor||Z(this.primaryColor,this.darkMode),this.secondaryBorderColor=this.secondaryBorderColor||Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=this.tertiaryBorderColor||Z(this.tertiaryColor,this.darkMode),this.noteBorderColor=this.noteBorderColor||Z(this.noteBkgColor,this.darkMode),this.noteBkgColor=this.noteBkgColor||"#fff5ad",this.noteTextColor=this.noteTextColor||"#333",this.secondaryTextColor=this.secondaryTextColor||B(this.secondaryColor),this.tertiaryTextColor=this.tertiaryTextColor||B(this.tertiaryColor),this.lineColor=this.lineColor||B(this.background),this.arrowheadColor=this.arrowheadColor||B(this.background),this.textColor=this.textColor||this.primaryTextColor,this.border2=this.border2||this.tertiaryBorderColor,this.nodeBkg=this.nodeBkg||this.primaryColor,this.mainBkg=this.mainBkg||this.primaryColor,this.nodeBorder=this.nodeBorder||this.border1,this.clusterBkg=this.clusterBkg||this.tertiaryColor,this.clusterBorder=this.clusterBorder||this.tertiaryBorderColor,this.defaultLinkColor=this.defaultLinkColor||this.lineColor,this.titleColor=this.titleColor||this.tertiaryTextColor,this.edgeLabelBackground=this.edgeLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.nodeTextColor=this.nodeTextColor||this.primaryTextColor,this.actorBorder=this.actorBorder||this.primaryBorderColor,this.actorBkg=this.actorBkg||this.mainBkg,this.actorTextColor=this.actorTextColor||this.primaryTextColor,this.actorLineColor=this.actorLineColor||this.actorBorder,this.labelBoxBkgColor=this.labelBoxBkgColor||this.actorBkg,this.signalColor=this.signalColor||this.textColor,this.signalTextColor=this.signalTextColor||this.textColor,this.labelBoxBorderColor=this.labelBoxBorderColor||this.actorBorder,this.labelTextColor=this.labelTextColor||this.actorTextColor,this.loopTextColor=this.loopTextColor||this.actorTextColor,this.activationBorderColor=this.activationBorderColor||L(this.secondaryColor,10),this.activationBkgColor=this.activationBkgColor||this.secondaryColor,this.sequenceNumberColor=this.sequenceNumberColor||B(this.lineColor),this.sectionBkgColor=this.sectionBkgColor||this.tertiaryColor,this.altSectionBkgColor=this.altSectionBkgColor||"white",this.sectionBkgColor=this.sectionBkgColor||this.secondaryColor,this.sectionBkgColor2=this.sectionBkgColor2||this.primaryColor,this.excludeBkgColor=this.excludeBkgColor||"#eeeeee",this.taskBorderColor=this.taskBorderColor||this.primaryBorderColor,this.taskBkgColor=this.taskBkgColor||this.primaryColor,this.activeTaskBorderColor=this.activeTaskBorderColor||this.primaryColor,this.activeTaskBkgColor=this.activeTaskBkgColor||F(this.primaryColor,23),this.gridColor=this.gridColor||"lightgrey",this.doneTaskBkgColor=this.doneTaskBkgColor||"lightgrey",this.doneTaskBorderColor=this.doneTaskBorderColor||"grey",this.critBorderColor=this.critBorderColor||"#ff8888",this.critBkgColor=this.critBkgColor||"red",this.todayLineColor=this.todayLineColor||"red",this.vertLineColor=this.vertLineColor||this.primaryBorderColor,this.taskTextColor=this.taskTextColor||this.textColor,this.taskTextOutsideColor=this.taskTextOutsideColor||this.textColor,this.taskTextLightColor=this.taskTextLightColor||this.textColor,this.taskTextColor=this.taskTextColor||this.primaryTextColor,this.taskTextDarkColor=this.taskTextDarkColor||this.textColor,this.taskTextClickableColor=this.taskTextClickableColor||"#003163",this.archEdgeColor=this.lineColor,this.archEdgeArrowColor=this.lineColor,this.personBorder=this.personBorder||this.primaryBorderColor,this.personBkg=this.personBkg||this.mainBkg,this.transitionColor=this.transitionColor||this.lineColor,this.transitionLabelColor=this.transitionLabelColor||this.textColor,this.stateLabelColor=this.stateLabelColor||this.stateBkg||this.primaryTextColor,this.stateBkg=this.stateBkg||this.mainBkg,this.labelBackgroundColor=this.labelBackgroundColor||this.stateBkg,this.compositeBackground=this.compositeBackground||this.background||this.tertiaryColor,this.altBackground=this.altBackground||"#f0f0f0",this.compositeTitleBackground=this.compositeTitleBackground||this.mainBkg,this.compositeBorder=this.compositeBorder||this.nodeBorder,this.innerEndBackground=this.nodeBorder,this.errorBkgColor=this.errorBkgColor||this.tertiaryColor,this.errorTextColor=this.errorTextColor||this.tertiaryTextColor,this.transitionColor=this.transitionColor||this.lineColor,this.specialStateColor=this.lineColor,this.cScale0=this.cScale0||this.primaryColor,this.cScale1=this.cScale1||this.secondaryColor,this.cScale2=this.cScale2||this.tertiaryColor,this.cScale3=this.cScale3||x(this.primaryColor,{h:30}),this.cScale4=this.cScale4||x(this.primaryColor,{h:60}),this.cScale5=this.cScale5||x(this.primaryColor,{h:90}),this.cScale6=this.cScale6||x(this.primaryColor,{h:120}),this.cScale7=this.cScale7||x(this.primaryColor,{h:150}),this.cScale8=this.cScale8||x(this.primaryColor,{h:210,l:150}),this.cScale9=this.cScale9||x(this.primaryColor,{h:270}),this.cScale10=this.cScale10||x(this.primaryColor,{h:300}),this.cScale11=this.cScale11||x(this.primaryColor,{h:330}),this.darkMode)for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this["cScale"+u]=L(this["cScale"+u],75);else for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this["cScale"+u]=L(this["cScale"+u],25);for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this["cScaleInv"+u]=this["cScaleInv"+u]||B(this["cScale"+u]);for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this.darkMode?this["cScalePeer"+u]=this["cScalePeer"+u]||F(this["cScale"+u],10):this["cScalePeer"+u]=this["cScalePeer"+u]||L(this["cScale"+u],10);this.scaleLabelColor=this.scaleLabelColor||this.labelTextColor;for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this["cScaleLabel"+u]=this["cScaleLabel"+u]||this.scaleLabelColor;const t=this.darkMode?-4:-1;for(let u=0;u<5;u++)this["surface"+u]=this["surface"+u]||x(this.mainBkg,{h:180,s:-15,l:t*(5+u*3)}),this["surfacePeer"+u]=this["surfacePeer"+u]||x(this.mainBkg,{h:180,s:-15,l:t*(8+u*3)});this.classText=this.classText||this.textColor,this.fillType0=this.fillType0||this.primaryColor,this.fillType1=this.fillType1||this.secondaryColor,this.fillType2=this.fillType2||x(this.primaryColor,{h:64}),this.fillType3=this.fillType3||x(this.secondaryColor,{h:64}),this.fillType4=this.fillType4||x(this.primaryColor,{h:-64}),this.fillType5=this.fillType5||x(this.secondaryColor,{h:-64}),this.fillType6=this.fillType6||x(this.primaryColor,{h:128}),this.fillType7=this.fillType7||x(this.secondaryColor,{h:128}),this.pie1=this.pie1||this.primaryColor,this.pie2=this.pie2||this.secondaryColor,this.pie3=this.pie3||this.tertiaryColor,this.pie4=this.pie4||x(this.primaryColor,{l:-10}),this.pie5=this.pie5||x(this.secondaryColor,{l:-10}),this.pie6=this.pie6||x(this.tertiaryColor,{l:-10}),this.pie7=this.pie7||x(this.primaryColor,{h:60,l:-10}),this.pie8=this.pie8||x(this.primaryColor,{h:-60,l:-10}),this.pie9=this.pie9||x(this.primaryColor,{h:120,l:0}),this.pie10=this.pie10||x(this.primaryColor,{h:60,l:-20}),this.pie11=this.pie11||x(this.primaryColor,{h:-60,l:-20}),this.pie12=this.pie12||x(this.primaryColor,{h:120,l:-10}),this.pieTitleTextSize=this.pieTitleTextSize||"25px",this.pieTitleTextColor=this.pieTitleTextColor||this.taskTextDarkColor,this.pieSectionTextSize=this.pieSectionTextSize||"17px",this.pieSectionTextColor=this.pieSectionTextColor||this.textColor,this.pieLegendTextSize=this.pieLegendTextSize||"17px",this.pieLegendTextColor=this.pieLegendTextColor||this.taskTextDarkColor,this.pieStrokeColor=this.pieStrokeColor||"black",this.pieStrokeWidth=this.pieStrokeWidth||"2px",this.pieOuterStrokeWidth=this.pieOuterStrokeWidth||"2px",this.pieOuterStrokeColor=this.pieOuterStrokeColor||"black",this.pieOpacity=this.pieOpacity||"0.7",this.vennTitleTextColor=this.vennTitleTextColor??this.titleColor,this.vennSetTextColor=this.vennSetTextColor??this.textColor,this.quadrant1Fill=this.quadrant1Fill||this.primaryColor,this.quadrant2Fill=this.quadrant2Fill||x(this.primaryColor,{r:5,g:5,b:5}),this.quadrant3Fill=this.quadrant3Fill||x(this.primaryColor,{r:10,g:10,b:10}),this.quadrant4Fill=this.quadrant4Fill||x(this.primaryColor,{r:15,g:15,b:15}),this.quadrant1TextFill=this.quadrant1TextFill||this.primaryTextColor,this.quadrant2TextFill=this.quadrant2TextFill||x(this.primaryTextColor,{r:-5,g:-5,b:-5}),this.quadrant3TextFill=this.quadrant3TextFill||x(this.primaryTextColor,{r:-10,g:-10,b:-10}),this.quadrant4TextFill=this.quadrant4TextFill||x(this.primaryTextColor,{r:-15,g:-15,b:-15}),this.quadrantPointFill=this.quadrantPointFill||tr(this.quadrant1Fill)?F(this.quadrant1Fill):L(this.quadrant1Fill),this.quadrantPointTextFill=this.quadrantPointTextFill||this.primaryTextColor,this.quadrantXAxisTextFill=this.quadrantXAxisTextFill||this.primaryTextColor,this.quadrantYAxisTextFill=this.quadrantYAxisTextFill||this.primaryTextColor,this.quadrantInternalBorderStrokeFill=this.quadrantInternalBorderStrokeFill||this.primaryBorderColor,this.quadrantExternalBorderStrokeFill=this.quadrantExternalBorderStrokeFill||this.primaryBorderColor,this.quadrantTitleFill=this.quadrantTitleFill||this.primaryTextColor,this.xyChart={backgroundColor:((e=this.xyChart)==null?void 0:e.backgroundColor)||this.background,titleColor:((i=this.xyChart)==null?void 0:i.titleColor)||this.primaryTextColor,xAxisTitleColor:((n=this.xyChart)==null?void 0:n.xAxisTitleColor)||this.primaryTextColor,xAxisLabelColor:((o=this.xyChart)==null?void 0:o.xAxisLabelColor)||this.primaryTextColor,xAxisTickColor:((a=this.xyChart)==null?void 0:a.xAxisTickColor)||this.primaryTextColor,xAxisLineColor:((s=this.xyChart)==null?void 0:s.xAxisLineColor)||this.primaryTextColor,yAxisTitleColor:((l=this.xyChart)==null?void 0:l.yAxisTitleColor)||this.primaryTextColor,yAxisLabelColor:((h=this.xyChart)==null?void 0:h.yAxisLabelColor)||this.primaryTextColor,yAxisTickColor:((c=this.xyChart)==null?void 0:c.yAxisTickColor)||this.primaryTextColor,yAxisLineColor:((d=this.xyChart)==null?void 0:d.yAxisLineColor)||this.primaryTextColor,plotColorPalette:((p=this.xyChart)==null?void 0:p.plotColorPalette)||"#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"},this.requirementBackground=this.requirementBackground||this.primaryColor,this.requirementBorderColor=this.requirementBorderColor||this.primaryBorderColor,this.requirementBorderSize=this.requirementBorderSize||"1",this.requirementTextColor=this.requirementTextColor||this.primaryTextColor,this.relationColor=this.relationColor||this.lineColor,this.relationLabelBackground=this.relationLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.relationLabelColor=this.relationLabelColor||this.actorTextColor,this.git0=this.git0||"#0b0000",this.git1=this.git1||"#4d1037",this.git2=this.git2||"#3f5258",this.git3=this.git3||"#4f2f1b",this.git4=this.git4||"#6e0a0a",this.git5=this.git5||"#3b0048",this.git6=this.git6||"#995a01",this.git7=this.git7||"#154706",this.gitDarkMode=!0,this.gitDarkMode?(this.git0=F(this.git0,25),this.git1=F(this.git1,25),this.git2=F(this.git2,25),this.git3=F(this.git3,25),this.git4=F(this.git4,25),this.git5=F(this.git5,25),this.git6=F(this.git6,25),this.git7=F(this.git7,25)):(this.git0=L(this.git0,25),this.git1=L(this.git1,25),this.git2=L(this.git2,25),this.git3=L(this.git3,25),this.git4=L(this.git4,25),this.git5=L(this.git5,25),this.git6=L(this.git6,25),this.git7=L(this.git7,25)),this.gitInv0=this.gitInv0||B(this.git0),this.gitInv1=this.gitInv1||B(this.git1),this.gitInv2=this.gitInv2||B(this.git2),this.gitInv3=this.gitInv3||B(this.git3),this.gitInv4=this.gitInv4||B(this.git4),this.gitInv5=this.gitInv5||B(this.git5),this.gitInv6=this.gitInv6||B(this.git6),this.gitInv7=this.gitInv7||B(this.git7),this.branchLabelColor=this.branchLabelColor||(this.darkMode?"black":this.labelTextColor),this.gitBranchLabel0=this.gitBranchLabel0||this.branchLabelColor,this.gitBranchLabel1=this.gitBranchLabel1||this.branchLabelColor,this.gitBranchLabel2=this.gitBranchLabel2||this.branchLabelColor,this.gitBranchLabel3=this.gitBranchLabel3||this.branchLabelColor,this.gitBranchLabel4=this.gitBranchLabel4||this.branchLabelColor,this.gitBranchLabel5=this.gitBranchLabel5||this.branchLabelColor,this.gitBranchLabel6=this.gitBranchLabel6||this.branchLabelColor,this.gitBranchLabel7=this.gitBranchLabel7||this.branchLabelColor,this.tagLabelColor=this.tagLabelColor||this.primaryTextColor,this.tagLabelBackground=this.tagLabelBackground||this.primaryColor,this.tagLabelBorder=this.tagBorder||this.primaryBorderColor,this.tagLabelFontSize=this.tagLabelFontSize||"10px",this.commitLabelColor=this.commitLabelColor||this.secondaryTextColor,this.commitLabelBackground=this.commitLabelBackground||this.secondaryColor,this.commitLabelFontSize=this.commitLabelFontSize||"10px",this.attributeBackgroundColorOdd=this.attributeBackgroundColorOdd||lr,this.attributeBackgroundColorEven=this.attributeBackgroundColorEven||hr}calculate(t){if(typeof t!="object"){this.updateColors();return}const e=Object.keys(t);e.forEach(i=>{this[i]=t[i]}),this.updateColors(),e.forEach(i=>{this[i]=t[i]})}},g(li,"Theme"),li),Ym=g(r=>{const t=new Vm;return t.calculate(r),t},"getThemeVariables"),hi,Xm=(hi=class{constructor(){this.background="#ffffff",this.primaryColor="#cccccc",this.mainBkg="#ffffff",this.noteBkgColor="#fff5ad",this.noteTextColor="#28253D",this.THEME_COLOR_LIMIT=12,this.radius=12,this.strokeWidth=2,this.primaryBorderColor=Z("#28253D",this.darkMode),this.fontFamily='"Recursive Variable", arial, sans-serif',this.fontSize="14px",this.nodeBorder="#28253D",this.stateBorder="#28253D",this.useGradient=!1,this.gradientStart="#0042eb",this.gradientStop="#eb0042",this.dropShadow="url(#drop-shadow)",this.nodeShadow=!0,this.tertiaryColor="#ffffff",this.clusterBkg="#F9F9FB",this.clusterBorder="#BDBCCC",this.noteBorderColor="#FACC15",this.archEdgeColor="calculated",this.archEdgeArrowColor="calculated",this.archEdgeWidth="3",this.archGroupBorderColor=this.primaryBorderColor,this.archGroupBorderWidth="2px",this.actorBorder="#28253D",this.filterColor="#000000"}updateColors(){var o,a,s,l,h,c,d,p,u,m,f;this.primaryTextColor=this.primaryTextColor||(this.darkMode?"#eee":"#28253D"),this.secondaryColor=this.secondaryColor||x(this.primaryColor,{h:-120}),this.tertiaryColor=this.tertiaryColor||x(this.primaryColor,{h:180,l:5}),this.primaryBorderColor=this.primaryBorderColor||Z(this.primaryColor,this.darkMode),this.secondaryBorderColor=this.secondaryBorderColor||Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=this.tertiaryBorderColor||Z(this.tertiaryColor,this.darkMode),this.noteBorderColor=this.noteBorderColor||Z(this.noteBkgColor,this.darkMode),this.noteBkgColor=this.noteBkgColor||"#FEF9C3",this.noteTextColor=this.noteTextColor||"#28253D",this.secondaryTextColor=this.secondaryTextColor||B(this.secondaryColor),this.tertiaryTextColor=this.tertiaryTextColor||B(this.tertiaryColor),this.lineColor=this.lineColor||B(this.background),this.arrowheadColor=this.arrowheadColor||B(this.background),this.textColor=this.textColor||this.primaryTextColor,this.border2=this.border2||this.tertiaryBorderColor,this.nodeBkg=this.nodeBkg||this.primaryColor,this.mainBkg=this.mainBkg||this.primaryColor,this.nodeBorder=this.nodeBorder||this.primaryBorderColor,this.clusterBkg=this.clusterBkg||this.tertiaryColor,this.clusterBorder=this.clusterBorder||this.tertiaryBorderColor,this.defaultLinkColor=this.defaultLinkColor||this.lineColor,this.titleColor=this.titleColor||this.tertiaryTextColor,this.edgeLabelBackground=this.edgeLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.nodeTextColor=this.nodeTextColor||this.primaryTextColor,this.noteFontWeight=600,this.actorBorder=this.actorBorder||this.primaryBorderColor,this.actorBkg=this.actorBkg||this.mainBkg,this.actorTextColor=this.actorTextColor||this.primaryTextColor,this.actorLineColor=this.actorLineColor||this.actorBorder,this.labelBoxBkgColor=this.labelBoxBkgColor||this.actorBkg,this.signalColor=this.signalColor||this.textColor,this.signalTextColor=this.signalTextColor||this.textColor,this.labelBoxBorderColor=this.labelBoxBorderColor||this.actorBorder,this.labelTextColor=this.labelTextColor||this.actorTextColor,this.loopTextColor=this.loopTextColor||this.actorTextColor,this.activationBorderColor=this.activationBorderColor||L(this.secondaryColor,10),this.activationBkgColor=this.activationBkgColor||this.secondaryColor,this.sequenceNumberColor=this.sequenceNumberColor||B(this.lineColor);const t="#ECECFE",e="#E9E9F1",i=x(t,{h:180,l:5});this.sectionBkgColor=this.sectionBkgColor||i,this.altSectionBkgColor=this.altSectionBkgColor||"white",this.sectionBkgColor=this.sectionBkgColor||e,this.sectionBkgColor2=this.sectionBkgColor2||t,this.excludeBkgColor=this.excludeBkgColor||"#eeeeee",this.taskBorderColor=this.taskBorderColor||this.primaryBorderColor,this.taskBkgColor=this.taskBkgColor||t,this.activeTaskBorderColor=this.activeTaskBorderColor||t,this.activeTaskBkgColor=this.activeTaskBkgColor||F(t,23),this.gridColor=this.gridColor||"lightgrey",this.doneTaskBkgColor=this.doneTaskBkgColor||"lightgrey",this.doneTaskBorderColor=this.doneTaskBorderColor||"grey",this.critBorderColor=this.critBorderColor||"#ff8888",this.critBkgColor=this.critBkgColor||"red",this.todayLineColor=this.todayLineColor||"red",this.taskTextColor=this.taskTextColor||this.textColor,this.vertLineColor=this.vertLineColor||this.primaryBorderColor,this.taskTextOutsideColor=this.taskTextOutsideColor||this.textColor,this.taskTextLightColor=this.taskTextLightColor||this.textColor,this.taskTextColor=this.taskTextColor||this.primaryTextColor,this.taskTextDarkColor=this.taskTextDarkColor||this.textColor,this.taskTextClickableColor=this.taskTextClickableColor||"#003163",this.archEdgeColor=this.lineColor,this.archEdgeArrowColor=this.lineColor,this.personBorder=this.personBorder||this.primaryBorderColor,this.personBkg=this.personBkg||this.mainBkg,this.transitionColor=this.transitionColor||this.lineColor,this.transitionLabelColor=this.transitionLabelColor||this.textColor,this.stateLabelColor=this.stateLabelColor||this.stateBkg||this.primaryTextColor,this.compositeTitleBackground="#F9F9FB",this.altBackground="#F9F9FB",this.stateEdgeLabelBackground="#FFFFFF",this.fontWeight=600,this.stateBkg=this.stateBkg||this.mainBkg,this.labelBackgroundColor=this.labelBackgroundColor||this.stateBkg,this.compositeBackground=this.compositeBackground||this.background||this.tertiaryColor,this.altBackground=this.altBackground||"#f0f0f0",this.compositeTitleBackground=this.compositeTitleBackground||this.mainBkg,this.compositeBorder=this.compositeBorder||this.nodeBorder,this.innerEndBackground=this.nodeBorder,this.errorBkgColor=this.errorBkgColor||this.tertiaryColor,this.errorTextColor=this.errorTextColor||this.tertiaryTextColor,this.transitionColor=this.transitionColor||this.lineColor,this.specialStateColor=this.lineColor;for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this["cScale"+y]=this.mainBkg;if(this.darkMode)for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this["cScale"+y]=L(this["cScale"+y],75);else for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this["cScale"+y]=L(this["cScale"+y],25);for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this["cScaleInv"+y]=this["cScaleInv"+y]||B(this["cScale"+y]);for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this.darkMode?this["cScalePeer"+y]=this["cScalePeer"+y]||F(this["cScale"+y],10):this["cScalePeer"+y]=this["cScalePeer"+y]||L(this["cScale"+y],10);this.scaleLabelColor=this.scaleLabelColor||this.labelTextColor;for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this["cScaleLabel"+y]=this["cScaleLabel"+y]||this.scaleLabelColor;const n=this.darkMode?-4:-1;for(let y=0;y<5;y++)this["surface"+y]=this["surface"+y]||x(this.mainBkg,{h:180,s:-15,l:n*(5+y*3)}),this["surfacePeer"+y]=this["surfacePeer"+y]||x(this.mainBkg,{h:180,s:-15,l:n*(8+y*3)});this.classText=this.classText||this.textColor,this.fillType0=this.fillType0||t,this.fillType1=this.fillType1||e,this.fillType2=this.fillType2||x(t,{h:64}),this.fillType3=this.fillType3||x(e,{h:64}),this.fillType4=this.fillType4||x(t,{h:-64}),this.fillType5=this.fillType5||x(e,{h:-64}),this.fillType6=this.fillType6||x(t,{h:128}),this.fillType7=this.fillType7||x(e,{h:128}),this.pie1=this.pie1||t,this.pie2=this.pie2||e,this.pie3=this.pie3||i,this.pie4=this.pie4||x(t,{l:-10}),this.pie5=this.pie5||x(e,{l:-10}),this.pie6=this.pie6||x(i,{l:-10}),this.pie7=this.pie7||x(t,{h:60,l:-10}),this.pie8=this.pie8||x(t,{h:-60,l:-10}),this.pie9=this.pie9||x(t,{h:120,l:0}),this.pie10=this.pie10||x(t,{h:60,l:-20}),this.pie11=this.pie11||x(t,{h:-60,l:-20}),this.pie12=this.pie12||x(t,{h:120,l:-10}),this.pieTitleTextSize=this.pieTitleTextSize||"25px",this.pieTitleTextColor=this.pieTitleTextColor||this.taskTextDarkColor,this.pieSectionTextSize=this.pieSectionTextSize||"17px",this.pieSectionTextColor=this.pieSectionTextColor||this.textColor,this.pieLegendTextSize=this.pieLegendTextSize||"17px",this.pieLegendTextColor=this.pieLegendTextColor||this.taskTextDarkColor,this.pieStrokeColor=this.pieStrokeColor||"black",this.pieStrokeWidth=this.pieStrokeWidth||"2px",this.pieOuterStrokeWidth=this.pieOuterStrokeWidth||"2px",this.pieOuterStrokeColor=this.pieOuterStrokeColor||"black",this.pieOpacity=this.pieOpacity||"0.7",this.vennTitleTextColor=this.vennTitleTextColor??this.titleColor,this.vennSetTextColor=this.vennSetTextColor??this.textColor,this.quadrant1Fill=this.quadrant1Fill||t,this.quadrant2Fill=this.quadrant2Fill||x(t,{r:5,g:5,b:5}),this.quadrant3Fill=this.quadrant3Fill||x(t,{r:10,g:10,b:10}),this.quadrant4Fill=this.quadrant4Fill||x(t,{r:15,g:15,b:15}),this.quadrant1TextFill=this.quadrant1TextFill||this.primaryTextColor,this.quadrant2TextFill=this.quadrant2TextFill||x(this.primaryTextColor,{r:-5,g:-5,b:-5}),this.quadrant3TextFill=this.quadrant3TextFill||x(this.primaryTextColor,{r:-10,g:-10,b:-10}),this.quadrant4TextFill=this.quadrant4TextFill||x(this.primaryTextColor,{r:-15,g:-15,b:-15}),this.quadrantPointFill=this.quadrantPointFill||tr(this.quadrant1Fill)?F(this.quadrant1Fill):L(this.quadrant1Fill),this.quadrantPointTextFill=this.quadrantPointTextFill||this.primaryTextColor,this.quadrantXAxisTextFill=this.quadrantXAxisTextFill||this.primaryTextColor,this.quadrantYAxisTextFill=this.quadrantYAxisTextFill||this.primaryTextColor,this.quadrantInternalBorderStrokeFill=this.quadrantInternalBorderStrokeFill||this.primaryBorderColor,this.quadrantExternalBorderStrokeFill=this.quadrantExternalBorderStrokeFill||this.primaryBorderColor,this.quadrantTitleFill=this.quadrantTitleFill||this.primaryTextColor,this.xyChart={backgroundColor:((o=this.xyChart)==null?void 0:o.backgroundColor)||this.background,titleColor:((a=this.xyChart)==null?void 0:a.titleColor)||this.primaryTextColor,xAxisTitleColor:((s=this.xyChart)==null?void 0:s.xAxisTitleColor)||this.primaryTextColor,xAxisLabelColor:((l=this.xyChart)==null?void 0:l.xAxisLabelColor)||this.primaryTextColor,xAxisTickColor:((h=this.xyChart)==null?void 0:h.xAxisTickColor)||this.primaryTextColor,xAxisLineColor:((c=this.xyChart)==null?void 0:c.xAxisLineColor)||this.primaryTextColor,yAxisTitleColor:((d=this.xyChart)==null?void 0:d.yAxisTitleColor)||this.primaryTextColor,yAxisLabelColor:((p=this.xyChart)==null?void 0:p.yAxisLabelColor)||this.primaryTextColor,yAxisTickColor:((u=this.xyChart)==null?void 0:u.yAxisTickColor)||this.primaryTextColor,yAxisLineColor:((m=this.xyChart)==null?void 0:m.yAxisLineColor)||this.primaryTextColor,plotColorPalette:((f=this.xyChart)==null?void 0:f.plotColorPalette)||"#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"},this.requirementBackground=this.requirementBackground||t,this.requirementBorderColor=this.requirementBorderColor||this.primaryBorderColor,this.requirementBorderSize=this.requirementBorderSize||"1",this.requirementTextColor=this.requirementTextColor||this.primaryTextColor,this.relationColor=this.relationColor||this.lineColor,this.relationLabelBackground=this.relationLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.relationLabelColor=this.relationLabelColor||this.actorTextColor,this.requirementEdgeLabelBackground="#FFFFFF",this.git0=this.git0||t,this.git1=this.git1||e,this.git2=this.git2||i,this.git3=this.git3||x(t,{h:-30}),this.git4=this.git4||x(t,{h:-60}),this.git5=this.git5||x(t,{h:-90}),this.git6=this.git6||x(t,{h:60}),this.git7=this.git7||x(t,{h:120}),this.darkMode?(this.git0=F(this.git0,25),this.git1=F(this.git1,25),this.git2=F(this.git2,25),this.git3=F(this.git3,25),this.git4=F(this.git4,25),this.git5=F(this.git5,25),this.git6=F(this.git6,25),this.git7=F(this.git7,25)):(this.git0=L(this.git0,25),this.git1=L(this.git1,25),this.git2=L(this.git2,25),this.git3=L(this.git3,25),this.git4=L(this.git4,25),this.git5=L(this.git5,25),this.git6=L(this.git6,25),this.git7=L(this.git7,25)),this.gitInv0=this.gitInv0||B(this.git0),this.gitInv1=this.gitInv1||B(this.git1),this.gitInv2=this.gitInv2||B(this.git2),this.gitInv3=this.gitInv3||B(this.git3),this.gitInv4=this.gitInv4||B(this.git4),this.gitInv5=this.gitInv5||B(this.git5),this.gitInv6=this.gitInv6||B(this.git6),this.gitInv7=this.gitInv7||B(this.git7),this.branchLabelColor=this.branchLabelColor||(this.darkMode?"black":this.labelTextColor),this.gitBranchLabel0=this.gitBranchLabel0||this.branchLabelColor,this.gitBranchLabel1=this.gitBranchLabel1||this.branchLabelColor,this.gitBranchLabel2=this.gitBranchLabel2||this.branchLabelColor,this.gitBranchLabel3=this.gitBranchLabel3||this.branchLabelColor,this.gitBranchLabel4=this.gitBranchLabel4||this.branchLabelColor,this.gitBranchLabel5=this.gitBranchLabel5||this.branchLabelColor,this.gitBranchLabel6=this.gitBranchLabel6||this.branchLabelColor,this.gitBranchLabel7=this.gitBranchLabel7||this.branchLabelColor,this.tagLabelColor=this.tagLabelColor||this.primaryTextColor,this.tagLabelBackground=this.tagLabelBackground||this.primaryColor,this.tagLabelBorder=this.tagBorder||this.primaryBorderColor,this.tagLabelFontSize=this.tagLabelFontSize||"10px",this.commitLabelColor=this.commitLabelColor||this.secondaryTextColor,this.commitLabelBackground=this.commitLabelBackground||this.secondaryColor,this.commitLabelFontSize=this.commitLabelFontSize||"10px",this.commitLineColor=this.commitLineColor??"#BDBCCC",this.erEdgeLabelBackground="#FFFFFF",this.attributeBackgroundColorOdd=this.attributeBackgroundColorOdd||lr,this.attributeBackgroundColorEven=this.attributeBackgroundColorEven||hr}calculate(t){if(typeof t!="object"){this.updateColors();return}const e=Object.keys(t);e.forEach(i=>{this[i]=t[i]}),this.updateColors(),e.forEach(i=>{this[i]=t[i]})}},g(hi,"Theme"),hi),Km=g(r=>{const t=new Xm;return t.calculate(r),t},"getThemeVariables"),ci,Zm=(ci=class{constructor(){this.background="#333",this.primaryColor="#1f2020",this.secondaryColor=F(this.primaryColor,16),this.tertiaryColor=x(this.primaryColor,{h:-160}),this.primaryBorderColor=B(this.background),this.secondaryBorderColor=Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=Z(this.tertiaryColor,this.darkMode),this.primaryTextColor=B(this.primaryColor),this.secondaryTextColor=B(this.secondaryColor),this.tertiaryTextColor=B(this.tertiaryColor),this.mainBkg="#111113",this.secondBkg="calculated",this.mainContrastColor="lightgrey",this.darkTextColor=F(B("#323D47"),10),this.border1="#ccc",this.border2=Br(255,255,255,.25),this.arrowheadColor=B(this.background),this.fontFamily='"Recursive Variable", arial, sans-serif',this.fontSize="14px",this.labelBackground="#111113",this.textColor="#ccc",this.THEME_COLOR_LIMIT=12,this.radius=12,this.strokeWidth=2,this.noteBkgColor=this.noteBkgColor??"#FEF9C3",this.noteTextColor=this.noteTextColor??"#28253D",this.THEME_COLOR_LIMIT=12,this.fontFamily='"Recursive Variable", arial, sans-serif',this.fontSize="14px",this.nodeBorder="#FFFFFF",this.stateBorder="#FFFFFF",this.useGradient=!1,this.gradientStart="#0042eb",this.gradientStop="#eb0042",this.dropShadow="url(#drop-shadow)",this.nodeShadow=!0,this.archEdgeColor="calculated",this.archEdgeArrowColor="calculated",this.archEdgeWidth="3",this.archGroupBorderColor=this.primaryBorderColor,this.archGroupBorderWidth="2px",this.clusterBkg="#1E1A2E",this.clusterBorder="#BDBCCC",this.noteBorderColor="#FACC15",this.noteFontWeight=600,this.filterColor="#FFFFFF"}updateColors(){var e,i,n,o,a,s,l,h,c,d,p;if(this.primaryTextColor=this.primaryTextColor||(this.darkMode?"#eee":"#FFFFFF"),this.secondaryColor=this.secondaryColor||x(this.primaryColor,{h:-120}),this.tertiaryColor=this.tertiaryColor||x(this.primaryColor,{h:180,l:5}),this.primaryBorderColor=this.primaryBorderColor||Z(this.primaryColor,this.darkMode),this.secondaryBorderColor=this.secondaryBorderColor||Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=this.tertiaryBorderColor||Z(this.tertiaryColor,this.darkMode),this.noteBorderColor=this.noteBorderColor||Z(this.noteBkgColor,this.darkMode),this.noteBkgColor=this.noteBkgColor||"#fff5ad",this.noteTextColor=this.noteTextColor||"#FFFFFF",this.secondaryTextColor=this.secondaryTextColor||B(this.secondaryColor),this.tertiaryTextColor=this.tertiaryTextColor||B(this.tertiaryColor),this.lineColor=this.lineColor||B(this.background),this.arrowheadColor=this.arrowheadColor||B(this.background),this.textColor=this.textColor||this.primaryTextColor,this.border2=this.border2||this.tertiaryBorderColor,this.nodeBkg=this.nodeBkg||this.primaryColor,this.mainBkg=this.mainBkg||this.primaryColor,this.nodeBorder=this.nodeBorder||this.border1,this.clusterBkg=this.clusterBkg||this.tertiaryColor,this.clusterBorder=this.clusterBorder||this.tertiaryBorderColor,this.defaultLinkColor=this.defaultLinkColor||this.lineColor,this.titleColor=this.titleColor||this.tertiaryTextColor,this.edgeLabelBackground=this.edgeLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.nodeTextColor=this.nodeTextColor||this.primaryTextColor,this.actorBorder="#FFFFFF",this.signalColor="#FFFFFF",this.labelBoxBorderColor="#BDBCCC",this.actorBorder=this.actorBorder||this.primaryBorderColor,this.actorBkg=this.actorBkg||this.mainBkg,this.actorTextColor=this.actorTextColor||this.primaryTextColor,this.actorLineColor=this.actorLineColor||this.actorBorder,this.labelBoxBkgColor=this.labelBoxBkgColor||this.actorBkg,this.signalColor=this.signalColor||this.textColor,this.signalTextColor=this.signalTextColor||this.textColor,this.labelBoxBorderColor=this.labelBoxBorderColor||this.actorBorder,this.labelTextColor=this.labelTextColor||this.actorTextColor,this.loopTextColor=this.loopTextColor||this.actorTextColor,this.activationBorderColor=this.activationBorderColor||L(this.secondaryColor,10),this.activationBkgColor=this.activationBkgColor||this.secondaryColor,this.sequenceNumberColor=this.sequenceNumberColor||B(this.lineColor),this.sectionBkgColor=this.sectionBkgColor||this.tertiaryColor,this.altSectionBkgColor=this.altSectionBkgColor||"white",this.sectionBkgColor=this.sectionBkgColor||this.secondaryColor,this.sectionBkgColor2=this.sectionBkgColor2||this.primaryColor,this.excludeBkgColor=this.excludeBkgColor||"#eeeeee",this.taskBorderColor=this.taskBorderColor||this.primaryBorderColor,this.taskBkgColor=this.taskBkgColor||this.primaryColor,this.activeTaskBorderColor=this.activeTaskBorderColor||this.primaryColor,this.activeTaskBkgColor=this.activeTaskBkgColor||F(this.primaryColor,23),this.gridColor=this.gridColor||"lightgrey",this.doneTaskBkgColor=this.doneTaskBkgColor||"lightgrey",this.doneTaskBorderColor=this.doneTaskBorderColor||"grey",this.critBorderColor=this.critBorderColor||"#ff8888",this.critBkgColor=this.critBkgColor||"red",this.todayLineColor=this.todayLineColor||"red",this.taskTextColor=this.taskTextColor||this.textColor,this.taskTextOutsideColor=this.taskTextOutsideColor||this.textColor,this.taskTextLightColor=this.taskTextLightColor||this.textColor,this.taskTextColor=this.taskTextColor||this.primaryTextColor,this.taskTextDarkColor=this.taskTextDarkColor||this.textColor,this.taskTextClickableColor=this.taskTextClickableColor||"#003163",this.archEdgeColor=this.lineColor,this.archEdgeArrowColor=this.lineColor,this.personBorder=this.personBorder||this.primaryBorderColor,this.personBkg=this.personBkg||this.mainBkg,this.transitionColor=this.transitionColor||this.lineColor,this.transitionLabelColor=this.transitionLabelColor||this.textColor,this.stateLabelColor=this.stateLabelColor||this.stateBkg||this.primaryTextColor,this.vertLineColor=this.vertLineColor||this.primaryBorderColor,this.compositeBackground="#16141F",this.altBackground="#16141F",this.compositeTitleBackground="#16141F",this.stateEdgeLabelBackground="#16141F",this.fontWeight=600,this.stateBkg=this.stateBkg||this.mainBkg,this.labelBackgroundColor=this.labelBackgroundColor||this.stateBkg,this.compositeBackground=this.compositeBackground||this.background||this.tertiaryColor,this.altBackground=this.altBackground||"#f0f0f0",this.compositeTitleBackground=this.compositeTitleBackground||this.mainBkg,this.compositeBorder=this.compositeBorder||this.nodeBorder,this.innerEndBackground=this.nodeBorder,this.errorBkgColor=this.errorBkgColor||this.tertiaryColor,this.errorTextColor=this.errorTextColor||this.tertiaryTextColor,this.transitionColor=this.transitionColor||this.lineColor,this.specialStateColor=this.lineColor,this.cScale0=this.cScale0||this.primaryColor,this.cScale1=this.cScale1||this.secondaryColor,this.cScale2=this.cScale2||this.tertiaryColor,this.cScale3=this.cScale3||x(this.primaryColor,{h:30}),this.cScale4=this.cScale4||x(this.primaryColor,{h:60}),this.cScale5=this.cScale5||x(this.primaryColor,{h:90}),this.cScale6=this.cScale6||x(this.primaryColor,{h:120}),this.cScale7=this.cScale7||x(this.primaryColor,{h:150}),this.cScale8=this.cScale8||x(this.primaryColor,{h:210,l:150}),this.cScale9=this.cScale9||x(this.primaryColor,{h:270}),this.cScale10=this.cScale10||x(this.primaryColor,{h:300}),this.cScale11=this.cScale11||x(this.primaryColor,{h:330}),this.darkMode)for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this["cScale"+u]=L(this["cScale"+u],75);else for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this["cScale"+u]=L(this["cScale"+u],25);for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this["cScaleInv"+u]=this["cScaleInv"+u]||B(this["cScale"+u]);for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this.darkMode?this["cScalePeer"+u]=this["cScalePeer"+u]||F(this["cScale"+u],10):this["cScalePeer"+u]=this["cScalePeer"+u]||L(this["cScale"+u],10);this.scaleLabelColor=this.scaleLabelColor||this.labelTextColor;for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this["cScaleLabel"+u]=this["cScaleLabel"+u]||this.scaleLabelColor;const t=this.darkMode?-4:-1;for(let u=0;u<5;u++)this["surface"+u]=this["surface"+u]||x(this.mainBkg,{h:180,s:-15,l:t*(5+u*3)}),this["surfacePeer"+u]=this["surfacePeer"+u]||x(this.mainBkg,{h:180,s:-15,l:t*(8+u*3)});this.classText=this.classText||this.textColor,this.fillType0=this.fillType0||this.primaryColor,this.fillType1=this.fillType1||this.secondaryColor,this.fillType2=this.fillType2||x(this.primaryColor,{h:64}),this.fillType3=this.fillType3||x(this.secondaryColor,{h:64}),this.fillType4=this.fillType4||x(this.primaryColor,{h:-64}),this.fillType5=this.fillType5||x(this.secondaryColor,{h:-64}),this.fillType6=this.fillType6||x(this.primaryColor,{h:128}),this.fillType7=this.fillType7||x(this.secondaryColor,{h:128}),this.pie1=this.pie1||this.primaryColor,this.pie2=this.pie2||this.secondaryColor,this.pie3=this.pie3||this.tertiaryColor,this.pie4=this.pie4||x(this.primaryColor,{l:-10}),this.pie5=this.pie5||x(this.secondaryColor,{l:-10}),this.pie6=this.pie6||x(this.tertiaryColor,{l:-10}),this.pie7=this.pie7||x(this.primaryColor,{h:60,l:-10}),this.pie8=this.pie8||x(this.primaryColor,{h:-60,l:-10}),this.pie9=this.pie9||x(this.primaryColor,{h:120,l:0}),this.pie10=this.pie10||x(this.primaryColor,{h:60,l:-20}),this.pie11=this.pie11||x(this.primaryColor,{h:-60,l:-20}),this.pie12=this.pie12||x(this.primaryColor,{h:120,l:-10}),this.pieTitleTextSize=this.pieTitleTextSize||"25px",this.pieTitleTextColor=this.pieTitleTextColor||this.taskTextDarkColor,this.pieSectionTextSize=this.pieSectionTextSize||"17px",this.pieSectionTextColor=this.pieSectionTextColor||this.textColor,this.pieLegendTextSize=this.pieLegendTextSize||"17px",this.pieLegendTextColor=this.pieLegendTextColor||this.taskTextDarkColor,this.pieStrokeColor=this.pieStrokeColor||"black",this.pieStrokeWidth=this.pieStrokeWidth||"2px",this.pieOuterStrokeWidth=this.pieOuterStrokeWidth||"2px",this.pieOuterStrokeColor=this.pieOuterStrokeColor||"black",this.pieOpacity=this.pieOpacity||"0.7",this.vennTitleTextColor=this.vennTitleTextColor??this.titleColor,this.vennSetTextColor=this.vennSetTextColor??this.textColor,this.quadrant1Fill=this.quadrant1Fill||this.primaryColor,this.quadrant2Fill=this.quadrant2Fill||x(this.primaryColor,{r:5,g:5,b:5}),this.quadrant3Fill=this.quadrant3Fill||x(this.primaryColor,{r:10,g:10,b:10}),this.quadrant4Fill=this.quadrant4Fill||x(this.primaryColor,{r:15,g:15,b:15}),this.quadrant1TextFill=this.quadrant1TextFill||this.primaryTextColor,this.quadrant2TextFill=this.quadrant2TextFill||x(this.primaryTextColor,{r:-5,g:-5,b:-5}),this.quadrant3TextFill=this.quadrant3TextFill||x(this.primaryTextColor,{r:-10,g:-10,b:-10}),this.quadrant4TextFill=this.quadrant4TextFill||x(this.primaryTextColor,{r:-15,g:-15,b:-15}),this.quadrantPointFill=this.quadrantPointFill||tr(this.quadrant1Fill)?F(this.quadrant1Fill):L(this.quadrant1Fill),this.quadrantPointTextFill=this.quadrantPointTextFill||this.primaryTextColor,this.quadrantXAxisTextFill=this.quadrantXAxisTextFill||this.primaryTextColor,this.quadrantYAxisTextFill=this.quadrantYAxisTextFill||this.primaryTextColor,this.quadrantInternalBorderStrokeFill=this.quadrantInternalBorderStrokeFill||this.primaryBorderColor,this.quadrantExternalBorderStrokeFill=this.quadrantExternalBorderStrokeFill||this.primaryBorderColor,this.quadrantTitleFill=this.quadrantTitleFill||this.primaryTextColor,this.xyChart={backgroundColor:((e=this.xyChart)==null?void 0:e.backgroundColor)||this.background,titleColor:((i=this.xyChart)==null?void 0:i.titleColor)||this.primaryTextColor,xAxisTitleColor:((n=this.xyChart)==null?void 0:n.xAxisTitleColor)||this.primaryTextColor,xAxisLabelColor:((o=this.xyChart)==null?void 0:o.xAxisLabelColor)||this.primaryTextColor,xAxisTickColor:((a=this.xyChart)==null?void 0:a.xAxisTickColor)||this.primaryTextColor,xAxisLineColor:((s=this.xyChart)==null?void 0:s.xAxisLineColor)||this.primaryTextColor,yAxisTitleColor:((l=this.xyChart)==null?void 0:l.yAxisTitleColor)||this.primaryTextColor,yAxisLabelColor:((h=this.xyChart)==null?void 0:h.yAxisLabelColor)||this.primaryTextColor,yAxisTickColor:((c=this.xyChart)==null?void 0:c.yAxisTickColor)||this.primaryTextColor,yAxisLineColor:((d=this.xyChart)==null?void 0:d.yAxisLineColor)||this.primaryTextColor,plotColorPalette:((p=this.xyChart)==null?void 0:p.plotColorPalette)||"#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"},this.requirementBackground=this.requirementBackground||this.primaryColor,this.requirementBorderColor=this.requirementBorderColor||this.primaryBorderColor,this.requirementBorderSize=this.requirementBorderSize||"1",this.requirementTextColor=this.requirementTextColor||this.primaryTextColor,this.relationColor=this.relationColor||this.lineColor,this.relationLabelBackground=this.relationLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.relationLabelColor=this.relationLabelColor||this.actorTextColor,this.requirementEdgeLabelBackground="#16141F",this.git0=this.git0||this.primaryColor,this.git1=this.git1||this.secondaryColor,this.git2=this.git2||this.tertiaryColor,this.git3=this.git3||x(this.primaryColor,{h:-30}),this.git4=this.git4||x(this.primaryColor,{h:-60}),this.git5=this.git5||x(this.primaryColor,{h:-90}),this.git6=this.git6||x(this.primaryColor,{h:60}),this.git7=this.git7||x(this.primaryColor,{h:120}),this.darkMode?(this.git0=F(this.git0,25),this.git1=F(this.git1,25),this.git2=F(this.git2,25),this.git3=F(this.git3,25),this.git4=F(this.git4,25),this.git5=F(this.git5,25),this.git6=F(this.git6,25),this.git7=F(this.git7,25)):(this.git0=L(this.git0,25),this.git1=L(this.git1,25),this.git2=L(this.git2,25),this.git3=L(this.git3,25),this.git4=L(this.git4,25),this.git5=L(this.git5,25),this.git6=L(this.git6,25),this.git7=L(this.git7,25)),this.gitInv0=this.gitInv0||B(this.git0),this.gitInv1=this.gitInv1||B(this.git1),this.gitInv2=this.gitInv2||B(this.git2),this.gitInv3=this.gitInv3||B(this.git3),this.gitInv4=this.gitInv4||B(this.git4),this.gitInv5=this.gitInv5||B(this.git5),this.gitInv6=this.gitInv6||B(this.git6),this.gitInv7=this.gitInv7||B(this.git7),this.branchLabelColor=this.branchLabelColor||(this.darkMode?"black":this.labelTextColor),this.gitBranchLabel0=this.gitBranchLabel0||this.branchLabelColor,this.gitBranchLabel1=this.gitBranchLabel1||this.branchLabelColor,this.gitBranchLabel2=this.gitBranchLabel2||this.branchLabelColor,this.gitBranchLabel3=this.gitBranchLabel3||this.branchLabelColor,this.gitBranchLabel4=this.gitBranchLabel4||this.branchLabelColor,this.gitBranchLabel5=this.gitBranchLabel5||this.branchLabelColor,this.gitBranchLabel6=this.gitBranchLabel6||this.branchLabelColor,this.gitBranchLabel7=this.gitBranchLabel7||this.branchLabelColor,this.tagLabelColor=this.tagLabelColor||this.primaryTextColor,this.tagLabelBackground=this.tagLabelBackground||this.primaryColor,this.tagLabelBorder=this.tagBorder||this.primaryBorderColor,this.tagLabelFontSize=this.tagLabelFontSize||"10px",this.commitLabelColor=this.commitLabelColor||this.secondaryTextColor,this.commitLabelBackground=this.commitLabelBackground||this.secondaryColor,this.commitLabelFontSize=this.commitLabelFontSize||"10px",this.commitLineColor=this.commitLineColor??"#BDBCCC",this.erEdgeLabelBackground="#16141F",this.attributeBackgroundColorOdd=this.attributeBackgroundColorOdd||lr,this.attributeBackgroundColorEven=this.attributeBackgroundColorEven||hr}calculate(t){if(typeof t!="object"){this.updateColors();return}const e=Object.keys(t);e.forEach(i=>{this[i]=t[i]}),this.updateColors(),e.forEach(i=>{this[i]=t[i]})}},g(ci,"Theme"),ci),Qm=g(r=>{const t=new Zm;return t.calculate(r),t},"getThemeVariables"),di,Jm=(di=class{constructor(){this.background="#ffffff",this.primaryColor="#cccccc",this.mainBkg="#ffffff",this.noteBkgColor="#fff5ad",this.noteTextColor="#28253D",this.THEME_COLOR_LIMIT=12,this.radius=12,this.strokeWidth=2,this.primaryBorderColor=Z(this.primaryColor,this.darkMode),this.fontFamily='"Recursive Variable", arial, sans-serif',this.fontSize="14px",this.nodeBorder="#28253D",this.stateBorder="#28253D",this.useGradient=!1,this.gradientStart="#0042eb",this.gradientStop="#eb0042",this.dropShadow="url(#drop-shadow)",this.nodeShadow=!0,this.tertiaryColor="#ffffff",this.archEdgeColor="calculated",this.archEdgeArrowColor="calculated",this.archEdgeWidth="3",this.archGroupBorderColor=this.primaryBorderColor,this.archGroupBorderWidth="2px",this.actorBorder="#28253D",this.noteBorderColor="#FACC15",this.noteFontWeight=600,this.borderColorArray=["#E879F9","#2DD4BF","#FB923C","#22D3EE","#4ADE80","#A78BFA","#F87171","#FACC15","#818CF8","#A3E635 ","#38BDF8","#FB7185"],this.bkgColorArray=["#FDF4FF","#F0FDFA","#FFF7ED","#ECFEFF","#F0FDF4","#F5F3FF","#FEF2F2","#FEFCE8","#EEF2FF","#F7FEE7","#F0F9FF","#FFF1F2"],this.filterColor="#000000"}updateColors(){var o,a,s,l,h,c,d,p,u,m,f;this.primaryTextColor=this.primaryTextColor||(this.darkMode?"#eee":"#28253D"),this.secondaryColor=this.secondaryColor||x(this.primaryColor,{h:-120}),this.tertiaryColor=this.tertiaryColor||x(this.primaryColor,{h:180,l:5}),this.primaryBorderColor=this.primaryBorderColor||Z(this.primaryColor,this.darkMode),this.secondaryBorderColor=this.secondaryBorderColor||Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=this.tertiaryBorderColor||Z(this.tertiaryColor,this.darkMode),this.noteBorderColor=this.noteBorderColor||Z(this.noteBkgColor,this.darkMode),this.noteBkgColor=this.noteBkgColor||"#fff5ad",this.noteTextColor=this.noteTextColor||"#28253D",this.secondaryTextColor=this.secondaryTextColor||B(this.secondaryColor),this.tertiaryTextColor=this.tertiaryTextColor||B(this.tertiaryColor),this.lineColor=this.lineColor||B(this.background),this.arrowheadColor=this.arrowheadColor||B(this.background),this.textColor=this.textColor||this.primaryTextColor,this.border2=this.border2||this.tertiaryBorderColor,this.nodeBkg=this.nodeBkg||this.primaryColor,this.mainBkg=this.mainBkg||this.primaryColor,this.nodeBorder=this.nodeBorder||this.primaryBorderColor,this.clusterBkg=this.clusterBkg||this.tertiaryColor,this.clusterBorder=this.clusterBorder||this.tertiaryBorderColor,this.defaultLinkColor=this.defaultLinkColor||this.lineColor,this.titleColor=this.titleColor||this.tertiaryTextColor,this.edgeLabelBackground=this.edgeLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.nodeTextColor=this.nodeTextColor||this.primaryTextColor,this.actorBorder=this.actorBorder||this.primaryBorderColor,this.actorBkg=this.actorBkg||this.mainBkg,this.actorTextColor=this.actorTextColor||this.primaryTextColor,this.actorLineColor=this.actorLineColor||this.actorBorder,this.labelBoxBkgColor=this.labelBoxBkgColor||this.actorBkg,this.signalColor=this.signalColor||this.textColor,this.signalTextColor=this.signalTextColor||this.textColor,this.labelBoxBorderColor=this.labelBoxBorderColor||this.actorBorder,this.labelTextColor=this.labelTextColor||this.actorTextColor,this.loopTextColor=this.loopTextColor||this.actorTextColor,this.activationBorderColor=this.activationBorderColor||L(this.secondaryColor,10),this.activationBkgColor=this.activationBkgColor||this.secondaryColor,this.sequenceNumberColor=this.sequenceNumberColor||B(this.lineColor);const t="#ECECFE",e="#E9E9F1",i=x(t,{h:180,l:5});this.sectionBkgColor=this.sectionBkgColor||i,this.altSectionBkgColor=this.altSectionBkgColor||"white",this.sectionBkgColor=this.sectionBkgColor||e,this.sectionBkgColor2=this.sectionBkgColor2||t,this.excludeBkgColor=this.excludeBkgColor||"#eeeeee",this.taskBorderColor=this.taskBorderColor||this.primaryBorderColor,this.taskBkgColor=this.taskBkgColor||t,this.activeTaskBorderColor=this.activeTaskBorderColor||t,this.activeTaskBkgColor=this.activeTaskBkgColor||F(t,23),this.gridColor=this.gridColor||"lightgrey",this.doneTaskBkgColor=this.doneTaskBkgColor||"lightgrey",this.doneTaskBorderColor=this.doneTaskBorderColor||"grey",this.critBorderColor=this.critBorderColor||"#ff8888",this.critBkgColor=this.critBkgColor||"red",this.todayLineColor=this.todayLineColor||"red",this.taskTextColor=this.taskTextColor||this.textColor,this.vertLineColor=this.vertLineColor||this.primaryBorderColor,this.taskTextOutsideColor=this.taskTextOutsideColor||this.textColor,this.taskTextLightColor=this.taskTextLightColor||this.textColor,this.taskTextColor=this.taskTextColor||this.primaryTextColor,this.taskTextDarkColor=this.taskTextDarkColor||this.textColor,this.taskTextClickableColor=this.taskTextClickableColor||"#003163",this.archEdgeColor=this.lineColor,this.archEdgeArrowColor=this.lineColor,this.personBorder=this.personBorder||this.primaryBorderColor,this.personBkg=this.personBkg||this.mainBkg,this.transitionColor=this.transitionColor||this.lineColor,this.transitionLabelColor=this.transitionLabelColor||this.textColor,this.stateLabelColor=this.stateLabelColor||this.stateBkg||this.primaryTextColor,this.stateBkg=this.stateBkg||this.mainBkg,this.labelBackgroundColor=this.labelBackgroundColor||this.stateBkg,this.compositeBackground=this.compositeBackground||this.background||this.tertiaryColor,this.altBackground=this.altBackground||"#f0f0f0",this.compositeTitleBackground=this.compositeTitleBackground||this.mainBkg,this.compositeBorder=this.compositeBorder||this.nodeBorder,this.innerEndBackground=this.nodeBorder,this.errorBkgColor=this.errorBkgColor||this.tertiaryColor,this.errorTextColor=this.errorTextColor||this.tertiaryTextColor,this.transitionColor=this.transitionColor||this.lineColor,this.specialStateColor=this.lineColor,this.cScale0=this.cScale0||"#f4a8ff",this.cScale1=this.cScale1||"#46ecd5",this.cScale2=this.cScale2||"#ffb86a",this.cScale3=this.cScale3||"#dab2ff",this.cScale4=this.cScale4||"#7bf1a8",this.cScale5=this.cScale5||"#c4b4ff",this.cScale6=this.cScale6||"#ffa2a2",this.cScale7=this.cScale7||"#ffdf20",this.cScale8=this.cScale8||"#a3b3ff",this.cScale9=this.cScale9||"#bbf451",this.cScale10=this.cScale10||"#74d4ff",this.cScale11=this.cScale11||"#ffa1ad";for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this["cScaleInv"+y]=this["cScaleInv"+y]||B(this["cScale"+y]);for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this.darkMode?this["cScalePeer"+y]=this["cScalePeer"+y]||F(this["cScale"+y],10):this["cScalePeer"+y]=this["cScalePeer"+y]||L(this["cScale"+y],10);this.scaleLabelColor=this.scaleLabelColor||this.labelTextColor;for(let y=0;y<this.THEME_COLOR_LIMIT;y++)this["cScaleLabel"+y]=this["cScaleLabel"+y]||this.scaleLabelColor;const n=this.darkMode?-4:-1;for(let y=0;y<5;y++)this["surface"+y]=this["surface"+y]||x(this.mainBkg,{h:180,s:-15,l:n*(5+y*3)}),this["surfacePeer"+y]=this["surfacePeer"+y]||x(this.mainBkg,{h:180,s:-15,l:n*(8+y*3)});this.classText=this.classText||this.textColor,this.fillType0=this.fillType0||t,this.fillType1=this.fillType1||e,this.fillType2=this.fillType2||x(t,{h:64}),this.fillType3=this.fillType3||x(e,{h:64}),this.fillType4=this.fillType4||x(t,{h:-64}),this.fillType5=this.fillType5||x(e,{h:-64}),this.fillType6=this.fillType6||x(t,{h:128}),this.fillType7=this.fillType7||x(e,{h:128}),this.pie1=this.pie1||t,this.pie2=this.pie2||e,this.pie3=this.pie3||i,this.pie4=this.pie4||x(t,{l:-10}),this.pie5=this.pie5||x(e,{l:-10}),this.pie6=this.pie6||x(i,{l:-10}),this.pie7=this.pie7||x(t,{h:60,l:-10}),this.pie8=this.pie8||x(t,{h:-60,l:-10}),this.pie9=this.pie9||x(t,{h:120,l:0}),this.pie10=this.pie10||x(t,{h:60,l:-20}),this.pie11=this.pie11||x(t,{h:-60,l:-20}),this.pie12=this.pie12||x(t,{h:120,l:-10}),this.pieTitleTextSize=this.pieTitleTextSize||"25px",this.pieTitleTextColor=this.pieTitleTextColor||this.taskTextDarkColor,this.pieSectionTextSize=this.pieSectionTextSize||"17px",this.pieSectionTextColor=this.pieSectionTextColor||this.textColor,this.pieLegendTextSize=this.pieLegendTextSize||"17px",this.pieLegendTextColor=this.pieLegendTextColor||this.taskTextDarkColor,this.pieStrokeColor=this.pieStrokeColor||"black",this.pieStrokeWidth=this.pieStrokeWidth||"2px",this.pieOuterStrokeWidth=this.pieOuterStrokeWidth||"2px",this.pieOuterStrokeColor=this.pieOuterStrokeColor||"black",this.pieOpacity=this.pieOpacity||"0.7",this.vennTitleTextColor=this.vennTitleTextColor??this.titleColor,this.vennSetTextColor=this.vennSetTextColor??this.textColor,this.quadrant1Fill=this.quadrant1Fill||t,this.quadrant2Fill=this.quadrant2Fill||x(t,{r:5,g:5,b:5}),this.quadrant3Fill=this.quadrant3Fill||x(t,{r:10,g:10,b:10}),this.quadrant4Fill=this.quadrant4Fill||x(t,{r:15,g:15,b:15}),this.quadrant1TextFill=this.quadrant1TextFill||this.primaryTextColor,this.quadrant2TextFill=this.quadrant2TextFill||x(this.primaryTextColor,{r:-5,g:-5,b:-5}),this.quadrant3TextFill=this.quadrant3TextFill||x(this.primaryTextColor,{r:-10,g:-10,b:-10}),this.quadrant4TextFill=this.quadrant4TextFill||x(this.primaryTextColor,{r:-15,g:-15,b:-15}),this.quadrantPointFill=this.quadrantPointFill||tr(this.quadrant1Fill)?F(this.quadrant1Fill):L(this.quadrant1Fill),this.quadrantPointTextFill=this.quadrantPointTextFill||this.primaryTextColor,this.quadrantXAxisTextFill=this.quadrantXAxisTextFill||this.primaryTextColor,this.quadrantYAxisTextFill=this.quadrantYAxisTextFill||this.primaryTextColor,this.quadrantInternalBorderStrokeFill=this.quadrantInternalBorderStrokeFill||this.primaryBorderColor,this.quadrantExternalBorderStrokeFill=this.quadrantExternalBorderStrokeFill||this.primaryBorderColor,this.quadrantTitleFill=this.quadrantTitleFill||this.primaryTextColor,this.xyChart={backgroundColor:((o=this.xyChart)==null?void 0:o.backgroundColor)||this.background,titleColor:((a=this.xyChart)==null?void 0:a.titleColor)||this.primaryTextColor,xAxisTitleColor:((s=this.xyChart)==null?void 0:s.xAxisTitleColor)||this.primaryTextColor,xAxisLabelColor:((l=this.xyChart)==null?void 0:l.xAxisLabelColor)||this.primaryTextColor,xAxisTickColor:((h=this.xyChart)==null?void 0:h.xAxisTickColor)||this.primaryTextColor,xAxisLineColor:((c=this.xyChart)==null?void 0:c.xAxisLineColor)||this.primaryTextColor,yAxisTitleColor:((d=this.xyChart)==null?void 0:d.yAxisTitleColor)||this.primaryTextColor,yAxisLabelColor:((p=this.xyChart)==null?void 0:p.yAxisLabelColor)||this.primaryTextColor,yAxisTickColor:((u=this.xyChart)==null?void 0:u.yAxisTickColor)||this.primaryTextColor,yAxisLineColor:((m=this.xyChart)==null?void 0:m.yAxisLineColor)||this.primaryTextColor,plotColorPalette:((f=this.xyChart)==null?void 0:f.plotColorPalette)||"#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"},this.requirementBackground=this.requirementBackground||t,this.requirementBorderColor=this.requirementBorderColor||this.primaryBorderColor,this.requirementBorderSize=this.requirementBorderSize||"1",this.requirementTextColor=this.requirementTextColor||this.primaryTextColor,this.relationColor=this.relationColor||this.lineColor,this.relationLabelBackground=this.relationLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.relationLabelColor=this.relationLabelColor||this.actorTextColor,this.git0=this.git0||t,this.git1=this.git1||e,this.git2=this.git2||i,this.git3=this.git3||x(t,{h:-30}),this.git4=this.git4||x(t,{h:-60}),this.git5=this.git5||x(t,{h:-90}),this.git6=this.git6||x(t,{h:60}),this.git7=this.git7||x(t,{h:120}),this.darkMode?(this.git0=F(this.git0,25),this.git1=F(this.git1,25),this.git2=F(this.git2,25),this.git3=F(this.git3,25),this.git4=F(this.git4,25),this.git5=F(this.git5,25),this.git6=F(this.git6,25),this.git7=F(this.git7,25)):(this.git0=L(this.git0,25),this.git1=L(this.git1,25),this.git2=L(this.git2,25),this.git3=L(this.git3,25),this.git4=L(this.git4,25),this.git5=L(this.git5,25),this.git6=L(this.git6,25),this.git7=L(this.git7,25)),this.gitInv0=this.gitInv0||B(this.git0),this.gitInv1=this.gitInv1||B(this.git1),this.gitInv2=this.gitInv2||B(this.git2),this.gitInv3=this.gitInv3||B(this.git3),this.gitInv4=this.gitInv4||B(this.git4),this.gitInv5=this.gitInv5||B(this.git5),this.gitInv6=this.gitInv6||B(this.git6),this.gitInv7=this.gitInv7||B(this.git7),this.branchLabelColor=this.branchLabelColor||(this.darkMode?"black":this.labelTextColor),this.gitBranchLabel0=this.gitBranchLabel0||this.branchLabelColor,this.gitBranchLabel1=this.gitBranchLabel1||this.branchLabelColor,this.gitBranchLabel2=this.gitBranchLabel2||this.branchLabelColor,this.gitBranchLabel3=this.gitBranchLabel3||this.branchLabelColor,this.gitBranchLabel4=this.gitBranchLabel4||this.branchLabelColor,this.gitBranchLabel5=this.gitBranchLabel5||this.branchLabelColor,this.gitBranchLabel6=this.gitBranchLabel6||this.branchLabelColor,this.gitBranchLabel7=this.gitBranchLabel7||this.branchLabelColor,this.tagLabelColor=this.tagLabelColor||this.primaryTextColor,this.tagLabelBackground=this.tagLabelBackground||this.primaryColor,this.tagLabelBorder=this.tagBorder||this.primaryBorderColor,this.tagLabelFontSize=this.tagLabelFontSize||"10px",this.commitLabelColor=this.commitLabelColor||this.secondaryTextColor,this.commitLabelBackground=this.commitLabelBackground||this.secondaryColor,this.commitLineColor=this.commitLineColor??"#BDBCCC",this.commitLabelFontSize=this.commitLabelFontSize||"10px",this.fontWeight=600,this.erEdgeLabelBackground="#FFFFFF",this.attributeBackgroundColorOdd=this.attributeBackgroundColorOdd||lr,this.attributeBackgroundColorEven=this.attributeBackgroundColorEven||hr}calculate(t){if(typeof t!="object"){this.updateColors();return}const e=Object.keys(t);e.forEach(i=>{this[i]=t[i]}),this.updateColors(),e.forEach(i=>{this[i]=t[i]})}},g(di,"Theme"),di),ty=g(r=>{const t=new Jm;return t.calculate(r),t},"getThemeVariables"),ui,ry=(ui=class{constructor(){this.background="#333",this.primaryColor="#1f2020",this.secondaryColor=F(this.primaryColor,16),this.tertiaryColor=x(this.primaryColor,{h:-160}),this.primaryBorderColor=B(this.background),this.secondaryBorderColor=Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=Z(this.tertiaryColor,this.darkMode),this.primaryTextColor=B(this.primaryColor),this.secondaryTextColor=B(this.secondaryColor),this.tertiaryTextColor=B(this.tertiaryColor),this.mainBkg="#111113",this.secondBkg="calculated",this.mainContrastColor="lightgrey",this.darkTextColor=F(B("#323D47"),10),this.border1="#ccc",this.border2=Br(255,255,255,.25),this.arrowheadColor=B(this.background),this.fontFamily='"Recursive Variable", arial, sans-serif',this.fontSize="14px",this.labelBackground="#111113",this.textColor="#ccc",this.THEME_COLOR_LIMIT=12,this.radius=12,this.strokeWidth=2,this.noteBkgColor=this.noteBkgColor??"#FEF9C3",this.noteTextColor=this.noteTextColor??"#28253D",this.THEME_COLOR_LIMIT=12,this.fontFamily='"Recursive Variable", arial, sans-serif',this.fontSize="14px",this.nodeBorder="#FFFFFF",this.stateBorder="#FFFFFF",this.useGradient=!1,this.gradientStart="#0042eb",this.gradientStop="#eb0042",this.dropShadow="url(#drop-shadow)",this.nodeShadow=!0,this.archEdgeColor="calculated",this.archEdgeArrowColor="calculated",this.archEdgeWidth="3",this.archGroupBorderColor=this.primaryBorderColor,this.archGroupBorderWidth="2px",this.clusterBkg="#1E1A2E",this.clusterBorder="#BDBCCC",this.noteBorderColor="#FACC15",this.noteFontWeight=600,this.borderColorArray=["#E879F9","#2DD4BF","#FB923C","#22D3EE","#4ADE80","#A78BFA","#F87171","#FACC15","#818CF8","#A3E635 ","#38BDF8","#FB7185"],this.bkgColorArray=[],this.filterColor="#FFFFFF"}updateColors(){var e,i,n,o,a,s,l,h,c,d,p;this.primaryTextColor=this.primaryTextColor||(this.darkMode?"#eee":"#FFFFFF"),this.secondaryColor=this.secondaryColor||x(this.primaryColor,{h:-120}),this.tertiaryColor=this.tertiaryColor||x(this.primaryColor,{h:180,l:5}),this.primaryBorderColor=this.primaryBorderColor||Z(this.primaryColor,this.darkMode),this.secondaryBorderColor=this.secondaryBorderColor||Z(this.secondaryColor,this.darkMode),this.tertiaryBorderColor=this.tertiaryBorderColor||Z(this.tertiaryColor,this.darkMode),this.noteBorderColor=this.noteBorderColor||Z(this.noteBkgColor,this.darkMode),this.noteBkgColor=this.noteBkgColor||"#fff5ad",this.noteTextColor=this.noteTextColor||"#FFFFFF",this.secondaryTextColor=this.secondaryTextColor||B(this.secondaryColor),this.tertiaryTextColor=this.tertiaryTextColor||B(this.tertiaryColor),this.lineColor=this.lineColor||B(this.background),this.arrowheadColor=this.arrowheadColor||B(this.background),this.textColor=this.textColor||this.primaryTextColor,this.border2=this.border2||this.tertiaryBorderColor,this.nodeBkg=this.nodeBkg||this.primaryColor,this.mainBkg=this.mainBkg||this.primaryColor,this.nodeBorder=this.nodeBorder||this.border1,this.clusterBkg=this.clusterBkg||this.tertiaryColor,this.clusterBorder=this.clusterBorder||this.tertiaryBorderColor,this.defaultLinkColor=this.defaultLinkColor||this.lineColor,this.titleColor=this.titleColor||this.tertiaryTextColor,this.edgeLabelBackground=this.edgeLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.nodeTextColor=this.nodeTextColor||this.primaryTextColor,this.actorBorder="#FFFFFF",this.signalColor="#FFFFFF",this.labelBoxBorderColor="#BDBCCC",this.actorBorder=this.actorBorder||this.primaryBorderColor,this.actorBkg=this.actorBkg||this.mainBkg,this.actorTextColor=this.actorTextColor||this.primaryTextColor,this.actorLineColor=this.actorLineColor||this.actorBorder,this.labelBoxBkgColor=this.labelBoxBkgColor||this.actorBkg,this.signalColor=this.signalColor||this.textColor,this.signalTextColor=this.signalTextColor||this.textColor,this.labelBoxBorderColor=this.labelBoxBorderColor||this.actorBorder,this.labelTextColor=this.labelTextColor||this.actorTextColor,this.loopTextColor=this.loopTextColor||this.actorTextColor,this.activationBorderColor=this.activationBorderColor||L(this.secondaryColor,10),this.activationBkgColor=this.activationBkgColor||this.secondaryColor,this.sequenceNumberColor=this.sequenceNumberColor||B(this.lineColor),this.rootLabelColor="#FFFFFF",this.sectionBkgColor=this.sectionBkgColor||this.tertiaryColor,this.altSectionBkgColor=this.altSectionBkgColor||"white",this.sectionBkgColor=this.sectionBkgColor||this.secondaryColor,this.sectionBkgColor2=this.sectionBkgColor2||this.primaryColor,this.excludeBkgColor=this.excludeBkgColor||"#eeeeee",this.taskBorderColor=this.taskBorderColor||this.primaryBorderColor,this.taskBkgColor=this.taskBkgColor||this.primaryColor,this.activeTaskBorderColor=this.activeTaskBorderColor||this.primaryColor,this.activeTaskBkgColor=this.activeTaskBkgColor||F(this.primaryColor,23),this.gridColor=this.gridColor||"lightgrey",this.doneTaskBkgColor=this.doneTaskBkgColor||"lightgrey",this.doneTaskBorderColor=this.doneTaskBorderColor||"grey",this.critBorderColor=this.critBorderColor||"#ff8888",this.critBkgColor=this.critBkgColor||"red",this.todayLineColor=this.todayLineColor||"red",this.taskTextColor=this.taskTextColor||this.textColor,this.vertLineColor=this.vertLineColor||this.primaryBorderColor,this.taskTextOutsideColor=this.taskTextOutsideColor||this.textColor,this.taskTextLightColor=this.taskTextLightColor||this.textColor,this.taskTextColor=this.taskTextColor||this.primaryTextColor,this.taskTextDarkColor=this.taskTextDarkColor||this.textColor,this.taskTextClickableColor=this.taskTextClickableColor||"#003163",this.archEdgeColor=this.lineColor,this.archEdgeArrowColor=this.lineColor,this.personBorder=this.personBorder||this.primaryBorderColor,this.personBkg=this.personBkg||this.mainBkg,this.transitionColor=this.transitionColor||this.lineColor,this.transitionLabelColor=this.transitionLabelColor||this.textColor,this.stateLabelColor=this.stateLabelColor||this.stateBkg||this.primaryTextColor,this.stateBkg=this.stateBkg||this.mainBkg,this.labelBackgroundColor=this.labelBackgroundColor||this.stateBkg,this.compositeBackground=this.compositeBackground||this.background||this.tertiaryColor,this.altBackground=this.altBackground||"#f0f0f0",this.compositeTitleBackground=this.compositeTitleBackground||this.mainBkg,this.compositeBorder=this.compositeBorder||this.nodeBorder,this.innerEndBackground=this.nodeBorder,this.errorBkgColor=this.errorBkgColor||this.tertiaryColor,this.errorTextColor=this.errorTextColor||this.tertiaryTextColor,this.transitionColor=this.transitionColor||this.lineColor,this.specialStateColor=this.lineColor,this.cScale0=this.cScale0||"#f4a8ff",this.cScale1=this.cScale1||"#46ecd5",this.cScale2=this.cScale2||"#ffb86a",this.cScale3=this.cScale3||"#dab2ff",this.cScale4=this.cScale4||"#7bf1a8",this.cScale5=this.cScale5||"#c4b4ff",this.cScale6=this.cScale6||"#ffa2a2",this.cScale7=this.cScale7||"#ffdf20",this.cScale8=this.cScale8||"#a3b3ff",this.cScale9=this.cScale9||"#bbf451",this.cScale10=this.cScale10||"#74d4ff",this.cScale11=this.cScale11||"#ffa1ad";for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this["cScaleInv"+u]=this["cScaleInv"+u]||B(this["cScale"+u]);for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this.darkMode?this["cScalePeer"+u]=this["cScalePeer"+u]||F(this["cScale"+u],10):this["cScalePeer"+u]=this["cScalePeer"+u]||L(this["cScale"+u],10);this.scaleLabelColor=this.scaleLabelColor||this.labelTextColor;for(let u=0;u<this.THEME_COLOR_LIMIT;u++)this["cScaleLabel"+u]=L(this["cScale"+u],75);const t=this.darkMode?-4:-1;for(let u=0;u<5;u++)this["surface"+u]=this["surface"+u]||x(this.mainBkg,{h:180,s:-15,l:t*(5+u*3)}),this["surfacePeer"+u]=this["surfacePeer"+u]||x(this.mainBkg,{h:180,s:-15,l:t*(8+u*3)});this.classText=this.classText||this.textColor,this.fillType0=this.fillType0||this.primaryColor,this.fillType1=this.fillType1||this.secondaryColor,this.fillType2=this.fillType2||x(this.primaryColor,{h:64}),this.fillType3=this.fillType3||x(this.secondaryColor,{h:64}),this.fillType4=this.fillType4||x(this.primaryColor,{h:-64}),this.fillType5=this.fillType5||x(this.secondaryColor,{h:-64}),this.fillType6=this.fillType6||x(this.primaryColor,{h:128}),this.fillType7=this.fillType7||x(this.secondaryColor,{h:128}),this.pie1=this.pie1||this.primaryColor,this.pie2=this.pie2||this.secondaryColor,this.pie3=this.pie3||this.tertiaryColor,this.pie4=this.pie4||x(this.primaryColor,{l:-10}),this.pie5=this.pie5||x(this.secondaryColor,{l:-10}),this.pie6=this.pie6||x(this.tertiaryColor,{l:-10}),this.pie7=this.pie7||x(this.primaryColor,{h:60,l:-10}),this.pie8=this.pie8||x(this.primaryColor,{h:-60,l:-10}),this.pie9=this.pie9||x(this.primaryColor,{h:120,l:0}),this.pie10=this.pie10||x(this.primaryColor,{h:60,l:-20}),this.pie11=this.pie11||x(this.primaryColor,{h:-60,l:-20}),this.pie12=this.pie12||x(this.primaryColor,{h:120,l:-10}),this.pieTitleTextSize=this.pieTitleTextSize||"25px",this.pieTitleTextColor=this.pieTitleTextColor||this.taskTextDarkColor,this.pieSectionTextSize=this.pieSectionTextSize||"17px",this.pieSectionTextColor=this.pieSectionTextColor||this.textColor,this.pieLegendTextSize=this.pieLegendTextSize||"17px",this.pieLegendTextColor=this.pieLegendTextColor||this.taskTextDarkColor,this.pieStrokeColor=this.pieStrokeColor||"black",this.pieStrokeWidth=this.pieStrokeWidth||"2px",this.pieOuterStrokeWidth=this.pieOuterStrokeWidth||"2px",this.pieOuterStrokeColor=this.pieOuterStrokeColor||"black",this.pieOpacity=this.pieOpacity||"0.7",this.vennTitleTextColor=this.vennTitleTextColor??this.titleColor,this.vennSetTextColor=this.vennSetTextColor??this.textColor,this.quadrant1Fill=this.quadrant1Fill||this.primaryColor,this.quadrant2Fill=this.quadrant2Fill||x(this.primaryColor,{r:5,g:5,b:5}),this.quadrant3Fill=this.quadrant3Fill||x(this.primaryColor,{r:10,g:10,b:10}),this.quadrant4Fill=this.quadrant4Fill||x(this.primaryColor,{r:15,g:15,b:15}),this.quadrant1TextFill=this.quadrant1TextFill||this.primaryTextColor,this.quadrant2TextFill=this.quadrant2TextFill||x(this.primaryTextColor,{r:-5,g:-5,b:-5}),this.quadrant3TextFill=this.quadrant3TextFill||x(this.primaryTextColor,{r:-10,g:-10,b:-10}),this.quadrant4TextFill=this.quadrant4TextFill||x(this.primaryTextColor,{r:-15,g:-15,b:-15}),this.quadrantPointFill=this.quadrantPointFill||tr(this.quadrant1Fill)?F(this.quadrant1Fill):L(this.quadrant1Fill),this.quadrantPointTextFill=this.quadrantPointTextFill||this.primaryTextColor,this.quadrantXAxisTextFill=this.quadrantXAxisTextFill||this.primaryTextColor,this.quadrantYAxisTextFill=this.quadrantYAxisTextFill||this.primaryTextColor,this.quadrantInternalBorderStrokeFill=this.quadrantInternalBorderStrokeFill||this.primaryBorderColor,this.quadrantExternalBorderStrokeFill=this.quadrantExternalBorderStrokeFill||this.primaryBorderColor,this.quadrantTitleFill=this.quadrantTitleFill||this.primaryTextColor,this.xyChart={backgroundColor:((e=this.xyChart)==null?void 0:e.backgroundColor)||this.background,titleColor:((i=this.xyChart)==null?void 0:i.titleColor)||this.primaryTextColor,xAxisTitleColor:((n=this.xyChart)==null?void 0:n.xAxisTitleColor)||this.primaryTextColor,xAxisLabelColor:((o=this.xyChart)==null?void 0:o.xAxisLabelColor)||this.primaryTextColor,xAxisTickColor:((a=this.xyChart)==null?void 0:a.xAxisTickColor)||this.primaryTextColor,xAxisLineColor:((s=this.xyChart)==null?void 0:s.xAxisLineColor)||this.primaryTextColor,yAxisTitleColor:((l=this.xyChart)==null?void 0:l.yAxisTitleColor)||this.primaryTextColor,yAxisLabelColor:((h=this.xyChart)==null?void 0:h.yAxisLabelColor)||this.primaryTextColor,yAxisTickColor:((c=this.xyChart)==null?void 0:c.yAxisTickColor)||this.primaryTextColor,yAxisLineColor:((d=this.xyChart)==null?void 0:d.yAxisLineColor)||this.primaryTextColor,plotColorPalette:((p=this.xyChart)==null?void 0:p.plotColorPalette)||"#FFF4DD,#FFD8B1,#FFA07A,#ECEFF1,#D6DBDF,#C3E0A8,#FFB6A4,#FFD74D,#738FA7,#FFFFF0"},this.requirementBackground=this.requirementBackground||this.primaryColor,this.requirementBorderColor=this.requirementBorderColor||this.primaryBorderColor,this.requirementBorderSize=this.requirementBorderSize||"1",this.requirementTextColor=this.requirementTextColor||this.primaryTextColor,this.relationColor=this.relationColor||this.lineColor,this.relationLabelBackground=this.relationLabelBackground||(this.darkMode?L(this.secondaryColor,30):this.secondaryColor),this.relationLabelColor=this.relationLabelColor||this.actorTextColor,this.git0=this.git0||this.primaryColor,this.git1=this.git1||this.secondaryColor,this.git2=this.git2||this.tertiaryColor,this.git3=this.git3||x(this.primaryColor,{h:-30}),this.git4=this.git4||x(this.primaryColor,{h:-60}),this.git5=this.git5||x(this.primaryColor,{h:-90}),this.git6=this.git6||x(this.primaryColor,{h:60}),this.git7=this.git7||x(this.primaryColor,{h:120}),this.darkMode?(this.git0=F(this.git0,25),this.git1=F(this.git1,25),this.git2=F(this.git2,25),this.git3=F(this.git3,25),this.git4=F(this.git4,25),this.git5=F(this.git5,25),this.git6=F(this.git6,25),this.git7=F(this.git7,25)):(this.git0=L(this.git0,25),this.git1=L(this.git1,25),this.git2=L(this.git2,25),this.git3=L(this.git3,25),this.git4=L(this.git4,25),this.git5=L(this.git5,25),this.git6=L(this.git6,25),this.git7=L(this.git7,25)),this.gitInv0=this.gitInv0||B(this.git0),this.gitInv1=this.gitInv1||B(this.git1),this.gitInv2=this.gitInv2||B(this.git2),this.gitInv3=this.gitInv3||B(this.git3),this.gitInv4=this.gitInv4||B(this.git4),this.gitInv5=this.gitInv5||B(this.git5),this.gitInv6=this.gitInv6||B(this.git6),this.gitInv7=this.gitInv7||B(this.git7),this.branchLabelColor=this.branchLabelColor||(this.darkMode?"black":this.labelTextColor),this.gitBranchLabel0=this.gitBranchLabel0||this.branchLabelColor,this.gitBranchLabel1=this.gitBranchLabel1||this.branchLabelColor,this.gitBranchLabel2=this.gitBranchLabel2||this.branchLabelColor,this.gitBranchLabel3=this.gitBranchLabel3||this.branchLabelColor,this.gitBranchLabel4=this.gitBranchLabel4||this.branchLabelColor,this.gitBranchLabel5=this.gitBranchLabel5||this.branchLabelColor,this.gitBranchLabel6=this.gitBranchLabel6||this.branchLabelColor,this.gitBranchLabel7=this.gitBranchLabel7||this.branchLabelColor,this.tagLabelColor=this.tagLabelColor||this.primaryTextColor,this.tagLabelBackground=this.tagLabelBackground||this.primaryColor,this.tagLabelBorder=this.tagBorder||this.primaryBorderColor,this.tagLabelFontSize=this.tagLabelFontSize||"10px",this.commitLabelColor=this.commitLabelColor||this.secondaryTextColor,this.commitLabelBackground=this.commitLabelBackground||this.secondaryColor,this.commitLabelFontSize=this.commitLabelFontSize||"10px",this.commitLineColor=this.commitLineColor??"#BDBCCC",this.fontWeight=600,this.erEdgeLabelBackground="#16141F",this.attributeBackgroundColorOdd=this.attributeBackgroundColorOdd||lr,this.attributeBackgroundColorEven=this.attributeBackgroundColorEven||hr}calculate(t){if(typeof t!="object"){this.updateColors();return}const e=Object.keys(t);e.forEach(i=>{this[i]=t[i]}),this.updateColors(),e.forEach(i=>{this[i]=t[i]})}},g(ui,"Theme"),ui),ey=g(r=>{const t=new ry;return t.calculate(r),t},"getThemeVariables"),fr={base:{getThemeVariables:Rm},dark:{getThemeVariables:$m},default:{getThemeVariables:zm},forest:{getThemeVariables:qm},neutral:{getThemeVariables:Hm},neo:{getThemeVariables:Gm},"neo-dark":{getThemeVariables:Ym},redux:{getThemeVariables:Km},"redux-dark":{getThemeVariables:Qm},"redux-color":{getThemeVariables:ty},"redux-dark-color":{getThemeVariables:ey}},Nt={flowchart:{useMaxWidth:!0,titleTopMargin:25,subGraphTitleMargin:{top:0,bottom:0},diagramPadding:8,htmlLabels:null,nodeSpacing:50,rankSpacing:50,curve:"basis",padding:15,defaultRenderer:"dagre-wrapper",wrappingWidth:200,inheritDir:!1},sequence:{useMaxWidth:!0,hideUnusedParticipants:!1,activationWidth:10,diagramMarginX:50,diagramMarginY:10,actorMargin:50,width:150,height:65,boxMargin:10,boxTextMargin:5,noteMargin:10,messageMargin:35,messageAlign:"center",mirrorActors:!0,forceMenus:!1,bottomMarginAdj:1,rightAngles:!1,showSequenceNumbers:!1,actorFontSize:14,actorFontFamily:'"Open Sans", sans-serif',actorFontWeight:400,noteFontSize:14,noteFontFamily:'"trebuchet ms", verdana, arial, sans-serif',noteFontWeight:400,noteAlign:"center",messageFontSize:16,messageFontFamily:'"trebuchet ms", verdana, arial, sans-serif',messageFontWeight:400,wrap:!1,wrapPadding:10,labelBoxWidth:50,labelBoxHeight:20},gantt:{useMaxWidth:!0,titleTopMargin:25,barHeight:20,barGap:4,topPadding:50,rightPadding:75,leftPadding:75,gridLineStartPadding:35,fontSize:11,sectionFontSize:11,numberSectionStyles:4,axisFormat:"%Y-%m-%d",topAxis:!1,displayMode:"",weekday:"sunday"},journey:{useMaxWidth:!0,diagramMarginX:50,diagramMarginY:10,leftMargin:150,maxLabelWidth:360,width:150,height:50,boxMargin:10,boxTextMargin:5,noteMargin:10,messageMargin:35,messageAlign:"center",bottomMarginAdj:1,rightAngles:!1,taskFontSize:14,taskFontFamily:'"Open Sans", sans-serif',taskMargin:50,activationWidth:10,textPlacement:"fo",actorColours:["#8FBC8F","#7CFC00","#00FFFF","#20B2AA","#B0E0E6","#FFFFE0"],sectionFills:["#191970","#8B008B","#4B0082","#2F4F4F","#800000","#8B4513","#00008B"],sectionColours:["#fff"],titleColor:"",titleFontFamily:'"trebuchet ms", verdana, arial, sans-serif',titleFontSize:"4ex"},class:{useMaxWidth:!0,titleTopMargin:25,arrowMarkerAbsolute:!1,dividerMargin:10,padding:5,textHeight:10,defaultRenderer:"dagre-wrapper",htmlLabels:!1,hideEmptyMembersBox:!1},state:{useMaxWidth:!0,titleTopMargin:25,dividerMargin:10,sizeUnit:5,padding:8,textHeight:10,titleShift:-15,noteMargin:10,forkWidth:70,forkHeight:7,miniPadding:2,fontSizeFactor:5.02,fontSize:24,labelHeight:16,edgeLengthFactor:"20",compositTitleSize:35,radius:5,defaultRenderer:"dagre-wrapper"},er:{useMaxWidth:!0,titleTopMargin:25,diagramPadding:20,layoutDirection:"TB",minEntityWidth:100,minEntityHeight:75,entityPadding:15,nodeSpacing:140,rankSpacing:80,stroke:"gray",fill:"honeydew",fontSize:12},pie:{useMaxWidth:!0,textPosition:.75},quadrantChart:{useMaxWidth:!0,chartWidth:500,chartHeight:500,titleFontSize:20,titlePadding:10,quadrantPadding:5,xAxisLabelPadding:5,yAxisLabelPadding:5,xAxisLabelFontSize:16,yAxisLabelFontSize:16,quadrantLabelFontSize:16,quadrantTextTopPadding:5,pointTextPadding:5,pointLabelFontSize:12,pointRadius:5,xAxisPosition:"top",yAxisPosition:"left",quadrantInternalBorderStrokeWidth:1,quadrantExternalBorderStrokeWidth:2},xyChart:{useMaxWidth:!0,width:700,height:500,titleFontSize:20,titlePadding:10,showDataLabel:!1,showDataLabelOutsideBar:!1,showTitle:!0,xAxis:{$ref:"#/$defs/XYChartAxisConfig",showLabel:!0,labelFontSize:14,labelPadding:5,showTitle:!0,titleFontSize:16,titlePadding:5,showTick:!0,tickLength:5,tickWidth:2,showAxisLine:!0,axisLineWidth:2},yAxis:{$ref:"#/$defs/XYChartAxisConfig",showLabel:!0,labelFontSize:14,labelPadding:5,showTitle:!0,titleFontSize:16,titlePadding:5,showTick:!0,tickLength:5,tickWidth:2,showAxisLine:!0,axisLineWidth:2},chartOrientation:"vertical",plotReservedSpacePercent:50},requirement:{useMaxWidth:!0,rect_fill:"#f9f9f9",text_color:"#333",rect_border_size:"0.5px",rect_border_color:"#bbb",rect_min_width:200,rect_min_height:200,fontSize:14,rect_padding:10,line_height:20},mindmap:{useMaxWidth:!0,padding:10,maxNodeWidth:200,layoutAlgorithm:"cose-bilkent"},ishikawa:{useMaxWidth:!0,diagramPadding:20},kanban:{useMaxWidth:!0,padding:8,sectionWidth:200,ticketBaseUrl:""},timeline:{useMaxWidth:!0,diagramMarginX:50,diagramMarginY:10,leftMargin:150,width:150,height:50,boxMargin:10,boxTextMargin:5,noteMargin:10,messageMargin:35,messageAlign:"center",bottomMarginAdj:1,rightAngles:!1,taskFontSize:14,taskFontFamily:'"Open Sans", sans-serif',taskMargin:50,activationWidth:10,textPlacement:"fo",actorColours:["#8FBC8F","#7CFC00","#00FFFF","#20B2AA","#B0E0E6","#FFFFE0"],sectionFills:["#191970","#8B008B","#4B0082","#2F4F4F","#800000","#8B4513","#00008B"],sectionColours:["#fff"],disableMulticolor:!1},gitGraph:{useMaxWidth:!0,titleTopMargin:25,diagramPadding:8,nodeLabel:{width:75,height:100,x:-25,y:0},mainBranchName:"main",mainBranchOrder:0,showCommitLabel:!0,showBranches:!0,rotateCommitLabel:!0,parallelCommits:!1,arrowMarkerAbsolute:!1},c4:{useMaxWidth:!0,diagramMarginX:50,diagramMarginY:10,c4ShapeMargin:50,c4ShapePadding:20,width:216,height:60,boxMargin:10,c4ShapeInRow:4,nextLinePaddingX:0,c4BoundaryInRow:2,personFontSize:14,personFontFamily:'"Open Sans", sans-serif',personFontWeight:"normal",external_personFontSize:14,external_personFontFamily:'"Open Sans", sans-serif',external_personFontWeight:"normal",systemFontSize:14,systemFontFamily:'"Open Sans", sans-serif',systemFontWeight:"normal",external_systemFontSize:14,external_systemFontFamily:'"Open Sans", sans-serif',external_systemFontWeight:"normal",system_dbFontSize:14,system_dbFontFamily:'"Open Sans", sans-serif',system_dbFontWeight:"normal",external_system_dbFontSize:14,external_system_dbFontFamily:'"Open Sans", sans-serif',external_system_dbFontWeight:"normal",system_queueFontSize:14,system_queueFontFamily:'"Open Sans", sans-serif',system_queueFontWeight:"normal",external_system_queueFontSize:14,external_system_queueFontFamily:'"Open Sans", sans-serif',external_system_queueFontWeight:"normal",boundaryFontSize:14,boundaryFontFamily:'"Open Sans", sans-serif',boundaryFontWeight:"normal",messageFontSize:12,messageFontFamily:'"Open Sans", sans-serif',messageFontWeight:"normal",containerFontSize:14,containerFontFamily:'"Open Sans", sans-serif',containerFontWeight:"normal",external_containerFontSize:14,external_containerFontFamily:'"Open Sans", sans-serif',external_containerFontWeight:"normal",container_dbFontSize:14,container_dbFontFamily:'"Open Sans", sans-serif',container_dbFontWeight:"normal",external_container_dbFontSize:14,external_container_dbFontFamily:'"Open Sans", sans-serif',external_container_dbFontWeight:"normal",container_queueFontSize:14,container_queueFontFamily:'"Open Sans", sans-serif',container_queueFontWeight:"normal",external_container_queueFontSize:14,external_container_queueFontFamily:'"Open Sans", sans-serif',external_container_queueFontWeight:"normal",componentFontSize:14,componentFontFamily:'"Open Sans", sans-serif',componentFontWeight:"normal",external_componentFontSize:14,external_componentFontFamily:'"Open Sans", sans-serif',external_componentFontWeight:"normal",component_dbFontSize:14,component_dbFontFamily:'"Open Sans", sans-serif',component_dbFontWeight:"normal",external_component_dbFontSize:14,external_component_dbFontFamily:'"Open Sans", sans-serif',external_component_dbFontWeight:"normal",component_queueFontSize:14,component_queueFontFamily:'"Open Sans", sans-serif',component_queueFontWeight:"normal",external_component_queueFontSize:14,external_component_queueFontFamily:'"Open Sans", sans-serif',external_component_queueFontWeight:"normal",wrap:!0,wrapPadding:10,person_bg_color:"#08427B",person_border_color:"#073B6F",external_person_bg_color:"#686868",external_person_border_color:"#8A8A8A",system_bg_color:"#1168BD",system_border_color:"#3C7FC0",system_db_bg_color:"#1168BD",system_db_border_color:"#3C7FC0",system_queue_bg_color:"#1168BD",system_queue_border_color:"#3C7FC0",external_system_bg_color:"#999999",external_system_border_color:"#8A8A8A",external_system_db_bg_color:"#999999",external_system_db_border_color:"#8A8A8A",external_system_queue_bg_color:"#999999",external_system_queue_border_color:"#8A8A8A",container_bg_color:"#438DD5",container_border_color:"#3C7FC0",container_db_bg_color:"#438DD5",container_db_border_color:"#3C7FC0",container_queue_bg_color:"#438DD5",container_queue_border_color:"#3C7FC0",external_container_bg_color:"#B3B3B3",external_container_border_color:"#A6A6A6",external_container_db_bg_color:"#B3B3B3",external_container_db_border_color:"#A6A6A6",external_container_queue_bg_color:"#B3B3B3",external_container_queue_border_color:"#A6A6A6",component_bg_color:"#85BBF0",component_border_color:"#78A8D8",component_db_bg_color:"#85BBF0",component_db_border_color:"#78A8D8",component_queue_bg_color:"#85BBF0",component_queue_border_color:"#78A8D8",external_component_bg_color:"#CCCCCC",external_component_border_color:"#BFBFBF",external_component_db_bg_color:"#CCCCCC",external_component_db_border_color:"#BFBFBF",external_component_queue_bg_color:"#CCCCCC",external_component_queue_border_color:"#BFBFBF"},sankey:{useMaxWidth:!0,width:600,height:400,linkColor:"gradient",nodeAlignment:"justify",showValues:!0,prefix:"",suffix:""},block:{useMaxWidth:!0,padding:8},packet:{useMaxWidth:!0,rowHeight:32,bitWidth:32,bitsPerRow:32,showBits:!0,paddingX:5,paddingY:5},treeView:{useMaxWidth:!0,rowIndent:10,paddingX:5,paddingY:5,lineThickness:1},architecture:{useMaxWidth:!0,padding:40,iconSize:80,fontSize:16,randomize:!1},radar:{useMaxWidth:!0,width:600,height:600,marginTop:50,marginRight:50,marginBottom:50,marginLeft:50,axisScaleFactor:1,axisLabelFactor:1.05,curveTension:.17},venn:{useMaxWidth:!0,width:800,height:450,padding:8,useDebugLayout:!1},theme:"default",look:"classic",handDrawnSeed:0,layout:"dagre",maxTextSize:5e4,maxEdges:500,darkMode:!1,fontFamily:'"trebuchet ms", verdana, arial, sans-serif;',logLevel:5,securityLevel:"strict",startOnLoad:!0,arrowMarkerAbsolute:!1,secure:["secure","securityLevel","startOnLoad","maxTextSize","suppressErrorRendering","maxEdges"],legacyMathML:!1,forceLegacyMathML:!1,deterministicIds:!1,fontSize:16,markdownAutoWrap:!0,suppressErrorRendering:!1},El={...Nt,deterministicIDSeed:void 0,elk:{mergeEdges:!1,nodePlacementStrategy:"BRANDES_KOEPF",forceNodeModelOrder:!1,considerModelOrder:"NODES_AND_EDGES"},themeCSS:void 0,themeVariables:fr.default.getThemeVariables(),sequence:{...Nt.sequence,messageFont:g(function(){return{fontFamily:this.messageFontFamily,fontSize:this.messageFontSize,fontWeight:this.messageFontWeight}},"messageFont"),noteFont:g(function(){return{fontFamily:this.noteFontFamily,fontSize:this.noteFontSize,fontWeight:this.noteFontWeight}},"noteFont"),actorFont:g(function(){return{fontFamily:this.actorFontFamily,fontSize:this.actorFontSize,fontWeight:this.actorFontWeight}},"actorFont")},class:{hideEmptyMembersBox:!1},gantt:{...Nt.gantt,tickInterval:void 0,useWidth:void 0},c4:{...Nt.c4,useWidth:void 0,personFont:g(function(){return{fontFamily:this.personFontFamily,fontSize:this.personFontSize,fontWeight:this.personFontWeight}},"personFont"),flowchart:{...Nt.flowchart,inheritDir:!1},external_personFont:g(function(){return{fontFamily:this.external_personFontFamily,fontSize:this.external_personFontSize,fontWeight:this.external_personFontWeight}},"external_personFont"),systemFont:g(function(){return{fontFamily:this.systemFontFamily,fontSize:this.systemFontSize,fontWeight:this.systemFontWeight}},"systemFont"),external_systemFont:g(function(){return{fontFamily:this.external_systemFontFamily,fontSize:this.external_systemFontSize,fontWeight:this.external_systemFontWeight}},"external_systemFont"),system_dbFont:g(function(){return{fontFamily:this.system_dbFontFamily,fontSize:this.system_dbFontSize,fontWeight:this.system_dbFontWeight}},"system_dbFont"),external_system_dbFont:g(function(){return{fontFamily:this.external_system_dbFontFamily,fontSize:this.external_system_dbFontSize,fontWeight:this.external_system_dbFontWeight}},"external_system_dbFont"),system_queueFont:g(function(){return{fontFamily:this.system_queueFontFamily,fontSize:this.system_queueFontSize,fontWeight:this.system_queueFontWeight}},"system_queueFont"),external_system_queueFont:g(function(){return{fontFamily:this.external_system_queueFontFamily,fontSize:this.external_system_queueFontSize,fontWeight:this.external_system_queueFontWeight}},"external_system_queueFont"),containerFont:g(function(){return{fontFamily:this.containerFontFamily,fontSize:this.containerFontSize,fontWeight:this.containerFontWeight}},"containerFont"),external_containerFont:g(function(){return{fontFamily:this.external_containerFontFamily,fontSize:this.external_containerFontSize,fontWeight:this.external_containerFontWeight}},"external_containerFont"),container_dbFont:g(function(){return{fontFamily:this.container_dbFontFamily,fontSize:this.container_dbFontSize,fontWeight:this.container_dbFontWeight}},"container_dbFont"),external_container_dbFont:g(function(){return{fontFamily:this.external_container_dbFontFamily,fontSize:this.external_container_dbFontSize,fontWeight:this.external_container_dbFontWeight}},"external_container_dbFont"),container_queueFont:g(function(){return{fontFamily:this.container_queueFontFamily,fontSize:this.container_queueFontSize,fontWeight:this.container_queueFontWeight}},"container_queueFont"),external_container_queueFont:g(function(){return{fontFamily:this.external_container_queueFontFamily,fontSize:this.external_container_queueFontSize,fontWeight:this.external_container_queueFontWeight}},"external_container_queueFont"),componentFont:g(function(){return{fontFamily:this.componentFontFamily,fontSize:this.componentFontSize,fontWeight:this.componentFontWeight}},"componentFont"),external_componentFont:g(function(){return{fontFamily:this.external_componentFontFamily,fontSize:this.external_componentFontSize,fontWeight:this.external_componentFontWeight}},"external_componentFont"),component_dbFont:g(function(){return{fontFamily:this.component_dbFontFamily,fontSize:this.component_dbFontSize,fontWeight:this.component_dbFontWeight}},"component_dbFont"),external_component_dbFont:g(function(){return{fontFamily:this.external_component_dbFontFamily,fontSize:this.external_component_dbFontSize,fontWeight:this.external_component_dbFontWeight}},"external_component_dbFont"),component_queueFont:g(function(){return{fontFamily:this.component_queueFontFamily,fontSize:this.component_queueFontSize,fontWeight:this.component_queueFontWeight}},"component_queueFont"),external_component_queueFont:g(function(){return{fontFamily:this.external_component_queueFontFamily,fontSize:this.external_component_queueFontSize,fontWeight:this.external_component_queueFontWeight}},"external_component_queueFont"),boundaryFont:g(function(){return{fontFamily:this.boundaryFontFamily,fontSize:this.boundaryFontSize,fontWeight:this.boundaryFontWeight}},"boundaryFont"),messageFont:g(function(){return{fontFamily:this.messageFontFamily,fontSize:this.messageFontSize,fontWeight:this.messageFontWeight}},"messageFont")},pie:{...Nt.pie,useWidth:984},xyChart:{...Nt.xyChart,useWidth:void 0},requirement:{...Nt.requirement,useWidth:void 0},packet:{...Nt.packet},treeView:{...Nt.treeView,useWidth:void 0},radar:{...Nt.radar},ishikawa:{...Nt.ishikawa},treemap:{useMaxWidth:!0,padding:10,diagramPadding:8,showValues:!0,nodeWidth:100,nodeHeight:40,borderWidth:1,valueFontSize:12,labelFontSize:14,valueFormat:","},venn:{...Nt.venn}},Pl=g((r,t="")=>Object.keys(r).reduce((e,i)=>Array.isArray(r[i])?e:typeof r[i]=="object"&&r[i]!==null?[...e,t+i,...Pl(r[i],"")]:[...e,t+i],[]),"keyify"),iy=new Set(Pl(El,"")),Dl=El,Ki=g(r=>{if(P.debug("sanitizeDirective called with",r),!(typeof r!="object"||r==null)){if(Array.isArray(r)){r.forEach(t=>Ki(t));return}for(const t of Object.keys(r)){if(P.debug("Checking key",t),t.startsWith("__")||t.includes("proto")||t.includes("constr")||!iy.has(t)||r[t]==null){P.debug("sanitize deleting key: ",t),delete r[t];continue}if(typeof r[t]=="object"){P.debug("sanitizing object",t),Ki(r[t]);continue}const e=["themeCSS","fontFamily","altFontFamily"];for(const i of e)t.includes(i)&&(P.debug("sanitizing css option",t),r[t]=ny(r[t]))}if(r.themeVariables)for(const t of Object.keys(r.themeVariables)){const e=r.themeVariables[t];e!=null&&e.match&&!e.match(/^[\d "#%(),.;A-Za-z]+$/)&&(r.themeVariables[t]="")}P.debug("After sanitization",r)}},"sanitizeDirective"),ny=g(r=>{let t=0,e=0;for(const i of r){if(t<e)return"{ /* ERROR: Unbalanced CSS */ }";i==="{"?t++:i==="}"&&e++}return t!==e?"{ /* ERROR: Unbalanced CSS */ }":r},"sanitizeCss"),ce=Object.freeze(Dl),xr=g(r=>!(r===!1||["false","null","0"].includes(String(r).trim().toLowerCase())),"evaluate"),It=ft({},ce),Zi,Gr=[],We=ft({},ce),Fn=g((r,t)=>{let e=ft({},r),i={};for(const n of t)Ol(n),i=ft(i,n);if(e=ft(e,i),i.theme&&i.theme in fr){const n=ft({},Zi),o=ft(n.themeVariables||{},i.themeVariables);e.theme&&e.theme in fr&&(e.themeVariables=fr[e.theme].getThemeVariables(o))}return We=e,Wl(We),We},"updateCurrentConfig"),oy=g(r=>(It=ft({},ce),It=ft(It,r),r.theme&&fr[r.theme]&&(It.themeVariables=fr[r.theme].getThemeVariables(r.themeVariables)),Fn(It,Gr),It),"setSiteConfig"),sy=g(r=>{Zi=ft({},r)},"saveConfigFromInitialize"),ay=g(r=>(It=ft(It,r),Fn(It,Gr),It),"updateSiteConfig"),Il=g(()=>ft({},It),"getSiteConfig"),Rl=g(r=>(Wl(r),ft(We,r),ct()),"setConfig"),ct=g(()=>ft({},We),"getConfig"),Ol=g(r=>{r&&(["secure",...It.secure??[]].forEach(t=>{Object.hasOwn(r,t)&&(P.debug(`Denied attempt to modify a secure key ${t}`,r[t]),delete r[t])}),Object.keys(r).forEach(t=>{t.startsWith("__")&&delete r[t]}),Object.keys(r).forEach(t=>{typeof r[t]=="string"&&(r[t].includes("<")||r[t].includes(">")||r[t].includes("url(data:"))&&delete r[t],typeof r[t]=="object"&&Ol(r[t])}))},"sanitize"),ly=g(r=>{var t;Ki(r),r.fontFamily&&!((t=r.themeVariables)!=null&&t.fontFamily)&&(r.themeVariables={...r.themeVariables,fontFamily:r.fontFamily}),Gr.push(r),Fn(It,Gr)},"addDirective"),Qi=g((r=It)=>{Gr=[],Fn(r,Gr)},"reset"),hy={LAZY_LOAD_DEPRECATED:"The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead.",FLOWCHART_HTML_LABELS_DEPRECATED:"flowchart.htmlLabels is deprecated. Please use global htmlLabels instead."},aa={},$l=g(r=>{aa[r]||(P.warn(hy[r]),aa[r]=!0)},"issueWarning"),Wl=g(r=>{r&&(r.lazyLoadedDiagrams||r.loadExternalDiagramsAtStartup)&&$l("LAZY_LOAD_DEPRECATED")},"checkConfig"),y_=g(()=>{let r={};Zi&&(r=ft(r,Zi));for(const t of Gr)r=ft(r,t);return r},"getUserDefinedConfig"),Pt=g(r=>{var t,e;return((t=r.flowchart)==null?void 0:t.htmlLabels)!=null&&$l("FLOWCHART_HTML_LABELS_DEPRECATED"),xr(r.htmlLabels??((e=r.flowchart)==null?void 0:e.htmlLabels)??!0)},"getEffectiveHtmlLabels"),fi=/<br\s*\/?>/gi,cy=g(r=>r?ql(r).replace(/\\n/g,"#br#").split("#br#"):[""],"getRows"),dy=(()=>{let r=!1;return()=>{r||(zl(),r=!0)}})();function zl(){const r="data-temp-href-target";he.addHook("beforeSanitizeAttributes",t=>{t.tagName==="A"&&t.hasAttribute("target")&&t.setAttribute(r,t.getAttribute("target")??"")}),he.addHook("afterSanitizeAttributes",t=>{t.tagName==="A"&&t.hasAttribute(r)&&(t.setAttribute("target",t.getAttribute(r)??""),t.removeAttribute(r),t.getAttribute("target")==="_blank"&&t.setAttribute("rel","noopener"))})}g(zl,"setupDompurifyHooks");var Nl=g(r=>(dy(),he.sanitize(r)),"removeScript"),la=g((r,t)=>{if(Pt(t)){const e=t.securityLevel;e==="antiscript"||e==="strict"||e==="sandbox"?r=Nl(r):e!=="loose"&&(r=ql(r),r=r.replace(/</g,"&lt;").replace(/>/g,"&gt;"),r=r.replace(/=/g,"&equals;"),r=fy(r))}return r},"sanitizeMore"),Jt=g((r,t)=>r&&(t.dompurifyConfig?r=he.sanitize(la(r,t),t.dompurifyConfig).toString():r=he.sanitize(la(r,t),{FORBID_TAGS:["style"]}).toString(),r),"sanitizeText"),uy=g((r,t)=>typeof r=="string"?Jt(r,t):r.flat().map(e=>Jt(e,t)),"sanitizeTextOrArray"),py=g(r=>fi.test(r),"hasBreaks"),gy=g(r=>r.split(fi),"splitBreaks"),fy=g(r=>r.replace(/#br#/g,"<br/>"),"placeholderToBreak"),ql=g(r=>r.replace(fi,"#br#"),"breakToPlaceholder"),my=g(r=>{let t="";return r&&(t=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,t=CSS.escape(t)),t},"getUrl"),yy=g(function(...r){const t=r.filter(e=>!isNaN(e));return Math.max(...t)},"getMax"),Cy=g(function(...r){const t=r.filter(e=>!isNaN(e));return Math.min(...t)},"getMin"),ha=g(function(r){const t=r.split(/(,)/),e=[];for(let i=0;i<t.length;i++){let n=t[i];if(n===","&&i>0&&i+1<t.length){const o=t[i-1],a=t[i+1];xy(o,a)&&(n=o+","+a,i++,e.pop())}e.push(by(n))}return e.join("")},"parseGenericTypes"),po=g((r,t)=>Math.max(0,r.split(t).length-1),"countOccurrence"),xy=g((r,t)=>{const e=po(r,"~"),i=po(t,"~");return e===1&&i===1},"shouldCombineSets"),by=g(r=>{const t=po(r,"~");let e=!1;if(t<=1)return r;t%2!==0&&r.startsWith("~")&&(r=r.substring(1),e=!0);const i=[...r];let n=i.indexOf("~"),o=i.lastIndexOf("~");for(;n!==-1&&o!==-1&&n!==o;)i[n]="<",i[o]=">",n=i.indexOf("~"),o=i.lastIndexOf("~");return e&&i.unshift("~"),i.join("")},"processSet"),ca=g(()=>window.MathMLElement!==void 0,"isMathMLSupported"),go=/\$\$(.*)\$\$/g,je=g(r=>{var t;return(((t=r.match(go))==null?void 0:t.length)??0)>0},"hasKatex"),C_=g(async(r,t)=>{const e=document.createElement("div");e.innerHTML=await jl(r,t),e.id="katex-temp",e.style.visibility="hidden",e.style.position="absolute",e.style.top="0";const i=document.querySelector("body");i==null||i.insertAdjacentElement("beforeend",e);const n={width:e.clientWidth,height:e.clientHeight};return e.remove(),n},"calculateMathMLDimensions"),ky=g(async(r,t)=>{if(!je(r))return r;if(!(ca()||t.legacyMathML||t.forceLegacyMathML))return r.replace(go,"MathML is unsupported in this environment.");{const{default:e}=await it(()=>import("./katex-zxrzDZpL.js"),__vite__mapDeps([])),i=t.forceLegacyMathML||!ca()&&t.legacyMathML?"htmlAndMathml":"mathml";return r.split(fi).map(n=>je(n)?`<div style="display: flex; align-items: center; justify-content: center; white-space: nowrap;">${n}</div>`:`<div>${n}</div>`).join("").replace(go,(n,o)=>e.renderToString(o,{throwOnError:!0,displayMode:!0,output:i}).replace(/\n/g," ").replace(/<annotation.*<\/annotation>/g,""))}},"renderKatexUnsanitized"),jl=g(async(r,t)=>Jt(await ky(r,t),t),"renderKatexSanitized"),mi={getRows:cy,sanitizeText:Jt,sanitizeTextOrArray:uy,hasBreaks:py,splitBreaks:gy,lineBreakRegex:fi,removeScript:Nl,getUrl:my,evaluate:xr,getMax:yy,getMin:Cy},wy=g(function(r,t){for(let e of t)r.attr(e[0],e[1])},"d3Attrs"),Ty=g(function(r,t,e){let i=new Map;return e?(i.set("width","100%"),i.set("style",`max-width: ${t}px;`)):(i.set("height",r),i.set("width",t)),i},"calculateSvgSizeAttrs"),Hl=g(function(r,t,e,i){const n=Ty(t,e,i);wy(r,n)},"configureSvgSize"),vy=g(function(r,t,e,i){const n=t.node().getBBox(),o=n.width,a=n.height;P.info(`SVG bounds: ${o}x${a}`,n);let s=0,l=0;P.info(`Graph bounds: ${s}x${l}`,r),s=o+e*2,l=a+e*2,P.info(`Calculated bounds: ${s}x${l}`),Hl(t,l,s,i);const h=`${n.x-e} ${n.y-e} ${n.width+2*e} ${n.height+2*e}`;t.attr("viewBox",h)},"setupGraphViewbox"),zi={},Sy=g((r,t,e,i)=>{let n="";return r in zi&&zi[r]?n=zi[r]({...e,svgId:i}):P.warn(`No theme found for ${r}`),` & {
    font-family: ${e.fontFamily};
    font-size: ${e.fontSize};
    fill: ${e.textColor}
  }
  @keyframes edge-animation-frame {
    from {
      stroke-dashoffset: 0;
    }
  }
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
  & .edge-animation-slow {
    stroke-dasharray: 9,5 !important;
    stroke-dashoffset: 900;
    animation: dash 50s linear infinite;
    stroke-linecap: round;
  }
  & .edge-animation-fast {
    stroke-dasharray: 9,5 !important;
    stroke-dashoffset: 900;
    animation: dash 20s linear infinite;
    stroke-linecap: round;
  }
  /* Classes common for multiple diagrams */

  & .error-icon {
    fill: ${e.errorBkgColor};
  }
  & .error-text {
    fill: ${e.errorTextColor};
    stroke: ${e.errorTextColor};
  }

  & .edge-thickness-normal {
    stroke-width: ${e.strokeWidth??1}px;
  }
  & .edge-thickness-thick {
    stroke-width: 3.5px
  }
  & .edge-pattern-solid {
    stroke-dasharray: 0;
  }
  & .edge-thickness-invisible {
    stroke-width: 0;
    fill: none;
  }
  & .edge-pattern-dashed{
    stroke-dasharray: 3;
  }
  .edge-pattern-dotted {
    stroke-dasharray: 2;
  }

  & .marker {
    fill: ${e.lineColor};
    stroke: ${e.lineColor};
  }
  & .marker.cross {
    stroke: ${e.lineColor};
  }

  & svg {
    font-family: ${e.fontFamily};
    font-size: ${e.fontSize};
  }
   & p {
    margin: 0
   }

  ${n}
  .node .neo-node {
    stroke: ${e.nodeBorder};
  }

  [data-look="neo"].node rect, [data-look="neo"].cluster rect, [data-look="neo"].node polygon {
    stroke: ${e.useGradient?"url("+i+"-gradient)":e.nodeBorder};
    filter: ${e.dropShadow?e.dropShadow.replace("url(#drop-shadow)",`url(${i}-drop-shadow)`):"none"};
  }


  [data-look="neo"].node path {
    stroke: ${e.useGradient?"url("+i+"-gradient)":e.nodeBorder};
    stroke-width: ${e.strokeWidth??1}px;
  }

  [data-look="neo"].node .outer-path {
    filter: ${e.dropShadow?e.dropShadow.replace("url(#drop-shadow)",`url(${i}-drop-shadow)`):"none"};
  }

  [data-look="neo"].node .neo-line path {
    stroke: ${e.nodeBorder};
    filter: none;
  }

  [data-look="neo"].node circle{
    stroke: ${e.useGradient?"url("+i+"-gradient)":e.nodeBorder};
    filter: ${e.dropShadow?e.dropShadow.replace("url(#drop-shadow)",`url(${i}-drop-shadow)`):"none"};
  }

  [data-look="neo"].node circle .state-start{
    fill: #000000;
  }

  [data-look="neo"].icon-shape .icon {
    fill: ${e.useGradient?"url("+i+"-gradient)":e.nodeBorder};
    filter: ${e.dropShadow?e.dropShadow.replace("url(#drop-shadow)",`url(${i}-drop-shadow)`):"none"};
  }

    [data-look="neo"].icon-shape .icon-neo path {
    stroke: ${e.useGradient?"url("+i+"-gradient)":e.nodeBorder};
    filter: ${e.dropShadow?e.dropShadow.replace("url(#drop-shadow)",`url(${i}-drop-shadow)`):"none"};
  }

  ${t}
`},"getStyles"),_y=g((r,t)=>{t!==void 0&&(zi[r]=t)},"addStylesForDiagram"),By=Sy,Ul={};km(Ul,{clear:()=>Ly,getAccDescription:()=>Ey,getAccTitle:()=>My,getDiagramTitle:()=>Dy,setAccDescription:()=>Ay,setAccTitle:()=>Fy,setDiagramTitle:()=>Py});var ls="",hs="",cs="",ds=g(r=>Jt(r,ct()),"sanitizeText"),Ly=g(()=>{ls="",cs="",hs=""},"clear"),Fy=g(r=>{ls=ds(r).replace(/^\s+/g,"")},"setAccTitle"),My=g(()=>ls,"getAccTitle"),Ay=g(r=>{cs=ds(r).replace(/\n\s+/g,`
`)},"setAccDescription"),Ey=g(()=>cs,"getAccDescription"),Py=g(r=>{hs=ds(r)},"setDiagramTitle"),Dy=g(()=>hs,"getDiagramTitle"),da=P,Iy=ss,ot=ct,x_=Rl,b_=ce,us=g(r=>Jt(r,ot()),"sanitizeText"),Ry=vy,Oy=g(()=>Ul,"getCommonDb"),Ji={},tn=g((r,t,e)=>{var i;Ji[r]&&da.warn(`Diagram with id ${r} already registered. Overwriting.`),Ji[r]=t,e&&Al(r,e),_y(r,t.styles),(i=t.injectUtils)==null||i.call(t,da,Iy,ot,us,Ry,Oy(),()=>{})},"registerDiagram"),fo=g(r=>{if(r in Ji)return Ji[r];throw new $y(r)},"getDiagram"),pi,$y=(pi=class extends Error{constructor(t){super(`Diagram ${t} not found.`)}},g(pi,"DiagramNotFoundError"),pi),Wy={value:()=>{}};function Gl(){for(var r=0,t=arguments.length,e={},i;r<t;++r){if(!(i=arguments[r]+"")||i in e||/[\s.]/.test(i))throw new Error("illegal type: "+i);e[i]=[]}return new Ni(e)}function Ni(r){this._=r}function zy(r,t){return r.trim().split(/^|\s+/).map(function(e){var i="",n=e.indexOf(".");if(n>=0&&(i=e.slice(n+1),e=e.slice(0,n)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:i}})}Ni.prototype=Gl.prototype={constructor:Ni,on:function(r,t){var e=this._,i=zy(r+"",e),n,o=-1,a=i.length;if(arguments.length<2){for(;++o<a;)if((n=(r=i[o]).type)&&(n=Ny(e[n],r.name)))return n;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<a;)if(n=(r=i[o]).type)e[n]=ua(e[n],r.name,t);else if(t==null)for(n in e)e[n]=ua(e[n],r.name,null);return this},copy:function(){var r={},t=this._;for(var e in t)r[e]=t[e].slice();return new Ni(r)},call:function(r,t){if((n=arguments.length-2)>0)for(var e=new Array(n),i=0,n,o;i<n;++i)e[i]=arguments[i+2];if(!this._.hasOwnProperty(r))throw new Error("unknown type: "+r);for(o=this._[r],i=0,n=o.length;i<n;++i)o[i].value.apply(t,e)},apply:function(r,t,e){if(!this._.hasOwnProperty(r))throw new Error("unknown type: "+r);for(var i=this._[r],n=0,o=i.length;n<o;++n)i[n].value.apply(t,e)}};function Ny(r,t){for(var e=0,i=r.length,n;e<i;++e)if((n=r[e]).name===t)return n.value}function ua(r,t,e){for(var i=0,n=r.length;i<n;++i)if(r[i].name===t){r[i]=Wy,r=r.slice(0,i).concat(r.slice(i+1));break}return e!=null&&r.push({name:t,value:e}),r}var mo="http://www.w3.org/1999/xhtml";const pa={svg:"http://www.w3.org/2000/svg",xhtml:mo,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Mn(r){var t=r+="",e=t.indexOf(":");return e>=0&&(t=r.slice(0,e))!=="xmlns"&&(r=r.slice(e+1)),pa.hasOwnProperty(t)?{space:pa[t],local:r}:r}function qy(r){return function(){var t=this.ownerDocument,e=this.namespaceURI;return e===mo&&t.documentElement.namespaceURI===mo?t.createElement(r):t.createElementNS(e,r)}}function jy(r){return function(){return this.ownerDocument.createElementNS(r.space,r.local)}}function Vl(r){var t=Mn(r);return(t.local?jy:qy)(t)}function Hy(){}function ps(r){return r==null?Hy:function(){return this.querySelector(r)}}function Uy(r){typeof r!="function"&&(r=ps(r));for(var t=this._groups,e=t.length,i=new Array(e),n=0;n<e;++n)for(var o=t[n],a=o.length,s=i[n]=new Array(a),l,h,c=0;c<a;++c)(l=o[c])&&(h=r.call(l,l.__data__,c,o))&&("__data__"in l&&(h.__data__=l.__data__),s[c]=h);return new Ht(i,this._parents)}function Gy(r){return r==null?[]:Array.isArray(r)?r:Array.from(r)}function Vy(){return[]}function Yl(r){return r==null?Vy:function(){return this.querySelectorAll(r)}}function Yy(r){return function(){return Gy(r.apply(this,arguments))}}function Xy(r){typeof r=="function"?r=Yy(r):r=Yl(r);for(var t=this._groups,e=t.length,i=[],n=[],o=0;o<e;++o)for(var a=t[o],s=a.length,l,h=0;h<s;++h)(l=a[h])&&(i.push(r.call(l,l.__data__,h,a)),n.push(l));return new Ht(i,n)}function Xl(r){return function(){return this.matches(r)}}function Kl(r){return function(t){return t.matches(r)}}var Ky=Array.prototype.find;function Zy(r){return function(){return Ky.call(this.children,r)}}function Qy(){return this.firstElementChild}function Jy(r){return this.select(r==null?Qy:Zy(typeof r=="function"?r:Kl(r)))}var t0=Array.prototype.filter;function r0(){return Array.from(this.children)}function e0(r){return function(){return t0.call(this.children,r)}}function i0(r){return this.selectAll(r==null?r0:e0(typeof r=="function"?r:Kl(r)))}function n0(r){typeof r!="function"&&(r=Xl(r));for(var t=this._groups,e=t.length,i=new Array(e),n=0;n<e;++n)for(var o=t[n],a=o.length,s=i[n]=[],l,h=0;h<a;++h)(l=o[h])&&r.call(l,l.__data__,h,o)&&s.push(l);return new Ht(i,this._parents)}function Zl(r){return new Array(r.length)}function o0(){return new Ht(this._enter||this._groups.map(Zl),this._parents)}function rn(r,t){this.ownerDocument=r.ownerDocument,this.namespaceURI=r.namespaceURI,this._next=null,this._parent=r,this.__data__=t}rn.prototype={constructor:rn,appendChild:function(r){return this._parent.insertBefore(r,this._next)},insertBefore:function(r,t){return this._parent.insertBefore(r,t)},querySelector:function(r){return this._parent.querySelector(r)},querySelectorAll:function(r){return this._parent.querySelectorAll(r)}};function s0(r){return function(){return r}}function a0(r,t,e,i,n,o){for(var a=0,s,l=t.length,h=o.length;a<h;++a)(s=t[a])?(s.__data__=o[a],i[a]=s):e[a]=new rn(r,o[a]);for(;a<l;++a)(s=t[a])&&(n[a]=s)}function l0(r,t,e,i,n,o,a){var s,l,h=new Map,c=t.length,d=o.length,p=new Array(c),u;for(s=0;s<c;++s)(l=t[s])&&(p[s]=u=a.call(l,l.__data__,s,t)+"",h.has(u)?n[s]=l:h.set(u,l));for(s=0;s<d;++s)u=a.call(r,o[s],s,o)+"",(l=h.get(u))?(i[s]=l,l.__data__=o[s],h.delete(u)):e[s]=new rn(r,o[s]);for(s=0;s<c;++s)(l=t[s])&&h.get(p[s])===l&&(n[s]=l)}function h0(r){return r.__data__}function c0(r,t){if(!arguments.length)return Array.from(this,h0);var e=t?l0:a0,i=this._parents,n=this._groups;typeof r!="function"&&(r=s0(r));for(var o=n.length,a=new Array(o),s=new Array(o),l=new Array(o),h=0;h<o;++h){var c=i[h],d=n[h],p=d.length,u=d0(r.call(c,c&&c.__data__,h,i)),m=u.length,f=s[h]=new Array(m),y=a[h]=new Array(m),C=l[h]=new Array(p);e(c,d,f,y,C,u,t);for(var b=0,k=0,T,v;b<m;++b)if(T=f[b]){for(b>=k&&(k=b+1);!(v=y[k])&&++k<m;);T._next=v||null}}return a=new Ht(a,i),a._enter=s,a._exit=l,a}function d0(r){return typeof r=="object"&&"length"in r?r:Array.from(r)}function u0(){return new Ht(this._exit||this._groups.map(Zl),this._parents)}function p0(r,t,e){var i=this.enter(),n=this,o=this.exit();return typeof r=="function"?(i=r(i),i&&(i=i.selection())):i=i.append(r+""),t!=null&&(n=t(n),n&&(n=n.selection())),e==null?o.remove():e(o),i&&n?i.merge(n).order():n}function g0(r){for(var t=r.selection?r.selection():r,e=this._groups,i=t._groups,n=e.length,o=i.length,a=Math.min(n,o),s=new Array(n),l=0;l<a;++l)for(var h=e[l],c=i[l],d=h.length,p=s[l]=new Array(d),u,m=0;m<d;++m)(u=h[m]||c[m])&&(p[m]=u);for(;l<n;++l)s[l]=e[l];return new Ht(s,this._parents)}function f0(){for(var r=this._groups,t=-1,e=r.length;++t<e;)for(var i=r[t],n=i.length-1,o=i[n],a;--n>=0;)(a=i[n])&&(o&&a.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(a,o),o=a);return this}function m0(r){r||(r=y0);function t(d,p){return d&&p?r(d.__data__,p.__data__):!d-!p}for(var e=this._groups,i=e.length,n=new Array(i),o=0;o<i;++o){for(var a=e[o],s=a.length,l=n[o]=new Array(s),h,c=0;c<s;++c)(h=a[c])&&(l[c]=h);l.sort(t)}return new Ht(n,this._parents).order()}function y0(r,t){return r<t?-1:r>t?1:r>=t?0:NaN}function C0(){var r=arguments[0];return arguments[0]=this,r.apply(null,arguments),this}function x0(){return Array.from(this)}function b0(){for(var r=this._groups,t=0,e=r.length;t<e;++t)for(var i=r[t],n=0,o=i.length;n<o;++n){var a=i[n];if(a)return a}return null}function k0(){let r=0;for(const t of this)++r;return r}function w0(){return!this.node()}function T0(r){for(var t=this._groups,e=0,i=t.length;e<i;++e)for(var n=t[e],o=0,a=n.length,s;o<a;++o)(s=n[o])&&r.call(s,s.__data__,o,n);return this}function v0(r){return function(){this.removeAttribute(r)}}function S0(r){return function(){this.removeAttributeNS(r.space,r.local)}}function _0(r,t){return function(){this.setAttribute(r,t)}}function B0(r,t){return function(){this.setAttributeNS(r.space,r.local,t)}}function L0(r,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttribute(r):this.setAttribute(r,e)}}function F0(r,t){return function(){var e=t.apply(this,arguments);e==null?this.removeAttributeNS(r.space,r.local):this.setAttributeNS(r.space,r.local,e)}}function M0(r,t){var e=Mn(r);if(arguments.length<2){var i=this.node();return e.local?i.getAttributeNS(e.space,e.local):i.getAttribute(e)}return this.each((t==null?e.local?S0:v0:typeof t=="function"?e.local?F0:L0:e.local?B0:_0)(e,t))}function Ql(r){return r.ownerDocument&&r.ownerDocument.defaultView||r.document&&r||r.defaultView}function A0(r){return function(){this.style.removeProperty(r)}}function E0(r,t,e){return function(){this.style.setProperty(r,t,e)}}function P0(r,t,e){return function(){var i=t.apply(this,arguments);i==null?this.style.removeProperty(r):this.style.setProperty(r,i,e)}}function D0(r,t,e){return arguments.length>1?this.each((t==null?A0:typeof t=="function"?P0:E0)(r,t,e??"")):de(this.node(),r)}function de(r,t){return r.style.getPropertyValue(t)||Ql(r).getComputedStyle(r,null).getPropertyValue(t)}function I0(r){return function(){delete this[r]}}function R0(r,t){return function(){this[r]=t}}function O0(r,t){return function(){var e=t.apply(this,arguments);e==null?delete this[r]:this[r]=e}}function $0(r,t){return arguments.length>1?this.each((t==null?I0:typeof t=="function"?O0:R0)(r,t)):this.node()[r]}function Jl(r){return r.trim().split(/^|\s+/)}function gs(r){return r.classList||new th(r)}function th(r){this._node=r,this._names=Jl(r.getAttribute("class")||"")}th.prototype={add:function(r){var t=this._names.indexOf(r);t<0&&(this._names.push(r),this._node.setAttribute("class",this._names.join(" ")))},remove:function(r){var t=this._names.indexOf(r);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(r){return this._names.indexOf(r)>=0}};function rh(r,t){for(var e=gs(r),i=-1,n=t.length;++i<n;)e.add(t[i])}function eh(r,t){for(var e=gs(r),i=-1,n=t.length;++i<n;)e.remove(t[i])}function W0(r){return function(){rh(this,r)}}function z0(r){return function(){eh(this,r)}}function N0(r,t){return function(){(t.apply(this,arguments)?rh:eh)(this,r)}}function q0(r,t){var e=Jl(r+"");if(arguments.length<2){for(var i=gs(this.node()),n=-1,o=e.length;++n<o;)if(!i.contains(e[n]))return!1;return!0}return this.each((typeof t=="function"?N0:t?W0:z0)(e,t))}function j0(){this.textContent=""}function H0(r){return function(){this.textContent=r}}function U0(r){return function(){var t=r.apply(this,arguments);this.textContent=t??""}}function G0(r){return arguments.length?this.each(r==null?j0:(typeof r=="function"?U0:H0)(r)):this.node().textContent}function V0(){this.innerHTML=""}function Y0(r){return function(){this.innerHTML=r}}function X0(r){return function(){var t=r.apply(this,arguments);this.innerHTML=t??""}}function K0(r){return arguments.length?this.each(r==null?V0:(typeof r=="function"?X0:Y0)(r)):this.node().innerHTML}function Z0(){this.nextSibling&&this.parentNode.appendChild(this)}function Q0(){return this.each(Z0)}function J0(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function tC(){return this.each(J0)}function rC(r){var t=typeof r=="function"?r:Vl(r);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function eC(){return null}function iC(r,t){var e=typeof r=="function"?r:Vl(r),i=t==null?eC:typeof t=="function"?t:ps(t);return this.select(function(){return this.insertBefore(e.apply(this,arguments),i.apply(this,arguments)||null)})}function nC(){var r=this.parentNode;r&&r.removeChild(this)}function oC(){return this.each(nC)}function sC(){var r=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(r,this.nextSibling):r}function aC(){var r=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(r,this.nextSibling):r}function lC(r){return this.select(r?aC:sC)}function hC(r){return arguments.length?this.property("__data__",r):this.node().__data__}function cC(r){return function(t){r.call(this,t,this.__data__)}}function dC(r){return r.trim().split(/^|\s+/).map(function(t){var e="",i=t.indexOf(".");return i>=0&&(e=t.slice(i+1),t=t.slice(0,i)),{type:t,name:e}})}function uC(r){return function(){var t=this.__on;if(t){for(var e=0,i=-1,n=t.length,o;e<n;++e)o=t[e],(!r.type||o.type===r.type)&&o.name===r.name?this.removeEventListener(o.type,o.listener,o.options):t[++i]=o;++i?t.length=i:delete this.__on}}}function pC(r,t,e){return function(){var i=this.__on,n,o=cC(t);if(i){for(var a=0,s=i.length;a<s;++a)if((n=i[a]).type===r.type&&n.name===r.name){this.removeEventListener(n.type,n.listener,n.options),this.addEventListener(n.type,n.listener=o,n.options=e),n.value=t;return}}this.addEventListener(r.type,o,e),n={type:r.type,name:r.name,value:t,listener:o,options:e},i?i.push(n):this.__on=[n]}}function gC(r,t,e){var i=dC(r+""),n,o=i.length,a;if(arguments.length<2){var s=this.node().__on;if(s){for(var l=0,h=s.length,c;l<h;++l)for(n=0,c=s[l];n<o;++n)if((a=i[n]).type===c.type&&a.name===c.name)return c.value}return}for(s=t?pC:uC,n=0;n<o;++n)this.each(s(i[n],t,e));return this}function ih(r,t,e){var i=Ql(r),n=i.CustomEvent;typeof n=="function"?n=new n(t,e):(n=i.document.createEvent("Event"),e?(n.initEvent(t,e.bubbles,e.cancelable),n.detail=e.detail):n.initEvent(t,!1,!1)),r.dispatchEvent(n)}function fC(r,t){return function(){return ih(this,r,t)}}function mC(r,t){return function(){return ih(this,r,t.apply(this,arguments))}}function yC(r,t){return this.each((typeof t=="function"?mC:fC)(r,t))}function*CC(){for(var r=this._groups,t=0,e=r.length;t<e;++t)for(var i=r[t],n=0,o=i.length,a;n<o;++n)(a=i[n])&&(yield a)}var nh=[null];function Ht(r,t){this._groups=r,this._parents=t}function yi(){return new Ht([[document.documentElement]],nh)}function xC(){return this}Ht.prototype=yi.prototype={constructor:Ht,select:Uy,selectAll:Xy,selectChild:Jy,selectChildren:i0,filter:n0,data:c0,enter:o0,exit:u0,join:p0,merge:g0,selection:xC,order:f0,sort:m0,call:C0,nodes:x0,node:b0,size:k0,empty:w0,each:T0,attr:M0,style:D0,property:$0,classed:q0,text:G0,html:K0,raise:Q0,lower:tC,append:rC,insert:iC,remove:oC,clone:lC,datum:hC,on:gC,dispatch:yC,[Symbol.iterator]:CC};function tt(r){return typeof r=="string"?new Ht([[document.querySelector(r)]],[document.documentElement]):new Ht([[r]],nh)}function fs(r,t,e){r.prototype=t.prototype=e,e.constructor=r}function oh(r,t){var e=Object.create(r.prototype);for(var i in t)e[i]=t[i];return e}function Ci(){}var He=.7,en=1/He,ae="\\s*([+-]?\\d+)\\s*",Ue="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",or="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",bC=/^#([0-9a-f]{3,8})$/,kC=new RegExp(`^rgb\\(${ae},${ae},${ae}\\)$`),wC=new RegExp(`^rgb\\(${or},${or},${or}\\)$`),TC=new RegExp(`^rgba\\(${ae},${ae},${ae},${Ue}\\)$`),vC=new RegExp(`^rgba\\(${or},${or},${or},${Ue}\\)$`),SC=new RegExp(`^hsl\\(${Ue},${or},${or}\\)$`),_C=new RegExp(`^hsla\\(${Ue},${or},${or},${Ue}\\)$`),ga={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};fs(Ci,Ge,{copy(r){return Object.assign(new this.constructor,this,r)},displayable(){return this.rgb().displayable()},hex:fa,formatHex:fa,formatHex8:BC,formatHsl:LC,formatRgb:ma,toString:ma});function fa(){return this.rgb().formatHex()}function BC(){return this.rgb().formatHex8()}function LC(){return sh(this).formatHsl()}function ma(){return this.rgb().formatRgb()}function Ge(r){var t,e;return r=(r+"").trim().toLowerCase(),(t=bC.exec(r))?(e=t[1].length,t=parseInt(t[1],16),e===6?ya(t):e===3?new Ot(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):e===8?Li(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):e===4?Li(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=kC.exec(r))?new Ot(t[1],t[2],t[3],1):(t=wC.exec(r))?new Ot(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=TC.exec(r))?Li(t[1],t[2],t[3],t[4]):(t=vC.exec(r))?Li(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=SC.exec(r))?ba(t[1],t[2]/100,t[3]/100,1):(t=_C.exec(r))?ba(t[1],t[2]/100,t[3]/100,t[4]):ga.hasOwnProperty(r)?ya(ga[r]):r==="transparent"?new Ot(NaN,NaN,NaN,0):null}function ya(r){return new Ot(r>>16&255,r>>8&255,r&255,1)}function Li(r,t,e,i){return i<=0&&(r=t=e=NaN),new Ot(r,t,e,i)}function FC(r){return r instanceof Ci||(r=Ge(r)),r?(r=r.rgb(),new Ot(r.r,r.g,r.b,r.opacity)):new Ot}function yo(r,t,e,i){return arguments.length===1?FC(r):new Ot(r,t,e,i??1)}function Ot(r,t,e,i){this.r=+r,this.g=+t,this.b=+e,this.opacity=+i}fs(Ot,yo,oh(Ci,{brighter(r){return r=r==null?en:Math.pow(en,r),new Ot(this.r*r,this.g*r,this.b*r,this.opacity)},darker(r){return r=r==null?He:Math.pow(He,r),new Ot(this.r*r,this.g*r,this.b*r,this.opacity)},rgb(){return this},clamp(){return new Ot(Hr(this.r),Hr(this.g),Hr(this.b),nn(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Ca,formatHex:Ca,formatHex8:MC,formatRgb:xa,toString:xa}));function Ca(){return`#${Nr(this.r)}${Nr(this.g)}${Nr(this.b)}`}function MC(){return`#${Nr(this.r)}${Nr(this.g)}${Nr(this.b)}${Nr((isNaN(this.opacity)?1:this.opacity)*255)}`}function xa(){const r=nn(this.opacity);return`${r===1?"rgb(":"rgba("}${Hr(this.r)}, ${Hr(this.g)}, ${Hr(this.b)}${r===1?")":`, ${r})`}`}function nn(r){return isNaN(r)?1:Math.max(0,Math.min(1,r))}function Hr(r){return Math.max(0,Math.min(255,Math.round(r)||0))}function Nr(r){return r=Hr(r),(r<16?"0":"")+r.toString(16)}function ba(r,t,e,i){return i<=0?r=t=e=NaN:e<=0||e>=1?r=t=NaN:t<=0&&(r=NaN),new Xt(r,t,e,i)}function sh(r){if(r instanceof Xt)return new Xt(r.h,r.s,r.l,r.opacity);if(r instanceof Ci||(r=Ge(r)),!r)return new Xt;if(r instanceof Xt)return r;r=r.rgb();var t=r.r/255,e=r.g/255,i=r.b/255,n=Math.min(t,e,i),o=Math.max(t,e,i),a=NaN,s=o-n,l=(o+n)/2;return s?(t===o?a=(e-i)/s+(e<i)*6:e===o?a=(i-t)/s+2:a=(t-e)/s+4,s/=l<.5?o+n:2-o-n,a*=60):s=l>0&&l<1?0:a,new Xt(a,s,l,r.opacity)}function AC(r,t,e,i){return arguments.length===1?sh(r):new Xt(r,t,e,i??1)}function Xt(r,t,e,i){this.h=+r,this.s=+t,this.l=+e,this.opacity=+i}fs(Xt,AC,oh(Ci,{brighter(r){return r=r==null?en:Math.pow(en,r),new Xt(this.h,this.s,this.l*r,this.opacity)},darker(r){return r=r==null?He:Math.pow(He,r),new Xt(this.h,this.s,this.l*r,this.opacity)},rgb(){var r=this.h%360+(this.h<0)*360,t=isNaN(r)||isNaN(this.s)?0:this.s,e=this.l,i=e+(e<.5?e:1-e)*t,n=2*e-i;return new Ot(Kn(r>=240?r-240:r+120,n,i),Kn(r,n,i),Kn(r<120?r+240:r-120,n,i),this.opacity)},clamp(){return new Xt(ka(this.h),Fi(this.s),Fi(this.l),nn(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const r=nn(this.opacity);return`${r===1?"hsl(":"hsla("}${ka(this.h)}, ${Fi(this.s)*100}%, ${Fi(this.l)*100}%${r===1?")":`, ${r})`}`}}));function ka(r){return r=(r||0)%360,r<0?r+360:r}function Fi(r){return Math.max(0,Math.min(1,r||0))}function Kn(r,t,e){return(r<60?t+(e-t)*r/60:r<180?e:r<240?t+(e-t)*(240-r)/60:t)*255}const ms=r=>()=>r;function ah(r,t){return function(e){return r+e*t}}function EC(r,t,e){return r=Math.pow(r,e),t=Math.pow(t,e)-r,e=1/e,function(i){return Math.pow(r+i*t,e)}}function k_(r,t){var e=t-r;return e?ah(r,e>180||e<-180?e-360*Math.round(e/360):e):ms(isNaN(r)?t:r)}function PC(r){return(r=+r)==1?lh:function(t,e){return e-t?EC(t,e,r):ms(isNaN(t)?e:t)}}function lh(r,t){var e=t-r;return e?ah(r,e):ms(isNaN(r)?t:r)}const wa=function r(t){var e=PC(t);function i(n,o){var a=e((n=yo(n)).r,(o=yo(o)).r),s=e(n.g,o.g),l=e(n.b,o.b),h=lh(n.opacity,o.opacity);return function(c){return n.r=a(c),n.g=s(c),n.b=l(c),n.opacity=h(c),n+""}}return i.gamma=r,i}(1);function vr(r,t){return r=+r,t=+t,function(e){return r*(1-e)+t*e}}var Co=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Zn=new RegExp(Co.source,"g");function DC(r){return function(){return r}}function IC(r){return function(t){return r(t)+""}}function RC(r,t){var e=Co.lastIndex=Zn.lastIndex=0,i,n,o,a=-1,s=[],l=[];for(r=r+"",t=t+"";(i=Co.exec(r))&&(n=Zn.exec(t));)(o=n.index)>e&&(o=t.slice(e,o),s[a]?s[a]+=o:s[++a]=o),(i=i[0])===(n=n[0])?s[a]?s[a]+=n:s[++a]=n:(s[++a]=null,l.push({i:a,x:vr(i,n)})),e=Zn.lastIndex;return e<t.length&&(o=t.slice(e),s[a]?s[a]+=o:s[++a]=o),s.length<2?l[0]?IC(l[0].x):DC(t):(t=l.length,function(h){for(var c=0,d;c<t;++c)s[(d=l[c]).i]=d.x(h);return s.join("")})}var Ta=180/Math.PI,xo={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function hh(r,t,e,i,n,o){var a,s,l;return(a=Math.sqrt(r*r+t*t))&&(r/=a,t/=a),(l=r*e+t*i)&&(e-=r*l,i-=t*l),(s=Math.sqrt(e*e+i*i))&&(e/=s,i/=s,l/=s),r*i<t*e&&(r=-r,t=-t,l=-l,a=-a),{translateX:n,translateY:o,rotate:Math.atan2(t,r)*Ta,skewX:Math.atan(l)*Ta,scaleX:a,scaleY:s}}var Mi;function OC(r){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(r+"");return t.isIdentity?xo:hh(t.a,t.b,t.c,t.d,t.e,t.f)}function $C(r){return r==null||(Mi||(Mi=document.createElementNS("http://www.w3.org/2000/svg","g")),Mi.setAttribute("transform",r),!(r=Mi.transform.baseVal.consolidate()))?xo:(r=r.matrix,hh(r.a,r.b,r.c,r.d,r.e,r.f))}function ch(r,t,e,i){function n(h){return h.length?h.pop()+" ":""}function o(h,c,d,p,u,m){if(h!==d||c!==p){var f=u.push("translate(",null,t,null,e);m.push({i:f-4,x:vr(h,d)},{i:f-2,x:vr(c,p)})}else(d||p)&&u.push("translate("+d+t+p+e)}function a(h,c,d,p){h!==c?(h-c>180?c+=360:c-h>180&&(h+=360),p.push({i:d.push(n(d)+"rotate(",null,i)-2,x:vr(h,c)})):c&&d.push(n(d)+"rotate("+c+i)}function s(h,c,d,p){h!==c?p.push({i:d.push(n(d)+"skewX(",null,i)-2,x:vr(h,c)}):c&&d.push(n(d)+"skewX("+c+i)}function l(h,c,d,p,u,m){if(h!==d||c!==p){var f=u.push(n(u)+"scale(",null,",",null,")");m.push({i:f-4,x:vr(h,d)},{i:f-2,x:vr(c,p)})}else(d!==1||p!==1)&&u.push(n(u)+"scale("+d+","+p+")")}return function(h,c){var d=[],p=[];return h=r(h),c=r(c),o(h.translateX,h.translateY,c.translateX,c.translateY,d,p),a(h.rotate,c.rotate,d,p),s(h.skewX,c.skewX,d,p),l(h.scaleX,h.scaleY,c.scaleX,c.scaleY,d,p),h=c=null,function(u){for(var m=-1,f=p.length,y;++m<f;)d[(y=p[m]).i]=y.x(u);return d.join("")}}}var WC=ch(OC,"px, ","px)","deg)"),zC=ch($C,", ",")",")"),ue=0,Me=0,we=0,dh=1e3,on,Ae,sn=0,Vr=0,An=0,Ve=typeof performance=="object"&&performance.now?performance:Date,uh=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(r){setTimeout(r,17)};function ys(){return Vr||(uh(NC),Vr=Ve.now()+An)}function NC(){Vr=0}function an(){this._call=this._time=this._next=null}an.prototype=ph.prototype={constructor:an,restart:function(r,t,e){if(typeof r!="function")throw new TypeError("callback is not a function");e=(e==null?ys():+e)+(t==null?0:+t),!this._next&&Ae!==this&&(Ae?Ae._next=this:on=this,Ae=this),this._call=r,this._time=e,bo()},stop:function(){this._call&&(this._call=null,this._time=1/0,bo())}};function ph(r,t,e){var i=new an;return i.restart(r,t,e),i}function qC(){ys(),++ue;for(var r=on,t;r;)(t=Vr-r._time)>=0&&r._call.call(void 0,t),r=r._next;--ue}function va(){Vr=(sn=Ve.now())+An,ue=Me=0;try{qC()}finally{ue=0,HC(),Vr=0}}function jC(){var r=Ve.now(),t=r-sn;t>dh&&(An-=t,sn=r)}function HC(){for(var r,t=on,e,i=1/0;t;)t._call?(i>t._time&&(i=t._time),r=t,t=t._next):(e=t._next,t._next=null,t=r?r._next=e:on=e);Ae=r,bo(i)}function bo(r){if(!ue){Me&&(Me=clearTimeout(Me));var t=r-Vr;t>24?(r<1/0&&(Me=setTimeout(va,r-Ve.now()-An)),we&&(we=clearInterval(we))):(we||(sn=Ve.now(),we=setInterval(jC,dh)),ue=1,uh(va))}}function Sa(r,t,e){var i=new an;return t=t==null?0:+t,i.restart(n=>{i.stop(),r(n+t)},t,e),i}var UC=Gl("start","end","cancel","interrupt"),GC=[],gh=0,_a=1,ko=2,qi=3,Ba=4,wo=5,ji=6;function En(r,t,e,i,n,o){var a=r.__transition;if(!a)r.__transition={};else if(e in a)return;VC(r,e,{name:t,index:i,group:n,on:UC,tween:GC,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:gh})}function Cs(r,t){var e=rr(r,t);if(e.state>gh)throw new Error("too late; already scheduled");return e}function cr(r,t){var e=rr(r,t);if(e.state>qi)throw new Error("too late; already running");return e}function rr(r,t){var e=r.__transition;if(!e||!(e=e[t]))throw new Error("transition not found");return e}function VC(r,t,e){var i=r.__transition,n;i[t]=e,e.timer=ph(o,0,e.time);function o(h){e.state=_a,e.timer.restart(a,e.delay,e.time),e.delay<=h&&a(h-e.delay)}function a(h){var c,d,p,u;if(e.state!==_a)return l();for(c in i)if(u=i[c],u.name===e.name){if(u.state===qi)return Sa(a);u.state===Ba?(u.state=ji,u.timer.stop(),u.on.call("interrupt",r,r.__data__,u.index,u.group),delete i[c]):+c<t&&(u.state=ji,u.timer.stop(),u.on.call("cancel",r,r.__data__,u.index,u.group),delete i[c])}if(Sa(function(){e.state===qi&&(e.state=Ba,e.timer.restart(s,e.delay,e.time),s(h))}),e.state=ko,e.on.call("start",r,r.__data__,e.index,e.group),e.state===ko){for(e.state=qi,n=new Array(p=e.tween.length),c=0,d=-1;c<p;++c)(u=e.tween[c].value.call(r,r.__data__,e.index,e.group))&&(n[++d]=u);n.length=d+1}}function s(h){for(var c=h<e.duration?e.ease.call(null,h/e.duration):(e.timer.restart(l),e.state=wo,1),d=-1,p=n.length;++d<p;)n[d].call(r,c);e.state===wo&&(e.on.call("end",r,r.__data__,e.index,e.group),l())}function l(){e.state=ji,e.timer.stop(),delete i[t];for(var h in i)return;delete r.__transition}}function YC(r,t){var e=r.__transition,i,n,o=!0,a;if(e){t=t==null?null:t+"";for(a in e){if((i=e[a]).name!==t){o=!1;continue}n=i.state>ko&&i.state<wo,i.state=ji,i.timer.stop(),i.on.call(n?"interrupt":"cancel",r,r.__data__,i.index,i.group),delete e[a]}o&&delete r.__transition}}function XC(r){return this.each(function(){YC(this,r)})}function KC(r,t){var e,i;return function(){var n=cr(this,r),o=n.tween;if(o!==e){i=e=o;for(var a=0,s=i.length;a<s;++a)if(i[a].name===t){i=i.slice(),i.splice(a,1);break}}n.tween=i}}function ZC(r,t,e){var i,n;if(typeof e!="function")throw new Error;return function(){var o=cr(this,r),a=o.tween;if(a!==i){n=(i=a).slice();for(var s={name:t,value:e},l=0,h=n.length;l<h;++l)if(n[l].name===t){n[l]=s;break}l===h&&n.push(s)}o.tween=n}}function QC(r,t){var e=this._id;if(r+="",arguments.length<2){for(var i=rr(this.node(),e).tween,n=0,o=i.length,a;n<o;++n)if((a=i[n]).name===r)return a.value;return null}return this.each((t==null?KC:ZC)(e,r,t))}function xs(r,t,e){var i=r._id;return r.each(function(){var n=cr(this,i);(n.value||(n.value={}))[t]=e.apply(this,arguments)}),function(n){return rr(n,i).value[t]}}function fh(r,t){var e;return(typeof t=="number"?vr:t instanceof Ge?wa:(e=Ge(t))?(t=e,wa):RC)(r,t)}function JC(r){return function(){this.removeAttribute(r)}}function tx(r){return function(){this.removeAttributeNS(r.space,r.local)}}function rx(r,t,e){var i,n=e+"",o;return function(){var a=this.getAttribute(r);return a===n?null:a===i?o:o=t(i=a,e)}}function ex(r,t,e){var i,n=e+"",o;return function(){var a=this.getAttributeNS(r.space,r.local);return a===n?null:a===i?o:o=t(i=a,e)}}function ix(r,t,e){var i,n,o;return function(){var a,s=e(this),l;return s==null?void this.removeAttribute(r):(a=this.getAttribute(r),l=s+"",a===l?null:a===i&&l===n?o:(n=l,o=t(i=a,s)))}}function nx(r,t,e){var i,n,o;return function(){var a,s=e(this),l;return s==null?void this.removeAttributeNS(r.space,r.local):(a=this.getAttributeNS(r.space,r.local),l=s+"",a===l?null:a===i&&l===n?o:(n=l,o=t(i=a,s)))}}function ox(r,t){var e=Mn(r),i=e==="transform"?zC:fh;return this.attrTween(r,typeof t=="function"?(e.local?nx:ix)(e,i,xs(this,"attr."+r,t)):t==null?(e.local?tx:JC)(e):(e.local?ex:rx)(e,i,t))}function sx(r,t){return function(e){this.setAttribute(r,t.call(this,e))}}function ax(r,t){return function(e){this.setAttributeNS(r.space,r.local,t.call(this,e))}}function lx(r,t){var e,i;function n(){var o=t.apply(this,arguments);return o!==i&&(e=(i=o)&&ax(r,o)),e}return n._value=t,n}function hx(r,t){var e,i;function n(){var o=t.apply(this,arguments);return o!==i&&(e=(i=o)&&sx(r,o)),e}return n._value=t,n}function cx(r,t){var e="attr."+r;if(arguments.length<2)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;var i=Mn(r);return this.tween(e,(i.local?lx:hx)(i,t))}function dx(r,t){return function(){Cs(this,r).delay=+t.apply(this,arguments)}}function ux(r,t){return t=+t,function(){Cs(this,r).delay=t}}function px(r){var t=this._id;return arguments.length?this.each((typeof r=="function"?dx:ux)(t,r)):rr(this.node(),t).delay}function gx(r,t){return function(){cr(this,r).duration=+t.apply(this,arguments)}}function fx(r,t){return t=+t,function(){cr(this,r).duration=t}}function mx(r){var t=this._id;return arguments.length?this.each((typeof r=="function"?gx:fx)(t,r)):rr(this.node(),t).duration}function yx(r,t){if(typeof t!="function")throw new Error;return function(){cr(this,r).ease=t}}function Cx(r){var t=this._id;return arguments.length?this.each(yx(t,r)):rr(this.node(),t).ease}function xx(r,t){return function(){var e=t.apply(this,arguments);if(typeof e!="function")throw new Error;cr(this,r).ease=e}}function bx(r){if(typeof r!="function")throw new Error;return this.each(xx(this._id,r))}function kx(r){typeof r!="function"&&(r=Xl(r));for(var t=this._groups,e=t.length,i=new Array(e),n=0;n<e;++n)for(var o=t[n],a=o.length,s=i[n]=[],l,h=0;h<a;++h)(l=o[h])&&r.call(l,l.__data__,h,o)&&s.push(l);return new yr(i,this._parents,this._name,this._id)}function wx(r){if(r._id!==this._id)throw new Error;for(var t=this._groups,e=r._groups,i=t.length,n=e.length,o=Math.min(i,n),a=new Array(i),s=0;s<o;++s)for(var l=t[s],h=e[s],c=l.length,d=a[s]=new Array(c),p,u=0;u<c;++u)(p=l[u]||h[u])&&(d[u]=p);for(;s<i;++s)a[s]=t[s];return new yr(a,this._parents,this._name,this._id)}function Tx(r){return(r+"").trim().split(/^|\s+/).every(function(t){var e=t.indexOf(".");return e>=0&&(t=t.slice(0,e)),!t||t==="start"})}function vx(r,t,e){var i,n,o=Tx(t)?Cs:cr;return function(){var a=o(this,r),s=a.on;s!==i&&(n=(i=s).copy()).on(t,e),a.on=n}}function Sx(r,t){var e=this._id;return arguments.length<2?rr(this.node(),e).on.on(r):this.each(vx(e,r,t))}function _x(r){return function(){var t=this.parentNode;for(var e in this.__transition)if(+e!==r)return;t&&t.removeChild(this)}}function Bx(){return this.on("end.remove",_x(this._id))}function Lx(r){var t=this._name,e=this._id;typeof r!="function"&&(r=ps(r));for(var i=this._groups,n=i.length,o=new Array(n),a=0;a<n;++a)for(var s=i[a],l=s.length,h=o[a]=new Array(l),c,d,p=0;p<l;++p)(c=s[p])&&(d=r.call(c,c.__data__,p,s))&&("__data__"in c&&(d.__data__=c.__data__),h[p]=d,En(h[p],t,e,p,h,rr(c,e)));return new yr(o,this._parents,t,e)}function Fx(r){var t=this._name,e=this._id;typeof r!="function"&&(r=Yl(r));for(var i=this._groups,n=i.length,o=[],a=[],s=0;s<n;++s)for(var l=i[s],h=l.length,c,d=0;d<h;++d)if(c=l[d]){for(var p=r.call(c,c.__data__,d,l),u,m=rr(c,e),f=0,y=p.length;f<y;++f)(u=p[f])&&En(u,t,e,f,p,m);o.push(p),a.push(c)}return new yr(o,a,t,e)}var Mx=yi.prototype.constructor;function Ax(){return new Mx(this._groups,this._parents)}function Ex(r,t){var e,i,n;return function(){var o=de(this,r),a=(this.style.removeProperty(r),de(this,r));return o===a?null:o===e&&a===i?n:n=t(e=o,i=a)}}function mh(r){return function(){this.style.removeProperty(r)}}function Px(r,t,e){var i,n=e+"",o;return function(){var a=de(this,r);return a===n?null:a===i?o:o=t(i=a,e)}}function Dx(r,t,e){var i,n,o;return function(){var a=de(this,r),s=e(this),l=s+"";return s==null&&(l=s=(this.style.removeProperty(r),de(this,r))),a===l?null:a===i&&l===n?o:(n=l,o=t(i=a,s))}}function Ix(r,t){var e,i,n,o="style."+t,a="end."+o,s;return function(){var l=cr(this,r),h=l.on,c=l.value[o]==null?s||(s=mh(t)):void 0;(h!==e||n!==c)&&(i=(e=h).copy()).on(a,n=c),l.on=i}}function Rx(r,t,e){var i=(r+="")=="transform"?WC:fh;return t==null?this.styleTween(r,Ex(r,i)).on("end.style."+r,mh(r)):typeof t=="function"?this.styleTween(r,Dx(r,i,xs(this,"style."+r,t))).each(Ix(this._id,r)):this.styleTween(r,Px(r,i,t),e).on("end.style."+r,null)}function Ox(r,t,e){return function(i){this.style.setProperty(r,t.call(this,i),e)}}function $x(r,t,e){var i,n;function o(){var a=t.apply(this,arguments);return a!==n&&(i=(n=a)&&Ox(r,a,e)),i}return o._value=t,o}function Wx(r,t,e){var i="style."+(r+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;return this.tween(i,$x(r,t,e??""))}function zx(r){return function(){this.textContent=r}}function Nx(r){return function(){var t=r(this);this.textContent=t??""}}function qx(r){return this.tween("text",typeof r=="function"?Nx(xs(this,"text",r)):zx(r==null?"":r+""))}function jx(r){return function(t){this.textContent=r.call(this,t)}}function Hx(r){var t,e;function i(){var n=r.apply(this,arguments);return n!==e&&(t=(e=n)&&jx(n)),t}return i._value=r,i}function Ux(r){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(r==null)return this.tween(t,null);if(typeof r!="function")throw new Error;return this.tween(t,Hx(r))}function Gx(){for(var r=this._name,t=this._id,e=yh(),i=this._groups,n=i.length,o=0;o<n;++o)for(var a=i[o],s=a.length,l,h=0;h<s;++h)if(l=a[h]){var c=rr(l,t);En(l,r,e,h,a,{time:c.time+c.delay+c.duration,delay:0,duration:c.duration,ease:c.ease})}return new yr(i,this._parents,r,e)}function Vx(){var r,t,e=this,i=e._id,n=e.size();return new Promise(function(o,a){var s={value:a},l={value:function(){--n===0&&o()}};e.each(function(){var h=cr(this,i),c=h.on;c!==r&&(t=(r=c).copy(),t._.cancel.push(s),t._.interrupt.push(s),t._.end.push(l)),h.on=t}),n===0&&o()})}var Yx=0;function yr(r,t,e,i){this._groups=r,this._parents=t,this._name=e,this._id=i}function yh(){return++Yx}var ur=yi.prototype;yr.prototype={constructor:yr,select:Lx,selectAll:Fx,selectChild:ur.selectChild,selectChildren:ur.selectChildren,filter:kx,merge:wx,selection:Ax,transition:Gx,call:ur.call,nodes:ur.nodes,node:ur.node,size:ur.size,empty:ur.empty,each:ur.each,on:Sx,attr:ox,attrTween:cx,style:Rx,styleTween:Wx,text:qx,textTween:Ux,remove:Bx,tween:QC,delay:px,duration:mx,ease:Cx,easeVarying:bx,end:Vx,[Symbol.iterator]:ur[Symbol.iterator]};function Xx(r){return((r*=2)<=1?r*r*r:(r-=2)*r*r+2)/2}var Kx={time:null,delay:0,duration:250,ease:Xx};function Zx(r,t){for(var e;!(e=r.__transition)||!(e=e[t]);)if(!(r=r.parentNode))throw new Error(`transition ${t} not found`);return e}function Qx(r){var t,e;r instanceof yr?(t=r._id,r=r._name):(t=yh(),(e=Kx).time=ys(),r=r==null?null:r+"");for(var i=this._groups,n=i.length,o=0;o<n;++o)for(var a=i[o],s=a.length,l,h=0;h<s;++h)(l=a[h])&&En(l,r,t,h,a,e||Zx(l,t));return new yr(i,this._parents,r,t)}yi.prototype.interrupt=XC;yi.prototype.transition=Qx;const To=Math.PI,vo=2*To,$r=1e-6,Jx=vo-$r;function Ch(r){this._+=r[0];for(let t=1,e=r.length;t<e;++t)this._+=arguments[t]+r[t]}function tb(r){let t=Math.floor(r);if(!(t>=0))throw new Error(`invalid digits: ${r}`);if(t>15)return Ch;const e=10**t;return function(i){this._+=i[0];for(let n=1,o=i.length;n<o;++n)this._+=Math.round(arguments[n]*e)/e+i[n]}}class rb{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?Ch:tb(t)}moveTo(t,e){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,e){this._append`L${this._x1=+t},${this._y1=+e}`}quadraticCurveTo(t,e,i,n){this._append`Q${+t},${+e},${this._x1=+i},${this._y1=+n}`}bezierCurveTo(t,e,i,n,o,a){this._append`C${+t},${+e},${+i},${+n},${this._x1=+o},${this._y1=+a}`}arcTo(t,e,i,n,o){if(t=+t,e=+e,i=+i,n=+n,o=+o,o<0)throw new Error(`negative radius: ${o}`);let a=this._x1,s=this._y1,l=i-t,h=n-e,c=a-t,d=s-e,p=c*c+d*d;if(this._x1===null)this._append`M${this._x1=t},${this._y1=e}`;else if(p>$r)if(!(Math.abs(d*l-h*c)>$r)||!o)this._append`L${this._x1=t},${this._y1=e}`;else{let u=i-a,m=n-s,f=l*l+h*h,y=u*u+m*m,C=Math.sqrt(f),b=Math.sqrt(p),k=o*Math.tan((To-Math.acos((f+p-y)/(2*C*b)))/2),T=k/b,v=k/C;Math.abs(T-1)>$r&&this._append`L${t+T*c},${e+T*d}`,this._append`A${o},${o},0,0,${+(d*u>c*m)},${this._x1=t+v*l},${this._y1=e+v*h}`}}arc(t,e,i,n,o,a){if(t=+t,e=+e,i=+i,a=!!a,i<0)throw new Error(`negative radius: ${i}`);let s=i*Math.cos(n),l=i*Math.sin(n),h=t+s,c=e+l,d=1^a,p=a?n-o:o-n;this._x1===null?this._append`M${h},${c}`:(Math.abs(this._x1-h)>$r||Math.abs(this._y1-c)>$r)&&this._append`L${h},${c}`,i&&(p<0&&(p=p%vo+vo),p>Jx?this._append`A${i},${i},0,1,${d},${t-s},${e-l}A${i},${i},0,1,${d},${this._x1=h},${this._y1=c}`:p>$r&&this._append`A${i},${i},0,${+(p>=To)},${d},${this._x1=t+i*Math.cos(o)},${this._y1=e+i*Math.sin(o)}`)}rect(t,e,i,n){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+e}h${i=+i}v${+n}h${-i}Z`}toString(){return this._}}function Jr(r){return function(){return r}}const w_=Math.abs,T_=Math.atan2,v_=Math.cos,S_=Math.max,__=Math.min,B_=Math.sin,L_=Math.sqrt,La=1e-12,bs=Math.PI,Fa=bs/2,F_=2*bs;function M_(r){return r>1?0:r<-1?bs:Math.acos(r)}function A_(r){return r>=1?Fa:r<=-1?-Fa:Math.asin(r)}function eb(r){let t=3;return r.digits=function(e){if(!arguments.length)return t;if(e==null)t=null;else{const i=Math.floor(e);if(!(i>=0))throw new RangeError(`invalid digits: ${e}`);t=i}return r},()=>new rb(t)}function ib(r){return typeof r=="object"&&"length"in r?r:Array.from(r)}function xh(r){this._context=r}xh.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(r,t){switch(r=+r,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(r,t):this._context.moveTo(r,t);break;case 1:this._point=2;default:this._context.lineTo(r,t);break}}};function ze(r){return new xh(r)}function nb(r){return r[0]}function ob(r){return r[1]}function sb(r,t){var e=Jr(!0),i=null,n=ze,o=null,a=eb(s);r=typeof r=="function"?r:r===void 0?nb:Jr(r),t=typeof t=="function"?t:t===void 0?ob:Jr(t);function s(l){var h,c=(l=ib(l)).length,d,p=!1,u;for(i==null&&(o=n(u=a())),h=0;h<=c;++h)!(h<c&&e(d=l[h],h,l))===p&&((p=!p)?o.lineStart():o.lineEnd()),p&&o.point(+r(d,h,l),+t(d,h,l));if(u)return o=null,u+""||null}return s.x=function(l){return arguments.length?(r=typeof l=="function"?l:Jr(+l),s):r},s.y=function(l){return arguments.length?(t=typeof l=="function"?l:Jr(+l),s):t},s.defined=function(l){return arguments.length?(e=typeof l=="function"?l:Jr(!!l),s):e},s.curve=function(l){return arguments.length?(n=l,i!=null&&(o=n(i)),s):n},s.context=function(l){return arguments.length?(l==null?i=o=null:o=n(i=l),s):i},s}class bh{constructor(t,e){this._context=t,this._x=e}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(t,e){switch(t=+t,e=+e,this._point){case 0:{this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+t)/2,this._y0,this._x0,e,t,e):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+e)/2,t,this._y0,t,e);break}}this._x0=t,this._y0=e}}function kh(r){return new bh(r,!0)}function wh(r){return new bh(r,!1)}function Fr(){}function ln(r,t,e){r._context.bezierCurveTo((2*r._x0+r._x1)/3,(2*r._y0+r._y1)/3,(r._x0+2*r._x1)/3,(r._y0+2*r._y1)/3,(r._x0+4*r._x1+t)/6,(r._y0+4*r._y1+e)/6)}function Pn(r){this._context=r}Pn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:ln(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(r,t){switch(r=+r,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(r,t):this._context.moveTo(r,t);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:ln(this,r,t);break}this._x0=this._x1,this._x1=r,this._y0=this._y1,this._y1=t}};function So(r){return new Pn(r)}function Th(r){this._context=r}Th.prototype={areaStart:Fr,areaEnd:Fr,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:{this._context.moveTo(this._x2,this._y2),this._context.closePath();break}case 2:{this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break}case 3:{this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4);break}}},point:function(r,t){switch(r=+r,t=+t,this._point){case 0:this._point=1,this._x2=r,this._y2=t;break;case 1:this._point=2,this._x3=r,this._y3=t;break;case 2:this._point=3,this._x4=r,this._y4=t,this._context.moveTo((this._x0+4*this._x1+r)/6,(this._y0+4*this._y1+t)/6);break;default:ln(this,r,t);break}this._x0=this._x1,this._x1=r,this._y0=this._y1,this._y1=t}};function ab(r){return new Th(r)}function vh(r){this._context=r}vh.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===3)&&this._context.closePath(),this._line=1-this._line},point:function(r,t){switch(r=+r,t=+t,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var e=(this._x0+4*this._x1+r)/6,i=(this._y0+4*this._y1+t)/6;this._line?this._context.lineTo(e,i):this._context.moveTo(e,i);break;case 3:this._point=4;default:ln(this,r,t);break}this._x0=this._x1,this._x1=r,this._y0=this._y1,this._y1=t}};function lb(r){return new vh(r)}function Sh(r,t){this._basis=new Pn(r),this._beta=t}Sh.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var r=this._x,t=this._y,e=r.length-1;if(e>0)for(var i=r[0],n=t[0],o=r[e]-i,a=t[e]-n,s=-1,l;++s<=e;)l=s/e,this._basis.point(this._beta*r[s]+(1-this._beta)*(i+l*o),this._beta*t[s]+(1-this._beta)*(n+l*a));this._x=this._y=null,this._basis.lineEnd()},point:function(r,t){this._x.push(+r),this._y.push(+t)}};const hb=function r(t){function e(i){return t===1?new Pn(i):new Sh(i,t)}return e.beta=function(i){return r(+i)},e}(.85);function hn(r,t,e){r._context.bezierCurveTo(r._x1+r._k*(r._x2-r._x0),r._y1+r._k*(r._y2-r._y0),r._x2+r._k*(r._x1-t),r._y2+r._k*(r._y1-e),r._x2,r._y2)}function ks(r,t){this._context=r,this._k=(1-t)/6}ks.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:hn(this,this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(r,t){switch(r=+r,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(r,t):this._context.moveTo(r,t);break;case 1:this._point=2,this._x1=r,this._y1=t;break;case 2:this._point=3;default:hn(this,r,t);break}this._x0=this._x1,this._x1=this._x2,this._x2=r,this._y0=this._y1,this._y1=this._y2,this._y2=t}};const _h=function r(t){function e(i){return new ks(i,t)}return e.tension=function(i){return r(+i)},e}(0);function ws(r,t){this._context=r,this._k=(1-t)/6}ws.prototype={areaStart:Fr,areaEnd:Fr,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:{this._context.moveTo(this._x3,this._y3),this._context.closePath();break}case 2:{this._context.lineTo(this._x3,this._y3),this._context.closePath();break}case 3:{this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5);break}}},point:function(r,t){switch(r=+r,t=+t,this._point){case 0:this._point=1,this._x3=r,this._y3=t;break;case 1:this._point=2,this._context.moveTo(this._x4=r,this._y4=t);break;case 2:this._point=3,this._x5=r,this._y5=t;break;default:hn(this,r,t);break}this._x0=this._x1,this._x1=this._x2,this._x2=r,this._y0=this._y1,this._y1=this._y2,this._y2=t}};const cb=function r(t){function e(i){return new ws(i,t)}return e.tension=function(i){return r(+i)},e}(0);function Ts(r,t){this._context=r,this._k=(1-t)/6}Ts.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===3)&&this._context.closePath(),this._line=1-this._line},point:function(r,t){switch(r=+r,t=+t,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:hn(this,r,t);break}this._x0=this._x1,this._x1=this._x2,this._x2=r,this._y0=this._y1,this._y1=this._y2,this._y2=t}};const db=function r(t){function e(i){return new Ts(i,t)}return e.tension=function(i){return r(+i)},e}(0);function vs(r,t,e){var i=r._x1,n=r._y1,o=r._x2,a=r._y2;if(r._l01_a>La){var s=2*r._l01_2a+3*r._l01_a*r._l12_a+r._l12_2a,l=3*r._l01_a*(r._l01_a+r._l12_a);i=(i*s-r._x0*r._l12_2a+r._x2*r._l01_2a)/l,n=(n*s-r._y0*r._l12_2a+r._y2*r._l01_2a)/l}if(r._l23_a>La){var h=2*r._l23_2a+3*r._l23_a*r._l12_a+r._l12_2a,c=3*r._l23_a*(r._l23_a+r._l12_a);o=(o*h+r._x1*r._l23_2a-t*r._l12_2a)/c,a=(a*h+r._y1*r._l23_2a-e*r._l12_2a)/c}r._context.bezierCurveTo(i,n,o,a,r._x2,r._y2)}function Bh(r,t){this._context=r,this._alpha=t}Bh.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(r,t){if(r=+r,t=+t,this._point){var e=this._x2-r,i=this._y2-t;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+i*i,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(r,t):this._context.moveTo(r,t);break;case 1:this._point=2;break;case 2:this._point=3;default:vs(this,r,t);break}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=r,this._y0=this._y1,this._y1=this._y2,this._y2=t}};const Lh=function r(t){function e(i){return t?new Bh(i,t):new ks(i,0)}return e.alpha=function(i){return r(+i)},e}(.5);function Fh(r,t){this._context=r,this._alpha=t}Fh.prototype={areaStart:Fr,areaEnd:Fr,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:{this._context.moveTo(this._x3,this._y3),this._context.closePath();break}case 2:{this._context.lineTo(this._x3,this._y3),this._context.closePath();break}case 3:{this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5);break}}},point:function(r,t){if(r=+r,t=+t,this._point){var e=this._x2-r,i=this._y2-t;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+i*i,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=r,this._y3=t;break;case 1:this._point=2,this._context.moveTo(this._x4=r,this._y4=t);break;case 2:this._point=3,this._x5=r,this._y5=t;break;default:vs(this,r,t);break}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=r,this._y0=this._y1,this._y1=this._y2,this._y2=t}};const ub=function r(t){function e(i){return t?new Fh(i,t):new ws(i,0)}return e.alpha=function(i){return r(+i)},e}(.5);function Mh(r,t){this._context=r,this._alpha=t}Mh.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===3)&&this._context.closePath(),this._line=1-this._line},point:function(r,t){if(r=+r,t=+t,this._point){var e=this._x2-r,i=this._y2-t;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(e*e+i*i,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:vs(this,r,t);break}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=r,this._y0=this._y1,this._y1=this._y2,this._y2=t}};const pb=function r(t){function e(i){return t?new Mh(i,t):new Ts(i,0)}return e.alpha=function(i){return r(+i)},e}(.5);function Ah(r){this._context=r}Ah.prototype={areaStart:Fr,areaEnd:Fr,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(r,t){r=+r,t=+t,this._point?this._context.lineTo(r,t):(this._point=1,this._context.moveTo(r,t))}};function gb(r){return new Ah(r)}function Ma(r){return r<0?-1:1}function Aa(r,t,e){var i=r._x1-r._x0,n=t-r._x1,o=(r._y1-r._y0)/(i||n<0&&-0),a=(e-r._y1)/(n||i<0&&-0),s=(o*n+a*i)/(i+n);return(Ma(o)+Ma(a))*Math.min(Math.abs(o),Math.abs(a),.5*Math.abs(s))||0}function Ea(r,t){var e=r._x1-r._x0;return e?(3*(r._y1-r._y0)/e-t)/2:t}function Qn(r,t,e){var i=r._x0,n=r._y0,o=r._x1,a=r._y1,s=(o-i)/3;r._context.bezierCurveTo(i+s,n+s*t,o-s,a-s*e,o,a)}function cn(r){this._context=r}cn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:Qn(this,this._t0,Ea(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(r,t){var e=NaN;if(r=+r,t=+t,!(r===this._x1&&t===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(r,t):this._context.moveTo(r,t);break;case 1:this._point=2;break;case 2:this._point=3,Qn(this,Ea(this,e=Aa(this,r,t)),e);break;default:Qn(this,this._t0,e=Aa(this,r,t));break}this._x0=this._x1,this._x1=r,this._y0=this._y1,this._y1=t,this._t0=e}}};function Eh(r){this._context=new Ph(r)}(Eh.prototype=Object.create(cn.prototype)).point=function(r,t){cn.prototype.point.call(this,t,r)};function Ph(r){this._context=r}Ph.prototype={moveTo:function(r,t){this._context.moveTo(t,r)},closePath:function(){this._context.closePath()},lineTo:function(r,t){this._context.lineTo(t,r)},bezierCurveTo:function(r,t,e,i,n,o){this._context.bezierCurveTo(t,r,i,e,o,n)}};function Dh(r){return new cn(r)}function Ih(r){return new Eh(r)}function Rh(r){this._context=r}Rh.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var r=this._x,t=this._y,e=r.length;if(e)if(this._line?this._context.lineTo(r[0],t[0]):this._context.moveTo(r[0],t[0]),e===2)this._context.lineTo(r[1],t[1]);else for(var i=Pa(r),n=Pa(t),o=0,a=1;a<e;++o,++a)this._context.bezierCurveTo(i[0][o],n[0][o],i[1][o],n[1][o],r[a],t[a]);(this._line||this._line!==0&&e===1)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(r,t){this._x.push(+r),this._y.push(+t)}};function Pa(r){var t,e=r.length-1,i,n=new Array(e),o=new Array(e),a=new Array(e);for(n[0]=0,o[0]=2,a[0]=r[0]+2*r[1],t=1;t<e-1;++t)n[t]=1,o[t]=4,a[t]=4*r[t]+2*r[t+1];for(n[e-1]=2,o[e-1]=7,a[e-1]=8*r[e-1]+r[e],t=1;t<e;++t)i=n[t]/o[t-1],o[t]-=i,a[t]-=i*a[t-1];for(n[e-1]=a[e-1]/o[e-1],t=e-2;t>=0;--t)n[t]=(a[t]-n[t+1])/o[t];for(o[e-1]=(r[e]+n[e-1])/2,t=0;t<e-1;++t)o[t]=2*r[t+1]-n[t+1];return[n,o]}function Oh(r){return new Rh(r)}function Dn(r,t){this._context=r,this._t=t}Dn.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&this._point===2&&this._context.lineTo(this._x,this._y),(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(r,t){switch(r=+r,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(r,t):this._context.moveTo(r,t);break;case 1:this._point=2;default:{if(this._t<=0)this._context.lineTo(this._x,t),this._context.lineTo(r,t);else{var e=this._x*(1-this._t)+r*this._t;this._context.lineTo(e,this._y),this._context.lineTo(e,t)}break}}this._x=r,this._y=t}};function $h(r){return new Dn(r,.5)}function Wh(r){return new Dn(r,0)}function zh(r){return new Dn(r,1)}function Ee(r,t,e){this.k=r,this.x=t,this.y=e}Ee.prototype={constructor:Ee,scale:function(r){return r===1?this:new Ee(this.k*r,this.x,this.y)},translate:function(r,t){return r===0&t===0?this:new Ee(this.k,this.x+this.k*r,this.y+this.k*t)},apply:function(r){return[r[0]*this.k+this.x,r[1]*this.k+this.y]},applyX:function(r){return r*this.k+this.x},applyY:function(r){return r*this.k+this.y},invert:function(r){return[(r[0]-this.x)/this.k,(r[1]-this.y)/this.k]},invertX:function(r){return(r-this.x)/this.k},invertY:function(r){return(r-this.y)/this.k},rescaleX:function(r){return r.copy().domain(r.range().map(this.invertX,this).map(r.invert,r))},rescaleY:function(r){return r.copy().domain(r.range().map(this.invertY,this).map(r.invert,r))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};Ee.prototype;var fb=g(r=>{var n;const{securityLevel:t}=ot();let e=tt("body");if(t==="sandbox"){const a=((n=tt(`#i${r}`).node())==null?void 0:n.contentDocument)??document;e=tt(a.body)}return e.select(`#${r}`)},"selectSvgElement");function Ss(r){return typeof r>"u"||r===null}g(Ss,"isNothing");function Nh(r){return typeof r=="object"&&r!==null}g(Nh,"isObject");function qh(r){return Array.isArray(r)?r:Ss(r)?[]:[r]}g(qh,"toArray");function jh(r,t){var e,i,n,o;if(t)for(o=Object.keys(t),e=0,i=o.length;e<i;e+=1)n=o[e],r[n]=t[n];return r}g(jh,"extend");function Hh(r,t){var e="",i;for(i=0;i<t;i+=1)e+=r;return e}g(Hh,"repeat");function Uh(r){return r===0&&Number.NEGATIVE_INFINITY===1/r}g(Uh,"isNegativeZero");var mb=Ss,yb=Nh,Cb=qh,xb=Hh,bb=Uh,kb=jh,mt={isNothing:mb,isObject:yb,toArray:Cb,repeat:xb,isNegativeZero:bb,extend:kb};function _s(r,t){var e="",i=r.reason||"(unknown reason)";return r.mark?(r.mark.name&&(e+='in "'+r.mark.name+'" '),e+="("+(r.mark.line+1)+":"+(r.mark.column+1)+")",!t&&r.mark.snippet&&(e+=`

`+r.mark.snippet),i+" "+e):i}g(_s,"formatError");function pe(r,t){Error.call(this),this.name="YAMLException",this.reason=r,this.mark=t,this.message=_s(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}g(pe,"YAMLException$1");pe.prototype=Object.create(Error.prototype);pe.prototype.constructor=pe;pe.prototype.toString=g(function(t){return this.name+": "+_s(this,t)},"toString");var Rt=pe;function Hi(r,t,e,i,n){var o="",a="",s=Math.floor(n/2)-1;return i-t>s&&(o=" ... ",t=i-s+o.length),e-i>s&&(a=" ...",e=i+s-a.length),{str:o+r.slice(t,e).replace(/\t/g,"→")+a,pos:i-t+o.length}}g(Hi,"getLine");function Ui(r,t){return mt.repeat(" ",t-r.length)+r}g(Ui,"padStart");function Gh(r,t){if(t=Object.create(t||null),!r.buffer)return null;t.maxLength||(t.maxLength=79),typeof t.indent!="number"&&(t.indent=1),typeof t.linesBefore!="number"&&(t.linesBefore=3),typeof t.linesAfter!="number"&&(t.linesAfter=2);for(var e=/\r?\n|\r|\0/g,i=[0],n=[],o,a=-1;o=e.exec(r.buffer);)n.push(o.index),i.push(o.index+o[0].length),r.position<=o.index&&a<0&&(a=i.length-2);a<0&&(a=i.length-1);var s="",l,h,c=Math.min(r.line+t.linesAfter,n.length).toString().length,d=t.maxLength-(t.indent+c+3);for(l=1;l<=t.linesBefore&&!(a-l<0);l++)h=Hi(r.buffer,i[a-l],n[a-l],r.position-(i[a]-i[a-l]),d),s=mt.repeat(" ",t.indent)+Ui((r.line-l+1).toString(),c)+" | "+h.str+`
`+s;for(h=Hi(r.buffer,i[a],n[a],r.position,d),s+=mt.repeat(" ",t.indent)+Ui((r.line+1).toString(),c)+" | "+h.str+`
`,s+=mt.repeat("-",t.indent+c+3+h.pos)+`^
`,l=1;l<=t.linesAfter&&!(a+l>=n.length);l++)h=Hi(r.buffer,i[a+l],n[a+l],r.position-(i[a]-i[a+l]),d),s+=mt.repeat(" ",t.indent)+Ui((r.line+l+1).toString(),c)+" | "+h.str+`
`;return s.replace(/\n$/,"")}g(Gh,"makeSnippet");var wb=Gh,Tb=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],vb=["scalar","sequence","mapping"];function Vh(r){var t={};return r!==null&&Object.keys(r).forEach(function(e){r[e].forEach(function(i){t[String(i)]=e})}),t}g(Vh,"compileStyleAliases");function Yh(r,t){if(t=t||{},Object.keys(t).forEach(function(e){if(Tb.indexOf(e)===-1)throw new Rt('Unknown option "'+e+'" is met in definition of "'+r+'" YAML type.')}),this.options=t,this.tag=r,this.kind=t.kind||null,this.resolve=t.resolve||function(){return!0},this.construct=t.construct||function(e){return e},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.representName=t.representName||null,this.defaultStyle=t.defaultStyle||null,this.multi=t.multi||!1,this.styleAliases=Vh(t.styleAliases||null),vb.indexOf(this.kind)===-1)throw new Rt('Unknown kind "'+this.kind+'" is specified for "'+r+'" YAML type.')}g(Yh,"Type$1");var Lt=Yh;function _o(r,t){var e=[];return r[t].forEach(function(i){var n=e.length;e.forEach(function(o,a){o.tag===i.tag&&o.kind===i.kind&&o.multi===i.multi&&(n=a)}),e[n]=i}),e}g(_o,"compileList");function Xh(){var r={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},t,e;function i(n){n.multi?(r.multi[n.kind].push(n),r.multi.fallback.push(n)):r[n.kind][n.tag]=r.fallback[n.tag]=n}for(g(i,"collectType"),t=0,e=arguments.length;t<e;t+=1)arguments[t].forEach(i);return r}g(Xh,"compileMap");function dn(r){return this.extend(r)}g(dn,"Schema$1");dn.prototype.extend=g(function(t){var e=[],i=[];if(t instanceof Lt)i.push(t);else if(Array.isArray(t))i=i.concat(t);else if(t&&(Array.isArray(t.implicit)||Array.isArray(t.explicit)))t.implicit&&(e=e.concat(t.implicit)),t.explicit&&(i=i.concat(t.explicit));else throw new Rt("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");e.forEach(function(o){if(!(o instanceof Lt))throw new Rt("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(o.loadKind&&o.loadKind!=="scalar")throw new Rt("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(o.multi)throw new Rt("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),i.forEach(function(o){if(!(o instanceof Lt))throw new Rt("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var n=Object.create(dn.prototype);return n.implicit=(this.implicit||[]).concat(e),n.explicit=(this.explicit||[]).concat(i),n.compiledImplicit=_o(n,"implicit"),n.compiledExplicit=_o(n,"explicit"),n.compiledTypeMap=Xh(n.compiledImplicit,n.compiledExplicit),n},"extend");var Sb=dn,_b=new Lt("tag:yaml.org,2002:str",{kind:"scalar",construct:g(function(r){return r!==null?r:""},"construct")}),Bb=new Lt("tag:yaml.org,2002:seq",{kind:"sequence",construct:g(function(r){return r!==null?r:[]},"construct")}),Lb=new Lt("tag:yaml.org,2002:map",{kind:"mapping",construct:g(function(r){return r!==null?r:{}},"construct")}),Fb=new Sb({explicit:[_b,Bb,Lb]});function Kh(r){if(r===null)return!0;var t=r.length;return t===1&&r==="~"||t===4&&(r==="null"||r==="Null"||r==="NULL")}g(Kh,"resolveYamlNull");function Zh(){return null}g(Zh,"constructYamlNull");function Qh(r){return r===null}g(Qh,"isNull");var Mb=new Lt("tag:yaml.org,2002:null",{kind:"scalar",resolve:Kh,construct:Zh,predicate:Qh,represent:{canonical:g(function(){return"~"},"canonical"),lowercase:g(function(){return"null"},"lowercase"),uppercase:g(function(){return"NULL"},"uppercase"),camelcase:g(function(){return"Null"},"camelcase"),empty:g(function(){return""},"empty")},defaultStyle:"lowercase"});function Jh(r){if(r===null)return!1;var t=r.length;return t===4&&(r==="true"||r==="True"||r==="TRUE")||t===5&&(r==="false"||r==="False"||r==="FALSE")}g(Jh,"resolveYamlBoolean");function tc(r){return r==="true"||r==="True"||r==="TRUE"}g(tc,"constructYamlBoolean");function rc(r){return Object.prototype.toString.call(r)==="[object Boolean]"}g(rc,"isBoolean");var Ab=new Lt("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Jh,construct:tc,predicate:rc,represent:{lowercase:g(function(r){return r?"true":"false"},"lowercase"),uppercase:g(function(r){return r?"TRUE":"FALSE"},"uppercase"),camelcase:g(function(r){return r?"True":"False"},"camelcase")},defaultStyle:"lowercase"});function ec(r){return 48<=r&&r<=57||65<=r&&r<=70||97<=r&&r<=102}g(ec,"isHexCode");function ic(r){return 48<=r&&r<=55}g(ic,"isOctCode");function nc(r){return 48<=r&&r<=57}g(nc,"isDecCode");function oc(r){if(r===null)return!1;var t=r.length,e=0,i=!1,n;if(!t)return!1;if(n=r[e],(n==="-"||n==="+")&&(n=r[++e]),n==="0"){if(e+1===t)return!0;if(n=r[++e],n==="b"){for(e++;e<t;e++)if(n=r[e],n!=="_"){if(n!=="0"&&n!=="1")return!1;i=!0}return i&&n!=="_"}if(n==="x"){for(e++;e<t;e++)if(n=r[e],n!=="_"){if(!ec(r.charCodeAt(e)))return!1;i=!0}return i&&n!=="_"}if(n==="o"){for(e++;e<t;e++)if(n=r[e],n!=="_"){if(!ic(r.charCodeAt(e)))return!1;i=!0}return i&&n!=="_"}}if(n==="_")return!1;for(;e<t;e++)if(n=r[e],n!=="_"){if(!nc(r.charCodeAt(e)))return!1;i=!0}return!(!i||n==="_")}g(oc,"resolveYamlInteger");function sc(r){var t=r,e=1,i;if(t.indexOf("_")!==-1&&(t=t.replace(/_/g,"")),i=t[0],(i==="-"||i==="+")&&(i==="-"&&(e=-1),t=t.slice(1),i=t[0]),t==="0")return 0;if(i==="0"){if(t[1]==="b")return e*parseInt(t.slice(2),2);if(t[1]==="x")return e*parseInt(t.slice(2),16);if(t[1]==="o")return e*parseInt(t.slice(2),8)}return e*parseInt(t,10)}g(sc,"constructYamlInteger");function ac(r){return Object.prototype.toString.call(r)==="[object Number]"&&r%1===0&&!mt.isNegativeZero(r)}g(ac,"isInteger");var Eb=new Lt("tag:yaml.org,2002:int",{kind:"scalar",resolve:oc,construct:sc,predicate:ac,represent:{binary:g(function(r){return r>=0?"0b"+r.toString(2):"-0b"+r.toString(2).slice(1)},"binary"),octal:g(function(r){return r>=0?"0o"+r.toString(8):"-0o"+r.toString(8).slice(1)},"octal"),decimal:g(function(r){return r.toString(10)},"decimal"),hexadecimal:g(function(r){return r>=0?"0x"+r.toString(16).toUpperCase():"-0x"+r.toString(16).toUpperCase().slice(1)},"hexadecimal")},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),Pb=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function lc(r){return!(r===null||!Pb.test(r)||r[r.length-1]==="_")}g(lc,"resolveYamlFloat");function hc(r){var t,e;return t=r.replace(/_/g,"").toLowerCase(),e=t[0]==="-"?-1:1,"+-".indexOf(t[0])>=0&&(t=t.slice(1)),t===".inf"?e===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:t===".nan"?NaN:e*parseFloat(t,10)}g(hc,"constructYamlFloat");var Db=/^[-+]?[0-9]+e/;function cc(r,t){var e;if(isNaN(r))switch(t){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===r)switch(t){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===r)switch(t){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(mt.isNegativeZero(r))return"-0.0";return e=r.toString(10),Db.test(e)?e.replace("e",".e"):e}g(cc,"representYamlFloat");function dc(r){return Object.prototype.toString.call(r)==="[object Number]"&&(r%1!==0||mt.isNegativeZero(r))}g(dc,"isFloat");var Ib=new Lt("tag:yaml.org,2002:float",{kind:"scalar",resolve:lc,construct:hc,predicate:dc,represent:cc,defaultStyle:"lowercase"}),uc=Fb.extend({implicit:[Mb,Ab,Eb,Ib]}),Rb=uc,pc=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),gc=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function fc(r){return r===null?!1:pc.exec(r)!==null||gc.exec(r)!==null}g(fc,"resolveYamlTimestamp");function mc(r){var t,e,i,n,o,a,s,l=0,h=null,c,d,p;if(t=pc.exec(r),t===null&&(t=gc.exec(r)),t===null)throw new Error("Date resolve error");if(e=+t[1],i=+t[2]-1,n=+t[3],!t[4])return new Date(Date.UTC(e,i,n));if(o=+t[4],a=+t[5],s=+t[6],t[7]){for(l=t[7].slice(0,3);l.length<3;)l+="0";l=+l}return t[9]&&(c=+t[10],d=+(t[11]||0),h=(c*60+d)*6e4,t[9]==="-"&&(h=-h)),p=new Date(Date.UTC(e,i,n,o,a,s,l)),h&&p.setTime(p.getTime()-h),p}g(mc,"constructYamlTimestamp");function yc(r){return r.toISOString()}g(yc,"representYamlTimestamp");var Ob=new Lt("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:fc,construct:mc,instanceOf:Date,represent:yc});function Cc(r){return r==="<<"||r===null}g(Cc,"resolveYamlMerge");var $b=new Lt("tag:yaml.org,2002:merge",{kind:"scalar",resolve:Cc}),Bs=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function xc(r){if(r===null)return!1;var t,e,i=0,n=r.length,o=Bs;for(e=0;e<n;e++)if(t=o.indexOf(r.charAt(e)),!(t>64)){if(t<0)return!1;i+=6}return i%8===0}g(xc,"resolveYamlBinary");function bc(r){var t,e,i=r.replace(/[\r\n=]/g,""),n=i.length,o=Bs,a=0,s=[];for(t=0;t<n;t++)t%4===0&&t&&(s.push(a>>16&255),s.push(a>>8&255),s.push(a&255)),a=a<<6|o.indexOf(i.charAt(t));return e=n%4*6,e===0?(s.push(a>>16&255),s.push(a>>8&255),s.push(a&255)):e===18?(s.push(a>>10&255),s.push(a>>2&255)):e===12&&s.push(a>>4&255),new Uint8Array(s)}g(bc,"constructYamlBinary");function kc(r){var t="",e=0,i,n,o=r.length,a=Bs;for(i=0;i<o;i++)i%3===0&&i&&(t+=a[e>>18&63],t+=a[e>>12&63],t+=a[e>>6&63],t+=a[e&63]),e=(e<<8)+r[i];return n=o%3,n===0?(t+=a[e>>18&63],t+=a[e>>12&63],t+=a[e>>6&63],t+=a[e&63]):n===2?(t+=a[e>>10&63],t+=a[e>>4&63],t+=a[e<<2&63],t+=a[64]):n===1&&(t+=a[e>>2&63],t+=a[e<<4&63],t+=a[64],t+=a[64]),t}g(kc,"representYamlBinary");function wc(r){return Object.prototype.toString.call(r)==="[object Uint8Array]"}g(wc,"isBinary");var Wb=new Lt("tag:yaml.org,2002:binary",{kind:"scalar",resolve:xc,construct:bc,predicate:wc,represent:kc}),zb=Object.prototype.hasOwnProperty,Nb=Object.prototype.toString;function Tc(r){if(r===null)return!0;var t=[],e,i,n,o,a,s=r;for(e=0,i=s.length;e<i;e+=1){if(n=s[e],a=!1,Nb.call(n)!=="[object Object]")return!1;for(o in n)if(zb.call(n,o))if(!a)a=!0;else return!1;if(!a)return!1;if(t.indexOf(o)===-1)t.push(o);else return!1}return!0}g(Tc,"resolveYamlOmap");function vc(r){return r!==null?r:[]}g(vc,"constructYamlOmap");var qb=new Lt("tag:yaml.org,2002:omap",{kind:"sequence",resolve:Tc,construct:vc}),jb=Object.prototype.toString;function Sc(r){if(r===null)return!0;var t,e,i,n,o,a=r;for(o=new Array(a.length),t=0,e=a.length;t<e;t+=1){if(i=a[t],jb.call(i)!=="[object Object]"||(n=Object.keys(i),n.length!==1))return!1;o[t]=[n[0],i[n[0]]]}return!0}g(Sc,"resolveYamlPairs");function _c(r){if(r===null)return[];var t,e,i,n,o,a=r;for(o=new Array(a.length),t=0,e=a.length;t<e;t+=1)i=a[t],n=Object.keys(i),o[t]=[n[0],i[n[0]]];return o}g(_c,"constructYamlPairs");var Hb=new Lt("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:Sc,construct:_c}),Ub=Object.prototype.hasOwnProperty;function Bc(r){if(r===null)return!0;var t,e=r;for(t in e)if(Ub.call(e,t)&&e[t]!==null)return!1;return!0}g(Bc,"resolveYamlSet");function Lc(r){return r!==null?r:{}}g(Lc,"constructYamlSet");var Gb=new Lt("tag:yaml.org,2002:set",{kind:"mapping",resolve:Bc,construct:Lc}),Fc=Rb.extend({implicit:[Ob,$b],explicit:[Wb,qb,Hb,Gb]}),Mr=Object.prototype.hasOwnProperty,un=1,Mc=2,Ac=3,pn=4,Jn=1,Vb=2,Da=3,Yb=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Xb=/[\x85\u2028\u2029]/,Kb=/[,\[\]\{\}]/,Ec=/^(?:!|!!|![a-z\-]+!)$/i,Pc=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function Bo(r){return Object.prototype.toString.call(r)}g(Bo,"_class");function Zt(r){return r===10||r===13}g(Zt,"is_EOL");function Lr(r){return r===9||r===32}g(Lr,"is_WHITE_SPACE");function At(r){return r===9||r===32||r===10||r===13}g(At,"is_WS_OR_EOL");function qr(r){return r===44||r===91||r===93||r===123||r===125}g(qr,"is_FLOW_INDICATOR");function Dc(r){var t;return 48<=r&&r<=57?r-48:(t=r|32,97<=t&&t<=102?t-97+10:-1)}g(Dc,"fromHexCode");function Ic(r){return r===120?2:r===117?4:r===85?8:0}g(Ic,"escapedHexLen");function Rc(r){return 48<=r&&r<=57?r-48:-1}g(Rc,"fromDecimalCode");function Lo(r){return r===48?"\0":r===97?"\x07":r===98?"\b":r===116||r===9?"	":r===110?`
`:r===118?"\v":r===102?"\f":r===114?"\r":r===101?"\x1B":r===32?" ":r===34?'"':r===47?"/":r===92?"\\":r===78?"":r===95?" ":r===76?"\u2028":r===80?"\u2029":""}g(Lo,"simpleEscapeSequence");function Oc(r){return r<=65535?String.fromCharCode(r):String.fromCharCode((r-65536>>10)+55296,(r-65536&1023)+56320)}g(Oc,"charFromCodepoint");function Ls(r,t,e){t==="__proto__"?Object.defineProperty(r,t,{configurable:!0,enumerable:!0,writable:!0,value:e}):r[t]=e}g(Ls,"setProperty");var $c=new Array(256),Wc=new Array(256);for(Rr=0;Rr<256;Rr++)$c[Rr]=Lo(Rr)?1:0,Wc[Rr]=Lo(Rr);var Rr;function zc(r,t){this.input=r,this.filename=t.filename||null,this.schema=t.schema||Fc,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.json=t.json||!1,this.listener=t.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=r.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}g(zc,"State$1");function Fs(r,t){var e={name:r.filename,buffer:r.input.slice(0,-1),position:r.position,line:r.line,column:r.position-r.lineStart};return e.snippet=wb(e),new Rt(t,e)}g(Fs,"generateError");function G(r,t){throw Fs(r,t)}g(G,"throwError");function Ye(r,t){r.onWarning&&r.onWarning.call(null,Fs(r,t))}g(Ye,"throwWarning");var Ia={YAML:g(function(t,e,i){var n,o,a;t.version!==null&&G(t,"duplication of %YAML directive"),i.length!==1&&G(t,"YAML directive accepts exactly one argument"),n=/^([0-9]+)\.([0-9]+)$/.exec(i[0]),n===null&&G(t,"ill-formed argument of the YAML directive"),o=parseInt(n[1],10),a=parseInt(n[2],10),o!==1&&G(t,"unacceptable YAML version of the document"),t.version=i[0],t.checkLineBreaks=a<2,a!==1&&a!==2&&Ye(t,"unsupported YAML version of the document")},"handleYamlDirective"),TAG:g(function(t,e,i){var n,o;i.length!==2&&G(t,"TAG directive accepts exactly two arguments"),n=i[0],o=i[1],Ec.test(n)||G(t,"ill-formed tag handle (first argument) of the TAG directive"),Mr.call(t.tagMap,n)&&G(t,'there is a previously declared suffix for "'+n+'" tag handle'),Pc.test(o)||G(t,"ill-formed tag prefix (second argument) of the TAG directive");try{o=decodeURIComponent(o)}catch{G(t,"tag prefix is malformed: "+o)}t.tagMap[n]=o},"handleTagDirective")};function mr(r,t,e,i){var n,o,a,s;if(t<e){if(s=r.input.slice(t,e),i)for(n=0,o=s.length;n<o;n+=1)a=s.charCodeAt(n),a===9||32<=a&&a<=1114111||G(r,"expected valid JSON character");else Yb.test(s)&&G(r,"the stream contains non-printable characters");r.result+=s}}g(mr,"captureSegment");function Fo(r,t,e,i){var n,o,a,s;for(mt.isObject(e)||G(r,"cannot merge mappings; the provided source object is unacceptable"),n=Object.keys(e),a=0,s=n.length;a<s;a+=1)o=n[a],Mr.call(t,o)||(Ls(t,o,e[o]),i[o]=!0)}g(Fo,"mergeMappings");function jr(r,t,e,i,n,o,a,s,l){var h,c;if(Array.isArray(n))for(n=Array.prototype.slice.call(n),h=0,c=n.length;h<c;h+=1)Array.isArray(n[h])&&G(r,"nested arrays are not supported inside keys"),typeof n=="object"&&Bo(n[h])==="[object Object]"&&(n[h]="[object Object]");if(typeof n=="object"&&Bo(n)==="[object Object]"&&(n="[object Object]"),n=String(n),t===null&&(t={}),i==="tag:yaml.org,2002:merge")if(Array.isArray(o))for(h=0,c=o.length;h<c;h+=1)Fo(r,t,o[h],e);else Fo(r,t,o,e);else!r.json&&!Mr.call(e,n)&&Mr.call(t,n)&&(r.line=a||r.line,r.lineStart=s||r.lineStart,r.position=l||r.position,G(r,"duplicated mapping key")),Ls(t,n,o),delete e[n];return t}g(jr,"storeMappingPair");function In(r){var t;t=r.input.charCodeAt(r.position),t===10?r.position++:t===13?(r.position++,r.input.charCodeAt(r.position)===10&&r.position++):G(r,"a line break is expected"),r.line+=1,r.lineStart=r.position,r.firstTabInLine=-1}g(In,"readLineBreak");function ut(r,t,e){for(var i=0,n=r.input.charCodeAt(r.position);n!==0;){for(;Lr(n);)n===9&&r.firstTabInLine===-1&&(r.firstTabInLine=r.position),n=r.input.charCodeAt(++r.position);if(t&&n===35)do n=r.input.charCodeAt(++r.position);while(n!==10&&n!==13&&n!==0);if(Zt(n))for(In(r),n=r.input.charCodeAt(r.position),i++,r.lineIndent=0;n===32;)r.lineIndent++,n=r.input.charCodeAt(++r.position);else break}return e!==-1&&i!==0&&r.lineIndent<e&&Ye(r,"deficient indentation"),i}g(ut,"skipSeparationSpace");function xi(r){var t=r.position,e;return e=r.input.charCodeAt(t),!!((e===45||e===46)&&e===r.input.charCodeAt(t+1)&&e===r.input.charCodeAt(t+2)&&(t+=3,e=r.input.charCodeAt(t),e===0||At(e)))}g(xi,"testDocumentSeparator");function Rn(r,t){t===1?r.result+=" ":t>1&&(r.result+=mt.repeat(`
`,t-1))}g(Rn,"writeFoldedLines");function Nc(r,t,e){var i,n,o,a,s,l,h,c,d=r.kind,p=r.result,u;if(u=r.input.charCodeAt(r.position),At(u)||qr(u)||u===35||u===38||u===42||u===33||u===124||u===62||u===39||u===34||u===37||u===64||u===96||(u===63||u===45)&&(n=r.input.charCodeAt(r.position+1),At(n)||e&&qr(n)))return!1;for(r.kind="scalar",r.result="",o=a=r.position,s=!1;u!==0;){if(u===58){if(n=r.input.charCodeAt(r.position+1),At(n)||e&&qr(n))break}else if(u===35){if(i=r.input.charCodeAt(r.position-1),At(i))break}else{if(r.position===r.lineStart&&xi(r)||e&&qr(u))break;if(Zt(u))if(l=r.line,h=r.lineStart,c=r.lineIndent,ut(r,!1,-1),r.lineIndent>=t){s=!0,u=r.input.charCodeAt(r.position);continue}else{r.position=a,r.line=l,r.lineStart=h,r.lineIndent=c;break}}s&&(mr(r,o,a,!1),Rn(r,r.line-l),o=a=r.position,s=!1),Lr(u)||(a=r.position+1),u=r.input.charCodeAt(++r.position)}return mr(r,o,a,!1),r.result?!0:(r.kind=d,r.result=p,!1)}g(Nc,"readPlainScalar");function qc(r,t){var e,i,n;if(e=r.input.charCodeAt(r.position),e!==39)return!1;for(r.kind="scalar",r.result="",r.position++,i=n=r.position;(e=r.input.charCodeAt(r.position))!==0;)if(e===39)if(mr(r,i,r.position,!0),e=r.input.charCodeAt(++r.position),e===39)i=r.position,r.position++,n=r.position;else return!0;else Zt(e)?(mr(r,i,n,!0),Rn(r,ut(r,!1,t)),i=n=r.position):r.position===r.lineStart&&xi(r)?G(r,"unexpected end of the document within a single quoted scalar"):(r.position++,n=r.position);G(r,"unexpected end of the stream within a single quoted scalar")}g(qc,"readSingleQuotedScalar");function jc(r,t){var e,i,n,o,a,s;if(s=r.input.charCodeAt(r.position),s!==34)return!1;for(r.kind="scalar",r.result="",r.position++,e=i=r.position;(s=r.input.charCodeAt(r.position))!==0;){if(s===34)return mr(r,e,r.position,!0),r.position++,!0;if(s===92){if(mr(r,e,r.position,!0),s=r.input.charCodeAt(++r.position),Zt(s))ut(r,!1,t);else if(s<256&&$c[s])r.result+=Wc[s],r.position++;else if((a=Ic(s))>0){for(n=a,o=0;n>0;n--)s=r.input.charCodeAt(++r.position),(a=Dc(s))>=0?o=(o<<4)+a:G(r,"expected hexadecimal character");r.result+=Oc(o),r.position++}else G(r,"unknown escape sequence");e=i=r.position}else Zt(s)?(mr(r,e,i,!0),Rn(r,ut(r,!1,t)),e=i=r.position):r.position===r.lineStart&&xi(r)?G(r,"unexpected end of the document within a double quoted scalar"):(r.position++,i=r.position)}G(r,"unexpected end of the stream within a double quoted scalar")}g(jc,"readDoubleQuotedScalar");function Hc(r,t){var e=!0,i,n,o,a=r.tag,s,l=r.anchor,h,c,d,p,u,m=Object.create(null),f,y,C,b;if(b=r.input.charCodeAt(r.position),b===91)c=93,u=!1,s=[];else if(b===123)c=125,u=!0,s={};else return!1;for(r.anchor!==null&&(r.anchorMap[r.anchor]=s),b=r.input.charCodeAt(++r.position);b!==0;){if(ut(r,!0,t),b=r.input.charCodeAt(r.position),b===c)return r.position++,r.tag=a,r.anchor=l,r.kind=u?"mapping":"sequence",r.result=s,!0;e?b===44&&G(r,"expected the node content, but found ','"):G(r,"missed comma between flow collection entries"),y=f=C=null,d=p=!1,b===63&&(h=r.input.charCodeAt(r.position+1),At(h)&&(d=p=!0,r.position++,ut(r,!0,t))),i=r.line,n=r.lineStart,o=r.position,Yr(r,t,un,!1,!0),y=r.tag,f=r.result,ut(r,!0,t),b=r.input.charCodeAt(r.position),(p||r.line===i)&&b===58&&(d=!0,b=r.input.charCodeAt(++r.position),ut(r,!0,t),Yr(r,t,un,!1,!0),C=r.result),u?jr(r,s,m,y,f,C,i,n,o):d?s.push(jr(r,null,m,y,f,C,i,n,o)):s.push(f),ut(r,!0,t),b=r.input.charCodeAt(r.position),b===44?(e=!0,b=r.input.charCodeAt(++r.position)):e=!1}G(r,"unexpected end of the stream within a flow collection")}g(Hc,"readFlowCollection");function Uc(r,t){var e,i,n=Jn,o=!1,a=!1,s=t,l=0,h=!1,c,d;if(d=r.input.charCodeAt(r.position),d===124)i=!1;else if(d===62)i=!0;else return!1;for(r.kind="scalar",r.result="";d!==0;)if(d=r.input.charCodeAt(++r.position),d===43||d===45)Jn===n?n=d===43?Da:Vb:G(r,"repeat of a chomping mode identifier");else if((c=Rc(d))>=0)c===0?G(r,"bad explicit indentation width of a block scalar; it cannot be less than one"):a?G(r,"repeat of an indentation width identifier"):(s=t+c-1,a=!0);else break;if(Lr(d)){do d=r.input.charCodeAt(++r.position);while(Lr(d));if(d===35)do d=r.input.charCodeAt(++r.position);while(!Zt(d)&&d!==0)}for(;d!==0;){for(In(r),r.lineIndent=0,d=r.input.charCodeAt(r.position);(!a||r.lineIndent<s)&&d===32;)r.lineIndent++,d=r.input.charCodeAt(++r.position);if(!a&&r.lineIndent>s&&(s=r.lineIndent),Zt(d)){l++;continue}if(r.lineIndent<s){n===Da?r.result+=mt.repeat(`
`,o?1+l:l):n===Jn&&o&&(r.result+=`
`);break}for(i?Lr(d)?(h=!0,r.result+=mt.repeat(`
`,o?1+l:l)):h?(h=!1,r.result+=mt.repeat(`
`,l+1)):l===0?o&&(r.result+=" "):r.result+=mt.repeat(`
`,l):r.result+=mt.repeat(`
`,o?1+l:l),o=!0,a=!0,l=0,e=r.position;!Zt(d)&&d!==0;)d=r.input.charCodeAt(++r.position);mr(r,e,r.position,!1)}return!0}g(Uc,"readBlockScalar");function Mo(r,t){var e,i=r.tag,n=r.anchor,o=[],a,s=!1,l;if(r.firstTabInLine!==-1)return!1;for(r.anchor!==null&&(r.anchorMap[r.anchor]=o),l=r.input.charCodeAt(r.position);l!==0&&(r.firstTabInLine!==-1&&(r.position=r.firstTabInLine,G(r,"tab characters must not be used in indentation")),!(l!==45||(a=r.input.charCodeAt(r.position+1),!At(a))));){if(s=!0,r.position++,ut(r,!0,-1)&&r.lineIndent<=t){o.push(null),l=r.input.charCodeAt(r.position);continue}if(e=r.line,Yr(r,t,Ac,!1,!0),o.push(r.result),ut(r,!0,-1),l=r.input.charCodeAt(r.position),(r.line===e||r.lineIndent>t)&&l!==0)G(r,"bad indentation of a sequence entry");else if(r.lineIndent<t)break}return s?(r.tag=i,r.anchor=n,r.kind="sequence",r.result=o,!0):!1}g(Mo,"readBlockSequence");function Gc(r,t,e){var i,n,o,a,s,l,h=r.tag,c=r.anchor,d={},p=Object.create(null),u=null,m=null,f=null,y=!1,C=!1,b;if(r.firstTabInLine!==-1)return!1;for(r.anchor!==null&&(r.anchorMap[r.anchor]=d),b=r.input.charCodeAt(r.position);b!==0;){if(!y&&r.firstTabInLine!==-1&&(r.position=r.firstTabInLine,G(r,"tab characters must not be used in indentation")),i=r.input.charCodeAt(r.position+1),o=r.line,(b===63||b===58)&&At(i))b===63?(y&&(jr(r,d,p,u,m,null,a,s,l),u=m=f=null),C=!0,y=!0,n=!0):y?(y=!1,n=!0):G(r,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),r.position+=1,b=i;else{if(a=r.line,s=r.lineStart,l=r.position,!Yr(r,e,Mc,!1,!0))break;if(r.line===o){for(b=r.input.charCodeAt(r.position);Lr(b);)b=r.input.charCodeAt(++r.position);if(b===58)b=r.input.charCodeAt(++r.position),At(b)||G(r,"a whitespace character is expected after the key-value separator within a block mapping"),y&&(jr(r,d,p,u,m,null,a,s,l),u=m=f=null),C=!0,y=!1,n=!1,u=r.tag,m=r.result;else if(C)G(r,"can not read an implicit mapping pair; a colon is missed");else return r.tag=h,r.anchor=c,!0}else if(C)G(r,"can not read a block mapping entry; a multiline key may not be an implicit key");else return r.tag=h,r.anchor=c,!0}if((r.line===o||r.lineIndent>t)&&(y&&(a=r.line,s=r.lineStart,l=r.position),Yr(r,t,pn,!0,n)&&(y?m=r.result:f=r.result),y||(jr(r,d,p,u,m,f,a,s,l),u=m=f=null),ut(r,!0,-1),b=r.input.charCodeAt(r.position)),(r.line===o||r.lineIndent>t)&&b!==0)G(r,"bad indentation of a mapping entry");else if(r.lineIndent<t)break}return y&&jr(r,d,p,u,m,null,a,s,l),C&&(r.tag=h,r.anchor=c,r.kind="mapping",r.result=d),C}g(Gc,"readBlockMapping");function Vc(r){var t,e=!1,i=!1,n,o,a;if(a=r.input.charCodeAt(r.position),a!==33)return!1;if(r.tag!==null&&G(r,"duplication of a tag property"),a=r.input.charCodeAt(++r.position),a===60?(e=!0,a=r.input.charCodeAt(++r.position)):a===33?(i=!0,n="!!",a=r.input.charCodeAt(++r.position)):n="!",t=r.position,e){do a=r.input.charCodeAt(++r.position);while(a!==0&&a!==62);r.position<r.length?(o=r.input.slice(t,r.position),a=r.input.charCodeAt(++r.position)):G(r,"unexpected end of the stream within a verbatim tag")}else{for(;a!==0&&!At(a);)a===33&&(i?G(r,"tag suffix cannot contain exclamation marks"):(n=r.input.slice(t-1,r.position+1),Ec.test(n)||G(r,"named tag handle cannot contain such characters"),i=!0,t=r.position+1)),a=r.input.charCodeAt(++r.position);o=r.input.slice(t,r.position),Kb.test(o)&&G(r,"tag suffix cannot contain flow indicator characters")}o&&!Pc.test(o)&&G(r,"tag name cannot contain such characters: "+o);try{o=decodeURIComponent(o)}catch{G(r,"tag name is malformed: "+o)}return e?r.tag=o:Mr.call(r.tagMap,n)?r.tag=r.tagMap[n]+o:n==="!"?r.tag="!"+o:n==="!!"?r.tag="tag:yaml.org,2002:"+o:G(r,'undeclared tag handle "'+n+'"'),!0}g(Vc,"readTagProperty");function Yc(r){var t,e;if(e=r.input.charCodeAt(r.position),e!==38)return!1;for(r.anchor!==null&&G(r,"duplication of an anchor property"),e=r.input.charCodeAt(++r.position),t=r.position;e!==0&&!At(e)&&!qr(e);)e=r.input.charCodeAt(++r.position);return r.position===t&&G(r,"name of an anchor node must contain at least one character"),r.anchor=r.input.slice(t,r.position),!0}g(Yc,"readAnchorProperty");function Xc(r){var t,e,i;if(i=r.input.charCodeAt(r.position),i!==42)return!1;for(i=r.input.charCodeAt(++r.position),t=r.position;i!==0&&!At(i)&&!qr(i);)i=r.input.charCodeAt(++r.position);return r.position===t&&G(r,"name of an alias node must contain at least one character"),e=r.input.slice(t,r.position),Mr.call(r.anchorMap,e)||G(r,'unidentified alias "'+e+'"'),r.result=r.anchorMap[e],ut(r,!0,-1),!0}g(Xc,"readAlias");function Yr(r,t,e,i,n){var o,a,s,l=1,h=!1,c=!1,d,p,u,m,f,y;if(r.listener!==null&&r.listener("open",r),r.tag=null,r.anchor=null,r.kind=null,r.result=null,o=a=s=pn===e||Ac===e,i&&ut(r,!0,-1)&&(h=!0,r.lineIndent>t?l=1:r.lineIndent===t?l=0:r.lineIndent<t&&(l=-1)),l===1)for(;Vc(r)||Yc(r);)ut(r,!0,-1)?(h=!0,s=o,r.lineIndent>t?l=1:r.lineIndent===t?l=0:r.lineIndent<t&&(l=-1)):s=!1;if(s&&(s=h||n),(l===1||pn===e)&&(un===e||Mc===e?f=t:f=t+1,y=r.position-r.lineStart,l===1?s&&(Mo(r,y)||Gc(r,y,f))||Hc(r,f)?c=!0:(a&&Uc(r,f)||qc(r,f)||jc(r,f)?c=!0:Xc(r)?(c=!0,(r.tag!==null||r.anchor!==null)&&G(r,"alias node should not have any properties")):Nc(r,f,un===e)&&(c=!0,r.tag===null&&(r.tag="?")),r.anchor!==null&&(r.anchorMap[r.anchor]=r.result)):l===0&&(c=s&&Mo(r,y))),r.tag===null)r.anchor!==null&&(r.anchorMap[r.anchor]=r.result);else if(r.tag==="?"){for(r.result!==null&&r.kind!=="scalar"&&G(r,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+r.kind+'"'),d=0,p=r.implicitTypes.length;d<p;d+=1)if(m=r.implicitTypes[d],m.resolve(r.result)){r.result=m.construct(r.result),r.tag=m.tag,r.anchor!==null&&(r.anchorMap[r.anchor]=r.result);break}}else if(r.tag!=="!"){if(Mr.call(r.typeMap[r.kind||"fallback"],r.tag))m=r.typeMap[r.kind||"fallback"][r.tag];else for(m=null,u=r.typeMap.multi[r.kind||"fallback"],d=0,p=u.length;d<p;d+=1)if(r.tag.slice(0,u[d].tag.length)===u[d].tag){m=u[d];break}m||G(r,"unknown tag !<"+r.tag+">"),r.result!==null&&m.kind!==r.kind&&G(r,"unacceptable node kind for !<"+r.tag+'> tag; it should be "'+m.kind+'", not "'+r.kind+'"'),m.resolve(r.result,r.tag)?(r.result=m.construct(r.result,r.tag),r.anchor!==null&&(r.anchorMap[r.anchor]=r.result)):G(r,"cannot resolve a node with !<"+r.tag+"> explicit tag")}return r.listener!==null&&r.listener("close",r),r.tag!==null||r.anchor!==null||c}g(Yr,"composeNode");function Kc(r){var t=r.position,e,i,n,o=!1,a;for(r.version=null,r.checkLineBreaks=r.legacy,r.tagMap=Object.create(null),r.anchorMap=Object.create(null);(a=r.input.charCodeAt(r.position))!==0&&(ut(r,!0,-1),a=r.input.charCodeAt(r.position),!(r.lineIndent>0||a!==37));){for(o=!0,a=r.input.charCodeAt(++r.position),e=r.position;a!==0&&!At(a);)a=r.input.charCodeAt(++r.position);for(i=r.input.slice(e,r.position),n=[],i.length<1&&G(r,"directive name must not be less than one character in length");a!==0;){for(;Lr(a);)a=r.input.charCodeAt(++r.position);if(a===35){do a=r.input.charCodeAt(++r.position);while(a!==0&&!Zt(a));break}if(Zt(a))break;for(e=r.position;a!==0&&!At(a);)a=r.input.charCodeAt(++r.position);n.push(r.input.slice(e,r.position))}a!==0&&In(r),Mr.call(Ia,i)?Ia[i](r,i,n):Ye(r,'unknown document directive "'+i+'"')}if(ut(r,!0,-1),r.lineIndent===0&&r.input.charCodeAt(r.position)===45&&r.input.charCodeAt(r.position+1)===45&&r.input.charCodeAt(r.position+2)===45?(r.position+=3,ut(r,!0,-1)):o&&G(r,"directives end mark is expected"),Yr(r,r.lineIndent-1,pn,!1,!0),ut(r,!0,-1),r.checkLineBreaks&&Xb.test(r.input.slice(t,r.position))&&Ye(r,"non-ASCII line breaks are interpreted as content"),r.documents.push(r.result),r.position===r.lineStart&&xi(r)){r.input.charCodeAt(r.position)===46&&(r.position+=3,ut(r,!0,-1));return}if(r.position<r.length-1)G(r,"end of the stream or a document separator is expected");else return}g(Kc,"readDocument");function Ms(r,t){r=String(r),t=t||{},r.length!==0&&(r.charCodeAt(r.length-1)!==10&&r.charCodeAt(r.length-1)!==13&&(r+=`
`),r.charCodeAt(0)===65279&&(r=r.slice(1)));var e=new zc(r,t),i=r.indexOf("\0");for(i!==-1&&(e.position=i,G(e,"null byte is not allowed in input")),e.input+="\0";e.input.charCodeAt(e.position)===32;)e.lineIndent+=1,e.position+=1;for(;e.position<e.length-1;)Kc(e);return e.documents}g(Ms,"loadDocuments");function Zc(r,t,e){t!==null&&typeof t=="object"&&typeof e>"u"&&(e=t,t=null);var i=Ms(r,e);if(typeof t!="function")return i;for(var n=0,o=i.length;n<o;n+=1)t(i[n])}g(Zc,"loadAll$1");function Qc(r,t){var e=Ms(r,t);if(e.length!==0){if(e.length===1)return e[0];throw new Rt("expected a single document in the stream, but found more")}}g(Qc,"load$1");var Zb=Zc,Qb=Qc,Jb={loadAll:Zb,load:Qb},Jc=Object.prototype.toString,td=Object.prototype.hasOwnProperty,As=65279,t1=9,Xe=10,r1=13,e1=32,i1=33,n1=34,Ao=35,o1=37,s1=38,a1=39,l1=42,rd=44,h1=45,gn=58,c1=61,d1=62,u1=63,p1=64,ed=91,id=93,g1=96,nd=123,f1=124,od=125,Ft={};Ft[0]="\\0";Ft[7]="\\a";Ft[8]="\\b";Ft[9]="\\t";Ft[10]="\\n";Ft[11]="\\v";Ft[12]="\\f";Ft[13]="\\r";Ft[27]="\\e";Ft[34]='\\"';Ft[92]="\\\\";Ft[133]="\\N";Ft[160]="\\_";Ft[8232]="\\L";Ft[8233]="\\P";var m1=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],y1=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function sd(r,t){var e,i,n,o,a,s,l;if(t===null)return{};for(e={},i=Object.keys(t),n=0,o=i.length;n<o;n+=1)a=i[n],s=String(t[a]),a.slice(0,2)==="!!"&&(a="tag:yaml.org,2002:"+a.slice(2)),l=r.compiledTypeMap.fallback[a],l&&td.call(l.styleAliases,s)&&(s=l.styleAliases[s]),e[a]=s;return e}g(sd,"compileStyleMap");function ad(r){var t,e,i;if(t=r.toString(16).toUpperCase(),r<=255)e="x",i=2;else if(r<=65535)e="u",i=4;else if(r<=4294967295)e="U",i=8;else throw new Rt("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+e+mt.repeat("0",i-t.length)+t}g(ad,"encodeHex");var C1=1,Ke=2;function ld(r){this.schema=r.schema||Fc,this.indent=Math.max(1,r.indent||2),this.noArrayIndent=r.noArrayIndent||!1,this.skipInvalid=r.skipInvalid||!1,this.flowLevel=mt.isNothing(r.flowLevel)?-1:r.flowLevel,this.styleMap=sd(this.schema,r.styles||null),this.sortKeys=r.sortKeys||!1,this.lineWidth=r.lineWidth||80,this.noRefs=r.noRefs||!1,this.noCompatMode=r.noCompatMode||!1,this.condenseFlow=r.condenseFlow||!1,this.quotingType=r.quotingType==='"'?Ke:C1,this.forceQuotes=r.forceQuotes||!1,this.replacer=typeof r.replacer=="function"?r.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}g(ld,"State");function Eo(r,t){for(var e=mt.repeat(" ",t),i=0,n=-1,o="",a,s=r.length;i<s;)n=r.indexOf(`
`,i),n===-1?(a=r.slice(i),i=s):(a=r.slice(i,n+1),i=n+1),a.length&&a!==`
`&&(o+=e),o+=a;return o}g(Eo,"indentString");function fn(r,t){return`
`+mt.repeat(" ",r.indent*t)}g(fn,"generateNextLine");function hd(r,t){var e,i,n;for(e=0,i=r.implicitTypes.length;e<i;e+=1)if(n=r.implicitTypes[e],n.resolve(t))return!0;return!1}g(hd,"testImplicitResolving");function Ze(r){return r===e1||r===t1}g(Ze,"isWhitespace");function ge(r){return 32<=r&&r<=126||161<=r&&r<=55295&&r!==8232&&r!==8233||57344<=r&&r<=65533&&r!==As||65536<=r&&r<=1114111}g(ge,"isPrintable");function Po(r){return ge(r)&&r!==As&&r!==r1&&r!==Xe}g(Po,"isNsCharOrWhitespace");function Do(r,t,e){var i=Po(r),n=i&&!Ze(r);return(e?i:i&&r!==rd&&r!==ed&&r!==id&&r!==nd&&r!==od)&&r!==Ao&&!(t===gn&&!n)||Po(t)&&!Ze(t)&&r===Ao||t===gn&&n}g(Do,"isPlainSafe");function cd(r){return ge(r)&&r!==As&&!Ze(r)&&r!==h1&&r!==u1&&r!==gn&&r!==rd&&r!==ed&&r!==id&&r!==nd&&r!==od&&r!==Ao&&r!==s1&&r!==l1&&r!==i1&&r!==f1&&r!==c1&&r!==d1&&r!==a1&&r!==n1&&r!==o1&&r!==p1&&r!==g1}g(cd,"isPlainSafeFirst");function dd(r){return!Ze(r)&&r!==gn}g(dd,"isPlainSafeLast");function oe(r,t){var e=r.charCodeAt(t),i;return e>=55296&&e<=56319&&t+1<r.length&&(i=r.charCodeAt(t+1),i>=56320&&i<=57343)?(e-55296)*1024+i-56320+65536:e}g(oe,"codePointAt");function Es(r){var t=/^\n* /;return t.test(r)}g(Es,"needIndentIndicator");var ud=1,Io=2,pd=3,gd=4,ee=5;function fd(r,t,e,i,n,o,a,s){var l,h=0,c=null,d=!1,p=!1,u=i!==-1,m=-1,f=cd(oe(r,0))&&dd(oe(r,r.length-1));if(t||a)for(l=0;l<r.length;h>=65536?l+=2:l++){if(h=oe(r,l),!ge(h))return ee;f=f&&Do(h,c,s),c=h}else{for(l=0;l<r.length;h>=65536?l+=2:l++){if(h=oe(r,l),h===Xe)d=!0,u&&(p=p||l-m-1>i&&r[m+1]!==" ",m=l);else if(!ge(h))return ee;f=f&&Do(h,c,s),c=h}p=p||u&&l-m-1>i&&r[m+1]!==" "}return!d&&!p?f&&!a&&!n(r)?ud:o===Ke?ee:Io:e>9&&Es(r)?ee:a?o===Ke?ee:Io:p?gd:pd}g(fd,"chooseScalarStyle");function md(r,t,e,i,n){r.dump=function(){if(t.length===0)return r.quotingType===Ke?'""':"''";if(!r.noCompatMode&&(m1.indexOf(t)!==-1||y1.test(t)))return r.quotingType===Ke?'"'+t+'"':"'"+t+"'";var o=r.indent*Math.max(1,e),a=r.lineWidth===-1?-1:Math.max(Math.min(r.lineWidth,40),r.lineWidth-o),s=i||r.flowLevel>-1&&e>=r.flowLevel;function l(h){return hd(r,h)}switch(g(l,"testAmbiguity"),fd(t,s,r.indent,a,l,r.quotingType,r.forceQuotes&&!i,n)){case ud:return t;case Io:return"'"+t.replace(/'/g,"''")+"'";case pd:return"|"+Ro(t,r.indent)+Oo(Eo(t,o));case gd:return">"+Ro(t,r.indent)+Oo(Eo(yd(t,a),o));case ee:return'"'+Cd(t)+'"';default:throw new Rt("impossible error: invalid scalar style")}}()}g(md,"writeScalar");function Ro(r,t){var e=Es(r)?String(t):"",i=r[r.length-1]===`
`,n=i&&(r[r.length-2]===`
`||r===`
`),o=n?"+":i?"":"-";return e+o+`
`}g(Ro,"blockHeader");function Oo(r){return r[r.length-1]===`
`?r.slice(0,-1):r}g(Oo,"dropEndingNewline");function yd(r,t){for(var e=/(\n+)([^\n]*)/g,i=function(){var h=r.indexOf(`
`);return h=h!==-1?h:r.length,e.lastIndex=h,$o(r.slice(0,h),t)}(),n=r[0]===`
`||r[0]===" ",o,a;a=e.exec(r);){var s=a[1],l=a[2];o=l[0]===" ",i+=s+(!n&&!o&&l!==""?`
`:"")+$o(l,t),n=o}return i}g(yd,"foldString");function $o(r,t){if(r===""||r[0]===" ")return r;for(var e=/ [^ ]/g,i,n=0,o,a=0,s=0,l="";i=e.exec(r);)s=i.index,s-n>t&&(o=a>n?a:s,l+=`
`+r.slice(n,o),n=o+1),a=s;return l+=`
`,r.length-n>t&&a>n?l+=r.slice(n,a)+`
`+r.slice(a+1):l+=r.slice(n),l.slice(1)}g($o,"foldLine");function Cd(r){for(var t="",e=0,i,n=0;n<r.length;e>=65536?n+=2:n++)e=oe(r,n),i=Ft[e],!i&&ge(e)?(t+=r[n],e>=65536&&(t+=r[n+1])):t+=i||ad(e);return t}g(Cd,"escapeString");function xd(r,t,e){var i="",n=r.tag,o,a,s;for(o=0,a=e.length;o<a;o+=1)s=e[o],r.replacer&&(s=r.replacer.call(e,String(o),s)),(ar(r,t,s,!1,!1)||typeof s>"u"&&ar(r,t,null,!1,!1))&&(i!==""&&(i+=","+(r.condenseFlow?"":" ")),i+=r.dump);r.tag=n,r.dump="["+i+"]"}g(xd,"writeFlowSequence");function Wo(r,t,e,i){var n="",o=r.tag,a,s,l;for(a=0,s=e.length;a<s;a+=1)l=e[a],r.replacer&&(l=r.replacer.call(e,String(a),l)),(ar(r,t+1,l,!0,!0,!1,!0)||typeof l>"u"&&ar(r,t+1,null,!0,!0,!1,!0))&&((!i||n!=="")&&(n+=fn(r,t)),r.dump&&Xe===r.dump.charCodeAt(0)?n+="-":n+="- ",n+=r.dump);r.tag=o,r.dump=n||"[]"}g(Wo,"writeBlockSequence");function bd(r,t,e){var i="",n=r.tag,o=Object.keys(e),a,s,l,h,c;for(a=0,s=o.length;a<s;a+=1)c="",i!==""&&(c+=", "),r.condenseFlow&&(c+='"'),l=o[a],h=e[l],r.replacer&&(h=r.replacer.call(e,l,h)),ar(r,t,l,!1,!1)&&(r.dump.length>1024&&(c+="? "),c+=r.dump+(r.condenseFlow?'"':"")+":"+(r.condenseFlow?"":" "),ar(r,t,h,!1,!1)&&(c+=r.dump,i+=c));r.tag=n,r.dump="{"+i+"}"}g(bd,"writeFlowMapping");function kd(r,t,e,i){var n="",o=r.tag,a=Object.keys(e),s,l,h,c,d,p;if(r.sortKeys===!0)a.sort();else if(typeof r.sortKeys=="function")a.sort(r.sortKeys);else if(r.sortKeys)throw new Rt("sortKeys must be a boolean or a function");for(s=0,l=a.length;s<l;s+=1)p="",(!i||n!=="")&&(p+=fn(r,t)),h=a[s],c=e[h],r.replacer&&(c=r.replacer.call(e,h,c)),ar(r,t+1,h,!0,!0,!0)&&(d=r.tag!==null&&r.tag!=="?"||r.dump&&r.dump.length>1024,d&&(r.dump&&Xe===r.dump.charCodeAt(0)?p+="?":p+="? "),p+=r.dump,d&&(p+=fn(r,t)),ar(r,t+1,c,!0,d)&&(r.dump&&Xe===r.dump.charCodeAt(0)?p+=":":p+=": ",p+=r.dump,n+=p));r.tag=o,r.dump=n||"{}"}g(kd,"writeBlockMapping");function zo(r,t,e){var i,n,o,a,s,l;for(n=e?r.explicitTypes:r.implicitTypes,o=0,a=n.length;o<a;o+=1)if(s=n[o],(s.instanceOf||s.predicate)&&(!s.instanceOf||typeof t=="object"&&t instanceof s.instanceOf)&&(!s.predicate||s.predicate(t))){if(e?s.multi&&s.representName?r.tag=s.representName(t):r.tag=s.tag:r.tag="?",s.represent){if(l=r.styleMap[s.tag]||s.defaultStyle,Jc.call(s.represent)==="[object Function]")i=s.represent(t,l);else if(td.call(s.represent,l))i=s.represent[l](t,l);else throw new Rt("!<"+s.tag+'> tag resolver accepts not "'+l+'" style');r.dump=i}return!0}return!1}g(zo,"detectType");function ar(r,t,e,i,n,o,a){r.tag=null,r.dump=e,zo(r,e,!1)||zo(r,e,!0);var s=Jc.call(r.dump),l=i,h;i&&(i=r.flowLevel<0||r.flowLevel>t);var c=s==="[object Object]"||s==="[object Array]",d,p;if(c&&(d=r.duplicates.indexOf(e),p=d!==-1),(r.tag!==null&&r.tag!=="?"||p||r.indent!==2&&t>0)&&(n=!1),p&&r.usedDuplicates[d])r.dump="*ref_"+d;else{if(c&&p&&!r.usedDuplicates[d]&&(r.usedDuplicates[d]=!0),s==="[object Object]")i&&Object.keys(r.dump).length!==0?(kd(r,t,r.dump,n),p&&(r.dump="&ref_"+d+r.dump)):(bd(r,t,r.dump),p&&(r.dump="&ref_"+d+" "+r.dump));else if(s==="[object Array]")i&&r.dump.length!==0?(r.noArrayIndent&&!a&&t>0?Wo(r,t-1,r.dump,n):Wo(r,t,r.dump,n),p&&(r.dump="&ref_"+d+r.dump)):(xd(r,t,r.dump),p&&(r.dump="&ref_"+d+" "+r.dump));else if(s==="[object String]")r.tag!=="?"&&md(r,r.dump,t,o,l);else{if(s==="[object Undefined]")return!1;if(r.skipInvalid)return!1;throw new Rt("unacceptable kind of an object to dump "+s)}r.tag!==null&&r.tag!=="?"&&(h=encodeURI(r.tag[0]==="!"?r.tag.slice(1):r.tag).replace(/!/g,"%21"),r.tag[0]==="!"?h="!"+h:h.slice(0,18)==="tag:yaml.org,2002:"?h="!!"+h.slice(18):h="!<"+h+">",r.dump=h+" "+r.dump)}return!0}g(ar,"writeNode");function wd(r,t){var e=[],i=[],n,o;for(mn(r,e,i),n=0,o=i.length;n<o;n+=1)t.duplicates.push(e[i[n]]);t.usedDuplicates=new Array(o)}g(wd,"getDuplicateReferences");function mn(r,t,e){var i,n,o;if(r!==null&&typeof r=="object")if(n=t.indexOf(r),n!==-1)e.indexOf(n)===-1&&e.push(n);else if(t.push(r),Array.isArray(r))for(n=0,o=r.length;n<o;n+=1)mn(r[n],t,e);else for(i=Object.keys(r),n=0,o=i.length;n<o;n+=1)mn(r[i[n]],t,e)}g(mn,"inspectNode");function x1(r,t){t=t||{};var e=new ld(t);e.noRefs||wd(r,e);var i=r;return e.replacer&&(i=e.replacer.call({"":i},"",i)),ar(e,0,i,!0,!0)?e.dump+`
`:""}g(x1,"dump$1");function b1(r,t){return function(){throw new Error("Function yaml."+r+" is removed in js-yaml 4. Use yaml."+t+" instead, which is now safe by default.")}}g(b1,"renamed");var k1=uc,w1=Jb.load;/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT *)
*/var Te=g((r,t)=>{if(t)return"translate("+-r.width/2+", "+-r.height/2+")";const e=r.x??0,i=r.y??0;return"translate("+-(e+r.width/2)+", "+-(i+r.height/2)+")"},"computeLabelTransform"),Bt={aggregation:17.25,extension:17.25,composition:17.25,dependency:6,lollipop:13.5,arrow_point:4,arrow_barb:0,arrow_barb_neo:5.5},Ra={arrow_point:4,arrow_cross:12.5,arrow_circle:12.5};function Pe(r,t){if(r===void 0||t===void 0)return{angle:0,deltaX:0,deltaY:0};r=ht(r),t=ht(t);const[e,i]=[r.x,r.y],[n,o]=[t.x,t.y],a=n-e,s=o-i;return{angle:Math.atan(s/a),deltaX:a,deltaY:s}}g(Pe,"calculateDeltaAndAngle");var ht=g(r=>Array.isArray(r)?{x:r[0],y:r[1]}:r,"pointTransformer"),T1=g(r=>({x:g(function(t,e,i){let n=0;const o=ht(i[0]).x<ht(i[i.length-1]).x?"left":"right";if(e===0&&Object.hasOwn(Bt,r.arrowTypeStart)){const{angle:u,deltaX:m}=Pe(i[0],i[1]);n=Bt[r.arrowTypeStart]*Math.cos(u)*(m>=0?1:-1)}else if(e===i.length-1&&Object.hasOwn(Bt,r.arrowTypeEnd)){const{angle:u,deltaX:m}=Pe(i[i.length-1],i[i.length-2]);n=Bt[r.arrowTypeEnd]*Math.cos(u)*(m>=0?1:-1)}const a=Math.abs(ht(t).x-ht(i[i.length-1]).x),s=Math.abs(ht(t).y-ht(i[i.length-1]).y),l=Math.abs(ht(t).x-ht(i[0]).x),h=Math.abs(ht(t).y-ht(i[0]).y),c=Bt[r.arrowTypeStart],d=Bt[r.arrowTypeEnd],p=1;if(a<d&&a>0&&s<d){let u=d+p-a;u*=o==="right"?-1:1,n-=u}if(l<c&&l>0&&h<c){let u=c+p-l;u*=o==="right"?-1:1,n+=u}return ht(t).x+n},"x"),y:g(function(t,e,i){let n=0;const o=ht(i[0]).y<ht(i[i.length-1]).y?"down":"up";if(e===0&&Object.hasOwn(Bt,r.arrowTypeStart)){const{angle:u,deltaY:m}=Pe(i[0],i[1]);n=Bt[r.arrowTypeStart]*Math.abs(Math.sin(u))*(m>=0?1:-1)}else if(e===i.length-1&&Object.hasOwn(Bt,r.arrowTypeEnd)){const{angle:u,deltaY:m}=Pe(i[i.length-1],i[i.length-2]);n=Bt[r.arrowTypeEnd]*Math.abs(Math.sin(u))*(m>=0?1:-1)}const a=Math.abs(ht(t).y-ht(i[i.length-1]).y),s=Math.abs(ht(t).x-ht(i[i.length-1]).x),l=Math.abs(ht(t).y-ht(i[0]).y),h=Math.abs(ht(t).x-ht(i[0]).x),c=Bt[r.arrowTypeStart],d=Bt[r.arrowTypeEnd],p=1;if(a<d&&a>0&&s<d){let u=d+p-a;u*=o==="up"?-1:1,n-=u}if(l<c&&l>0&&h<c){let u=c+p-l;u*=o==="up"?-1:1,n+=u}return ht(t).y+n},"y")}),"getLineFunctionsWithOffset"),Td={},Ct={};Object.defineProperty(Ct,"__esModule",{value:!0});Ct.BLANK_URL=Ct.relativeFirstCharacters=Ct.whitespaceEscapeCharsRegex=Ct.urlSchemeRegex=Ct.ctrlCharactersRegex=Ct.htmlCtrlEntityRegex=Ct.htmlEntitiesRegex=Ct.invalidProtocolRegex=void 0;Ct.invalidProtocolRegex=/^([^\w]*)(javascript|data|vbscript)/im;Ct.htmlEntitiesRegex=/&#(\w+)(^\w|;)?/g;Ct.htmlCtrlEntityRegex=/&(newline|tab);/gi;Ct.ctrlCharactersRegex=/[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;Ct.urlSchemeRegex=/^.+(:|&colon;)/gim;Ct.whitespaceEscapeCharsRegex=/(\\|%5[cC])((%(6[eE]|72|74))|[nrt])/g;Ct.relativeFirstCharacters=[".","/"];Ct.BLANK_URL="about:blank";Object.defineProperty(Td,"__esModule",{value:!0});var v1=Td.sanitizeUrl=L1,_t=Ct;function S1(r){return _t.relativeFirstCharacters.indexOf(r[0])>-1}function _1(r){var t=r.replace(_t.ctrlCharactersRegex,"");return t.replace(_t.htmlEntitiesRegex,function(e,i){return String.fromCharCode(i)})}function B1(r){return URL.canParse(r)}function Oa(r){try{return decodeURIComponent(r)}catch{return r}}function L1(r){if(!r)return _t.BLANK_URL;var t,e=Oa(r.trim());do e=_1(e).replace(_t.htmlCtrlEntityRegex,"").replace(_t.ctrlCharactersRegex,"").replace(_t.whitespaceEscapeCharsRegex,"").trim(),e=Oa(e),t=e.match(_t.ctrlCharactersRegex)||e.match(_t.htmlEntitiesRegex)||e.match(_t.htmlCtrlEntityRegex)||e.match(_t.whitespaceEscapeCharsRegex);while(t&&t.length>0);var i=e;if(!i)return _t.BLANK_URL;if(S1(i))return i;var n=i.trimStart(),o=n.match(_t.urlSchemeRegex);if(!o)return i;var a=o[0].toLowerCase().trim();if(_t.invalidProtocolRegex.test(a))return _t.BLANK_URL;var s=n.replace(/\\/g,"/");if(a==="mailto:"||a.includes("://"))return s;if(a==="http:"||a==="https:"){if(!B1(s))return _t.BLANK_URL;var l=new URL(s);return l.protocol=l.protocol.toLowerCase(),l.hostname=l.hostname.toLowerCase(),l.toString()}return s}var F1="​",M1={curveBasis:So,curveBasisClosed:ab,curveBasisOpen:lb,curveBumpX:kh,curveBumpY:wh,curveBundle:hb,curveCardinalClosed:cb,curveCardinalOpen:db,curveCardinal:_h,curveCatmullRomClosed:ub,curveCatmullRomOpen:pb,curveCatmullRom:Lh,curveLinear:ze,curveLinearClosed:gb,curveMonotoneX:Dh,curveMonotoneY:Ih,curveNatural:Oh,curveStep:$h,curveStepAfter:zh,curveStepBefore:Wh},A1=/\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi,E1=g(function(r,t){const e=vd(r,/(?:init\b)|(?:initialize\b)/);let i={};if(Array.isArray(e)){const a=e.map(s=>s.args);Ki(a),i=ft(i,[...a])}else i=e.args;if(!i)return;let n=as(r,t);const o="config";return i[o]!==void 0&&(n==="flowchart-v2"&&(n="flowchart"),i[n]=i[o],delete i[o]),i},"detectInit"),vd=g(function(r,t=null){var e,i;try{const n=new RegExp(`[%]{2}(?![{]${A1.source})(?=[}][%]{2}).*
`,"ig");r=r.trim().replace(n,"").replace(/'/gm,'"'),P.debug(`Detecting diagram directive${t!==null?" type:"+t:""} based on the text:${r}`);let o;const a=[];for(;(o=$e.exec(r))!==null;)if(o.index===$e.lastIndex&&$e.lastIndex++,o&&!t||t&&((e=o[1])!=null&&e.match(t))||t&&((i=o[2])!=null&&i.match(t))){const s=o[1]?o[1]:o[2],l=o[3]?o[3].trim():o[4]?JSON.parse(o[4].trim()):null;a.push({type:s,args:l})}return a.length===0?{type:r,args:null}:a.length===1?a[0]:a}catch(n){return P.error(`ERROR: ${n.message} - Unable to parse directive type: '${t}' based on the text: '${r}'`),{type:void 0,args:null}}},"detectDirective"),P1=g(function(r){return r.replace($e,"")},"removeDirectives"),D1=g(function(r,t){for(const[e,i]of t.entries())if(i.match(r))return e;return-1},"isSubstringInArray");function Ps(r,t){if(!r)return t;const e=`curve${r.charAt(0).toUpperCase()+r.slice(1)}`;return M1[e]??t}g(Ps,"interpolateToCurve");function Sd(r,t){const e=r.trim();if(e)return t.securityLevel!=="loose"?v1(e):e}g(Sd,"formatUrl");var I1=g((r,...t)=>{const e=r.split("."),i=e.length-1,n=e[i];let o=window;for(let a=0;a<i;a++)if(o=o[e[a]],!o){P.error(`Function name: ${r} not found in window`);return}o[n](...t)},"runFunc");function Ds(r,t){return!r||!t?0:Math.sqrt(Math.pow(t.x-r.x,2)+Math.pow(t.y-r.y,2))}g(Ds,"distance");function _d(r){let t,e=0;r.forEach(n=>{e+=Ds(n,t),t=n});const i=e/2;return Is(r,i)}g(_d,"traverseEdge");function Bd(r){return r.length===1?r[0]:_d(r)}g(Bd,"calcLabelPosition");var $a=g((r,t=2)=>{const e=Math.pow(10,t);return Math.round(r*e)/e},"roundNumber"),Is=g((r,t)=>{let e,i=t;for(const n of r){if(e){const o=Ds(n,e);if(o===0)return e;if(o<i)i-=o;else{const a=i/o;if(a<=0)return e;if(a>=1)return{x:n.x,y:n.y};if(a>0&&a<1)return{x:$a((1-a)*e.x+a*n.x,5),y:$a((1-a)*e.y+a*n.y,5)}}}e=n}throw new Error("Could not find a suitable point for the given distance")},"calculatePoint"),R1=g((r,t,e)=>{P.info(`our points ${JSON.stringify(t)}`),t[0]!==e&&(t=t.reverse());const n=Is(t,25),o=r?10:5,a=Math.atan2(t[0].y-n.y,t[0].x-n.x),s={x:0,y:0};return s.x=Math.sin(a)*o+(t[0].x+n.x)/2,s.y=-Math.cos(a)*o+(t[0].y+n.y)/2,s},"calcCardinalityPosition");function Ld(r,t,e){const i=structuredClone(e);P.info("our points",i),t!=="start_left"&&t!=="start_right"&&i.reverse();const n=25+r,o=Is(i,n),a=10+r*.5,s=Math.atan2(i[0].y-o.y,i[0].x-o.x),l={x:0,y:0};return t==="start_left"?(l.x=Math.sin(s+Math.PI)*a+(i[0].x+o.x)/2,l.y=-Math.cos(s+Math.PI)*a+(i[0].y+o.y)/2):t==="end_right"?(l.x=Math.sin(s-Math.PI)*a+(i[0].x+o.x)/2-5,l.y=-Math.cos(s-Math.PI)*a+(i[0].y+o.y)/2-5):t==="end_left"?(l.x=Math.sin(s)*a+(i[0].x+o.x)/2-5,l.y=-Math.cos(s)*a+(i[0].y+o.y)/2-5):(l.x=Math.sin(s)*a+(i[0].x+o.x)/2,l.y=-Math.cos(s)*a+(i[0].y+o.y)/2),l}g(Ld,"calcTerminalLabelPosition");function Fd(r){let t="",e="";for(const i of r)i!==void 0&&(i.startsWith("color:")||i.startsWith("text-align:")?e=e+i+";":t=t+i+";");return{style:t,labelStyle:e}}g(Fd,"getStylesFromArray");var Wa=0,O1=g(()=>(Wa++,"id-"+Math.random().toString(36).substr(2,12)+"-"+Wa),"generateId");function Md(r){let t="";const e="0123456789abcdef",i=e.length;for(let n=0;n<r;n++)t+=e.charAt(Math.floor(Math.random()*i));return t}g(Md,"makeRandomHex");var $1=g(r=>Md(r.length),"random"),W1=g(function(){return{x:0,y:0,fill:void 0,anchor:"start",style:"#666",width:100,height:100,textMargin:0,rx:0,ry:0,valign:void 0,text:""}},"getTextObj"),z1=g(function(r,t){const e=t.text.replace(mi.lineBreakRegex," "),[,i]=On(t.fontSize),n=r.append("text");n.attr("x",t.x),n.attr("y",t.y),n.style("text-anchor",t.anchor),n.style("font-family",t.fontFamily),n.style("font-size",i),n.style("font-weight",t.fontWeight),n.attr("fill",t.fill),t.class!==void 0&&n.attr("class",t.class);const o=n.append("tspan");return o.attr("x",t.x+t.textMargin*2),o.attr("fill",t.fill),o.text(e),n},"drawSimpleText"),N1=os((r,t,e)=>{if(!r||(e=Object.assign({fontSize:12,fontWeight:400,fontFamily:"Arial",joinWith:"<br/>"},e),mi.lineBreakRegex.test(r)))return r;const i=r.split(" ").filter(Boolean),n=[];let o="";return i.forEach((a,s)=>{const l=Cr(`${a} `,e),h=Cr(o,e);if(l>t){const{hyphenatedStrings:p,remainingWord:u}=q1(a,t,"-",e);n.push(o,...p),o=u}else h+l>=t?(n.push(o),o=a):o=[o,a].filter(Boolean).join(" ");s+1===i.length&&n.push(o)}),n.filter(a=>a!=="").join(e.joinWith)},(r,t,e)=>`${r}${t}${e.fontSize}${e.fontWeight}${e.fontFamily}${e.joinWith}`),q1=os((r,t,e="-",i)=>{i=Object.assign({fontSize:12,fontWeight:400,fontFamily:"Arial",margin:0},i);const n=[...r],o=[];let a="";return n.forEach((s,l)=>{const h=`${a}${s}`;if(Cr(h,i)>=t){const d=l+1,p=n.length===d,u=`${h}${e}`;o.push(p?h:u),a=""}else a=h}),{hyphenatedStrings:o,remainingWord:a}},(r,t,e="-",i)=>`${r}${t}${e}${i.fontSize}${i.fontWeight}${i.fontFamily}`);function Ad(r,t){return Rs(r,t).height}g(Ad,"calculateTextHeight");function Cr(r,t){return Rs(r,t).width}g(Cr,"calculateTextWidth");var Rs=os((r,t)=>{const{fontSize:e=12,fontFamily:i="Arial",fontWeight:n=400}=t;if(!r)return{width:0,height:0};const[,o]=On(e),a=["sans-serif",i],s=r.split(mi.lineBreakRegex),l=[],h=tt("body");if(!h.remove)return{width:0,height:0,lineHeight:0};const c=h.append("svg");for(const p of a){let u=0;const m={width:0,height:0,lineHeight:0};for(const f of s){const y=W1();y.text=f||F1;const C=z1(c,y).style("font-size",o).style("font-weight",n).style("font-family",p),b=(C._groups||C)[0][0].getBBox();if(b.width===0&&b.height===0)throw new Error("svg element not in render tree");m.width=Math.round(Math.max(m.width,b.width)),u=Math.round(b.height),m.height+=u,m.lineHeight=Math.round(Math.max(m.lineHeight,u))}l.push(m)}c.remove();const d=isNaN(l[1].height)||isNaN(l[1].width)||isNaN(l[1].lineHeight)||l[0].height>l[1].height&&l[0].width>l[1].width&&l[0].lineHeight>l[1].lineHeight?0:1;return l[d]},(r,t)=>`${r}${t.fontSize}${t.fontWeight}${t.fontFamily}`),gi,j1=(gi=class{constructor(t=!1,e){this.count=0,this.count=e?e.length:0,this.next=t?()=>this.count++:()=>Date.now()}},g(gi,"InitIDGenerator"),gi),Ai,H1=g(function(r){return Ai=Ai||document.createElement("div"),r=escape(r).replace(/%26/g,"&").replace(/%23/g,"#").replace(/%3B/g,";"),Ai.innerHTML=r,unescape(Ai.textContent)},"entityDecode");function Os(r){return"str"in r}g(Os,"isDetailedError");var U1=g((r,t,e,i)=>{var o;if(!i)return;const n=(o=r.node())==null?void 0:o.getBBox();n&&r.append("text").text(i).attr("text-anchor","middle").attr("x",n.x+n.width/2).attr("y",-e).attr("class",t)},"insertTitle"),On=g(r=>{if(typeof r=="number")return[r,r+"px"];const t=parseInt(r??"",10);return Number.isNaN(t)?[void 0,void 0]:r===String(t)?[t,r+"px"]:[t,r]},"parseFontSize");function $s(r,t){return Gg({},r,t)}g($s,"cleanAndMerge");var Kt={assignWithDepth:ft,wrapLabel:N1,calculateTextHeight:Ad,calculateTextWidth:Cr,calculateTextDimensions:Rs,cleanAndMerge:$s,detectInit:E1,detectDirective:vd,isSubstringInArray:D1,interpolateToCurve:Ps,calcLabelPosition:Bd,calcCardinalityPosition:R1,calcTerminalLabelPosition:Ld,formatUrl:Sd,getStylesFromArray:Fd,generateId:O1,random:$1,runFunc:I1,entityDecode:H1,insertTitle:U1,isLabelCoordinateInPath:Ed,parseFontSize:On,InitIDGenerator:j1},G1=g(function(r){let t=r;return t=t.replace(/style.*:\S*#.*;/g,function(e){return e.substring(0,e.length-1)}),t=t.replace(/classDef.*:\S*#.*;/g,function(e){return e.substring(0,e.length-1)}),t=t.replace(/#\w+;/g,function(e){const i=e.substring(1,e.length-1);return/^\+?\d+$/.test(i)?"ﬂ°°"+i+"¶ß":"ﬂ°"+i+"¶ß"}),t},"encodeEntities"),Xr=g(function(r){return r.replace(/ﬂ°°/g,"&#").replace(/ﬂ°/g,"&").replace(/¶ß/g,";")},"decodeEntities"),E_=g((r,t,{counter:e=0,prefix:i,suffix:n},o)=>o||`${i?`${i}_`:""}${r}_${t}_${e}${n?`_${n}`:""}`,"getEdgeId");function xt(r){return r??null}g(xt,"handleUndefinedAttr");function Ed(r,t){const e=Math.round(r.x),i=Math.round(r.y),n=t.replace(/(\d+\.\d+)/g,o=>Math.round(parseFloat(o)).toString());return n.includes(e.toString())||n.includes(i.toString())}g(Ed,"isLabelCoordinateInPath");var Ws=g(({flowchart:r})=>{var n,o;const t=((n=r==null?void 0:r.subGraphTitleMargin)==null?void 0:n.top)??0,e=((o=r==null?void 0:r.subGraphTitleMargin)==null?void 0:o.bottom)??0,i=t+e;return{subGraphTitleTopMargin:t,subGraphTitleBottomMargin:e,subGraphTitleTotalMargin:i}},"getSubGraphTitleMargins");async function Pd(r,t){const e=r.getElementsByTagName("img");if(!e||e.length===0)return;const i=t.replace(/<img[^>]*>/g,"").trim()==="";await Promise.all([...e].map(n=>new Promise(o=>{function a(){if(n.style.display="flex",n.style.flexDirection="column",i){const s=ot().fontSize?ot().fontSize:window.getComputedStyle(document.body).fontSize,l=5,[h=Dl.fontSize]=On(s),c=h*l+"px";n.style.minWidth=c,n.style.maxWidth=c}else n.style.width="100%";o(n)}g(a,"setupImage"),setTimeout(()=>{n.complete&&a()}),n.addEventListener("error",a),n.addEventListener("load",a)})))}g(Pd,"configureLabelImages");var V1=g(r=>{const{handDrawnSeed:t}=ot();return{fill:r,hachureAngle:120,hachureGap:4,fillWeight:2,roughness:.7,stroke:r,seed:t}},"solidStateFill"),Ce=g(r=>{const t=Y1([...r.cssCompiledStyles||[],...r.cssStyles||[],...r.labelStyle||[]]);return{stylesMap:t,stylesArray:[...t]}},"compileStyles"),Y1=g(r=>{const t=new Map;return r.forEach(e=>{const[i,n]=e.split(":");t.set(i.trim(),n==null?void 0:n.trim())}),t},"styles2Map"),Dd=g(r=>r==="color"||r==="font-size"||r==="font-family"||r==="font-weight"||r==="font-style"||r==="text-decoration"||r==="text-align"||r==="text-transform"||r==="line-height"||r==="letter-spacing"||r==="word-spacing"||r==="text-shadow"||r==="text-overflow"||r==="white-space"||r==="word-wrap"||r==="word-break"||r==="overflow-wrap"||r==="hyphens","isLabelStyle"),H=g(r=>{const{stylesArray:t}=Ce(r),e=[],i=[],n=[],o=[];return t.forEach(a=>{const s=a[0];Dd(s)?e.push(a.join(":")+" !important"):(i.push(a.join(":")+" !important"),s.includes("stroke")&&n.push(a.join(":")+" !important"),s==="fill"&&o.push(a.join(":")+" !important"))}),{labelStyles:e.join(";"),nodeStyles:i.join(";"),stylesArray:t,borderStyles:n,backgroundStyles:o}},"styles2String"),j=g((r,t)=>{var l;const{themeVariables:e,handDrawnSeed:i}=ot(),{nodeBorder:n,mainBkg:o}=e,{stylesMap:a}=Ce(r);return Object.assign({roughness:.7,fill:a.get("fill")||o,fillStyle:"hachure",fillWeight:4,hachureGap:5.2,stroke:a.get("stroke")||n,seed:i,strokeWidth:((l=a.get("stroke-width"))==null?void 0:l.replace("px",""))||1.3,fillLineDash:[0,0],strokeLineDash:X1(a.get("stroke-dasharray"))},t)},"userNodeOverrides"),X1=g(r=>{if(!r)return[0,0];const t=r.trim().split(/\s+/).map(Number);if(t.length===1){const n=isNaN(t[0])?0:t[0];return[n,n]}const e=isNaN(t[0])?0:t[0],i=isNaN(t[1])?0:t[1];return[e,i]},"getStrokeDashArray");const K1=Object.freeze({left:0,top:0,width:16,height:16}),yn=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),Id=Object.freeze({...K1,...yn}),Z1=Object.freeze({...Id,body:"",hidden:!1}),Q1=Object.freeze({width:null,height:null}),J1=Object.freeze({...Q1,...yn}),tk=(r,t,e,i="")=>{const n=r.split(":");if(r.slice(0,1)==="@"){if(n.length<2||n.length>3)return null;i=n.shift().slice(1)}if(n.length>3||!n.length)return null;if(n.length>1){const s=n.pop(),l=n.pop(),h={provider:n.length>0?n[0]:i,prefix:l,name:s};return t&&!to(h)?null:h}const o=n[0],a=o.split("-");if(a.length>1){const s={provider:i,prefix:a.shift(),name:a.join("-")};return t&&!to(s)?null:s}if(e&&i===""){const s={provider:i,prefix:"",name:o};return t&&!to(s,e)?null:s}return null},to=(r,t)=>r?!!((t&&r.prefix===""||r.prefix)&&r.name):!1;function rk(r,t){const e={};!r.hFlip!=!t.hFlip&&(e.hFlip=!0),!r.vFlip!=!t.vFlip&&(e.vFlip=!0);const i=((r.rotate||0)+(t.rotate||0))%4;return i&&(e.rotate=i),e}function za(r,t){const e=rk(r,t);for(const i in Z1)i in yn?i in r&&!(i in e)&&(e[i]=yn[i]):i in t?e[i]=t[i]:i in r&&(e[i]=r[i]);return e}function ek(r,t){const e=r.icons,i=r.aliases||Object.create(null),n=Object.create(null);function o(a){if(e[a])return n[a]=[];if(!(a in n)){n[a]=null;const s=i[a]&&i[a].parent,l=s&&o(s);l&&(n[a]=[s].concat(l))}return n[a]}return(t||Object.keys(e).concat(Object.keys(i))).forEach(o),n}function Na(r,t,e){const i=r.icons,n=r.aliases||Object.create(null);let o={};function a(s){o=za(i[s]||n[s],o)}return a(t),e.forEach(a),za(r,o)}function ik(r,t){if(r.icons[t])return Na(r,t,[]);const e=ek(r,[t])[t];return e?Na(r,t,e):null}const nk=/(-?[0-9.]*[0-9]+[0-9.]*)/g,ok=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function qa(r,t,e){if(t===1)return r;if(e=e||100,typeof r=="number")return Math.ceil(r*t*e)/e;if(typeof r!="string")return r;const i=r.split(nk);if(i===null||!i.length)return r;const n=[];let o=i.shift(),a=ok.test(o);for(;;){if(a){const s=parseFloat(o);isNaN(s)?n.push(o):n.push(Math.ceil(s*t*e)/e)}else n.push(o);if(o=i.shift(),o===void 0)return n.join("");a=!a}}function sk(r,t="defs"){let e="";const i=r.indexOf("<"+t);for(;i>=0;){const n=r.indexOf(">",i),o=r.indexOf("</"+t);if(n===-1||o===-1)break;const a=r.indexOf(">",o);if(a===-1)break;e+=r.slice(n+1,o).trim(),r=r.slice(0,i).trim()+r.slice(a+1)}return{defs:e,content:r}}function ak(r,t){return r?"<defs>"+r+"</defs>"+t:t}function lk(r,t,e){const i=sk(r);return ak(i.defs,t+i.content+e)}const hk=r=>r==="unset"||r==="undefined"||r==="none";function ck(r,t){const e={...Id,...r},i={...J1,...t},n={left:e.left,top:e.top,width:e.width,height:e.height};let o=e.body;[e,i].forEach(f=>{const y=[],C=f.hFlip,b=f.vFlip;let k=f.rotate;C?b?k+=2:(y.push("translate("+(n.width+n.left).toString()+" "+(0-n.top).toString()+")"),y.push("scale(-1 1)"),n.top=n.left=0):b&&(y.push("translate("+(0-n.left).toString()+" "+(n.height+n.top).toString()+")"),y.push("scale(1 -1)"),n.top=n.left=0);let T;switch(k<0&&(k-=Math.floor(k/4)*4),k=k%4,k){case 1:T=n.height/2+n.top,y.unshift("rotate(90 "+T.toString()+" "+T.toString()+")");break;case 2:y.unshift("rotate(180 "+(n.width/2+n.left).toString()+" "+(n.height/2+n.top).toString()+")");break;case 3:T=n.width/2+n.left,y.unshift("rotate(-90 "+T.toString()+" "+T.toString()+")");break}k%2===1&&(n.left!==n.top&&(T=n.left,n.left=n.top,n.top=T),n.width!==n.height&&(T=n.width,n.width=n.height,n.height=T)),y.length&&(o=lk(o,'<g transform="'+y.join(" ")+'">',"</g>"))});const a=i.width,s=i.height,l=n.width,h=n.height;let c,d;a===null?(d=s===null?"1em":s==="auto"?h:s,c=qa(d,l/h)):(c=a==="auto"?l:a,d=s===null?qa(c,h/l):s==="auto"?h:s);const p={},u=(f,y)=>{hk(y)||(p[f]=y.toString())};u("width",c),u("height",d);const m=[n.left,n.top,l,h];return p.viewBox=m.join(" "),{attributes:p,viewBox:m,body:o}}const dk=/\sid="(\S+)"/g,ja=new Map;function uk(r){r=r.replace(/[0-9]+$/,"")||"a";const t=ja.get(r)||0;return ja.set(r,t+1),t?`${r}${t}`:r}function pk(r){const t=[];let e;for(;e=dk.exec(r);)t.push(e[1]);if(!t.length)return r;const i="suffix"+(Math.random()*16777216|Date.now()).toString(16);return t.forEach(n=>{const o=uk(n),a=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");r=r.replace(new RegExp('([#;"])('+a+')([")]|\\.[a-z])',"g"),"$1"+o+i+"$3")}),r=r.replace(new RegExp(i,"g"),""),r}function gk(r,t){let e=r.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const i in t)e+=" "+i+'="'+t[i]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+e+">"+r+"</svg>"}function zs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Qr=zs();function Rd(r){Qr=r}var Ne={exec:()=>null};function st(r,t=""){let e=typeof r=="string"?r:r.source,i={replace:(n,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Et.caret,"$1"),e=e.replace(n,a),i},getRegex:()=>new RegExp(e,t)};return i}var fk=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Et={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:r=>new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:r=>new RegExp(`^ {0,${Math.min(3,r-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:r=>new RegExp(`^ {0,${Math.min(3,r-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:r=>new RegExp(`^ {0,${Math.min(3,r-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:r=>new RegExp(`^ {0,${Math.min(3,r-1)}}#`),htmlBeginRegex:r=>new RegExp(`^ {0,${Math.min(3,r-1)}}<(?:[a-z].*>|!--)`,"i")},mk=/^(?:[ \t]*(?:\n|$))+/,yk=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ck=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,bi=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,xk=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ns=/(?:[*+-]|\d{1,9}[.)])/,Od=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,$d=st(Od).replace(/bull/g,Ns).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),bk=st(Od).replace(/bull/g,Ns).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),qs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,kk=/^[^\n]+/,js=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,wk=st(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",js).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Tk=st(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ns).getRegex(),$n="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Hs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,vk=st("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Hs).replace("tag",$n).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Wd=st(qs).replace("hr",bi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$n).getRegex(),Sk=st(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Wd).getRegex(),Us={blockquote:Sk,code:yk,def:wk,fences:Ck,heading:xk,hr:bi,html:vk,lheading:$d,list:Tk,newline:mk,paragraph:Wd,table:Ne,text:kk},Ha=st("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",bi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$n).getRegex(),_k={...Us,lheading:bk,table:Ha,paragraph:st(qs).replace("hr",bi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ha).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$n).getRegex()},Bk={...Us,html:st(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Hs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ne,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:st(qs).replace("hr",bi).replace("heading",` *#{1,6} *[^
]`).replace("lheading",$d).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Lk=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Fk=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,zd=/^( {2,}|\\)\n(?!\s*$)/,Mk=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Wn=/[\p{P}\p{S}]/u,Gs=/[\s\p{P}\p{S}]/u,Nd=/[^\s\p{P}\p{S}]/u,Ak=st(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Gs).getRegex(),qd=/(?!~)[\p{P}\p{S}]/u,Ek=/(?!~)[\s\p{P}\p{S}]/u,Pk=/(?:[^\s\p{P}\p{S}]|~)/u,Dk=st(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",fk?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),jd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ik=st(jd,"u").replace(/punct/g,Wn).getRegex(),Rk=st(jd,"u").replace(/punct/g,qd).getRegex(),Hd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ok=st(Hd,"gu").replace(/notPunctSpace/g,Nd).replace(/punctSpace/g,Gs).replace(/punct/g,Wn).getRegex(),$k=st(Hd,"gu").replace(/notPunctSpace/g,Pk).replace(/punctSpace/g,Ek).replace(/punct/g,qd).getRegex(),Wk=st("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Nd).replace(/punctSpace/g,Gs).replace(/punct/g,Wn).getRegex(),zk=st(/\\(punct)/,"gu").replace(/punct/g,Wn).getRegex(),Nk=st(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),qk=st(Hs).replace("(?:-->|$)","-->").getRegex(),jk=st("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",qk).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Cn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Hk=st(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Cn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ud=st(/^!?\[(label)\]\[(ref)\]/).replace("label",Cn).replace("ref",js).getRegex(),Gd=st(/^!?\[(ref)\](?:\[\])?/).replace("ref",js).getRegex(),Uk=st("reflink|nolink(?!\\()","g").replace("reflink",Ud).replace("nolink",Gd).getRegex(),Ua=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Vs={_backpedal:Ne,anyPunctuation:zk,autolink:Nk,blockSkip:Dk,br:zd,code:Fk,del:Ne,emStrongLDelim:Ik,emStrongRDelimAst:Ok,emStrongRDelimUnd:Wk,escape:Lk,link:Hk,nolink:Gd,punctuation:Ak,reflink:Ud,reflinkSearch:Uk,tag:jk,text:Mk,url:Ne},Gk={...Vs,link:st(/^!?\[(label)\]\((.*?)\)/).replace("label",Cn).getRegex(),reflink:st(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Cn).getRegex()},No={...Vs,emStrongRDelimAst:$k,emStrongLDelim:Rk,url:st(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ua).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:st(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ua).getRegex()},Vk={...No,br:st(zd).replace("{2,}","*").getRegex(),text:st(No.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ei={normal:Us,gfm:_k,pedantic:Bk},ve={normal:Vs,gfm:No,breaks:Vk,pedantic:Gk},Yk={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ga=r=>Yk[r];function er(r,t){if(t){if(Et.escapeTest.test(r))return r.replace(Et.escapeReplace,Ga)}else if(Et.escapeTestNoEncode.test(r))return r.replace(Et.escapeReplaceNoEncode,Ga);return r}function Va(r){try{r=encodeURI(r).replace(Et.percentDecode,"%")}catch{return null}return r}function Ya(r,t){var o;let e=r.replace(Et.findPipe,(a,s,l)=>{let h=!1,c=s;for(;--c>=0&&l[c]==="\\";)h=!h;return h?"|":" |"}),i=e.split(Et.splitPipe),n=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;n<i.length;n++)i[n]=i[n].trim().replace(Et.slashPipe,"|");return i}function Se(r,t,e){let i=r.length;if(i===0)return"";let n=0;for(;n<i;){let o=r.charAt(i-n-1);if(o===t&&!e)n++;else if(o!==t&&e)n++;else break}return r.slice(0,i-n)}function Xk(r,t){if(r.indexOf(t[1])===-1)return-1;let e=0;for(let i=0;i<r.length;i++)if(r[i]==="\\")i++;else if(r[i]===t[0])e++;else if(r[i]===t[1]&&(e--,e<0))return i;return e>0?-2:-1}function Xa(r,t,e,i,n){let o=t.href,a=t.title||null,s=r[1].replace(n.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:r[0].charAt(0)==="!"?"image":"link",raw:e,href:o,title:a,text:s,tokens:i.inlineTokens(s)};return i.state.inLink=!1,l}function Kk(r,t,e){let i=r.match(e.other.indentCodeCompensation);if(i===null)return t;let n=i[1];return t.split(`
`).map(o=>{let a=o.match(e.other.beginningSpace);if(a===null)return o;let[s]=a;return s.length>=n.length?o.slice(n.length):o}).join(`
`)}var xn=class{constructor(t){lt(this,"options");lt(this,"rules");lt(this,"lexer");this.options=t||Qr}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let i=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?i:Se(i,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let i=e[0],n=Kk(i,e[3]||"",this.rules);return{type:"code",raw:i,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let i=e[2].trim();if(this.rules.other.endingHash.test(i)){let n=Se(i,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(i=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:i,tokens:this.lexer.inline(i)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Se(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let i=Se(e[0],`
`).split(`
`),n="",o="",a=[];for(;i.length>0;){let s=!1,l=[],h;for(h=0;h<i.length;h++)if(this.rules.other.blockquoteStart.test(i[h]))l.push(i[h]),s=!0;else if(!s)l.push(i[h]);else break;i=i.slice(h);let c=l.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,o=o?`${o}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=p,i.length===0)break;let u=a.at(-1);if((u==null?void 0:u.type)==="code")break;if((u==null?void 0:u.type)==="blockquote"){let m=u,f=m.raw+`
`+i.join(`
`),y=this.blockquote(f);a[a.length-1]=y,n=n.substring(0,n.length-m.raw.length)+y.raw,o=o.substring(0,o.length-m.text.length)+y.text;break}else if((u==null?void 0:u.type)==="list"){let m=u,f=m.raw+`
`+i.join(`
`),y=this.list(f);a[a.length-1]=y,n=n.substring(0,n.length-u.raw.length)+y.raw,o=o.substring(0,o.length-m.raw.length)+y.raw,i=f.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:a,text:o}}}list(t){let e=this.rules.block.list.exec(t);if(e){let i=e[1].trim(),n=i.length>1,o={type:"list",raw:"",ordered:n,start:n?+i.slice(0,-1):"",loose:!1,items:[]};i=n?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=n?i:"[*+-]");let a=this.rules.other.listItemRegex(i),s=!1;for(;t;){let h=!1,c="",d="";if(!(e=a.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let p=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,b=>" ".repeat(3*b.length)),u=t.split(`
`,1)[0],m=!p.trim(),f=0;if(this.options.pedantic?(f=2,d=p.trimStart()):m?f=e[1].length+1:(f=e[2].search(this.rules.other.nonSpaceChar),f=f>4?1:f,d=p.slice(f),f+=e[1].length),m&&this.rules.other.blankLine.test(u)&&(c+=u+`
`,t=t.substring(u.length+1),h=!0),!h){let b=this.rules.other.nextBulletRegex(f),k=this.rules.other.hrRegex(f),T=this.rules.other.fencesBeginRegex(f),v=this.rules.other.headingBeginRegex(f),_=this.rules.other.htmlBeginRegex(f);for(;t;){let w=t.split(`
`,1)[0],S;if(u=w,this.options.pedantic?(u=u.replace(this.rules.other.listReplaceNesting,"  "),S=u):S=u.replace(this.rules.other.tabCharGlobal,"    "),T.test(u)||v.test(u)||_.test(u)||b.test(u)||k.test(u))break;if(S.search(this.rules.other.nonSpaceChar)>=f||!u.trim())d+=`
`+S.slice(f);else{if(m||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||T.test(p)||v.test(p)||k.test(p))break;d+=`
`+u}!m&&!u.trim()&&(m=!0),c+=w+`
`,t=t.substring(w.length+1),p=S.slice(f)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(s=!0));let y=null,C;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&(C=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:c,task:!!y,checked:C,loose:!1,text:d,tokens:[]}),o.raw+=c}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let h=0;h<o.items.length;h++)if(this.lexer.state.top=!1,o.items[h].tokens=this.lexer.blockTokens(o.items[h].text,[]),!o.loose){let c=o.items[h].tokens.filter(p=>p.type==="space"),d=c.length>0&&c.some(p=>this.rules.other.anyLine.test(p.raw));o.loose=d}if(o.loose)for(let h=0;h<o.items.length;h++)o.items[h].loose=!0;return o}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let i=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:i,raw:e[0],href:n,title:o}}}table(t){var s;let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let i=Ya(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=(s=e[3])!=null&&s.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:e[0],header:[],align:[],rows:[]};if(i.length===n.length){for(let l of n)this.rules.other.tableAlignRight.test(l)?a.align.push("right"):this.rules.other.tableAlignCenter.test(l)?a.align.push("center"):this.rules.other.tableAlignLeft.test(l)?a.align.push("left"):a.align.push(null);for(let l=0;l<i.length;l++)a.header.push({text:i[l],tokens:this.lexer.inline(i[l]),header:!0,align:a.align[l]});for(let l of o)a.rows.push(Ya(l,a.header.length).map((h,c)=>({text:h,tokens:this.lexer.inline(h),header:!1,align:a.align[c]})));return a}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let i=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:i,tokens:this.lexer.inline(i)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let i=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(i)){if(!this.rules.other.endAngleBracket.test(i))return;let a=Se(i.slice(0,-1),"\\");if((i.length-a.length)%2===0)return}else{let a=Xk(e[2],"()");if(a===-2)return;if(a>-1){let s=(e[0].indexOf("!")===0?5:4)+e[1].length+a;e[2]=e[2].substring(0,a),e[0]=e[0].substring(0,s).trim(),e[3]=""}}let n=e[2],o="";if(this.options.pedantic){let a=this.rules.other.pedanticHrefTitle.exec(n);a&&(n=a[1],o=a[3])}else o=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(i)?n=n.slice(1):n=n.slice(1,-1)),Xa(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let i;if((i=this.rules.inline.reflink.exec(t))||(i=this.rules.inline.nolink.exec(t))){let n=(i[2]||i[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=e[n.toLowerCase()];if(!o){let a=i[0].charAt(0);return{type:"text",raw:a,text:a}}return Xa(i,o,i[0],this.lexer,this.rules)}}emStrong(t,e,i=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&i.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!i||this.rules.inline.punctuation.exec(i))){let o=[...n[0]].length-1,a,s,l=o,h=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+o);(n=c.exec(e))!=null;){if(a=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!a)continue;if(s=[...a].length,n[3]||n[4]){l+=s;continue}else if((n[5]||n[6])&&o%3&&!((o+s)%3)){h+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+h);let d=[...n[0]][0].length,p=t.slice(0,o+n.index+d+s);if(Math.min(o,s)%2){let m=p.slice(1,-1);return{type:"em",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}let u=p.slice(2,-2);return{type:"strong",raw:p,text:u,tokens:this.lexer.inlineTokens(u)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let i=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(i),o=this.rules.other.startingSpaceChar.test(i)&&this.rules.other.endingSpaceChar.test(i);return n&&o&&(i=i.substring(1,i.length-1)),{type:"codespan",raw:e[0],text:i}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let i,n;return e[2]==="@"?(i=e[1],n="mailto:"+i):(i=e[1],n=i),{type:"link",raw:e[0],text:i,href:n,tokens:[{type:"text",raw:i,text:i}]}}}url(t){var i;let e;if(e=this.rules.inline.url.exec(t)){let n,o;if(e[2]==="@")n=e[0],o="mailto:"+n;else{let a;do a=e[0],e[0]=((i=this.rules.inline._backpedal.exec(e[0]))==null?void 0:i[0])??"";while(a!==e[0]);n=e[0],e[1]==="www."?o="http://"+e[0]:o=e[0]}return{type:"link",raw:e[0],text:n,href:o,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let i=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:i}}}},Vt=class qo{constructor(t){lt(this,"tokens");lt(this,"options");lt(this,"state");lt(this,"tokenizer");lt(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Qr,this.options.tokenizer=this.options.tokenizer||new xn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let e={other:Et,block:Ei.normal,inline:ve.normal};this.options.pedantic?(e.block=Ei.pedantic,e.inline=ve.pedantic):this.options.gfm&&(e.block=Ei.gfm,this.options.breaks?e.inline=ve.breaks:e.inline=ve.gfm),this.tokenizer.rules=e}static get rules(){return{block:Ei,inline:ve}}static lex(t,e){return new qo(e).lex(t)}static lexInline(t,e){return new qo(e).inlineTokens(t)}lex(t){t=t.replace(Et.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let i=this.inlineQueue[e];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,e=[],i=!1){var n,o,a;for(this.options.pedantic&&(t=t.replace(Et.tabCharGlobal,"    ").replace(Et.spaceLine,""));t;){let s;if((o=(n=this.options.extensions)==null?void 0:n.block)!=null&&o.some(h=>(s=h.call({lexer:this},t,e))?(t=t.substring(s.raw.length),e.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let h=e.at(-1);s.raw.length===1&&h!==void 0?h.raw+=`
`:e.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let h=e.at(-1);(h==null?void 0:h.type)==="paragraph"||(h==null?void 0:h.type)==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+s.raw,h.text+=`
`+s.text,this.inlineQueue.at(-1).src=h.text):e.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let h=e.at(-1);(h==null?void 0:h.type)==="paragraph"||(h==null?void 0:h.type)==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+s.raw,h.text+=`
`+s.raw,this.inlineQueue.at(-1).src=h.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},e.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),e.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),e.push(s);continue}let l=t;if((a=this.options.extensions)!=null&&a.startBlock){let h=1/0,c=t.slice(1),d;this.options.extensions.startBlock.forEach(p=>{d=p.call({lexer:this},c),typeof d=="number"&&d>=0&&(h=Math.min(h,d))}),h<1/0&&h>=0&&(l=t.substring(0,h+1))}if(this.state.top&&(s=this.tokenizer.paragraph(l))){let h=e.at(-1);i&&(h==null?void 0:h.type)==="paragraph"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+s.raw,h.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):e.push(s),i=l.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let h=e.at(-1);(h==null?void 0:h.type)==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+s.raw,h.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):e.push(s);continue}if(t){let h="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return this.state.top=!0,e}inline(t,e=[]){return this.inlineQueue.push({src:t,tokens:e}),e}inlineTokens(t,e=[]){var l,h,c,d,p;let i=t,n=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)u.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,n.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(n=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)o=n[2]?n[2].length:0,i=i.slice(0,n.index+o)+"["+"a".repeat(n[0].length-o-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((h=(l=this.options.hooks)==null?void 0:l.emStrongMask)==null?void 0:h.call({lexer:this},i))??i;let a=!1,s="";for(;t;){a||(s=""),a=!1;let u;if((d=(c=this.options.extensions)==null?void 0:c.inline)!=null&&d.some(f=>(u=f.call({lexer:this},t,e))?(t=t.substring(u.raw.length),e.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let f=e.at(-1);u.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=u.raw,f.text+=u.text):e.push(u);continue}if(u=this.tokenizer.emStrong(t,i,s)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),e.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),e.push(u);continue}let m=t;if((p=this.options.extensions)!=null&&p.startInline){let f=1/0,y=t.slice(1),C;this.options.extensions.startInline.forEach(b=>{C=b.call({lexer:this},y),typeof C=="number"&&C>=0&&(f=Math.min(f,C))}),f<1/0&&f>=0&&(m=t.substring(0,f+1))}if(u=this.tokenizer.inlineText(m)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(s=u.raw.slice(-1)),a=!0;let f=e.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=u.raw,f.text+=u.text):e.push(u);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return e}},bn=class{constructor(t){lt(this,"options");lt(this,"parser");this.options=t||Qr}space(t){return""}code({text:t,lang:e,escaped:i}){var a;let n=(a=(e||"").match(Et.notSpaceStart))==null?void 0:a[0],o=t.replace(Et.endingNewline,"")+`
`;return n?'<pre><code class="language-'+er(n)+'">'+(i?o:er(o,!0))+`</code></pre>
`:"<pre><code>"+(i?o:er(o,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,i=t.start,n="";for(let s=0;s<t.items.length;s++){let l=t.items[s];n+=this.listitem(l)}let o=e?"ol":"ul",a=e&&i!==1?' start="'+i+'"':"";return"<"+o+a+`>
`+n+"</"+o+`>
`}listitem(t){var i;let e="";if(t.task){let n=this.checkbox({checked:!!t.checked});t.loose?((i=t.tokens[0])==null?void 0:i.type)==="paragraph"?(t.tokens[0].text=n+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=n+" "+er(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):e+=n+" "}return e+=this.parser.parse(t.tokens,!!t.loose),`<li>${e}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",i="";for(let o=0;o<t.header.length;o++)i+=this.tablecell(t.header[o]);e+=this.tablerow({text:i});let n="";for(let o=0;o<t.rows.length;o++){let a=t.rows[o];i="";for(let s=0;s<a.length;s++)i+=this.tablecell(a[s]);n+=this.tablerow({text:i})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),i=t.header?"th":"td";return(t.align?`<${i} align="${t.align}">`:`<${i}>`)+e+`</${i}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${er(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:i}){let n=this.parser.parseInline(i),o=Va(t);if(o===null)return n;t=o;let a='<a href="'+t+'"';return e&&(a+=' title="'+er(e)+'"'),a+=">"+n+"</a>",a}image({href:t,title:e,text:i,tokens:n}){n&&(i=this.parser.parseInline(n,this.parser.textRenderer));let o=Va(t);if(o===null)return er(i);t=o;let a=`<img src="${t}" alt="${i}"`;return e&&(a+=` title="${er(e)}"`),a+=">",a}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:er(t.text)}},Ys=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}},Yt=class jo{constructor(t){lt(this,"options");lt(this,"renderer");lt(this,"textRenderer");this.options=t||Qr,this.options.renderer=this.options.renderer||new bn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ys}static parse(t,e){return new jo(e).parse(t)}static parseInline(t,e){return new jo(e).parseInline(t)}parse(t,e=!0){var n,o;let i="";for(let a=0;a<t.length;a++){let s=t[a];if((o=(n=this.options.extensions)==null?void 0:n.renderers)!=null&&o[s.type]){let h=s,c=this.options.extensions.renderers[h.type].call({parser:this},h);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(h.type)){i+=c||"";continue}}let l=s;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"def":{i+=this.renderer.def(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let h=l,c=this.renderer.text(h);for(;a+1<t.length&&t[a+1].type==="text";)h=t[++a],c+=`
`+this.renderer.text(h);e?i+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):i+=c;continue}default:{let h='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(h),"";throw new Error(h)}}}return i}parseInline(t,e=this.renderer){var n,o;let i="";for(let a=0;a<t.length;a++){let s=t[a];if((o=(n=this.options.extensions)==null?void 0:n.renderers)!=null&&o[s.type]){let h=this.options.extensions.renderers[s.type].call({parser:this},s);if(h!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){i+=h||"";continue}}let l=s;switch(l.type){case"escape":{i+=e.text(l);break}case"html":{i+=e.html(l);break}case"link":{i+=e.link(l);break}case"image":{i+=e.image(l);break}case"strong":{i+=e.strong(l);break}case"em":{i+=e.em(l);break}case"codespan":{i+=e.codespan(l);break}case"br":{i+=e.br(l);break}case"del":{i+=e.del(l);break}case"text":{i+=e.text(l);break}default:{let h='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(h),"";throw new Error(h)}}}return i}},$i,De=($i=class{constructor(t){lt(this,"options");lt(this,"block");this.options=t||Qr}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?Vt.lex:Vt.lexInline}provideParser(){return this.block?Yt.parse:Yt.parseInline}},lt($i,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),lt($i,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),$i),Zk=class{constructor(...t){lt(this,"defaults",zs());lt(this,"options",this.setOptions);lt(this,"parse",this.parseMarkdown(!0));lt(this,"parseInline",this.parseMarkdown(!1));lt(this,"Parser",Yt);lt(this,"Renderer",bn);lt(this,"TextRenderer",Ys);lt(this,"Lexer",Vt);lt(this,"Tokenizer",xn);lt(this,"Hooks",De);this.use(...t)}walkTokens(t,e){var n,o;let i=[];for(let a of t)switch(i=i.concat(e.call(this,a)),a.type){case"table":{let s=a;for(let l of s.header)i=i.concat(this.walkTokens(l.tokens,e));for(let l of s.rows)for(let h of l)i=i.concat(this.walkTokens(h.tokens,e));break}case"list":{let s=a;i=i.concat(this.walkTokens(s.items,e));break}default:{let s=a;(o=(n=this.defaults.extensions)==null?void 0:n.childTokens)!=null&&o[s.type]?this.defaults.extensions.childTokens[s.type].forEach(l=>{let h=s[l].flat(1/0);i=i.concat(this.walkTokens(h,e))}):s.tokens&&(i=i.concat(this.walkTokens(s.tokens,e)))}}return i}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(i=>{let n={...i};if(n.async=this.defaults.async||n.async||!1,i.extensions&&(i.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let a=e.renderers[o.name];a?e.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=a.apply(this,s)),l}:e.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=e[o.level];a?a.unshift(o.tokenizer):e[o.level]=[o.tokenizer],o.start&&(o.level==="block"?e.startBlock?e.startBlock.push(o.start):e.startBlock=[o.start]:o.level==="inline"&&(e.startInline?e.startInline.push(o.start):e.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(e.childTokens[o.name]=o.childTokens)}),n.extensions=e),i.renderer){let o=this.defaults.renderer||new bn(this.defaults);for(let a in i.renderer){if(!(a in o))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;let s=a,l=i.renderer[s],h=o[s];o[s]=(...c)=>{let d=l.apply(o,c);return d===!1&&(d=h.apply(o,c)),d||""}}n.renderer=o}if(i.tokenizer){let o=this.defaults.tokenizer||new xn(this.defaults);for(let a in i.tokenizer){if(!(a in o))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let s=a,l=i.tokenizer[s],h=o[s];o[s]=(...c)=>{let d=l.apply(o,c);return d===!1&&(d=h.apply(o,c)),d}}n.tokenizer=o}if(i.hooks){let o=this.defaults.hooks||new De;for(let a in i.hooks){if(!(a in o))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;let s=a,l=i.hooks[s],h=o[s];De.passThroughHooks.has(a)?o[s]=c=>{if(this.defaults.async&&De.passThroughHooksRespectAsync.has(a))return(async()=>{let p=await l.call(o,c);return h.call(o,p)})();let d=l.call(o,c);return h.call(o,d)}:o[s]=(...c)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(o,c);return p===!1&&(p=await h.apply(o,c)),p})();let d=l.apply(o,c);return d===!1&&(d=h.apply(o,c)),d}}n.hooks=o}if(i.walkTokens){let o=this.defaults.walkTokens,a=i.walkTokens;n.walkTokens=function(s){let l=[];return l.push(a.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return Vt.lex(t,e??this.defaults)}parser(t,e){return Yt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,i)=>{let n={...i},o={...this.defaults,...n},a=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&n.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=t),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(e):e,l=await(o.hooks?await o.hooks.provideLexer():t?Vt.lex:Vt.lexInline)(s,o),h=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(h,o.walkTokens));let c=await(o.hooks?await o.hooks.provideParser():t?Yt.parse:Yt.parseInline)(h,o);return o.hooks?await o.hooks.postprocess(c):c})().catch(a);try{o.hooks&&(e=o.hooks.preprocess(e));let s=(o.hooks?o.hooks.provideLexer():t?Vt.lex:Vt.lexInline)(e,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():t?Yt.parse:Yt.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return a(s)}}}onError(t,e){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+er(i.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(i);throw i}}},Kr=new Zk;function at(r,t){return Kr.parse(r,t)}at.options=at.setOptions=function(r){return Kr.setOptions(r),at.defaults=Kr.defaults,Rd(at.defaults),at};at.getDefaults=zs;at.defaults=Qr;at.use=function(...r){return Kr.use(...r),at.defaults=Kr.defaults,Rd(at.defaults),at};at.walkTokens=function(r,t){return Kr.walkTokens(r,t)};at.parseInline=Kr.parseInline;at.Parser=Yt;at.parser=Yt.parse;at.Renderer=bn;at.TextRenderer=Ys;at.Lexer=Vt;at.lexer=Vt.lex;at.Tokenizer=xn;at.Hooks=De;at.parse=at;at.options;at.setOptions;at.use;at.walkTokens;at.parseInline;Yt.parse;Vt.lex;function Vd(r){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];var i=Array.from(typeof r=="string"?[r]:r);i[i.length-1]=i[i.length-1].replace(/\r?\n([\t ]*)$/,"");var n=i.reduce(function(s,l){var h=l.match(/\n([\t ]+|(?!\s).)/g);return h?s.concat(h.map(function(c){var d,p;return(p=(d=c.match(/[\t ]/g))===null||d===void 0?void 0:d.length)!==null&&p!==void 0?p:0})):s},[]);if(n.length){var o=new RegExp(`
[	 ]{`+Math.min.apply(Math,n)+"}","g");i=i.map(function(s){return s.replace(o,`
`)})}i[0]=i[0].replace(/^\r?\n/,"");var a=i[0];return t.forEach(function(s,l){var h=a.match(/(?:^|\n)( *)$/),c=h?h[1]:"",d=s;typeof s=="string"&&s.includes(`
`)&&(d=String(s).split(`
`).map(function(p,u){return u===0?p:""+c+p}).join(`
`)),a+=d+i[l+1]}),a}var Qk={body:'<g><rect width="80" height="80" style="fill: #087ebf; stroke-width: 0px;"/><text transform="translate(21.16 64.67)" style="fill: #fff; font-family: ArialMT, Arial; font-size: 67.75px;"><tspan x="0" y="0">?</tspan></text></g>',height:80,width:80},Ho=new Map,Yd=new Map,Jk=g(r=>{for(const t of r){if(!t.name)throw new Error('Invalid icon loader. Must have a "name" property with non-empty string value.');if(P.debug("Registering icon pack:",t.name),"loader"in t)Yd.set(t.name,t.loader);else if("icons"in t)Ho.set(t.name,t.icons);else throw P.error("Invalid icon loader:",t),new Error('Invalid icon loader. Must have either "icons" or "loader" property.')}},"registerIconPacks"),Xd=g(async(r,t)=>{const e=tk(r,!0,t!==void 0);if(!e)throw new Error(`Invalid icon name: ${r}`);const i=e.prefix||t;if(!i)throw new Error(`Icon name must contain a prefix: ${r}`);let n=Ho.get(i);if(!n){const a=Yd.get(i);if(!a)throw new Error(`Icon set not found: ${e.prefix}`);try{n={...await a(),prefix:i},Ho.set(i,n)}catch(s){throw P.error(s),new Error(`Failed to load icon set: ${e.prefix}`)}}const o=ik(n,e.name);if(!o)throw new Error(`Icon not found: ${r}`);return o},"getRegisteredIconData"),t2=g(async r=>{try{return await Xd(r),!0}catch{return!1}},"isIconAvailable"),ki=g(async(r,t,e)=>{let i;try{i=await Xd(r,t==null?void 0:t.fallbackPrefix)}catch(a){P.error(a),i=Qk}const n=ck(i,t),o=gk(pk(n.body),{...n.attributes,...e});return Jt(o,ct())},"getIconSVG");function Kd(r,{markdownAutoWrap:t}){const i=r.replace(/<br\/>/g,`
`).replace(/\n{2,}/g,`
`);return Vd(i)}g(Kd,"preprocessMarkdown");function Zd(r){return r.split(/\\n|\n|<br\s*\/?>/gi).map(t=>{var e;return((e=t.trim().match(/<[^>]+>|[^\s<>]+/g))==null?void 0:e.map(i=>({content:i,type:"normal"})))??[]})}g(Zd,"nonMarkdownToLines");function Qd(r,t={}){const e=Kd(r,t),i=at.lexer(e),n=[[]];let o=0;function a(s,l="normal"){s.type==="text"?s.text.split(`
`).forEach((c,d)=>{d!==0&&(o++,n.push([])),c.split(" ").forEach(p=>{p=p.replace(/&#39;/g,"'"),p&&n[o].push({content:p,type:l})})}):s.type==="strong"||s.type==="em"?s.tokens.forEach(h=>{a(h,s.type)}):s.type==="html"&&n[o].push({content:s.text,type:"normal"})}return g(a,"processNode"),i.forEach(s=>{var l;s.type==="paragraph"?(l=s.tokens)==null||l.forEach(h=>{a(h)}):s.type==="html"?n[o].push({content:s.text,type:"normal"}):n[o].push({content:s.raw,type:"normal"})}),n}g(Qd,"markdownToLines");function Jd(r){return r?`<p>${r.replace(/\\n|\n/g,"<br />")}</p>`:""}g(Jd,"nonMarkdownToHTML");function tu(r,{markdownAutoWrap:t}={}){const e=at.lexer(r);function i(n){var o,a,s;return n.type==="text"?t===!1?n.text.replace(/\n */g,"<br/>").replace(/ /g,"&nbsp;"):n.text.replace(/\n */g,"<br/>"):n.type==="strong"?`<strong>${(o=n.tokens)==null?void 0:o.map(i).join("")}</strong>`:n.type==="em"?`<em>${(a=n.tokens)==null?void 0:a.map(i).join("")}</em>`:n.type==="paragraph"?`<p>${(s=n.tokens)==null?void 0:s.map(i).join("")}</p>`:n.type==="space"?"":n.type==="html"?`${n.text}`:n.type==="escape"?n.text:(P.warn(`Unsupported markdown: ${n.type}`),n.raw)}return g(i,"output"),e.map(i).join("")}g(tu,"markdownToHTML");function ru(r){return Intl.Segmenter?[...new Intl.Segmenter().segment(r)].map(t=>t.segment):[...r]}g(ru,"splitTextToChars");function eu(r,t){const e=ru(t.content);return Xs(r,[],e,t.type)}g(eu,"splitWordToFitWidth");function Xs(r,t,e,i){if(e.length===0)return[{content:t.join(""),type:i},{content:"",type:i}];const[n,...o]=e,a=[...t,n];return r([{content:a.join(""),type:i}])?Xs(r,a,o,i):(t.length===0&&n&&(t.push(n),e.shift()),[{content:t.join(""),type:i},{content:e.join(""),type:i}])}g(Xs,"splitWordToFitWidthRecursion");function iu(r,t){if(r.some(({content:e})=>e.includes(`
`)))throw new Error("splitLineToFitWidth does not support newlines in the line");return kn(r,t)}g(iu,"splitLineToFitWidth");function kn(r,t,e=[],i=[]){if(r.length===0)return i.length>0&&e.push(i),e.length>0?e:[];let n="";r[0].content===" "&&(n=" ",r.shift());const o=r.shift()??{content:" ",type:"normal"},a=[...i];if(n!==""&&a.push({content:n,type:"normal"}),a.push(o),t(a))return kn(r,t,e,a);if(i.length>0)e.push(i),r.unshift(o);else if(o.content){const[s,l]=eu(t,o);e.push([s]),l.content&&r.unshift(l)}return kn(r,t,e)}g(kn,"splitLineToFitWidthRecursion");function Uo(r,t){t&&r.attr("style",t)}g(Uo,"applyStyle");var Ka=16384;async function nu(r,t,e,i,n=!1,o=ct()){const a=r.append("foreignObject");a.attr("width",`${Math.min(10*e,Ka)}px`),a.attr("height",`${Math.min(10*e,Ka)}px`);const s=a.append("xhtml:div"),l=je(t.label)?await jl(t.label.replace(mi.lineBreakRegex,`
`),o):Jt(t.label,o),h=t.isNode?"nodeLabel":"edgeLabel",c=s.append("span");c.html(l),Uo(c,t.labelStyle),c.attr("class",`${h} ${i}`),Uo(s,t.labelStyle),s.style("display","table-cell"),s.style("white-space","nowrap"),s.style("line-height","1.5"),e!==Number.POSITIVE_INFINITY&&(s.style("max-width",e+"px"),s.style("text-align","center")),s.attr("xmlns","http://www.w3.org/1999/xhtml"),n&&s.attr("class","labelBkg");let d=s.node().getBoundingClientRect();return d.width===e&&(s.style("display","table"),s.style("white-space","break-spaces"),s.style("width",e+"px"),d=s.node().getBoundingClientRect()),a.node()}g(nu,"addHtmlSpan");function zn(r,t,e,i=!1){const n=r.append("tspan").attr("class","text-outer-tspan").attr("x",0).attr("y",t*e-.1+"em").attr("dy",e+"em");return i&&n.attr("text-anchor","middle"),n}g(zn,"createTspan");function ou(r,t,e){const i=r.append("text"),n=zn(i,1,t);Nn(n,e);const o=n.node().getComputedTextLength();return i.remove(),o}g(ou,"computeWidthOfText");function r2(r,t,e){var a;const i=r.append("text"),n=zn(i,1,t);Nn(n,[{content:e,type:"normal"}]);const o=(a=n.node())==null?void 0:a.getBoundingClientRect();return o&&i.remove(),o}g(r2,"computeDimensionOfText");function su(r,t,e,i=!1,n=!1){const a=t.append("g"),s=a.insert("rect").attr("class","background").attr("style","stroke: none"),l=a.append("text").attr("y","-10.1");n&&l.attr("text-anchor","middle");let h=0;for(const c of e){const d=g(u=>ou(a,1.1,u)<=r,"checkWidth"),p=d(c)?[c]:iu(c,d);for(const u of p){const m=zn(l,h,1.1,n);Nn(m,u),h++}}if(i){const c=l.node().getBBox(),d=2;return s.attr("x",c.x-d).attr("y",c.y-d).attr("width",c.width+2*d).attr("height",c.height+2*d),a.node()}else return l.node()}g(su,"createFormattedText");function Go(r){const t=/&(amp|lt|gt);/g;return r.replace(t,(e,i)=>{switch(i){case"amp":return"&";case"lt":return"<";case"gt":return">";default:return e}})}g(Go,"decodeHTMLEntities");function Nn(r,t){r.text(""),t.forEach((e,i)=>{const n=r.append("tspan").attr("font-style",e.type==="em"?"italic":"normal").attr("class","text-inner-tspan").attr("font-weight",e.type==="strong"?"bold":"normal");i===0?n.text(Go(e.content)):n.text(" "+Go(e.content))})}g(Nn,"updateTextContentAndStyles");async function au(r,t={}){const e=[];r.replace(/(fa[bklrs]?):fa-([\w-]+)/g,(n,o,a)=>(e.push((async()=>{const s=`${o}:${a}`;return await t2(s)?await ki(s,void 0,{class:"label-icon"}):`<i class='${Jt(n,t).replace(":"," ")}'></i>`})()),n));const i=await Promise.all(e);return r.replace(/(fa[bklrs]?):fa-([\w-]+)/g,()=>i.shift()??"")}g(au,"replaceIconSubstring");var br=g(async(r,t="",{style:e="",isTitle:i=!1,classes:n="",useHtmlLabels:o=!0,markdown:a=!0,isNode:s=!0,width:l=200,addSvgBackground:h=!1}={},c)=>{if(P.debug("XYZ createText",t,e,i,n,o,s,"addSvgBackground: ",h),o){const d=a?tu(t,c):Jd(t),p=await au(Xr(d),c),u=t.replace(/\\\\/g,"\\"),m={isNode:s,label:je(t)?u:p,labelStyle:e.replace("fill:","color:")};return await nu(r,m,l,n,h,c)}else{const d=Xr(t.replace(/<br\s*\/?>/g,"<br/>")),p=a?Qd(d.replace("<br>","<br/>"),c):Zd(d),u=su(l,r,p,t?h:!1,!s);if(s){/stroke:/.exec(e)&&(e=e.replace("stroke:","lineColor:"));const m=e.replace(/stroke:[^;]+;?/g,"").replace(/stroke-width:[^;]+;?/g,"").replace(/fill:[^;]+;?/g,"").replace(/color:/g,"fill:");tt(u).attr("style",m)}else{const m=e.replace(/stroke:[^;]+;?/g,"").replace(/stroke-width:[^;]+;?/g,"").replace(/fill:[^;]+;?/g,"").replace(/background:/g,"fill:");tt(u).select("rect").attr("style",m.replace(/background:/g,"fill:"));const f=e.replace(/stroke:[^;]+;?/g,"").replace(/stroke-width:[^;]+;?/g,"").replace(/fill:[^;]+;?/g,"").replace(/color:/g,"fill:");tt(u).select("text").attr("style",f)}return i?tt(u).selectAll("tspan.text-outer-tspan").classed("title-row",!0):tt(u).selectAll("tspan.text-outer-tspan").classed("row",!0),u}},"createText");function ro(r,t,e){if(r&&r.length){const[i,n]=t,o=Math.PI/180*e,a=Math.cos(o),s=Math.sin(o);for(const l of r){const[h,c]=l;l[0]=(h-i)*a-(c-n)*s+i,l[1]=(h-i)*s+(c-n)*a+n}}}function e2(r,t){return r[0]===t[0]&&r[1]===t[1]}function i2(r,t,e,i=1){const n=e,o=Math.max(t,.1),a=r[0]&&r[0][0]&&typeof r[0][0]=="number"?[r]:r,s=[0,0];if(n)for(const h of a)ro(h,s,n);const l=function(h,c,d){const p=[];for(const b of h){const k=[...b];e2(k[0],k[k.length-1])||k.push([k[0][0],k[0][1]]),k.length>2&&p.push(k)}const u=[];c=Math.max(c,.1);const m=[];for(const b of p)for(let k=0;k<b.length-1;k++){const T=b[k],v=b[k+1];if(T[1]!==v[1]){const _=Math.min(T[1],v[1]);m.push({ymin:_,ymax:Math.max(T[1],v[1]),x:_===T[1]?T[0]:v[0],islope:(v[0]-T[0])/(v[1]-T[1])})}}if(m.sort((b,k)=>b.ymin<k.ymin?-1:b.ymin>k.ymin?1:b.x<k.x?-1:b.x>k.x?1:b.ymax===k.ymax?0:(b.ymax-k.ymax)/Math.abs(b.ymax-k.ymax)),!m.length)return u;let f=[],y=m[0].ymin,C=0;for(;f.length||m.length;){if(m.length){let b=-1;for(let k=0;k<m.length&&!(m[k].ymin>y);k++)b=k;m.splice(0,b+1).forEach(k=>{f.push({s:y,edge:k})})}if(f=f.filter(b=>!(b.edge.ymax<=y)),f.sort((b,k)=>b.edge.x===k.edge.x?0:(b.edge.x-k.edge.x)/Math.abs(b.edge.x-k.edge.x)),(d!==1||C%c==0)&&f.length>1)for(let b=0;b<f.length;b+=2){const k=b+1;if(k>=f.length)break;const T=f[b].edge,v=f[k].edge;u.push([[Math.round(T.x),y],[Math.round(v.x),y]])}y+=d,f.forEach(b=>{b.edge.x=b.edge.x+d*b.edge.islope}),C++}return u}(a,o,i);if(n){for(const h of a)ro(h,s,-n);(function(h,c,d){const p=[];h.forEach(u=>p.push(...u)),ro(p,c,d)})(l,s,-n)}return l}function wi(r,t){var e;const i=t.hachureAngle+90;let n=t.hachureGap;n<0&&(n=4*t.strokeWidth),n=Math.round(Math.max(n,.1));let o=1;return t.roughness>=1&&(((e=t.randomizer)===null||e===void 0?void 0:e.next())||Math.random())>.7&&(o=n),i2(r,n,i,o||1)}class Ks{constructor(t){this.helper=t}fillPolygons(t,e){return this._fillPolygons(t,e)}_fillPolygons(t,e){const i=wi(t,e);return{type:"fillSketch",ops:this.renderLines(i,e)}}renderLines(t,e){const i=[];for(const n of t)i.push(...this.helper.doubleLineOps(n[0][0],n[0][1],n[1][0],n[1][1],e));return i}}function qn(r){const t=r[0],e=r[1];return Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2))}class n2 extends Ks{fillPolygons(t,e){let i=e.hachureGap;i<0&&(i=4*e.strokeWidth),i=Math.max(i,.1);const n=wi(t,Object.assign({},e,{hachureGap:i})),o=Math.PI/180*e.hachureAngle,a=[],s=.5*i*Math.cos(o),l=.5*i*Math.sin(o);for(const[h,c]of n)qn([h,c])&&a.push([[h[0]-s,h[1]+l],[...c]],[[h[0]+s,h[1]-l],[...c]]);return{type:"fillSketch",ops:this.renderLines(a,e)}}}class o2 extends Ks{fillPolygons(t,e){const i=this._fillPolygons(t,e),n=Object.assign({},e,{hachureAngle:e.hachureAngle+90}),o=this._fillPolygons(t,n);return i.ops=i.ops.concat(o.ops),i}}class s2{constructor(t){this.helper=t}fillPolygons(t,e){const i=wi(t,e=Object.assign({},e,{hachureAngle:0}));return this.dotsOnLines(i,e)}dotsOnLines(t,e){const i=[];let n=e.hachureGap;n<0&&(n=4*e.strokeWidth),n=Math.max(n,.1);let o=e.fillWeight;o<0&&(o=e.strokeWidth/2);const a=n/4;for(const s of t){const l=qn(s),h=l/n,c=Math.ceil(h)-1,d=l-c*n,p=(s[0][0]+s[1][0])/2-n/4,u=Math.min(s[0][1],s[1][1]);for(let m=0;m<c;m++){const f=u+d+m*n,y=p-a+2*Math.random()*a,C=f-a+2*Math.random()*a,b=this.helper.ellipse(y,C,o,o,e);i.push(...b.ops)}}return{type:"fillSketch",ops:i}}}class a2{constructor(t){this.helper=t}fillPolygons(t,e){const i=wi(t,e);return{type:"fillSketch",ops:this.dashedLine(i,e)}}dashedLine(t,e){const i=e.dashOffset<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashOffset,n=e.dashGap<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashGap,o=[];return t.forEach(a=>{const s=qn(a),l=Math.floor(s/(i+n)),h=(s+n-l*(i+n))/2;let c=a[0],d=a[1];c[0]>d[0]&&(c=a[1],d=a[0]);const p=Math.atan((d[1]-c[1])/(d[0]-c[0]));for(let u=0;u<l;u++){const m=u*(i+n),f=m+i,y=[c[0]+m*Math.cos(p)+h*Math.cos(p),c[1]+m*Math.sin(p)+h*Math.sin(p)],C=[c[0]+f*Math.cos(p)+h*Math.cos(p),c[1]+f*Math.sin(p)+h*Math.sin(p)];o.push(...this.helper.doubleLineOps(y[0],y[1],C[0],C[1],e))}}),o}}class l2{constructor(t){this.helper=t}fillPolygons(t,e){const i=e.hachureGap<0?4*e.strokeWidth:e.hachureGap,n=e.zigzagOffset<0?i:e.zigzagOffset,o=wi(t,e=Object.assign({},e,{hachureGap:i+n}));return{type:"fillSketch",ops:this.zigzagLines(o,n,e)}}zigzagLines(t,e,i){const n=[];return t.forEach(o=>{const a=qn(o),s=Math.round(a/(2*e));let l=o[0],h=o[1];l[0]>h[0]&&(l=o[1],h=o[0]);const c=Math.atan((h[1]-l[1])/(h[0]-l[0]));for(let d=0;d<s;d++){const p=2*d*e,u=2*(d+1)*e,m=Math.sqrt(2*Math.pow(e,2)),f=[l[0]+p*Math.cos(c),l[1]+p*Math.sin(c)],y=[l[0]+u*Math.cos(c),l[1]+u*Math.sin(c)],C=[f[0]+m*Math.cos(c+Math.PI/4),f[1]+m*Math.sin(c+Math.PI/4)];n.push(...this.helper.doubleLineOps(f[0],f[1],C[0],C[1],i),...this.helper.doubleLineOps(C[0],C[1],y[0],y[1],i))}}),n}}const Dt={};class h2{constructor(t){this.seed=t}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}const c2=0,eo=1,Za=2,Pi={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:2,t:2,V:1,v:1,Z:0,z:0};function io(r,t){return r.type===t}function Zs(r){const t=[],e=function(a){const s=new Array;for(;a!=="";)if(a.match(/^([ \t\r\n,]+)/))a=a.substr(RegExp.$1.length);else if(a.match(/^([aAcChHlLmMqQsStTvVzZ])/))s[s.length]={type:c2,text:RegExp.$1},a=a.substr(RegExp.$1.length);else{if(!a.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))return[];s[s.length]={type:eo,text:`${parseFloat(RegExp.$1)}`},a=a.substr(RegExp.$1.length)}return s[s.length]={type:Za,text:""},s}(r);let i="BOD",n=0,o=e[n];for(;!io(o,Za);){let a=0;const s=[];if(i==="BOD"){if(o.text!=="M"&&o.text!=="m")return Zs("M0,0"+r);n++,a=Pi[o.text],i=o.text}else io(o,eo)?a=Pi[i]:(n++,a=Pi[o.text],i=o.text);if(!(n+a<e.length))throw new Error("Path data ended short");for(let l=n;l<n+a;l++){const h=e[l];if(!io(h,eo))throw new Error("Param not a number: "+i+","+h.text);s[s.length]=+h.text}if(typeof Pi[i]!="number")throw new Error("Bad segment: "+i);{const l={key:i,data:s};t.push(l),n+=a,o=e[n],i==="M"&&(i="L"),i==="m"&&(i="l")}}return t}function lu(r){let t=0,e=0,i=0,n=0;const o=[];for(const{key:a,data:s}of r)switch(a){case"M":o.push({key:"M",data:[...s]}),[t,e]=s,[i,n]=s;break;case"m":t+=s[0],e+=s[1],o.push({key:"M",data:[t,e]}),i=t,n=e;break;case"L":o.push({key:"L",data:[...s]}),[t,e]=s;break;case"l":t+=s[0],e+=s[1],o.push({key:"L",data:[t,e]});break;case"C":o.push({key:"C",data:[...s]}),t=s[4],e=s[5];break;case"c":{const l=s.map((h,c)=>c%2?h+e:h+t);o.push({key:"C",data:l}),t=l[4],e=l[5];break}case"Q":o.push({key:"Q",data:[...s]}),t=s[2],e=s[3];break;case"q":{const l=s.map((h,c)=>c%2?h+e:h+t);o.push({key:"Q",data:l}),t=l[2],e=l[3];break}case"A":o.push({key:"A",data:[...s]}),t=s[5],e=s[6];break;case"a":t+=s[5],e+=s[6],o.push({key:"A",data:[s[0],s[1],s[2],s[3],s[4],t,e]});break;case"H":o.push({key:"H",data:[...s]}),t=s[0];break;case"h":t+=s[0],o.push({key:"H",data:[t]});break;case"V":o.push({key:"V",data:[...s]}),e=s[0];break;case"v":e+=s[0],o.push({key:"V",data:[e]});break;case"S":o.push({key:"S",data:[...s]}),t=s[2],e=s[3];break;case"s":{const l=s.map((h,c)=>c%2?h+e:h+t);o.push({key:"S",data:l}),t=l[2],e=l[3];break}case"T":o.push({key:"T",data:[...s]}),t=s[0],e=s[1];break;case"t":t+=s[0],e+=s[1],o.push({key:"T",data:[t,e]});break;case"Z":case"z":o.push({key:"Z",data:[]}),t=i,e=n}return o}function hu(r){const t=[];let e="",i=0,n=0,o=0,a=0,s=0,l=0;for(const{key:h,data:c}of r){switch(h){case"M":t.push({key:"M",data:[...c]}),[i,n]=c,[o,a]=c;break;case"C":t.push({key:"C",data:[...c]}),i=c[4],n=c[5],s=c[2],l=c[3];break;case"L":t.push({key:"L",data:[...c]}),[i,n]=c;break;case"H":i=c[0],t.push({key:"L",data:[i,n]});break;case"V":n=c[0],t.push({key:"L",data:[i,n]});break;case"S":{let d=0,p=0;e==="C"||e==="S"?(d=i+(i-s),p=n+(n-l)):(d=i,p=n),t.push({key:"C",data:[d,p,...c]}),s=c[0],l=c[1],i=c[2],n=c[3];break}case"T":{const[d,p]=c;let u=0,m=0;e==="Q"||e==="T"?(u=i+(i-s),m=n+(n-l)):(u=i,m=n);const f=i+2*(u-i)/3,y=n+2*(m-n)/3,C=d+2*(u-d)/3,b=p+2*(m-p)/3;t.push({key:"C",data:[f,y,C,b,d,p]}),s=u,l=m,i=d,n=p;break}case"Q":{const[d,p,u,m]=c,f=i+2*(d-i)/3,y=n+2*(p-n)/3,C=u+2*(d-u)/3,b=m+2*(p-m)/3;t.push({key:"C",data:[f,y,C,b,u,m]}),s=d,l=p,i=u,n=m;break}case"A":{const d=Math.abs(c[0]),p=Math.abs(c[1]),u=c[2],m=c[3],f=c[4],y=c[5],C=c[6];d===0||p===0?(t.push({key:"C",data:[i,n,y,C,y,C]}),i=y,n=C):(i!==y||n!==C)&&(cu(i,n,y,C,d,p,u,m,f).forEach(function(b){t.push({key:"C",data:b})}),i=y,n=C);break}case"Z":t.push({key:"Z",data:[]}),i=o,n=a}e=h}return t}function _e(r,t,e){return[r*Math.cos(e)-t*Math.sin(e),r*Math.sin(e)+t*Math.cos(e)]}function cu(r,t,e,i,n,o,a,s,l,h){const c=(d=a,Math.PI*d/180);var d;let p=[],u=0,m=0,f=0,y=0;if(h)[u,m,f,y]=h;else{[r,t]=_e(r,t,-c),[e,i]=_e(e,i,-c);const R=(r-e)/2,O=(t-i)/2;let W=R*R/(n*n)+O*O/(o*o);W>1&&(W=Math.sqrt(W),n*=W,o*=W);const I=n*n,$=o*o,D=I*$-I*O*O-$*R*R,V=I*O*O+$*R*R,rt=(s===l?-1:1)*Math.sqrt(Math.abs(D/V));f=rt*n*O/o+(r+e)/2,y=rt*-o*R/n+(t+i)/2,u=Math.asin(parseFloat(((t-y)/o).toFixed(9))),m=Math.asin(parseFloat(((i-y)/o).toFixed(9))),r<f&&(u=Math.PI-u),e<f&&(m=Math.PI-m),u<0&&(u=2*Math.PI+u),m<0&&(m=2*Math.PI+m),l&&u>m&&(u-=2*Math.PI),!l&&m>u&&(m-=2*Math.PI)}let C=m-u;if(Math.abs(C)>120*Math.PI/180){const R=m,O=e,W=i;m=l&&m>u?u+120*Math.PI/180*1:u+120*Math.PI/180*-1,p=cu(e=f+n*Math.cos(m),i=y+o*Math.sin(m),O,W,n,o,a,0,l,[m,R,f,y])}C=m-u;const b=Math.cos(u),k=Math.sin(u),T=Math.cos(m),v=Math.sin(m),_=Math.tan(C/4),w=4/3*n*_,S=4/3*o*_,M=[r,t],A=[r+w*k,t-S*b],E=[e+w*v,i-S*T],z=[e,i];if(A[0]=2*M[0]-A[0],A[1]=2*M[1]-A[1],h)return[A,E,z].concat(p);{p=[A,E,z].concat(p);const R=[];for(let O=0;O<p.length;O+=3){const W=_e(p[O][0],p[O][1],c),I=_e(p[O+1][0],p[O+1][1],c),$=_e(p[O+2][0],p[O+2][1],c);R.push([W[0],W[1],I[0],I[1],$[0],$[1]])}return R}}const d2={randOffset:function(r,t){return X(r,t)},randOffsetWithRange:function(r,t,e){return wn(r,t,e)},ellipse:function(r,t,e,i,n){const o=uu(e,i,n);return Vo(r,t,n,o).opset},doubleLineOps:function(r,t,e,i,n){return Ar(r,t,e,i,n,!0)}};function du(r,t,e,i,n){return{type:"path",ops:Ar(r,t,e,i,n)}}function Gi(r,t,e){const i=(r||[]).length;if(i>2){const n=[];for(let o=0;o<i-1;o++)n.push(...Ar(r[o][0],r[o][1],r[o+1][0],r[o+1][1],e));return t&&n.push(...Ar(r[i-1][0],r[i-1][1],r[0][0],r[0][1],e)),{type:"path",ops:n}}return i===2?du(r[0][0],r[0][1],r[1][0],r[1][1],e):{type:"path",ops:[]}}function u2(r,t,e,i,n){return function(o,a){return Gi(o,!0,a)}([[r,t],[r+e,t],[r+e,t+i],[r,t+i]],n)}function Qa(r,t){if(r.length){const e=typeof r[0][0]=="number"?[r]:r,i=Di(e[0],1*(1+.2*t.roughness),t),n=t.disableMultiStroke?[]:Di(e[0],1.5*(1+.22*t.roughness),rl(t));for(let o=1;o<e.length;o++){const a=e[o];if(a.length){const s=Di(a,1*(1+.2*t.roughness),t),l=t.disableMultiStroke?[]:Di(a,1.5*(1+.22*t.roughness),rl(t));for(const h of s)h.op!=="move"&&i.push(h);for(const h of l)h.op!=="move"&&n.push(h)}}return{type:"path",ops:i.concat(n)}}return{type:"path",ops:[]}}function uu(r,t,e){const i=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(r/2,2)+Math.pow(t/2,2))/2)),n=Math.ceil(Math.max(e.curveStepCount,e.curveStepCount/Math.sqrt(200)*i)),o=2*Math.PI/n;let a=Math.abs(r/2),s=Math.abs(t/2);const l=1-e.curveFitting;return a+=X(a*l,e),s+=X(s*l,e),{increment:o,rx:a,ry:s}}function Vo(r,t,e,i){const[n,o]=el(i.increment,r,t,i.rx,i.ry,1,i.increment*wn(.1,wn(.4,1,e),e),e);let a=Tn(n,null,e);if(!e.disableMultiStroke&&e.roughness!==0){const[s]=el(i.increment,r,t,i.rx,i.ry,1.5,0,e),l=Tn(s,null,e);a=a.concat(l)}return{estimatedPoints:o,opset:{type:"path",ops:a}}}function Ja(r,t,e,i,n,o,a,s,l){const h=r,c=t;let d=Math.abs(e/2),p=Math.abs(i/2);d+=X(.01*d,l),p+=X(.01*p,l);let u=n,m=o;for(;u<0;)u+=2*Math.PI,m+=2*Math.PI;m-u>2*Math.PI&&(u=0,m=2*Math.PI);const f=2*Math.PI/l.curveStepCount,y=Math.min(f/2,(m-u)/2),C=il(y,h,c,d,p,u,m,1,l);if(!l.disableMultiStroke){const b=il(y,h,c,d,p,u,m,1.5,l);C.push(...b)}return a&&(s?C.push(...Ar(h,c,h+d*Math.cos(u),c+p*Math.sin(u),l),...Ar(h,c,h+d*Math.cos(m),c+p*Math.sin(m),l)):C.push({op:"lineTo",data:[h,c]},{op:"lineTo",data:[h+d*Math.cos(u),c+p*Math.sin(u)]})),{type:"path",ops:C}}function tl(r,t){const e=hu(lu(Zs(r))),i=[];let n=[0,0],o=[0,0];for(const{key:a,data:s}of e)switch(a){case"M":o=[s[0],s[1]],n=[s[0],s[1]];break;case"L":i.push(...Ar(o[0],o[1],s[0],s[1],t)),o=[s[0],s[1]];break;case"C":{const[l,h,c,d,p,u]=s;i.push(...p2(l,h,c,d,p,u,o,t)),o=[p,u];break}case"Z":i.push(...Ar(o[0],o[1],n[0],n[1],t)),o=[n[0],n[1]]}return{type:"path",ops:i}}function no(r,t){const e=[];for(const i of r)if(i.length){const n=t.maxRandomnessOffset||0,o=i.length;if(o>2){e.push({op:"move",data:[i[0][0]+X(n,t),i[0][1]+X(n,t)]});for(let a=1;a<o;a++)e.push({op:"lineTo",data:[i[a][0]+X(n,t),i[a][1]+X(n,t)]})}}return{type:"fillPath",ops:e}}function te(r,t){return function(e,i){let n=e.fillStyle||"hachure";if(!Dt[n])switch(n){case"zigzag":Dt[n]||(Dt[n]=new n2(i));break;case"cross-hatch":Dt[n]||(Dt[n]=new o2(i));break;case"dots":Dt[n]||(Dt[n]=new s2(i));break;case"dashed":Dt[n]||(Dt[n]=new a2(i));break;case"zigzag-line":Dt[n]||(Dt[n]=new l2(i));break;default:n="hachure",Dt[n]||(Dt[n]=new Ks(i))}return Dt[n]}(t,d2).fillPolygons(r,t)}function rl(r){const t=Object.assign({},r);return t.randomizer=void 0,r.seed&&(t.seed=r.seed+1),t}function pu(r){return r.randomizer||(r.randomizer=new h2(r.seed||0)),r.randomizer.next()}function wn(r,t,e,i=1){return e.roughness*i*(pu(e)*(t-r)+r)}function X(r,t,e=1){return wn(-r,r,t,e)}function Ar(r,t,e,i,n,o=!1){const a=o?n.disableMultiStrokeFill:n.disableMultiStroke,s=Yo(r,t,e,i,n,!0,!1);if(a)return s;const l=Yo(r,t,e,i,n,!0,!0);return s.concat(l)}function Yo(r,t,e,i,n,o,a){const s=Math.pow(r-e,2)+Math.pow(t-i,2),l=Math.sqrt(s);let h=1;h=l<200?1:l>500?.4:-.0016668*l+1.233334;let c=n.maxRandomnessOffset||0;c*c*100>s&&(c=l/10);const d=c/2,p=.2+.2*pu(n);let u=n.bowing*n.maxRandomnessOffset*(i-t)/200,m=n.bowing*n.maxRandomnessOffset*(r-e)/200;u=X(u,n,h),m=X(m,n,h);const f=[],y=()=>X(d,n,h),C=()=>X(c,n,h),b=n.preserveVertices;return o&&(a?f.push({op:"move",data:[r+(b?0:y()),t+(b?0:y())]}):f.push({op:"move",data:[r+(b?0:X(c,n,h)),t+(b?0:X(c,n,h))]})),a?f.push({op:"bcurveTo",data:[u+r+(e-r)*p+y(),m+t+(i-t)*p+y(),u+r+2*(e-r)*p+y(),m+t+2*(i-t)*p+y(),e+(b?0:y()),i+(b?0:y())]}):f.push({op:"bcurveTo",data:[u+r+(e-r)*p+C(),m+t+(i-t)*p+C(),u+r+2*(e-r)*p+C(),m+t+2*(i-t)*p+C(),e+(b?0:C()),i+(b?0:C())]}),f}function Di(r,t,e){if(!r.length)return[];const i=[];i.push([r[0][0]+X(t,e),r[0][1]+X(t,e)]),i.push([r[0][0]+X(t,e),r[0][1]+X(t,e)]);for(let n=1;n<r.length;n++)i.push([r[n][0]+X(t,e),r[n][1]+X(t,e)]),n===r.length-1&&i.push([r[n][0]+X(t,e),r[n][1]+X(t,e)]);return Tn(i,null,e)}function Tn(r,t,e){const i=r.length,n=[];if(i>3){const o=[],a=1-e.curveTightness;n.push({op:"move",data:[r[1][0],r[1][1]]});for(let s=1;s+2<i;s++){const l=r[s];o[0]=[l[0],l[1]],o[1]=[l[0]+(a*r[s+1][0]-a*r[s-1][0])/6,l[1]+(a*r[s+1][1]-a*r[s-1][1])/6],o[2]=[r[s+1][0]+(a*r[s][0]-a*r[s+2][0])/6,r[s+1][1]+(a*r[s][1]-a*r[s+2][1])/6],o[3]=[r[s+1][0],r[s+1][1]],n.push({op:"bcurveTo",data:[o[1][0],o[1][1],o[2][0],o[2][1],o[3][0],o[3][1]]})}if(t&&t.length===2){const s=e.maxRandomnessOffset;n.push({op:"lineTo",data:[t[0]+X(s,e),t[1]+X(s,e)]})}}else i===3?(n.push({op:"move",data:[r[1][0],r[1][1]]}),n.push({op:"bcurveTo",data:[r[1][0],r[1][1],r[2][0],r[2][1],r[2][0],r[2][1]]})):i===2&&n.push(...Yo(r[0][0],r[0][1],r[1][0],r[1][1],e,!0,!0));return n}function el(r,t,e,i,n,o,a,s){const l=[],h=[];if(s.roughness===0){r/=4,h.push([t+i*Math.cos(-r),e+n*Math.sin(-r)]);for(let c=0;c<=2*Math.PI;c+=r){const d=[t+i*Math.cos(c),e+n*Math.sin(c)];l.push(d),h.push(d)}h.push([t+i*Math.cos(0),e+n*Math.sin(0)]),h.push([t+i*Math.cos(r),e+n*Math.sin(r)])}else{const c=X(.5,s)-Math.PI/2;h.push([X(o,s)+t+.9*i*Math.cos(c-r),X(o,s)+e+.9*n*Math.sin(c-r)]);const d=2*Math.PI+c-.01;for(let p=c;p<d;p+=r){const u=[X(o,s)+t+i*Math.cos(p),X(o,s)+e+n*Math.sin(p)];l.push(u),h.push(u)}h.push([X(o,s)+t+i*Math.cos(c+2*Math.PI+.5*a),X(o,s)+e+n*Math.sin(c+2*Math.PI+.5*a)]),h.push([X(o,s)+t+.98*i*Math.cos(c+a),X(o,s)+e+.98*n*Math.sin(c+a)]),h.push([X(o,s)+t+.9*i*Math.cos(c+.5*a),X(o,s)+e+.9*n*Math.sin(c+.5*a)])}return[h,l]}function il(r,t,e,i,n,o,a,s,l){const h=o+X(.1,l),c=[];c.push([X(s,l)+t+.9*i*Math.cos(h-r),X(s,l)+e+.9*n*Math.sin(h-r)]);for(let d=h;d<=a;d+=r)c.push([X(s,l)+t+i*Math.cos(d),X(s,l)+e+n*Math.sin(d)]);return c.push([t+i*Math.cos(a),e+n*Math.sin(a)]),c.push([t+i*Math.cos(a),e+n*Math.sin(a)]),Tn(c,null,l)}function p2(r,t,e,i,n,o,a,s){const l=[],h=[s.maxRandomnessOffset||1,(s.maxRandomnessOffset||1)+.3];let c=[0,0];const d=s.disableMultiStroke?1:2,p=s.preserveVertices;for(let u=0;u<d;u++)u===0?l.push({op:"move",data:[a[0],a[1]]}):l.push({op:"move",data:[a[0]+(p?0:X(h[0],s)),a[1]+(p?0:X(h[0],s))]}),c=p?[n,o]:[n+X(h[u],s),o+X(h[u],s)],l.push({op:"bcurveTo",data:[r+X(h[u],s),t+X(h[u],s),e+X(h[u],s),i+X(h[u],s),c[0],c[1]]});return l}function Be(r){return[...r]}function nl(r,t=0){const e=r.length;if(e<3)throw new Error("A curve must have at least three points.");const i=[];if(e===3)i.push(Be(r[0]),Be(r[1]),Be(r[2]),Be(r[2]));else{const n=[];n.push(r[0],r[0]);for(let s=1;s<r.length;s++)n.push(r[s]),s===r.length-1&&n.push(r[s]);const o=[],a=1-t;i.push(Be(n[0]));for(let s=1;s+2<n.length;s++){const l=n[s];o[0]=[l[0],l[1]],o[1]=[l[0]+(a*n[s+1][0]-a*n[s-1][0])/6,l[1]+(a*n[s+1][1]-a*n[s-1][1])/6],o[2]=[n[s+1][0]+(a*n[s][0]-a*n[s+2][0])/6,n[s+1][1]+(a*n[s][1]-a*n[s+2][1])/6],o[3]=[n[s+1][0],n[s+1][1]],i.push(o[1],o[2],o[3])}}return i}function Vi(r,t){return Math.pow(r[0]-t[0],2)+Math.pow(r[1]-t[1],2)}function g2(r,t,e){const i=Vi(t,e);if(i===0)return Vi(r,t);let n=((r[0]-t[0])*(e[0]-t[0])+(r[1]-t[1])*(e[1]-t[1]))/i;return n=Math.max(0,Math.min(1,n)),Vi(r,Wr(t,e,n))}function Wr(r,t,e){return[r[0]+(t[0]-r[0])*e,r[1]+(t[1]-r[1])*e]}function Xo(r,t,e,i){const n=i||[];if(function(s,l){const h=s[l+0],c=s[l+1],d=s[l+2],p=s[l+3];let u=3*c[0]-2*h[0]-p[0];u*=u;let m=3*c[1]-2*h[1]-p[1];m*=m;let f=3*d[0]-2*p[0]-h[0];f*=f;let y=3*d[1]-2*p[1]-h[1];return y*=y,u<f&&(u=f),m<y&&(m=y),u+m}(r,t)<e){const s=r[t+0];n.length?(o=n[n.length-1],a=s,Math.sqrt(Vi(o,a))>1&&n.push(s)):n.push(s),n.push(r[t+3])}else{const l=r[t+0],h=r[t+1],c=r[t+2],d=r[t+3],p=Wr(l,h,.5),u=Wr(h,c,.5),m=Wr(c,d,.5),f=Wr(p,u,.5),y=Wr(u,m,.5),C=Wr(f,y,.5);Xo([l,p,f,C],0,e,n),Xo([C,y,m,d],0,e,n)}var o,a;return n}function f2(r,t){return vn(r,0,r.length,t)}function vn(r,t,e,i,n){const o=n||[],a=r[t],s=r[e-1];let l=0,h=1;for(let c=t+1;c<e-1;++c){const d=g2(r[c],a,s);d>l&&(l=d,h=c)}return Math.sqrt(l)>i?(vn(r,t,h+1,i,o),vn(r,h,e,i,o)):(o.length||o.push(a),o.push(s)),o}function oo(r,t=.15,e){const i=[],n=(r.length-1)/3;for(let o=0;o<n;o++)Xo(r,3*o,t,i);return e&&e>0?vn(i,0,i.length,e):i}const qt="none";class Sn{constructor(t){this.defaultOptions={maxRandomnessOffset:2,roughness:1,bowing:1,stroke:"#000",strokeWidth:1,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,seed:0,disableMultiStroke:!1,disableMultiStrokeFill:!1,preserveVertices:!1,fillShapeRoughnessGain:.8},this.config=t||{},this.config.options&&(this.defaultOptions=this._o(this.config.options))}static newSeed(){return Math.floor(Math.random()*2**31)}_o(t){return t?Object.assign({},this.defaultOptions,t):this.defaultOptions}_d(t,e,i){return{shape:t,sets:e||[],options:i||this.defaultOptions}}line(t,e,i,n,o){const a=this._o(o);return this._d("line",[du(t,e,i,n,a)],a)}rectangle(t,e,i,n,o){const a=this._o(o),s=[],l=u2(t,e,i,n,a);if(a.fill){const h=[[t,e],[t+i,e],[t+i,e+n],[t,e+n]];a.fillStyle==="solid"?s.push(no([h],a)):s.push(te([h],a))}return a.stroke!==qt&&s.push(l),this._d("rectangle",s,a)}ellipse(t,e,i,n,o){const a=this._o(o),s=[],l=uu(i,n,a),h=Vo(t,e,a,l);if(a.fill)if(a.fillStyle==="solid"){const c=Vo(t,e,a,l).opset;c.type="fillPath",s.push(c)}else s.push(te([h.estimatedPoints],a));return a.stroke!==qt&&s.push(h.opset),this._d("ellipse",s,a)}circle(t,e,i,n){const o=this.ellipse(t,e,i,i,n);return o.shape="circle",o}linearPath(t,e){const i=this._o(e);return this._d("linearPath",[Gi(t,!1,i)],i)}arc(t,e,i,n,o,a,s=!1,l){const h=this._o(l),c=[],d=Ja(t,e,i,n,o,a,s,!0,h);if(s&&h.fill)if(h.fillStyle==="solid"){const p=Object.assign({},h);p.disableMultiStroke=!0;const u=Ja(t,e,i,n,o,a,!0,!1,p);u.type="fillPath",c.push(u)}else c.push(function(p,u,m,f,y,C,b){const k=p,T=u;let v=Math.abs(m/2),_=Math.abs(f/2);v+=X(.01*v,b),_+=X(.01*_,b);let w=y,S=C;for(;w<0;)w+=2*Math.PI,S+=2*Math.PI;S-w>2*Math.PI&&(w=0,S=2*Math.PI);const M=(S-w)/b.curveStepCount,A=[];for(let E=w;E<=S;E+=M)A.push([k+v*Math.cos(E),T+_*Math.sin(E)]);return A.push([k+v*Math.cos(S),T+_*Math.sin(S)]),A.push([k,T]),te([A],b)}(t,e,i,n,o,a,h));return h.stroke!==qt&&c.push(d),this._d("arc",c,h)}curve(t,e){const i=this._o(e),n=[],o=Qa(t,i);if(i.fill&&i.fill!==qt)if(i.fillStyle==="solid"){const a=Qa(t,Object.assign(Object.assign({},i),{disableMultiStroke:!0,roughness:i.roughness?i.roughness+i.fillShapeRoughnessGain:0}));n.push({type:"fillPath",ops:this._mergedShape(a.ops)})}else{const a=[],s=t;if(s.length){const l=typeof s[0][0]=="number"?[s]:s;for(const h of l)h.length<3?a.push(...h):h.length===3?a.push(...oo(nl([h[0],h[0],h[1],h[2]]),10,(1+i.roughness)/2)):a.push(...oo(nl(h),10,(1+i.roughness)/2))}a.length&&n.push(te([a],i))}return i.stroke!==qt&&n.push(o),this._d("curve",n,i)}polygon(t,e){const i=this._o(e),n=[],o=Gi(t,!0,i);return i.fill&&(i.fillStyle==="solid"?n.push(no([t],i)):n.push(te([t],i))),i.stroke!==qt&&n.push(o),this._d("polygon",n,i)}path(t,e){const i=this._o(e),n=[];if(!t)return this._d("path",n,i);t=(t||"").replace(/\n/g," ").replace(/(-\s)/g,"-").replace("/(ss)/g"," ");const o=i.fill&&i.fill!=="transparent"&&i.fill!==qt,a=i.stroke!==qt,s=!!(i.simplification&&i.simplification<1),l=function(c,d,p){const u=hu(lu(Zs(c))),m=[];let f=[],y=[0,0],C=[];const b=()=>{C.length>=4&&f.push(...oo(C,d)),C=[]},k=()=>{b(),f.length&&(m.push(f),f=[])};for(const{key:v,data:_}of u)switch(v){case"M":k(),y=[_[0],_[1]],f.push(y);break;case"L":b(),f.push([_[0],_[1]]);break;case"C":if(!C.length){const w=f.length?f[f.length-1]:y;C.push([w[0],w[1]])}C.push([_[0],_[1]]),C.push([_[2],_[3]]),C.push([_[4],_[5]]);break;case"Z":b(),f.push([y[0],y[1]])}if(k(),!p)return m;const T=[];for(const v of m){const _=f2(v,p);_.length&&T.push(_)}return T}(t,1,s?4-4*(i.simplification||1):(1+i.roughness)/2),h=tl(t,i);if(o)if(i.fillStyle==="solid")if(l.length===1){const c=tl(t,Object.assign(Object.assign({},i),{disableMultiStroke:!0,roughness:i.roughness?i.roughness+i.fillShapeRoughnessGain:0}));n.push({type:"fillPath",ops:this._mergedShape(c.ops)})}else n.push(no(l,i));else n.push(te(l,i));return a&&(s?l.forEach(c=>{n.push(Gi(c,!1,i))}):n.push(h)),this._d("path",n,i)}opsToPath(t,e){let i="";for(const n of t.ops){const o=typeof e=="number"&&e>=0?n.data.map(a=>+a.toFixed(e)):n.data;switch(n.op){case"move":i+=`M${o[0]} ${o[1]} `;break;case"bcurveTo":i+=`C${o[0]} ${o[1]}, ${o[2]} ${o[3]}, ${o[4]} ${o[5]} `;break;case"lineTo":i+=`L${o[0]} ${o[1]} `}}return i.trim()}toPaths(t){const e=t.sets||[],i=t.options||this.defaultOptions,n=[];for(const o of e){let a=null;switch(o.type){case"path":a={d:this.opsToPath(o),stroke:i.stroke,strokeWidth:i.strokeWidth,fill:qt};break;case"fillPath":a={d:this.opsToPath(o),stroke:qt,strokeWidth:0,fill:i.fill||qt};break;case"fillSketch":a=this.fillSketch(o,i)}a&&n.push(a)}return n}fillSketch(t,e){let i=e.fillWeight;return i<0&&(i=e.strokeWidth/2),{d:this.opsToPath(t),stroke:e.fill||qt,strokeWidth:i,fill:qt}}_mergedShape(t){return t.filter((e,i)=>i===0||e.op!=="move")}}class m2{constructor(t,e){this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.gen=new Sn(e)}draw(t){const e=t.sets||[],i=t.options||this.getDefaultOptions(),n=this.ctx,o=t.options.fixedDecimalPlaceDigits;for(const a of e)switch(a.type){case"path":n.save(),n.strokeStyle=i.stroke==="none"?"transparent":i.stroke,n.lineWidth=i.strokeWidth,i.strokeLineDash&&n.setLineDash(i.strokeLineDash),i.strokeLineDashOffset&&(n.lineDashOffset=i.strokeLineDashOffset),this._drawToContext(n,a,o),n.restore();break;case"fillPath":{n.save(),n.fillStyle=i.fill||"";const s=t.shape==="curve"||t.shape==="polygon"||t.shape==="path"?"evenodd":"nonzero";this._drawToContext(n,a,o,s),n.restore();break}case"fillSketch":this.fillSketch(n,a,i)}}fillSketch(t,e,i){let n=i.fillWeight;n<0&&(n=i.strokeWidth/2),t.save(),i.fillLineDash&&t.setLineDash(i.fillLineDash),i.fillLineDashOffset&&(t.lineDashOffset=i.fillLineDashOffset),t.strokeStyle=i.fill||"",t.lineWidth=n,this._drawToContext(t,e,i.fixedDecimalPlaceDigits),t.restore()}_drawToContext(t,e,i,n="nonzero"){t.beginPath();for(const o of e.ops){const a=typeof i=="number"&&i>=0?o.data.map(s=>+s.toFixed(i)):o.data;switch(o.op){case"move":t.moveTo(a[0],a[1]);break;case"bcurveTo":t.bezierCurveTo(a[0],a[1],a[2],a[3],a[4],a[5]);break;case"lineTo":t.lineTo(a[0],a[1])}}e.type==="fillPath"?t.fill(n):t.stroke()}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}line(t,e,i,n,o){const a=this.gen.line(t,e,i,n,o);return this.draw(a),a}rectangle(t,e,i,n,o){const a=this.gen.rectangle(t,e,i,n,o);return this.draw(a),a}ellipse(t,e,i,n,o){const a=this.gen.ellipse(t,e,i,n,o);return this.draw(a),a}circle(t,e,i,n){const o=this.gen.circle(t,e,i,n);return this.draw(o),o}linearPath(t,e){const i=this.gen.linearPath(t,e);return this.draw(i),i}polygon(t,e){const i=this.gen.polygon(t,e);return this.draw(i),i}arc(t,e,i,n,o,a,s=!1,l){const h=this.gen.arc(t,e,i,n,o,a,s,l);return this.draw(h),h}curve(t,e){const i=this.gen.curve(t,e);return this.draw(i),i}path(t,e){const i=this.gen.path(t,e);return this.draw(i),i}}const Ii="http://www.w3.org/2000/svg";class y2{constructor(t,e){this.svg=t,this.gen=new Sn(e)}draw(t){const e=t.sets||[],i=t.options||this.getDefaultOptions(),n=this.svg.ownerDocument||window.document,o=n.createElementNS(Ii,"g"),a=t.options.fixedDecimalPlaceDigits;for(const s of e){let l=null;switch(s.type){case"path":l=n.createElementNS(Ii,"path"),l.setAttribute("d",this.opsToPath(s,a)),l.setAttribute("stroke",i.stroke),l.setAttribute("stroke-width",i.strokeWidth+""),l.setAttribute("fill","none"),i.strokeLineDash&&l.setAttribute("stroke-dasharray",i.strokeLineDash.join(" ").trim()),i.strokeLineDashOffset&&l.setAttribute("stroke-dashoffset",`${i.strokeLineDashOffset}`);break;case"fillPath":l=n.createElementNS(Ii,"path"),l.setAttribute("d",this.opsToPath(s,a)),l.setAttribute("stroke","none"),l.setAttribute("stroke-width","0"),l.setAttribute("fill",i.fill||""),t.shape!=="curve"&&t.shape!=="polygon"||l.setAttribute("fill-rule","evenodd");break;case"fillSketch":l=this.fillSketch(n,s,i)}l&&o.appendChild(l)}return o}fillSketch(t,e,i){let n=i.fillWeight;n<0&&(n=i.strokeWidth/2);const o=t.createElementNS(Ii,"path");return o.setAttribute("d",this.opsToPath(e,i.fixedDecimalPlaceDigits)),o.setAttribute("stroke",i.fill||""),o.setAttribute("stroke-width",n+""),o.setAttribute("fill","none"),i.fillLineDash&&o.setAttribute("stroke-dasharray",i.fillLineDash.join(" ").trim()),i.fillLineDashOffset&&o.setAttribute("stroke-dashoffset",`${i.fillLineDashOffset}`),o}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}opsToPath(t,e){return this.gen.opsToPath(t,e)}line(t,e,i,n,o){const a=this.gen.line(t,e,i,n,o);return this.draw(a)}rectangle(t,e,i,n,o){const a=this.gen.rectangle(t,e,i,n,o);return this.draw(a)}ellipse(t,e,i,n,o){const a=this.gen.ellipse(t,e,i,n,o);return this.draw(a)}circle(t,e,i,n){const o=this.gen.circle(t,e,i,n);return this.draw(o)}linearPath(t,e){const i=this.gen.linearPath(t,e);return this.draw(i)}polygon(t,e){const i=this.gen.polygon(t,e);return this.draw(i)}arc(t,e,i,n,o,a,s=!1,l){const h=this.gen.arc(t,e,i,n,o,a,s,l);return this.draw(h)}curve(t,e){const i=this.gen.curve(t,e);return this.draw(i)}path(t,e){const i=this.gen.path(t,e);return this.draw(i)}}var q={canvas:(r,t)=>new m2(r,t),svg:(r,t)=>new y2(r,t),generator:r=>new Sn(r),newSeed:()=>Sn.newSeed()},K=g(async(r,t,e)=>{var u,m;let i;const n=t.useHtmlLabels||xr((u=ot())==null?void 0:u.htmlLabels);e?i=e:i="node default";const o=r.insert("g").attr("class",i).attr("id",t.domId||t.id),a=o.insert("g").attr("class","label").attr("style",xt(t.labelStyle));let s;t.label===void 0?s="":s=typeof t.label=="string"?t.label:t.label[0];const l=!!t.icon||!!t.img,h=t.labelType==="markdown",c=await br(a,Jt(Xr(s),ot()),{useHtmlLabels:n,width:t.width||((m=ot().flowchart)==null?void 0:m.wrappingWidth),classes:h?"markdown-node-label":"",style:t.labelStyle,addSvgBackground:l,markdown:h},ot());let d=c.getBBox();const p=((t==null?void 0:t.padding)??0)/2;if(n){const f=c.children[0],y=tt(c);await Pd(f,s),d=f.getBoundingClientRect(),y.attr("width",d.width),y.attr("height",d.height)}return n?a.attr("transform","translate("+-d.width/2+", "+-d.height/2+")"):a.attr("transform","translate(0, "+-d.height/2+")"),t.centerLabel&&a.attr("transform","translate("+-d.width/2+", "+-d.height/2+")"),a.insert("rect",":first-child"),{shapeSvg:o,bbox:d,halfPadding:p,label:a}},"labelHelper"),so=g(async(r,t,e)=>{var l,h;const i=e.useHtmlLabels??Pt(ot()),n=r.insert("g").attr("class","label").attr("style",e.labelStyle||""),o=await br(n,Jt(Xr(t),ot()),{useHtmlLabels:i,width:e.width||((h=(l=ot())==null?void 0:l.flowchart)==null?void 0:h.wrappingWidth),style:e.labelStyle,addSvgBackground:!!e.icon||!!e.img});let a=o.getBBox();const s=e.padding/2;if(Pt(ot())){const c=o.children[0],d=tt(o);a=c.getBoundingClientRect(),d.attr("width",a.width),d.attr("height",a.height)}return i?n.attr("transform","translate("+-a.width/2+", "+-a.height/2+")"):n.attr("transform","translate(0, "+-a.height/2+")"),e.centerLabel&&n.attr("transform","translate("+-a.width/2+", "+-a.height/2+")"),n.insert("rect",":first-child"),{shapeSvg:r,bbox:a,halfPadding:s,label:n}},"insertLabel"),U=g((r,t)=>{const e=t.node().getBBox();r.width=e.width,r.height=e.height},"updateNodeBounds"),Y=g((r,t)=>(r.look==="handDrawn"?"rough-node":"node")+" "+r.cssClasses+" "+(t||""),"getNodeClasses");function et(r){const t=r.map((e,i)=>`${i===0?"M":"L"}${e.x},${e.y}`);return t.push("Z"),t.join(" ")}g(et,"createPathFromPoints");function Er(r,t,e,i,n,o){const a=[],l=e-r,h=i-t,c=l/o,d=2*Math.PI/c,p=t+h/2;for(let u=0;u<=50;u++){const m=u/50,f=r+m*l,y=p+n*Math.sin(d*(f-r));a.push({x:f,y})}return a}g(Er,"generateFullSineWavePoints");function Qe(r,t,e,i,n,o){const a=[],s=n*Math.PI/180,c=(o*Math.PI/180-s)/(i-1);for(let d=0;d<i;d++){const p=s+d*c,u=r+e*Math.cos(p),m=t+e*Math.sin(p);a.push({x:-u,y:-m})}return a}g(Qe,"generateCirclePoints");function Ko(r){const t=Array.from(r.childNodes).filter(l=>l.tagName==="path"),e=document.createElementNS("http://www.w3.org/2000/svg","path"),i=t.map(l=>l.getAttribute("d")).filter(l=>l!==null).join(" ");e.setAttribute("d",i);const n=t.find(l=>l.getAttribute("fill")!=="none"),o=t.find(l=>l.getAttribute("stroke")!=="none"),a=g((l,h)=>(l==null?void 0:l.getAttribute(h))??void 0,"getAttr");if(n){const l={fill:a(n,"fill"),"fill-opacity":a(n,"fill-opacity")??"1"};Object.entries(l).forEach(([h,c])=>{c&&e.setAttribute(h,c)})}if(o){const l={stroke:a(o,"stroke"),"stroke-width":a(o,"stroke-width")??"1","stroke-opacity":a(o,"stroke-opacity")??"1"};Object.entries(l).forEach(([h,c])=>{c&&e.setAttribute(h,c)})}const s=document.createElementNS("http://www.w3.org/2000/svg","g");return s.appendChild(e),s}g(Ko,"mergePaths");var C2=g((r,t)=>{var e=r.x,i=r.y,n=t.x-e,o=t.y-i,a=r.width/2,s=r.height/2,l,h;return Math.abs(o)*a>Math.abs(n)*s?(o<0&&(s=-s),l=o===0?0:s*n/o,h=s):(n<0&&(a=-a),l=a,h=n===0?0:a*o/n),{x:e+l,y:i+h}},"intersectRect"),xe=C2,x2=g(async(r,t,e,i=!1,n=!1)=>{let o=t||"";typeof o=="object"&&(o=o[0]);const a=ot(),s=Pt(a);return await br(r,o,{style:e,isTitle:i,useHtmlLabels:s,markdown:!1,isNode:n,width:Number.POSITIVE_INFINITY},a)},"createLabel"),Sr=x2,Pr=g((r,t,e,i,n)=>["M",r+n,t,"H",r+e-n,"A",n,n,0,0,1,r+e,t+n,"V",t+i-n,"A",n,n,0,0,1,r+e-n,t+i,"H",r+n,"A",n,n,0,0,1,r,t+i-n,"V",t+n,"A",n,n,0,0,1,r+n,t,"Z"].join(" "),"createRoundedRectPathD"),gu=g(async(r,t)=>{P.info("Creating subgraph rect for ",t.id,t);const e=ot(),{themeVariables:i,handDrawnSeed:n}=e,{clusterBkg:o,clusterBorder:a}=i,{labelStyles:s,nodeStyles:l,borderStyles:h,backgroundStyles:c}=H(t),d=r.insert("g").attr("class","cluster "+t.cssClasses).attr("id",t.domId).attr("data-look",t.look),p=Pt(e),u=d.insert("g").attr("class","cluster-label ");let m;t.labelType==="markdown"?m=await br(u,t.label,{style:t.labelStyle,useHtmlLabels:p,isNode:!0,width:t.width}):m=await Sr(u,t.label,t.labelStyle||"",!1,!0);let f=m.getBBox();if(Pt(e)){const w=m.children[0],S=tt(m);f=w.getBoundingClientRect(),S.attr("width",f.width),S.attr("height",f.height)}const y=t.width<=f.width+t.padding?f.width+t.padding:t.width;t.width<=f.width+t.padding?t.diff=(y-t.width)/2-t.padding:t.diff=-t.padding;const C=t.height,b=t.x-y/2,k=t.y-C/2;P.trace("Data ",t,JSON.stringify(t));let T;if(t.look==="handDrawn"){const w=q.svg(d),S=j(t,{roughness:.7,fill:o,stroke:a,fillWeight:3,seed:n}),M=w.path(Pr(b,k,y,C,0),S);T=d.insert(()=>(P.debug("Rough node insert CXC",M),M),":first-child"),T.select("path:nth-child(2)").attr("style",h.join(";")),T.select("path").attr("style",c.join(";").replace("fill","stroke"))}else T=d.insert("rect",":first-child"),T.attr("style",l).attr("rx",t.rx).attr("ry",t.ry).attr("x",b).attr("y",k).attr("width",y).attr("height",C);const{subGraphTitleTopMargin:v}=Ws(e);if(u.attr("transform",`translate(${t.x-f.width/2}, ${t.y-t.height/2+v})`),s){const w=u.select("span");w&&w.attr("style",s)}const _=T.node().getBBox();return t.offsetX=0,t.width=_.width,t.height=_.height,t.offsetY=f.height-t.padding/2,t.intersect=function(w){return xe(t,w)},{cluster:d,labelBBox:f}},"rect"),b2=g((r,t)=>{const e=r.insert("g").attr("class","note-cluster").attr("id",t.domId),i=e.insert("rect",":first-child"),n=0*t.padding,o=n/2;i.attr("rx",t.rx).attr("ry",t.ry).attr("x",t.x-t.width/2-o).attr("y",t.y-t.height/2-o).attr("width",t.width+n).attr("height",t.height+n).attr("fill","none");const a=i.node().getBBox();return t.width=a.width,t.height=a.height,t.intersect=function(s){return xe(t,s)},{cluster:e,labelBBox:{width:0,height:0}}},"noteGroup"),k2=g(async(r,t)=>{const e=ot(),{themeVariables:i,handDrawnSeed:n}=e,{altBackground:o,compositeBackground:a,compositeTitleBackground:s,nodeBorder:l}=i,h=r.insert("g").attr("class",t.cssClasses).attr("id",t.domId).attr("data-id",t.id).attr("data-look",t.look),c=h.insert("g",":first-child"),d=h.insert("g").attr("class","cluster-label");let p=h.append("rect");const u=await Sr(d,t.label,t.labelStyle,void 0,!0);let m=u.getBBox();if(Pt(e)){const M=u.children[0],A=tt(u);m=M.getBoundingClientRect(),A.attr("width",m.width),A.attr("height",m.height)}const f=0*t.padding,y=f/2,C=(t.width<=m.width+t.padding?m.width+t.padding:t.width)+f;t.width<=m.width+t.padding?t.diff=(C-t.width)/2-t.padding:t.diff=-t.padding;const b=t.height+f,k=t.height+f-m.height-6,T=t.x-C/2,v=t.y-b/2;t.width=C;const _=t.y-t.height/2-y+m.height+2;let w;if(t.look==="handDrawn"){const M=t.cssClasses.includes("statediagram-cluster-alt"),A=q.svg(h),E=t.rx||t.ry?A.path(Pr(T,v,C,b,10),{roughness:.7,fill:s,fillStyle:"solid",stroke:l,seed:n}):A.rectangle(T,v,C,b,{seed:n});w=h.insert(()=>E,":first-child");const z=A.rectangle(T,_,C,k,{fill:M?o:a,fillStyle:M?"hachure":"solid",stroke:l,seed:n});w=h.insert(()=>E,":first-child"),p=h.insert(()=>z)}else w=c.insert("rect",":first-child"),w.attr("class","outer").attr("x",T).attr("y",v).attr("width",C).attr("height",b).attr("data-look",t.look),p.attr("class","inner").attr("x",T).attr("y",_).attr("width",C).attr("height",k);d.attr("transform",`translate(${t.x-m.width/2}, ${v+1-(Pt(e)?0:3)})`);const S=w.node().getBBox();return t.height=S.height,t.offsetX=0,t.offsetY=m.height-t.padding/2,t.labelBBox=m,t.intersect=function(M){return xe(t,M)},{cluster:h,labelBBox:m}},"roundedWithTitle"),w2=g(async(r,t)=>{P.info("Creating subgraph rect for ",t.id,t);const e=ot(),{themeVariables:i,handDrawnSeed:n}=e,{clusterBkg:o,clusterBorder:a}=i,{labelStyles:s,nodeStyles:l,borderStyles:h,backgroundStyles:c}=H(t),d=r.insert("g").attr("class","cluster "+t.cssClasses).attr("id",t.domId).attr("data-look",t.look),p=Pt(e),u=d.insert("g").attr("class","cluster-label "),m=await br(u,t.label,{style:t.labelStyle,useHtmlLabels:p,isNode:!0,width:t.width});let f=m.getBBox();if(Pt(e)){const w=m.children[0],S=tt(m);f=w.getBoundingClientRect(),S.attr("width",f.width),S.attr("height",f.height)}const y=t.width<=f.width+t.padding?f.width+t.padding:t.width;t.width<=f.width+t.padding?t.diff=(y-t.width)/2-t.padding:t.diff=-t.padding;const C=t.height,b=t.x-y/2,k=t.y-C/2;P.trace("Data ",t,JSON.stringify(t));let T;if(t.look==="handDrawn"){const w=q.svg(d),S=j(t,{roughness:.7,fill:o,stroke:a,fillWeight:4,seed:n}),M=w.path(Pr(b,k,y,C,t.rx),S);T=d.insert(()=>(P.debug("Rough node insert CXC",M),M),":first-child"),T.select("path:nth-child(2)").attr("style",h.join(";")),T.select("path").attr("style",c.join(";").replace("fill","stroke"))}else T=d.insert("rect",":first-child"),T.attr("style",l).attr("rx",t.rx).attr("ry",t.ry).attr("x",b).attr("y",k).attr("width",y).attr("height",C);const{subGraphTitleTopMargin:v}=Ws(e);if(u.attr("transform",`translate(${t.x-f.width/2}, ${t.y-t.height/2+v})`),s){const w=u.select("span");w&&w.attr("style",s)}const _=T.node().getBBox();return t.offsetX=0,t.width=_.width,t.height=_.height,t.offsetY=f.height-t.padding/2,t.intersect=function(w){return xe(t,w)},{cluster:d,labelBBox:f}},"kanbanSection"),T2=g((r,t)=>{const e=ot(),{themeVariables:i,handDrawnSeed:n}=e,{nodeBorder:o}=i,a=r.insert("g").attr("class",t.cssClasses).attr("id",t.domId).attr("data-look",t.look),s=a.insert("g",":first-child"),l=0*t.padding,h=t.width+l;t.diff=-t.padding;const c=t.height+l,d=t.x-h/2,p=t.y-c/2;t.width=h;let u;if(t.look==="handDrawn"){const y=q.svg(a).rectangle(d,p,h,c,{fill:"lightgrey",roughness:.5,strokeLineDash:[5],stroke:o,seed:n});u=a.insert(()=>y,":first-child")}else{u=s.insert("rect",":first-child");let f="outer";t.look,f="divider",u.attr("class",f).attr("x",d).attr("y",p).attr("width",h).attr("height",c).attr("data-look",t.look)}const m=u.node().getBBox();return t.height=m.height,t.offsetX=0,t.offsetY=0,t.intersect=function(f){return xe(t,f)},{cluster:a,labelBBox:{}}},"divider"),v2=gu,S2={rect:gu,squareRect:v2,roundedWithTitle:k2,noteGroup:b2,divider:T2,kanbanSection:w2},fu=new Map,_2=g(async(r,t)=>{const e=t.shape||"rect",i=await S2[e](r,t);return fu.set(t.id,i),i},"insertCluster"),$_=g(()=>{fu=new Map},"clear");function mu(r,t){return r.intersect(t)}g(mu,"intersectNode");var B2=mu;function yu(r,t,e,i){var n=r.x,o=r.y,a=n-i.x,s=o-i.y,l=Math.sqrt(t*t*s*s+e*e*a*a),h=Math.abs(t*e*a/l);i.x<n&&(h=-h);var c=Math.abs(t*e*s/l);return i.y<o&&(c=-c),{x:n+h,y:o+c}}g(yu,"intersectEllipse");var Cu=yu;function xu(r,t,e){return Cu(r,t,t,e)}g(xu,"intersectCircle");var L2=xu;function bu(r,t,e,i){{const n=t.y-r.y,o=r.x-t.x,a=t.x*r.y-r.x*t.y,s=n*e.x+o*e.y+a,l=n*i.x+o*i.y+a,h=1e-6;if(s!==0&&l!==0&&Zo(s,l))return;const c=i.y-e.y,d=e.x-i.x,p=i.x*e.y-e.x*i.y,u=c*r.x+d*r.y+p,m=c*t.x+d*t.y+p;if(Math.abs(u)<h&&Math.abs(m)<h&&Zo(u,m))return;const f=n*d-c*o;if(f===0)return;const y=Math.abs(f/2);let C=o*p-d*a;const b=C<0?(C-y)/f:(C+y)/f;C=c*a-n*p;const k=C<0?(C-y)/f:(C+y)/f;return{x:b,y:k}}}g(bu,"intersectLine");function Zo(r,t){return r*t>0}g(Zo,"sameSign");var F2=bu;function ku(r,t,e){let i=r.x,n=r.y,o=[],a=Number.POSITIVE_INFINITY,s=Number.POSITIVE_INFINITY;typeof t.forEach=="function"?t.forEach(function(c){a=Math.min(a,c.x),s=Math.min(s,c.y)}):(a=Math.min(a,t.x),s=Math.min(s,t.y));let l=i-r.width/2-a,h=n-r.height/2-s;for(let c=0;c<t.length;c++){let d=t[c],p=t[c<t.length-1?c+1:0],u=F2(r,e,{x:l+d.x,y:h+d.y},{x:l+p.x,y:h+p.y});u&&o.push(u)}return o.length?(o.length>1&&o.sort(function(c,d){let p=c.x-e.x,u=c.y-e.y,m=Math.sqrt(p*p+u*u),f=d.x-e.x,y=d.y-e.y,C=Math.sqrt(f*f+y*y);return m<C?-1:m===C?0:1}),o[0]):r}g(ku,"intersectPolygon");var M2=ku,N={node:B2,circle:L2,ellipse:Cu,polygon:M2,rect:xe};function wu(r,t){const{labelStyles:e}=H(t);t.labelStyle=e;const i=Y(t);let n=i;i||(n="anchor");const o=r.insert("g").attr("class",n).attr("id",t.domId||t.id),a=1,{cssStyles:s}=t,l=q.svg(o),h=j(t,{fill:"black",stroke:"none",fillStyle:"solid"});t.look!=="handDrawn"&&(h.roughness=0);const c=l.circle(0,0,a*2,h),d=o.insert(()=>c,":first-child");return d.attr("class","anchor").attr("style",xt(s)),U(t,d),t.intersect=function(p){return P.info("Circle intersect",t,a,p),N.circle(t,a,p)},o}g(wu,"anchor");function Qo(r,t,e,i,n,o,a){const l=(r+e)/2,h=(t+i)/2,c=Math.atan2(i-t,e-r),d=(e-r)/2,p=(i-t)/2,u=d/n,m=p/o,f=Math.sqrt(u**2+m**2);if(f>1)throw new Error("The given radii are too small to create an arc between the points.");const y=Math.sqrt(1-f**2),C=l+y*o*Math.sin(c)*(a?-1:1),b=h-y*n*Math.cos(c)*(a?-1:1),k=Math.atan2((t-b)/o,(r-C)/n);let v=Math.atan2((i-b)/o,(e-C)/n)-k;a&&v<0&&(v+=2*Math.PI),!a&&v>0&&(v-=2*Math.PI);const _=[];for(let w=0;w<20;w++){const S=w/19,M=k+S*v,A=C+n*Math.cos(M),E=b+o*Math.sin(M);_.push({x:A,y:E})}return _}g(Qo,"generateArcPoints");function Tu(r,t,e){const[i,n]=[t,e].sort((o,a)=>a-o);return n*(1-Math.sqrt(1-(r/i/2)**2))}g(Tu,"calculateArcSagitta");async function vu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?16:n,a=t.look==="neo"?12:n,s=g(M=>M+a,"calcTotalHeight"),l=g(M=>{const A=M/2;return[A/(2.5+M/50),A]},"calcEllipseRadius"),{shapeSvg:h,bbox:c}=await K(r,t,Y(t)),d=s(t!=null&&t.height?t==null?void 0:t.height:c.height),[p,u]=l(d),m=Tu(d,p,u),y=(t!=null&&t.width?t==null?void 0:t.width:c.width)+o*2+m-m,C=d,{cssStyles:b}=t,k=[{x:y/2,y:-C/2},{x:-y/2,y:-C/2},...Qo(-y/2,-C/2,-y/2,C/2,p,u,!1),{x:y/2,y:C/2},...Qo(y/2,C/2,y/2,-C/2,p,u,!0)],T=q.svg(h),v=j(t,{});t.look!=="handDrawn"&&(v.roughness=0,v.fillStyle="solid");const _=et(k),w=T.path(_,v),S=h.insert(()=>w,":first-child");return S.attr("class","basic label-container outer-path"),b&&t.look!=="handDrawn"&&S.selectAll("path").attr("style",b),i&&t.look!=="handDrawn"&&S.selectAll("path").attr("style",i),S.attr("transform",`translate(${p/2}, 0)`),U(t,S),t.intersect=function(M){return N.polygon(t,k,M)},h}g(vu,"bowTieRect");function kr(r,t,e,i){return r.insert("polygon",":first-child").attr("points",i.map(function(n){return n.x+","+n.y}).join(" ")).attr("class","label-container").attr("transform","translate("+-t/2+","+e/2+")")}g(kr,"insertPolygonShape");var Ri=12;async function Su(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?28:n,a=t.look==="neo"?24:n,{shapeSvg:s,bbox:l}=await K(r,t,Y(t)),h=((t==null?void 0:t.width)??l.width)+(t.look==="neo"?o*2:o+Ri),c=((t==null?void 0:t.height)??l.height)+(t.look==="neo"?a*2:a),d=0,p=h,u=-c,m=0,f=[{x:d+Ri,y:u},{x:p,y:u},{x:p,y:m},{x:d,y:m},{x:d,y:u+Ri},{x:d+Ri,y:u}];let y;const{cssStyles:C}=t;if(t.look==="handDrawn"){const b=q.svg(s),k=j(t,{}),T=et(f),v=b.path(T,k);y=s.insert(()=>v,":first-child").attr("transform",`translate(${-h/2}, ${c/2})`),C&&y.attr("style",C)}else y=kr(s,h,c,f);return i&&y.attr("style",i),U(t,y),t.intersect=function(b){return N.polygon(t,f,b)},s}g(Su,"card");function _u(r,t){const{nodeStyles:e}=H(t);t.label="";const i=r.insert("g").attr("class",Y(t)).attr("id",t.domId??t.id),{cssStyles:n}=t,o=Math.max(28,t.width??0),a=[{x:0,y:o/2},{x:o/2,y:0},{x:0,y:-o/2},{x:-o/2,y:0}],s=q.svg(i),l=j(t,{});t.look!=="handDrawn"&&(l.roughness=0,l.fillStyle="solid");const h=et(a),c=s.path(h,l),d=i.insert(()=>c,":first-child");return n&&t.look!=="handDrawn"&&d.selectAll("path").attr("style",n),e&&t.look!=="handDrawn"&&d.selectAll("path").attr("style",e),t.width=28,t.height=28,t.intersect=function(p){return N.polygon(t,a,p)},i}g(_u,"choice");async function Qs(r,t,e){const{labelStyles:i,nodeStyles:n}=H(t);t.labelStyle=i;const{shapeSvg:o,bbox:a,halfPadding:s}=await K(r,t,Y(t)),l=16,h=(e==null?void 0:e.padding)??s,c=t.look==="neo"?a.width/2+l*2:a.width/2+h;let d;const{cssStyles:p}=t;if(t.look==="handDrawn"){const u=q.svg(o),m=j(t,{}),f=u.circle(0,0,c*2,m);d=o.insert(()=>f,":first-child"),d.attr("class","basic label-container").attr("style",xt(p))}else d=o.insert("circle",":first-child").attr("class","basic label-container").attr("style",n).attr("r",c).attr("cx",0).attr("cy",0);return U(t,d),t.calcIntersect=function(u,m){const f=u.width/2;return N.circle(u,f,m)},t.intersect=function(u){return P.info("Circle intersect",t,c,u),N.circle(t,c,u)},o}g(Qs,"circle");function Bu(r){const t=Math.cos(Math.PI/4),e=Math.sin(Math.PI/4),i=r*2,n={x:i/2*t,y:i/2*e},o={x:-(i/2)*t,y:i/2*e},a={x:-(i/2)*t,y:-(i/2)*e},s={x:i/2*t,y:-(i/2)*e};return`M ${o.x},${o.y} L ${s.x},${s.y}
                   M ${n.x},${n.y} L ${a.x},${a.y}`}g(Bu,"createLine");function Lu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e,t.label="";const n=r.insert("g").attr("class",Y(t)).attr("id",t.domId??t.id),o=Math.max(30,(t==null?void 0:t.width)??0),{cssStyles:a}=t,s=q.svg(n),l=j(t,{});t.look!=="handDrawn"&&(l.roughness=0,l.fillStyle="solid");const h=s.circle(0,0,o*2,l),c=Bu(o),d=s.path(c,l),p=n.insert(()=>h,":first-child");return p.insert(()=>d),p.attr("class","outer-path"),a&&t.look!=="handDrawn"&&p.selectAll("path").attr("style",a),i&&t.look!=="handDrawn"&&p.selectAll("path").attr("style",i),U(t,p),t.intersect=function(u){return P.info("crossedCircle intersect",t,{radius:o,point:u}),N.circle(t,o,u)},n}g(Lu,"crossedCircle");function pr(r,t,e,i=100,n=0,o=180){const a=[],s=n*Math.PI/180,c=(o*Math.PI/180-s)/(i-1);for(let d=0;d<i;d++){const p=s+d*c,u=r+e*Math.cos(p),m=t+e*Math.sin(p);a.push({x:-u,y:-m})}return a}g(pr,"generateCirclePoints");async function Fu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const{shapeSvg:n,bbox:o,label:a}=await K(r,t,Y(t)),s=t.look==="neo"?18:t.padding??0,l=t.look==="neo"?12:t.padding??0,h=o.width+s,c=o.height+l,d=Math.max(5,c*.1),{cssStyles:p}=t,u=[...pr(h/2,-c/2,d,30,-90,0),{x:-h/2-d,y:d},...pr(h/2+d*2,-d,d,20,-180,-270),...pr(h/2+d*2,d,d,20,-90,-180),{x:-h/2-d,y:-c/2},...pr(h/2,c/2,d,20,0,90)],m=[{x:h/2,y:-c/2-d},{x:-h/2,y:-c/2-d},...pr(h/2,-c/2,d,20,-90,0),{x:-h/2-d,y:-d},...pr(h/2+h*.1,-d,d,20,-180,-270),...pr(h/2+h*.1,d,d,20,-90,-180),{x:-h/2-d,y:c/2},...pr(h/2,c/2,d,20,0,90),{x:-h/2,y:c/2+d},{x:h/2,y:c/2+d}],f=q.svg(n),y=j(t,{fill:"none"});t.look!=="handDrawn"&&(y.roughness=0,y.fillStyle="solid");const b=et(u).replace("Z",""),k=f.path(b,y),T=et(m),v=f.path(T,{...y}),_=n.insert("g",":first-child");return _.insert(()=>v,":first-child").attr("stroke-opacity",0),_.insert(()=>k,":first-child"),_.attr("class","text"),p&&t.look!=="handDrawn"&&_.selectAll("path").attr("style",p),i&&t.look!=="handDrawn"&&_.selectAll("path").attr("style",i),_.attr("transform",`translate(${d}, 0)`),a.attr("transform",`translate(${-h/2+d-(o.x-(o.left??0))},${-c/2+(t.padding??0)/2-(o.y-(o.top??0))})`),U(t,_),t.intersect=function(w){return N.polygon(t,m,w)},n}g(Fu,"curlyBraceLeft");function gr(r,t,e,i=100,n=0,o=180){const a=[],s=n*Math.PI/180,c=(o*Math.PI/180-s)/(i-1);for(let d=0;d<i;d++){const p=s+d*c,u=r+e*Math.cos(p),m=t+e*Math.sin(p);a.push({x:u,y:m})}return a}g(gr,"generateCirclePoints");async function Mu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const{shapeSvg:n,bbox:o,label:a}=await K(r,t,Y(t)),s=t.look==="neo"?18:t.padding??0,l=t.look==="neo"?12:t.padding??0,h=o.width+(t.look==="neo"?s*2:s),c=o.height+(t.look==="neo"?l*2:l),d=Math.max(5,c*.1),{cssStyles:p}=t,u=[...gr(h/2,-c/2,d,20,-90,0),{x:h/2+d,y:-d},...gr(h/2+d*2,-d,d,20,-180,-270),...gr(h/2+d*2,d,d,20,-90,-180),{x:h/2+d,y:c/2},...gr(h/2,c/2,d,20,0,90)],m=[{x:-h/2,y:-c/2-d},{x:h/2,y:-c/2-d},...gr(h/2,-c/2,d,20,-90,0),{x:h/2+d,y:-d},...gr(h/2+d*2,-d,d,20,-180,-270),...gr(h/2+d*2,d,d,20,-90,-180),{x:h/2+d,y:c/2},...gr(h/2,c/2,d,20,0,90),{x:h/2,y:c/2+d},{x:-h/2,y:c/2+d}],f=q.svg(n),y=j(t,{fill:"none"});t.look!=="handDrawn"&&(y.roughness=0,y.fillStyle="solid");const b=et(u).replace("Z",""),k=f.path(b,y),T=et(m),v=f.path(T,{...y}),_=n.insert("g",":first-child");return _.insert(()=>v,":first-child").attr("stroke-opacity",0),_.insert(()=>k,":first-child"),_.attr("class","text"),p&&t.look!=="handDrawn"&&_.selectAll("path").attr("style",p),i&&t.look!=="handDrawn"&&_.selectAll("path").attr("style",i),_.attr("transform",`translate(${-d}, 0)`),a.attr("transform",`translate(${-h/2+(t.padding??0)/2-(o.x-(o.left??0))},${-c/2+(t.padding??0)/2-(o.y-(o.top??0))})`),U(t,_),t.intersect=function(w){return N.polygon(t,m,w)},n}g(Mu,"curlyBraceRight");function kt(r,t,e,i=100,n=0,o=180){const a=[],s=n*Math.PI/180,c=(o*Math.PI/180-s)/(i-1);for(let d=0;d<i;d++){const p=s+d*c,u=r+e*Math.cos(p),m=t+e*Math.sin(p);a.push({x:-u,y:-m})}return a}g(kt,"generateCirclePoints");async function Au(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const{shapeSvg:n,bbox:o,label:a}=await K(r,t,Y(t)),s=t.look==="neo"?18:t.padding??0,l=t.look==="neo"?12:t.padding??0,h=o.width+(t.look==="neo"?s*2:s),c=o.height+(t.look==="neo"?l*2:l),d=Math.max(5,c*.1),{cssStyles:p}=t,u=[...kt(h/2,-c/2,d,30,-90,0),{x:-h/2-d,y:d},...kt(h/2+d*2,-d,d,20,-180,-270),...kt(h/2+d*2,d,d,20,-90,-180),{x:-h/2-d,y:-c/2},...kt(h/2,c/2,d,20,0,90)],m=[...kt(-h/2+d+d/2,-c/2,d,20,-90,-180),{x:h/2-d/2,y:d},...kt(-h/2-d/2,-d,d,20,0,90),...kt(-h/2-d/2,d,d,20,-90,0),{x:h/2-d/2,y:-d},...kt(-h/2+d+d/2,c/2,d,30,-180,-270)],f=[{x:h/2,y:-c/2-d},{x:-h/2,y:-c/2-d},...kt(h/2,-c/2,d,20,-90,0),{x:-h/2-d,y:-d},...kt(h/2+d*2,-d,d,20,-180,-270),...kt(h/2+d*2,d,d,20,-90,-180),{x:-h/2-d,y:c/2},...kt(h/2,c/2,d,20,0,90),{x:-h/2,y:c/2+d},{x:h/2-d-d/2,y:c/2+d},...kt(-h/2+d+d/2,-c/2,d,20,-90,-180),{x:h/2-d/2,y:d},...kt(-h/2-d/2,-d,d,20,0,90),...kt(-h/2-d/2,d,d,20,-90,0),{x:h/2-d/2,y:-d},...kt(-h/2+d+d/2,c/2,d,30,-180,-270)],y=q.svg(n),C=j(t,{fill:"none"});t.look!=="handDrawn"&&(C.roughness=0,C.fillStyle="solid");const k=et(u).replace("Z",""),T=y.path(k,C),_=et(m).replace("Z",""),w=y.path(_,C),S=et(f),M=y.path(S,{...C}),A=n.insert("g",":first-child");return A.insert(()=>M,":first-child").attr("stroke-opacity",0),A.insert(()=>T,":first-child"),A.insert(()=>w,":first-child"),A.attr("class","text"),p&&t.look!=="handDrawn"&&A.selectAll("path").attr("style",p),i&&t.look!=="handDrawn"&&A.selectAll("path").attr("style",i),A.attr("transform",`translate(${d-d/4}, 0)`),a.attr("transform",`translate(${-h/2+(t.padding??0)/2-(o.x-(o.left??0))},${-c/2+(t.padding??0)/2-(o.y-(o.top??0))})`),U(t,A),t.intersect=function(E){return N.polygon(t,f,E)},n}g(Au,"curlyBraces");async function Eu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?16:n,a=t.look==="neo"?12:n,s=20,l=5,{shapeSvg:h,bbox:c}=await K(r,t,Y(t)),d=Math.max(s,(c.width+o*2)*1.25,(t==null?void 0:t.width)??0),p=Math.max(l,c.height+a*2,(t==null?void 0:t.height)??0),u=p/2,{cssStyles:m}=t,f=q.svg(h),y=j(t,{});t.look!=="handDrawn"&&(y.roughness=0,y.fillStyle="solid");const C=d,b=p,k=C-u,T=b/4,v=[{x:k,y:0},{x:T,y:0},{x:0,y:b/2},{x:T,y:b},{x:k,y:b},...Qe(-k,-b/2,u,50,270,90)],_=et(v),w=f.path(_,y),S=h.insert(()=>w,":first-child");return S.attr("class","basic label-container outer-path"),m&&t.look!=="handDrawn"&&S.selectChildren("path").attr("style",m),i&&t.look!=="handDrawn"&&S.selectChildren("path").attr("style",i),S.attr("transform",`translate(${-d/2}, ${-p/2})`),U(t,S),t.intersect=function(M){return N.polygon(t,v,M)},h}g(Eu,"curvedTrapezoid");var A2=g((r,t,e,i,n,o)=>[`M${r},${t+o}`,`a${n},${o} 0,0,0 ${e},0`,`a${n},${o} 0,0,0 ${-e},0`,`l0,${i}`,`a${n},${o} 0,0,0 ${e},0`,`l0,${-i}`].join(" "),"createCylinderPathD"),E2=g((r,t,e,i,n,o)=>[`M${r},${t+o}`,`M${r+e},${t+o}`,`a${n},${o} 0,0,0 ${-e},0`,`l0,${i}`,`a${n},${o} 0,0,0 ${e},0`,`l0,${-i}`].join(" "),"createOuterCylinderPathD"),P2=g((r,t,e,i,n,o)=>[`M${r-e/2},${-i/2}`,`a${n},${o} 0,0,0 ${e},0`].join(" "),"createInnerCylinderPathD"),ol=8,sl=8;async function Pu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?24:n,a=t.look==="neo"?24:n;if(t.width||t.height){const y=t.width??0;t.width=(t.width??0)-a,t.width<sl&&(t.width=sl);const b=y/2/(2.5+y/50);t.height=(t.height??0)-o-b*3,t.height<ol&&(t.height=ol)}const{shapeSvg:s,bbox:l,label:h}=await K(r,t,Y(t)),c=(t.width?t.width:l.width)+a,d=c/2,p=d/(2.5+c/50),u=(t.height?t.height:l.height)+o+p;let m;const{cssStyles:f}=t;if(t.look==="handDrawn"){const y=q.svg(s),C=E2(0,0,c,u,d,p),b=P2(0,p,c,u,d,p),k=j(t,{}),T=y.path(C,k),v=y.path(b,j(t,{fill:"none"}));m=s.insert(()=>v,":first-child"),m=s.insert(()=>T,":first-child"),m.attr("class","basic label-container"),f&&m.attr("style",f)}else{const y=A2(0,0,c,u,d,p);m=s.insert("path",":first-child").attr("d",y).attr("class","basic label-container outer-path").attr("style",xt(f)).attr("style",i)}return m.attr("label-offset-y",p),m.attr("transform",`translate(${-c/2}, ${-(u/2+p)})`),U(t,m),h.attr("transform",`translate(${-(l.width/2)-(l.x-(l.left??0))}, ${-(l.height/2)+(t.padding??0)/1.5-(l.y-(l.top??0))})`),t.intersect=function(y){const C=N.rect(t,y),b=C.x-(t.x??0);if(d!=0&&(Math.abs(b)<(t.width??0)/2||Math.abs(b)==(t.width??0)/2&&Math.abs(C.y-(t.y??0))>(t.height??0)/2-p)){let k=p*p*(1-b*b/(d*d));k>0&&(k=Math.sqrt(k)),k=p-k,y.y-(t.y??0)>0&&(k=-k),C.y+=k}return C},s}g(Pu,"cylinder");async function Du(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.look==="neo"?16:t.padding??0,o=t.look==="neo"?16:t.padding??0,{shapeSvg:a,bbox:s,label:l}=await K(r,t,Y(t)),h=s.width+n,c=s.height+o,d=c*.2,p=-h/2,u=-c/2-d/2,{cssStyles:m}=t,f=q.svg(a),y=j(t,{});t.look!=="handDrawn"&&(y.roughness=0,y.fillStyle="solid");const C=[{x:p,y:u+d},{x:-p,y:u+d},{x:-p,y:-u},{x:p,y:-u},{x:p,y:u},{x:-p,y:u},{x:-p,y:u+d}],b=f.polygon(C.map(T=>[T.x,T.y]),y),k=a.insert(()=>b,":first-child");return k.attr("class","basic label-container outer-path"),m&&t.look!=="handDrawn"&&k.selectAll("path").attr("style",m),i&&t.look!=="handDrawn"&&k.selectAll("path").attr("style",i),l.attr("transform",`translate(${p+(t.padding??0)/2-(s.x-(s.left??0))}, ${u+d+(t.padding??0)/2-(s.y-(s.top??0))})`),U(t,k),t.intersect=function(T){return N.rect(t,T)},a}g(Du,"dividedRectangle");async function Iu(r,t){var u,m;const{labelStyles:e,nodeStyles:i}=H(t),n=t.look==="neo"?12:5;t.labelStyle=e;const o=t.padding??0,a=t.look==="neo"?16:o,{shapeSvg:s,bbox:l}=await K(r,t,Y(t)),h=(t!=null&&t.width?(t==null?void 0:t.width)/2:l.width/2)+(a??0),c=h-n;let d;const{cssStyles:p}=t;if(t.look==="handDrawn"){const f=q.svg(s),y=j(t,{roughness:.2,strokeWidth:2.5}),C=j(t,{roughness:.2,strokeWidth:1.5}),b=f.circle(0,0,h*2,y),k=f.circle(0,0,c*2,C);d=s.insert("g",":first-child"),d.attr("class",xt(t.cssClasses)).attr("style",xt(p)),(u=d.node())==null||u.appendChild(b),(m=d.node())==null||m.appendChild(k)}else{d=s.insert("g",":first-child");const f=d.insert("circle",":first-child"),y=d.insert("circle");d.attr("class","basic label-container").attr("style",i),f.attr("class","outer-circle").attr("style",i).attr("r",h).attr("cx",0).attr("cy",0),y.attr("class","inner-circle").attr("style",i).attr("r",c).attr("cx",0).attr("cy",0)}return U(t,d),t.intersect=function(f){return P.info("DoubleCircle intersect",t,h,f),N.circle(t,h,f)},s}g(Iu,"doublecircle");function Ru(r,t,{config:{themeVariables:e}}){const{labelStyles:i,nodeStyles:n}=H(t);t.label="",t.labelStyle=i;const o=r.insert("g").attr("class",Y(t)).attr("id",t.domId??t.id),a=7,{cssStyles:s}=t,l=q.svg(o),{nodeBorder:h}=e,c=j(t,{fillStyle:"solid"});t.look!=="handDrawn"&&(c.roughness=0);const d=l.circle(0,0,a*2,c),p=o.insert(()=>d,":first-child");return p.selectAll("path").attr("style",`fill: ${h} !important;`),s&&s.length>0&&t.look!=="handDrawn"&&p.selectAll("path").attr("style",s),n&&t.look!=="handDrawn"&&p.selectAll("path").attr("style",n),U(t,p),t.intersect=function(u){return P.info("filledCircle intersect",t,{radius:a,point:u}),N.circle(t,a,u)},o}g(Ru,"filledCircle");var al=10,ll=10;async function Ou(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?n*2:n;(t.width||t.height)&&(t.height=(t==null?void 0:t.height)??0,t.height<al&&(t.height=al),t.width=((t==null?void 0:t.width)??0)-o-o/2,t.width<ll&&(t.width=ll));const{shapeSvg:a,bbox:s,label:l}=await K(r,t,Y(t)),h=(t!=null&&t.width?t==null?void 0:t.width:s.width)+(o??0),c=t!=null&&t.height?t==null?void 0:t.height:h+s.height,d=c,p=[{x:0,y:-c},{x:d,y:-c},{x:d/2,y:0}],{cssStyles:u}=t,m=q.svg(a),f=j(t,{});t.look!=="handDrawn"&&(f.roughness=0,f.fillStyle="solid");const y=et(p),C=m.path(y,f),b=a.insert(()=>C,":first-child").attr("transform",`translate(${-c/2}, ${c/2})`).attr("class","outer-path");return u&&t.look!=="handDrawn"&&b.selectChildren("path").attr("style",u),i&&t.look!=="handDrawn"&&b.selectChildren("path").attr("style",i),t.width=h,t.height=c,U(t,b),l.attr("transform",`translate(${-s.width/2-(s.x-(s.left??0))}, ${-c/2+(t.padding??0)/2+(s.y-(s.top??0))})`),t.intersect=function(k){return P.info("Triangle intersect",t,p,k),N.polygon(t,p,k)},a}g(Ou,"flippedTriangle");function $u(r,t,{dir:e,config:{state:i,themeVariables:n}}){const{nodeStyles:o}=H(t);t.label="";const a=r.insert("g").attr("class",Y(t)).attr("id",t.domId??t.id),{cssStyles:s}=t;let l=Math.max(70,(t==null?void 0:t.width)??0),h=Math.max(10,(t==null?void 0:t.height)??0);e==="LR"&&(l=Math.max(10,(t==null?void 0:t.width)??0),h=Math.max(70,(t==null?void 0:t.height)??0));const c=-1*l/2,d=-1*h/2,p=q.svg(a),u=j(t,{stroke:n.lineColor,fill:n.lineColor});t.look!=="handDrawn"&&(u.roughness=0,u.fillStyle="solid");const m=p.rectangle(c,d,l,h,u),f=a.insert(()=>m,":first-child");s&&t.look!=="handDrawn"&&f.selectAll("path").attr("style",s),o&&t.look!=="handDrawn"&&f.selectAll("path").attr("style",o),U(t,f);const y=(i==null?void 0:i.padding)??0;return t.width&&t.height&&(t.width+=y/2||0,t.height+=y/2||0),t.intersect=function(C){return N.rect(t,C)},a}g($u,"forkJoin");async function Wu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=15,o=10,a=t.look==="neo"?16:t.padding??0,s=t.look==="neo"?12:t.padding??0;(t.width||t.height)&&(t.height=((t==null?void 0:t.height)??0)-s*2,t.height<o&&(t.height=o),t.width=((t==null?void 0:t.width)??0)-a*2,t.width<n&&(t.width=n));const{shapeSvg:l,bbox:h}=await K(r,t,Y(t)),c=(t!=null&&t.width?t==null?void 0:t.width:Math.max(n,h.width))+a*2,d=(t!=null&&t.height?t==null?void 0:t.height:Math.max(o,h.height))+s*2,p=d/2,{cssStyles:u}=t,m=q.svg(l),f=j(t,{});t.look!=="handDrawn"&&(f.roughness=0,f.fillStyle="solid");const y=[{x:-c/2,y:-d/2},{x:c/2-p,y:-d/2},...Qe(-c/2+p,0,p,50,90,270),{x:c/2-p,y:d/2},{x:-c/2,y:d/2}],C=et(y),b=m.path(C,f),k=l.insert(()=>b,":first-child");return k.attr("class","basic label-container outer-path"),u&&t.look!=="handDrawn"&&k.selectChildren("path").attr("style",u),i&&t.look!=="handDrawn"&&k.selectChildren("path").attr("style",i),U(t,k),t.intersect=function(T){return P.info("Pill intersect",t,{radius:p,point:T}),N.polygon(t,y,T)},l}g(Wu,"halfRoundedRectangle");var D2=g((r,t,e,i,n)=>[`M${r+n},${t}`,`L${r+e-n},${t}`,`L${r+e},${t-i/2}`,`L${r+e-n},${t-i}`,`L${r+n},${t-i}`,`L${r},${t-i/2}`,"Z"].join(" "),"createHexagonPathD");async function zu(r,t){const{labelStyles:e,nodeStyles:i}=H(t),n=t.look==="neo"?3.5:4;t.labelStyle=e;const o=t.padding??0,a=70,s=32,l=t.look==="neo"?a:o,h=t.look==="neo"?s:o;if(t.width||t.height){const k=(t.height??0)/n;t.width=((t==null?void 0:t.width)??0)-2*k-h,t.height=(t.height??0)-l}const{shapeSvg:c,bbox:d}=await K(r,t,Y(t)),p=(t!=null&&t.height?t==null?void 0:t.height:d.height)+l,u=p/n,m=(t!=null&&t.width?t==null?void 0:t.width:d.width)+2*u+h,f=[{x:u,y:0},{x:m-u,y:0},{x:m,y:-p/2},{x:m-u,y:-p},{x:u,y:-p},{x:0,y:-p/2}];let y;const{cssStyles:C}=t;if(t.look==="handDrawn"){const b=q.svg(c),k=j(t,{}),T=D2(0,0,m,p,u),v=b.path(T,k);y=c.insert(()=>v,":first-child").attr("transform",`translate(${-m/2}, ${p/2})`),C&&y.attr("style",C)}else y=kr(c,m,p,f);return i&&y.attr("style",i),t.width=m,t.height=p,U(t,y),t.intersect=function(b){return N.polygon(t,f,b)},c}g(zu,"hexagon");async function Nu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.label="",t.labelStyle=e;const{shapeSvg:n}=await K(r,t,Y(t)),o=Math.max(30,(t==null?void 0:t.width)??0),a=Math.max(30,(t==null?void 0:t.height)??0),{cssStyles:s}=t,l=q.svg(n),h=j(t,{});t.look!=="handDrawn"&&(h.roughness=0,h.fillStyle="solid");const c=[{x:0,y:0},{x:o,y:0},{x:0,y:a},{x:o,y:a}],d=et(c),p=l.path(d,h),u=n.insert(()=>p,":first-child");return u.attr("class","basic label-container outer-path"),s&&t.look!=="handDrawn"&&u.selectChildren("path").attr("style",s),i&&t.look!=="handDrawn"&&u.selectChildren("path").attr("style",i),u.attr("transform",`translate(${-o/2}, ${-a/2})`),U(t,u),t.intersect=function(m){return P.info("Pill intersect",t,{points:c}),N.polygon(t,c,m)},n}g(Nu,"hourglass");async function qu(r,t,{config:{themeVariables:e,flowchart:i}}){const{labelStyles:n}=H(t);t.labelStyle=n;const o=t.assetHeight??48,a=t.assetWidth??48,s=Math.max(o,a),l=i==null?void 0:i.wrappingWidth;t.width=Math.max(s,l??0);const{shapeSvg:h,bbox:c,label:d}=await K(r,t,"icon-shape default"),p=t.pos==="t",u=s,m=s,{nodeBorder:f}=e,{stylesMap:y}=Ce(t),C=-m/2,b=-u/2,k=t.label?8:0,T=q.svg(h),v=j(t,{stroke:"none",fill:"none"});t.look!=="handDrawn"&&(v.roughness=0,v.fillStyle="solid");const _=T.rectangle(C,b,m,u,v),w=Math.max(m,c.width),S=u+c.height+k,M=T.rectangle(-w/2,-S/2,w,S,{...v,fill:"transparent",stroke:"none"}),A=h.insert(()=>_,":first-child"),E=h.insert(()=>M);if(t.icon){const z=h.append("g");z.html(`<g>${await ki(t.icon,{height:s,width:s,fallbackPrefix:""})}</g>`);const R=z.node().getBBox(),O=R.width,W=R.height,I=R.x,$=R.y;z.attr("transform",`translate(${-O/2-I},${p?c.height/2+k/2-W/2-$:-c.height/2-k/2-W/2-$})`),z.attr("style",`color: ${y.get("stroke")??f};`)}return d.attr("transform",`translate(${-c.width/2-(c.x-(c.left??0))},${p?-S/2:S/2-c.height})`),A.attr("transform",`translate(0,${p?c.height/2+k/2:-c.height/2-k/2})`),U(t,E),t.intersect=function(z){if(P.info("iconSquare intersect",t,z),!t.label)return N.rect(t,z);const R=t.x??0,O=t.y??0,W=t.height??0;let I=[];return p?I=[{x:R-c.width/2,y:O-W/2},{x:R+c.width/2,y:O-W/2},{x:R+c.width/2,y:O-W/2+c.height+k},{x:R+m/2,y:O-W/2+c.height+k},{x:R+m/2,y:O+W/2},{x:R-m/2,y:O+W/2},{x:R-m/2,y:O-W/2+c.height+k},{x:R-c.width/2,y:O-W/2+c.height+k}]:I=[{x:R-m/2,y:O-W/2},{x:R+m/2,y:O-W/2},{x:R+m/2,y:O-W/2+u},{x:R+c.width/2,y:O-W/2+u},{x:R+c.width/2/2,y:O+W/2},{x:R-c.width/2,y:O+W/2},{x:R-c.width/2,y:O-W/2+u},{x:R-m/2,y:O-W/2+u}],N.polygon(t,I,z)},h}g(qu,"icon");async function ju(r,t,{config:{themeVariables:e,flowchart:i}}){const{labelStyles:n}=H(t);t.labelStyle=n;const o=t.assetHeight??48,a=t.assetWidth??48,s=Math.max(o,a),l=i==null?void 0:i.wrappingWidth;t.width=Math.max(s,l??0);const{shapeSvg:h,bbox:c,label:d}=await K(r,t,"icon-shape default"),p=20,u=t.label?8:0,m=t.pos==="t",{nodeBorder:f,mainBkg:y}=e,{stylesMap:C}=Ce(t),b=q.svg(h),k=j(t,{});t.look!=="handDrawn"&&(k.roughness=0,k.fillStyle="solid");const T=C.get("fill");k.stroke=T??y;const v=h.append("g");t.icon&&v.html(`<g>${await ki(t.icon,{height:s,width:s,fallbackPrefix:""})}</g>`);const _=v.node().getBBox(),w=_.width,S=_.height,M=_.x,A=_.y,E=Math.max(w,S)*Math.SQRT2+p*2,z=b.circle(0,0,E,k),R=Math.max(E,c.width),O=E+c.height+u,W=b.rectangle(-R/2,-O/2,R,O,{...k,fill:"transparent",stroke:"none"}),I=h.insert(()=>z,":first-child"),$=h.insert(()=>W);return v.attr("transform",`translate(${-w/2-M},${m?c.height/2+u/2-S/2-A:-c.height/2-u/2-S/2-A})`),v.attr("style",`color: ${C.get("stroke")??f};`),d.attr("transform",`translate(${-c.width/2-(c.x-(c.left??0))},${m?-O/2:O/2-c.height})`),I.attr("transform",`translate(0,${m?c.height/2+u/2:-c.height/2-u/2})`),U(t,$),t.intersect=function(D){return P.info("iconSquare intersect",t,D),N.rect(t,D)},h}g(ju,"iconCircle");async function Hu(r,t,{config:{themeVariables:e,flowchart:i}}){const{labelStyles:n}=H(t);t.labelStyle=n;const o=t.assetHeight??48,a=t.assetWidth??48,s=Math.max(o,a),l=i==null?void 0:i.wrappingWidth;t.width=Math.max(s,l??0);const{shapeSvg:h,bbox:c,halfPadding:d,label:p}=await K(r,t,"icon-shape default"),u=t.pos==="t",m=s+d*2,f=s+d*2,{nodeBorder:y,mainBkg:C}=e,{stylesMap:b}=Ce(t),k=-f/2,T=-m/2,v=t.label?8:0,_=q.svg(h),w=j(t,{});t.look!=="handDrawn"&&(w.roughness=0,w.fillStyle="solid");const S=b.get("fill");w.stroke=S??C;const M=_.path(Pr(k,T,f,m,5),w),A=Math.max(f,c.width),E=m+c.height+v,z=_.rectangle(-A/2,-E/2,A,E,{...w,fill:"transparent",stroke:"none"}),R=h.insert(()=>M,":first-child").attr("class","icon-shape2"),O=h.insert(()=>z);if(t.icon){const W=h.append("g");W.html(`<g>${await ki(t.icon,{height:s,width:s,fallbackPrefix:""})}</g>`);const I=W.node().getBBox(),$=I.width,D=I.height,V=I.x,rt=I.y;W.attr("transform",`translate(${-$/2-V},${u?c.height/2+v/2-D/2-rt:-c.height/2-v/2-D/2-rt})`),W.attr("style",`color: ${b.get("stroke")??y};`)}return p.attr("transform",`translate(${-c.width/2-(c.x-(c.left??0))},${u?-E/2:E/2-c.height})`),R.attr("transform",`translate(0,${u?c.height/2+v/2:-c.height/2-v/2})`),U(t,O),t.intersect=function(W){if(P.info("iconSquare intersect",t,W),!t.label)return N.rect(t,W);const I=t.x??0,$=t.y??0,D=t.height??0;let V=[];return u?V=[{x:I-c.width/2,y:$-D/2},{x:I+c.width/2,y:$-D/2},{x:I+c.width/2,y:$-D/2+c.height+v},{x:I+f/2,y:$-D/2+c.height+v},{x:I+f/2,y:$+D/2},{x:I-f/2,y:$+D/2},{x:I-f/2,y:$-D/2+c.height+v},{x:I-c.width/2,y:$-D/2+c.height+v}]:V=[{x:I-f/2,y:$-D/2},{x:I+f/2,y:$-D/2},{x:I+f/2,y:$-D/2+m},{x:I+c.width/2,y:$-D/2+m},{x:I+c.width/2/2,y:$+D/2},{x:I-c.width/2,y:$+D/2},{x:I-c.width/2,y:$-D/2+m},{x:I-f/2,y:$-D/2+m}],N.polygon(t,V,W)},h}g(Hu,"iconRounded");async function Uu(r,t,{config:{themeVariables:e,flowchart:i}}){const{labelStyles:n}=H(t);t.labelStyle=n;const o=t.assetHeight??48,a=t.assetWidth??48,s=Math.max(o,a),l=i==null?void 0:i.wrappingWidth;t.width=Math.max(s,l??0);const{shapeSvg:h,bbox:c,halfPadding:d,label:p}=await K(r,t,"icon-shape default"),u=t.pos==="t",m=s+d*2,f=s+d*2,{nodeBorder:y,mainBkg:C}=e,{stylesMap:b}=Ce(t),k=-f/2,T=-m/2,v=t.label?8:0,_=q.svg(h),w=j(t,{});t.look!=="handDrawn"&&(w.roughness=0,w.fillStyle="solid");const S=b.get("fill");w.stroke=S??C;const M=_.path(Pr(k,T,f,m,.1),w),A=Math.max(f,c.width),E=m+c.height+v,z=_.rectangle(-A/2,-E/2,A,E,{...w,fill:"transparent",stroke:"none"}),R=h.insert(()=>M,":first-child"),O=h.insert(()=>z);if(t.icon){const W=h.append("g");W.html(`<g>${await ki(t.icon,{height:s,width:s,fallbackPrefix:""})}</g>`);const I=W.node().getBBox(),$=I.width,D=I.height,V=I.x,rt=I.y;W.attr("transform",`translate(${-$/2-V},${u?c.height/2+v/2-D/2-rt:-c.height/2-v/2-D/2-rt})`),W.attr("style",`color: ${b.get("stroke")??y};`)}return p.attr("transform",`translate(${-c.width/2-(c.x-(c.left??0))},${u?-E/2:E/2-c.height})`),R.attr("transform",`translate(0,${u?c.height/2+v/2:-c.height/2-v/2})`),U(t,O),t.intersect=function(W){if(P.info("iconSquare intersect",t,W),!t.label)return N.rect(t,W);const I=t.x??0,$=t.y??0,D=t.height??0;let V=[];return u?V=[{x:I-c.width/2,y:$-D/2},{x:I+c.width/2,y:$-D/2},{x:I+c.width/2,y:$-D/2+c.height+v},{x:I+f/2,y:$-D/2+c.height+v},{x:I+f/2,y:$+D/2},{x:I-f/2,y:$+D/2},{x:I-f/2,y:$-D/2+c.height+v},{x:I-c.width/2,y:$-D/2+c.height+v}]:V=[{x:I-f/2,y:$-D/2},{x:I+f/2,y:$-D/2},{x:I+f/2,y:$-D/2+m},{x:I+c.width/2,y:$-D/2+m},{x:I+c.width/2/2,y:$+D/2},{x:I-c.width/2,y:$+D/2},{x:I-c.width/2,y:$-D/2+m},{x:I-f/2,y:$-D/2+m}],N.polygon(t,V,W)},h}g(Uu,"iconSquare");async function Gu(r,t,{config:{flowchart:e}}){const i=new Image;i.src=(t==null?void 0:t.img)??"",await i.decode();const n=Number(i.naturalWidth.toString().replace("px","")),o=Number(i.naturalHeight.toString().replace("px",""));t.imageAspectRatio=n/o;const{labelStyles:a}=H(t);t.labelStyle=a;const s=e==null?void 0:e.wrappingWidth;t.defaultWidth=e==null?void 0:e.wrappingWidth;const l=Math.max(t.label?s??0:0,(t==null?void 0:t.assetWidth)??n),h=t.constraint==="on"&&t!=null&&t.assetHeight?t.assetHeight*t.imageAspectRatio:l,c=t.constraint==="on"?h/t.imageAspectRatio:(t==null?void 0:t.assetHeight)??o;t.width=Math.max(h,s??0);const{shapeSvg:d,bbox:p,label:u}=await K(r,t,"image-shape default"),m=t.pos==="t",f=-h/2,y=-c/2,C=t.label?8:0,b=q.svg(d),k=j(t,{});t.look!=="handDrawn"&&(k.roughness=0,k.fillStyle="solid");const T=b.rectangle(f,y,h,c,k),v=Math.max(h,p.width),_=c+p.height+C,w=b.rectangle(-v/2,-_/2,v,_,{...k,fill:"none",stroke:"none"}),S=d.insert(()=>T,":first-child"),M=d.insert(()=>w);if(t.img){const A=d.append("image");A.attr("href",t.img),A.attr("width",h),A.attr("height",c),A.attr("preserveAspectRatio","none"),A.attr("transform",`translate(${-h/2},${m?_/2-c:-_/2})`)}return u.attr("transform",`translate(${-p.width/2-(p.x-(p.left??0))},${m?-c/2-p.height/2-C/2:c/2-p.height/2+C/2})`),S.attr("transform",`translate(0,${m?p.height/2+C/2:-p.height/2-C/2})`),U(t,M),t.intersect=function(A){if(P.info("iconSquare intersect",t,A),!t.label)return N.rect(t,A);const E=t.x??0,z=t.y??0,R=t.height??0;let O=[];return m?O=[{x:E-p.width/2,y:z-R/2},{x:E+p.width/2,y:z-R/2},{x:E+p.width/2,y:z-R/2+p.height+C},{x:E+h/2,y:z-R/2+p.height+C},{x:E+h/2,y:z+R/2},{x:E-h/2,y:z+R/2},{x:E-h/2,y:z-R/2+p.height+C},{x:E-p.width/2,y:z-R/2+p.height+C}]:O=[{x:E-h/2,y:z-R/2},{x:E+h/2,y:z-R/2},{x:E+h/2,y:z-R/2+c},{x:E+p.width/2,y:z-R/2+c},{x:E+p.width/2/2,y:z+R/2},{x:E-p.width/2,y:z+R/2},{x:E-p.width/2,y:z-R/2+c},{x:E-h/2,y:z-R/2+c}],N.polygon(t,O,A)},d}g(Gu,"imageSquare");async function Vu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=n,a=t.look==="neo"?n*2:n,{shapeSvg:s,bbox:l}=await K(r,t,Y(t)),h=Math.max(l.width+(a??0)*2,(t==null?void 0:t.width)??0),c=Math.max(l.height+(o??0)*2,(t==null?void 0:t.height)??0),d=[{x:0,y:0},{x:h,y:0},{x:h+3*c/6,y:-c},{x:-3*c/6,y:-c}];let p;const{cssStyles:u}=t;if(t.look==="handDrawn"){const m=q.svg(s),f=j(t,{}),y=et(d),C=m.path(y,f);p=s.insert(()=>C,":first-child").attr("transform",`translate(${-h/2}, ${c/2})`),u&&p.attr("style",u)}else p=kr(s,h,c,d);return i&&p.attr("style",i),t.width=h,t.height=c,U(t,p),t.intersect=function(m){return N.polygon(t,d,m)},s}g(Vu,"inv_trapezoid");async function Ti(r,t,e){const{labelStyles:i,nodeStyles:n}=H(t);t.labelStyle=i;const{shapeSvg:o,bbox:a}=await K(r,t,Y(t)),s=Math.max(a.width+e.labelPaddingX*2,(t==null?void 0:t.width)||0),l=Math.max(a.height+e.labelPaddingY*2,(t==null?void 0:t.height)||0),h=-s/2,c=-l/2;let d,{rx:p,ry:u}=t;const{cssStyles:m}=t;if(e!=null&&e.rx&&e.ry&&(p=e.rx,u=e.ry),t.look==="handDrawn"){const f=q.svg(o),y=j(t,{}),C=p||u?f.path(Pr(h,c,s,l,p||0),y):f.rectangle(h,c,s,l,y);d=o.insert(()=>C,":first-child"),d.attr("class","basic label-container").attr("style",xt(m))}else d=o.insert("rect",":first-child"),d.attr("class","basic label-container").attr("style",n).attr("rx",xt(p)).attr("ry",xt(u)).attr("x",h).attr("y",c).attr("width",s).attr("height",l);return U(t,d),t.calcIntersect=function(f,y){return N.rect(f,y)},t.intersect=function(f){return N.rect(t,f)},o}g(Ti,"drawRect");async function Yu(r,t){const{shapeSvg:e,bbox:i,label:n}=await K(r,t,"label"),o=e.insert("rect",":first-child");return o.attr("width",.1).attr("height",.1),e.attr("class","label edgeLabel"),n.attr("transform",`translate(${-(i.width/2)-(i.x-(i.left??0))}, ${-(i.height/2)-(i.y-(i.top??0))})`),U(t,o),t.intersect=function(l){return N.rect(t,l)},e}g(Yu,"labelRect");async function Xu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=n,a=t.look==="neo"?n*2:n,{shapeSvg:s,bbox:l}=await K(r,t,Y(t)),h=((t==null?void 0:t.height)??l.height)+o,c=((t==null?void 0:t.width)??l.width)+a,d=[{x:0,y:0},{x:c+3*h/6,y:0},{x:c,y:-h},{x:-(3*h)/6,y:-h}];let p;const{cssStyles:u}=t;if(t.look==="handDrawn"){const m=q.svg(s),f=j(t,{}),y=et(d),C=m.path(y,f);p=s.insert(()=>C,":first-child").attr("transform",`translate(${-c/2}, ${h/2})`),u&&p.attr("style",u)}else p=kr(s,c,h,d);return i&&p.attr("style",i),t.width=c,t.height=h,U(t,p),t.intersect=function(m){return N.polygon(t,d,m)},s}g(Xu,"lean_left");async function Ku(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=n,a=t.look==="neo"?n*2:n,{shapeSvg:s,bbox:l}=await K(r,t,Y(t)),h=((t==null?void 0:t.height)??l.height)+o,c=((t==null?void 0:t.width)??l.width)+a,d=[{x:-3*h/6,y:0},{x:c,y:0},{x:c+3*h/6,y:-h},{x:0,y:-h}];let p;const{cssStyles:u}=t;if(t.look==="handDrawn"){const m=q.svg(s),f=j(t,{}),y=et(d),C=m.path(y,f);p=s.insert(()=>C,":first-child").attr("transform",`translate(${-c/2}, ${h/2})`),u&&p.attr("style",u)}else p=kr(s,c,h,d);return i&&p.attr("style",i),t.width=c,t.height=h,U(t,p),t.intersect=function(m){return N.polygon(t,d,m)},s}g(Ku,"lean_right");function Zu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.label="",t.labelStyle=e;const n=r.insert("g").attr("class",Y(t)).attr("id",t.domId??t.id),{cssStyles:o}=t,a=Math.max(35,(t==null?void 0:t.width)??0),s=Math.max(35,(t==null?void 0:t.height)??0),l=7,h=[{x:a,y:0},{x:0,y:s+l/2},{x:a-2*l,y:s+l/2},{x:0,y:2*s},{x:a,y:s-l/2},{x:2*l,y:s-l/2}],c=q.svg(n),d=j(t,{});t.look!=="handDrawn"&&(d.roughness=0,d.fillStyle="solid");const p=et(h),u=c.path(p,d),m=n.insert(()=>u,":first-child");return m.attr("class","outer-path"),o&&t.look!=="handDrawn"&&m.selectAll("path").attr("style",o),i&&t.look!=="handDrawn"&&m.selectAll("path").attr("style",i),m.attr("transform",`translate(-${a/2},${-s})`),U(t,m),t.intersect=function(f){return P.info("lightningBolt intersect",t,f),N.polygon(t,h,f)},n}g(Zu,"lightningBolt");var I2=g((r,t,e,i,n,o,a)=>[`M${r},${t+o}`,`a${n},${o} 0,0,0 ${e},0`,`a${n},${o} 0,0,0 ${-e},0`,`l0,${i}`,`a${n},${o} 0,0,0 ${e},0`,`l0,${-i}`,`M${r},${t+o+a}`,`a${n},${o} 0,0,0 ${e},0`].join(" "),"createCylinderPathD"),R2=g((r,t,e,i,n,o,a)=>[`M${r},${t+o}`,`M${r+e},${t+o}`,`a${n},${o} 0,0,0 ${-e},0`,`l0,${i}`,`a${n},${o} 0,0,0 ${e},0`,`l0,${-i}`,`M${r},${t+o+a}`,`a${n},${o} 0,0,0 ${e},0`].join(" "),"createOuterCylinderPathD"),O2=g((r,t,e,i,n,o)=>[`M${r-e/2},${-i/2}`,`a${n},${o} 0,0,0 ${e},0`].join(" "),"createInnerCylinderPathD"),hl=10,cl=10;async function Qu(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?16:n,a=t.look==="neo"?24:n;if(t.width||t.height){const C=t.width??0;t.width=(t.width??0)-o,t.width<cl&&(t.width=cl);const k=C/2/(2.5+C/50);t.height=(t.height??0)-a-k*3,t.height<hl&&(t.height=hl)}const{shapeSvg:s,bbox:l,label:h}=await K(r,t,Y(t)),c=(t!=null&&t.width?t==null?void 0:t.width:l.width)+o*2,d=c/2,p=d/(2.5+c/50),u=(t!=null&&t.height?t==null?void 0:t.height:l.height)+p+a*2,m=u*.1;let f;const{cssStyles:y}=t;if(t.look==="handDrawn"){const C=q.svg(s),b=R2(0,0,c,u,d,p,m),k=O2(0,p,c,u,d,p),T=j(t,{}),v=C.path(b,T),_=C.path(k,T);s.insert(()=>_,":first-child").attr("class","line"),f=s.insert(()=>v,":first-child"),f.attr("class","basic label-container"),y&&f.attr("style",y)}else{const C=I2(0,0,c,u,d,p,m);f=s.insert("path",":first-child").attr("d",C).attr("class","basic label-container outer-path").attr("style",xt(y)).attr("style",i)}return f.attr("label-offset-y",p),f.attr("transform",`translate(${-c/2}, ${-(u/2+p)})`),U(t,f),h.attr("transform",`translate(${-(l.width/2)-(l.x-(l.left??0))}, ${-(l.height/2)+p-(l.y-(l.top??0))})`),t.intersect=function(C){const b=N.rect(t,C),k=b.x-(t.x??0);if(d!=0&&(Math.abs(k)<(t.width??0)/2||Math.abs(k)==(t.width??0)/2&&Math.abs(b.y-(t.y??0))>(t.height??0)/2-p)){let T=p*p*(1-k*k/(d*d));T>0&&(T=Math.sqrt(T)),T=p-T,C.y-(t.y??0)>0&&(T=-T),b.y+=T}return b},s}g(Qu,"linedCylinder");async function Ju(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?16:n,a=t.look==="neo"?12:n;if(t.width||t.height){const T=t.width;t.width=(T??0)*10/11-o*2,t.width<10&&(t.width=10),t.height=((t==null?void 0:t.height)??0)-a*2,t.height<10&&(t.height=10)}const{shapeSvg:s,bbox:l,label:h}=await K(r,t,Y(t)),c=(t!=null&&t.width?t==null?void 0:t.width:l.width)+(o??0)*2,d=(t!=null&&t.height?t==null?void 0:t.height:l.height)+(a??0)*2,p=t.look==="neo"?d/4:d/8,u=d+p,{cssStyles:m}=t,f=q.svg(s),y=j(t,{});t.look!=="handDrawn"&&(y.roughness=0,y.fillStyle="solid");const C=[{x:-c/2-c/2*.1,y:-u/2},{x:-c/2-c/2*.1,y:u/2},...Er(-c/2-c/2*.1,u/2,c/2+c/2*.1,u/2,p,.8),{x:c/2+c/2*.1,y:-u/2},{x:-c/2-c/2*.1,y:-u/2},{x:-c/2,y:-u/2},{x:-c/2,y:u/2*1.1},{x:-c/2,y:-u/2}],b=f.polygon(C.map(T=>[T.x,T.y]),y),k=s.insert(()=>b,":first-child");return k.attr("class","basic label-container outer-path"),m&&t.look!=="handDrawn"&&k.selectAll("path").attr("style",m),i&&t.look!=="handDrawn"&&k.selectAll("path").attr("style",i),k.attr("transform",`translate(0,${-p/2})`),h.attr("transform",`translate(${-c/2+(t.padding??0)+c/2*.1/2-(l.x-(l.left??0))},${-d/2+(t.padding??0)-p/2-(l.y-(l.top??0))})`),U(t,k),t.intersect=function(T){return N.polygon(t,C,T)},s}g(Ju,"linedWaveEdgedRect");async function tp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?16:n,a=t.look==="neo"?12:n,s=t.look==="neo"?10:5;(t.width||t.height)&&(t.width=Math.max(((t==null?void 0:t.width)??0)-o*2-2*s,10),t.height=Math.max(((t==null?void 0:t.height)??0)-a*2-2*s,10));const{shapeSvg:l,bbox:h,label:c}=await K(r,t,Y(t)),d=(t!=null&&t.width?t==null?void 0:t.width:h.width)+o*2+2*s,p=(t!=null&&t.height?t==null?void 0:t.height:h.height)+a*2+2*s,u=d-2*s,m=p-2*s,f=-u/2,y=-m/2,{cssStyles:C}=t,b=q.svg(l),k=j(t,{}),T=[{x:f-s,y:y+s},{x:f-s,y:y+m+s},{x:f+u-s,y:y+m+s},{x:f+u-s,y:y+m},{x:f+u,y:y+m},{x:f+u,y:y+m-s},{x:f+u+s,y:y+m-s},{x:f+u+s,y:y-s},{x:f+s,y:y-s},{x:f+s,y},{x:f,y},{x:f,y:y+s}],v=[{x:f,y:y+s},{x:f+u-s,y:y+s},{x:f+u-s,y:y+m},{x:f+u,y:y+m},{x:f+u,y},{x:f,y}];t.look!=="handDrawn"&&(k.roughness=0,k.fillStyle="solid");const _=et(T);let w=b.path(_,k);const S=et(v);let M=b.path(S,k);t.look!=="handDrawn"&&(w=Ko(w),M=Ko(M));const A=l.insert("g",":first-child");return A.insert(()=>w),A.insert(()=>M),A.attr("class","basic label-container outer-path"),C&&t.look!=="handDrawn"&&A.selectAll("path").attr("style",C),i&&t.look!=="handDrawn"&&A.selectAll("path").attr("style",i),c.attr("transform",`translate(${-(h.width/2)-s-(h.x-(h.left??0))}, ${-(h.height/2)+s-(h.y-(h.top??0))})`),U(t,A),t.intersect=function(E){return N.polygon(t,T,E)},l}g(tp,"multiRect");async function rp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const{shapeSvg:n,bbox:o,label:a}=await K(r,t,Y(t)),s=t.padding??0,l=t.look==="neo"?16:s,h=t.look==="neo"?12:s;let c=!0;(t.width||t.height)&&(c=!1,t.width=((t==null?void 0:t.width)??0)-l*2,t.height=((t==null?void 0:t.height)??0)-h*3);const d=Math.max(o.width,(t==null?void 0:t.width)??0)+l*2,p=Math.max(o.height,(t==null?void 0:t.height)??0)+h*3,u=t.look==="neo"?p/4:p/8,m=p+(c?u/2:-u/2),f=-d/2,y=-m/2,C=10,{cssStyles:b}=t,k=Er(f-C,y+m+C,f+d-C,y+m+C,u,.8),T=k==null?void 0:k[k.length-1],v=[{x:f-C,y:y+C},{x:f-C,y:y+m+C},...k,{x:f+d-C,y:T.y-C},{x:f+d,y:T.y-C},{x:f+d,y:T.y-2*C},{x:f+d+C,y:T.y-2*C},{x:f+d+C,y:y-C},{x:f+C,y:y-C},{x:f+C,y},{x:f,y},{x:f,y:y+C}],_=[{x:f,y:y+C},{x:f+d-C,y:y+C},{x:f+d-C,y:T.y-C},{x:f+d,y:T.y-C},{x:f+d,y},{x:f,y}],w=q.svg(n),S=j(t,{});t.look!=="handDrawn"&&(S.roughness=0,S.fillStyle="solid");const M=et(v),A=w.path(M,S),E=et(_),z=w.path(E,S),R=n.insert(()=>A,":first-child");return R.insert(()=>z),R.attr("class","basic label-container outer-path"),b&&t.look!=="handDrawn"&&R.selectAll("path").attr("style",b),i&&t.look!=="handDrawn"&&R.selectAll("path").attr("style",i),R.attr("transform",`translate(0,${-u/2})`),a.attr("transform",`translate(${-(o.width/2)-C-(o.x-(o.left??0))}, ${-(o.height/2)+C-u/2-(o.y-(o.top??0))})`),U(t,R),t.intersect=function(O){return N.polygon(t,v,O)},n}g(rp,"multiWaveEdgedRectangle");async function ep(r,t,{config:{themeVariables:e}}){const{labelStyles:i,nodeStyles:n}=H(t);t.labelStyle=i,t.useHtmlLabels||Pt(ct())||(t.centerLabel=!0);const{shapeSvg:a,bbox:s,label:l}=await K(r,t,Y(t)),h=Math.max(s.width+(t.padding??0)*2,(t==null?void 0:t.width)??0),c=Math.max(s.height+(t.padding??0)*2,(t==null?void 0:t.height)??0),d=-h/2,p=-c/2,{cssStyles:u}=t,m=q.svg(a),f=j(t,{fill:e.noteBkgColor,stroke:e.noteBorderColor});t.look!=="handDrawn"&&(f.roughness=0,f.fillStyle="solid");const y=m.rectangle(d,p,h,c,f),C=a.insert(()=>y,":first-child");return C.attr("class","basic label-container outer-path"),l.attr("class","label noteLabel"),u&&t.look!=="handDrawn"&&C.selectAll("path").attr("style",u),n&&t.look!=="handDrawn"&&C.selectAll("path").attr("style",n),l.attr("transform",`translate(${-s.width/2-(s.x-(s.left??0))}, ${-(s.height/2)-(s.y-(s.top??0))})`),U(t,C),t.intersect=function(b){return N.rect(t,b)},a}g(ep,"note");var $2=g((r,t,e)=>[`M${r+e/2},${t}`,`L${r+e},${t-e/2}`,`L${r+e/2},${t-e}`,`L${r},${t-e/2}`,"Z"].join(" "),"createDecisionBoxPathD");async function ip(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const{shapeSvg:n,bbox:o}=await K(r,t,Y(t)),a=o.width+(t.padding??0),s=o.height+(t.padding??0),l=a+s,h=.5,c=[{x:l/2,y:0},{x:l,y:-l/2},{x:l/2,y:-l},{x:0,y:-l/2}];let d;const{cssStyles:p}=t;if(t.look==="handDrawn"){const u=q.svg(n),m=j(t,{}),f=$2(0,0,l),y=u.path(f,m);d=n.insert(()=>y,":first-child").attr("transform",`translate(${-l/2+h}, ${l/2})`),p&&d.attr("style",p)}else d=kr(n,l,l,c),d.attr("transform",`translate(${-l/2+h}, ${l/2})`);return i&&d.attr("style",i),U(t,d),t.calcIntersect=function(u,m){const f=u.width,y=[{x:f/2,y:0},{x:f,y:-f/2},{x:f/2,y:-f},{x:0,y:-f/2}],C=N.polygon(u,y,m);return{x:C.x-.5,y:C.y-.5}},t.intersect=function(u){return this.calcIntersect(t,u)},n}g(ip,"question");async function np(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?21:n??0,a=t.look==="neo"?12:n??0,{shapeSvg:s,bbox:l,label:h}=await K(r,t,Y(t)),c=((t==null?void 0:t.width)??l.width)+(t.look==="neo"?o*2:o),d=((t==null?void 0:t.height)??l.height)+(t.look==="neo"?a*2:a),p=-c/2,u=-d/2,m=u/2,f=[{x:p+m,y:u},{x:p,y:0},{x:p+m,y:-u},{x:-p,y:-u},{x:-p,y:u}],{cssStyles:y}=t,C=q.svg(s),b=j(t,{});t.look!=="handDrawn"&&(b.roughness=0,b.fillStyle="solid");const k=et(f),T=C.path(k,b),v=s.insert(()=>T,":first-child");return v.attr("class","basic label-container outer-path"),y&&t.look!=="handDrawn"&&v.selectAll("path").attr("style",y),i&&t.look!=="handDrawn"&&v.selectAll("path").attr("style",i),v.attr("transform",`translate(${-m/2},0)`),h.attr("transform",`translate(${-m/2-l.width/2-(l.x-(l.left??0))}, ${-(l.height/2)-(l.y-(l.top??0))})`),U(t,v),t.intersect=function(_){return N.polygon(t,f,_)},s}g(np,"rect_left_inv_arrow");async function op(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;let n;t.cssClasses?n="node "+t.cssClasses:n="node default";const o=r.insert("g").attr("class",n).attr("id",t.domId||t.id),a=o.insert("g"),s=o.insert("g").attr("class","label").attr("style",i),l=t.description,h=t.label,c=await Sr(s,h,t.labelStyle,!0,!0);let d={width:0,height:0};if(Pt(ot())){const S=c.children[0],M=tt(c);d=S.getBoundingClientRect(),M.attr("width",d.width),M.attr("height",d.height)}P.info("Text 2",l);const p=l||[],u=c.getBBox(),m=await Sr(s,Array.isArray(p)?p.join("<br/>"):p,t.labelStyle,!0,!0),f=m.children[0],y=tt(m);d=f.getBoundingClientRect(),y.attr("width",d.width),y.attr("height",d.height);const C=(t.padding||0)/2;tt(m).attr("transform","translate( "+(d.width>u.width?0:(u.width-d.width)/2)+", "+(u.height+C+5)+")"),tt(c).attr("transform","translate( "+(d.width<u.width?0:-(u.width-d.width)/2)+", 0)"),d=s.node().getBBox(),s.attr("transform","translate("+-d.width/2+", "+(-d.height/2-C+3)+")");const b=d.width+(t.padding||0),k=d.height+(t.padding||0),T=-d.width/2-C,v=-d.height/2-C;let _,w;if(t.look==="handDrawn"){const S=q.svg(o),M=j(t,{}),A=S.path(Pr(T,v,b,k,t.rx||0),M),E=S.line(-d.width/2-C,-d.height/2-C+u.height+C,d.width/2+C,-d.height/2-C+u.height+C,M);w=o.insert(()=>(P.debug("Rough node insert CXC",A),E),":first-child"),_=o.insert(()=>(P.debug("Rough node insert CXC",A),A),":first-child")}else _=a.insert("rect",":first-child"),w=a.insert("line"),_.attr("class","outer title-state").attr("style",i).attr("x",-d.width/2-C).attr("y",-d.height/2-C).attr("width",d.width+(t.padding||0)).attr("height",d.height+(t.padding||0)),w.attr("class","divider").attr("x1",-d.width/2-C).attr("x2",d.width/2+C).attr("y1",-d.height/2-C+u.height+C).attr("y2",-d.height/2-C+u.height+C);return U(t,_),t.intersect=function(S){return N.rect(t,S)},o}g(op,"rectWithTitle");async function sp(r,t,{config:{themeVariables:e}}){const i=(e==null?void 0:e.radius)??5,n={rx:i,ry:i,classes:"",labelPaddingX:((t==null?void 0:t.padding)??0)*1,labelPaddingY:((t==null?void 0:t.padding)??0)*1};return Ti(r,t,n)}g(sp,"roundedRect");var Or=8;async function ap(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.look==="neo"?16:t.padding??0,o=t.look==="neo"?12:t.padding??0,{shapeSvg:a,bbox:s,label:l}=await K(r,t,Y(t)),h=((t==null?void 0:t.width)??s.width)+n*2+(t.look==="neo"?Or:Or*2),c=((t==null?void 0:t.height)??s.height)+o*2,d=h-Or,p=c,u=Or-h/2,m=-c/2,{cssStyles:f}=t,y=q.svg(a),C=j(t,{});t.look!=="handDrawn"&&(C.roughness=0,C.fillStyle="solid");const b=[{x:u,y:m},{x:u+d,y:m},{x:u+d,y:m+p},{x:u-Or,y:m+p},{x:u-Or,y:m},{x:u,y:m},{x:u,y:m+p}],k=y.polygon(b.map(v=>[v.x,v.y]),C),T=a.insert(()=>k,":first-child");return T.attr("class","basic label-container outer-path").attr("style",xt(f)),i&&t.look!=="handDrawn"&&T.selectAll("path").attr("style",i),f&&t.look!=="handDrawn"&&T.selectAll("path").attr("style",i),l.attr("transform",`translate(${Or/2-s.width/2-(s.x-(s.left??0))}, ${-(s.height/2)-(s.y-(s.top??0))})`),U(t,T),t.intersect=function(v){return N.rect(t,v)},a}g(ap,"shadedProcess");async function lp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?16:n,a=t.look==="neo"?12:n;(t.width||t.height)&&(t.width=Math.max(((t==null?void 0:t.width)??0)-o*2,10),t.height=Math.max(((t==null?void 0:t.height)??0)/1.5-a*2,10));const{shapeSvg:s,bbox:l,label:h}=await K(r,t,Y(t)),c=(t!=null&&t.width?t==null?void 0:t.width:l.width)+o*2,d=((t!=null&&t.height?t==null?void 0:t.height:l.height)+a*2)*1.5,p=c,u=d/1.5,m=-p/2,f=-u/2,{cssStyles:y}=t,C=q.svg(s),b=j(t,{});t.look!=="handDrawn"&&(b.roughness=0,b.fillStyle="solid");const k=[{x:m,y:f},{x:m,y:f+u},{x:m+p,y:f+u},{x:m+p,y:f-u/2}],T=et(k),v=C.path(T,b),_=s.insert(()=>v,":first-child");return _.attr("class","basic label-container  outer-path"),y&&t.look!=="handDrawn"&&_.selectChildren("path").attr("style",y),i&&t.look!=="handDrawn"&&_.selectChildren("path").attr("style",i),_.attr("transform",`translate(0, ${u/4})`),h.attr("transform",`translate(${-p/2+(t.padding??0)-(l.x-(l.left??0))}, ${-u/4+(t.padding??0)-(l.y-(l.top??0))})`),U(t,_),t.intersect=function(w){return N.polygon(t,k,w)},s}g(lp,"slopedRect");async function hp(r,t){const e=t.padding??0,i=t.look==="neo"?16:e*2,n=t.look==="neo"?12:e,o={rx:0,ry:0,classes:"",labelPaddingX:t.labelPaddingX??i,labelPaddingY:n};return Ti(r,t,o)}g(hp,"squareRect");async function cp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?20:n,a=t.look==="neo"?12:n,{shapeSvg:s,bbox:l}=await K(r,t,Y(t)),h=l.height+(t.look==="neo"?a*2:a),c=l.width+h/4+(t.look==="neo"?o*2:o),d=h/2,{cssStyles:p}=t,u=q.svg(s),m=j(t,{});t.look!=="handDrawn"&&(m.roughness=0,m.fillStyle="solid");const f=[{x:-c/2+d,y:-h/2},{x:c/2-d,y:-h/2},...Qe(-c/2+d,0,d,50,90,270),{x:c/2-d,y:h/2},...Qe(c/2-d,0,d,50,270,450)],y=et(f),C=u.path(y,m),b=s.insert(()=>C,":first-child");return b.attr("class","basic label-container outer-path"),p&&t.look!=="handDrawn"&&b.selectChildren("path").attr("style",p),i&&t.look!=="handDrawn"&&b.selectChildren("path").attr("style",i),U(t,b),t.intersect=function(k){return N.polygon(t,f,k)},s}g(cp,"stadium");async function dp(r,t){const e={rx:t.look==="neo"?3:5,ry:t.look==="neo"?3:5,classes:"flowchart-node"};return Ti(r,t,e)}g(dp,"state");function up(r,t,{config:{themeVariables:e}}){var b,k;const{labelStyles:i,nodeStyles:n}=H(t);t.labelStyle=i;const{cssStyles:o}=t,{lineColor:a,stateBorder:s,nodeBorder:l,nodeShadow:h}=e;(t.width||t.height)&&((t.width??0)<14&&(t.width=14),(t.height??0)<14&&(t.height=14)),t.width||(t.width=14),t.height||(t.height=14);const c=r.insert("g").attr("class","node default").attr("id",t.domId??t.id),d=q.svg(c),p=j(t,{});t.look!=="handDrawn"&&(p.roughness=0,p.fillStyle="solid");const u=d.circle(0,0,t.width,{...p,stroke:a,strokeWidth:2}),m=s??l,f=(t.width??0)*5/14,y=d.circle(0,0,f,{...p,fill:m,stroke:m,strokeWidth:2,fillStyle:"solid"}),C=c.insert(()=>u,":first-child");if(C.insert(()=>y),t.look!=="handDrawn"&&C.attr("class","outer-path"),o&&C.selectAll("path").attr("style",o),n&&C.selectAll("path").attr("style",n),t.width<25&&h&&t.look!=="handDrawn"){const T=((k=(b=r.node())==null?void 0:b.ownerSVGElement)==null?void 0:k.id)??"",v=T?`${T}-drop-shadow-small`:"drop-shadow-small";C.attr("style",`filter:url(#${v})`)}return U(t,C),t.intersect=function(T){return N.circle(t,(t.width??0)/2,T)},c}g(up,"stateEnd");function pp(r,t,{config:{themeVariables:e}}){var s,l;const{lineColor:i,nodeShadow:n}=e;(t.width||t.height)&&((t.width??0)<14&&(t.width=14),(t.height??0)<14&&(t.height=14)),t.width||(t.width=14),t.height||(t.height=14);const o=r.insert("g").attr("class","node default").attr("id",t.domId||t.id);let a;if(t.look==="handDrawn"){const c=q.svg(o).circle(0,0,t.width,V1(i));a=o.insert(()=>c),a.attr("class","state-start").attr("r",(t.width??7)/2).attr("width",t.width??14).attr("height",t.height??14)}else a=o.insert("circle",":first-child"),a.attr("class","state-start").attr("r",(t.width??7)/2).attr("width",t.width??14).attr("height",t.height??14);if(t.width<25&&n&&t.look!=="handDrawn"){const h=((l=(s=r.node())==null?void 0:s.ownerSVGElement)==null?void 0:l.id)??"",c=h?`${h}-drop-shadow-small`:"drop-shadow-small";a.attr("style",`filter:url(#${c})`)}return U(t,a),t.intersect=function(h){return N.circle(t,(t.width??7)/2,h)},o}g(pp,"stateStart");var re=8;async function gp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=(t==null?void 0:t.padding)??8,o=t.look==="neo"?28:n,a=t.look==="neo"?12:n,{shapeSvg:s,bbox:l}=await K(r,t,Y(t)),h=((t==null?void 0:t.width)??l.width)+2*re+o,c=((t==null?void 0:t.height)??l.height)+a,d=h-2*re,p=c,u=-h/2,m=-c/2,f=[{x:0,y:0},{x:d,y:0},{x:d,y:-p},{x:0,y:-p},{x:0,y:0},{x:-8,y:0},{x:d+8,y:0},{x:d+8,y:-p},{x:-8,y:-p},{x:-8,y:0}];if(t.look==="handDrawn"){const y=q.svg(s),C=j(t,{}),b=y.rectangle(u,m,d+16,p,C),k=y.line(u+re,m,u+re,m+p,C),T=y.line(u+re+d,m,u+re+d,m+p,C);s.insert(()=>k,":first-child"),s.insert(()=>T,":first-child");const v=s.insert(()=>b,":first-child"),{cssStyles:_}=t;v.attr("class","basic label-container").attr("style",xt(_)),U(t,v)}else{const y=kr(s,d,p,f);i&&y.attr("style",i),U(t,y)}return t.intersect=function(y){return N.polygon(t,f,y)},s}g(gp,"subroutine");var ao=.2;async function fp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?16:n,a=t.look==="neo"?12:n;(t.width||t.height)&&(t.height=Math.max(((t==null?void 0:t.height)??0)-a*2,10),t.width=Math.max(((t==null?void 0:t.width)??0)-o*2-ao*(t.height+a*2),10));const{shapeSvg:s,bbox:l}=await K(r,t,Y(t)),h=(t!=null&&t.height?t==null?void 0:t.height:l.height)+a*2,c=ao*h,d=ao*h,u=(t!=null&&t.width?t==null?void 0:t.width:l.width)+o*2+c-c,m=h,f=-u/2,y=-m/2,{cssStyles:C}=t,b=q.svg(s),k=j(t,{}),T=[{x:f-c/2,y},{x:f+u+c/2,y},{x:f+u+c/2,y:y+m},{x:f-c/2,y:y+m}],v=[{x:f+u-c/2,y:y+m},{x:f+u+c/2,y:y+m},{x:f+u+c/2,y:y+m-d}];t.look!=="handDrawn"&&(k.roughness=0,k.fillStyle="solid");const _=et(T),w=b.path(_,k),S=et(v),M=b.path(S,{...k,fillStyle:"solid"}),A=s.insert(()=>M,":first-child");return A.insert(()=>w,":first-child"),A.attr("class","basic label-container outer-path"),C&&t.look!=="handDrawn"&&A.selectAll("path").attr("style",C),i&&t.look!=="handDrawn"&&A.selectAll("path").attr("style",i),U(t,A),t.intersect=function(E){return N.polygon(t,T,E)},s}g(fp,"taggedRect");async function mp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const{shapeSvg:n,bbox:o,label:a}=await K(r,t,Y(t)),s=Math.max(o.width+(t.padding??0)*2,(t==null?void 0:t.width)??0),l=Math.max(o.height+(t.padding??0)*2,(t==null?void 0:t.height)??0),h=l/8,c=.2*s,d=.2*l,p=l+h,{cssStyles:u}=t,m=q.svg(n),f=j(t,{});t.look!=="handDrawn"&&(f.roughness=0,f.fillStyle="solid");const y=[{x:-s/2-s/2*.1,y:p/2},...Er(-s/2-s/2*.1,p/2,s/2+s/2*.1,p/2,h,.8),{x:s/2+s/2*.1,y:-p/2},{x:-s/2-s/2*.1,y:-p/2}],C=-s/2+s/2*.1,b=-p/2-d*.4,k=[{x:C+s-c,y:(b+l)*1.3},{x:C+s,y:b+l-d},{x:C+s,y:(b+l)*.9},...Er(C+s,(b+l)*1.25,C+s-c,(b+l)*1.3,-l*.02,.5)],T=et(y),v=m.path(T,f),_=et(k),w=m.path(_,{...f,fillStyle:"solid"}),S=n.insert(()=>w,":first-child");return S.insert(()=>v,":first-child"),S.attr("class","basic label-container outer-path"),u&&t.look!=="handDrawn"&&S.selectAll("path").attr("style",u),i&&t.look!=="handDrawn"&&S.selectAll("path").attr("style",i),S.attr("transform",`translate(0,${-h/2})`),a.attr("transform",`translate(${-s/2+(t.padding??0)-(o.x-(o.left??0))},${-l/2+(t.padding??0)-h/2-(o.y-(o.top??0))})`),U(t,S),t.intersect=function(M){return N.polygon(t,y,M)},n}g(mp,"taggedWaveEdgedRectangle");async function yp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const{shapeSvg:n,bbox:o}=await K(r,t,Y(t)),a=Math.max(o.width+(t.padding??0),(t==null?void 0:t.width)||0),s=Math.max(o.height+(t.padding??0),(t==null?void 0:t.height)||0),l=-a/2,h=-s/2,c=n.insert("rect",":first-child");return c.attr("class","text").attr("style",i).attr("rx",0).attr("ry",0).attr("x",l).attr("y",h).attr("width",a).attr("height",s),U(t,c),t.intersect=function(d){return N.rect(t,d)},n}g(yp,"text");var W2=g((r,t,e,i,n,o)=>`M${r},${t}
    a${n},${o} 0,0,1 0,${-i}
    l${e},0
    a${n},${o} 0,0,1 0,${i}
    M${e},${-i}
    a${n},${o} 0,0,0 0,${i}
    l${-e},0`,"createCylinderPathD"),z2=g((r,t,e,i,n,o)=>[`M${r},${t}`,`M${r+e},${t}`,`a${n},${o} 0,0,0 0,${-i}`,`l${-e},0`,`a${n},${o} 0,0,0 0,${i}`,`l${e},0`].join(" "),"createOuterCylinderPathD"),N2=g((r,t,e,i,n,o)=>[`M${r+e/2},${-i/2}`,`a${n},${o} 0,0,0 0,${i}`].join(" "),"createInnerCylinderPathD"),dl=5,ul=10;async function Cp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?12:n/2;if(t.width||t.height){const f=t.height??0;t.height=(t.height??0)-o,t.height<dl&&(t.height=dl);const C=f/2/(2.5+f/50);t.width=(t.width??0)-o-C*3,t.width<ul&&(t.width=ul)}const{shapeSvg:a,bbox:s,label:l}=await K(r,t,Y(t)),h=(t.height?t.height:s.height)+o,c=h/2,d=c/(2.5+h/50),p=(t.width?t.width:s.width)+d+o,{cssStyles:u}=t;let m;if(t.look==="handDrawn"){const f=q.svg(a),y=z2(0,0,p,h,d,c),C=N2(0,0,p,h,d,c),b=f.path(y,j(t,{})),k=f.path(C,j(t,{fill:"none"}));m=a.insert(()=>k,":first-child"),m=a.insert(()=>b,":first-child"),m.attr("class","basic label-container"),u&&m.attr("style",u)}else{const f=W2(0,0,p,h,d,c);m=a.insert("path",":first-child").attr("d",f).attr("class","basic label-container").attr("style",xt(u)).attr("style",i),m.attr("class","basic label-container outer-path"),u&&m.selectAll("path").attr("style",u),i&&m.selectAll("path").attr("style",i)}return m.attr("label-offset-x",d),m.attr("transform",`translate(${-p/2}, ${h/2} )`),l.attr("transform",`translate(${-(s.width/2)-d-(s.x-(s.left??0))}, ${-(s.height/2)-(s.y-(s.top??0))})`),U(t,m),t.intersect=function(f){const y=N.rect(t,f),C=y.y-(t.y??0);if(c!=0&&(Math.abs(C)<(t.height??0)/2||Math.abs(C)==(t.height??0)/2&&Math.abs(y.x-(t.x??0))>(t.width??0)/2-d)){let b=d*d*(1-C*C/(c*c));b!=0&&(b=Math.sqrt(Math.abs(b))),b=d-b,f.x-(t.x??0)>0&&(b=-b),y.x+=b}return y},a}g(Cp,"tiltedCylinder");async function xp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=(t.look==="neo",n),a=t.look==="neo"?n*2:n,{shapeSvg:s,bbox:l}=await K(r,t,Y(t)),h=((t==null?void 0:t.height)??l.height)+o,c=((t==null?void 0:t.width)??l.width)+a,d=[{x:-3*h/6,y:0},{x:c+3*h/6,y:0},{x:c,y:-h},{x:0,y:-h}];let p;const{cssStyles:u}=t;if(t.look==="handDrawn"){const m=q.svg(s),f=j(t,{}),y=et(d),C=m.path(y,f);p=s.insert(()=>C,":first-child").attr("transform",`translate(${-c/2}, ${h/2})`),u&&p.attr("style",u)}else p=kr(s,c,h,d);return i&&p.attr("style",i),t.width=c,t.height=h,U(t,p),t.intersect=function(m){return N.polygon(t,d,m)},s}g(xp,"trapezoid");async function bp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?16:n,a=t.look==="neo"?12:n,s=15,l=5;(t.width||t.height)&&(t.height=(t.height??0)-a*2,t.height<l&&(t.height=l),t.width=(t.width??0)-o*2,t.width<s&&(t.width=s));const{shapeSvg:h,bbox:c}=await K(r,t,Y(t)),d=(t!=null&&t.width?t==null?void 0:t.width:c.width)+o*2,p=(t!=null&&t.height?t==null?void 0:t.height:c.height)+a*2,{cssStyles:u}=t,m=q.svg(h),f=j(t,{});t.look!=="handDrawn"&&(f.roughness=0,f.fillStyle="solid");const y=[{x:-d/2*.8,y:-p/2},{x:d/2*.8,y:-p/2},{x:d/2,y:-p/2*.6},{x:d/2,y:p/2},{x:-d/2,y:p/2},{x:-d/2,y:-p/2*.6}],C=et(y),b=m.path(C,f),k=h.insert(()=>b,":first-child");return k.attr("class","basic label-container outer-path"),u&&t.look!=="handDrawn"&&k.selectChildren("path").attr("style",u),i&&t.look!=="handDrawn"&&k.selectChildren("path").attr("style",i),U(t,k),t.intersect=function(T){return N.polygon(t,y,T)},h}g(bp,"trapezoidalPentagon");var pl=10,gl=10;async function kp(r,t){var T;const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?n*2:n;(t.width||t.height)&&(t.width=(((t==null?void 0:t.width)??0)-o)/2,t.width<gl&&(t.width=gl),t.height=(t==null?void 0:t.height)??0,t.height<pl&&(t.height=pl));const{shapeSvg:a,bbox:s,label:l}=await K(r,t,Y(t)),h=xr((T=ot().flowchart)==null?void 0:T.htmlLabels),c=(t!=null&&t.width?t==null?void 0:t.width:s.width)+o,d=t!=null&&t.height?t==null?void 0:t.height:c+s.height,p=d,u=[{x:0,y:0},{x:p,y:0},{x:p/2,y:-d}],{cssStyles:m}=t,f=q.svg(a),y=j(t,{});t.look!=="handDrawn"&&(y.roughness=0,y.fillStyle="solid");const C=et(u),b=f.path(C,y),k=a.insert(()=>b,":first-child").attr("transform",`translate(${-d/2}, ${d/2})`).attr("class","outer-path");return m&&t.look!=="handDrawn"&&k.selectChildren("path").attr("style",m),i&&t.look!=="handDrawn"&&k.selectChildren("path").attr("style",i),t.width=c,t.height=d,U(t,k),l.attr("transform",`translate(${-s.width/2-(s.x-(s.left??0))}, ${d/2-(s.height+(t.padding??0)/(h?2:1)-(s.y-(s.top??0)))})`),t.intersect=function(v){return P.info("Triangle intersect",t,u,v),N.polygon(t,u,v)},a}g(kp,"triangle");async function wp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?16:n,a=t.look==="neo"?12:n;let s=!0;(t.width||t.height)&&(s=!1,t.width=((t==null?void 0:t.width)??0)-o*2,t.width<10&&(t.width=10),t.height=((t==null?void 0:t.height)??0)-a*2,t.height<10&&(t.height=10));const{shapeSvg:l,bbox:h,label:c}=await K(r,t,Y(t)),d=(t!=null&&t.width?t==null?void 0:t.width:h.width)+(o??0)*2,p=(t!=null&&t.height?t==null?void 0:t.height:h.height)+(a??0)*2,u=t.look==="neo"?p/4:p/8,m=p+(s?u:-u),{cssStyles:f}=t,C=14-d,b=C>0?C/2:0,k=q.svg(l),T=j(t,{});t.look!=="handDrawn"&&(T.roughness=0,T.fillStyle="solid");const v=[{x:-d/2-b,y:m/2},...Er(-d/2-b,m/2,d/2+b,m/2,u,.8),{x:d/2+b,y:-m/2},{x:-d/2-b,y:-m/2}],_=et(v),w=k.path(_,T),S=l.insert(()=>w,":first-child");return S.attr("class","basic label-container outer-path"),f&&t.look!=="handDrawn"&&S.selectAll("path").attr("style",f),i&&t.look!=="handDrawn"&&S.selectAll("path").attr("style",i),S.attr("transform",`translate(0,${-u/2})`),c.attr("transform",`translate(${-d/2+(t.padding??0)-(h.x-(h.left??0))},${-p/2+(t.padding??0)-u-(h.y-(h.top??0))})`),U(t,S),t.intersect=function(M){return N.polygon(t,v,M)},l}g(wp,"waveEdgedRectangle");async function Tp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.padding??0,o=t.look==="neo"?16:n,a=t.look==="neo"?20:n;if(t.width||t.height){t.width=(t==null?void 0:t.width)??0,t.width<20&&(t.width=20),t.height=(t==null?void 0:t.height)??0,t.height<10&&(t.height=10);const T=Math.min(t.height*.2,t.height/4);t.height=Math.ceil(t.height-a-T*(20/9)),t.width=t.width-o*2}const{shapeSvg:s,bbox:l}=await K(r,t,Y(t)),h=(t!=null&&t.width?t==null?void 0:t.width:l.width)+o*2,c=(t!=null&&t.height?t==null?void 0:t.height:l.height)+a,d=c/8,p=c+d*2,{cssStyles:u}=t,m=q.svg(s),f=j(t,{});t.look!=="handDrawn"&&(f.roughness=0,f.fillStyle="solid");const y=[{x:-h/2,y:p/2},...Er(-h/2,p/2,h/2,p/2,d,1),{x:h/2,y:-p/2},...Er(h/2,-p/2,-h/2,-p/2,d,-1)],C=et(y),b=m.path(C,f),k=s.insert(()=>b,":first-child");return k.attr("class","basic label-container"),u&&t.look!=="handDrawn"&&k.selectAll("path").attr("style",u),i&&t.look!=="handDrawn"&&k.selectAll("path").attr("style",i),U(t,k),t.intersect=function(T){return N.polygon(t,y,T)},s}g(Tp,"waveRectangle");var dt=10;async function vp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t.look==="neo"?16:t.padding??0,o=t.look==="neo"?12:t.padding??0;(t.width||t.height)&&(t.width=Math.max(((t==null?void 0:t.width)??0)-n*2-dt,10),t.height=Math.max(((t==null?void 0:t.height)??0)-o*2-dt,10));const{shapeSvg:a,bbox:s,label:l}=await K(r,t,Y(t)),h=(t!=null&&t.width?t==null?void 0:t.width:s.width)+n*2+dt,c=(t!=null&&t.height?t==null?void 0:t.height:s.height)+o*2+dt,d=h-dt,p=c-dt,u=-d/2,m=-p/2,{cssStyles:f}=t,y=q.svg(a),C=j(t,{}),b=[{x:u-dt,y:m-dt},{x:u-dt,y:m+p},{x:u+d,y:m+p},{x:u+d,y:m-dt}],k=`M${u-dt},${m-dt} L${u+d},${m-dt} L${u+d},${m+p} L${u-dt},${m+p} L${u-dt},${m-dt}
                M${u-dt},${m} L${u+d},${m}
                M${u},${m-dt} L${u},${m+p}`;t.look!=="handDrawn"&&(C.roughness=0,C.fillStyle="solid");const T=y.path(k,C),v=a.insert(()=>T,":first-child");return v.attr("transform",`translate(${dt/2}, ${dt/2})`),v.attr("class","basic label-container outer-path"),f&&t.look!=="handDrawn"&&v.selectAll("path").attr("style",f),i&&t.look!=="handDrawn"&&v.selectAll("path").attr("style",i),l.attr("transform",`translate(${-(s.width/2)+dt/2-(s.x-(s.left??0))}, ${-(s.height/2)+dt/2-(s.y-(s.top??0))})`),U(t,v),t.intersect=function(_){return N.polygon(t,b,_)},a}g(vp,"windowPane");var fl=new Set(["redux-color","redux-dark-color"]),q2=new Set(["redux","redux-dark","redux-color","redux-dark-color"]);async function Js(r,t){var Wt,Dr,vi,ia;const e=t;e.alias&&(t.label=e.alias);const{theme:i,themeVariables:n}=ct(),{rowEven:o,rowOdd:a,nodeBorder:s,borderColorArray:l}=n;if(t.look==="handDrawn"){const{themeVariables:J}=ct(),{background:nt}=J,gt={...t,id:t.id+"-background",domId:(t.domId||t.id)+"-background",look:"default",cssStyles:["stroke: none",`fill: ${nt}`]};await Js(r,gt)}const h=ct();t.useHtmlLabels=h.htmlLabels;let c=((Wt=h.er)==null?void 0:Wt.diagramPadding)??10,d=((Dr=h.er)==null?void 0:Dr.entityPadding)??6;const{cssStyles:p}=t,{labelStyles:u,nodeStyles:m}=H(t);if(e.attributes.length===0&&t.label){const J={rx:0,ry:0,labelPaddingX:c,labelPaddingY:c*1.5,classes:""};Cr(t.label,h)+J.labelPaddingX*2<h.er.minEntityWidth&&(t.width=h.er.minEntityWidth);const nt=await Ti(r,t,J);if(i!=null&&fl.has(i)){const gt=e.colorIndex??0;nt.attr("data-color-id",`color-${gt%l.length}`)}if(!xr(h.htmlLabels)){const gt=nt.select("text"),zt=(vi=gt.node())==null?void 0:vi.getBBox();gt.attr("transform",`translate(${-zt.width/2}, 0)`)}return nt}h.htmlLabels||(c*=1.25,d*=1.25);let f=Y(t);f||(f="node default");const y=r.insert("g").attr("class",f).attr("id",t.domId||t.id),C=await ie(y,t.label??"",h,0,0,["name"],u);C.height+=d;let b=0;const k=[],T=[];let v=0,_=0,w=0,S=0,M=!0,A=!0;for(const J of e.attributes){const nt=await ie(y,J.type,h,0,b,["attribute-type"],u);v=Math.max(v,nt.width+c);const gt=await ie(y,J.name,h,0,b,["attribute-name"],u);_=Math.max(_,gt.width+c);const zt=await ie(y,J.keys.join(),h,0,b,["attribute-keys"],u);w=Math.max(w,zt.width+c);const Ir=await ie(y,J.comment,h,0,b,["attribute-comment"],u);S=Math.max(S,Ir.width+c);const wr=Math.max(nt.height,gt.height,zt.height,Ir.height)+d;T.push({yOffset:b,rowHeight:wr}),b+=wr}let E=4;w<=c&&(M=!1,w=0,E--),S<=c&&(A=!1,S=0,E--);const z=y.node().getBBox();if(C.width+c*2-(v+_+w+S)>0){const J=C.width+c*2-(v+_+w+S);v+=J/E,_+=J/E,w>0&&(w+=J/E),S>0&&(S+=J/E)}const R=v+_+w+S,O=q.svg(y),W=j(t,{});t.look!=="handDrawn"&&(W.roughness=0,W.fillStyle="solid");let I=0;T.length>0&&(I=T.reduce((J,nt)=>J+((nt==null?void 0:nt.rowHeight)??0),0));const $=Math.max(z.width+c*2,(t==null?void 0:t.width)||0,R),D=Math.max((I??0)+C.height,(t==null?void 0:t.height)||0),V=-$/2,rt=-D/2;if(y.selectAll("g:not(:first-child)").each((J,nt,gt)=>{const zt=tt(gt[nt]),Ir=zt.attr("transform");let wr=0,na=0;if(Ir){const Vn=RegExp(/translate\(([^,]+),([^)]+)\)/).exec(Ir);Vn&&(wr=parseFloat(Vn[1]),na=parseFloat(Vn[2]),zt.attr("class").includes("attribute-name")?wr+=v:zt.attr("class").includes("attribute-keys")?wr+=v+_:zt.attr("class").includes("attribute-comment")&&(wr+=v+_+w))}zt.attr("transform",`translate(${V+c/2+wr}, ${na+rt+C.height+d/2})`)}),y.select(".name").attr("transform","translate("+-C.width/2+", "+(rt+d/2)+")"),i!=null&&fl.has(i)){const J=e.colorIndex??0;y.attr("data-color-id",`color-${J%l.length}`)}const yt=O.rectangle(V,rt,$,D,W),Tt=y.insert(()=>yt,":first-child").attr("class","outer-path").attr("style",p.join(""));k.push(0);for(const[J,nt]of T.entries()){const zt=(J+1)%2===0&&nt.yOffset!==0,Ir=O.rectangle(V,C.height+rt+(nt==null?void 0:nt.yOffset),$,nt==null?void 0:nt.rowHeight,{...W,fill:zt?o:a,stroke:s});y.insert(()=>Ir,"g.label").attr("style",p.join("")).attr("class",`row-rect-${zt?"even":"odd"}`)}const $t=1e-4;let vt=ne(V,C.height+rt,$+V,C.height+rt,$t),bt=O.polygon(vt.map(J=>[J.x,J.y]),W);if(y.insert(()=>bt).attr("class","divider"),vt=ne(v+V,C.height+rt,v+V,D+rt,$t),bt=O.polygon(vt.map(J=>[J.x,J.y]),W),y.insert(()=>bt).attr("class","divider"),M){const J=v+_+V;vt=ne(J,C.height+rt,J,D+rt,$t),bt=O.polygon(vt.map(nt=>[nt.x,nt.y]),W),y.insert(()=>bt).attr("class","divider")}if(A){const J=v+_+w+V;vt=ne(J,C.height+rt,J,D+rt,$t),bt=O.polygon(vt.map(nt=>[nt.x,nt.y]),W),y.insert(()=>bt).attr("class","divider")}for(const J of k){const nt=C.height+rt+J;vt=ne(V,nt,$+V,nt,$t),bt=O.polygon(vt.map(gt=>[gt.x,gt.y]),W),y.insert(()=>bt).attr("class","divider")}if(U(t,Tt),m&&t.look!=="handDrawn")if(i!=null&&q2.has(i))y.selectAll("path").attr("style",m);else{const J=m.split(";"),nt=(ia=J==null?void 0:J.filter(gt=>gt.includes("stroke")))==null?void 0:ia.map(gt=>`${gt}`).join("; ");y.selectAll("path").attr("style",nt??""),y.selectAll(".row-rect-even path").attr("style",m)}return t.intersect=function(J){return N.rect(t,J)},y}g(Js,"erBox");async function ie(r,t,e,i=0,n=0,o=[],a=""){const s=r.insert("g").attr("class",`label ${o.join(" ")}`).attr("transform",`translate(${i}, ${n})`).attr("style",a);t!==ha(t)&&(t=ha(t),t=t.replaceAll("<","&lt;").replaceAll(">","&gt;"));const l=s.node().appendChild(await br(s,t,{width:Cr(t,e)+100,style:a,useHtmlLabels:e.htmlLabels},e));if(t.includes("&lt;")||t.includes("&gt;")){let c=l.children[0];for(c.textContent=c.textContent.replaceAll("&lt;","<").replaceAll("&gt;",">");c.childNodes[0];)c=c.childNodes[0],c.textContent=c.textContent.replaceAll("&lt;","<").replaceAll("&gt;",">")}let h=l.getBBox();if(xr(e.htmlLabels)){const c=l.children[0];c.style.textAlign="start";const d=tt(l);h=c.getBoundingClientRect(),d.attr("width",h.width),d.attr("height",h.height)}return h}g(ie,"addText");function ne(r,t,e,i,n){return r===e?[{x:r-n/2,y:t},{x:r+n/2,y:t},{x:e+n/2,y:i},{x:e-n/2,y:i}]:[{x:r,y:t-n/2},{x:r,y:t+n/2},{x:e,y:i+n/2},{x:e,y:i-n/2}]}g(ne,"lineToPolygon");async function Sp(r,t,e,i,n=e.class.padding??12){const o=i?0:3,a=r.insert("g").attr("class",Y(t)).attr("id",t.domId||t.id);let s=null,l=null,h=null,c=null,d=0,p=0,u=0;if(s=a.insert("g").attr("class","annotation-group text"),t.annotations.length>0){const b=t.annotations[0];await Ie(s,{text:`«${b}»`},0),d=s.node().getBBox().height}l=a.insert("g").attr("class","label-group text"),await Ie(l,t,0,["font-weight: bolder"]);const m=l.node().getBBox();p=m.height,h=a.insert("g").attr("class","members-group text");let f=0;for(const b of t.members){const k=await Ie(h,b,f,[b.parseClassifier()]);f+=k+o}u=h.node().getBBox().height,u<=0&&(u=n/2),c=a.insert("g").attr("class","methods-group text");let y=0;for(const b of t.methods){const k=await Ie(c,b,y,[b.parseClassifier()]);y+=k+o}let C=a.node().getBBox();if(s!==null){const b=s.node().getBBox();s.attr("transform",`translate(${-b.width/2})`)}return l.attr("transform",`translate(${-m.width/2}, ${d})`),C=a.node().getBBox(),h.attr("transform",`translate(0, ${d+p+n*2})`),C=a.node().getBBox(),c.attr("transform",`translate(0, ${d+p+(u?u+n*4:n*2)})`),C=a.node().getBBox(),{shapeSvg:a,bbox:C}}g(Sp,"textHelper");async function Ie(r,t,e,i=[]){const n=r.insert("g").attr("class","label").attr("style",i.join("; ")),o=ct();let a="useHtmlLabels"in t?t.useHtmlLabels:xr(o.htmlLabels)??!0,s="";"text"in t?s=t.text:s=t.label,!a&&s.startsWith("\\")&&(s=s.substring(1)),je(s)&&(a=!0);const l=await br(n,us(Xr(s)),{width:Cr(s,o)+50,classes:"markdown-node-label",useHtmlLabels:a},o);let h,c=1;if(a){const d=l.children[0],p=tt(l);c=d.innerHTML.split("<br>").length,d.innerHTML.includes("</math>")&&(c+=d.innerHTML.split("<mrow>").length-1);const u=d.getElementsByTagName("img");if(u){const m=s.replace(/<img[^>]*>/g,"").trim()==="";await Promise.all([...u].map(f=>new Promise(y=>{function C(){var b;if(f.style.display="flex",f.style.flexDirection="column",m){const k=((b=o.fontSize)==null?void 0:b.toString())??window.getComputedStyle(document.body).fontSize,v=parseInt(k,10)*5+"px";f.style.minWidth=v,f.style.maxWidth=v}else f.style.width="100%";y(f)}g(C,"setupImage"),setTimeout(()=>{f.complete&&C()}),f.addEventListener("error",C),f.addEventListener("load",C)})))}h=d.getBoundingClientRect(),p.attr("width",h.width),p.attr("height",h.height)}else{i.includes("font-weight: bolder")&&tt(l).selectAll("tspan").attr("font-weight",""),c=l.children.length;const d=l.children[0];(l.textContent===""||l.textContent.includes("&gt"))&&(d.textContent=s[0]+s.substring(1).replaceAll("&gt;",">").replaceAll("&lt;","<").trim(),s[1]===" "&&(d.textContent=d.textContent[0]+" "+d.textContent.substring(1))),d.textContent==="undefined"&&(d.textContent=""),h=l.getBBox()}return n.attr("transform","translate(0,"+(-h.height/(2*c)+e)+")"),h.height}g(Ie,"addText");async function _p(r,t){var O,W;const e=ot(),{themeVariables:i}=e,{useGradient:n}=i,o=e.class.padding??12,a=o,s=t.useHtmlLabels??xr(e.htmlLabels)??!0,l=t;l.annotations=l.annotations??[],l.members=l.members??[],l.methods=l.methods??[];const{shapeSvg:h,bbox:c}=await Sp(r,t,e,s,a),{labelStyles:d,nodeStyles:p}=H(t);t.labelStyle=d,t.cssStyles=l.styles||"";const u=((O=l.styles)==null?void 0:O.join(";"))||p||"";t.cssStyles||(t.cssStyles=u.replaceAll("!important","").split(";"));const m=l.members.length===0&&l.methods.length===0&&!((W=e.class)!=null&&W.hideEmptyMembersBox),f=q.svg(h),y=j(t,{});t.look!=="handDrawn"&&(y.roughness=0,y.fillStyle="solid");const C=Math.max(t.width??0,c.width);let b=Math.max(t.height??0,c.height);const k=(t.height??0)>c.height;l.members.length===0&&l.methods.length===0?b+=a:l.members.length>0&&l.methods.length===0&&(b+=a*2);const T=-C/2,v=-b/2;let _=m?o*2:l.members.length===0&&l.methods.length===0?-o:0;k&&(_=o*2);const w=f.rectangle(T-o,v-o-(m?o:l.members.length===0&&l.methods.length===0?-o/2:0),C+2*o,b+2*o+_,y),S=h.insert(()=>w,":first-child");S.attr("class","basic label-container outer-path");const M=S.node().getBBox(),A=h.select(".annotation-group").node().getBBox().height-(m?o/2:0)||0,E=h.select(".label-group").node().getBBox().height-(m?o/2:0)||0,z=h.select(".members-group").node().getBBox().height-(m?o/2:0)||0,R=(A+E+v+o-(v-o-(m?o:l.members.length===0&&l.methods.length===0?-o/2:0)))/2;if(h.selectAll(".text").each((I,$,D)=>{var vt,bt;const V=tt(D[$]),rt=V.attr("transform");let yt=0;if(rt){const Dr=RegExp(/translate\(([^,]+),([^)]+)\)/).exec(rt);Dr&&(yt=parseFloat(Dr[2]))}let Tt=yt+v+o-(m?o:l.members.length===0&&l.methods.length===0?-o/2:0);if(V.attr("class").includes("methods-group")){const Wt=Math.max(z,a/2);k?Tt=Math.max(R,A+E+Wt+v+a*2+o)+a*2:Tt=A+E+Wt+v+a*4+o}l.members.length===0&&l.methods.length===0&&((vt=e.class)!=null&&vt.hideEmptyMembersBox)&&(l.annotations.length>0?Tt=yt-a:Tt=yt),s||(Tt-=4);let $t=T;(V.attr("class").includes("label-group")||V.attr("class").includes("annotation-group"))&&($t=-((bt=V.node())==null?void 0:bt.getBBox().width)/2||0,h.selectAll("text").each(function(Wt,Dr,vi){window.getComputedStyle(vi[Dr]).textAnchor==="middle"&&($t=0)})),V.attr("transform",`translate(${$t}, ${Tt})`)}),l.members.length>0||l.methods.length>0||m){const I=A+E+v+o,$=f.line(M.x,I,M.x+M.width,I+.001,y);h.insert(()=>$).attr("class",`divider${t.look==="neo"&&!n?" neo-line":""}`).attr("style",u)}if(m||l.members.length>0||l.methods.length>0){const I=A+E+z+v+a*2+o,$=f.line(M.x,k?Math.max(R,I):I,M.x+M.width,(k?Math.max(R,I):I)+.001,y);h.insert(()=>$).attr("class",`divider${t.look==="neo"&&!n?" neo-line":""}`).attr("style",u)}if(l.look!=="handDrawn"&&h.selectAll("path").attr("style",u),S.select(":nth-child(2)").attr("style",u),h.selectAll(".divider").select("path").attr("style",u),t.labelStyle?h.selectAll("span").attr("style",t.labelStyle):h.selectAll("span").attr("style",u),!s){const I=RegExp(/color\s*:\s*([^;]*)/),$=I.exec(u);if($){const D=$[0].replace("color","fill");h.selectAll("tspan").attr("style",D)}else if(d){const D=I.exec(d);if(D){const V=D[0].replace("color","fill");h.selectAll("tspan").attr("style",V)}}}return U(t,S),t.intersect=function(I){return N.rect(t,I)},h}g(_p,"classBox");async function Bp(r,t){var M,A;const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const n=t,o=t,a=20,s=20,l="verifyMethod"in t,h=Y(t),{themeVariables:c}=ot(),{borderColorArray:d,requirementEdgeLabelBackground:p}=c,u=r.insert("g").attr("class",h).attr("id",t.domId??t.id);let m;l?m=await ir(u,`&lt;&lt;${n.type}&gt;&gt;`,0,t.labelStyle):m=await ir(u,"&lt;&lt;Element&gt;&gt;",0,t.labelStyle);let f=m;const y=await ir(u,n.name,f,t.labelStyle+"; font-weight: bold;");if(f+=y+s,l){const E=await ir(u,`${n.requirementId?`ID: ${n.requirementId}`:""}`,f,t.labelStyle);f+=E;const z=await ir(u,`${n.text?`Text: ${n.text}`:""}`,f,t.labelStyle);f+=z;const R=await ir(u,`${n.risk?`Risk: ${n.risk}`:""}`,f,t.labelStyle);f+=R,await ir(u,`${n.verifyMethod?`Verification: ${n.verifyMethod}`:""}`,f,t.labelStyle)}else{const E=await ir(u,`${o.type?`Type: ${o.type}`:""}`,f,t.labelStyle);f+=E,await ir(u,`${o.docRef?`Doc Ref: ${o.docRef}`:""}`,f,t.labelStyle)}const C=(((M=u.node())==null?void 0:M.getBBox().width)??200)+a,b=(((A=u.node())==null?void 0:A.getBBox().height)??200)+a,k=-C/2,T=-b/2,v=q.svg(u),_=j(t,{});t.look!=="handDrawn"&&(_.roughness=0,_.fillStyle="solid");const w=v.rectangle(k,T,C,b,_),S=u.insert(()=>w,":first-child");if(S.attr("class","basic label-container outer-path").attr("style",i),d!=null&&d.length){const E=t.colorIndex??0;u.attr("data-color-id",`color-${E%d.length}`)}if(u.selectAll(".label").each((E,z,R)=>{const O=tt(R[z]),W=O.attr("transform");let I=0,$=0;if(W){const yt=RegExp(/translate\(([^,]+),([^)]+)\)/).exec(W);yt&&(I=parseFloat(yt[1]),$=parseFloat(yt[2]))}const D=$-b/2;let V=k+a/2;(z===0||z===1)&&(V=I),O.attr("transform",`translate(${V}, ${D+a})`)}),f>m+y+s){const E=T+m+y+s;let z;if(t.look==="neo"){const W=[[k,E],[k+C,E],[k+C,E+.001],[k,E+.001]];z=v.polygon(W,_)}else z=v.line(k,E,k+C,E,_);u.insert(()=>z).attr("class","divider")}return U(t,S),t.intersect=function(E){return N.rect(t,E)},i&&t.look!=="handDrawn"&&(p||d!=null&&d.length)&&u.selectAll("path").attr("style",i),u}g(Bp,"requirementBox");async function ir(r,t,e,i=""){if(t==="")return 0;const n=r.insert("g").attr("class","label").attr("style",i),o=ot(),a=o.htmlLabels??!0,s=await br(n,us(Xr(t)),{width:Cr(t,o)+50,classes:"markdown-node-label",useHtmlLabels:a,style:i},o);let l;if(a){const h=s.children[0],c=tt(s);l=h.getBoundingClientRect(),c.attr("width",l.width),c.attr("height",l.height)}else{const h=s.children[0];for(const c of h.children)i&&c.setAttribute("style",i);l=s.getBBox(),l.height+=6}return n.attr("transform",`translate(${-l.width/2},${-l.height/2+e})`),l.height}g(ir,"addText");var j2=g(r=>{switch(r){case"Very High":return"red";case"High":return"orange";case"Medium":return null;case"Low":return"blue";case"Very Low":return"lightblue"}},"colorFromPriority");async function Lp(r,t,{config:e}){var z,R;const{labelStyles:i,nodeStyles:n}=H(t);t.labelStyle=i||"";const o=10,a=t.width;t.width=(t.width??200)-10;const{shapeSvg:s,bbox:l,label:h}=await K(r,t,Y(t)),c=t.padding||10;let d="",p;"ticket"in t&&t.ticket&&((z=e==null?void 0:e.kanban)!=null&&z.ticketBaseUrl)&&(d=(R=e==null?void 0:e.kanban)==null?void 0:R.ticketBaseUrl.replace("#TICKET#",t.ticket),p=s.insert("svg:a",":first-child").attr("class","kanban-ticket-link").attr("xlink:href",d).attr("target","_blank"));const u={useHtmlLabels:t.useHtmlLabels,labelStyle:t.labelStyle||"",width:t.width,img:t.img,padding:t.padding||8,centerLabel:!1};let m,f;p?{label:m,bbox:f}=await so(p,"ticket"in t&&t.ticket||"",u):{label:m,bbox:f}=await so(s,"ticket"in t&&t.ticket||"",u);const{label:y,bbox:C}=await so(s,"assigned"in t&&t.assigned||"",u);t.width=a;const b=10,k=(t==null?void 0:t.width)||0,T=Math.max(f.height,C.height)/2,v=Math.max(l.height+b*2,(t==null?void 0:t.height)||0)+T,_=-k/2,w=-v/2;h.attr("transform","translate("+(c-k/2)+", "+(-T-l.height/2)+")"),m.attr("transform","translate("+(c-k/2)+", "+(-T+l.height/2)+")"),y.attr("transform","translate("+(c+k/2-C.width-2*o)+", "+(-T+l.height/2)+")");let S;const{rx:M,ry:A}=t,{cssStyles:E}=t;if(t.look==="handDrawn"){const O=q.svg(s),W=j(t,{}),I=M||A?O.path(Pr(_,w,k,v,M||0),W):O.rectangle(_,w,k,v,W);S=s.insert(()=>I,":first-child"),S.attr("class","basic label-container").attr("style",E||null)}else{S=s.insert("rect",":first-child"),S.attr("class","basic label-container __APA__").attr("style",n).attr("rx",M??5).attr("ry",A??5).attr("x",_).attr("y",w).attr("width",k).attr("height",v);const O="priority"in t&&t.priority;if(O){const W=s.append("line"),I=_+2,$=w+Math.floor((M??0)/2),D=w+v-Math.floor((M??0)/2);W.attr("x1",I).attr("y1",$).attr("x2",I).attr("y2",D).attr("stroke-width","4").attr("stroke",j2(O))}}return U(t,S),t.height=v,t.intersect=function(O){return N.rect(t,O)},s}g(Lp,"kanbanItem");async function Fp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const{shapeSvg:n,bbox:o,halfPadding:a,label:s}=await K(r,t,Y(t)),l=o.width+10*a,h=o.height+8*a,c=.15*l,{cssStyles:d}=t,p=o.width+20,u=o.height+20,m=Math.max(l,p),f=Math.max(h,u);s.attr("transform",`translate(${-o.width/2}, ${-o.height/2})`);let y;const C=`M0 0 
    a${c},${c} 1 0,0 ${m*.25},${-1*f*.1}
    a${c},${c} 1 0,0 ${m*.25},0
    a${c},${c} 1 0,0 ${m*.25},0
    a${c},${c} 1 0,0 ${m*.25},${f*.1}

    a${c},${c} 1 0,0 ${m*.15},${f*.33}
    a${c*.8},${c*.8} 1 0,0 0,${f*.34}
    a${c},${c} 1 0,0 ${-1*m*.15},${f*.33}

    a${c},${c} 1 0,0 ${-1*m*.25},${f*.15}
    a${c},${c} 1 0,0 ${-1*m*.25},0
    a${c},${c} 1 0,0 ${-1*m*.25},0
    a${c},${c} 1 0,0 ${-1*m*.25},${-1*f*.15}

    a${c},${c} 1 0,0 ${-1*m*.1},${-1*f*.33}
    a${c*.8},${c*.8} 1 0,0 0,${-1*f*.34}
    a${c},${c} 1 0,0 ${m*.1},${-1*f*.33}
  H0 V0 Z`;if(t.look==="handDrawn"){const b=q.svg(n),k=j(t,{}),T=b.path(C,k);y=n.insert(()=>T,":first-child"),y.attr("class","basic label-container").attr("style",xt(d))}else y=n.insert("path",":first-child").attr("class","basic label-container").attr("style",i).attr("d",C);return y.attr("transform",`translate(${-m/2}, ${-f/2})`),U(t,y),t.calcIntersect=function(b,k){return N.rect(b,k)},t.intersect=function(b){return P.info("Bang intersect",t,b),N.rect(t,b)},n}g(Fp,"bang");async function Mp(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const{shapeSvg:n,bbox:o,halfPadding:a,label:s}=await K(r,t,Y(t)),l=o.width+2*a,h=o.height+2*a,c=.15*l,d=.25*l,p=.35*l,u=.2*l,{cssStyles:m}=t;let f;const y=`M0 0 
    a${c},${c} 0 0,1 ${l*.25},${-1*l*.1}
    a${p},${p} 1 0,1 ${l*.4},${-1*l*.1}
    a${d},${d} 1 0,1 ${l*.35},${l*.2}

    a${c},${c} 1 0,1 ${l*.15},${h*.35}
    a${u},${u} 1 0,1 ${-1*l*.15},${h*.65}

    a${d},${c} 1 0,1 ${-1*l*.25},${l*.15}
    a${p},${p} 1 0,1 ${-1*l*.5},0
    a${c},${c} 1 0,1 ${-1*l*.25},${-1*l*.15}

    a${c},${c} 1 0,1 ${-1*l*.1},${-1*h*.35}
    a${u},${u} 1 0,1 ${l*.1},${-1*h*.65}
  H0 V0 Z`;if(t.look==="handDrawn"){const C=q.svg(n),b=j(t,{}),k=C.path(y,b);f=n.insert(()=>k,":first-child"),f.attr("class","basic label-container").attr("style",xt(m))}else f=n.insert("path",":first-child").attr("class","basic label-container").attr("style",i).attr("d",y);return s.attr("transform",`translate(${-o.width/2}, ${-o.height/2})`),f.attr("transform",`translate(${-l/2}, ${-h/2})`),U(t,f),t.calcIntersect=function(C,b){return N.rect(C,b)},t.intersect=function(C){return P.info("Cloud intersect",t,C),N.rect(t,C)},n}g(Mp,"cloud");async function Ap(r,t){const{labelStyles:e,nodeStyles:i}=H(t);t.labelStyle=e;const{shapeSvg:n,bbox:o,halfPadding:a,label:s}=await K(r,t,Y(t)),l=o.width+8*a,h=o.height+2*a,c=5,d=t.look==="neo"?`
    M${-l/2} ${h/2-c}
    v${-h+2*c}
    q0,-${c} ${c},-${c}
    h${l-2*c}
    q${c},0 ${c},${c}
    v${h-c}
    H${-l/2}
    Z
  `:`
    M${-l/2} ${h/2-c}
    v${-h+2*c}
    q0,-${c} ${c},-${c}
    h${l-2*c}
    q${c},0 ${c},${c}
    v${h-2*c}
    q0,${c} ${-c},${c}
    h${-(l-2*c)}
    q${-c},0 ${-c},${-c}
    Z
  `;if(!t.domId)throw new Error(`defaultMindmapNode: node "${t.id}" is missing a domId — was render.ts domId prefixing skipped?`);const p=n.append("path").attr("id",t.domId).attr("class","node-bkg node-"+t.type).attr("style",i).attr("d",d);return n.append("line").attr("class","node-line-").attr("x1",-l/2).attr("y1",h/2).attr("x2",l/2).attr("y2",h/2),s.attr("transform",`translate(${-o.width/2}, ${-o.height/2})`),n.append(()=>s.node()),U(t,p),t.calcIntersect=function(u,m){return N.rect(u,m)},t.intersect=function(u){return N.rect(t,u)},n}g(Ap,"defaultMindmapNode");async function Ep(r,t){const e={padding:t.padding??0};return Qs(r,t,e)}g(Ep,"mindmapCircle");var H2=[{semanticName:"Process",name:"Rectangle",shortName:"rect",description:"Standard process shape",aliases:["proc","process","rectangle"],internalAliases:["squareRect"],handler:hp},{semanticName:"Event",name:"Rounded Rectangle",shortName:"rounded",description:"Represents an event",aliases:["event"],internalAliases:["roundedRect"],handler:sp},{semanticName:"Terminal Point",name:"Stadium",shortName:"stadium",description:"Terminal point",aliases:["terminal","pill"],handler:cp},{semanticName:"Subprocess",name:"Framed Rectangle",shortName:"fr-rect",description:"Subprocess",aliases:["subprocess","subproc","framed-rectangle","subroutine"],handler:gp},{semanticName:"Database",name:"Cylinder",shortName:"cyl",description:"Database storage",aliases:["db","database","cylinder"],handler:Pu},{semanticName:"Start",name:"Circle",shortName:"circle",description:"Starting point",aliases:["circ"],handler:Qs},{semanticName:"Bang",name:"Bang",shortName:"bang",description:"Bang",aliases:["bang"],handler:Fp},{semanticName:"Cloud",name:"Cloud",shortName:"cloud",description:"cloud",aliases:["cloud"],handler:Mp},{semanticName:"Decision",name:"Diamond",shortName:"diam",description:"Decision-making step",aliases:["decision","diamond","question"],handler:ip},{semanticName:"Prepare Conditional",name:"Hexagon",shortName:"hex",description:"Preparation or condition step",aliases:["hexagon","prepare"],handler:zu},{semanticName:"Data Input/Output",name:"Lean Right",shortName:"lean-r",description:"Represents input or output",aliases:["lean-right","in-out"],internalAliases:["lean_right"],handler:Ku},{semanticName:"Data Input/Output",name:"Lean Left",shortName:"lean-l",description:"Represents output or input",aliases:["lean-left","out-in"],internalAliases:["lean_left"],handler:Xu},{semanticName:"Priority Action",name:"Trapezoid Base Bottom",shortName:"trap-b",description:"Priority action",aliases:["priority","trapezoid-bottom","trapezoid"],handler:xp},{semanticName:"Manual Operation",name:"Trapezoid Base Top",shortName:"trap-t",description:"Represents a manual task",aliases:["manual","trapezoid-top","inv-trapezoid"],internalAliases:["inv_trapezoid"],handler:Vu},{semanticName:"Stop",name:"Double Circle",shortName:"dbl-circ",description:"Represents a stop point",aliases:["double-circle"],internalAliases:["doublecircle"],handler:Iu},{semanticName:"Text Block",name:"Text Block",shortName:"text",description:"Text block",handler:yp},{semanticName:"Card",name:"Notched Rectangle",shortName:"notch-rect",description:"Represents a card",aliases:["card","notched-rectangle"],handler:Su},{semanticName:"Lined/Shaded Process",name:"Lined Rectangle",shortName:"lin-rect",description:"Lined process shape",aliases:["lined-rectangle","lined-process","lin-proc","shaded-process"],handler:ap},{semanticName:"Start",name:"Small Circle",shortName:"sm-circ",description:"Small starting point",aliases:["start","small-circle"],internalAliases:["stateStart"],handler:pp},{semanticName:"Stop",name:"Framed Circle",shortName:"fr-circ",description:"Stop point",aliases:["stop","framed-circle"],internalAliases:["stateEnd"],handler:up},{semanticName:"Fork/Join",name:"Filled Rectangle",shortName:"fork",description:"Fork or join in process flow",aliases:["join"],internalAliases:["forkJoin"],handler:$u},{semanticName:"Collate",name:"Hourglass",shortName:"hourglass",description:"Represents a collate operation",aliases:["hourglass","collate"],handler:Nu},{semanticName:"Comment",name:"Curly Brace",shortName:"brace",description:"Adds a comment",aliases:["comment","brace-l"],handler:Fu},{semanticName:"Comment Right",name:"Curly Brace",shortName:"brace-r",description:"Adds a comment",handler:Mu},{semanticName:"Comment with braces on both sides",name:"Curly Braces",shortName:"braces",description:"Adds a comment",handler:Au},{semanticName:"Com Link",name:"Lightning Bolt",shortName:"bolt",description:"Communication link",aliases:["com-link","lightning-bolt"],handler:Zu},{semanticName:"Document",name:"Document",shortName:"doc",description:"Represents a document",aliases:["doc","document"],handler:wp},{semanticName:"Delay",name:"Half-Rounded Rectangle",shortName:"delay",description:"Represents a delay",aliases:["half-rounded-rectangle"],handler:Wu},{semanticName:"Direct Access Storage",name:"Horizontal Cylinder",shortName:"h-cyl",description:"Direct access storage",aliases:["das","horizontal-cylinder"],handler:Cp},{semanticName:"Disk Storage",name:"Lined Cylinder",shortName:"lin-cyl",description:"Disk storage",aliases:["disk","lined-cylinder"],handler:Qu},{semanticName:"Display",name:"Curved Trapezoid",shortName:"curv-trap",description:"Represents a display",aliases:["curved-trapezoid","display"],handler:Eu},{semanticName:"Divided Process",name:"Divided Rectangle",shortName:"div-rect",description:"Divided process shape",aliases:["div-proc","divided-rectangle","divided-process"],handler:Du},{semanticName:"Extract",name:"Triangle",shortName:"tri",description:"Extraction process",aliases:["extract","triangle"],handler:kp},{semanticName:"Internal Storage",name:"Window Pane",shortName:"win-pane",description:"Internal storage",aliases:["internal-storage","window-pane"],handler:vp},{semanticName:"Junction",name:"Filled Circle",shortName:"f-circ",description:"Junction point",aliases:["junction","filled-circle"],handler:Ru},{semanticName:"Loop Limit",name:"Trapezoidal Pentagon",shortName:"notch-pent",description:"Loop limit step",aliases:["loop-limit","notched-pentagon"],handler:bp},{semanticName:"Manual File",name:"Flipped Triangle",shortName:"flip-tri",description:"Manual file operation",aliases:["manual-file","flipped-triangle"],handler:Ou},{semanticName:"Manual Input",name:"Sloped Rectangle",shortName:"sl-rect",description:"Manual input step",aliases:["manual-input","sloped-rectangle"],handler:lp},{semanticName:"Multi-Document",name:"Stacked Document",shortName:"docs",description:"Multiple documents",aliases:["documents","st-doc","stacked-document"],handler:rp},{semanticName:"Multi-Process",name:"Stacked Rectangle",shortName:"st-rect",description:"Multiple processes",aliases:["procs","processes","stacked-rectangle"],handler:tp},{semanticName:"Stored Data",name:"Bow Tie Rectangle",shortName:"bow-rect",description:"Stored data",aliases:["stored-data","bow-tie-rectangle"],handler:vu},{semanticName:"Summary",name:"Crossed Circle",shortName:"cross-circ",description:"Summary",aliases:["summary","crossed-circle"],handler:Lu},{semanticName:"Tagged Document",name:"Tagged Document",shortName:"tag-doc",description:"Tagged document",aliases:["tag-doc","tagged-document"],handler:mp},{semanticName:"Tagged Process",name:"Tagged Rectangle",shortName:"tag-rect",description:"Tagged process",aliases:["tagged-rectangle","tag-proc","tagged-process"],handler:fp},{semanticName:"Paper Tape",name:"Flag",shortName:"flag",description:"Paper tape",aliases:["paper-tape"],handler:Tp},{semanticName:"Odd",name:"Odd",shortName:"odd",description:"Odd shape",internalAliases:["rect_left_inv_arrow"],handler:np},{semanticName:"Lined Document",name:"Lined Document",shortName:"lin-doc",description:"Lined document",aliases:["lined-document"],handler:Ju}],U2=g(()=>{const t=[...Object.entries({state:dp,choice:_u,note:ep,rectWithTitle:op,labelRect:Yu,iconSquare:Uu,iconCircle:ju,icon:qu,iconRounded:Hu,imageSquare:Gu,anchor:wu,kanbanItem:Lp,mindmapCircle:Ep,defaultMindmapNode:Ap,classBox:_p,erBox:Js,requirementBox:Bp}),...H2.flatMap(e=>[e.shortName,..."aliases"in e?e.aliases:[],..."internalAliases"in e?e.internalAliases:[]].map(n=>[n,e.handler]))];return Object.fromEntries(t)},"generateShapeMap"),Pp=U2();function G2(r){return r in Pp}g(G2,"isValidShape");var jn=new Map;async function Dp(r,t,e){let i,n;t.shape==="rect"&&(t.rx&&t.ry?t.shape="roundedRect":t.shape="squareRect");const o=t.shape?Pp[t.shape]:void 0;if(!o)throw new Error(`No such shape: ${t.shape}. Please check your syntax.`);if(t.link){let a;e.config.securityLevel==="sandbox"?a="_top":t.linkTarget&&(a=t.linkTarget||"_blank"),i=r.insert("svg:a").attr("xlink:href",t.link).attr("target",a??null),n=await o(i,t,e)}else n=await o(r,t,e),i=n;return i.attr("data-look",xt(t.look)),t.tooltip&&n.attr("title",t.tooltip),jn.set(t.id,i),t.haveCallback&&i.attr("class",i.attr("class")+" clickable"),i}g(Dp,"insertNode");var W_=g((r,t)=>{jn.set(t.id,r)},"setNodeElem"),z_=g(()=>{jn.clear()},"clear"),N_=g(r=>{const t=jn.get(r.id);P.trace("Transforming node",r.diff,r,"translate("+(r.x-r.width/2-5)+", "+r.width/2+")");const e=8,i=r.diff||0;return r.clusterNode?t.attr("transform","translate("+(r.x+i-r.width/2)+", "+(r.y-r.height/2-e)+")"):t.attr("transform","translate("+r.x+", "+r.y+")"),i},"positionNode"),V2=g((r,t,e,i,n,o=!1,a)=>{t.arrowTypeStart&&ml(r,"start",t.arrowTypeStart,e,i,n,o,a),t.arrowTypeEnd&&ml(r,"end",t.arrowTypeEnd,e,i,n,o,a)},"addEdgeMarkers"),Y2={arrow_cross:{type:"cross",fill:!1},arrow_point:{type:"point",fill:!0},arrow_barb:{type:"barb",fill:!0},arrow_barb_neo:{type:"barb",fill:!0},arrow_circle:{type:"circle",fill:!1},aggregation:{type:"aggregation",fill:!1},extension:{type:"extension",fill:!1},composition:{type:"composition",fill:!0},dependency:{type:"dependency",fill:!0},lollipop:{type:"lollipop",fill:!1},only_one:{type:"onlyOne",fill:!1},zero_or_one:{type:"zeroOrOne",fill:!1},one_or_more:{type:"oneOrMore",fill:!1},zero_or_more:{type:"zeroOrMore",fill:!1},requirement_arrow:{type:"requirement_arrow",fill:!1},requirement_contains:{type:"requirement_contains",fill:!1}},X2=["cross","point","circle","lollipop","aggregation","extension","composition","dependency","barb"],ml=g((r,t,e,i,n,o,a=!1,s)=>{var m;const l=Y2[e],h=l&&X2.includes(l.type);if(!l){P.warn(`Unknown arrow type: ${e}`);return}const c=l.type,u=`${n}_${o}-${c}${t==="start"?"Start":"End"}${a&&h?"-margin":""}`;if(s&&s.trim()!==""){const f=s.replace(/[^\dA-Za-z]/g,"_"),y=`${u}_${f}`;if(!document.getElementById(y)){const C=document.getElementById(u);if(C){const b=C.cloneNode(!0);b.id=y,b.querySelectorAll("path, circle, line").forEach(T=>{T.setAttribute("stroke",s),l.fill&&T.setAttribute("fill",s)}),(m=C.parentNode)==null||m.appendChild(b)}}r.attr(`marker-${t}`,`url(${i}#${y})`)}else r.attr(`marker-${t}`,`url(${i}#${u})`)},"addEdgeMarker"),K2=g(r=>{var t,e;return typeof r=="string"?r:(e=(t=ot())==null?void 0:t.flowchart)==null?void 0:e.curve},"resolveEdgeCurveType"),_n=new Map,wt=new Map,q_=g(()=>{_n.clear(),wt.clear()},"clear"),Le=g(r=>r?typeof r=="string"?r:r.reduce((t,e)=>t+";"+e,""):"","getLabelStyles"),Z2=g(async(r,t)=>{const e=ot();let i=Pt(e);const{labelStyles:n}=H(t);t.labelStyle=n;const o=r.insert("g").attr("class","edgeLabel"),a=o.insert("g").attr("class","label").attr("data-id",t.id),s=t.labelType==="markdown",h=await br(r,t.label,{style:Le(t.labelStyle),useHtmlLabels:i,addSvgBackground:!0,isNode:!1,markdown:s,width:s?void 0:void 0},e);a.node().appendChild(h),P.info("abc82",t,t.labelType);let c=h.getBBox(),d=c;if(i){const u=h.children[0],m=tt(h);c=u.getBoundingClientRect(),d=c,m.attr("width",c.width),m.attr("height",c.height)}else{const u=tt(h).select("text").node();u&&typeof u.getBBox=="function"&&(d=u.getBBox())}a.attr("transform",Te(d,i)),_n.set(t.id,o),t.width=c.width,t.height=c.height;let p;if(t.startLabelLeft){const u=r.insert("g").attr("class","edgeTerminals"),m=u.insert("g").attr("class","inner"),f=await Sr(m,t.startLabelLeft,Le(t.labelStyle)||"",!1,!1);p=f;let y=f.getBBox();if(i){const C=f.children[0],b=tt(f);y=C.getBoundingClientRect(),b.attr("width",y.width),b.attr("height",y.height)}m.attr("transform",Te(y,i)),wt.get(t.id)||wt.set(t.id,{}),wt.get(t.id).startLeft=u,Re(p,t.startLabelLeft)}if(t.startLabelRight){const u=r.insert("g").attr("class","edgeTerminals"),m=u.insert("g").attr("class","inner"),f=await Sr(m,t.startLabelRight,Le(t.labelStyle)||"",!1,!1);p=f,m.node().appendChild(f);let y=f.getBBox();if(i){const C=f.children[0],b=tt(f);y=C.getBoundingClientRect(),b.attr("width",y.width),b.attr("height",y.height)}m.attr("transform",Te(y,i)),wt.get(t.id)||wt.set(t.id,{}),wt.get(t.id).startRight=u,Re(p,t.startLabelRight)}if(t.endLabelLeft){const u=r.insert("g").attr("class","edgeTerminals"),m=u.insert("g").attr("class","inner"),f=await Sr(m,t.endLabelLeft,Le(t.labelStyle)||"",!1,!1);p=f;let y=f.getBBox();if(i){const C=f.children[0],b=tt(f);y=C.getBoundingClientRect(),b.attr("width",y.width),b.attr("height",y.height)}m.attr("transform",Te(y,i)),u.node().appendChild(f),wt.get(t.id)||wt.set(t.id,{}),wt.get(t.id).endLeft=u,Re(p,t.endLabelLeft)}if(t.endLabelRight){const u=r.insert("g").attr("class","edgeTerminals"),m=u.insert("g").attr("class","inner"),f=await Sr(m,t.endLabelRight,Le(t.labelStyle)||"",!1,!1);p=f;let y=f.getBBox();if(i){const C=f.children[0],b=tt(f);y=C.getBoundingClientRect(),b.attr("width",y.width),b.attr("height",y.height)}m.attr("transform",Te(y,i)),u.node().appendChild(f),wt.get(t.id)||wt.set(t.id,{}),wt.get(t.id).endRight=u,Re(p,t.endLabelRight)}return h},"insertEdgeLabel");function Re(r,t){Pt(ot())&&r&&(r.style.width=t.length*9+"px",r.style.height="12px")}g(Re,"setTerminalWidth");var Q2=g((r,t)=>{P.debug("Moving label abc88 ",r.id,r.label,_n.get(r.id),t);let e=t.updatedPath?t.updatedPath:t.originalPath;const i=ot(),{subGraphTitleTotalMargin:n}=Ws(i);if(r.label){const o=_n.get(r.id);let a=r.x,s=r.y;if(e){const l=Kt.calcLabelPosition(e);P.debug("Moving label "+r.label+" from (",a,",",s,") to (",l.x,",",l.y,") abc88"),t.updatedPath&&(a=l.x,s=l.y)}o.attr("transform",`translate(${a}, ${s+n/2})`)}if(r.startLabelLeft){const o=wt.get(r.id).startLeft;let a=r.x,s=r.y;if(e){const l=Kt.calcTerminalLabelPosition(r.arrowTypeStart?10:0,"start_left",e);a=l.x,s=l.y}o.attr("transform",`translate(${a}, ${s})`)}if(r.startLabelRight){const o=wt.get(r.id).startRight;let a=r.x,s=r.y;if(e){const l=Kt.calcTerminalLabelPosition(r.arrowTypeStart?10:0,"start_right",e);a=l.x,s=l.y}o.attr("transform",`translate(${a}, ${s})`)}if(r.endLabelLeft){const o=wt.get(r.id).endLeft;let a=r.x,s=r.y;if(e){const l=Kt.calcTerminalLabelPosition(r.arrowTypeEnd?10:0,"end_left",e);a=l.x,s=l.y}o.attr("transform",`translate(${a}, ${s})`)}if(r.endLabelRight){const o=wt.get(r.id).endRight;let a=r.x,s=r.y;if(e){const l=Kt.calcTerminalLabelPosition(r.arrowTypeEnd?10:0,"end_right",e);a=l.x,s=l.y}o.attr("transform",`translate(${a}, ${s})`)}},"positionEdgeLabel"),J2=g((r,t)=>{const e=r.x,i=r.y,n=Math.abs(t.x-e),o=Math.abs(t.y-i),a=r.width/2,s=r.height/2;return n>=a||o>=s},"outsideNode"),tw=g((r,t,e)=>{P.debug(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(t)}
  insidePoint : ${JSON.stringify(e)}
  node        : x:${r.x} y:${r.y} w:${r.width} h:${r.height}`);const i=r.x,n=r.y,o=Math.abs(i-e.x),a=r.width/2;let s=e.x<t.x?a-o:a+o;const l=r.height/2,h=Math.abs(t.y-e.y),c=Math.abs(t.x-e.x);if(Math.abs(n-t.y)*a>Math.abs(i-t.x)*l){let d=e.y<t.y?t.y-l-n:n-l-t.y;s=c*d/h;const p={x:e.x<t.x?e.x+s:e.x-c+s,y:e.y<t.y?e.y+h-d:e.y-h+d};return s===0&&(p.x=t.x,p.y=t.y),c===0&&(p.x=t.x),h===0&&(p.y=t.y),P.debug(`abc89 top/bottom calc, Q ${h}, q ${d}, R ${c}, r ${s}`,p),p}else{e.x<t.x?s=t.x-a-i:s=i-a-t.x;let d=h*s/c,p=e.x<t.x?e.x+c-s:e.x-c+s,u=e.y<t.y?e.y+d:e.y-d;return P.debug(`sides calc abc89, Q ${h}, q ${d}, R ${c}, r ${s}`,{_x:p,_y:u}),s===0&&(p=t.x,u=t.y),c===0&&(p=t.x),h===0&&(u=t.y),{x:p,y:u}}},"intersection"),yl=g((r,t)=>{P.warn("abc88 cutPathAtIntersect",r,t);let e=[],i=r[0],n=!1;return r.forEach(o=>{if(P.info("abc88 checking point",o,t),!J2(t,o)&&!n){const a=tw(t,i,o);P.debug("abc88 inside",o,i,a),P.debug("abc88 intersection",a,t);let s=!1;e.forEach(l=>{s=s||l.x===a.x&&l.y===a.y}),e.some(l=>l.x===a.x&&l.y===a.y)?P.warn("abc88 no intersect",a,e):e.push(a),n=!0}else P.warn("abc88 outside",o,i),i=o,n||e.push(o)}),P.debug("returning points",e),e},"cutPathAtIntersect");function Ip(r){const t=[],e=[];for(let i=1;i<r.length-1;i++){const n=r[i-1],o=r[i],a=r[i+1];(n.x===o.x&&o.y===a.y&&Math.abs(o.x-a.x)>5&&Math.abs(o.y-n.y)>5||n.y===o.y&&o.x===a.x&&Math.abs(o.x-n.x)>5&&Math.abs(o.y-a.y)>5)&&(t.push(o),e.push(i))}return{cornerPoints:t,cornerPointPositions:e}}g(Ip,"extractCornerPoints");var Cl=g(function(r,t,e){const i=t.x-r.x,n=t.y-r.y,o=Math.sqrt(i*i+n*n),a=e/o;return{x:t.x-a*i,y:t.y-a*n}},"findAdjacentPoint"),rw=g(function(r){const{cornerPointPositions:t}=Ip(r),e=[];for(let i=0;i<r.length;i++)if(t.includes(i)){const n=r[i-1],o=r[i+1],a=r[i],s=Cl(n,a,5),l=Cl(o,a,5),h=l.x-s.x,c=l.y-s.y;e.push(s);const d=Math.sqrt(2)*2;let p={x:a.x,y:a.y};if(Math.abs(o.x-n.x)>10&&Math.abs(o.y-n.y)>=10){P.debug("Corner point fixing",Math.abs(o.x-n.x),Math.abs(o.y-n.y));const u=5;a.x===s.x?p={x:h<0?s.x-u+d:s.x+u-d,y:c<0?s.y-d:s.y+d}:p={x:h<0?s.x-d:s.x+d,y:c<0?s.y-u+d:s.y+u-d}}else P.debug("Corner point skipping fixing",Math.abs(o.x-n.x),Math.abs(o.y-n.y));e.push(p,l)}else e.push(r[i]);return e},"fixCorners"),ew=g((r,t,e)=>{const i=r-t-e,n=2,o=2,a=n+o,s=Math.floor(i/a),l=Array(s).fill(`${n} ${o}`).join(" ");return`0 ${t} ${l} ${e}`},"generateDashArray"),iw=g(function(r,t,e,i,n,o,a,s=!1){var $;if(!a)throw new Error(`insertEdge: missing diagramId for edge "${t.id}" — edge IDs require a diagram prefix for uniqueness`);const{handDrawnSeed:l}=ot();let h=t.points,c=!1;const d=n;var p=o;const u=[];for(const D in t.cssCompiledStyles)Dd(D)||u.push(t.cssCompiledStyles[D]);P.debug("UIO intersect check",t.points,p.x,d.x),p.intersect&&d.intersect&&!s&&(h=h.slice(1,t.points.length-1),h.unshift(d.intersect(h[0])),P.debug("Last point UIO",t.start,"-->",t.end,h[h.length-1],p,p.intersect(h[h.length-1])),h.push(p.intersect(h[h.length-1])));const m=btoa(JSON.stringify(h));t.toCluster&&(P.info("to cluster abc88",e.get(t.toCluster)),h=yl(t.points,e.get(t.toCluster).node),c=!0),t.fromCluster&&(P.debug("from cluster abc88",e.get(t.fromCluster),JSON.stringify(h,null,2)),h=yl(h.reverse(),e.get(t.fromCluster).node).reverse(),c=!0);let f=h.filter(D=>!Number.isNaN(D.y));const y=K2(t.curve);y!=="rounded"&&(f=rw(f));let C=ze;switch(y){case"linear":C=ze;break;case"basis":C=So;break;case"cardinal":C=_h;break;case"bumpX":C=kh;break;case"bumpY":C=wh;break;case"catmullRom":C=Lh;break;case"monotoneX":C=Dh;break;case"monotoneY":C=Ih;break;case"natural":C=Oh;break;case"step":C=$h;break;case"stepAfter":C=zh;break;case"stepBefore":C=Wh;break;case"rounded":C=ze;break;default:C=So}const{x:b,y:k}=T1(t),T=sb().x(b).y(k).curve(C);let v;switch(t.thickness){case"normal":v="edge-thickness-normal";break;case"thick":v="edge-thickness-thick";break;case"invisible":v="edge-thickness-invisible";break;default:v="edge-thickness-normal"}switch(t.pattern){case"solid":v+=" edge-pattern-solid";break;case"dotted":v+=" edge-pattern-dotted";break;case"dashed":v+=" edge-pattern-dashed";break;default:v+=" edge-pattern-solid"}let _,w=y==="rounded"?Rp(Op(f,t),5):T(f);const S=Array.isArray(t.style)?t.style:[t.style];let M=S.find(D=>D==null?void 0:D.startsWith("stroke:")),A="";t.animate&&(A="edge-animation-fast"),t.animation&&(A="edge-animation-"+t.animation);let E=!1;if(t.look==="handDrawn"){const D=q.svg(r);Object.assign([],f);const V=D.path(w,{roughness:.3,seed:l});v+=" transition",_=tt(V).select("path").attr("id",`${a}-${t.id}`).attr("class"," "+v+(t.classes?" "+t.classes:"")+(A?" "+A:"")).attr("style",S?S.reduce((yt,Tt)=>yt+";"+Tt,""):"");let rt=_.attr("d");_.attr("d",rt),r.node().appendChild(_.node())}else{const D=u.join(";"),V=S?S.reduce((bt,Wt)=>bt+Wt+";",""):"",rt=(D?D+";"+V+";":V)+";"+(S?S.reduce((bt,Wt)=>bt+";"+Wt,""):"");_=r.append("path").attr("d",w).attr("id",`${a}-${t.id}`).attr("class"," "+v+(t.classes?" "+t.classes:"")+(A?" "+A:"")).attr("style",rt),M=($=rt.match(/stroke:([^;]+)/))==null?void 0:$[1],E=t.animate===!0||!!t.animation||D.includes("animation");const yt=_.node(),Tt=typeof yt.getTotalLength=="function"?yt.getTotalLength():0,$t=Ra[t.arrowTypeStart]||0,vt=Ra[t.arrowTypeEnd]||0;if(t.look==="neo"&&!E){const Wt=`stroke-dasharray: ${t.pattern==="dotted"||t.pattern==="dashed"?ew(Tt,$t,vt):`0 ${$t} ${Tt-$t-vt} ${vt}`}; stroke-dashoffset: 0;`;_.attr("style",Wt+_.attr("style"))}}_.attr("data-edge",!0),_.attr("data-et","edge"),_.attr("data-id",t.id),_.attr("data-points",m),_.attr("data-look",xt(t.look)),t.showPoints&&f.forEach(D=>{r.append("circle").style("stroke","red").style("fill","red").attr("r",1).attr("cx",D.x).attr("cy",D.y)});let z="";(ot().flowchart.arrowMarkerAbsolute||ot().state.arrowMarkerAbsolute)&&(z=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,z=z.replace(/\(/g,"\\(").replace(/\)/g,"\\)")),P.info("arrowTypeStart",t.arrowTypeStart),P.info("arrowTypeEnd",t.arrowTypeEnd);const R=!E&&(t==null?void 0:t.look)==="neo";V2(_,t,z,a,i,R,M);const O=Math.floor(h.length/2),W=h[O];Kt.isLabelCoordinateInPath(W,_.attr("d"))||(c=!0);let I={};return c&&(I.updatedPath=h),I.originalPath=t.points,I},"insertEdge");function Rp(r,t){if(r.length<2)return"";let e="";const i=r.length,n=1e-5;for(let o=0;o<i;o++){const a=r[o],s=r[o-1],l=r[o+1];if(o===0)e+=`M${a.x},${a.y}`;else if(o===i-1)e+=`L${a.x},${a.y}`;else{const h=a.x-s.x,c=a.y-s.y,d=l.x-a.x,p=l.y-a.y,u=Math.hypot(h,c),m=Math.hypot(d,p);if(u<n||m<n){e+=`L${a.x},${a.y}`;continue}const f=h/u,y=c/u,C=d/m,b=p/m,k=f*C+y*b,T=Math.max(-1,Math.min(1,k)),v=Math.acos(T);if(v<n||Math.abs(Math.PI-v)<n){e+=`L${a.x},${a.y}`;continue}const _=Math.min(t/Math.sin(v/2),u/2,m/2),w=a.x-f*_,S=a.y-y*_,M=a.x+C*_,A=a.y+b*_;e+=`L${w},${S}`,e+=`Q${a.x},${a.y} ${M},${A}`}}return e}g(Rp,"generateRoundedPath");function Jo(r,t){if(!r||!t)return{angle:0,deltaX:0,deltaY:0};const e=t.x-r.x,i=t.y-r.y;return{angle:Math.atan2(i,e),deltaX:e,deltaY:i}}g(Jo,"calculateDeltaAndAngle");function Op(r,t){const e=r.map(n=>({...n}));if(r.length>=2&&Bt[t.arrowTypeStart]){const n=Bt[t.arrowTypeStart],o=r[0],a=r[1],{angle:s}=Jo(o,a),l=n*Math.cos(s),h=n*Math.sin(s);e[0].x=o.x+l,e[0].y=o.y+h}const i=r.length;if(i>=2&&Bt[t.arrowTypeEnd]){const n=Bt[t.arrowTypeEnd],o=r[i-1],a=r[i-2],{angle:s}=Jo(a,o),l=n*Math.cos(s),h=n*Math.sin(s);e[i-1].x=o.x-l,e[i-1].y=o.y-h}return e}g(Op,"applyMarkerOffsetsToPoints");var nw=g((r,t,e,i)=>{t.forEach(n=>{Bw[n](r,e,i)})},"insertMarkers"),ow=g((r,t,e)=>{P.trace("Making markers for ",e),r.append("defs").append("marker").attr("id",e+"_"+t+"-extensionStart").attr("class","marker extension "+t).attr("refX",18).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("path").attr("d","M 1,7 L18,13 V 1 Z"),r.append("defs").append("marker").attr("id",e+"_"+t+"-extensionEnd").attr("class","marker extension "+t).attr("refX",1).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 1,1 V 13 L18,7 Z"),r.append("marker").attr("id",e+"_"+t+"-extensionStart-margin").attr("class","marker extension "+t).attr("refX",18).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").attr("markerUnits","userSpaceOnUse").attr("viewBox","0 0 20 14").append("polygon").attr("points","10,7 18,13 18,1").style("stroke-width",2).style("stroke-dasharray","0"),r.append("defs").append("marker").attr("id",e+"_"+t+"-extensionEnd-margin").attr("class","marker extension "+t).attr("refX",9).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").attr("markerUnits","userSpaceOnUse").attr("viewBox","0 0 20 14").append("polygon").attr("points","10,1 10,13 18,7").style("stroke-width",2).style("stroke-dasharray","0")},"extension"),sw=g((r,t,e)=>{r.append("defs").append("marker").attr("id",e+"_"+t+"-compositionStart").attr("class","marker composition "+t).attr("refX",18).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),r.append("defs").append("marker").attr("id",e+"_"+t+"-compositionEnd").attr("class","marker composition "+t).attr("refX",1).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),r.append("defs").append("marker").attr("id",e+"_"+t+"-compositionStart-margin").attr("class","marker composition "+t).attr("refX",15).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("path").style("stroke-width",0).attr("viewBox","0 0 15 15").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),r.append("defs").append("marker").attr("id",e+"_"+t+"-compositionEnd-margin").attr("class","marker composition "+t).attr("refX",3.5).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("path").style("stroke-width",0).attr("d","M 18,7 L9,13 L1,7 L9,1 Z")},"composition"),aw=g((r,t,e)=>{r.append("defs").append("marker").attr("id",e+"_"+t+"-aggregationStart").attr("class","marker aggregation "+t).attr("refX",18).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),r.append("defs").append("marker").attr("id",e+"_"+t+"-aggregationEnd").attr("class","marker aggregation "+t).attr("refX",1).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),r.append("defs").append("marker").attr("id",e+"_"+t+"-aggregationStart-margin").attr("class","marker aggregation "+t).attr("refX",15).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("path").style("stroke-width",2).attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),r.append("defs").append("marker").attr("id",e+"_"+t+"-aggregationEnd-margin").attr("class","marker aggregation "+t).attr("refX",1).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("path").style("stroke-width",2).attr("d","M 18,7 L9,13 L1,7 L9,1 Z")},"aggregation"),lw=g((r,t,e)=>{r.append("defs").append("marker").attr("id",e+"_"+t+"-dependencyStart").attr("class","marker dependency "+t).attr("refX",6).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 5,7 L9,13 L1,7 L9,1 Z"),r.append("defs").append("marker").attr("id",e+"_"+t+"-dependencyEnd").attr("class","marker dependency "+t).attr("refX",13).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L14,7 L9,1 Z"),r.append("defs").append("marker").attr("id",e+"_"+t+"-dependencyStart-margin").attr("class","marker dependency "+t).attr("refX",4).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("path").style("stroke-width",0).attr("d","M 5,7 L9,13 L1,7 L9,1 Z"),r.append("defs").append("marker").attr("id",e+"_"+t+"-dependencyEnd-margin").attr("class","marker dependency "+t).attr("refX",16).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("path").style("stroke-width",0).attr("d","M 18,7 L9,13 L14,7 L9,1 Z")},"dependency"),hw=g((r,t,e)=>{r.append("defs").append("marker").attr("id",e+"_"+t+"-lollipopStart").attr("class","marker lollipop "+t).attr("refX",13).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("circle").attr("fill","transparent").attr("cx",7).attr("cy",7).attr("r",6),r.append("defs").append("marker").attr("id",e+"_"+t+"-lollipopEnd").attr("class","marker lollipop "+t).attr("refX",1).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("circle").attr("fill","transparent").attr("cx",7).attr("cy",7).attr("r",6),r.append("defs").append("marker").attr("id",e+"_"+t+"-lollipopStart-margin").attr("class","marker lollipop "+t).attr("refX",13).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("circle").attr("fill","transparent").attr("cx",7).attr("cy",7).attr("r",6).attr("stroke-width",2),r.append("defs").append("marker").attr("id",e+"_"+t+"-lollipopEnd-margin").attr("class","marker lollipop "+t).attr("refX",1).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("circle").attr("fill","transparent").attr("cx",7).attr("cy",7).attr("r",6).attr("stroke-width",2)},"lollipop"),cw=g((r,t,e)=>{r.append("marker").attr("id",e+"_"+t+"-pointEnd").attr("class","marker "+t).attr("viewBox","0 0 10 10").attr("refX",5).attr("refY",5).attr("markerUnits","userSpaceOnUse").attr("markerWidth",8).attr("markerHeight",8).attr("orient","auto").append("path").attr("d","M 0 0 L 10 5 L 0 10 z").attr("class","arrowMarkerPath").style("stroke-width",1).style("stroke-dasharray","1,0"),r.append("marker").attr("id",e+"_"+t+"-pointStart").attr("class","marker "+t).attr("viewBox","0 0 10 10").attr("refX",4.5).attr("refY",5).attr("markerUnits","userSpaceOnUse").attr("markerWidth",8).attr("markerHeight",8).attr("orient","auto").append("path").attr("d","M 0 5 L 10 10 L 10 0 z").attr("class","arrowMarkerPath").style("stroke-width",1).style("stroke-dasharray","1,0"),r.append("marker").attr("id",e+"_"+t+"-pointEnd-margin").attr("class","marker "+t).attr("viewBox","0 0 11.5 14").attr("refX",11.5).attr("refY",7).attr("markerUnits","userSpaceOnUse").attr("markerWidth",10.5).attr("markerHeight",14).attr("orient","auto").append("path").attr("d","M 0 0 L 11.5 7 L 0 14 z").attr("class","arrowMarkerPath").style("stroke-width",0).style("stroke-dasharray","1,0"),r.append("marker").attr("id",e+"_"+t+"-pointStart-margin").attr("class","marker "+t).attr("viewBox","0 0 11.5 14").attr("refX",1).attr("refY",7).attr("markerUnits","userSpaceOnUse").attr("markerWidth",11.5).attr("markerHeight",14).attr("orient","auto").append("polygon").attr("points","0,7 11.5,14 11.5,0").attr("class","arrowMarkerPath").style("stroke-width",0).style("stroke-dasharray","1,0")},"point"),dw=g((r,t,e)=>{r.append("marker").attr("id",e+"_"+t+"-circleEnd").attr("class","marker "+t).attr("viewBox","0 0 10 10").attr("refX",11).attr("refY",5).attr("markerUnits","userSpaceOnUse").attr("markerWidth",11).attr("markerHeight",11).attr("orient","auto").append("circle").attr("cx","5").attr("cy","5").attr("r","5").attr("class","arrowMarkerPath").style("stroke-width",1).style("stroke-dasharray","1,0"),r.append("marker").attr("id",e+"_"+t+"-circleStart").attr("class","marker "+t).attr("viewBox","0 0 10 10").attr("refX",-1).attr("refY",5).attr("markerUnits","userSpaceOnUse").attr("markerWidth",11).attr("markerHeight",11).attr("orient","auto").append("circle").attr("cx","5").attr("cy","5").attr("r","5").attr("class","arrowMarkerPath").style("stroke-width",1).style("stroke-dasharray","1,0"),r.append("marker").attr("id",e+"_"+t+"-circleEnd-margin").attr("class","marker "+t).attr("viewBox","0 0 10 10").attr("refY",5).attr("refX",12.25).attr("markerUnits","userSpaceOnUse").attr("markerWidth",14).attr("markerHeight",14).attr("orient","auto").append("circle").attr("cx","5").attr("cy","5").attr("r","5").attr("class","arrowMarkerPath").style("stroke-width",0).style("stroke-dasharray","1,0"),r.append("marker").attr("id",e+"_"+t+"-circleStart-margin").attr("class","marker "+t).attr("viewBox","0 0 10 10").attr("refX",-2).attr("refY",5).attr("markerUnits","userSpaceOnUse").attr("markerWidth",14).attr("markerHeight",14).attr("orient","auto").append("circle").attr("cx","5").attr("cy","5").attr("r","5").attr("class","arrowMarkerPath").style("stroke-width",0).style("stroke-dasharray","1,0")},"circle"),uw=g((r,t,e)=>{r.append("marker").attr("id",e+"_"+t+"-crossEnd").attr("class","marker cross "+t).attr("viewBox","0 0 11 11").attr("refX",12).attr("refY",5.2).attr("markerUnits","userSpaceOnUse").attr("markerWidth",11).attr("markerHeight",11).attr("orient","auto").append("path").attr("d","M 1,1 l 9,9 M 10,1 l -9,9").attr("class","arrowMarkerPath").style("stroke-width",2).style("stroke-dasharray","1,0"),r.append("marker").attr("id",e+"_"+t+"-crossStart").attr("class","marker cross "+t).attr("viewBox","0 0 11 11").attr("refX",-1).attr("refY",5.2).attr("markerUnits","userSpaceOnUse").attr("markerWidth",11).attr("markerHeight",11).attr("orient","auto").append("path").attr("d","M 1,1 l 9,9 M 10,1 l -9,9").attr("class","arrowMarkerPath").style("stroke-width",2).style("stroke-dasharray","1,0"),r.append("marker").attr("id",e+"_"+t+"-crossEnd-margin").attr("class","marker cross "+t).attr("viewBox","0 0 15 15").attr("refX",17.7).attr("refY",7.5).attr("markerUnits","userSpaceOnUse").attr("markerWidth",12).attr("markerHeight",12).attr("orient","auto").append("path").attr("d","M 1,1 L 14,14 M 1,14 L 14,1").attr("class","arrowMarkerPath").style("stroke-width",2.5),r.append("marker").attr("id",e+"_"+t+"-crossStart-margin").attr("class","marker cross "+t).attr("viewBox","0 0 15 15").attr("refX",-3.5).attr("refY",7.5).attr("markerUnits","userSpaceOnUse").attr("markerWidth",12).attr("markerHeight",12).attr("orient","auto").append("path").attr("d","M 1,1 L 14,14 M 1,14 L 14,1").attr("class","arrowMarkerPath").style("stroke-width",2.5).style("stroke-dasharray","1,0")},"cross"),pw=g((r,t,e)=>{r.append("defs").append("marker").attr("id",e+"_"+t+"-barbEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",14).attr("markerUnits","userSpaceOnUse").attr("orient","auto").append("path").attr("d","M 19,7 L9,13 L14,7 L9,1 Z")},"barb"),gw=g((r,t,e)=>{const i=ct(),{themeVariables:n}=i,{transitionColor:o}=n;r.append("defs").append("marker").attr("id",e+"_"+t+"-barbEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",14).attr("markerUnits","strokeWidth").attr("orient","auto").append("path").attr("d","M 19,7 L11,14 L13,7 L11,0 Z"),r.append("defs").append("marker").attr("id",e+"_"+t+"-barbEnd-margin").attr("refX",17).attr("refY",7).attr("markerWidth",20).attr("markerHeight",14).attr("markerUnits","userSpaceOnUse").attr("orient","auto").append("path").attr("d","M 19,7 L11,14 L13,7 L11,0 Z").attr("fill",`${o}`)},"barbNeo"),fw=g((r,t,e)=>{r.append("defs").append("marker").attr("id",e+"_"+t+"-onlyOneStart").attr("class","marker onlyOne "+t).attr("refX",0).attr("refY",9).attr("markerWidth",18).attr("markerHeight",18).attr("orient","auto").append("path").attr("d","M9,0 L9,18 M15,0 L15,18"),r.append("defs").append("marker").attr("id",e+"_"+t+"-onlyOneEnd").attr("class","marker onlyOne "+t).attr("refX",18).attr("refY",9).attr("markerWidth",18).attr("markerHeight",18).attr("orient","auto").append("path").attr("d","M3,0 L3,18 M9,0 L9,18")},"only_one"),mw=g((r,t,e)=>{const i=r.append("defs").append("marker").attr("id",e+"_"+t+"-zeroOrOneStart").attr("class","marker zeroOrOne "+t).attr("refX",0).attr("refY",9).attr("markerWidth",30).attr("markerHeight",18).attr("orient","auto");i.append("circle").attr("fill","white").attr("cx",21).attr("cy",9).attr("r",6),i.append("path").attr("d","M9,0 L9,18");const n=r.append("defs").append("marker").attr("id",e+"_"+t+"-zeroOrOneEnd").attr("class","marker zeroOrOne "+t).attr("refX",30).attr("refY",9).attr("markerWidth",30).attr("markerHeight",18).attr("orient","auto");n.append("circle").attr("fill","white").attr("cx",9).attr("cy",9).attr("r",6),n.append("path").attr("d","M21,0 L21,18")},"zero_or_one"),yw=g((r,t,e)=>{r.append("defs").append("marker").attr("id",e+"_"+t+"-oneOrMoreStart").attr("class","marker oneOrMore "+t).attr("refX",18).attr("refY",18).attr("markerWidth",45).attr("markerHeight",36).attr("orient","auto").append("path").attr("d","M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27"),r.append("defs").append("marker").attr("id",e+"_"+t+"-oneOrMoreEnd").attr("class","marker oneOrMore "+t).attr("refX",27).attr("refY",18).attr("markerWidth",45).attr("markerHeight",36).attr("orient","auto").append("path").attr("d","M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18")},"one_or_more"),Cw=g((r,t,e)=>{const i=r.append("defs").append("marker").attr("id",e+"_"+t+"-zeroOrMoreStart").attr("class","marker zeroOrMore "+t).attr("refX",18).attr("refY",18).attr("markerWidth",57).attr("markerHeight",36).attr("orient","auto");i.append("circle").attr("fill","white").attr("cx",48).attr("cy",18).attr("r",6),i.append("path").attr("d","M0,18 Q18,0 36,18 Q18,36 0,18");const n=r.append("defs").append("marker").attr("id",e+"_"+t+"-zeroOrMoreEnd").attr("class","marker zeroOrMore "+t).attr("refX",39).attr("refY",18).attr("markerWidth",57).attr("markerHeight",36).attr("orient","auto");n.append("circle").attr("fill","white").attr("cx",9).attr("cy",18).attr("r",6),n.append("path").attr("d","M21,18 Q39,0 57,18 Q39,36 21,18")},"zero_or_more"),xw=g((r,t,e)=>{const i=ct(),{themeVariables:n}=i,{strokeWidth:o}=n;r.append("defs").append("marker").attr("id",e+"_"+t+"-onlyOneStart").attr("class","marker onlyOne "+t).attr("refX",0).attr("refY",9).attr("markerWidth",18).attr("markerHeight",18).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("path").attr("d","M9,0 L9,18 M15,0 L15,18").attr("stroke-width",`${o}`),r.append("defs").append("marker").attr("id",e+"_"+t+"-onlyOneEnd").attr("class","marker onlyOne "+t).attr("refX",18).attr("refY",9).attr("markerWidth",18).attr("markerHeight",18).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("path").attr("d","M3,0 L3,18 M9,0 L9,18").attr("stroke-width",`${o}`)},"only_one_neo"),bw=g((r,t,e)=>{const i=ct(),{themeVariables:n}=i,{strokeWidth:o,mainBkg:a}=n,s=r.append("defs").append("marker").attr("id",e+"_"+t+"-zeroOrOneStart").attr("class","marker zeroOrOne "+t).attr("refX",0).attr("refY",9).attr("markerWidth",30).attr("markerHeight",18).attr("orient","auto").attr("markerUnits","userSpaceOnUse");s.append("circle").attr("fill",a??"white").attr("cx",21).attr("cy",9).attr("stroke-width",`${o}`).attr("r",6),s.append("path").attr("d","M9,0 L9,18").attr("stroke-width",`${o}`);const l=r.append("defs").append("marker").attr("id",e+"_"+t+"-zeroOrOneEnd").attr("class","marker zeroOrOne "+t).attr("refX",30).attr("refY",9).attr("markerWidth",30).attr("markerHeight",18).attr("markerUnits","userSpaceOnUse").attr("orient","auto");l.append("circle").attr("fill",a??"white").attr("cx",9).attr("cy",9).attr("stroke-width",`${o}`).attr("r",6),l.append("path").attr("d","M21,0 L21,18").attr("stroke-width",`${o}`)},"zero_or_one_neo"),kw=g((r,t,e)=>{const i=ct(),{themeVariables:n}=i,{strokeWidth:o}=n;r.append("defs").append("marker").attr("id",e+"_"+t+"-oneOrMoreStart").attr("class","marker oneOrMore "+t).attr("refX",18).attr("refY",18).attr("markerWidth",45).attr("markerHeight",36).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("path").attr("d","M0,18 Q 18,0 36,18 Q 18,36 0,18 M42,9 L42,27").attr("stroke-width",`${o}`),r.append("defs").append("marker").attr("id",e+"_"+t+"-oneOrMoreEnd").attr("class","marker oneOrMore "+t).attr("refX",27).attr("refY",18).attr("markerWidth",45).attr("markerHeight",36).attr("markerUnits","userSpaceOnUse").attr("orient","auto").append("path").attr("d","M3,9 L3,27 M9,18 Q27,0 45,18 Q27,36 9,18").attr("stroke-width",`${o}`)},"one_or_more_neo"),ww=g((r,t,e)=>{const i=ct(),{themeVariables:n}=i,{strokeWidth:o,mainBkg:a}=n,s=r.append("defs").append("marker").attr("id",e+"_"+t+"-zeroOrMoreStart").attr("class","marker zeroOrMore "+t).attr("refX",18).attr("refY",18).attr("markerWidth",57).attr("markerHeight",36).attr("markerUnits","userSpaceOnUse").attr("orient","auto");s.append("circle").attr("fill",a??"white").attr("cx",45.5).attr("cy",18).attr("r",6).attr("stroke-width",`${o}`),s.append("path").attr("d","M0,18 Q18,0 36,18 Q18,36 0,18").attr("stroke-width",`${o}`);const l=r.append("defs").append("marker").attr("id",e+"_"+t+"-zeroOrMoreEnd").attr("class","marker zeroOrMore "+t).attr("refX",39).attr("refY",18).attr("markerWidth",57).attr("markerHeight",36).attr("orient","auto").attr("markerUnits","userSpaceOnUse");l.append("circle").attr("fill",a??"white").attr("cx",11).attr("cy",18).attr("r",6).attr("stroke-width",`${o}`),l.append("path").attr("d","M21,18 Q39,0 57,18 Q39,36 21,18").attr("stroke-width",`${o}`)},"zero_or_more_neo"),Tw=g((r,t,e)=>{r.append("defs").append("marker").attr("id",e+"_"+t+"-requirement_arrowEnd").attr("refX",20).attr("refY",10).attr("markerWidth",20).attr("markerHeight",20).attr("orient","auto").append("path").attr("d",`M0,0
      L20,10
      M20,10
      L0,20`)},"requirement_arrow"),vw=g((r,t,e)=>{const i=ct(),{themeVariables:n}=i,{strokeWidth:o}=n;r.append("defs").append("marker").attr("id",e+"_"+t+"-requirement_arrowEnd").attr("refX",20).attr("refY",10).attr("markerWidth",20).attr("markerHeight",20).attr("orient","auto").attr("markerUnits","userSpaceOnUse").attr("stroke-width",`${o}`).attr("viewBox","0 0 25 20").append("path").attr("d",`M0,0
      L20,10
      M20,10
      L0,20`).attr("stroke-linejoin","miter")},"requirement_arrow_neo"),Sw=g((r,t,e)=>{const i=r.append("defs").append("marker").attr("id",e+"_"+t+"-requirement_containsStart").attr("refX",0).attr("refY",10).attr("markerWidth",20).attr("markerHeight",20).attr("orient","auto").append("g");i.append("circle").attr("cx",10).attr("cy",10).attr("r",9).attr("fill","none"),i.append("line").attr("x1",1).attr("x2",19).attr("y1",10).attr("y2",10),i.append("line").attr("y1",1).attr("y2",19).attr("x1",10).attr("x2",10)},"requirement_contains"),_w=g((r,t,e)=>{const i=ct(),{themeVariables:n}=i,{strokeWidth:o}=n,a=r.append("defs").append("marker").attr("id",e+"_"+t+"-requirement_containsStart").attr("refX",0).attr("refY",10).attr("markerWidth",20).attr("markerHeight",20).attr("orient","auto").attr("markerUnits","userSpaceOnUse").append("g");a.append("circle").attr("cx",10).attr("cy",10).attr("r",9).attr("fill","none"),a.append("line").attr("x1",1).attr("x2",19).attr("y1",10).attr("y2",10),a.append("line").attr("y1",1).attr("y2",19).attr("x1",10).attr("x2",10),a.selectAll("*").attr("stroke-width",`${o}`)},"requirement_contains_neo"),Bw={extension:ow,composition:sw,aggregation:aw,dependency:lw,lollipop:hw,point:cw,circle:dw,cross:uw,barb:pw,barbNeo:gw,only_one:fw,zero_or_one:mw,one_or_more:yw,zero_or_more:Cw,only_one_neo:xw,zero_or_one_neo:bw,one_or_more_neo:kw,zero_or_more_neo:ww,requirement_arrow:Tw,requirement_contains:Sw,requirement_arrow_neo:vw,requirement_contains_neo:_w},Lw=nw,Fw={common:mi,getConfig:ct,insertCluster:_2,insertEdge:iw,insertEdgeLabel:Z2,insertMarkers:Lw,insertNode:Dp,interpolateToCurve:Ps,labelHelper:K,log:P,positionEdgeLabel:Q2},Je={},$p=g(r=>{for(const t of r)Je[t.name]=t},"registerLayoutLoaders"),Mw=g(()=>{$p([{name:"dagre",loader:g(async()=>await it(()=>import("./dagre-KV5264BT-7CIAflHy.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18])),"loader")},{name:"cose-bilkent",loader:g(async()=>await it(()=>import("./cose-bilkent-S5V4N54A-t58AYpHU.js"),__vite__mapDeps([19,20,2,3,7,8,9,10,11,12,13,14,15,16,17,18])),"loader")}])},"registerDefaultLayoutLoaders");Mw();var j_=g(async(r,t)=>{if(!(r.layoutAlgorithm in Je))throw new Error(`Unknown layout algorithm: ${r.layoutAlgorithm}`);if(r.diagramId)for(const c of r.nodes){const d=c.domId||c.id;c.domId=`${r.diagramId}-${d}`}const e=Je[r.layoutAlgorithm],i=await e.loader(),{theme:n,themeVariables:o}=r.config,{useGradient:a,gradientStart:s,gradientStop:l}=o,h=t.attr("id");if(t.append("defs").append("filter").attr("id",`${h}-drop-shadow`).attr("height","130%").attr("width","130%").append("feDropShadow").attr("dx","4").attr("dy","4").attr("stdDeviation",0).attr("flood-opacity","0.06").attr("flood-color",`${n!=null&&n.includes("dark")?"#FFFFFF":"#000000"}`),t.append("defs").append("filter").attr("id",`${h}-drop-shadow-small`).attr("height","150%").attr("width","150%").append("feDropShadow").attr("dx","2").attr("dy","2").attr("stdDeviation",0).attr("flood-opacity","0.06").attr("flood-color",`${n!=null&&n.includes("dark")?"#FFFFFF":"#000000"}`),a){const c=t.append("linearGradient").attr("id",t.attr("id")+"-gradient").attr("gradientUnits","objectBoundingBox").attr("x1","0%").attr("y1","0%").attr("x2","100%").attr("y2","0%");c.append("svg:stop").attr("offset","0%").attr("stop-color",s).attr("stop-opacity",1),c.append("svg:stop").attr("offset","100%").attr("stop-color",l).attr("stop-opacity",1)}return i.render(r,t,Fw,{algorithm:e.algorithm})},"render"),H_=g((r="",{fallback:t="dagre"}={})=>{if(r in Je)return r;if(t in Je)return P.warn(`Layout algorithm ${r} is not registered. Using ${t} as fallback.`),t;throw new Error(`Both layout algorithms ${r} and ${t} are not registered.`)},"getRegisteredLayoutAlgorithm"),Wp="comm",zp="rule",Np="decl",Aw="@import",Ew="@namespace",Pw="@keyframes",Dw="@layer",Iw=Math.abs,qe=String.fromCharCode;function qp(r){return r.trim()}function ts(r,t,e){return r.replace(t,e)}function le(r,t){return r.charCodeAt(t)|0}function fe(r,t,e){return r.slice(t,e)}function nr(r){return r.length}function Rw(r){return r.length}function Oi(r,t){return t.push(r),r}var Hn=1,me=1,jp=0,Gt=0,pt=0,be="";function ta(r,t,e,i,n,o,a,s){return{value:r,root:t,parent:e,type:i,props:n,children:o,line:Hn,column:me,length:a,return:"",siblings:s}}function Ow(){return pt}function $w(){return pt=Gt>0?le(be,--Gt):0,me--,pt===10&&(me=1,Hn--),pt}function Qt(){return pt=Gt<jp?le(be,Gt++):0,me++,pt===10&&(me=1,Hn++),pt}function _r(){return le(be,Gt)}function Yi(){return Gt}function Un(r,t){return fe(be,r,t)}function ti(r){switch(r){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ww(r){return Hn=me=1,jp=nr(be=r),Gt=0,[]}function zw(r){return be="",r}function lo(r){return qp(Un(Gt-1,rs(r===91?r+2:r===40?r+1:r)))}function Nw(r){for(;(pt=_r())&&pt<33;)Qt();return ti(r)>2||ti(pt)>3?"":" "}function qw(r,t){for(;--t&&Qt()&&!(pt<48||pt>102||pt>57&&pt<65||pt>70&&pt<97););return Un(r,Yi()+(t<6&&_r()==32&&Qt()==32))}function rs(r){for(;Qt();)switch(pt){case r:return Gt;case 34:case 39:r!==34&&r!==39&&rs(pt);break;case 40:r===41&&rs(r);break;case 92:Qt();break}return Gt}function jw(r,t){for(;Qt()&&r+pt!==57;)if(r+pt===84&&_r()===47)break;return"/*"+Un(t,Gt-1)+"*"+qe(r===47?r:Qt())}function Hw(r){for(;!ti(_r());)Qt();return Un(r,Gt)}function Uw(r){return zw(Xi("",null,null,null,[""],r=Ww(r),0,[0],r))}function Xi(r,t,e,i,n,o,a,s,l){for(var h=0,c=0,d=a,p=0,u=0,m=0,f=1,y=1,C=1,b=0,k=0,T="",v=n,_=o,w=i,S=T;y;)switch(m=k,k=Qt()){case 40:m!=108&&le(S,d-1)==58?(b++,S+="("):S+=lo(k);break;case 41:b--,S+=")";break;case 34:case 39:case 91:S+=lo(k);break;case 9:case 10:case 13:case 32:if(b>0){S+=qe(k);break}S+=Nw(m);break;case 92:S+=qw(Yi()-1,7);continue;case 47:switch(_r()){case 42:case 47:Oi(Gw(jw(Qt(),Yi()),t,e,l),l),(ti(m||1)==5||ti(_r()||1)==5)&&nr(S)&&fe(S,-1,void 0)!==" "&&(S+=" ");break;default:S+="/"}break;case 123*f:s[h++]=nr(S)*C;case 125*f:case 59:case 0:if(b>0&&k){S+=qe(k);break}switch(k){case 0:case 125:y=0;case 59+c:C==-1&&(S=ts(S,/\f/g,"")),u>0&&(nr(S)-d||f===0)&&Oi(u>32?bl(S+";",i,e,d-1,l):bl(ts(S," ","")+";",i,e,d-2,l),l);break;case 59:S+=";";default:if(Oi(w=xl(S,t,e,h,c,n,s,T,v=[],_=[],d,o),o),k===123)if(c===0)Xi(S,t,w,w,v,o,d,s,_);else{switch(p){case 99:if(le(S,3)===110)break;case 108:if(le(S,2)===97)break;default:c=0;case 100:case 109:case 115:}c?Xi(r,w,w,i&&Oi(xl(r,w,w,0,0,n,s,T,n,v=[],d,_),_),n,_,d,s,i?v:_):Xi(S,w,w,w,[""],_,0,s,_)}}h=c=u=0,f=C=1,T=S="",d=a;break;case 58:d=1+nr(S),u=m;default:if(f<1){if(k==123)--f;else if(k==125&&f++==0&&$w()==125)continue}switch(S+=qe(k),k*f){case 38:C=c>0?1:(S+="\f",-1);break;case 44:if(b>0)break;s[h++]=(nr(S)-1)*C,C=1;break;case 64:_r()===45&&(S+=lo(Qt())),p=_r(),c=d=nr(T=S+=Hw(Yi())),k++;break;case 45:m===45&&nr(S)==2&&(f=0)}}return o}function xl(r,t,e,i,n,o,a,s,l,h,c,d){for(var p=n-1,u=n===0?o:[""],m=Rw(u),f=0,y=0,C=0;f<i;++f)for(var b=0,k=fe(r,p+1,p=Iw(y=a[f])),T=r;b<m;++b)(T=qp(y>0?u[b]+" "+k:ts(k,/&\f/g,u[b])))&&(l[C++]=T);return ta(r,t,e,n===0?zp:s,l,h,c,d)}function Gw(r,t,e,i){return ta(r,t,e,Wp,qe(Ow()),fe(r,2,-2),0,i)}function bl(r,t,e,i,n){return ta(r,t,e,Np,fe(r,0,i),fe(r,i+1,-1),i,n)}function es(r,t){for(var e="",i=0;i<r.length;i++)e+=t(r[i],i,r,t)||"";return e}function Vw(r,t,e,i){switch(r.type){case Dw:if(r.children.length)break;case Aw:case Ew:case Np:return r.return=r.return||r.value;case Wp:return"";case Pw:return r.return=r.value+"{"+es(r.children,i)+"}";case zp:if(!nr(r.value=r.props.join(",")))return""}return nr(e=es(r.children,i))?r.return=r.value+"{"+e+"}":""}var Hp="c4",Yw=g(r=>/^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(r),"detector"),Xw=g(async()=>{const{diagram:r}=await it(()=>import("./c4Diagram-AHTNJAMY-O43GpkOl.js"),__vite__mapDeps([21,22,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:Hp,diagram:r}},"loader"),Kw={id:Hp,detector:Yw,loader:Xw},Zw=Kw,Up="flowchart",Qw=g((r,t)=>{var e,i;return((e=t==null?void 0:t.flowchart)==null?void 0:e.defaultRenderer)==="dagre-wrapper"||((i=t==null?void 0:t.flowchart)==null?void 0:i.defaultRenderer)==="elk"?!1:/^\s*graph/.test(r)},"detector"),Jw=g(async()=>{const{diagram:r}=await it(()=>import("./flowDiagram-DWJPFMVM-sXLUaEGP.js"),__vite__mapDeps([23,24,22,25,26,9,27,2,3,7,8,10,11,12,13,14,15,16,17,18]));return{id:Up,diagram:r}},"loader"),tT={id:Up,detector:Qw,loader:Jw},rT=tT,Gp="flowchart-v2",eT=g((r,t)=>{var e,i,n;return((e=t==null?void 0:t.flowchart)==null?void 0:e.defaultRenderer)==="dagre-d3"?!1:(((i=t==null?void 0:t.flowchart)==null?void 0:i.defaultRenderer)==="elk"&&(t.layout="elk"),/^\s*graph/.test(r)&&((n=t==null?void 0:t.flowchart)==null?void 0:n.defaultRenderer)==="dagre-wrapper"?!0:/^\s*flowchart/.test(r))},"detector"),iT=g(async()=>{const{diagram:r}=await it(()=>import("./flowDiagram-DWJPFMVM-sXLUaEGP.js"),__vite__mapDeps([23,24,22,25,26,9,27,2,3,7,8,10,11,12,13,14,15,16,17,18]));return{id:Gp,diagram:r}},"loader"),nT={id:Gp,detector:eT,loader:iT},oT=nT,Vp="er",sT=g(r=>/^\s*erDiagram/.test(r),"detector"),aT=g(async()=>{const{diagram:r}=await it(()=>import("./erDiagram-SMLLAGMA-iXHEOAg-.js"),__vite__mapDeps([28,25,26,27,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:Vp,diagram:r}},"loader"),lT={id:Vp,detector:sT,loader:aT},hT=lT,Yp="gitGraph",cT=g(r=>/^\s*gitGraph/.test(r),"detector"),dT=g(async()=>{const{diagram:r}=await it(()=>import("./gitGraphDiagram-UUTBAWPF-2a46b2mW.js"),__vite__mapDeps([29,30,31,32,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:Yp,diagram:r}},"loader"),uT={id:Yp,detector:cT,loader:dT},pT=uT,Xp="gantt",gT=g(r=>/^\s*gantt/.test(r),"detector"),fT=g(async()=>{const{diagram:r}=await it(()=>import("./ganttDiagram-T4ZO3ILL-q3c3_LoW.js"),__vite__mapDeps([33,2,3,34,35,36,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:Xp,diagram:r}},"loader"),mT={id:Xp,detector:gT,loader:fT},yT=mT,Kp="info",CT=g(r=>/^\s*info/.test(r),"detector"),xT=g(async()=>{const{diagram:r}=await it(()=>import("./infoDiagram-42DDH7IO-g29SnXUe.js"),__vite__mapDeps([37,32,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:Kp,diagram:r}},"loader"),bT={id:Kp,detector:CT,loader:xT},Zp="pie",kT=g(r=>/^\s*pie/.test(r),"detector"),wT=g(async()=>{const{diagram:r}=await it(()=>import("./pieDiagram-DEJITSTG-88OgH_jj.js"),__vite__mapDeps([38,30,32,2,3,4,6,39,40,35,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:Zp,diagram:r}},"loader"),TT={id:Zp,detector:kT,loader:wT},Qp="quadrantChart",vT=g(r=>/^\s*quadrantChart/.test(r),"detector"),ST=g(async()=>{const{diagram:r}=await it(()=>import("./quadrantDiagram-34T5L4WZ-f6ae-cyZ.js"),__vite__mapDeps([41,34,35,36,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:Qp,diagram:r}},"loader"),_T={id:Qp,detector:vT,loader:ST},BT=_T,Jp="xychart",LT=g(r=>/^\s*xychart(-beta)?/.test(r),"detector"),FT=g(async()=>{const{diagram:r}=await it(()=>import("./xychartDiagram-5P7HB3ND-w9gkiWIx.js"),__vite__mapDeps([42,35,40,34,36,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:Jp,diagram:r}},"loader"),MT={id:Jp,detector:LT,loader:FT},AT=MT,tg="requirement",ET=g(r=>/^\s*requirement(Diagram)?/.test(r),"detector"),PT=g(async()=>{const{diagram:r}=await it(()=>import("./requirementDiagram-MS252O5E-OXXzAKrY.js"),__vite__mapDeps([43,25,26,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:tg,diagram:r}},"loader"),DT={id:tg,detector:ET,loader:PT},IT=DT,rg="sequence",RT=g(r=>/^\s*sequenceDiagram/.test(r),"detector"),OT=g(async()=>{const{diagram:r}=await it(()=>import("./sequenceDiagram-FGHM5R23-As3J30pd.js"),__vite__mapDeps([44,22,31,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:rg,diagram:r}},"loader"),$T={id:rg,detector:RT,loader:OT},WT=$T,eg="class",zT=g((r,t)=>{var e;return((e=t==null?void 0:t.class)==null?void 0:e.defaultRenderer)==="dagre-wrapper"?!1:/^\s*classDiagram/.test(r)},"detector"),NT=g(async()=>{const{diagram:r}=await it(()=>import("./classDiagram-6PBFFD2Q-SyNsKCl_.js"),__vite__mapDeps([45,46,24,22,25,26,9,2,3,7,8,10,11,12,13,14,15,16,17,18]));return{id:eg,diagram:r}},"loader"),qT={id:eg,detector:zT,loader:NT},jT=qT,ig="classDiagram",HT=g((r,t)=>{var e;return/^\s*classDiagram/.test(r)&&((e=t==null?void 0:t.class)==null?void 0:e.defaultRenderer)==="dagre-wrapper"?!0:/^\s*classDiagram-v2/.test(r)},"detector"),UT=g(async()=>{const{diagram:r}=await it(()=>import("./classDiagram-v2-HSJHXN6E-SyNsKCl_.js"),__vite__mapDeps([47,46,24,22,25,26,9,2,3,7,8,10,11,12,13,14,15,16,17,18]));return{id:ig,diagram:r}},"loader"),GT={id:ig,detector:HT,loader:UT},VT=GT,ng="state",YT=g((r,t)=>{var e;return((e=t==null?void 0:t.state)==null?void 0:e.defaultRenderer)==="dagre-wrapper"?!1:/^\s*stateDiagram/.test(r)},"detector"),XT=g(async()=>{const{diagram:r}=await it(()=>import("./stateDiagram-FHFEXIEX-rjgGvUrD.js"),__vite__mapDeps([48,49,25,26,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:ng,diagram:r}},"loader"),KT={id:ng,detector:YT,loader:XT},ZT=KT,og="stateDiagram",QT=g((r,t)=>{var e;return!!(/^\s*stateDiagram-v2/.test(r)||/^\s*stateDiagram/.test(r)&&((e=t==null?void 0:t.state)==null?void 0:e.defaultRenderer)==="dagre-wrapper")},"detector"),JT=g(async()=>{const{diagram:r}=await it(()=>import("./stateDiagram-v2-QKLJ7IA2-F3eYzhRQ.js"),__vite__mapDeps([50,49,25,26,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:og,diagram:r}},"loader"),tv={id:og,detector:QT,loader:JT},rv=tv,sg="journey",ev=g(r=>/^\s*journey/.test(r),"detector"),iv=g(async()=>{const{diagram:r}=await it(()=>import("./journeyDiagram-VCZTEJTY-DOYGE2XQ.js"),__vite__mapDeps([51,24,22,39,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:sg,diagram:r}},"loader"),nv={id:sg,detector:ev,loader:iv},ov=nv,sv=g((r,t,e)=>{P.debug(`rendering svg for syntax error
`);const i=fb(t),n=i.append("g");i.attr("viewBox","0 0 2412 512"),Hl(i,100,512,!0),n.append("path").attr("class","error-icon").attr("d","m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"),n.append("path").attr("class","error-icon").attr("d","m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"),n.append("path").attr("class","error-icon").attr("d","m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"),n.append("path").attr("class","error-icon").attr("d","m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"),n.append("path").attr("class","error-icon").attr("d","m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"),n.append("path").attr("class","error-icon").attr("d","m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"),n.append("text").attr("class","error-text").attr("x",1440).attr("y",250).attr("font-size","150px").style("text-anchor","middle").text("Syntax error in text"),n.append("text").attr("class","error-text").attr("x",1250).attr("y",400).attr("font-size","100px").style("text-anchor","middle").text(`mermaid version ${e}`)},"draw"),ag={draw:sv},av=ag,lv={db:{},renderer:ag,parser:{parse:g(()=>{},"parse")}},hv=lv,lg="flowchart-elk",cv=g((r,t={})=>{var e;return/^\s*flowchart-elk/.test(r)||/^\s*(flowchart|graph)/.test(r)&&((e=t==null?void 0:t.flowchart)==null?void 0:e.defaultRenderer)==="elk"?(t.layout="elk",!0):!1},"detector"),dv=g(async()=>{const{diagram:r}=await it(()=>import("./flowDiagram-DWJPFMVM-sXLUaEGP.js"),__vite__mapDeps([23,24,22,25,26,9,27,2,3,7,8,10,11,12,13,14,15,16,17,18]));return{id:lg,diagram:r}},"loader"),uv={id:lg,detector:cv,loader:dv},pv=uv,hg="timeline",gv=g(r=>/^\s*timeline/.test(r),"detector"),fv=g(async()=>{const{diagram:r}=await it(()=>import("./timeline-definition-GMOUNBTQ-YHeSvx8K.js"),__vite__mapDeps([52,39,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:hg,diagram:r}},"loader"),mv={id:hg,detector:gv,loader:fv},yv=mv,cg="mindmap",Cv=g(r=>/^\s*mindmap/.test(r),"detector"),xv=g(async()=>{const{diagram:r}=await it(()=>import("./mindmap-definition-QFDTVHPH-8FeRfsxL.js"),__vite__mapDeps([53,25,26,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:cg,diagram:r}},"loader"),bv={id:cg,detector:Cv,loader:xv},kv=bv,dg="kanban",wv=g(r=>/^\s*kanban/.test(r),"detector"),Tv=g(async()=>{const{diagram:r}=await it(()=>import("./kanban-definition-6JOO6SKY-5LdHOvOS.js"),__vite__mapDeps([54,24,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:dg,diagram:r}},"loader"),vv={id:dg,detector:wv,loader:Tv},Sv=vv,ug="sankey",_v=g(r=>/^\s*sankey(-beta)?/.test(r),"detector"),Bv=g(async()=>{const{diagram:r}=await it(()=>import("./sankeyDiagram-XADWPNL6-ZI5I2P5n.js"),__vite__mapDeps([55,40,35,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:ug,diagram:r}},"loader"),Lv={id:ug,detector:_v,loader:Bv},Fv=Lv,pg="packet",Mv=g(r=>/^\s*packet(-beta)?/.test(r),"detector"),Av=g(async()=>{const{diagram:r}=await it(()=>import("./diagram-TYMM5635-DP30Z2j3.js"),__vite__mapDeps([56,30,32,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:pg,diagram:r}},"loader"),Ev={id:pg,detector:Mv,loader:Av},gg="radar",Pv=g(r=>/^\s*radar-beta/.test(r),"detector"),Dv=g(async()=>{const{diagram:r}=await it(()=>import("./diagram-MMDJMWI5-IQNRyj_6.js"),__vite__mapDeps([57,30,32,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:gg,diagram:r}},"loader"),Iv={id:gg,detector:Pv,loader:Dv},fg="block",Rv=g(r=>/^\s*block(-beta)?/.test(r),"detector"),Ov=g(async()=>{const{diagram:r}=await it(()=>import("./blockDiagram-DXYQGD6D-bLSsaWWs.js"),__vite__mapDeps([58,24,2,3,1,4,27,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:fg,diagram:r}},"loader"),$v={id:fg,detector:Rv,loader:Ov},Wv=$v,mg="treeView",zv=g(r=>/^\s*treeView-beta/.test(r),"detector"),Nv=g(async()=>{const{diagram:r}=await it(()=>import("./diagram-5BDNPKRD-t2StRVNr.js"),__vite__mapDeps([59,30,31,32,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:mg,diagram:r}},"loader"),qv={id:mg,detector:zv,loader:Nv},jv=qv,yg="architecture",Hv=g(r=>/^\s*architecture/.test(r),"detector"),Uv=g(async()=>{const{diagram:r}=await it(()=>import("./architectureDiagram-Q4EWVU46-zaNjTUYV.js"),__vite__mapDeps([60,30,32,2,3,4,6,20,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:yg,diagram:r}},"loader"),Gv={id:yg,detector:Hv,loader:Uv},Vv=Gv,Cg="ishikawa",Yv=g(r=>/^\s*ishikawa(-beta)?\b/i.test(r),"detector"),Xv=g(async()=>{const{diagram:r}=await it(()=>import("./ishikawaDiagram-UXIWVN3A-sxol_Kk9.js"),__vite__mapDeps([61,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:Cg,diagram:r}},"loader"),Kv={id:Cg,detector:Yv,loader:Xv},xg="venn",Zv=g(r=>/^\s*venn-beta/.test(r),"detector"),Qv=g(async()=>{const{diagram:r}=await it(()=>import("./vennDiagram-DHZGUBPP-VOCaZey6.js"),__vite__mapDeps([62,2,3,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:xg,diagram:r}},"loader"),Jv={id:xg,detector:Zv,loader:Qv},tS=Jv,bg="treemap",rS=g(r=>/^\s*treemap/.test(r),"detector"),eS=g(async()=>{const{diagram:r}=await it(()=>import("./diagram-G4DWMVQ6-hGw0wqKC.js"),__vite__mapDeps([63,26,30,32,2,3,4,6,36,40,35,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:bg,diagram:r}},"loader"),iS={id:bg,detector:rS,loader:eS},kg="wardley-beta",nS=g(r=>/^\s*wardley-beta/i.test(r),"detector"),oS=g(async()=>{const{diagram:r}=await it(()=>import("./wardleyDiagram-NUSXRM2D-i_BMMBPT.js"),__vite__mapDeps([64,30,32,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18]));return{id:kg,diagram:r}},"loader"),sS={id:kg,detector:nS,loader:oS},aS=sS,kl=!1,Gn=g(()=>{kl||(kl=!0,tn("error",hv,r=>r.toLowerCase().trim()==="error"),tn("---",{db:{clear:g(()=>{},"clear")},styles:{},renderer:{draw:g(()=>{},"draw")},parser:{parse:g(()=>{throw new Error("Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks")},"parse")},init:g(()=>null,"init")},r=>r.toLowerCase().trimStart().startsWith("---")),co(pv,kv,Vv),co(Zw,Sv,VT,jT,hT,yT,bT,TT,IT,WT,oT,rT,yv,pT,rv,ZT,ov,BT,Fv,Ev,AT,Wv,jv,Iv,Kv,iS,tS,aS))},"addDiagrams"),lS=g(async()=>{P.debug("Loading registered diagrams");const t=(await Promise.allSettled(Object.entries(Ur).map(async([e,{detector:i,loader:n}])=>{if(n)try{fo(e)}catch{try{const{diagram:o,id:a}=await n();tn(a,o,i)}catch(o){throw P.error(`Failed to load external diagram with key ${e}. Removing from detectors.`),delete Ur[e],o}}}))).filter(e=>e.status==="rejected");if(t.length>0){P.error(`Failed to load ${t.length} external diagrams`);for(const e of t)P.error(e);throw new Error(`Failed to load ${t.length} external diagrams`)}},"loadRegisteredDiagrams"),hS="graphics-document document";function wg(r,t){r.attr("role",hS),t!==""&&r.attr("aria-roledescription",t)}g(wg,"setA11yDiagramInfo");function Tg(r,t,e,i){if(r.insert!==void 0){if(e){const n=`chart-desc-${i}`;r.attr("aria-describedby",n),r.insert("desc",":first-child").attr("id",n).text(e)}if(t){const n=`chart-title-${i}`;r.attr("aria-labelledby",n),r.insert("title",":first-child").attr("id",n).text(t)}}}g(Tg,"addSVGa11yTitleDescription");var ye,is=(ye=class{constructor(t,e,i,n,o){this.type=t,this.text=e,this.db=i,this.parser=n,this.renderer=o}static async fromText(t,e={}){var h,c;const i=ct(),n=as(t,i);t=G1(t)+`
`;try{fo(n)}catch{const d=Dm(n);if(!d)throw new Ml(`Diagram ${n} not found.`);const{id:p,diagram:u}=await d();tn(p,u)}const{db:o,parser:a,renderer:s,init:l}=fo(n);return a.parser&&(a.parser.yy=o),(h=o.clear)==null||h.call(o),l==null||l(i),e.title&&((c=o.setDiagramTitle)==null||c.call(o,e.title)),await a.parse(t),new ye(n,t,o,a,s)}async render(t,e){await this.renderer.draw(this.text,t,e,this)}getParser(){return this.parser}getType(){return this.type}},g(ye,"Diagram"),ye),wl=[],cS=g(()=>{wl.forEach(r=>{r()}),wl=[]},"attachFunctions"),dS=g(r=>r.replace(/^\s*%%(?!{)[^\n]+\n?/gm,"").trimStart(),"cleanupComments");function vg(r){const t=r.match(Fl);if(!t)return{text:r,metadata:{}};let e=w1(t[1],{schema:k1})??{};e=typeof e=="object"&&!Array.isArray(e)?e:{};const i={};return e.displayMode&&(i.displayMode=e.displayMode.toString()),e.title&&(i.title=e.title.toString()),e.config&&(i.config=e.config),{text:r.slice(t[0].length),metadata:i}}g(vg,"extractFrontMatter");var uS=g(r=>r.replace(/\r\n?/g,`
`).replace(/<(\w+)([^>]*)>/g,(t,e,i)=>"<"+e+i.replace(/="([^"]*)"/g,"='$1'")+">"),"cleanupText"),pS=g(r=>{const{text:t,metadata:e}=vg(r),{displayMode:i,title:n,config:o={}}=e;return i&&(o.gantt||(o.gantt={}),o.gantt.displayMode=i),{title:n,config:o,text:t}},"processFrontmatter"),gS=g(r=>{const t=Kt.detectInit(r)??{},e=Kt.detectDirective(r,"wrap");return Array.isArray(e)?t.wrap=e.some(({type:i})=>i==="wrap"):(e==null?void 0:e.type)==="wrap"&&(t.wrap=!0),{text:P1(r),directive:t}},"processDirectives");function ra(r){const t=uS(r),e=pS(t),i=gS(e.text),n=$s(e.config,i.directive);return r=dS(i.text),{code:r,title:e.title,config:n}}g(ra,"preprocessDiagram");function Sg(r){const t=new TextEncoder().encode(r),e=Array.from(t,i=>String.fromCodePoint(i)).join("");return btoa(e)}g(Sg,"toBase64");var fS=5e4,mS="graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa",yS="sandbox",CS="loose",xS="http://www.w3.org/2000/svg",bS="http://www.w3.org/1999/xlink",kS="http://www.w3.org/1999/xhtml",wS="100%",TS="100%",vS="border:0;margin:0;",SS="margin:0",_S="allow-top-navigation-by-user-activation allow-popups",BS='The "iframe" tag is not supported by your browser.',LS=["foreignobject"],FS=["dominant-baseline"];function ea(r){const t=ra(r);return Qi(),ly(t.config??{}),t}g(ea,"processAndSetConfigs");async function _g(r,t){Gn();try{const{code:e,config:i}=ea(r);return{diagramType:(await Lg(e)).type,config:i}}catch(e){if(t!=null&&t.suppressErrors)return!1;throw e}}g(_g,"parse");var Tl=g((r,t,e=[])=>`
.${r} ${t} { ${e.join(" !important; ")} !important; }`,"cssImportantStyles"),MS=g((r,t=new Map)=>{let e="";if(r.themeCSS!==void 0&&(e+=`
${r.themeCSS}`),r.fontFamily!==void 0&&(e+=`
:root { --mermaid-font-family: ${r.fontFamily}}`),r.altFontFamily!==void 0&&(e+=`
:root { --mermaid-alt-font-family: ${r.altFontFamily}}`),t instanceof Map){const a=Pt(r)?["> *","span"]:["rect","polygon","ellipse","circle","path"];t.forEach(s=>{sa(s.styles)||a.forEach(l=>{e+=Tl(s.id,l,s.styles)}),sa(s.textStyles)||(e+=Tl(s.id,"tspan",((s==null?void 0:s.textStyles)||[]).map(l=>l.replace("color","fill"))))})}return e},"createCssStyles"),AS=g((r,t,e,i)=>{const n=MS(r,e),o=By(t,n,{...r.themeVariables,theme:r.theme,look:r.look},i);return es(Uw(`${i}{${o}}`),Vw)},"createUserStyles"),ES=g((r="",t,e)=>{let i=r;return!e&&!t&&(i=i.replace(/marker-end="url\([\d+./:=?A-Za-z-]*?#/g,'marker-end="url(#')),i=Xr(i),i=i.replace(/<br>/g,"<br/>"),i},"cleanUpSvgCode"),PS=g((r="",t)=>{var n,o;const e=(o=(n=t==null?void 0:t.viewBox)==null?void 0:n.baseVal)!=null&&o.height?t.viewBox.baseVal.height+"px":TS,i=Sg(`<body style="${SS}">${r}</body>`);return`<iframe style="width:${wS};height:${e};${vS}" src="data:text/html;charset=UTF-8;base64,${i}" sandbox="${_S}">
  ${BS}
</iframe>`},"putIntoIFrame"),vl=g((r,t,e,i,n)=>{const o=r.append("div");o.attr("id",e),i&&o.attr("style",i);const a=o.append("svg").attr("id",t).attr("width","100%").attr("xmlns",xS);return n&&a.attr("xmlns:xlink",n),a.append("g"),r},"appendDivSvgG");function ns(r,t){return r.append("iframe").attr("id",t).attr("style","width: 100%; height: 100%;").attr("sandbox","")}g(ns,"sandboxedIframe");var DS=g((r,t,e,i)=>{var n,o,a;(n=r.getElementById(t))==null||n.remove(),(o=r.getElementById(e))==null||o.remove(),(a=r.getElementById(i))==null||a.remove()},"removeExistingElements"),IS=g(async function(r,t,e){var z,R,O,W,I,$;Gn();const i=ea(t);t=i.code;const n=ct();P.debug(n),t.length>((n==null?void 0:n.maxTextSize)??fS)&&(t=mS);const o="#"+r,a="i"+r,s="#"+a,l="d"+r,h="#"+l,c=g(()=>{const V=tt(p?s:h).node();V&&"remove"in V&&V.remove()},"removeTempElements");let d=tt("body");const p=n.securityLevel===yS,u=n.securityLevel===CS,m=n.fontFamily;if(e!==void 0){if(e&&(e.innerHTML=""),p){const D=ns(tt(e),a);d=tt(D.nodes()[0].contentDocument.body),d.node().style.margin=0}else d=tt(e);vl(d,r,l,`font-family: ${m}`,bS)}else{if(DS(document,r,l,a),p){const D=ns(tt("body"),a);d=tt(D.nodes()[0].contentDocument.body),d.node().style.margin=0}else d=tt("body");vl(d,r,l)}let f,y;try{f=await is.fromText(t,{title:i.title})}catch(D){if(n.suppressErrorRendering)throw c(),D;f=await is.fromText("error"),y=D}const C=d.select(h).node(),b=f.type,k=C.firstChild,T=k.firstChild,v=(R=(z=f.renderer).getClasses)==null?void 0:R.call(z,t,f),_=AS(n,b,v,o),w=document.createElement("style");w.innerHTML=_,k.insertBefore(w,T);try{await f.renderer.draw(t,r,"11.14.0",f)}catch(D){throw n.suppressErrorRendering?c():av.draw(t,r,"11.14.0"),D}const S=d.select(`${h} svg`),M=(W=(O=f.db).getAccTitle)==null?void 0:W.call(O),A=($=(I=f.db).getAccDescription)==null?void 0:$.call(I);Fg(b,S,M,A),d.select(`[id="${r}"]`).selectAll("foreignobject > *").attr("xmlns",kS);let E=d.select(h).node().innerHTML;if(P.debug("config.arrowMarkerAbsolute",n.arrowMarkerAbsolute),E=ES(E,p,xr(n.arrowMarkerAbsolute)),p){const D=d.select(h+" svg").node();E=PS(E,D)}else u||(E=he.sanitize(E,{ADD_TAGS:LS,ADD_ATTR:FS,HTML_INTEGRATION_POINTS:{foreignobject:!0}}));if(cS(),y)throw y;return c(),{diagramType:b,svg:E,bindFunctions:f.db.bindFunctions}},"render");function Bg(r={}){var i;const t=ft({},r);t!=null&&t.fontFamily&&!((i=t.themeVariables)!=null&&i.fontFamily)&&(t.themeVariables||(t.themeVariables={}),t.themeVariables.fontFamily=t.fontFamily),sy(t),t!=null&&t.theme&&t.theme in fr?t.themeVariables=fr[t.theme].getThemeVariables(t.themeVariables):t&&(t.themeVariables=fr.default.getThemeVariables(t.themeVariables));const e=typeof t=="object"?oy(t):Il();ss(e.logLevel),Gn()}g(Bg,"initialize");var Lg=g((r,t={})=>{const{code:e}=ra(r);return is.fromText(e,t)},"getDiagramFromText");function Fg(r,t,e,i){wg(t,r),Tg(t,e,i,t.attr("id"))}g(Fg,"addA11yInfo");var Zr=Object.freeze({render:IS,parse:_g,getDiagramFromText:Lg,initialize:Bg,getConfig:ct,setConfig:Rl,getSiteConfig:Il,updateSiteConfig:ay,reset:g(()=>{Qi()},"reset"),globalReset:g(()=>{Qi(ce)},"globalReset"),defaultConfig:ce});ss(ct().logLevel);Qi(ct());var RS=g((r,t,e)=>{P.warn(r),Os(r)?(e&&e(r.str,r.hash),t.push({...r,message:r.str,error:r})):(e&&e(r),r instanceof Error&&t.push({str:r.message,message:r.message,hash:r.name,error:r}))},"handleError"),Mg=g(async function(r={querySelector:".mermaid"}){try{await OS(r)}catch(t){if(Os(t)&&P.error(t.str),jt.parseError&&jt.parseError(t),!r.suppressErrors)throw P.error("Use the suppressErrors option to suppress these errors"),t}},"run"),OS=g(async function({postRenderCallback:r,querySelector:t,nodes:e}={querySelector:".mermaid"}){const i=Zr.getConfig();P.debug(`${r?"":"No "}Callback function found`);let n;if(e)n=e;else if(t)n=document.querySelectorAll(t);else throw new Error("Nodes and querySelector are both undefined");P.debug(`Found ${n.length} diagrams`),(i==null?void 0:i.startOnLoad)!==void 0&&(P.debug("Start On Load: "+(i==null?void 0:i.startOnLoad)),Zr.updateSiteConfig({startOnLoad:i==null?void 0:i.startOnLoad}));const o=new Kt.InitIDGenerator(i.deterministicIds,i.deterministicIDSeed);let a;const s=[];for(const l of Array.from(n)){if(P.info("Rendering diagram: "+l.id),l.getAttribute("data-processed"))continue;l.setAttribute("data-processed","true");const h=`mermaid-${o.next()}`;a=l.innerHTML,a=Vd(Kt.entityDecode(a)).trim().replace(/<br\s*\/?>/gi,"<br/>");const c=Kt.detectInit(a);c&&P.debug("Detected early reinit: ",c);try{const{svg:d,bindFunctions:p}=await Dg(h,a,l);l.innerHTML=d,r&&await r(h),p&&p(l)}catch(d){RS(d,s,jt.parseError)}}if(s.length>0)throw s[0]},"runThrowsErrors"),Ag=g(function(r){Zr.initialize(r)},"initialize"),$S=g(async function(r,t,e){P.warn("mermaid.init is deprecated. Please use run instead."),r&&Ag(r);const i={postRenderCallback:e,querySelector:".mermaid"};typeof t=="string"?i.querySelector=t:t&&(t instanceof HTMLElement?i.nodes=[t]:i.nodes=t),await Mg(i)},"init"),WS=g(async(r,{lazyLoad:t=!0}={})=>{Gn(),co(...r),t===!1&&await lS()},"registerExternalDiagrams"),Eg=g(function(){if(jt.startOnLoad){const{startOnLoad:r}=Zr.getConfig();r&&jt.run().catch(t=>P.error("Mermaid failed to initialize",t))}},"contentLoaded");typeof document<"u"&&window.addEventListener("load",Eg,!1);var zS=g(function(r){jt.parseError=r},"setParseErrorHandler"),Bn=[],ho=!1,Pg=g(async()=>{if(!ho){for(ho=!0;Bn.length>0;){const r=Bn.shift();if(r)try{await r()}catch(t){P.error("Error executing queue",t)}}ho=!1}},"executeQueue"),NS=g(async(r,t)=>new Promise((e,i)=>{const n=g(()=>new Promise((o,a)=>{Zr.parse(r,t).then(s=>{o(s),e(s)},s=>{var l;P.error("Error parsing",s),(l=jt.parseError)==null||l.call(jt,s),a(s),i(s)})}),"performCall");Bn.push(n),Pg().catch(i)}),"parse"),Dg=g((r,t,e)=>new Promise((i,n)=>{const o=g(()=>new Promise((a,s)=>{Zr.render(r,t,e).then(l=>{a(l),i(l)},l=>{var h;P.error("Error parsing",l),(h=jt.parseError)==null||h.call(jt,l),s(l),n(l)})}),"performCall");Bn.push(o),Pg().catch(n)}),"render"),qS=g(()=>Object.keys(Ur).map(r=>({id:r})),"getRegisteredDiagramsMetadata"),jt={startOnLoad:!0,mermaidAPI:Zr,parse:NS,render:Dg,init:$S,run:Mg,registerExternalDiagrams:WS,registerLayoutLoaders:$p,initialize:Ag,parseError:void 0,contentLoaded:Eg,setParseErrorHandler:zS,detectType:as,registerIconPacks:Jk,getRegisteredDiagramsMetadata:qS},Sl=jt;/*! Check if previously processed *//*!
 * Wait for document loaded before starting the execution
 */const jS={class:"sdk-docs-page"},HS={class:"sdk-docs-shell"},US={class:"sdk-docs-topbar"},GS={class:"topbar-actions"},VS={class:"sdk-docs-layout"},YS={class:"sdk-docs-sidebar"},XS={class:"sidebar-scroll"},KS={class:"sdk-docs-content"},ZS={class:"doc-article"},QS={class:"doc-title"},JS=["innerHTML"],t_={key:1,class:"doc-empty"},r_={__name:"SdkDocs",setup(r){const t=Vg(),e=new lf,i=Xn("dark"),n=Xn([]),o=[{id:"dark",label:"深色主题",icon:"🌙"},{id:"white",label:"浅色主题",icon:"☀️"},{id:"soft",label:"柔和主题",icon:"🌿"},{id:"tech",label:"科技主题",icon:"💎"}],a={...Object.assign({"/src/sdk/Analysis/ElevationProfile/README.md":gf,"/src/sdk/Analysis/GeoSOT/README.md":ff,"/src/sdk/Analysis/HeightLimit/README.md":mf,"/src/sdk/Analysis/IsoSurface/README.md":yf,"/src/sdk/Analysis/IsoVolume/README.md":Cf,"/src/sdk/Analysis/Openness/README.md":xf,"/src/sdk/Analysis/SkyLine/README.md":bf,"/src/sdk/Analysis/SlopeAspect/README.md":kf,"/src/sdk/Analysis/Sunlight/README.md":wf,"/src/sdk/Control/Screenshot/README.md":Tf,"/src/sdk/Effect/Fire/README.md":vf,"/src/sdk/Effect/Fog/README.md":Sf,"/src/sdk/Effect/Rain/README.md":_f,"/src/sdk/Effect/Snow/README.md":Bf,"/src/sdk/Layer/FeatureLayer/Rainfall/README.md":Lf,"/src/sdk/Layer/FeatureLayer/Temperature/README.md":Ff,"/src/sdk/Layer/FeatureLayer/Typhoon/README.md":Mf,"/src/sdk/Layer/FeatureLayer/WindField/ThirdParty/README.md":Af,"/src/sdk/Layer/TileLayer/ClusterPoint/README.md":Ef,"/src/sdk/Layer/TileLayer/CrsWmtsLayer/README.md":Pf,"/src/sdk/Map/DualScreen/README.md":Df,"/src/sdk/Map/Theme/Palette/README.md":If,"/src/sdk/Navigation/Bookmark/README.md":Rf,"/src/sdk/Navigation/OrbitAround/README.md":Of,"/src/sdk/Navigation/Roam/FirstPersonView/README.md":$f,"/src/sdk/Navigation/Roam/Keyboard/README.md":Wf,"/src/sdk/Navigation/Roam/TweensRoaming/README.md":zf,"/src/sdk/Navigation/Roam/UavFixedRouteRoaming/README.md":Nf,"/src/sdk/Navigation/Roam/WaypointCamera/README.md":qf,"/src/sdk/Three/Ammo/README.md":jf,"/src/sdk/Three/Model/README.md":Hf,"/src/sdk/Three/Scene/README.md":Uf,"/src/sdk/Tool/ModelClipFlatten/README.md":Gf,"/src/sdk/Tool/ModelOverlapFlatten/README.md":Vf,"/src/sdk/Tool/TerrainClip/README.md":Yf,"/src/sdk/Tool/TerrainExaggeration/README.md":Xf,"/src/sdk/Tool/TerrainFlatten/README.md":Kf,"/src/sdk/Tool/TerrainUplift/README.md":Zf,"/src/sdk/Tool/TerrainUplift1/README.md":Qf,"/src/sdk/Tool/TilesetClippingDig/README.md":Jf,"/src/sdk/Tool/TilesetDigHole/README.md":tm}),...Object.assign({"/src/sdk/Control/Compass/readme.md":rm,"/src/sdk/Control/Coordinate/readme.md":em,"/src/sdk/Control/Overview/readme.md":im,"/src/sdk/Control/Scale/readme.md":nm,"/src/sdk/Control/Zoom/readme.md":om,"/src/sdk/Layer/ScenceLayer/I3SLayer/readme.md":sm,"/src/sdk/Layer/ScenceLayer/TilesetLayer/readme.md":am,"/src/sdk/Layer/TileLayer/AMapLayer/readme.md":lm,"/src/sdk/Layer/TileLayer/ArcGISMapServerLayer/readme.md":hm,"/src/sdk/Layer/TileLayer/BaiduMapLayer/readme.md":cm,"/src/sdk/Layer/TileLayer/BaseLayer/readme.md":dm,"/src/sdk/Layer/TileLayer/ImageLayer/readme.md":um,"/src/sdk/Layer/TileLayer/ImageryLayer/readme.md":pm,"/src/sdk/Layer/TileLayer/TerrainLayer/readme.md":gm,"/src/sdk/Layer/TileLayer/UrlImageryLayer/readme.md":fm,"/src/sdk/Layer/TileLayer/WFSLayer/readme.md":mm,"/src/sdk/Layer/TileLayer/WMSLayer/readme.md":ym,"/src/sdk/Layer/TileLayer/WMTSLayer/readme.md":Cm,"/src/sdk/Map/readme.md":xm,"/src/sdk/readme.md":bm})},s=M=>String(M||"").replace(/^\/src\/sdk\//,"").replace(/^([Rr][Ee][Aa][Dd][Mm][Ee]\.md)$/,"").replace(/\/[Rr][Ee][Aa][Dd][Mm][Ee]\.md$/,""),l=M=>M?M.split("/").join(" / "):"SDK 总览",h=M=>{const A=String(M||"").split("/").filter(Boolean);return A.length?A[A.length-1]:"总览"},c=M=>String(M||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),d=M=>c(M).replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noreferrer">$1</a>'),p=M=>{const A=String(M||"").replace(/\r\n/g,`
`).split(`
`),E=[];let z=!1,R="",O=[],W=!1;const I=()=>{if(!O.length)return;const D=O.join(`
`);R==="mermaid"?E.push(`<pre class="mermaid">${D}</pre>`):E.push(`<pre><code>${c(D)}</code></pre>`),O=[],R=""},$=()=>{W&&(E.push("</ul>"),W=!1)};for(const D of A){const V=D.trim().match(/^```(\w+)?$/);if(V){z?(I(),z=!1):($(),z=!0,R=String(V[1]||"").toLowerCase());continue}if(z){O.push(D);continue}if(!D.trim()){$();continue}const rt=D.match(/^(#{1,6})\s+(.*)$/);if(rt){$();const Tt=rt[1].length;E.push(`<h${Tt}>${d(rt[2])}</h${Tt}>`);continue}const yt=D.match(/^\s*[-*]\s+(.*)$/);if(yt){W||(E.push("<ul>"),W=!0),E.push(`<li>${d(yt[1])}</li>`);continue}$(),E.push(`<p>${d(D)}</p>`)}return z&&I(),$(),E.join(`
`)},u=Si(()=>Object.entries(a).map(([A,E])=>{const z=s(A),R=z==="";return{id:R?"sdk-overview":z,docPath:z,title:R?"SDK 总览":l(z),leafTitle:R?"总览":h(z),topGroup:z.split("/")[0]||"SDK",isRootOverview:R,html:p(E)}}).sort((A,E)=>A.isRootOverview?-1:E.isRootOverview?1:A.docPath.localeCompare(E.docPath))),m=Xn(""),f=Si(()=>(!m.value&&u.value.length>0&&(m.value=u.value[0].id),!0)),y=Si(()=>(f.value,u.value.find(M=>M.id===m.value)||null)),C=M=>{m.value=M},b=M=>{const A=[],E=new Map,z=M.find(O=>O.isRootOverview),R=(O,W)=>{var $;const I=O?`${O}/${W}`:W;if(!E.has(I)){const D={id:I,label:W,children:[],isDoc:!1,docId:""};E.set(I,D),O?($=E.get(O))==null||$.children.push(D):A.push(D)}return E.get(I)};return M.forEach(O=>{if(O.isRootOverview)return;const W=String(O.docPath||"").split("/").filter(Boolean);let I="";W.forEach(($,D)=>{const V=R(I,$);D===W.length-1&&(V.isDoc=!0,V.docId=O.id),I=V.id})}),z&&A.unshift({id:"sdk-overview-root",label:"SDK 总览",children:[],isDoc:!0,docId:z.id}),A},k=Si(()=>b(u.value)),T=M=>{M!=null&&M.isDoc&&(M!=null&&M.docId)&&C(M.docId)},v=M=>M==="white"||M==="soft"?"default":"dark",_=async()=>{await Qg();const M=document.querySelectorAll(".doc-body .mermaid");M.length&&(Sl.initialize({startOnLoad:!1,theme:v(i.value),securityLevel:"loose"}),await Sl.run({nodes:Array.from(M)}))},w=()=>{t.push("/")},S=M=>{e.use(M),i.value=e.getThemeId()};return Yg(()=>{e.initFromStorage().apply(),i.value=e.getThemeId(),n.value=u.value.flatMap(M=>{const A=M.docPath.split("/").filter(Boolean),E=[];let z="";return A.slice(0,-1).forEach(R=>{z=z?`${z}/${R}`:R,E.push(z)}),E}),e.onChange(({themeId:M})=>{i.value=M}),_()}),Xg([()=>{var M;return(M=y.value)==null?void 0:M.id},i],()=>{_()}),(M,A)=>{const E=af,z=Jg,R=Kg("Right"),O=tf,W=rf,I=ef;return _i(),Yn("div",jS,[Mt("div",HS,[Mt("header",US,[A[0]||(A[0]=Mt("div",{class:"topbar-title"},[Mt("h2",null,"cim3d SDK 使用说明文档")],-1)),Mt("div",GS,[ke(z,{"model-value":i.value,class:"theme-select",placeholder:"切换主题",onChange:S},{default:Bi(()=>[(_i(),Yn(nf,null,of(o,$=>ke(E,{key:$.id,label:`${$.icon} ${$.label}`,value:$.id},null,8,["label","value"])),64))]),_:1},8,["model-value"]),Mt("button",{class:"topbar-btn",onClick:w},[ke(O,null,{default:Bi(()=>[ke(R)]),_:1})])])]),Mt("div",VS,[Mt("aside",YS,[A[1]||(A[1]=Mt("h3",{class:"sdk-docs-title"},"SDK 使用说明",-1)),Mt("div",XS,[ke(W,{class:"sdk-tree",data:k.value,"node-key":"id",props:{label:"label",children:"children"},"default-expanded-keys":n.value,"expand-on-click-node":!1,onNodeClick:T},{default:Bi(({data:$})=>[Mt("span",{class:sf(["tree-node-label",{"tree-node-label--active":$.isDoc&&m.value===$.docId}])},oa($.label),3)]),_:1},8,["data","default-expanded-keys"])])]),Mt("main",KS,[y.value?(_i(),Zg(I,{key:0,class:"content-scrollbar"},{default:Bi(()=>[Mt("article",ZS,[Mt("h2",QS,oa(y.value.title),1),Mt("div",{class:"doc-body markdown-body",innerHTML:y.value.html},null,8,JS)])]),_:1})):(_i(),Yn("div",t_,"未找到 SDK 文档内容。"))])])])])}}},e_=hf(r_,[["__scopeId","data-v-aebf8923"]]),U_=Object.freeze(Object.defineProperty({__proto__:null,default:e_},Symbol.toStringTag,{value:"Module"}));export{S_ as $,j_ as A,Br as B,sr as C,km as D,Dl as E,$s as F,ct as G,$1 as H,Ry as I,k1 as J,fb as K,eb as L,Fa as M,La as N,F_ as O,v_ as P,B_ as Q,__ as R,w_ as S,bs as T,Q as U,L_ as V,T_ as W,Jr as X,A_ as Y,M_ as Z,g as _,ft as a,zm as a0,je as a1,C_ as a2,my as a3,jl as a4,On as a5,F1 as a6,ha as a7,sb as a8,So as a9,Z2 as aA,r2 as aB,sa as aC,Ll as aD,ib as aE,y_ as aF,Qk as aG,Jk as aH,ki as aI,ms as aJ,vr as aK,Ge as aL,wa as aM,RC as aN,Dd as aO,H as aP,fs as aQ,oh as aR,Ot as aS,Ci as aT,FC as aU,lh as aV,k_ as aW,U_ as aX,O1 as aa,Ul as ab,vy as ac,tr as ad,F as ae,L as af,_2 as ag,Dp as ah,N_ as ai,Pt as aj,Fd as ak,br as al,Te as am,Ws as an,T1 as ao,Xr as ap,Pd as aq,q as ar,Lw as as,z_ as at,q_ as au,$_ as av,U as aw,W_ as ax,iw as ay,Q2 as az,Ey as b,Ay as c,ot as d,mi as e,Ad as f,My as g,Cr as h,Jt as i,tt as j,Hl as k,P as l,v1 as m,fi as n,Py as o,Dy as p,w1 as q,G2 as r,Fy as s,E_ as t,Kt as u,Ly as v,N1 as w,b_ as x,x_ as y,H_ as z};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/dagre-KV5264BT-7CIAflHy.js","assets/graph-nevHEoSw.js","assets/index-WbcqHQD_.js","assets/index-uK6AoyTD.css","assets/reduce-UNOZ6vjB.js","assets/layout-x30Q-zxW.js","assets/min-NmHN3ude.js","assets/index-zbQVoJ9T.js","assets/rainfall-h7Pf1DAF.js","assets/purify.es-VnshMA6w.js","assets/_plugin-vue_export-helper-x3n3nnut.js","assets/base-5W0NiMIj.css","assets/el-scrollbar-DFd87bVR.css","assets/el-checkbox-C9uRzKiv.css","assets/el-icon-lSGiSgq_.css","assets/el-input-4r4zYloC.css","assets/el-tag-mY1hEzyy.css","assets/el-select-gnTCzm2q.css","assets/el-popper-KAo5Sbjg.css","assets/cose-bilkent-S5V4N54A-t58AYpHU.js","assets/cytoscape.esm-mqorwSBl.js","assets/c4Diagram-AHTNJAMY-O43GpkOl.js","assets/chunk-YZCP3GAM-jF0WyMP5.js","assets/flowDiagram-DWJPFMVM-sXLUaEGP.js","assets/chunk-FMBD7UC4-cjne3FlK.js","assets/chunk-55IACEB6-k3fWCrQR.js","assets/chunk-EDXVE4YY--btV3HrA.js","assets/channel-QCuCKR05.js","assets/erDiagram-SMLLAGMA-iXHEOAg-.js","assets/gitGraphDiagram-UUTBAWPF-2a46b2mW.js","assets/chunk-4BX2VUAB-hh9sZmBQ.js","assets/chunk-QZHKN3VN-ES8A5Q3e.js","assets/wardley-RL74JXVD-G1QD3D5k.js","assets/ganttDiagram-T4ZO3ILL-q3c3_LoW.js","assets/linear-JMV1qiso.js","assets/init-Hi12RPRh.js","assets/defaultLocale-OvH1_DWc.js","assets/infoDiagram-42DDH7IO-g29SnXUe.js","assets/pieDiagram-DEJITSTG-88OgH_jj.js","assets/arc-V0-IExSI.js","assets/ordinal-wXG5obU4.js","assets/quadrantDiagram-34T5L4WZ-f6ae-cyZ.js","assets/xychartDiagram-5P7HB3ND-w9gkiWIx.js","assets/requirementDiagram-MS252O5E-OXXzAKrY.js","assets/sequenceDiagram-FGHM5R23-As3J30pd.js","assets/classDiagram-6PBFFD2Q-SyNsKCl_.js","assets/chunk-4TB4RGXK-Y7a6eFOR.js","assets/classDiagram-v2-HSJHXN6E-SyNsKCl_.js","assets/stateDiagram-FHFEXIEX-rjgGvUrD.js","assets/chunk-OYMX7WX6-eEPMLMo_.js","assets/stateDiagram-v2-QKLJ7IA2-F3eYzhRQ.js","assets/journeyDiagram-VCZTEJTY-DOYGE2XQ.js","assets/timeline-definition-GMOUNBTQ-YHeSvx8K.js","assets/mindmap-definition-QFDTVHPH-8FeRfsxL.js","assets/kanban-definition-6JOO6SKY-5LdHOvOS.js","assets/sankeyDiagram-XADWPNL6-ZI5I2P5n.js","assets/diagram-TYMM5635-DP30Z2j3.js","assets/diagram-MMDJMWI5-IQNRyj_6.js","assets/blockDiagram-DXYQGD6D-bLSsaWWs.js","assets/diagram-5BDNPKRD-t2StRVNr.js","assets/architectureDiagram-Q4EWVU46-zaNjTUYV.js","assets/ishikawaDiagram-UXIWVN3A-sxol_Kk9.js","assets/vennDiagram-DHZGUBPP-VOCaZey6.js","assets/diagram-G4DWMVQ6-hGw0wqKC.js","assets/wardleyDiagram-NUSXRM2D-i_BMMBPT.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
