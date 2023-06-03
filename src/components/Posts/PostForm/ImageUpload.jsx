import { Flex, Button, Image, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

export default function ImageUpload({
  selectedFile,
  onSelectImage,
  setSelectedTab,
  setSelectedFile,
}) {
  const selectedFileRef = useRef(null);

  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            maxWidth="400px"
            maxHeight="400px"
            alt="Image"
          />
          <Stack direction="row" mt={4}>
            <Button height="28px" onClick={() => setSelectedTab("Post")}>
              Back to Post
            </Button>
            <Button
              height="28px"
              variant="outline"
              onClick={() => setSelectedFile("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="1px dashed"
          borderColor="gray.200"
          width="100%"
        >
          <Button
            variant="outline"
            height="28px"
            onClick={() => selectedFileRef.current.click()}
          >
            Upload
          </Button>
          <input
            ref={selectedFileRef}
            hidden
            type="file"
            onChange={onSelectImage}
          />
          <img src={selectedFile} alt="" />
        </Flex>
      )}
    </Flex>
  );
}
