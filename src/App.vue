<script setup>
import { ref, reactive } from 'vue'
import Alerta from './components/Alerta.vue'
import Spinner from './components/Spinner.vue';
import Cotizacion from './components/Cotizacion.vue';

import useCripto from './composables/useCripto'

const {monedas, criptomonedas, obtenerCotizacion, cotizacion, isLoading, mostrarResultado} = useCripto()

const cotizar = reactive({
  moneda: '',
  criptomoneda: ''
})
const error = ref('')

const cotizarCripto = () => {
  error.value = ''
  if(Object.values(cotizar).includes('')){
    error.value = 'Todos los campos son obligatorios'
    return;
  }
  obtenerCotizacion(cotizar)
}


</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">
        {{ error }}
      </Alerta>
      <form @submit.prevent="cotizarCripto" class="formulario">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select v-model="cotizar.moneda" id="moneda">
            <option value="">-- Selecciona --</option>
            <option v-for="moneda in monedas" :key="moneda.codigo" :value="moneda.codigo">{{ moneda.texto }}</option>
          </select>
        </div>

        <div class="campo">
          <label for="cripto">Criptomoneda:</label>
          <select v-model="cotizar.criptomoneda" id="cripto">
            <option value="">-- Selecciona --</option>
            <option v-for="criptomoneda in criptomonedas" :key="criptomoneda.CoinInfo.Id" :value="criptomoneda.CoinInfo.Name">{{ criptomoneda.CoinInfo.FullName }}</option>
          </select>
        </div>

        <input type="submit" value="Cotizar" />
      </form>

      <Spinner v-if="isLoading" />

      <Cotizacion :cotizacion="cotizacion"  v-if="mostrarResultado"/>
      
    </div>
  </div>
</template>


