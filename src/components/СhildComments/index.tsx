import { useState, useEffect } from "react";

import { Group, MiniInfoCell, Paragraph } from "@vkontakte/vkui";

import { IComment } from "../../type";
import { getComments } from "../../api";
import { decodeHtml, getDate } from "../../utils/constant";
import DeletedComments from "../DeletedComments";

const СhildComments = ({ item }: { item: number }) => {
  const [commentKids, setCommentKids] = useState<IComment | null>(null);

  useEffect((): void => {
    getComments(item).then((data: IComment) => {
      setCommentKids(data);
    });
  }, [item]);

  return (
    <div>
      {commentKids !== null &&
        !commentKids.text &&
        commentKids.deleted === true && (
          <DeletedComments time={commentKids.time} />
        )}
      {commentKids !== null && commentKids.text && (
        <Group style={{ marginLeft: 15 }}>
          <MiniInfoCell style={{ paddingTop: 15, paddingBottom: 0 }}>
            {commentKids.by}
          </MiniInfoCell>
          <MiniInfoCell style={{ paddingTop: 15 }}>
            {getDate(commentKids.time)}
          </MiniInfoCell>
          <Paragraph
            style={{
              paddingTop: 10,
              paddingBottom: 15,
              paddingLeft: 15,
              paddingRight: 15,
              display: "block",
            }}
          >
            {decodeHtml(commentKids.text)}
          </Paragraph>
        </Group>
      )}
    </div>
  );
};

export default СhildComments;
