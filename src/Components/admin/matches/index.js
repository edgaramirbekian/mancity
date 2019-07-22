import React, {useEffect, useState} from 'react';
import { firebaseMatches } from "../../../firebase";

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

const AdminMatches = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        firebaseMatches.once('value')
            .then(snapshot => {
                const matches = firebaseLooper(snapshot);
                setIsLoading(false);
                setMatches(reverseArray(matches))
            })
            .catch(() => {})
    }, []);

    return (
        <AdminLayout>
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Match</TableCell>
                                <TableCell>Result</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                matches
                                    ? (matches.map((match) => (
                                        <TableRow key={match.id}>
                                            <TableCell>
                                                {match.date}
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/admin_matches/edit/${match.id}`}>
                                                    {match.away} <strong>-</strong> {match.local}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {match.resultAway} <strong>-</strong> {match.resultLocal}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    match.final === 'Yes'
                                                        ? <span className='matches_tag_red'>Finished</span>
                                                        : <span className='matches_tag_green'>Not Played</span>
                                                }
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

export default AdminMatches;