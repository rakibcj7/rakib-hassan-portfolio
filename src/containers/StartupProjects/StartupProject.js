import React, {useContext} from "react";
import "./StartupProjects.scss";
import {bigProjects} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import {useNavigate} from "react-router-dom";

export default function StartupProject() {
  const {isDark} = useContext(StyleContext);
  const navigate = useNavigate();

  function openUrlInNewTab(url) {
    if (!url) {
      return;
    }
    var win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) {
      win.focus();
    }
  }

  const handleProjectAction = project => {
    if (!project) {
      return;
    }
    if (project.slug) {
      navigate(`/projects/${project.slug}`);
      return;
    }
    if (project.footerLink && project.footerLink[0]) {
      const firstLink = project.footerLink[0].url;
      if (firstLink && firstLink.startsWith("/")) {
        navigate(firstLink);
        return;
      }
      openUrlInNewTab(firstLink);
    }
  };

  if (!bigProjects.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="projects">
        <div>
          <h1 className="skills-heading">{bigProjects.title}</h1>
          <p
            className={
              isDark
                ? "dark-mode project-subtitle"
                : "subTitle project-subtitle"
            }
          >
            {bigProjects.subtitle}
          </p>

          <div className="projects-container">
            {bigProjects.projects.map((project, i) => {
              return (
                <div
                  key={i}
                  className={
                    isDark
                      ? "dark-mode project-card project-card-dark"
                      : "project-card project-card-light"
                  }
                  onClick={() => handleProjectAction(project)}
                  onKeyDown={event => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleProjectAction(project);
                    }
                  }}
                  role="link"
                  tabIndex={0}
                  aria-label={`Open ${project.projectName} details`}
                >
                  {project.image ? (
                    <div className="project-image">
                      <img
                        src={project.image}
                        alt={project.projectName}
                        className="card-image"
                      ></img>
                    </div>
                  ) : null}
                  <div className="project-detail">
                    <h5
                      className={isDark ? "dark-mode card-title" : "card-title"}
                    >
                      {project.projectName}
                    </h5>
                    <p
                      className={
                        isDark ? "dark-mode card-subtitle" : "card-subtitle"
                      }
                    >
                      {project.projectDesc}
                    </p>
                    {project.footerLink ? (
                      <div className="project-card-footer">
                        {project.footerLink.map((link, i) => {
                          const isRouteLink = link.url && link.url.startsWith("/");
                          return (
                            <span
                              key={i}
                              className={
                                isDark ? "dark-mode project-tag" : "project-tag"
                              }
                              onClick={event => {
                                event.stopPropagation();
                                if (isRouteLink) {
                                  navigate(link.url);
                                  return;
                                }
                                openUrlInNewTab(link.url);
                              }}
                            >
                              {link.name}
                            </span>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
