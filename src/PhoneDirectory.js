import React, { Fragment, useCallback, useEffect,useMemo } from "react";
import AddSubscriber from "./AddSubscriber";
import ShowSubscribers from "./ShowSubscribers";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer"
import { SubscriberCountContext } from "./SubscriberCountContext";
export default function PhoneDirectory() {
  const [subscribersList, setSubscribersList] = useState([]);

  async function loadData(){
    const rawResponse = await fetch("http://localhost:7081/api/contacts")
    const data = await rawResponse.json()
    setSubscribersList(data);
 }
  useEffect(()=>{
      loadData();
  }, [])

// const deleteSubscriberHandler= useCallback((subscriberId)=>{
//     fetch("http://localhost:7081/api/contacts/"+ subscriberId,{method: 'DELETE'})
// .then(input=>input.json())
//  .then(data=>{
//      loadData()
//  })
// },[])

const deleteSubscriberHandler= useCallback(async (subscriberId)=>{
    const rawResponse = await  fetch("http://localhost:7081/api/contacts/"+ subscriberId,{method: 'DELETE'})
     await rawResponse.json();
    loadData();

},[])
//   function deleteSubscriberHandler(subscriberId) {

// fetch("http://localhost:7081/api/contacts/"+ subscriberId,{method: 'DELETE'})
// .then(input=>input.json())
// .then(data=>{
//     loadData()
// })
//   }
const numberOfSubscriptions = useMemo(() => {return subscribersList.length}, [subscribersList])

  async function addSubscriberHandler(newSubscriber) {

const rawResponse = await fetch("http://localhost:7081/api/contacts/", {
                                method: "POST",
                                headers: {
                               'content-type':'application/json'
                                },
                                body:JSON.stringify(newSubscriber)
                                }
                                );
   
     await rawResponse.json();
    
    await loadData();

    // if (subscribersList.length > 0) {
    //   newSubscriber.id = subscribersList[subscribersList.length - 1].id + 1;
    // } else {
    //   newSubscriber.id = 1;
    // }
    // subscribersList.push(newSubscriber);
    // setSubscribersList(subscribersList);
    //  this.setState({ subscribersList: subscribersList });
  }

  return (
    <Fragment>
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={(props) => (
              <ShowSubscribers
                {...props}
                subscribersList={subscribersList}
                deleteSubscriberHandler={(subscriberId) =>
                  deleteSubscriberHandler(subscriberId)
                }
              />
            )}
          />
          <Route
            exact
            path="/add"
            render={({ history }, props) => (
              <AddSubscriber
                history={history}
                {...props}
                addSubscriberHandler={(newSubscriber) =>
                  addSubscriberHandler(newSubscriber)
                }
              />
            )}
          />
        </div>
      </Router>
      <SubscriberCountContext.Provider value={numberOfSubscriptions}>
      <Footer ></Footer>
      </SubscriberCountContext.Provider>
      
    </Fragment>
  );
}

// class PhoneDirectory extends Component {

//     constructor() {
//         super();
//         this.state = {
//             subscribersList: [
//                 {
//                     id: 1,
//                     name: "Abhishek",
//                     phone: "9999999999"
//                 },
//                 {
//                     id: 2,
//                     name: "Ganesh",
//                     phone: "8888888888"
//                 }
//             ]
//         }
//     }

//     deleteSubscriberHandler = (subscriberId) => {
//         let subscribersList = this.state.subscribersList;
//         let subscriberIndex = 0;
//         subscribersList.forEach(function (subscriber, index) {
//             if (subscriber.id === subscriberId) {
//                 subscriberIndex = index;
//             }
//         }, this);
//         let newSubscribers = subscribersList;
//         newSubscribers.splice(subscriberIndex, 1);
//         this.setState({subscribers: newSubscribers});
//     }

//     addSubscriberHandler = (newSubscriber) => {
//         let subscribersList = this.state.subscribersList;
//         if (subscribersList.length > 0) {
//             newSubscriber.id = subscribersList[subscribersList.length - 1].id + 1;
//         } else {
//             newSubscriber.id = 1;
//         }
//         subscribersList.push(newSubscriber);
//         this.setState({ subscribersList: subscribersList });
//     }

//     render() {
//         return (
//             <Router>
//                 <div>
//                     <Route exact path="/" render={(props) => <ShowSubscribers {...props} subscribersList={this.state.subscribersList}deleteSubscriberHandler={this.deleteSubscriberHandler} />} />
//                     <Route exact path="/add" render={({history}, props) => <AddSubscriber history={history} {...props} addSubscriberHandler={this.addSubscriberHandler} />} />
//                 </div>
//             </Router>
//         )
//     }
// }

// export default PhoneDirectory;
