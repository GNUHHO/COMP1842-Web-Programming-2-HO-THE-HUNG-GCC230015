<template>
  <div>
    <div class="card shadow-sm border-0">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-dark">
              <tr>
                <th class="ps-4 py-3">Sender</th>
                <th>Issue Title</th>
                <th>Status</th>
                <th>Submission Date</th>
                <th class="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="tickets.length === 0"><td colspan="5" class="text-center py-5 text-muted">The system is empty, no support requests available.</td></tr>
              <tr v-for="ticket in tickets" :key="ticket._id">
                <td class="ps-4 fw-bold"><i class="fas fa-user-circle text-secondary me-2"></i>{{ ticket.username }}</td>
                <td>{{ ticket.subject }}</td>
                <td><span :class="getTicketBadgeClass(ticket.status)">{{ ticket.status }}</span></td>
                <td>{{ new Date(ticket.createdAt).toLocaleDateString('vi-VN') }}</td>
                <td class="text-end pe-4">
                  <button @click="openReplyModal(ticket)" class="btn btn-sm btn-primary fw-bold" data-bs-toggle="modal" data-bs-target="#replyModal">
                    <i class="fas fa-reply me-1"></i> View & Reply
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="modal fade" id="replyModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-0 shadow-lg" v-if="selectedTicket">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title fw-bold"><i class="fas fa-ticket-alt me-2"></i>Support Request Details</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="closeReplyModal"></button>
          </div>
          <div class="modal-body p-4">
            <div class="mb-4 p-3 bg-light rounded border-start border-4 border-warning">
              <h6 class="fw-bold text-dark mb-1">User ({{ selectedTicket.username }}) Description:</h6>
              <p class="mb-0 text-secondary" style="white-space: pre-wrap;">{{ selectedTicket.description }}</p>
            </div>
            
            <div class="mb-3">
              <label class="form-label fw-bold text-success"><i class="fas fa-tools me-1"></i> IT Admin Reply:</label>
              <textarea v-model="adminReplyText" class="form-control" rows="5" placeholder="Enter your reply or troubleshooting instructions here..."></textarea>
            </div>
          </div>
          <div class="modal-footer bg-light border-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success fw-bold" @click="submitReply">
              <i class="fas fa-paper-plane me-1"></i> Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';

// emit event to update the count of open tickets in the parent component
const emit = defineEmits(['update-count']);

const tickets = ref([]);
const selectedTicket = ref(null);
const adminReplyText = ref('');

const loadAllTickets = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/tickets');
    if (res.ok) {
      tickets.value = await res.json();
      
      // calculate the count of open tickets and emit to parent
      const openCount = tickets.value.filter(t => t.status === 'Open').length;
      emit('update-count', openCount);
    }
  } catch (error) {
    toast.error('Error occurred while loading ticket list.');
  }
};

const openReplyModal = (ticket) => {
  selectedTicket.value = ticket;
  adminReplyText.value = ticket.adminReply || ''; 
};

const submitReply = async () => {
  if (!adminReplyText.value.trim()) {
    toast.warning('Please enter reply content!');
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/tickets/${selectedTicket.value._id}/reply`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminReply: adminReplyText.value })
    });

    if (res.ok) {
      toast.success('Reply sent successfully!');
      document.getElementById('closeReplyModal').click(); 
      loadAllTickets(); 
    } else {
      toast.error('An error occurred while saving the reply.');
    }
  } catch (error) {
    toast.error('Server error.');
  }
};

const getTicketBadgeClass = (status) => {
  if (status === 'Open') return 'badge bg-warning text-dark px-2 py-1';
  if (status === 'Answered') return 'badge bg-success px-2 py-1';
  return 'badge bg-secondary px-2 py-1';
};

onMounted(() => {
  loadAllTickets();
});
</script>