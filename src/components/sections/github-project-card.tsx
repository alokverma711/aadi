"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Star, GitFork, Calendar, Code2 } from "lucide-react";
import { motion } from "motion/react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { getRepoDetails, type RepoDetails } from "@/actions/get-repo";

type GithubProjectCardProps = {
  owner: string;
  repo: string;
};

const GithubProjectCard = ({ owner, repo }: GithubProjectCardProps) => {
  const [details, setDetails] = useState<RepoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, setIsHovered] = useState(false);

  const load = () => {
    if (details || error) return;
    getRepoDetails(owner, repo)
      .then(setDetails)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"));
  };

  const title = details?.name ?? repo;
  const ogImage = "/assets/projects-screenshots/payvanta/landing.png";
  const language = details?.language ?? "Hackathon";
  const description = details?.description || "A project built for the PayPal Hackathon. Check out the source code and live demo for more details.";

  return (
    <div className="flex items-center justify-center" onClick={load}>
      <ResponsiveDialog>
        <ResponsiveDialogTrigger className="bg-transparent flex justify-center w-full">
          <div
            className="group relative w-full max-w-[400px] h-auto rounded-lg overflow-hidden ring-1 ring-white/5 bg-background"
            style={{ aspectRatio: "3/2" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            {error ? (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm p-4 text-center">
                Could not load project preview.
              </div>
            ) : (
              <img
                src={ogImage}
                alt={title}
                className="w-full h-full object-contain bg-background transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <div className="absolute w-full h-24 bottom-0 left-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10">
              <div className="flex flex-col h-full items-start justify-end p-4">
                <div className="text-lg text-left [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                  {title}
                </div>
                <div className="text-xs bg-primary text-primary-foreground rounded-lg w-fit px-2 mt-1">
                  {language}
                </div>
              </div>
            </div>
          </div>
        </ResponsiveDialogTrigger>

        <ResponsiveDialogContent className="md:max-w-3xl md:h-[80vh] md:!flex md:flex-col md:overflow-hidden md:p-0 md:gap-0">
          <div className="shrink-0 border-b border-border bg-background/80 backdrop-blur-sm px-8 py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <h4 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight truncate">
                  {title}
                </h4>
                <span className="shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-0.5">
                  {language}
                </span>
              </div>
              <div className="shrink-0 flex items-center gap-4">
                <Link
                  href={details?.html_url ?? `https://github.com/${owner}/${repo}`}
                  target="_blank"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  Source
                </Link>
                {details?.homepage && (
                  <Link href={details.homepage} target="_blank">
                    <button className="group flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full hover:bg-primary/80 transition-colors">
                      Visit
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1" type="always" data-lenis-prevent>
            <div className="px-8 py-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground"
              >
                {details && (
                  <>
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4" /> {details.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GitFork className="w-4 h-4" /> {details.forks_count}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />{" "}
                      {new Date(details.pushed_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-4 h-4" /> {language}
                    </span>
                  </>
                )}
              </motion.div>

              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {description}
                </p>

                {details?.topics && details.topics.length > 0 && (
                  <div>
                    <h5 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">
                      Topics
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {details.topics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="outline"
                          className="text-xs font-normal bg-secondary/30 border-transparent"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </ScrollArea>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
};

export default GithubProjectCard;
