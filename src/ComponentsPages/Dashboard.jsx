import SideNav from './SideNav'
import Header from './Header'
import { useState } from 'react';
import MarketTrend from './MarketTrend';
import CustomerFeedback from './CustomerFeedback';
import ChatBot from './ChatBot';
import LocateCustomer from './LocateCustomer';
import MultyMail from './MultyMail';

const Dashboard = () => {
    const [active, setActive] = useState('component1')

    const renderComponent =()=>{
      switch (active) {
        case 'component1':
            return <MarketTrend/>;
        case 'component2':
            return <CustomerFeedback/>;
        case 'component3':
            return <LocateCustomer/>;
        case 'component4':
            return <ChatBot/>;
        case 'component5':
            return <MultyMail/>;
      
        default:
            return <MarketTrend/>;
      }
    }
    return (  
        <div>
            <Header/>
            <div classNave='flex'>
            <SideNav/>
            <div>
                {renderComponent()}
            </div>
            </div>
        </div>
    );
}
 
export default Dashboard;