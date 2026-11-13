import { slugifyStr } from "@utils/slugify";
import { getPostCategory } from "@utils/postCategories";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;
  const category = getPostCategory(tags);
  const Heading = secHeading ? "h2" : "h3";

  return (
    <li className="post-row">
      <div className="post-row-meta">
        {category && (
          <a href={`/tags/${encodeURIComponent(category.tag)}/`}>
            {category.name}
          </a>
        )}
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      </div>
      <Heading style={{ viewTransitionName: slugifyStr(title) }}>
        <a href={href}>{title}</a>
      </Heading>
      <p>{description}</p>
    </li>
  );
}
