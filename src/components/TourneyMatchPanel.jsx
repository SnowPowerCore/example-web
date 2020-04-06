import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { ExpansionPanelSummary, ExpansionPanelDetails, Fab } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UpdateIcon from '@material-ui/icons/Update';
import { List, ListItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import fetchData from '../api/line'
import { toggleAll, toggleItem } from '../actions/line/actions'

import "./TourneyMatchPanel.scss";

function TourneyMatchPanel() {

    const content = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => fetchData(dispatch), [dispatch]);

    return (<div className="content-panel">
        <div>
            {
                content.tourneysSource.map(tourney => (
                    <ExpansionPanel className="expansion-panel"
                        expandIcon={<ExpandMoreIcon />}
                        expanded={tourney.expanded}
                        onClick={() => dispatch(toggleItem(tourney.id))}>
                        <ExpansionPanelSummary>
                            {tourney.name}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List>
                                {
                                    content.matchesSource
                                        .filter(x => x.TId === tourney.id)
                                        .map(match => (
                                            <ListItem>
                                                {match.TeamsGroup[0] + " - " + match.TeamsGroup[1]}
                                            </ListItem>
                                        ))
                                }
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))
            }
        </div>
        <div>
            <Button variant="contained" className="update-data"
                color="primary" onClick={() => fetchData(dispatch)}>
                <UpdateIcon />
                Обновить данные
            </Button>
        </div>
        <div className="hide-all-button">
            <Fab variant="extended" color="primary"
                onClick={() => dispatch(toggleAll())}>
                Раскрыть все/Закрыть все
            </Fab>
        </div>
    </div>);
}

export default TourneyMatchPanel;