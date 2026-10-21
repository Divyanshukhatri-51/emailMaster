import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://auramail-iota.vercel.app';
const SITE_NAME = 'AuraMail';
const DEFAULT_TITLE = 'AuraMail | AI Email Generator & Professional Writing Assistant';
const DEFAULT_DESCRIPTION = 'Craft high-converting, professional emails in seconds with AuraMail. Powered by AI for tone refinement, instant drafting, and email perfection.';

/**
 * SEO component for dynamically managing meta tags, titles, and canonical links.
 *
 * @param {Object} props
 * @param {string} [props.title] - Page title (will be suffixed with brand if needed)
 * @param {string} [props.description] - Page meta description
 * @param {string} [props.canonical] - Canonical path override (e.g. '/generate')
 * @param {string} [props.keywords] - Custom keywords
 * @param {boolean} [props.noIndex] - Whether search engines should avoid indexing this page
 * @param {string} [props.ogType] - OpenGraph type (default 'website')
 * @param {string} [props.ogImage] - OpenGraph image URL
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  keywords,
  noIndex = false,
  ogType = 'website',
  ogImage = '/favicon.svg',
}) {
  const location = useLocation();

  useEffect(() => {
    // 1. Title formatting
    const formattedTitle = title
      ? (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`)
      : DEFAULT_TITLE;
    document.title = formattedTitle;

    // Helper to update or create a meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create a link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Canonical URL handling (normalize path, remove trailing slash except root)
    let rawPath = canonical || location.pathname;
    if (rawPath.length > 1 && rawPath.endsWith('/')) {
      rawPath = rawPath.slice(0, -1);
    }
    const fullCanonicalUrl = `${SITE_URL}${rawPath === '/' ? '' : rawPath}`;
    setLinkTag('canonical', fullCanonicalUrl);

    // 3. Meta Description
    setMetaTag('name', 'description', description);

    // 4. Meta Keywords
    const defaultKeywords = 'ai email generator, email drafter, tone improver, professional email writing, business email generator, auramail';
    setMetaTag('name', 'keywords', keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords);

    // 5. Meta Robots (index, follow vs noindex, nofollow)
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 6. Open Graph Tags
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', SITE_NAME);
    const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
    setMetaTag('property', 'og:image', absoluteOgImage);

    // 7. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', absoluteOgImage);
  }, [title, description, canonical, keywords, noIndex, ogType, ogImage, location.pathname]);

  return null;
}
