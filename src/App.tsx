import { FC } from "react";
import "@elastic/eui/dist/eui_theme_dark.css";

import { EuiPageTemplate, EuiProvider } from "@elastic/eui";
import App_route from "./component/App_Route";

const App: FC = () => {
  return (
    <EuiProvider colorMode="dark">
      <EuiPageTemplate>
        <EuiPageTemplate.Section
          grow={true}
          color="subdued"
          bottomBorder="extended"
        >
        <App_route /> 
        </EuiPageTemplate.Section>
      </EuiPageTemplate>
    </EuiProvider>
  );
};

export default App;
