export default function Episode({ params }: { params: { episode: number } }) {
  return <div>My Post: {params.episode}</div>;
}
