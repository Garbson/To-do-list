<template>
    <div
      class="min-h-screen flex-col flex font-mukta bg-repeat bg-cover bg-[url('/img/background.png')]"
    >
      <TheSidebar></TheSidebar>
      <div class="flex justify-center items-center">
        <div
          class="max-w-lg w-11/12 h-full mb-5 p-8 bg-white rounded-lg shadow-md relative mt-5"
        >
          <h1
            class="text-3xl font-semibold text-blue-600 mb-4 flex justify-center"
          >
            To Do List
          </h1>
          <!-- Input fields for task -->
          <div class="mb-4">
            <input
              v-model="novaTarefa.texto"
              @keyup.enter="adicionarTarefa"
              class="w-full p-2 border rounded shadow-md"
              placeholder="Adicionar nova tarefa"
            />
          </div>
          <div class="mb-4">
            <input
              v-model="novaTarefa.data"
              type="date"
              class="w-full p-2 border rounded shadow-md"
            />
          </div>
          <div class="mb-4">
            <input
              v-model="novaTarefa.hora"
              type="time"
              class="w-full p-2 border rounded shadow-md"
            />
          </div>
          <!-- Button to add task -->
          <div class="mb-4 relative">
            <button
              @click="adicionarTarefa"
              class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Adicionar Tarefa
            </button>
          </div>
          <!-- Task lists -->
          <div class="viagens" :style="{ 'max-height': cardHeight + 'px' }">
            <!-- Tarefas não concluídas -->
            <div class="viagens-content" v-if="tarefasNaoConcluidas.length > 0">
              <h2 class="text-xl font-semibold mb-2">Tarefas Não Concluídas</h2>
              <table class="w-full">
                <tr v-for="(tarefa, index) in tarefasNaoConcluidas" :key="index">
                  <td>{{ tarefa.texto }}</td>
                  <td v-if="tarefa.data">{{ tarefa.data }}</td>
                  <td v-if="tarefa.hora">{{ tarefa.hora }}</td>
                  <td>
                    <button
                      @click="toggleConcluida(index)"
                      class="text-green-600 mr-2"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <button @click="removerTarefa(index)" class="text-red-600">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </table>
            </div>
            <!-- Prompt -->
            <div id="custom-alert" v-if="showPrompt">
              <div class="card">
                <p>A tarefa foi adicionada com sucesso,<br>Click em tarefas para visualizar!</p>
                <button @click="fecharPrompt">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </template>
<script setup>
import { ref, onMounted } from "vue";
import TheSidebar from "../components/TheSidebar.vue";

const novaTarefa = ref({
  texto: "",
  data: "",
  hora: "",
  concluida: false,
});
const tarefas = ref([]);

// Definir a variável reativa para controlar a exibição do prompt
const showPrompt = ref(false);

// Função para fechar o prompt
const fecharPrompt = () => {
  showPrompt.value = false;
};

// Função para adicionar uma nova tarefa
const adicionarTarefa = () => {
  if (novaTarefa.value.texto.trim() !== "") {
    tarefas.value.push({ ...novaTarefa.value });
    novaTarefa.value = { texto: "", data: "", hora: "", concluida: false };
    salvarTarefasNoLocalStorage();
    if (tarefas.value.length >= 3) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      });
    }
    // Exibir o prompt
    showPrompt.value = true;
    // Fechar o prompt após alguns segundos
    setTimeout(() => {
      showPrompt.value = false;
      
    }, 6000);
  }
};

const removerTarefa = (index) => {
  tarefas.value.splice(index, 1);
  salvarTarefasNoLocalStorage();
};

const toggleConcluida = (index) => {
  tarefas.value[index].concluida = !tarefas.value[index].concluida;
  salvarTarefasNoLocalStorage();
};

const salvarTarefasNoLocalStorage = () => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas.value));
};

const carregarTarefasDoLocalStorage = () => {
  const tarefasSalvas = localStorage.getItem("tarefas");
  if (tarefasSalvas) {
    tarefas.value = JSON.parse(tarefasSalvas);
  }
};

onMounted(() => {
  carregarTarefasDoLocalStorage();
});

// Calcula a altura máxima com base na altura da janela
const cardHeight = window.innerHeight - 200; // Ajuste conforme necessário

// Filtra tarefas concluídas e não concluídas
const tarefasConcluidas = ref([]);
const tarefasNaoConcluidas = ref([]);

// Atualiza tarefas concluídas e não concluídas sempre que houver uma mudança nas tarefas
const updateTarefas = () => {
  tarefasConcluidas.value = tarefas.value.filter((tarefa) => tarefa.concluida);
  tarefasNaoConcluidas.value = tarefas.value.filter(
    (tarefa) => !tarefa.concluida
  );
};
updateTarefas();
</script>

<style scoped>

#custom-alert {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.card button:hover {
  background-color: #0056b3;
}

/* Estilos para o botão de fechar */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Estilos para responsividade */
</style>
