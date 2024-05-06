import React from 'react'
import ReactDOM from 'react-dom/client'

// import './index.css'
import '@mantine/core/styles.css'
import {createTheme, MantineProvider} from "@mantine/core";
import CountdownTimer from "./components/CountdownTimer.tsx";

const theme = createTheme({
    /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <CountdownTimer targetDate={new Date('2024-05-07T00:00:01+02:00')} />
      </MantineProvider>
  </React.StrictMode>,
)
