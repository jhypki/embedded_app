import { DarkTheme } from "@react-navigation/native";

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#1e90ff",
    background: "#222222",
    card: "#1A1A1A",
    text: "#ffffff",
    border: "#2D2D2D",
    notification: "#ff80ab",
  },
};
