import '../css/style.css'
import './plugins'
import locations from './store/locations'
import formUI from './views/form'
import currencyUI from './views/currency'
import ticketsUI from './views/tickets'
import favoritesUI from './views/favoritesUI'
import favorites from './store/favorites'

document.addEventListener('DOMContentLoaded', () => {
    initApp()
    const form = formUI.form

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        onFormSubmit()
    })

    favorites.dropdownBtn.addEventListener('click', e => {
        if (!favorites.favTickets.length) {
            M.toast({
                html: 'No favorites tickets!',
                displayLength: 2000,
                classes: 'indigo darken-1'
            })
        }
    })

    ticketsUI.container.addEventListener('click', e => {
        if (e.target.classList.contains('add-favorite')) {
            e.target.innerHTML = 'favorite'
            let ticket = JSON.parse(e.target.dataset.currentTicket)
            favorites.addFavTicket(ticket)
        }
    })

    favoritesUI.dropdown.addEventListener('click', e => {
        if (e.target.classList.contains('delete-favorite')) {
            let deletedTicket = JSON.parse(e.target.dataset.currentTicket)
            favorites.deleteFavTicket(deletedTicket)
            favoritesUI.renderFavorites(favorites.favTickets)
            ticketsUI.renderedItems.forEach(el => {
                if (el.dataset.currentTicket === JSON.stringify(deletedTicket)) {
                  el.innerHTML = 'favorite_border'
                }
              })
        }
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