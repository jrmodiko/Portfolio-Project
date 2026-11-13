import { createServerClient } from "@/lib/supabase-server";

export interface Project {
  id: string;
  title: string;
  short_description: string;
  description: string;
  tech: string[];
  image?: string;
  github_url?: string;
  live_url?: string;
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  title: string;
  short_description: string;
  description: string;
  tech: string[];
  image?: string;
  github_url?: string;
  live_url?: string;
  featured?: boolean;
}

export interface UpdateProjectInput {
  title?: string;
  short_description?: string;
  description?: string;
  tech?: string[];
  image?: string;
  github_url?: string;
  live_url?: string;
  featured?: boolean;
}

function toProject(row: any): Project {
  return {
    id: row.id,
    title: row.title,
    shortDescription: row.short_description,
    description: row.description,
    tech: row.tech ?? [],
    image: row.image,
    githubUrl: row.github_url,
    liveUrl: row.live_url,
    featured: row.featured ?? false,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getProjects(): Promise<Project[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

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
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        ...project,
        created_at: now,
        updated_at: now,
      },
    ])
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
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("projects")
    .update({
      ...updates,
      updated_at: now,
    })
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