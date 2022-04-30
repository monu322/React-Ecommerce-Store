import './button.styles.scss';

const BUTTON_TYPE_VALUES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

function Button({children, buttonType, ...otherProps }) { 

  return (
    <button className={`button-container ${BUTTON_TYPE_VALUES[buttonType]}`}>{children}</button>
  );
}

export default Button;
