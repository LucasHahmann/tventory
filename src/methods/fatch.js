export default async function fatch(endpoint, variables) {
     var backend = "http://localhost:3000";
     var url = "";
     var fetchMethod = "";
     var b0dy = null;
     var ContentType = "application/json";
     ContentType = "application/x-www-form-urlencoded";
     switch (endpoint) {
          case "GetAllEmployees":
               url = backend + `/employee`;
               fetchMethod = "GET";
               break;
     }
     const options = {
          method: fetchMethod,
          headers: {
               "Content-Type": ContentType,
               // Authorization: "Bearer " + store.state.token,
          },
          body: b0dy,
     };

     return await fetch(url, options)
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}
