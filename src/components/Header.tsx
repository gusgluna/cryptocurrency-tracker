import { AppBar, Container, createTheme, MenuItem, Select, Toolbar, Typography, ThemeProvider } from "@mui/material";
import { styled } from '@mui/system';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Crypto } from "../CryptoContext";
// import { CryptoState } from "../CryptoContext";

const TitleStyles = styled('div')({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  cursor: "pointer",
});

const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});


export const Header = () => {
  const CryptoContext = useContext(Crypto);
  console.log(CryptoContext?.currency, CryptoContext?.symbol);

  const navigate: any = useNavigate();

  return (
    <ThemeProvider theme={DarkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <TitleStyles>
              <Typography fontWeight='bolder' variant="h6" onClick={() => navigate('/')} >
                Crypto Hunter
              </Typography>
            </TitleStyles>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 15 }}
              value={CryptoContext?.currency}
              onChange={(e) => CryptoContext?.setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"MXN"}>MXN</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
