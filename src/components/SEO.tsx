import React from 'react';
import { Helmet, HelmetProps } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export interface SEOProps {
  description?: string;
  lang?: string;
  meta?: HelmetProps['meta'];
  title?: string;
  ogImageURL?: string;
  twitterImageURL?: string;
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
  ogImageURL = 'https://res.cloudinary.com/chancedigital/image/upload/v1602629279/chancedigital/og.jpg',
  twitterImageURL = 'https://res.cloudinary.com/chancedigital/image/upload/v1602629279/chancedigital/twitter.jpg',
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

  const defaultMeta = [
    { name: 'copyright', content: 'Chance Digital' },
    { name: `description`, content: metaDescription },
    { name: 'og:type', content: 'website' },
    { property: 'og:site_name', content: `Chance Digital` },
    { property: `og:title`, content: title },
    { property: `og:description`, content: metaDescription },
    { property: `og:type`, content: `website` },
    { property: 'og:url', content: 'https://chancedigital.io' },
    { property: 'og:image', content: ogImageURL },
    { property: 'og:locale', content: `en_US` },
    { name: `twitter:title`, content: title },
    { name: `twitter:card`, content: 'summary' },
    { name: `twitter:creator`, content: site.siteMetadata.author },
    { name: `twitter:description`, content: metaDescription },
    { name: 'twitter:image', content: twitterImageURL },
    { name: 'twitter:site', content: '@chancethedev' },
    // { name: 'apple-itunes-app', content: 'app-id=1344502648' },
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
