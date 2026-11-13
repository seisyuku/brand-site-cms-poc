import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { getPostCategory, postCategories } from "./postCategories";
import { slugifyAll } from "./slugify";

const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) => {
  const isCategory = postCategories.some(category => category.tag === tag);
  return getSortedPosts(
    posts.filter(({ data }) =>
      isCategory
        ? getPostCategory(data.tags)?.tag === tag
        : slugifyAll(data.tags).includes(tag)
    )
  );
};

export default getPostsByTag;
