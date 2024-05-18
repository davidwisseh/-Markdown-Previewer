import { marked } from "marked";
import { useSelector, useDispatch } from "react-redux";
import $, { css } from "jquery";
import Prism, { highlight } from "prismjs";
import "./markdown.css";
import { Button, Container } from "react-bootstrap";
import { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Markdown = () => {
  const dispatch = useDispatch();

  const prevHeight = useSelector((state) => state.markdownHeight);
  const closeOpen = () => {
    $("#close-prev").toggleClass("Open");
    if ($("#close-prev").hasClass("Open")) {
      dispatch({ type: "CLOSE_EDITOR" });

      $("#preview").css("min-height", "calc(100vh - 90px)");
    } else {
      dispatch({ type: "OPEN_EDITOR" });
      $("#preview").css("min-height", 200);

      $("#preview").css("height", "fit-content");
    }
  };

  marked.setOptions({
    breaks: true,
  });
  const run = (text) => {
    const html = marked(text);

    $("#preview").html(html);

    $("pre code").each(function (i, block) {
      block.classList.add("language-js");
    });
    $("code").each(function (i, block) {
      Prism.highlightElement(block);
    });

    $("img").each(function (i, block) {
      block.classList.add("img-fluid");
    });
  };

  const initial = useSelector((state) => {
    run(state.text);
    return state.text;
  });
  useEffect(() => {
    run(initial);
  }, [initial]);
  let show;
  useSelector((state) => {
    show = state.markdown ? "block" : "none";

    return state.markdown;
  });
  return (
    <Container className="container" style={{ display: show }}>
      <div className="bar">
        <Button
          id="close-prev"
          onClick={closeOpen}
          className="bi bi-arrows-angle-expand"
        ></Button>
      </div>
      <div id="preview"></div>
    </Container>
  );
};

export default Markdown;
