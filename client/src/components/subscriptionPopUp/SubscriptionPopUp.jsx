import React from 'react'
import "./SubscriptionPopUp.css"
const SubscriptionPopUp = () => {
    return (
        <div className="subscription-popup">
          <div className="popup-content">
            <h2>Your Subscription Has Expired</h2>
            <p>It looks like your subscription has expired. Renew now to continue using our services.</p>
            <button className="subscribe-button" >
              Renew Subscription
            </button>
          </div>
        </div>
      );
}

export default SubscriptionPopUp
