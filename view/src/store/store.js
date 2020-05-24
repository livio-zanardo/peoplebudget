import React, { useState, useEffect } from 'react';

export const Context = React.createContext(null);

export const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        //this will be passed as the contenxt value
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
            /**
             * EDIT THIS!
             * This function is the equivalent to "window.onLoad", it only runs once on the entire application lifetime
             * you should do your ajax requests or fetch api requests here. Do not use setState() to save data in the
             * store, instead use actions, like this:
             *
             * state.actions.loadSomeData(); <---- calling this function from the flux.js actions
             *
             **/
        }, []);

        // The initial value for the context is not null anymore, but the current state of this component,
        // the context will now have a getStore, getActions and setStore functions available, because they were declared
        // on the state of this component
        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            menus: [
                { text: 'home', link: '/', auth: 0 },
                { text: 'projects', link: '/projects', auth: 0 },
                { text: 'feed', link: '/feed', auth: 1 },
                { text: 'proposals', link: '/proposals', auth: 2 },
                { text: 'dashboard', link: '/dashboard', auth: 3 },
                { text: 'profile', link: '/profile', auth: 1 }
            ],
            projects: [
                {
                    id: 1,
                    title: "Awesome project",
                    author: "Mike",
                    description: "Awesome Project description",
                    votes: 100,
                    avatar: "../../../public/assets/images/project-avatar.jpg"
                },
                {
                    id: 2,
                    title: "Another Awesome Project",
                    author: "John",
                    description: "Another Awesome project Description",
                    votes:50,
                    avatar: "../../../public/assets/images/project-avatar.jpg"
                }
            ],
            auth: 3 // 0 unauthenticated, 1 logged in, 2 contributer, 3 admin
        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, 'green');
            },
            loadSomeData: () => {
                /**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
            },

            getMenus: () => {
                return getStore().menus.filter((menu, index) => getStore().auth >= menu.auth);
            },

            getProjects: () => {
                return getStore().projects
            }
        }
    };
};

export default getState;
