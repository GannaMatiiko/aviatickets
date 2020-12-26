import '../css/style.css'
import './plugins'
import locations from './store/locations'
import formUI from './views/form'
import currencyUI from './views/currency'
import ticketsUI from './views/tickets'

document.addEventListener('DOMContentLoaded', () => {
    initApp()
    const form = formUI.form

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        onFormSubmit()
    })

    async function initApp() {
        await locations.init()
        formUI.setAutocompleteData(locations.shortCitiesList)
    }

    async function onFormSubmit() {
        // collect form data
        const origin = locations.getCityCodeByKey(formUI.originValue)
        const destination = locations.getCityCodeByKey(formUI.destinationValue)
        const depart_date = formUI.departDateValue
        const return_date = formUI.returntDateValue
        const currency = currencyUI.currencyValue
        console.log(origin, destination, depart_date, return_date)
        // CODE, CODE, 2019-09, 2019-10
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        })

        ticketsUI.renderTickets(locations.lastSearch)
    }
})