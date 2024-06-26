import { ReactNode } from "react";
import styled from "styled-components";

// Styles for the container
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Description = styled.p`
  margin-bottom: 8px;
`;

const Wrapper = styled.div`
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
`;

interface TitleWithDescriptionProps {
  title: string;
  description?: string;
}

function TitleWithDescription({
  title,
  description,
  children,
}: TitleWithDescriptionProps & { children?: ReactNode }) {
  return (
    <Wrapper>
      {/* Render the wrapped component */}
      <Title>{title}</Title>
      {
        /* Render the description if it exists */
        description && <Description>{description}</Description>
      }
      {children}
    </Wrapper>
  );
}

export default TitleWithDescription;
