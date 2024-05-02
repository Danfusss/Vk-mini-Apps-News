import { Panel, PanelHeader, Button, Group, Spinner } from "@vkontakte/vkui";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IIsLoadingState,
  setIsLoading,
} from "../../redux/slice/isLoadingReducer";
import { getIds } from "../../api";
import CardElement from "../../components/CardElement";

export const Home = ({ id }: { id: string }): JSX.Element => {
  const [ids, setIds] = useState<number[] | []>([]);

  const isLoading = useSelector(
    (state: { isLoadingReducer: IIsLoadingState }) =>
      state.isLoadingReducer.isLoading
  );

  const dispatch = useDispatch();

  async function getIdsArr() {
    dispatch(setIsLoading(true));
    getIds()
      .then((data: number[]) => {
        if (data) {
          const sortArr = data.sort((a: number, b: number) => a - b);
          const reverse = sortArr.reverse();
          if (reverse.length > 100) {
            setIds(reverse.slice(0, 100));
          } else {
            setIds(reverse);
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }

  useEffect(() => {
    getIdsArr();

    const interval = setInterval(() => {
      getIdsArr();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  function handleUpdate() {
    getIdsArr();
  }

  return (
    <Panel id={id}>
      <PanelHeader>{"Новости"}</PanelHeader>
      {!isLoading ? (
        <Group>
          <Button
            style={{ marginLeft: 17, marginTop: 15 }}
            onClick={handleUpdate}
          >
            {"Обновить ленту"}
          </Button>
          {ids.length !== 0 &&
            ids.map((item: number, i: number) => (
              <CardElement key={i} item={item} ids={ids} />
            ))}
        </Group>
      ) : (
        <Spinner size="large" style={{ margin: "20px 0" }} />
      )}
    </Panel>
  );
};
