import { DefaultTheme } from "@react-navigation/native";

export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1e90ff",
    background: "#ffffff",
    card: "#f8f9fa",
    text: "#000000",
    border: "#cccccc",
    notification: "#ff80ab",
  },
};
