import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  AppBar,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Transition from "src/components/layout/Transistion";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill, { Quill } from "react-quill";
import { ImageResize } from "quill-image-resize-module-ts";
import "react-quill/dist/quill.snow.css";
import placeholder from "src/assets/default.jpg";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toBase64 } from "src/utils/functions";
import { postUploadFile } from "src/services/file.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import TurndownService from "turndown";

const turndownService = new TurndownService();

interface IFormInput {
  title: string;
  summary: string;
  content: string;
  topicId: number;
  tagId: number;
}

const topics = [
  {
    id: 1,
    name: "Proposal Ideas",
  },
  {
    id: 2,
    name: "Engagement Ring Guide",
  },
  {
    id: 3,
    name: "Love Stories",
  },
  {
    id: 4,
    name: "Diamond Education",
  },
  {
    id: 5,
    name: "Wedding Planning Tips",
  },
];

const tags = [
  {
    id: 1,
    name: "Engagement",
  },
  {
    id: 2,
    name: "Proposal",
  },
  {
    id: 3,
    name: "Love Story",
  },
  {
    id: 4,
    name: "Wedding",
  },
  {
    id: 5,
    name: "Ring Care",
  },
];

Quill.register("modules/imageResize", ImageResize);

function AddModal(props: IModalProps) {
  const { open, setOpen } = props;

  const [image, setImage] = useState("");
  const [emptyImg, setEmptyImg] = useState(false);

  const ref = useRef<HTMLInputElement>(null);
  const quillRef = useRef<ReactQuill>(null);

  const {
    control,
    reset,
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const editorContent = watch("content");

  const uploadMutation = useMutation({
    mutationFn: (base64: string) => {
      return postUploadFile(base64);
    },
    onSuccess: (response) => {
      if (response.errors) {
        response.errors.forEach((err) => toast.error(err.description));
      }
    },
  });

  const onError = () => {
    if (!image) {
      setEmptyImg(true);
      return true;
    } else return false;
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (onError()) return;
    console.log(data);
    console.log(turndownService.turndown(data.content));
  };

  const editorImageHandler = useCallback(() => {
    const editor = quillRef.current?.getEditor();

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      let link = "";

      if (input.files && input.files[0]) {
        const file = input.files[0];

        const base64 = await toBase64(file);

        const response = await uploadMutation.mutateAsync(base64);
        if (response.data) {
          link = response.data.url;
        }
      }

      try {
        if (editor) {
          const range = editor.getSelection();
          if (range) editor.insertEmbed(range.index, "image", link);
        }
      } catch (err) {
        console.log("upload err:", err);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChooseImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = await toBase64(e.target.files[0]);
      setImage(image);
      setEmptyImg(false);
    }
  };

  const onEditorStateChange = (editorState: string) => {
    setValue("content", editorState);
  };

  const handleClose = (
    event?: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
    setImage("");
    setEmptyImg(false);
    reset();
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
          [{ color: [] }],
        ],
        handlers: {
          image: editorImageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
      imageResize: {
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    };
  }, [editorImageHandler]);

  useEffect(() => {
    register("content", { required: "* Nội dung không được trống" });
  }, [register]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
      }}
      TransitionComponent={Transition}
      fullScreen
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#313131" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Tạo Bài Blog
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        <ReactQuill
          ref={quillRef}
          value={editorContent}
          onChange={onEditorStateChange}
          modules={modules}
          placeholder="Nội dung bài blog"
          theme="snow"
        />
        {errors.content && (
          <FormHelperText error sx={{ mt: 1 }}>
            {errors.content.message}
          </FormHelperText>
        )}

        <Grid container justifyContent={"space-between"} my={5}>
          <Grid item sm={6} md={4}>
            <label>
              <img
                src={image ? image : placeholder}
                width={"100%"}
                style={{
                  objectFit: "cover",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              />
              <input
                type="file"
                hidden
                ref={ref}
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleChooseImage(e)}
              />
            </label>
            <Button
              variant="outlined"
              sx={{ width: "50%", textTransform: "capitalize", mt: 2 }}
              onClick={() => ref.current?.click()}
            >
              Chọn Ảnh Cover
            </Button>
            {emptyImg && (
              <FormHelperText error sx={{ mt: 1 }}>
                {"* Vui lòng upload ảnh cover"}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={5.8} mb={3}>
                <InputLabel error={!!errors.topicId} sx={{ mb: 1 }}>
                  Chủ Đề
                </InputLabel>
                <Controller
                  defaultValue={0}
                  name="topicId"
                  rules={{
                    required: "* Vui lòng chọn chủ đề",
                    min: { value: 1, message: "* Vui lòng chọn chủ đề" },
                  }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      fullWidth
                      {...field}
                      error={!!errors.topicId}
                      variant="outlined"
                    >
                      <MenuItem value={0} disabled>
                        <em>Chọn chủ đề</em>
                      </MenuItem>
                      {topics.map((item) => {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                />
                {errors.topicId && (
                  <FormHelperText error>
                    {errors.topicId.message}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={5.8} mb={3}>
                <InputLabel error={!!errors.tagId} sx={{ mb: 1 }}>
                  Tag
                </InputLabel>
                <Controller
                  defaultValue={0}
                  name="tagId"
                  rules={{
                    required: "* Vui lòng chọn tag",
                    min: { value: 1, message: "* Vui lòng chọn tag" },
                  }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      fullWidth
                      {...field}
                      error={!!errors.tagId}
                      variant="outlined"
                    >
                      <MenuItem value={0} disabled>
                        <em>Chọn tag</em>
                      </MenuItem>
                      {tags.map((item) => {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  )}
                />
                {errors.tagId && (
                  <FormHelperText error>{errors.tagId.message}</FormHelperText>
                )}
              </Grid>
            </Grid>

            <TextField
              autoFocus
              label="Tiêu Đề"
              type="text"
              fullWidth
              variant="outlined"
              error={!!errors.title}
              {...register("title", {
                required: "* Tiêu đề không được trống",
              })}
            />
            {errors.title && (
              <FormHelperText error sx={{ mt: 1 }}>
                {errors.title.message}
              </FormHelperText>
            )}

            <TextField
              error={!!errors.summary}
              autoFocus
              label="Tóm Tắt"
              type="text"
              fullWidth
              multiline
              rows={7}
              sx={{ mt: 3 }}
              variant="outlined"
              {...register("summary", {
                required: "* Tóm tắt không được trống",
              })}
            />
            {errors.summary && (
              <FormHelperText error>{errors.summary.message}</FormHelperText>
            )}
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ my: 5, py: 5, textAlign: "right" }}>
        <Button variant="outlined" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="contained" type="submit" sx={{ ml: 1 }}>
          Xác Nhận
        </Button>
      </Container>
    </Dialog>
  );
}

export default AddModal;
