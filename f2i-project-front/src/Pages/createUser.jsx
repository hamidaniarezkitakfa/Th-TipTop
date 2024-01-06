import { Helmet } from 'react-helmet-async';

import { Createview } from '../sections/user/create';

// ----------------------------------------------------------------------

export default function CreatePage() {
  return (
    <>
      <Helmet>
        <title> Create User | TipTop </title>
      </Helmet>

      <Createview />
    </>
  );
}
