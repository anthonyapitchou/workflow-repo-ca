import { CONFIG } from "../../config.js";

export async function getVenue(id) {
  if (!id) {
    throw new Error("No id provided");
  }

  const url = `${CONFIG.apiUrl}holidaze/venues/${id}`;

  const response = await fetch(url);
  const json = await response.json();
  console.log(json);

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching venue failed");
  }

  return json.data;
}
