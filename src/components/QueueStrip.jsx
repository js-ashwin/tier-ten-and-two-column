export default function QueueStrip({ images, index }) {
  if (index === 9)
    return (
      <div className="queue">
        <div style={{ padding: "4px", width: "44px" }}></div>
      </div>
    );
  return (
    <div className="queue">
      {images.slice(index + 1).map((img, i) => (
        <img key={i} src={img.src} className="blur" alt="" />
      ))}
    </div>
  );
}
