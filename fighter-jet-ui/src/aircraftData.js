// ─── Shared Aircraft Specifications Database ─────────────────────────────────
// Used in both the Home page Aircraft DB section and the Detection results panel.

export const CATEGORY_COLORS = {
  Bomber:       { bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.35)",   text: "#f87171" },
  Fighter:      { bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.35)",  text: "#818cf8" },
  Transport:    { bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.35)",   text: "#4ade80" },
  Tanker:       { bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.35)",  text: "#fbbf24" },
  Surveillance: { bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.35)", text: "#c084fc" },
  Attack:       { bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.35)",  text: "#fb923c" },
  Civilian:     { bg: "rgba(20,184,166,0.12)",  border: "rgba(20,184,166,0.35)",  text: "#2dd4bf" },
  Trainer:      { bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.35)",  text: "#60a5fa" },
};

export const aircraftSpecs = [
  {
    id: 0, name: "B-1 Lancer", code: "B-1", category: "Bomber",
    mach: "1.25", speed: "1,448 km/h", range: "12,000 km", ceiling: "15,240 m",
    engines: "4× F101-GE-102 turbofan", crew: "4", role: "Supersonic strategic bomber",
    weight: "87,090 kg", length: "44.5 m", wingspan: "41.8 m",
    firstFlight: "1974", status: "Active",
    description: "The Rockwell B-1 Lancer is a supersonic variable-sweep wing heavy bomber used by the U.S. Air Force. It is commonly called the 'Bone' and serves as the backbone of the USAF's long-range bomber force.",
  },
  {
    id: 1, name: "B-2 Spirit", code: "B-2", category: "Bomber",
    mach: "0.95", speed: "1,010 km/h", range: "11,100 km", ceiling: "15,200 m",
    engines: "4× F118-GE-100 turbofan", crew: "2", role: "Stealth strategic bomber",
    weight: "71,700 kg", length: "21.0 m", wingspan: "52.4 m",
    firstFlight: "1989", status: "Active",
    description: "The Northrop Grumman B-2 Spirit is an American heavy stealth bomber with a flying wing design. Its low observable stealth technology gives it the ability to penetrate anti-aircraft defenses.",
  },
  {
    id: 2, name: "B-52 Stratofortress", code: "B-52", category: "Bomber",
    mach: "0.86", speed: "1,046 km/h", range: "14,162 km", ceiling: "15,166 m",
    engines: "8× TF33-P-3/103 turbofan", crew: "5", role: "Long-range strategic bomber",
    weight: "83,250 kg", length: "48.5 m", wingspan: "56.4 m",
    firstFlight: "1952", status: "Active",
    description: "The Boeing B-52 Stratofortress is a long-range, heavy bomber capable of carrying nuclear or precision conventional ordnance. It has been operational since 1955 and remains a cornerstone of US airpower.",
  },
  {
    id: 3, name: "Boeing 737", code: "Boeing", category: "Civilian",
    mach: "0.79", speed: "842 km/h", range: "5,765 km", ceiling: "12,500 m",
    engines: "2× CFM56-7B turbofan", crew: "2", role: "Narrow-body commercial airliner",
    weight: "41,413 kg", length: "33.6 m", wingspan: "35.8 m",
    firstFlight: "1967", status: "Active",
    description: "The Boeing 737 is a short-to-medium-range twinjet narrow-body airliner and the world's best-selling commercial jetliner. Over 10,000 aircraft have been delivered to airlines worldwide.",
  },
  {
    id: 4, name: "C-130 Hercules", code: "C-130", category: "Transport",
    mach: "0.59", speed: "643 km/h", range: "6,852 km", ceiling: "10,060 m",
    engines: "4× Allison T56-A-15 turboprop", crew: "5", role: "Tactical military transport",
    weight: "34,274 kg", length: "29.8 m", wingspan: "40.4 m",
    firstFlight: "1954", status: "Active",
    description: "The Lockheed C-130 Hercules is a four-engine turboprop military transport aircraft. It is the primary tactical airlifter for many military forces worldwide and has served continuously since 1956.",
  },
  {
    id: 5, name: "C-135 Stratolifter", code: "C-135", category: "Transport",
    mach: "0.86", speed: "933 km/h", range: "15,000 km", ceiling: "15,240 m",
    engines: "4× CFM56-2B-1 turbofan", crew: "5", role: "Strategic airlift & tanker",
    weight: "44,663 kg", length: "41.5 m", wingspan: "39.9 m",
    firstFlight: "1956", status: "Phasing Out",
    description: "The Boeing C-135 Stratolifter is a military transport and tanker variant of the early Boeing 707 design. It serves as the platform for the KC-135 Stratotanker, providing global aerial refueling capability.",
  },
  {
    id: 6, name: "C-17 Globemaster III", code: "C-17", category: "Transport",
    mach: "0.77", speed: "830 km/h", range: "10,390 km", ceiling: "13,716 m",
    engines: "4× F117-PW-100 turbofan", crew: "3", role: "Strategic heavy airlift",
    weight: "128,100 kg", length: "53.0 m", wingspan: "51.7 m",
    firstFlight: "1991", status: "Active",
    description: "The Boeing C-17 Globemaster III is a large military transport aircraft. It delivers troops and cargo to main operating bases or directly to forward bases in the deployment area.",
  },
  {
    id: 7, name: "C-5 Galaxy", code: "C-5", category: "Transport",
    mach: "0.79", speed: "833 km/h", range: "12,000 km", ceiling: "10,895 m",
    engines: "4× TF39-GE-1C turbofan", crew: "7", role: "Super-heavy strategic airlift",
    weight: "169,643 kg", length: "75.3 m", wingspan: "67.9 m",
    firstFlight: "1968", status: "Active",
    description: "The Lockheed C-5 Galaxy is one of the largest military aircraft in the world. It provides the USAF with a heavy intercontinental-range strategic airlift capability.",
  },
  {
    id: 8, name: "E-3 Sentry (AWACS)", code: "E-3", category: "Surveillance",
    mach: "0.78", speed: "853 km/h", range: "7,400 km", ceiling: "10,668 m",
    engines: "4× TF33-PW-100/100A turbofan", crew: "17+", role: "Airborne warning & control",
    weight: "77,996 kg", length: "46.6 m", wingspan: "44.4 m",
    firstFlight: "1972", status: "Active",
    description: "The Boeing E-3 Sentry is an airborne early warning and control (AEW&C) aircraft that provides all-weather surveillance, command, control and communications. Its distinctive rotodome houses a powerful radar system.",
  },
  {
    id: 9, name: "F-22 Raptor", code: "F-22", category: "Fighter",
    mach: "2.25+", speed: "2,410 km/h", range: "2,960 km", ceiling: "19,812 m",
    engines: "2× F119-PW-100 turbofan w/ thrust vectoring", crew: "1", role: "5th-gen air superiority fighter",
    weight: "19,700 kg", length: "18.9 m", wingspan: "13.6 m",
    firstFlight: "1997", status: "Active",
    description: "The Lockheed Martin F-22 Raptor is a fifth-generation, single-seat, twin-engine, all-weather stealth tactical fighter aircraft. It is the world's most advanced operational air superiority fighter.",
  },
  {
    id: 10, name: "KC-10 Extender", code: "KC-10", category: "Tanker",
    mach: "0.82", speed: "982 km/h", range: "18,507 km", ceiling: "12,727 m",
    engines: "3× CF6-50C2 turbofan", crew: "4", role: "Aerial refueling tanker",
    weight: "108,948 kg", length: "55.4 m", wingspan: "50.4 m",
    firstFlight: "1980", status: "Active",
    description: "The McDonnell Douglas KC-10 Extender is an advanced tanker and cargo aircraft that provides the USAF with improved aerial refueling capability. It can transfer up to 356,000 lb of fuel.",
  },
  {
    id: 11, name: "C-21 Learjet", code: "C-21", category: "Transport",
    mach: "0.81", speed: "858 km/h", range: "3,726 km", ceiling: "15,545 m",
    engines: "2× TFE731-2-2B turbofan", crew: "2", role: "Light utility transport",
    weight: "4,536 kg", length: "14.8 m", wingspan: "13.4 m",
    firstFlight: "1980", status: "Active",
    description: "The Learjet C-21A is the military designation of the Learjet 35. It is used by the USAF for passenger and cargo airlift, as well as medical evacuation missions.",
  },
  {
    id: 12, name: "U-2 Dragon Lady", code: "U-2", category: "Surveillance",
    mach: "0.67", speed: "805 km/h", range: "10,300 km", ceiling: "21,336 m",
    engines: "1× F118-GE-101 turbofan", crew: "1", role: "High-altitude reconnaissance",
    weight: "7,711 kg", length: "19.2 m", wingspan: "31.4 m",
    firstFlight: "1955", status: "Active",
    description: "The Lockheed U-2 is a single-engine, high-altitude reconnaissance aircraft operated by the USAF and previously by the CIA. It provides continuous day or night, high-altitude, all-weather intelligence gathering.",
  },
  {
    id: 13, name: "A-10 Thunderbolt II", code: "A-10", category: "Attack",
    mach: "0.56", speed: "676 km/h", range: "4,150 km", ceiling: "13,636 m",
    engines: "2× TF34-GE-100 turbofan", crew: "1", role: "Close air support / CAS",
    weight: "11,321 kg", length: "16.3 m", wingspan: "17.5 m",
    firstFlight: "1972", status: "Active",
    description: "The Fairchild Republic A-10 Thunderbolt II (nicknamed 'Warthog') is a single-seat, twin-engine, straight-wing jet aircraft designed for close air support of ground forces. Its GAU-8 Avenger 30mm cannon is devastating.",
  },
  {
    id: 14, name: "A-26 Invader", code: "A-26", category: "Bomber",
    mach: "0.58", speed: "571 km/h", range: "2,253 km", ceiling: "9,601 m",
    engines: "2× Pratt & Whitney R-2800 radial", crew: "3", role: "Light attack bomber (WWII)",
    weight: "10,147 kg", length: "15.2 m", wingspan: "21.3 m",
    firstFlight: "1942", status: "Retired",
    description: "The Douglas A-26 Invader was an American twin-engine light bomber and ground attack aircraft. It served in WWII, the Korean War, and the Vietnam War. Late-war versions were redesignated B-26.",
  },
  {
    id: 15, name: "P-63 Kingcobra", code: "P-63", category: "Fighter",
    mach: "0.56", speed: "660 km/h", range: "724 km", ceiling: "13,106 m",
    engines: "1× Allison V-1710-93 piston", crew: "1", role: "Fighter (WWII)",
    weight: "3,988 kg", length: "9.7 m", wingspan: "11.7 m",
    firstFlight: "1942", status: "Retired",
    description: "The Bell P-63 Kingcobra was an American fighter aircraft, a development of the P-39 Airacobra. Most were supplied to the Soviet Air Forces under Lend-Lease during WWII, where they served effectively.",
  },
  {
    id: 16, name: "F-16 Fighting Falcon", code: "F-16", category: "Fighter",
    mach: "2.0", speed: "2,120 km/h", range: "3,220 km", ceiling: "15,240 m",
    engines: "1× F110-GE-100 turbofan", crew: "1", role: "Multirole combat fighter",
    weight: "8,573 kg", length: "15.1 m", wingspan: "9.8 m",
    firstFlight: "1974", status: "Active",
    description: "The General Dynamics F-16 Fighting Falcon is a multirole jet fighter aircraft. It was designed as an air superiority day fighter and evolved into a successful all-weather multirole aircraft. Over 4,600 have been built.",
  },
  {
    id: 17, name: "T-6 Texan II", code: "T-6", category: "Trainer",
    mach: "0.54", speed: "584 km/h", range: "1,685 km", ceiling: "9,449 m",
    engines: "1× PT6A-68 turboprop", crew: "2", role: "Primary pilot trainer",
    weight: "2,039 kg", length: "10.2 m", wingspan: "10.2 m",
    firstFlight: "1998", status: "Active",
    description: "The Raytheon T-6 Texan II is a single-engine turboprop aircraft used as a primary trainer for the USAF, the US Navy, and many international air forces. It replaced the T-37 Tweet.",
  },
  {
    id: 18, name: "B-29 Superfortress", code: "B-29", category: "Bomber",
    mach: "0.48", speed: "574 km/h", range: "5,230 km", ceiling: "9,710 m",
    engines: "4× Wright R-3350 radial", crew: "11", role: "Strategic bomber (WWII)",
    weight: "33,327 kg", length: "30.2 m", wingspan: "43.1 m",
    firstFlight: "1942", status: "Retired",
    description: "The Boeing B-29 Superfortress is a four-engine propeller-driven heavy bomber. It was one of the largest aircraft to see combat in WWII and is known for delivering the atomic bombs on Hiroshima and Nagasaki in 1945.",
  },
  {
    id: 19, name: "T-43 Bobcat", code: "T-43", category: "Trainer",
    mach: "0.79", speed: "840 km/h", range: "5,000 km", ceiling: "10,670 m",
    engines: "2× CFM56-3 turbofan", crew: "3+", role: "Navigator & pilot trainer",
    weight: "31,752 kg", length: "28.6 m", wingspan: "28.9 m",
    firstFlight: "1973", status: "Active",
    description: "The Boeing T-43 is a military variant of the Boeing 737-200 used as a navigator training aircraft. It is operated by the USAF to train navigators and has also served as a VIP transport.",
  },
];

/**
 * Find aircraft specs by label string returned from the backend.
 * Labels are like: "F-22", "B-1", "type-12(C-21)", "type-18(F-16)" etc.
 */
export function findSpecByLabel(label) {
  if (!label) return null;
  // Direct code match
  const direct = aircraftSpecs.find(
    (ac) => ac.code.toLowerCase() === label.toLowerCase()
  );
  if (direct) return direct;
  // Extract code from "type-XX(CODE)" format
  const match = label.match(/\(([^)]+)\)/i);
  if (match) {
    const code = match[1];
    return aircraftSpecs.find(
      (ac) => ac.code.toLowerCase() === code.toLowerCase()
    );
  }
  // Partial match fallback
  return aircraftSpecs.find(
    (ac) =>
      label.toLowerCase().includes(ac.code.toLowerCase()) ||
      ac.code.toLowerCase().includes(label.toLowerCase())
  ) || null;
}
