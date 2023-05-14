import React from "react";
import { ModalProvider } from "@pancakeswap/uikit";
import { Web3ReactProvider } from "@web3-react/core";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { useThemeManager } from "./store/slices/user-slice/hooks";
import { getLibrary } from "./utils/web3React";
import { LanguageProvider } from "./contexts/Localization";
import { RefreshContextProvider } from "./contexts/RefreshContext";
import { ToastsProvider } from "./contexts/ToastsContext";
import store from "./store/store";
import * as lightTheme from "./theme/light.json";
import * as darkTheme from "./theme/dark.json";

const ThemeProviderWrapper = (props) => {
  const [isDark] = useThemeManager();
  return (
    <ThemeProvider
      theme={isDark ? darkTheme.default : lightTheme.default}
      {...props}
    />
  );
};

const Providers = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <ThemeProviderWrapper>
              <LanguageProvider>
                <RefreshContextProvider>
                  <ModalProvider>{children}</ModalProvider>
                </RefreshContextProvider>
              </LanguageProvider>
            </ThemeProviderWrapper>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Providers;
