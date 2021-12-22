import React, { Component } from 'react';

export interface IState {
        readonly topText?: string,
        readonly randomImg?: string
        s?: number
}

export interface IProps {
        readonly bottomText?: string,
        readonly showMeme?: number,
}

class MemeGenerator extends Component<any, IState, IProps> {

  constructor(props: any) {
    super(props);
    this.state = {
      topText: '',
      s: 0,
      randomImg: 'https://pbs.twimg.com/media/CYsYXi4U0AUd5wr.jpg'
    };
  }
 interval:any
 changeS() {
        console.log('aa')
                let {s} = this.state
              this.setState({s:1});
 }
 componentDidMount() {

         this.changeS()
    }

    componentWillUnmount() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }


  render() {
    return <div className='meme'>
  {this.state.s && <h2 className='top'>{this.state.topText}</h2> }
  {<h2 className='bottom'>{this.props.bottomText}</h2>  }
        </div>;
  }
}
export default MemeGenerator;

