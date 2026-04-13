<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Hello, {{ displayUser }}</h2>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4">
        <TicketForm @ticket-created="loadMyTickets" />
      </div>

      <div class="col-md-8">
        <TicketList :tickets="tickets" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TicketForm from '../components/TicketForm.vue';
import TicketList from '../components/TicketList.vue';

const tickets = ref([]);
const displayUser = ref(localStorage.getItem('username') || 'User');

// get my tickets from backend
const loadMyTickets = async () => {
  const currentUserId = localStorage.getItem('userId'); 
  if (!currentUserId) return;

  try {
    const res = await fetch(`http://localhost:3000/api/tickets/user/${currentUserId}`);
    if (res.ok) {
      tickets.value = await res.json();
    }
  } catch (error) {
    console.error("Error loading tickets:", error);
  }
};

onMounted(() => {
  loadMyTickets();
});
</script>