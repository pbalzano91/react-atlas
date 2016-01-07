import React from "react";
import Button from "../../components/button";
import FontIcon from "../../components/font_icon";
import Snackbar from "../../components/snackbar";

class SnackbarTest extends React.Component {
  state = {
    active: false
  };

  handleSnackbarClick = () => {
    this.setState({active: false});
  };

  handleSnackbarTimeout = () => {
    this.setState({active: false});
  };

  handleClick = () => {
    this.setState({active: true});
  };

  render () {
    return (
      <section>
        <h5>Snackbars and Toasts</h5>
        <p>lorem ipsum...</p>
        <Button label="Show snackbar" primary raised onClick={this.handleClick} />
        <Snackbar
          action="Hide"
          active={this.state.active}
          timeout={20000}
          onTimeout={this.handleSnackbarTimeout}
          type="cancel"
        >
          <FontIcon value="question_answer" />
          Snackbar action cancel
          <Button onClick={this.handleSnackbarClick}>Hide</Button>
        </Snackbar>
      </section>
    );
  }
}

export default SnackbarTest;
