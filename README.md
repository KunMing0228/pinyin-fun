# 拼音乐园 · 一年级拼音（GitHub Pages 版）

纯静态站点，无需构建、无需后端。上传到 GitHub 仓库并开启 Pages 即可得到一个免费、长期有效的网址。

---

## 一、上传（网页拖拽，最快）

1. 登录 GitHub，右上角 **+ → New repository**
2. 仓库名填 `pinyin-fun`（或你喜欢的名字），选 **Public**，不要勾选任何初始化文件，点 **Create repository**
3. 在新仓库页面点 **uploading an existing file**（或 `Add file → Upload files`）
4. 把**本文件夹里的所有内容**拖进去（注意：是里面的文件，不是文件夹本身）
   - 必须包含 `index.html` 在仓库根目录
   - `.nojekyll` 是隐藏文件，Windows 里需要先开启「显示隐藏的文件」，否则容易漏传
5. 下方点 **Commit changes**

> 命令行也行：`git init && git add . && git commit -m init && git remote add origin <你的仓库地址> && git push -u origin main`

## 二、开启 Pages

1. 仓库页 **Settings → Pages**
2. **Source** 选 `Deploy from a branch`
3. **Branch** 选 `main`、目录选 `/ (root)`，点 **Save**
4. 等 1–2 分钟，页面上方会出现访问地址，形如：

   `https://<你的用户名>.github.io/pinyin-fun/`

首次部署可能需要等构建完成（Actions 里能看到）。

## 三、装到 iPhone 主屏

用 **Safari** 打开上面的地址 → 底部「分享」→「添加到主屏幕」。
装好后是全屏、有独立图标，断网也能用（音频全部内嵌在页面里，Service Worker 会缓存）。

## 四、以后怎么更新

改完文件后在仓库里 `Add file → Upload files` 覆盖同名文件并提交即可。
`sw.js` 里的缓存版本号会随之变化（`pinyin-fun-v...`），浏览器不会命中旧缓存。

---

## 文件说明

| 文件 | 作用 |
|---|---|
| `index.html` | 部署版主页面（音频以 base64 内嵌，同时优先读 `audio/` 下的外置文件） |
| `拼音乐园.html` | 单文件离线版（可直接微信/邮件发送，双击打开，不依赖网络与服务器） |
| `audio/` | 177 段真人录音 mp3（内容哈希命名）+ `manifest.json` |
| `sw.js` | Service Worker，离线缓存 |
| `manifest.webmanifest` | PWA 清单（名称、图标、全屏） |
| `icon-*.png` / `splash/` | 图标与 iPhone 启动图 |
| `发音清单.csv` | 177 条的 key / 汉字 / 拼音 / 类别 / 对应音频文件 |
| `.nojekyll` | 告诉 GitHub Pages 不要用 Jekyll 处理，避免文件被忽略、加快构建 |

## 常见问题

**打开是 404**：确认 `index.html` 在**仓库根目录**（不是某个子文件夹里），且 Pages 的分支/目录选的是 `main` + `/ (root)`。

**页面能开但没声音**：iPhone 静音开关会屏蔽网页音频，关掉侧边静音键即可；另外首次播放需要点一下页面（浏览器策略）。

**国内访问慢或打不开**：`github.io` 在国内网络下不稳定，属于 GitHub 自身的问题，不是站点配置问题。给国内用户分享建议改用腾讯云 EdgeOne Pages 或直接发 `拼音乐园.html` 单文件。

## 音频来源

177 段发音为公开授权的真人拼音表录音（母语者逐音节朗读，CC BY-SA），
经 digmandarin.com / studycli.org / Shtooka(audio-cmn) 三个来源整理，
按《汉语拼音方案》逐条核对音节与声调。仅做裁静音、淡入淡出、音量归一，未做变调或合成。

如再分发，请保留上述来源署名。
