import { IApi } from "umi";
import type { Element } from "hast";

export default (api: IApi) => {
  api.modifyDefaultConfig(async (memo) => {
    const { default: remarkParse } = await import("remark-parse");
    const { default: remarkFrontmatter } = await import("remark-frontmatter");
    const { default: remarkDirective } = await import("remark-directive");
    const { default: remarkBreaks } = await import("remark-breaks");
    const { default: remarkGfm } = await import("remark-gfm");
    const { default: rehypeRaw } = await import("rehype-raw");
    const { default: rehypeAutolinkHeadings } = await import(
      "rehype-autolink-headings"
    );
    const { default: rehypeRemoveComments } = await import(
      "rehype-remove-comments"
    );
    const { default: rehypePrismPlus } = await import("rehype-prism-plus");
    const { default: rehypeExternalLinks } = await import(
      "rehype-external-links"
    );
    const { default: remarkFlexibleToc } = await import("remark-flexible-toc")
    memo.mdx = {
      loader: require.resolve("@mdx-js/loader"),
      loaderOptions: {
        providerImportSource: "@mdx-js/react",
        format: "markdown",
        remarkPlugins: [
          remarkParse,
          remarkFrontmatter,
          remarkDirective,
          remarkBreaks,
          remarkGfm,
          [remarkFlexibleToc, { tocRef: [] }]
        ],
        rehypePlugins: [
          rehypeRaw,
          rehypeAutolinkHeadings,
          rehypeRemoveComments,
          [rehypePrismPlus, { ignoreMissing: true }],
          [
            rehypeExternalLinks,
            {
              target(element: Element) {
                return element.properties &&
                  /^https?:\/\//.test(`${element.properties!.href}`)
                  ? "_blank"
                  : undefined;
              },
            },
          ],
        ],
      },
    };
    return memo;
  });
};
