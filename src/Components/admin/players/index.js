import React, {useEffect, useState} from 'react';
import { firebasePlayers } from "../../../firebase";

//app modules
import AdminLayout from '../../../HOC/AdminLayout';
import { firebaseLooper, reverseArray } from "../../utils/miscs";

//3rd party libs
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const AdminPlayers = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        firebasePlayers.once('value')
            .then(snapshot => {
                const players = firebaseLooper(snapshot);
                setIsLoading(false);
                setPlayers(reverseArray(players))
            })
            .catch((error) => {return error})
    }, []);

    return (
        <AdminLayout>
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Position</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                players
                                    ? (players.map((player) => (
                                        <TableRow key={player.id}>
                                            <TableCell>
                                                <Link to={`/admin_players/edit/${player.id}`}>
                                                    {player.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/admin_players/edit/${player.id}`}>
                                                    {player.lastname}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {player.number}
                                            </TableCell>
                                            <TableCell>
                                                {player.position}
                                            </TableCell>
                                        </TableRow>
                                    )))
                                    : null
                            }
                        </TableBody>
                    </Table>
                </Paper>

                <div className='admin_progress'>
                    {
                        isLoading
                            ? <CircularProgress thickness={7} style={{color: '#98c5e9'}} />
                            :''
                    }
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPlayers;