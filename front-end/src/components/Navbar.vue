<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/">
        <i class="fas fa-headset text-primary me-2"></i> IT HELPDESK
      </RouterLink>
      
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>

          <li class="nav-item" v-if="isLoggedIn && (userRole == 'admin' || userRole == 'staff')">
            <RouterLink class="nav-link text-success fw-bold" to="/quiz">
              <i class="fas fa-graduation-cap me-1"></i> Quiz
            </RouterLink>
          </li>
          
          <li class="nav-item" v-if="isLoggedIn && userRole === 'admin'">
            <RouterLink class="nav-link text-warning" to="/admin-dashboard">
              <i class="fas fa-shield-alt me-1"></i> Admin Dashboard
            </RouterLink>
          </li>
          
          <li class="nav-item" v-if="isLoggedIn && userRole !== 'admin'">
            <RouterLink class="nav-link text-info" to="/user-dashboard">
              <i class="fas fa-ticket-alt me-1"></i> My Requests
            </RouterLink>
          </li>
        </ul>

        <ul class="navbar-nav align-items-center">
          
          <li class="nav-item" v-if="!isLoggedIn">
            <RouterLink class="btn btn-primary fw-bold px-4 rounded-pill" to="/login">
              <i class="fas fa-sign-in-alt me-1"></i> Login
            </RouterLink>
          </li>
          
          <li class="nav-item position-relative" v-if="isLoggedIn">
            <button @click="toggleDropdown" class="btn btn-link nav-link text-white fw-semibold text-decoration-none d-flex align-items-center">
              <i class="fas fa-user-circle fa-lg me-2 text-success"></i> 
              {{ username }}
              <i class="fas fa-chevron-down ms-2" style="font-size: 0.8em;"></i>
            </button>

            <ul v-if="showDropdown" class="dropdown-menu dropdown-menu-end show position-absolute shadow border-0 mt-1" style="right: 0;">
              <li>
                <a class="dropdown-item text-danger fw-bold cursor-pointer" @click.prevent="handleLogout">
                  <i class="fas fa-sign-out-alt me-2"></i> Logout
                </a>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const route = useRoute();
const router = useRouter();

const isLoggedIn = ref(false);
const userRole = ref('');
const username = ref('');
const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const checkLoginState = () => {
  isLoggedIn.value = !!localStorage.getItem('username');
  userRole.value = localStorage.getItem('userRole') || '';
  username.value = localStorage.getItem('username') || '';
};

onMounted(() => checkLoginState());
watch(route, () => checkLoginState());

const handleLogout = () => {
  localStorage.clear();
  checkLoginState();
  showDropdown.value = false;
  
  toast.info('You have logged out of the system.');
  router.push('/');
};
</script>