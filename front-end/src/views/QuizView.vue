<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-9">
        <div class="card shadow-lg border-0 rounded-lg">
          <div class="card-header bg-primary text-white text-center py-4">
            <h3 class="fw-bold mb-0"><i class="fas fa-brain me-2"></i> Internal Knowledge Test</h3>
            <p class="mb-0 mt-2 text-white-50">Data is automatically fetched from the Solution Library</p>
          </div>
          
          <div class="card-body p-4 p-md-5">
            
            <div v-if="isLoading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status"></div>
              <p class="mt-3 text-muted">Analyzing the Solution Library and generating a random quiz...</p>
            </div>

            <div v-else-if="notEnoughData" class="text-center py-5">
              <i class="fas fa-database fa-4x text-secondary mb-3"></i>
              <h4 class="fw-bold text-dark">Not enough data to create a quiz!</h4>
              <p class="text-muted">The system needs at least <strong>4 articles</strong> in the Solution Library to generate 4 options (A, B, C, D). Please ask the Admin to write more articles!</p>
              <RouterLink to="/" class="btn btn-primary mt-2">Back to Home</RouterLink>
            </div>

            <div v-else-if="showResult" class="text-center py-4">
              <i class="fas fa-trophy fa-4x text-warning mb-3"></i>
              <h3 class="fw-bold text-success">Quiz Completed!</h3>
              <p class="lead">Your Score: <strong class="text-primary fs-3">{{ score }} / {{ questions.length }}</strong></p>
              
              <div class="alert mt-4" :class="score === questions.length ? 'alert-success' : 'alert-warning'">
                {{ score === questions.length ? 'Excellent work! You have a great understanding of the company processes.' : 'You should read more articles in the Solution Library!' }}
              </div>
              
              <button @click="generateQuiz" class="btn btn-outline-primary mt-3 fw-bold px-4 rounded-pill">
                <i class="fas fa-random me-1"></i> Shuffle Questions and Try Again
              </button>
            </div>

            <div v-else>
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="fw-bold text-secondary">Question {{ currentQuestionIndex + 1 }} / {{ questions.length }}</h5>
                <span class="badge bg-info text-dark">Current Score: {{ score }}</span>
              </div>

              <div class="progress mb-4" style="height: 10px;">
                <div class="progress-bar bg-success" :style="{ width: progressPercentage + '%' }"></div>
              </div>

              <h4 class="fw-bold mb-4 text-dark lh-base">{{ currentQuestion.question }}</h4>

              <div class="d-grid gap-3">
                <button 
                  v-for="(option, index) in currentQuestion.options" 
                  :key="index"
                  @click="selectOption(index)"
                  class="btn btn-outline-secondary text-start py-3 px-4 fw-medium rounded-3 option-btn"
                >
                  <span class="me-3 fw-bold text-primary fs-5">{{ String.fromCharCode(65 + index) }}.</span> 
                  <span>{{ option }}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '../helpers/api'; // Import API helper for making requests to the backend

const isLoading = ref(true);
const notEnoughData = ref(false);
const questions = ref([]);
const currentQuestionIndex = ref(0);
const score = ref(0);
const showResult = ref(false);

// function to strip HTML tags and shorten the text for quiz options
const stripHtmlAndShorten = (html) => {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  let text = tmp.textContent || tmp.innerText || "";
  
  // shorten to 150 characters for better display in quiz options
  if (text.length > 150) {
    return text.substring(0, 150) + '...';
  }
  return text;
};

// function to generate quiz questions based on articles in the database
const generateQuiz = async () => {
  isLoading.value = true;
  notEnoughData.value = false;
  showResult.value = false;
  currentQuestionIndex.value = 0;
  score.value = 0;

  try {
    // Fetch all articles from the backend
    const articles = await api.getResponses();

    // Check if there are at least 4 articles to create a quiz
    if (articles.length < 4) {
      notEnoughData.value = true;
      isLoading.value = false;
      return;
    }

    const generatedQuestions = [];
    // Decide how many questions to generate (up to 5 or total number of articles if less than 5)
    const numQuestions = Math.min(5, articles.length);

    // Shuffle the articles to get random ones for the quiz
    const shuffledArticles = [...articles].sort(() => 0.5 - Math.random());

    // For each question, take one correct article and 3 wrong articles to create options
    for (let i = 0; i < numQuestions; i++) {
      const correctArticle = shuffledArticles[i];

      // find 3 wrong articles (different from the correct one)
      const wrongArticles = articles
        .filter(a => a._id !== correctArticle._id) // Shuffle and take 3
        .sort(() => 0.5 - Math.random()) // shuffle the wrong articles
        .slice(0, 3); // take the first 3 as wrong options

      // Create an array of options and shuffle it so the correct answer is in a random position
      const options = [
        stripHtmlAndShorten(correctArticle.value),
        ...wrongArticles.map(a => stripHtmlAndShorten(a.value))
      ].sort(() => 0.5 - Math.random());

      // Find the index of the correct answer in the options array
      const answerIndex = options.findIndex(opt => opt === stripHtmlAndShorten(correctArticle.value));

      // Add the generated question to the list of questions
      generatedQuestions.push({
        question: `If a user encounters a problem related to [${correctArticle.key}], what is the standard troubleshooting procedure?`,
        options: options,
        answer: answerIndex
      });
    }

    questions.value = generatedQuestions;
  } catch (error) {
    console.error("Error generating quiz:", error);
  } finally {
    isLoading.value = false;
  }
};

// f
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const progressPercentage = computed(() => (currentQuestionIndex.value / questions.value.length) * 100);

const selectOption = (selectedIndex) => {
  if (selectedIndex === currentQuestion.value.answer) {
    score.value++;
  }
  
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    showResult.value = true;
  }
};

// generate quiz when component is mounted
onMounted(() => {
  generateQuiz();
});
</script>

<style scoped>
.option-btn {
  transition: all 0.2s ease;
  border-width: 1px;
  line-height: 1.5;
}
.option-btn:hover {
  background-color: #f0f7ff;
  border-color: #0d6efd;
  color: #0d6efd;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}
</style>