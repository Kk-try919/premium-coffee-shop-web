/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, ShoppingBag, ArrowRight, Leaf, Globe, Share2, Mail, User } from "lucide-react";

// --- Data ---

const homeProducts = [
  {
    id: 1,
    name: "Americano",
    category: "The Purist",
    price: "$4.50",
    description: "Double-shot of our signature organic blend extended with hot spring water for a clean, bold finish.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz7L_TeFzyNJs8hmKX7hetGYzb_c5vhebTnva30XQLNyVqwsztprNT0l1K71ZK76etAcIxXc7sj74o-fjSRD2QeDserPLNw3eKPvK_HQXLn7gGr7XNdA76iZFNvo50JvpmVXOcsYUZm2wvojIO7QP5EzTZqUuZFwoLA0vwtHqz7ggMhC4jw9BYk0k_SDUJtFvQgL7g9D2QS6rIybSz_AfoKPplu4ayKxlMhYSaXt9Ux7i5bTPs25fXhtCIHrofc1vZtU6KtLfU"
  },
  {
    id: 2,
    name: "Espresso",
    category: "Intense Aroma",
    price: "$3.75",
    description: "A potent, concentrated shot extracted under high pressure to reveal complex notes of dark chocolate and citrus.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp9GPMhDrVOH-YKlsjjRZWUKIZiXKjCmUvhBI8Z155uNZtCb6nysdDJPMXAIVqx8saPkNmHNYpKN0GqMKkL57lurQxZTfNInz25UK_pAucxf7R_3axO8fVLDCOJwVmQXNZUaWcYqIMs78FOPBFp3vQH92HQtqE5F86MSTb4QukQ_jZonSjGuiXz9WAStkKwseC77QLTmTkI3QV-uKaGKls1dofyjU9EowCA4KDl4CKwftDcKmcqgxfRMyPZy6qfw8lgf45d2PB",
    highlight: true
  },
  {
    id: 3,
    name: "Mocha",
    category: "Indulgent Blend",
    price: "$5.25",
    description: "Rich Belgian chocolate melted into velvety steamed milk and balanced with our smooth house espresso.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzbhFr8V-8jwJMIRb4GlnLdeXUPOIRjHeOqcsTYeEy6QGqOSsPPu5CpyzgrT3GabkxHjjezuX3PlQboWC2eQsVCRjH4Q22bKrGhFAE5YFqwshJx5FU8RFaGrKAzkdavU9b9MuPnHINmC9xGCLGzI_uo9ijCKsCIOXsGJ56HQUSFY2MXDKp-O3Kv87ANXsSj9C_NJ6fRcCkLVNJIRcLKysd01CiAwbHcln18lpUhUPePTDwfmCcQGnVQWJLPG73OVLefCSYYu_t"
  }
];

const hotProducts = [
  {
    id: 101,
    name: "Flat White",
    price: "$2",
    description: "Silky microfoam poured over a double shot of rich espresso for a smooth, velvety finish.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7leYGIbAx8KNbrCpt00LljUwglR8BkShTTLRgBP85hvL8UGsLII-DrFCs_0usd-RtETcFSJJpLRAo6D4FeiWoRm7tzPv6_RbQsP_UY3TgsBN0kuupJlyw1lox4i13BbavR62Y2tIhAVgC436WzeXXjxymTFI7fRDVQGgX2iHrPapE9F9JrPmXLTP7sFxyWmElqUCTpSOYZOiuqdf42tx14nrnFwzDUdVIMgN7etBaTQoKQd_4iZx-E-qqd5sueDVpgeQj7ANz",
    bestSeller: true
  },
  {
    id: 102,
    name: "Caramel Macchiato",
    price: "$2",
    description: "Vanilla-flavored syrup, freshly steamed milk, and espresso topped with a caramel drizzle.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc9XneQAR92aED1f0Ia51qQ7eETM3giVydVGRW_mtp3OZxNFzgYbD6V2i-PwZmMlvqX35s0KGMnZDoFhYOSg2CvQmtgd4dM2GHQI4M6p8Kf4xYKMQ5aPkXce3N0j_aWXlCKlSDJDn7pd6UE6NWeHanvgUlbfL6IN7sscoWfytY4jDVkrojzHycLB7h0lGg1FPAKJ5sx4tue59dKSied3O-P7FJ5S1b16b7dIG0rlxr8vY3Trn0BKfKI0Vtw04ZcI4G3Xwnv57D"
  },
  {
    id: 103,
    name: "Cappuccino",
    price: "$2",
    description: "An even distribution of espresso, steamed milk, and thick foam for a bold, creamy texture.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoE4cCTY-PMyQ9kmq_msyFbNWzBSpOxhS3569LdERQLBgm3a1tXIjkFA_D4UDsJqsHIfQaIkxZ6BMv1sZNOUTRg7VZnFSHKVkmB6KBjZuS1VhrX-GpwoWfPb76D9V3YI8MLlh6h8POLvyEa1T2HZJrdswuCAN-LdV72XDCEuwEu4dfxaNFx9iPz50-cdHuf80uiNTHsd_E6BuohX2W8-UtcR3Lod6x62OZwH6n5unF6Si_6zzTQSUwSx0dCxwEvgF8y8jAj1m-"
  },
  {
    id: 104,
    name: "Americano (Hot)",
    price: "$2",
    description: "Espresso shots topped with hot water to produce a light layer of crema, purely artisanal.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcJSUrGrXjNItMBC0bCsqHNVOYP9Il1wjK4O0KBXOu7sHsCsU_3QVzJpCuz2ieYewPv-oS2pSesJ4Gvg6LQEe8_rWHmxjUbTi9pZkTE00Bkinz4f3EQiyVL2TFyJUg1hnPlZ8BPwCUz2qkM6ycKC_5vBbVT9m0TIyn6mKp1o7ECXR4fVAExl0d6HI_PJXX3yT4np26zOUWTb_qY4F6b7EM2faYAHAS1nw3ok01tzNXk2dvIWzxHz7vUxhIn6zbwSwK2vGTobwI"
  },
  {
    id: 105,
    name: "Latte",
    price: "$2",
    description: "Our signature espresso balanced with steamed milk and a light, elegant layer of foam.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsFzFcgOPr3gMx87JxzCALKoOzSuZeRHWE_zZpLL3Eyv_MLUYOvYEFzBDpRqcoWK-JNenY78ohZLZ8ZkLryqFdtyRDK_uUuvjTpYCbtfBG37eun1M3qH7VtIA_8Kp17nSygT90O0HPvW3g3-JdC4ngdRzLtlEvnKOS193qHzrD1F93_ADTk3B6g1CdG2Y9DU7mEG1Y8ZvzTQ_huNcEgvmp3-GQHl8pAqJCNrmWh2F4jXMn21EbqWfxntGcAuXmoWPF88ZoX_f9"
  },
  {
    id: 106,
    name: "Mocha (Hot)",
    price: "$2",
    description: "Indulgent chocolate sauce combined with espresso and steamed milk for a decadent treat.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtNeweHEFNTPe7433ulvALj3pqk2rj2xKmuxXdvl3uNSMUsYY1QEXmPavwGTyGgqdbltfM3CEVnr44rISaxY9h-1mwLLoPLOzZyaZKBo53khdegjNWhUTnw9uaDmpafpacOpgm7w2SJIQzUfi3U1I6RgyUeZ3_co-fNF9C2-afBdbut_obA-REw5s-rC39AAn1coSytgtdKk5APb9xOMimY29SGmydjzTkMwYJsYDUXtrl2FkklkwnUTwdMoxtrWJh88etWK6O"
  }
];

const iceProducts = [
  {
    id: 201,
    name: "Iced Americano",
    price: "$2",
    description: "Double shot of our signature forest-grown espresso over crystalline ice. Bold, crisp, and pure.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAkYl9Ju0HON7WVgy6yNvt72IoEHBTdG2p91xr_bjgAxzX7IkqLGWsnXdeYeV-T188ppPyahonWJnyQinNzqfmrlXhrW9Pc-tjg3J0xtBP9rfJ-1VL-QgZn2hhWcgt4LvOUHXO6DQlo5YyqSp9bbGqH0lBDvmdyXc-NWpQDyQUF_gh9FXGnyWCagxsCVQ4tLNHrQrEyu46HWRPbwxud3sEvcWxPEhTn6yBTnvtVTbluzmqltPzU6imrNtkOB5N7btNJHb6Ghis"
  },
  {
    id: 202,
    name: "Iced Latte",
    price: "$2",
    description: "Velvety cold-pressed milk meets our rich espresso, creating a marble-like dance of flavor.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0IFkl0pd6x2CmfDKS2icfOI_sDe_xQxG_sJz0caEWYf1uyRB75zKbEGFpEzDsW2-HqFr3UsSkkLo5gLnWSrlX2m-renOxegm1jBjnqweOua9VKHxUihD1HJBA1n7ddPW1Nxk8LLFUl_ckUL0c-9vgpOxm5YWNvSpLHx5X9K6VZtlUHjERKnNEOuTOK83n41hNSSg-l4NbvTLSfVaXXV5XhcdT1pW2OM4AMzDtAfpPqQ1L-7XGoH9y5ppDp1mlgSrniYVruDSm"
  },
  {
    id: 203,
    name: "Iced Mocha",
    price: "$2",
    description: "Single-origin artisan chocolate melted into espresso, served over ice for an indulgent chill.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIAYq_F63NSnbVF8YxX13KnY5-xhAHK1keiqnlBVF8dJ3eOlNv2SVIX5QuXxFmEjXdQd1IvByMQ2QDvNhQojsqn0mRWtpbs4C4XOak-FRyhCKvgiDQJv1QFpiVeRS1POPHV4rcltB1I1ZAKCyQvfV9T2KLgZTUlMQT5FBBDYH4uA7fQ9VNbLqKPhsv3OgD7IIdR4057CRTksNkT713J5R_VIOFyVYihEoTWrwWN9q8pVu55P3cQXBEO4KdeC0bwb34ZUiwWsFT"
  },
  {
    id: 204,
    name: "Caramel Macchiato",
    price: "$2",
    description: "Hand-crafted caramel ribbons layered with chilled milk and a crowning espresso float.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6tDnDXyRCn8gt12LVS1T605ZgPjhZMvZmR9MkbBzbwrnjfVK03cVQa6IeKwMIOnkAKzM-yg6Lr9P5RxjbHRzZW10Q08vt5RrdfphRppCyQzUshkkcjkrJcAfXCQTt0bPuR7TlH-YWj7nh6i71FGfOg23KGImgKqoDNkBIYEVskElHpwNNu8gDNT25BbbvdBMWr5pxVYtTx_K8OqSBPvPCKn3FlyrGv8dujMlsLL0MQf_8NGO5i4bFGKCbQLatuVPpHg-v7HaB"
  },
  {
    id: 205,
    name: "Signature Cold Brew",
    price: "$2",
    description: "Steeped for 18 hours in artisanal spring water for an exceptionally smooth, low-acid profile.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB-mGyPFt5daKElL5F3V7Ox8_JpNB7ZvmBrSRzi7ja4hcprYd_RCIq0i0vH8tNSydyzWy7NCjIEp19CNkUB7RytWqvH36KVtBDPHZLS6Em4K4tFppgXAijNCEsLxbbraWzauUpUZEsZhKNeqNW8urSlbubUiBVEf47zmhv-sBUBaadqKawmHXypkboveMfAZ9rcBOJa46rAqljjAR0ZjG5mKiYK-k7YzbjPfsx6YGBTrYOhLGjvC0G5hyBbX3rXvfgm8wpEy3Z"
  },
  {
    id: 206,
    name: "Vietnamese Iced",
    price: "$2",
    description: "A robust dark roast paired with premium sweetened condensed milk over crushed ice.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXWlUOuO31PW1gbcLWbi5g_buPI-_EN-8m966R4VxnAHFQsXm6SSsmTryFAp1cH7wWLAgbotUWB1VvZIMLD-oD3OyhdzsatnMcJ0TIIXr57vJphS1d5yFKVy4IgDaF4Om8BDugKEkzulrBPAhIV8RkMhlb63UgjaPkutpyGXUCdnNoyT0O_4eYwh7UnaQzf42e8XYZGRuUjhtCkFXV0-8wqFZ1QBtFQcbQuPcwHe3nr850SbJgpMJc8IH_9NrZq0Gx1Xf_enIq"
  }
];

const smoothieProducts = [
  {
    id: 301,
    name: "Green Revitalizer",
    price: "$6.50",
    description: "A nutrient-dense blend of organic kale, green apple, ginger, and cold-pressed lemon.",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 302,
    name: "Berry Antioxidant",
    price: "$7.25",
    description: "Wild blueberries, raspberries, and strawberries blended with organic coconut water and chia seeds.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 303,
    name: "Tropical Glow",
    price: "$6.75",
    description: "Mango, pineapple, and passion fruit with a hint of turmeric and organic orange juice.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=1000&auto=format&fit=crop"
  }
];

const iceCreamProducts = [
  {
    id: 401,
    name: "Madagascar Vanilla",
    price: "$5.50",
    description: "Pure organic cream infused with hand-scraped Madagascar vanilla beans for a timeless classic.",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 402,
    name: "Dark Chocolate Sea Salt",
    price: "$5.75",
    description: "70% dark Belgian chocolate with a touch of Maldon sea salt for a sophisticated balance.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 403,
    name: "Pistachio Praline",
    price: "$6.25",
    description: "Roasted Sicilian pistachios folded into a creamy base with crunchy praline bits.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=1000&auto=format&fit=crop"
  }
];

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (p: string) => void }) => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
    <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setCurrentPage('home')}
      >
        <Coffee className="text-primary w-8 h-8" />
        <span className="text-2xl font-extrabold tracking-tighter text-primary font-headline">
          The Organic coffee
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-10 font-label font-medium tracking-tight uppercase text-xs">
        <button 
          onClick={() => setCurrentPage('hot')}
          className={`transition-all hover:text-secondary relative ${currentPage === 'hot' ? 'text-on-surface font-bold' : 'text-on-surface opacity-80'}`}
        >
          Hot
        </button>
        <button 
          onClick={() => setCurrentPage('ice')}
          className={`transition-all hover:text-secondary ${currentPage === 'ice' ? 'text-on-surface font-bold' : 'text-on-surface opacity-80'}`}
        >
          Ice
        </button>
        <button 
          onClick={() => setCurrentPage('smoothie')}
          className={`transition-all hover:text-secondary ${currentPage === 'smoothie' ? 'text-on-surface font-bold' : 'text-on-surface opacity-80'}`}
        >
          Smoothie
        </button>
        <button 
          onClick={() => setCurrentPage('ice-cream')}
          className={`transition-all hover:text-secondary ${currentPage === 'ice-cream' ? 'text-on-surface font-bold' : 'text-on-surface opacity-80'}`}
        >
          Ice Cream
        </button>
      </div>

      <div className="flex items-center gap-6">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 flex items-center justify-center text-primary hover:opacity-70 transition-opacity"
        >
          <ShoppingBag className="w-6 h-6" />
        </motion.button>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 flex items-center justify-center text-primary hover:opacity-70 transition-opacity"
        >
          <User className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-white w-full pt-20 pb-12 border-t border-outline-variant/10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 max-w-7xl mx-auto">
      <div>
        <div className="font-headline font-bold text-lg text-primary mb-6 uppercase tracking-widest">
          THE ORGANIC EDITORIAL
        </div>
        <p className="font-body text-base italic text-on-surface-variant leading-relaxed">
          © 2024 The Organic Editorial. All rights reserved. Crafted for the Sensory Curator.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-headline font-bold text-primary text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 font-body italic text-on-surface-variant">
            <li><a className="hover:text-secondary transition-colors duration-300" href="#">Sourcing</a></li>
            <li><a className="hover:text-secondary transition-colors duration-300" href="#">Sustainability</a></li>
            <li><a className="hover:text-secondary transition-colors duration-300" href="#">Journal</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline font-bold text-primary text-sm uppercase tracking-wider">Connect</h4>
          <div className="flex border-b border-primary/20 pb-1 mt-4">
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm font-body italic w-full p-0 placeholder:text-on-surface-variant/50" 
              placeholder="Email Address" 
              type="email"
            />
            <button className="text-primary">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-20 pt-8 border-t border-outline-variant/10 text-center">
      <p className="font-label text-[10px] tracking-[0.3em] uppercase opacity-40">
        © 2024 The Organic Editorial. All rights reserved.
      </p>
    </div>
  </footer>
);

const HomePage = ({ onOrderNow }: { onOrderNow: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Hero Section */}
    <section className="relative min-h-[800px] flex items-center px-8 md:px-20 overflow-hidden">
      <div className="grid md:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-5 z-10"
        >
          <span className="font-label text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            Artisanal Sourcing
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-primary leading-[1.1] tracking-tighter mb-8">
            The Soul of the <span className="text-secondary italic font-body font-normal">Bean.</span>
          </h1>
          <p className="font-body text-lg text-on-surface-variant mb-10 max-w-md leading-relaxed">
            Curating the finest organic harvests from high-altitude estates, delivered with cinematic precision to your morning ritual.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onOrderNow}
              className="bg-primary text-on-primary px-10 py-5 rounded-md font-label font-bold text-sm tracking-widest uppercase shadow-lg shadow-primary/10 hover:bg-primary-container transition-colors"
            >
              ORDER NOW
            </button>
            <button className="border border-outline-variant text-primary px-10 py-5 rounded-md font-label font-bold text-sm tracking-widest uppercase hover:bg-surface-container-low transition-colors">
              OUR STORY
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="md:col-span-7 relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF_pVOzxYds0rAMn5Kpvcs7D2fMBzuzmE21b6eGD5XF1sFyuG-CS5VAu2ZYpK9UvOgOhgLKrFDK9Ybat1-PcbqdIK0DI2d_Rwm_rIMMmDFGyzdy2M_dcM0bzOsz9SN5l7qS8iYPPUq30YCx-gk-JWswA3ZRKsJJ5I1D0bUAi0UH7adEHI3HC-WIFzdtIPs6bxjPy99iJJwu4cWtMtqgnmPZW6WeLEjvRD9mnQJDhqx6TVbbItGJ_ste84leXuZOZdkfXlUXubH" 
              alt="Cinematic coffee experience"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/40 to-transparent"></div>
          </div>
          
          {/* Overlapping Accent */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-10 -left-10 hidden md:block w-48 h-48 bg-surface-container-low p-6 rounded-xl shadow-xl"
          >
            <div className="flex flex-col h-full justify-between">
              <Leaf className="text-secondary w-10 h-10" />
              <p className="font-headline text-sm font-bold leading-tight">100% Sustainable Organic Harvest</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Product Grid */}
    <section className="mt-40 px-8 md:px-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tighter mb-4">Chef's Recommendations</h2>
          <p className="font-body text-on-surface-variant italic">A curated selection of our most celebrated profiles, roasted in small batches.</p>
        </div>
        <button 
          onClick={onOrderNow}
          className="font-label font-bold text-secondary text-sm tracking-widest uppercase flex items-center gap-2 hover:translate-x-1 transition-transform"
        >
          View Full Menu <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {homeProducts.map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ y: -10 }}
            className={`group flex flex-col h-full w-[400px] max-w-full mx-auto bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(26,28,28,0.04)] hover:shadow-[0_12px_32px_rgba(26,28,28,0.08)] transition-all duration-500 border border-outline-variant/5 ${product.highlight ? 'ring-4 ring-primary-container/10' : ''}`}
          >
            <div className="w-[400px] h-[400px] max-w-full overflow-hidden relative mx-auto">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {product.highlight && (
                <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur px-3 py-1 rounded-full font-headline font-bold text-xs text-primary">
                  CHEF'S PICK
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="mb-4">
                <span className="font-label text-[10px] tracking-[0.2em] font-bold text-secondary uppercase mb-2 block">
                  {product.category}
                </span>
                <h3 className="font-headline font-bold text-2xl text-primary">{product.name}</h3>
              </div>
              <p className="text-[#727774] text-sm font-body leading-relaxed mb-6 flex-grow">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-headline font-black text-xl text-primary">{product.price}</span>
                <button className="bg-primary text-on-primary px-5 py-2.5 rounded-md font-headline font-bold text-xs tracking-wider uppercase hover:bg-primary-container transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Experience Banner */}
    <section className="mt-40 bg-surface-container-low py-32">
      <div className="max-w-7xl mx-auto px-8 md:px-20 grid md:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 md:order-1">
          <div className="bg-primary-container aspect-video rounded-2xl overflow-hidden relative shadow-2xl">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzrDjuWT5TdcknGJsxviRkbKSHvD5rWTqbPrGFp7yzLEXiLWigk0E1h8Yp7PzFcbouPhN36vs3PcVJRq6SI-T34nMFInjnz74E772Y7Nw1KKUora21t3M8c8ze-k29cWpWmhx52CAb2AU4ZL_MKDs7lKozaQ9cAy31NKxzn2L7uztMhKzFi3Hi1s7IJ6NOCj6k6hBy24mOvN1bY4ATpyyS0xyrXXuD2CinYj8chyGaAPhgGKg4ILvLp93QuH3Dk7C6bKwX-QiG" 
              alt="Coffee beans"
              className="w-full h-full object-cover opacity-80 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <h3 className="font-headline text-4xl font-extrabold text-primary mb-6 tracking-tight">The Editorial Standard.</h3>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-8 italic">
            "Every cup tells the story of its origin. From the volcanic soils of Ethiopia to the mist-covered mountains of Colombia, we curate experiences that linger long after the final sip."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClK5NKy1qKm-LcAznR-4iWF5T-qy-sgamDvdPtvaAlwZOYa-qWy6LjHtOWZSj3IkedXBJ4SfYyhWNqyrLSuArdUdHh13TXBjSeDjZSBfemI66Y_6YB9Ferli2DA6eaVYm7b-J0Z3ru-bNSO8XlblKI6xn2GYX56A3UQv1SUFdqpUFKCBH9_XMtLjmISX3ofLWhJZQKeDL7ji7oZi4bd97m3tiVfIV1mQCJRFN4zpHpiAcJifFVFKlhZB6M5EwNAr5cVYB-KHvs" 
                alt="Julian Thorne"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="font-label font-bold text-sm text-primary">Julian Thorne</p>
              <p className="font-label text-xs text-secondary tracking-widest uppercase font-medium">Head of Curation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);

const HotClassicsPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Cinematic Hero Banner Section */}
    <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden pt-20">
      <img 
        alt="Atmospheric coffee shop scene" 
        className="absolute inset-0 w-full h-full object-cover" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsqlqMAAL1YfWVDvGqIsmIk4KtTszzIpyH3VemLx2Fo2dGneJfwDnd5URE2SZ7jjszHUGi0afjRosvFsS4XOgP6GJhNJzfaxWFurB0ldcHUkcJj-Jx5h4LzKnzTCkVTxCuQVeGU9wlnCWJFuiSov11PxQVP6snrCwmfJJUIn7xp6jwsTFqVnGLOiSuOOn_i5HR5PcDxk7kmfjgmitL3XSDcOx6_dwQXd_h8neCOZwutR3rj2xYO5Jhk8mRX1EWwScoTE2e9E31"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center px-6">
        <span className="font-headline font-bold text-white/90 tracking-[0.3em] text-xs uppercase mb-4 block">PREMIUM ROASTS</span>
        <h1 className="font-headline font-extrabold text-5xl md:text-8xl text-white tracking-tighter">
          OUR HOT <span className="italic font-normal">CLASSICS</span>
        </h1>
        <p className="mt-8 text-white/80 max-w-2xl mx-auto text-lg leading-relaxed italic font-body">
          Sourced from high-altitude estates, each cup is an editorial of flavor, warmth, and precision.
        </p>
      </div>
    </section>

    <main className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Menu Grid (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {hotProducts.map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ y: -10 }}
            className="group flex flex-col h-full w-[400px] max-w-full mx-auto bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(26,28,28,0.04)] hover:shadow-[0_12px_32px_rgba(26,28,28,0.08)] transition-all duration-500 border border-outline-variant/5"
          >
            <div className="w-[400px] h-[400px] max-w-full overflow-hidden relative mx-auto">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
              />
              {product.bestSeller && (
                <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur px-3 py-1 rounded-full font-headline font-bold text-xs text-primary">
                  BEST SELLER
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="font-headline font-bold text-2xl text-primary mb-2">{product.name}</h3>
              <p className="text-[#727774] text-sm font-body leading-relaxed mb-6 flex-grow">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-headline font-black text-xl text-primary">{product.price}</span>
                <button className="bg-primary text-on-primary px-5 py-2.5 rounded-md font-headline font-bold text-xs tracking-wider uppercase hover:bg-primary-container transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  </motion.div>
);

const IcePage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Cinematic Hero Banner Section */}
    <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden pt-20">
      <img 
        alt="Cinematic Iced Coffee" 
        className="absolute inset-0 w-full h-full object-cover" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAkYl9Ju0HON7WVgy6yNvt72IoEHBTdG2p91xr_bjgAxzX7IkqLGWsnXdeYeV-T188ppPyahonWJnyQinNzqfmrlXhrW9Pc-tjg3J0xtBP9rfJ-1VL-QgZn2hhWcgt4LvOUHXO6DQlo5YyqSp9bbGqH0lBDvmdyXc-NWpQDyQUF_gh9FXGnyWCagxsCVQ4tLNHrQrEyu46HWRPbwxud3sEvcWxPEhTn6yBTnvtVTbluzmqltPzU6imrNtkOB5N7btNJHb6Ghis"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 text-center px-6">
        <h2 className="text-white font-headline text-5xl md:text-7xl font-extrabold tracking-tighter uppercase">Our Iced Selection</h2>
        <div className="mt-4 w-24 h-1 bg-secondary mx-auto"></div>
      </div>
    </section>

    {/* Product Grid (3 columns) */}
    <main className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {iceProducts.map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ y: -10 }}
            className="group flex flex-col h-full w-[400px] max-w-full mx-auto bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(26,28,28,0.04)] hover:shadow-[0_12px_32px_rgba(26,28,28,0.08)] transition-all duration-500 border border-outline-variant/5"
          >
            <div className="w-[400px] h-[400px] max-w-full overflow-hidden relative mx-auto">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="font-headline font-bold text-2xl text-primary mb-2">{product.name}</h3>
              <p className="text-[#727774] text-sm font-body leading-relaxed mb-6 flex-grow">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-headline font-black text-xl text-primary">{product.price}</span>
                <button className="bg-primary text-on-primary px-5 py-2.5 rounded-md font-headline font-bold text-xs tracking-wider uppercase hover:bg-primary-container transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>

    {/* Newsletter / Editorial Section */}
    <section className="max-w-7xl mx-auto px-8 mb-24">
      <div className="bg-primary-container rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">
        <div className="p-12 md:p-20 flex-1">
          <h2 className="font-headline text-4xl font-bold text-on-primary mb-6 tracking-tight">Stay Chilled.</h2>
          <p className="font-body text-on-primary/80 mb-8 max-w-sm">Join our Journal for monthly insights into rare beans and exclusive recipes from our master roasters.</p>
          <form className="flex max-w-md" onSubmit={(e) => e.preventDefault()}>
            <input 
              className="bg-white/10 border-none text-on-primary placeholder:text-on-primary/40 focus:ring-1 focus:ring-on-primary/50 w-full rounded-l-lg p-4 font-label text-xs uppercase tracking-widest" 
              placeholder="Email address" 
              type="email"
            />
            <button className="bg-white text-primary font-label text-[10px] font-bold tracking-widest uppercase px-8 rounded-r-lg hover:bg-surface-container transition-colors">Subscribe</button>
          </form>
        </div>
        <div className="w-full md:w-1/3 h-64 md:h-auto self-stretch">
          <img 
            alt="coffee beans" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmFHOyxaZ8BzORthJ9V5KhHTcCp08eqAn7sC-norCDipbhyAlKl2TGpyUZcyTb5zIHxo6f7Zub9Omhru510xJ0nvqtZdva7zactA0fSgrhTSdrzheSbWuZdYec3dVaHsu4UNNZiMcssOQxo1zTqJoCThu3syHUJ6kfgvDHysPf4m0CPs6n05DAtjHNzj8AI7DrLxHhCb-S5SiREa7ERvhy9yavzqpspnPutRuuDdpu0L1nkDEYxqpG31nZsRs2oi37CCsgYN4J"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  </motion.div>
);

const SmoothiePage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden pt-20">
      <img 
        alt="Vibrant Smoothie" 
        className="absolute inset-0 w-full h-full object-cover" 
        src="https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=1000&auto=format&fit=crop"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 text-center px-6">
        <h2 className="text-white font-headline text-5xl md:text-7xl font-extrabold tracking-tighter uppercase">The Smoothie Collection</h2>
        <div className="mt-4 w-24 h-1 bg-secondary mx-auto"></div>
      </div>
    </section>

    <main className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {smoothieProducts.map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ y: -10 }}
            className="group flex flex-col h-full w-[400px] max-w-full mx-auto bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(26,28,28,0.04)] hover:shadow-[0_12px_32px_rgba(26,28,28,0.08)] transition-all duration-500 border border-outline-variant/5"
          >
            <div className="w-[400px] h-[400px] max-w-full overflow-hidden relative mx-auto">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="font-headline font-bold text-2xl text-primary mb-2">{product.name}</h3>
              <p className="text-[#727774] text-sm font-body leading-relaxed mb-6 flex-grow">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-headline font-black text-xl text-primary">{product.price}</span>
                <button className="bg-primary text-on-primary px-5 py-2.5 rounded-md font-headline font-bold text-xs tracking-wider uppercase hover:bg-primary-container transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  </motion.div>
);

const IceCreamPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden pt-20">
      <img 
        alt="Artisanal Ice Cream" 
        className="absolute inset-0 w-full h-full object-cover" 
        src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=1000&auto=format&fit=crop"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 text-center px-6">
        <h2 className="text-white font-headline text-5xl md:text-7xl font-extrabold tracking-tighter uppercase">Artisanal Ice Cream</h2>
        <div className="mt-4 w-24 h-1 bg-secondary mx-auto"></div>
      </div>
    </section>

    <main className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {iceCreamProducts.map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ y: -10 }}
            className="group flex flex-col h-full w-[400px] max-w-full mx-auto bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(26,28,28,0.04)] hover:shadow-[0_12px_32px_rgba(26,28,28,0.08)] transition-all duration-500 border border-outline-variant/5"
          >
            <div className="w-[400px] h-[400px] max-w-full overflow-hidden relative mx-auto">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="font-headline font-bold text-2xl text-primary mb-2">{product.name}</h3>
              <p className="text-[#727774] text-sm font-body leading-relaxed mb-6 flex-grow">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-headline font-black text-xl text-primary">{product.price}</span>
                <button className="bg-primary text-on-primary px-5 py-2.5 rounded-md font-headline font-bold text-xs tracking-wider uppercase hover:bg-primary-container transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  </motion.div>
);

const ComingSoonPage = ({ title }: { title: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-[70vh] flex flex-col items-center justify-center px-8 pt-20"
  >
    <Coffee className="w-16 h-16 text-secondary mb-6 opacity-20" />
    <h2 className="font-headline text-4xl font-extrabold text-primary mb-4 uppercase tracking-tighter">{title}</h2>
    <p className="font-body italic text-on-surface-variant text-lg">Our artisanal {title.toLowerCase()} collection is currently being curated.</p>
    <button 
      onClick={() => window.location.href = '/'}
      className="mt-10 border border-outline-variant text-primary px-8 py-3 rounded-md font-label font-bold text-xs tracking-widest uppercase hover:bg-surface-container-low transition-colors"
    >
      Return to Home
    </button>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onOrderNow={() => setCurrentPage('hot')} />;
      case 'hot':
        return <HotClassicsPage />;
      case 'ice':
        return <IcePage />;
      case 'smoothie':
        return <SmoothiePage />;
      case 'ice-cream':
        return <IceCreamPage />;
      default:
        return <HomePage onOrderNow={() => setCurrentPage('hot')} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <AnimatePresence mode="wait">
        <div key={currentPage}>
          {renderPage()}
        </div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
