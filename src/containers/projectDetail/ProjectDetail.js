import React, {useContext} from "react";
import {Link, useParams} from "react-router-dom";
import {bigProjects} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import "./ProjectDetail.scss";

export default function ProjectDetail() {
  const {isDark} = useContext(StyleContext);
  const {slug} = useParams();
  const project = bigProjects.projects.find(item => item.slug === slug);

  if (!project) {
    return (
      <div
        className={isDark ? "project-detail-page dark-mode" : "project-detail-page"}
      >
        <div className="project-detail-shell project-detail-empty-state">
          <h2>Project not found</h2>
          <Link to="/" className="project-back-link">
            Return to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={isDark ? "project-detail-page dark-mode" : "project-detail-page"}>
      <div className="project-detail-shell">
        <header className="project-detail-header">
          <Link to="/" className="project-back-link">
            ← Back to portfolio
          </Link>
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-live-link"
          >
            Visit live project
          </a>
        </header>

        <section className="project-detail-hero">
          <div className="project-detail-copy">
            <p className="project-detail-kicker">{project.projectType}</p>
            <h1>{project.projectName}</h1>
            <p className="project-detail-summary">{project.summary}</p>
            <div className="project-detail-actions">
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-primary-button"
              >
                Explore live app
              </a>
              <Link to="/" className="project-secondary-button">
                Back to home
              </Link>
            </div>
          </div>

          <div className="project-detail-visual">
            <img src={project.image} alt={project.projectName} />
          </div>
        </section>

        <section className="project-detail-metrics">
          {project.stats.map((stat, index) => (
            <div key={index} className="project-metric-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </section>

        <section className="project-detail-grid">
          <article className="project-detail-card">
            <h2>Project overview</h2>
            <p>{project.overview}</p>
          </article>
          <article className="project-detail-card">
            <h2>Key highlights</h2>
            <ul>
              {project.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="project-detail-feature-panel">
          <div className="panel-header">
            <p className="project-detail-kicker">What it includes</p>
            <h2>Core capabilities</h2>
          </div>

          <div className="project-feature-list">
            {project.features.map((feature, index) => (
              <div key={index} className="project-feature-item">
                <span className="feature-bullet">✓</span>
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
