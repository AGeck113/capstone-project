import { useRouter } from "next/router";

export default function DetailPage() {
  const router = useRouter();
  const { vin } = router.query;

  //Search if the vin could be find. If yes, show the edit Form(Or the option). If not, show Error Message and if you want to register your car manually
  return <p>123</p>;
}
