import { Container, Row } from "react-bootstrap";
import "./editor.css";
import { useDispatch, useSelector } from "react-redux";
import { block } from "marked";
import { Button } from "react-bootstrap";
import $ from "jquery";
const Editor = () => {
  const dispatch = useDispatch();
  const send = (e) => {
    dispatch({ type: "SET_TEXT", payload: e.target.value });
  };
  let open;
  useSelector((state) => {
    open = state.editor ? "block" : "none";
    return state.editor;
  });
  const editHeight = useSelector((state) => state.editHeight);
  const closeOpen = () => {
    $("#close-editor").toggleClass("Open");
    if ($("#close-editor").hasClass("Open")) {
      dispatch({ type: "CLOSE_MARKDOWN" });
      dispatch({
        type: "SET_HEIGHT",
        payload: $("#editor").css("height"),
      });
      $("#editor").css("height", "calc(100vh - 70px)");
    } else {
      $("#editor").css("height", editHeight);
      dispatch({ type: "OPEN_MARKDOWN" });
    }
  };

  return (
    <Container id="editor-container" style={{ display: open }}>
      <div class="bar" id="bar">
        <Button
          id="close-editor"
          onClick={closeOpen}
          className="bi bi-arrows-angle-expand"
        ></Button>
      </div>
      <Row>
        <div className="editor">
          <textarea
            id="editor"
            onChange={send}
            value={useSelector((state) => state.text)}
          ></textarea>
        </div>
      </Row>
    </Container>
  );
};

export default Editor;
