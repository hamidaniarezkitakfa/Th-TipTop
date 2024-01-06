import { Helmet } from 'react-helmet-async';

import { JeuxView } from '../sections/jeux/view';

// ----------------------------------------------------------------------

export default function JeuxPage() {
  return (
    <>
      <Helmet>
        <title> Jeux | TipTop </title>
      </Helmet>

      <JeuxView />
    </>
  );
}
