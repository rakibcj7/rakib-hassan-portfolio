import blogCoverDns from "./assets/images/blog-cover-dns.svg";
import blogCoverReactNextjs from "./assets/images/blog-cover-react-nextjs.svg";
import blogCoverFullstack from "./assets/images/blog-cover-fullstack.svg";
import blogCoverPortfolio from "./assets/images/blog-cover-portfolio.svg";

// Blog content for the portfolio.
// Posts are stored as structured data with stable slugs so each article
// has a shareable URL (/blog/[slug]) without needing a database or CMS.

export const blogMetadata = {
  title: "Rakib's Blog",
  subtitle: "Notes on web development, written as I learn and build.",
  description:
    "Original articles on web development topics such as DNS, HTTP, React, Next.js, and full-stack application design."
};

export const blogPosts = [
  {
    slug: "what-happens-when-you-visit-a-website",
    title: "What Happens When You Visit a Website? Understanding DNS, HTTP, and the Browser",
    excerpt:
      "From typing a URL into the address bar to a rendered page on your screen, a surprising number of steps happen in under a second. This article walks through DNS lookups, TCP handshakes, HTTP requests, and browser rendering so the journey from keyboard to pixels finally makes sense.",
    publishedDate: "2026-10-18",
    readingTime: "10 min read",
    coverImage: blogCoverDns,
    tags: ["Web Fundamentals", "DNS", "HTTP", "Browser"]
  },
  {
    slug: "react-vs-nextjs-when-to-use-each",
    title: "React vs. Next.js: Understanding When to Use Each",
    excerpt:
      "React is a UI library, while Next.js is a framework built on top of it. Confusing the two leads to architectural mistakes early in a project. This article breaks down what each tool is best at and gives practical guidance for choosing between a plain React app, Next.js, and other meta-frameworks.",
    publishedDate: "2026-10-18",
    readingTime: "9 min read",
    coverImage: blogCoverReactNextjs,
    tags: ["React", "Next.js", "Frontend", "Routing"]
  },
  {
    slug: "building-a-fullstack-application-from-ui-to-database",
    title: "Building a Full-Stack Application: From UI Design to Database",
    excerpt:
      "A full-stack application spans design, API design, state management, and persistence. This article outlines a sane order of operations for building one from scratch, covering component structure, API contracts, database schema, and deployment, without overwhelming a junior developer.",
    publishedDate: "2026-10-18",
    readingTime: "12 min read",
    coverImage: blogCoverFullstack,
    tags: ["Full Stack", "API Design", "Database", "Architecture"]
  },
  {
    slug: "how-to-build-a-portfolio-that-gets-you-noticed",
    title: "How to Build a Portfolio That Gets You Noticed (Without a Degree or Agency)",
    excerpt:
      "A strong portfolio is less about where you studied and more about what you can show. This article covers how to pick real projects, write honest descriptions, and structure your site so recruiters and clients can actually understand what you build.",
    publishedDate: "2026-10-18",
    readingTime: "8 min read",
    coverImage: blogCoverPortfolio,
    tags: ["Career", "Portfolio", "Personal Growth"]
  }
];

export const getPostBySlug = slug =>
  blogPosts.find(post => post.slug === slug);

export const getRelatedPosts = (slug, limit = 2) =>
  blogPosts
    .filter(post => post.slug !== slug)
    .slice(0, limit);