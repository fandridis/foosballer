import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../css/Variables';
import Styled from 'styled-components';


const CustomButton = (props) => {

    const StyledButton = Styled.button`
    position: relative;
    display: block;
    margin: 30px auto;
    padding: 0;
    overflow: hidden;
    border-width: 0;
    outline: none;
    border-radius: ${props.rounded ? '20px' : '4px'};
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
    background-color: ${colors.normal[props.color]};
    color: ${props.color === 'light' ? '#222' : '#ecf0f1'};
    transition: background - color .3s;
    textTransform: uppercase;

    &:hover {
        background: ${colors.darker[props.color]};
        cursor: pointer;
    }
    &:focus {
        background: ${colors.darker[props.color]};
    }
    `
    
    const StyledSpan = Styled.span`
    display: block;
    padding: 12px 24px;
    `

    return (
        <StyledButton disabled={props.disabled} type={props.type}><StyledSpan>{props.btnText}</StyledSpan></StyledButton>
    );
}



CustomButton.propTypes = {
    color: PropTypes.string,
    rounded: PropTypes.bool,
    btnText: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string
};

CustomButton.defaultProps = {
    color: 'primary',
    rounded: true,
    disabled: false,
    type: 'submit'
};

export default CustomButton