import { absoluteUrl, type PageSeo } from '../seo';

// `<` is escaped so a string in the data can never close the <script> early.
const toJson = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c');

/**
 * A page's <head> tags and JSON-LD. React 19 hoists <title>, <meta> and <link>
 * into <head> on the client; scripts/prerender.mjs moves them into <head> of
 * each static HTML file.
 */
export default function Seo({ path, title, description, image, noindex, jsonLd = [] }: PageSeo) {
  const url = path ? absoluteUrl(path) : undefined;
  const imageUrl = absoluteUrl(image.src);
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      {url && <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={image.alt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJson(data) }} />
      ))}
    </>
  );
}
