import Line from "./Line";
import { K, Fn, V, T, C, P } from "./CodeTokens";

const CodeBlock = () => {
  return (
    <pre className="text-[oklch(0.85_0.02_260)]">
      <Line n={1}>
        <K>function</K> <Fn>twoSum</Fn>
        <P>(</P>
        <V>nums</V>: <T>number</T>[], <V>target</V>:{" "}
        <T>number</T>
        <P>)</P>: <T>number</T>[] {"{"}
      </Line>

      <Line n={2}>
        {"  "}
        <K>const</K> <V>map</V> = <K>new</K>{" "}
        <T>Map</T>
        <P>{"<number, number>()"};</P>
      </Line>

      <Line n={3}>
        {"  "}
        <K>for</K> <P>(</P>
        <K>let</K> i = <C>0</C>; i {"<"} nums.length; i++
        <P>) {"{"}</P>
      </Line>

      <Line n={4}>
        {"    "}
        <K>const</K> <V>complement</V> =
        <V>target</V> - <V>nums</V>[i];
      </Line>

      <Line n={5}>
        {"    "}
        <K>if</K> <P>(</P>
        map.<Fn>has</Fn>
        <P>(</P>
        complement
        <P>))</P>{" "}
        <K>return</K>{" "}
        [
        map.<Fn>get</Fn>
        <P>(</P>
        complement
        <P>)!</P>, i];
      </Line>

      <Line n={6}>
        {"    "}
        map.<Fn>set</Fn>
        <P>(</P>
        nums[i], i
        <P>)</P>;
      </Line>

      <Line n={7} numOverride="7">
        {"  }"}
      </Line>

      <Line n={8}>
        {"  "}
        <K>return</K> [];
      </Line>

      <Line n={9}>
        {"}"}
      </Line>
    </pre>
  );
};

export default CodeBlock;