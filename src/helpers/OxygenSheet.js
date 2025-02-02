import config from "../config";

export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Oxygen-and-Bed!A3:K",
      })
      .then(
        (response) => {
          const data = response.result.values;

          const remi =
            data.map((rem) => ({
              id: rem[0],
              city: rem[1],
              org: rem[2],
              name: rem[3],
              contact: rem[4],
              type: rem[5],
              timings: rem[6],
              status: rem[7],
              remarks: rem[8],
              verified_on: rem[10]
            })) || [];            

          callback({
            remi,
          });
        },
        (response) => {
          callback(false, response.result.error, "Error in fetching Oxygen Data.");
        }
      );
  });
}