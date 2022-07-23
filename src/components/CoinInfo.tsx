import { useState, useContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from "@mui/material";
import { Crypto } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import axios from 'axios';
import { styled } from '@mui/system';
import { CircularProgress } from "@mui/material";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { chartDays } from "../config/data";
import { SelectButton } from "./SelectButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

const StyledContainer = styled("div")(
  ({ theme }) => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  })
);




const CoinInfo = ({ coin }: any) => {
  const [historicData, setHistoricData] = useState<any | null>(null);
  const [days, setDays] = useState(1);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);
  const CryptoContext = useContext(Crypto);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, CryptoContext?.currency));
    // setflag(true);
    setHistoricData(data.prices);
  };


  const options: {} = {
    elements: {
      point: {
        radius: 1,
      },
    },
  };




  useEffect(() => {
    fetchHistoricData();
  }, [days, CryptoContext?.currency]);

  useEffect(() => {
    setLabels((historicData) ? historicData.map((coin: any) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return (days === 1 ? time : date.toLocaleDateString());
    }) : []);
    setDataSets((historicData) ? historicData.map((coin: any) => coin[1]) : []);
  }, [historicData]);
  return (
    <ThemeProvider theme={DarkTheme}>
      <StyledContainer>
        {!historicData ?
          (
            <CircularProgress
              style={{ color: "gold" }}
              size={250}
              thickness={1}
            />
          )
          :
          (
            <>
              <Line data={{
                labels: labels,
                datasets: [{
                  data: dataSets,
                  label: `Price ( Past ${days} Days ) in ${CryptoContext?.currency}`,
                  borderColor: '#EEBC1D',
                }]
              }}
                options={options}
              />
              <div
                style={{
                  display: "flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => {
                      setDays(day.value);
                      // setflag(false);
                    }}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}

              </div>
            </>
          )}
      </StyledContainer>

    </ThemeProvider>
  );
};

export default CoinInfo;