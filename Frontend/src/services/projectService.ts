import fetchAPI from './apiClient';

// TODO: replace with shared types from src/types/
interface Project {
  id: number;
  attributes: Record<string, unknown>;
}

interface ProjectListResponse {
  data: Project[];
}

interface ProjectResponse {
  data: Project;
}

export async function getProjects(): Promise<ProjectListResponse> {
  return fetchAPI<ProjectListResponse>('/projects?populate=*');
}

export async function getProject(id: number): Promise<ProjectResponse> {
  return fetchAPI<ProjectResponse>(`/projects/${id}?populate=*`);
}
