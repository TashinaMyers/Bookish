import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../queries';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../mutations';
import SavedBooks from '../components/SavedBooks'
import SearchBooks from '../components/SearchBooks'

const Profile = () => {
return (
    <section>
        < SavedBooks />
        < SearchBooks />
    </section>

)
}


export default Profile