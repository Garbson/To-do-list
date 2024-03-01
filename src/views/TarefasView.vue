<template>
  <div class="min-h-screen flex-col flex font-mukta bg-repeat bg-cover bg-[url('/img/background.png')]">
    <TheSidebar></TheSidebar>
    <div class="flex justify-center items-center">
      <div class="a w-10/12 h-full mb-5 p-8 bg-white rounded-lg shadow-md relative mt-5">
        <h1 class="text-3xl font-semibold text-blue-600 mb-4 flex justify-center">
          Quadro de Tarefas
        </h1>
        <!-- Tarefas em forma de quadro -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4"> <!-- Ajustado o grid para telas menores -->
          <div v-for="(tarefa, index) in tarefas" :key="index" class="p-4 border rounded-md w-[90%] flex flex-col items-start relative">
            <p :class="{ 'line-through': tarefa.concluida }" class="break-words">{{ tarefa.texto }}</p>
            <label v-if="tarefa.data" class="mr-2">
              <i class="fas fa-calendar-alt"></i> {{ tarefa.data }}
            </label>
            <label v-if="tarefa.hora">
              <i class="fas fa-clock"></i> {{ tarefa.hora }}
            </label>
            <div class="absolute bottom-4 right-4">
              <!-- Ícone para marcar como concluída -->
              <button @click="marcarComoConcluida(index)" class="text-green-600">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </button>
              <!-- Ícone para excluir tarefa -->
              <button @click="removerTarefa(index)" class="text-red-600 ml-2">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Modal para confirmar a adição de tarefa -->
        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <span @click="showModal = false" class="close">&times;</span>
            <p>Tarefa adicionada com sucesso!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import TheSidebar from '../components/TheSidebar.vue';

const tarefas = ref([]);
const showModal = ref(false); // Variável reativa para controlar a exibição do modal

const carregarTarefasDoLocalStorage = () => {
  const tarefasSalvas = localStorage.getItem('tarefas');
  if (tarefasSalvas) {
    tarefas.value = JSON.parse(tarefasSalvas);
  }
};
const marcarComoConcluida = (index) => {
  tarefas.value[index].concluida = true;
  salvarTarefasNoLocalStorage();
};

const removerTarefa = (index) => {
  tarefas.value.splice(index, 1);
  salvarTarefasNoLocalStorage();
};

const salvarTarefasNoLocalStorage = () => {
  localStorage.setItem('tarefas', JSON.stringify(tarefas.value));
};

onMounted(() => {
  carregarTarefasDoLocalStorage();
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}

</style>
