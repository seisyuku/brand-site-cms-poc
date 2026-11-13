import { slugifyStr } from "./slugify";

export const postCategories = [
  {
    name: "商業事件",
    description: "AI 企業、人物、策略與營運動態，例如定價或商業模式調整。",
  },
  { name: "市佔格局", description: "市場份額變化、併購、反壟斷與平台退場。" },
  { name: "資安漏洞", description: "AI 產品與服務的重大漏洞或資安事件。" },
  { name: "模型發布", description: "主要 AI 實驗室的新模型發布與開源。" },
].map(category => ({ ...category, tag: slugifyStr(category.name) }));

// The first editorial label in CMS tag order determines the primary category.
export function getPostCategory(tags: string[]) {
  for (const tag of tags) {
    const category = postCategories.find(item => item.name === tag);
    if (category) return category;
  }
}
