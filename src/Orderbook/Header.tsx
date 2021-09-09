import React from "react";
import styled from "styled-components/macro";

const TopHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 2px solid white;
  color: white;
  padding: 8px 10px;
`;

const SpreadText = styled.p`
  color: gray;
  margin-right: auto;
  margin-left: auto;
`;

interface Props {
  spreadPoints: number;
  spreadPercentage: number;
}

export const Header = ({ spreadPoints, spreadPercentage }: Props) => {
  return (
    <TopHeader>
      <p>Order Book</p>
      <SpreadText>
        Spread: {spreadPoints} ({spreadPercentage}%)
      </SpreadText>
    </TopHeader>
  );
};
