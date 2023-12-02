export default async function fatch(endpoint, variables) {
     var backend = "http://localhost:3000";
     var url = "";
     var fetchMethod = "";
     var b0dy = null;
     var ContentType = "application/json";
     //ContentType = "application/x-www-form-urlencoded";
     switch (endpoint) {
          case "GetAllEmployees":
               url = backend + `/employee`;
               fetchMethod = "GET";
               break;
          case "GetAllManufactors":
               url = backend + `/manufactor`;
               fetchMethod = "GET";
               break;
          case "CreateManufactor":
               url = backend + `/manufactor`;
               fetchMethod = "POST";
               b0dy = JSON.stringify({ Name: variables.Name });
               break;
          case "RemoveManufactor":
               url = backend + `/manufactor/${variables}`;
               fetchMethod = "DELETE";
               break;
          case "EditManufactor":
               url = backend + `/manufactor/${variables.id}`;
               fetchMethod = "PATCH";
               b0dy = JSON.stringify({ Name: variables.Name });
               console.log(url, b0dy);
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

               //const data = await response.json();
               //return { status: response.status, data }; // Include status in the returning JSON
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}
