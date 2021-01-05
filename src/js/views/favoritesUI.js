import currencyUI from './currency'

class FavoritesUI {
    constructor(currency) {
        this.dropdown = document.querySelector('.dropdown-content')
        this.currencySymbol = currency.getCurrencySymbol.bind(currency)
    }
    renderFavorites(favorites) {
        this.clearDropdown()
        const currency = this.currencySymbol()
        let fragment = ''
        favorites.forEach(item => {
            const template = FavoritesUI.favTicketTemplate(item, currency)
            fragment += template
        })
        this.dropdown.insertAdjacentHTML('afterbegin', fragment)
    }
    
    clearDropdown() {
         this.dropdown.innerHTML = ''
     }


    static favTicketTemplate(ticket, currency) {
         return `
        <div class="favorite-item d-flex align-items-start">
            <img
            src="${ticket.airline_logo}"
            class="favorite-item-airline-img"
            />
            <div class="favorite-item-info d-flex flex-column">
            <div
                class="favorite-item-destination d-flex align-items-center">
                <div class="d-flex align-items-center mr-auto">
                <span class="favorite-item-city">${ticket.origin_name}</span>
                <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                <i class="medium material-icons">flight_land</i>
                <span class="favorite-item-city">${ticket.destination_name}</span>
                </div>
            </div>
            <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${ticket.departure_at}</span>
                <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
            </div>
            <div class="ticket-additional-info">
                <span class="ticket-transfers">${ticket.transfers}</span>
                <span class="ticket-flight-number">Номер рейса:  ${ticket.flight_number}</span>
            </div>
            <a
                class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" data-current-ticket='${JSON.stringify(ticket)}'
                >Delete</a
            >
            </div>
        </div>
         `   
    }
}

const favoritesUI = new FavoritesUI(currencyUI)

export default favoritesUI