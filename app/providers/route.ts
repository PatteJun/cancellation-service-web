import { getProviders } from '@/lib/supabase/providers';

// This will generate a static JSON file at /providers.json
export async function GET() {
  const providers = await getProviders();
  const simplifiedProviders = providers.map(provider => ({
    id: provider.id,
    name: provider.name
  }));
  
  return Response.json(simplifiedProviders);
}