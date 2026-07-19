import type { Metadata } from "next";
import { getAllTitles } from "@/data/derive";
import { SearchPage } from "@/components/search/SearchPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search movies, short films and trailers on Surina Films OTT.",
  path: "/search",
});

export default function Search() {
  return <SearchPage allTitles={getAllTitles()} />;
}
