import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

export default function TextInput({
  textInput,
  onChange,
  handleCreatePost,
  loading,
}) {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        fontSize="10pt"
        value={textInput.title}
        onChange={onChange}
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
        }}
      />
      <Textarea
        name="body"
        fontSize="10pt"
        value={textInput.body}
        onChange={onChange}
        height="100px"
        borderRadius={4}
        placeholder="Text (optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
        }}
      />
      <Flex justify="flex-end">
        <Button
          height="34px"
          p="0 30px"
          disabled={false}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
}
