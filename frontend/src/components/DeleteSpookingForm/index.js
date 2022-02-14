import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { destroySpooking, getSpookings } from '../../store/spookings';
import { useHistory, useParams, } from 'react-router-dom';
import './DeleteSpookingForm.css';

const DeleteSpookingForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const spookings = useSelector(state => state.spookings);
    const { spookingId } = useParams();
    const spooking = spookings[spookingId];
    const history = useHistory();


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await dispatch(destroySpooking(spooking));
            await dispatch(getSpookings(sessionUser));
            history.push('/spookings');
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
        }
    }

    useEffect(() => {
        if (!sessionUser) {
            history.push('/login');
        }
    }, [sessionUser]);

    // const goBack = () => {
    //     if (history && history.length) {
    //         history.push((history[history.length - 2]).location.pathname);
    //     } else {
    //         history.push('/haunts');
    //     }
    // }

    return (
        <div className='form-page'>
            <form
                className='auth-form'
                onSubmit={handleSubmit}
            >
                <div className='auth-form-title'>
                    Cancel Trip?
                </div>
                <div id='delete-spooking-confirmation-div'>
                    Are you sure you want to cancel your trip? Please confirm.
                </div>
                <div id='delete-spooking-button-div'>
                    <button
                        type='button'
                        className='auth-button'
                        id='delete-spooking-back'
                        onClick={history.goBack}
                    >
                        Back
                    </button>
                    <button
                        type='submit'
                        className='auth-button'
                        id='delete-spooking-confirm'
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DeleteSpookingForm;
