import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    --dim: 3rem;
    width: var(--dim);
    height: var(--dim);
    position: relative;
    animation: spin988 2s linear infinite;
  }

  .loader .circle {
    --color: #58c770;
    --dim: 1.2rem;
    width: var(--dim);
    height: var(--dim);
    background-color: var(--color);
    border-radius: 50%;
    position: absolute;
  }

  .loader .circle:nth-child(1) {
    top: 0;
    left: 0;
  }

  .loader .circle:nth-child(2) {
    top: 0;
    right: 0;
  }

  .loader .circle:nth-child(3) {
    bottom: 0;
    left: 0;
  }

  .loader .circle:nth-child(4) {
    bottom: 0;
    right: 0;
  }

  @keyframes spin988 {
    0% {
      transform: scale(1) rotate(0);
    }

    20%,
    25% {
      transform: scale(1.3) rotate(90deg);
    }

    45%,
    50% {
      transform: scale(1) rotate(180deg);
    }

    70%,
    75% {
      transform: scale(1.3) rotate(270deg);
    }

    95%,
    100% {
      transform: scale(1) rotate(360deg);
    }
  }
`;

export default Loader;
