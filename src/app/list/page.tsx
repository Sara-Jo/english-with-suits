import { fetchAllEpisodes } from "@/lib/fetchAllEpisodes";
import ListClient from "./listClient";

export default async function List() {
  const episodes = await fetchAllEpisodes();

  return <ListClient episodes={episodes} />;
}
