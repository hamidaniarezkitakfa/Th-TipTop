import { Helmet } from 'react-helmet-async';

import { Ticketview } from '../sections/ticket/view';

// ----------------------------------------------------------------------

export default function TicketPage() {
  return (
    <>
      <Helmet>
        <title> Ticket | TipTop </title>
      </Helmet>

      <Ticketview />
    </>
  );
}
