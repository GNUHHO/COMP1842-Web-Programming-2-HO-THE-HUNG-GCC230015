<template>
  <div>
    <Navbar />

    <main class="min-vh-100">
      <RouterView />
    </main>
    
    <footer class="bg-dark text-white text-center py-3 mt-auto">
      <small>© 2026 Copyright belongs to Hybrid IT Helpdesk Systems.</small>
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>