import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Carousel } from './Carousel';




const BannerStyled = styled('div')({
  backgroundImage: "url(https://raw.githubusercontent.com/piyush-eon/react-crypto-tracker/master/public/banner2.jpg)",
});

const BannerContainerStyled: {} = {
  height: 400,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
};

const Tagline = styled('div')({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

export const Banner = () => {
  return (
    <BannerStyled>
      <Container sx={BannerContainerStyled}>
        <Tagline>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Tagline>
        <Carousel />
      </Container>
    </BannerStyled>
  );
};
