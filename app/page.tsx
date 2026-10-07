"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


type Apartment = {
  id: number;
  title: string;
  location: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnished: boolean;
  parking: boolean;
  petFriendly: boolean;
  amenities: string[];
  latitude: number;
  longitude: number;
};

type ScoreBreakdown = {
  budget: number;
  location: number;
  bedrooms: number;
  furnished: number;
  parking: number;
  petFriendly: number;
  total: number;
};

const apartments: Apartment[] = [
  {
    id: 1,
    title: "Green Valley Residency",
    location: "Katpadi, Vellore",
    rent: 22000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1150,
    furnished: true,
    parking: true,
    petFriendly: true,
    amenities: ["Gym", "Security", "Balcony"],
    latitude: 12.9716,
    longitude: 79.1559,
  },
  {
    id: 2,
    title: "VIT Heights",
    location: "Katpadi, Vellore",
    rent: 18000,
    bedrooms: 2,
    bathrooms: 2,
    area: 980,
    furnished: false,
    parking: true,
    petFriendly: false,
    amenities: ["Parking", "Security", "Water Supply"],
    latitude: 12.9716,
    longitude: 79.1598,
  },
  {
    id: 3,
    title: "Lakeview Residency",
    location: "Sathuvachari, Vellore",
    rent: 26000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    furnished: true,
    parking: true,
    petFriendly: true,
    amenities: ["Gym", "Garden", "Power Backup"],
    latitude: 12.9425,
    longitude: 79.1334,
  },
  {
    id: 4,
    title: "Metro Nest",
    location: "Gandhi Nagar, Vellore",
    rent: 21000,
    bedrooms: 2,
    bathrooms: 1,
    area: 900,
    furnished: true,
    parking: false,
    petFriendly: true,
    amenities: ["Security", "Balcony", "Near Shops"],
    latitude: 12.9354,
    longitude: 79.1372,
  },
  {
    id: 5,
    title: "Campus View Homes",
    location: "Katpadi, Vellore",
    rent: 24000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    furnished: true,
    parking: true,
    petFriendly: false,
    amenities: ["Parking", "Security", "Lift"],
    latitude: 12.9775,
    longitude: 79.1685,
  },
];

export default function Home() {
  const [budget, setBudget] = useState(25000);
  const [user, setUser] = useState<{
  name?: string;
  email: string;
} | null>(null);
  const [location, setLocation] = useState("Katpadi");
  const [bedrooms, setBedrooms] = useState(2);
  const [furnished, setFurnished] = useState(false);
  const [parking, setParking] = useState(false);
  const [petFriendly, setPetFriendly] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [naturalQuery, setNaturalQuery] = useState("");
const [aiSearchMessage, setAiSearchMessage] = useState("");
function handleNaturalSearch() {
  const query = naturalQuery.toLowerCase().trim();

  if (!query) {
    setAiSearchMessage("Please describe the apartment you are looking for.");
    return;
  }
  function handleLogout() {
  localStorage.removeItem("priviaUser");
  setUser(null);
}

  // -------------------------
  // BUDGET
  // -------------------------
const budgetMatch = query.match(
  /(?:₹\s*|under\s+|below\s+|budget\s*(?:of)?\s*)([\d,]+)\s*(k)?/i
);

  if (budgetMatch) {
    let detectedBudget = Number(
      budgetMatch[1].replace(/,/g, "")
    );

    if (budgetMatch[2]?.toLowerCase() === "k") {
      detectedBudget *= 1000;
    }

    setBudget(detectedBudget);
  }

  // -------------------------
  // BEDROOMS / BHK
  // -------------------------

  const bedroomMatch = query.match(
    /(\d+)\s*(?:bhk|bedroom|bedrooms|bed)/
  );

  if (bedroomMatch) {
    const detectedBedrooms = Number(bedroomMatch[1]);

    if (detectedBedrooms >= 1 && detectedBedrooms <= 3) {
      setBedrooms(detectedBedrooms);
    }
  }

  // -------------------------
  // FURNISHED
  // -------------------------

  if (
    query.includes("furnished") &&
    !query.includes("unfurnished")
  ) {
    setFurnished(true);
  }

  // -------------------------
  // PARKING
  // -------------------------

  if (
    query.includes("parking") ||
    query.includes("car parking")
  ) {
    setParking(true);
  }

  // -------------------------
  // PET FRIENDLY
  // -------------------------

  if (
    query.includes("pet") ||
    query.includes("pet friendly") ||
    query.includes("pets")
  ) {
    setPetFriendly(true);
  }

  // -------------------------
  // LOCATION
  // -------------------------

  if (query.includes("katpadi")) {
    setLocation("Katpadi");
  } else if (query.includes("sathuvachari")) {
    setLocation("Sathuvachari");
  } else if (query.includes("gandhi nagar")) {
    setLocation("Gandhi Nagar");
  } else if (query.includes("vit")) {
    setLocation("Katpadi");
  } else if (query.includes("vellore")) {
    setLocation("Vellore");
  }

  setShowResults(true);

  setAiSearchMessage(
    "Privia understood your preferences and updated your apartment matches."
  );
}
const VIT_LOCATION = {
  latitude: 12.9692,
  longitude: 79.1559,
};

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
function getLocationInsights(location: string) {
  const normalizedLocation = location.toLowerCase();

  if (normalizedLocation.includes("katpadi")) {
    return {
      score: 94,
      campus: "Excellent",
      shopping: "Very Good",
      healthcare: "Good",
      transport: "Very Good",
      lifestyle: "Student-friendly",
    };
  }

  if (normalizedLocation.includes("sathuvachari")) {
    return {
      score: 88,
      campus: "Good",
      shopping: "Very Good",
      healthcare: "Very Good",
      transport: "Good",
      lifestyle: "Quiet & residential",
    };
  }

  if (normalizedLocation.includes("gandhi nagar")) {
    return {
      score: 91,
      campus: "Good",
      shopping: "Excellent",
      healthcare: "Good",
      transport: "Very Good",
      lifestyle: "Convenient & active",
    };
  }

  return {
    score: 80,
    campus: "Good",
    shopping: "Good",
    healthcare: "Good",
    transport: "Good",
    lifestyle: "Balanced",
  };
}
  
function getScore(apartment: Apartment): ScoreBreakdown {
    let budgetScore = 0;
    let locationScore = 0;
    let bedroomScore = 0;
    let furnishedScore = 0;
    let parkingScore = 0;
    let petScore = 0;

    // -------------------------
    // BUDGET — 25 POINTS
    // -------------------------

    if (apartment.rent <= budget * 0.8) {
      budgetScore = 25;
    } else if (apartment.rent <= budget) {
      budgetScore = 22;
    } else if (apartment.rent <= budget * 1.1) {
      budgetScore = 10;
    }

    // -------------------------
    // LOCATION — 20 POINTS
    // -------------------------

    if (
      location.trim() !== "" &&
      apartment.location
        .toLowerCase()
        .includes(location.toLowerCase())
    ) {
      locationScore = 20;
    } else if (location.trim() === "") {
      locationScore = 10;
    }

    // -------------------------
    // BEDROOMS — 15 POINTS
    // -------------------------

    if (apartment.bedrooms >= bedrooms) {
      bedroomScore = 15;
    } else if (apartment.bedrooms === bedrooms - 1) {
      bedroomScore = 7;
    }

    // -------------------------
    // FURNISHED — 15 POINTS
    // -------------------------

    if (!furnished) {
      furnishedScore = 15;
    } else if (apartment.furnished) {
      furnishedScore = 15;
    }

    // -------------------------
    // PARKING — 10 POINTS
    // -------------------------

    if (!parking) {
      parkingScore = 10;
    } else if (apartment.parking) {
      parkingScore = 10;
    }

    // -------------------------
    // PET FRIENDLY — 15 POINTS
    // -------------------------

    if (!petFriendly) {
      petScore = 15;
    } else if (apartment.petFriendly) {
      petScore = 15;
    }

    const total =
      budgetScore +
      locationScore +
      bedroomScore +
      furnishedScore +
      parkingScore +
      petScore;

    return {
      budget: budgetScore,
      location: locationScore,
      bedrooms: bedroomScore,
      furnished: furnishedScore,
      parking: parkingScore,
      petFriendly: petScore,
      total: Math.min(total, 100),
    };
  }

  const sortedApartments = [...apartments].sort(
    (a, b) => getScore(b).total - getScore(a).total
  );
  const bestMatchId =
  sortedApartments.length > 0
    ? sortedApartments[0].id
    : null;

  function getMatchLabel(score: number) {
    if (score >= 90) return "Excellent match";
    if (score >= 75) return "Great match";
    if (score >= 60) return "Good match";
    return "Worth exploring";
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

          <div className="hidden gap-8 text-sm text-[#765c65] md:flex">
            <span>Discover</span>
            <span>Compare</span>
            <span>How it works</span>
          </div>

          <button className="rounded-full border border-[#e8cbd4] bg-white px-5 py-2 text-sm font-medium text-[#76515e] hover:bg-[#fff1f5]">
            Sign in
          </button>

        </div>
      </nav>


      {/* HERO */}

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20">

        <div className="max-w-3xl">

          <div className="mb-6 inline-block rounded-full border border-[#edcbd5] bg-white px-4 py-2 text-sm font-medium text-[#b05d78]">
            ✦ AI-powered apartment matching
          </div>

          <h2 className="text-5xl font-bold leading-tight md:text-7xl">
            Find a home
            <br />

            <span className="text-[#c96b89]">
              that feels like you.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#806c73]">
            Privia AI helps you discover apartments based on your
            budget, location and lifestyle preferences.
          </p>

        </div>

      </section>


      {/* SEARCH */}

      <section className="mx-auto max-w-7xl px-6">

        <div className="rounded-3xl border border-[#efdce2] bg-white p-6 shadow-lg shadow-[#d99aad]/10 md:p-8">

          <p className="text-xs font-bold uppercase tracking-widest text-[#c96b89]">
            Your preferences
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            What are you looking for?
          </h3>

          <p className="mt-1 text-sm text-[#917b83]">
  Tell Privia about your ideal apartment.
</p>

{/* NATURAL LANGUAGE SEARCH */}

<div className="mb-8 rounded-3xl border border-[#efd5dd] bg-white p-7 shadow-lg shadow-[#c96b89]/5">

  <div className="flex items-start gap-4">

    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff1f5] text-2xl">
      ✨
    </div>

    <div>

      <p className="text-xs font-bold uppercase tracking-widest text-[#c96b89]">
        Privia AI Search
      </p>

      <h2 className="mt-1 text-2xl font-bold text-[#4a3038]">
        Tell us what you're looking for
      </h2>

      <p className="mt-1 text-sm text-[#8d6b75]">
        Describe your ideal apartment naturally and Privia will
        understand your preferences.
      </p>

    </div>

  </div>

  <div className="mt-6">

    <textarea
      value={naturalQuery}
      onChange={(event) => setNaturalQuery(event.target.value)}
      placeholder='Try: "Furnished 2BHK near VIT under ₹25,000 with parking"'
      className="min-h-[120px] w-full resize-none rounded-2xl border border-[#e8cbd4] bg-[#fffafb] p-5 text-[#4a3038] outline-none transition placeholder:text-[#b69da5] focus:border-[#c96b89] focus:ring-4 focus:ring-[#c96b89]/10"
    />

  </div>

  <div className="mt-4 flex flex-wrap gap-2">

    <span className="rounded-full bg-[#fff1f5] px-3 py-1.5 text-xs text-[#a45670]">
      💰 Budget
    </span>

    <span className="rounded-full bg-[#fff1f5] px-3 py-1.5 text-xs text-[#a45670]">
      🏠 Bedrooms
    </span>

    <span className="rounded-full bg-[#fff1f5] px-3 py-1.5 text-xs text-[#a45670]">
      📍 Location
    </span>

    <span className="rounded-full bg-[#fff1f5] px-3 py-1.5 text-xs text-[#a45670]">
      🪑 Furnishing
    </span>

    <span className="rounded-full bg-[#fff1f5] px-3 py-1.5 text-xs text-[#a45670]">
      🚗 Parking
    </span>

  </div>

  <button
    onClick={handleNaturalSearch}
    className="mt-5 rounded-2xl bg-[#c96b89] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#c96b89]/20 transition hover:bg-[#b95d7c]"
  >
    ✨ Understand My Preferences
  </button>

  {aiSearchMessage && (
    <p className="mt-3 text-sm font-medium text-[#a45670]">
      ✓ {aiSearchMessage}
    </p>
  )}

</div>

{/* INPUTS */}

<div className="mt-7 grid gap-5 md:grid-cols-3"></div>


          {/* INPUTS */}

          <div className="mt-7 grid gap-5 md:grid-cols-3">

            {/* BUDGET */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Maximum monthly rent
              </label>

              <div className="relative">

                <span className="absolute left-4 top-3.5 text-[#b06b80]">
                  ₹
                </span>

                <input
                  type="number"
                  value={budget}
                  onChange={(event) =>
                    setBudget(Number(event.target.value))
                  }
                  className="w-full rounded-2xl border border-[#ead9df] bg-[#fffafb] px-4 py-3.5 pl-9 outline-none focus:border-[#d987a0]"
                />

              </div>
            </div>


            {/* LOCATION */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Preferred neighborhood
              </label>

              <input
                type="text"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                placeholder="e.g. Katpadi"
                className="w-full rounded-2xl border border-[#ead9df] bg-[#fffafb] px-4 py-3.5 outline-none focus:border-[#d987a0]"
              />

            </div>


            {/* BEDROOMS */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Minimum bedrooms
              </label>

              <select
                value={bedrooms}
                onChange={(event) =>
                  setBedrooms(Number(event.target.value))
                }
                className="w-full rounded-2xl border border-[#ead9df] bg-[#fffafb] px-4 py-3.5 outline-none focus:border-[#d987a0]"
              >
                <option value={1}>1 Bedroom</option>
                <option value={2}>2 Bedrooms</option>
                <option value={3}>3 Bedrooms</option>
              </select>

            </div>

          </div>


          {/* OPTIONS */}

          <div className="mt-6 flex flex-wrap gap-3">

            <label className="cursor-pointer rounded-2xl border border-[#ead9df] bg-[#fffafb] px-5 py-3 text-sm hover:bg-[#fff1f5]">

              <input
                type="checkbox"
                checked={furnished}
                onChange={(event) =>
                  setFurnished(event.target.checked)
                }
                className="mr-2 accent-[#c96b89]"
              />

              🛋️ Furnished

            </label>


            <label className="cursor-pointer rounded-2xl border border-[#ead9df] bg-[#fffafb] px-5 py-3 text-sm hover:bg-[#fff1f5]">

              <input
                type="checkbox"
                checked={parking}
                onChange={(event) =>
                  setParking(event.target.checked)
                }
                className="mr-2 accent-[#c96b89]"
              />

              🚗 Parking

            </label>


            <label className="cursor-pointer rounded-2xl border border-[#ead9df] bg-[#fffafb] px-5 py-3 text-sm hover:bg-[#fff1f5]">

              <input
                type="checkbox"
                checked={petFriendly}
                onChange={(event) =>
                  setPetFriendly(event.target.checked)
                }
                className="mr-2 accent-[#c96b89]"
              />

              🐾 Pet friendly

            </label>

          </div>


          {/* BUTTON */}

          <button
            onClick={() => setShowResults(true)}
            className="mt-7 rounded-2xl bg-[#c96b89] px-8 py-4 font-semibold text-white shadow-lg shadow-[#c96b89]/20 hover:bg-[#b95d7c]"
          >
            Find My Perfect Apartment →
          </button>

        </div>

      </section>


      {/* RESULTS */}

      {showResults && (

        <section className="mx-auto max-w-7xl px-6 py-16">

          <div className="mb-8">

            <p className="text-xs font-bold uppercase tracking-widest text-[#c96b89]">
              Privia AI matches
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              Apartments for you
            </h3>

            <p className="mt-2 text-[#8b757d]">
              Ranked using Privia&apos;s transparent match engine.
            </p>

          </div>
          <div className="mb-8 rounded-3xl border border-[#efd0da] bg-gradient-to-r from-[#fff4f7] to-[#fffafb] p-6 shadow-sm">
  <div className="flex items-start gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c96b89] text-xl shadow-md">
      🏆
    </div>

    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#c96b89]">
        Privia's top recommendation
      </p>

      <h3 className="mt-1 text-xl font-bold text-[#4a3038]">
        {sortedApartments[0]?.title}
      </h3>

      <p className="mt-1 text-sm text-[#80636d]">
        {sortedApartments[0]?.location}
      </p>

      <p className="mt-3 text-sm leading-6 text-[#75656b]">
        Based on your current preferences, this apartment has the
        highest overall Privia Match Score.
      </p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#a45670] shadow-sm">
        ✨ {sortedApartments[0] ? getScore(sortedApartments[0]).total : 0}/100 Match
      </div>
    </div>
  </div>
</div>


          {/* APARTMENT CARDS */}

          <div className="grid gap-7 lg:grid-cols-2">

            {sortedApartments.map((apartment) => {

              const score = getScore(apartment);

              return (

                <div
  key={apartment.id}
  className={`relative overflow-hidden rounded-3xl border bg-white shadow-md shadow-[#d99aad]/10 transition hover:-translate-y-1 hover:shadow-xl ${
  apartment.id === bestMatchId
    ? "border-[#c96b89] shadow-lg shadow-[#c96b89]/20"
    : "border-[#efdce2]"
}`}
>
  {apartment.id === bestMatchId && (
  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#c96b89] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#c96b89]/20">
    ✨ Best Match
  </div>
)}

                  {/* HEADER */}
                  <div className="flex items-center gap-3">
  {user ? (
    <>
      <Link
        href="/my-bookings"
        className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-[#80636d] transition hover:bg-[#fff1f4] sm:block"
      >
        My Bookings
      </Link>

      <div className="hidden items-center gap-2 rounded-xl bg-[#fff1f4] px-4 py-2 sm:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c96b89] text-xs font-bold text-white">
          {(user.name || user.email).charAt(0).toUpperCase()}
        </span>

        <span className="text-sm font-semibold text-[#5b4049]">
          {user.name || user.email}
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-xl border border-[#ead9df] px-4 py-2 text-sm font-semibold text-[#a45670] transition hover:bg-[#fff1f4]"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="rounded-xl px-4 py-2 text-sm font-semibold text-[#80636d] transition hover:bg-[#fff1f4]"
      >
        Sign In
      </Link>

      <Link
        href="/signup"
        className="rounded-xl bg-[#c96b89] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#c96b89]/20 transition hover:bg-[#b95d7c]"
      >
        Get Started
      </Link>
    </>
  )}
</div>

                  <div className="relative h-52 bg-gradient-to-br from-[#f5cbd7] via-[#f9e4e9] to-[#efd0da] p-7">

                    <div className="absolute bottom-6 left-7">

                      <p className="text-sm font-medium text-[#a15b72]">
                        {apartment.location}
                      </p>
                      {apartment.id === bestMatchId && (
  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f8e3ea] px-4 py-2 text-xs font-bold text-[#a45670]">
    ✨ Best Match
  </div>
)}

                      <h4 className="mt-1 text-2xl font-bold text-[#452f37]">
                        {apartment.title}
                      </h4>

                    </div>


                    {/* SCORE CIRCLE */}

                    <div className="absolute right-6 top-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">

                      <div className="text-center">

                        <div className="text-2xl font-bold text-[#c96b89]">
                          {score.total}%
                        </div>

                        <div className="text-[9px] font-bold uppercase tracking-wide text-[#987680]">
                          Match
                        </div>

                      </div>

                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="p-7">

                    {/* PRICE */}

                    <div className="flex items-center justify-between">

                      <div>

                        <span className="text-2xl font-bold">
                          ₹{apartment.rent.toLocaleString("en-IN")}
                        </span>

                        <span className="ml-1 text-sm text-[#98838a]">
                          / month
                        </span>

                      </div>

                      <span className="rounded-full bg-[#fff0f4] px-3 py-1.5 text-xs font-semibold text-[#ad5e78]">
                        {getMatchLabel(score.total)}
                      </span>

                    </div>
                    {/* BUDGET STRESS */}

<div className="mt-4">

  {apartment.rent <= budget * 0.8 ? (
    <div className="rounded-2xl bg-[#f1faf4] px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#52745c]">
          💚 Budget comfort
        </span>

        <span className="text-xs font-bold text-[#52745c]">
          Comfortable
        </span>
      </div>

      <p className="mt-1 text-xs text-[#71877a]">
        This apartment is comfortably below your maximum budget.
      </p>
    </div>
  ) : apartment.rent <= budget ? (
    <div className="rounded-2xl bg-[#fff8ed] px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#806d52]">
          💛 Budget comfort
        </span>

        <span className="text-xs font-bold text-[#806d52]">
          Within budget
        </span>
      </div>

      <p className="mt-1 text-xs text-[#8d7960]">
        The monthly rent fits within your stated budget.
      </p>
    </div>
  ) : (
    <div className="rounded-2xl bg-[#fff1f3] px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#a45670]">
          💗 Budget comfort
        </span>

        <span className="text-xs font-bold text-[#a45670]">
          Above budget
        </span>
      </div>

      <p className="mt-1 text-xs text-[#9a6d7a]">
        This apartment is above your maximum monthly budget.
      </p>
    </div>
  )}

</div>


                    {/* QUICK FACTS */}

<div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

  {/* BEDROOMS */}

  <div className="rounded-2xl bg-[#fff8fa] p-4 text-center">

    <div className="text-xl">
      🛏️
    </div>

    <div className="mt-1 font-bold">
      {apartment.bedrooms}
    </div>

    <div className="text-xs text-[#99858b]">
      Bedrooms
    </div>

  </div>


  {/* BATHROOMS */}

  <div className="rounded-2xl bg-[#fff8fa] p-4 text-center">

    <div className="text-xl">
      🛁
    </div>

    <div className="mt-1 font-bold">
      {apartment.bathrooms}
    </div>

    <div className="text-xs text-[#99858b]">
      Bathrooms
    </div>

  </div>


  {/* AREA */}

  <div className="rounded-2xl bg-[#fff8fa] p-4 text-center">

    <div className="text-xl">
      📐
    </div>

    <div className="mt-1 font-bold">
      {apartment.area}
    </div>

    <div className="text-xs text-[#99858b]">
      Sq ft
    </div>

  </div>


  {/* FURNISHING */}

  <div className="rounded-2xl bg-[#fff8fa] p-4 text-center">

    <div className="text-xl">
      🛋️
    </div>

    <div className="mt-1 font-bold">
      {apartment.furnished ? "Yes" : "No"}
    </div>

    <div className="text-xs text-[#99858b]">
      Furnished
    </div>

  </div>

</div>
{/* AMENITIES */}

<div className="mt-5">

  <p className="mb-3 text-sm font-semibold text-[#5b4049]">
    ✦ Amenities
  </p>

  <div className="flex flex-wrap gap-2">

    {apartment.amenities.map((amenity) => (
      <span
        key={amenity}
        className="rounded-full border border-[#ead9df] bg-white px-3 py-1.5 text-xs font-medium text-[#80636d]"
      >
        ✓ {amenity}
      </span>
    ))}

  </div>

</div>
{/* LOCATION INTELLIGENCE */}
<div className="mt-6 rounded-3xl border border-[#ead9df] bg-[#fffafb] p-5">
  <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8e5eb] text-xl">
      📍
    </div>

    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#a45670]">
        Location Intelligence
      </p>

      <h5 className="mt-1 font-semibold text-[#5b4049]">
        Conveniently located
      </h5>
    </div>
  </div>

  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
    {/* LOCATION SCORE */}
<div className="mt-5 rounded-3xl border border-[#ead9df] bg-white p-5">

  <div className="flex items-center justify-between">

    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#a45670]">
        Location Score
      </p>

      <h5 className="mt-1 font-semibold text-[#5b4049]">
        How convenient is this area?
      </h5>
    </div>

    <div className="text-right">
      <div className="text-3xl font-bold text-[#c96b89]">
        {getLocationInsights(apartment.location).score}
      </div>
      <p className="mt-1 text-xs font-medium text-[#a45670]">
  {score.total >= 90
    ? "Excellent match for your preferences"
    : score.total >= 75
    ? "Strong match with a few trade-offs"
    : score.total >= 60
    ? "Good option with some compromises"
    : "Consider other options before deciding"}
</p>

      <div className="text-xs font-semibold text-[#99858b]">
        / 100
      </div>
    </div>

  </div>

  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f1e1e6]">
    <div
      className="h-full rounded-full bg-[#c96b89]"
      style={{
        width: `${getLocationInsights(apartment.location).score}%`,
      }}
    />
  </div>

  <div className="mt-5 grid grid-cols-2 gap-3">

    <div className="rounded-2xl bg-[#fff8fa] p-4">
      <p className="text-xs text-[#99858b]">
        🎓 Campus
      </p>

      <p className="mt-1 text-sm font-semibold text-[#5b4049]">
        {getLocationInsights(apartment.location).campus}
      </p>
    </div>

    <div className="rounded-2xl bg-[#fff8fa] p-4">
      <p className="text-xs text-[#99858b]">
        🛒 Shopping
      </p>

      <p className="mt-1 text-sm font-semibold text-[#5b4049]">
        {getLocationInsights(apartment.location).shopping}
      </p>
    </div>

    <div className="rounded-2xl bg-[#fff8fa] p-4">
      <p className="text-xs text-[#99858b]">
        🏥 Healthcare
      </p>

      <p className="mt-1 text-sm font-semibold text-[#5b4049]">
        {getLocationInsights(apartment.location).healthcare}
      </p>
    </div>

    <div className="rounded-2xl bg-[#fff8fa] p-4">
      <p className="text-xs text-[#99858b]">
        🚇 Transport
      </p>

      <p className="mt-1 text-sm font-semibold text-[#5b4049]">
        {getLocationInsights(apartment.location).transport}
      </p>
    </div>

  </div>

  <div className="mt-4 rounded-2xl bg-[#fdf2f5] p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-[#a45670]">
      Lifestyle
    </p>

    <p className="mt-1 text-sm font-semibold text-[#5b4049]">
      {getLocationInsights(apartment.location).lifestyle}
    </p>
  </div>

  <p className="mt-4 text-xs leading-5 text-[#99858b]">
    Location insights are prototype estimates based on neighborhood
    characteristics. They are not live nearby-place or traffic data.
  </p>

</div>

    {/* LOCATION */}
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#a28c94]">
        Neighborhood
      </p>

      <p className="mt-1 font-semibold text-[#5b4049]">
        {apartment.location}
      </p>
    </div>

    {/* DISTANCE */}
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#a28c94]">
        Approx. distance from VIT
      </p>

      <p className="mt-1 font-semibold text-[#5b4049]">
        {calculateDistance(
          apartment.latitude,
          apartment.longitude,
          VIT_LOCATION.latitude,
          VIT_LOCATION.longitude
        ).toFixed(1)} km
      </p>
    </div>

  </div>

  {/* VISUAL LOCATION */}
  <div className="mt-4 overflow-hidden rounded-2xl border border-[#ead9df] bg-[#f8eef1]">
    <div className="relative flex h-40 items-center justify-center">

      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,#ffffff_0,transparent_25%),radial-gradient(circle_at_70%_60%,#ffffff_0,transparent_25%)]" />
      </div>

      <div className="relative flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c96b89] text-xl text-white shadow-lg">
          🏠
        </div>

        <div className="mt-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#6c515b] shadow-sm">
          {apartment.location}
        </div>
      </div>

    </div>
  </div>

  <p className="mt-3 text-xs leading-5 text-[#99858b]">
    Distance is an approximate straight-line estimate based on demo
    coordinates. Live map and route information can be added in a
    future version.
  </p>
</div>


                    {/* MATCH INTELLIGENCE */}

                    <div className="mt-7 rounded-3xl border border-[#efdce2] bg-[#fffafb] p-5">

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-xs font-bold uppercase tracking-widest text-[#c96b89]">
                            ✦ Privia intelligence
                          </p>

                          <h5 className="mt-1 text-lg font-bold">
                            Match breakdown
                          </h5>


                        </div>

                        <div className="text-2xl font-bold text-[#c96b89]">
                          {score.total}
                        </div>
                        <div className="mt-6 space-y-4">

  {/* Budget */}
  <div>
    <div className="mb-1 flex justify-between text-xs font-semibold text-[#75656b]">
      <span>Budget Fit</span>
      <span>{score.budget}/25</span>
    </div>

    <div className="h-2 overflow-hidden rounded-full bg-[#f3e5e9]">
      <div
        className="h-full rounded-full bg-[#c96b89]"
        style={{ width: `${(score.budget / 25) * 100}%` }}
      />
    </div>
  </div>

  {/* Location */}
  <div>
    <div className="mb-1 flex justify-between text-xs font-semibold text-[#75656b]">
      <span>Location Fit</span>
      <span>{score.location}/20</span>
    </div>

    <div className="h-2 overflow-hidden rounded-full bg-[#f3e5e9]">
      <div
        className="h-full rounded-full bg-[#c96b89]"
        style={{ width: `${(score.location / 20) * 100}%` }}
      />
    </div>
  </div>

  {/* Bedrooms */}
  <div>
    <div className="mb-1 flex justify-between text-xs font-semibold text-[#75656b]">
      <span>Bedroom Fit</span>
      <span>{score.bedrooms}/15</span>
    </div>

    <div className="h-2 overflow-hidden rounded-full bg-[#f3e5e9]">
      <div
        className="h-full rounded-full bg-[#c96b89]"
        style={{ width: `${(score.bedrooms / 15) * 100}%` }}
      />
    </div>
  </div>

  {/* Preferences */}
  <div>
    <div className="mb-1 flex justify-between text-xs font-semibold text-[#75656b]">
      <span>Preference Fit</span>
      <span>{score.furnished + score.parking + score.pet}/40</span>
    </div>

    <div className="h-2 overflow-hidden rounded-full bg-[#f3e5e9]">
      <div
        className="h-full rounded-full bg-[#c96b89]"
        style={{
          width: `${((score.furnished + score.parking + score.pet) / 40) * 100}%`,
        }}
      />
    </div>
  </div>

</div>

                      </div>
                      <div className="mt-5 rounded-3xl border border-[#ead9df] bg-white p-5">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8e3ea]">
      💡
    </div>

    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#c96b89]">
        Privia recommendation
      </p>

      <h5 className="mt-1 font-bold text-[#5b4049]">
        Why this apartment matches
      </h5>
    </div>
  </div>

  <ul className="mt-4 space-y-2 text-sm text-[#75656b]">
    {score.budget >= 22 && (
      <li>✓ Strong fit for your budget</li>
    )}

    {score.location === 20 && (
      <li>✓ Matches your preferred location</li>
    )}

    {score.bedrooms === 15 && (
      <li>✓ Meets your bedroom requirement</li>
    )}

    {furnished && apartment.furnished && (
      <li>✓ Matches your furnished preference</li>
    )}

    {parking && apartment.parking && (
      <li>✓ Parking matches your requirement</li>
    )}

    {petFriendly && apartment.petFriendly && (
      <li>✓ Suitable for pet-friendly living</li>
    )}
  </ul>
</div>
                      {apartment.id === bestMatchId && (
  <div className="mt-4 rounded-2xl bg-[#fff7fa] p-4">
    <p className="text-sm font-semibold text-[#5b4049]">
      💗 Privia recommends this apartment
    </p>

    <p className="mt-1 text-xs leading-5 text-[#806a72]">
      This listing currently has the highest overall match score
      based on your budget, location, bedroom and lifestyle preferences.
    </p>
  </div>
  
)}
       


                      {/* BUDGET */}

                      <div className="mt-5">

                        <div className="mb-2 flex justify-between text-sm">

                          <span>💰 Budget</span>

                          <span className="font-semibold">
                            {score.budget}/25
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#f3e3e8]">

                          <div
                            className="h-full rounded-full bg-[#c96b89]"
                            style={{
                              width: `${(score.budget / 25) * 100}%`,
                            }}
                          />

                        </div>

                      </div>


                      {/* LOCATION */}

                      <div className="mt-4">

                        <div className="mb-2 flex justify-between text-sm">

                          <span>📍 Location</span>

                          <span className="font-semibold">
                            {score.location}/20
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#f3e3e8]">

                          <div
                            className="h-full rounded-full bg-[#c96b89]"
                            style={{
                              width: `${(score.location / 20) * 100}%`,
                            }}
                          />

                        </div>

                      </div>


                      {/* BEDROOMS */}

                      <div className="mt-4">

                        <div className="mb-2 flex justify-between text-sm">

                          <span>🛏️ Bedrooms</span>

                          <span className="font-semibold">
                            {score.bedrooms}/15
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#f3e3e8]">

                          <div
                            className="h-full rounded-full bg-[#c96b89]"
                            style={{
                              width: `${(score.bedrooms / 15) * 100}%`,
                            }}
                          />

                        </div>

                      </div>


                      {/* FURNISHED */}

                      <div className="mt-4">

                        <div className="mb-2 flex justify-between text-sm">

                          <span>🛋️ Furnished</span>

                          <span className="font-semibold">
                            {score.furnished}/15
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#f3e3e8]">

                          <div
                            className="h-full rounded-full bg-[#c96b89]"
                            style={{
                              width: `${(score.furnished / 15) * 100}%`,
                            }}
                          />

                        </div>

                      </div>


                      {/* PARKING */}

                      <div className="mt-4">

                        <div className="mb-2 flex justify-between text-sm">

                          <span>🚗 Parking</span>

                          <span className="font-semibold">
                            {score.parking}/10
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#f3e3e8]">

                          <div
                            className="h-full rounded-full bg-[#c96b89]"
                            style={{
                              width: `${(score.parking / 10) * 100}%`,
                            }}
                          />

                        </div>

                      </div>


                      {/* PET */}

                      <div className="mt-4">

                        <div className="mb-2 flex justify-between text-sm">

                          <span>🐾 Pet friendly</span>

                          <span className="font-semibold">
                            {score.petFriendly}/15
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#f3e3e8]">

                          <div
                            className="h-full rounded-full bg-[#c96b89]"
                            style={{
                              width: `${(score.petFriendly / 15) * 100}%`,
                            }}
                          />

                        </div>

                      </div>

                    </div>


                    {/* WHY PRIVIA */}

                    <div className="mt-7 border-t border-[#f1e3e7] pt-6">

                      <h5 className="mb-3 font-semibold text-[#4a3038]">
  ✦ Why this apartment matches
</h5>

                      <ul className="space-y-2 text-sm text-[#75656b]">

  {score.budget >= 22 && (
    <li>✓ Fits comfortably within your budget</li>
  )}

  {score.location === 20 && (
    <li>✓ Located in your preferred neighborhood</li>
  )}

  {score.bedrooms === 15 && (
    <li>✓ Meets your bedroom requirement</li>
  )}

  {furnished && apartment.furnished && (
    <li>✓ Matches your furnished preference</li>
  )}

  {parking && apartment.parking && (
    <li>✓ Parking is available</li>
  )}

  {petFriendly && apartment.petFriendly && (
    <li>✓ Suitable for pet-friendly living</li>
  )}

  {!furnished && (
    <li>✓ Furnishing is optional for your search</li>
  )}

  {!parking && (
    <li>✓ Parking is optional for your search</li>
  )}

</ul>

                    </div>


                    {/* VERIFICATION INSIGHTS */}

<div className="mt-6 rounded-3xl border border-[#f0dfc8] bg-[#fffaf2] p-5">

  <div className="flex items-center gap-3">

    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1d8]">
      🔎
    </div>

    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#a47b45]">
        Privia verification
      </p>

      <h5 className="mt-1 font-semibold text-[#5d4a35]">
        Things to verify
      </h5>
    </div>

  </div>

  <ul className="mt-4 space-y-2 text-sm text-[#806d52]">

    <li>
      • Confirm the monthly rent and security deposit.
    </li>

    <li>
      • Ask whether maintenance charges are included.
    </li>

    <li>
      • Confirm parking availability and any extra charges.
    </li>

    <li>
      • Verify the apartment's availability before visiting.
    </li>

    <li>
      • Review the rental agreement and refund terms before paying.
    </li>

  </ul>

  <p className="mt-4 text-xs leading-5 text-[#9a8060]">
    Privia provides verification prompts based on the information
    available in the listing. Always confirm details directly with
    the landlord or property manager.
  </p>

</div>
                    <div className="mt-5 grid grid-cols-2 gap-3">

  <a
    href={`/apartment?id=${apartment.id}`}
   className="inline-flex items-center justify-center rounded-2xl bg-[#c96b89] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#c96b89]/20 transition hover:bg-[#b95d7c]"
  >
    View Details →
  </a>

  <button
  onClick={() => {
    if (compareList.includes(apartment.id)) {
      setCompareList(compareList.filter((id) => id !== apartment.id));
    } else if (compareList.length < 2) {
      setCompareList([...compareList, apartment.id]);
    } else {
      alert("You can compare only 2 apartments at a time.");
    }
  }}
  className={`rounded-2xl border px-4 py-4 text-sm font-semibold transition ${
    compareList.includes(apartment.id)
      ? "border-[#c96b89] bg-[#fff1f5] text-[#c96b89]"
      : "border-[#e5c5cf] bg-white text-[#a45670] hover:bg-[#fff1f5]"
  }`}
>
  {compareList.includes(apartment.id) ? "✓ Added" : "♡ Compare"}
</button>

</div>

                  </div>

                </div>

              );

            })}

          </div>

        </section>

      )}


      {/* BOTTOM SECTION */}

      {!showResults && (

        <section className="mx-auto max-w-7xl px-6 py-20">

          <div className="rounded-3xl bg-gradient-to-r from-[#f6d2dc] to-[#f9e8ec] p-10 md:p-14">

            <div className="max-w-2xl">

              <div className="mb-4 text-3xl">
                ♡
              </div>

              <h3 className="text-3xl font-bold text-[#4a3038]">
                Your next home should feel right.
              </h3>

              <p className="mt-4 leading-7 text-[#80636d]">
                Stop scrolling through endless listings.
                Let Privia AI help you discover apartments
                that actually match your lifestyle.
              </p>

            </div>

          </div>

        </section>

      )}


      {/* FOOTER */}

      <footer className="border-t border-[#efdce2] bg-white">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-8 text-sm text-[#907b82] md:flex-row">

          <p>

            <strong className="text-[#5b4049]">
              Privia AI
            </strong>{" "}

            · Intelligent apartment discovery

          </p>

          <p>
            © 2026 Privia AI · Demo listings
          </p>

        </div>

      </footer>
      {compareList.length > 0 && (
  <div className="fixed bottom-6 left-1/2 z-50 w-[92%] max-w-3xl -translate-x-1/2 rounded-3xl border border-[#efd5dd] bg-white p-4 shadow-2xl shadow-[#c96b89]/20">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <p className="font-semibold text-[#4a3038]">
          {compareList.length} apartment
          {compareList.length > 1 ? "s" : ""} selected
        </p>

        <p className="text-sm text-[#8d6b75]">
          Select up to 2 apartments to compare
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={() => setCompareList([])}
          className="rounded-2xl border border-[#e5c5cf] px-5 py-3 text-sm font-semibold text-[#a45670] hover:bg-[#fff1f5]"
        >
          Clear
        </button>

        <button
          onClick={() => {
            if (compareList.length < 2) {
              alert("Please select 2 apartments to compare.");
              return;
            }

            window.location.href = `/compare?ids=${compareList.join(",")}`;
          }}
          className="rounded-2xl bg-[#c96b89] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#c96b89]/20 hover:bg-[#b95d7c]"
        >
          Compare Apartments →
        </button>

      </div>
    </div>
  </div>
)}

    </main>
    
  );
}