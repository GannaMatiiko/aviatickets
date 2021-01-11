import favoritesUI from '../views/favoritesUI'

class Favorites {
    constructor() {
        this.favTickets = []
        this.favTicketIds = []
        this.dropdownBtn = document.querySelector('.dropdown-trigger')
    }
    
    addFavTicket(ticket) {
        this.favTickets.push(ticket)
        this.favTicketIds.push(`${ticket.airline}${ticket.flight_number}${ticket.departure_at}`)
        M.toast({
            html: 'Added to favorites',
            displayLength: 2000,
            classes: 'blue lighten-2'
        })

        favoritesUI.renderFavorites(this.favTickets)
    }

    isExistFav(ticket) {
        return this.favTicketIds.some(item => item === `${ticket.airline}${ticket.flight_number}${ticket.departure_at}`)
    }

    deleteFavTicket(ticket) {
        M.toast({
            html: 'Ticket was removed from favorites',
            displayLength: 2000,
            classes: 'green lighten-2'
        })
        this.favTickets = this.favTickets.filter(item => {
            return JSON.stringify(item) != JSON.stringify(ticket)
        })
        this.favTicketIds = this.favTicketIds.filter(item => {
            return item != `${ticket.airline}${ticket.flight_number}${ticket.departure_at}`
        })

        favoritesUI.renderFavorites(this.favTickets)
    }
}

const favorites = new Favorites()

export default favorites