import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function NewBlog() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      post: "",
    },
  });
  const [submitError, setSubmitError] = useState(null);

  function handleTitleErrorDisplay() {
    if (errors?.title)
      return <p className="formError inline">{errors.title.message}</p>;
  }

  function handlePostErrorDisplay() {
    if (errors?.post)
      return <p className="formError inline">{errors.post.message}</p>;
  }

  function handleServerErrorDisplay() {
    if (submitError) return <p className="formError block">{submitError}</p>;
  }

  const onNewPostInput = (e) => {
    let c = e.target.innerText;
    if (c.length > 2047) {
      c = c.substring(0, 2047);

      e.target.innerText = c;

      /// Keeping Caret at end of Line
      /// Source: https://www.tutorialpedia.org/blog/how-to-move-the-cursor-to-the-end-of-a-contenteditable-entity/
      // Create a range that selects all text and collapses at the end
      e.target.focus();
      const range = document.createRange();
      if (e.target?.lastChild) {
        range.setStartAfter(e.target.lastChild);
      } else {
        range.setStartAfter(e.target, 0);
      }
      range.collapse();

      // Apply Range
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }

    setValue("post", c, {
      shouldValidate: true,
      shouldDirty: true,
    });
    trigger("post");
  };

  async function onSubmit(data) {
    const response = await axios.post(`http://localhost:3000/blogs/new`, data, {
      withCredentials: true,
    });

    if (response?.data?.id) {
      navigate(`/blogs/${response.data.id}`, { viewTransition: true });
    } else {
      setSubmitError(response?.data?.error);
    }
  }

  return (
    <section className="baseSection newBlogSection">
      <h2>New Blog</h2>
      <form className="postComment post" onSubmit={handleSubmit(onSubmit)}>
        {handleServerErrorDisplay()}
        <div className={`formEntry ${errors?.title ? "invalid" : ""}`}>
          <label htmlFor="title">Title</label>
          <input
            {...register("title", {
              pattern: {
                value: /[a-zA-Z0-9_]$/,
                message:
                  "Blog title can only contain letters, numbers and underscores",
              },
              minLength: {
                value: 3,
                message: "Blog title must be at least 3 characters long",
              },
              required: {
                value: true,
                message: "Blog title must be provided",
              },
            })}
          ></input>
        </div>
        {handleTitleErrorDisplay()}
        <div className={`formEntry ${errors?.post ? "invalid" : ""}`}>
          <label htmlFor="post">Post</label>
          <input
            className="hidden"
            {...register("post", {
              pattern: {
                value: /.*\S.*/,
                message: "The post cannot be only spaces",
              },
              maxLength: {
                value: 2048,
                message: "Posts cannot be any longer than 2047 characters",
              },
              required: {
                value: true,
                message: "The post must have content.",
              },
            })}
          ></input>

          <div className="asInputField">
            <div
              className="field"
              onInput={onNewPostInput}
              role="textbox"
              contentEditable
            ></div>
            <div className="asInputStatus">
              Count:{" "}
              {getValues != undefined || getValues("post") != undefined
                ? getValues("post")?.length
                : 0}
              /2047
            </div>
          </div>
          {handlePostErrorDisplay()}
        </div>
        <div className="formFooter">
          <div className="buttons">
            <button
              type="submit"
              className="submit"
              disabled={!isDirty || !isValid}
            >
              Post
            </button>
            <div>
              <input
                type="checkbox"
                {...register("isPublished")}
                defaultChecked
              ></input>
              <label className="noWeight" htmlFor="isPublished">
                Publish Blog to Public
              </label>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
