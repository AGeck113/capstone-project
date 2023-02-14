export default function UploadDoc({ onSelectFile, setIsEditing }) {
  return (
    <form
      onSubmit={(event) => {
        onSubmitForm(event);
        setIsEditing(false);
      }}
    >
      <label>
        Upload Document
        <input
          type="file"
          name="documentFile"
          onChange={onSelectFile}
          required
        />
      </label>
      <label>
        Name:
        <input type="text" name="title" required />
      </label>
      <button type="submit">save</button>
    </form>
  );
}
