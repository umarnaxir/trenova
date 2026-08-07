export const SITE = {
  name: "TRENOvA",
  legalName: "TRENOVA RETAIL PRIVATE LIMITED",
  tagline: "Premium essentials for modern living",
  description:
    "TRENOvA is a premium fashion brand offering refined apparel, activewear, and lifestyle essentials crafted for everyday elegance.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shoptrenova.in",
  domain: "shoptrenova.in",
  locale: "en_IN",
  currency: "INR",
  currencySymbol: "₹",
  email: "NovaBrands.2026@gmail.com",
  phone: "+91 60062 16695",
  phoneSecondary: "+91 95966 56950",
  whatsapp: "916006216695",
  cin: "U47820JK2026PTC019539",
  instagramHandle: "@shoptrenova",
  address: {
    line1: "TI Arcade Complex, 1st Floor, Shop No. 1",
    line2: "Sangrama",
    city: "Sopore",
    state: "Jammu and Kashmir",
    postalCode: "193201",
    country: "India",
  },
  social: {
    instagram: "https://www.instagram.com/shoptrenova/",
    facebook: "https://facebook.com/shoptrenova",
    twitter: "https://x.com/shoptrenova",
    youtube: "https://youtube.com/@shoptrenova",
  },
} as const;

export const ANNOUNCEMENTS = [
  "Complimentary shipping on orders above ₹2,999",
  "Easy 7-day returns on all apparel",
  "New arrivals just dropped — shop the latest edit",
  "Sale live now on selected essentials",
  "Premium quality. Everyday comfort. TRENOvA.",
] as const;
