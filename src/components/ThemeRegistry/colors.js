export const purple = {
  100: "#EFD2F1",
  200: "#DFA5E3",
  300: "#D079D4",
  400: "#C04CC6",
  500: "#B01FB8",
  600: "#8D1993",
  700: "#6A136E",
  800: "#460C4A",
  900: "#230625",
};

export const orange = {
  100: "#FFE7D1",
  200: "#FFD0A3",
  300: "#FFB876",
  400: "#FFA148",
  500: "#FF8919",
  600: "#CC6E15",
  700: "#A65911",
  800: "#6E3F0B",
  900: "#3B1F06",
};

export const yellow = {
  100: "#FFF0D1",
  200: "#FFE1A3",
  300: "#FFD274",
  400: "#FFC346",
  500: "#FFB419",
  600: "#E3A016",
  700: "#AD790E",
  800: "#543A05",
  900: "#3D2B06",
};

export const pink = {
  100: "#FFD5E8",
  200: "#FFABD1",
  300: "#FF81BA",
  400: "#FF58A3",
  500: "#FF2E8C",
  600: "#CC2570",
  700: "#991C54",
  800: "#661238",
  900: "#33091C",
};

export const green = {
  100: "#CCEDDC",
  200: "#99DBB9",
  300: "#66C997",
  400: "#33B774",
  500: "#00A551",
  600: "#008943",
  700: "#006D36",
  800: "#00361A",
  900: "#001A0D",
};

export const blue = {
  100: "#D3EDF4",
  200: "#A7DBE9",
  300: "#7BC8DF",
  400: "#4FB6D4",
  500: "#23A5C9",
  600: "#1C83A1",
  700: "#156279",
  800: "#0E4250",
  900: "#072128",
};

export const grey = {
  50: "#F8F9FA",
  100: "#E9ECEF",
  200: "#DEE2E6",
  300: "#CED4DA",
  400: "#ADB5BD",
  500: "#6C757D",
  600: "#495057",
  700: "#343A40",
  800: "#212529",
  900: "#8C8C8C",
};

const colorsMap = { purple, orange, yellow, pink, green, blue };

const colorsPartial = Object.fromEntries(
  Object.entries(colorsMap).map(([colorName, color]) => [
    colorName,
    {
      ...color,
      light: color[400],
      main: color[500],
      dark: color[700],
      contrastText: "#FFFFFF",
    },
  ])
);

export const colors = {
  ...colorsPartial,
  grey: { ...grey, light: grey[500], main: grey[600], dark: "#000000", contrastText: "#FFFFFF" },
};
