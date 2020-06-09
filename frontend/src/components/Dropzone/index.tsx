import React, { useCallback, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { Container } from "./styles";

interface DropzoneProps {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const onDrop = useCallback(
    (acceptFiles) => {
      const [file] = acceptFiles;

      const fileUrl = URL.createObjectURL(file);

      setSelectedImageUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectedImageUrl ? (
        <img src={selectedImageUrl} alt="imagem selecionada " />
      ) : (
        <p>
          <FiUpload />
          Imagem do Local
        </p>
      )}
    </Container>
  );
};

export default Dropzone;
