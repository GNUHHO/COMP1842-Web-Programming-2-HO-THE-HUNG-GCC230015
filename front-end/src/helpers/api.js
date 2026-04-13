import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Note: This path must match with server's API endpoint
const baseURL = 'http://localhost:3000/api/responses';

export const api = {
  // Retrieve all data
  async getResponses() {
    try {
      const res = await fetch(baseURL);
      if (!res.ok) throw new Error('Unable to load data');
      return await res.json();
    } catch (error) {
      toast.error("Server error: " + error.message);
      return [];
    }
  },

  // Create new entry
  async createResponse(payload) {
    try {
      const res = await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('New solution added successfully!');
      return await res.json();
    } catch (error) {
      toast.error("Server error: " + error.message);
    }
  },

  // Update existing entry
  async updateResponse(id, payload) {
    try {
      const res = await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to update');
      toast.success('Updated successfully!');
      return await res.json();
    } catch (error) {
      toast.error("Server error: " + error.message);
    }
  },

  // Delete entry
  async deleteResponse(id) {
    try {
      const res = await fetch(`${baseURL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.info('Deleted successfully!');
      return true;
    } catch (error) {
      toast.error("Server error: " + error.message);
      return false;
    }
  }
};