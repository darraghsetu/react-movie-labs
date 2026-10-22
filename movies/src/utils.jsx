import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {    
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export function tryFetch(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        return response
          .json()
          .then((error) => {
            throw new Error(error.status_message || "Something went wrong");
          });
      }
      return response.json();
    });
}
