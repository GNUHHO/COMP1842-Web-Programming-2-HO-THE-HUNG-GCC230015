<template>
  <div class="card shadow-sm border-0">
    <div class="card-header bg-primary text-white fw-bold py-3">
      <i class="fas fa-paper-plane me-2"></i> New Support Request
    </div>
    <div class="card-body p-4">
      <form @submit.prevent="submitTicket">
        <div class="mb-3">
          <label class="form-label fw-semibold">What issue are you facing?</label>
          <input v-model="ticketForm.subject" type="text" class="form-control" placeholder="Example: Printer jammed" required>
        </div>
        <div class="mb-4">
          <label class="form-label fw-semibold">Detailed Description</label>
          <textarea v-model="ticketForm.description" class="form-control" rows="4" placeholder="Please describe the issue you're experiencing..." required></textarea>
        </div>
        <button type="submit" class="btn btn-primary w-100 fw-bold">Submit Request</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

// define emit for parent-child communication (to notify parent when a new ticket is created)
const emit = defineEmits(['ticket-created']);

const ticketForm = ref({ subject: '', description: '' });

const submitTicket = async () => {
  const currentUserId = localStorage.getItem('userId');
  const currentUsername = localStorage.getItem('username');

  try {
    const payload = {
      userId: currentUserId,
      username: currentUsername,
      subject: ticketForm.value.subject,
      description: ticketForm.value.description
    };

    const res = await fetch('http://localhost:3000/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      toast.success('Ticket submitted successfully!');
      ticketForm.value = { subject: '', description: '' }; // Clear form
      
      emit('ticket-created'); 
    } else {
      const errData = await res.json();
      toast.error('Failed to submit ticket: ' + errData.message);
    }
  } catch (error) {
    toast.error('Server error.');
  }
};
</script>