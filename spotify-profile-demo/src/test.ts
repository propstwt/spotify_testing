import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import type {
  UserResponse,
  Page,
  Track,
} from "../node_modules/@spotify/web-api-ts-sdk/src/types";

const clientId = "7666b9483fa648d097ec418979d47c55";
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-currently-playing",
  "user-top-read",
  "user-library-read",
];

const sdk = SpotifyApi.withUserAuthorization(
  clientId,
  "http://localhost:5173/callback",
  scopes
);

let page_id = document.body.id;

switch (page_id) {
  case "profile_view":
    const profile: UserResponse =
      (await sdk.currentUser.profile()) as UserResponse;
    populateProfileUI(profile);

    break;
  case "tracks":
    const track: Page<Track> = (await sdk.currentUser.topItems(
      "tracks",
      "long_term",
      10
    )) as unknown as Page<Track>;
    // const artistNames = track.items[0].artists.map((artist) => artist.name);
    // console.log(artistNames);
    // console.log(track.items[0]);
    // document.getElementById("1")!.innerText =
    //   track.items[0].name + " - " + artistNames;
    populateTrackUI(track.items);
    break;
  default:
    break;
}

function populateProfileUI(profile: UserResponse) {
  document.getElementById("displayName")!.innerText = profile.display_name;
  if (profile.images[0]) {
    const profileimage = new Image(100, 100);
    profileimage.src = profile.images[0].url;
    document.getElementById("avatar")!.appendChild(profileimage);
  }
  document.getElementById("id")!.innerText = profile.id;
  document.getElementById("email")!.innerText = profile.email;
  document.getElementById("uri")!.innerText = profile.uri;
  document
    .getElementById("uri")!
    .setAttribute("href", profile.external_urls.spotify);
  document.getElementById("url")!.innerText = profile.href;
  document.getElementById("url")!.setAttribute("href", profile.href);
  document.getElementById("imgUrl")!.innerText =
    profile.images[0]?.url ?? "(no profile image)";
}

function populateTrackUI(tracks: Track[]) {
  for (let index = 0; index < tracks.length; index++) {
    const artistNames = tracks[index].artists.map((artist) => artist.name);
    const trackName = tracks[index].name;
    document.getElementById(`track${index}`)!.innerText =
      trackName + " - " + artistNames;
  }
}
