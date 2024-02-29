<template>
  <div
    class="min-h-screen flex-col flex font-mukta bg-repeat bg-cover bg-[url('/img/background.png')]"
  >
    <TheSidebar></TheSidebar>
    <div class="flex justify-center items-center">
      <div
        class="C w-full md:w-10/12 h-full mb-5 p-8 bg-white rounded-lg shadow-md relative mt-5"
      >
        <h1
          class="text-3xl font-semibold text-blue-600 mb-4 flex justify-center"
        >
          Adicionar Rotina
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
          <div
            v-for="(dia, index) in diasSemana"
            :key="index"
            class="border p-4 rounded shadow-md"
          >
            <h2 class="text-lg font-semibold mb-2">{{ dia }}</h2>
            <div v-if="rotinasDia[index].length" class="mt-2">
              <div
                v-for="(rotina, rotinaIndex) in rotinasDia[index]"
                :key="rotinaIndex"
                class="bg-blue-100 p-2 rounded mb-2"
              >
                <div class="flex justify-between items-center">
                  <div>{{ rotina.hora }} - {{ rotina.descricao }}</div>
                  <button
                    @click="removerRotina(index, rotinaIndex)"
                    class="text-red-600 hover:text-red-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15 10a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2h10zM7.293 6.293a1 1 0 1 1 1.414-1.414L10 8.586l1.293-1.293a1 1 0 1 1 1.414 1.414L11.414 10l1.293 1.293a1 1 0 1 1-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 1 1-1.414-1.414L8.586 10 7.293 8.707a1 1 0 0 1 0-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="flex justify-center items-center mt-2">
              <button
                @click="mostrarPrompt(index)"
                class="text-red-600 hover:text-green-900"
              >
                Adicionar Rotina
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="bg-white p-8 rounded-lg shadow-md w-4/5 md:w-1/3">
        <h2 class="text-lg font-semibold mb-4">Adicionar Rotina</h2>
        <input
          v-model="hora"
          type="text"
          placeholder="Horário (HH:MM)"
          class="w-full p-2 border rounded mb-2"
        />
        <textarea
          v-model="descricao"
          placeholder="Descrição da Rotina"
          class="w-full p-2 border rounded"
        ></textarea>
        <div class="flex justify-end mt-4">
          <button
            @click="adicionarRotinaPrompt"
            class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Adicionar
          </button>
          <button @click="fecharModal" class="text-gray-600 ml-2">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheSidebar from "../components/TheSidebar.vue";

const diasSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

const rotinasDia = ref(
  JSON.parse(localStorage.getItem("rotinas")) ||
    Array.from({ length: diasSemana.length }, () => [])
);

let hora = "00:00";
let descricao = "";
let diaIndex = -1;

const showModal = ref(false);

const mostrarPrompt = (index) => {
  diaIndex = index;
  hora = "00:00";
  descricao = "";
  showModal.value = true;
};

const adicionarRotinaPrompt = () => {
  if (descricao.trim() !== "") {
    rotinasDia.value[diaIndex].push({ hora, descricao });
    salvarRotinas();
    fecharModal();
  }
};

const removerRotina = (diaIndex, rotinaIndex) => {
  rotinasDia.value[diaIndex].splice(rotinaIndex, 1);
  salvarRotinas();
};

const salvarRotinas = () => {
  localStorage.setItem("rotinas", JSON.stringify(rotinasDia.value));
};

const fecharModal = () => {
  showModal.value = false;
};
</script>
<style scoped>
@media (max-width: 800px) {
  .C {
    width: 90%;
  }
}
</style>
