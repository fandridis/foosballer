import React from 'react';
import './index.css';
import  CustomButton from '../../components/CustomButton';
import { withRouter } from 'react-router-dom';

// import Error from "../../assets/images/error.png";

const NotFound = (props) => {
  return (
    <div className='NotFound-page'>
      {/* <img className="PageGraphics" src={Error} alt="graphics in green and yellow"/> */}
      {/*SVG of DEFLATING BALL*/}
      <svg className='NotFound-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.858 99.846">
        <g transform="translate(-150.31 -342.294)">
          <path className="a"
                fill='#17B9A2'
                d="M83.476,40.107C84.53,56.367,66.428,66.882,45.64,66.882s-38.7-7.328-37.09-25.12S22.852,9,43.64,9c8.571,0,18.38,1.841,26.079,5.9,1.635.86,2.171-4.447,3.7-3.168.736.614-.5,3.514,2.574,6.291.927.837,1.77-.9,3.75,0,.858.391.694,2.887,1.889,4.014,1.165,1.093,3.6.9,3.839,1.478.638,1.549-6.217.156-5.728,1.058C82.217,29.118,83.131,34.785,83.476,40.107Zm-7.481-2.666v-.033l-3.956,2.7L66.962,34.86V26.38l3.267-2.867c-3.778-4.062-11.107-6.133-17.285-7.683l2.072,3.792-7.629,3.891L32.264,19.622l2.072-3.792c-6.167,1.547-9.5,3.614-13.285,7.683h7.7v9.649l-9.513,6.945-3.956-2.7v.033a20.362,20.362,0,0,0,5.839,14.007l1.169-4.024,11.97,2.721L40.725,57.9l-4.538,2.111a38.793,38.793,0,0,0,18.907,0L50.555,57.9l6.461-6.455,11.97-4.024,1.169,4.024A20.361,20.361,0,0,0,75.995,37.441Zm-35.27,9.983-6.461-7.317L45.64,34.86l11.376,5.247-6.461,7.317Z"
                transform="translate(141.86 375.259)"/>
          <path className="a"
                fill='#17B9A2'
                d="M12.872,54.035c-6.7-1.575-11.357-2.19-11.357-2.19A1.469,1.469,0,0,0,0,53.262V56.1a1.469,1.469,0,0,0,1.516,1.418L13.1,59.846c1.793.4,2.915.961,3.162,2.355a2.906,2.906,0,0,1-2.99,3.316,3.027,3.027,0,0,1-2.877-1.94,1.5,1.5,0,0,0-1.445-.895h-3.1a1.44,1.44,0,0,0-1.5,1.633,8.976,8.976,0,0,0,8.927,6.873c5.409,0,9.73-4.438,9.018-9.625C21.7,57.275,19.571,55.61,12.872,54.035ZM1.516,49.009s15.922-3.873,24.062-6.293,10.121-4.852,8.89-10.339a8.792,8.792,0,0,0-6.929-6.48,9.112,9.112,0,0,0-10.889,6.692,1.434,1.434,0,0,0,1.5,1.621h3.108a1.5,1.5,0,0,0,1.445-.895,3.024,3.024,0,0,1,2.875-1.94,2.9,2.9,0,0,1,2.989,3.315c-.246,1.394-1.861,2.166-3.463,2.636L1.516,43.338A1.469,1.469,0,0,0,0,44.756v2.835A1.469,1.469,0,0,0,1.516,49.009Zm34.809,1.583C29.642,49.328,19.314,51.8,19.314,51.8c1.832,1.468,3.774,2.66,4.4,4.893H34.753c4.555.147,6.1,3.166,6.1,5.512s-2.817,3.624-5.325,3.624a4.581,4.581,0,0,1-3.937-2.16,1.587,1.587,0,0,0-1.371-.675h-3.2a1.444,1.444,0,0,0-1.454,1.87,10.7,10.7,0,0,0,12.26,6.41c3.905-.77,7.892-3.061,8.8-6.7C48.243,58.081,43.008,51.856,36.325,50.592Z"
                transform="matrix(0.766, -0.643, 0.643, 0.766, 190.266, 352.763)"/>
        </g>
      </svg>
      <p>Oooops …</p>
      <p>Something went wrong!<br/>Try going back to the main page.</p>
      <CustomButton onClick={() => props.history.goBack()}>GO BACK</CustomButton>
    </div>
  );
};
export default withRouter(NotFound);
