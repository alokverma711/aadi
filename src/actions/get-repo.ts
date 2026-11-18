"use server";

import { cacheLife } from "next/cache";

export type RepoDetails = {
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  homepage: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  open_graph_image_url?: string;
};

export async function getRepoDetails(
  owner: string,
  repo: string
): Promise<RepoDetails> {
  "use cache";
  cacheLife({ stale: 600, revalidate: 600 });

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`);
  }

  const data = await res.json();
  return {
    name: data.name,
    full_name: data.full_name,
    description: data.description,
    language: data.language,
    topics: data.topics ?? [],
    homepage: data.homepage,
    html_url: data.html_url,
    stargazers_count: data.stargazers_count ?? 0,
    forks_count: data.forks_count ?? 0,
    pushed_at: data.pushed_at,
    open_graph_image_url: `https://opengraph.githubassets.com/1/${owner}/${repo}`,
  };
}
