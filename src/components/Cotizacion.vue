<script setup>
  defineProps({
    cotizacion: {
      type: Object,
      required: true
    }
  })

</script>

<template>
  <div class="contenedor-resultado">
    <h2>Cotización</h2>

    <div class="resultado">
      <img
        :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL"
        alt="imagen cripto"
      />
      <div>
        <p>
          Precio actual: <span>{{ cotizacion.PRICE }}</span>
        </p>
        <p>
          Precio más alto del día: <span>{{ cotizacion.HIGHDAY }}</span>
        </p>
        <p>
          Precio más bajo del día: <span>{{ cotizacion.LOWDAY }}</span>
        </p>
        <p>
          Últimas 24 hrs: <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span>
        </p>
        <p>
          Última actualización: <span>{{ cotizacion.LASTUPDATE }}</span>
        </p>
      </div>
    </div>
  </div>
</template>


