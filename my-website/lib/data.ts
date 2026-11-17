import { createServerClient } from "@/lib/supabase-server";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  tech: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  title: string;
  summary: string;
  tech_stack: string;
  links?: any[];
  "order"?: number;
}

export interface UpdateProjectInput {
  title?: string;
  summary?: string;
  tech_stack?: string;
  links?: any[];
  "order"?: number;
}

function toProject(row: any): Project {
  // tech_stack is stored as plain text (possibly comma-separated)
  const tech: string[] = row.tech_stack
    ? String(row.tech_stack).split(",").map((t: string) => t.trim()).filter(Boolean)
    : [];

  // links is jsonb; defensively extract github/live/image urls
  let githubUrl: string | undefined;
  let liveUrl: string | undefined;
  let image: string | undefined;
  if (row.links && Array.isArray(row.links)) {
    for (const link of row.links) {
      const url = link?.url || link?.link || link?.href;
      if (!url) continue;
      const type = String(link?.type || link?.platform || link?.kind || "").toLowerCase();
      const name = String(link?.name || link?.label || "").toLowerCase();
      if ((type === "github" || name.includes("github")) && !githubUrl) {
        githubUrl = url;
      } else if (
        (type === "live" || type === "demo" || name.includes("live") || name.includes("demo")) &&
        !liveUrl
      ) {
        liveUrl = url;
      } else if (
        (type === "image" || name.includes("image") || name.includes("screenshot")) &&
        !image
      ) {
        image = url;
      }
    }
  }

  return {
    id: row.id,
    title: row.title,
    shortDescription: row.summary ?? "",
    description: row.summary ?? "",
    tech,
    image,
    githubUrl,
    liveUrl,
    featured: false,
    order: row["order"] ?? 0,
    createdAt: row.created_at ?? "",
    updatedAt: row.updated_at ?? "",
  };
}

export async function getProjects(): Promise<Project[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  console.log("Projects fetched from Supabase:", data?.length ?? 0, "rows");
  return (data ?? []).map(toProject);
}

export async function getProject(id: string): Promise<Project | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return toProject(data);
}

export async function createProject(
  project: CreateProjectInput
): Promise<Project> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create project");
  }

  return toProject(data);
}

export async function updateProject(
  id: string,
  updates: UpdateProjectInput
): Promise<Project | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) return null;
  return toProject(data);
}

export async function deleteProject(id: string): Promise<boolean> {
  const supabase = createServerClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);

  return !error;
}