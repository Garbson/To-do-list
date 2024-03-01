<template>
  <div
    class="min-h-screen flex-col flex font-mukta bg-repeat bg-cover bg-[url('/img/background.png')] text-center items-center object-center justify-center"
  >
    <div
      class="Card bg-gradient-to-r from-orange-500 to-indigo-500 w-2/5 flex flex-col p-5 mt-5 mb-5 rounded-xl"
    >
      <!--boas-vindas -->
      <p class="text-white text-4xl font-thin mb-5">Seja bem-vindo</p>

      <!-- Card de Login -->
      <div
        class="flex flex-col content-center rounded-xl text-center justify-center"
        v-if="!isCadastro"
      >
        <label for="email" class="text-white text-xl font-thin">Email:</label>
        <div class="inp bg-white w-2/3 h-10 rounded-lg mb-5 mx-auto">
          <input
            type="email"
            id="email"
            v-model="user.email"
            placeholder="Digite seu email"
            class="w-full h-full p-2 rounded-lg font-thin"
          />
        </div>
        <label for="senha" class="text-white text-xl font-thin">Senha:</label>
        <div class="inp bg-white w-2/3 h-10 rounded-lg mb-2 mx-auto">
          <input
            type="password"
            id="senha"
            v-model="user.senha"
            placeholder="Digite sua senha"
            class="w-full h-full p-2 rounded-lg font-thin"
          />
        </div>
        <div class="flex flex-col">
          <button
            class="E bg-indigo-600 hover:bg-indigo-700 w-1/5 sm:w-2/5 mx-auto text-white font-thin py-1 px-1 rounded-lg mt-2"
            @click="fazerLogin"
          >
            Entrar
          </button>

          <p class="text-white mt-3">
            Ainda não tem cadastro?
            <router-link to="/registro" class="text-red-900 font-mono font-thin"
              >Crie uma conta</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router/index.js";

const isCadastro = ref(false);
const user = {
  email: "",
  senha: "",
};

function fazerLogin() {
  const usuariosCadastrados =
    JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioEncontrado = usuariosCadastrados.find(
    (u) => u.email === user.email && u.senha === user.senha
  );

  if (usuarioEncontrado) {
    localStorage.setItem("user", JSON.stringify(usuarioEncontrado));

    localStorage.setItem("auth", "true");

    router.push("/todolist");
  } else {
    alert("Credenciais incorretas. Tente novamente.");
  }
}
</script>
<style scoped>
@media (max-width: 800px) {
  .Card {
    width: 80%;
  }
  .inp {
    width: 90%;
  }
  .E {
    width: 50%;
  }
}
</style>
