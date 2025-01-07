import { supabase } from './client';
import type { Database } from './types';

export type Provider = Database['public']['Tables']['providers']['Row'] & {
  categories?: Array<{ id: string; name: string; icon_name: string }>;
};

export async function getProviders(search?: string) {
  try {
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

    if (error) throw error;

    const mappedData = data?.map(provider => {
      const categories = provider.provider_categories?.map(pc => ({
        id: pc.categories.id,
        name: pc.categories.name,
        icon_name: pc.categories.icon_name
      })) || [];
      
      return {
        ...provider,
        categories
      };
    }) || [];

    if (search && mappedData.length === 0) {
      await trackMissingProvider(search);
    }

    return mappedData as Provider[];
  } catch (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
}

export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function trackMissingProvider(searchQuery: string) {
  try {
    // First check if the record exists
    const { data: existingData } = await supabase
      .from('missing_providers')
      .select('id, count')
      .eq('search_query', searchQuery)
      .maybeSingle();

    if (existingData) {
      // Update existing record
      await supabase
        .from('missing_providers')
        .update({ count: (existingData.count || 0) + 1 })
        .eq('id', existingData.id);
    } else {
      // Insert new record
      await supabase
        .from('missing_providers')
        .insert([{ 
          search_query: searchQuery,
          count: 1
        }]);
    }
  } catch (error) {
    // Log error but don't throw to prevent disrupting the user experience
    console.error('Error tracking missing provider:', error);
  }
}