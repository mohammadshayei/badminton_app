const lightTheme = {
  background_color: "#F2F2F2",
  surface: "#FFFFFF",
  primary: "#14C9CB",
  primary_variant: "",
  secondary: "#0FBED8",
  secondary_variant: "#0F8FA3",
  error: "#EB5757",
  error_variant: "#9e0420",
  success: "#6FCF97",
  info: "#2F80ED",
  warning: "#F2C94C",
  on_background: "#000",
  on_surface: "#000",
  on_primary: "#FFFFFF",
  on_secondary: "#FFFFFF",
  on_error: "#FFFFFF",
  star_color: "#FF9F43",
  arrows_color: "#8D8D8D",
  border_color: "#0000001a",
  darken_border_color: "#00000033",
  borderBlur: "",
  button_disabled: "",
  hover: "rgb(245, 245, 245)",
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
  hover: "rgb(210, 210, 210)",
};

const theme = (mode) => (mode === "dark" ? darkTheme : lightTheme);

export default theme;
