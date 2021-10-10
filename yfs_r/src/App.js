import React, { useState } from "react";
import "./App.css";
import Modal from "./components/Dialog/dialog";

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const modalConfig = {
    visible: modalVisible,
    closeModal: () => {
      setModalVisible(false);
    },
  };

  const modalChildren = (
    <div className="dialog">
      <span onClick={() => setModalVisible(false)} className="closeBtn">
        x
      </span>
      <div>这里可以自定义内容</div>
      <button onClick={() => setModalVisible(false)}>取消</button><button onClick={() => setModalVisible(false)}>确定</button>
    </div>
  );

  return (
    <div className="App">
      {/* 贼丑的弹窗组件 */}
      <h2>贼丑的弹窗组件</h2>
      <button onClick={() => setModalVisible(true)} className="openBtn">
        open modal
      </button>
      <Modal {...modalConfig}>{modalChildren}</Modal>
    </div>
  );
}

export default App;
