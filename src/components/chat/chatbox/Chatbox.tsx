import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { positionValues, Scrollbars } from "react-custom-scrollbars-2";
import styles from "./Chatbox.module.scss";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { saveMessages } from "src/redux/slice/message.slice";
import { getMessages } from "src/services/message.service";
import Header from "src/components/chat/header/Header";
import AvatarMessage from "src/components/chat/message/avatar/AvatarMessage";
import TextMessage from "src/components/chat/message/plaintext/TextMessage";
import ImageMessage from "src/components/chat/message/image/ImageMessage";
import AttachmentMessage from "src/components/chat/message/attachment/AttachmentMessage";
import OwnMessage from "src/components/chat/message/own/OwnMessage";
import Footer from "src/components/chat/footer/Footer";
import { messageCardBg } from "src/utils/constants";

const Chatbox = (props: IChatboxProps) => {
  const { handleSend, receiveMessage } = props;

  const [firstRender, setFirstRender] = useState(true);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const scrollbarRef = useRef<Scrollbars>(null);
  const previousAction = useRef("");
  const dispatch = useAppDispatch();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const { messagesList } = useAppSelector((state) => state.message);

  const { _id } = currentConversation;

  const handleSubmitText = (message: string) => {
    if (!message) return;

    const newMessage: IMessage = {
      sender: userId,
      content: message,
      conversationId: _id,
      sentAt: moment().toISOString(),
    };

    handleSend(newMessage);
    dispatch(saveMessages([...messagesList, newMessage]));
    previousAction.current = "enter_new_message";
  };

  const handleSubmitFile = (file: IFile, type: string) => {
    const newMessage: IMessage = {
      sender: userId,
      content: type,
      conversationId: _id,
      sentAt: moment().toISOString(),
    };

    if (type === "image") {
      newMessage.imageId = file;
    }

    if (type === "attachment") {
      newMessage.attachmentId = file;
    }

    handleSend(newMessage);
    dispatch(saveMessages([...messagesList, newMessage]));
    previousAction.current = "enter_new_message";
  };

  const handleScroll = async (position: positionValues) => {
    setScrollHeight(position.scrollHeight);

    if (position.scrollHeight > position.clientHeight && firstRender) {
      scrollbarRef.current?.scrollToBottom();
      setFirstRender(false);
      return;
    }

    if (!firstRender && position.scrollHeight > scrollHeight) {
      if (previousAction.current === "enter_new_message") {
        scrollbarRef.current?.scrollToBottom();
      }
      return;
    }

    if (!firstRender && position.top === 0) {
      const fetchPage = currentPage + 1;
      const res = await getMessages({
        conversationId: _id,
        current: fetchPage,
      });

      if (res.statusCode === 200 && res.data) {
        const newMessages = res.data.items;
        if (newMessages.length > 0) {
          dispatch(saveMessages([...newMessages, ...messagesList]));
          setCurrentPage(res.data.currentPage);
          previousAction.current = "load_more_messages";
        }
      }
    }
  };

  const handleOnLoad = () => {
    if (
      previousAction.current === "" ||
      previousAction.current === "enter_new_message"
    )
      scrollbarRef.current?.scrollToBottom();
  };

  useEffect(() => {
    (async () => {
      const res = await getMessages({ conversationId: _id });

      if (res.statusCode === 200 && res.data) {
        dispatch(saveMessages(res.data.items));
        setCurrentPage(res.data.currentPage);
      }
    })();

    setFirstRender(true);
    setScrollHeight(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  useEffect(() => {
    if (receiveMessage !== null) {
      dispatch(saveMessages([...messagesList, receiveMessage]));
      previousAction.current = "enter_new_message";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiveMessage]);

  return (
    <div className={styles.container}>
      <Header />

      {/* chat box body*/}
      <Scrollbars
        style={{ height: "80vh", backgroundColor: "#eef0f1" }}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        ref={scrollbarRef}
        onUpdate={(v) => {
          handleScroll(v);
        }}
      >
        <div style={{ padding: 30 }}>
          {messagesList.map((message) => {
            //text message of the other person
            if (
              message.sender !== userId &&
              !message.imageId &&
              !message.attachmentId
            )
              return (
                <AvatarMessage timestamp={message.sentAt} key={uuid()}>
                  <TextMessage content={message.content} />
                </AvatarMessage>
              );

            //image message of the other person
            if (message.sender !== userId && message.imageId)
              return (
                <AvatarMessage timestamp={message.sentAt} key={uuid()}>
                  <ImageMessage
                    url={message.imageId.url}
                    handleOnLoad={handleOnLoad}
                  />
                </AvatarMessage>
              );

            //attachment message of the other person
            if (message.sender !== userId && message.attachmentId)
              return (
                <AvatarMessage timestamp={message.sentAt} key={uuid()}>
                  <AttachmentMessage
                    name={message.attachmentId.originalName}
                    url={message.attachmentId.url}
                    size={message.attachmentId.size}
                  />
                </AvatarMessage>
              );

            //text message of the author
            if (
              message.sender === userId &&
              !message.imageId &&
              !message.attachmentId
            )
              return (
                <OwnMessage timestamp={message.sentAt} key={uuid()}>
                  <TextMessage
                    content={message.content}
                    cardBgColor={messageCardBg}
                  />
                </OwnMessage>
              );

            //image message of the author
            if (message.sender === userId && message.imageId)
              return (
                <OwnMessage timestamp={message.sentAt} key={uuid()}>
                  <ImageMessage
                    handleOnLoad={handleOnLoad}
                    url={message.imageId.url}
                  />
                </OwnMessage>
              );

            //attachment message of the author
            if (message.sender === userId && message.attachmentId)
              return (
                <OwnMessage timestamp={message.sentAt} key={uuid()}>
                  <AttachmentMessage
                    url={message.attachmentId.url}
                    name={message.attachmentId.originalName}
                    size={message.attachmentId.size}
                    cardBgColor={messageCardBg}
                  />
                </OwnMessage>
              );
          })}
        </div>

        {messagesList.length === 0 && (
          <div style={{ textAlign: "center", color: "gray" }}>
            Bạn có thể bắt đầu trò chuyện với người này
          </div>
        )}
      </Scrollbars>

      <Footer
        handleSubmitFile={handleSubmitFile}
        handleSubmitText={handleSubmitText}
      />
    </div>
  );
};

export default Chatbox;
