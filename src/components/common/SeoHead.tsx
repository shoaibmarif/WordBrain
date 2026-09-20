import React, { useEffect } from 'react';
import { APP_FULL_TITLE, APP_DESCRIPTION, APP_URL, APP_NAME } from '../../utils/constants';

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  schemaType?: 'WebApplication' | 'FAQPage' | 'Article';
  faqs?: { question: string; answer: string }[];
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = APP_FULL_TITLE,
  description = APP_DESCRIPTION,
  canonicalPath = '',
  schemaType = 'WebApplication',
  faqs = [],
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', `${APP_URL}${canonicalPath}`);

    // 4. Inject JSON-LD Structured Data
    const scriptId = 'lexiquest-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': schemaType === 'FAQPage' ? 'FAQPage' : 'WebApplication',
      name: APP_NAME,
      url: `${APP_URL}${canonicalPath}`,
      description: description,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    };

    if (schemaType === 'FAQPage' && faqs.length > 0) {
      structuredData.mainEntity = faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      }));
    }

    scriptTag.text = JSON.stringify(structuredData);
  }, [title, description, canonicalPath, schemaType, faqs]);

  return null;
};
