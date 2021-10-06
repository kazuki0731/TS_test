import React, { useState } from "react";

interface Props {
  text: string;
}
// propsのvalueの型とkeyを限定している

interface UserData {
  id: number;
  name: string;
}
// useStateの初期値に指定する型を限定している

const TestComponent: React.FC<Props> = (props) => {
  const [count, setCount] = useState<number | null>(0);
  const [user, setUser] = useState<UserData>({ id: 1, name: "kawabata" });
  // 指定がなければ型推論
  const [inputData, setInputData] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  return (
    <div>
      <h1>{props.text}</h1>
      <h4>{count}</h4>
      <input type="text" value={inputData} onChange={handleInputChange} />
      <h1>{inputData}</h1>
    </div>
  );
};

export default TestComponent;

