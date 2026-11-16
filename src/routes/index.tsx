import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroPalace from "../assets/hero-palace.jpg";
import sealImage from "../assets/seal.webp";
import { Entry } from "@/components/Entry";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { SceneSection } from "@/components/SceneSection";
import { EventDetails } from "@/components/EventDetails";
import { Timeline } from "@/components/Timeline";
import { Venue } from "@/components/Venue";
import { Gallery } from "@/components/Gallery";
import { ThankYou } from "@/components/ThankYou";
import engagementPoster from "@/assets/engagement-poster.webp";
import sangeet from "@/assets/sangeet-new.jpg";
import baraatImage from "@/assets/baraat.jpg";
import haldi from "@/assets/haldi-ceremony.png";
import mehndiImage from "@/assets/mehndi-ceremony.png";
import laganImage from "@/image.png";

const weddingFontStylesheet = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Pinyon+Script&family=Jost:wght@300;400;500;600&display=swap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abhishek & Aditi - A Royal Invitation" },
      {
        name: "description",
        content: "Join Abhishek & Aditi for their wedding ceremony on 12 December 2026.",
      },
      { property: "og:title", content: "Abhishek & Aditi - A Royal Invitation" },
      {
        property: "og:description",
        content: "Join Abhishek & Aditi for their wedding ceremony on 12 December 2026.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preload", href: heroPalace, as: "image" },
      { rel: "preload", href: sealImage, as: "image" },
      { rel: "preload", href: weddingFontStylesheet, as: "style" },
      { rel: "stylesheet", href: weddingFontStylesheet },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  return (
    <main className="relative bg-background">
      {!entered && <Entry onEnter={() => setEntered(true)} />}
      <Nav />
      <Hero />
      <Story />
      <SceneSection
        id="mehndi"
        eyebrow="A celebration of color and artistry"
        title="Mehndi"
        subtitle={
          <EventDetails
            date="9 December 2026"
            venue="Home"
            mapsUrl="https://www.google.com/maps/place/ss+home+care/@26.8935201,75.7222387,21z/data=!4m6!3m5!1s0x396db500622868e7:0xd3e383741af612ef!8m2!3d26.8931031!4d75.7222034!16s%2Fg%2F11xtns7bst?entry=ttu&amp;g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D"
          />
        }
        image={mehndiImage}
        alt="Abhishek and Aditi in green wedding attire during their Mehndi celebration"
        contentPosition="event"
      />
      <SceneSection
        id="haldi"
        eyebrow="A golden morning"
        title="Haldi"
        subtitle={
          <EventDetails
            date="10 December 2026"
            venue="Shagun Banquet"
            mapsUrl="https://www.google.com/maps/place/Shagun+Banquets/@26.9722948,75.6313199,12z/data=!4m10!1m2!2m1!1sshagun+banquet+hall!3m6!1s0x396db3190bb53333:0xfc8bce6d6d40fd7e!8m2!3d26.9722948!4d75.7837552!15sChNzaGFndW4gYmFucXVldCBoYWxsWhUiE3NoYWd1biBiYW5xdWV0IGhhbGySAQxiYW5xdWV0X2hhbGzgAQA!16s%2Fg%2F11m9_8_gw_?entry=ttu&amp;g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D"
          />
        }
        image={haldi}
        alt="Haldi ceremony"
        contentPosition="event"
        overlay="from-background/40 via-background/10 to-background"
      />
      <SceneSection
        id="engagement"
        eyebrow="Engagement Ceremony"
        title="Engagement"
        subtitle={
          <EventDetails
            date="10 December 2026"
            venue="Shagun Banquet, Jaipur"
            mapsUrl="https://www.google.com/maps/place/Shagun+Banquets/@26.9722948,75.6313199,12z/data=!4m10!1m2!2m1!1sshagun+banquet+hall!3m6!1s0x396db3190bb53333:0xfc8bce6d6d40fd7e!8m2!3d26.9722948!4d75.7837552!15sChNzaGFndW4gYmFucXVldCBoYWxsWhUiE3NoYWd1biBiYW5xdWV0IGhhbGySAQxiYW5xdWV0X2hhbGzgAQA!16s%2Fg%2F11m9_8_gw_?entry=ttu"
          />
        }
        image={engagementPoster}
        alt="Abhishek and Aditi exchanging rings at their engagement celebration beneath a flower-decorated Indian palace arch"
        contentPosition="event"
      />
      <SceneSection
        id="sangeet"
        eyebrow="An evening of song and dance"
        title="Sangeet"
        subtitle={
          <EventDetails
            date="10 December 2026"
            venue="Shagun Banquet"
            mapsUrl="https://www.google.com/maps/place/Shagun+Banquets/@26.9722948,75.6313199,12z/data=!4m10!1m2!2m1!1sshagun+banquet+hall!3m6!1s0x396db3190bb53333:0xfc8bce6d6d40fd7e!8m2!3d26.9722948!4d75.7837552!15sChNzaGFndW4gYmFucXVldCBoYWxsWhUiE3NoYWd1biBiYW5xdWV0IGhhbGySAQxiYW5xdWV0X2hhbGzgAQA!16s%2Fg%2F11m9_8_gw_?entry=ttu&amp;g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D"
          />
        }
        image={sangeet}
        alt="Family and friends dancing at an Indian Sangeet celebration"
        contentPosition="event"
      />
      <SceneSection
        id="lagan"
        eyebrow="A sacred beginning"
        title="Lagan Ceremony"
        subtitle={
          <EventDetails
            date="11 December 2026"
            venue="Geetanjali Banquet"
            mapsUrl="https://www.google.com/maps/place/Geetanjali+Banquet+%7C+A+Multipurpose+Event+Venue/@26.8858086,75.7293834,18.63z/data=!4m6!3m5!1s0x396db5534eea08b5:0xc861918af3e93d10!8m2!3d26.8851119!4d75.7301887!16s%2Fg%2F11h5qnqyv_?entry=ttu&amp;g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D"
          />
        }
        image={laganImage}
        alt="Lagan ceremony mandap with sacred fire and floral decorations"
        contentPosition="event"
      />
      <SceneSection
        id="baraat"
        eyebrow="The wedding procession"
        title="Baraat"
        subtitle={
          <EventDetails
            date="12 December 2026"
            venue="Ranbanka Marriage Garden, Vaishali Nagar"
            mapsUrl="https://www.google.com/maps/place/Ranbanka+Marriage+Garden/@26.9220277,75.7327245,17z/data=!3m1!4b1!4m6!3m5!1s0x396db35da02a132f:0xc5c982156c4dcd0b!8m2!3d26.9220277!4d75.7352994!16s%2Fg%2F1hjh7hcwl?entry=ttu"
          />
        }
        image={baraatImage}
        alt="Groom riding a decorated white horse with family and musicians in the Baraat procession"
        contentPosition="event"
        imagePosition="center 48%"
      />
      <Timeline />
      <Venue />
      <Gallery />
      <ThankYou />
      <footer className="relative bg-night py-10 text-center">
        <div className="mx-auto h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="mt-6 font-script text-2xl text-gold">Abhi Ki Aditi</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.5em] text-foreground/40">
          Crafted with love
        </p>
      </footer>
    </main>
  );
}
