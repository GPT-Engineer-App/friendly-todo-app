import { useState } from "react";
import { Box, Flex, Heading, VStack, Text, Input, Button, IconButton, useColorModeValue, StackDivider } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const navColor = useColorModeValue("blue.500", "blue.300");

  const handleInputChange = (event) => setInputValue(event.target.value);
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  return (
    <Flex h="100vh">
      {/* Navigation Panel */}
      <VStack w="15%" bg={navColor} p={4} color="white" align="stretch" spacing={4}>
        <Heading size="md">Todo App</Heading>
        {/* Add navigation items here */}
      </VStack>

      {/* Todo Columns */}
      <Flex flex="1" bg={bgColor} p={4} color="black" direction="column">
        <Flex justify="space-between" mb={4}>
          {/* Todo Input */}
          <Input placeholder="Add new todo" value={inputValue} onChange={handleInputChange} mr={2} />
          <IconButton colorScheme="blue" aria-label="Add todo" icon={<FaPlus />} onClick={handleAddTodo} />
        </Flex>

        {/* Columns */}
        <Flex flexGrow="1" justify="space-between">
          {/* Todo Column */}
          <VStack divider={<StackDivider />} borderColor="gray.200" borderWidth="2px" p={4} w="32%" minH="70vh" bg="white" align="stretch" spacing={4}>
            <Heading size="md">To Do</Heading>
            {/* Todo Items */}
            {/* Map through todo items here */}
            {todos.map((todo, index) => (
              <Box key={index} p={4} shadow="md">
                <Text mb={2}>{todo}</Text>
                <Button leftIcon={<FaTrash />} colorScheme="red" size="sm">
                  Delete
                </Button>
              </Box>
            ))}
          </VStack>

          {/* In Progress Column */}
          <VStack divider={<StackDivider />} borderColor="gray.200" borderWidth="2px" p={4} w="32%" minH="70vh" bg="white" align="stretch" spacing={4}>
            <Heading size="md">In Progress</Heading>
            {/* Map through in-progress items here */}
          </VStack>

          {/* Done Column */}
          <VStack divider={<StackDivider />} borderColor="gray.200" borderWidth="2px" p={4} w="32%" minH="70vh" bg="white" align="stretch" spacing={4}>
            <Heading size="md">Done</Heading>
            {/* Map through done items here */}
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Index;
