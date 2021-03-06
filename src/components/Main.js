import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
    const [plans, setPlans] = useState(null);

    const URL = "https://rocky-scrubland-80311.herokuapp.com/plans/";

    const getPlans = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setPlans(data);
    }

    const createPlans = async (plan) => {
        await fetch(URL, {
            method: "POST", 
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(plan),
        });


        getPlans();
        console.log(plans.url);
    };

    const deletePlans = async (id) => {
        // make delete request to create lesson plans
        await fetch(URL + id, {
            method: "DELETE",
        });

        getPlans();
    };

    const updatePlans = async (plan, id) => {
        await fetch(URL + id, {
            method: "PUT", 
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(plan),
        });

        getPlans();
    };

    useEffect(() => getPlans(), []);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index plans={plans} createPlans={createPlans}/>
                </Route>
                <Route path="/plans/:id" render={(rp) => (
                    <Show 
                        plans={plans}
                        updatePlans={updatePlans}
                        deletePlans={deletePlans}
                        {...rp} 
                    />
                )} 
            />
            </Switch>
        </main>
    );
  }
  
  export default Main;