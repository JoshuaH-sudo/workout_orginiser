import { FC } from "react";
import "@elastic/eui/dist/eui_theme_dark.css";

import { EuiPageTemplate, EuiProvider, EuiText } from "@elastic/eui";

const App: FC = () => {
  return (
    <EuiProvider colorMode="dark">
      <EuiPageTemplate>
        <EuiPageTemplate.Section
          grow={false}
          color="subdued"
          bottomBorder="extended"
        >
          <EuiText textAlign="center">
            <strong>
              Stack EuiPageTemplate sections and headers to create your custom
              content order.
            </strong>
          </EuiText>
        </EuiPageTemplate.Section>
      </EuiPageTemplate>
    </EuiProvider>
  );
};

export default App;
