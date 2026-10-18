import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "./BlogPreview.scss";
import {blogPosts} from "../../blogData";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

const PREVIEW_LIMIT = 3;

export default function BlogPreview() {
  const {isDark} = useContext(StyleContext);
  const previews = blogPosts.slice(0, PREVIEW_LIMIT);

  if (previews.length === 0) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className={isDark ? "blog-preview dark-mode" : "blog-preview"}>
        <div className="blog-preview-header">
          <h2 className="blog-preview-title">From the blog</h2>
          <p className="blog-preview-subtitle">
            Notes on web development, written as I learn and build.
          </p>
        </div>
        <div className="blog-preview-grid">
          {previews.map(post => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.slug}
              className="blog-preview-link"
            >
              <article
                className={
                  isDark ? "blog-preview-card dark-mode" : "blog-preview-card"
                }
              >
                {post.coverImage && (
                  <div className="blog-preview-card-image">
                    <img src={post.coverImage} alt={post.title} />
                  </div>
                )}
                <div className="blog-preview-body">
                  <div className="blog-preview-meta">
                    <time>{post.publishedDate}</time>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="blog-preview-card-title">{post.title}</h3>
                  <p className="blog-preview-excerpt">{post.excerpt}</p>
                  <span className="blog-preview-read-more">Read article →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div className="blog-preview-footer">
          <Link to="/blog" className="blog-preview-all-link">
            View all articles →
          </Link>
        </div>
      </div>
    </Fade>
  );
}