import { definePreset } from '@primeng/themes';
import Lara from '@primeng/themes/lara';

const WinePreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#ffffff', // Soft neutral white
      100: '#ebe8e8', // Very light gray
      200: '#d3cfcf', // Light warm gray
      300: '#b5b0b0', // Medium gray with slight warmth
      400: '#979191', // Deeper neutral gray
      500: '#800000', // Maroon (Main color)
      600: '#600000', // Deep maroon
      700: '#400000', // Darker maroon
      800: '#200000', // Almost black maroon
      900: '#0d0000', // Very deep maroon-black
      950: '#000000', // Pure black
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff', // Base surface color
          50: '#f9f9f9', // Very light gray
          100: '#f2f2f2', // Light gray
          200: '#e6e6e6', // Gray with subtle warmth
          300: '#cccccc', // Medium gray
          400: '#b3b3b3', // Warm medium gray
          500: '#999999', // Balanced gray
          600: '#808080', // Slightly darker gray
          700: '#555556', // Dark gray
          800: '#4d4d4d', // Very dark gray
          900: '#333333', // Near black
          950: '#1a1a1a', // Deep near black
        },
      },
      dark: {
        surface: {
          0: '#1a1a1a', // Deep near black
          50: '#333333', // Near black
          100: '#4d4d4d', // Very dark gray
          200: '#666666', // Dark gray
          300: '#808080', // Slightly darker gray
          400: '#999999', // Balanced gray
          500: '#b3b3b3', // Warm medium gray
          600: '#cccccc', // Medium gray
          700: '#e6e6e6', // Gray with subtle warmth
          800: '#f2f2f2', // Light gray
          900: '#f9f9f9', // Very light gray
          950: '#ffffff', // Base surface color
        },
      },
    },
    background: '#000000', // Default background
    foreground: '#ffffff', // Ensuring contrast

    text: {
      primary: '#400000',
      secondary: '#aaaaaa',
      inverted: '#000000',
    },
  },
  components: {
    accordion: {
      colorScheme: {
        light: {
          root: {
            background: '#800000',
          },
          header: {
            background: '#ebe8e8',
          },
        },
      },
    },
    menubar: {
      colorScheme: {
        light: {
          // Or dark, or both
          root: {
            background: '#ffffff', // White background
            color: '#800000', // Maroon text
            borderRadius: '0',
          },
          item: {
            color: '#800000', // Maroon text for items
            activeBackground: '#f5f5f5', //Lighter grey active background
            activeColor: '#800000', //Maroon active color
            focusBackground: '#f5f5f5', //Lighter grey focus background
            focusColor: '#800000', //Maroon focus color
            hoverBackground: '#f5f5f5', //Lighter grey hover background
            hoverColor: '#800000', //Maroon hover color
          },
          submenu: {
            background: '#ffffff', // White submenu background
            color: '#800000', // Maroon submenu text
          },
          mobile: {
            button: {
              color: '#800000', //Maroon mobile button color
              hoverColor: '#800000', //Maroon mobile hover color
              hoverBackground: '#f5f5f5', //Lighter grey mobile hover background
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: `'Playfair Display', 'Georgia', serif`,
  },
});

export default WinePreset;
