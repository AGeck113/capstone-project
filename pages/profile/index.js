import { initialTestCarArray } from "@/pages/_app";
import { useAtom } from "jotai";

export default function ProfilePage() {
  const [testCarArray, setTestCarArray] = useAtom(initialTestCarArray);
  console.log(testCarArray);
  return <p>test</p>;
}
