import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { InputCore } from "../Input";
import messages from "../utils/messages.js";

/**
 * Simple component for a basic checkbox
 */
class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked || false,
      valid: true,
      errorMessage: "",
      focus: false
    };
  }

  // Handles new checkbox clicks and sets value and checked status of hidden input
  _clickHandler = event => {
    if (!this.props.disabled) {
      event.persist();
      this.setState({ checked: !this.state.checked }, function() {
        this._validationHandler(this.props.errorCallback);

        /* Check if onClick has been passed, if so call it. */
        if (typeof this.props.onClick !== "undefined") {
          this.props.onClick(
            this.props.value,
            event,
            this.state.valid,
            this.state.checked
          );
        }

        if (typeof this.props.onBeforeChange !== "undefined") {
          this.props.onBeforeChange(this.state.checked);
        }

        /* Check if onChange has been passed, if so call it. */
        if (typeof this.props.onChange !== "undefined") {
          this.props.onChange(
            this.props.value,
            event,
            this.state.valid,
            this.state.checked
          );
        }
      });
    }
  };

  _validationHandler = callback => {
    // If custom validation callback is provided set validationObject with response, otherwise check if required
    const validationObject = callback
      ? callback(event, this.state.checked)
      : {
          valid:
            (this.props.required && this.state.checked) || !this.props.required,
          message: this.props.requiredMessage || messages.requiredMessage
        };
    this.setState({
      valid: validationObject.valid,
      errorMessage: validationObject.message
    });
  };

  render() {
    const {
      label,
      title,
      disabled,
      className,
      name,
      groupError,
      errorCallback,
      inline,
      labelPosition
    } = this.props;
    // TODO: Figure out why, if moved to constructor, the following variables cause issues on click
    const inlineCheckbox = cx({ inline_block: inline, checkbox_padding: true });
    const labelStyle = cx({
      label: labelPosition !== "left",
      label_left: labelPosition === "left"
    });
    const checkboxDisplay =
      labelPosition === "left" ? cx("float_right") : cx("float_left");
    const title_label = title ? title : label;
    const disabledClass = disabled
      ? cx("disabled", "inline_block", "relative", "padding")
      : cx("inline_block", "relative", "padding");
    const error = groupError || !this.state.valid;
    let checkboxClass = cx({
      checked: this.state.checked,
      error: error,
      not_checked: !this.state.checked,
      focus: this.state.focus
    });

    return (
      <div
        onClick={this._clickHandler}
        styleName={inlineCheckbox}
      >
        <div styleName={disabledClass}>
          {label && (
            <label
              styleName={labelStyle}
              title={title_label}
              className={cx(className)}
            >
              {label}
            </label>
          )}
          <div styleName={checkboxDisplay}>
            <InputCore
              label={label}
              type="checkbox"
              disabled={disabled}
              checked={this.state.checked}
              hidden={disabled}
              name={name}
            />
            <div styleName={checkboxClass}>
              {this.state.checked && <div styleName={cx("checkmark")} />}
            </div>
          </div>
          {this.props.required && <span styleName={"error_text"}>*</span>}
        </div>
        {error &&
        !groupError && (
          <div styleName={cx("error_message")}>{this.state.errorMessage}</div>
        )}
      </div>
    );
  }
}

Checkbox.propTypes = {
  /**
   * Text for checkbox label
   * @examples 'Some Label'
   */
  label: PropTypes.string,
  /**
   * A css class name that will be appended to the wrapping <label> element around the <input> and <span> elements.
   */
  className: PropTypes.string,
  /**
   * If included, checkbox is disabled
   * @examples <Checkbox disabled />, <Checkbox disabled={true} />
   */
  disabled: PropTypes.bool,
  /**
   * If included, renders the checkbox and it's label inline, so it can be side-by-side to other content.
   */
  inline: PropTypes.bool,
  /**
   * Text for checkbox label title. (i.e. "alt-text" for checkboxes, useful for accessibility). If not provided, will be label text.
   * @examples 'Some Title'
   */
  title: PropTypes.string,
  /**
   * Defines if checkbox should be checked on load.
   */
  checked: PropTypes.bool,
  /**
   * Allows user to pass a callback for click events.
   */
  onClick: PropTypes.func,
  /**
   * Allows user to pass a function to be executed when the checkbox state is changed.
   */
  onChange: PropTypes.func,
  /**
   * Allows user to ask for user feedback before changing the "checked" state of the checkbox.
   */
  onBeforeChange: PropTypes.func,
  /**
   * If included, checkbox will return and error onBlur or onChange if not checked.
   */
  required: PropTypes.bool,
  /**
   * A custom message to be displayed if required property is set to true..
   */
  requiredMessage: PropTypes.string,
  /**
   * Allows the user to pass a function for custom validation. Should return either true or false.
   */
  errorCallback: PropTypes.func,
  /**
   * Determines if the checkbox label is to the left or the right of the checkbox.
   */
  labelPosition: PropTypes.string,
  /**
   * Sets the html "name" property on the input element.
   */
  name: PropTypes.string,
  /**
   * The value of the checkbox. This value is used by forms.
   */
  value: PropTypes.string,
  /**
   * States whether or not an error state has been passed down from the parent CheckboxGroup.
   */
  groupError: PropTypes.bool
};

Checkbox.defaultProps = {
  className: "",
  disabled: false,
  inline: false,
  checked: false,
  required: false
};

export default Checkbox;
