type TripHeroProps = {
  location: any; // temporary, we’ll type this properly later
};

export default function TripHero({ location }: TripHeroProps) {
  return (
    <section
      className="relative h-[70vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${location.heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex items-end">
        <div className="max-w-7xl mx-auto px-6 pb-16 text-white">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Explore {location.name}
          </h1>
          <p className="mt-3 text-lg text-white/80">
            {location.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
