"use client";

import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import GithubProjectCard from "./github-project-card";

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="max-w-7xl mx-auto md:min-h-[130vh] px-4">
      <SectionHeader id="projects" title="Projects" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GithubProjectCard owner="alokverma711" repo="pay-pal-Hackathon" />
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
