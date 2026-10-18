import {useEffect} from "react";

// Lightweight SEO helper that updates the document title and description
// meta tag without requiring external dependencies such as react-helmet.
export default function BlogSEO({title, description, slug}) {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription =
      document.querySelector('meta[name="description"]')?.getAttribute("content") ||
      "";

    document.title = title;

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", description);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    const baseUrl = (window.location.origin + window.location.pathname)
      .replace(/\/$/, "");
    canonicalTag.setAttribute("href", `${baseUrl}/blog/${slug}`);

    return () => {
      document.title = previousTitle;
      if (descriptionTag) {
        descriptionTag.setAttribute("content", previousDescription);
      }
    };
  }, [title, description, slug]);

  return null;
}