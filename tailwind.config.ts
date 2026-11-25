import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      container: { center: true, padding: "15px" },
      colors: {
        paper: "var(--paper)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        blush: "var(--blush)",
        plum: "var(--plum)",
        sage: "var(--sage)",
        // legacy (Phase 2-3 mein purane components ke saath hat jayenge)
        accent: "#FF8F97",
        blackish: "#1b1b1b", // pehle '#' missing tha
        keyframes: {
          marquee: {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-50%)" },
          },
        },
        animation: {
          marquee: "marquee 30s linear infinite",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//      container:{
//       center:true,
//       padding:"15px"
//      },

//      colors:{
//       accent:"#FF8F97", 
//       blackish:"1b1b1b",
//      },
//     },
//   },
//   plugins: [],
// };
// export default config;
