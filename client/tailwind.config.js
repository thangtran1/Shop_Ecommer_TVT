module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif", "slick"],
      mes: ["slick"],
    },
    listStyleType: {
      square: "square",
      roman: "upper-roman",
    },
    extend: {
      fontFamily: {
        emoji: [
          '"Segoe UI Emoji"',
          '"Apple Color Emoji"',
          '"Noto Color Emoji"',
          "sans-serif",
        ],
      },
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#ee3131",
        overlay: "rgba(0, 0, 0, 0.8)",
      },
      colors: {
        main: "#ee3131",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",

        layout: "200px minmax(900px, 1fr) 100px",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(40px)",
            transform: "translateY(20px)",
          },
          "100%": {
            "-webkit-transform": " translateY(0px)",
            transform: "translateY(0px)",
          },
        },
        "slide-top-sm": {
          "0%": {
            "-webkit-transform": "translateY(8px)",
            transform: "translateY(8px) ",
          },
          "100%": {
            "-webkit-transform": " translateY(0px)",
            transform: "translateY(0px)",
          },
        },
        "slider-right": {
          "0%": {
            "-webkit-transform": "translateX(-500%)",
            transform: "translateX(-500%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
        "scale-up-center": {
          "0%": {
            "-webkit-transform": "scale(0.5)",
            transform: "scale(0.5)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        heart: {
          "0%": {
            transform: "scale(1)",
          },
          "25%": {
            transform: "scale(1.05)",
          },
          "50%": {
            transform: "scale(1)",
          },
          "75%": {
            transform: "scale(1.05)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        "heart-light": {
          "0%": {
            transform: "scale(1)",
            opacity: "0.6",
          },
          "25%": {
            transform: "scale(1.05)",
            opacity: "0.4",
          },
          "50%": {
            transform: "scale(1.1)",
            opacity: "0.2",
          },
          "100%": {
            transform: "scale(1.2)",
            opacity: "0",
          },
        },
        slideUpp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDownn: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
      },

      animation: {
        "slide-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-top-sm": "slide-top-login 0.2s linear both",
        "slider-right":
          "slider-right 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        fadeIn: "fadeIn 0.3s ease-in-out forwards",
        slideDown: "slideDown 0.3s ease-in-out forwards",
        "scale-up-center": "scale-up-center 0.15s ease-in-out forwards",
        heart: "heart 1.5s infinite ease-in-out",
        "heart-light": "heart-light 1.5s infinite ease-out",
        slideUpp: "slideUpp 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        slideDownn: "slideDownn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
