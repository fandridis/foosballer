import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withFirebase } from '../../hocs/Firebase';
import { withGlobalState } from '../../hocs/GlobalState';
import { generateTournamentName } from '../../utilities/generators';
import Button from '../../components/CustomButton';
import Divider from '../../components/Divider';
import IconButton from '../../components/IconButton';
import PlayerRow from '../../components/PlayerRow';
import { colors } from '../../css/Variables';
import './index.css';

const Text = styled.p`
  margin: 5px;
  font-weight: 700;
  font-size: 20px;
  color: ${colors.normal.primary}
`

class PlayersCreate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newTournamentName: '',
      playersAll: [],
      playerIdsSelected: [],

      step: 1,
      isLoading: false
    }
  }

  componentDidMount() {
    console.log('this.props: ', this.props);
    this.setState({ playersAll: this.props.globalState.players })
    this.generateTournamentName();
  }

  generateTournamentName = () => {
    const newTournamentName = generateTournamentName();
    this.setState({ newTournamentName });
  }

  togglePlayerSelect = (playerId) => {
    console.log('Toggle ', playerId);
    let playerIdsSelected = [...this.state.playerIdsSelected];
    if (!playerIdsSelected.includes(playerId)) {
      console.log('adding it');
      playerIdsSelected.push(playerId);
    }
    else {
      console.log('removing it')
      playerIdsSelected = playerIdsSelected.filter(id => id !== playerId);
    }

    this.setState({ playerIdsSelected });
  }
  
  /**
   * Creates a new tournament in the database.
   * @method
   * @param {object} event - Contains the form event object
   */
  onSubmit = async event => {
    event.preventDefault();
    console.log('Creating a tourney');
    const tournament = {
      userRef: this.props.isAuthenticated,
      name: this.state.newTournamentName,
      createdAt: Date.now()
    }

    this.props.firebase.createTournament(tournament)
      .then((res) => {
        console.log('Tournament added successfully');
        tournament.uid = res.id;
        this.props.globalState.addTournament(tournament);
        this.setState({ isLoading: false, step: 2 }, () => { });
      })
      .catch(err => { 
        console.log('err: ', err)
        this.setState({ isLoading: false });
      })
  };

  onCancel = () => this.props.history.goBack();
  
  renderStepOne() {
    return (
      <div className="TournamentsCreate-page">

        <div className="TournamentsCreate-nameWrapper">
          <h2 className="TournamentsCreate-name">{this.state.newTournamentName}</h2>
          <span className="TournamentsCreate-iconWrapper">
            <IconButton icon='sync-alt' size='large' borderColor='white' onClick={() => this.generateTournamentName()} />
          </span>
        </div>

        <Text>Select Participants</Text>
        <Divider rounded color='primary' widthPx='120' marginBottom='30' />
        { 
          this.state.playersAll && this.state.playersAll.map(player => {
            return (
              <div 
                key={player.uid}
                onClick={() => this.togglePlayerSelect(player.uid)}
              >
                <PlayerRow 
                  player={player}
                  onRemove={this.handleRemovePlayer}
                  onEdit={this.handleEditPlayer}
                  selectable={true}
                  selected={this.state.playerIdsSelected.includes(player.uid)}      
                />
              </div>          
            );
          })  
        }

        <Button text='Continue' onClick={() => this.onSubmit() } />
        <Button text='Cancel' inverted onClick={() => this.onCancel()} />
      </div>
    );
  }

  renderStepTwo() {
    return (
      <h1>STEP 2</h1>
    )
  }

  render() {
    if (this.state.step === 1) { return this.renderStepOne() }
    else if (this.state.step === 2) { return this.renderStepTwo() }
  }
}

// AddPlayer.propTypes = {
//   userRef: PropTypes.string.isRequired,
//   players: PropTypes.array.isRequired,
//   onCancel: PropTypes.func.isRequired
// };

export default withRouter(withFirebase(withGlobalState(PlayersCreate)));
