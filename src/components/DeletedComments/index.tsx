import { Group, MiniInfoCell, Paragraph } from "@vkontakte/vkui";
import { getDate } from "../../utils/constant";

const DeletedComments = ({ time }: { time: number }): JSX.Element => {
  return (
    <>
      <Group style={{ marginLeft: 15 }}>
        <MiniInfoCell style={{ paddingTop: 15 }}>{getDate(time)}</MiniInfoCell>
        <Paragraph
          style={{
            paddingTop: 10,
            paddingBottom: 15,
            paddingLeft: 15,
            paddingRight: 15,
            display: "block",
          }}
        >
          {"Пользователь удалил комментарий"}
        </Paragraph>
      </Group>
    </>
  );
};

export default DeletedComments;
