import { Group, Button, MiniInfoCell, Paragraph } from "@vkontakte/vkui";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { IComment, INews } from "../../type";
import { getComments } from "../../api";
import { decodeHtml, getDate } from "../../utils/constant";
import СhildComments from "../СhildComments";
import DeletedComments from "../DeletedComments";

interface ICommentProps {
  item: number;
  setCountComment: React.Dispatch<React.SetStateAction<number>>;
  news: INews | null;
}
const Comment = ({ item, setCountComment, news }: ICommentProps) => {
  const [comment, setComment] = useState<IComment | null>(null);
  const [onClickComment, setOnClickComment] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect((): void => {
    getComments(item)
      .then((data: IComment) => {
        setComment(data);
      })
      .catch((err) => console.log(err));
  }, [item, setCountComment, news, dispatch]);

  useEffect((): void => {
    if (comment !== null && comment.kids) {
      setCountComment((prev) => prev + comment.kids.length);
    }
  }, [comment, setCountComment, news]);

  return (
    <div>
      {comment !== null && !comment.text && comment.deleted === true && (
        <DeletedComments time={comment.time} />
      )}
      {comment !== null && comment.text && (
        <Group style={{ marginLeft: 15 }}>
          <MiniInfoCell style={{ paddingTop: 15, paddingBottom: 0 }}>
            {comment.by}
          </MiniInfoCell>
          <MiniInfoCell>{getDate(comment.time)}</MiniInfoCell>
          <Paragraph
            style={{
              paddingTop: 10,
              paddingBottom: 15,
              paddingLeft: 15,
              paddingRight: 15,
              display: "block",
            }}
          >
            {decodeHtml(comment.text)}
          </Paragraph>
          {comment.kids && (
            <Button
              mode="link"
              style={{ marginLeft: 15, marginBottom: 10, marginTop: 0 }}
              onClick={() => {
                setOnClickComment(!onClickComment);
              }}
            >
              {!onClickComment
                ? "Показать вложенные комментарии"
                : "Скрыть вложенные комментарии"}
            </Button>
          )}
          {onClickComment &&
            comment.kids &&
            comment.kids.map((kidId: number) => (
              <СhildComments key={kidId} item={kidId} />
            ))}
        </Group>
      )}
    </div>
  );
};

export default Comment;
