import React from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';
import Square from './Square';
import { ICard, IRow } from '../store/cards';
import { IBall } from '../store/balls';


// Create a Title component that'll render an <h1> tag with some styles
const BingoHeader = styled.div`
        font-family: "Montserrat", sans-serif;
        font-size: 25px;
        margin-left: -1%;
        margin-top: -12px;
        position: relative;
        min-height: 30px;
        padding-left: 100px;
        text-align: center;
        padding-left: -15px;
        padding-bottom:54px;
`

const IDHeader = styled.div`
        position: absolute;
        top: 30%; left: 0;
        width: 20px;
        height: 10px;
        margin-top: -15px;
`

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.div`

    padding-top:2.6rem;
    padding-left:1.65rem;
    padding-right:1.5rem;
    background: #d6d2cb center url("aupcard1.png");
    background-size:100% 100%;
    background-repeat:no-repeat;
    height: 250px;
    border-radius: 15px;
    width: 350px;
`;
const Button = styled.div`
    cursor: pointer;
    height:50%;
`
// interface IGameProps {
//     rows: string,
// }
interface IBingoBoardProps {
    columnCount?: number,
    rowJSON?: string,
    calledBalls?: IBall[],
    card: ICard,
}

class BingoBoard extends React.Component<IBingoBoardProps> {

    bingo = () => {
        alert("BINGO PRESSED!");
    }

    calledBalls = [1,2]


    squares = (rowNumber = "0", columnCount: number, rowJSON: IRow) => {
        const numBas = Object.values(rowJSON);

        const calledBalls = this.props.calledBalls!;
        const t = Object.values(calledBalls);
        var numbers = [-1];
        t.map(i =>  numbers.push(Number.parseInt((i.num_value!.toString()))));


        return (
            <Flex justifyContent='center' key={"Row(" + rowNumber + ")"} className="aqua">
                {[...Array(columnCount)].map((_, i) => {
                    const reactKey = "Square(" + rowNumber + "," + i + ")";
                    let ticketNumber = numBas[i].toString();

                    if (numbers && numbers.length && numbers.includes(Number.parseInt(ticketNumber, 10))) {
                        return (<Square ticketNumber={ticketNumber} key={reactKey} className="ticket-number called" />)
                    }
                    if(Number.parseInt(ticketNumber, 10) == 0) {
                        return (<Square ticketNumber="" key={reactKey} className="ticket-number" />)
                    }

                    return (
                    <Square
                        width="42px"
                        ticketNumber={ticketNumber}
                        key={reactKey}
                        className="ticket-number"
                    />
                    )
                })}
            </Flex>
            );
    };



    rows = (cardJSON: IRow[], columnCount = 9) => {
        return [...Array(cardJSON.length)].map((_, i) => this.squares(i.toString(), columnCount, cardJSON[i]))
    }


    render() {
        return this.props.card && this.props.card.rows ?
            (
                <Wrapper className="align-content-center mx-3 mb-5">
                    <BingoHeader>
                        <IDHeader>
                                {this.props.card.id}
                        </IDHeader>
                    </BingoHeader>
                    {this.rows(this.props.card.rows, 9)}

                </Wrapper>
            )
            : (
                <h3>N/A</h3>
            );
    }
}
export default BingoBoard;

