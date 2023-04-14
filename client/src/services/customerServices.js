import axios from 'axios';
import host from './host';

const services = {
    async getCustomers(filters) {
        const response = await axios.get(`${host}/clientes?${new URLSearchParams(filters)}`);
        return response.data;
    }
}

export default services;