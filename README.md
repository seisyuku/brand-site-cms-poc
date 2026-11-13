# Lean

以 AstroPaper、Astro 與 Sveltia CMS 為基礎的網站專案。

- 正式工作目錄：`/Users/lordmi/Documents/Works_Web`
- 網站內容規劃：[填寫清單](docs/網站內容清單.md)
- AstroPaper 原始說明：[上游 README](docs/AstroPaper-README.md)
- 套件名稱：`lean`；相依套件與版本沿用已驗收的 lockfile。

## 開發

使用 Node.js 24 LTS 與隨附的 npm。`.nvmrc` 指定本機與建置使用的版本；使用 nvm 時可先執行 `nvm install`。

```sh
npm ci
npm run dev
npm run build
node scripts/check-publish-validation.mjs
```

本機開發伺服器只供程式預覽。Sveltia 設定指向下述遠端預覽分支，登入後儲存文章會寫入 GitHub，並可能觸發既有 Preview 建置。

## 來源與目前狀態

- GitHub：`https://github.com/seisyuku/brand-site-cms-poc`
- 驗收基準：`07d586cf9db0b84f91652119f95088f3de40e638`
- Works_Web 的 GitHub Actions、Cloudflare Pages 預覽及 Sveltia 寫入分支：`codex/Works_Web-setup`。
- `.pages.yml`、所有文章與圖片均保留；網站品牌為 LordMi Works（米的商業現場）。
- Cloudflare Pages 專案：`brand-site-cms-t09-preview`。預覽建置使用 `.nvmrc` 的 Node.js 版本，輸出 `dist`。
- Netlify 是舊驗收分支的備援。正式網域規劃為 `works.lordmi.com`。

未來文章在發布時間到達後，需要重新建置才會出現；目前沒有排程服務。

## 文章分類與聯絡方式

在 Sveltia 的 Tags 欄位加入一個主分類：商業事件、市佔格局、資安漏洞或模型發布。其他標籤可用來標記公司、產品或產業。如果已有多個主分類名稱，以欄位中第一個為主。沒有主分類的文章仍會出現在全部文章和搜尋中。

聯絡區使用 `src/config.ts` 的 Facebook 與 LinkedIn 設定。填入公開網址並將該項 `active` 設為 `true` 即可顯示連結。

## 搬移保留

舊驗收目錄 `/Users/lordmi/Downloads/brand-site-publish-validation-P0UPaj` 保留為搬移前副本；後續開發請以本專案目錄為準，避免兩邊同時修改。

搬移紀錄與驗證輸出位於 `/Users/lordmi/Downloads/Lean-migration-2026-11-08/`。保留既有 LICENSE 與上游說明。
