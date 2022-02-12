import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneHaunt } from '../../store/haunts';
import CreateSpookingForm from '../CreateSpookingForm';
import './HauntDetail.css'

const HauntDetail = () => {
    console.log('Inside HauntDetail!')
    const { hauntId } = useParams();
    console.log('hauntId is ', hauntId);
    const sessionUser = useSelector(state => state.session.user);
    console.log('sessionUser is ', sessionUser);
    const haunts = useSelector(state => state.haunts);
    console.log('haunts is ', haunts);
    let haunt = haunts[hauntId];
    console.log('haunt is ', haunt);
    console.log('Haunt image array: ', haunt.Images);
    const [ isOwner, setIsOwner ] = useState(false);
    console.log('isOwner?: ', isOwner);

    useEffect(() => {
        console.log('Inside useEffect!');
        if (sessionUser) {
            console.log('sessionUser is truthy!!!');
            console.log('sessionUser.id is ', sessionUser.id);
            console.log('haunt.userId is ', haunt.userId);
            if(sessionUser.id === haunt.userId) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        }
    }, [sessionUser]);

    const defaultHauntUrl = '/images/hauntedhouse.jpg';
    const defaultUserUrl = '/images/user-icon-lavender.png';

    const debug = () => {
        console.log('So far so good!');
    }

    return (
        <div id='haunt-detail-container'>
            <div id='haunt-detail-info-bar'>
                <div id='haunt-detail-heading'>
                    <h1>{haunt.name}</h1>
                    <h2 id='haunt-detail-location'>
                        {haunt.city}, {haunt.state && (
                            <span>{haunt.state}, </span>
                        )}{haunt.country}
                    </h2>
                </div>
                {debug()}
                {isOwner && (
                <div id='haunt-detail-owner-buttons'>
                    <Link to={`/haunts/${haunt.id}/edit`} >
                        <button>
                            Edit
                        </button>
                    </Link>
                    <Link to={`/haunts/${haunt.id}/delete`} >
                        <button>
                            Delete
                        </button>
                    </Link>
                </div>
                )}
                {debug()}
            </div>
            <div id='haunt-detail-image-grid'>
                <div id='haunt-detail-image-one' style={{backgroundImage: `url(${haunt.Images.length ? haunt.Images[0].url : defaultHauntUrl})`}}></div>
                <div id='haunt-detail-image-two' style={{backgroundImage: `url(${haunt.Images.length > 1 ? haunt.Images[1].url : defaultHauntUrl})`}}></div>
                <div id='haunt-detail-image-three' style={{backgroundImage: `url(${haunt.Images.length > 2 ? haunt.Images[2].url : defaultHauntUrl})`}}></div>
                <div id='haunt-detail-image-four' style={{backgroundImage: `url(${haunt.Images.length > 3 ? haunt.Images[3].url : defaultHauntUrl})`}}></div>
                <div id='haunt-detail-image-five' style={{backgroundImage: `url(${haunt.Images.length > 4 ? haunt.Images[4].url : defaultHauntUrl})`}}></div>
            </div>
            {debug()}
            <div id='haunt-detail-info-area'>
                <div id='haunt-detail-text'>
                    <div id='haunt-host-info'>
                        <div>
                            <h2>Hosted by {haunt.User.username}</h2>
                        </div>
                        <div id='haunt-host-image' style={{backgroundImage: `url(${haunt.User.Images.length ? haunt.User.Images[0].url : defaultUserUrl})`}}></div>
                    </div>
                    {debug()}
                    <div id='haunt-description'>
                        <p>{haunt.description}</p>
                    </div>
                    {debug()}
                </div>
                <div>
                    {(!sessionUser || sessionUser.id !== haunt.userId) && (
                        <CreateSpookingForm haunt={haunt} />
                    )}
                    {debug()}
                </div>
            </div>
        </div>
    )
}

export default HauntDetail;
