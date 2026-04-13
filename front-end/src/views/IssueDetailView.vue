<template>
  <div class="container mt-5">
    
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted">Loading issue details...</p>
    </div>

    <div v-else-if="issue" class="card shadow-lg border-0 mx-auto" style="max-width: 900px;">
      
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
        <h3 class="mb-0 fw-bold">{{ issue.key }}</h3>
        <span class="badge bg-light text-dark fs-6">{{ issue.category }}</span>
      </div>

      <div class="card-body p-5">
        <h5 class="text-muted mb-4 border-bottom pb-2">Standard Resolution Procedure</h5>
        
        <div class="fs-5 article-content" style="line-height: 1.8;" v-html="issue.value"></div>
      </div>

      <div class="card-footer bg-white border-top-0 py-3 text-center">
        <RouterLink to="/" class="btn btn-outline-primary px-4 fw-bold">
          &larr; Back to Dashboard
        </RouterLink>
      </div>
      
    </div>

    <div v-else class="alert alert-danger text-center mx-auto" style="max-width: 900px;">
      <h4>Issue Not Found</h4>
      <p>This response may have been deleted.</p>
      <RouterLink to="/" class="btn btn-dark mt-2">Return to Dashboard</RouterLink>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); 
const issue = ref(null);
const isLoading = ref(true);

const fetchIssueDetails = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/responses/${route.params.id}`);
    if (res.ok) {
      issue.value = await res.json();
    }
  } catch (error) {
    console.error("Error fetching issue details:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchIssueDetails();
});
</script>

<style scoped>
/* 3. This magic CSS forces ANY image the Admin uploads to shrink 
  so it perfectly fits inside the card without overflowing.
  We also gave it slightly rounded corners and a shadow to look professional! 
*/
:deep(.article-content img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin: 15px 0;
}
</style>