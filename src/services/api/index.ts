import { attach403RedirectInterceptor } from '@/src/interceptors/attach403RedirectInterceptor'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
})

// middlewares
attach403RedirectInterceptor(api) // Interceptor para cuando la api de github caiga en rate limit

export default api
