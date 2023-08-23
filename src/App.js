import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Main from "./pages/Main";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
}

export default App;
// import React from 'react';
// import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

// const App = () => {
//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6">My App</Typography>
//         </Toolbar>
//       </AppBar>
//       <Container>
//         <Grid container spacing={2}>
//           {[1, 2, 3, 4].map((item) => (
//             <Grid key={item} item xs={3}>
//               <div
//                 style={{
//                   backgroundColor: 'lightgray',
//                   height: '100px',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 Box {item}
//               </div>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default App;
