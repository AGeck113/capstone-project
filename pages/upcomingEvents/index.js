import EventCard from "@/components/Event";
import Link from "next/link";
export default function EventPage() {
  const upcoming = [
    {
      title: "Innenreinigung",
      cost: 200,
      description: "Fahrzeugreinigung inkl. Lederpflege",
      priority: 2,
      date: "2023-06-2",
      id: 1,
    },
    {
      title: "Kundendienst",
      cost: 350,
      description: "Kundendienst inkl. Ölwechsel bei Autohaus XY",
      priority: 4,
      date: "2023-08-24",
      id: 2,
    },
    {
      title: "Windschutzscheibe erneuern",
      cost: 500,
      description:
        "Steinschlag in der Windschutzscheibe, kann nicht ausgebessert werden, Scheibe wird getauscht",
      priority: 5,
      date: "2023-05-18",
      id: 3,
    },
  ];
  upcoming.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  let predictedCost = 0;

  return (
    <>
      <Link href="home">Home</Link>
      <h1>Kommende Termine:</h1>
      <ul>
        {upcoming.map((event) => {
          predictedCost += event.cost;
          console.log(predictedCost);
          return (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          );
        })}
      </ul>
      <p>Vorraussichtliche Kosten: {predictedCost}€</p>
    </>
  );
}
