export default function EventCard({ event }) {
  return (
    <article>
      <p>{event.title}</p>
      <p>Kosten: {event.cost}€</p>
      <p>{event.date}</p>
      <p>{event.description}</p>
      <p>Priorität: {event.priority}</p>
    </article>
  );
}
