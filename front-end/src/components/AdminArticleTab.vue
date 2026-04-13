<template>
  <div class="row">
    <div class="col-md-4 mb-4">
      <div class="card shadow-sm border-0 sticky-top" style="top: 80px;">
        <div class="card-header bg-primary text-white fw-bold py-3">
          {{ isEditing ? 'Update Article' : 'Add New Article' }}
        </div>
        <div class="card-body p-4">
          <form @submit.prevent="submitArticle">
            <div class="mb-3">
              <label class="form-label fw-semibold">Error Name (Issue ID)</label>
              <input v-model="formData.key" type="text" class="form-control" required placeholder="Cannot_Connect_to_WiFi...">
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Category</label>
              <select v-model="formData.category" class="form-select">
                <option value="Account">Account</option>
                <option value="Network">Network</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Billing">Billing</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="form-label fw-semibold">Description</label>
              <div class="bg-white">
                <QuillEditor 
                  theme="snow" 
                  v-model:content="formData.value" 
                  contentType="html" 
                  style="min-height: 200px;" 
                  placeholder="Enter the troubleshooting steps..."
                />
              </div>
            </div>
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-success w-100 fw-bold">
                {{ isEditing ? 'Update' : 'Save Article' }}
              </button>
              <button v-if="isEditing" type="button" @click="cancelEdit" class="btn btn-secondary w-100 fw-bold">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="col-md-8">
      <div class="card shadow-sm border-0 mb-4">
        <div class="card-body bg-light rounded d-flex gap-3">
          <div class="input-group">
            <span class="input-group-text bg-white"><i class="fas fa-search"></i></span>
            <input v-model="searchQuery" class="form-control" placeholder="Search error name or content...">
          </div>
          <select v-model="selectedFilter" class="form-select w-auto">
            <option value="">All Categories</option>
            <option value="Account">Account</option>
            <option value="Network">Network</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
          </select>
        </div>
      </div>

      <div class="list-group shadow-sm">
        <div v-if="filteredResponses.length === 0" class="text-center py-5 bg-white border rounded">
          <p class="text-muted mb-0">No articles found or no articles available.</p>
        </div>
        <div v-for="item in filteredResponses" :key="item._id" class="list-group-item list-group-item-action p-4 border-bottom">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="mb-0 fw-bold text-primary">{{ item.key }}</h5>
            <span class="badge rounded-pill" :class="getArticleBadgeColor(item.category)">{{ item.category }}</span>
          </div>
          <p class="text-secondary mb-3" 
          style="white-space: pre-wrap; display: -webkit-box; -webkit-line-clamp: 3; 
          -webkit-box-orient: vertical; overflow: hidden;" v-html="item.value"></p>
          <div class="d-flex justify-content-end gap-2">
            <button @click="editArticle(item)" class="btn btn-sm btn-outline-primary px-3"><i class="fas fa-edit"></i> Edit</button>
            <button @click="deleteArticle(item._id)" class="btn btn-sm btn-outline-danger px-3"><i class="fas fa-trash"></i> Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '../helpers/api'; 
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const responses = ref([]); // store all articles from the backend
const formData = ref({ key: '', value: '', category: 'Account' }); // form data for create/edit
const isEditing = ref(false); // track if in edit mode
const editId = ref(null); // track which article is being edited
const searchQuery = ref(''); // filter control for search input
const selectedFilter = ref(''); // filter control for category

const loadArticles = async () => {
  responses.value = await api.getResponses();
};

const filteredResponses = computed(() => {
  return responses.value.filter(item => {
    const matchesSearch = item.key.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          item.value.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedFilter.value === '' || item.category === selectedFilter.value;
    return matchesSearch && matchesCategory;
  });
});

const submitArticle = async () => {
  if (isEditing.value) {
    await api.updateResponse(editId.value, formData.value);
    isEditing.value = false;
    editId.value = null;
  } else {
    await api.createResponse(formData.value);
  }
  formData.value = { key: '', value: '', category: 'Account' }; 
  loadArticles(); 
};

const editArticle = (item) => {
  formData.value = { key: item.key, value: item.value, category: item.category };
  isEditing.value = true;
  editId.value = item._id;
};

const deleteArticle = async (id) => {
  if (confirm("Are you sure you want to delete this article from the knowledge base?")) {
    const success = await api.deleteResponse(id);
    if (success) loadArticles(); 
  }
};

const cancelEdit = () => {
  formData.value = { key: '', value: '', category: 'Account' };
  isEditing.value = false;
  editId.value = null;
};

const getArticleBadgeColor = (category) => {
  const colors = {
    'Account': 'bg-primary', 'Billing': 'bg-success', 'Network': 'bg-info text-dark', 
    'Hardware': 'bg-warning text-dark', 'Software': 'bg-danger', 'Other': 'bg-secondary'
  };
  return colors[category] || 'bg-secondary';
};

onMounted(() => {
  loadArticles();
});
</script>