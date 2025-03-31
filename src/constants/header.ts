import { linksHeader } from "@/types";
import LandingImg_5 from "@/assets/images/home(1)-5.png";

export const commonLinks: linksHeader[] = [
  {
    title: "Home",
    url: "/",
    subLinks: [
      { title: "Home 1", url: "/" },
      { title: "Home 2", url: "/" },
    ],
  },
  {
    title: "Shop",
    url: "/shop",
    gridLinks: [
      {
        heading: "Shop Layouts",
        subLinks: [
          { title: "defult", url: "/defult" },
          { title: "grid small", url: "/" },
          { title: "grid small", url: "/" },
          { title: "grid small", url: "/" },
          { title: "grid small", url: "/" },
        ],
      },
      {
        heading: "title 1",
        subLinks: [
          { title: "Home 1", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
        ],
      },
      {
        heading: "title 1",
        subLinks: [
          { title: "Home 1", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
        ],
      },
      {
        heading: "title 1",
        subLinks: [
          { title: "Home 1", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
          { title: "Home 2", url: "/" },
        ],
      },
    ],
    banner: {
      active: true,
      title: "Get an Extra 20% Off",
      details: "Shop the hotest products.",
      image: LandingImg_5,
    },
  },
  {
    title: "Cases",
    url: "/our-cases",
  },
  {
    title: "Our team",
    url: "/our-team",
  },
  {
    title: "Prices",
    url: "/prices",
  },
  {
    title: "About us",
    url: "/about-us",
  },
];
