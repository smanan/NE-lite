import React from 'react';
import { useGoogleLogout } from 'react-google-login';

// For Local server uncomment below commentid
 const clientId =
 '981474111172-2tnnhqurattsr3a6nmt7asp8b52a356j.apps.googleusercontent.com';
//  For testing server uncomment below commentid
  // const clientId =
  // '981474111172-cgnkrhht7ete180b8qq39r3h9o20rpr7.apps.googleusercontent.com';

  //  For Live server server uncomment below clientid
      // const clientId =
      // '981474111172-cgnkrhht7ete180b8qq39r3h9o20rpr7.apps.googleusercontent.com';

     function LogoutHooks() {
  const onLogoutSuccess = (res) => {

    alert('Logged out Successfully ✌');
  };

  const onFailure = () => {

  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} >

    </button>
  );
}

export default LogoutHooks;
