import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { getCoinDetail } from "../../lib/api";

const CoinDetail = (props) => {
  const { coinId } = useParams();

  const {
    sendRequest: getCoinDetails,
    data: loadedCoinDetail,
    status,
    error,
  } = useHttp(getCoinDetail);

  useEffect(() => {
    getCoinDetails(coinId);
  }, [getCoinDetails, coinId]);

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (
    status === "completed" &&
    (!loadedCoinDetail || loadedCoinDetail.length === 0) &&
    !error
  ) {
    return <p>Data not Found!</p>;
  }

  return <p>Hello</p>;
};

export default CoinDetail;
