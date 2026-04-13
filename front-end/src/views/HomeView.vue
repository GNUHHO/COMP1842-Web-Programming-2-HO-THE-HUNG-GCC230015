<template>
  <div class="home-container">
    <section class="hero-section text-center text-white py-5 mb-5 shadow-sm">
      <div class="container py-5">
        <h1 class="display-4 fw-bold mb-3">Hello, how can we help you?</h1>
        <p class="lead mb-4">Search for self-help guides or contact the IT department</p>

        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="input-group input-group-lg shadow-lg">
              <span class="input-group-text bg-white border-0 ps-4 text-muted">
                <i class="fas fa-search"></i>
              </span>
              <input 
                v-model="searchQuery" 
                type="text" 
                class="form-control border-0 py-3" 
                placeholder="Example: Zalo error, Cannot connect to Wifi, Forgot password..."
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container pb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold"><i class="fas fa-book-open text-primary me-2"></i> Knowledge Base</h3>
        
        <select v-model="selectedCategory" class="form-select w-auto shadow-sm border-0 bg-light">
          <option value="">All Categories</option>
          <option value="Account">Account</option>
          <option value="Network">Network / Wifi</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Billing">Billing</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Loading data...</p>
      </div>

      <div v-else class="row g-4">
        <div v-for="item in filteredResponses" :key="item._id" class="col-md-6 col-lg-4">
          <ArticleCard :item="item" />
        </div>

        <div v-if="filteredResponses.length === 0" class="col-12 text-center py-5">
          <h5 class="text-muted">No matching articles found.</h5>
          <p>Can't find a solution? Please log in to submit a support request (Ticket) to the Admin.</p>
          <RouterLink to="/login" class="btn btn-primary mt-2">Log In / Sign Up</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '../helpers/api';
// get ArticleCard component to display each article in the knowledge base
import ArticleCard from '../components/ArticleCard.vue';

const responses = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const isLoading = ref(true);

const loadData = async () => {
  isLoading.value = true;
  responses.value = await api.getResponses();
  isLoading.value = false;
};

const filteredResponses = computed(() => {
  return responses.value.filter(item => {
    const matchSearch = item.key.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                        item.value.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCategory = selectedCategory.value === '' || item.category === selectedCategory.value;
    return matchSearch && matchCategory;
  });
});

onMounted(() => {
  loadData();
});
</script>

<style scoped>

.hero-section {
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}

.input-group-text {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.form-control {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}

.form-control:focus {
  box-shadow: none;
}
</style>