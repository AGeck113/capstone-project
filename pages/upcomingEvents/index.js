export default function EventPage() {
  const events = [
    {
      title: "Innenreinigung",
      price: 200,
      description: "Fahrzeugreinigung inkl. Lederpflege",
      priority: 2,
      date: "2023-06-2",
    },
    {
      title: "Kundendienst",
      price: 350,
      description: "Kundendienst inkl. Ölwechsel bei Autohaus XY",
      priority: 4,
      date: "2023-08-24",
    },
    {
      title: "Windschutzscheibe erneuern",
      price: 500,
      description:
        "Steinschlag in der Windschutzscheibe, kann nicht ausgebessert werden, Scheibe wird getauscht",
      priority: 5,
      date: "2023-05-18",
    },
  ];
  console.log(events);
  events.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  console.log(events);

  return <p>123</p>;
}
