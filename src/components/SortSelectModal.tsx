import { theme } from "../style/theme";
import styled from "styled-components";
import Sheet from "react-modal-sheet";
import React, { useState } from "react";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UnlockModal({
  isOpen,
  setOpen,
}: IProps) {
  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[300]}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
  );
}
