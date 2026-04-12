import fetchAPI from './apiClient';

// TODO: replace with shared types from src/types/
interface HomepageResponse {
  data: {
    id: number;
    attributes: Record<string, unknown>;
  };
}

export async function getHomepage(): Promise<HomepageResponse> {
  return fetchAPI<HomepageResponse>('/homepage?populate=*');
}
