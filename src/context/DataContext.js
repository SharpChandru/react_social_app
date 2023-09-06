import { createContext, useState, useEffect } from 'react';

import EditPost from '../EditPost';

import Post from '../Post';
import PostLayout from '../PostLayout';
import { format } from 'date-fns';
import api from "../api/posts"
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useNavigate } from 'react-router-dom';
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle,setPostTitle]=useState('')
    const [postBody,setPostBody]=useState('')
    const [editTitle,setEditTitle]=useState('')
    const [editBody,setEditBody]=useState('')
    const navigate=useNavigate()
    const {width}=useWindowSize()
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data])

    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError, isLoading,
            posts, setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;