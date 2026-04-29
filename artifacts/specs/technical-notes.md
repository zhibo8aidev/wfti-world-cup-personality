# Technical Notes - WFTI 世界杯球迷人格大鉴赏

## 1. 技术方向
- 形态：mobile-web H5，运行于直播吧 APP 内 WebView
- 设计产物：HTML 高保真 mockups
- 结果计算：前端本地完成
- 结果存储：结果页先渲染，再异步上报后端
- 原生改动：无

## 2. 前端实现重点
### 2.1 状态管理
至少维护：
- 活动状态
- 登录态
- 题目索引与答案数组
- 8 维原始分与等级向量
- 人格结果对象
- 海报生成态
- 上报重试状态

### 2.2 本地缓存
建议分为两类 key：
- draft：答题进度、答案、最近保存时间、版本号
- result：最近一次结果对象、最近上报状态、待重试 payload

### 2.3 人格计算引擎
- 输入：16 题答案
- 输出：raw_scores、level_vector、personality_code、personality_name、personality_copy、is_hidden
- 执行顺序：聚合 -> 等级映射 -> 隐藏人格检测 -> 常规人格曼哈顿距离匹配
- 要求：可独立单测，避免与页面组件强耦合

### 2.4 海报生成
- 推荐使用 html2canvas 或等效方案
- 截图时隐藏底部固定按钮栏
- 需要支持图片导出、分享前预览、失败重试
- 低端机型要注意字体、阴影、渐变与大图渲染性能

## 3. 宿主 Bridge 依赖
建议沉淀统一 adapter，至少包含：
- ensureLogin(): 拉起登录弹窗并返回结果
- openSharePanel(payload): 调起系统分享面板
- saveImageToAlbum(file): 申请权限并写入相册
- openDeepLink(url): 打开 APP 内页面或应用商店
- getEnv(): 获取登录态、渠道、App 版本、平台信息
- showToast(message): 统一 toast

## 4. 后端接口依赖
### 4.1 结果上报接口
建议入参：
- uid
- personality_code
- answers
- raw_scores
- level_vector
- computed_at
- is_hidden
- app_platform / app_version / source

建议能力：
- upsert，同 uid 覆盖旧结果
- 记录异常原因与客户端重试情况
- 不要求阻塞前端结果展示

### 4.2 活动状态接口
建议返回：
- not_started / active / ended
- started_at / ended_at
- ended_top3（若活动已结束）

### 4.3 异常日志接口
- 接收算法兜底、海报生成失败、bridge 调用失败、缓存读取失败等错误日志

## 5. 埋点与分析
建议事件：
- page_view_landing
- click_start_test
- login_popup_show / success / cancel
- question_view / answer_select / answer_back
- restore_prompt_show / continue / restart
- result_compute_done
- result_view
- click_share / share_success / share_cancel
- poster_generate_start / success / fail
- click_save_album / permission_denied / save_success / save_fail
- result_report_try / success / fail / abandon

## 6. 当前开放问题
- 前端具体框架未锁定，建议在技术方案阶段确定（Vue3 / React 均可，当前以 H5 Web 工程为边界）
- 活动已结束态 TOP3 的数据来源与更新频率待确认
- 球星对照、天敌、拍档、标签云文案待产品补齐
- 分享面板是否完全复用宿主系统分享能力，待客户端确认
- 保存相册能力在 iOS / Android WebView 下的权限差异待验证
