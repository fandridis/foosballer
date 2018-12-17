import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../CustomButton';
import { colors } from '../../css/Variables';

const ModalOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;

  background-color: rgba(40, 40, 40, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalBox = styled.div`
  position: relative;
  width: 90%;
  height: 40%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background-color: ${colors.normal.white}
  box-shadow: 0 3px 6px ${props => colors.normal.greyText40};
`

const Title = styled.div`
position: absolute;
top: 0;
width: 100%;
height: 60px;

display: flex;
justify-content: center;
align-items: center;
font-weight: 600;
font-size: 32px;
background-color: ${colors.normal.primary};
color: ${colors.normal.white};
`

const Body = styled.div`
  position: absolute;
  top: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0px 15px 0px 15px;

  font-weight: 500px;
  font-size: 24px;
  text-align: center;

  color: ${colors.normal.greyText}
`

const Footer = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Modal = (props) => {
  return (
    !props.isOpen
      ? ''
      : ReactDOM.createPortal(
          <aside className="Modal-component">
            <ModalOverlay>
              <ModalBox>

                {props.title &&
                  <Title>
                    { props.title }
                  </Title>
                }

                <Body>{props.children}</Body>

                <Footer>
                  { props.onConfirm ?
                    <Button onClick={props.onConfirm}>Yes</Button> : ''
                  }
                  
                  { props.onCancel ?
                    <Button inverted onClick={props.onCancel}>Cancel</Button> : ''
                  }

                  { props.onClose ?
                    <Button inverted onClick={props.onClose}>Close</Button> : ''
                  }
                </Footer>

              </ModalBox>
              
            </ModalOverlay>
          </aside>,

          // Where will the modal be attached in the DOM
          document.body
        ) 
  ) 
}



Modal.propTypes = {
  isOpen: PropTypes.bool
}

export default Modal;