export default function UploadZone({ onUpload }) {
  return (
    <div className="upload-zone">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => onUpload(e.target.files)}
      />
      <p>Upload images (max 10)</p>
    </div>
  );
}
