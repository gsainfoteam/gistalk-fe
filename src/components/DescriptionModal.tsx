import { theme } from "../style/theme";
import styled from "styled-components";
import Sheet from "react-modal-sheet";
import React, { useState } from "react";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Title = styled(theme.universalComponent.DivTextContainer)``;

export default function DescriptionModal({ isOpen, setOpen }: IProps) {
  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[300]}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <Title fontSize={33} color={theme.colors.primary}>
            GISTALK POINT
          </Title>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
