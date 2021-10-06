/* eslint-disable */
import React, { memo } from "react";
import logo from "./logo.svg";
import "./App.css";
import Data from "./data.json";
import TestComponent from "./TestComponent";

type USERS = typeof Data;
// jsonデータの型推定

const name1 = "hello";
// リテラル型（特定の値のみ許可する）

let name2 = "hello";
// 型推測でstirngと判断してくれる

let username: string = "Hello";
let dummynum: number = 2;
const bool: boolean = true;
// 変数の型定義

let array1 = [true, false, true];
let array2 = [0, 1, "hello"];
// array2: (string | number)[] stringまたはnumber（型推論）

// オブジェクト内の「key」の値と「value」の型を定義している「NAME」
interface NAME {
  first: string;
  last: string;
  // 「last?: string;」 とすると、このlastはなくても成立する
  // 「last: string | null;」とすると、null型も入れられる
}

let nameObj: NAME = {
  first: "Yamada",
  last: "taro",
};
// 「NAME」で定義した型の通り、keyは「first」と「last」の２つ、いずれもstring型で定義したオブジェクトでなければならない

const func1 = (x: number, y: number): number => {
  return x + y;
};
// 引数の右隣は返り値の型を指定している

// ☆Intersection Types（複数のTypeを結合できる）
type PROFILE = {
  age: number;
  city: string;
};

type LOGIN = {
  username: string;
  password: string;
};

type USER = PROFILE & LOGIN;

const userA: USER = {
  age: 30,
  city: "Tokyo",
  username: "xxx",
  password: "yyy",
};

// ☆Union Types（変数に対して先に型や文字列などの値を定義しておく）…いつ使うん？
let value: boolean | number;
value = 10;

let arrayUni: (number | string)[];

arrayUni = [1, 3, "fase"];

let company: "Facebook" | "Googdle" | "Amazon";
company = "Amazon";

let memory: 256 | 512;
memory = 256;

// ☆typeof（
// 先に定義した変数を元に型定義する（今回は「msg」がstringと定義されているので「typeof msg」はstringとなる）
let msg: string = "Hi";
let msg2: typeof msg = "Bye";
msg = "hello";

// オブジェクトを元にする時は中のkey（今回で言う{cat: 〇〇}）の値も指定する（valueの型も「animal」を参照つまりstring型）
let animal = { cat: "small cat" };
let newAnimal: typeof animal = {
  cat: "big dog",
};

//☆keyof
type KEYS = {
  primary: string;
  secondary: string;
};

let key: keyof KEYS;
key = "primary";
// KEYS内の各プロパティのkeyの文字列（今回は"primary"と"secondary"）のみ定義できる

// ☆typeof + keyof
const SPORTS = {
  soccer: "Soccer",
  baseball: "Baseball",
};

let keySports: keyof typeof SPORTS;
keySports = "soccer";
// 意味不明 まじでいつ使うん

// ☆enum
enum OS {
  Windows,
  Mac,
  Linux,
}
// 上から順に番号が振り分けられる

interface PC {
  id: number;
  OSType: OS;
}

const PC1: PC = {
  id: 1,
  OSType: OS.Windows,
};
// OSTypeのvalueは上で定義した番号（今回は0）となる

// ☆互換性
const comp1 = "test";
let comp2: string = comp1;
// 定数で定義した文字列"test"（リテラル型）は代入できる

let comp3: string = "test";
// let comp4: "test" = comp3;

// "test"という文字列をそのまま型定義には使えない

let funcComp1 = (x: number) => {};
let funcComp2 = (x: string) => {};
// funcComp1 = funcComp2

// 引数の型定義が異なる関数は関数に代入できない

// ☆Generics
interface GEN<T> {
  item: T;
}
// <T>は引数のように型を入れることで実際に定数など定義する時に使う型を決められる

const gen0: GEN<string> = {
  item: "Hello",
};
const gen1: GEN<number> = {
  item: 2,
};

interface GEN1<T = string> {
  item: T;
}

const gen3: GEN1 = {
  item: "hello",
};
// デフォルトの型をstringとしている

interface GEN2<T extends string | number> {
  item: T;
}

const gen4: GEN2<string> = {
  item: "hello",
};
// <T extends 型>で限定できる

function funcGen<T>(props: T) {
  return { item: props };
}

const gen6 = funcGen("test");

// 関数実行時に自分で型を指定できる（型推論してくれる）

const gen7 = funcGen<string | null>(null);

function funcGen1<T extends string | null>(props: T) {
  return { value: props };
}

const gen8 = funcGen1("test");

interface Props {
  price: number;
}

function funcGen3<T extends Props>(props: T) {
  return { value: props.price };
  // ここではprops = {price: number}という形をとる
}

// {price: number}という形でのみ引数を渡せる

const gen10 = funcGen3({ price: 10 });

const funcGen4 = <T extends Props>(props: T) => {
  return { value: props.price };
};
// アロー関数でも同じ

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TestComponent text="Hello World"/>
      </header>
    </div>
  );
};

export default App;
