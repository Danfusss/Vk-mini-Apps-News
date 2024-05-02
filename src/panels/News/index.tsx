import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Panel,
  PanelHeader,
  Group,
  MiniInfoCell,
  Header,
  Link,
  Button,
  Spinner,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import Comment from "../../components/Comment";
import { INews } from "../../type";
import {
  IIsLoadingNewsState,
  setIsLoadingNews,
} from "../../redux/slice/isLoadingNewsReducer";
import { INewsState, getNewsData } from "../../redux/slice/newsSlice";
import { getNews } from "../../api";
import { getDate } from "../../utils/constant";

interface INewsProps {
  id: string;
  news?: INews | null;
}

export const News = ({ id }: INewsProps): JSX.Element => {
  const news = useSelector(
    (state: { newsReducer: INewsState }) => state.newsReducer.newsElement
  );
  const isLoading = useSelector(
    (state: { isLoadingNewsReducer: IIsLoadingNewsState }) =>
      state.isLoadingNewsReducer.isLoadingNews
  );
  const dispatch = useDispatch();
  const routeNavigator = useRouteNavigator();
  const [countComment, setCountComment] = useState<number>(0);

  useEffect((): void => {
    if (news && news.kids) {
      setCountComment(news.kids.length);
    }
  }, [news]);

  function handleUpdateNews(): void {
    if (news !== null) {
      dispatch(setIsLoadingNews(true));
      getNews(news.id)
        .then((data: INews) => {
          dispatch(getNewsData(data));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          dispatch(setIsLoadingNews(false));
        });
    }
  }

  return (
    <Panel id={id}>
      <PanelHeader>
        <Button
          mode="outline"
          style={{ marginRight: 20 }}
          onClick={() => {
            setCountComment(0);
            routeNavigator.back();
          }}
        >
          {"Вернуться к новостям"}
        </Button>
      </PanelHeader>
      {news !== null && !isLoading ? (
        <Group style={{ borderRadius: 0 }}>
          <Header>{news.title}</Header>
          <MiniInfoCell>{getDate(news.time)}</MiniInfoCell>
          <MiniInfoCell>{`Автор: ${news.by}`}</MiniInfoCell>
          <MiniInfoCell>
            <Link href={news.url} target="_blank">
              Ссылка на новость
            </Link>
          </MiniInfoCell>

          <Header>{`Комментарии ${countComment}`}</Header>
          <Button
            mode="link"
            style={{ marginLeft: 15, marginBottom: 10, marginTop: 0 }}
            onClick={handleUpdateNews}
          >
            {"Обновить комментарии"}
          </Button>
          {news.kids &&
            news.kids.map((item: number) => (
              <Comment
                key={item}
                item={item}
                setCountComment={setCountComment}
                news={news}
              />
            ))}
        </Group>
      ) : (
        <Spinner size="large" style={{ margin: "20px 0" }} />
      )}
    </Panel>
  );
};
