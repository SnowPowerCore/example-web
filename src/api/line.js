import { fetchSourcePending, fetchSourceSuccess, fetchSourceError } from '../actions/line/actions';
import axios from "axios";
import { removeDuplicates } from "../utils/utils";

import LineTournamentsWithMatchesApiModel from "../constants/api/methods";

export default dispatch => {
        dispatch(fetchSourcePending());
        return axios(LineTournamentsWithMatchesApiModel)
        .then(res => {
            if(res.error){
                throw(res.error);
            }
            const temp = res.data.map(x => Object.assign({}, {}, {
                id: x.TId,
                name: x.TournamentName,
                expanded: true
            }));
            const tourneys = removeDuplicates(temp, "id");
            const matches = res.data;
            dispatch(fetchSourceSuccess(tourneys,matches));
        })
        .catch(error => {
            dispatch(fetchSourceError(error));
        });
}