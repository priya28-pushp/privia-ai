"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type Apartment = {
  id: number;
  title: string;
  address: string;
  neighborhood: string;
  rent: number;
  deposit: number;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  parking: boolean;
  pet_friendly: boolean;
  area_sqft: number;
  amenities: string[];
  description: string;
};

const apartments: Apartment[] = [
  {
    id: 1,
    title: "Green Valley Residency",
    address: "Katpadi, Vellore",
    neighborhood: "Katpadi",
    rent: 22000,
    deposit: 60000,
    bedrooms: 2,
    bathrooms: 2,
    furnished: true,
    parking: true,
    pet_friendly: true,
    area_sqft: 1150,
    amenities: ["Parking", "Gym", "Security", "Power Backup", "Balcony"],
    description:
      "Demo apartment with spacious rooms and multiple amenities.",
  },
  {
    id: 2,
    title: "VIT Heights",
    address: "Katpadi, Vellore",
    neighborhood: "Katpadi",
    rent: 18000,
    deposit: 50000,
    bedrooms: 2,
    bathrooms: 2,
    furnished: false,
    parking: true,
    pet_friendly: false,
    area_sqft: 980,
    amenities: ["Parking", "Security", "Water Supply", "Balcony"],
    description:
      "Demo apartment suitable for students and young professionals.",
  },
  {
    id: 3,
    title: "Lakeview Residency",
    address: "Sathuvachari, Vellore",
    neighborhood: "Sathuvachari",
    rent: 26000,
    deposit: 75000,
    bedrooms: 3,
    bathrooms: 2,
    furnished: true,
    parking: true,
    pet_friendly: true,
    area_sqft: 1450,
    amenities: ["Parking", "Gym", "Security", "Garden", "Power Backup"],
    description:
      "Demo three-bedroom apartment with larger living space.",
  },
  {
    id: 4,
    title: "Metro Nest",
    address: "Gandhi Nagar, Vellore",
    neighborhood: "Gandhi Nagar",
    rent: 21000,
    deposit: 55000,
    bedrooms: 2,
    bathrooms: 1,
    furnished: true,
    parking: false,
    pet_friendly: true,
    area_sqft: 900,
    amenities: ["Security", "Balcony", "Near Shops"],
    description:
      "Demo furnished apartment close to shops and services.",
  },
  {
    id: 5,
    title: "Campus View Homes",
    address: "Katpadi, Vellore",
    neighborhood: "Katpadi",
    rent: 24000,
    deposit: 65000,
    bedrooms: 2,
    bathrooms: 2,
    furnished: true,
    parking: true,
    pet_friendly: false,
    area_sqft: 1200,
    amenities: ["Parking", "Security", "Power Backup", "Lift"],
    description:
      "Demo apartment designed for convenient campus-area living.",
  },
];

function CompareContent() {
  const searchParams = useSearchParams();

  const ids = searchParams
    .get("ids")
    ?.split(",")
    .map(Number) || [];

  const selectedApartments = apartments.filter((apartment) =>
    ids.includes(apartment.id)
  );

  if (selectedApartments.length < 2) {
    return (
      <main className="min-h-screen bg-[#fff8fa] px-6 py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#efd5dd] bg-white p-10 text-center shadow-xl">

          <div className="mb-5 text-5xl">🏠</div>

          <h1 className="text-3xl font-bold text-[#4a3038]">
            Choose Two Apartments
          </h1>

          <p className="mt-3 text-[#8d6b75]">
            Select two apartments from your search results to compare them
            side-by-side.
          </p>

          <a
            href="/"
            className="mt-7 inline-block rounded-2xl bg-[#c96b89] px-7 py-4 font-semibold text-white shadow-lg shadow-[#c96b89]/20 transition hover:bg-[#b95d7c]"
          >
            ← Back to Apartment Search
          </a>

        </div>
      </main>
    );
  }

  const [first, second] = selectedApartments;

  return (
    <main className="min-h-screen bg-[#fff8fa] text-[#4a3038]">

      {/* NAVBAR */}
      <nav className="border-b border-[#f1dce3] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a href="/" className="text-2xl font-bold tracking-tight text-[#c96b89]">
            Privia AI
          </a>

          <a
            href="/"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-[#a45670] hover:bg-[#fff1f5]"
          >
            ← Back to Search
          </a>

        </div>
      </nav>

      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-12">

        <div className="mb-10 text-center">

          <span className="rounded-full bg-[#fde8ef] px-4 py-2 text-sm font-semibold text-[#a45670]">
            ✨ Privia Comparison
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Compare Your
            <span className="text-[#c96b89]"> Top Choices</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[#8d6b75]">
            See the differences clearly before deciding which apartment fits
            your lifestyle and budget.
          </p>

        </div>

        {/* APARTMENT HEADERS */}
        <div className="grid gap-6 md:grid-cols-2">

          {[first, second].map((apartment) => (
            <div
              key={apartment.id}
              className="rounded-3xl border border-[#efd5dd] bg-white p-7 shadow-lg shadow-[#c96b89]/5"
            >

              <div className="mb-5 flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-[#a45670]">
                    {apartment.neighborhood}
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    {apartment.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#8d6b75]">
                    {apartment.address}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#fff1f5] px-4 py-3 text-center">
                  <p className="text-xs font-medium text-[#a45670]">
                    MATCH
                  </p>
                  <p className="text-2xl font-bold text-[#c96b89]">
                    {apartment.id === 1 ? "92%" : "86%"}
                  </p>
                </div>

              </div>

              <div className="rounded-2xl bg-[#fff8fa] p-5">

                <p className="text-sm text-[#8d6b75]">
                  Monthly Rent
                </p>

                <p className="mt-1 text-3xl font-bold text-[#c96b89]">
                  ₹{apartment.rent.toLocaleString("en-IN")}
                  <span className="text-sm font-medium text-[#8d6b75]">
                    {" "}
                    / month
                  </span>
                </p>

              </div>

            </div>
          ))}

        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="mx-auto max-w-7xl px-6 pb-16">

        <div className="overflow-hidden rounded-3xl border border-[#efd5dd] bg-white shadow-xl">

          <div className="border-b border-[#f1dce3] px-6 py-5">
            <h2 className="text-2xl font-bold">
              Apartment Comparison
            </h2>

            <p className="mt-1 text-sm text-[#8d6b75]">
              Compare the important details at a glance.
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px]">

              <thead>
                <tr className="bg-[#fff8fa]">
                  <th className="px-6 py-5 text-left text-sm font-semibold text-[#8d6b75]">
                    Feature
                  </th>

                  <th className="px-6 py-5 text-left text-sm font-semibold text-[#c96b89]">
                    {first.title}
                  </th>

                  <th className="px-6 py-5 text-left text-sm font-semibold text-[#c96b89]">
                    {second.title}
                  </th>
                </tr>
              </thead>

              <tbody>

                {[
                  ["Monthly Rent", `₹${first.rent.toLocaleString("en-IN")}`, `₹${second.rent.toLocaleString("en-IN")}`],
                  ["Security Deposit", `₹${first.deposit.toLocaleString("en-IN")}`, `₹${second.deposit.toLocaleString("en-IN")}`],
                  ["Bedrooms", `${first.bedrooms}`, `${second.bedrooms}`],
                  ["Bathrooms", `${first.bathrooms}`, `${second.bathrooms}`],
                  ["Area", `${first.area_sqft} sqft`, `${second.area_sqft} sqft`],
                  ["Furnished", first.furnished ? "Yes ✓" : "No", second.furnished ? "Yes ✓" : "No"],
                  ["Parking", first.parking ? "Available ✓" : "Not listed", second.parking ? "Available ✓" : "Not listed"],
                  ["Pet Friendly", first.pet_friendly ? "Yes ✓" : "No", second.pet_friendly ? "Yes ✓" : "No"],
                ].map(([feature, value1, value2], index) => (

                  <tr
                    key={feature}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#fffafb]"}
                  >

                    <td className="border-t border-[#f4e5e9] px-6 py-5 font-medium text-[#6d4d57]">
                      {feature}
                    </td>

                    <td className="border-t border-[#f4e5e9] px-6 py-5 font-semibold">
                      {value1}
                    </td>

                    <td className="border-t border-[#f4e5e9] px-6 py-5 font-semibold">
                      {value2}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      </section>

      {/* AMENITIES */}
      <section className="mx-auto max-w-7xl px-6 pb-16">

        <h2 className="mb-6 text-2xl font-bold">
          ✨ Amenities
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          {[first, second].map((apartment) => (

            <div
              key={apartment.id}
              className="rounded-3xl border border-[#efd5dd] bg-white p-7"
            >

              <h3 className="text-xl font-bold">
                {apartment.title}
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">

                {apartment.amenities.map((amenity) => (

                  <span
                    key={amenity}
                    className="rounded-full bg-[#fff1f5] px-4 py-2 text-sm font-medium text-[#a45670]"
                  >
                    ✓ {amenity}
                  </span>

                ))}

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* PRIVIA VERDICT */}
      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="rounded-[2rem] bg-gradient-to-br from-[#c96b89] to-[#a45670] p-8 text-white shadow-2xl shadow-[#c96b89]/20 md:p-10">

          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Privia AI Verdict
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Which one looks better?
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

              <p className="text-lg font-bold">
                🏆 {first.title}
              </p>

              <p className="mt-3 text-sm leading-6 text-white/80">
                Strong choice if you value furnishing, parking, pet
                friendliness and a larger living area.
              </p>

            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

              <p className="text-lg font-bold">
                💰 {second.title}
              </p>

              <p className="mt-3 text-sm leading-6 text-white/80">
                Strong choice if keeping monthly rent lower is your priority
                while still having two bedrooms and parking.
              </p>

            </div>

          </div>

          <p className="mt-8 text-sm text-white/60">
            Privia AI uses the information provided by each listing. Always
            verify rental terms, deposits and amenities with the property
            owner before making a decision.
          </p>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#f1dce3] bg-white py-8 text-center">

        <p className="font-semibold text-[#c96b89]">
          Privia AI
        </p>

        <p className="mt-1 text-sm text-[#8d6b75]">
          Find a place that feels right. ♡
        </p>

      </footer>

    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fff8fa] text-[#c96b89]">
          Loading comparison...
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}