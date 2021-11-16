const lightTheme = {
  background_color: "#FFF",
  surface: "",
  primary: "#52BB76",
  primary_variant: "#69D766",
  secondary: "#005CE6",
  secondary_variant: "",
  error: "#B00020",
  error_variant: "#9e0420",
  success: "#00ca72",
  on_background: "",
  on_surface: "",
  on_primary: "#FFFFFF",
  on_secondary: "#FFFFFF",
  on_error: "#FFFFFF",
  star_color: "#FF9F43",
  arrows_color: "#8D8D8D",
  border_color: "#e6e9ef",
  darken_border_color: "",
  borderBlur: "",
  button_disabled: "",
  hover: "rgba(0, 0, 0, 0.1)",
};

const darkTheme = {
  background_color: "#FFF",
  surface: "",
  primary: "#52BB76",
  primary_variant: "#69D766",
  secondary: "#005CE6",
  secondary_variant: "",
  error: "#B00020",
  error_variant: "#9e0420",
  success: "#00ca72",
  on_background: "",
  on_surface: "",
  on_primary: "#FFFFFF",
  on_secondary: "#FFFFFF",
  on_error: "#FFFFFF",
  star_color: "#FF9F43",
  arrows_color: "#8D8D8D",
  border_color: "#e6e9ef",
  darken_border_color: "",
  borderBlur: "",
  button_disabled: "",
  hover: "rgba(0, 0, 0, 0.1)",
};

const theme = (mode) => (mode === "dark" ? darkTheme : lightTheme);

export default theme;
