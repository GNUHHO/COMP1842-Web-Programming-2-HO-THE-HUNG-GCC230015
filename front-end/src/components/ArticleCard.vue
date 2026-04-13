<template>
  <div class="card h-100 border-0 shadow-sm article-card">
    <div class="card-body p-4">
      <span :class="['badge rounded-pill mb-3', getBadgeColor(item.category)]">
        {{ item.category }}
      </span>
      <h5 class="card-title fw-bold text-dark">{{ item.key }}</h5>
      
      <p class="card-text text-muted" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;" v-html="item.value"></p>
    </div>
    
    <div class="card-footer bg-white border-0 p-4 pt-0">
      <RouterLink :to="'/issue/' + item._id" class="btn btn-outline-primary w-100 fw-bold">
        Read Guide &rarr;
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
// get props from parent component
defineProps({
  item: {
    type: Object,
    required: true
  }
});

// function to determine badge color based on category
const getBadgeColor = (category) => {
  const colors = {
    'Account': 'bg-primary',
    'Billing': 'bg-success',
    'Network': 'bg-info text-dark',
    'Hardware': 'bg-warning text-dark',
    'Software': 'bg-danger',
    'Other': 'bg-secondary'
  };
  return colors[category] || 'bg-secondary';
};
</script>

<style scoped>

.article-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 15px;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}
</style>