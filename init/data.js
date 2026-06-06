const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "A cozy cottage with direct beach access and stunning ocean views.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      filename: "cottage.jpg"
    },
    price: 1200,
    location: "Santa Monica",
    country: "USA"
  },
  {
    title: "Modern Downtown Loft",
    description: "A sleek loft in the heart of downtown with modern interiors.",
    image: {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      filename: "loft.jpg"
    },
    price: 800,
    location: "Los Angeles",
    country: "USA"
  },
  {
    title: "Mountain View Cabin",
    description: "Peaceful wooden cabin surrounded by mountains and greenery.",
    image: {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      filename: "cabin.jpg"
    },
    price: 950,
    location: "Manali",
    country: "India"
  },
  {
    title: "Luxury Desert Villa",
    description: "Experience luxury living in the middle of the desert.",
    image: {
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      filename: "villa.jpg"
    },
    price: 2000,
    location: "Dubai",
    country: "UAE"
  },
  {
    title: "Romantic Paris Apartment",
    description: "Charming apartment near the Eiffel Tower with city views.",
    image: {
      url: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
      filename: "apartment.jpg"
    },
    price: 1500,
    location: "Paris",
    country: "France"
  },
  {
    title: "Lake House Retreat",
    description: "Relaxing lake house perfect for a peaceful vacation.",
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      filename: "lakehouse.jpg"
    },
    price: 1100,
    location: "Udaipur",
    country: "India"
  },
  {
    title: "Hilltop Swiss Chalet",
    description: "Beautiful wooden chalet with snow-covered mountain views.",
    image: {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      filename: "chalet.jpg"
    },
    price: 1800,
    location: "Zurich",
    country: "Switzerland"
  },
  {
    title: "Tokyo City Studio",
    description: "Compact and stylish studio in central Tokyo.",
    image: {
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      filename: "studio.jpg"
    },
    price: 900,
    location: "Tokyo",
    country: "Japan"
  },
  {
    title: "Greek Island Villa",
    description: "White and blue villa overlooking the Aegean Sea.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      filename: "greekvilla.jpg"
    },
    price: 2200,
    location: "Santorini",
    country: "Greece"
  },
  {
    title: "New York Penthouse",
    description: "Luxury penthouse with skyline views of NYC.",
    image: {
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
      filename: "penthouse.jpg"
    },
    price: 3000,
    location: "New York",
    country: "USA"
  },
  {
    title: "Bali Jungle Resort",
    description: "Tropical resort surrounded by lush green jungle.",
    image: {
      url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      filename: "resort.jpg"
    },
    price: 1700,
    location: "Bali",
    country: "Indonesia"
  },
  {
    title: "London Townhouse",
    description: "Elegant townhouse in a quiet London neighborhood.",
    image: {
      url: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8",
      filename: "townhouse.jpg"
    },
    price: 1400,
    location: "London",
    country: "UK"
  },
  {
    title: "Rajasthan Heritage Haveli",
    description: "Traditional haveli with royal Rajasthani architecture.",
    image: {
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      filename: "haveli.jpg"
    },
    price: 1300,
    location: "Jaipur",
    country: "India"
  },
  {
    title: "Sydney Beach House",
    description: "Sunny beach house near the Sydney coastline.",
    image: {
      url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
      filename: "beachhouse.jpg"
    },
    price: 1600,
    location: "Sydney",
    country: "Australia"
  },
  {
    title: "Canadian Lake Cabin",
    description: "Wooden cabin beside a peaceful Canadian lake.",
    image: {
      url: "https://images.unsplash.com/photo-1505692794403-34d4982e2e6b",
      filename: "canadiancabin.jpg"
    },
    price: 1000,
    location: "Vancouver",
    country: "Canada"
  },
  {
    title: "Iceland Glass Igloo",
    description: "Stay under the Northern Lights in a glass igloo.",
    image: {
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
      filename: "igloo.jpg"
    },
    price: 2500,
    location: "Reykjavik",
    country: "Iceland"
  },
  {
    title: "Maldives Water Villa",
    description: "Overwater villa with direct access to crystal-clear waters.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      filename: "watervilla.jpg"
    },
    price: 3500,
    location: "Malé",
    country: "Maldives"
  },
  {
    title: "Goa Beach Shack",
    description: "Simple and cozy beach shack near the Arabian Sea.",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      filename: "shack.jpg"
    },
    price: 600,
    location: "Goa",
    country: "India"
  },
  {
    title: "Cape Town Sea View Apartment",
    description: "Modern apartment with breathtaking sea views.",
    image: {
      url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      filename: "seaview.jpg"
    },
    price: 1200,
    location: "Cape Town",
    country: "South Africa"
  },
  {
    title: "Rome Historic Flat",
    description: "Apartment located near ancient Roman landmarks.",
    image: {
      url: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
      filename: "flat.jpg"
    },
    price: 1350,
    location: "Rome",
    country: "Italy"
  },
  {
    title: "Thailand Floating Bungalow",
    description: "Unique floating bungalow surrounded by nature.",
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      filename: "bungalow.jpg"
    },
    price: 1150,
    location: "Phuket",
    country: "Thailand"
  },
  {
    title: "Kerala Backwater Houseboat",
    description: "Traditional houseboat experience in serene backwaters.",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      filename: "houseboat.jpg"
    },
    price: 900,
    location: "Alleppey",
    country: "India"
  }
];

module.exports = { data: sampleListings };