import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "./Blog.scss";
import {blogMetadata, blogPosts} from "../../blogData";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import BlogSEO from "../../components/blog/BlogSEO";
import Button from "../../components/button/Button";

export default function Blog() {
  const {isDark} = useContext(StyleContext);

  return (
    <div className={isDark ? "dark-mode blog-page" : "blog-page"}>
      <BlogSEO
        title="Blog | Rakib's Portfolio"
        description={blogMetadata.description}
        slug=""
      />
      <Fade bottom duration={1000} distance="20px">
        <div className="blog-page-shell">
          <header className="blog-page-header">
            <p className="blog-page-kicker">Writings</p>
            <h1 className="blog-page-title">{blogMetadata.title}</h1>
            <p className="blog-page-subtitle">{blogMetadata.subtitle}</p>
            <div className="blog-page-actions">
              <Button text="Back to Home" href="/" />
            </div>
          </header>

          {blogPosts.length === 0 ? (
            <div className="blog-empty-state">
              <p>No articles published yet. Check back soon for new writings.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {blogPosts.map(post => (
                <Link
                  to={`/blog/${post.slug}`}
                  key={post.slug}
                  className="blog-grid-link"
                >
                  <article className={isDark ? "blog-card dark-mode" : "blog-card"}>
                    {post.coverImage && (
                      <div className="blog-card-image">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                        />
                      </div>
                    )}
                    <div className="blog-card-body">
                      <div className="blog-card-meta">
                        <time>{post.publishedDate}</time>
                        <span>{post.readingTime}</span>
                      </div>
                      <h2 className="blog-card-title">{post.title}</h2>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="blog-card-tags">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="blog-card-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="blog-card-read-more">Read article →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Fade>
    </div>
  );
}