import * as React from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Flex } from 'rebass';
import { Container, Row, Spinner } from 'reactstrap';
import { IApplication, IConnectedReduxProps } from '../store/configureStore';
import BingoBoard from './BingoBoard';
import { requestNumbers} from '../store/cards';
import { requestCalled, IBallArray } from '../store/balls';
import './styles/App.css';
import './styles/button.css';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import './styles/bootstrap.css';
import MemeGenerator from '../store/meme';


const Body = styled.div`
    min-height:600px;
`
const BackgroundFlex = styled(Flex)`
    background: rgba(0, 0, 0, 0) linear-gradient(to bottom, rgb(25, 22, 84), #80DAEC, rgb(255,255,255)) repeat scroll 0% 0%;
    min-height: 1080px;
    color:white;
    padding-top:24px;
    flex-direction:column;
`
class BingoPage extends React.Component<IApplication & IConnectedReduxProps> {

    getCards = (cardCount = 2) => requestNumbers(cardCount, this.props.dispatch);
    getCalled = (cardCount = 2) => requestCalled(cardCount, this.props.dispatch);

    playAudio = () => {
        new Audio("audio.m4a").play();
    } 

    lastnumber: number = -1
    lastlist: number[] = []
    lastnumberstring: string = "Il gioco sta per cominciare... "
    showMeme: number = 1
    bingoBoards = (cardCount = 2) => {
        const { cards } = this.props.cards;
        const { balls } = this.props.balls;
        const temp: any = window;
        const numbers=[] as number[]

        console.log(this.lastnumber)
        var timer = null;
        if({balls} && {balls} !== null) {
                const n = {balls}!.balls

                if(n!.length > 0) {
                        if(this.lastnumber != n![n!.length-1].num_value) {
                                //const found = this.lastlist.filter(r=> !n!.includes(r))//Fix this
                                //console.log(found + "AAA")
                                //n!.map(ball => this.lastlist.push(ball.num_value))
                                this.lastnumber = n![n!.length-1].num_value as number
                                console.log("nuovo numero estratto")
                                this.playAudio()

                                if(this.lastnumberstring != "Il gioco sta per cominciare...") {
                                this.lastnumberstring = "Ultimo numero estratto: " +this.lastnumber.toString()
                                }
                                this.setState( () => {this.showMeme = 1})

                        }
                }


        }

        var timer = null;
        //if (timer) {
        //      clearTimeout(timer); //cancel the previous timer.
        //      timer = null;
        //}
        //timer = setTimeout(() => { if(this.showMeme == 1) this.setState( () => {this.showMeme = 0})}, 15000);
        const params = new URLSearchParams(temp.location.search)


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
        //this.getCalled(1);
	this.interval = setInterval(() => this.setState({ time: this.getCalled(1) }), 5000);
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
                        {this.showMeme ? <MemeGenerator showMeme={this.showMeme} bottomText={this.lastnumberstring}/>:null}
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
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <div className="row d-flex flex-row justify-content-center align-items-center">
                            {this.bingoBoards(this.props.cards.cards.length)}
                        </div>
                    </div>

                </div>
            </Container>) :
            (<Container align='center' className='p-4' >
                <div className="row">
                    <Body className="col-md-12">
                       <Spinner/>
                    </Body>
                </div>
            </Container>)}
             <Container>

                <Row className="justify-content-center">

                    <div className="text-center">
                        <a  href="/vincitori.html" className="button m-5">Vincitori</a>
                    </div>
                </Row>
            </Container>
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
