import React, { FC, PropsWithChildren, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const ChatPage = React.lazy(() => import("./chat-page"))
const PrivateChatPage = React.lazy(() => import("./private-chat-page"))

const ChatRoutes: FC = () => {
  return (
    <Routes>
      <Route path={""} element={<Suspended element={ChatPage} />} />
      <Route path={":id"} element={<Suspended element={PrivateChatPage} />} />
    </Routes>
  );
};

export default ChatRoutes;