let backendURL = "http://localhost:3000";

export async function setInventoryPrefix(prefix) {
     return fetch(`${backendURL}/configuration/inventoryprefix`, {
          method: "PATCH",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({ InventoryPrefix: prefix }),
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function getInventoryPrefix() {
     let request = await fetch(`${backendURL}/configuration/inventoryprefix`, {
          method: "GET",
          headers: {
               "Content-Type": "application/json",
          },
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
     return request.data.KeyValue;
}

export async function CheckBackendConnection() {
     let request = await fetch(`${backendURL}/`, {
          method: "GET",
          headers: {
               "Content-Type": "application/json",
          },
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
     if (request.status != "OK") return false;
     return true;
}

export async function createAsset(newAsset) {
     return fetch(`${backendURL}/asset`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({
               Employee: newAsset.ID,
               ModelName: newAsset.ModelName,
               InventoryNumber: newAsset.InventoryNumber,
          }),
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function createModel(newModel) {
     return fetch(`${backendURL}/model`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({
               Model: newModel.Name,
               Manufactor: newModel.Manufactor,
               AssetType: newModel.AssetType,
          }),
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function getAllModelTypes() {
     return fetch(`${backendURL}/asset-type`, {
          method: "GET",
          headers: {
               "Content-Type": "application/json",
          },
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function createModelType(assetTypeName) {
     return fetch(`${backendURL}/asset-type`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({ Type: assetTypeName }),
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function getBuildings() {
     return fetch(`${backendURL}/building`, {
          method: "GET",
          headers: {
               "Content-Type": "application/json",
          },
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function createBuilding(buildingName) {
     return fetch(`${backendURL}/building`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name: buildingName.Name }),
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function editBuilding(buildingID, buildingName) {
     return fetch(`${backendURL}/building/${buildingID}`, {
          method: "PATCH",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name: buildingName }),
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function removeBuilding(buildingID) {
     return fetch(`${backendURL}/building/${buildingID}`, {
          method: "DELETE",
          headers: {
               "Content-Type": "application/json",
          },
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function getEmployees() {
     return fetch(`${backendURL}/employee`, {
          method: "GET",
          headers: {
               "Content-Type": "application/json",
          },
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function createEmployee(employee) {
     return fetch(`${backendURL}/employee`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({
               FirstName: employee.FirstName,
               LastName: employee.LastName,
               EMail: employee.EMail,
               Buidling: employee.Buidling,
          }),
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function editEmployee(employeeID, employeeName) {
     return fetch(`${backendURL}/employee/${employeeID}`, {
          method: "PATCH",
          headers: {
               "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name: employeeName }),
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function removeEmployee(employeeID) {
     return fetch(`${backendURL}/employee/${employeeID}`, {
          method: "DELETE",
          headers: {
               "Content-Type": "application/json",
          },
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function getManufactors() {
     return fetch(`${backendURL}/manufactor`, {
          method: "GET",
          headers: {
               "Content-Type": "application/json",
          },
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function getModeslByManufacor(manufactor) {
     return fetch(`${backendURL}/model/manufactor/${manufactor}`, {
          method: "GET",
          headers: {
               "Content-Type": "application/json",
          },
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function getAllModels() {
     return fetch(`${backendURL}/model`, {
          method: "GET",
          headers: {
               "Content-Type": "application/json",
          },
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then((response) => response)
          .catch((err) => err);
}

export async function getAllAssets() {
     return fetch(`${backendURL}/asset`, {
          method: "GET",
          headers: {
               "Content-Type": "application/json",
          },
     })
          .then(async function (response) {
               if (!response.ok)
                    new Error("HTTP status " + response.status + response);
               return response.json();
          })
          .then(function (response) {
               return response.data;
          })
          .catch((err) => err);
}
