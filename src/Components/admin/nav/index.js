import React from 'react';
import { firebase } from '../../../firebase';

//3rd party libs
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

const AdminNav = () => {

    const links = [
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Add Match',
            linkTo: '/admin_matches/edit'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title: 'Add Players',
            linkTo: '/admin_players/edit'
        },
    ];

    const style = {
        color: '#ffffff',
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    };

    const renderItems = () => {
        return links.map((link) => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem
                    button
                    style={style}
                >
                    {link.title}
                </ListItem>
            </Link>
        ))
    };

    const logoutHandler = () => {
        firebase.auth().signOut()
            .then(()=>{})
            .catch(()=>{})
    };

    return (
        <div>
            {renderItems()}
            <ListItem
                button
                style={style}
                onClick={() => logoutHandler()}
            >
                Log Out
            </ListItem>
        </div>
    );
};

export default AdminNav;