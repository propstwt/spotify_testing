import { SpotifyApi } from "@spotify/web-api-ts-sdk";


const clientId = "7666b9483fa648d097ec418979d47c55";
const scopes = ["user-read-private", "user-read-email", "user-read-currently-playing",
                "user-top-read", "user-library-read"];


const sdk = SpotifyApi.withUserAuthorization(clientId, "http://localhost:5173", scopes);

const profile = sdk.currentUser.profile()

const country = profile.country;