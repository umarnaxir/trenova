export type SeoFaq = {
  question: string;
  answer: string;
};

export type KeywordSet = {
  primary: string;
  secondary: readonly string[];
  longTail: readonly string[];
  lsi: readonly string[];
};

export type CrumbSeo = {
  name: string;
  path: string;
};

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords: KeywordSet;
  h1: string;
  breadcrumbs: CrumbSeo[];
  faqs?: readonly SeoFaq[];
  noIndex?: boolean;
  webPageType?:
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "FAQPage"
    | "SearchResultsPage"
    | "CheckoutPage";
  ogType?: "website" | "article";
};

export function flattenKeywords(set: KeywordSet): string[] {
  return [set.primary, ...set.secondary, ...set.longTail, ...set.lsi];
}

const HOME_CRUMB: CrumbSeo = { name: "Home", path: "/" };

export const FAQ_PAGE_FAQS: readonly SeoFaq[] = [
  {
    question: "What sizes does Trenova offer?",
    answer:
      "Most apparel runs XS–XXL. Check each product page for exact availability, and use our Size Guide for measurements.",
  },
  {
    question: "How long does Trenova shipping take?",
    answer:
      "Orders are processed in 1–2 business days and typically arrive within 3–7 business days across India after dispatch.",
  },
  {
    question: "Is Trenova shipping free?",
    answer:
      "Yes — complimentary shipping on prepaid orders above ₹999. A flat fee applies below that threshold at checkout.",
  },
  {
    question: "Can I return or exchange a Trenova item?",
    answer:
      "Unused items with tags can be returned or exchanged within 7 days of delivery. See Returns & Exchanges for full details.",
  },
  {
    question: "Which payment methods does Trenova accept?",
    answer:
      "UPI, major debit/credit cards, net banking, and select wallets. COD may be available on eligible orders.",
  },
  {
    question: "How do I track my Trenova order?",
    answer:
      "Use Track Order with your order number and checkout email, or open your account orders page after signing in.",
  },
  {
    question: "Does Trenova ship internationally?",
    answer:
      "Currently we ship within India. International shipping is planned for a future release.",
  },
  {
    question: "How should I care for Trenova clothing?",
    answer:
      "Follow the care label on each garment. Most pieces prefer gentle machine wash, inside-out, and low-heat drying.",
  },
  {
    question: "How do I contact Trenova support?",
    answer:
      "Email, phone, or WhatsApp via the Contact page. We typically reply within one business day.",
  },
  {
    question: "Where is Trenova based?",
    answer:
      "Trenova Retail Private Limited is based in Sopore, Jammu and Kashmir, and sells online across India at shoptrenova.in.",
  },
];

export const ABOUT_FAQS: readonly SeoFaq[] = [
  {
    question: "Who owns Trenova?",
    answer:
      "Trenova is operated by Trenova Retail Private Limited (CIN U47820JK2026PTC019539), based in Sopore, Jammu and Kashmir, India.",
  },
  {
    question: "What does Trenova sell?",
    answer:
      "Premium apparel, activewear, and accessories for men, women, and kids — including hoodies, tees, joggers, jackets, and finishing pieces.",
  },
  {
    question: "Is Trenova a luxury or affordable brand?",
    answer:
      "Trenova focuses on trusted quality and quiet luxury at accessible prices — premium feel without inflated mark-ups.",
  },
  {
    question: "Where can I shop Trenova online?",
    answer:
      "Shop the full collection at shoptrenova.in, including men’s, women’s, kids’, accessories, and new arrivals.",
  },
  {
    question: "How can I contact the Trenova team?",
    answer:
      "Use the Contact page for support, partnerships, or press. You can also reach us on Instagram @shoptrenova.",
  },
];

export const CONTACT_FAQS: readonly SeoFaq[] = [
  {
    question: "How do I contact Trenova customer support?",
    answer:
      "Email, phone, WhatsApp, or the contact form on this page. We typically reply within one business day.",
  },
  {
    question: "What is Trenova’s phone number?",
    answer:
      "Call +91 60062 16695 or +91 95966 56950 for order and product help.",
  },
  {
    question: "Where is the Trenova store located?",
    answer:
      "TI Arcade Complex, 1st Floor, Shop No. 1, Sangrama, Sopore, Jammu and Kashmir 193201, India.",
  },
  {
    question: "Can I get help with sizing or an order?",
    answer:
      "Yes. Share your order number or measurements via the form, email, or WhatsApp and our team will guide you.",
  },
  {
    question: "Do you take partnership or press enquiries?",
    answer:
      "Yes. Use the contact form and mention partnerships or press in your message so we can route it quickly.",
  },
];

export const SIZE_GUIDE_FAQS: readonly SeoFaq[] = [
  {
    question: "How do I measure myself for Trenova clothing?",
    answer:
      "Use a soft tape. Measure chest at the fullest point, waist at the natural waistline, and hips at the fullest part, keeping the tape parallel to the floor.",
  },
  {
    question: "What if I am between Trenova sizes?",
    answer:
      "Choose the larger size for everyday ease. Activewear often prefers a closer fit — check the product notes.",
  },
  {
    question: "Do kids’ sizes match age?",
    answer:
      "Kids sizes are age-banded approximations. Measure when possible for the most accurate fit.",
  },
  {
    question: "Where can I see the size chart?",
    answer:
      "Size charts for men, women, and kids are on this page. Product pages also link here from the size selector.",
  },
  {
    question: "Can Trenova help me choose a size?",
    answer:
      "Yes. Send your measurements through the Contact page and support will recommend a size.",
  },
];

export const TRACK_ORDER_FAQS: readonly SeoFaq[] = [
  {
    question: "How do I track a Trenova order?",
    answer:
      "Enter your order number and the email used at checkout. Signed-in customers can also track from Account → Orders.",
  },
  {
    question: "When will I receive tracking details?",
    answer:
      "Tracking is shared by email or SMS once your parcel leaves our facility, usually 1–2 business days after confirmation.",
  },
  {
    question: "What if my tracking is not updating?",
    answer:
      "Courier scans can lag by a few hours. If there is no movement for 48 hours after dispatch, contact support with your order number.",
  },
  {
    question: "Can I track without an account?",
    answer:
      "Yes. Guest checkout orders can be tracked here with the order number and checkout email.",
  },
  {
    question: "How long does delivery take in India?",
    answer:
      "Standard delivery is typically 3–7 business days after dispatch, depending on your pin code.",
  },
];

export const SHIPPING_FAQS: readonly SeoFaq[] = [
  {
    question: "How long does Trenova delivery take?",
    answer:
      "Processing takes 1–2 business days. Transit across India is typically 3–7 business days after dispatch.",
  },
  {
    question: "When is Trenova shipping free?",
    answer:
      "Prepaid orders above ₹999 ship free. Below that, a flat fee is shown at checkout.",
  },
  {
    question: "Do you ship to every pin code in India?",
    answer:
      "We ship India-wide. Remote pin codes may need extra transit time. Estimates appear at checkout when available.",
  },
  {
    question: "How will I know my order has shipped?",
    answer:
      "You receive confirmation on order, then tracking details as soon as the parcel leaves our facility.",
  },
  {
    question: "What if a delivery attempt fails?",
    answer:
      "Keep your phone and address accurate. Failed attempts may delay or return the shipment. Track status anytime on Track Order.",
  },
];

export const RETURNS_FAQS: readonly SeoFaq[] = [
  {
    question: "How many days do I have to return a Trenova order?",
    answer:
      "Request a return or exchange within 7 days of delivery for unused items with tags and packaging intact.",
  },
  {
    question: "What items cannot be returned?",
    answer:
      "Worn, washed, altered, damaged, or missing-tag products are not eligible. Some sealed accessories may be final sale once opened.",
  },
  {
    question: "How long do Trenova refunds take?",
    answer:
      "Approved refunds return to the original payment method within 5–7 business days after inspection.",
  },
  {
    question: "Are shipping fees refundable?",
    answer:
      "Shipping fees are non-refundable unless the return is due to a Trenova error, such as a wrong or defective item.",
  },
  {
    question: "How do I start a return or exchange?",
    answer:
      "Contact support with your order number and reason. We will share reverse-pickup or drop-off instructions.",
  },
];

export const PAYMENT_FAQS: readonly SeoFaq[] = [
  {
    question: "When is my card charged at Trenova?",
    answer:
      "Prepaid orders are charged when payment is authorized at checkout. Failed authorizations cancel the attempt automatically.",
  },
  {
    question: "Is cash on delivery available?",
    answer:
      "COD may be offered on eligible pin codes and order values. Extra COD fees, if any, are shown before you confirm.",
  },
  {
    question: "What if my payment succeeded but the order did not?",
    answer:
      "Contact support with the payment reference. Verified successes are either confirmed as orders or refunded promptly.",
  },
  {
    question: "Is checkout on Trenova secure?",
    answer:
      "Yes. Payments run through trusted gateways. We never store full card numbers. Complete checkout only on shoptrenova.in.",
  },
  {
    question: "Which payment methods can I use?",
    answer:
      "UPI, Visa, Mastercard, RuPay, net banking, select wallets, and COD where eligible.",
  },
];

export const SHOP_FAQS: readonly SeoFaq[] = [
  {
    question: "What can I shop at Trenova?",
    answer:
      "Browse the full catalog of premium fashion, activewear, and lifestyle essentials for men, women, and kids, plus accessories.",
  },
  {
    question: "Does Trenova offer new arrivals and best sellers?",
    answer:
      "Yes. Filter or open New Arrivals and Best Sellers to see the latest drops and most-loved pieces.",
  },
  {
    question: "Is there free shipping on shop orders?",
    answer:
      "Yes, on prepaid orders above ₹999. The threshold and any fees are confirmed at checkout.",
  },
  {
    question: "How do I filter Trenova products?",
    answer:
      "Use size, colour, price, and subcategory filters on this page to narrow the collection.",
  },
  {
    question: "Can I save items while I shop?",
    answer:
      "Add pieces to your wishlist or cart. Create an account to keep them across devices.",
  },
];

export const CATEGORIES_FAQS: readonly SeoFaq[] = [
  {
    question: "What fashion categories does Trenova have?",
    answer:
      "Men, Women, Kids, Accessories, Best Sellers, and New Arrivals, each with focused subcategories like tees, hoodies, and activewear.",
  },
  {
    question: "Where should I start shopping?",
    answer:
      "Choose Men, Women, or Kids for apparel, Accessories for finishing pieces, or Best Sellers if you want proven favourites.",
  },
  {
    question: "Do you sell activewear?",
    answer:
      "Yes. Find performance pieces under women’s activewear, kids’ activewear, and sports-ready men’s layers.",
  },
  {
    question: "Are sale items listed by category?",
    answer:
      "Sale pieces appear in the Sale collection and may also show inside their parent category when discounted.",
  },
  {
    question: "How do I go back to the full catalog?",
    answer:
      "Open Shop for every product, or use the header search to jump to a specific style.",
  },
];

export const SEO_PAGES = {
  home: {
    title: "Trenova | Premium Fashion & Activewear Online India",
    description:
      "Shop Trenova premium fashion, activewear & lifestyle essentials for men, women & kids. Trusted quality clothing at affordable prices. Shop India-wide now.",
    path: "/",
    h1: "Trenova premium fashion, activewear and lifestyle essentials for men, women and kids",
    breadcrumbs: [HOME_CRUMB],
    webPageType: "WebPage",
    keywords: {
      primary: "premium fashion India",
      secondary: [
        "Trenova",
        "shop Trenova",
        "activewear India",
        "online fashion store India",
        "menswear",
        "womenswear",
        "kids fashion",
      ],
      longTail: [
        "buy premium clothes online India",
        "affordable luxury clothing India",
        "premium activewear for men and women",
        "kids clothing online India",
      ],
      lsi: [
        "lifestyle essentials",
        "trusted quality apparel",
        "sportswear",
        "hoodies",
        "joggers",
        "quiet luxury",
      ],
    },
  },
  shop: {
    title: "Shop Premium Fashion & Activewear Online | Trenova",
    description:
      "Browse Trenova premium fashion, activewear and lifestyle essentials for men, women and kids. Trusted quality at fair prices. Shop the full collection now.",
    path: "/shop",
    h1: "Shop premium fashion",
    breadcrumbs: [HOME_CRUMB, { name: "Shop", path: "/shop" }],
    webPageType: "CollectionPage",
    faqs: SHOP_FAQS,
    keywords: {
      primary: "shop premium fashion online",
      secondary: [
        "Trenova shop",
        "buy clothes online India",
        "premium apparel",
        "activewear collection",
      ],
      longTail: [
        "shop premium clothing online India",
        "Trenova full collection",
        "buy activewear online India",
      ],
      lsi: ["catalog", "new arrivals", "best sellers", "lifestyle essentials"],
    },
  },
  categories: {
    title: "Fashion Categories for Men, Women & Kids | Trenova",
    description:
      "Explore Trenova fashion categories for men, women, kids and accessories. Find activewear, essentials and new drops. Browse collections and shop today.",
    path: "/categories",
    h1: "Fashion categories",
    breadcrumbs: [HOME_CRUMB, { name: "Categories", path: "/categories" }],
    webPageType: "CollectionPage",
    faqs: CATEGORIES_FAQS,
    keywords: {
      primary: "fashion categories",
      secondary: [
        "men's fashion",
        "women's fashion",
        "kids fashion",
        "accessories",
      ],
      longTail: [
        "shop men women kids clothing India",
        "Trenova category store",
      ],
      lsi: ["wardrobe", "collections", "best sellers", "new arrivals"],
    },
  },
  about: {
    title: "About Trenova | Premium Fashion & Activewear Brand",
    description:
      "Meet Trenova, a premium fashion and activewear brand from India. Trusted quality, honest pricing, and essentials for men, women and kids. Read our story.",
    path: "/about",
    h1: "About Trenova",
    breadcrumbs: [HOME_CRUMB, { name: "About Us", path: "/about" }],
    webPageType: "AboutPage",
    faqs: ABOUT_FAQS,
    keywords: {
      primary: "about Trenova",
      secondary: [
        "premium fashion brand India",
        "Trenova story",
        "Trenova Retail Private Limited",
      ],
      longTail: [
        "premium fashion brand from Jammu and Kashmir",
        "affordable luxury clothing brand India",
      ],
      lsi: ["craft", "quality", "EEAT", "Sopore", "quiet luxury"],
    },
  },
  contact: {
    title: "Contact Trenova Support | Fashion Store Help India",
    description:
      "Contact Trenova for orders, sizing, returns or partnerships. Email, phone, WhatsApp and our Sopore store. We reply in one business day. Reach us today.",
    path: "/contact",
    h1: "Contact us",
    breadcrumbs: [HOME_CRUMB, { name: "Contact Us", path: "/contact" }],
    webPageType: "ContactPage",
    faqs: CONTACT_FAQS,
    keywords: {
      primary: "contact Trenova",
      secondary: [
        "Trenova customer support",
        "Trenova phone number",
        "Trenova email",
      ],
      longTail: [
        "Trenova WhatsApp support",
        "fashion store contact India",
      ],
      lsi: ["help centre", "store location", "Sopore", "customer service"],
    },
  },
  faq: {
    title: "Trenova FAQ | Sizing, Shipping, Returns & Payments",
    description:
      "Answers on Trenova sizing, shipping, free delivery, 7-day returns, payments and order tracking. Shop with confidence — read FAQs or contact support now.",
    path: "/faq",
    h1: "Frequently asked questions",
    breadcrumbs: [HOME_CRUMB, { name: "FAQ", path: "/faq" }],
    webPageType: "WebPage",
    faqs: FAQ_PAGE_FAQS,
    keywords: {
      primary: "Trenova FAQ",
      secondary: ["sizing help", "shipping questions", "return policy FAQ"],
      longTail: [
        "how long does Trenova shipping take",
        "Trenova return policy FAQ",
      ],
      lsi: ["help centre", "order tracking", "COD", "size guide"],
    },
  },
  sizeGuide: {
    title: "Trenova Size Guide | Clothing Fit Charts for India",
    description:
      "Find your Trenova fit with size charts for men, women and kids. Measure chest, waist and hips, then shop with confidence. Check the charts and order today.",
    path: "/size-guide",
    h1: "Size guide",
    breadcrumbs: [HOME_CRUMB, { name: "Size Guide", path: "/size-guide" }],
    webPageType: "WebPage",
    faqs: SIZE_GUIDE_FAQS,
    keywords: {
      primary: "Trenova size guide",
      secondary: ["clothing size chart", "men's size chart", "women's size chart"],
      longTail: [
        "how to measure for Trenova clothes",
        "kids clothing size chart India",
      ],
      lsi: ["fit", "XS XXL", "chest waist hip", "activewear fit"],
    },
  },
  trackOrder: {
    title: "Track Trenova Order | Shipping Status Across India",
    description:
      "Track your Trenova order with order number and checkout email. See packed, shipped and delivered status across India. Check live shipment status today.",
    path: "/track-order",
    h1: "Track your order",
    breadcrumbs: [HOME_CRUMB, { name: "Track Order", path: "/track-order" }],
    webPageType: "WebPage",
    faqs: TRACK_ORDER_FAQS,
    keywords: {
      primary: "track Trenova order",
      secondary: ["order tracking India", "shipment status"],
      longTail: [
        "track clothing order online India",
        "Trenova delivery status",
      ],
      lsi: ["courier", "dispatch", "order number", "guest checkout"],
    },
  },
  shipping: {
    title: "Trenova Shipping Policy | India-Wide Delivery Times",
    description:
      "Trenova ships India-wide in 3–7 days after dispatch. Free shipping above ₹999, packed in 1–2 days. Read timelines and fees, then track your order today.",
    path: "/shipping-policy",
    h1: "Shipping & delivery",
    breadcrumbs: [
      HOME_CRUMB,
      { name: "Shipping & Delivery", path: "/shipping-policy" },
    ],
    webPageType: "WebPage",
    ogType: "article",
    faqs: SHIPPING_FAQS,
    keywords: {
      primary: "Trenova shipping policy",
      secondary: ["delivery India", "free shipping ₹999"],
      longTail: [
        "how long does Trenova delivery take",
        "free shipping on clothes India",
      ],
      lsi: ["dispatch", "courier", "pin code", "processing time"],
    },
  },
  returns: {
    title: "Trenova 7-Day Returns Policy | Easy Exchanges India",
    description:
      "Return or exchange unused Trenova pieces within 7 days of delivery. Clear eligibility, pickup steps and 5–7 day refunds. Start a return with support today.",
    path: "/returns-policy",
    h1: "Returns & exchanges",
    breadcrumbs: [
      HOME_CRUMB,
      { name: "Returns & Exchanges", path: "/returns-policy" },
    ],
    webPageType: "WebPage",
    ogType: "article",
    faqs: RETURNS_FAQS,
    keywords: {
      primary: "Trenova return policy",
      secondary: ["7-day returns", "exchange policy"],
      longTail: [
        "return clothes online India 7 days",
        "Trenova refund timeline",
      ],
      lsi: ["reverse pickup", "tags intact", "refund", "defective item"],
    },
  },
  payment: {
    title: "Trenova Payment Policy | UPI, Cards & COD in India",
    description:
      "Pay at Trenova with UPI, cards, net banking, wallets or eligible COD. Secure checkout, no stored card numbers. Read billing rules or contact support now.",
    path: "/payment-policy",
    h1: "Payment policy",
    breadcrumbs: [
      HOME_CRUMB,
      { name: "Payment Policy", path: "/payment-policy" },
    ],
    webPageType: "WebPage",
    ogType: "article",
    faqs: PAYMENT_FAQS,
    keywords: {
      primary: "Trenova payment policy",
      secondary: ["UPI checkout", "COD clothing India"],
      longTail: [
        "secure fashion checkout India",
        "Trenova cash on delivery",
      ],
      lsi: ["RuPay", "net banking", "wallets", "refunds"],
    },
  },
  privacy: {
    title: "Trenova Privacy Policy | Protecting Your Data India",
    description:
      "Learn how Trenova collects, uses and protects personal data for orders, accounts and support. No sale of data. Read your rights or email privacy requests now.",
    path: "/privacy-policy",
    h1: "Privacy policy",
    breadcrumbs: [
      HOME_CRUMB,
      { name: "Privacy Policy", path: "/privacy-policy" },
    ],
    webPageType: "WebPage",
    ogType: "article",
    keywords: {
      primary: "Trenova privacy policy",
      secondary: ["data protection", "personal information"],
      longTail: ["how Trenova uses customer data", "fashion store privacy India"],
      lsi: ["cookies", "GDPR-like rights", "account data", "CIN"],
    },
  },
  terms: {
    title: "Trenova Terms & Conditions | Store Policies in India",
    description:
      "Read Trenova terms for website use, accounts, pricing, orders and liability. Governed by Indian law. Review policies before you shop or contact us today.",
    path: "/terms",
    h1: "Terms & conditions",
    breadcrumbs: [
      HOME_CRUMB,
      { name: "Terms & Conditions", path: "/terms" },
    ],
    webPageType: "WebPage",
    ogType: "article",
    keywords: {
      primary: "Trenova terms and conditions",
      secondary: ["online store terms", "purchase terms India"],
      longTail: ["Trenova website terms of use", "fashion store legal terms"],
      lsi: ["liability", "intellectual property", "governing law", "JK courts"],
    },
  },
  comingSoon: {
    title: "Coming Soon | New Trenova Fashion Drops Across India",
    description:
      "Footwear and sports equipment are next from Trenova. Join the list for drop alerts, or shop premium fashion and activewear available now. Be first to know.",
    path: "/coming-soon",
    h1: "Coming soon",
    breadcrumbs: [HOME_CRUMB, { name: "Coming Soon", path: "/coming-soon" }],
    webPageType: "WebPage",
    keywords: {
      primary: "Trenova coming soon",
      secondary: ["new fashion drops", "footwear launch"],
      longTail: ["Trenova new collection alerts", "sports equipment coming soon"],
      lsi: ["newsletter", "waitlist", "next drop"],
    },
  },
  search: {
    title: "Search Trenova Fashion Catalog | Find Clothes Fast",
    description:
      "Search Trenova premium fashion, activewear and lifestyle essentials. Find men, women, kids and accessory styles fast. Type a keyword and shop matching pieces.",
    path: "/search",
    h1: "Search",
    breadcrumbs: [HOME_CRUMB, { name: "Search", path: "/search" }],
    webPageType: "SearchResultsPage",
    noIndex: true,
    keywords: {
      primary: "search Trenova",
      secondary: ["find clothes online"],
      longTail: ["search premium fashion India"],
      lsi: ["catalog search", "product search"],
    },
  },
  cart: {
    title: "Shopping Cart | Review Trenova Items Before Checkout",
    description:
      "Review your Trenova cart, update quantities and continue to secure checkout. Premium fashion ready when you are. Confirm your bag and place the order.",
    path: "/cart",
    h1: "Shopping cart",
    breadcrumbs: [HOME_CRUMB, { name: "Cart", path: "/cart" }],
    webPageType: "CheckoutPage",
    noIndex: true,
    keywords: {
      primary: "Trenova shopping cart",
      secondary: ["checkout bag"],
      longTail: ["review fashion cart online"],
      lsi: ["bag", "quantities"],
    },
  },
  checkout: {
    title: "Secure Checkout | Pay for Your Trenova Order Online",
    description:
      "Complete secure Trenova checkout with UPI, cards, net banking or eligible COD. Review address and payment, then place your order with trusted quality apparel.",
    path: "/checkout",
    h1: "Checkout",
    breadcrumbs: [HOME_CRUMB, { name: "Checkout", path: "/checkout" }],
    webPageType: "CheckoutPage",
    noIndex: true,
    keywords: {
      primary: "Trenova checkout",
      secondary: ["secure payment"],
      longTail: ["pay for clothing order India"],
      lsi: ["UPI", "COD"],
    },
  },
  wishlist: {
    title: "Wishlist | Saved Trenova Fashion Favourites Online",
    description:
      "Your saved Trenova pieces in one wishlist. Revisit premium fashion, activewear and essentials, then add them to cart when ready. Open favourites and shop.",
    path: "/wishlist",
    h1: "Wishlist",
    breadcrumbs: [HOME_CRUMB, { name: "Wishlist", path: "/wishlist" }],
    webPageType: "WebPage",
    noIndex: true,
    keywords: {
      primary: "Trenova wishlist",
      secondary: ["saved items"],
      longTail: ["save clothes to wishlist"],
      lsi: ["favourites"],
    },
  },
  login: {
    title: "Login to Trenova | Sign In to Your Shopping Account",
    description:
      "Sign in to your Trenova account to track orders, manage addresses and checkout faster. Access wishlist and order history. Log in to continue shopping.",
    path: "/login",
    h1: "Login",
    breadcrumbs: [HOME_CRUMB, { name: "Login", path: "/login" }],
    noIndex: true,
    keywords: {
      primary: "Trenova login",
      secondary: ["sign in"],
      longTail: ["login to fashion store account"],
      lsi: ["account"],
    },
  },
  register: {
    title: "Register at Trenova | Create Your Shopping Account",
    description:
      "Create a Trenova account to save addresses, track orders and checkout faster. Join for premium fashion updates. Register now and start shopping with ease.",
    path: "/register",
    h1: "Create account",
    breadcrumbs: [HOME_CRUMB, { name: "Register", path: "/register" }],
    noIndex: true,
    keywords: {
      primary: "Trenova register",
      secondary: ["create account"],
      longTail: ["create fashion store account India"],
      lsi: ["sign up"],
    },
  },
  forgotPassword: {
    title: "Forgot Password | Reset Your Trenova Account Login",
    description:
      "Reset your Trenova account password with your registered email. Regain access to orders, wishlist and checkout. Request a reset link and sign in again.",
    path: "/forgot-password",
    h1: "Forgot password",
    breadcrumbs: [HOME_CRUMB, { name: "Forgot Password", path: "/forgot-password" }],
    noIndex: true,
    keywords: {
      primary: "Trenova forgot password",
      secondary: ["reset password"],
      longTail: ["reset fashion store account password"],
      lsi: ["account recovery"],
    },
  },
  account: {
    title: "My Account | Orders, Profile & Addresses | Trenova",
    description:
      "Manage your Trenova account: orders, addresses, profile and saved items. Track purchases and update details in one place. Sign in to view your dashboard.",
    path: "/account",
    h1: "My account",
    breadcrumbs: [HOME_CRUMB, { name: "Account", path: "/account" }],
    noIndex: true,
    keywords: {
      primary: "Trenova account",
      secondary: ["my orders"],
      longTail: ["manage fashion store account"],
      lsi: ["profile", "addresses"],
    },
  },
  notFound: {
    title: "Page Not Found | Continue Shopping Trenova Fashion",
    description:
      "This Trenova page has moved or no longer exists. Return home to shop premium fashion, activewear and essentials for men, women and kids. Browse the store.",
    path: "/404",
    h1: "Page not found",
    breadcrumbs: [HOME_CRUMB],
    noIndex: true,
    keywords: {
      primary: "Trenova 404",
      secondary: ["page not found"],
      longTail: ["missing fashion page"],
      lsi: ["error"],
    },
  },
} as const satisfies Record<string, PageSeo>;

export type SeoPageKey = keyof typeof SEO_PAGES;
