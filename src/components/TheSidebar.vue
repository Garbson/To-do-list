<template>
  <div class="bg-gradient-to-r from-blue-600 to-indigo-500">
    <button
      v-if="!isSidebarOpen"
      class="sidebar-toggle"
      @click="toggleSidebar"
    ></button>
    <aside
      :class="{
        'sidebar-open': isSidebarOpen,
        'sidebar-close': !isSidebarOpen,
      }"
    >
      <div class="sidebar-card space-x-7">
        <nav class="flex justify-center items-center p-7">
          <RouterLink
            to="/todolist"
            @click="closeSidebar"
            class="text-white hover:text-orange-500 text-lg"
            >Adcionar Tarefa</RouterLink
            
          >

          <RouterLink
            to="/tarefas"
            @click="closeSidebar"
            class="text-white hover:text-orange-500 text-lg"
            >Visualizar Tarefas</RouterLink
          >
        </nav>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>

<style scoped>
.sidebar-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  top: 0;
  right: 0;
  position: absolute;
}

.sidebar-open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Azul com transparência */
  transition: all 0.8s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; /* Z-index elevado para garantir que esteja na frente */
}

.sidebar-card {
  /* Azul padrão */
  padding: 10px;
  border-radius: 0; /* Sem bordas arredondadas */
  box-shadow: none; /* Sem sombreamento */
  position: relative;
  z-index: 5; /* Z-index para garantir que esteja acima do conteúdo */
}

nav {
  display: flex;
  flex-direction: row; /* Alterado para uma linha */
  gap: 10px; /* Espaçamento entre os links */
}

nav a {
  color: #fff; /* Texto branco */
  font-weight: bold;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline; /* Sublinhar no hover */
}

.menu {
  width: 20px;
  height: 20px;
}
</style>
