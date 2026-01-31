const STORAGE_KEY = 'dynamic_api_url';

const getBaseUrl = () => {
    let url = localStorage.getItem(STORAGE_KEY) || import.meta.env.VITE_API_BASE_URL;
    if (url && !url.endsWith('/discounts')) {
        url = url.replace(/\/$/, '') + '/discounts';
    }
    return url;
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));


export const api = {

  async getDiscounts(page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'desc') {
    const baseUrl = getBaseUrl();
    if (!baseUrl) {
        return {
            success: true, 
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
        allData = allData.filter(item => item && item.name && item.name.toLowerCase().includes(lowerSearch));
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
   const { _id, ...cleanUpdates } = updates;

      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanUpdates),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return {}; 
    } catch (error) {
      console.error('Error updating discount:', error);
      throw error;
    }
  },
};
