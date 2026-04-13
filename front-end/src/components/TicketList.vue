<template>
  <div>
    <div class="card shadow-sm border-0">
      <div class="card-header bg-dark text-white fw-bold py-3">
        <i class="fas fa-history me-2"></i> Support Request History
      </div>
      <div class="card-body p-4">
        
        <div v-if="tickets.length === 0" class="text-center text-muted py-5">
          <i class="fas fa-inbox fa-3x mb-3 text-light"></i>
          <h5>You haven't submitted any support requests.</h5>
        </div>

        <div v-else class="list-group">
          <div v-for="ticket in tickets" :key="ticket._id" class="list-group-item mb-3 border rounded shadow-sm p-3">
            <div class="d-flex w-100 justify-content-between align-items-center mb-2">
              <h5 class="mb-1 fw-bold text-primary">{{ ticket.subject }}</h5>
              <span :class="badgeClass(ticket.status)">{{ ticket.status }}</span>
            </div>
            
            <button @click="viewTicket(ticket)" class="btn btn-sm btn-outline-secondary mt-2" data-bs-toggle="modal" data-bs-target="#ticketDetailModal">
              <i class="fas fa-search-plus me-1"></i> View Details
            </button>
          </div>
        </div>

      </div>
    </div>

    <div class="modal fade" id="ticketDetailModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content border-0 shadow-lg" v-if="selectedTicket">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title fw-bold">{{ selectedTicket.subject }}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body p-4">
            <div class="mb-3">
              <span class="text-muted small text-uppercase fw-bold">Status:</span>
              <span :class="badgeClass(selectedTicket.status) + ' ms-2'">{{ selectedTicket.status }}</span>
            </div>
            
            <h6 class="fw-bold mt-3 mb-2">Your Description:</h6>
            <div class="p-3 bg-light rounded text-secondary" style="white-space: pre-wrap;">{{ selectedTicket.description }}</div>

            <div v-if="selectedTicket.adminReply" class="mt-4">
              <h6 class="fw-bold text-success"><i class="fas fa-check-circle me-1"></i> Response from IT:</h6>
              <div class="p-3 bg-success bg-opacity-10 rounded border border-success border-opacity-25 text-dark" style="white-space: pre-wrap;">
                {{ selectedTicket.adminReply }}
              </div>
            </div>
            
            <div v-else class="mt-4 text-center p-3 border border-dashed rounded text-muted">
              <i class="fas fa-hourglass-half mb-2"></i>
              <p class="mb-0 small">Admin is processing your request. Please wait!</p>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close Window</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// define props to receive tickets data from parent
defineProps({
  tickets: {
    type: Array,
    required: true
  }
});

const selectedTicket = ref(null);

const viewTicket = (ticket) => {
  selectedTicket.value = ticket;
};

const badgeClass = (status) => {
  if (status === 'Open') return 'badge bg-warning text-dark px-3 py-2';
  if (status === 'Answered') return 'badge bg-success px-3 py-2';
  return 'badge bg-secondary px-3 py-2';
};
</script>

<style scoped>
.border-dashed {
  border-style: dashed !important;
}
</style>