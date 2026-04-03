import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const APP_NAME = 'Zero-Vault';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = 'A secure, intuitive password vault built with React and TypeScript.',
  keywords = 'password manager, vault, security, zero-vault',
}) => {
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
  }, [fullTitle, description, keywords]);

  return null;
};

export default SEO;
