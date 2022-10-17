import { FC } from "react";
import "@elastic/eui/dist/eui_theme_dark.css";

import { EuiPageTemplate, EuiProvider, EuiText } from "@elastic/eui";
import Workout_list from "./component/Workout_list";

const App: FC = () => {
  return (
    <EuiProvider colorMode="dark">
      <EuiPageTemplate>
        <EuiPageTemplate.Section
          grow={true}
          color="subdued"
          bottomBorder="extended"
        >
          <Workout_list />
        </EuiPageTemplate.Section>
      </EuiPageTemplate>
    </EuiProvider>
  );
};

export default App;
