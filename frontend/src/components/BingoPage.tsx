import * as React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Flex } from 'rebass';
import { Container, Row, Spinner } from 'reactstrap';
import { IApplication, IConnectedReduxProps } from '../store/configureStore';
import BingoBoard from './BingoBoard';
import { requestNumbers} from '../store/cards';
import { requestCalled } from '../store/balls';
import './styles/App.css';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import './styles/bootstrap.css';

const Body = styled.div`
    min-height:600px;
`
const BackgroundFlex = styled(Flex)`
    background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(67, 198, 172), \
    rgb(25, 22, 84)) repeat scroll 0% 0%;
    min-height: 680px;
    color:white;
    padding-top:24px;
    flex-direction:column;
`
class BingoPage extends React.Component<IApplication & IConnectedReduxProps> {

    getCards = (cardCount = 2) => requestNumbers(cardCount, this.props.dispatch);
    getCalled = (cardCount = 2) => requestCalled(cardCount, this.props.dispatch);


    bingoBoards = (cardCount = 2) => {
        const { cards } = this.props.cards;
	const { balls } = this.props.balls;
	const temp: any = window;
	
	const params = new URLSearchParams(temp.location.search)
	
        const numbers=[]
        if(params.has('cartelle')) {
	  
           const cartelle = params!.get('cartelle')!.split(',')
	   for(let i = 0; i < cartelle.length; i++) {
		
              const c = Number.parseInt(cartelle[i])
              console.log(c)
	      numbers.push(c)
           }
	}
                    
        return numbers.map( (i) => {
            return (
                <BingoBoard
                    key={"Card-" + i.toString()}
                    card={cards[i-1]}
		    calledBalls={balls}           
                />
                );
        });
    };//CREATE BALLS.TSX WITH CALLED BALLS
    interval: any;
    componentDidMount() {
        this.getCards(this.props.cards.cards.length || 9);
        this.interval = setInterval(() => this.setState({ time: this.getCalled(1) }), 1000);
    }

    componentWillUnmount() {
       clearInterval(this.interval);
    }


    render() {
        return (
        <BackgroundFlex flexDirection="column" justifyContent="center">
            <Container>
                <Row className="justify-content-center">
                    <div className="text-center">
                        { this.props.message && this.props.message.type &&
                            <div className={`alert ${this.props.message.type}`}>
                                {this.props.message.message}
                            </div>
                        }
                    </div>
                </Row>
            </Container>
            {this.props.cards && this.props.cards.cards ? (
            <Container justify='space-evenly' className='pb-3' >
                <div className="row">
                    <div className="col-md-9">
                        <div className="row d-flex flex-row justify-content-center align-items-center">
                            {this.bingoBoards(this.props.cards.cards.length)}
                        </div>
                    </div>
                    <div className="col-md-3">Ball Board</div>
                </div>
            </Container>) :
            (<Container align='center' className='p-4' >
                <div className="row">
                    <Body className="col-md-12">
                       <Spinner/> 
                    </Body>
                </div>
            </Container>)}
        </BackgroundFlex>
        )
    }
}
function mapStateToProps(state: IApplication) {
    const { message, cards, balls} = state;
    return {
	balls,
        cards,
        message,
    }
}
export default connect(mapStateToProps)(BingoPage);
