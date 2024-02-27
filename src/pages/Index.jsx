import { useState, useCallback } from "react";
import { Box, Flex, Heading, VStack, Text, Input, Button, IconButton, useColorModeValue, StackDivider } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
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

  const handleDragStart = (event, todo) => {
    event.dataTransfer.setData("text/plain", todo);
  };

  const handleDrop = (event, setList) => {
    const todo = event.dataTransfer.getData("text/plain");
    setList((prevList) => {
      // Avoid adding the same todo if it's already in the list
      if (!prevList.includes(todo)) {
        return [...prevList, todo];
      }
      return prevList;
    });
  };

  const removeFromList = (list, setList, todo) => {
    setList(list.filter((item) => item !== todo));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
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
          <Input placeholder="Add new todo" value={inputValue} onChange={handleInputChange} onKeyPress={(event) => event.key === "Enter" && handleAddTodo()} mr={2} />
          <IconButton colorScheme="blue" aria-label="Add todo" icon={<FaPlus />} onClick={handleAddTodo} />
        </Flex>

        {/* Columns */}
        <Flex flexGrow="1" justify="space-between">
          {/* Todo Column */}
          <VStack divider={<StackDivider />} borderColor="gray.200" borderWidth="2px" p={4} w="32%" minH="70vh" bg="white" align="stretch" spacing={4} onDrop={(event) => handleDrop(event, setTodos)} onDragOver={handleDragOver}>
            <Heading size="md">To Do</Heading>
            {/* Todo Items */}
            {/* Map through todo items here */}
            {todos.map((todo) => (
              <Box key={todo} p={4} shadow="md" draggable onDragStart={(event) => handleDragStart(event, todo, setTodos)} onDrop={(event) => handleDrop(event, setTodos)}>
                <Text mb={2}>{todo}</Text>
                <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => removeFromList(todos, setTodos, todo)}>
                  Delete
                </Button>
              </Box>
            ))}
          </VStack>

          {/* In Progress Column */}
          <VStack divider={<StackDivider />} borderColor="gray.200" borderWidth="2px" p={4} w="32%" minH="70vh" bg="white" align="stretch" spacing={4} onDrop={(event) => handleDrop(event, setInProgress, setTodos)} onDragOver={handleDragOver}>
            <Heading size="md">In Progress</Heading>
            {inProgress.map((todo) => (
              <Box key={todo} p={4} shadow="md" draggable onDragStart={(event) => handleDragStart(event, todo, setInProgress)} onDrop={(event) => handleDrop(event, setInProgress)}>
                <Text mb={2}>{todo}</Text>
              </Box>
            ))}
          </VStack>

          {/* Done Column */}
          <VStack divider={<StackDivider />} borderColor="gray.200" borderWidth="2px" p={4} w="32%" minH="70vh" bg="white" align="stretch" spacing={4} onDrop={(event) => handleDrop(event, setDone, setInProgress)} onDragOver={handleDragOver}>
            <Heading size="md">Done</Heading>
            {done.map((todo) => (
              <Box key={todo} p={4} shadow="md" draggable onDragStart={(event) => handleDragStart(event, todo, setDone)} onDrop={(event) => handleDrop(event, setDone)}>
                <Text mb={2}>{todo}</Text>
              </Box>
            ))}
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Index;
