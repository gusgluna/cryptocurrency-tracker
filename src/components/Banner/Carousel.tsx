import { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { Link } from "react-router-dom";
import { TrendingCoins } from '../../config/api';
import { Crypto } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { numberWithCommas } from "../../config/config";


const CarouselStyled = styled('div')({
  height: "50%",
  display: "flex",
  alignItems: "center",
});

const CarouselItemStyled = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
});

const responsive: {} = {
  0: {
    items: 2,
  },
  512: {
    items: 4,
  },
};

export const Carousel = () => {
  const CryptoContext = useContext(Crypto);
  const [trendingData, setTrendingData] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(CryptoContext?.currency.toLowerCase()));
    // console.log(data);
    setTrendingData(data);
  };

  console.log(trendingData);


  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CryptoContext?.currency]);


  const items = trendingData.map((coin: any) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coins/${coin.id}`}>
        <CarouselItemStyled>
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <span>
            {coin?.symbol}
            &nbsp;
            <span
              style={{
                color: profit ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>
            {CryptoContext?.symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </CarouselItemStyled>
      </Link>

    );
  });

  return (
    <CarouselStyled>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />

    </CarouselStyled>
  );
};
