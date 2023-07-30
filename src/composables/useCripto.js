import { ref, onMounted, computed } from 'vue';

export default function useCripto() {
  const monedas = ref([
    { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', texto: 'Peso Mexicano' },
    { codigo: 'EUR', texto: 'Euro' },
    { codigo: 'GBP', texto: 'Libra Esterlina' },
  ])

  const criptomonedas = ref([])

  const cotizacion = ref({})
  const isLoading = ref(false)


  onMounted(() => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    fetch(url)
      .then( res => res.json())
      .then(data => criptomonedas.value = data.Data)
  })

  const obtenerCotizacion = async(cotizar) => {
    isLoading.value = true
    cotizacion.value = {}
  
    try {
      const { moneda, criptomoneda } = cotizar
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    
      const response = await fetch(url)
      const data = await response.json()
    
      cotizacion.value = data.DISPLAY[criptomoneda][moneda]
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false
    }
  
  }

  const mostrarResultado = computed(() => {
    return Object.values(cotizacion.value).length > 0
  })

  return {
    monedas,
    criptomonedas,
    obtenerCotizacion,
    cotizacion,
    isLoading,
    mostrarResultado
  }
}