import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { ContentCard, Div, Card } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { getNewsData } from "../../redux/slice/newsSlice";
import { setIsLoadingNews } from "../../redux/slice/isLoadingNewsReducer";
import { INews } from "../../type";
import { getNews } from "../../api";
import { getDate } from "../../utils/constant";

const CardElement = ({ item, ids }: { item: number; ids: number[] }) => {
  const [news, setNews] = useState<INews | null>(null);
  const routeNavigator = useRouteNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoadingNews(true));
    getNews(item)
      .then((data: INews) => {
        setNews(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setIsLoadingNews(false));
      });
  }, [item, ids, dispatch]);

  return (
    <Div>
      {news !== null && (
        <Card mode="outline-tint">
          <ContentCard
            style={{ cursor: "pointer" }}
            subtitle={getDate(news.time)}
            header={news.title}
            caption={`Рейтинг: ${news.score}`}
            text={`Автор: ${news.by}`}
            onClick={() => {
              dispatch(getNewsData(news));
              routeNavigator.push(`${news.id}`);
            }}
          />
        </Card>
      )}
    </Div>
  );
};

export default CardElement;
