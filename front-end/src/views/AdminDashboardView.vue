<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4"><i class="fas fa-user-shield text-warning me-2"></i> Admin Dashboard</h2>

    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link fw-bold cursor-pointer" :class="{ active: activeTab === 'analytics' }" @click.prevent="activeTab = 'analytics'">
          <i class="fas fa-chart-line me-1"></i> Analytics
        </a>
      </li>
      
      <li class="nav-item">
        <a class="nav-link fw-bold cursor-pointer" :class="{ active: activeTab === 'articles' }" @click.prevent="activeTab = 'articles'">
          <i class="fas fa-book me-1"></i> Manage Articles
        </a>
      </li>
      
      <li class="nav-item">
        <a class="nav-link fw-bold cursor-pointer" :class="{ active: activeTab === 'tickets' }" @click.prevent="activeTab = 'tickets'">
          <i class="fas fa-inbox me-1"></i> Manage Tickets 
          <span class="badge bg-danger ms-1" v-if="openTicketsCount > 0">{{ openTicketsCount }}</span>
        </a>
      </li>
    </ul>

    <div v-if="activeTab === 'analytics'">
      <AdminAnalyticsTab />
    </div>

    <div v-if="activeTab === 'articles'">
      <AdminArticleTab />
    </div>

    <div v-if="activeTab === 'tickets'">
      <AdminTicketTab @update-count="handleUpdateCount" />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// import 
import AdminAnalyticsTab from '../components/AdminAnalyticsTab.vue';
import AdminArticleTab from '../components/AdminArticleTab.vue';
import AdminTicketTab from '../components/AdminTicketTab.vue';

// default active tab is Analytics
const activeTab = ref('analytics'); 
const openTicketsCount = ref(0);

const handleUpdateCount = (count) => {
  openTicketsCount.value = count;
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.nav-link {
  color: #6c757d;
  transition: all 0.3s ease;
}
.nav-link.active {
  color: #0d6efd !important;
  border-bottom: 3px solid #0d6efd;
}
</style>