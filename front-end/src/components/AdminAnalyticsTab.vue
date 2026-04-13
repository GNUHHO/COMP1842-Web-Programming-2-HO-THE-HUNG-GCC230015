<template>
  <div class="row mt-4">
    <div class="col-md-6 mb-4">
      <div class="card shadow-sm border-0 h-100">
        <div class="card-header bg-white fw-bold py-3 border-bottom-0">
          <i class="fas fa-chart-pie text-warning me-2"></i> Ticket Status Overview
        </div>
        <div class="card-body d-flex justify-content-center align-items-center" style="height: 350px;">
          <Pie v-if="!isLoading" :data="ticketChartData" :options="pieOptions" />
          <div v-else class="spinner-border text-warning" role="status"></div>
        </div>
      </div>
    </div>

    <div class="col-md-6 mb-4">
      <div class="card shadow-sm border-0 h-100">
        <div class="card-header bg-white fw-bold py-3 border-bottom-0">
          <i class="fas fa-chart-bar text-primary me-2"></i> Knowledge Base Categories
        </div>
        <div class="card-body d-flex justify-content-center align-items-center" style="height: 350px;">
          <Bar v-if="!isLoading" :data="articleChartData" :options="barOptions" />
          <div v-else class="spinner-border text-primary" role="status"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../helpers/api';

// Import Chart.js components for rendering charts
import { Pie, Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const isLoading = ref(true);

// variables to hold chart data
const ticketChartData = ref({ labels: [], datasets: [] });
const articleChartData = ref({ labels: [], datasets: [] });

// config options for charts
const pieOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } };
const barOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

const loadChartData = async () => {
  try {
    // get data for both Tickets and Articles in parallel
    const [ticketsRes, articles] = await Promise.all([
      fetch('http://localhost:3000/api/tickets'),
      api.getResponses()
    ]);
    const tickets = await ticketsRes.json();

    // calc for Ticket Status (Open vs Answered)
    const openCount = tickets.filter(t => t.status === 'Open').length;
    const answeredCount = tickets.filter(t => t.status === 'Answered').length;
    
    ticketChartData.value = {
      labels: ['Open (Pending)', 'Answered (Resolved)'],
      datasets: [{
        backgroundColor: ['#ffc107', '#198754'],
        data: [openCount, answeredCount]
      }]
    };

    // calc for Article Categories (Account, Network, Hardware, Software, Billing, Other)
    const categories = ['Account', 'Network', 'Hardware', 'Software', 'Billing', 'Other'];
    const catCounts = categories.map(cat => articles.filter(a => a.category === cat).length);

    articleChartData.value = {
      labels: categories,
      datasets: [{
        label: 'Number of Articles',
        backgroundColor: '#0d6efd', 
        borderRadius: 5, // round corners for bars
        data: catCounts
      }]
    };

  } catch (error) {
    console.error("Error loading chart data", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadChartData();
});
</script>