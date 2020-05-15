import currencyUI from './currency';

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector('.tickets-sections .row');
    this.currencySymbol = currency.currencySymbol;
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = '';

    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket, this.currencySymbol);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);


    // Добавление билетов в избранные
    const addFavoriteBtn = document.querySelectorAll('.favoriteButton');
    const favorites = document.querySelector('.dropdown-content');
    for (let i = 0; i < addFavoriteBtn.length; i++) {
      addFavoriteBtn[i].addEventListener('click', function () {
        favorites.insertAdjacentHTML('beforeend', TicketsUI.favoriteItemTemplate(tickets, i));
        addFavoriteBtn[i].classList.toggle('d-none');


        // Удаление билетов из избранного
        const delFavoriteBtn = document.getElementById(`${i}`);
        delFavoriteBtn.addEventListener('click', function () {
          const favoriteItem = document.getElementById(`favoriteItem${i}`);
          favoriteItem.parentNode.removeChild(favoriteItem);
          addFavoriteBtn[i].classList.toggle('d-none');
          // addFavoriteBtn[i].insertAdjacentHTML("afterbegin",` 
          // <a class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto">Add to favorites</a>` )
        });
      });
    }
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `
      <div class="tickets-empty-res-msg">По вашему запросу билетов не найдено.</div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="col s12 m6">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img src="${ticket.airline_logo}" class="ticket-airline-img" />
          <span class="ticket-airline-name">${ticket.airline_name}</span>
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <div class="favoriteButton">  
          <a class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto">Add to favorites</a>
        </div> 
        </div>
      </div>
    </div>
    `;
  }

  static favoriteItemTemplate(tickets, i) {
    return `<div class="favorite-item  d-flex align-items-start" id='favoriteItem${i}'>
    <img src="${tickets[i].airline_logo}" class="favorite-item-airline-img" />
    <div class="favorite-item-info d-flex flex-column">
      <div class="favorite-item-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="favorite-item-city">${tickets[i].origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="favorite-item-city">${tickets[i].destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${tickets[i].departure_at}</span>
        <span class="ticket-price ml-auto">${currencyUI.currencySymbol}${tickets[i].price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок: ${tickets[i].transfers}</span>
        <span class="ticket-flight-number">Номер рейса: ${tickets[i].flight_number}</span>
      </div>
      <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" id='${i}'>Delete</a>
    </div>
  </div>`
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;