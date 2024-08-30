const EditForm = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();

    let form = e.target;
    let formData = new FormData(form);
    let formObj = Object.fromEntries(formData.entries());

    if (formObj.title.trim() === "") {
      formObj.title = titlePH;
    }
    if (formObj.description.trim() === "") {
      formObj.description = descriptionPH;
    }
    if (formObj.tag.trim() === "") {
      formObj.tag = tagPH;
    }

    props.editHandler(formObj);
  };

  const { title: titlePH, description: descriptionPH, tag: tagPH } = props.note;

  return (
    <form
      className="w-full mx-auto p-4 bg-white shadow-md rounded"
      onSubmit={submitHandler}
    >
      <div className="flex mb-6 -mx-3">
        <div className="w-full px-3 mb-3">
          <label
            htmlFor="title"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="title"
            name="title"
            placeholder={titlePH}
          />
        </div>

        <div className="w-full px-3 mb-3">
          <label
            htmlFor="tag"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Tag
          </label>
          <input
            type="text"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="tag"
            name="tag"
            placeholder={tagPH}
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            htmlFor="description"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Description
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
            name="description"
            placeholder={descriptionPH}
          />
        </div>
      </div>

      <div className="p-4 mx-auto w-full flex flex-wrap justify-center">
        <button
          className="mx-2 bg-purple-600 w-64 md:w-48 py-2 px-12 rounded text-white hover:bg-white hover:border-purple-600 hover:text-black border-2"
          onClick={props.closeModal}
        >
          Close
        </button>
        <button
          type="submit"
          className="mx-2 bg-bubble-gum w-64 md:w-48 py-2 px-12 rounded text-white hover:bg-white hover:border-bubble-gum hover:text-black border-2"
        >
          Edit
        </button>
      </div>
    </form>
  );
};

export default EditForm;
