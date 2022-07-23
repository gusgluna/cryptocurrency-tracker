import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Crypto } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { styled } from '@mui/system';
import axios from 'axios';
import CoinInfo from "../components/CoinInfo";
import parse from 'html-react-parser';
import { numberWithCommas } from '../config/config';
import { Typography, LinearProgress } from "@mui/material";

interface CoinTypes {
  name: string,
  image: {
    large: string;
  },
  description: {
    en: string;
  },
  market_cap_rank: number,
  market_data: {
    current_price: any;
    market_cap: any;
  };
}

const ContainerStyled = styled('div')(
  ({ theme }) => ({
    display: "flex",
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

const SideBar = styled('div')(
  ({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  })
);

const MarketData = styled('div')(
  ({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  })
);

const headingStyles: {} = {
  fontWeight: "bold",
  marginBottom: 4,
  fontFamily: "Montserrat",
};

const descriptionStyles: {} = {
  width: "100%",
  fontFamily: "Montserrat",
  padding: 4,
  paddingBottom: 2,
  paddingTop: 0,
  textAlign: "justify",
};

export const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinTypes>();
  const CryptoContext = useContext(Crypto);

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <ContainerStyled>
      <SideBar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" sx={headingStyles}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" sx={descriptionStyles}>
          {parse(`${coin?.description.en.split(". ")[0]}`)}.
        </Typography>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={headingStyles}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={headingStyles}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}>
              {CryptoContext?.symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[`${CryptoContext?.currency.toLowerCase()}`])}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={headingStyles}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {CryptoContext?.symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[`${CryptoContext?.currency.toLowerCase()}`]).slice(0, -8)}
              {"M"}
            </Typography>
          </span>
        </MarketData>
      </SideBar>
      <CoinInfo coin={coin} />
    </ContainerStyled>
  );
};;
