<template>
    <div class="min-h-screen flex-col flex font-mukta bg-repeat bg-cover bg-[url('/img/background.png')]">
      <TheSidebar></TheSidebar>
      <div class="flex justify-center items-center">
        <div class="max-w-lg w-11/12 h-full mb-5 p-8 bg-white rounded-lg shadow-md relative mt-5">
          <h1 class="text-3xl font-semibold text-blue-600 mb-4 flex justify-center">
            Lista de Viagens
          </h1>
          <div class="mb-4">
            <input
              v-model="novaViagem.destino"
              class="w-full p-2 border rounded shadow-md"
              placeholder="Destino"
            />
          </div>
          <div class="mb-4">
            <textarea
              v-model="novaViagem.descricao"
              class="w-full p-2 border rounded shadow-md"
              placeholder="Descrição da Viagem"
            ></textarea>
          </div>
          <div class="mb-4">
            <label>Data de Partida:</label>
            <input
              type="date"
              v-model="novaViagem.dataPartida"
              class="w-full p-2 border rounded shadow-md"
            />
          </div>
          <div class="mb-4">
            <label>Data de Retorno:</label>
            <input
              type="date"
              v-model="novaViagem.dataRetorno"
              class="w-full p-2 border rounded shadow-md"
            />
          </div>
          <div class="mb-4">
            <button
              @click="adicionarViagem"
              class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Adicionar Viagem
            </button>
          </div>
          <div class="viagens" :style="{ 'max-height': cardHeight + 'px' }">
            <div
              class="viagens-content"
              :style="{
                'max-height': cardHeight - 100 + 'px',
                'overflow-y': maxHeightReached ? 'auto' : 'visible',
              }"
            >
              <div
                v-for="(viagem, index) in viagens"
                :key="index"
                class="mb-4 border p-4 rounded shadow-md"
              >
                <h2 class="text-xl font-semibold text-blue-600">
                  Destino: {{ viagem.destino }}
                </h2>
                <p><strong>Descrição: </strong>{{ viagem.descricao }}</p>
                <p><strong>Data de Partida:</strong> {{ viagem.dataPartida }}</p>
                <p><strong>Data de Retorno:</strong> {{ viagem.dataRetorno }}</p>
                <button
                  @click="removerViagem(index)"
                  class="bg-red-600 text-white py-1 px-2 mt-2 rounded hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import TheSidebar from "../components/TheSidebar.vue";
  
  const novaViagem = ref({
    destino: "",
    descricao: "",
    dataPartida: "",
    dataRetorno: "",
  });
  
  const viagens = ref([]);
  
  const adicionarViagem = () => {
    viagens.value.push({ ...novaViagem.value });
    novaViagem.value = {
      destino: "",
      descricao: "",
      dataPartida: "",
      dataRetorno: "",
    };
    salvarViagensNoLocalStorage();
  };
  
  const removerViagem = (index) => {
    viagens.value.splice(index, 1);
    salvarViagensNoLocalStorage();
  };
  
  const salvarViagensNoLocalStorage = () => {
    localStorage.setItem("viagens", JSON.stringify(viagens.value));
  };
  
  const carregarViagensDoLocalStorage = () => {
    const viagensSalvas = localStorage.getItem("viagens");
    if (viagensSalvas) {
      viagens.value = JSON.parse(viagensSalvas);
    }
  };
  
  onMounted(() => {
    carregarViagensDoLocalStorage();
  });
  
  // Calcula a altura máxima com base na altura da janela
  const cardHeight = computed(() => window.innerHeight - 200); // Ajuste conforme necessário
  const maxHeightReached = computed(
    () => cardHeight.value - 100 <= viagens.value.length * 150
  ); // 150px é a altura estimada de cada item
  </script>
  