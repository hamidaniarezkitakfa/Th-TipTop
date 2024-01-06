import { Helmet } from 'react-helmet-async';

import { CreateJeux } from '../sections/jeux/create';

// ----------------------------------------------------------------------

export default function CreatePage() {
  return (
    <>
      <Helmet>
        <title> Create Jeux | TipTop </title>
      </Helmet>

      <CreateJeux />
    </>
  );
}
