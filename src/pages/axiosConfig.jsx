import axios from 'axios';

axios.defaults.baseURL = 'https://mock-api.driven.com.br/api/v8/cineflex'; // Defina a URL base da sua API
axios.defaults.headers.common['Authorization'] = 'WddqjBX725Dx1aXEac8QJSG3';

export default axios;
