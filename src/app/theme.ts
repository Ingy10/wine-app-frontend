import { definePreset } from '@primeng/themes';
import Lara from '@primeng/themes/lara';

const WinePreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#fzfzf9', // Soft neutral white
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
