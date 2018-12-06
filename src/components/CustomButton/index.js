import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../css/Variables';
import Styled from 'styled-components';


const CustomButton = (props) => {

    const StyledButton = Styled.button`
    margin: 30px auto;
    min-width: 250px;
    height: 40px;
    border-radius: 20px;
    box-shadow: 0 3px 6px rgba(23, 185, 162, 0.38);
    border: none;
    background-color: ${colors.normal[props.color]};
    color: ${colors.normal.lightText};
    font-weight: 800;
    font-size: 12px;
    transition: .3s;
    
    &:hover {
        background: ${colors.darker[props.color]};
        cursor: pointer;
    }
    &:focus {
        background: ${colors.darker[props.color]};
    }
    `
    const InvertedButton = Styled(StyledButton)`
        border: 2px solid ${colors.normal.primary};
        background-color: white;
        color: ${colors.normal.primary};
        box-shadow: none;
    `

    if (props.inverted) {
      return (<InvertedButton disabled={props.disabled} type={props.type}>{props.text}</InvertedButton>)

    }
    else {
        return (<StyledButton disabled={props.disabled} type={props.type}>{props.text}</StyledButton>)
    }
}



CustomButton.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    inverted: PropTypes.bool
};

CustomButton.defaultProps = {
    color: 'primary',
    disabled: false,
    type: 'submit',
    inverted: false
};

export default CustomButton