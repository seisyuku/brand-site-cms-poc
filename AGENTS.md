# Works_Web

建立或修改頁面前，閱讀 docs/視覺與頁面規範.md 並遵守。所有一般子頁使用 src/layouts/Main.astro，共用色彩與字級使用 src/styles/base.css。禁止逐頁另寫 H1/H2/H3 字級及主標間距；例外先更新規範並說明原因。

保留既有文章、CMS schema、slug 與路由。不升級依賴或正式部署，除非使用者明確要求。使用 .nvmrc 指定 Node。修改後執行 npm run build、node scripts/check-publish-validation.mjs、git diff --check，並檢查桌面與手機版。
