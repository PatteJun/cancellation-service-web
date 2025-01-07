import { supabase } from './client';
import type { Database } from './types';

export type Provider = Database['public']['Tables']['providers']['Row'] & {
  categories?: Array<{ id: string; name: string; icon_name: string }>;
};

export async function getProviders(search?: string) {
  console.log('Fetching providers with search:', search);
  
  let query = supabase
    .from('providers')
    .select(`
      *,
      provider_categories (
        category_id,
        categories (
          id,
          name,
          icon_name
        )
      )
    `);

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching providers:', error);
    throw new Error('Error fetching providers');
  }

  console.log('Raw providers data:', data);

  const mappedData = data?.map(provider => {
    const categories = provider.provider_categories?.map(pc => ({
      id: pc.categories.id,
      name: pc.categories.name,
      icon_name: pc.categories.icon_name
    })) || [];
    
    console.log('Provider categories:', categories);
    return {
      ...provider,
      categories
    };
  });

  console.log('Mapped providers data:', mappedData);
  return mappedData as Provider[];
}

export async function getCategories() {
  console.log('Fetching categories');
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Error fetching categories');
  }

  console.log('Categories data:', data);
  return data;
}