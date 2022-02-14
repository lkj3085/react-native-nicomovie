import React from "react";
import styled from "styled-components/native";
import { useColorScheme } from "react-native";

const Text = styled.Text<{ isDark: boolean }>`
color:${(props) => (props.isDark ? "white" : props.theme.textColor)}
  font-size: 10px;
`;

interface VotesProps {
  votes: number;
}

const Votes: React.FC<VotesProps> = ({ votes }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Text isDark={isDark}>
      {votes > 0 ? `⭐️ ${votes} / 10` : `Coming soon`}
    </Text>
  );
};

export default Votes;
