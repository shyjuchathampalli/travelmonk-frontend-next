type TripHeroProps = {
  state: {
    name: string;
    banner_image: string;
  };
};

export default function TripHero({ state }: TripHeroProps) {
  return (
    <section
      className="relative h-[70vh] w-full overflow-hidden bg-black"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${state.banner_image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="max-w-7xl mx-auto px-6 pb-16 text-white">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Explore {state.name}
          </h1>
          <p className="mt-3 text-lg text-white/80">
            {state.banner_image}
          </p>
        </div>
      </div>
    </section>
  );
}
