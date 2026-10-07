"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const apartments = [
  {
    id: 1,
    title: "Green Valley Residency",
    location: "Katpadi, Vellore",
    rent: 22000,
    deposit: 60000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1150,
    furnished: true,
    parking: true,
    petFriendly: true,
    amenities: ["Gym", "Security", "Balcony"],
    description:
      "A comfortable apartment with spacious rooms, useful amenities and convenient access to the surrounding area.",
  },
  {
    id: 2,
    title: "VIT Heights",
    location: "Katpadi, Vellore",
    rent: 18000,
    deposit: 50000,
    bedrooms: 2,
    bathrooms: 2,
    area: 980,
    furnished: false,
    parking: true,
    petFriendly: false,
    amenities: ["Parking", "Security", "Water Supply"],
    description:
      "A practical apartment option suitable for students and young professionals looking for an affordable home.",
  },
  {
    id: 3,
    title: "Lakeview Residency",
    location: "Sathuvachari, Vellore",
    rent: 26000,
    deposit: 75000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    furnished: true,
    parking: true,
    petFriendly: true,
    amenities: ["Gym", "Garden", "Power Backup"],
    description:
      "A larger three-bedroom apartment offering additional living space and a comfortable set of amenities.",
  },
  {
    id: 4,
    title: "Metro Nest",
    location: "Gandhi Nagar, Vellore",
    rent: 21000,
    deposit: 55000,
    bedrooms: 2,
    bathrooms: 1,
    area: 900,
    furnished: true,
    parking: false,
    petFriendly: true,
    amenities: ["Security", "Balcony", "Near Shops"],
    description:
      "A furnished apartment located close to shops and everyday services.",
  },
  {
    id: 5,
    title: "Campus View Homes",
    location: "Katpadi, Vellore",
    rent: 24000,
    deposit: 65000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    furnished: true,
    parking: true,
    petFriendly: false,
    amenities: ["Parking", "Security", "Lift"],
    description:
      "A convenient campus-area apartment with two bedrooms and useful building amenities.",
  },
];

function ApartmentDetails() {
  const searchParams = useSearchParams();

  const id = Number(searchParams.get("id")) || 1;

  const apartment =
    apartments.find((item) => item.id === id) || apartments[0];

  const score = 92;

  // -----------------------------
  // BUDGET INTELLIGENCE
  // -----------------------------

  const monthlyRent = apartment.rent;

  const annualRent = monthlyRent * 12;

  const initialCash = apartment.rent + apartment.deposit;

  let budgetStress = "Low";

  if (apartment.rent > 25000) {
    budgetStress = "High";
  } else if (apartment.rent > 20000) {
    budgetStress = "Moderate";
  }

  return (
    <main className="min-h-screen bg-[#fff8fa] text-[#3d2930]">

      {/* NAVBAR */}

      <nav className="border-b border-[#f0dce2] bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold">
              Privia <span className="text-[#c96b89]">AI</span>
            </h1>

            <p className="text-xs text-[#9a7b84]">
              Intelligent apartment discovery
            </p>

          </div>

          <a
            href="/"
            className="rounded-full border border-[#e8cbd4] bg-white px-5 py-2 text-sm font-medium text-[#76515e] hover:bg-[#fff1f5]"
          >
            ← Back to search
          </a>

        </div>

      </nav>


      {/* PAGE */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* BACK */}

        <a
          href="/"
          className="text-sm font-medium text-[#b05d78] hover:underline"
        >
          ← Back to apartments
        </a>


        {/* HERO */}

        <div className="mt-6 overflow-hidden rounded-3xl border border-[#efdce2] bg-white shadow-lg shadow-[#d99aad]/10">

          <div className="relative h-72 bg-gradient-to-br from-[#f5cbd7] via-[#f9e4e9] to-[#efd0da] p-8 md:h-96">

            <div className="absolute bottom-8 left-8">

              <p className="text-sm font-medium text-[#a15b72]">
                📍 {apartment.location}
              </p>

              <h2 className="mt-2 text-4xl font-bold text-[#452f37] md:text-5xl">
                {apartment.title}
              </h2>

              <p className="mt-3 max-w-2xl text-[#765c65]">
                {apartment.description}
              </p>

            </div>


            {/* MATCH */}

            <div className="absolute right-8 top-8 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-xl">

              <div className="text-center">

                <div className="text-3xl font-bold text-[#c96b89]">
                  {score}%
                </div>

                <div className="text-[10px] font-bold uppercase tracking-widest text-[#987680]">
                  Privia Match
                </div>

              </div>

            </div>

          </div>


          {/* MAIN CONTENT */}

          <div className="grid gap-8 p-7 lg:grid-cols-3">

            {/* LEFT */}

            <div className="lg:col-span-2">

              {/* PRICE */}

              <div className="flex flex-wrap items-end justify-between gap-4">

                <div>

                  <p className="text-sm text-[#98838a]">
                    Monthly rent
                  </p>

                  <h3 className="text-4xl font-bold text-[#3d2930]">
                    ₹{apartment.rent.toLocaleString("en-IN")}
                  </h3>

                </div>

                <span className="rounded-full bg-[#fff0f4] px-4 py-2 text-sm font-semibold text-[#ad5e78]">
                  ✦ Excellent match
                </span>

              </div>


              {/* STATS */}

              <div className="mt-8 grid grid-cols-3 gap-4">

                <div className="rounded-2xl bg-[#fff8fa] p-5 text-center">

                  <div className="text-xl font-bold">
                    {apartment.bedrooms}
                  </div>

                  <div className="mt-1 text-xs text-[#99858b]">
                    Bedrooms
                  </div>

                </div>


                <div className="rounded-2xl bg-[#fff8fa] p-5 text-center">

                  <div className="text-xl font-bold">
                    {apartment.bathrooms}
                  </div>

                  <div className="mt-1 text-xs text-[#99858b]">
                    Bathrooms
                  </div>

                </div>


                <div className="rounded-2xl bg-[#fff8fa] p-5 text-center">

                  <div className="text-xl font-bold">
                    {apartment.area}
                  </div>

                  <div className="mt-1 text-xs text-[#99858b]">
                    Sq ft
                  </div>

                </div>

              </div>


              {/* BUDGET INTELLIGENCE */}

              <div className="mt-10 rounded-3xl border border-[#efdce2] bg-white p-7 shadow-lg shadow-[#c96b89]/5">

                <div>

                  <p className="text-xs font-bold uppercase tracking-widest text-[#c96b89]">
                    ✦ Budget intelligence
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Understand the real cost
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#8d747c]">
                    Privia breaks down the monthly and upfront costs so
                    you can make a more informed rental decision.
                  </p>

                </div>


                {/* COST CARDS */}

                <div className="mt-7 grid gap-4 sm:grid-cols-2">

                  {/* MONTHLY RENT */}

                  <div className="rounded-2xl bg-[#fff8fa] p-5">

                    <p className="text-sm text-[#8d747c]">
                      Monthly Rent
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      ₹{monthlyRent.toLocaleString("en-IN")}
                    </p>

                  </div>


                  {/* DEPOSIT */}

                  <div className="rounded-2xl bg-[#fff8fa] p-5">

                    <p className="text-sm text-[#8d747c]">
                      Security Deposit
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      ₹{apartment.deposit.toLocaleString("en-IN")}
                    </p>

                  </div>


                  {/* ANNUAL RENT */}

                  <div className="rounded-2xl bg-[#fff8fa] p-5">

                    <p className="text-sm text-[#8d747c]">
                      Estimated Annual Rent
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      ₹{annualRent.toLocaleString("en-IN")}
                    </p>

                  </div>


                  {/* INITIAL CASH */}

                  <div className="rounded-2xl bg-[#fff1f5] p-5">

                    <p className="text-sm text-[#a45670]">
                      Initial Cash Needed
                    </p>

                    <p className="mt-2 text-2xl font-bold text-[#c96b89]">
                      ₹{initialCash.toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>


                {/* BUDGET STRESS */}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl border border-[#efdce2] bg-white p-5">

                    <p className="text-sm text-[#8d747c]">
                      Budget Stress
                    </p>

                    <div className="mt-3 flex items-center gap-3">

                      <span className="text-2xl">

                        {budgetStress === "Low"
                          ? "🟢"
                          : budgetStress === "Moderate"
                          ? "🟡"
                          : "🔴"}

                      </span>

                      <span className="text-xl font-bold">
                        {budgetStress}
                      </span>

                    </div>

                    <p className="mt-2 text-xs leading-5 text-[#958087]">
                      Based on the monthly rent compared with the
                      current demo budget of ₹25,000.
                    </p>

                  </div>


                  {/* ANNUAL COST */}

                  <div className="rounded-2xl border border-[#efdce2] bg-white p-5">

                    <p className="text-sm text-[#8d747c]">
                      12-Month Housing Cost
                    </p>

                    <p className="mt-3 text-2xl font-bold text-[#c96b89]">
                      ₹{annualRent.toLocaleString("en-IN")}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#958087]">
                      Based on monthly rent only. Utilities and other
                      charges are not included.
                    </p>

                  </div>

                </div>


                {/* PRIVIA INSIGHT */}

                <div className="mt-6 rounded-2xl border border-[#efdce2] bg-[#fff1f5] p-5">

                  <div className="flex gap-3">

                    <div className="text-2xl">
                      💡
                    </div>

                    <div>

                      <p className="font-semibold">
                        Privia Insight
                      </p>

                      <p className="mt-1 text-sm leading-6 text-[#765f68]">

                        The estimated first-month cash requirement is{" "}

                        <span className="font-bold text-[#c96b89]">
                          ₹{initialCash.toLocaleString("en-IN")}
                        </span>

                        . This includes one month's rent and the listed
                        security deposit.

                      </p>

                      <p className="mt-2 text-xs text-[#927b83]">
                        Always verify deposit and refund terms with the
                        property owner.
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* AMENITIES */}

              <div className="mt-10">

                <h3 className="text-xl font-bold">
                  Apartment amenities
                </h3>

                <div className="mt-4 flex flex-wrap gap-3">

                  {apartment.amenities.map((amenity) => (

                    <span
                      key={amenity}
                      className="rounded-full border border-[#efdce2] bg-[#fffafb] px-4 py-2 text-sm text-[#80636d]"
                    >
                      ✓ {amenity}
                    </span>

                  ))}

                  {apartment.furnished && (

                    <span className="rounded-full border border-[#efdce2] bg-[#fffafb] px-4 py-2 text-sm text-[#80636d]">
                      ✓ Furnished
                    </span>

                  )}

                  {apartment.parking && (

                    <span className="rounded-full border border-[#efdce2] bg-[#fffafb] px-4 py-2 text-sm text-[#80636d]">
                      ✓ Parking
                    </span>

                  )}

                  {apartment.petFriendly && (

                    <span className="rounded-full border border-[#efdce2] bg-[#fffafb] px-4 py-2 text-sm text-[#80636d]">
                      ✓ Pet friendly
                    </span>

                  )}

                </div>

              </div>


              {/* WHY PRIVIA */}

              <div className="mt-10 rounded-3xl bg-[#fff4f7] p-6">

                <p className="text-xs font-bold uppercase tracking-widest text-[#c96b89]">
                  ✦ Privia intelligence
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Why this apartment stands out
                </h3>

                <div className="mt-5 space-y-3 text-sm text-[#75656b]">

                  <p>✓ Strong compatibility with your selected preferences</p>

                  <p>✓ Good balance between rent and apartment features</p>

                  <p>✓ Meets the required bedroom configuration</p>

                  {apartment.furnished && (
                    <p>✓ Furnishing is available</p>
                  )}

                  {apartment.parking && (
                    <p>✓ Parking is listed</p>
                  )}

                  {apartment.petFriendly && (
                    <p>✓ Pet-friendly option is listed</p>
                  )}

                </div>

              </div>

            </div>


            {/* RIGHT SIDEBAR */}

            <div>

              {/* MATCH CARD */}

              <div className="rounded-3xl border border-[#efdce2] bg-[#fffafb] p-6">

                <p className="text-xs font-bold uppercase tracking-widest text-[#c96b89]">
                  Your match
                </p>

                <div className="mt-3 flex items-end gap-2">

                  <span className="text-5xl font-bold text-[#c96b89]">
                    {score}
                  </span>

                  <span className="mb-2 text-lg text-[#917b83]">
                    / 100
                  </span>

                </div>

                <p className="mt-2 text-sm text-[#806c73]">
                  Excellent compatibility with your current apartment
                  preferences.
                </p>


                {/* SCORE BARS */}

                <div className="mt-7 space-y-5">

                  <ScoreBar
                    label="Budget"
                    value="22 / 25"
                    width="88%"
                  />

                  <ScoreBar
                    label="Location"
                    value="20 / 20"
                    width="100%"
                  />

                  <ScoreBar
                    label="Bedrooms"
                    value="15 / 15"
                    width="100%"
                  />

                  <ScoreBar
                    label="Lifestyle"
                    value="15 / 15"
                    width="100%"
                  />

                </div>

              </div>


              {/* BUDGET SNAPSHOT */}

              <div className="mt-5 rounded-3xl border border-[#efdce2] bg-white p-6">

                <p className="text-xs font-bold uppercase tracking-widest text-[#c96b89]">
                  Budget snapshot
                </p>

                <div className="mt-5 space-y-4 text-sm">

                  <div className="flex justify-between">

                    <span className="text-[#806c73]">
                      Your budget
                    </span>

                    <span className="font-semibold">
                      ₹25,000
                    </span>

                  </div>


                  <div className="flex justify-between">

                    <span className="text-[#806c73]">
                      Monthly rent
                    </span>

                    <span className="font-semibold">
                      ₹{apartment.rent.toLocaleString("en-IN")}
                    </span>

                  </div>


                  <div className="border-t border-[#f1e3e7] pt-4">

                    <div className="flex justify-between">

                      <span className="font-semibold">
                        Remaining
                      </span>

                      <span className="font-bold text-[#c96b89]">
                        ₹
                        {(25000 - apartment.rent).toLocaleString("en-IN")}
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* VERIFY */}

              <div className="mt-5 rounded-3xl bg-[#fff8ed] p-6 text-sm text-[#806d52]">

                <h3 className="font-bold">
                  ⚠ Things to verify
                </h3>

                <ul className="mt-3 space-y-2">

                  <li>• Confirm deposit amount</li>

                  <li>• Ask about maintenance charges</li>

                  <li>• Confirm apartment availability</li>

                  <li>• Verify parking terms</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-[#efdce2] bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-[#907b82]">

          <strong className="text-[#5b4049]">
            Privia AI
          </strong>{" "}
          · Intelligent apartment discovery

        </div>

      </footer>

    </main>
  );
}


function ScoreBar({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between text-sm">

        <span>{label}</span>

        <span className="font-semibold">
          {value}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#f3e3e8]">

        <div
          className="h-full rounded-full bg-[#c96b89]"
          style={{ width }}
        />

      </div>

    </div>
  );
}


export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <ApartmentDetails />
    </Suspense>
  );
}