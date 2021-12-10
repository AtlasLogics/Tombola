import React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';

const FlexHeight = styled(Flex)`
  height: ${(props) => props.height};
  min-width: 0;
  height: 42px;
  margin: 1px !important;
  padding: 4px;
  display: flex;
  width: 42px;
  justify-content: center;
  align-items: center;
`;

interface ISquareProps {
    width?: string,
    height?: string,
    className: string,
    ticketNumber: string,
}
class Square extends React.Component<ISquareProps> {

  width = () => this.props.width || "42px";
  height = () => this.props.height || "42px";

  render() {
    return (
      <FlexHeight
        height={this.height()}
        width={this.width()}
        p={1}
        justifyContent='center'
        alignItems='center'
        className={this.props.className}
      >
          {this.props.ticketNumber}
      </FlexHeight>
    );
  }
}
export default Square;
