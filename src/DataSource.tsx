import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  DeltaMessage,
  InitialSnapshotMessage,
  isDeltaMessage,
  isInitialSnaphotMessage,
  ProductId,
  SocketMessage,
} from "./types";
import { useThrottleFn } from "react-use";

interface Props {
  productId: ProductId;
  setInitialSnapshot: (snapshot: InitialSnapshotMessage) => void;
  setDeltaMessage: (delta: DeltaMessage) => void;
}

export const DataSource = ({
  productId,
  setInitialSnapshot,
  setDeltaMessage,
}: Props) => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    "wss://www.cryptofacilities.com/ws/v1"
  );
  const lastMessage: SocketMessage | undefined = lastJsonMessage;

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: [productId],
      });
    }
  }, [readyState, sendJsonMessage, productId]);

  useEffect(() => {
    if (!lastMessage) {
      return;
    }
    if (isInitialSnaphotMessage(lastMessage)) {
      setInitialSnapshot(lastMessage);
    }
  }, [lastMessage, setInitialSnapshot]);

  useThrottleFn(
    (message: SocketMessage | undefined) => {
      if (!message) {
        return;
      }
      if (isDeltaMessage(message)) {
        setDeltaMessage(message);
      }
    },
    500,
    [lastMessage]
  );

  return null;
};
