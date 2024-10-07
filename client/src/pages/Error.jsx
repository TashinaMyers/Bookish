// The ErrorPage component is designed to handle and display any unexpected errors that occur while navigating through routes in a React application that uses react-router-dom. It provides a simple yet effective way to notify users when something goes wrong and logs the error for debugging purposes.

import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}