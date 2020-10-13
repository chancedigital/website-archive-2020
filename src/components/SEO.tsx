import React from 'react';
import { Helmet, HelmetProps } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export interface SEOProps {
  description?: string;
  lang?: string;
  meta?: HelmetProps['meta'];
  title?: string;
  imageUrl?: string;
}

/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
const SEO: React.FC<SEOProps> = ({
  description,
  lang = 'en',
  meta = [],
  title = 'Chance the Developer Podcast',
  imageUrl,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  const image =
    imageUrl ||
    'https://res.cloudinary.com/chancedigital/image/upload/v1560399176/chancethedev.jpg';

  const defaultMeta = [
    { name: 'copyright', content: 'Chance Digital' },
    { name: `description`, content: metaDescription },
    { name: 'og:type', content: 'website' },
    { property: 'og:site_name', content: `Chance the Developer Podcast` },
    { property: `og:title`, content: title },
    { property: `og:description`, content: metaDescription },
    { property: `og:type`, content: `website` },
    { property: 'og:url', content: 'https://chancedigital.io' },
    { property: 'og:image', content: image },
    { property: 'og:locale', content: `en_US` },
    { name: `twitter:title`, content: title },
    { name: `twitter:card`, content: 'summary' },
    { name: `twitter:creator`, content: site.siteMetadata.author },
    { name: `twitter:description`, content: metaDescription },
    { name: 'twitter:image', content: image },
    { name: 'twitter:site', content: '@chancethedev' },
    { name: 'apple-itunes-app', content: 'app-id=1344502648' },
  ];

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[...defaultMeta, ...meta].filter(Boolean)}
    />
  );
};

export default SEO;
