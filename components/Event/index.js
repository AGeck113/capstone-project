export default function EventCard({ event }) {
  return (
    <article>
      <p>{event.title}</p>
      <p>Kosten: {event.cost}€</p>
      <date>{event.date}</date>
      <p>{event.description}</p>
      <p>Priorität: {event.priority}</p>
    </article>
  );
}
