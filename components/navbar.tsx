import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
    useBreakpointValue,
    Box,
    Container,
    HStack,
    Stack,
    Icon,
    Flex,
    ButtonGroup,
    IconButton,
    Button,
    Image,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Divider,
  } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { transform } from "typescript";

interface NavbarButtonsProps {
  link: string,
  label: string,
  idx: number,
}

const NavbarButtons: React.FC<NavbarButtonsProps> = ({label, idx, link}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navButtonsStyle: React.CSSProperties = {
    transition: 'transform 0.3s ease',
    cursor: '',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    color: isHovered ? 'orange' : 'white',
    boxShadow: '10px',
    fontWeight: 'bold',
  }

  const smoothScrollTo = (targetId: string, offset: number) => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - offset; // This error can be ignored
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      console.log("Scrolling to " + targetId)
    }
  };
  

  return (
    <Text
      key={idx}
      as="a"
      onClick={() => smoothScrollTo(link, 80)}
      cursor="pointer" // Add cursor style to indicate link behavior
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={navButtonsStyle}
    >
      {label}
    </Text>
  )
}

export default function Navbar() {

  // Drawer related properties
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const navData = [
    {
      label: "About",
      link: "#about",
    },
    {
      label: "Experience",
      link: "#work",
    },
    {
      label: "Projects",
      link: "#projects",
    },
  ];

  const smoothScrollTo = (targetId: string) => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
      console.log("Scrolling to " + targetId)
    }
  };

  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const transitionStyles: React.CSSProperties = {
    transition: "opacity 0.5s ease",
  };

  return (
    <>
    { isDesktop ? (
        <Flex
        display="flex"
        height={"80px"}
        position="fixed"
        justify="center"
        top="0"
        left="0"
        right="0"
        bgGradient="linear(to-b, gray.900, transparent)"
        zIndex={999}
        style={{
          ...transitionStyles,
          opacity: isScrolled ? 1 : 0,
        }}
        >
        <HStack
          alignSelf={"flex-start"}
          justifyContent="space-between"
          m="10px"
          py="2"
          px="4"
          width="130vh"
        >
          <Text fontWeight="bold" color="gray.100">WEIDA</Text>
          <ButtonGroup variant="link" spacing={"7"}>
            {navData.map((item, i) => (
              <NavbarButtons key={i} idx={i} label={item.label} link={item.link} />
            ))}
          </ButtonGroup>
        </HStack>
        </Flex>
      ) : (
      <Box
        display="flex"
        height={"150px"}
        position="fixed"
        bottom={"0"}
        left="0"
        right="0"
        bgGradient="linear(to-t, gray.900, transparent)"
        zIndex={999}
        style={{
          ...transitionStyles,
          opacity: isScrolled ? 1 : 0,
        }}
      >
        <HStack
          flex="1" 
          alignSelf={"flex-end"}
          justifyContent="space-between"
          m="10px"
          py="2"
          px="4"
        >
          <ButtonGroup variant="link" spacing={"7"}>
            {navData.map((item, i) => (
              <NavbarButtons key={i} idx={i} label={item.label} link={item.link} />
            ))}
          </ButtonGroup>
          <Button borderRadius="20px" boxSize={"2em"} onClick={() => smoothScrollTo("#main")}>
            <ChevronUpIcon boxSize="1.5em" />
          </Button>
        </HStack>
      </Box>
    )}
  </>
  )
}
  