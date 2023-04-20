const TicketControl = require("../models/ticketControl");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('tickets', ticketControl.tickets);
    socket.emit('state-current', ticketControl.fourLast);

    socket.on('next-ticket', ( payload, callback ) => {

        const next = ticketControl.next();
        callback(next)

        // TODO: Notificar que hay un nuevo ticket pendiente de asignar.
        socket.broadcast.emit('tickets', ticketControl.tickets);
    })

    socket.on('attend-ticket', ( { desktop }, callback ) => {
        if (!desktop) {
            return callback({
                ok: false,
                message: "El escritorio es obligatorio",
            })
        }

        const ticket = ticketControl.attendTicket( desktop );

        socket.broadcast.emit('state-current', ticketControl.fourLast);
        socket.broadcast.emit('tickets', ticketControl.tickets);

        if (!ticket) {
            return callback({
                ok: false,
                message: "Ya no hay tickets pendientes",
            })
        }

        callback({
            ok: true,
            message: "Ticket a atender",
            ticket,
            pendingTickets: ticketControl.tickets,
        })
    })

}


module.exports = {
    socketController
}

