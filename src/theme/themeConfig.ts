import { ThemeConfig } from "antd";

// Light Theme
export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    colorBgContainer: "#ffffff",
    colorText: "#171c43",
    colorTextHeading: "#171c43",
    colorBgSpotlight: "#000000",
  },
};

// Dark Theme
export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    colorBgContainer: "#1a1a1a",
    colorText: "#ffffff",
    colorTextHeading: "#ffffff",
    colorBgSpotlight: "#ffffff",
    colorTextLightSolid: "#000000",
  },
  components:{
    Table: {
      headerBg:"#303030",
      rowHoverBg: "#303030"
    },
    Select: {
      colorTextPlaceholder: "rgba(255, 255, 255, 0.25)",
      optionSelectedColor: "#000000",
    }
  },
};
