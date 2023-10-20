import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div className='container py-3'>
        <div className='row'>
            <div key={alert.id} className={`alert alert--${alert.alertType}`}>
                { alert.msg }
            </div>
        </div>
    </div>
));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
//  The connect() function connects a React component to a Redux store