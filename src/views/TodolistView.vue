<template>
  <div
    class="min-h-screen flex-col flex font-mukta bg-repeat bg-cover bg-[url('/img/background.jpg')]"
  >
    <TheSidebar></TheSidebar>
    <div class="flex justify-center items-center my-20">
      <div
        class="max-w-xl w-11/12 h-2/5 mb-5 p-8 bg-white rounded-lg shadow-md relative"
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
            class="w-full p-4 border rounded shadow-md"
            placeholder="Adicionar nova tarefa"
          />
        </div>
        <!-- Ajustado o grid para telas menores -->
        
        <div class="mb-4 flex items-center q-col-gutter-sm">
          <!-- Utilizando componentes de data e hora do Quasar -->
          <q-input filled class="w-1/2 " v-model="novaTarefa.data" mask="date" :rules="['date']">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="novaTarefa.data">
                    <div class="row items-center justify-start">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          
          <q-input filled class="w-1/2" v-model="novaTarefa.hora" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="novaTarefa.hora">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
        </div>

        <!-- adcionar tarefa -->
        <div class="mb-4 text-center">
          <button
            @click="adicionarTarefa"
            class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm "
          >
            Adicionar Tarefa
          </button>
        </div>

        <!-- Prompt -->
        <div id="custom-alert" v-if="showPrompt">
          <div class="card">
            <p>
              A tarefa foi adicionada com sucesso,<br />Click em 
              visualizar Tarefas!
            </p>
            <button @click="fecharPrompt" class="text-sm">Fechar</button>
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
const showPrompt = ref(false);

const fecharPrompt = () => {
  showPrompt.value = false;
};

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
    showPrompt.value = true;
    setTimeout(() => {
      showPrompt.value = false;
    }, 6000);
  }
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
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.card button:hover {
  background-color: #0056b3;
}
@media (max-width: 800px) {
  .card {
    width: 90%;
  }
}
</style>
