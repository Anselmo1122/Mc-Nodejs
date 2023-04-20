//Referencias Html
const lblDesktop = document.querySelector("h1");
const btnAttend = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert");
const lblPendientes = document.querySelector("#pendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
	window.location = "index.html";
	throw new Error("El escritorio es obligatorio.");
}

const desktop = searchParams.get("escritorio");

lblDesktop.innerHTML = desktop;
divAlert.style.display = "none";

const socket = io();

socket.on("connect", () => {
	btnAttend.disabled = false;
});

socket.on("disconnect", () => {
	btnAttend.disabled = true;
});

socket.on("tickets", (payload) => {
	if (payload.length === 0) {
		divAlert.style.display = "block";
		lblPendientes.style.display = "none";
	}
	lblPendientes.innerText = payload.length;
	lblPendientes.style.display = "block";
});

btnAttend.addEventListener("click", () => {
	socket.emit(
		"attend-ticket",
		{ desktop },
		({ ok, message, ticket, pendingTickets }) => {
			if (!ok) {
				lblTicket.innerText = "....";
				divAlert.style.display = "block";
				return null;
			}

			lblTicket.innerText = "Ticket " + ticket.number;
			lblPendientes.innerText = pendingTickets.length;
			lblPendientes.style.display = "block";
		}
	);
});
