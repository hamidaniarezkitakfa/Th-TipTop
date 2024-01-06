import { Helmet } from 'react-helmet-async';

import { CreateTicket } from '../sections/ticket/create';

// ----------------------------------------------------------------------

export default function CreatePage() {
  return (
    <>
      <Helmet>
        <title> Create Ticket | TipTop </title>
      </Helmet>

      <CreateTicket />
    </>
  );
}