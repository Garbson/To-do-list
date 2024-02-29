<template>
  <div
    class="min-h-screen flex-col flex font-mukta bg-repeat bg-cover bg-[url('/img/background.png')] text-center items-center object-center justify-center"
  >
    <div
      class="Card bg-gradient-to-r from-orange-500 to-indigo-500 w-2/5 flex items-center justify-center flex-col flex-wrap  p-4 rounded-lg mt-5 mb-5"
    >
    <p class="text-white text-4xl font-thin mb-5">Seja bem-vindo</p>

      <label for="emailCadastro" class="text-white text-xl font-thin"
        >Email:</label
      >
      <div class="inp bg-white w-2/3 mx-auto h-10 rounded-lg mb-5">
        <input
          type="email"
          id="emailCadastro"
          v-model="user.email"
          placeholder="Digite seu email"
          class="w-full h-full p-2 rounded-lg"
        />
      </div>
      <label for="senhaCadastro" class="text-white text-xl font-thin "
        >Senha:</label
      >
      <div class="inp bg-white w-2/3 mx-auto h-10 rounded-lg mb-5">
        <input
          type="password"
          id="senhaCadastro"
          v-model="user.senha"
          placeholder="Crie uma senha"
          class="w-full h-full p-2 rounded-lg"
        />
      </div>
      <label for="confirmarSenha" class="text-white text-xl font-thin"
        >Confirmar Senha:</label
      >
      <div class="inp bg-white w-2/3 mx-auto h-10 rounded-lg">
        <input
          type="password"
          id="confirmarSenha"
          v-model="confirmarSenha"
          placeholder="Confirme sua senha"
          class="w-full h-full p-2 rounded-lg"
        />
      </div>
      <button
        class="E bg-indigo-600 hover:bg-indigo-700 text-white w-1/5 font-thin py-2  mx-auto px-4 rounded-lg mt-2"
        @click="cadastrarUsuario"
      >
        Cadastrar
      </button>
      <p class="text-white">
        Já tem uma conta?
        <router-link to="/" class="text-red-900  font-bold"
          >Faça login</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/index.js";

const user = {
  email: "",
  senha: "",
};

let confirmarSenha = "";

function cadastrarUsuario() {
  if (validarCampos()) {
    // Armazenar o novo usuário no Local Storage
    const usuariosCadastrados =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    usuariosCadastrados.push(user);
    localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));

    // Redirecionar para a página de login após o cadastro bem-sucedido
    router.push("/");
  }
}

function validarCampos() {
  if (!user.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    alert("Email inválido. Insira um email válido.");
    return false;
  }

  if (user.senha !== confirmarSenha) {
    alert("As senhas não coincidem. Por favor, verifique.");
    return false;
  }

  return true;
}
</script>
<style scoped>
@media (max-width: 800px){
  .Card{
    width: 80%;
  }
  .inp{
    width: 90%;
    }
    .E{
      width: 50%;
    }

}
</style>
