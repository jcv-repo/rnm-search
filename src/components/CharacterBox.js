import React from "react";
import { withRouter } from "react-router";
import getPronounCheck from "../helpers/GetPronounCheck";
import { getNewParamsString, getUrlParams } from "../helpers/GetUrlParams";

class CharacterBox extends React.Component {
  /*
  PROPS ARE:

  character,
  episodeList,
  searchQuery,
  setSearchQuery,
 */

  constructor(props) {
    super(props);
    this.boxElement = React.createRef();
    this.setSelectedCharNull = this.setSelectedCharNull.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.userHasClosedIt = false;
  }

  setSelectedCharNull() {
    this.userHasClosedIt = true;
    this.props.setSearchQuery({ ...this.props.searchQuery, character: null });
  }

  escFunction(event) {
    if (event.key === "Escape") {
      this.setSelectedCharNull();
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", this.escFunction);
    this.boxElement.current.scrollIntoView({ behavior: "smooth" });
    if (getUrlParams("character") != this.props.searchQuery.character) {
      this.props.history.replace({
        search: getNewParamsString({
          character: this.props.searchQuery.character,
        }),
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.escFunction);
    if (this.userHasClosedIt) {
      this.props.history.replace({
        search: getNewParamsString({
          character: null,
        }),
      });
    }
  }

  render() {
    return (
      <div id="character-box" ref={this.boxElement}>
        <div id="close-charbox" onClick={this.setSelectedCharNull}></div>
        <img src={this.props.character.image} alt={this.props.character.name} />
        <div>
          <h2>
            {this.props.character.name}
            <span className="origin">
              from
              {this.props.character.origin.name === "unknown"
                ? " Unknown origins"
                : " " + this.props.character.origin.name}
            </span>
          </h2>
          {this.props.character.gender !== "unknown" && (
            <span className="pronoun">
              {getPronounCheck(this.props.character.gender)}
            </span>
          )}
          <ul>
            <li className="status">
              {this.props.character.status === "unknown"
                ? "Unknown Status"
                : this.props.character.status}
            </li>
            <li className="species">
              <span>Species</span> {this.props.character.species}
            </li>
            <li> {this.props.character.location.name} </li>
            {this.props.episodeList.length !== 0 && (
              <li className="episodes">
                <span> Featured episodes </span>
                <ul>
                  {this.props.episodeList.map((episode, index) => (
                    <li key={`episode-${episode.id}`}>{episode.episode}</li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(CharacterBox);
