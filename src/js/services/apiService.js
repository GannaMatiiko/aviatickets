import axios from 'axios'
import config from '../config/apiConfig'

class Api {
   constructor(config) {
       this.url = config.url
    }
    async countries() {
        try {
            const response = await axios.get(`${this.url}/countries`)
            return response.data
        } catch (error) {
            console.log(error)
            M.toast({
                html: 'Oops, some troubles with server',
                displayLength: 2000,
                classes: 'red darken-2'
            })
            return Promise.reject(error) 
        }
    }
    async cities() {
        try {
            const response = await axios.get(`${this.url}/cities`)
            return response.data
        } catch (error) {
            console.log(error)
            M.toast({
                html: 'Oops, some troubles with server',
                displayLength: 2000,
                classes: 'red darken-2'
            })
            return Promise.reject(error)
        }
    }
    async prices(params) {
        try {
            const response = await axios.get(`${this.url}/prices/cheap`, {
                params
            })
            return response.data
        } catch (error) {
            console.log(error)
            M.toast({
                html: 'Oops, some troubles with server',
                displayLength: 2000,
                classes: 'red darken-2'
            })
            return Promise.reject(error)
        }
    }
    async airlines() {
        try {
            const response = await axios.get(`${this.url}/airlines`)
            return response.data
        } catch (error) {
            console.log(error)
            M.toast({
                html: 'Oops, some troubles with server',
                displayLength: 2000,
                classes: 'red darken-2'
            })
            return Promise.reject(error)
        }
    }
}

const api = new Api(config)

export default api