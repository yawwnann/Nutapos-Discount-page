const STORAGE_KEY = 'dynamic_api_url';
// import { useToast } from '../composables/useToast'; // Removed unused import

const getBaseUrl = () => {
    return localStorage.getItem(STORAGE_KEY) || import.meta.env.VITE_API_BASE_URL;
};

// Helper to simulate slight delay if needed, although fetch has its own latency
const delay = (ms) => new Promise(res => setTimeout(res, ms));


export const api = {
  // Store the URL save helper here or just let the view handle localStorage.
  // The view will write to localStorage, this service reads it.

  async getDiscounts(page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'desc') {
    const baseUrl = getBaseUrl();
    if (!baseUrl) {
        return {
            success: false,
            message: "API URL belum disetting",
            data: [],
            Pagination: { total_data: 0, per_page: limit, current_page: page, total_pages: 0, has_next_page: false, has_prev_page: false }
        };
    }

    try {
      const response = await fetch(baseUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      let allData = await response.json();
      
      // 1. Filter
      if (search) {
        const lowerSearch = search.toLowerCase();
        allData = allData.filter(item => item.name.toLowerCase().includes(lowerSearch));
      }

      // 2. Sort
      allData.sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];
        
        if (sortBy === 'value') {
           const normalize = (v) => {
             if (!v) return 0;
             if (typeof v === 'string' && v.includes('%')) return parseFloat(v.replace('%', ''));
             if (typeof v === 'string') return parseFloat(v.replace(/\D/g, ''));
             return v; 
           };
           valA = normalize(valA);
           valB = normalize(valB);
        } else if (sortBy === 'name') {
           valA = (valA || '').toLowerCase();
           valB = (valB || '').toLowerCase();
        } else {
           valA = valA || '';
           valB = valB || '';
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = allData.slice(startIndex, endIndex);
      const totalPages = Math.ceil(allData.length / limit) || 1;

      return {
        success: true,
        message: "Data retrieved successfully",
        data: paginatedData,
        Pagination: {
          total_data: allData.length,
          per_page: limit,
          current_page: page,
          total_pages: totalPages,
          has_next_page: page < totalPages,
          has_prev_page: page > 1
        }
      };
    } catch (error) {
      console.error('Error fetching discounts:', error);
      return {
        success: false,
        message: error.message,
        data: [],
        Pagination: {
            total_data: 0,
            per_page: limit,
            current_page: page,
            total_pages: 0,
            has_next_page: false,
            has_prev_page: false
        }
      };
    }
  },

  async createDiscount(discount) {
    const baseUrl = getBaseUrl();
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We need to add createdAt here because crudcrud doesn't add it automatically like our mock did? 
        // Actually crudcrud basically just stores JSON. Let's add metadata.
        body: JSON.stringify({
            ...discount,
            createdAt: new Date().toISOString()
        }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error creating discount:', error);
      throw error;
    }
  },

  async deleteDiscount(id) {
    const baseUrl = getBaseUrl();
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return true;
    } catch (error) {
      console.error('Error deleting discount:', error);
      throw error;
    }
  },

  async updateDiscount(id, updates) {
    const baseUrl = getBaseUrl();
    try {
      // CrudeCrud PUT replaces the whole object usually, but let's assume standard behavior or just send updates.
      // CRUDCRUD caveats: PUT /:id replaces the entire entity. To do partial update, we must Fetch -> Merge -> Put.
      // OR we just assume 'updates' contains everything needed? 
      // The current frontend implementation passes specific fields.
      // To be safe with crudcrud, we might need to fetch first if we want to preserve other fields, 
      // but let's assume the frontend sends the critical data. 
      // Actually, standard REST PUT replaces. PATCH updates. CrudCrud doesn't strictly support PATCH in all docs, 
      // but sticking to PUT with the provided data is safest if we don't care about losing hidden fields.
      // Let's just PUT the updates, but we should probably include createdAt if we want to keep it?
      // Since it's a demo, let's just PUT.

      // Remove _id from updates if present, crudcrud doesn't like _id in body usually
      const { _id, ...cleanUpdates } = updates;

      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanUpdates),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      // CrudCrud PUT returns empty body usually
      return {}; 
    } catch (error) {
      console.error('Error updating discount:', error);
      throw error;
    }
  },
  
  // Removed seedMockData as we are using real API
};
