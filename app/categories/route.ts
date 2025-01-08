import { getCategories } from '@/lib/supabase/providers';

export async function GET() {
  const categories = await getCategories();
  const simplifiedCategories = categories.map(category => ({
    id: category.id,
    name: category.name,
    icon_name: category.icon_name
  }));
  
  return Response.json(simplifiedCategories);
}