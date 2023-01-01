import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorModeScript } from "@chakra-ui/react"
import theme from "theme/theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<App />
	</>
);
