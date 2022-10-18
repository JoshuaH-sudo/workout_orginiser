import { FC } from "react";
import "@elastic/eui/dist/eui_theme_dark.css";

import { EuiPageTemplate, EuiPanel, EuiProvider } from "@elastic/eui";
import App_route from "./component/App_Route";
import { Interpolation } from "@emotion/react";

const extend: Interpolation<any> = {
  "& > *": {
    height: "100%",
  },
  "& > * > .euiPanel": {
    height: "100%",
  },
};

const App: FC = () => {
  return (
    <EuiProvider colorMode="dark">
      <EuiPageTemplate>
        <EuiPageTemplate.Section
          grow={true}
          color="subdued"
          bottomBorder="extended"
          css={extend}
        >
          <EuiPanel grow={true}>
            <App_route />
          </EuiPanel>
        </EuiPageTemplate.Section>
      </EuiPageTemplate>
    </EuiProvider>
  );
};

export default App;
