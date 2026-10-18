import React, {useContext} from "react";
import {Link, useParams} from "react-router-dom";
import "./BlogDetail.scss";
import {getPostBySlug, getRelatedPosts} from "../../blogData";
import StyleContext from "../../contexts/StyleContext";
import BlogSEO from "../../components/blog/BlogSEO";

export default function BlogDetail() {
  const {isDark} = useContext(StyleContext);
  const {slug} = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className={isDark ? "blog-detail-page dark-mode" : "blog-detail-page"}>
        <div className="blog-detail-shell blog-detail-empty-state">
          <h2>Article not found</h2>
          <p>
            The article you are looking for does not exist or has been moved.
          </p>
          <Link to="/blog" className="blog-back-link">
            ← Back to all articles
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedPosts(post.slug);

  return (
    <div className={isDark ? "blog-detail-page dark-mode" : "blog-detail-page"}>
      <BlogSEO
        title={`${post.title} | Blog | Rakib's Portfolio`}
        description={post.excerpt}
        slug={post.slug}
      />
      <div className="blog-detail-shell">
        <header className="blog-detail-header">
          <Link to="/blog" className="blog-back-link">
            ← Back to all articles
          </Link>
        </header>

        <article className="blog-detail-article">
          <p className="blog-detail-kicker">Article</p>
          <h1 className="blog-detail-title">{post.title}</h1>
          <div className="blog-detail-meta">
            <time>{post.publishedDate}</time>
            <span>{post.readingTime}</span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="blog-detail-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="blog-detail-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="blog-detail-excerpt">
            <p>{post.excerpt}</p>
          </div>

          <div className="blog-detail-body">
            <p className="blog-detail-lead">
              This article is a draft prepared for the portfolio blog. The full
              body will be reviewed and published by the author before going
              live. The excerpt above summarizes the topic.
            </p>
            <p>
              Each article in this blog is written to be technically accurate and
              useful for junior developers. Content is reviewed and finalized
              by the author before publication.
            </p>
          </div>
        </article>

        {related.length > 0 && (
          <section className="blog-detail-related">
            <h3 className="blog-detail-related-title">More articles</h3>
            <div className="blog-detail-related-grid">
              {related.map(relatedPost => (
                <Link
                  to={`/blog/${relatedPost.slug}`}
                  key={relatedPost.slug}
                  className="blog-detail-related-link"
                >
                  <h4 className="blog-detail-related-item-title">
                    {relatedPost.title}
                  </h4>
                  <p className="blog-detail-related-item-excerpt">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="blog-detail-footer-link">
          <Link to="/blog" className="blog-back-link">
            ← Back to all articles
          </Link>
        </div>
      </div>
    </div>
  );
}