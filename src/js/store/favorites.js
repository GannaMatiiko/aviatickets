import favoritesUI from '../views/favoritesUI'
import ticketsUI from '../views/tickets'

class Favorites {
    constructor() {
        this.favTickets = []
        this.dropdownBtn = document.querySelector('.dropdown-trigger')
    }
    
    addFavTicket(ticket) {
        if (this.isExistFav(ticket)) {
            M.toast({
                html: 'Already liked!',
                displayLength: 2000,
                classes: 'red darken-3'
            })
            return
        }

        this.favTickets.push(ticket)
        M.toast({
            html: 'Added to favorites',
            displayLength: 2000,
            classes: 'blue lighten-2'
        })

        favoritesUI.renderFavorites(this.favTickets)
    }

    isExistFav(ticket) {
        return this.favTickets.some(item => JSON.stringify(item) === JSON.stringify(ticket))
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
    }
}

const favorites = new Favorites()

export default favorites