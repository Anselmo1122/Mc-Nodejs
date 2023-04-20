const path = require("path");
const fs = require("fs");

class Ticket {
	constructor(number, desktop) {
		this.number = number;
		this.desktop = desktop;
	}
}

class TicketControl {
	constructor() {
		this.last = 0;
		this.today = new Date().getDate();
		this.tickets = [];
		this.fourLast = [];

		this.init();
	}

	get toJson() {
		return {
			last: this.last,
			today: this.today,
			tickets: this.tickets,
			fourLast: this.fourLast,
		};
	}

	init() {
		const { last, today, tickets, fourLast } = require("../db/data.json");
		if (today === this.today) {
			this.last = last;
			this.today = today;
			this.tickets = tickets;
			this.fourLast = fourLast;
		} else {
			this.guardarDB();
		}
	}

	guardarDB() {
		const pathFile = path.join(__dirname, "../db/data.json");
		fs.writeFileSync(pathFile, JSON.stringify(this.toJson));
	}

	next() {
		this.last += 1;
		const ticket = new Ticket(this.last, null);
		this.tickets.push(ticket);

		this.guardarDB();
		return "Ticket " + ticket.number;
	}

	attendTicket(desktop) {
		// No tenemos tickets
		if (this.tickets.length === 0) return null;

		const ticket = this.tickets.shift();
		ticket.desktop = desktop;

		this.fourLast.unshift(ticket);

		if (this.fourLast.length > 4) this.fourLast.splice(-1, 1);

		this.guardarDB();

		return ticket;
	}
}

module.exports = TicketControl;
