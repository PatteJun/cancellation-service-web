import { getProviders } from '@/lib/supabase/providers';

export async function generateStaticParams() {
  const providers = await getProviders();
  return providers.map((provider) => ({
    id: provider.id,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const providers = await getProviders();
  const provider = providers.find(p => p.id === params.id);
  
  if (!provider) {
    return Response.json({ error: 'Provider not found' }, { status: 404 });
  }
  
  return Response.json(provider);
}