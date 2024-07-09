export default function Article({ article }) {
  const { title } = article.fields;

  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}
