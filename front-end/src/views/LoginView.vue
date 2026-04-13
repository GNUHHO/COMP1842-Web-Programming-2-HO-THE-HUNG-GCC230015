<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
          <div class="card-header bg-dark text-white text-center py-4">
            <h3 class="fw-bold mb-0">{{ isRegistering ? 'Create New Account' : 'Login to System' }}</h3>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="handleSubmit">
              
              <div class="mb-3">
                <label class="form-label fw-semibold">Username</label>
                <div class="input-group">
                  <span class="input-group-text bg-light"><i class="fas fa-user"></i></span>
                  <input v-model="formData.username" type="text" class="form-control" required placeholder="Enter username...">
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-semibold">Password</label>
                <div class="input-group">
                  <span class="input-group-text bg-light"><i class="fas fa-lock"></i></span>
                  <input v-model="formData.password" type="password" class="form-control" required placeholder="Enter password...">
                </div>
              </div>

              <input v-if="isRegistering" type="hidden" v-model="formData.role" value="user">

              <button type="submit" class="btn btn-primary w-100 fw-bold py-2 mb-3">
                {{ isRegistering ? 'Sign Up Now' : 'Login' }}
              </button>

            </form>

            <div class="text-center mt-3 border-top pt-3">
              <p class="text-muted mb-0">
                {{ isRegistering ? 'Already have an account?' : 'Don\'t have an account?' }}
                <a href="#" @click.prevent="toggleMode" class="text-primary fw-bold text-decoration-none">
                  {{ isRegistering ? 'Login here' : 'Sign up now' }}
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const isRegistering = ref(false);
const formData = ref({ username: '', password: '', role: 'user' });

const toggleMode = () => {
  isRegistering.value = !isRegistering.value;
  formData.value = { username: '', password: '', role: 'user' };
};

const handleSubmit = async () => {
  const endpoint = isRegistering.value ? 'register' : 'login';
  
  try {
    const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    });

    const data = await res.json();

    if (res.ok) {
      if (isRegistering.value) {
        toast.success('Account created successfully! Please log in.');
        toggleMode();
      } else {
        toast.success(`Welcome back, ${data.username}!`);
        
        // store user info in localStorage for session management
        localStorage.setItem('username', data.username);
        localStorage.setItem('userRole', data.role);
        
        // use user ID for future API calls (if needed)
        localStorage.setItem('userId', data._id || data.username); 

        // redirect based on user role
        if (data.role === 'admin') {
          router.push('/admin-dashboard');
        } else {
          router.push('/');
        }
      }
    } else {
      toast.error(data.message || 'An error occurred!');
    }
  } catch (error) {
    toast.error('Unable to connect to the server.');
  }
};
</script>