export default function CurrentImage({ image, index, total }) {
  if (!image) return <div>No image</div>;

  return (
    <div className="current">
      <img src={image.src} alt="" />
      {/* <p>
        {index + 1} / {total}
      </p> */}
    </div>
  );
}
